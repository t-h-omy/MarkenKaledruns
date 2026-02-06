# Testing Documentation for Branching Event Chains

## Overview
This document describes how to test the branching event chains feature with delayed follow-ups.

## Manual Testing

### Test Event: Mysterious Traveler
A test event `EVT_MYSTERIOUS_TRAVELER` has been added with the following branching structure:

```
EVT_MYSTERIOUS_TRAVELER
├─ Option 0: WELCOME (-5 gold, +2 satisfaction)
│  └─ Follow-up (2-4 ticks delay):
│     ├─ EVT_TRAVELER_TEACHES (weight: 3, 75% chance)
│     └─ EVT_TRAVELER_BETRAYS (weight: 1, 25% chance)
└─ Option 1: SEND AWAY (-2 satisfaction)
   └─ Follow-up (3-5 ticks delay):
      ├─ EVT_TRAVELER_CURSE (weight: 2, 67% chance)
      └─ EVT_TRAVELER_RETURNS (weight: 1, 33% chance)
```

### Manual Test Procedure

1. **Start the game** with `npm run dev`
2. **Play until the Mysterious Traveler event appears**
3. **Choose an option** (WELCOME or SEND AWAY)
4. **Observe game state**:
   - The event should not appear immediately
   - After 2-5 ticks (depending on chosen option), a follow-up event should appear
   - The follow-up should be one of the candidates based on weighted probability

5. **Test FIFO ordering** (requires multiple scheduled events):
   - If you encounter the Mysterious Traveler multiple times
   - Schedule multiple follow-ups
   - Verify they appear in the order they were scheduled

## Code Review Verification

### 1. Weighted Random Selection (`picker.ts`)

The `selectWeightedCandidate` function:
- ✅ Calculates total weight correctly
- ✅ Uses the seeded RNG for determinism
- ✅ Handles edge cases (empty array, zero weights)
- ✅ Returns null when no valid candidates

### 2. Follow-up Scheduling (`state.ts`)

The `scheduleFollowUps` function:
- ✅ Checks for follow-ups on the current request
- ✅ Filters by `triggerOnOptionIndex`
- ✅ Uses weighted selection to choose one candidate
- ✅ Calculates random delay within min/max range
- ✅ Adds to scheduled events with proper metadata

### 3. Scheduled Event Priority (`picker.ts`)

The `pickNextRequest` function:
- ✅ Checks scheduled events BEFORE crisis/needs/random logic
- ✅ Filters events by targetTick <= currentTick
- ✅ Sorts by FIFO order (scheduledAtTick, then targetTick)
- ✅ Returns the first due event
- ✅ Falls back to normal logic if no scheduled events

### 4. Event Queue Management (`state.ts`)

The reducer:
- ✅ Schedules follow-ups after choosing an option
- ✅ Removes the shown scheduled event from the queue
- ✅ Preserves scheduled events across state transitions
- ✅ Includes scheduledEvents in all return paths

## Unit Test Scenarios

To add formal unit tests, consider:

1. **Test weighted selection determinism**:
   ```typescript
   seedRandom(12345);
   const results = Array(100).fill(0).map(() => 
     selectWeightedCandidate([
       { id: 'A', weight: 3 },
       { id: 'B', weight: 1 }
     ])
   );
   // Expect ~75% A, ~25% B
   ```

2. **Test follow-up scheduling**:
   ```typescript
   const state = initializeGame();
   state.currentRequestId = 'EVT_MYSTERIOUS_TRAVELER';
   const newState = gameReducer(state, { type: 'CHOOSE_OPTION', optionIndex: 0 });
   expect(newState.scheduledEvents.length).toBe(1);
   expect(newState.scheduledEvents[0].targetTick).toBeGreaterThanOrEqual(state.tick + 3);
   ```

3. **Test FIFO ordering**:
   ```typescript
   const state = {
     ...initializeGame(),
     tick: 10,
     scheduledEvents: [
       { targetTick: 10, requestId: 'A', scheduledAtTick: 5 },
       { targetTick: 10, requestId: 'B', scheduledAtTick: 3 },
     ]
   };
   const request = pickNextRequest(state);
   expect(request.id).toBe('B'); // Earlier scheduledAtTick
   ```

4. **Test event removal**:
   ```typescript
   const state = {
     ...initializeGame(),
     scheduledEvents: [
       { targetTick: 5, requestId: 'TEST_EVENT', scheduledAtTick: 1 }
     ],
     tick: 5
   };
   const newState = gameReducer(state, { type: 'CHOOSE_OPTION', optionIndex: 0 });
   expect(newState.scheduledEvents.find(e => e.requestId === 'TEST_EVENT')).toBeUndefined();
   ```

## Integration Testing

To fully test the feature:

1. Use the React DevTools to inspect game state
2. Monitor `scheduledEvents` array in the state
3. Verify events appear at the expected tick
4. Test edge cases:
   - Multiple scheduled events on the same tick
   - Scheduled event during a crisis condition
   - Follow-up events that themselves have follow-ups

## Performance Considerations

- Scheduled events array grows linearly with scheduled follow-ups
- FIFO sorting is O(n log n) but n is expected to be small (< 10)
- Weighted selection is O(n) where n is number of candidates (typically 2-4)
- No performance issues expected for normal gameplay

## Deterministic Behavior

The implementation uses the existing seeded RNG system:
- Call `seedRandom(seed)` to enable deterministic behavior
- Useful for debugging and balancing
- All randomness (delay, candidate selection) uses the same RNG
- Same seed + same actions = same outcome

## Known Limitations

- Follow-ups cannot reference requests that don't exist (no validation)
- Maximum one follow-up per option can be scheduled per decision
- Scheduled events persist even during game over (harmless)

## Future Enhancements

Potential improvements not in scope:
- Validation that follow-up requestIds exist
- Conditional follow-ups (only schedule if certain conditions met)
- Cancel/modify scheduled events based on game state changes
- UI indicator showing upcoming scheduled events
