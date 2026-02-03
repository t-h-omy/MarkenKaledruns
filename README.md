# Realm of Decisions - Proof of Fun

A Proof-of-Fun prototype for a medieval strategy game about ruling a realm through difficult decisions.

## 🎮 Game Concept

Rule a growing medieval realm as a king through requests from advisors and your population. Each request forces you to choose between difficult trade-offs with visible, permanent consequences. The core fantasy is political leadership under pressure: **every decision solves one problem while creating another**.

## 🎯 Purpose

This prototype exists to answer one question: **Is it fun to make repeated, meaningful decisions when all consequences are permanent and clearly visible?**

## ✨ Features

- **One population**: Manage farmers and their needs
- **Meaningful choices**: Each request has 1-2 options with clear trade-offs
- **Permanent consequences**: All decisions permanently affect your realm
- **Transparent systems**: All values visible, no hidden mechanics
- **Baseline effects**: Automatic income, food production, and population growth/decline
- **10 unique requests**: Different challenges requiring strategic thinking

## 🎲 Game Mechanics

### Resources
- **Farmers**: Your population (starts at 100)
- **Gold**: Treasury for investments (starts at 500)
- **Food**: Feed your population (starts at 200)

### Capacities
- **Housing**: Shelter for farmers (starts at 25, need = farmers/4)
- **Food Production**: Food generated per tick (starts at 15, need = farmers/10)

### Every Tick
1. You make a decision on the current request
2. Effects apply immediately
3. Baseline effects occur:
   - +10 gold income
   - Food changes by (production - need)
   - Population grows (+1) if needs met, declines (-1) if not
4. Next random request appears

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🌐 Deployment

The game is configured to deploy automatically to GitHub Pages when pushed to the main branch.

**Live URL**: `https://t-h-omy.github.io/MarkenKaledruns/`

### Setup GitHub Pages
1. Go to repository Settings → Pages
2. Set Source to "GitHub Actions"
3. Push to main branch - deployment happens automatically

## 📋 Specification

All gameplay rules, mechanics, and balancing are documented in `POF_SPEC.md`. This file is the single source of truth for the implementation.

## 🛠️ Tech Stack

- **React 19**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **PWA**: Progressive Web App with offline support
- **GitHub Pages**: Hosting

## 📁 Project Structure

```
src/
├── components/         # UI components
│   ├── Game.tsx       # Main game container
│   ├── StatsPanel.tsx # Display realm stats
│   ├── RequestPanel.tsx # Show requests and options
│   └── FeedbackPanel.tsx # Show decision results
├── gameData.ts        # Request definitions
├── gameLogic.ts       # Core game mechanics
├── types.ts           # TypeScript types
└── main.tsx           # App entry point
```

## 🎨 Design Philosophy

- Decisions matter more than numbers
- Fewer systems with strong interactions > many shallow systems
- All values must be visible and understandable
- Works equally well on desktop and mobile (landscape)

## 📝 License

This is a prototype project. All rights reserved.
