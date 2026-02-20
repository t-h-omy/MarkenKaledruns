# UI/UX Redesign Proposal v2
## Marken Kaledruns – Medieval Management Game

**Document Version:** 2.0  
**Created:** 2026-02-20 16:22:19  
**Based on:** Marken_Kaledruns_UIUX_Redesign_Proposal.md  
**Status:** Draft

---

## 1. Current State Analysis

### Strengths  
- Clear stat tracking  
- Functional layout  
- Color-coded feedback  
- Mobile-first structure

### Weaknesses  
- Text-heavy and visually flat  
- No character visuals  
- Limited hierarchy  
- Generic dark mode aesthetic  
- Cramped spacing  
- Insufficient contrast in some areas

### Future Scalability Concerns (addressed in this proposal)  
- Stats panel will not scale to up to 15 resources without restructuring  
- Building list will not scale to ~20+ buildings without filtering/grouping  
- No concept of population tiers beyond farmers  
- No visual language for building states (fire, strike, damage)  
- No slot-based UI for specialists/advisors  
- No chain attribution on request screens  
- No navigation placeholder for future diplomacy

---

## 2. Core Redesign Vision – "The Throne Room"

The UI should feel like sitting in a medieval throne room receiving petitions, reports, and making weighty decisions.

### Layout Strategy

**Desktop**  
- Left: Ledger (Stats + Population + Buildings + Log)  
- Center/Right: Petition Panel (Character + Chain Tag + Request + Options)  
- Right sidebar (contextual): Construction / Court / Diplomacy overlays

**Mobile**  
- Header (condensed resources)  
- Petition Panel (Character + Chain Tag + Request + Options)  
- Compact Stats Bar (collapsible groups)  
- Bottom Tabs (Ledger | Build | Court | ...)

### Benefits  
- Clear grouping of information by domain  
- Reduced cognitive overload  
- Better spatial memory  
- Improved readability at scale  
- Extensible for future screens (diplomacy, specialists)

---

## 3. Character Portrait System

### Purpose  
- Humanize decision-making  
- Increase immersion  
- Improve memorability of recurring characters

### Design

Each petitioner appearing on the request screen is represented by a **portrait card** in the petition header:

```
┌─────────────────────────────────────────┐  
│  [Portrait]   THE BAILIFF               │  
│   🧔‍♂️        "Aldric the Steadfast"     │  
│              Housing Concerns           │  
└─────────────────────────────────────────┘
```

- Portrait area: ~80×80px avatar (emoji placeholder → illustrated art)  
- Character name displayed in display serif font (Cinzel / Playfair)  
- Title/role displayed in small caps beneath the name  
- Background tint per character for quick visual recognition (heraldic color)

### Specialist Portraits (future: Royal Court)  
The same portrait system is reused for **specialists** assigned to council slots (see Section 9). Specialists are collectible characters with unique effects. Their portrait cards appear in their assigned slot and should feel consistent with petitioner portraits — same visual language, same data model.

### Data Model

```ts
export interface CharacterPortrait {  
  id: string;  
  name: string;  
  title: string;  
  portraitUrl?: string;       // illustrated art (future)  
  icon?: string;              // emoji placeholder (MVP)  
  backgroundColor?: string;  // heraldic tint  
}

export interface Request {  
  character?: CharacterPortrait;  
  chainName?: string;         // see Section 7: Request Chain Attribution  
}

export interface Specialist extends CharacterPortrait {  
  effect: string;             // e.g. "+10% gold income"  
  effectDetails?: string;     // longer tooltip description  
  rarity?: 'common' | 'rare' | 'legendary';  
}
```

### MVP Recommendation  
Start with emoji placeholders and upgrade to illustrated portraits later. All layout and spacing decisions should be made assuming illustrated portraits will replace the emoji.

---

## 4. Medieval Color System

### Base Palette  
- Deep charcoal backgrounds (`#1a1a2e`)  
- Aged parchment panels (`#f5e6c8`)  
- Cream ink text (`#e8d5b0`)

### Accent Rules  
- **Gold** → Authority & titles only  
- **Red** → Danger / Combat / Urgency (also: buildings on fire / strike)  
- **Blue** → Information / locked content  
- **Green** → Growth / Success / Fulfilled  
- **Orange** → Warnings / Needed / Damaged buildings  
- **Purple** → Specialists / Court (distinct from core resource colors)

