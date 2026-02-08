/**
 * Event-reactive need modifiers
 * 
 * These modifiers trigger when specific needs are fulfilled and certain stat changes occur.
 * They only apply to event decision effects, not baseline tick income/growth.
 * 
 * Rounding Strategy: floor (for consistency with other game calculations)
 * Gating Strategy: base delta is used for farmers/landForces >= 0 checks
 */

import type { GameState, AppliedChange, ModifierHook } from './state';
import type { Effect } from './models';

/**
 * Firewood modifier: When an event would increase fireRisk, there's a 25% chance
 * to reduce that increase by 50% (floor rounding).
 * 
 * Only triggers if:
 * - Firewood need is fulfilled (needs.firewood === true)
 * - fireRisk delta > 0 (actual increase)
 */
export const firewoodModifier: ModifierHook = (state, request, optionIndex, baseDelta, changes) => {
  const delta = { ...baseDelta };
  const extraChanges: AppliedChange[] = [];
  
  // Check if firewood need is fulfilled
  if (!state.needs.firewood) {
    return { delta, extraChanges };
  }
  
  // Check if fireRisk would increase
  if (delta.fireRisk && delta.fireRisk > 0) {
    // 25% chance to reduce the increase
    if (Math.random() < 0.25) {
      const originalIncrease = delta.fireRisk;
      const reducedIncrease = Math.floor(originalIncrease / 2);
      const reduction = originalIncrease - reducedIncrease;
      
      // Update the delta
      delta.fireRisk = reducedIncrease;
      
      // Log the reduction as a separate change
      extraChanges.push({
        stat: 'fireRisk',
        amount: -reduction,
        source: 'need:firewood',
        note: `Firewood supply reduced fire risk increase from ${originalIncrease} to ${reducedIncrease}`,
      });
    }
  }
  
  return { delta, extraChanges };
};

/**
 * Well modifier: When an event would increase health, there's a 50% chance
 * to add +1 additional health (respecting 0-100 clamp).
 * 
 * Only triggers if:
 * - Well need is fulfilled (needs.well === true)
 * - health delta > 0 (actual increase)
 */
export const wellModifier: ModifierHook = (state, request, optionIndex, baseDelta, changes) => {
  const delta = { ...baseDelta };
  const extraChanges: AppliedChange[] = [];
  
  // Check if well need is fulfilled
  if (!state.needs.well) {
    return { delta, extraChanges };
  }
  
  // Check if health would increase
  if (delta.health && delta.health > 0) {
    // 50% chance to add +1 health
    if (Math.random() < 0.5) {
      // Add +1 to the health delta
      delta.health = delta.health + 1;
      
      // Log the bonus as a separate change
      extraChanges.push({
        stat: 'health',
        amount: 1,
        source: 'need:well',
        note: 'Well provided additional health benefit',
      });
    }
  }
  
  return { delta, extraChanges };
};

/**
 * Array of all need modifiers that should be applied to event decisions.
 * These are applied in order when processing option effects.
 */
export const needModifiers: ModifierHook[] = [
  firewoodModifier,
  wellModifier,
];
