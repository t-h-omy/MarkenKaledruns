/**
 * Reducer-based state engine for the Proof-of-Fun game.
 * Based on POF_SPEC.md specification.
 */

import type { Stats, Needs, Effect, NeedsTracking, Request } from './models';
import { DECLINE_COOLDOWN_TICKS, NEED_UNLOCK_THRESHOLDS, NEED_CONFIGS, NEED_INFO_REQUEST_MAP } from './models';
import { needRequests, infoRequests, eventRequests } from './requests';
import { pickNextRequest, selectWeightedCandidate, getRandomValue } from './picker';

/**
 * Represents a single applied change to a stat
 */
export interface AppliedChange {
  /** The stat that was changed (e.g., 'gold', 'satisfaction', etc.) */
  stat: string;
  /** The amount of change (can be positive or negative) */
  amount: number;
  /** The source of this change (e.g., 'base', 'modifier:marketplace', etc.) */
  source: string;
  /** Optional note explaining this change */
  note?: string;
}

/**
 * Log entry tracking state changes
 */
export interface LogEntry {
  tick: number;
  requestId: string;
  optionText: string;
  source: 'Request Decision' | 'Tax Income' | 'Population Growth';
  deltas: {
    gold?: number;
    satisfaction?: number;
    health?: number;
    fireRisk?: number;
    farmers?: number;
    landForces?: number;
  };
}

/**
 * Scheduled event to be shown at a future tick
 */
export interface ScheduledEvent {
  /** Tick when this event should be shown */
  targetTick: number;
  /** Request ID to show */
  requestId: string;
  /** Tick when this event was scheduled (for FIFO ordering) */
  scheduledAtTick: number;
  /** Priority of the scheduled event (default: "normal") */
  priority?: "info" | "normal";
}

/**
 * Complete game state
 */
export interface GameState {
  tick: number;
  stats: Stats;
  needs: Needs;
  needsTracking: NeedsTracking;
  newlyUnlockedNeed: keyof Needs | null;
  currentRequestId: string;
  lastRequestId: string;
  log: LogEntry[];
  gameOver: boolean;
  gameOverReason?: string;
  scheduledEvents: ScheduledEvent[];
  /** Track chain status: active means chain has started but not completed */
  chainStatus: Record<string, { active: boolean; completedTick?: number }>;
  /** Track how many times each request has been triggered */
  requestTriggerCounts: Record<string, number>;
  /** Track unlock tokens for event requirements */
  unlocks: Record<string, true>;
}

/**
 * Action types for the state reducer
 */
export type GameAction = {
  type: 'CHOOSE_OPTION';
  optionIndex: number;
};

/**
 * Initial game state with starting values from POF_SPEC.md
 */
export const initialState: GameState = {
  tick: 0,
  stats: {
    gold: 50,
    satisfaction: 60,
    health: 60,
    fireRisk: 20,
    farmers: 20,
    landForces: 5,
  },
  needs: {
    marketplace: false,
    bread: false,
    beer: false,
    firewood: false,
    well: false,
  },
  needsTracking: {
    marketplace: { buildingCount: 0, nextEligibleTick: 0 },
    bread: { buildingCount: 0, nextEligibleTick: 0 },
    beer: { buildingCount: 0, nextEligibleTick: 0 },
    firewood: { buildingCount: 0, nextEligibleTick: 0 },
    well: { buildingCount: 0, nextEligibleTick: 0 },
  },
  newlyUnlockedNeed: null,
  currentRequestId: '',
  lastRequestId: '',
  log: [],
  gameOver: false,
  scheduledEvents: [],
  chainStatus: {},
  requestTriggerCounts: {},
  unlocks: {},
};

/**
 * Clamps a value between min and max
 */
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Clamps stats according to game rules
 * Gold minimum is -50 (bankruptcy threshold)
 */
