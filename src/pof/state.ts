/**
 * Reducer-based state engine for the Proof-of-Fun game.
 * Based on POF_SPEC.md specification.
 */

import type { Stats, Needs, Effect } from './models';
import { needRequests, eventRequests } from './requests';
import { pickNextRequest } from './picker';

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
 * Complete game state
 */
export interface GameState {
  tick: number;
  stats: Stats;
  needs: Needs;
  currentRequestId: string;
  lastRequestId: string;
  log: LogEntry[];
  gameOver: boolean;
  gameOverReason?: string;
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
  currentRequestId: '',
  lastRequestId: '',
  log: [],
  gameOver: false,
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
 * Applies baseline rules according to POF_SPEC.md:
 * - gold += floor(0.1 * (farmers * (satisfaction / 100)))
 * - farmers += floor(health / 10)
 */
function applyBaseline(stats: Stats): Stats {
  const goldIncome = Math.floor(0.1 * (stats.farmers * ((stats.satisfaction-10) / 100)));
  const farmerGrowth = Math.floor((stats.health-30) / 20);

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
 * Main reducer function for game state
 */
export function gameReducer(state: GameState, action: GameAction): GameState {
  if (action.type === 'CHOOSE_OPTION') {
    // Prevent actions when game is over
    if (state.gameOver) {
      return state;
    }

    // Find the current request
    const currentRequest = [...needRequests, ...eventRequests].find(
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

    // 1. Apply option effects
    const { stats: statsAfterEffects, needs } = applyEffects(state.stats, state.needs, option.effects);
    let stats = clampStats(statsAfterEffects);

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

    // 2. Apply baseline rules and track separately
    const beforeBaseline = { ...stats };
    stats = applyBaseline(stats);
    stats = clampStats(stats);

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
        currentRequestId: state.currentRequestId,
        lastRequestId: state.currentRequestId,
        log: [...state.log, ...newLog],
        gameOver: true,
        gameOverReason: 'Bankruptcy! Your gold has reached -50.',
      };
    }

    // 4. Pick next request
    const nextRequest = pickNextRequest(stats, needs, state.currentRequestId);

    // 5. Increment tick and update state
    return {
      tick: state.tick + 1,
      stats,
      needs,
      currentRequestId: nextRequest.id,
      lastRequestId: state.currentRequestId,
      log: [...state.log, ...newLog],
      gameOver: false,
    };
  }

  return state;
}

/**
 * Initialize the game with the first request
 */
export function initializeGame(): GameState {
  const firstRequest = pickNextRequest(initialState.stats, initialState.needs, '');
  return {
    ...initialState,
    currentRequestId: firstRequest.id,
  };
}
