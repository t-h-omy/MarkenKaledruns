# Guide: How to Create New Request-Chains for Marken Kaledruns

> **Audience:** This guide is written for AI agents tasked with authoring request-chain content. All instructions are structured as explicit rules and lookup tables to minimize ambiguity and maximize consistency. If you are a human reader, the same rules apply.

---

## 1. Introduction

This guide teaches you how to design and implement new **request-chains** for *Die Marken Kaledruns* — a turn-based village management strategy game where the player governs a settlement by responding to events called "requests."

**Before you begin, read [`PROJECT_OVERVIEW.md`](https://github.com/t-h-omy/MarkenKaledruns/blob/main/PROJECT_OVERVIEW.md).** It covers the complete project architecture, all game systems (stats, buildings, authority, combat, fire), and the data flow. Understanding the full picture is essential before authoring chains, because every request you write interacts with the game's stat economy, authority system, and event scheduler.

This guide covers three areas:

1. **How requests are structured** — the data model, its hierarchy, and every parameter available to you.
2. **Rational design approach** — KPI-driven best practices for sizing chains, balancing resources, using authority, and avoiding dead-ends.
3. **Narrative design approach** — how to tell compelling stories within the system's constraints, including portrait management and branch structure.

---

## 2. How Requests Are Structured

All request data lives in `src/game/requests.ts`. The type definitions are in `src/game/models.ts`.

### 2.1 The Request Interface (Top Level)

```typescript
export interface Request {
  id: string;                              // Unique stable identifier
  title: string;                           // Display title
  text: string;                            // Event description
  options: Option[];                       // 1–2 choices
  followUps?: FollowUp[];                  // Scheduled future events
  canTriggerRandomly?: boolean;            // false = follow-up only (default: true)
  chainId?: string;                        // Chain membership (e.g., "BLACKGEAT")
  chainRole?: 'start' | 'member' | 'end'; // Role in a chain
  chainRestartCooldownTicks?: number;      // Ticks before chain can restart
  maxTriggers?: number;                    // Max total triggers across game run (undefined = unlimited)
  requires?: string[];                     // Unlock token requirements (e.g. ['building:marketplace'])
  advancesTick?: boolean;                  // false = tickless/info (default: true)
  combat?: CombatSpec;                     // Combat specification (optional)
  authorityMin?: number;                   // Min authority to show this event
  authorityMax?: number;                   // Max authority to show this event
  portraitId: PortraitId;                  // REQUIRED — portrait key from portrait registry
}
```

### 2.2 Options

```typescript
export interface Option {
  text: string;                   // Button label (e.g. "PAY", "REFUSE AND ARM")
  effects: Effect;                // Stat deltas applied immediately
  authorityCheck?: AuthorityCheck; // Optional authority gamble
}
```

**Constraint:** A request has 1–2 options. **There can only be one option with an `authorityCheck` per request.** If one option has an authority check, the other option must be a plain choice without one. Similarly, **there can only be one option that triggers combat per request.** The second option must offer a non-combat alternative.

### 2.3 Effects (Stat Deltas)

Every option's `effects`, authority `onSuccess`/`onFailure`, and combat `onWin`/`onLose` use the same `Effect` type:

```typescript
export interface Effect {
  gold?: number;          // 💰 (range: -50 to ∞)
  satisfaction?: number;  // 😊 (clamped 0–100)
  health?: number;        // ❤️ (clamped 0–100)
  fireRisk?: number;      // 🔥 (clamped 0–100, higher = worse)
  farmers?: number;       // 👨‍🌾 (clamped 0 to ∞)
  landForces?: number;    // ⚔️ (clamped 0 to ∞)
  authority?: number;     // 👑 (clamped 0–999.999)
}
```

### 2.4 Follow-Ups

Connects one request to the next in a chain.

```typescript
export interface FollowUp {
  triggerOnOptionIndex: number;      // 0 or 1 — which option triggers this
  delayMinTicks: number;             // Minimum ticks before showing
  delayMaxTicks: number;             // Maximum ticks before showing
  candidates: WeightedCandidate[];   // Which request(s) can appear
}

export interface WeightedCandidate {
  requestId: string;   // Target request ID
  weight: number;      // Higher = more likely when multiple candidates exist
}
```

### 2.5 Combat Specification

```typescript
export interface CombatSpec {
  enemyForces: number;               // Number of enemy forces
  prepDelayMinTicks: number;         // Min ticks before combat starts
  prepDelayMaxTicks: number;         // Max ticks before combat starts
  onWin?: Effect;                    // Effects on victory
  onLose?: Effect;                   // Effects on defeat
  followUpsOnWin?: FollowUp[];       // Follow-up events on victory
  followUpsOnLose?: FollowUp[];      // Follow-up events on defeat
}
```

### 2.6 Authority Check

```typescript
export interface AuthorityCheck {
  minCommit: number;                        // Minimum authority commitment required (can be 0)
  maxCommit: number;                        // Maximum authority commitment allowed
  threshold?: number;                       // Authority threshold for success (commit >= threshold = success)
  minSuccessChance?: number;                // Min success % (0–100, default: 50)
  maxSuccessChance?: number;                // Max success % (0–100, default: 50)
  onSuccess?: Effect;                       // Bonus effects on success (added to base option effects)
  onFailure?: Effect;                       // Penalty effects on failure (added to base option effects)
  successFeedbackRequestId?: string;        // Info event shown on success (tick+1)
  failureFeedbackRequestId?: string;        // Info event shown on failure (tick+1)
  refundOnSuccessPercent?: number;          // % of committed authority refunded on success (0–100, default: 100)
  extraLossOnFailure?: number;              // Extra authority lost on failure as fixed number (default: 0)
  followUpBoosts?: AuthorityFollowUpBoost[]; // Influence future event probabilities
}
```

**Resolution:** Authority checks resolve on the **next tick** (delay = 1). Success/failure is probabilistic based on committed amount, scaled between `minSuccessChance` and `maxSuccessChance`.

### 2.7 Authority Follow-Up Boosts

```typescript
export interface AuthorityFollowUpBoost {
  targetRequestId: string;                       // Follow-up request ID to boost
  boostType: "linear" | "threshold" | "stepped"; // How commitment affects probability
  boostValue: number;                            // Weight increase amount
  steps?: number;                                // For "stepped" only (default: 3)
  description?: string;                          // UI hint, e.g. "Increases chance of peaceful outcome"
}
```

**Boost type formulas:**
- `linear`: `weight += (committed / maxCommit) * boostValue`
- `threshold`: `weight += boostValue` if `committed >= threshold`, else `+0`
- `stepped`: `weight += floor((committed / maxCommit) * steps) * boostValue`

### 2.8 The Full Hierarchy Diagram

```
Request (REQUIRED: id, title, text, options, portraitId)
├── id, title, text, chainId, chainRole, portraitId, ...
├── options[] (1–2)
│   ├── text, effects: Effect
│   └── authorityCheck? (max 1 per request)
│       ├── minCommit, maxCommit, threshold
│       ├── minSuccessChance, maxSuccessChance
│       ├── refundOnSuccessPercent, extraLossOnFailure
│       ├── onSuccess?: Effect
│       ├── onFailure?: Effect
│       ├── successFeedbackRequestId?, failureFeedbackRequestId?
│       └── followUpBoosts?[]
│           └── targetRequestId, boostType, boostValue, steps?, description?
├── followUps?[]
│   ├── triggerOnOptionIndex, delayMinTicks, delayMaxTicks
│   └── candidates: WeightedCandidate[]
│       └── requestId, weight
└── combat? (max 1 per request, on max 1 option)
    ├── enemyForces, prepDelayMinTicks, prepDelayMaxTicks
    ├── onWin?: Effect, onLose?: Effect
    ├── followUpsOnWin?: FollowUp[]
    └── followUpsOnLose?: FollowUp[]
```

---

## 3. Rational and Narrative Design Approach (KPI-Driven)

Creating strong request chains requires the deliberate use of professional narrative design principles, structures, and patterns. The rational design approach ensures that each chain is built as a functional game system with clear choices, meaningful consequences, and appropriate pacing. The narrative design approach ensures that each chain creates tension, supports believable motivations, and leads to satisfying dramatic outcomes. Both perspectives must be applied together from the very beginning of concept development. The goal is a request chain that is structurally solid, strategically relevant, and narratively effective.

### 3.1 Chain Sizing — How Many Members for Which Chain Size

| Chain Size | Total Requests | Start | Members | Ends | Best For |
|------------|---------------|-------|---------|------|----------|
| **S** | 4–10 | 1 | 2–3 | 2+ | Single dilemma with consequences |
| **M** | 10–35 | 1 | 4–7 | 4+ | Multi-beat story with meaningful branches |
| **L** | 35–60 | 1 | 8–30 | 6+ | Story arc with parallel paths |
| **XL** | 60-100+ | 1 | 8–30 | 8+ | Longer-term story arc with parallel paths |

**Rules:**

- **S-sized** Those often depict the "everyday" life in the Life of the Player Character. Decisions with almost immediate consequences.
- **M-sized** when the story has a clear act structure (setup → confrontation → resolution) with at least 2 meaningful branch points.
- **L-sized** for story arcs that define an entire play session. Follow an arc of setup → branched build-up → branched confrontation → possible story twists → branched confrontation → resolution
- **XL-sized** for story arcs that span over multiple play sessions. Follow an arc of setup → branched build-up → branched confrontation → possible story twists → branched confrontation → resolution
- **Chain size does not determine whether `authorityCheck` or `combat` is appropriate.** Those are driven purely by narrative fit — if the story calls for a political gamble or a military confrontation, use them regardless of chain size.
- Every branch doubles your authoring burden. A chain with 3 binary branch points needs up to 8 end nodes.
- Branching can be **excessive** (many branches, many possible endings), **shallow** (less branch points and more linearity) or **convergent** (branches merge back to shared nodes). Or a mix of them.
- **Excessive** branching and many possible endings are interesting for the player and the most powerful for the gameplay and replayability if the same request chain. Using excessive branching requires excessive narrative design to make all branches follow a good narrative setup and story arc. 
- **Shallow** branching is less interesting and less replayable. It requires less request generation.
- **convergent** branching needs high attention to story consistency: the convergent node must make sense for all branches that lead to it. The wording must feel natural. Using convergent branching decreases the amount of needed story endings, but increases the narrative complexity and needed skill.
- Each chain member should add either a meaningful decision or a narrative beat — never filler.

### 3.2 When to Use Which Authority System

The game has **two distinct authority mechanics**. Choose the right one for each situation.
In general, one of the authority systems is to be used when the player has to convince other characters or show political dominance.

#### A) Direct Authority Check (Immediate Win/Lose)

Uses `onSuccess` / `onFailure` with `threshold`, `minSuccessChance`, `maxSuccessChance`.

**Use when:**
- The outcome is **immediate and personal** — the player is gambling authority for a direct payoff.
- The request is **standalone or at a chain endpoint** — the result doesn't need to influence which follow-up appears.
- You want **dramatic tension in a single moment** — "Will my decree succeed?"

**Tuning guidelines:**

| Parameter | Low-Stakes | Medium-Stakes | High-Stakes |
|-----------|-----------|--------------|-------------|
| `minCommit` | 0–5 | 5–15 | 15–25 |
| `maxCommit` | 10–20 | 15–40 | 30–70 |
| `minSuccessChance` | 40–50 | 30–45 | 20–35 |
| `maxSuccessChance` | max 90 | max 85 | max 80 |
| `refundOnSuccessPercent` | 80–100 | 50–80 | 30–60 |
| `extraLossOnFailure` | 0–2 | 2–5 | 5–10 |

**Design intent for min/max commit and success chance ranges:** The goal is that players do **not** always commit maximum authority. The spread between `minSuccessChance` and `maxSuccessChance` combined with the commit range should create a genuine risk/reward decision:

- A **fair** authority commitment should yield a **fair** success chance (~75-80%).
- A **high-risk** commitment (near `maxCommit`) should yield a **high but never guaranteed** (~85-90%) success chance (capped per stakes tier above).
- A **low** commitment should yield a **low but non-zero** chance (~50-60%), so the player feels they have a shot but know they're gambling.
- No commitment should be a real gamble (~10-50%)

The higher the `maxCommit`, the more the player must risk to push success chances upward. This creates the tension: commit big for safety (but lose much authority if it fails), or commit small and accept the lower odds.

Always provide `successFeedbackRequestId` and `failureFeedbackRequestId` so the player sees the outcome narratively. These are tickless info requests (`advancesTick: false`).

#### B) Authority Follow-Up Boosts (Influence Future Probabilities)

Uses `followUpBoosts` with `boostType` (`linear` / `threshold` / `stepped`).

**Use when:**
- The player is **investing authority to shape the future** — "committing political capital" to steer upcoming events.
- The request is a **chain member** and you want the player's authority investment to influence **which follow-up request appears more likely**.
- You want a **nuanced, less binary** outcome — not pass/fail, but a spectrum of likelihood.

**Boost type selection:**

| Type | When to Use | Typical Values |
|------|------------|----------------|
| `linear` | Default choice. Gradual influence proportional to commitment. | `boostValue: 2–5` |
| `threshold` | Binary tipping point — commit enough or it doesn't matter. Should not be used. | `boostValue: 3–5` |
| `stepped` | Discrete tiers of influence — each step is noticeable. Should only be used if the player feedback in the UI is clear. | `steps: 3`, `boostValue: 1–2` per step |

**Key design insight:** Follow-up boosts work by adding weight to specific candidates in the `followUps.candidates` array. If a candidate has base `weight: 1` and you boost it by `+3`, it becomes effectively `weight: 4` — dramatically more likely but never certain.

### 3.3 Combat — Meaningful Use of `prepDelay` and Force Commitment

When a request includes a `CombatSpec`, the player commits `landForces` via a slider. Those forces are **immediately deducted** from the player's `landForces` stat and are unavailable until combat resolves.

**Why `prepDelayMinTicks` / `prepDelayMaxTicks` matter:**
Setting a preparation delay (e.g. `prepDelayMinTicks: 2, prepDelayMaxTicks: 4`) means the player's committed forces are **locked away** for multiple ticks. During that window:
- The player cannot use those forces for other combat events.
- Random events may still occur that threaten the village — raids, bandits, etc.
- The player must decide: **how many forces to send into combat** vs. **how many to keep in reserve** for defense.

This creates a suspenseful resource-commitment decision. Larger `prepDelay` values increase the tension.

| Situation | Recommended prepDelay | Rationale |
|-----------|----------------------|-----------|
| Quick military operation | 2-4 | Forces are only briefly unavailable |
| Standard military operation | 3-6 | Player must plan around some ticks of reduced defense |
| Major expeditionmilitary operation | 4-8 | Long commitment, high strategic cost |
| Ambush (instant) | 0 | No prep time — forces fight immediately |

**Rule:** If a request has combat, **only one option may trigger the combat.** The second option must offer a non-combat alternative.

### 3.4 Resource Effect Design — What Should Change and by How Much

#### The Seven Resources and Their Ranges

| Resource | Range | Initial | Dangerous Zone | Impact Feel |
|----------|-------|---------|---------------|-------------|
| **Gold** 💰 | -50 to ∞ | 50 | < 0 | Primary economy. Easy to drain, hard to recover. |
| **Satisfaction** 😊 | 0–100 | 60 | < 30 | Morale. Affects gold income. Slow to rebuild. |
| **Health** ❤️ | 0–100 | 60 | < 30 | Population growth driver. Slow to rebuild. |
| **Fire Risk** 🔥 | 0–100 | 20 | > 70 | Higher = worse. Reduction is a reward. |
| **Farmers** 👨‍🌾 | 0 to ∞ | 20 | < 15 | Population. Gold income multiplier. Losing many is devastating. |
| **Land Forces** ⚔️ | 0 to ∞ | 5 | 0 (can't fight) | Military. Lost in combat. Hard to rebuild quickly. |
| **Authority** 👑 | 0–999.999 | 20 | < 10 (constant harassment) | Political power. Committed in checks. |

#### Effect Magnitude Guidelines

| Severity | Gold | Satisfaction | Health | Fire Risk | Farmers | Land Forces | Authority |
|----------|------|-------------|--------|-----------|---------|-------------|-----------|
| **Minor** | ±5–10 | ±1 | ±1 | ±1 | ±1–3 | ±1–3 | ±1 |
| **Moderate** | ±10–20 | ±2 | ±2 | ±2 | ±3–6 | ±3–6 | ±2 |
| **Major** | ±20–40 | ±3–4 | ±3–4 | ±3–4 | ±6–12 | ±6–12 | ±3–4 |
| **Extreme** | ±40+ | ±5–8 | ±5–8 | ±5–8 | ±12+ | ±12+ | ±5+ |

Important: Gold costs are inflationary during gameplay: The more progress the player makes, the more is earned and the more expensive are the costs. This means, that the "Extreme" Gold win/loss of 40 is only extreme at game start. Later, +-40 Gold is a minor severity.
Farmers, Land Forces and Authority are also inflationary like gold. Here are some reference points about how much of each inflationary resource the player can have after a certain play time:
- **After 100 ticks**: Gold: 150, Farmers: 150, LandForces: 50, Authority: 80
- **After 200 ticks**: Gold: 1000, Farmers: 400, LandForces: 100, Authority: 150
- **After 300 ticks**: Gold: 6000, Farmers: 800, LandForces: 150, Authority: 250

This needs to be taken into consideration when creating request chains for progressed game sessions (e.g. when a request chain needs a minimum Authority value, minimum farmer amount or a specific constructed building to be triggered)

#### Rules for Making Options Meaningful

1. **Pattern A (default): Both options should cost something different.** One classic pattern:
   - Option A: Costs one resource, preserves another.
   - Option B: Costs a different resource, preserves the first.

   Example from the Blackgeat chain:
   ```typescript
   // Option A: lose gold + satisfaction, keep military flexibility
   { text: 'PAY', effects: { gold: -15, satisfaction: -2, authority: -1 } }
   // Option B: no immediate cost, but commits to military path
   { text: 'REFUSE AND ARM', effects: {} }
   ```

2. **Pattern B: One worse choice and one better choice.** If option A gives `+5 gold` and option B gives `+5 gold, +2 health`, option B is always better. Use options that are strictly better only sparingly, so players sometimes have to "right/better" and "wrong/worse" choice.

3. **Pattern C: Outcome based on committment.** Both options cost the same resource, but one costs more of the resource than the other one. Therefore, the option with higher cost has a higher reward (or higher chance of reward), and the option with lower cost has a lower reward (or lower chance of reward). Another subtype of outcome can be: The option that costs less has less risk but lower reward, the option with higher cost has more risk but higher reward.

4. **Scale effects to chain position:**
   - **Chain start:** Light effects (±minor to moderate). The player is just entering the story.
   - **Chain middle:** Moderate effects. Stakes are rising.
   - **Chain end:** Major to extreme effects. The payoff/consequence of the whole chain.
   - **Chain size does not determine effect magnitude.** Effect Magnitude is driven by the narrative weight of the event, not the number of requests in the chain.

5. **Match effects to the narrative.** The effected resources need to fit to the narrative of the request chain and story.

6. **Use at most 2–3 resources per option.** More than that is visually noisy and cognitively overwhelming.

### 3.5 Avoiding Dead-Ends

Dead-ends occur when the player **cannot afford either option**.

**Rules to prevent dead-ends:**

1. **At least one option has no resource gate of limited ressources.** Limited resources are LandForce, Farmers and Authority. If one option uses LandForce, Farmers or Authority as must-have resources, the other Option cannot use another limited resource. Authority-commits that allow to use 0 Authority do not count as limiting option, because the player can choose 0 Authority.

2. **At least one option does not require specific stat values.** This rule does not apply to chain starts. The `requires` field of chain members can only apply to one option, so that the player always has the second option available if the requirement is not fulfilled. 

### 3.6 Follow-Up Delay Tuning
How quickly a follow-up request is triggered controls the pace of the game and the feedback-understanding of the player.

#### Delay Type Definitions

| Delay Type | `delayMinTicks` | `delayMaxTicks` |
|------------|----------------|----------------|
| **Immediate** | 0 | 0 |
| **Quick** | 0 | 2 |
| **Short** | 2 | 4 |
| **Medium** | 3 | 5 |
| **Long** | 5 | 7 |
| **Very Long** | 7 | 7+ |

#### Use Case → Delay Type Assignment
Use the following guideline as general rule. You are also allowed to use different Delay Types, if it is required by pacing, story, needed player preparation or any other reasons.

| Use Case | Delay Type |
|----------|-----------|
| Feedback events / info screens | Immediate |
| Same-scene narrative continuation | Immediate |
| Authority check result delivery | Immediate |
| Urgent consequences | Quick |
| Battle preparation follow-ups | Quick |
| Standard chain pacing (1–2 other events in between) | Short |
| Default follow-up when no specific timing is needed | Short |
| Building suspense (player has time to manage village) | Medium |
| Scouting reports arriving | Medium |
| Diplomatic responses | Medium |
| Delayed consequences of earlier choices | Long |
| Distant threats approaching | Long |
| Seasonal / cyclical effects | Very Long |
| Long-term consequences revealing themselves | Very Long |


### 3.7 Chain Restart Cooldown

Set `chainRestartCooldownTicks` on **every** `end` request (all nodes with `chainRole: 'end'`) to prevent the chain from immediately re-triggering after completion. Do **not** set it on the start request or chain members.

The engine records this value when a chain end node resolves and uses it to gate the chain's start node from randomly re-triggering until the cooldown expires.

| Chain Type | Recommended Cooldown |
|------------|---------------------|
| S | 20–40 ticks |
| M | 30–60 ticks |
| L  | 80–100+ ticks |
| XL  | 150+ ticks |

### 3.8 Chain Singletons — One Active Instance at a Time

A chain can only be active **once** at any given time — never in parallel. The engine enforces this rule automatically in two ways:

1. **Random pool**: Once a chain's start node fires, it is excluded from random selection until the chain completes.
2. **Scheduled events**: Even if a chain start node were accidentally scheduled as a follow-up, the engine will skip it if the chain is already active. This is a safety net — it does not mean chain starts are expected to appear in follow-ups.

**Design rule:** Never reference a chain's `start` node in any `followUps.candidates` list (of any event, including another chain). Chain starts must only fire via the random pool.

### 3.9 Weighted Candidates

When a follow-up has multiple candidates, use weights to control probability:

```typescript
candidates: [
  { requestId: 'CHAIN_X_OUTCOME1', weight: 3 },
  { requestId: 'CHAIN_X_OUTCOME2', weight: 1 },
]
// 75% chance for Option1, 25% for Option2
```

**Guidelines:**
- Use `weight: 1` across all candidates for equal probability.
- Use asymmetric weights (e.g. 3:1, 2:1) to make one path more likely.
- Authority follow-up boosts **add** to these weights, so start with lower base weights if you want authority investment to have a strong relative impact.

### 3.10 Validation Checklist

Before adding a chain to `requests.ts`, verify:

- [ ] Every request has a unique `id`
- [ ] Every request has a `portraitId` assigned
- [ ] Chain start has `chainRole: 'start'`, `canTriggerRandomly` not set to `false`
- [ ] All chain members/ends have `canTriggerRandomly: false`
- [ ] All chain members/ends have matching `chainId`
- [ ] Every `requestId` in `followUps.candidates` exists as an actual request
- [ ] Every `successFeedbackRequestId` / `failureFeedbackRequestId` exists
- [ ] At most one option per request has an `authorityCheck`
- [ ] At most one option per request triggers combat
- [ ] At least one option per request does **not** deduct `landForces` directly
- [ ] Chain end requests have `chainRole: 'end'`
- [ ] `chainRestartCooldownTicks` is set on **every** end request (not on the start request)
- [ ] The chain's start node is **not** referenced in any `followUps.candidates` list (chains are singletons — §3.8)
- [ ] `portraitId` uses only one of the 30 defined character keys (see §4.1)

---

## 4. Narrative Design Approach

### 4.1 Character Portraits — The 30-Character Roster

The game uses a fixed roster of **30 character portrait archetypes**. All requests **must** use one of these 30 `portraitId` keys. Do not invent new portrait keys. When writing narrative text, you may give characters any name you like — the portrait represents an archetype, not a unique individual. The name must fit to the gender of the portrait.
An exception to this rule are the following names that have to be reused for portraits and cannot be used for other characters:
- The player's military advisor: Feldric
- The player's advisor: Barnwulf
- The village priest: Garthric
- The village healer: Dunhild
- The player's mage advisor: Markweard

**Exception: Advisor characters are NOT archetypes.** The `advisor`, `military_advisor`, and `mage_advisor` portraits represent specific, unique individuals in the game world — the player's personal advisors. Do not reuse them as generic NPCs. When these portraits appear, the narrative should reflect that it is the player's own advisor speaking.

#### Complete Portrait Roster (30 characters)

All 30 portrait images are available in `src/assets/portraits/` and registered in `src/assets/portraits/index.ts`.

| # | `portraitId` | Archetype | Use For |
|---|-------------|-----------|---------|
| 1 | `advisor` | Player's chief advisor | Governance advice, info events, tutorials. **Individual, not archetype.** |
| 2 | `military_advisor` | Player's military advisor | Military events, combat briefings, defense. **Individual, not archetype.** |
| 3 | `mage_advisor` | Player's mage advisor | Arcane events, Arkanat dealings, magical counsel. **Individual, not archetype.** |
| 4 | `council_member` | Political figure | Internal council politics, local governance NPCs |
| 5 | `farmer` | Common villager | Population events, harvest, daily life |
| 6 | `merchant` | Trader / shopkeeper | Market events, trade deals, economic chains |
| 7 | `bandit` | Outlaw / raider | Raids, theft, criminal events |
| 8 | `pirate` | River pirate / sea raider | River pirate chain, coastal threats, smuggling |
| 9 | `noble` | Local noble / lord | Feudal disputes, land rights, noble feud chains |
| 10 | `village_priest` | Religious figure / cleric | Faith events, blessings, moral dilemmas |
| 11 | `healer` | Herbalist / physician | Disease chains, health events, plague response |
| 12 | `scout` | Reconnaissance agent / tracker | Scouting reports, search parties, forest patrols |
| 13 | `elder` | Village elder / sage | Wisdom events, historical knowledge, tradition |
| 14 | `craftsman` | Smith / builder / artisan | Construction chains, craft events, repairs |
| 15 | `guard` | Watchman / sentinel | Security events, patrol reports, gate duty |
| 16 | `children` | Youth / orphan | Human interest stories, innocence, education |
| 17 | `traveler` | Wanderer / stranger | Mystery chains, rumors, unexpected visitors |
| 18 | `envoy` | Foreign diplomat | Diplomatic missions, foreign relations, trade treaties |
| 19 | `trader` | Roaming trader / caravan leader | Independent trade offers, rare goods, traveling merchants |
| 20 | `ruler_enemy_weak` | Hostile ruler of a neighboring march/county | Mid-game political/military antagonist, rival lord |
| 21 | `ruler_enemy_strong` | Powerful late-game enemy ruler | Major end-game threat, final confrontation, overwhelming force |
| 22 | `ruler_neutral` | Mysterious / neutral neighboring ruler | Ambiguous allegiance, unpredictable diplomacy, shifting loyalty |
| 23 | `ruler_allied` | Friendly allied ruler | Alliance chains, mutual defense, joint ventures |
| 24 | `mercenary` | Independent warlord / mercenary captain | Mercenary offers, independent military threats, hired swords |
| 25 | `spy_enemy` | Infiltrator / double agent | Espionage chains, betrayal, intelligence gathering |
| 26 | `antagonist_villager` | Disgruntled / treacherous villager | Internal sabotage, dissent, betrayal from within |
| 27 | `arkanat_mage` | Powerful Arkanat member (noble mage) | Arkanat inspection, magical authority, arcane politics |
| 28 | `bard` | Entertainer / storyteller | Festival chains, morale events, rumor spreading |
| 29 | `refugee` | Displaced person / migrant | Immigration events, humanitarian dilemmas, population pressure |
| 30 | `knight` | Armored warrior / champion | Military honor events, tournament, elite combat |

**Rules for portrait assignment:**
- Every request **must** have a `portraitId`.
- Choose the archetype that best fits the **speaker or central NPC** of the request.
- Use the same portrait consistently for the same named character **within a chain**.
- Across different chains, the same portrait may represent different named characters — this is intentional.
- The three advisor portraits (`advisor`, `military_advisor`, `mage_advisor`) are always the player's personal advisors.
- **Portrait economy:** A chain should only use as many distinct portraits as its storyline needs — do not assign additional portraits just to increase variety. If a chain has three speaking characters, use three portraits. Adding portraits for characters who never speak or drive events creates visual noise without narrative value.

### 4.2 Structuring Chains for Narrative Impact

#### The Three-Act Chain Structure

All chains, from smallest to largest, benefit from classic dramatic structure:

```
ACT 1: SETUP (chain start)
  └── Introduces the situation, stakes, and central question.
      This situation, stake or central question creates an implicit promise to the player - there is now an expectation of the narrative outcome.
      Player makes directional choices.

ACT 2: CONFRONTATION (chain members)
  └── Consequences of the choice unfold.
      Tension escalates. New complications arise.
      The player faces harder decisions with higher stakes.

ACT 3: RESOLUTION (chain end)
  └── Unexpected twists can create narrative tension
      The situation resolves based on accumulated choices.
      Player receives payoff or punishment.
      Light recovery options are offered if the punishment is hard.
```

#### Branch Architecture Patterns

The following patterns can be used to create a whole graph of a request-chain. The usage of the patterns must be because of a narrative or design rationale, not just to use them.

**Pattern 1: Fork (Recommended by default)**
```
          A1
       /     \    
      B1     C1

```
Two distinct paths with unique continuation. Double the content, but very satisfying narratively. The story is driven forward by real decision power of the player and the outcomes of those decisions are unique.

**Pattern 2: Converging**
```  
       A1     B1
       \     /
          C1
```
Multiple paths converge. Different journey, shared destination.
When using this, it needs to be made 100% sure that the shared destination node makes sense for all branches converging into it. This must be narratively very well done. It must be avoided, that the text in the converging node mentions both paths (e.g. "whether you chose to do A or B, now the result is C), because that feels cheap and the player doesn't get a sense of decision power and consequences resulting from the decisions. 


**Pattern 3: Linear**
```
         A1
         |
         B1
```
A request continues linear with another request, independent of the option the player chose. This works if there is only one option to choose from, or if both options continue with the same follow-up-request. This pattern can be chosen to limit the amount of content, but must be used carefully. The two options of Request A1 can have different immediate stat changes, but the story is linear, so the player decision doesn't impact the story - only the stat changes are impacted by the player decision. This is ok from time to time, but narratively not as strong.

#### Suspense Techniques
The following techniques can be used in order to create suspense. Those techniques do not have to be used, but only when it makes sense to the narrative.

1. **Delayed consequences.** Set `delayMinTicks: 3, delayMaxTicks: 5` so the player has time to worry. Other random events fill the gap, creating a sense of real time passing.

2. **Additive or escalating costs.** Each step in the chain costs more ressources (same amount or more than before), in order to create a suspense of additive resource drain. This allows the player to worry if the choice he made was correct or costs more than it will bring. The additive or escalating costs can be either rewarded at the end (= it was worth it) or not (= it was a wrong decision or a decision to avoid other negative consequences) 

3. **The false choice.** One option appears "safe" but leads to worse outcomes 2–3 steps later. The other, "aggressive" option has immediate cost but leads to a better ending. This rewards engaged players.

4. **The ticking clock.** Use a linear pattern approach, where the linear requests are a reminder of a coming big event that the player has to prepare for. In that reminder-event, build suspense about timing, need of preparation and possible consequences.

5. **The reveal.** Use a chain member (if applicable with `advancesTick: false`) as a pure narrative beat — a revelation or twist that changes the meaning of the choices that came before, displayed before the next real decision.

#### Satisfying Endings

Every chain end should deliver on the **implicit promise** of the chain start. This promise must be conveyed **through the narrative itself** — through rising tension, character dialogue, and escalating stakes — never by explaining the stakes directly to the player in meta-language. The player should *feel* what the chain is about through the story, and the ending should reward that feeling.

The following are examples only of implicit promises - there are endless such promises.

| Chain Theme | Implicit Promise (felt by player, not stated) | End Should Deliver |
|-------------|-----------------------------------------------|-------------------|
| Military threat | "Can I survive this?" | Clear victory or dramatic defeat with stat consequences |
| Political intrigue | "Can I outmaneuver them?" | Gain or loss of authority with narrative acknowledgment |
| Economic crisis | "Can I afford this?" | Wealth gained or treasury depleted — shown in the text |
| Community story | "Will my people be okay?" | Satisfaction/health changes that reflect the outcome |

**The reward principle:** If the player made hard sacrifices during the chain, the ending must acknowledge and reward that sacrifice. Don't end a long chain with `effects: {}`. The final effects in a chain have the most impact for the player's feeling of success or failure.

### 4.3 Writing Request Text

- **Chain start text:** Set the scene and the stakes in 1-2 sentences. Introduce a character by name if needed. End with a question or tension.
- **Chain member text:** Advance the story. Reference the player's previous choice if possible. Build urgency, tension, or relief, depending on the narrative need.
- **Chain end text:** Resolve the situation definitively. Use finality language. MAke clear to the player, that this is the end of it, without saying it explicitely.
- **Option text:** Short and punchy. Must fit into the option button. If possible, 1-5 words. Use CAPS. The expressions can be slightly exxagerated (e.g. talking about farmes as "riffraff" if it's an option to punish them, or wordplay like: Option 1 - "Pay", Option 2: "Pay - him a visit". Thos are only examples, do not use them permanently.)

---

## 5. Putting It All Together — Step-by-Step Workflow

### Step 1: Concept
- Define the theme, the central question, and the target chain size.
- Identify which resources are thematically relevant.
- Identify which characters are relevant.
- Identify the narrative promise to the player.

### Step 2: Branch Map
- Draw the chain structure: start → members → ends.
- Mark each node with its approximate effects and which portrait appears.
- Count total requests. Stay within your size target.

### Step 3: Stat Economy Pass
- Walk through every path and calculate cumulative stat changes.
- Verify no path leads to unavoidable bankruptcy or unrecoverable state.
- Verify both options at every node are meaningfully different.
- Verify that requests are no dead-ends with no possible option because of the player stats.

### Step 4: Write Requests
- For each request, write in this order: `id` → `portraitId` → `title` → `text` → `options` → `effects` → `followUps`.
- Add `combat`, `authorityCheck`, or `followUpBoosts` where the story and narrative demands them.
- Ensure max 1 `authorityCheck` option and max 1 combat option per request. However, it is possible to have both, 1 `authorityCheck` and 1 combat option, in one request.

### Step 5: Add to `requests.ts`
- Add all chain requests to the `eventRequests` array.
- Add any authority feedback info requests to `authorityInfoRequests`.
- Group chain requests together with a clear comment header:

```typescript
// =========================================================
// CHAIN: MY_NEW_CHAIN – Short Description
// =========================================================
```

### Step 6: Validate
- Run the game in dev mode — `validateRequests()` will check for broken references.
- Play through every path manually.
- Run through the validation checklist in §3.9.

---

## 6. Quick Reference Template

Minimal small chain (4 requests), in this case with only one branch and then converging to the same end node - a narratively inferior approach, showcasing only possible structure and not a good narrative approach:

```typescript
// =========================================================
// CHAIN: EXAMPLE – Description of the chain
// =========================================================
{
  id: 'CHAIN_EXAMPLE_START',
  chainId: 'EXAMPLE',
  chainRole: 'start',
  title: 'The Inciting Event',
  text: 'Something has happened. What will you do?',
  portraitId: 'advisor',
  options: [
    { text: 'OPTION A', effects: { gold: -10 } },
    { text: 'OPTION B', effects: { satisfaction: -1 } },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'CHAIN_EXAMPLE_PATH_A', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'CHAIN_EXAMPLE_PATH_B', weight: 1 }],
    },
  ],
},
{
  id: 'CHAIN_EXAMPLE_PATH_A',
  chainId: 'EXAMPLE',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'Consequences of A',
  text: 'Your choice led here. The situation develops.',
  portraitId: 'council_member',
  options: [
    { text: 'RESOLVE', effects: { gold: 10, satisfaction: 1 } },
    { text: 'PUSH FURTHER', effects: { authority: 2 } },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'CHAIN_EXAMPLE_END', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'CHAIN_EXAMPLE_END', weight: 1 }],
    },
  ],
},
{
  id: 'CHAIN_EXAMPLE_PATH_B',
  chainId: 'EXAMPLE',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'Consequences of B',
  text: 'A different path unfolds.',
  portraitId: 'merchant',
  options: [
    { text: 'ACCEPT', effects: { satisfaction: 1 } },
    { text: 'RESIST', effects: { authority: 1, satisfaction: -1 } },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'CHAIN_EXAMPLE_END', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'CHAIN_EXAMPLE_END', weight: 1 }],
    },
  ],
},
{
  id: 'CHAIN_EXAMPLE_END',
  chainId: 'EXAMPLE',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 40,
  title: 'Resolution',
  text: 'The situation has resolved. Your village endures.',
  portraitId: 'advisor',
  options: [
    { text: 'CELEBRATE', effects: { satisfaction: 2, gold: 10 } },
    { text: 'INVEST', effects: { fireRisk: -2, health: 2 } },
  ],
},
```


---

## 9. Fire Request Chains (V4 System)

Fire chains are a special category of request chain triggered automatically when a building catches fire. They differ from regular event chains in several important ways: they are always slot-bound, they must resolve the fire incident (extinguish or destroy the building), and some options can spread fire to other buildings.

### 9.1 Overview

When a fire breaks out (via the outbreak formula in `state.ts`), the engine:

1. Picks a random functional building unit as the target.
2. Assigns it to a free incident slot (1–10).
3. Selects a fire chain variant compatible with the building type (see Section 9.4).
4. Schedules the chain's START request at the next tick with the highest non-info priority.

Every fire chain is therefore:
- **Slot-specific** — IDs encode the slot index: `FIREV4_S{n}_{VARIANT}_*`
- **Automatically started** — never triggered by player action directly
- **Resolution-guaranteed** — every branch must reach either an extinguish end node or a destroy end node (via `fireChainOutcome` metadata)

### 9.2 Chain Structure

Each fire chain variant is built like other request chains. By default, fire chains should be resolved quickly, so that the burning building doesn't hold up the negative consequences too long.
There are two kinds of fire outbreaks:
1. Natural outbreaks: attempted once per tick advance, based on the stat `fireRisk`
2. Effect outbreaks: may be triggered by request effects.

Mandatory fire-chain capabilities (must exist in the chain):
  Each fire chain must include operations that can:
      Extinguish assigned unit (on_fire → functional, clears assignment)
      Destroy assigned unit (on_fire → destroyed)
      Start a new outbreak (same logic as Section 5; can bypass cap via flag)

Fire-chain resolution rule (must be true for every branch):
  Every branch must lead to either:
      1. An end node with `fireChainOutcome: 'extinguish'` at some point, OR
      2. An end node with `fireChainOutcome: 'destroy'` at some point

      If a destroy end node is reached while the chain is still active:
          Later in the chain there must be a branch to either:
              reconstruct (unit → functional), OR
              end and leave destroyed (unit stays destroyed; chainActive=false)

### 9.3 The START Decision Rule

> **Rule: Every fire START request must present an immediate player decision (2 options).**
>
> A fire START must never show a single option. The player must face a meaningful
> choice from the very first moment the fire breaks out. Each option should lead to a distinctly
> different branch, with different narrative progress, risks, and rewards.

This rule is enforced by `validateRequests()` in `requests.ts`, which treats FIREV4 START requests
like all other non-info requests (2 options required). Do not add FIREV4 START IDs to the
single-option exemption list.

### 9.4 Building-Specific vs General Chains

Each building type in the game can have:
- **1 dedicated fire chain variant** — with content and characters specific to that building type
- **General chains** — usable for all building types

To restrict a chain to a specific building type, set `fireChainAllowedBuildingTypes` **only on the START request**:

```typescript
{
  id: `FIREV4_S${n}_G_START`,
  chainRole: 'start',
  fireChainAllowedBuildingTypes: ['bakery'],   // ← only triggered for bakery fires
  ...
}
```

If `fireChainAllowedBuildingTypes` is `undefined`, the chain applies to all building types.

At outbreak time, `attemptFireOutbreak()` in `state.ts` collects all START requests for the free slot, filters by `fireChainAllowedBuildingTypes` against the burning building type, then picks one uniformly at random via the seeded RNG.

### 9.5 Fire Spread

Some chain options can trigger a new fire outbreak as a consequence of a risky player decision. Add the following to an option's `effects` to spread fire:

```typescript
effects: {
  triggerFireOutbreak: true,
  fireOutbreakBypassCap: false,  // true = ignores the concurrent-fire cap
}
```

**When to add fire spread:**
- On options where the player makes an objectively bad or reckless decision.
- As a risk/reward trade-off
- Thematically: whenever the narrative reason for fire spreading exists

**When to have only rarely fire spread:**
- On the "correct" or careful option

**When to never add fire spreads:**
- On end nodes — fire spread belongs on STEP nodes, where the player still has a choice to make

Use `fireOutbreakBypassCap: true` only when the fire spread is catastrophic (e.g., barrel explosions). Normal fire spread should leave `bypassCap: false`.

### 9.6 Required Fields for Every Fire Chain Request

All fire chain requests (FIREV4 and REPAIRV4) must include:

```typescript
{
  id: string;                      // Must start with FIREV4_S{n}_ or REPAIRV4_S{n}_
  chainId: string;                 // Must be FIREV4_S{n}_{V} or REPAIRV4_S{n}
  chainRole: 'start' | 'member' | 'end';
  canTriggerRandomly: false;       // ALWAYS false — fire chains never trigger randomly
  advancesTick: false | true;      // false for START/STEP, true for END nodes
  portraitId: PortraitId;          // Must be a valid portrait key
  title: string;                   // Non-empty
  text: string;                    // Non-empty, sets the scene
  options: Option[];               // Always 2 (except nodes with isSingleOptionChainNode: true)
  chainRestartCooldownTicks: 0;    // Required on every 'end' node
}
```

**Additional required fields on fire chain end nodes:**
- `fireChainOutcome: 'extinguish' | 'destroy'` — replaces ID-suffix-based resolution. The reducer reads this field instead of matching `_END_EXT` / `_END_DEST` in the request ID.

**Additional required fields on repair chain nodes:**
- On START nodes: `repairChainSlotIndex: n` and `isSingleOptionChainNode: true`
- On end nodes: `repairChainOutcome: 'reconstruct' | 'leave'` and `isSingleOptionChainNode: true`

### 9.7 Adding a New Fire Chain Variant

Follow these steps to add a new fire chain variant:

1. **Choose a narrative** — The chain needs to have a memorable narrative.

2. **Decide building restriction** — Is this general (all buildings) or specific to one building type? If specific, set `fireChainAllowedBuildingTypes` on the START.

3. **Design the START decision** — Write two contrasting options that immediately branch the chain. Follow the START Decision Rule (Section 9.3).

4. **Design the branches and ends**
   - Decide if the chain carries `triggerFireOutbreak: true` on a risky path as guaranteed option or as weighted option, or if the narrative doesn't make use of a fire spread.

5. **End nodes** — These are aftermath cards. The fire is already resolved. The options represent how the player responds to the outcome (rebuild, punish, compensate for big loss, etc.). Each end node must carry `fireChainOutcome: 'extinguish'` or `fireChainOutcome: 'destroy'`. You may name them anything — `_END_EXT` / `_END_DEST` are still fine and readable, but they are no longer required by the engine.

6. **Add the variant inside `generateFireV4ChainRequests()`** — Add a new `{ }` block inside the `for (let n = 1; n <= 10; n++)` loop, following the same pattern as existing variants.

7. **Validate** — Run the app in development mode (`npm run dev`) to trigger `validateRequests()`. Fix any reported errors.

### 9.8 Repair Chains

After a building is destroyed, players can start a repair chain from the Construction screen (when `chainActive=false`). Repair chains use the prefix `REPAIRV4_S{n}_*` and follow a simpler structure:

```
Start Node - always informational that the repair has begun: REPAIRV4_S{n}_START          (start, 1 option, tickless, isSingleOptionChainNode: true, repairChainSlotIndex: n)
One or multiple member nodes, branching possible:           REPAIRV4_S{n}_PROGRESS        (member, 2 options, advances tick)
End node - reconstruct the building:                        REPAIRV4_S{n}_END_RECONSTRUCT  (end, 1 option, advances tick, repairChainOutcome: 'reconstruct', isSingleOptionChainNode: true)
End node - leave destroyed:                                 REPAIRV4_S{n}_END_LEAVE        (end, 1 option, advances tick, repairChainOutcome: 'leave', isSingleOptionChainNode: true)
```

Repair START requests and single-option end nodes must set `isSingleOptionChainNode: true` so `validateRequests()` does not flag them. Repair START nodes must also set `repairChainSlotIndex: n` so the `START_REPAIR_CHAIN` action can find the correct start request via metadata. They are not fire START requests, so the START Decision Rule (Section 9.3) does not apply.
