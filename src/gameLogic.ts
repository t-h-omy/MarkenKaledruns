import type { GameState, Effect, StatKey } from './types';
import { getRandomRequest } from './gameData';

// Initial game state based on POF_SPEC.md
export function createInitialState(): GameState {
  const farmers = 100;
  return {
    farmers,
    gold: 500,
    food: 200,
    housingCapacity: 25,
    foodProduction: 15,
    housingNeed: Math.floor(farmers / 4),
    foodNeed: Math.floor(farmers / 10),
    tick: 0,
    currentRequest: null,
    lastEffects: [],
    showingFeedback: false
  };
}

// Calculate derived needs
export function calculateNeeds(farmers: number): { housingNeed: number; foodNeed: number } {
  return {
    housingNeed: Math.floor(farmers / 4),
    foodNeed: Math.floor(farmers / 10)
  };
}

// Apply effects to game state
export function applyEffects(state: GameState, effects: Effect[]): GameState {
  let newState = { ...state };
  
  effects.forEach(effect => {
    const statKey = effect.stat as StatKey;
    if (statKey in newState) {
      const currentValue = newState[statKey] as number;
      const newValue = currentValue + effect.change;
      
      // Apply constraints
      if (statKey === 'farmers' || statKey === 'housingCapacity' || statKey === 'foodProduction') {
        newState[statKey] = Math.max(0, newValue);
      } else {
        newState[statKey] = newValue;
      }
    }
  });
  
  return newState;
}

// Apply baseline effects (income, food change, population growth)
export function applyBaselineEffects(state: GameState): { state: GameState; effects: Effect[] } {
  const baselineEffects: Effect[] = [];
  
  // Income: +10 gold per tick
  baselineEffects.push({ stat: 'gold', change: 10 });
  
  // Food change: foodProduction - foodNeed
  const foodChange = state.foodProduction - state.foodNeed;
  if (foodChange !== 0) {
    baselineEffects.push({ stat: 'food', change: foodChange });
  }
  
  // Population growth/decline
  const hasEnoughFood = state.food >= state.foodNeed;
  const hasEnoughHousing = state.housingCapacity >= state.housingNeed;
  
  if (hasEnoughFood && hasEnoughHousing) {
    // Growth: +1 farmer
    baselineEffects.push({ stat: 'farmers', change: 1 });
  } else if (!hasEnoughFood || !hasEnoughHousing) {
    // Decline: -1 farmer
    baselineEffects.push({ stat: 'farmers', change: -1 });
  }
  
  // Apply all baseline effects
  let newState = applyEffects(state, baselineEffects);
  
  // Recalculate needs
  const needs = calculateNeeds(newState.farmers);
  newState = {
    ...newState,
    housingNeed: needs.housingNeed,
    foodNeed: needs.foodNeed,
    tick: state.tick + 1
  };
  
  return { state: newState, effects: baselineEffects };
}

// Handle choosing a request option
export function chooseOption(state: GameState, optionIndex: number): GameState {
  if (!state.currentRequest) return state;
  
  const option = state.currentRequest.options[optionIndex];
  if (!option) return state;
  
  // Apply option effects
  let newState = applyEffects(state, option.effects);
  
  // Update needs after applying effects
  const needs = calculateNeeds(newState.farmers);
  newState = {
    ...newState,
    housingNeed: needs.housingNeed,
    foodNeed: needs.foodNeed,
    lastEffects: option.effects,
    showingFeedback: true
  };
  
  return newState;
}

// Continue after feedback (apply baseline effects and load next request)
export function continueGame(state: GameState): GameState {
  // Apply baseline effects
  const { state: stateAfterBaseline, effects: baselineEffects } = applyBaselineEffects(state);
  
  // Combine with previous effects for display
  const allEffects = [...state.lastEffects, ...baselineEffects];
  
  // Load next request
  const nextRequest = getRandomRequest();
  
  return {
    ...stateAfterBaseline,
    currentRequest: nextRequest,
    lastEffects: allEffects,
    showingFeedback: false
  };
}

// Start a new game
export function startGame(state: GameState): GameState {
  const request = getRandomRequest();
  return {
    ...state,
    currentRequest: request,
    showingFeedback: false
  };
}