### Building State Colors (future)  
Building state badges reuse the same semantic color language:  
- 🔥 On Fire → Red (`#ef4444`)  
- 🪧 On Strike → Orange (`#f59e0b`)  
- ⚡ Damaged / Broken → Yellow-gray (`#ca8a04`)

Goal: Reduce neon accents and create a heraldic manuscript aesthetic. All future feature colors must fit within this semantic palette — no ad-hoc color additions.

---

## 5. Typography System

### Fonts  
- Body: Serif — Crimson Text or Merriweather  
- Titles / Character Names: Display serif — Cinzel or Playfair Display  
- Numbers / Stats: Monospace (for stable alignment as values change)  
- Chain Tags / Labels: Small caps, slightly muted

### Type Scale  
| Token | Size     | Usage                          |  
|-------|----------|--------------------------------|  
| XS    | 0.75rem  | Labels, badges, chain tags     |  
| SM    | 0.875rem | Secondary stats, tooltips      |  
| Base  | 1rem     | Body text, petition content    |  
| XL    | 1.25rem  | Section headings               |  
| 2XL   | 1.5rem   | Character names, screen titles |  
| 3XL   | 2rem     | Screen headers (Construction)  |  

Serif typography adds gravitas and historical atmosphere. All future features must use this scale — no ad-hoc font sizes.

---

## 6. Stats Redesign – "The Ledger"

The ledger must scale to up to **15 resources** without becoming unreadable. Flat horizontal stat bars will not work at this scale.

### Grouped Layout

Stats are organized into **collapsible domain groups**. Each group can be expanded or collapsed independently:

```
▼ People  
   ❤️ Health        87  
   😊 Mood          72  
   🔥 Fire Risk      14%  
   👨‍🌾 Farmers     145  
   ⚒️ Workers        —  [locked]  
   ...

▶ Treasury          (collapsed)  
▶ Military          (collapsed)
```

### Stat Groups (extensible)

| Group      | Current Stats            | Future Stats (planned)                  |  
|------------|--------------------------|------------------------------------------|  
| People     | Health, Mood, Fire Risk  | + Workers tier, + other population tiers|  
| Treasury   | Gold, Farmers (count)    | + Trade income, + other resources        |  
| Military   | Forces, Authority        | + Morale, + Fortification                |  
| Settlement | (future)                 | Building count, active states            |

### Population Tier Display

With 3 new population tiers incoming (e.g. Farmers → Workers → ...), the People group shows each tier as its own stat row. Tiers not yet unlocked appear **greyed out with a lock icon** and a tooltip explaining unlock conditions.

```
👨‍🌾 Farmers      145   ████████░░  (current)  
⚒️  Workers        32   ███░░░░░░░  (current)  
🏭  [Tier 3]        —   ░░░░░░░░░░  🔒 Unlocks at ...  
🎓  [Tier 4]        —   ░░░░░░░░░░  🔒 Unlocks at ...
```

### Benefits  
- Cognitive grouping by domain  
- Reduced clutter at scale  
- Stable number alignment via monospace  
- Progressive disclosure via collapse  
- Future-proof for 15+ resources

---

## 7. Petition Panel – Request Chain Attribution

### Chain Name Tag

Every request that belongs to a named chain now displays the **chain name** prominently above the petition text, so players know which storyline or advisor arc the request originates from.

```
┌─────────────────────────────────────────────┐  
│  ✦ The Bailiff's Housing Crisis             │  ← chain name tag  
├─────────────────────────────────────────────┤  
│  [Portrait]   THE BAILIFF                   │  
│   🧔‍♂️        "Aldric the Steadfast"         │  
├─────────────────────────────────────────────┤  
│  "My lord, our farmers are living in        │  
│   makeshift camps and morale suffers..."    │  
│                                             │  
│   [Understood]   [Go to Construction]       │  
└─────────────────────────────────────────────┘
```

**Chain tag styling:**  
- Small parchment-ribbon banner above the character header  
- Display serif font, small caps, muted gold color  
- Subtle decorative divider (◆ or ✦) to distinguish from main content  
- Requests without a chain show no tag (gracefully absent)

### Full Petition Panel Structure