function clampStats(stats: Stats): Stats {
  return {
    ...stats,
    satisfaction: clamp(stats.satisfaction, 0, 100),
    health: clamp(stats.health, 0, 100),
    fireRisk: clamp(stats.fireRisk, 0, 100),
    gold: Math.max(-50, stats.gold),
    farmers: Math.max(0, stats.farmers),
    landForces: Math.max(0, stats.landForces),
  };
}

/**
 * Applies effects from an option to the current state
 */
function applyEffects(stats: Stats, needs: Needs, effects: Effect): { stats: Stats; needs: Needs } {
  const newStats = { ...stats };
  const newNeeds = { ...needs };

  // Apply stat changes
  if (effects.gold !== undefined) newStats.gold += effects.gold;
  if (effects.satisfaction !== undefined) newStats.satisfaction += effects.satisfaction;
  if (effects.health !== undefined) newStats.health += effects.health;
  if (effects.fireRisk !== undefined) newStats.fireRisk += effects.fireRisk;
  if (effects.farmers !== undefined) newStats.farmers += effects.farmers;
  if (effects.landForces !== undefined) newStats.landForces += effects.landForces;

  // Apply need flags
  if (effects.marketplace !== undefined) newNeeds.marketplace = effects.marketplace;
  if (effects.bread !== undefined) newNeeds.bread = effects.bread;
  if (effects.beer !== undefined) newNeeds.beer = effects.beer;
  if (effects.firewood !== undefined) newNeeds.firewood = effects.firewood;
  if (effects.well !== undefined) newNeeds.well = effects.well;

  return { stats: newStats, needs: newNeeds };
}

/**
 * Type for modifier hook function
 * Modifiers can inspect and alter the delta, add extra changes, or add notes
 */
export type ModifierHook = (
  state: GameState,
  request: Request,
  optionIndex: number,
  baseDelta: Effect,
  changes: AppliedChange[]
) => { delta: Effect; extraChanges: AppliedChange[] };

/**
 * Applies an option's effects with modifier hooks
 * This is the main entry point for effect application with the modification pipeline
 * 
 * @param state Current game state
 * @param request The request being responded to
 * @param optionIndex The chosen option index
 * @param modifiers Array of modifier hooks to run (currently empty, for future use)
 * @returns Object with updated stats, needs, and list of all applied changes
 */
export function applyOptionWithModifiers(
  state: GameState,
  request: Request,
  optionIndex: number,
  modifiers: ModifierHook[] = []
): { stats: Stats; needs: Needs; appliedChanges: AppliedChange[] } {
  const option = request.options[optionIndex];
  
  // 1. Compute base delta from option
  let delta = { ...option.effects };
  const appliedChanges: AppliedChange[] = [];
  
  // 2. Run modifier hooks (currently empty)
  for (const modifier of modifiers) {
    const result = modifier(state, request, optionIndex, delta, appliedChanges);
    delta = result.delta;
    appliedChanges.push(...result.extraChanges);
  }
  
  // 3. Apply final delta to stats
  const { stats: statsAfterEffects, needs } = applyEffects(state.stats, state.needs, delta);
  
  // Record base changes from the delta
  const statKeys: Array<keyof Stats> = ['gold', 'satisfaction', 'health', 'fireRisk', 'farmers', 'landForces'];
  for (const key of statKeys) {
    if (delta[key] !== undefined && delta[key] !== 0) {
      appliedChanges.push({
        stat: key,
        amount: delta[key]!,
        source: 'base',
      });
    }
  }
  
  // 4. Apply clamping
  const stats = clampStats(statsAfterEffects);
  
  return { stats, needs, appliedChanges };
}

/**
 * Checks if a need is unlocked based on farmer population
 */
export function isNeedUnlocked(needKey: keyof Needs, farmers: number): boolean {
  const unlockThreshold = NEED_UNLOCK_THRESHOLDS[needKey];
  return farmers >= unlockThreshold;
}

