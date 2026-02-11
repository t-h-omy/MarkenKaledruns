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
  /** Authority stat (0..999.999, represents political power/influence) */
  authority: number;
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
 * Mapping from need ID to corresponding info request ID
 * Info requests are scheduled when a need is fulfilled for the first time
 */
export const NEED_INFO_REQUEST_MAP: Record<keyof Needs, string> = {
  marketplace: 'INFO_NEED_MARKETPLACE',
  bread: 'INFO_NEED_BREAD',
  beer: 'INFO_NEED_BEER',
  firewood: 'INFO_NEED_FIREWOOD',
  well: 'INFO_NEED_WELL',
};

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
  /** Change in authority level */
  authority?: number;
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
 * Combat outcome type
 */
export type CombatOutcome = "win" | "lose";

/**
 * Combat specification for a request
 */
export interface CombatSpec {
  /** Number of enemy forces in the combat */
  enemyForces: number;
  /** Minimum ticks to wait before combat starts */
  prepDelayMinTicks: number;
  /** Maximum ticks to wait before combat starts */
  prepDelayMaxTicks: number;
  /** Effects applied when combat is won */
  onWin?: Effect;
  /** Effects applied when combat is lost */
  onLose?: Effect;
  /** Follow-up events triggered on win (chain support) */
  followUpsOnWin?: FollowUp[];
  /** Follow-up events triggered on lose (chain support) */
  followUpsOnLose?: FollowUp[];
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
 * Configuration for an authority check on an option.
 * When an option has an authority check, the player can commit authority
 * and the check resolves on the next tick (delay=1).
 */
export interface AuthorityCheck {
  /** Minimum authority commitment required (can be 0 for optional commitment) */
  minCommit: number;
  /** Maximum authority commitment allowed */
  maxCommit: number;
  /** Authority threshold needed for success (commitment >= threshold = success) */
  threshold: number;
  /** Effects applied when check succeeds (in addition to base option effects) */
  onSuccess?: Effect;
  /** Effects applied when check fails (in addition to base option effects) */
  onFailure?: Effect;
  /** Request ID to show as feedback on success (scheduled for tick+1) */
  successFeedbackRequestId?: string;
  /** Request ID to show as feedback on failure (scheduled for tick+1) */
  failureFeedbackRequestId?: string;
  /** Percentage of committed authority refunded on success (0-100, default: 100) */
  refundOnSuccessPercent?: number;
  /** Extra authority loss on failure as a fixed whole number (default: 0) */
  extraLossOnFailure?: number;
}

/**
 * Result of an authority check after resolution
 */
export interface AuthorityCheckResult {
  /** Whether the check succeeded */
  success: boolean;
  /** Amount of authority that was committed */
  committed: number;
  /** Amount of authority refunded (on success) */
  refunded: number;
  /** Total authority loss (committed - refunded + extra loss on failure) */
  totalLoss: number;
  /** Effects applied based on success/failure */
  appliedEffects?: Effect;
  /** Request ID for feedback event (if any) */
  feedbackRequestId?: string;
}

/**
 * Represents a player choice option in a request.
 */
export interface Option {
  /** The text displayed for this option */
  text: string;
  /** The effects applied when this option is chosen */
  effects: Effect;
  /** Optional authority check for this option */
  authorityCheck?: AuthorityCheck;
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
  /** Whether this event can be selected randomly (default: true). Set to false for events that should only appear as follow-ups. */
  canTriggerRandomly?: boolean;
  /** Identifies which chain the request belongs to (e.g., "BLACKGEAT") */
  chainId?: string;
  /** Explicitly marks the role of this request in a chain */
  chainRole?: 'start' | 'member' | 'end';
  /** Cooldown in ticks before chain can start randomly again after completion (only meaningful on start or end) */
  chainRestartCooldownTicks?: number;
  /** Maximum number of times this request can trigger across entire game run (undefined = unlimited) */
  maxTriggers?: number;
  /** Array of unlock tokens required to show this event */
  requires?: string[];
  /** Whether choosing an option should advance the game tick (default: true). Set to false for info/tutorial requests. */
  advancesTick?: boolean;
  /** Optional combat specification for this request */
  combat?: CombatSpec;
  /** Authority range filter: minimum authority required to show this event */
  authorityMin?: number;
  /** Authority range filter: maximum authority allowed to show this event */
  authorityMax?: number;
}
