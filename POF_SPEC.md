# Proof-of-Fun Specification

## Overview
This is a Proof-of-Fun prototype for a strategy game about ruling a medieval realm through difficult decisions.

**Core Question**: Is it fun to make repeated, meaningful decisions when all consequences are permanent and clearly visible?

## Scope

### In Scope
- One population: farmers
- One screen interface
- One request per tick
- Maximum two options per request
- All effects are permanent
- Deterministic systems (no randomness except request selection)
- No win/lose condition

### Out of Scope
- Multiple populations
- Content generation
- Progression systems
- Hidden values
- Win/lose conditions

## Game Stats

### Population
- **Farmers**: The number of farmers in your realm
- Starting value: 100
- Cannot go below 0

### Resources
- **Gold**: The realm's treasury
- Starting value: 500
- Can go negative (representing debt)

- **Food**: Food supply for the population
- Starting value: 200
- Can go negative (representing famine)

### Needs
- **Housing Need**: How much housing is needed
- Formula: `Math.floor(farmers / 4)`
- Updates automatically each tick

- **Food Need**: How much food is needed per tick
- Formula: `Math.floor(farmers / 10)`
- Updates automatically each tick

### Capacities
- **Housing Capacity**: How much housing is available
- Starting value: 25
- Cannot go below 0

- **Food Production**: Food produced per tick
- Starting value: 15
- Cannot go below 0

## Baseline Effects (Applied Every Tick)

### Income
- Gold income per tick: `10`
- Applied after request resolution

### Food
- Food change per tick: `foodProduction - foodNeed`
- Applied after request resolution

### Population Growth
- If `food >= foodNeed` and `housingCapacity >= housingNeed`:
  - Growth: `+1 farmer per tick`
- If `food < foodNeed` or `housingCapacity < housingNeed`:
  - Decline: `-1 farmer per tick`
- Applied after request resolution

## Requests

Each request has:
- A title
- A description
- 1-2 options

Each option has:
- A label (what the player sees)
- Immediate effects on stats

### Request Pool

#### Request 1: Expand Housing
**Description**: "Your advisors propose building new housing to accommodate more farmers."

**Option A**: "Build modest housing"
- Gold: -50
- Housing Capacity: +10

**Option B**: "Build spacious housing"
- Gold: -100
- Housing Capacity: +15

#### Request 2: Improve Farming
**Description**: "A new farming technique could improve food production."

**Option A**: "Adopt new technique"
- Gold: -80
- Food Production: +5

**Option B**: "Research better methods"
- Gold: -150
- Food Production: +10

#### Request 3: Recruit Farmers
**Description**: "Merchants arrive offering to bring farmers to your realm."

**Option A**: "Welcome modest group"
- Gold: -30
- Farmers: +10

**Option B**: "Welcome large group"
- Gold: -60
- Farmers: +20

#### Request 4: Tax Collection
**Description**: "The tax collector suggests increasing taxes to fill the treasury."

**Option A**: "Moderate taxes"
- Gold: +100
- Farmers: -5

**Option B**: "Heavy taxes"
- Gold: +200
- Farmers: -15

#### Request 5: Festival
**Description**: "The farmers request a festival to boost morale."

**Option A**: "Simple celebration"
- Gold: -40
- Farmers: +5

**Option B**: "Grand festival"
- Gold: -100
- Farmers: +15

#### Request 6: Pest Control
**Description**: "Pests threaten the crops. You must act quickly."

**Option A**: "Basic protection"
- Gold: -30
- Food Production: +2

**Option B**: "Comprehensive measures"
- Gold: -70
- Food Production: +5

#### Request 7: Infrastructure
**Description**: "Roads and wells need improvement."

**Option A**: "Basic repairs"
- Gold: -50
- Housing Capacity: +5
- Food Production: +2

**Option B**: "Major renovation"
- Gold: -120
- Housing Capacity: +10
- Food Production: +5

#### Request 8: Emergency Aid
**Description**: "Farmers are struggling and need immediate help."

**Option A**: "Provide food"
- Food: +50
- Gold: -20

**Option B**: "Provide gold"
- Gold: -80
- Farmers: +10

#### Request 9: Labor Shortage
**Description**: "Too few workers are available for the harvest."

**Option A**: "Hire seasonal workers"
- Gold: -40
- Food Production: +3

**Option B**: "Invest in tools"
- Gold: -80
- Food Production: +6

#### Request 10: Housing Maintenance
**Description**: "Some housing has fallen into disrepair."

**Option A**: "Minimal repairs"
- Gold: -30
- Housing Capacity: +3

**Option B**: "Full restoration"
- Gold: -70
- Housing Capacity: +8

## Request Selection

- Requests are selected randomly from the pool
- No request tracking or cooldowns
- Same request can appear multiple times

## UI Requirements

### Display Elements

**Stats Panel** (always visible):
- Farmers: [number]
- Gold: [number]
- Food: [number]
- Housing: [capacity] / [need]
- Food Production: [production] / [need] per tick

**Request Panel** (center):
- Request title
- Request description
- Option buttons (1-2)

**Feedback Panel** (after decision):
- Show what changed
- Brief message confirming the choice

### Visual Feedback

- Positive changes: green text
- Negative changes: red text
- Neutral changes: default text
- Stats that meet needs: default
- Stats that don't meet needs: warning color

### Responsive Design

- Must work on desktop and mobile (landscape)
- Single screen, no scrolling required
- Touch-friendly buttons
- Readable fonts at all sizes

## Game Flow

1. Display current stats
2. Present a random request
3. Player chooses an option
4. Apply option effects immediately
5. Show feedback
6. Apply baseline effects (income, food change, population growth)
7. Update stats display
8. Wait for player to continue
9. Select next request (go to step 2)

## Technical Implementation

### Technology Stack
- React (UI components)
- TypeScript (type safety)
- Vite (build tool)
- PWA configuration (offline support)

### State Management
- Single source of truth for game state
- Immutable state updates
- Clear separation between:
  - Request effects (immediate)
  - Baseline effects (per tick)

### Deployment
- Static site deployment via GitHub Pages
- No backend required
- No data persistence between sessions

## Balancing Notes

The game is intentionally challenging:
- Starting resources allow ~10-15 decisions before crisis
- Housing becomes critical around 10-15 ticks
- Food production must be improved to sustain growth
- Gold generation is steady but slow
- Every expansion increases pressure on resources

The player should feel:
- Early game: Confident, exploring options
- Mid game: Tension building, trade-offs becoming harder
- Late game: Desperate, trying to prevent collapse

Success metric: Player engagement lasts 20-30 decisions before giving up or restarting.
