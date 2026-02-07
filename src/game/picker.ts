/**
 * Request picker with deterministic RNG support for debugging.
 * Based on POF_SPEC.md specification.
 */

import type { GameState } from './state';
import type { Stats, Needs, Request, NeedsTracking } from './models';
import { needRequests, eventRequests } from './requests';
import { isNeedUnlocked, isNeedRequired, isNeedOnCooldown, meetsRequirements } from './state';

/**
 * Deterministic random number generator using a simple LCG algorithm.
 * Based on Numerical Recipes - Park and Miller generator.
 */
class SeededRandom {
  private seed: number;

  constructor(seed: number = Date.now()) {
    this.seed = seed % 2147483647;
    if (this.seed <= 0) this.seed += 2147483646;
  }

  /**
   * Returns a random number between 0 (inclusive) and 1 (exclusive)
   */
  next(): number {
    this.seed = (this.seed * 16807) % 2147483647;
    return (this.seed - 1) / 2147483646;
  }

  /**
   * Returns a random integer between 0 (inclusive) and max (exclusive)
   */
  nextInt(max: number): number {
    return Math.floor(this.next() * max);
  }

  /**
   * Resets the seed
   */
  setSeed(seed: number): void {
    this.seed = seed % 2147483647;
    if (this.seed <= 0) this.seed += 2147483646;
  }
}

/**
 * Global RNG instance - can be seeded for deterministic behavior
 */
let rng = new SeededRandom();

/**
 * Seed the RNG for deterministic behavior (useful for debugging and testing)
 */
export function seedRandom(seed: number): void {
  rng.setSeed(seed);
}

/**
 * Reset to using non-deterministic random
 */
export function resetRandom(): void {
  rng = new SeededRandom(Date.now());
}

/**
 * Gets a random number from the global RNG (for internal use)
 * @returns Random number between 0 (inclusive) and 1 (exclusive)
 */
export function getRandomValue(): number {
  return rng.next();
}

/**
 * Selects one candidate from an array using weighted random selection.
 * The selection is deterministic when using a seeded RNG.
 * 
 * @param candidates Array of candidates with weights
 * @returns Selected candidate, or null if no candidates or all weights are 0
 */
export function selectWeightedCandidate<T extends { weight: number }>(
  candidates: T[]
): T | null {
  if (candidates.length === 0) {
    return null;
  }

  // Calculate total weight
  const totalWeight = candidates.reduce((sum, c) => sum + c.weight, 0);
  
  if (totalWeight <= 0) {
    return null; // No valid weights
  }

  // Generate random value between 0 and totalWeight
  const randomValue = rng.next() * totalWeight;

  // Find the selected candidate
  let accumulatedWeight = 0;
  for (const candidate of candidates) {
    accumulatedWeight += candidate.weight;
    if (randomValue < accumulatedWeight) {
      return candidate;
    }
  }

  // Fallback to last candidate (shouldn't happen with proper floating point math)
  return candidates[candidates.length - 1];
}

/**
 * Picks the next request based on selection rules from POF_SPEC.md
 * 
 * Priority order:
 * 1. Check for scheduled events whose targetTick <= currentTick (FIFO order)
 * 2. If fireRisk > 70 => pick EVT_CRISIS_FIRE
 * 3. Else if health < 30 => pick EVT_CRISIS_DISEASE
 * 4. Else if satisfaction < 30 => pick EVT_CRISIS_UNREST
 * 5. Else if any need is required (unlocked and unfulfilled for current cycle) => pick randomly among eligible need-requests
 * 6. Else pick a random event among all 25
 * 
 * Never repeats lastRequestId.
 * Filters out events that have reached maxTriggers.
 * Filters out chain starts if chain is active or on cooldown (unless scheduled as follow-up).
 */
