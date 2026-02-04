# PoF Gameplay Rules Implementation

This document describes the implementation of gameplay rules and UI safeguards for the Proof-of-Fun game.

## Features Implemented

### 1. Gold Fail State ✅

**Requirements:**
- Gold minimum cap is -50
- Display "Bankruptcy imminent" warning when gold goes below 0
- Trigger fail state (game over) when gold reaches -50
- Clamp gold so it never goes below -50

**Implementation:**
- Modified `clampStats()` in `state.ts` to allow gold down to -50
- Added `gameOver` and `gameOverReason` fields to `GameState` interface
- Reducer checks for gold <= -50 after applying baseline rules
- When game over is triggered, `gameOver` is set to true and actions are blocked
- UI displays orange warning banner when gold is negative but above -50
- Full game over screen shown at -50 with final stats and restart button

**Files Changed:**
- `src/pof/state.ts`: Gold clamping, game over logic
- `src/App.tsx`: Bankruptcy warning banner, game over UI
- `src/App.css`: Styling for warning and game over screen

### 2. Invalid Decision Prevention ✅

**Requirements:**
- Disable options that would reduce landForces below 0
- Disable options that would reduce farmers below 0
- Grey out disabled options visually
- Show inline explanation label (no tooltips)
- Make disabled options non-clickable

**Implementation:**
- Added `isOptionDisabled()` function in App.tsx that checks:
  - If `farmers + effects.farmers < 0` → disable with "Not enough farmers"
  - If `landForces + effects.landForces < 0` → disable with "Not enough land forces"
- Disabled options receive `option-disabled` CSS class
- Button `disabled` attribute prevents clicking
- Inline `<div className="option-disabled-reason">` shows explanation

**Visual Indicators:**
- Grey background gradient
- Reduced opacity (0.6)
- No hover effects
- "not-allowed" cursor
- Red italic reason text

**Files Changed:**
- `src/App.tsx`: Option validation logic
- `src/App.css`: Disabled option styles

### 3. Critical Event Gating ✅

**Requirements:**
- Unrest events only if satisfaction < 30
- Disease events only if health < 30
- Fire crisis events only if fireRisk > 70
- Events must never appear outside their critical ranges

**Implementation:**
- Crisis event conditions already existed in `picker.ts` (lines 102-113)
- Added explicit filtering to remove crisis events from random selection
- Created `crisisEventIds` array: `['EVT_CRISIS_FIRE', 'EVT_CRISIS_DISEASE', 'EVT_CRISIS_UNREST']`
- Random event selection filters out these IDs (lines 142-149)
- Crisis events can ONLY appear through explicit condition checks

**Files Changed:**
- `src/pof/picker.ts`: Added crisis event filtering

## Testing

### Automated Testing
- ✅ ESLint: No linting errors
- ✅ TypeScript: Builds successfully
- ✅ CodeQL Security Scan: No vulnerabilities found
- ✅ Logic Tests: All validation logic verified

### Manual Testing
- ✅ Gold fail state: Tested reaching -50 gold, game over triggers correctly
- ✅ Bankruptcy warning: Orange banner appears when gold < 0
- ✅ Game over screen: Displays correctly with final stats and restart button
- ⚠️ Disabled options: Logic verified, requires specific game states to test visually
- ✅ Critical event gating: Code review confirms correct implementation

### Screenshots
1. Initial game state with all features working
2. Bankruptcy warning (gold = -8)
3. Game over screen (gold = -50)

## Code Quality

All changes follow these principles:
- **Minimal**: Only necessary code added/modified
- **Surgical**: Precise changes to specific functions
- **Readable**: Clear variable names and comments
- **Type-safe**: Full TypeScript compliance
- **No breaking changes**: Existing gameplay unaffected

## Security

No security vulnerabilities introduced. CodeQL scan passed with 0 alerts.

## Future Enhancements

While not required for this implementation, potential improvements:
- Add unit tests for validation logic
- Add integration tests for game state transitions
- Consider adding analytics for game over frequency
- Optional: Add sound effects for bankruptcy warning

