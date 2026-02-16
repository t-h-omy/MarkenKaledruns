# Construction Screen Design Document

## 📋 Comprehensive Implementation Prompt: Dedicated Construction Screen

### 🎯 Goal
Transform the building/construction system from a bottom-tab panel into a **full-screen dedicated construction interface** that provides better visibility, planning tools, and feedback for the player. The construction screen should feel like a strategic management layer where players can assess their settlement's needs and make informed building decisions.

---

## 🏗️ Current State Analysis

**Existing Implementation:**
- Building UI is located in `src/App.tsx` in the bottom bar toggle system (`bottomTab === 'build'`)
- Buildings are displayed in a scrollable list with individual BUILD buttons
- Shows: icon, name, status badge, built/required counts, benefit description, cost, and build button
- Status badges: `locked`, `available`, `needed`, `no-gold`, `fulfilled`
- Building definitions in `src/game/buildings.ts` with 6 building types (farmstead, marketplace, bakery, brewery, firewood, well)
- Build action dispatches `BUILD_BUILDING` action to game reducer
- Building reminders appear as request screens (e.g., `REMINDER_FARMSTEAD`)

**Key Files:**
- `src/App.tsx` (lines 640-709): Current building UI in bottom panel
- `src/game/buildings.ts`: Building definitions and logic
- `src/game/state.ts` (lines 1850-1930): BUILD_BUILDING action handler
- `src/App.css` (lines 856-920): Building styles

---

## 🎨 New Construction Screen Design

### A. Screen Layout & Navigation

**Full-Screen Overlay:**
- Create a new full-screen construction interface (similar to how the game-over screen works)
- Triggered by clicking a prominent "Construction" or "Build" button in the main UI
- Dark overlay background with semi-transparent backdrop
- Large, scrollable panel centered on screen
- Close button (X) in top-right corner returns to main game view
- Escape key also closes the screen

**Header Section:**
```
┌─────────────────────────────────────────────────┐
│  🏗️ SETTLEMENT CONSTRUCTION                  [X]│
├─────────────────────────────────────────────────┤
│  👨‍🌾 Farmers: 145    💰 Gold: 234    Tick: 42   │
│  ⚠️ 2 Buildings Needed    ✓ 4 Buildings Active  │
└─────────────────────────────────────────────────┘
```

### B. Building Cards Design

Each building should be displayed as a **rich information card** rather than a compact list item:

```
┌─────────────────────────────────────────────────┐
│ 🏠 FARMSTEAD                    [Status Badge]  │
├─────────────────────────────────────────────────┤
│ "A sturdy homestead that houses up to 20        │
│  farmers. Without enough farmsteads, excess     │
│  population resorts to makeshift camps."        │
│                                                  │
│ 📊 Capacity: 80 / 145 farmers                   │
│ ✨ Benefit: Houses 20 farmers                   │
│ 💰 Cost: 15 Gold per building                   │
│                                                  │
│ Built: 4    Required: 8    Shortage: 4          │
│ [████████░░░░░░░░] 50% Complete                 │
│                                                  │
│            [BUILD FARMSTEAD] x1                 │
│            [BUILD MULTIPLE...]                  │
└─────────────────────────────────────────────────┘
```

**Status Badges (Color-coded):**
- 🔒 **LOCKED** (gray): "Unlocks at {threshold} farmers"
- ✅ **FULFILLED** (green): Requirements met
- ⚠️ **NEEDED** (orange): Below requirements
- 💰 **INSUFFICIENT GOLD** (red): Can't afford
- ✨ **AVAILABLE** (blue): Can build, not urgent

### C. Visual Feedback Elements

**1. Progress Bars:**
- Visual bar showing built vs required ratio
- Color transitions: Red (0-33%) → Yellow (34-66%) → Green (67-100%)
- Animated fill when buildings are constructed

**2. Shortage Indicators:**
- Clear "Shortage: X buildings" text when below requirements
- Pulsing/glowing effect on cards that need attention
- Sort buildings by urgency (needed first, then available, then fulfilled, then locked)

**3. Cost Preview:**
- Show total gold cost for building X amount
- Preview stats after building: "Gold after build: X → Y"
- Warning if building would put gold into negative territory

**4. Build Animations:**
- Brief animation when BUILD button is clicked
- Card flashes green on successful build
- Progress bar smoothly animates to new value
- Gold counter smoothly decrements

### D. Bulk Building Feature

**"BUILD MULTIPLE" Modal:**
```
┌─────────────────────────────────────┐
│  Build Multiple Farmsteads          │
├─────────────────────────────────────┤
│  How many would you like to build?  │
│                                     │
│  [<]  [  3  ]  [>]                  │
│                                     │
│  Total Cost: 45 Gold                │
│  Gold After: 234 → 189              │
│                                     │
│  ⚠️ This will build 3 Farmsteads    │
│                                     │
│     [CONFIRM]    [CANCEL]           │
└─────────────────────────────────────┘
```

