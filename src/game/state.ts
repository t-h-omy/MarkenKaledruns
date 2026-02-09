/**
 * Reducer-based state engine for the Proof-of-Fun game.
 * Based on POF_SPEC.md specification.
 */

import type { Stats, Needs, Effect, NeedsTracking, Request, FollowUp } from './models';
import { DECLINE_COOLDOWN_TICKS, NEED_UNLOCK_THRESHOLDS, NEED_CONFIGS, NEED_INFO_REQUEST_MAP } from './models';
import { needRequests, infoRequests, eventRequests } from './requests';
import { pickNextRequest, selectWeightedCandidate, getRandomValue } from './picker';
import { needModifiers } from './modifiers';

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
  source: 'Request Decision' | 'Tax Income' | 'Population Growth' | 'Combat Commit';
  deltas: {
    gold?: number;
    satisfaction?: number;
    health?: number;
    fireRisk?: number;
    farmers?: number;
    landForces?: number;
  };
  /** Applied changes from modifiers or need effects */
  appliedChanges?: AppliedChange[];
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
 * Scheduled combat to occur at a future tick
 */
export interface ScheduledCombat {
  /** Unique identifier for this combat instance */
  combatId: string;
  /** ID of the request that triggered this combat */
  originRequestId: string;
  /** Tick when combat should start */
  dueTick: number;
  /** Tick when this combat was scheduled (for FIFO ordering) */
  scheduledAtTick: number;
  /** Number of enemy forces */
  enemyForces: number;
  /** Number of committed player forces (reserved for this combat) */
  committedForces: number;
  /** Effects applied when combat is won */
  onWin?: Effect;
  /** Effects applied when combat is lost */
  onLose?: Effect;
  /** Follow-up events triggered on win */
  followUpsOnWin?: FollowUp[];
  /** Follow-up events triggered on lose */
  followUpsOnLose?: FollowUp[];
}

/**
 * Active combat currently in progress
 */
export interface ActiveCombat {
  /** Unique identifier for this combat instance */
  combatId: string;
  /** ID of the request that triggered this combat */
  originRequestId: string;
  /** Remaining enemy forces */
  enemyRemaining: number;
  /** Remaining committed player forces */
  committedRemaining: number;
  /** Current round number */
  round: number;
  /** Results from the last combat round */
  lastRound?: { playerLosses: number; enemyLosses: number };
  /** Effects applied when combat is won */
  onWin?: Effect;
  /** Effects applied when combat is lost */
  onLose?: Effect;
  /** Follow-up events triggered on win */
  followUpsOnWin?: FollowUp[];
  /** Follow-up events triggered on lose */
  followUpsOnLose?: FollowUp[];
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
  /** Scheduled combats to occur at future ticks */
  scheduledCombats: ScheduledCombat[];
  /** Active combat currently in progress */
  activeCombat?: ActiveCombat;
}

/**
 * Action types for the state reducer
 */