/**
 * Calculates the number of buildings required for a need based on population
 * Formula:
 * - If farmers < unlockThreshold: requiredBuildings = 0
 * - Else: requiredBuildings = 1 + floor((farmers - unlockThreshold) / populationPerBuilding)
 */
export function calculateRequiredBuildings(needKey: keyof Needs, farmers: number): number {
  const config = NEED_CONFIGS[needKey];
  
  if (farmers < config.unlockThreshold) {
    return 0; // Not unlocked yet
  }
  
  return 1 + Math.floor((farmers - config.unlockThreshold) / config.populationPerBuilding);
}

/**
 * Checks if a need is currently required (more buildings needed)
 */
export function isNeedRequired(
  needKey: keyof Needs,
  farmers: number,
  buildingCount: number
): boolean {
  const requiredBuildings = calculateRequiredBuildings(needKey, farmers);
  return buildingCount < requiredBuildings;
}

/**
 * Checks if a need is on cooldown
 */
export function isNeedOnCooldown(tick: number, nextEligibleTick: number): boolean {
  return tick < nextEligibleTick;
}

/**
 * Detects newly unlocked needs by comparing farmers before and after
 */
export function detectNewlyUnlockedNeeds(
  farmersBefore: number,
  farmersAfter: number,
  needs: Needs
): keyof Needs | null {
  const needKeys: Array<keyof Needs> = ['marketplace', 'bread', 'beer', 'firewood', 'well'];
  
  for (const needKey of needKeys) {
    // Skip if already fulfilled (legacy boolean flag)
    if (needs[needKey]) {
      continue;
    }
    
    const wasUnlocked = isNeedUnlocked(needKey, farmersBefore);
    const isUnlocked = isNeedUnlocked(needKey, farmersAfter);
    
    if (!wasUnlocked && isUnlocked) {
      return needKey; // This need just unlocked
    }
  }
  
  return null;
}

/**
 * Checks if a specific unlock token is present in the game state
 */
export function hasUnlock(state: GameState, token: string): boolean {
  return state.unlocks[token] === true;
}

/**
 * Checks if all required unlock tokens for a request are present in the game state
 */
export function meetsRequirements(state: GameState, request: Request): boolean {
  // If no requirements, the request is always available
  if (!request.requires || request.requires.length === 0) {
    return true;
  }
  
  // All required tokens must be present
  return request.requires.every(token => hasUnlock(state, token));
}

/**
 * Synchronizes need-based unlock tokens with the current needs state.
 * Sets tokens for fulfilled needs, removes tokens for unfulfilled needs.
 * Currently syncs: "need:marketplace" and "need:beer"
 */
export function syncNeedUnlockTokens(needs: Needs, unlocks: Record<string, true>): Record<string, true> {
  const newUnlocks = { ...unlocks };
  
  // Sync marketplace need token
  if (needs.marketplace) {
    newUnlocks['need:marketplace'] = true;
  } else {
    delete newUnlocks['need:marketplace'];
  }
  
  // Sync beer need token
  if (needs.beer) {
    newUnlocks['need:beer'] = true;
  } else {
    delete newUnlocks['need:beer'];
  }
  
  return newUnlocks;
}

/**
 * Applies baseline rules according to POF_SPEC.md:
 * - gold += floor(0.1 * (farmers * (satisfaction / 100)))
 * - farmers += floor(health / 10)
 */
function applyBaseline(stats: Stats): Stats {
  const goldIncome = Math.floor(0.1 * (stats.farmers * ((stats.satisfaction-10) / 100)));
  const farmerGrowth = Math.floor((stats.health-25) / 20);

  return {
    ...stats,
    gold: stats.gold + goldIncome,
    farmers: stats.farmers + farmerGrowth,
  };
}



/**
 * Creates a log entry with deltas
 */
