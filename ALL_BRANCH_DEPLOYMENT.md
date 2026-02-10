# All-Branch Deployment with "Last Push Deploys" Configuration

## Overview
The GitHub Actions workflow has been updated to support deployments from all branches with a "last push deploys" mechanism.

## Changes Made

### 1. All-Branch Deployment
**Before:**
```yaml
on:
  push:
    branches:
      - main  # Only deploy from main branch
```

**After:**
```yaml
on:
  push:
    branches:
      - '**'  # Deploy from all branches
```

The workflow now triggers on pushes to **any branch**, allowing you to preview deployments from feature branches, PRs, or any development branch.

### 2. Last Push Deploys Rule
**Before:**
```yaml
concurrency:
  group: pages
  cancel-in-progress: true
```

**After:**
```yaml
concurrency:
  group: pages-${{ github.ref }}  # Separate concurrency group per branch
  cancel-in-progress: true  # Last push deploys - cancels previous runs on same branch
```

The concurrency group now uses `${{ github.ref }}` to create **separate concurrency groups per branch**. This means:

- **Same branch, multiple pushes**: If you push multiple times to the same branch quickly, only the latest push will deploy. Earlier in-progress deployments are automatically cancelled.
- **Different branches**: Deployments from different branches run independently in parallel without interfering with each other.

## How It Works

### Example Scenario 1: Multiple Pushes to Same Branch
1. You push commit A to branch `feature-x` → Deployment A starts
2. You push commit B to branch `feature-x` → Deployment A is cancelled, Deployment B starts
3. You push commit C to branch `feature-x` → Deployment B is cancelled, Deployment C starts
4. Only Deployment C completes ✅

### Example Scenario 2: Pushes to Different Branches
1. You push to branch `feature-x` → Deployment X starts
2. You push to branch `feature-y` → Deployment Y starts in parallel
3. Both deployments complete independently ✅

## Benefits

✅ **Developer-Friendly**: Test deployments from any branch  
✅ **Resource Efficient**: Doesn't waste time deploying outdated commits  
✅ **Automatic Cleanup**: Old deployments are cancelled automatically  
✅ **Parallel Branches**: Different branches deploy independently  
✅ **Latest State**: Always deploys the most recent push  

## GitHub Pages Environment Note

⚠️ **Important**: If your GitHub Pages environment is configured with deployment protection rules, you may need to:
1. Go to repository Settings → Environments → `github-pages`
2. Adjust deployment branch rules to allow all branches
3. Or configure specific branch patterns

The GitHub Pages environment may require manual approval for deployments from non-protected branches depending on your repository settings.

## Technical Details

- **`github.ref`**: The full git reference (e.g., `refs/heads/main`, `refs/heads/feature-x`)
- **Concurrency group naming**: `pages-refs/heads/main`, `pages-refs/heads/feature-x`, etc.
- **Cancel behavior**: Only cancels workflows in the same concurrency group (same branch)

## Reverting

To go back to main-only deployment:
```yaml
on:
  push:
    branches:
      - main

concurrency:
  group: pages
  cancel-in-progress: true
```