- Stepper/slider to select quantity (1 to maximum affordable or 10, whichever is lower)
- Real-time cost calculation
- Single batch build action to reducer

---

## 🔔 Notification & Reminder Integration

### In-Game Indicators When Construction Screen is Closed:

**Main Game UI should show:**
1. **Build Button Badge:**
   - Red notification dot when buildings are needed
   - Number badge showing count of needed building types
   - Pulsing animation when shortage is critical

2. **Mini-Status Bar (optional):**
   - Small banner at top of screen: "⚠️ 3 Farmsteads needed" (click to open construction)
   - Auto-dismissable but reappears each tick if still needed

### Request Screen Integration:

**When Reminder Requests Appear:**
- Reminder requests (e.g., `REMINDER_FARMSTEAD`) should still appear as request screens
- **Add new button option:** "Open Construction Screen" alongside "Understood"
- Clicking "Open Construction Screen" dismisses the reminder AND opens the construction interface
- The relevant building card should be **highlighted/scrolled-to** when opened this way

**Example Reminder Screen:**
```
┌─────────────────────────────────────────┐
│  The Bailiff Urges: Housing             │
├─────────────────────────────────────────┤
│  "My lord, our farmers are living in    │
│   makeshift camps..."                   │
│                                         │
│   [Understood]  [Go to Construction]    │
└─────────────────────────────────────────┘
```

### First-Time Info Requests:
- Info requests (e.g., `INFO_NEED_MARKETPLACE`) remain as tickless info screens
- No changes needed - they explain benefits, not prompt building

---

## 📊 Additional Features

### 1. Filtering & Sorting
- Filter buttons: `All | Needed | Available | Locked`
- Sort options: `By Urgency | By Cost | By Unlock Order`
- Search/filter bar for larger building lists (future-proof)

### 2. Tooltips & Help
- Hover over benefit descriptions to see detailed effect explanations
- "?" icon next to complex mechanics (e.g., "25% chance to halve fireRisk increases")
- Link to building system documentation

### 3. Resource Planning
- Optional "Build Queue" section showing recommended build order
- AI suggestion: "Build 2 Farmsteads first (45 Gold), then 1 Marketplace (15 Gold)"
- Based on current shortages and gold availability

### 4. Historical Tracking
- Show when building was last constructed: "Last built: Tick 38"
- Show total buildings constructed across all time (if tracked)

---

## 🎯 Interaction Flow

**User Flow Example:**
1. Player is on main game screen (request panel)
2. Notices "Build" button has red badge with "3"
3. Clicks "Build" → Construction screen opens full-screen
4. Sees 3 buildings with "NEEDED" status (highlighted at top)
5. Clicks "BUILD MULTIPLE..." on Farmstead card
6. Selects quantity: 2
7. Confirms → Gold decreases, progress bar updates, card animates
8. Sees shortage reduced: "Shortage: 4 → 2"
9. Builds 2 more individually
10. Farmstead card turns green "FULFILLED"
11. Badge on Build button updates: "3 → 2"
12. Clicks X to close → Returns to request screen

---

## ⚙️ Technical Implementation Details

### State Management:
- Add `constructionScreenOpen: boolean` to component state
- Add `highlightedBuildingId: string | null` for deep-linking from reminders
- Keep existing `buildingTracking` in game state (no changes needed)

### New Components to Create:
```typescript
// src/components/ConstructionScreen.tsx
interface ConstructionScreenProps {
  gameState: GameState;
  onClose: () => void;
  onBuild: (buildingId: string, quantity: number) => void;
  highlightedBuilding?: string;
}

// src/components/BuildingCard.tsx
interface BuildingCardProps {
  definition: BuildingDefinition;
  tracking: BuildingTracking;
  farmers: number;
  gold: number;
  onBuild: (buildingId: string, quantity: number) => void;
  isHighlighted: boolean;
}

// src/components/BuildMultipleModal.tsx
interface BuildMultipleModalProps {
  building: BuildingDefinition;
  currentGold: number;
  onConfirm: (quantity: number) => void;
  onCancel: () => void;
}
```

### Reducer Changes:
- Modify `BUILD_BUILDING` action to accept optional `quantity: number` parameter
- Default quantity = 1 (backward compatible)
- Loop quantity times to build multiple (or optimize with batch logic)

```typescript
export type GameAction =
  | {
      type: 'BUILD_BUILDING';
      buildingId: string;
      quantity?: number; // NEW: defaults to 1
    }
  | ...
```

### CSS Structure:
```css
.construction-screen-overlay { /* Full-screen backdrop */ }
.construction-screen-panel { /* Centered scrollable container */ }
.construction-header { /* Top section with stats */ }
.construction-grid { /* Building cards grid/list */ }
.building-card { /* Individual building card */ }
.building-card.needed { /* Highlighted needed cards */ }
.building-card.highlighted { /* Deep-linked from reminder */ }
.progress-bar { /* Visual requirement bar */ }
.build-multiple-modal { /* Bulk build popup */ }
```

---