function createLogEntry(
  tick: number,
  requestId: string,
  optionText: string,
  source: LogEntry['source'],
  beforeStats: Stats,
  afterStats: Stats
): LogEntry {
  const deltas: LogEntry['deltas'] = {};

  if (afterStats.gold !== beforeStats.gold) {
    deltas.gold = afterStats.gold - beforeStats.gold;
  }
  if (afterStats.satisfaction !== beforeStats.satisfaction) {
    deltas.satisfaction = afterStats.satisfaction - beforeStats.satisfaction;
  }
  if (afterStats.health !== beforeStats.health) {
    deltas.health = afterStats.health - beforeStats.health;
  }
  if (afterStats.fireRisk !== beforeStats.fireRisk) {
    deltas.fireRisk = afterStats.fireRisk - beforeStats.fireRisk;
  }
  if (afterStats.farmers !== beforeStats.farmers) {
    deltas.farmers = afterStats.farmers - beforeStats.farmers;
  }
  if (afterStats.landForces !== beforeStats.landForces) {
    deltas.landForces = afterStats.landForces - beforeStats.landForces;
  }

  return {
    tick,
    requestId,
    optionText,
    source,
    deltas,
  };
}

/**
 * Schedules follow-up events based on the chosen option
 * @returns Updated scheduled events array
 */
function scheduleFollowUps(
  currentRequest: { id: string; followUps?: Array<{ triggerOnOptionIndex: number; delayMinTicks: number; delayMaxTicks: number; candidates: Array<{ requestId: string; weight: number }> }> },
  optionIndex: number,
  currentTick: number,
  existingScheduledEvents: ScheduledEvent[]
): ScheduledEvent[] {
  const scheduledEvents = [...existingScheduledEvents];
  
  if (!currentRequest.followUps) {
    return scheduledEvents;
  }

  // Find follow-ups triggered by this option
  const triggeredFollowUps = currentRequest.followUps.filter(
    fu => fu.triggerOnOptionIndex === optionIndex
  );

  for (const followUp of triggeredFollowUps) {
    // Select one candidate using weighted random selection
    const selectedCandidate = selectWeightedCandidate(followUp.candidates);
    
    if (selectedCandidate) {
      // Calculate random delay within the specified range
      const delayRange = followUp.delayMaxTicks - followUp.delayMinTicks;
      const delay = followUp.delayMinTicks + Math.floor(getRandomValue() * (delayRange + 1));
      
      // Schedule the event
      scheduledEvents.push({
        targetTick: currentTick + 1 + delay,
        requestId: selectedCandidate.requestId,
        scheduledAtTick: currentTick,
      });
    }
  }

  return scheduledEvents;
}

/**
 * Removes a scheduled event from the queue and returns updated array
 */
function removeScheduledEvent(
  scheduledEvents: ScheduledEvent[],
  requestId: string,
  tick: number
): ScheduledEvent[] {
  // Find the first matching event that's due
  const index = scheduledEvents.findIndex(
    event => event.requestId === requestId && event.targetTick <= tick
  );
  
  if (index >= 0) {
    return [...scheduledEvents.slice(0, index), ...scheduledEvents.slice(index + 1)];
  }
  
  return scheduledEvents;
}

/**
 * Main reducer function for game state
 */