export type GameAction = {
  type: 'CHOOSE_OPTION';
  optionIndex: number;
  /** Optional number of land forces to commit to combat (only used for combat requests) */
  combatCommit?: number;
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
  scheduledCombats: [],
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
  afterStats: Stats,
  appliedChanges?: AppliedChange[]
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
    appliedChanges,
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

    // Check if this is a synthetic COMBAT_START request
    const isCombatStart = state.currentRequestId.startsWith('COMBAT_START::');
    
    if (isCombatStart) {
      // Extract combat ID from synthetic request ID
      const combatId = state.currentRequestId.replace('COMBAT_START::', '');
      
      // Find the scheduled combat
      const scheduledCombat = state.scheduledCombats.find(c => c.combatId === combatId);
      
      if (!scheduledCombat) {
        console.error('Combat start failed: scheduled combat not found for ID:', combatId, '. Maintaining current state.');
        return state;
      }
      
      // Move scheduled combat to active combat
      const activeCombat: ActiveCombat = {
        combatId: scheduledCombat.combatId,
        originRequestId: scheduledCombat.originRequestId,
        enemyRemaining: scheduledCombat.enemyForces,
        committedRemaining: scheduledCombat.committedForces,
        round: 0,
        onWin: scheduledCombat.onWin,
        onLose: scheduledCombat.onLose,
        followUpsOnWin: scheduledCombat.followUpsOnWin,
        followUpsOnLose: scheduledCombat.followUpsOnLose,
      };
      
      // Remove from scheduled combats
      const updatedScheduledCombats = state.scheduledCombats.filter(c => c.combatId !== combatId);
      
      // Pick next request with the same tick (combat start is tickless)
      const nextRequest = pickNextRequest({
        ...state,
        tick: state.tick,
        activeCombat,
        scheduledCombats: updatedScheduledCombats,
      });
      
      // Return updated state with active combat
      return {
        ...state,
        currentRequestId: nextRequest.id,
        lastRequestId: state.currentRequestId,
        activeCombat,
        scheduledCombats: updatedScheduledCombats,
      };
    }
    
    // Check if this is a synthetic COMBAT_ROUND request
    const isCombatRound = state.currentRequestId.startsWith('COMBAT_ROUND::');
    
    if (isCombatRound) {
      // Extract combat ID from synthetic request ID
      const combatId = state.currentRequestId.replace('COMBAT_ROUND::', '');
      
      // Verify we have an active combat
      if (!state.activeCombat || state.activeCombat.combatId !== combatId) {
        console.error('Combat round failed: no matching active combat for ID:', combatId, '. Maintaining current state.');
        return state;
      }
      
      const combat = state.activeCombat;
      
      // Option B (index 1) = Withdraw = immediate lose
      if (action.optionIndex === 1) {
        // Withdraw = lose
        let stats = { ...state.stats };
        let needs = { ...state.needs };
        const scheduledEvents = [...state.scheduledEvents];
        
        // Apply lose effects if any
        if (combat.onLose) {
          const result = applyEffects(stats, needs, combat.onLose);
          stats = result.stats;
          needs = result.needs;
        }
        
        // Clamp stats
        stats = clampStats(stats);
        
        // Schedule follow-up events on lose if any
        if (combat.followUpsOnLose) {
          for (const followUp of combat.followUpsOnLose) {
            const selectedCandidate = selectWeightedCandidate(followUp.candidates);
            if (selectedCandidate) {
              const delayRange = followUp.delayMaxTicks - followUp.delayMinTicks;
              const delay = followUp.delayMinTicks + Math.floor(getRandomValue() * (delayRange + 1));
              scheduledEvents.push({
                targetTick: state.tick + 1 + delay,
                requestId: selectedCandidate.requestId,
                scheduledAtTick: state.tick,
              });
            }
          }
        }
        
        // Clear active combat
        // Pick next request (tickless)
        const nextRequest = pickNextRequest({
          ...state,
          tick: state.tick,
          stats,
          needs,
          activeCombat: undefined,
          scheduledEvents,
        });
        
        return {
          ...state,
          tick: state.tick, // Same tick - combat is tickless
          stats,
          needs,
          currentRequestId: nextRequest.id,
          lastRequestId: state.currentRequestId,
          activeCombat: undefined,
          scheduledEvents,
        };
      }
      
      // Option A (index 0) = Fight = resolve one combat round
      // Combat resolution logic:
      // 1. M = min(committedRemaining, enemyRemaining)
      // 2. Each side has M forces in direct combat, extras distributed evenly
      // 3. Each force rolls 1d6, take max per side in each match
      // 4. Compare max rolls; loser loses 1 force; tie = no loss
      
      const M = Math.min(combat.committedRemaining, combat.enemyRemaining);
      let playerLosses = 0;
      let enemyLosses = 0;
      
      // Resolve M matches
      for (let i = 0; i < M; i++) {
        // Roll 1d6 for player and enemy
        const playerRoll = Math.floor(getRandomValue() * 6) + 1;
        const enemyRoll = Math.floor(getRandomValue() * 6) + 1;
        
        if (playerRoll > enemyRoll) {
          enemyLosses++;
        } else if (enemyRoll > playerRoll) {
          playerLosses++;
        }
        // Tie = no loss
      }
      
      // Update combat state
      const newCommittedRemaining = combat.committedRemaining - playerLosses;
      const newEnemyRemaining = combat.enemyRemaining - enemyLosses;
      
      // Check for combat end conditions
      let combatEnded = false;
      let playerWon = false;
      
      if (newCommittedRemaining <= 0 && newEnemyRemaining <= 0) {
        // Both sides eliminated - player loses (conservative)
        combatEnded = true;
        playerWon = false;
      } else if (newCommittedRemaining <= 0) {
        // Player forces eliminated - lose
        combatEnded = true;
        playerWon = false;
      } else if (newEnemyRemaining <= 0) {
        // Enemy forces eliminated - win
        combatEnded = true;
        playerWon = true;
      }
      
      if (combatEnded) {
        // Combat is over - apply win/lose effects
        let stats = { ...state.stats };
        let needs = { ...state.needs };
        const scheduledEvents = [...state.scheduledEvents];
        
        if (playerWon) {
          // Return surviving forces to player
          stats.landForces += newCommittedRemaining;
          
          // Apply win effects if any
          if (combat.onWin) {
            const result = applyEffects(stats, needs, combat.onWin);
            stats = result.stats;
            needs = result.needs;
          }
          
          // Schedule follow-up events on win if any
          if (combat.followUpsOnWin) {
            for (const followUp of combat.followUpsOnWin) {
              const selectedCandidate = selectWeightedCandidate(followUp.candidates);
              if (selectedCandidate) {
                const delayRange = followUp.delayMaxTicks - followUp.delayMinTicks;
                const delay = followUp.delayMinTicks + Math.floor(getRandomValue() * (delayRange + 1));
                scheduledEvents.push({
                  targetTick: state.tick + 1 + delay,
                  requestId: selectedCandidate.requestId,
                  scheduledAtTick: state.tick,
                });
              }
            }
          }
        } else {
          // Player lost - no forces returned
          
          // Apply lose effects if any
          if (combat.onLose) {
            const result = applyEffects(stats, needs, combat.onLose);
            stats = result.stats;
            needs = result.needs;
          }
          
          // Schedule follow-up events on lose if any
          if (combat.followUpsOnLose) {
            for (const followUp of combat.followUpsOnLose) {
              const selectedCandidate = selectWeightedCandidate(followUp.candidates);
              if (selectedCandidate) {
                const delayRange = followUp.delayMaxTicks - followUp.delayMinTicks;
                const delay = followUp.delayMinTicks + Math.floor(getRandomValue() * (delayRange + 1));
                scheduledEvents.push({
                  targetTick: state.tick + 1 + delay,
                  requestId: selectedCandidate.requestId,
                  scheduledAtTick: state.tick,
                });
              }
            }
          }
        }
        
        // Clamp stats
        stats = clampStats(stats);
        
        // Clear active combat and pick next request (tickless)
        const nextRequest = pickNextRequest({
          ...state,
          tick: state.tick,
          stats,
          needs,
          activeCombat: undefined,
          scheduledEvents,
        });
        
        return {
          ...state,
          tick: state.tick, // Same tick - combat is tickless
          stats,
          needs,
          currentRequestId: nextRequest.id,
          lastRequestId: state.currentRequestId,
          activeCombat: undefined,
          scheduledEvents,
        };
      } else {
        // Combat continues - update active combat state
        const updatedCombat: ActiveCombat = {
          ...combat,
          committedRemaining: newCommittedRemaining,
          enemyRemaining: newEnemyRemaining,
          round: combat.round + 1,
          lastRound: {
            playerLosses,
            enemyLosses,
          },
        };
        
        // Pick next request (should be another combat round, tickless)
        const nextRequest = pickNextRequest({
          ...state,
          tick: state.tick,
          activeCombat: updatedCombat,
        });
        
        return {
          ...state,
          tick: state.tick, // Same tick - combat is tickless
          currentRequestId: nextRequest.id,
          lastRequestId: state.currentRequestId,
          activeCombat: updatedCombat,
        };
      }
    }
    
    // Find the current request (non-synthetic)
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

    // Handle combat commit for Option A (fight) when combat exists
    const scheduledCombats = [...state.scheduledCombats];
    let stats = { ...state.stats };
    let needs = { ...state.needs };
    let appliedChanges: AppliedChange[] = [];
    
    if (currentRequest.combat && action.optionIndex === 0) {
      // Option A = fight for combat requests
      const combatCommit = action.combatCommit;
      
      // Validate combatCommit
      if (!combatCommit || combatCommit < 1 || combatCommit > state.stats.landForces) {
        console.error('Invalid combatCommit:', combatCommit, 'Available forces:', state.stats.landForces);
        return state; // Invalid commit, abort
      }
      
      // Immediately reserve forces by subtracting from available landForces
      stats.landForces = state.stats.landForces - combatCommit;
      
      // Calculate random delay for combat start
      const { prepDelayMinTicks, prepDelayMaxTicks } = currentRequest.combat;
      const delayRange = prepDelayMaxTicks - prepDelayMinTicks;
      const delay = prepDelayMinTicks + Math.floor(getRandomValue() * (delayRange + 1));
      const dueTick = state.tick + delay;
      
      // Generate unique combat ID
      const combatId = `${currentRequest.id}-${state.tick}-${Date.now()}`;
      
      // Create scheduled combat entry
      const newScheduledCombat = {
        combatId,
        originRequestId: currentRequest.id,
        dueTick,
        scheduledAtTick: state.tick,
        enemyForces: currentRequest.combat.enemyForces,
        committedForces: combatCommit,
        onWin: currentRequest.combat.onWin,
        onLose: currentRequest.combat.onLose,
        followUpsOnWin: currentRequest.combat.followUpsOnWin,
        followUpsOnLose: currentRequest.combat.followUpsOnLose,
      };
      
      scheduledCombats.push(newScheduledCombat);
      
      // Add log entry for combat commitment
      newLog.push({
        tick: state.tick,
        requestId: currentRequest.id,
        optionText: option.text,
        source: 'Combat Commit',
        deltas: {
          landForces: -combatCommit,
        },
      });
      
      // For combat commits, we don't apply the normal option effects
      // The combat resolution will apply onWin or onLose effects later
      needs = state.needs;
    } else {
      // Normal path: Apply option effects using the pipeline
      // Use need modifiers for event requests (not for need or info requests)
      const isEventRequest = eventRequests.some(r => r.id === state.currentRequestId);
      const modifiersToUse = isEventRequest ? needModifiers : [];
      const result = applyOptionWithModifiers(
        state, 
        currentRequest, 
        action.optionIndex,
        modifiersToUse
      );
      stats = result.stats;
      needs = result.needs;
      appliedChanges = result.appliedChanges;
    }

    // Sync need-based unlock tokens with current needs state
    const unlocks = syncNeedUnlockTokens(needs, state.unlocks);

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

    // Create log entry for request decision (skip for combat commits as they have their own log)
    if (!(currentRequest.combat && action.optionIndex === 0)) {
      // Filter appliedChanges to only include need modifiers (not base effects)
      const needModifierChanges = appliedChanges.filter(change => 
        change.source.startsWith('need:')
      );
      
      const requestLogEntry = createLogEntry(
        state.tick,
        state.currentRequestId,
        option.text,
        'Request Decision',
        beforeStats,
        stats,
        needModifierChanges.length > 0 ? needModifierChanges : undefined
      );
      if (Object.keys(requestLogEntry.deltas).length > 0) {
        newLog.push(requestLogEntry);
      }
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
        scheduledCombats,
      };
    }

    // Check if this is a tickless request (e.g., info requests)
    if (currentRequest.advancesTick === false) {
      // Tickless path: no baseline, no tick increment
      // Pick next request using the SAME tick
      const nextRequest = pickNextRequest({
        tick: state.tick,
        stats,
        needs,
        needsTracking,
        newlyUnlockedNeed: null,
        currentRequestId: state.currentRequestId,
        lastRequestId: state.currentRequestId,
        log: state.log,
        gameOver: false,
        scheduledEvents,
        chainStatus,
        requestTriggerCounts,
        unlocks,
        scheduledCombats,
      });

      // Return state with same tick, updated stats/needs/unlocks/log, new request
      return {
        tick: state.tick, // Same tick
        stats,
        needs,
        needsTracking,
        newlyUnlockedNeed: null,
        currentRequestId: nextRequest.id,
        lastRequestId: state.currentRequestId,
        log: [...state.log, ...newLog],
        gameOver: false,
        scheduledEvents, // Keep as-is, no time advancement
        chainStatus,
        requestTriggerCounts,
        unlocks,
        scheduledCombats,
      };
    }

    // Normal path: advance tick
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

    // 2b. Apply bread need effect (10% chance for +1 farmer growth)
    if (needs.bread && Math.random() < 0.10) {
      const beforeBread = { ...stats };
      stats.farmers += 1;
      stats = clampStats(stats);
      
      // Log the bread need effect if it actually increased farmers
      if (stats.farmers > beforeBread.farmers) {
        const breadChange: AppliedChange = {
          stat: 'farmers',
          amount: 1,
          source: 'need:bread',
          note: 'Bread supply boosted population growth',
        };
        
        newLog.push(createLogEntry(
          state.tick,
          state.currentRequestId,
          '',
          'Population Growth',
          beforeBread,
          stats,
          [breadChange] // Include the bread effect as an applied change
        ));
      }
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
        scheduledCombats,
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
      scheduledCombats,
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
      scheduledCombats,
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
