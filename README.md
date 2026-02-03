# React + TypeScript + Vite PWA Starter

A clean Progressive Web App (PWA) setup with React, TypeScript, and Vite, ready for implementing your Proof-of-Fun prototype from scratch.
 

> **👀 Seeing a white screen on GitHub Pages?** You need to configure GitHub Pages to deploy from GitHub Actions. [See deployment instructions below](#-deployment).

## 🚀 Features

- ⚡️ **Vite** - Fast build tool and dev server
- ⚛️ **React 19** - Latest React with hooks
- 🔷 **TypeScript** - Full type safety
- 📱 **PWA Ready** - Progressive Web App with offline support
- 🎨 **ESLint** - Code quality and consistency
- 🏗️ **GitHub Pages** - Auto-deployment workflow included

## 📦 Getting Started!

### Prerequisites
- Node.js 20 or higher
- npm (comes with Node.js)

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/<YOUR-USERNAME>/MarkenKaledruns.git
cd MarkenKaledruns

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev
# Open http://localhost:5173 in your browser

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview

# 6. Lint code
npm run lint
```

The development server will start at `http://localhost:5173` with hot module replacement (HMR) enabled. Any changes you make to the source code will automatically reload in the browser.

## 🎮 Game Mechanics

### Tick Loop Summary

The game runs on a turn-based tick loop. Each tick follows this sequence:

1. **Show Request** - Display exactly 1 request to the player with up to 2 options
2. **Player Choice** - Player chooses 1 option
3. **Apply Effects** - Option effects are applied permanently to game stats and needs
4. **Apply Baseline Rules** - Automatic calculations run (see below)
5. **Pick Next Request** - Determine next request based on current state

### Request Selection Priority

Requests are selected based on the following priority:

1. **Crisis Events** (if conditions met):
   - If satisfaction < 30: "Unrest escalates"
   - If health < 30: "Disease wave"
   - If fireRisk > 70: "Fire danger acute"

2. **Need Requests** (if any needs unfulfilled):
   - Randomly pick from unfulfilled needs (marketplace, bread, beer, firewood, well)

3. **Random Events** (otherwise):
   - Randomly pick from 25 event requests

**Note**: The same request is never shown twice in a row.

### Baseline Formulas

After each player choice, these formulas automatically apply:

#### Gold Income per Tick
```
gold += floor(0.1 × (farmers × (satisfaction / 100)))
```
Gold income scales with both your farmer population and their satisfaction level. Higher satisfaction means more productive farmers.

#### Farmer Growth per Tick
```
farmers += floor(health / 10)
```
Population grows based on village health. Better health conditions attract more settlers.

See `POF_SPEC.md` for complete game specification including all 30 requests and their effects.

## 🌐 Deployment

This project is configured to automatically deploy to GitHub Pages when pushed to the main branch.

### How GitHub Pages Deployment Works

The deployment uses a two-job GitHub Actions workflow (`.github/workflows/deploy.yml`):

1. **Build Job**:
   - Checks out the code
   - Sets up Node.js 20
   - Installs dependencies with `npm ci`
   - Builds the production app with `npm run build`
   - Uploads the `dist/` folder as a Pages artifact

2. **Deploy Job**:
   - Runs after build job completes
   - Deploys the artifact to GitHub Pages
   - Requires specific GitHub permissions (contents: read, pages: write, id-token: write)

The workflow is triggered automatically on every push to the `main` branch.

### Setup GitHub Pages

**⚠️ IMPORTANT**: GitHub Pages must be configured to deploy from GitHub Actions, otherwise you'll see a white screen.

#### Configuration Steps:
1. Go to repository **Settings** → **Pages**
2. Under **Build and deployment** → **Source**, select **"GitHub Actions"**
3. Push to main branch - deployment happens automatically

Your app will be available at: `https://t-h-omy.github.io/MarkenKaledruns/`

### Troubleshooting

#### White Screen Issue
If you see a white screen when opening the GitHub Pages URL:
- **Cause**: GitHub Pages is trying to serve the raw source files instead of the built application
- **Solution**: Follow the configuration steps above to set Source to "GitHub Actions"
- **Check**: Go to the Actions tab and verify the "Deploy to GitHub Pages" workflow completed successfully

#### How to Verify It's Working
Once properly configured, you should see:
- A page with the heading "React + TypeScript + Vite PWA"
- A counter button that says "count is 0" (increments when clicked)
- Text saying "Ready to implement your Proof-of-Fun prototype!"

## 📁 Project Structure

```
src/
├── App.tsx           # Main App component
├── App.css           # App styles
├── main.tsx          # App entry point
├── index.css         # Global styles
└── assets/           # Static assets
```

## 🛠️ Tech Stack

- **React 19**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **vite-plugin-pwa**: Progressive Web App support
- **ESLint**: Code linting

## 📝 PWA Configuration

The PWA is configured in `vite.config.ts` with:
- Auto-update service worker
- Offline support
- App manifest for installation

## 🎨 Customization

### Update App Name
1. Edit `index.html` - change the `<title>` tag
2. Edit `vite.config.ts` - update the PWA manifest name and short_name

### Base URL

The app is configured for GitHub Pages deployment at `/MarkenKaledruns/`. 
If deploying elsewhere, update the `base` property in `vite.config.ts`.

#### Setting the `<REPO_NAME>` Base Path

For your own repository fork or deployment, you need to update the base path in **two places**:

1. **`vite.config.ts`** - Line 30:
   ```typescript
   base: '/MarkenKaledruns/',  // Change to '/<YOUR-REPO-NAME>/'
   ```

2. **`vite.config.ts`** - PWA manifest start_url (Line 15):
   ```typescript
   start_url: '/MarkenKaledruns/',  // Change to '/<YOUR-REPO-NAME>/'
   ```

Replace `MarkenKaledruns` with your actual repository name. This ensures:
- Static assets load correctly from the right URL path
- The PWA installs with the correct start URL
- All routes work properly on GitHub Pages

## 🧪 Ready for Implementation

This is a clean slate ready for implementing your game logic. The previous Proof-of-Fun implementation has been removed, leaving just the core PWA setup.

Start by creating your game components in the `src/` directory!

## 📄 License

This is a starter template. Customize as needed for your project.
