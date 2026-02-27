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

## 3. Rational Design Approach (KPI-Driven)

### 3.1 Chain Sizing — How Many Members for Which Chain Size

| Chain Size | Total Requests | Start | Members | Ends | Best For |
|------------|---------------|-------|---------|------|----------|
| **Small** | 4–6 | 1 | 2–3 | 1–2 | Single dilemma with consequences (e.g. Palisade chain) |
| **Medium** | 6–10 | 1 | 4–7 | 2–3 | Multi-beat story with meaningful branches (e.g. River Pirates) |
| **Large** | 10–34 | 1 | 8–30 | 2–5 | Major story arc with parallel paths (e.g. Blackgeat) |

**Rules:**

- **Start with Small (4–6).** Most chains should be this size. They're fast to author, easy to test, and don't overwhelm the event pool.
- **Go Medium (6–10)** when the story has a clear act structure (setup → confrontation → resolution) with at least 2 meaningful branch points.
- **Go Large (10+)** only for flagship story arcs that define an entire play session. The game currently has one large chain (Blackgeat at ~34 events). Aim for at most 2–3 large chains total.
- Every branch doubles your authoring burden. A chain with 3 binary branch points needs up to 8 end nodes.
- Keep branching **shallow** (max 2–3 branch points) or **convergent** (branches merge back to shared nodes).
- Each chain member should add either a meaningful decision or a narrative beat — never filler.

### 3.2 When to Use Which Authority System

The game has **two distinct authority mechanics**. Choose the right one for each situation.

#### A) Direct Authority Check (Immediate Win/Lose)

Uses `onSuccess` / `onFailure` with `threshold`, `minSuccessChance`, `maxSuccessChance`.

**Use when:**
- The outcome is **immediate and personal** — the player is gambling authority for a direct payoff.
- The request is **standalone or at a chain endpoint** — the result doesn't need to influence which follow-up appears.
- You want **dramatic tension in a single moment** — "Will my decree succeed?"

**Example scenarios:** Forcing military reforms, demanding tribute, issuing decrees, confronting rivals.

**Tuning guidelines:**

| Parameter | Low-Stakes | Medium-Stakes | High-Stakes |
|-----------|-----------|--------------|-------------|
| `minCommit` | 0–5 | 5–15 | 15–25 |
| `maxCommit` | 10–20 | 15–40 | 30–70 |
| `minSuccessChance` | 40–50 | 30–45 | 20–35 |
| `maxSuccessChance` | max 90 | max 85 | max 75 |
| `refundOnSuccessPercent` | 80–100 | 50–80 | 30–60 |
| `extraLossOnFailure` | 0–2 | 2–5 | 5–10 |

**Design intent for min/max commit and success chance ranges:** The goal is that players do **not** always commit maximum authority. The spread between `minSuccessChance` and `maxSuccessChance` combined with the commit range should create a genuine risk/reward decision:

- A **fair** authority commitment should yield a **fair** success chance (~50–65%).
- A **high-risk** commitment (near `maxCommit`) should yield a **high but never guaranteed** success chance (capped per stakes tier above).
- A **minimal** commitment should yield a **low but non-zero** chance, so the player feels they have a shot but know they're gambling.

The higher the `maxCommit`, the more the player must risk to push success chances upward. This creates the tension: commit big for safety (but lose authority if it fails), or commit small and accept the lower odds.

Always provide `successFeedbackRequestId` and `failureFeedbackRequestId` so the player sees the outcome narratively. These are tickless info requests (`advancesTick: false`).

#### B) Authority Follow-Up Boosts (Influence Future Probabilities)

Uses `followUpBoosts` with `boostType` (`linear` / `threshold` / `stepped`).

**Use when:**
- The player is **investing authority to shape the future** — "committing political capital" to steer upcoming events.
- The request is a **chain member** and you want the player's authority investment to influence **which follow-up request appears**.
- You want a **nuanced, less binary** outcome — not pass/fail, but a spectrum of likelihood.

**Example scenarios:** Diplomatic negotiations (investing authority makes a peaceful outcome more likely), preparing for inspection (investing makes favorable report more likely).

**Boost type selection:**

