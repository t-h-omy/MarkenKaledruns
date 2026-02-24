# Die Marken Kaledruns – Project Overview

> **⚠️ MANDATORY: Every change to code or files in this repository MUST come with an update to this document to keep it accurate and in sync with the codebase.**

---

## Table of Contents

1. [Project Summary](#1-project-summary)
2. [Tech Stack](#2-tech-stack)
3. [Repository Structure](#3-repository-structure)
4. [Source Code Architecture](#4-source-code-architecture)
5. [Game Engine Deep Dive](#5-game-engine-deep-dive)
6. [Gameplay Mechanics](#6-gameplay-mechanics)
7. [UI Components](#7-ui-components)
8. [State Management](#8-state-management)
9. [Request & Event System](#9-request--event-system)
10. [Building System](#10-building-system)
11. [Authority System](#11-authority-system)
12. [Combat System](#12-combat-system)
13. [Modifier Pipeline](#13-modifier-pipeline)
14. [Configuration & Build](#14-configuration--build)
15. [Development Commands](#15-development-commands)
16. [Deployment](#16-deployment)
17. [Existing Documentation Index](#17-existing-documentation-index)
18. [Fire System V3](#18-fire-system-v3)

---

## 1. Project Summary

**Die Marken Kaledruns** is a turn-based village management strategy game built as a Progressive Web App (PWA). The player governs a settlement by responding to events (called "requests"), managing resources, constructing buildings, commanding military forces, and navigating political authority. The game ends when gold drops to **-50** (bankruptcy).

- **Version**: 1.1.6
- **Package name**: `pof-prototype`
- **Repository**: `t-h-omy/MarkenKaledruns`

---

## 2. Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| UI Framework | React | 19.2 |
| Language | TypeScript | ~5.9.3 |
| Build Tool | Vite | 7.2.4 |
| PWA | vite-plugin-pwa | 1.2.0 |
| Styling | Plain CSS (no frameworks) | — |
| Linting | ESLint + typescript-eslint | 9.39+ |
| State Management | React `useReducer` (custom reducer) | — |
| RNG | Custom seeded LCG (Park-Miller) | — |

No external state management libraries, CSS frameworks, or backend services are used. The game is entirely client-side.

---

## 3. Repository Structure

```
MarkenKaledruns/
├── .github/
│   └── workflows/
│       ├── gh-pages-previews.yml          # Multi-branch preview workflow
│       └── pages.yml.disabled             # GitHub Pages deploy (disabled)
│
├── designs/
│   ├── CONSTRUCTION_SCREEN_DESIGN.md      # Construction UI/UX design spec
│   └── requests_updated.ts               # Candidate request data (staging)
│
├── public/
│   ├── vite.svg                           # Vite logo asset
│   └── server.js                          # Local dev server helper
│
├── src/
│   ├── game/                              # *** CORE GAME ENGINE ***
│   │   ├── models.ts                      # Type definitions (Stats, Effect, Request, etc.)
│   │   ├── state.ts                       # Game state reducer, all game logic
│   │   ├── requests.ts                    # All request/event definitions (~5300 lines)
│   │   ├── picker.ts                      # Request selection algorithm & seeded RNG
│   │   ├── buildings.ts                   # Building definitions & utility functions
│   │   └── modifiers.ts                   # Building-based event effect modifiers
│   │
│   ├── assets/
│   │   ├── react.svg                      # React logo
│   │   └── portraits/                     # Portrait images for request screen
│   │       ├── index.ts                   # Portrait registry (PORTRAITS lookup, PortraitId type)
│   │       ├── Advisor.webp               # Advisor portrait
│   │       └── Farmer.webp                # Farmer portrait
│   │
│   ├── App.tsx                            # Main game component (~1020 lines)
│   ├── App.css                            # Main game styles (~1525 lines)
│   ├── ConstructionScreen.tsx             # Building construction overlay
│   ├── ConstructionScreen.css             # Construction screen styles
│   ├── BuildingCard.tsx                   # Individual building card component
│   ├── BuildingCard.css                   # Building card styles
│   ├── BuildMultipleModal.tsx             # Bulk building construction modal
│   ├── BuildMultipleModal.css             # Bulk build modal styles
│   ├── LogScreen.tsx                      # Decision history/log viewer
│   ├── LogScreen.css                      # Log screen styles
│   ├── index.css                          # Global base styles
│   ├── main.tsx                           # React app entry point + PWA registration
│   └── vite-env.d.ts                      # Vite type declarations
│
├── index.html                             # HTML entry point
├── package.json                           # Dependencies & scripts
├── package-lock.json                      # Locked dependency versions
├── vite.config.ts                         # Vite + PWA + base path configuration
├── tsconfig.json                          # TypeScript root config (references)
├── tsconfig.app.json                      # TypeScript app compiler options
├── tsconfig.node.json                     # TypeScript node/build config
├── eslint.config.js                       # ESLint flat config
├── .gitignore                             # Git ignore rules
└── *.md                                   # Various documentation files (see §17)
```

### Source File Sizes (approximate)

| File | Lines | Purpose |
|------|-------|---------|
| `src/game/requests.ts` | ~5380 | All event/request definitions (incl. 40 fire chain requests) |
| `src/game/state.ts` | ~2670 | Reducer, game loop, all game logic (incl. fire system engine) |
| `src/App.tsx` | ~1030 | Main UI component (incl. request-panel BEM layout, portrait wiring, fire chain tag/context) |
| `src/App.css` | ~1700 | All main game styles (incl. portrait img, fire chain info styles) |
| `src/game/picker.ts` | ~560 | Request selection & RNG |
| `src/BuildingCard.css` | ~455 | Building card styles (incl. fire state action styles) |
| `src/game/models.ts` | ~335 | Core type definitions (incl. fire types, PortraitId on Request) |
| `src/LogScreen.css` | ~275 | Log screen styles |
| `src/BuildMultipleModal.css` | ~230 | Modal styles |
| `src/BuildingCard.tsx` | ~230 | Building card UI (incl. state action buttons) |
| `src/game/buildings.ts` | ~220 | Building system (incl. effective count helpers) |
| `src/ConstructionScreen.tsx` | ~200 | Construction UI |
| `src/ConstructionScreen.css` | ~145 | Construction styles |
| `src/LogScreen.tsx` | ~135 | Log viewer UI |
| `src/BuildMultipleModal.tsx` | ~125 | Bulk build modal UI |
| `src/game/modifiers.ts` | ~100 | Effect modifiers |
| `src/index.css` | ~40 | Global styles |
| `src/main.tsx` | ~30 | App bootstrap |
| `src/assets/portraits/index.ts` | ~16 | Portrait registry (PORTRAITS lookup, PortraitId type) |

---

## 4. Source Code Architecture

### Data Flow

```
main.tsx (entry point)
  └─ App.tsx (useReducer with gameReducer)
       ├─ gameReducer (src/game/state.ts)
       │    ├─ reads requests from requests.ts
       │    ├─ picks next request via picker.ts
       │    ├─ applies modifiers from modifiers.ts
       │    ├─ manages buildings via buildings.ts
       │    └─ uses types from models.ts
       │
       ├─ ConstructionScreen.tsx
       │    └─ BuildingCard.tsx
       │         └─ BuildMultipleModal.tsx
       │
       └─ LogScreen.tsx
```

### Key Exports by File

| File | Key Exports |
|------|-------------|
| `models.ts` | `Stats`, `Effect`, `Request`, `Option`, `AuthorityCheck`, `AuthorityCheckResult`, `CombatSpec`, `FollowUp`, `WeightedCandidate`, `AuthorityFollowUpBoost` |
| `portraits/index.ts` | `PORTRAITS`, `PortraitId` |
| `state.ts` | `GameState`, `GameAction`, `gameReducer`, `initializeGame`, `getCurrentRequest`, `initialState`, `AppliedChange`, `LogEntry`, `ScheduledEvent`, `ScheduledCombat`, `ActiveCombat`, `PendingAuthorityCheck`, `ModifierHook`, `applyOptionWithModifiers`, `hasUnlock`, `meetsRequirements`, `syncBuildingUnlockTokens`, `FIRE_SYSTEM_CONFIG` |
| `requests.ts` | `infoRequests`, `eventRequests`, `authorityInfoRequests`, `fireChainRequests`, `validateRequests` |
| `picker.ts` | `pickNextRequest`, `selectWeightedCandidate`, `seedRandom`, `resetRandom`, `getRandomValue` |
| `buildings.ts` | `BUILDING_DEFINITIONS`, `BuildingDefinition`, `BuildingTracking`, `isBuildingActive`, `calculateRequiredBuildings`, `getBuildingDef`, `createInitialBuildingTracking`, `getEffectiveBuildingCount`, `hasAnyBuildingState` |
| `modifiers.ts` | `firewoodModifier`, `wellModifier`, `needModifiers` |

---

## 5. Game Engine Deep Dive

### Game Loop (per Tick)

```
1. INITIALIZATION
   └─ initializeGame() → creates initial state + picks first request

2. PLAYER TURN (action: CHOOSE_OPTION)
   ├─ Identify current request
   ├─ Apply option effects (run through modifier pipeline)
   ├─ Handle authority commitment (if option has authorityCheck)
   ├─ Handle combat commitment (if request has combat spec)
   ├─ Process follow-up events (schedule for future ticks)
   ├─ Update chain status (activate/complete chains)
   ├─ Fire END cleanup (if FIRE_SX_END: remove initialOnFireApplied, deactivate slot)
   ├─ Increment request trigger counts
   ├─ IF request.advancesTick !== false:
   │   ├─ Apply baseline income:
   │   │   ├─ Gold: floor(0.1 × farmers × (satisfaction - 10) / 100)
   │   │   └─ Farmers: floor((health - 25) / 20)
   │   ├─ Apply bakery bonus (10% chance +1 farmer if bakery active)
   │   ├─ Apply overcrowding penalties (if farmers > building capacity)
   │   ├─ Apply fire spread & destroy (seeded RNG per burning unit)
   │   ├─ Attempt fire chain start (linear probability + slot activation)
   │   ├─ Convert fire pending info queue → scheduled tickless events
   │   ├─ Update building requirements & schedule reminders
   │   ├─ Sync building unlock tokens
   │   ├─ Resolve pending authority checks (from previous tick)
   │   └─ Increment tick counter
   ├─ Clamp all stats to valid ranges
   ├─ Check bankruptcy (gold <= -50 → game over)
   ├─ Log the decision with stat deltas
   └─ Pick next request

3. BUILDING (action: BUILD_BUILDING)
   ├─ Validate no active building state (build lock: rejects if any onFireCount/destroyedCount/onStrikeCount > 0)
   ├─ Deduct gold cost
   ├─ Increment building count
   ├─ Set unlock token (if first build)
   ├─ Schedule info request (if first build and defined)
   └─ Log the construction

4. FIRE ACTIONS (reducer-only)
   ├─ EXTINGUISH_ONE → validate onFireCount > 0, apply cost, decrement
   │   └─ If global onFireCount reaches 0: abort all chains + queue info
   └─ REPAIR_ONE → validate destroyedCount > 0, apply 75% build cost, decrement

5. COMBAT (synthetic requests handled in reducer)
   ├─ COMBAT_START → activate combat from scheduled combats
   ├─ COMBAT_ROUND → roll dice, apply casualties
   └─ COMBAT_REPORT → display results (tickless)

6. END CONDITIONS
   └─ Gold reaches -50 → BANKRUPTCY (gameOver = true)
```

### Stat Clamping Rules

| Stat | Min | Max |
|------|-----|-----|
| `gold` | -50 | ∞ (no upper limit) |
| `satisfaction` | 0 | 100 |
| `health` | 0 | 100 |
| `fireRisk` | 0 | 100 |
| `farmers` | 0 | ∞ |
| `landForces` | 0 | ∞ |
| `authority` | 0 | 999.999 |

---

## 6. Gameplay Mechanics

### 6.1 Core Stats

| Stat | Initial Value | Description |
|------|--------------|-------------|
| **Gold** | 50 | Currency. Bankruptcy at -50. |
| **Farmers** | 20 | Population. Drives gold income. |
| **Satisfaction** | 60 | Morale. Affects gold income; crisis below 30. |
| **Health** | 60 | Village health. Drives population growth; crisis below 30. |
| **Fire Risk** | 20 | Fire danger. Crisis above 70. |
| **Land Forces** | 5 | Military units for combat. |
| **Authority** | 20 | Political influence (0–999.999). |

### 6.2 Baseline Formulas (Applied Each Tick)

**Gold income:**
```
gold += floor(0.1 × farmers × (satisfaction - 10) / 100)
```

**Population growth:**
```
farmers += floor((health - 25) / 20)
```

### 6.3 Overcrowding

When farmers exceed farmstead capacity (each farmstead houses 20 farmers), overcrowding penalties apply in tiers:

| Overflow Amount | Health | Satisfaction | Fire Risk |
|----------------|--------|--------------|-----------|
| 1–10 excess | -1 | -1 | +1 |
| 11–25 excess | -2 | -2 | +2 |
| 26+ excess | -3 | -3 | +3 |

### 6.4 Crisis Events

Crises trigger automatically when thresholds are crossed:

| Crisis | Trigger Condition | Request ID | Status |
|--------|------------------|------------|--------|
| ~~Fire Danger~~ | ~~`fireRisk > 70`~~ | ~~`EVT_CRISIS_FIRE`~~ | **Replaced by Fire System V3** |
| Disease Wave | `health < 30` | `EVT_CRISIS_DISEASE` | Active |
| Unrest | `satisfaction < 30` | `EVT_CRISIS_UNREST` | Active |

Priority order: Disease > Unrest. Fire crises are now handled by the slot-based Fire System V3 (see [Section 18](#18-fire-system-v3)).

### 6.5 Game Over

The game ends when gold reaches **-50** (bankruptcy). The player can restart at any time.

---

## 7. UI Components

### Component Hierarchy

```
main.tsx
 └─ <App />                              # src/App.tsx
      ├─ Stats Bar                        # Resource bars (gold, farmers, satisfaction, health, fireRisk, landForces, authority)
      │   └─ Flying delta indicators      # Animated +/- numbers on stat changes
      ├─ renderRequestPanel()             # Render helper grouping request-screen JSX
      │   ├─ request-panel__header        # Header row: portrait + content side-by-side (flex, nowrap)
      │   │   ├─ request-panel__portrait  # Portrait image or ⚜ placeholder; responsive width via clamp(128px, 28vw, 220px), aspect-ratio 3/2
      │   │   └─ request-panel__content   # Chain title, fire context, title, scrollable text
      │   │       ├─ request-panel__chainTitle   # Chain ID label (when applicable)
      │   │       ├─ request-panel__fireContext   # Fire chain tag + context (when fire request)
      │   │       ├─ request-panel__title         # Request title
      │   │       └─ request-panel__text          # Request body text (internal scroll)
      │   ├─ Combat Commit Slider         # For committing forces (when combat request)
      │   └─ request-panel__options       # Decision cards container
      │       ├─ decision-card (1–2)      # Decision buttons with BEM structure
      │       │   ├─ decision-card__label # Option text label
      │       │   └─ decision-card__effects # Effect preview chips with icons (same emoji as stats bar)
      │       ├─ Authority buttons        # Authority commitment per option (when applicable)
      │       └─ Reminder shortcut        # "Go to Construction" button (reminder requests)
      ├─ Authority Modal                  # Commitment slider for authority checks
      │   └─ Success threshold display
      ├─ Game Over Screen                 # Bankruptcy display + restart button
      ├─ <ConstructionScreen />           # src/ConstructionScreen.tsx (overlay)
      │    └─ <BuildingCard />[]          # src/BuildingCard.tsx (one per building type)
      │         └─ <BuildMultipleModal /> # src/BuildMultipleModal.tsx (bulk build dialog)
      └─ <LogScreen />                    # src/LogScreen.tsx (decision history overlay)
```

### Component Details

| Component | File | Description |
|-----------|------|-------------|
| `App` | `App.tsx` | Main game component. Manages all game state via `useReducer`. Renders stats, requests, options, combat UI, modals. Contains animation logic for stat changes and flying deltas. Request-screen JSX is grouped in `renderRequestPanel()` using BEM-style layout: `request-panel__header` (portrait + content), `request-panel__options` with `decision-card` buttons containing `decision-card__label` and `decision-card__effects`. Effect chips include icons matching the top resource bar emoji (💰 Gold, 😊 Satisfaction, ❤️ Health, 🔥 Fire Risk, 👨‍🌾 Farmers, ⚔️ Land Forces, 👑 Authority) via the `EFFECT_ICONS` lookup. Portrait is resolved from `currentRequest.portraitId` via the portrait registry (`PORTRAITS`); placeholder is shown when no portrait is defined. Portrait stays left of the text on all screen sizes using a responsive clamped width (`clamp(128px, 28vw, 220px)`) and `aspect-ratio: 3/2`. |
| `ConstructionScreen` | `ConstructionScreen.tsx` | Full-screen overlay showing all buildings as a grid. Opened via a button in the main UI. Shows building states (locked/unlocked/built/deficit). |
| `BuildingCard` | `BuildingCard.tsx` | Individual card displaying one building type: icon, name, description, cost, progress (built/required). When building has no active state: shows build buttons. When building has active state (fire/destroyed/strike): hides build controls and shows state action button (extinguish/repair) with state counts and effective count display. |
| `BuildMultipleModal` | `BuildMultipleModal.tsx` | Modal dialog for building multiple instances at once. Shows cost calculation and gold validation. |
| `LogScreen` | `LogScreen.tsx` | Full-screen overlay listing all past decisions in reverse chronological order. Shows tick, source, option chosen, and stat deltas. Closeable with Escape key. |

### Styling

All styling is in plain CSS files co-located with their components. No CSS-in-JS or CSS frameworks are used.

| CSS File | Lines | Scope |
|----------|-------|-------|
| `App.css` | ~1690 | Main game layout, stats bars, request panel (BEM layout), decision cards, options, animations |
| `BuildingCard.css` | ~385 | Building card appearance and states |
| `LogScreen.css` | ~275 | Decision log layout and entries |
| `BuildMultipleModal.css` | ~230 | Bulk build modal styling |
| `ConstructionScreen.css` | ~145 | Construction overlay grid layout |
| `index.css` | ~40 | Global resets and base styles |

---

## 8. State Management

### GameState Structure

```typescript
interface GameState {
  tick: number;                          // Current game turn
  stats: Stats;                          // 7 resource values
  buildingTracking: Record<string, BuildingTracking>;  // Per-building data
  newlyUnlockedBuilding: string | null;  // UI notification for new unlock
  currentRequestId: string;              // Currently displayed request
  lastRequestId: string;                 // Previous request (prevents repeat)
  log: LogEntry[];                       // Full decision history
  gameOver: boolean;                     // Bankruptcy flag
  gameOverReason?: string;               // Reason for game over
  scheduledEvents: ScheduledEvent[];     // Queued future events (FIFO)
  chainStatus: Record<string, { active: boolean; completedTick?: number }>;
  requestTriggerCounts: Record<string, number>;  // Per-request trigger count
  unlocks: Record<string, true>;         // Unlock tokens for event gating
  scheduledCombats: ScheduledCombat[];   // Future battles
  activeCombat?: ActiveCombat;           // In-progress battle
  pendingAuthorityChecks: PendingAuthorityCheck[];  // Authority checks resolving next tick
  fire: FireState;                       // Fire System V3 runtime state
}
```

### Reducer Actions

| Action | Fields | Description |
|--------|--------|-------------|
| `CHOOSE_OPTION` | `optionIndex`, `combatCommit?`, `authorityCommit?` | Player selects an event option |
| `BUILD_BUILDING` | `buildingId` | Player constructs a building |
| `EXTINGUISH_ONE` | `buildingId` | Extinguish one burning building unit (costs gold + satisfaction) |
| `REPAIR_ONE` | `buildingId` | Repair one destroyed building unit (costs 75% of build cost) |

### State Update Pattern

The game uses React's `useReducer` with an immutable update pattern (spread operator). All side effects are computed inside the reducer — there is no middleware or external state. The reducer is a pure function.

---

## 9. Request & Event System

### Request Types

The game has **~273 request definitions** (approximate — update when adding/removing requests) split into four arrays:

| Array | Count | Purpose |
|-------|-------|---------|
| `infoRequests` | ~11 | Tickless information/tutorial screens (building unlocks, reminders) |
| `eventRequests` | ~190+ | Main gameplay events, chains, authority events |
| `authorityInfoRequests` | ~32 | Authority check feedback (success/failure info screens) |
| `fireChainRequests` | 40 | Fire System V3 slot chain requests (10 slots × 4 per slot) |

### Request Interface

```typescript
interface Request {
  id: string;                    // Unique stable identifier
  title: string;                 // Display title
  text: string;                  // Event description
  options: Option[];             // 1–2 choices
  followUps?: FollowUp[];        // Scheduled future events
  canTriggerRandomly?: boolean;  // false = follow-up only
  chainId?: string;              // Chain membership
  chainRole?: 'start' | 'member' | 'end';
  chainRestartCooldownTicks?: number;
  maxTriggers?: number;          // Limit total triggers
  requires?: string[];           // Unlock token requirements
  advancesTick?: boolean;        // false = tickless/info
  combat?: CombatSpec;           // Combat specification
  authorityMin?: number;         // Min authority to show
  authorityMax?: number;         // Max authority to show
  portraitId?: PortraitId;       // Portrait to show on request screen (key from portrait registry)
}
```

### Event Categories

**Base Events (25):**
- **Military/Security** (6): `EVT_RECRUIT_MILITIA`, `EVT_RAID_SMALL`, `EVT_RAID_LARGE`, `EVT_MILITIA_PAY`, `EVT_RESTLESS_NIGHT`, `EVT_VETERANS_LEAVE`
- **Population/Growth** (4): `EVT_NEW_FARMERS`, `EVT_EMIGRATION`, `EVT_BIG_FAMILY`, `EVT_HARVEST_HELPERS`
- **Crisis** (3): `EVT_CRISIS_UNREST`, `EVT_CRISIS_DISEASE`, `EVT_CRISIS_FIRE`
- **Improvement** (6): `EVT_FIRE_WATCH`, `EVT_VILLAGE_FESTIVAL`, `EVT_MEDICAL_HERBS`, `EVT_TRAIN_MILITIA`, `EVT_CLEAN_STORAGE`, `EVT_TAX_REFORM`
- **Worsening** (6): `EVT_FOREST_FIRE`, `EVT_PLAGUE`, `EVT_THEFTS`, `EVT_BAD_HARVEST`, `EVT_FIREWOOD_WET`, `EVT_FARMERS_QUARREL`

**Building-Gated Events:**
- `EVENT_MARKET_DAY` (requires `building:marketplace`)
- `EVENT_TAVERN_AFTER_WORK` (requires `building:brewery`)

**Event Chains:**

| Chain ID | Start Event | Events | Description |
|----------|------------|--------|-------------|
| `BLACKGEAT` | `CHAIN_BLACKGEAT_START` | ~34 events | Major political/military story arc |
| `HARVEST_FEST` | `CHAIN_HARVEST_FEST_START` | ~6 events | Harvest festival chain |
| `DISEASE_RUMOR` | `CHAIN_DISEASE_RUMOR_START` | ~5 events | Disease rumor chain |
| `PALISADE` | `CHAIN_PALISADE_START` | ~4 events | Palisade construction chain |
| `ARKANAT_INSPECTOR` | `CHAIN_ARKANAT_INSPECTOR_START` | ~6 events | Inspector encounter chain |
| `EGO_INSULT` | `CHAIN_EGO_INSULT_START` | ~6 events | Authority ego test chain |
| `RIVER_PIRATES` | `CHAIN_RIVER_PIRATES_START` | ~6 events | River pirates chain |
| `CHAIN_FIRE_SLOT_1..10` | `FIRE_S{n}_START` | 4 per slot (×10 = 40) | Fire System V3 chain slots (see [Section 18](#18-fire-system-v3)) |

**Authority Events:**
- Low authority (0–33): `EVT_LOW_AUTHORITY`, `EVT_LOW_GUARD_INSUBORDINATION`, `EVT_LOW_SABOTAGE`, `EVT_LOW_PETITION_DENIED`, `EVT_LOW_DEBT_COLLECTOR`, `EVT_LOW_COUNCIL_REVOLT`, `EVT_LOW_BANDITS_MOCK`, `EVT_LOW_FARMERS_LEAVE`, `EVT_LOW_MERCHANT_EXTORTION`, `EVT_LOW_AUTHORITY_CRISIS`
- Medium authority: `EVT_MEDIUM_AUTHORITY`
- Commitment events (low/mid/high authority): `EVT_COMMIT_LOW_*`, `EVT_COMMIT_MID_*`, `EVT_COMMIT_HIGH_*`

**Reminder Requests** (one per building): `REMINDER_FARMSTEAD`, `REMINDER_MARKETPLACE`, `REMINDER_BAKERY`, `REMINDER_BREWERY`, `REMINDER_FIREWOOD`, `REMINDER_WELL`

### Request Selection Algorithm (`picker.ts`)

Priority order:
1. **Active Combat** → return synthetic combat round request
2. **Scheduled Events** (targetTick ≤ current tick, FIFO order, info priority first)
3. **Due Combats** → return synthetic combat start request (crisis still takes priority over combat start)
4. **Crisis Events** (Disease → Unrest; fire crises replaced by Fire System V3 chain slots)
5. **Random Event** from eligible pool (excludes: last request, crisis IDs, `canTriggerRandomly: false`, maxTriggers reached, locked chains, unmet requirements, authority range mismatch)
6. **Fallback**: any non-crisis event → any event → error

Same request is never shown twice in a row (`lastRequestId` check).

---

## 10. Building System

### Building Definitions

| Building | ID | Unlock | Cost | Pop/Building | Benefit | Unlock Token |
|----------|----|--------|------|-------------|---------|-------------|
| 🏠 Farmstead | `farmstead` | 0 farmers | 10g | 20 | Houses farmers (prevents overcrowding) | — |
| 🏪 Marketplace | `marketplace` | 30 farmers | 20g | 100 | Unlocks "Market Day" event | `building:marketplace` |
| 🍞 Bakery | `bakery` | 60 farmers | 40g | 120 | 10% chance per tick for +1 farmer growth | — |
| 🍺 Brewery | `brewery` | 100 farmers | 70g | 150 | Unlocks "Tavern After Work" event | `building:brewery` |
| 🪵 Firewood Supply | `firewood` | 170 farmers | 200g | 180 | 25% chance to halve fire risk increases | — |
| 💧 Central Well | `well` | 250 farmers | 300g | 200 | 50% chance for +1 health on health gains | — |

### Building Scaling Formula

```
requiredCount = 1 + floor((farmers - unlockThreshold) / populationPerBuilding)
```

If `farmers < unlockThreshold`, the building is locked (required = 0).

### Initial State

Farmsteads start with **2 built** (matching the starting 20 farmers at 20 per farmstead). All other buildings start at **0 built**.

### Building Tracking

Each building has persistent runtime tracking:
```typescript
interface BuildingTracking {
  buildingCount: number;        // Built count (never decreases)
  onFireCount: number;          // Currently burning units (Fire System V3)
  destroyedCount: number;       // Destroyed units (Fire System V3)
  onStrikeCount: number;        // Units on strike (reserved for future use)
  unlockedAtTick?: number;      // When first unlocked
  lastRequirementTick?: number; // When last required
  reminderScheduled: boolean;   // Reminder scheduling flag
  reminderCooldownUntil: number; // Earliest next reminder tick
}
```

**Effective Count**: `effectiveCount = buildingCount - onFireCount - destroyedCount - onStrikeCount`. Only effective buildings count toward requirements and capacity. Buildings with any active state cannot have more built until all states are cleared (**build lock**).

---

## 11. Authority System

### Authority Bands

| Band | Range | Gameplay Effect |
|------|-------|----------------|
| **Low** | 0–33 | Face disrespect, sabotage, vulnerability. Special low-authority events appear. |
| **Medium** | 34–66 | Normal governance, balanced opportunities. |
| **High** | 67+ | Elite events, power plays, political intrigue. |

Events can be gated by `authorityMin` and `authorityMax` on the `Request` interface.

### Authority Checks

When a player's chosen option has an `AuthorityCheck`, they can commit authority:

```typescript
interface AuthorityCheck {
  minCommit: number;                   // Minimum commitment
  maxCommit: number;                   // Maximum commitment
  threshold?: number;                  // Success threshold
  onSuccess?: Effect;                  // Bonus effects on success
  onFailure?: Effect;                  // Penalty effects on failure
  successFeedbackRequestId?: string;   // Info event on success
  failureFeedbackRequestId?: string;   // Info event on failure
  refundOnSuccessPercent?: number;     // % refunded on success (default: 100)
  extraLossOnFailure?: number;         // Extra authority lost on failure
  followUpBoosts?: AuthorityFollowUpBoost[];  // Influence future event probabilities
  minSuccessChance?: number;           // Min success % (default: 50)
  maxSuccessChance?: number;           // Max success % (default: 50)
}
```

**Resolution**: Authority checks resolve on the **next tick** (delay = 1). Success/failure is probabilistic based on committed amount relative to threshold.

### Authority Follow-Up Boosts

Boost types that affect follow-up event weights:
- **linear**: Weight increases proportionally with commitment percentage
- **threshold**: Weight jumps if commitment crosses a fixed threshold
- **stepped**: Weight increases in discrete steps

---

## 12. Combat System

### Combat Flow

```
1. Event option with CombatSpec → Player commits landForces via slider
2. Forces deducted from landForces immediately (reserved)
3. Combat scheduled for future tick (prepDelayMinTicks to prepDelayMaxTicks)
4. On due tick: synthetic COMBAT_START request shown
5. Combat activates → rounds begin (COMBAT_ROUND requests)
6. Each round: M = min(playerForces, enemyForces)
   → M pairs roll 1d6 each
   → Higher roll wins (tie = no casualties)
   → Loser in each pair takes 1 casualty
7. Player can "Continue Fighting" or "Withdraw" each round
8. Combat ends when one side reaches 0 forces
9. COMBAT_REPORT shown (tickless) with outcome and consequences
10. Survivors returned to landForces
11. onWin/onLose effects applied
12. Follow-up events (followUpsOnWin/followUpsOnLose) scheduled
```

### Combat Data Model

```typescript
interface CombatSpec {                    // On the Request
  enemyForces: number;
  prepDelayMinTicks: number;
  prepDelayMaxTicks: number;
  onWin?: Effect;
  onLose?: Effect;
  followUpsOnWin?: FollowUp[];
  followUpsOnLose?: FollowUp[];
}

interface ScheduledCombat {               // In GameState
  combatId: string;
  originRequestId: string;
  dueTick: number;
  scheduledAtTick: number;
  enemyForces: number;
  committedForces: number;
  onWin?: Effect;  onLose?: Effect;
  followUpsOnWin?: FollowUp[];  followUpsOnLose?: FollowUp[];
}

interface ActiveCombat {                  // In GameState
  combatId: string;
  originRequestId: string;
  enemyRemaining: number;
  committedRemaining: number;
  initialEnemyForces: number;
  initialCommittedForces: number;
  round: number;
  lastRound?: { playerLosses: number; enemyLosses: number };
  onWin?: Effect;  onLose?: Effect;
  followUpsOnWin?: FollowUp[];  followUpsOnLose?: FollowUp[];
}
```

---

## 13. Modifier Pipeline

Modifiers alter event effects based on active buildings. They apply **only to event decisions**, not to baseline tick income/growth.

### Active Modifiers

| Modifier | Building | Trigger | Effect |
|----------|----------|---------|--------|
| `firewoodModifier` | Firewood Supply | `fireRisk` delta > 0 | 25% chance to halve the fire risk increase (floor rounding) |
| `wellModifier` | Central Well | `health` delta > 0 | 50% chance to add +1 health bonus |

### Modifier Interface

```typescript
type ModifierHook = (
  state: GameState,
  request: Request,
  optionIndex: number,
  baseDelta: Effect
) => { delta: Effect; extraChanges: AppliedChange[] };
```

All modifiers are collected in the `needModifiers` array and applied sequentially in `applyOptionWithModifiers()`.

---

## 14. Configuration & Build

### `vite.config.ts`

- **React plugin**: `@vitejs/plugin-react`
- **PWA plugin**: `vite-plugin-pwa` with Workbox caching, auto-update service worker, `registerType: 'prompt'`
- **Base path**: Dynamic — prioritizes `VITE_BASE_PATH` env var > `GITHUB_REPOSITORY` > `/MarkenKaledruns/`
- **Define globals**: `__APP_VERSION__` (from package.json), `__GIT_BRANCH__` (from `GITHUB_REF_NAME`)

### `tsconfig.app.json`

- **Target**: ES2022
- **JSX**: `react-jsx`
- **Strict mode**: enabled
- **No unused locals/parameters**: enforced
- **Module resolution**: `bundler`

### `tsconfig.node.json`

- **Target**: ES2023
- **Scope**: `vite.config.ts` only

### `eslint.config.js`

- ESLint flat config format
- Extends: recommended JS + TypeScript + React Hooks + React Refresh
- Ignores: `dist/`
- Browser globals enabled

---

## 15. Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:5173)
npm run build        # TypeScript compile + Vite production build
npm run lint         # Run ESLint
npm run preview      # Preview production build locally
```

### Validation

In development mode (`import.meta.env.DEV`), `validateRequests()` runs on startup to check request definition integrity.

---

## 16. Deployment

### GitHub Pages (via GitHub Actions)

**Workflow**: `.github/workflows/pages.yml.disabled` (disabled as of Feb 2026 — verify file status if deployment is needed)

When enabled:
- **Trigger**: Push to any branch
- **Steps**: Checkout → Node 20 → `npm install` → `npm run build` → Deploy `dist/` to GitHub Pages
- **URL**: `https://t-h-omy.github.io/MarkenKaledruns/`
- **Concurrency**: Per-branch, cancels previous runs

### PWA Support

The app registers a service worker via `vite-plugin-pwa`:
- Offline-ready with Workbox caching
- Auto-reload on update (`onNeedRefresh` → `window.location.reload()`)
- Installable as standalone app

---

## 17. Existing Documentation Index

| File | Description |
|------|-------------|
| `README.md` | Main project documentation: setup, tech stack, game overview, deployment |
| `POF_SPEC.md` | Core game specification: all 25 base events, effects, formulas, selection rules |
| `IMPLEMENTATION.md` | Implementation details: building system, fail states, event gating |
| `IMPLEMENTATION_SUMMARY.md` | Summary of implemented features |
| `AUTHORITY_DESIGN.md` | Authority system deep-dive: bands, commits, boosts, ego tests, balancing |
| `DEPLOYMENT_GUIDE.md` | GitHub Pages deployment instructions |
| `DEPLOYMENT_FIX_SUMMARY.md` | Fixes for deployment issues |
| `DEPLOYMENT_ISSUE_EXPLAINED.md` | Explanation of deployment problems |
| `DEPLOYMENT_UPDATE_FIX.md` | Deployment update fixes |
| `ALL_BRANCH_DEPLOYMENT.md` | Multi-branch deployment strategy |
| `GITHUB_PAGES.md` | GitHub Pages configuration notes |
| `GH_PAGES_PREVIEWS.md` | Branch preview setup |
| `README_DEPLOY.md` | Deployment-specific readme |
| `WORKFLOW_MIGRATION.md` | CI/CD workflow migration notes |
| `WORKFLOW_REFERENCE.md` | Workflow configuration reference |
| `VERSION_DISPLAY.md` | Version display in the UI |
| `VERSION_GUIDE.md` | Version management guide |
| `FIX_SUMMARY.md` | Bug fix summaries |
| `SUMMARY.md` | General project summary |
| `TESTING.md` | Testing approach documentation |
| `VERIFICATION.md` | Verification procedures |
| `designs/CONSTRUCTION_SCREEN_DESIGN.md` | Construction screen UI/UX design spec |
| `designs/fire-design-v3.md` | Fire System V3 design specification |
| `designs/requests_updated.ts` | Staging file for candidate request updates |

---

## 18. Fire System V3

### Overview

Fire System V3 replaces the old threshold-based `EVT_CRISIS_FIRE` (fireRisk > 70 trigger) with a deterministic, slot-based fire system. It uses 10 fixed chain slots, count-based building states, seeded RNG, and communicates all state changes through synthetic tickless info requests (no silent damage).

**Design spec**: `designs/fire-design-v3.md`

### Architecture

All fire logic runs in the reducer pipeline (`src/game/state.ts`) using the existing seeded RNG (`src/game/picker.ts`). No external state or side effects.

### Fire State

```typescript
interface FireState {
  slots: FireChainSlotState[];       // Exactly 10 fixed slots (slotIndex 1..10)
  pendingInfoQueue: FireInfoMessage[]; // Queued info messages for next tick
}

type FireTier = 'minor' | 'major' | 'catastrophic';

interface FireChainSlotState {
  slotIndex: number;                   // Fixed 1..10
  active: boolean;                     // Is this slot currently running a fire chain?
  tier?: FireTier;                     // Fire severity tier
  targetBuildingId?: string;           // Which building type is affected
  startedTick?: number;                // When the chain started
  initialOnFireApplied?: number;       // How many buildings were initially set on fire
  abortedByManualExtinguish?: boolean; // Aborted by player extinguishing all fires
}

interface FireInfoMessage {
  type: 'SPREAD_OR_DESTROY' | 'ALL_EXTINGUISHED_ABORT';
  newOnFireByBuildingId?: Record<string, number>;
  newDestroyedByBuildingId?: Record<string, number>;
}
```

### Fire System Config (`FIRE_SYSTEM_CONFIG`)

| Parameter | Value | Description |
|-----------|-------|-------------|
| `baseOffset` | -10 | Offset for linear chance calculation |
| `factor` | 0.5 | Multiplier for chance calculation |
| `chanceMin` | 0 | Minimum fire start chance (%) |
| `chanceMax` | 40 | Maximum fire start chance (%) |
| `spreadChancePerBurningBuilding` | 0.10 | 10% spread chance per burning unit per tick |
| `destroyChancePerBurningBuilding` | 0.08 | 8% destroy chance per burning unit per tick |
| `extinguishCost` | `{ gold: -15, satisfaction: -3 }` | Cost to extinguish one fire |
| `repairCostPercentOfBuildCost` | 0.75 | Repair cost = 75% of building's build cost |
| `chainSlots` | 10 | Fixed number of fire chain slots |

**Max concurrent chains by fireRisk:**

| fireRisk Range | Max Chains |
|---------------|------------|
| 0–30 | 1 |
| 31–60 | 2 |
| 61–80 | 3 |
| 81–100 | 5 |

**Tier rules:**

| Tier | fireRisk Range | Weight | Initial On-Fire |
|------|---------------|--------|-----------------|
| minor | 0–100 | 60 | 1–2 |
| major | 30–100 | 30 | 2–4 |
| catastrophic | 60–100 | 10 | 3–6 |

### Tick Pipeline (Fire Steps)

Each tick advance (after overcrowding, before game-over check):

1. **Spread & Destroy** (`applyFireSpreadAndDestroy`): For each burning unit, rolls for spread (to random building type with `effectiveCount > 0`, i.e. at least one non-stated unit exists) and destroy (on-fire → destroyed). Tracks all deltas.
2. **Chain Start** (`attemptFireChainStart`): Linear probability check, concurrency limit, tier selection, target selection, applies initial on-fire damage, activates lowest free slot.
3. **Info Queue → Scheduled Events**: Converts `pendingInfoQueue` entries into `FIRE_INFO::` synthetic events for next tick, then clears the queue.

### Fire Chain Requests (40 total)

For each slot n=1..10, four requests:

| Request ID | Chain Role | advancesTick |
|------------|-----------|--------------|
| `FIRE_S{n}_START` | start | false |
| `FIRE_S{n}_DECISION` | member | false |
| `FIRE_S{n}_ESCALATE` | member | false |
| `FIRE_S{n}_END` | end | true |

**END options (each slot):**
- **Option A** ("Standard cleanup"): `{ fireRisk: -10 }`
- **Option B** ("Invest in prevention"): `{ fireRisk: -20, gold: -30 }`

### END Cleanup Rule

When any `FIRE_SX_END` is resolved (regardless of option chosen):
1. Read slot's `targetBuildingId` and `initialOnFireApplied`
2. Reduce `onFireCount[target]` by `min(onFireCount, initialOnFireApplied)`
3. Spread fires from other ticks remain untouched
4. Deactivate slot: `{ slotIndex, active: false }`

### Manual Actions

| Action | Validation | Cost | Effect |
|--------|-----------|------|--------|
| `EXTINGUISH_ONE` | `onFireCount > 0`, sufficient gold | `{ gold: -15, satisfaction: -3 }` | `onFireCount -= 1` |
| `REPAIR_ONE` | `destroyedCount > 0`, sufficient gold | `ceil(buildCost × 0.75)` gold | `destroyedCount -= 1` |

**Global Chain Abort**: If `EXTINGUISH_ONE` reduces global `Σ(onFireCount)` to 0, all active fire chain slots are immediately deactivated and an `ALL_EXTINGUISHED_ABORT` info message is queued.

### Synthetic Info Requests

Two types of fire info requests shown as tickless events:

| Type | Title | Content |
|------|-------|---------|
| `SPREAD_OR_DESTROY` | "Das Feuer greift um sich" | Lists exact building-type deltas (new fires + newly destroyed) |
| `ALL_EXTINGUISHED_ABORT` | "Die Lage beruhigt sich" | Explains fires extinguished and all chains ended |

Both include a "Zum Bau-Menü" option that opens the construction overlay.

### UI Integration

**Fire Chain Tag** (App.tsx): When current request matches `FIRE_S{n}_(START|DECISION|ESCALATE|END)`:
- Shows `🔥 Brand (Slot X)` tag above request title
- Shows context line: `Betroffen: {icon} {name} | 🔥 {onFireCount} | 🧱 {destroyedCount}`

**Building Cards** (BuildingCard.tsx): When `hasAnyBuildingState(tracking)` is true:
- Build button hidden (build lock enforced in UI and reducer)
- State status tags shown: `🔥 {n}`, `🧱 {m}`, `⚑ {k}`
- Effective count display: `Wirksam: {effective} / {buildingCount}`
- Priority action button: extinguish (fire) → repair (destroyed) → strike (disabled)
