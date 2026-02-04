/**
 * TypeScript models for the Proof-of-Fun game.
 * Based on POF_SPEC.md specification.
 */

/**
 * Game statistics that track the state of the village.
 * All stats are visible to the player.
 */
export interface Stats {
  /** Gold currency (must be >= 0) */
  gold: number;
  /** Satisfaction level (0..100, higher is better) */
  satisfaction: number;
  /** Health level (0..100, higher is better) */
  health: number;
  /** Fire risk level (0..100, higher is worse) */
  fireRisk: number;
  /** Number of farmers (must be >= 0) */
  farmers: number;
  /** Number of land forces (>= 0, optionally clamp to 0..100) */
  landForces: number;
}

/**
 * Boolean flags representing village needs.
 * Each need can be fulfilled once per 100 farmers via its need-request.
 */
export interface Needs {
  /** Whether marketplace has been built */
  marketplace: boolean;
  /** Whether bread production is supported */
  bread: boolean;
  /** Whether beer production is allowed */
  beer: boolean;
  /** Whether firewood supply is organized */
  firewood: boolean;
  /** Whether well has been built */
  well: boolean;
}

/**
 * Tracking data for need progression system
 */
export interface NeedTracking {
  /** Last cycle index when this need was fulfilled (0 if never fulfilled) */
  lastFulfilledCycleIndex: number;
  /** Next tick when this need becomes eligible again after being declined */
  nextEligibleTick: number;
}

/**
 * All need tracking data keyed by need name
 */
export interface NeedsTracking {
  marketplace: NeedTracking;
  bread: NeedTracking;
  beer: NeedTracking;
  firewood: NeedTracking;
  well: NeedTracking;
}

/**
 * Need unlock thresholds (farmers population required)
 */
export const NEED_UNLOCK_THRESHOLDS: Record<keyof Needs, number> = {
  marketplace: 30,
  bread: 60,
  beer: 100,
  firewood: 170,
  well: 250,
};

/**
 * Decline cooldown duration in ticks
 */
export const DECLINE_COOLDOWN_TICKS = 5;

/**
 * Represents changes to game state (stats or needs).
 * Each property is optional and represents a delta or assignment.
 */
export interface Effect {
  /** Change in gold amount */
  gold?: number;
  /** Change in satisfaction level */
  satisfaction?: number;
  /** Change in health level */
  health?: number;
  /** Change in fire risk level */
  fireRisk?: number;
  /** Change in farmers count */
  farmers?: number;
  /** Change in land forces count */
  landForces?: number;
  /** Set marketplace need flag */
  marketplace?: boolean;
  /** Set bread need flag */
  bread?: boolean;
  /** Set beer need flag */
  beer?: boolean;
  /** Set firewood need flag */
  firewood?: boolean;
  /** Set well need flag */
  well?: boolean;
}

/**
 * Represents a player choice option in a request.
 */
export interface Option {
  /** The text displayed for this option */
  text: string;
  /** The effects applied when this option is chosen */
  effects: Effect;
}

/**
 * Represents a request (event or need) presented to the player.
 */
export interface Request {
  /** Unique stable identifier for this request */
  id: string;
  /** The title of the request */
  title: string;
  /** The text/description of the request */
  text: string;
  /** Array of options (max 2) the player can choose from */
  options: Option[];
}