export function gameReducer(state: GameState, action: GameAction): GameState {
  if (action.type === 'CHOOSE_OPTION') {
    // Prevent actions when game is over
    if (state.gameOver) {
      return state;
    }

    // Find the current request
    const currentRequest = [...needRequests, ...infoRequests, ...eventRequests].find(
      (r) => r.id === state.currentRequestId
    );

    if (!currentRequest) {
      console.error('Current request not found:', state.currentRequestId);
      return state;
    }

    const option = currentRequest.options[action.optionIndex];
    if (!option) {
      console.error('Invalid option index:', action.optionIndex);
      return state;
    }

    // Store stats before changes for log
    const beforeStats = { ...state.stats };
    const newLog: LogEntry[] = [];

    // 1. Apply option effects using the new pipeline
    const { stats: statsFromPipeline, needs, appliedChanges } = applyOptionWithModifiers(state, currentRequest, action.optionIndex);
    let stats = statsFromPipeline;

    // Sync need-based unlock tokens with current needs state
    let unlocks = syncNeedUnlockTokens(needs, state.unlocks);

    // Track need fulfillment and cooldowns
    const needsTracking = { ...state.needsTracking };
    
    // Track chain state and request trigger counts
    const chainStatus = { ...state.chainStatus };
    const requestTriggerCounts = { ...state.requestTriggerCounts };
    
    // Increment trigger count for current request
    requestTriggerCounts[state.currentRequestId] = (requestTriggerCounts[state.currentRequestId] || 0) + 1;
    
    // Update chain status based on chainRole
    if (currentRequest.chainId && currentRequest.chainRole) {
      if (currentRequest.chainRole === 'start') {
        // Mark chain as active when started
        chainStatus[currentRequest.chainId] = { active: true };
      } else if (currentRequest.chainRole === 'end') {
        // Mark chain as completed (inactive) when ended
        chainStatus[currentRequest.chainId] = { active: false, completedTick: state.tick };
      }
    }
    
    // Determine which need this request relates to (if any)
    const needIdMap: Record<string, keyof Needs> = {
      'NEED_MARKETPLACE': 'marketplace',
      'NEED_BREAD': 'bread',
      'NEED_BEER': 'beer',
      'NEED_FIREWOOD': 'firewood',
      'NEED_WELL': 'well',
    };
    
    const needKey = needIdMap[state.currentRequestId];
    let needFulfilledThisTick = false;
    let needFulfilledKey: keyof Needs | null = null;
    
    if (needKey) {
      // Check if this option fulfills the need
      const fulfillsNeed = option.effects[needKey] === true;
      
      if (fulfillsNeed) {
        // Calculate required buildings before incrementing
        const oldBuildingCount = needsTracking[needKey].buildingCount;
        const requiredBuildings = calculateRequiredBuildings(needKey, stats.farmers);
        const wasFulfilled = oldBuildingCount >= requiredBuildings;
        
        // Increment building count (persistent, never decreases)
        const newBuildingCount = oldBuildingCount + 1;
        needsTracking[needKey] = {
          ...needsTracking[needKey],
          buildingCount: newBuildingCount,
        };
        
        // Detect rising edge: was not fulfilled, now is fulfilled
        const isFulfilled = newBuildingCount >= requiredBuildings;
        if (!wasFulfilled && isFulfilled) {
          needFulfilledThisTick = true;
          needFulfilledKey = needKey;
        }
      } else {
        // Declined the need - set cooldown
        needsTracking[needKey] = {
          ...needsTracking[needKey],
          nextEligibleTick: state.tick + 1 + DECLINE_COOLDOWN_TICKS,
        };
      }
    }

    // Create log entry for request decision
    const requestLogEntry = createLogEntry(
      state.tick,
      state.currentRequestId,
      option.text,
      'Request Decision',
      beforeStats,
      stats
    );
    if (Object.keys(requestLogEntry.deltas).length > 0) {
      newLog.push(requestLogEntry);
    }

    // Schedule follow-up events if any are triggered by this option
    let scheduledEvents = scheduleFollowUps(
      currentRequest,
      action.optionIndex,
      state.tick,
      state.scheduledEvents
    );

    // Remove the current request from scheduled events if it was scheduled
    scheduledEvents = removeScheduledEvent(scheduledEvents, state.currentRequestId, state.tick);
    
    // If a need was fulfilled this tick, schedule the corresponding info request
    // Only schedule on FIRST fulfillment (buildingCount === 1)
    if (needFulfilledThisTick && needFulfilledKey) {
      const newBuildingCount = needsTracking[needFulfilledKey].buildingCount;
      
      // Only schedule info request for first fulfillment
      if (newBuildingCount === 1) {
        const infoRequestId = NEED_INFO_REQUEST_MAP[needFulfilledKey];
        
        // Only schedule if info request ID exists and isn't already scheduled for next tick
        if (infoRequestId) {
          const alreadyScheduled = scheduledEvents.some(
            event => event.requestId === infoRequestId && event.targetTick === state.tick + 1
          );
          
          if (!alreadyScheduled) {
            scheduledEvents.push({
              targetTick: state.tick + 1,
              requestId: infoRequestId,
              scheduledAtTick: state.tick,
              priority: "info",
            });
          }
        }
      }
    }

    // Check for bankruptcy after option effects (before baseline)
    // This prevents players from escaping bankruptcy via positive baseline income
    if (stats.gold <= -50) {
      return {
        tick: state.tick + 1,
        stats,
        needs,
        needsTracking,
        newlyUnlockedNeed: null,
        currentRequestId: state.currentRequestId,
        lastRequestId: state.currentRequestId,
        log: [...state.log, ...newLog],
        gameOver: true,
        gameOverReason: 'Bankruptcy! Your gold has reached -50 or below.',
        scheduledEvents,
        chainStatus,
        requestTriggerCounts,
        unlocks,
      };
    }

    // 2. Apply baseline rules and track separately
    const beforeBaseline = { ...stats };
    const farmersBefore = stats.farmers;
    stats = applyBaseline(stats);
    stats = clampStats(stats);
    const farmersAfter = stats.farmers;

    // Detect newly unlocked needs
    const newlyUnlockedNeed = detectNewlyUnlockedNeeds(farmersBefore, farmersAfter, needs);

    // Create separate log entries for tax income and population growth
    const goldIncome = stats.gold - beforeBaseline.gold;
    const farmerGrowth = stats.farmers - beforeBaseline.farmers;

    if (goldIncome !== 0) {
      newLog.push(createLogEntry(
        state.tick,
        state.currentRequestId,
        '',
        'Tax Income',
        beforeBaseline,
        { ...beforeBaseline, gold: stats.gold }
      ));
    }

    if (farmerGrowth !== 0) {
      newLog.push(createLogEntry(
        state.tick,
        state.currentRequestId,
        '',
        'Population Growth',
        { ...beforeBaseline, gold: stats.gold },
        stats
      ));
    }

    // 3. Check for game over condition
    if (stats.gold <= -50) {
      return {
        tick: state.tick + 1,
        stats,
        needs,
        needsTracking,
        newlyUnlockedNeed,
        currentRequestId: state.currentRequestId,
        lastRequestId: state.currentRequestId,
        log: [...state.log, ...newLog],
        gameOver: true,
        gameOverReason: 'Bankruptcy! Your gold has reached -50 or below.',
        scheduledEvents,
        chainStatus,
        requestTriggerCounts,
        unlocks,
      };
    }

    // 4. Pick next request (passing needs tracking for cooldown check)
    const nextRequest = pickNextRequest({
      tick: state.tick + 1,
      stats,
      needs,
      needsTracking,
      newlyUnlockedNeed,
      currentRequestId: state.currentRequestId,
      lastRequestId: state.currentRequestId,
      log: state.log,
      gameOver: false,
      scheduledEvents,
      chainStatus,
      requestTriggerCounts,
      unlocks,
    });

    // 5. Increment tick and update state
    return {
      tick: state.tick + 1,
      stats,
      needs,
      needsTracking,
      newlyUnlockedNeed,
      currentRequestId: nextRequest.id,
      lastRequestId: state.currentRequestId,
      log: [...state.log, ...newLog],
      gameOver: false,
      scheduledEvents,
      chainStatus,
      requestTriggerCounts,
      unlocks,
    };
  }

  return state;
}

/**
 * Initialize the game with the first request
 */
export function initializeGame(): GameState {
  const firstRequest = pickNextRequest(initialState);
  return {
    ...initialState,
    currentRequestId: firstRequest.id,
  };
}
