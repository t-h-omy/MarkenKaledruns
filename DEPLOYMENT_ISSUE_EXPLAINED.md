# GitHub Actions Deployment Issue - Resolved

## Problem
The PR branch `copilot/update-info-request-response` was triggering GitHub Actions workflow runs, but deployments were failing with status "action_required".

## Root Cause
The workflow file (`.github/workflows/pages.yml`) was configured to trigger on **all branches** (`branches: - '**'`), but the GitHub Pages deployment job uses the `github-pages` environment which is restricted to deploy only from protected branches (typically `main`).

When a workflow run was triggered from a non-main branch:
- The **build job** completed successfully ✅
- The **deploy job** was blocked with conclusion "action_required" ❌

This is a GitHub security feature - environments like `github-pages` are designed to prevent unauthorized deployments from arbitrary branches.

## Solution
Updated the workflow to only trigger and deploy from the `main` branch:

```yaml
on:
  push:
    branches:
      - main  # Only deploy from main branch
```

### Why This is Better
1. **Security**: Prevents accidental deployments from feature/PR branches
2. **Best Practice**: Production deployments should come from main/production branches
3. **Resource Efficiency**: Doesn't waste CI/CD resources running deployments that will fail
4. **Clear Intent**: Makes it explicit that only main branch changes are deployed

## Verification
After merging this PR to main, the workflow will:
1. ✅ Trigger only on pushes to main
2. ✅ Build the application successfully
3. ✅ Deploy to GitHub Pages without requiring manual approval

## Additional Changes
- Bumped version from `1.0.0` to `1.0.1` in `package.json`
- Updated `package-lock.json` accordingly
- Version is automatically injected into the app via Vite's `define` config

## References
- [GitHub Actions - Environments](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)
- [GitHub Pages Deployment](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
