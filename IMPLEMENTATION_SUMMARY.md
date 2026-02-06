# Branching Event Chains Implementation Summary

## Overview
This implementation adds support for branching event chains with delayed follow-ups to the Proof-of-Fun game engine. The system allows events to trigger subsequent events after a configurable delay, with weighted random selection from multiple possible outcomes.

## Key Components

### 1. Data Models (`src/game/models.ts`)

#### New Interfaces
```typescript
interface WeightedCandidate {
  requestId: string;  // ID of the event to schedule
  weight: number;      // Selection probability weight
}

interface FollowUp {
  triggerOnOptionIndex: number;  // Which option triggers this follow-up (0 or 1)
  delayMinTicks: number;          // Minimum delay before showing follow-up
  delayMaxTicks: number;          // Maximum delay before showing follow-up
  candidates: WeightedCandidate[]; // Possible follow-up events with weights
}
```

#### Extended Request Interface
```typescript
interface Request {
  id: string;
  title: string;
  text: string;
  options: Option[];
  followUps?: FollowUp[];  // NEW: Optional follow-up definitions
}
```

### 2. Weighted Random Selection (`src/game/picker.ts`)

#### Core Algorithm
```typescript
export function selectWeightedCandidate<T extends { weight: number }>(
  candidates: T[]
): T | null
```

**Features:**
- Uses existing seeded RNG for determinism
- O(n) time complexity
- Handles edge cases (empty array, zero weights)
- Generic implementation works with any weighted type

**Algorithm:**
1. Calculate total weight: `sum of all weights`
2. Generate random value: `random * totalWeight`
3. Iterate through candidates, accumulating weights
4. Return first candidate where `randomValue < accumulatedWeight`

### 3. Scheduled Event Queue (`src/game/state.ts`)

#### ScheduledEvent Interface
```typescript
interface ScheduledEvent {
  targetTick: number;      // When to show this event
  requestId: string;       // Which event to show
  scheduledAtTick: number; // When this was scheduled (for FIFO)
}
```

#### GameState Extension
```typescript
interface GameState {
  // ... existing fields
  scheduledEvents: ScheduledEvent[];  // NEW: Queue of scheduled events
}
```

### 4. Follow-up Scheduling Logic (`src/game/state.ts`)

#### scheduleFollowUps Function
```typescript
function scheduleFollowUps(
  currentRequest: Request,
  optionIndex: number,
  currentTick: number,
  existingScheduledEvents: ScheduledEvent[]
): ScheduledEvent[]
```

**Process:**
1. Find follow-ups triggered by chosen option
2. For each triggered follow-up:
   - Select ONE candidate using weighted random
   - Calculate random delay: `min + floor(random * (max - min + 1))`
   - Schedule event: `targetTick = currentTick + 1 + delay`
   - Add to queue with `scheduledAtTick = currentTick`

### 5. Event Prioritization (`src/game/picker.ts`)

#### Updated pickNextRequest Priority Order
```
1. Scheduled events (targetTick <= currentTick, FIFO order)
2. Crisis events (fireRisk > 70, health < 30, satisfaction < 30)
3. Required needs (unlocked and unfulfilled)
4. Random events (from pool of 25+)
```

#### FIFO Sorting Logic
```typescript
dueEvents.sort((a, b) => {
  if (a.scheduledAtTick === b.scheduledAtTick) {
    return a.targetTick - b.targetTick;  // Secondary: earlier target tick
  }
  return a.scheduledAtTick - b.scheduledAtTick;  // Primary: scheduled order
});
```

## Example: Mysterious Traveler Event

### Event Definition
```typescript
{
  id: 'EVT_MYSTERIOUS_TRAVELER',
  title: 'The Mysterious Traveler',
  text: 'A hooded traveler arrives at your gates...',
  options: [
    { text: 'WELCOME', effects: { gold: -5, satisfaction: 2 } },
    { text: 'SEND AWAY', effects: { satisfaction: -2 } }
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,  // WELCOME
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [
        { requestId: 'EVT_TRAVELER_TEACHES', weight: 3 },   // 75% chance
        { requestId: 'EVT_TRAVELER_BETRAYS', weight: 1 }    // 25% chance
      ]
    },
    {
      triggerOnOptionIndex: 1,  // SEND AWAY
      delayMinTicks: 3,
      delayMaxTicks: 5,
      candidates: [
        { requestId: 'EVT_TRAVELER_CURSE', weight: 2 },     // 67% chance
        { requestId: 'EVT_TRAVELER_RETURNS', weight: 1 }    // 33% chance
      ]
    }
  ]
}
```

### Execution Flow

