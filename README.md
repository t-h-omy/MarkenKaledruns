# MarkenKaledruns

⚔️ A Proof-of-Fun strategy game where you rule as a king, making one decision per tick to manage your kingdom.

## Overview

MarkenKaledruns is a minimalist, tick-based strategy game where every decision has permanent consequences. As a king ruling over farmers, you must balance food production, population, happiness, and treasury through careful decision-making.

## Features

- 🎮 **Tick-based gameplay**: One decision per turn
- 📊 **Kingdom stats**: Track Food, Farmers, Happiness, and Treasury
- ⚡ **Permanent effects**: All decisions have lasting impact
- 📱 **PWA support**: Install on mobile or desktop, works offline
- 🎯 **Single screen**: All gameplay on one focused interface
- 🚀 **No backend required**: Pure client-side game

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite 7** - Build tool
- **vite-plugin-pwa** - Progressive Web App support

## Deployment

The game is configured to deploy automatically to GitHub Pages via GitHub Actions. Push to the `main` branch to trigger a deployment.

## Game Design

See [POF_SPEC.md](./POF_SPEC.md) for detailed game specifications and design decisions.

## License

This project was created as a Proof-of-Fun prototype.
