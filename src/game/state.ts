/**
 * Reducer-based state engine for the Proof-of-Fun game.
 * Based on POF_SPEC.md specification.
 */

import type { Stats, Effect, Request, FollowUp, AuthorityCheck, AuthorityCheckResult, WeightedCandidate, AuthorityFollowUpBoost, FireState, FireIncidentSlotState, FireSystemConfig } from './models';
import { infoRequests, authorityInfoRequests, eventRequests, fireChainRequests } from './requests';
import { pickNextRequest, selectWeightedCandidate, getRandomValue, resetRandom } from './picker';
import { needModifiers } from './modifiers';
import type { BuildingTracking } from './buildings';
import { BUILDING_DEFINITIONS, BUILDING_UNLOCK_GROUPS, isBuildingActive, calculateRequiredBuildings, getBuildingDef, createInitialBuildingTracking, hasAnyBuildingState, getEffectiveBuildingCount, FARMERS_PER_FARMSTEAD } from './buildings';
import { isDistrictComplete, getDistrictDef } from './districts';

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
  source: 'Request Decision' | 'Tax Income' | 'Population Growth' | 'Combat Commit' | 'Overcrowding' | 'Building Constructed' | 'Construction Started' | 'Construction Complete';
  deltas: {
    gold?: number;
    satisfaction?: number;
    health?: number;
    fireRisk?: number;
    farmers?: number;
    landForces?: number;
    authority?: number;
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
  priority?: "info" | "fire" | "normal";
  /** 
   * Authority commit context from the event that scheduled this.
   * Used for debugging and potential future features (e.g., showing player
   * their authority investment paid off).
   */
  authorityCommitContext?: {
    /** Amount of authority that was committed */
    committed: number;
    /** Request ID that had the authority commit */
    originRequestId: string;
  };
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
  /** Initial enemy forces (for loss calculation) */
  initialEnemyForces: number;
  /** Initial committed player forces (for loss calculation) */
  initialCommittedForces: number;
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
 * Pending authority check scheduled for resolution
 */
export interface PendingAuthorityCheck {
  /** Unique identifier for this check */
  checkId: string;
  /** Tick when this check was initiated */
  initiatedTick: number;
  /** Tick when this check should resolve */
  resolveTick: number;
  /** Request ID that initiated this check */
  originRequestId: string;
  /** Option index that was chosen */
  optionIndex: number;
  /** Amount of authority committed */
  committed: number;
  /** Authority check configuration */
  config: AuthorityCheck;
}

/**
 * Represents a building currently under construction.
 */
export interface ActiveConstruction {
  /** ID of the building being constructed */
  buildingId: string;
  /** Tick when construction started */
  startedAtTick: number;
  /** Tick when construction will complete */
  completionTick: number;
  /** Profile used for this construction (e.g. 'default', future architect profiles) */
  constructionProfileId: string;
}

/**
 * Complete game state
 */
export interface GameState {
  tick: number;
  stats: Stats;
  /** Building tracking data keyed by building ID */
  buildingTracking: Record<string, BuildingTracking>;
  /** ID of a building that was just unlocked this tick (for UI notification) */
  newlyUnlockedBuilding: string | null;
  currentRequestId: string;
  lastRequestId: string;
  log: LogEntry[];
  gameOver: boolean;
  gameOverReason?: string;
  scheduledEvents: ScheduledEvent[];
  /** Track chain status: active means chain has started but not completed */
  chainStatus: Record<string, { active: boolean; completedTick?: number; cooldownTicks?: number }>;
  /** Track how many times each request has been triggered */
  requestTriggerCounts: Record<string, number>;
  /** Track unlock tokens for event requirements */
  unlocks: Record<string, true>;
  /** Scheduled combats to occur at future ticks */
  scheduledCombats: ScheduledCombat[];
  /** Active combat currently in progress */
  activeCombat?: ActiveCombat;
  /** Pending authority checks to resolve at future ticks */
  pendingAuthorityChecks: PendingAuthorityCheck[];
  /** Fire system runtime state (slots and pending info queue) */
  fire: FireState;
  /** Set of completed district IDs (value is always true for completed districts) */
  completedDistricts: Record<string, true>;
  /** Currently active construction, or null if nothing is being built */
  activeConstruction?: ActiveConstruction | null;
}

/**
 * Action types for the state reducer
 */
export type GameAction =
  | {
      type: 'CHOOSE_OPTION';
      optionIndex: number;
      /** Optional number of land forces to commit to combat (only used for combat requests) */
      combatCommit?: number;
      /** Optional amount of authority to commit (only used for options with authority checks) */
      authorityCommit?: number;
    }
  | {
      type: 'BUILD_BUILDING';
      buildingId: string;
    }
  | {
      /**
       * Start a repair chain for one repairable destroyed unit of a building type.
       * Requires an assigned slot with unitStatus='destroyed' and chainActive=false.
       */
      type: 'START_REPAIR_CHAIN';
      buildingId: string;
    };

/**
 * Create the initial fire incident slot states (10 slots, all unassigned).
 */
function createInitialFireSlots(): FireIncidentSlotState[] {
  return Array.from({ length: 10 }, (_, i) => ({
    slotIndex: i + 1,
    assigned: false,
    chainActive: false,
  }));
}

/**
 * Default configuration for Fire System V4.
 * Balancing values — can be adjusted without code changes.
 */
export const FIRE_SYSTEM_CONFIG: FireSystemConfig = {
  baseOffset: -10,
  factor: 0.1,
  chanceMin: 0,
  chanceMax: 9,

  maxConcurrentByRisk: [
    { minRisk: 0,  maxRisk: 25,  maxFires: 1 },
    { minRisk: 26, maxRisk: 50,  maxFires: 2 },
    { minRisk: 51, maxRisk: 85,  maxFires: 3 },
    { minRisk: 86, maxRisk: 100, maxFires: 4 },
  ],

  repairCostPercentOfBuildCost: 0.5,

  chainSlots: 10,
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
    authority: 20,
  },
  buildingTracking: createInitialBuildingTracking(),
  newlyUnlockedBuilding: null,
  currentRequestId: '',
  lastRequestId: '',
  log: [],
  gameOver: false,
  scheduledEvents: [],
  chainStatus: {},
  requestTriggerCounts: {},
  unlocks: {},
  scheduledCombats: [],
  pendingAuthorityChecks: [],
  fire: {
    slots: createInitialFireSlots(),
  },
  completedDistricts: {},
  activeConstruction: null,
};

/**
 * Clamps a value between min and max
 */
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Helper function to get a request's title by ID
 * @param requestId The ID of the request to lookup
 * @returns The request's title, or a fallback string if not found
 */
function getRequestTitleFromId(requestId: string): string {
  const allRequests = [...infoRequests, ...authorityInfoRequests, ...eventRequests, ...fireChainRequests];
  const request = allRequests.find(r => r.id === requestId);
  
  if (!request) {
    return requestId; // Fallback to ID if request not found
  }
  
  // Prefer title if it exists
  if (request.title) {
    return request.title;
  }
  
  // Fallback to truncated text if no title
  if (request.text) {
    const firstSentence = request.text.split(/[.!?]\s+/)[0].trim();
    return firstSentence.length > 50 
      ? firstSentence.substring(0, 47) + '...'
      : firstSentence;
  }
  
  // Final fallback to ID
  return requestId;
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
    authority: clamp(stats.authority, 0, 999.999),
  };
}

/**
 * Applies stat effects from an option to the current stats
 */
