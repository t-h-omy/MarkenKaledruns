# React + TypeScript + Vite PWA Starter

A clean Progressive Web App (PWA) setup with React, TypeScript, and Vite, ready for implementing your Proof-of-Fun prototype from scratch.
 

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
1. Go to repository Settings → Pages
2. Set Source to "GitHub Actions"
3. Push to main branch - deployment happens automatically

Your app will be available at: `https://t-h-omy.github.io/MarkenKaledruns/`

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