## 🔄 Integration with Request Screen

**Request Screen Changes:**
- Remove current bottom-tab building panel entirely
- Replace "Build" bottom tab with dedicated "Open Construction" button
  - Positioned prominently (e.g., top-right of request panel or as a banner button)
  - Shows notification badge when buildings needed

**Reminder Request Changes:**
- Modify reminder request components to include:
  ```tsx
  <button onClick={() => {
    dispatch({ type: 'CHOOSE_OPTION', optionIndex: 0 });
    openConstructionScreen(def.id); // Open + highlight
  }}>
    Go to Construction
  </button>
  ```

---

## ✅ Acceptance Criteria

**Must Have:**
- [ ] Full-screen construction interface opens/closes cleanly
- [ ] All 6 buildings displayed as detailed cards
- [ ] Status badges accurately reflect current state
- [ ] Progress bars show built/required ratio visually
- [ ] Single BUILD button works per building
- [ ] Gold cost validation prevents invalid builds
- [ ] Screen closes on X button and Escape key
- [ ] Notification badge on main UI when buildings needed
- [ ] Reminder requests can deep-link to construction screen
- [ ] Responsive design (mobile-friendly stacking)

**Should Have:**
- [ ] BUILD MULTIPLE feature with modal
- [ ] Sorting by urgency (needed first)
- [ ] Animated transitions and visual feedback
- [ ] Shortage count clearly displayed
- [ ] Gold preview before building
- [ ] Highlighted card when deep-linked from reminder

**Nice to Have:**
- [ ] Filter buttons (All/Needed/Available/Locked)
- [ ] Sort options dropdown
- [ ] Tooltips for benefits
- [ ] Build queue/recommendation system
- [ ] Sound effects on build success

---

## 🐛 Edge Cases to Handle

1. **Player opens construction screen, then population drops:** Progress bars should update in real-time if screen stays open during tick advance
2. **Multiple builds exceed gold:** Disable button when gold insufficient, show clear error
3. **Deep-link to locked building:** Show the card but with clear "Unlock at X farmers" message
4. **No buildings available to build:** Show empty state: "All construction projects complete!" or "Save gold for future needs"
5. **Spam-clicking BUILD:** Debounce button or disable during animation

---

## 🎨 Visual Design References

**Inspiration:**
- **Frostpunk's building menu:** Large cards, clear resource costs, urgency indicators
- **Civilization's city production screen:** Progress bars, visual hierarchy
- **Reigns' decision cards:** Simple, bold typography, clear icons

**Color Palette Suggestions:**
- Locked: `#6b7280` (gray)
- Fulfilled: `#10b981` (green)
- Needed: `#f59e0b` (orange)
- Insufficient Gold: `#ef4444` (red)
- Available: `#3b82f6` (blue)

---

## 📝 Implementation Checklist

### Phase 1: Core Construction Screen
1. Create `ConstructionScreen.tsx` component
2. Create `BuildingCard.tsx` component
3. Add state for `constructionScreenOpen` in App.tsx
4. Implement open/close logic with button in main UI
5. Style with `construction-screen.css`
6. Test basic open/close flow

### Phase 2: Building Cards & Actions
7. Implement detailed building card layout
8. Add status badge logic
9. Add progress bar component
10. Wire up single BUILD button to existing reducer
11. Add gold validation
12. Test build flow

### Phase 3: Visual Feedback
13. Add build animations (flash, progress bar fill)
14. Add notification badge to main UI button
15. Implement sorting by urgency
16. Add transition animations
17. Test visual polish

### Phase 4: Bulk Building
18. Create `BuildMultipleModal.tsx`
19. Modify reducer to accept quantity parameter
20. Add "BUILD MULTIPLE" button to cards
21. Implement quantity selector (stepper/slider)
22. Test batch building

### Phase 5: Reminder Integration
23. Add "Go to Construction" button to reminder requests
24. Implement deep-linking with `highlightedBuildingId`
25. Add scroll-to behavior for highlighted card
26. Test reminder → construction flow

### Phase 6: Polish & Edge Cases
27. Add Escape key handler
28. Implement real-time updates if screen open during tick
29. Add empty states
30. Mobile responsive design
31. Final QA and bug fixes

---

## 🎮 UX Principles

This construction screen design follows these core UX principles:

1. **Clarity over Complexity:** All information is visible at a glance with clear visual hierarchy
2. **Player Agency:** Multiple ways to build (single, bulk) give players control
3. **Feedback Loops:** Immediate visual and numerical feedback on all actions
4. **Progressive Disclosure:** Advanced features (bulk build) available but not overwhelming
5. **Error Prevention:** Clear validation and warnings before costly mistakes
6. **Accessibility:** Keyboard navigation, clear contrast, readable text sizes

---

**Document Version:** 1.0  
**Created:** 2026-02-16 14:30:57  
**Last Updated:** 2026-02-16 14:30:57  
**Author:** AI UX/UI Design Assistant  
**Status:** Draft - Ready for Implementation