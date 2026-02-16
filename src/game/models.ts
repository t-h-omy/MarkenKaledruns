/**
 * TypeScript models for Die Marken Kaledruns.
 * Core type definitions for the game engine.
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
 * Represents changes to game state (stat deltas).
 * Each property is optional and represents a delta.
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
 * Defines how authority commitment boosts follow-up event probabilities.
 * Authority commits INCREASE the weight of specified follow-up events,
 * making them more likely to occur.
 */
export interface AuthorityFollowUpBoost {
  /**
   * Target follow-up request ID whose probability should be increased.
   * This should match a requestId in the followUps.candidates array.
   */
  targetRequestId: string;

  /**
   * Boost type determines how authority commitment affects probability:
   * - "linear": weight increases linearly with authority committed
   *   Formula: weight += (committed / maxCommit) * boostValue
   *   Example: boostValue=2 means +2 weight at max commit, +1 at 50% commit
   *
   * - "threshold": weight increases if commitment crosses threshold
   *   Formula: weight += boostValue if committed >= threshold, else +0
   *   Example: boostValue=3 means +3 weight only if threshold met
   *
   * - "stepped": weight increases in discrete steps
   *   Formula: weight += floor((committed / maxCommit) * steps) * boostValue
   *   Example: steps=3, boostValue=1 means +0/+1/+2/+3 at 0%/33%/66%/100%
   */
  boostType: "linear" | "threshold" | "stepped";

  /**
   * Boost value interpretation depends on boostType:
   * - linear: maximum weight increase at 100% commitment
   * - threshold: fixed weight increase when threshold crossed
   * - stepped: weight increase per step
   */
  boostValue: number;

  /**
   * For "stepped" boostType: number of discrete steps (default: 3)
   * Ignored for other types.
   */
  steps?: number;

  /**
   * Optional description shown to player explaining what this boost affects.
   * Example: "Increases chance traveler is helpful"
   */
  description?: string;
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
  /** Authority threshold needed for success (commitment >= threshold = success). Optional - only needed when onSuccess/onFailure are defined. */
  threshold?: number;
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
  /** Follow-up probability boosts (influences future event probabilities) */
  followUpBoosts?: AuthorityFollowUpBoost[];
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