| Type | When to Use | Typical Values |
|------|------------|----------------|
| `linear` | Default choice. Gradual influence proportional to commitment. | `boostValue: 2–5` |
| `threshold` | Binary tipping point — commit enough or it doesn't matter. | `boostValue: 3–5` |
| `stepped` | Discrete tiers of influence — each step is noticeable. | `steps: 3`, `boostValue: 1–2` per step |

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
| Immediate skirmish | 1 / 2 | Forces are only briefly unavailable |
| Standard military operation | 2 / 4 | Player must plan around 2–4 ticks of reduced defense |
| Major campaign / siege | 4 / 8 | Long commitment, high strategic cost |
| Ambush (instant) | 0 / 0 | No prep time — forces fight immediately |

**Rule:** If a request has combat, **only one option may trigger the combat.** The second option must offer a non-combat alternative (e.g. pay tribute, negotiate, flee).

### 3.4 Resource Effect Design — What Should Change and by How Much

#### The Seven Resources and Their Ranges

| Resource | Range | Initial | Dangerous Zone | Impact Feel |
|----------|-------|---------|---------------|-------------|
| **Gold** 💰 | -50 to ∞ | 50 | < 0 | Primary economy. Easy to drain, hard to recover. |
| **Satisfaction** 😊 | 0–100 | 60 | < 30 (crisis) | Morale. Affects gold income. Slow to rebuild. |
| **Health** ❤️ | 0–100 | 60 | < 30 (crisis) | Population growth driver. Slow to rebuild. |
| **Fire Risk** 🔥 | 0–100 | 20 | > 70 (fire system) | Higher = worse. Reduction is a reward. |
| **Farmers** 👨‍🌾 | 0 to ∞ | 20 | < 10 | Population. Gold income multiplier. Losing many is devastating. |
| **Land Forces** ⚔️ | 0 to ∞ | 5 | 0 (can't fight) | Military. Lost in combat. Hard to rebuild quickly. |
| **Authority** 👑 | 0–999.999 | 20 | < 10 (constant harassment) | Political power. Committed in checks. |

#### Effect Magnitude Guidelines

| Severity | Gold | Satisfaction | Health | Fire Risk | Farmers | Land Forces | Authority |
|----------|------|-------------|--------|-----------|---------|-------------|-----------|
| **Minor** | ±5–10 | ±1 | ±1 | ±1 | ±1–3 | ±1–3 | ±1 |
| **Moderate** | ±10–20 | ±2 | ±2 | ±2 | ±3–6 | ±3–6 | ±2 |
| **Major** | ±20–40 | ±3–4 | ±3–4 | ±3–4 | ±6–12 | ±6–12 | ±3–4 |
| **Extreme** | ±40+ | ±5–8 | ±5–8 | ±5–8 | ±12+ | ±12+ | ±5+ |

#### Rules for Making Options Meaningful

1. **Pattern A (default): Both options should cost something different.** The classic pattern:
   - Option A: Costs one resource, preserves another.
   - Option B: Costs a different resource, preserves the first.

   Example from the Blackgeat chain:
   ```typescript
   // Option A: lose gold + satisfaction, keep military flexibility
   { text: 'PAY', effects: { gold: -15, satisfaction: -2, authority: -1 } }
   // Option B: no immediate cost, but commits to military path
   { text: 'REFUSE AND ARM', effects: {} }
   ```

2. **Pattern B (normal): Only sporadically make one option strictly better.** If option A gives `+5 gold` and option B gives `+5 gold, +2 health`, option B is always better. Fix this by adding a cost: `{ gold: +5, fireRisk: +3 }` vs `{ health: +2, gold: -5 }`. Use options that are strictly better only sparingly, so players have to think about their choice and deal with consequences.

3. **Pattern C (use with care and only sporadically): One worse choice and one better choice.** Both options have a cost, but one is clearly worse. This creates situations where the player must weigh whether the "less bad" option is worth its own price, and the worse option exists as a deliberate consequence of the chain's narrative. This should be rare — it works best at chain crisis points where the story has cornered the player.

4. **Scale effects to chain position:**
   - **Chain start:** Light effects (±minor). The player is just entering the story.
   - **Chain middle:** Moderate effects. Stakes are rising.
   - **Chain end:** Major to extreme effects. The payoff/consequence of the whole chain.

5. **Match effects to the narrative.** If the story is about a trade dispute, effects should be `gold`, `satisfaction`, maybe `farmers`. Don't randomly include `landForces` unless the story justifies it.

6. **Use at most 2–3 resources per option.** More than that is visually noisy and cognitively overwhelming.

### 3.5 Avoiding Dead-Ends

Dead-ends occur when the player **cannot afford either option** or when the chain leaves the game in an unrecoverable state.

**Rules to prevent dead-ends:**

1. **At least one option should have no hard resource gate.** If option A costs `gold: -30`, option B should either be free, cost a different resource that's unlikely to be at zero, or only cost a low amount of gold.

2. **Never require specific stat values to continue a chain.** The `requires` field should only gate chain *starts*, not members. Once a player is inside a chain, they must be able to finish it.

3. **Use `authorityMin`/`authorityMax` only on chain starts**, never on chain members. If a player entered the chain, they must be able to see every member.

4. **Prevent all options from deducting `landForces` directly.** At least one option in every request must **not** deduct `landForces` as an effect, so that players who have zero land forces always have a choosable option. (Combat commitment is separate — it uses a slider, and the player can commit 0 if they have 0.)

5. **End chains with recovery options.** The last event in a chain should offer some form of stat recovery so the player isn't left crippled:
   ```typescript
   // Good: chain end with recovery
   options: [
     { text: 'RECOVER', effects: { health: 5 } },
     { text: 'REPAIR', effects: { fireRisk: -5 } },
   ]
   ```

6. **Watch cumulative drain.** If a chain costs `gold: -15` per member over 5 members, that's `-75 gold` total on the pay path. Starting gold is 50. Map out the worst-case stat trajectory of every path through your chain before finalizing it.

7. **Test both extremes:** Walk through the chain assuming the player has (a) the maximum stats they could plausibly have at that point, and (b) the minimum. Both paths should remain viable.

### 3.6 Follow-Up Delay Tuning

#### Delay Type Definitions

| Delay Type | `delayMinTicks` | `delayMaxTicks` |
|------------|----------------|----------------|
| **Immediate** | 0 | 0 |
| **Quick** | 1 | 2 |
| **Short** | 2 | 4 |
| **Medium** | 3 | 5 |
| **Long** | 5 | 8 |
| **Very Long** | 8 | 8+ |

#### Use Case → Delay Type Assignment

| Use Case | Delay Type |
|----------|-----------|
| Feedback events / info screens | Immediate |
| Same-scene narrative continuation | Immediate |
| Authority check result delivery | Immediate |
| Urgent consequences (battle imminent) | Quick |
| Battle preparation follow-ups | Quick |
| Standard chain pacing (1–2 other events in between) | Short |
| Default follow-up when no specific timing is needed | Short |
| Building suspense (player has time to manage village) | Medium |
| Scouting reports arriving | Medium |
| Diplomatic responses | Medium |
| Delayed consequences of earlier choices | Long |
| Distant threats approaching | Long |
| Seasonal / cyclical effects (tribute cycles) | Very Long |
| Long-term consequences revealing themselves | Very Long |

**Default rule:** Use **Short** (`delayMinTicks: 2, delayMaxTicks: 4`) unless you have a specific narrative reason to deviate.

### 3.7 Chain Restart Cooldown

Set `chainRestartCooldownTicks` on the `start` request to prevent the chain from immediately re-triggering after completion.

| Chain Type | Recommended Cooldown |
|------------|---------------------|
| Small (4–6 events) | 20–40 ticks |
| Medium (6–10 events) | 40–60 ticks |
| Large (10+ events) | 80–100+ ticks |

### 3.8 Weighted Candidates

When a follow-up has multiple candidates, use weights to control probability:

```typescript
candidates: [
  { requestId: 'CHAIN_X_GOOD_OUTCOME', weight: 3 },
  { requestId: 'CHAIN_X_BAD_OUTCOME', weight: 1 },
]
// 75% chance good, 25% chance bad
```

**Guidelines:**
- Use `weight: 1` across all candidates for equal probability.
- Use asymmetric weights (e.g. 3:1, 2:1) to make one path more likely.
- Authority follow-up boosts **add** to these weights, so start with lower base weights if you want authority investment to have a strong relative impact.

### 3.9 Validation Checklist

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
- [ ] At least one option per request has affordable effects for a player in a bad state
- [ ] Chain end requests have `chainRole: 'end'`
- [ ] `chainRestartCooldownTicks` is set on the start request
- [ ] `portraitId` uses only one of the 30 defined character keys (see §4.1)

---

## 4. Narrative Design Approach

### 4.1 Character Portraits — The 30-Character Roster

The game uses a fixed roster of **30 character portrait archetypes**. All requests **must** use one of these 30 `portraitId` keys. Do not invent new portrait keys. When writing narrative text, you may give characters any name you like — the portrait represents an archetype, not a unique individual.

**Key principle:** A single portrait can represent different named characters. The `council_member` portrait already represents both "Brimwulf" (Blackgeat chain) and unnamed council members in other events. The player sees a face archetype — the text provides the specific identity.

**Exception: Advisor characters are NOT archetypes.** The `advisor`, `military_advisor`, and `mage_advisor` portraits represent specific, unique individuals in the game world — the player's personal advisors. Do not reuse them as generic NPCs. When these portraits appear, the narrative should reflect that it is the player's own advisor speaking.

#### Complete Portrait Roster (30 characters)

| # | `portraitId` | Archetype | Use For |
|---|-------------|-----------|---------|
| 1 | `advisor` | Player's chief advisor | Governance advice, info events, tutorials. **Individual, not archetype.** |
| 2 | `military_advisor` | Player's military advisor | Military events, combat briefings, defense. **Individual, not archetype.** |
| 3 | `mage_advisor` | Player's mage advisor | Arcane events, Arkanat dealings, magical counsel. **Individual, not archetype.** |
| 4 | `council_member` | Political figure / envoy | Diplomacy, negotiations, political chain NPCs |
| 5 | `farmer` | Common villager | Population events, harvest, daily life |
| 6 | `merchant` | Trader / shopkeeper | Market events, trade deals, economic chains |
| 7 | `bandit` | Outlaw / raider | Raids, theft, criminal events |
| 8 | `pirate` | River pirate / sea raider | River pirate chain, coastal threats, smuggling |
| 9 | `noble` | Local noble / lord | Feudal disputes, land rights, noble feud chains |
| 10 | `priest` | Religious figure / cleric | Faith events, blessings, moral dilemmas |
| 11 | `healer` | Herbalist / physician | Disease chains, health events, plague response |
| 12 | `scout` | Spy / reconnaissance agent | Intelligence, espionage, scouting reports |
| 13 | `elder` | Village elder / sage | Wisdom events, historical knowledge, tradition |
| 14 | `craftsman` | Smith / builder / artisan | Construction chains, craft events, repairs |
| 15 | `guard` | Watchman / sentinel | Security events, patrol reports, gate duty |
| 16 | `child` | Youth / orphan | Human interest stories, innocence, education |
| 17 | `traveler` | Wanderer / stranger | Mystery chains, rumors, unexpected visitors |
| 18 | `envoy` | Foreign diplomat | Diplomatic missions, foreign relations, trade treaties |
| 19 | `independent_trader` | Roaming trader / caravan leader | Independent trade offers, rare goods, traveling merchants |
| 20 | `antagonist_ruler` | Hostile ruler of a neighboring march/county | Mid-game political/military antagonist, rival lord |
| 21 | `endgame_antagonist` | Powerful late-game enemy ruler | Major end-game threat, final confrontation, overwhelming force |
| 22 | `neutral_ruler` | Mysterious / neutral neighboring ruler | Ambiguous allegiance, unpredictable diplomacy, shifting loyalty |
| 23 | `allied_ruler` | Friendly allied ruler | Alliance chains, mutual defense, joint ventures |
| 24 | `warlord` | Independent warlord / mercenary captain | Mercenary offers, independent military threats, hired swords |
| 25 | `spy` | Infiltrator / double agent | Espionage chains, betrayal, intelligence gathering |
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

### 4.2 Structuring Chains for Narrative Impact

#### The Three-Act Chain Structure

Even small chains benefit from classic dramatic structure:

```
ACT 1: SETUP (chain start)
  └── Introduces the situation, stakes, and central question.
      Player makes a directional choice (e.g., engage vs. ignore).

ACT 2: CONFRONTATION (chain members)
  └── Consequences of the choice unfold.
      Tension escalates. New complications arise.
      The player faces harder decisions with higher stakes.

ACT 3: RESOLUTION (chain end)
  └── The situation resolves based on accumulated choices.
      Player receives payoff or punishment.
      Recovery options are offered.
```

#### Branch Architecture Patterns

**Pattern 1: Diamond (Recommended for small chains)**
```
        START
       /          A1       B1
       \     /
        END
```
Two paths that converge. Different journey, shared destination with different stat states. Easiest to author and test.

**Pattern 2: Fork (Recommended for medium chains)**
```
        START
       /          A1       B1
     |         |
     A2       B2
     |         |
    END_A    END_B
```
Two distinct paths with unique endings. Double the end content, but very satisfying narratively.

**Pattern 3: Tree with Convergence (Recommended for large chains)**
```
         START
        /           A1       B1
     / \       |
   A2a  A2b   B2
    |    |     |
   A3   A3    B3
     \  |    /
      SHARED_END
```
Multiple early branches that merge into shared later content. This is the Blackgeat pattern — it branches early but reuses war preparation and battle sequences regardless of which path the player took.

#### Suspense Techniques

1. **Delayed consequences.** Set `delayMinTicks: 3, delayMaxTicks: 5` so the player has time to worry. Other random events fill the gap, creating a sense of real time passing.

2. **Escalating costs.** Each step in the chain should cost slightly more than the last (the Blackgeat tribute chain escalates from `-10 gold` to `-15 gold` with increasing satisfaction/authority costs).

3. **The false choice.** One option appears "safe" but leads to worse outcomes 2–3 steps later. The "aggressive" option has immediate cost but leads to a better ending. This rewards engaged players.

4. **The ticking clock.** Use `maxTriggers: 1` on members so they can only fire once, and use tight delays. The player feels urgency — this chain won't wait.

5. **The reveal.** Use a chain member with `advancesTick: false` as a pure narrative beat — a revelation or twist that changes the meaning of the choices that came before, displayed before the next real decision.

#### Satisfying Endings

Every chain end should deliver on the **implicit promise** of the chain start. This promise must be conveyed **through the narrative itself** — through rising tension, character dialogue, and escalating stakes — never by explaining the stakes directly to the player in meta-language. The player should *feel* what the chain is about through the story, and the ending should reward that feeling.

| Chain Theme | Implicit Promise (felt by player, not stated) | End Should Deliver |
|-------------|-----------------------------------------------|-------------------|
| Military threat | "Can I survive this?" | Clear victory or dramatic defeat with stat consequences |
| Political intrigue | "Can I outmaneuver them?" | Gain or loss of authority with narrative acknowledgment |
| Economic crisis | "Can I afford this?" | Wealth gained or treasury depleted — shown in the text |
| Community story | "Will my people be okay?" | Satisfaction/health changes that reflect the outcome |

**The reward principle:** If the player made hard sacrifices during the chain, the ending must acknowledge and reward that sacrifice. Don't end a 6-event chain with `effects: {}`. The final effects should be the **largest in the chain**.

### 4.3 Writing Request Text

- **Chain start text:** Set the scene and the stakes in 2–3 sentences. Introduce a character by name if possible. End with a question or tension.
- **Chain member text:** Advance the story. Reference the player's previous choice if possible ("Since you agreed to pay..."). Build urgency.
- **Chain end text:** Resolve the situation definitively. Use finality language ("The threat has passed", "The price was steep").
- **Option text:** Short and punchy. Use CAPS for action verbs (matching existing style: `'PAY'`, `'REFUSE AND ARM'`, `'OFFER COMPROMISE'`).

---

## 5. Putting It All Together — Step-by-Step Workflow

### Step 1: Concept
- Define the theme, the central question, and the target chain size (small/medium/large).
- Identify which resources are thematically relevant.

### Step 2: Branch Map
- Draw the chain structure: start → members → end(s).
- Mark each node with its approximate effects and which portrait appears.
- Count total requests. Stay within your size target.

### Step 3: Stat Economy Pass
- Walk through every path and calculate cumulative stat changes.
- Verify no path leads to unavoidable bankruptcy or unrecoverable state.
- Verify both options at every node are meaningfully different.
- Verify at least one option per request does not deduct `landForces`.

### Step 4: Write Requests
- Start with the chain start, then ends, then fill in members.
- For each request, write in this order: `id` → `portraitId` → `title` → `text` → `options` → `effects` → `followUps`.
- Add `combat`, `authorityCheck`, or `followUpBoosts` only where the story demands them.
- Ensure max 1 `authorityCheck` option and max 1 combat option per request.

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

Minimal small chain (4 requests) as a starting skeleton:

```typescript
// =========================================================
// CHAIN: EXAMPLE – Description of the chain
// =========================================================
{
  id: 'CHAIN_EXAMPLE_START',
  chainId: 'EXAMPLE',
  chainRole: 'start',
  chainRestartCooldownTicks: 40,
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
  title: 'Resolution',
  text: 'The situation has resolved. Your village endures.',
  portraitId: 'advisor',
  options: [
    { text: 'CELEBRATE', effects: { satisfaction: 2, gold: 10 } },
    { text: 'INVEST', effects: { fireRisk: -2, health: 2 } },
  ],
},
```

This gives you a diamond-shaped chain (start → two paths → shared end) with 4 requests, consistent portraits, safe effects, and proper chain metadata. Expand from here.
