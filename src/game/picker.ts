/**
 * Request picker with deterministic RNG support for debugging.
 * Based on POF_SPEC.md specification.
 */

import type { GameState } from './state';
import type { Stats, Needs, Request, NeedsTracking } from './models';
import { needRequests, infoRequests, eventRequests } from './requests';
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
  let scheduledEvents: Array<{ targetTick: number; requestId: string; scheduledAtTick: number; priority?: "info" | "normal" }> = [];
  let chainStatus: Record<string, { active: boolean; completedTick?: number }> = {};
  let requestTriggerCounts: Record<string, number> = {};
  let gameState: GameState | null = null;

  if ('tick' in stateOrStats) {
    // Called with GameState
    stats = stateOrStats.stats;
    actualLastRequestId = stateOrStats.lastRequestId;
    tick = stateOrStats.tick;
    needsTracking = stateOrStats.needsTracking;
    scheduledEvents = stateOrStats.scheduledEvents || [];
    chainStatus = stateOrStats.chainStatus || {};
    requestTriggerCounts = stateOrStats.requestTriggerCounts || {};
    gameState = stateOrStats;
    
    // Priority 0: Active combat takes precedence over everything
    // If there is an active combat, return a combat round request
    if (stateOrStats.activeCombat) {
      const combat = stateOrStats.activeCombat;
      const roundNumber = combat.round + 1;
      
      // Build text with current forces and last round results
      let text = `Your Forces: ${combat.committedRemaining}\nEnemy Forces: ${combat.enemyRemaining}`;
      
      if (combat.lastRound) {
        text += `\n\nLast Round:\nYour Losses: ${combat.lastRound.playerLosses}\nEnemy Losses: ${combat.lastRound.enemyLosses}`;
      }
      
      // Create synthetic combat round request
      const combatRoundRequest: Request = {
        id: `COMBAT_ROUND::${combat.combatId}`,
        title: `Battle – Round ${roundNumber}`,
        text,
        options: [
          {
            text: 'Continue Fighting',
            effects: {}, // Combat resolution handled in state.ts
          },
          {
            text: 'Withdraw',
            effects: {}, // Immediate lose handled in state.ts
          },
        ],
        advancesTick: false, // Combat rounds don't advance the tick
      };
      
      return combatRoundRequest;
    }
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

  /**
   * Helper function to check if a request is locked by unlock requirements
   * Returns true if the request should be filtered out (i.e., is locked)
   */
  const isLockedByRequirements = (request: Request): boolean => {
    return gameState !== null && !meetsRequirements(gameState, request);
  };

  // Priority 1: Check for scheduled events
  // Find all events due on or before current tick
  const dueEvents = scheduledEvents.filter(event => event.targetTick <= tick);
  
  if (dueEvents.length > 0) {
    // Separate info and normal priority events
    const infoEvents = dueEvents.filter(event => event.priority === "info");
    const normalEvents = dueEvents.filter(event => event.priority === "normal" || event.priority === undefined);
    
    // Helper to process events in priority order
    const processEvents = (events: typeof dueEvents) => {
      // Sort by scheduledAtTick for FIFO ordering (primary), then by targetTick (secondary)
      events.sort((a, b) => {
        if (a.scheduledAtTick === b.scheduledAtTick) {
          return a.targetTick - b.targetTick;
        }
        return a.scheduledAtTick - b.scheduledAtTick;
      });
      
      // Return the first event that hasn't exceeded maxTriggers and meets requirements
      for (const dueEvent of events) {
        // Check if this is a synthetic COMBAT_REPORT request
        if (dueEvent.requestId.startsWith('COMBAT_REPORT::')) {
          try {
            // Extract report data from the request ID
            const parts = dueEvent.requestId.split('::');
            if (!parts[2]) {
              throw new Error('Missing report data in combat report ID');
            }
            
            const reportDataStr = decodeURIComponent(parts[2]);
            const reportData = JSON.parse(reportDataStr);
            
            // Validate report data structure
            if (!reportData.outcome || !reportData.statDeltas) {
              throw new Error('Invalid report data structure');
            }
            
            // Build outcome text
            let outcomeText = '';
            if (reportData.outcome === 'win') {
              outcomeText = 'Victory!';
            } else if (reportData.outcome === 'withdraw') {
              outcomeText = 'Withdrawal';
            } else {
              outcomeText = 'Defeat';
            }
            
            // Build losses text
            const lossesText = `Casualties:\nYou: ${reportData.playerLosses || 0}\nEnemy: ${reportData.enemyLosses || 0}`;
            
            // Build consequences text using a helper function to reduce duplication
            const statLabels: Record<string, string> = {
              gold: 'Gold',
              satisfaction: 'Satisfaction',
              health: 'Health',
              fireRisk: 'Fire Risk',
              farmers: 'Farmers',
              landForces: 'Land Forces',
            };
            
            const consequences: string[] = [];
            for (const [key, label] of Object.entries(statLabels)) {
              const delta = reportData.statDeltas[key];
              if (delta !== undefined && delta !== 0) {
                consequences.push(`${label}: ${delta > 0 ? '+' : ''}${delta}`);
              }
            }
            
            const consequencesText = consequences.length > 0 
              ? `\n\nConsequences:\n${consequences.join('\n')}`
              : '';
            
            // Create synthetic combat report request
            const combatReportRequest: Request = {
              id: dueEvent.requestId,
              title: 'Battle Report',
              text: `${outcomeText}\n\n${lossesText}${consequencesText}`,
              options: [
                {
                  text: 'Continue',
                  effects: {},
                },
              ],
              advancesTick: false, // Combat report is tickless
            };
            
            return combatReportRequest;
          } catch (error) {
            console.error('Failed to parse combat report data:', error);
            // Return a fallback combat report request
            const fallbackRequest: Request = {
              id: dueEvent.requestId,
              title: 'Battle Report',
              text: 'The battle has ended.',
              options: [
                {
                  text: 'Continue',
                  effects: {},
                },
              ],
              advancesTick: false,
            };
            return fallbackRequest;
          }
        }
        
        const scheduledRequest = [...needRequests, ...infoRequests, ...eventRequests].find(
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
          if (isLockedByRequirements(scheduledRequest)) {
            continue; // Skip this locked scheduled event, try next
          }
          
          return scheduledRequest;
        }
      }
      return null;
    };
    
    // Priority 1a: Process info priority events first
    if (infoEvents.length > 0) {
      const infoRequest = processEvents(infoEvents);
      if (infoRequest) return infoRequest;
    }
    
    // Priority 1b: Process normal priority events
    if (normalEvents.length > 0) {
      const normalRequest = processEvents(normalEvents);
      if (normalRequest) return normalRequest;
    }
    
    // If all scheduled requests exceeded maxTriggers or are locked, fall through to normal logic
  }

  /**
   * Helper function to check if any crisis event is currently eligible
   * Crisis events are prioritized in this order: Fire > Disease > Unrest
   */
  const getEligibleCrisis = (): Request | null => {
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
    return null;
  };

  // Priority 2: Check for due combats and apply "crisis before combat start" rule
  // Find all combats that are due (dueTick <= current tick)
  const dueCombats = (gameState && gameState.scheduledCombats) 
    ? gameState.scheduledCombats.filter(combat => combat.dueTick <= tick)
    : [];
  
  if (dueCombats.length > 0) {
    // Crisis takes priority over combat start
    const eligibleCrisis = getEligibleCrisis();
    if (eligibleCrisis) {
      return eligibleCrisis;
    }
    
    // No crisis eligible: return synthetic combat start request
    // IMPORTANT: Sort by scheduledAtTick for FIFO ordering (earliest scheduled combat first)
    // This ensures multiple parallel combats start in the order they were scheduled,
    // maintaining correct force accounting and preventing race conditions
    dueCombats.sort((a, b) => a.scheduledAtTick - b.scheduledAtTick);
    const firstDueCombat = dueCombats[0];
    
    console.log(`[Combat Selection] Selected combat for start:`, {
      combatId: firstDueCombat.combatId,
      scheduledAtTick: firstDueCombat.scheduledAtTick,
      dueTick: firstDueCombat.dueTick,
      committedForces: firstDueCombat.committedForces,
      totalDueCombats: dueCombats.length,
    });
    
    // Create synthetic request for combat start
    // This synthetic request will be handled by state.ts to activate the combat
    const combatStartRequest: Request = {
      id: `COMBAT_START::${firstDueCombat.combatId}`,
      title: 'Battle Begins',
      text: 'Your forces are ready. The battle is about to commence!',
      options: [
        {
          text: 'Begin Battle',
          effects: {}, // No immediate effects; state.ts will handle combat activation
        },
      ],
      advancesTick: false, // Combat start is tickless, combat resolution advances ticks
    };
    
    return combatStartRequest;
  }

  // Priority 3: Crisis requests by priority order (when no combat is due)
  const crisisRequest = getEligibleCrisis();
  if (crisisRequest) {
    return crisisRequest;
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
           !isLockedByRequirements(r)
  );
  if (availableEvents.length > 0) {
    return availableEvents[rng.nextInt(availableEvents.length)];
  }

  // Fallback: pick any non-crisis event that can trigger randomly and meets requirements (shouldn't happen with 25 events)
  const nonCrisisEvents = eventRequests.filter(
    (r) => !crisisEventIds.includes(r.id) && 
           (r.canTriggerRandomly !== false) && 
           isEligibleForRandomTrigger(r) &&
           !isLockedByRequirements(r)
  );
  
  if (nonCrisisEvents.length === 0) {
    // Emergency fallback: if all eligible events are filtered out by the strict criteria above
    // This should never happen in normal gameplay, but provides a safety net
    console.warn('[pickNextRequest] No eligible events found with strict filters. Using emergency fallback.');
    
    // Try to find ANY non-crisis event (ignoring canTriggerRandomly, maxTriggers, and requirements)
    const anyNonCrisis = eventRequests.filter(r => !crisisEventIds.includes(r.id));
    if (anyNonCrisis.length > 0) {
      console.warn('[pickNextRequest] Returning non-crisis event from emergency fallback:', anyNonCrisis.map(r => r.id));
      return anyNonCrisis[rng.nextInt(anyNonCrisis.length)];
    }
    
    // Absolute last resort: return any event (even crisis events)
    if (eventRequests.length > 0) {
      console.warn('[pickNextRequest] No non-crisis events available. Returning any event from emergency fallback.');
      return eventRequests[rng.nextInt(eventRequests.length)];
    }
    
    // Should never happen - throw error if no events exist at all
    throw new Error('No event requests available in the game');
  }
  
  return nonCrisisEvents[rng.nextInt(nonCrisisEvents.length)];
}
