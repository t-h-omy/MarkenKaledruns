# POF_SPEC: MarkenKaledruns - Proof-of-Fun Strategy Game

## Overview
A minimalist, tick-based strategy game where the player is a king ruling over farmers. The game focuses on decision-making with permanent, visible consequences.

## Technical Stack
- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **Deployment**: GitHub Pages
- **PWA**: Progressive Web App capabilities
- **Scope**: Single screen, no backend, no save system

## Core Gameplay

### Player Role
- Player is a king
- Rules over farmers
- Makes one decision per tick

### Game Mechanics
- **Tick-based**: Game progresses through discrete time units (ticks)
- **Decision System**: Each tick presents max 2 options to choose from
- **Permanence**: All decisions have permanent effects on game stats
- **Visibility**: All stat changes are clearly visible to the player

### Stats System
Stats track the state of the kingdom and are affected by player decisions:
- Stats are displayed prominently on screen
- Changes are immediate and permanent
- Stats provide feedback on decision consequences

## UI Requirements
- **Single Screen**: All gameplay happens on one screen
- **Stats Display**: Clearly visible stats panel
- **Decision Panel**: Area showing current decision options (max 2)
- **Feedback**: Visual indication of stat changes
- **Minimalist Design**: Simple, clear interface

## Technical Requirements
- No backend dependencies
- No save/load system (session-based only)
- Deployable to GitHub Pages
- PWA-ready (offline capable, installable)
- Responsive design

## Out of Scope (for this prototype)
- Multiple screens/pages
- Save/load functionality
- Backend/database
- Multiplayer
- Complex animations
- Sound effects
- Tutorial system

## Future Expansion
Exact gameplay details (specific stats, decision types, balance) will be defined in future iterations.

---

**Version**: 1.0  
**Status**: Initial specification  
**Last Updated**: 2026-02-03