**Tick 0:** Player encounters `EVT_MYSTERIOUS_TRAVELER`

**Tick 1:** Player chooses "WELCOME"
- Weighted selection: 75% → `EVT_TRAVELER_TEACHES`, 25% → `EVT_TRAVELER_BETRAYS`
- Random delay: 2-4 ticks (let's say 3 is selected)
- Schedule: `EVT_TRAVELER_TEACHES` for tick 5 (1 + 1 + 3)

**Ticks 2-4:** Normal event picker logic (crisis, needs, or random)

**Tick 5:** Scheduled event takes priority
- Show `EVT_TRAVELER_TEACHES`
- Remove from scheduled queue
- Normal flow continues

## Technical Characteristics

### Determinism
- All randomness uses the existing seeded RNG
- Same seed + same actions = same outcomes
- Critical for debugging and balancing

### Performance
- Scheduled event check: O(n) where n = queue size
- FIFO sort: O(n log n) but typically n < 10
- Weighted selection: O(m) where m = candidates (typically 2-4)
- No performance concerns for normal gameplay

### Memory
- Each scheduled event: ~24 bytes (3 numbers)
- Expected queue size: < 10 events
- Memory impact: negligible

### Edge Cases Handled
- Empty candidates array → returns null, no event scheduled
- Zero/negative weights → returns null
- Follow-up request not found → falls back to normal picker
- Multiple events due same tick → FIFO order
- Scheduled event during crisis → scheduled event shown first

## Integration Points

### State Reducer
- Calls `scheduleFollowUps()` after option selection
- Calls `removeScheduledEvent()` before updating state
- Passes `scheduledEvents` to picker

### Request Picker
- Checks scheduled events before all other logic
- Returns first due event in FIFO order
- Falls back to normal logic if none due

### Game State
- Persists scheduled events across ticks
- Includes in all state transitions
- Maintains FIFO metadata

## Testing Strategy

### Manual Testing
1. Play until `EVT_MYSTERIOUS_TRAVELER` appears
2. Choose an option
3. Verify follow-up appears after 2-5 ticks
4. Verify it's one of the expected outcomes

### Code Review Verification
- ✅ Weighted selection algorithm correct
- ✅ Delay calculation inclusive of min and max
- ✅ FIFO ordering by scheduledAtTick
- ✅ Event removal prevents duplicates
- ✅ All state transitions include scheduledEvents

### Unit Test Scenarios (See TESTING.md)
- Weighted selection distribution
- Follow-up scheduling
- FIFO ordering
- Event removal
- Deterministic behavior with seeded RNG

## Design Decisions

### Why Weighted Random vs Fixed Probability?
- Easier to balance (just adjust numbers)
- More flexible (can have 3+ outcomes)
- Clearer intent (weight 3 vs 1 = 75% vs 25%)

### Why FIFO vs Priority Queue?
- Simpler to understand and debug
- Matches player expectations (first scheduled, first shown)
- No need for priority levels in current design

### Why One Event Per Tick vs All At Once?
- Maintains game pacing
- Prevents information overload
- Allows player to respond to each event
- Matches existing one-event-per-tick model

### Why Scheduled Events Before Crisis?
- Narrative continuity (don't interrupt story chains)
- Player commitment (scheduled events are "promised")
- Crisis events can appear naturally after scheduled events

## Future Enhancements (Out of Scope)

- Validation that follow-up requestIds exist
- Conditional follow-ups (only schedule if conditions met)
- Cancel/modify scheduled events based on game state
- UI indicator showing upcoming scheduled events
- Multiple follow-ups per option
- Follow-up chains (event A → B → C)

## Files Changed

1. `src/game/models.ts` - Added interfaces for WeightedCandidate, FollowUp, extended Request
2. `src/game/picker.ts` - Added selectWeightedCandidate, getRandomValue, updated pickNextRequest
3. `src/game/state.ts` - Added ScheduledEvent, scheduleFollowUps, removeScheduledEvent, updated reducer
4. `src/game/requests.ts` - Added 5 test events demonstrating branching chains
5. `TESTING.md` - Created comprehensive testing documentation

## Lines of Code
- Core implementation: ~150 lines
- Test events: ~140 lines
- Documentation: ~300 lines
- Total impact: ~590 lines added

## Backward Compatibility
- ✅ All existing requests work unchanged
- ✅ followUps is optional
- ✅ No breaking changes to existing interfaces
- ✅ Picker fallback ensures robustness

## Conclusion
The implementation successfully adds branching event chains to the game engine while maintaining the existing architecture's simplicity and clarity. The system is deterministic, performant, and ready for content creators to build rich narrative chains.