export function pickNextRequest(state: GameState): Request;
export function pickNextRequest(stats: Stats, _needs: Needs, lastRequestId: string): Request;
export function pickNextRequest(
  stateOrStats: GameState | Stats,
  _needs?: Needs,
  lastRequestId?: string
): Request {
  // Handle both function signatures
  let stats: Stats;
  let actualLastRequestId: string;
  let tick: number = 0;
  let needsTracking: NeedsTracking | null = null;
  let scheduledEvents: Array<{ targetTick: number; requestId: string; scheduledAtTick: number }> = [];
  let chainStatus: Record<string, { active: boolean; completedTick?: number }> = {};
  let requestTriggerCounts: Record<string, number> = {};
  let fullState: GameState | null = null;

  if ('tick' in stateOrStats) {
    // Called with GameState
    stats = stateOrStats.stats;
    actualLastRequestId = stateOrStats.lastRequestId;
    tick = stateOrStats.tick;
    needsTracking = stateOrStats.needsTracking;
    scheduledEvents = stateOrStats.scheduledEvents || [];
    chainStatus = stateOrStats.chainStatus || {};
    requestTriggerCounts = stateOrStats.requestTriggerCounts || {};
    fullState = stateOrStats;
  } else {
    // Called with individual parameters (legacy support)
    stats = stateOrStats;
    actualLastRequestId = lastRequestId!;
  }

  /**
   * Helper function to check if a request can be triggered randomly
   * Checks maxTriggers limit and chain start gating/cooldown
   */
  const isEligibleForRandomTrigger = (request: Request): boolean => {
    // Check maxTriggers limit
    if (request.maxTriggers !== undefined) {
      const triggerCount = requestTriggerCounts[request.id] || 0;
      if (triggerCount >= request.maxTriggers) {
        return false; // Already triggered max times
      }
    }

    // Check chain start gating and cooldown
    if (request.chainId && request.chainRole === 'start') {
      const status = chainStatus[request.chainId];
      
      // Check if chain is currently active
      if (status && status.active) {
        return false; // Chain already started, not completed yet
      }
      
      // Check cooldown after completion
      if (status && !status.active && status.completedTick !== undefined && request.chainRestartCooldownTicks !== undefined) {
        const ticksSinceCompletion = tick - status.completedTick;
        if (ticksSinceCompletion < request.chainRestartCooldownTicks) {
          return false; // Still on cooldown
        }
      }
    }

    return true;
  };

  // Priority 1: Check for scheduled events
  // Find all events due on or before current tick
  const dueEvents = scheduledEvents.filter(event => event.targetTick <= tick);
  
  if (dueEvents.length > 0) {
    // Sort by scheduledAtTick for FIFO ordering (primary), then by targetTick (secondary)
    dueEvents.sort((a, b) => {
      if (a.scheduledAtTick === b.scheduledAtTick) {
        return a.targetTick - b.targetTick;
      }
      return a.scheduledAtTick - b.scheduledAtTick;
    });
    
    // Return the first due event that hasn't exceeded maxTriggers and meets requirements
    // Note: Scheduled events bypass chain gating and cooldown but still need unlock tokens
    for (const dueEvent of dueEvents) {
      const scheduledRequest = [...needRequests, ...eventRequests].find(
        (r) => r.id === dueEvent.requestId
      );
      
      if (scheduledRequest) {
        // Check maxTriggers for scheduled events
        if (scheduledRequest.maxTriggers !== undefined) {
          const triggerCount = requestTriggerCounts[scheduledRequest.id] || 0;
          if (triggerCount >= scheduledRequest.maxTriggers) {
            continue; // Skip this scheduled event, try next
          }
        }
        
        // Check if requirements are met (if we have full state)
        if (fullState && !meetsRequirements(fullState, scheduledRequest)) {
          continue; // Skip this locked scheduled event, try next
        }
        
        return scheduledRequest;
      }
    }
    // If all scheduled requests exceeded maxTriggers or are locked, fall through to normal logic
  }

  // Crisis requests by priority order
  if (stats.fireRisk > 70) {
    const crisisRequest = eventRequests.find((r) => r.id === 'EVT_CRISIS_FIRE');
    if (crisisRequest && crisisRequest.id !== actualLastRequestId) return crisisRequest;
  }
  if (stats.health < 30) {
    const crisisRequest = eventRequests.find((r) => r.id === 'EVT_CRISIS_DISEASE');
    if (crisisRequest && crisisRequest.id !== actualLastRequestId) return crisisRequest;
  }
  if (stats.satisfaction < 30) {
    const crisisRequest = eventRequests.find((r) => r.id === 'EVT_CRISIS_UNREST');
    if (crisisRequest && crisisRequest.id !== actualLastRequestId) return crisisRequest;
  }

  // Check for required needs using the new cycle-based system
  const eligibleNeeds: Request[] = [];
  const needKeys: Array<keyof Needs> = ['marketplace', 'bread', 'beer', 'firewood', 'well'];
  const needIdMap: Record<keyof Needs, string> = {
    marketplace: 'NEED_MARKETPLACE',
    bread: 'NEED_BREAD',
    beer: 'NEED_BEER',
    firewood: 'NEED_FIREWOOD',
    well: 'NEED_WELL',
  };

  for (const needKey of needKeys) {
    // Check if need is unlocked
    if (!isNeedUnlocked(needKey, stats.farmers)) {
      continue; // Skip locked needs
    }

    // Check if need is on cooldown
    if (needsTracking && isNeedOnCooldown(tick, needsTracking[needKey].nextEligibleTick)) {
      continue; // Skip needs on cooldown
    }

    // Check if need is required for current cycle
    const buildingCount = needsTracking ? needsTracking[needKey].buildingCount : 0;
    if (isNeedRequired(needKey, stats.farmers, buildingCount)) {
      const req = needRequests.find((r) => r.id === needIdMap[needKey]);
      if (req) eligibleNeeds.push(req);
    }
  }

  if (eligibleNeeds.length > 0) {
    // Filter out last request if it's in the list
    const availableNeeds = eligibleNeeds.filter((r) => r.id !== actualLastRequestId);
    if (availableNeeds.length > 0) {
      return availableNeeds[rng.nextInt(availableNeeds.length)];
    }
    // If all eligible needs were last request, fall through to random events
  }

  // Pick random event request (excluding last request and crisis events)
  // Crisis events should ONLY appear through the explicit conditions above
  // Also exclude events that cannot trigger randomly (follow-up-only events)
  // Also exclude events that have reached maxTriggers or are chain starts with gating/cooldown issues
  // Also exclude events that don't meet unlock requirements
  const crisisEventIds = ['EVT_CRISIS_FIRE', 'EVT_CRISIS_DISEASE', 'EVT_CRISIS_UNREST'];
  const availableEvents = eventRequests.filter(
    (r) => r.id !== actualLastRequestId && 
           !crisisEventIds.includes(r.id) &&
           (r.canTriggerRandomly !== false) &&
           isEligibleForRandomTrigger(r) &&
           (!fullState || meetsRequirements(fullState, r))
  );
  if (availableEvents.length > 0) {
    return availableEvents[rng.nextInt(availableEvents.length)];
  }

  // Fallback: pick any non-crisis event that can trigger randomly and meets requirements (shouldn't happen with 25 events)
  const nonCrisisEvents = eventRequests.filter(
    (r) => !crisisEventIds.includes(r.id) && 
           (r.canTriggerRandomly !== false) && 
           isEligibleForRandomTrigger(r) &&
           (!fullState || meetsRequirements(fullState, r))
  );
  return nonCrisisEvents[rng.nextInt(nonCrisisEvents.length)];
}