function applyEffects(stats: Stats, effects: Effect): Stats {
  const newStats = { ...stats };

  // Apply stat changes
  if (effects.gold !== undefined) newStats.gold += effects.gold;
  if (effects.satisfaction !== undefined) newStats.satisfaction += effects.satisfaction;
  if (effects.health !== undefined) newStats.health += effects.health;
  if (effects.fireRisk !== undefined) newStats.fireRisk += effects.fireRisk;
  if (effects.farmers !== undefined) newStats.farmers += effects.farmers;
  if (effects.landForces !== undefined) newStats.landForces += effects.landForces;
  if (effects.authority !== undefined) newStats.authority += effects.authority;

  return newStats;
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
 * @param modifiers Array of modifier hooks to run
 * @returns Object with updated stats and list of all applied changes
 */
export function applyOptionWithModifiers(
  state: GameState,
  request: Request,
  optionIndex: number,
  modifiers: ModifierHook[] = []
): { stats: Stats; appliedChanges: AppliedChange[] } {
  const option = request.options[optionIndex];

  // 1. Compute base delta from option
  let delta = { ...option.effects };
  const appliedChanges: AppliedChange[] = [];

  // 2. Run modifier hooks
  for (const modifier of modifiers) {
    const result = modifier(state, request, optionIndex, delta, appliedChanges);
    delta = result.delta;
    appliedChanges.push(...result.extraChanges);
  }

  // 3. Apply final delta to stats
  const statsAfterEffects = applyEffects(state.stats, delta);

  // Record base changes from the delta
  const statKeys: Array<keyof Stats> = ['gold', 'satisfaction', 'health', 'fireRisk', 'farmers', 'landForces', 'authority'];
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

  return { stats, appliedChanges };
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
 * Synchronizes building-based unlock tokens with the current building tracking state.
 * Sets tokens for buildings that have been built, removes tokens for buildings that haven't.
 */
export function syncBuildingUnlockTokens(
  buildingTracking: Record<string, BuildingTracking>,
  unlocks: Record<string, true>
): Record<string, true> {
  const newUnlocks = { ...unlocks };

  // Sync unlock tokens for all buildings that define one
  for (const def of BUILDING_DEFINITIONS) {
    if (def.unlockToken) {
      if (isBuildingActive(buildingTracking, def.id)) {
        newUnlocks[def.unlockToken] = true;
      } else {
        delete newUnlocks[def.unlockToken];
      }
    }
  }

  return newUnlocks;
}

/**
 * Detects newly unlocked buildings by comparing farmers before and after a tick.
 * Checks both individual building thresholds and grouped unlock thresholds.
 * Returns the first building ID that was just unlocked, or null.
 */
function detectNewlyUnlockedBuildings(
  farmersBefore: number,
  farmersAfter: number
): string | null {
  // Check individual building thresholds
  for (const def of BUILDING_DEFINITIONS) {
    const wasUnlocked = farmersBefore >= def.unlockThreshold;
    const isUnlocked = farmersAfter >= def.unlockThreshold;

    if (!wasUnlocked && isUnlocked) {
      return def.id;
    }
  }

  // Check grouped unlock thresholds
  for (const group of BUILDING_UNLOCK_GROUPS) {
    const wasUnlocked = farmersBefore >= group.populationThreshold;
    const isUnlocked = farmersAfter >= group.populationThreshold;

    if (!wasUnlocked && isUnlocked) {
      // Prefer returning a building that only exists in the group (not in BUILDING_DEFINITIONS),
      // since buildings in BUILDING_DEFINITIONS are already checked by the first loop above.
      const newBuilding = group.buildingIds.find(
        id => !BUILDING_DEFINITIONS.some(def => def.id === id)
      );
      if (newBuilding) return newBuilding;
      // Fallback: return the first building in the group
      return group.buildingIds[0] ?? null;
    }
  }

  return null;
}

/**
 * Applies overcrowding penalties when farmers exceed farmstead capacity.
 * Tier 1 (1-10 overflow):  health -1, satisfaction -1, fireRisk +1
 * Tier 2 (11-25 overflow): health -2, satisfaction -2, fireRisk +2
 * Tier 3 (26+ overflow):   health -3, satisfaction -3, fireRisk +3
 */
function applyOvercrowdingPenalties(
  stats: Stats,
  buildingTracking: Record<string, BuildingTracking>
): { stats: Stats; changes: AppliedChange[] } {
  const farmsteadTracking = buildingTracking['farmstead'];
  const farmsteadCount = farmsteadTracking ? getEffectiveBuildingCount(farmsteadTracking) : 0;
  const capacity = farmsteadCount * FARMERS_PER_FARMSTEAD;
  const overflow = Math.max(0, stats.farmers - capacity);

  if (overflow === 0) {
    return { stats, changes: [] };
  }

  // Determine tier
  let healthPenalty: number;
  let satisfactionPenalty: number;
  let fireRiskIncrease: number;

  if (overflow <= 10) {
    healthPenalty = -1;
    satisfactionPenalty = -1;
    fireRiskIncrease = 1;
  } else if (overflow <= 25) {
    healthPenalty = -2;
    satisfactionPenalty = -2;
    fireRiskIncrease = 2;
  } else {
    healthPenalty = -3;
    satisfactionPenalty = -3;
    fireRiskIncrease = 3;
  }

  const newStats = {
    ...stats,
    health: stats.health + healthPenalty,
    satisfaction: stats.satisfaction + satisfactionPenalty,
    fireRisk: stats.fireRisk + fireRiskIncrease,
  };

  const changes: AppliedChange[] = [
    { stat: 'health', amount: healthPenalty, source: 'overcrowding', note: `${overflow} farmers in makeshift camps` },
    { stat: 'satisfaction', amount: satisfactionPenalty, source: 'overcrowding', note: `${overflow} farmers in makeshift camps` },
    { stat: 'fireRisk', amount: fireRiskIncrease, source: 'overcrowding', note: `${overflow} farmers in makeshift camps` },
  ];

  return { stats: newStats, changes };
}

/**
 * Synchronizes buildingTracking onFireCount and destroyedCount from the incident slots.
 * Source of truth in V4 is the slots array.
 */
function syncBuildingTrackingFromSlots(
  buildingTracking: Record<string, BuildingTracking>,
  slots: FireIncidentSlotState[]
): Record<string, BuildingTracking> {
  // Compute per-building counts from slot assignments
  const onFireByBuilding: Record<string, number> = {};
  const destroyedByBuilding: Record<string, number> = {};

  for (const slot of slots) {
    if (!slot.assigned || !slot.targetBuildingId) continue;
    if (slot.unitStatus === 'on_fire') {
      onFireByBuilding[slot.targetBuildingId] = (onFireByBuilding[slot.targetBuildingId] ?? 0) + 1;
    } else if (slot.unitStatus === 'destroyed') {
      destroyedByBuilding[slot.targetBuildingId] = (destroyedByBuilding[slot.targetBuildingId] ?? 0) + 1;
    }
  }

  const newTracking = { ...buildingTracking };
  for (const def of BUILDING_DEFINITIONS) {
    const t = newTracking[def.id];
    if (!t) continue;
    const newOnFire = onFireByBuilding[def.id] ?? 0;
    const newDestroyed = destroyedByBuilding[def.id] ?? 0;
    if (t.onFireCount !== newOnFire || t.destroyedCount !== newDestroyed) {
      newTracking[def.id] = { ...t, onFireCount: newOnFire, destroyedCount: newDestroyed };
    }
  }
  return newTracking;
}

/**
 * Attempts to start a new fire outbreak during tick advance (V4).
 *
 * Rules (V4 Section 5):
 *  - Uses linear probability: chance% = clamp((fireRisk + baseOffset) * factor, chanceMin, chanceMax)
 *  - Counts only slots with unitStatus='on_fire' toward the concurrency cap
 *  - Selects a random *functional unit* (weighted by effectiveCount, then random ordinal)
 *  - Assigns the unit to the lowest free slot, picks variant A or B randomly
 *  - Schedules FIREV4_S{n}_{V}_START at currentTick+1
 *
 * @param bypassCap  When true (effect outbreak), skip the concurrency cap check
 */
function attemptFireOutbreak(
  buildingTracking: Record<string, BuildingTracking>,
  fireState: FireState,
  scheduledEvents: ScheduledEvent[],
  config: FireSystemConfig,
  fireRisk: number,
  currentTick: number,
  bypassCap: boolean = false
): { fireState: FireState; scheduledEvents: ScheduledEvent[] } {
  // 1. Count current on_fire incidents
  const burningIncidents = fireState.slots.filter(s => s.assigned && s.unitStatus === 'on_fire').length;

  // 2. Check concurrency cap (unless bypassed)
  if (!bypassCap) {
    const band = config.maxConcurrentByRisk.find(
      b => fireRisk >= b.minRisk && fireRisk <= b.maxRisk
    );
    const allowedMax = band ? band.maxFires : 1;
    if (burningIncidents >= allowedMax) {
      return { fireState, scheduledEvents };
    }
  }

  // 3. Find lowest free slot
  const freeSlot = fireState.slots.find(s => !s.assigned);
  if (!freeSlot) {
    return { fireState, scheduledEvents };
  }

  // 4. Find eligible building types (effectiveCount > 0)
  const eligibleTypes = BUILDING_DEFINITIONS.filter(def => {
    const t = buildingTracking[def.id];
    return t && getEffectiveBuildingCount(t) > 0;
  });
  if (eligibleTypes.length === 0) {
    return { fireState, scheduledEvents };
  }

  // 5. Compute linear chance and roll
  const chancePercent = Math.max(
    config.chanceMin,
    Math.min(config.chanceMax, (fireRisk + config.baseOffset) * config.factor)
  );
  const roll = getRandomValue() * 100;
  if (roll >= chancePercent) {
    return { fireState, scheduledEvents };
  }

  // 6. Select target building type weighted by effectiveCount
  const typeCandidates = eligibleTypes.map(def => ({
    def,
    weight: getEffectiveBuildingCount(buildingTracking[def.id]),
  }));
  const selectedType = selectWeightedCandidate(typeCandidates);
  if (!selectedType) {
    return { fireState, scheduledEvents };
  }

  const targetDef = selectedType.def;
  const targetTracking = buildingTracking[targetDef.id];

  // 7. Select a random functional unit ordinal for this building type
  //    Ordinals are 1..buildingCount; exclude ordinals already assigned in any slot
  const assignedOrdinals = new Set(
    fireState.slots
      .filter(s => s.assigned && s.targetBuildingId === targetDef.id && s.targetUnitOrdinal !== undefined)
      .map(s => s.targetUnitOrdinal as number)
  );
  const candidateOrdinals: number[] = [];
  for (let ord = 1; ord <= targetTracking.buildingCount; ord++) {
    if (!assignedOrdinals.has(ord)) {
      candidateOrdinals.push(ord);
    }
  }
  if (candidateOrdinals.length === 0) {
    return { fireState, scheduledEvents };
  }
  const ordIdx = Math.floor(getRandomValue() * candidateOrdinals.length);
  const targetUnitOrdinal = candidateOrdinals[ordIdx];

  // 8. Select a fire chain variant compatible with this building type.
  //    Scan all FIREV4 START requests for this slot and filter by fireChainAllowedBuildingTypes.
  const slotStarters = fireChainRequests.filter(
    r => r.id.startsWith(`FIREV4_S${freeSlot.slotIndex}_`) && r.chainRole === 'start'
  );
  const eligibleStarters = slotStarters.filter(
    r => !r.fireChainAllowedBuildingTypes || r.fireChainAllowedBuildingTypes.includes(targetDef.id)
  );
  if (eligibleStarters.length === 0) {
    return { fireState, scheduledEvents };
  }
  const starterIdx = Math.floor(getRandomValue() * eligibleStarters.length);
  const chosenStarter = eligibleStarters[starterIdx];
  // Extract variant from "FIREV4_S{n}_{variant}_START"
  const variantMatch = chosenStarter.id.match(/^FIREV4_S\d+_(.+)_START$/);
  if (!variantMatch) {
    console.warn(`[Fire Outbreak] Malformed fire chain START request ID: ${chosenStarter.id}`);
    return { fireState, scheduledEvents };
  }
  const variant = variantMatch[1];

  // 9. Assign the slot
  const newSlots = fireState.slots.map(s =>
    s.slotIndex === freeSlot.slotIndex
      ? {
          ...s,
          assigned: true,
          chainActive: true,
          chainKind: 'fire' as const,
          chainVariantId: variant,
          targetBuildingId: targetDef.id,
          targetUnitOrdinal,
          unitStatus: 'on_fire' as const,
          assignedTick: currentTick,
          startedTick: currentTick,
        }
      : s
  );

  // 10. Building tracking sync happens in the caller via syncBuildingTrackingFromSlots.

  // 11. Schedule the START request immediately at the next tick with fire priority
  // (highest priority among non-info scheduled events — V4 Section 5.6)
  const startRequestId = `FIREV4_S${freeSlot.slotIndex}_${variant}_START`;
  const newScheduledEvents = [
    ...scheduledEvents,
    {
      targetTick: currentTick + 1,
      requestId: startRequestId,
      scheduledAtTick: currentTick,
      priority: 'fire' as const,
    },
  ];

  return {
    fireState: { ...fireState, slots: newSlots },
    scheduledEvents: newScheduledEvents,
  };
}

/**
 * Checks if any building reminders should be scheduled.
 * Called at end of each normal tick.
 */
function checkBuildingReminders(
  tick: number,
  stats: Stats,
  buildingTracking: Record<string, BuildingTracking>,
  scheduledEvents: ScheduledEvent[]
): { buildingTracking: Record<string, BuildingTracking>; scheduledEvents: ScheduledEvent[] } {
  const newTracking = { ...buildingTracking };
  const newScheduledEvents = [...scheduledEvents];

  for (const def of BUILDING_DEFINITIONS) {
    if (!def.reminderRequestId) continue;

    const tracking = newTracking[def.id];
    if (!tracking) continue;

    // Check if building is unlocked
    if (stats.farmers < def.unlockThreshold) continue;

    // Check if there's a deficit
    const required = calculateRequiredBuildings(def, stats.farmers);
    if (tracking.buildingCount >= required) {
      // No deficit — reset reminder state
      newTracking[def.id] = { ...tracking, reminderScheduled: false };
      continue;
    }

    // Update lastRequirementTick if not set
    if (tracking.lastRequirementTick === undefined) {
      newTracking[def.id] = { ...tracking, lastRequirementTick: tick };
      continue; // Start delay timer from now
    }

    // Check if already scheduled this cycle
    if (tracking.reminderScheduled) continue;

    // Check cooldown
    if (tick < tracking.reminderCooldownUntil) continue;

    // Check delay elapsed
    if (tick - tracking.lastRequirementTick < def.reminderDelayTicks) continue;

    // All conditions met — schedule reminder
    newScheduledEvents.push({
      targetTick: tick + 1,
      requestId: def.reminderRequestId,
      scheduledAtTick: tick,
      priority: 'normal',
    });

    newTracking[def.id] = {
      ...tracking,
      reminderScheduled: true,
      reminderCooldownUntil: tick + 15, // 15-tick cooldown after shown
    };
  }

  return { buildingTracking: newTracking, scheduledEvents: newScheduledEvents };
}

/**
 * Applies baseline rules according to POF_SPEC.md:
 * - gold += floor(0.1 * (farmers * (satisfaction / 100)))
 * - farmers += floor(health / 10)
 *
 * Positive baseline population growth is hard-capped by farmstead capacity.
 * Negative growth (population loss) still applies normally.
 * Event-based population gains are NOT affected (they bypass this function).
 */
function applyBaseline(stats: Stats, buildingTracking: Record<string, BuildingTracking>): Stats {
  const goldIncome = Math.floor(0.15 * (stats.farmers * ((stats.satisfaction-10) / 100)));
  const farmerGrowth = Math.floor((stats.health+20) / 41);

  const farmsteadTracking = buildingTracking['farmstead'];
  const farmsteadCapacity = (farmsteadTracking ? getEffectiveBuildingCount(farmsteadTracking) : 0) * FARMERS_PER_FARMSTEAD;

  // Only apply positive baseline growth if below farmstead capacity
  // Negative growth (population loss) still applies normally
  // Cap positive growth so farmers never exceed farmstead capacity
  let appliedGrowth = farmerGrowth;
  if (farmerGrowth > 0) {
    const headroom = farmsteadCapacity - stats.farmers;
    appliedGrowth = headroom <= 0 ? 0 : Math.min(farmerGrowth, headroom);
  }

  return {
    ...stats,
    gold: stats.gold + goldIncome,
    farmers: stats.farmers + appliedGrowth,
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
  if (afterStats.authority !== beforeStats.authority) {
    deltas.authority = afterStats.authority - beforeStats.authority;
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
 * Applies authority commit boosts to follow-up candidate weights.
 * Authority commits INCREASE weights, making beneficial outcomes more likely.
 * 
 * @param originalCandidates Base candidates with their default weights
 * @param boosts Weight boost rules from authority check
 * @param committed Amount of authority committed
 * @param maxCommit Maximum authority that could be committed
 * @param threshold Authority threshold for success (used by threshold boost type)
 * @returns Modified candidates with boosted weights
 */
function applyAuthorityBoosts(
  originalCandidates: WeightedCandidate[],
  boosts: AuthorityFollowUpBoost[],
  committed: number,
  maxCommit: number,
  threshold: number
): WeightedCandidate[] {
  // Clone candidates to avoid mutation
  const boostedCandidates = originalCandidates.map(c => ({ ...c }));
  
  // Calculate commitment ratio (0.0 to 1.0)
  const commitRatio = maxCommit > 0 ? committed / maxCommit : 0;
  
  for (const boost of boosts) {
    // Find candidate to boost
    const candidate = boostedCandidates.find(c => c.requestId === boost.targetRequestId);
    
    if (!candidate) {
      console.warn(`[Authority Boost] Target not found in candidates: ${boost.targetRequestId}`);
      continue;
    }
    
    let weightIncrease = 0;
    
    switch (boost.boostType) {
      case "linear":
        // Weight increases linearly with commitment
        // Example: boostValue=2, 50% commit = +1 weight, 100% commit = +2 weight
        weightIncrease = commitRatio * boost.boostValue;
        break;
        
      case "threshold": {
        // Binary: crosses threshold or doesn't
        // Example: boostValue=3, committed >= threshold = +3 weight, else +0
        const crossesThreshold = committed >= threshold;
        weightIncrease = crossesThreshold ? boost.boostValue : 0;
        break;
      }
        
      case "stepped": {
        // Discrete steps based on commitment percentage
        // Example: steps=3, boostValue=1, commitRatio creates 4 tiers (0%, 33%, 66%, 100%)
        const numSteps = Math.max(1, boost.steps ?? 3);  // Ensure at least 1 step to avoid division by zero
        const stepSize = 1 / numSteps;
        const currentStep = Math.floor(commitRatio / stepSize);
        weightIncrease = currentStep * boost.boostValue;
        break;
      }
        
      default:
        console.warn(`[Authority Boost] Unknown boost type: ${(boost as AuthorityFollowUpBoost).boostType}`);
        continue;
    }
    
    // Apply weight increase
    // Note: All boost types produce non-negative values, but we guard against negative
    // weights as a defensive measure in case boost logic changes in the future
    candidate.weight = candidate.weight + Math.max(0, weightIncrease);
    
    // Debug logging
    if (weightIncrease > 0) {
      console.log(`[Authority Boost] ${boost.targetRequestId}: +${weightIncrease.toFixed(2)} weight (${boost.boostType}, committed: ${committed}/${maxCommit})`);
    }
  }
  
  return boostedCandidates;
}

/**
 * Schedules follow-up events based on the chosen option.
 * If authority was committed, applies boosts to follow-up probabilities.
 * 
 * @returns Updated scheduled events array
 */
function scheduleFollowUps(
  currentRequest: Request,
  option: { authorityCheck?: AuthorityCheck },
  optionIndex: number,
  currentTick: number,
  existingScheduledEvents: ScheduledEvent[],
  authorityCommit?: number  // NEW: Pass authority commit amount
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
    // Start with base candidate weights
    let candidates = followUp.candidates;
    
    // Track which events were boosted by authority commit
    const boostedRequestIds = new Set<string>();
    
    // NEW: Apply authority boosts if authority was committed
    if (authorityCommit !== undefined && 
        authorityCommit > 0 && 
        option.authorityCheck?.followUpBoosts && 
        option.authorityCheck.followUpBoosts.length > 0) {
      
      // Track which request IDs are boosted
      option.authorityCheck.followUpBoosts.forEach(boost => {
        boostedRequestIds.add(boost.targetRequestId);
      });
      
      candidates = applyAuthorityBoosts(
        followUp.candidates,
        option.authorityCheck.followUpBoosts,
        authorityCommit,
        option.authorityCheck.maxCommit,
        option.authorityCheck.threshold ?? 0
      );
      
      console.log(`[Follow-Up Scheduling] Authority commit of ${authorityCommit} applied boosts to follow-up candidates`);
    }
    
    // Select one candidate using weighted random selection (with boosted weights)
    const selectedCandidate = selectWeightedCandidate(candidates);
    
    if (selectedCandidate) {
      // Calculate random delay within the specified range
      const delayRange = followUp.delayMaxTicks - followUp.delayMinTicks;
      const delay = followUp.delayMinTicks + Math.floor(getRandomValue() * (delayRange + 1));
      
      // Only attach authority commit context if the selected event was one of the boosted ones
      const wasBoosted = boostedRequestIds.has(selectedCandidate.requestId);
      
      // Schedule the event
      scheduledEvents.push({
        targetTick: currentTick + 1 + delay,
        requestId: selectedCandidate.requestId,
        scheduledAtTick: currentTick,
        // NEW: Attach authority commit context only for boosted events
        authorityCommitContext: (authorityCommit !== undefined && authorityCommit > 0 && wasBoosted) ? {
          committed: authorityCommit,
          originRequestId: currentRequest.id,
        } : undefined,
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
 * Schedules a combat report info request to appear immediately
 * @param combat The active combat that just ended
 * @param outcome The combat outcome: 'win', 'lose', or 'withdraw'
 * @param statsBefore Stats before applying effects
 * @param statsAfter Stats after applying effects
 * @param currentTick Current game tick
 * @param scheduledEvents Existing scheduled events
 * @returns Updated scheduled events array with combat report added
 */
function scheduleCombatReport(
  combat: ActiveCombat,
  outcome: 'win' | 'lose' | 'withdraw',
  statsBefore: Stats,
  statsAfter: Stats,
  currentTick: number,
  scheduledEvents: ScheduledEvent[]
): ScheduledEvent[] {
  const updatedScheduledEvents = [...scheduledEvents];
  
  // Calculate total losses
  const playerLosses = combat.initialCommittedForces - combat.committedRemaining;
  const enemyLosses = combat.initialEnemyForces - combat.enemyRemaining;
  
  // Store outcome and losses in the combat report ID for retrieval
  const reportData = {
    outcome,
    playerLosses,
    enemyLosses,
    statDeltas: {
      gold: statsAfter.gold - statsBefore.gold,
      satisfaction: statsAfter.satisfaction - statsBefore.satisfaction,
      health: statsAfter.health - statsBefore.health,
      fireRisk: statsAfter.fireRisk - statsBefore.fireRisk,
      farmers: statsAfter.farmers - statsBefore.farmers,
      landForces: statsAfter.landForces - statsBefore.landForces,
    },
  };
  
  // Encode data as JSON in the combat report ID
  const reportId = `COMBAT_REPORT::${combat.combatId}::${encodeURIComponent(JSON.stringify(reportData))}`;
  
  // Schedule immediately with info priority
  updatedScheduledEvents.push({
    targetTick: currentTick,
    requestId: reportId,
    scheduledAtTick: currentTick,
    priority: 'info',
  });
  
  return updatedScheduledEvents;
}

/**
 * Validates and logs force accounting for development/debugging
 * This helps catch issues with multiple parallel combats
 */
function validateForceAccounting(
  state: GameState,
  context: string,
  previousState?: GameState
): void {
  // Calculate reserved forces in scheduled combats
  const reservedInScheduled = state.scheduledCombats.reduce(
    (sum, combat) => sum + combat.committedForces,
    0
  );
  
  // Calculate reserved forces in active combat
  const reservedInActive = state.activeCombat ? state.activeCombat.committedRemaining : 0;
  
  // Total forces = available + reserved
  const totalForces = state.stats.landForces + reservedInScheduled + reservedInActive;
  
  // Calculate previous total if provided
  let previousTotal: number | undefined;
  if (previousState) {
    const prevReservedInScheduled = previousState.scheduledCombats.reduce(
      (sum, combat) => sum + combat.committedForces,
      0
    );
    const prevReservedInActive = previousState.activeCombat ? previousState.activeCombat.committedRemaining : 0;
    previousTotal = previousState.stats.landForces + prevReservedInScheduled + prevReservedInActive;
  }
  
  // Log force accounting details
  console.log(`[Force Accounting] ${context}:`, {
    available: state.stats.landForces,
    reservedInScheduled,
    reservedInActive,
    totalForces,
    previousTotal,
    delta: previousTotal !== undefined ? totalForces - previousTotal : 'N/A',
    scheduledCombatsCount: state.scheduledCombats.length,
    hasActiveCombat: !!state.activeCombat,
  });
  
  // Assertion: landForces should never be negative
  if (state.stats.landForces < 0) {
    const errorMsg = `[Force Accounting ERROR] Negative landForces detected at ${context}: ${state.stats.landForces}`;
    console.error(errorMsg);
    // Log stack trace for debugging
    console.trace('Negative landForces stack trace:');
  }
  
  // Warning: total forces shouldn't change without explanation
  if (previousTotal !== undefined && Math.abs(totalForces - previousTotal) > 0.1) {
    const delta = totalForces - previousTotal;
    // Only warn if forces increased (shouldn't happen) or decreased unexpectedly
    // Combat losses are expected, so we only warn on increases
    if (delta > 0) {
      console.warn(`[Force Accounting WARNING] Total forces INCREASED unexpectedly at ${context}. Previous: ${previousTotal}, Current: ${totalForces}, Delta: ${delta}`);
    }
  }
}

/**
 * Resolves a pending authority check and returns the result
 * @param check The pending authority check to resolve
 * @returns Authority check result with success/failure and effects
 */
function resolveAuthorityCheck(check: PendingAuthorityCheck): AuthorityCheckResult {
  const config = check.config;
  const committed = check.committed;
  
  // If there are no immediate effects (onSuccess/onFailure), then there's no success/failure
  // Authority committed for follow-up boosts should NOT be refunded here.
  // It will be refunded when the boosted follow-up event is shown to the player.
  const hasImmediateEffects = !!(config.onSuccess || config.onFailure);
  
  if (!hasImmediateEffects) {
    // No success/failure for follow-up-only boosts
    // Do NOT refund authority - it will be refunded when the follow-up resolves
    return {
      success: true, // Not really applicable, but set to true for consistency
      committed,
      refunded: 0, // NO refund - authority stays committed until follow-up
      totalLoss: 0, // Not a loss yet - authority is just held
      appliedEffects: undefined,
      feedbackRequestId: undefined,
    };
  }
  
  // Probabilistic success determination based on commitment ratio
  // Each authority check should define its own min/max success chance
  if (config.minSuccessChance === undefined || config.maxSuccessChance === undefined) {
    const missing = [
      config.minSuccessChance === undefined ? 'minSuccessChance' : '',
      config.maxSuccessChance === undefined ? 'maxSuccessChance' : '',
    ].filter(Boolean).join(', ');
    console.error(`Authority check missing ${missing}:`, check.originRequestId);
  }
  const MIN_SUCCESS_CHANCE = (config.minSuccessChance ?? 50) / 100;
  const MAX_SUCCESS_CHANCE = (config.maxSuccessChance ?? 50) / 100;
  const commitRatio = config.maxCommit > 0 ? committed / config.maxCommit : 0;
  const successChance = MIN_SUCCESS_CHANCE + commitRatio * (MAX_SUCCESS_CHANCE - MIN_SUCCESS_CHANCE);
  const success = Math.random() < successChance;
  
  // Calculate refund and loss
  const refundPercent = success ? (config.refundOnSuccessPercent ?? 100) : 0;
  const refunded = Math.floor((committed * refundPercent) / 100);
  
  let totalLoss = committed - refunded;
  
  // Apply extra loss on failure (deterministic whole number)
  // On failure, apply the fixed extraLossOnFailure amount if specified.
  // This is a flat penalty independent of the commitment amount.
  if (!success) {
    const extraLoss = config.extraLossOnFailure ?? 0;
    totalLoss += extraLoss;
  }
  
  // Determine which effects to apply
  const appliedEffects = success ? config.onSuccess : config.onFailure;
  
  // Determine feedback request
  const feedbackRequestId = success 
    ? config.successFeedbackRequestId 
    : config.failureFeedbackRequestId;
  
  return {
    success,
    committed,
    refunded,
    totalLoss,
    appliedEffects,
    feedbackRequestId,
  };
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
      
      // Validate force accounting before combat start
      validateForceAccounting(state, `Before Combat Start (${combatId})`);
      
      // Find the scheduled combat
      const scheduledCombat = state.scheduledCombats.find(c => c.combatId === combatId);
      
      if (!scheduledCombat) {
        console.error('Combat start failed: scheduled combat not found for ID:', combatId, '. Maintaining current state.');
        return state;
      }
      
      console.log(`[Combat Start] Starting combat ${combatId}:`, {
        committedForces: scheduledCombat.committedForces,
        enemyForces: scheduledCombat.enemyForces,
        dueTick: scheduledCombat.dueTick,
        scheduledAtTick: scheduledCombat.scheduledAtTick,
      });
      
      // Move scheduled combat to active combat
      const activeCombat: ActiveCombat = {
        combatId: scheduledCombat.combatId,
        originRequestId: scheduledCombat.originRequestId,
        enemyRemaining: scheduledCombat.enemyForces,
        committedRemaining: scheduledCombat.committedForces,
        initialEnemyForces: scheduledCombat.enemyForces,
        initialCommittedForces: scheduledCombat.committedForces,
        round: 0,
        onWin: scheduledCombat.onWin,
        onLose: scheduledCombat.onLose,
        followUpsOnWin: scheduledCombat.followUpsOnWin,
        followUpsOnLose: scheduledCombat.followUpsOnLose,
      };
      
      // Remove from scheduled combats - this is critical for proper force accounting
      const updatedScheduledCombats = state.scheduledCombats.filter(c => c.combatId !== combatId);
      
      // Verify the combat was removed (assertion)
      if (updatedScheduledCombats.length !== state.scheduledCombats.length - 1) {
        console.error(`[Combat Start ERROR] Failed to remove scheduled combat ${combatId}. Before: ${state.scheduledCombats.length}, After: ${updatedScheduledCombats.length}`);
      }
      
      // Pick next request with the same tick (combat start is tickless)
      const nextRequest = pickNextRequest({
        ...state,
        tick: state.tick,
        activeCombat,
        scheduledCombats: updatedScheduledCombats,
      });
      
      const newState = {
        ...state,
        currentRequestId: nextRequest.id,
        lastRequestId: state.currentRequestId,
        activeCombat,
        scheduledCombats: updatedScheduledCombats,
      };
      
      // Validate force accounting after combat start
      validateForceAccounting(newState, `After Combat Start (${combatId})`, state);
      
      return newState;
    }
    
    // Check if this is a synthetic COMBAT_REPORT request
    const isCombatReport = state.currentRequestId.startsWith('COMBAT_REPORT::');
    
    if (isCombatReport) {
      // Combat report is a tickless info request - both options just acknowledge
      // Remove the combat report from scheduled events before picking next
      const updatedScheduledEvents = removeScheduledEvent(
        state.scheduledEvents,
        state.currentRequestId,
        state.tick
      );
      
      // Pick next request with the same tick (tickless)
      const nextRequest = pickNextRequest({
        ...state,
        tick: state.tick,
        scheduledEvents: updatedScheduledEvents,
      });
      
      return {
        ...state,
        tick: state.tick, // Same tick - combat report is tickless
        currentRequestId: nextRequest.id,
        lastRequestId: state.currentRequestId,
        scheduledEvents: updatedScheduledEvents,
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
        // Withdraw = return remaining forces to landForces and apply lose effects
        console.log(`[Combat Withdraw] Combat ${combat.combatId}:`, {
          committedRemaining: combat.committedRemaining,
          returningForces: combat.committedRemaining,
        });
        
        const statsBefore = { ...state.stats };
        let stats = { ...state.stats };
        let scheduledEvents = [...state.scheduledEvents];

        // Return remaining forces to landForces (only if > 0 to avoid edge cases)
        if (combat.committedRemaining > 0) {
          stats.landForces += combat.committedRemaining;
          console.log(`[Combat Withdraw] Returned ${combat.committedRemaining} forces to landForces. New total: ${stats.landForces}`);
        }

        // Apply lose effects if any
        if (combat.onLose) {
          stats = applyEffects(stats, combat.onLose);
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
                targetTick: state.tick + delay,
                requestId: selectedCandidate.requestId,
                scheduledAtTick: state.tick,
              });
            }
          }
        }
        
        // Schedule combat report
        scheduledEvents = scheduleCombatReport(
          combat,
          'withdraw',
          statsBefore,
          stats,
          state.tick,
          scheduledEvents
        );
        
        // Clear active combat
        // Pick next request (tickless)
        const nextRequest = pickNextRequest({
          ...state,
          tick: state.tick,
          stats,
          activeCombat: undefined,
          scheduledEvents,
        });

        const newState = {
          ...state,
          tick: state.tick, // Same tick - combat is tickless
          stats,
          currentRequestId: nextRequest.id,
          lastRequestId: state.currentRequestId,
          activeCombat: undefined,
          scheduledEvents,
        };

        // Validate force accounting after withdrawal
        validateForceAccounting(newState, `After Combat Withdraw (${combat.combatId})`, state);

        return newState;
      }
      
      // Option A (index 0) = Fight = resolve one combat round
      // Combat resolution logic:
      // 1. M = min(committedRemaining, enemyRemaining)
      // 2. Each side has M forces in direct combat, extras distributed evenly
      // 3. Each match: one force from each side rolls 1d6
      // 4. Compare rolls; loser loses 1 force; tie = no loss
      
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
      const newCommittedRemaining = Math.max(0, combat.committedRemaining - playerLosses);
      const newEnemyRemaining = Math.max(0, combat.enemyRemaining - enemyLosses);
      
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
        const statsBefore = { ...state.stats };
        let stats = { ...state.stats };
        let scheduledEvents = [...state.scheduledEvents];
        
        // Update combat state with final force counts for report
        const updatedCombat: ActiveCombat = {
          ...combat,
          committedRemaining: newCommittedRemaining,
          enemyRemaining: newEnemyRemaining,
        };
        
        if (playerWon) {
          // Return surviving forces to player
          const survivorsReturned = newCommittedRemaining;
          stats.landForces += survivorsReturned;
          
          console.log(`[Combat End - WIN] Combat ${combat.combatId}:`, {
            survivorsReturned,
            initialCommittedForces: combat.initialCommittedForces,
            playerLosses: combat.initialCommittedForces - survivorsReturned,
            enemyLosses: combat.initialEnemyForces,
            newLandForces: stats.landForces,
          });
          
          // Apply win effects if any
          if (combat.onWin) {
            stats = applyEffects(stats, combat.onWin);
          }
          
          // Schedule follow-up events on win if any
          if (combat.followUpsOnWin) {
            for (const followUp of combat.followUpsOnWin) {
              const selectedCandidate = selectWeightedCandidate(followUp.candidates);
              if (selectedCandidate) {
                const delayRange = followUp.delayMaxTicks - followUp.delayMinTicks;
                const delay = followUp.delayMinTicks + Math.floor(getRandomValue() * (delayRange + 1));
                scheduledEvents.push({
                  targetTick: state.tick + delay,
                  requestId: selectedCandidate.requestId,
                  scheduledAtTick: state.tick,
                });
              }
            }
          }
        } else {
          // Player lost - no forces returned
          console.log(`[Combat End - LOSE] Combat ${combat.combatId}:`, {
            survivorsReturned: 0,
            initialCommittedForces: combat.initialCommittedForces,
            playerLosses: combat.initialCommittedForces,
            enemyLosses: combat.initialEnemyForces - newEnemyRemaining,
          });
          
          // Apply lose effects if any
          if (combat.onLose) {
            stats = applyEffects(stats, combat.onLose);
          }

          // Schedule follow-up events on lose if any
          if (combat.followUpsOnLose) {
            for (const followUp of combat.followUpsOnLose) {
              const selectedCandidate = selectWeightedCandidate(followUp.candidates);
              if (selectedCandidate) {
                const delayRange = followUp.delayMaxTicks - followUp.delayMinTicks;
                const delay = followUp.delayMinTicks + Math.floor(getRandomValue() * (delayRange + 1));
                scheduledEvents.push({
                  targetTick: state.tick + delay,
                  requestId: selectedCandidate.requestId,
                  scheduledAtTick: state.tick,
                });
              }
            }
          }
        }
        
        // Clamp stats
        stats = clampStats(stats);
        
        // Schedule combat report
        scheduledEvents = scheduleCombatReport(
          updatedCombat,
          playerWon ? 'win' : 'lose',
          statsBefore,
          stats,
          state.tick,
          scheduledEvents
        );
        
        // Clear active combat and pick next request (tickless)
        const nextRequest = pickNextRequest({
          ...state,
          tick: state.tick,
          stats,
          activeCombat: undefined,
          scheduledEvents,
        });

        const newState = {
          ...state,
          tick: state.tick, // Same tick - combat is tickless
          stats,
          currentRequestId: nextRequest.id,
          lastRequestId: state.currentRequestId,
          activeCombat: undefined,
          scheduledEvents,
        };

        // Validate force accounting after combat end
        validateForceAccounting(newState, `After Combat End (${combat.combatId})`, state);

        return newState;
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
    const currentRequest = [...infoRequests, ...authorityInfoRequests, ...eventRequests, ...fireChainRequests].find(
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
    let appliedChanges: AppliedChange[] = [];
    
    // Determine modifiers to use (only for event requests)
    const isEventRequest = eventRequests.some(r => r.id === state.currentRequestId);
    const modifiersToUse = isEventRequest ? needModifiers : [];
    
    if (currentRequest.combat && action.optionIndex === 0) {
      // Option A = fight for combat requests
      const combatCommit = action.combatCommit;
      
      // Validate combatCommit
      if (!combatCommit || combatCommit < 1 || combatCommit > state.stats.landForces) {
        console.error('Invalid combatCommit:', combatCommit, 'Available forces:', state.stats.landForces);
        return state; // Invalid commit, abort
      }
      
      // Immediately reserve forces by subtracting from available landForces
      const reservedLandForces = state.stats.landForces - combatCommit;
      
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
      
      // Apply option effects for combat commits in addition to scheduling combat
      // Both option effects and combat resolution effects (onWin/onLose) will be applied
      const result = applyOptionWithModifiers(
        state,
        currentRequest,
        action.optionIndex,
        modifiersToUse
      );
      // Use result stats but preserve the combat commitment to landForces
      stats = { ...result.stats, landForces: reservedLandForces };
      appliedChanges = result.appliedChanges;
    } else if (option.authorityCheck && action.authorityCommit !== undefined) {
      // Handle authority check
      const authorityCheck = option.authorityCheck;
      const authorityCommit = action.authorityCommit;
      
      // Validate authorityCommit
      if (authorityCommit < authorityCheck.minCommit || 
          authorityCommit > authorityCheck.maxCommit || 
          authorityCommit > state.stats.authority) {
        console.error('Invalid authorityCommit:', authorityCommit, 
                     'Range:', authorityCheck.minCommit, '-', authorityCheck.maxCommit,
                     'Available:', state.stats.authority);
        return state; // Invalid commit, abort
      }
      
      // Immediately deduct committed authority
      const reservedAuthority = state.stats.authority - authorityCommit;
      
      // Generate unique check ID
      const checkId = `${currentRequest.id}-${state.tick}-${Date.now()}`;
      
      // Create pending authority check (resolves at tick+1)
      const newPendingCheck: PendingAuthorityCheck = {
        checkId,
        initiatedTick: state.tick,
        resolveTick: state.tick + 1, // Always delay=1
        originRequestId: currentRequest.id,
        optionIndex: action.optionIndex,
        committed: authorityCommit,
        config: authorityCheck,
      };
      
      // Add to pending checks
      const pendingAuthorityChecks = [...state.pendingAuthorityChecks, newPendingCheck];
      
      // Apply option effects
      const result = applyOptionWithModifiers(
        state,
        currentRequest,
        action.optionIndex,
        modifiersToUse
      );
      // Use result stats but preserve the authority commitment
      stats = { ...result.stats, authority: reservedAuthority };
      appliedChanges = result.appliedChanges;
      
      // Update state to include pending checks before advancing
      state = { ...state, pendingAuthorityChecks };
    } else {
      // Normal path: Apply option effects using the pipeline
      const result = applyOptionWithModifiers(
        state,
        currentRequest,
        action.optionIndex,
        modifiersToUse
      );
      stats = result.stats;
      appliedChanges = result.appliedChanges;
    }

    // Sync building-based unlock tokens
    let unlocks = syncBuildingUnlockTokens(state.buildingTracking, state.unlocks);

    // Track chain state and request trigger counts
    let chainStatus = { ...state.chainStatus };
    const requestTriggerCounts = { ...state.requestTriggerCounts };
    
    // Increment trigger count for current request
    requestTriggerCounts[state.currentRequestId] = (requestTriggerCounts[state.currentRequestId] || 0) + 1;
    
    // Update chain status based on chainRole
    if (currentRequest.chainId && currentRequest.chainRole) {
      if (currentRequest.chainRole === 'start') {
        // Mark chain as active when started
        chainStatus[currentRequest.chainId] = { active: true };
      } else if (currentRequest.chainRole === 'end') {
        // Mark chain as completed (inactive) when ended; store cooldown from this end node
        chainStatus[currentRequest.chainId] = { active: false, completedTick: state.tick, cooldownTicks: currentRequest.chainRestartCooldownTicks };
      }
    }

    // V4 Fire chain end handling: resolve incident when a FIREV4 or REPAIRV4 end request fires
    let updatedBuildingTracking = state.buildingTracking;
    let updatedFire = state.fire;

    // FIREV4_S{n}_{V}_END_EXT → extinguish: clear slot assignment, unit becomes functional
    const fireEndExtMatch = state.currentRequestId.match(/^FIREV4_S(\d+)_([A-Z]+)_END_EXT$/);
    if (fireEndExtMatch) {
      const slotIndex = parseInt(fireEndExtMatch[1], 10);
      const newSlots = updatedFire.slots.map(s =>
        s.slotIndex === slotIndex
          ? { slotIndex, assigned: false, chainActive: false }
          : s
      );
      updatedFire = { ...updatedFire, slots: newSlots };
      updatedBuildingTracking = syncBuildingTrackingFromSlots(updatedBuildingTracking, newSlots);
    }

    // FIREV4_S{n}_{V}_END_DEST → destroy: unitStatus becomes 'destroyed', chainActive=false
    const fireEndDestMatch = state.currentRequestId.match(/^FIREV4_S(\d+)_([A-Z]+)_END_DEST$/);
    if (fireEndDestMatch) {
      const slotIndex = parseInt(fireEndDestMatch[1], 10);
      const newSlots = updatedFire.slots.map(s =>
        s.slotIndex === slotIndex && s.assigned
          ? { ...s, unitStatus: 'destroyed' as const, chainActive: false }
          : s
      );
      updatedFire = { ...updatedFire, slots: newSlots };
      updatedBuildingTracking = syncBuildingTrackingFromSlots(updatedBuildingTracking, newSlots);
    }

    // REPAIRV4_S{n}_END: option 0 = reconstruct (clear slot), option 1 = leave destroyed
    const repairEndMatch = state.currentRequestId.match(/^REPAIRV4_S(\d+)_END$/);
    if (repairEndMatch) {
      const slotIndex = parseInt(repairEndMatch[1], 10);
      if (action.optionIndex === 0) {
        // Reconstruct: clear slot entirely
        const newSlots = updatedFire.slots.map(s =>
          s.slotIndex === slotIndex
            ? { slotIndex, assigned: false, chainActive: false }
            : s
        );
        updatedFire = { ...updatedFire, slots: newSlots };
        updatedBuildingTracking = syncBuildingTrackingFromSlots(updatedBuildingTracking, newSlots);
      } else {
        // Leave destroyed: chain ends but slot stays assigned (chainActive=false)
        const newSlots = updatedFire.slots.map(s =>
          s.slotIndex === slotIndex
            ? { ...s, chainActive: false }
            : s
        );
        updatedFire = { ...updatedFire, slots: newSlots };
        updatedBuildingTracking = syncBuildingTrackingFromSlots(updatedBuildingTracking, newSlots);
      }
    }
    
    // V4: Handle triggerFireOutbreak effect from the chosen option
    let outbreakScheduledEvents: ScheduledEvent[] = [];
    if (option.effects.triggerFireOutbreak) {
      const bypassCap = option.effects.fireOutbreakBypassCap ?? false;
      const outbreakResult = attemptFireOutbreak(
        updatedBuildingTracking, updatedFire, state.scheduledEvents, FIRE_SYSTEM_CONFIG,
        stats.fireRisk, state.tick, bypassCap
      );
      updatedFire = outbreakResult.fireState;
      updatedBuildingTracking = syncBuildingTrackingFromSlots(updatedBuildingTracking, outbreakResult.fireState.slots);
      // Collect any newly scheduled events from the outbreak (will be merged below)
      outbreakScheduledEvents = outbreakResult.scheduledEvents.filter(
        e => !state.scheduledEvents.some(s => s.requestId === e.requestId && s.scheduledAtTick === e.scheduledAtTick)
      );
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
      option,  // NEW: Pass full option object
      action.optionIndex,
      state.tick,
      state.scheduledEvents,
      action.authorityCommit  // NEW: Pass authority commit (undefined if not committed)
    );

    // Remove the current request from scheduled events if it was scheduled
    scheduledEvents = removeScheduledEvent(scheduledEvents, state.currentRequestId, state.tick);

    // Merge any outbreak-triggered events (V4 triggerFireOutbreak effect)
    if (outbreakScheduledEvents.length > 0) {
      scheduledEvents = [...scheduledEvents, ...outbreakScheduledEvents];
    }

    // Check for bankruptcy after option effects (before baseline)
    // This prevents players from escaping bankruptcy via positive baseline income
    if (stats.gold <= -50) {
      return {
        tick: state.tick + 1,
        stats,
        buildingTracking: updatedBuildingTracking,
        newlyUnlockedBuilding: null,
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
        pendingAuthorityChecks: state.pendingAuthorityChecks,
        fire: updatedFire,
        completedDistricts: state.completedDistricts,
        activeConstruction: state.activeConstruction,
      };
    }

    // Check if this is a tickless request (e.g., info requests, reminders)
    if (currentRequest.advancesTick === false) {
      // Tickless path: no baseline, no tick increment
      // Pick next request using the SAME tick
      const nextRequest = pickNextRequest({
        tick: state.tick,
        stats,
        buildingTracking: updatedBuildingTracking,
        newlyUnlockedBuilding: null,
        currentRequestId: state.currentRequestId,
        lastRequestId: state.currentRequestId,
        log: state.log,
        gameOver: false,
        scheduledEvents,
        chainStatus,
        requestTriggerCounts,
        unlocks,
        scheduledCombats,
        pendingAuthorityChecks: state.pendingAuthorityChecks,
        fire: updatedFire,
        completedDistricts: state.completedDistricts,
        activeConstruction: state.activeConstruction,
      });

      // Return state with same tick, updated stats/unlocks/log, new request
      return {
        tick: state.tick, // Same tick
        stats,
        buildingTracking: updatedBuildingTracking,
        newlyUnlockedBuilding: null,
        currentRequestId: nextRequest.id,
        lastRequestId: state.currentRequestId,
        log: [...state.log, ...newLog],
        gameOver: false,
        scheduledEvents, // Keep as-is, no time advancement
        chainStatus,
        requestTriggerCounts,
        unlocks,
        scheduledCombats,
        pendingAuthorityChecks: state.pendingAuthorityChecks,
        fire: updatedFire,
        completedDistricts: state.completedDistricts,
        activeConstruction: state.activeConstruction,
      };
    }

    // Normal path: advance tick
    // 2. Apply baseline rules and track separately
    const beforeBaseline = { ...stats };
    const farmersBefore = stats.farmers;
    stats = applyBaseline(stats, updatedBuildingTracking);
    stats = clampStats(stats);
    const farmersAfter = stats.farmers;

    // Detect newly unlocked buildings
    const newlyUnlockedBuilding = detectNewlyUnlockedBuildings(farmersBefore, farmersAfter);

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

    // 2b. Apply bakery building effect (10% chance for +1 farmer growth)
    // Bakery growth is also capped by farmstead capacity
    const fstTracking = updatedBuildingTracking['farmstead'];
    const farmsteadCap = (fstTracking ? getEffectiveBuildingCount(fstTracking) : 0) * FARMERS_PER_FARMSTEAD;
    if (isBuildingActive(updatedBuildingTracking, 'bakery') && Math.random() < 0.10 && stats.farmers < farmsteadCap) {
      const beforeBakery = { ...stats };
      stats.farmers += 1;
      stats = clampStats(stats);

      // Log the bakery effect if it actually increased farmers
      if (stats.farmers > beforeBakery.farmers) {
        const bakeryChange: AppliedChange = {
          stat: 'farmers',
          amount: 1,
          source: 'building:bakery',
          note: 'Bakery boosted population growth',
        };

        newLog.push(createLogEntry(
          state.tick,
          state.currentRequestId,
          '',
          'Population Growth',
          beforeBakery,
          stats,
          [bakeryChange]
        ));
      }
    }

    // 2c. Apply overcrowding penalties
    const beforeOvercrowding = { ...stats };
    const overcrowdingResult = applyOvercrowdingPenalties(stats, updatedBuildingTracking);
    stats = clampStats(overcrowdingResult.stats);

    if (overcrowdingResult.changes.length > 0) {
      newLog.push(createLogEntry(
        state.tick,
        state.currentRequestId,
        '',
        'Overcrowding',
        beforeOvercrowding,
        stats,
        overcrowdingResult.changes
      ));
    }

    // Update building tracking (detect newly required buildings, etc.)
    let buildingTracking = { ...updatedBuildingTracking };

    // 2c2. Check construction completion (checked against next tick: tick + 1)
    let activeConstruction = state.activeConstruction ?? null;
    let completedDistricts = { ...state.completedDistricts };
    if (activeConstruction && state.tick + 1 >= activeConstruction.completionTick) {
      // Build a temporary state for completeConstruction.
      // We pass the current tick — completeConstruction schedules events for tick + 1.
      const tempState: GameState = {
        ...state,
        tick: state.tick, // current tick; completeConstruction schedules events for tick + 1
        buildingTracking,
        unlocks,
        chainStatus,
        scheduledEvents,
        completedDistricts,
        activeConstruction,
      };
      const completedState = completeConstruction(tempState);
      // Pull out the updated fields
      buildingTracking = completedState.buildingTracking;
      unlocks = completedState.unlocks;
      chainStatus = completedState.chainStatus;
      scheduledEvents = completedState.scheduledEvents;
      completedDistricts = completedState.completedDistricts;
      activeConstruction = null;
      // Add completion log entries
      newLog.push(...completedState.log.slice(state.log.length));
    }

    // Update unlockedAtTick for newly unlocked buildings
    if (newlyUnlockedBuilding) {
      const tracking = buildingTracking[newlyUnlockedBuilding];
      if (tracking && tracking.unlockedAtTick === undefined) {
        buildingTracking[newlyUnlockedBuilding] = { ...tracking, unlockedAtTick: state.tick + 1 };
      }
    }
    // Update lastRequirementTick when required buildings increase
    for (const def of BUILDING_DEFINITIONS) {
      const tracking = buildingTracking[def.id];
      if (!tracking) continue;
      const requiredBefore = calculateRequiredBuildings(def, farmersBefore);
      const requiredAfter = calculateRequiredBuildings(def, farmersAfter);
      if (requiredAfter > requiredBefore && requiredAfter > tracking.buildingCount) {
        buildingTracking[def.id] = { ...tracking, lastRequirementTick: state.tick + 1 };
      }
    }

    // 2d. Attempt a natural fire outbreak (V4 – no spread/destroy, just outbreak attempt)
    let fireState = updatedFire;
    const outbreakResult = attemptFireOutbreak(
      buildingTracking, fireState, scheduledEvents, FIRE_SYSTEM_CONFIG,
      stats.fireRisk, state.tick, false
    );
    fireState = outbreakResult.fireState;
    scheduledEvents = outbreakResult.scheduledEvents;
    // Sync building tracking after potential outbreak
    buildingTracking = syncBuildingTrackingFromSlots(buildingTracking, fireState.slots);

    // 3. Check for game over condition
    if (stats.gold <= -50) {
      return {
        tick: state.tick + 1,
        stats,
        buildingTracking,
        newlyUnlockedBuilding,
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
        pendingAuthorityChecks: state.pendingAuthorityChecks,
        fire: fireState,
        completedDistricts,
        activeConstruction,
      };
    }

    // 3.5. Resolve pending authority checks that are due
    let pendingAuthorityChecks = [...state.pendingAuthorityChecks];
    const nextTick = state.tick + 1;
    
    // Find checks that should resolve on the next tick
    const checksToResolve = pendingAuthorityChecks.filter(check => check.resolveTick === nextTick);
    
    // Process each check
    for (const check of checksToResolve) {
      const result = resolveAuthorityCheck(check);
      
      // Apply refund to authority
      if (result.refunded > 0) {
        stats.authority += result.refunded;
        stats = clampStats(stats);
      }
      
      // Apply success/failure effects if any
      if (result.appliedEffects) {
        stats = clampStats(applyEffects(stats, result.appliedEffects));
      }
      
      // Schedule feedback event if provided
      if (result.feedbackRequestId) {
        const feedbackEvent: ScheduledEvent = {
          targetTick: nextTick,
          requestId: result.feedbackRequestId,
          scheduledAtTick: state.tick,
          priority: 'normal',
        };
        scheduledEvents.push(feedbackEvent);
      }
      
      // Remove from pending checks
      pendingAuthorityChecks = pendingAuthorityChecks.filter(c => c.checkId !== check.checkId);
    }

    // Check building reminders before picking next request
    const reminderResult = checkBuildingReminders(state.tick + 1, stats, buildingTracking, scheduledEvents);
    buildingTracking = reminderResult.buildingTracking;
    scheduledEvents = reminderResult.scheduledEvents;

    // 4. Pick next request
    const nextRequest = pickNextRequest({
      tick: state.tick + 1,
      stats,
      buildingTracking,
      newlyUnlockedBuilding,
      currentRequestId: state.currentRequestId,
      lastRequestId: state.currentRequestId,
      log: state.log,
      gameOver: false,
      scheduledEvents,
      chainStatus,
      requestTriggerCounts,
      unlocks,
      scheduledCombats,
      pendingAuthorityChecks,
      fire: fireState,
      completedDistricts,
      activeConstruction,
    });

    // 4.5. Check if the picked request was a scheduled event with committed authority
    // If so, refund the authority since the boosted follow-up was successfully shown
    // Match using the same logic as pickNextRequest: find first event due for this tick
    const dueScheduledEvents = scheduledEvents.filter(
      event => event.requestId === nextRequest.id && event.targetTick <= state.tick + 1
    );
    
    // Sort by scheduledAtTick (FIFO) to match picker behavior
    dueScheduledEvents.sort((a, b) => {
      if (a.scheduledAtTick === b.scheduledAtTick) {
        return a.targetTick - b.targetTick;
      }
      return a.scheduledAtTick - b.scheduledAtTick;
    });
    
    const scheduledEvent = dueScheduledEvents[0];
    
    if (scheduledEvent?.authorityCommitContext) {
      const refundAmount = scheduledEvent.authorityCommitContext.committed;
      console.log(`[Authority Refund] Refunding ${refundAmount} authority from successful follow-up: ${nextRequest.id}`);
      stats.authority += refundAmount;
      stats = clampStats(stats);
    }

    // 5. Increment tick and update state
    return {
      tick: state.tick + 1,
      stats,
      buildingTracking,
      newlyUnlockedBuilding,
      currentRequestId: nextRequest.id,
      lastRequestId: state.currentRequestId,
      log: [...state.log, ...newLog],
      gameOver: false,
      scheduledEvents,
      chainStatus,
      requestTriggerCounts,
      unlocks,
      scheduledCombats,
      pendingAuthorityChecks,
      fire: fireState,
      completedDistricts,
      activeConstruction,
    };
  }

  // Handle BUILD_BUILDING action — starts timed construction (does NOT complete instantly)
  if (action.type === 'BUILD_BUILDING') {
    if (state.gameOver) return state;

    const def = getBuildingDef(action.buildingId);
    if (!def) {
      console.error('Unknown building ID:', action.buildingId);
      return state;
    }

    // Validate: no active construction (one at a time)
    if (state.activeConstruction) {
      console.error('Cannot start construction: another construction is already in progress');
      return state;
    }

    // Validate: building unlocked
    if (state.stats.farmers < def.unlockThreshold) {
      console.error('Building not unlocked:', action.buildingId, 'Need', def.unlockThreshold, 'farmers, have', state.stats.farmers);
      return state;
    }

    // Validate: repeatability — non-repeatable buildings cannot be built more than once
    if (!def.repeatable && (state.buildingTracking[action.buildingId]?.buildingCount ?? 0) >= 1) {
      console.error('Building not repeatable and already built:', action.buildingId);
      return state;
    }

    // Validate: build lock — cannot build if building has any active state (on fire, destroyed, on strike)
    const existingTracking = state.buildingTracking[action.buildingId];
    if (existingTracking && hasAnyBuildingState(existingTracking)) {
      console.error('Build locked: building has active state:', action.buildingId, {
        onFireCount: existingTracking.onFireCount,
        destroyedCount: existingTracking.destroyedCount,
        onStrikeCount: existingTracking.onStrikeCount,
      });
      return state;
    }

    // Validate: enough gold
    if (state.stats.gold < def.cost) {
      console.error('Not enough gold for:', action.buildingId, 'Need', def.cost, 'have', state.stats.gold);
      return state;
    }

    // Deduct gold immediately
    const newStats = clampStats({ ...state.stats, gold: state.stats.gold - def.cost });

    // Roll random construction duration using seeded RNG
    const duration = rollConstructionDuration(def.constructionTicksMin, def.constructionTicksMax);

    // Set active construction
    const activeConstruction: ActiveConstruction = {
      buildingId: action.buildingId,
      startedAtTick: state.tick,
      completionTick: state.tick + duration,
      constructionProfileId: getConstructionProfileForBuild(action.buildingId, state),
    };

    // Schedule construction start info request as tickless event (same tick).
    // Uses state.tick (current) so it's shown immediately, unlike the construction
    // end info request which is scheduled for tick + 1 (shown on the completing tick).
    const scheduledEvents = [...state.scheduledEvents];
    scheduledEvents.push({
      targetTick: state.tick,
      requestId: def.constructionStartInfoRequestId,
      scheduledAtTick: state.tick,
      priority: 'info',
    });

    // Create log entry for construction start
    const beforeStats = state.stats;
    const logEntry = createLogEntry(
      state.tick,
      `BUILD_START_${action.buildingId.toUpperCase()}`,
      `Started construction of ${def.displayName} (${duration} ticks)`,
      'Construction Started',
      beforeStats,
      newStats
    );

    return {
      ...state,
      stats: newStats,
      activeConstruction,
      scheduledEvents,
      log: [...state.log, logEntry],
    };
  }

  // Handle START_REPAIR_CHAIN action (V4)
  // Finds the lowest-ordinal repairable destroyed incident for the given building type,
  // sets its slot to chainActive=true with chainKind='repair', and schedules the repair chain START.
  if (action.type === 'START_REPAIR_CHAIN') {
    if (state.gameOver) return state;

    const tracking = state.buildingTracking[action.buildingId];
    if (!tracking || tracking.destroyedCount <= 0) {
      console.error('Cannot start repair chain: no destroyed units for', action.buildingId);
      return state;
    }

    // Find the repairable slot: assigned=true, unitStatus='destroyed', chainActive=false
    // Choose the lowest unitOrdinal among repairable incidents of this building type
    const repairableSlots = state.fire.slots
      .filter(s =>
        s.assigned &&
        s.targetBuildingId === action.buildingId &&
        s.unitStatus === 'destroyed' &&
        !s.chainActive
      )
      .sort((a, b) => (a.targetUnitOrdinal ?? 0) - (b.targetUnitOrdinal ?? 0));

    const targetSlot = repairableSlots[0];
    if (!targetSlot) {
      console.error('No repairable slot found for', action.buildingId);
      return state;
    }

    // Activate the repair chain on this slot
    const newSlots = state.fire.slots.map(s =>
      s.slotIndex === targetSlot.slotIndex
        ? { ...s, chainKind: 'repair' as const, chainActive: true, startedTick: state.tick }
        : s
    );
    const fire = { ...state.fire, slots: newSlots };

    // Schedule the repair chain START request
    const startRequestId = `REPAIRV4_S${targetSlot.slotIndex}_START`;
    const scheduledEvents = [
      ...state.scheduledEvents,
      {
        targetTick: state.tick + 1,
        requestId: startRequestId,
        scheduledAtTick: state.tick,
        priority: 'normal' as const,
      },
    ];

    return {
      ...state,
      fire,
      scheduledEvents,
    };
  }

  return state;
}

/**
 * Get the current request from the game state.
 * Handles both regular requests and synthetic requests (combat, combat reports).
 */
export function getCurrentRequest(state: GameState): Request | null {
  // Check if this is a synthetic combat round request
  if (state.currentRequestId.startsWith('COMBAT_ROUND::')) {
    if (!state.activeCombat) {
      return null;
    }
    
    const combat = state.activeCombat;
    const roundNumber = combat.round + 1;
    
    // Build text with current forces and last round results
    let text = `Your Forces: ${combat.committedRemaining}\nEnemy Forces: ${combat.enemyRemaining}`;
    
    if (combat.lastRound) {
      text += `\n\nLast Round:\nYour Losses: ${combat.lastRound.playerLosses}\nEnemy Losses: ${combat.lastRound.enemyLosses}`;
    }
    
    return {
      id: state.currentRequestId,
      title: `Battle – Round ${roundNumber}`,
      text,
      options: [
        {
          text: 'Continue Fighting',
          effects: {},
        },
        {
          text: 'Withdraw',
          effects: {},
        },
      ],
      advancesTick: false,
    };
  }
  
  // Check if this is a synthetic combat start request
  if (state.currentRequestId.startsWith('COMBAT_START::')) {
    // Extract combatId from the request ID (format: COMBAT_START::combatId)
    const combatId = state.currentRequestId.substring('COMBAT_START::'.length);
    
    // Look up the scheduled combat to get origin event info
    const scheduledCombat = state.scheduledCombats.find(c => c.combatId === combatId);
    
    // Build text with origin event name if available
    let text = 'Your forces are ready. The battle is about to commence!';
    if (scheduledCombat) {
      const originEventName = getRequestTitleFromId(scheduledCombat.originRequestId);
      text += `\n\nThis is the battle from: ${originEventName}`;
    }
    
    return {
      id: state.currentRequestId,
      title: 'Battle Begins',
      text,
      options: [
        {
          text: 'Begin Battle',
          effects: {},
        },
      ],
      advancesTick: false,
    };
  }
  
  // Check if this is a synthetic combat report request
  if (state.currentRequestId.startsWith('COMBAT_REPORT::')) {
    try {
      const parts = state.currentRequestId.split('::');
      if (!parts[2]) {
        throw new Error('Missing report data');
      }
      
      const reportDataStr = decodeURIComponent(parts[2]);
      const reportData = JSON.parse(reportDataStr);
      
      if (!reportData.outcome || !reportData.statDeltas) {
        throw new Error('Invalid report data');
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
      
      // Build consequences text
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
      
      
      // Single button instead of two - both options were functionally identical
      return {
        id: state.currentRequestId,
        title: 'Battle Report',
        text: `${outcomeText}\n\n${lossesText}${consequencesText}`,
        options: [
          {
            text: 'Continue',
            effects: {},
          },
        ],
        advancesTick: false, // Combat report is a tickless info screen
      };
    } catch (error) {
      console.error('Failed to parse combat report:', error);
      
      // Single button instead of two - both options were functionally identical
      return {
        id: state.currentRequestId,
        title: 'Battle Report',
        text: 'The battle has ended.',
        options: [
          {
            text: 'Continue',
            effects: {},
          },
        ],
        advancesTick: false, // Combat report is a tickless info screen
      };
    }
  }
  
  // Regular request - look it up in the arrays
  return [...infoRequests, ...authorityInfoRequests, ...eventRequests, ...fireChainRequests].find(
    (r) => r.id === state.currentRequestId
  ) || null;
}

/**
 * Initialize the game with the first request
 */
export function initializeGame(): GameState {
  // Reset RNG to get fresh random sequence for each new game
  resetRandom();
  
  const firstRequest = pickNextRequest(initialState);
  return {
    ...initialState,
    currentRequestId: firstRequest.id,
  };
}

/**
 * Returns the construction profile ID for a given building and game state.
 * Stub for future architect system — currently always returns 'default'.
 */
export function getConstructionProfileForBuild(
  _buildingId: string,
  _state: GameState
): string {
  return 'default';
}

/**
 * Check whether a new construction can be started for the given building.
 * Returns true if all preconditions are met:
 *   - No active construction in progress
 *   - Building definition exists
 *   - Building is unlocked (farmers >= threshold)
 *   - Non-repeatable buildings haven't already been built
 *   - No active fire/destroyed/strike state on the building
 *   - Enough gold to pay the cost
 */
export function canStartConstruction(state: GameState, buildingId: string): boolean {
  if (state.activeConstruction) return false;
  const def = getBuildingDef(buildingId);
  if (!def) return false;
  if (state.stats.farmers < def.unlockThreshold) return false;
  if (!def.repeatable && (state.buildingTracking[buildingId]?.buildingCount ?? 0) >= 1) return false;
  const tracking = state.buildingTracking[buildingId];
  if (tracking && hasAnyBuildingState(tracking)) return false;
  if (state.stats.gold < def.cost) return false;
  return true;
}

/**
 * Roll a random construction duration in ticks (inclusive on both ends)
 * using the seeded RNG for determinism.
 */
export function rollConstructionDuration(min: number, max: number): number {
  const range = max - min + 1;
  return min + Math.floor(getRandomValue() * range);
}

/**
 * Complete the active construction: increment buildingCount, apply unlock tokens,
 * check district completion, schedule info events, and clear activeConstruction.
 */
export function completeConstruction(state: GameState): GameState {
  const ac = state.activeConstruction;
  if (!ac) return state;

  const def = getBuildingDef(ac.buildingId);
  if (!def) return state;

  // 1. Increment building count
  const oldTracking = state.buildingTracking[ac.buildingId] ?? {
    buildingCount: 0,
    onFireCount: 0,
    destroyedCount: 0,
    onStrikeCount: 0,
    reminderScheduled: false,
    reminderCooldownUntil: 0,
  };
  const newTracking = {
    ...oldTracking,
    buildingCount: oldTracking.buildingCount + 1,
    reminderScheduled: false,
  };
  const buildingTracking = {
    ...state.buildingTracking,
    [ac.buildingId]: newTracking,
  };

  // 2. Sync building-based unlock tokens (handles def.unlockToken automatically)
  const unlocks = syncBuildingUnlockTokens(buildingTracking, { ...state.unlocks });

  // 3. Apply unlockTokensOnComplete from building definition
  if (def.unlockTokensOnComplete) {
    for (const token of def.unlockTokensOnComplete) {
      unlocks[token] = true;
    }
  }

  // 4. Apply eventChainUnlocksOnComplete from building definition
  const chainStatus = { ...state.chainStatus };
  if (def.eventChainUnlocksOnComplete) {
    for (const chainId of def.eventChainUnlocksOnComplete) {
      if (!chainStatus[chainId]) {
        chainStatus[chainId] = { active: false };
      }
    }
  }

  // 5. Schedule construction end info request
  const scheduledEvents = [...state.scheduledEvents];
  scheduledEvents.push({
    targetTick: state.tick + 1,
    requestId: def.constructionEndInfoRequestId,
    scheduledAtTick: state.tick,
    priority: 'info',
  });

  // 6. Check district completion
  const completedDistricts = { ...state.completedDistricts };
  if (def.districtId && !completedDistricts[def.districtId]) {
    if (isDistrictComplete(def.districtId, buildingTracking)) {
      completedDistricts[def.districtId] = true;

      const district = getDistrictDef(def.districtId);
      if (district) {
        // Apply district completion unlock tokens
        for (const token of district.completionUnlockTokens) {
          unlocks[token] = true;
        }
        // Apply district completion event chain unlocks
        for (const chainId of district.completionEventChainUnlocks) {
          if (!chainStatus[chainId]) {
            chainStatus[chainId] = { active: false };
          }
        }
        // Schedule district completion info request
        if (district.completionInfoRequestId) {
          scheduledEvents.push({
            targetTick: state.tick + 1,
            requestId: district.completionInfoRequestId,
            scheduledAtTick: state.tick,
            priority: 'info',
          });
        }
      }
    }
  }

  // 7. Create log entry for construction completion
  const logEntry = createLogEntry(
    state.tick,
    `BUILD_${ac.buildingId.toUpperCase()}`,
    `Construction of ${def.displayName} complete`,
    'Construction Complete',
    state.stats,
    state.stats
  );

  return {
    ...state,
    buildingTracking,
    unlocks,
    chainStatus,
    scheduledEvents,
    completedDistricts,
    activeConstruction: null,
    log: [...state.log, logEntry],
  };
}
