/**
 * Request picker with deterministic RNG support for debugging.
 * Based on POF_SPEC.md specification.
 */

import type { Stats, Needs, Request, NeedsProgress } from './models';
import { needRequests, eventRequests } from './requests';
import { isNeedEligible } from './state';

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
 * 4. Else if any eligible need-requests => pick randomly among them
 * 5. Else pick a random event among all 25
 * 
 * Never repeats lastRequestId.
 */
export function pickNextRequest(
  currentTick: number,
  stats: Stats,
  _needs: Needs, // eslint-disable-line @typescript-eslint/no-unused-vars
  needsProgress: NeedsProgress,
  lastRequestId: string
): Request {
  // Crisis requests by priority order
  if (stats.fireRisk > 70) {
    const crisisRequest = eventRequests.find((r) => r.id === 'EVT_CRISIS_FIRE');
    if (crisisRequest && crisisRequest.id !== lastRequestId) return crisisRequest;
  }
  if (stats.health < 30) {
    const crisisRequest = eventRequests.find((r) => r.id === 'EVT_CRISIS_DISEASE');
    if (crisisRequest && crisisRequest.id !== lastRequestId) return crisisRequest;
  }
  if (stats.satisfaction < 30) {
    const crisisRequest = eventRequests.find((r) => r.id === 'EVT_CRISIS_UNREST');
    if (crisisRequest && crisisRequest.id !== lastRequestId) return crisisRequest;
  }

  // If any needs are eligible (unlocked + required + not on cooldown), pick one randomly
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
    if (isNeedEligible(needKey, stats.farmers, currentTick, needsProgress)) {
      const req = needRequests.find((r) => r.id === needIdMap[needKey]);
      if (req) eligibleNeeds.push(req);
    }
  }

  if (eligibleNeeds.length > 0) {
    // Filter out last request if it's in the list
    const availableNeeds = eligibleNeeds.filter((r) => r.id !== lastRequestId);
    if (availableNeeds.length > 0) {
      return availableNeeds[rng.nextInt(availableNeeds.length)];
    }
    // If all eligible needs were last request, fall through to random events
  }

  // Pick random event request (excluding last request and crisis events)
  // Crisis events should ONLY appear through the explicit conditions above
  const crisisEventIds = ['EVT_CRISIS_FIRE', 'EVT_CRISIS_DISEASE', 'EVT_CRISIS_UNREST'];
  const availableEvents = eventRequests.filter(
    (r) => r.id !== lastRequestId && !crisisEventIds.includes(r.id)
  );
  if (availableEvents.length > 0) {
    return availableEvents[rng.nextInt(availableEvents.length)];
  }

  // Fallback: pick any non-crisis event (shouldn't happen with 25 events)
  const nonCrisisEvents = eventRequests.filter((r) => !crisisEventIds.includes(r.id));
  return nonCrisisEvents[rng.nextInt(nonCrisisEvents.length)];
}