1. **Chain Tag** (if applicable) — origin chain name  
2. **Character Header** — portrait, name, title  
3. **Petition Text** — with drop cap on first letter  
4. **Section Divider**  
5. **Decision Options** — styled as parchment scroll buttons

---

## 8. Construction Screen – "The Builder's Ledger"

The construction screen is a **full-screen overlay** triggered from the main UI. It must scale to approximately **20 new buildings** (≈26 total) and handle **building states**.

### A. Screen Layout & Navigation

```
┌────────────────────────────────────────────────────────┐  
│  🏗️ SETTLEMENT CONSTRUCTION                        [X] │  
├────────────────────────────────────────────────────────┤  
│  👨‍🌾 145  ⚒️ 32  💰 234 Gold  🔥 2 buildings critical  │  
│  ⚠️ 4 Needed   ✅ 12 Active   🔥 2 On Fire   🪧 1 Strike│  
├────────────────────────────────────────────────────────┤  
│  [All] [Needed] [Available] [States ⚠️] [Locked]       │  ← filter tabs  
│  Sort: [By Urgency ▾]   🔍 Search...                   │  
├────────────────────────────────────────────────────────┤  
│  [ Building Cards Grid ]                               │  
└────────────────────────────────────────────────────────┘
```

- Triggered by a **"Build" button** in the main UI (shows a red badge with count when buildings are needed or in bad states)  
- Dark overlay background with semi-transparent backdrop  
- Escape key closes the screen  
- Header updates live if a tick advances while screen is open

### B. Building Cards

Each building is a **rich card**. Cards adapt to their current state:

**Normal card:**  
```
┌──────────────────────────────────────────┐  
│ 🏠 FARMSTEAD              [⚠️ NEEDED]    │  
├──────────────────────────────────────────┤  
│ "Houses up to 20 farmers..."             │  
│                                          │  
│ 👨‍🌾 Farmers  📊 80 / 145                 │  
│ ✨ Houses 20 farmers per building        │  
│ 💰 Cost: 15 Gold                         │  
│                                          │  
│ Built: 4   Required: 8   Shortage: 4    │  
│ [████████░░░░░░░░░░░░░] 50%             │  
│                                          │  
│       [BUILD x1]   [BUILD MULTIPLE...]  │  
└──────────────────────────────────────────┘
```

**Card with active state:**  
```
┌──────────────────────────────────────────┐  
│ 🏠 FARMSTEAD   [⚠️ NEEDED]  [🔥 ON FIRE] │  
├──────────────────────────────────────────┤  
│ ⚠️ This building is currently on fire!   │  
│    Resolve the crisis to restore output. │  
│                                          │  
│ ...rest of card...                       │  
└──────────────────────────────────────────┘
```

### C. Building States

Buildings can carry one or more **state flags** that are displayed as colored badges on the card header and in the building list filter:

| State      | Badge     | Color  | Meaning                                  |  
|------------|-----------|--------|------------------------------------------|  
| On Fire    | 🔥 ON FIRE | Red    | Building output paused, needs resolution |  
| On Strike  | 🪧 STRIKE  | Orange | Workers refusing — output reduced        |  
| Damaged    | ⚡ DAMAGED  | Yellow | Reduced output until repaired            |

**TypeScript:**
```ts
export type BuildingStateFlag = 'on_fire' | 'on_strike' | 'damaged';

export interface BuildingTracking {
  buildingId: string;
  built: number;
  states: BuildingStateFlag[]; // empty = normal
}
```

States are surfaced in:  
- **Card header badge** (visible at a glance)  
- **Filter tab** "States ⚠️" — shows only buildings with active states  
- **Main UI badge** on the Build button — includes buildings-in-bad-state count alongside shortage count  
- **Notification/reminder requests** — reminder text can reference the state (e.g. "Your bakery is on strike!")

### D. Status Badges (Normal Flow)
- 🔒 **LOCKED** (gray) — "Unlocks at {threshold} farmers/workers/..."  
- ✅ **FULFILLED** (green) — Requirements met  
- ⚠️ **NEEDED** (orange) — Below requirements  
- 💰 **NO GOLD** (red) — Cannot afford  
- ✨ **AVAILABLE** (blue) — Can build, not urgent

### E. Bulk Building

A **"BUILD MULTIPLE"** modal allows batch construction:

```
┌──────────────────────────────────┐  
│  Build Multiple Farmsteads       │  
├──────────────────────────────────┤  
│  [<]  [  3  ]  [>]              │  
│  Total Cost: 45 Gold             │  
│  Gold After: 234 → 189          │  
│     [CONFIRM]    [CANCEL]        │  
└──────────────────────────────────┘
```

- Quantity: 1 to max affordable (or 10, whichever is lower)  
- Real-time cost calculation  
- Warning if gold would go critically low

### F. Filtering, Sorting & Search

With ~26 buildings, discoverability requires:  
- **Filter tabs:** All | Needed | Available | States ⚠️ | Locked  
- **Sort options:** By Urgency | By Cost | By Population Tier requirement | By Unlock Order  
- **Search bar:** text filter by building name (especially useful at 26+ buildings)

### G. Reminder Integration

Reminder requests on the petition panel include a **"Go to Construction"** button that opens the construction screen and scrolls to / highlights the relevant building card:

```
[Understood]   [Go to Construction →]
```

---

## 9. Royal Court – Specialist Slot System

> **Note:** This is a planned future feature. The UI/UX design is specified here so that navigation, visual language, and data models are ready when implementation begins.

The **Royal Court screen** is a full-screen overlay (same pattern as Construction) where the player assigns collected **specialists** to **council roles**. Each council has a fixed number of slots. Slot counts are examples and subject to game design decisions.

### Screen Layout

```
┌─────────────────────────────────────────────────────────┐  
│  👑 ROYAL COURT                                     [X] │  
├─────────────────────────────────────────────────────────┤  
│  ┌─────────────────┐  ┌─────────────────┐              │  
│  │  Throne Room    │  │ Military Council │  ...         │  
│  │  [Slot] [Slot]  │  │ [Slot] [Slot]   │              │  
│  │  [Slot]         │  │                 │              │  
│  └─────────────────┘  └─────────────────┘              │  
├─────────────────────────────────────────────────────────┤  
│  Available Specialists                                   │  
│  [Card] [Card] [Card] [Card] ...                        │  
└─────────────────────────────────────────────────────────┘
```

### Council Panels

Each council panel shows its slots. Slots can be:  
- **Filled** — shows specialist portrait card with name, title, and effect summary  
- **Empty** — shows a dashed placeholder with role label (e.g. "Advisor Slot")  
- **Locked** — greyed out with unlock condition tooltip

```
┌─────────────────────────────┐  
│  🛡️ THRONE ROOM             │  
├─────────────────────────────┤  
│  ┌─────────┐  ┌─────────┐  │  
│  │ 🧙 Mira │  │ 🧔 Aldric│  │  
│  │ Advisor │  │ Steward │  │  
│  │+5% mood │  │+8 gold  │  │  
│  └─────────┘  └─────────┘  │  
│  ┌─────────┐               │  
│  │  Empty  │               │  
│  │  Slot   │               │  
│  └─────────┘               │  
└─────────────────────────────┘
```

### Specialist Cards (in Available Pool)

```
┌───────────────┐  
│ 🏹 [Portrait] │  
│ Lady Elara    │  
│ Huntress      │  
│ ─────────── │  
│ +15% military │  
│ [ASSIGN ▾]   │  
└───────────────┘
```

- Tap/click "ASSIGN" → dropdown shows available councils and their open slots  
- Drag-and-drop (desktop): drag specialist card onto a slot  
- Moving a specialist from one slot to another shows a confirmation if the old slot had meaningful effects

### Data Model

```ts
export interface CouncilSlot {
  id: string;
  councilId: string;
  label: string;               // e.g. "Advisor Slot"  
  assignedSpecialistId?: string;
  locked: boolean;
  unlockCondition?: string;
}

export interface Council {
  id: string;
  name: string;               // e.g. "Throne Room"  
  icon: string;
  slots: CouncilSlot[];
}
```

### Interaction Flow
1. Player opens Royal Court (button in main nav, or from specialist-related request)  
2. Sees all councils with their current slot assignments  
3. Scrolls available specialist pool below (or in a side panel on desktop)  
4. Assigns a specialist → slot fills, effect previewed immediately  
5. Closes Court → effects apply

---

## 10. Interaction Improvements

