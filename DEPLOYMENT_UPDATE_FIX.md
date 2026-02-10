# Deployment Update Fix

## Problem
After successful GitHub Actions workflow runs that deploy to gh-pages, users don't see the updated game version. The site continues to show the old version number and branch in the bottom UI.

## Root Cause
The issue was caused by **aggressive service worker caching** combined with a configuration mismatch:

1. **Service Worker Configuration Mismatch**: 
   - vite.config.ts had `registerType: 'autoUpdate'`
   - main.tsx used `onNeedRefresh()` callback
   - These two settings are incompatible - `onNeedRefresh` only works with `registerType: 'prompt'`

2. **Update Detection Not Triggered**:
   - With `autoUpdate`, the service worker tries to update automatically
   - But the `onNeedRefresh` callback was never called
   - Users needed to manually hard refresh to see updates

## Solution Implemented

### 1. Fixed Service Worker Configuration
**File: `vite.config.ts`**
- Changed `registerType: 'autoUpdate'` to `registerType: 'prompt'`
- Added explicit `skipWaiting: true` in workbox config
- Added explicit `clientsClaim: true` in workbox config

These changes ensure that:
- Service worker updates are detected and trigger the `onNeedRefresh` callback
- New service workers activate immediately (`skipWaiting`)
- New service workers take control of all pages immediately (`clientsClaim`)

### 2. Updated Service Worker Registration
**File: `src/main.tsx`**
- Stored the return value of `registerSW()` as `updateSW` function
- Modified `onNeedRefresh` to call `updateSW(true)` instead of `window.location.reload()`
- This properly updates the service worker AND reloads the page

### 3. Version Bump
**File: `package.json`**
- Bumped version from `1.0.2` to `1.0.3`
- This makes it easy to verify the fix works when deployed

## How It Works Now

1. **Developer pushes to main branch**
   - GitHub Actions workflow runs
   - Builds the app with version from package.json
   - Deploys to gh-pages branch
   - GitHub Pages serves the new files

2. **User visits the site**
   - Service worker checks for updates
   - If new service worker detected:
     - `onNeedRefresh()` callback is triggered
     - Calls `updateServiceWorker(true)` to activate new service worker
     - Page automatically reloads
   - User sees the new version immediately

## Verification Steps

After merging this PR and deploying to main:

1. **Visit the site**: https://t-h-omy.github.io/MarkenKaledruns/
2. **Check version**: Should show `v1.0.3 (main)` in bottom-right corner
3. **Make a change**:
   - Update version in package.json (e.g., to 1.0.4)
   - Push to main
   - Wait for deployment to complete
4. **Reload the site**: Should automatically detect update and show new version

## Technical Details

### Service Worker Update Flow

```
1. User loads page
   ↓
2. Service worker registered (if first visit)
   ↓
3. Service worker checks for updates (every page load)
   ↓
4. New service worker found?
   ├─ No → Continue using current version
   └─ Yes → Trigger onNeedRefresh()
      ↓
      Call updateServiceWorker(true)
      ↓
      New SW calls skipWaiting()
      ↓
      New SW calls clientsClaim()
      ↓
      Page reloads
      ↓
      User sees new version
```

### Why `registerType: 'prompt'` Instead of `'autoUpdate'`

- **autoUpdate**: Service worker updates automatically in background, but gives no control
  - Users might not see updates until they close all tabs
  - No reliable way to force immediate update
  
- **prompt**: Gives explicit control via `onNeedRefresh` callback
  - We can force immediate update and reload
  - More predictable behavior
  - Better user experience (updates apply immediately)

## Files Changed

- `vite.config.ts` - Fixed PWA plugin configuration
- `src/main.tsx` - Fixed service worker registration
- `package.json` - Bumped version to 1.0.3
- `DEPLOYMENT_UPDATE_FIX.md` - This documentation

## Future Maintenance

When making future changes:

1. **Always increment version in package.json** before deploying
   - Bug fix: Increment PATCH (1.0.3 → 1.0.4)
   - New feature: Increment MINOR (1.0.4 → 1.1.0)
   - Breaking change: Increment MAJOR (1.1.0 → 2.0.0)

2. **Deploy to main branch** for production updates
   - Other branches deploy to preview URLs
   - Only main deploys to root site

3. **Verify deployment**
   - Check version number in bottom-right corner
   - If old version persists, check:
     - Did workflow run successfully?
     - Did GitHub Pages redeploy?
     - Is browser cache causing issues? (Try incognito)

## Troubleshooting

### "I still see the old version"

1. **Hard refresh**: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. **Clear site data**: DevTools → Application → Storage → Clear site data
3. **Try incognito mode**: To bypass all caching
4. **Check workflow**: Verify deployment succeeded in Actions tab
5. **Check version**: Confirm package.json version matches deployed version

### "Service worker not updating"

1. **Check browser console** for service worker errors
2. **Verify sw.js is accessible**: Visit https://t-h-omy.github.io/MarkenKaledruns/sw.js
3. **Check service worker registration**: DevTools → Application → Service Workers
4. **Force update**: DevTools → Application → Service Workers → Update button

## References

- [vite-plugin-pwa documentation](https://vite-pwa-org.netlify.app/)
- [Service Worker Update Flow](https://developer.chrome.com/docs/workbox/service-worker-lifecycle/)
- [Workbox Skip Waiting](https://developer.chrome.com/docs/workbox/modules/workbox-core/#skip-waiting)
