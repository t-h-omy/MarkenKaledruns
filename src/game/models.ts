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
 * Tracking data for need progression system with persistent building counts
 */
export interface NeedTracking {
  /** Number of buildings built for this need (persistent, never decreases) */
  buildingCount: number;
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
 * Need configuration including unlock thresholds and population scaling
 */
export interface NeedConfig {
  /** Population required to unlock the first building */
  unlockThreshold: number;
  /** Population increase required for each additional building after the first */
  populationPerBuilding: number;
}

/**
 * Configuration for each need with unlock threshold and population scaling
 */
export const NEED_CONFIGS: Record<keyof Needs, NeedConfig> = {
  marketplace: { unlockThreshold: 30, populationPerBuilding: 100 },
  bread: { unlockThreshold: 60, populationPerBuilding: 120 },
  beer: { unlockThreshold: 100, populationPerBuilding: 150 },
  firewood: { unlockThreshold: 170, populationPerBuilding: 180 },
  well: { unlockThreshold: 250, populationPerBuilding: 200 },
};

/**
 * Need unlock thresholds (farmers population required) - for backward compatibility
 */
export const NEED_UNLOCK_THRESHOLDS: Record<keyof Needs, number> = {
  marketplace: NEED_CONFIGS.marketplace.unlockThreshold,
  bread: NEED_CONFIGS.bread.unlockThreshold,
  beer: NEED_CONFIGS.beer.unlockThreshold,
  firewood: NEED_CONFIGS.firewood.unlockThreshold,
  well: NEED_CONFIGS.well.unlockThreshold,
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
 * Represents a weighted candidate for follow-up selection
 */
export interface WeightedCandidate {
  /** Request ID to schedule as follow-up */
  requestId: string;
  /** Selection weight (higher = more likely) */
  weight: number;
}

/**
 * Represents a follow-up event definition
 */
export interface FollowUp {
  /** Option index that triggers this follow-up (0 or 1) */
  triggerOnOptionIndex: number;
  /** Minimum ticks to wait before showing follow-up */
  delayMinTicks: number;
  /** Maximum ticks to wait before showing follow-up */
  delayMaxTicks: number;
  /** Array of weighted candidates to choose from */
  candidates: WeightedCandidate[];
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
  /** Optional follow-up events scheduled when specific options are chosen */
  followUps?: FollowUp[];
}