- **Hover shimmer** on important decision buttons  
- **Decision preview system** — tooltip showing likely stat impact before confirming  
- **Tooltips for stats** — click/hover any stat row in the Ledger for an explanation  
- **Optional Undo** (Authority cost) — for decisions made in error  
- **Deep-linking** — Reminder requests can open the Construction screen or Royal Court screen and highlight the relevant card/slot  
- **Keyboard navigation** — all overlays navigable by keyboard; Escape always closes

---

## 11. Accessibility

- WCAG AAA contrast where possible (especially parchment panels — verify text contrast)  
- ARIA labels for all stat rows and interactive controls  
- Visible focus states on all buttons, tabs, and cards  
- Keyboard navigation for petition panel, construction screen, and Royal Court  
- Minimum 14px (0.875rem) body text  
- Building state badges must not rely on color alone — always include icon + text label

---

## 12. Diplomacy / Alliance Screen (Far Future Placeholder)

> **Note:** Diplomacy is planned but the concept is not yet defined. This section only specifies how to prepare the UI without over-committing.

The main navigation should include a **locked "Diplomacy" tab** from the start. This ensures:  
- Players are aware the feature is coming  
- Navigation layout is designed with the slot already accounted for  
- No retrofitting of navigation structure when diplomacy ships

```
[⚔️ Court]  [🏗️ Build]  [🌍 Diplomacy 🔒]
```

- The locked tab is visible but not clickable (or shows a tooltip: "Coming in a future update")  
- No further UI design is specified until the diplomacy concept is defined

---

## 13. Implementation Roadmap

### Phase 1 – Foundation  
- CSS variable system: colors, typography tokens, spacing scale  
- Font integration (Cinzel, Crimson Text)  
- Contrast audit and fixes

### Phase 2 – Layout & Core Components  
- Ledger: collapsible stat groups, population tier rows (locked placeholders)  
- Petition panel: chain tag, character header, drop cap, dividers  
- Portrait system: emoji MVP with layout ready for illustrated art

### Phase 3 – Construction Screen  
- Full-screen overlay component  
- Building cards with status badges and state badges  
- Filtering, sorting, search bar  
- Bulk build modal  
- Reminder deep-link integration  
- Notification badge on main UI Build button

### Phase 4 – Royal Court Screen (when specialists are implemented)  
- Council panel layout with slot components  
- Specialist card pool  
- Assign / move / unassign interactions  
- Locked slot placeholders

### Phase 5 – Polish  
- Textures and parchment backgrounds  
- Micro-interactions (hover shimmer, card flash on build, progress bar animation)  
- Tooltips throughout  
- Sound design hooks (build success, assign specialist)

### Phase 6 – Accessibility  
- Full ARIA implementation  
- Keyboard navigation testing  
- Screen reader testing  
- Mobile responsive QA

### Phase 7 – Diplomacy (far future, design TBD)  
- Unlock the nav placeholder tab  
- Design and implement once concept is defined

---

## 14. UX Principles

1. **Clarity over Complexity** — Visual hierarchy surfaces what matters now; progressive disclosure hides the rest  
2. **Player Agency** — Multiple interaction paths for the same action (click, keyboard, deep-link)  
3. **Feedback Loops** — Immediate visual and numerical feedback on every action  
4. **Scalability First** — Every UI component is designed to accommodate the planned feature growth  
5. **Consistent Visual Language** — Portraits, color, and typography rules apply uniformly to petitioners, specialists, and buildings  
6. **Error Prevention** — Gold validation, confirmation modals, and clear warnings before irreversible actions  
7. **Accessibility** — Not an afterthought; contrast, keyboard nav, and ARIA are built in from Phase 1

---

## Summary

This proposal merges and extends two prior design directions — the **character portrait system** and the **general UI/UX redesign** — into one unified vision.

It transforms Marken Kaledruns from a functional text interface into a visually distinct medieval governance experience, while explicitly preparing the UI architecture for:

- Up to 15 resources (collapsible Ledger groups)  
- ~20 new buildings (filterable, searchable Construction screen)  
- 3+ population tiers (tier rows in People group, lock placeholders)  
- Specialist / Royal Court slot system (full new screen, shared portrait language)  
- Request chain attribution (chain tag on every petition)  
- Building states — fire, strike, damage (state badges, filter tab, main UI badge)  
- Future diplomacy (locked nav placeholder, no premature design)