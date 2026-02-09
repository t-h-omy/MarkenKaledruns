# GitHub Pages Deployment Guide

## Overview
This repository uses **GitHub Pages** for direct deployment. The workflow automation has been removed in favor of manual control over which branch gets deployed.

## Current Setup
- **Deployment Method**: GitHub Pages (direct from branch)
- **Build Tool**: Vite
- **Base Path**: `/MarkenKaledruns/`
- **PWA**: Enabled with auto-update

## How to Deploy

### Step 1: Build the Project
```bash
# Make sure you're on the branch you want to deploy
git checkout copilot/fix-combat-bug  # or your branch name

# Install dependencies (if not already installed)
npm install

# Build the project
npm run build
```

This creates a `dist/` folder with the production build.

### Step 2: Configure GitHub Pages
1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under "Build and deployment":
   - **Source**: Select "Deploy from a branch"
   - **Branch**: Choose your branch (e.g., `copilot/fix-combat-bug`)
   - **Folder**: Select `/dist` if available, or `/root` then manually push `dist/`

### Step 3: Push the Build (if needed)
If GitHub Pages doesn't support deploying from a subdirectory on your branch:

**Option A: Use gh-pages branch** (Recommended)
```bash
# Build the project
npm run build

# Install gh-pages helper (one time)
npm install -g gh-pages

# Deploy to gh-pages branch
gh-pages -d dist
```

**Option B: Manual commit to branch**
```bash
# Build the project
npm run build

# Copy dist to root (on a deployment branch)
git checkout -b deploy
cp -r dist/* .
git add .
git commit -m "Deploy version X.X.X"
git push origin deploy
```

Then configure GitHub Pages to use the `deploy` branch.

## Verifying Deployment

### 1. Check Version Number
After deployment, open your site and look at the **bottom-right corner** for the version number (e.g., `v1.0.0`).

### 2. Clear Cache
The app is a PWA with aggressive caching. To see the latest version:
- **Hard Reload**: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- **Clear Site Data**: Open DevTools → Application → Clear Site Data
- **Incognito Mode**: Open site in a private/incognito window

### 3. Compare with package.json
The version displayed should match the version in `package.json`.

## Troubleshooting

### "Website not updating after deployment"

**Problem**: You deployed but the old version is still showing.

**Solutions**:
1. **Check the version number** in bottom-right corner
   - If it matches `package.json`: Cache issue (clear cache)
   - If it doesn't match: Deployment issue (see below)

2. **Verify GitHub Pages settings**
   - Settings → Pages → Check which branch/folder is configured
   - Check deployment status in Actions tab (if any automated deployment exists)

3. **Check build output**
   - Make sure `npm run build` completed successfully
   - Verify `dist/` folder was created
   - Check that built files are committed (if deploying from branch)

4. **PWA Cache**
   - Service Worker caches aggressively
   - Use DevTools → Application → Service Workers → Unregister
   - Or Application → Storage → Clear Site Data

5. **Browser Cache**
   - Try hard reload (Ctrl+Shift+R)
   - Try incognito/private mode
   - Try different browser

### "Version number not showing"

If the version footer doesn't appear:
1. Check browser console for errors
2. Verify `vite.config.ts` has the version injection code
3. Make sure build completed without errors
4. Check CSS styling for `.version-footer`

## Version Management

**ALWAYS update the version number before deploying!**

See `VERSION_GUIDE.md` for detailed instructions on versioning.

Quick reminder:
- **Bug fixes**: Increment PATCH (1.0.0 → 1.0.1)
- **New features**: Increment MINOR (1.0.5 → 1.1.0)
- **Breaking changes**: Increment MAJOR (1.5.2 → 2.0.0)

## Build Configuration

### vite.config.ts
- **Base path**: `/MarkenKaledruns/` (matches GitHub Pages URL)
- **Version injection**: Reads from `package.json` and injects as `import.meta.env.VITE_APP_VERSION`
- **PWA**: Configured with `registerType: 'autoUpdate'`

### package.json
- **version**: Source of truth for app version
- **scripts.build**: `tsc -b && vite build` (TypeScript + Vite)

## Direct Deployment Checklist

Before each deployment:
- [ ] Update version number in `package.json`
- [ ] Run `npm run build` successfully
- [ ] Verify version appears in build output
- [ ] Push to GitHub if deploying from branch
- [ ] Verify GitHub Pages settings point to correct branch/folder
- [ ] Wait for deployment to complete
- [ ] Check version number on live site
- [ ] Clear cache if needed to see changes

## GitHub Pages URL
Your site is deployed at:
```
https://t-h-omy.github.io/MarkenKaledruns/
```

## Notes
- The workflow file has been removed (was in `.github/workflows/deploy.yml`)
- Deployment is now manual and branch-based
- You have full control over which branch gets deployed
- Version number helps verify which build is live
