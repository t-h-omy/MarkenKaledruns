# Version Number Guide

## Overview
This project uses **Semantic Versioning** (semver) to track releases. The version number is displayed in the bottom-right corner of the application.

## Version Format
Version numbers follow the format: **MAJOR.MINOR.PATCH**

Example: `1.2.3`
- **MAJOR** (1) = Breaking changes or major new features
- **MINOR** (2) = New features, backward compatible
- **PATCH** (3) = Bug fixes, backward compatible

## When to Update Version

### **ALWAYS update the version number when making changes!**

Update the version in `package.json` before committing changes:

### PATCH Version (x.x.PATCH)
Increment for:
- ✅ Bug fixes
- ✅ Minor text changes
- ✅ Performance improvements
- ✅ Code refactoring (no behavior change)
- ✅ Documentation updates

**Example:** `1.0.0` → `1.0.1`

### MINOR Version (x.MINOR.x)
Increment for:
- ✅ New features
- ✅ New game events or mechanics
- ✅ New UI components
- ✅ Backward-compatible changes

**Example:** `1.0.5` → `1.1.0`

### MAJOR Version (MAJOR.x.x)
Increment for:
- ✅ Breaking changes to game mechanics
- ✅ Complete redesigns
- ✅ Major architecture changes
- ✅ Save game incompatibility

**Example:** `1.5.2` → `2.0.0`

## How to Update

1. Open `package.json`
2. Change the `"version"` field:
   ```json
   {
     "version": "1.0.1",  // <- Update this
     ...
   }
   ```
3. Commit with a descriptive message:
   ```
   git commit -m "Bump version to 1.0.1 - Fix combat surrender penalties"
   ```

## Current Version: 1.0.0

### Version History
- **1.0.0** - Initial release with combat system fixes
  - Fixed combat event options (SURRENDER, PAY TRIBUTE, etc.)
  - Added version display to UI
  - Established version tracking system

## Deployment Notes

### GitHub Pages Deployment
When deploying to GitHub Pages:
1. **Build the project**: `npm run build`
2. **Check the version** is correct in `package.json`
3. The version will be baked into the build at `dist/`
4. GitHub Pages serves from the branch configured in repository settings

### Verifying Deployment
- After deployment, check the version number in the bottom-right corner
- If the version doesn't match your `package.json`, the old build is still deployed
- Clear browser cache or use incognito mode to see latest version
- PWA may cache aggressively - use "Clear Site Data" in DevTools

## PWA Cache Busting
This app is a Progressive Web App (PWA) with aggressive caching. To ensure users get the latest version:
- The PWA is configured with `registerType: 'autoUpdate'`
- Version number helps verify which build is running
- Users may need to clear cache or reload to see updates

## Quick Reference
```bash
# Bug fix
"version": "1.0.0" → "1.0.1"

# New feature
"version": "1.0.5" → "1.1.0"

# Breaking change
"version": "1.5.2" → "2.0.0"
```

## Notes
- **Never skip version numbers**
- **Always increment from the current version**
- **Document major changes in this file**
- **Check the UI version display after deployment**
