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

## 📦 Getting Started

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

This project is configured to automatically deploy to GitHub Pages when pushed to the main branch.

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

## 🧪 Ready for Implementation

This is a clean slate ready for implementing your game logic. The previous Proof-of-Fun implementation has been removed, leaving just the core PWA setup.

Start by creating your game components in the `src/` directory!

## 📄 License

This is a starter template. Customize as needed for your project.
