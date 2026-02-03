/**
 * Request picker with deterministic RNG support for debugging.
 * Based on POF_SPEC.md specification.
 */

import type { GameState } from './state';
import type { Stats, Needs, Request } from './models';
import { needRequests, eventRequests } from './requests';

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
 * Picks the next request based on selection rules from POF_SPEC.md
 * 
 * Priority order:
 * 1. If fireRisk > 70 => pick EVT_CRISIS_FIRE
 * 2. Else if health < 30 => pick EVT_CRISIS_DISEASE
 * 3. Else if satisfaction < 30 => pick EVT_CRISIS_UNREST
 * 4. Else if any need is false => pick randomly among unfulfilled need-requests
 * 5. Else pick a random event among all 25
 * 
 * Never repeats lastRequestId.
 */
export function pickNextRequest(state: GameState): Request;
export function pickNextRequest(stats: Stats, needs: Needs, lastRequestId: string): Request;
export function pickNextRequest(
  stateOrStats: GameState | Stats,
  needs?: Needs,
  lastRequestId?: string
): Request {
  // Handle both function signatures
  let stats: Stats;
  let actualNeeds: Needs;
  let actualLastRequestId: string;

  if ('tick' in stateOrStats) {
    // Called with GameState
    stats = stateOrStats.stats;
    actualNeeds = stateOrStats.needs;
    actualLastRequestId = stateOrStats.lastRequestId;
  } else {
    // Called with individual parameters
    stats = stateOrStats;
    actualNeeds = needs!;
    actualLastRequestId = lastRequestId!;
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

  // If any needs are unfulfilled, pick one randomly
  const unfulfilledNeeds: Request[] = [];
  const needKeys: Array<keyof Needs> = ['marketplace', 'bread', 'beer', 'firewood', 'well'];
  const needIdMap: Record<keyof Needs, string> = {
    marketplace: 'NEED_MARKETPLACE',
    bread: 'NEED_BREAD',
    beer: 'NEED_BEER',
    firewood: 'NEED_FIREWOOD',
    well: 'NEED_WELL',
  };

  for (const needKey of needKeys) {
    if (!actualNeeds[needKey]) {
      const req = needRequests.find((r) => r.id === needIdMap[needKey]);
      if (req) unfulfilledNeeds.push(req);
    }
  }

  if (unfulfilledNeeds.length > 0) {
    // Filter out last request if it's in the list
    const availableNeeds = unfulfilledNeeds.filter((r) => r.id !== actualLastRequestId);
    if (availableNeeds.length > 0) {
      return availableNeeds[rng.nextInt(availableNeeds.length)];
    }
    // If all unfulfilled needs were last request, fall through to random events
  }

  // Pick random event request (excluding last request)
  const availableEvents = eventRequests.filter((r) => r.id !== actualLastRequestId);
  if (availableEvents.length > 0) {
    return availableEvents[rng.nextInt(availableEvents.length)];
  }

  // Fallback: pick any event (shouldn't happen with 25 events)
  return eventRequests[rng.nextInt(eventRequests.length)];
}
