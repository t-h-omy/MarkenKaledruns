# GitHub Actions Workflow Quick Reference

## Workflow File
`.github/workflows/pages.yml`

## Trigger
```yaml
on:
  push:
    branches:
      - '**'  # All branches
```

## What Happens on Push

1. **Build Job**
   ```
   Checkout → Setup Node 20 → npm ci → npm run build → Upload dist/
   ```

2. **Deploy Job**
   ```
   Deploy dist/ to GitHub Pages
   ```

## Environment Variables Used

| Variable | Value | Usage |
|----------|-------|-------|
| `GITHUB_REPOSITORY` | `t-h-omy/MarkenKaledruns` | Auto-set by GitHub Actions |

The workflow passes this to the build step, and `vite.config.ts` extracts the repo name to generate the correct base path.

## Concurrency

```yaml
concurrency:
  group: pages
  cancel-in-progress: true
```

- Only one deployment at a time
- New push cancels in-progress deployment

## Permissions Required

```yaml
permissions:
  contents: read    # Read repository code
  pages: write      # Write to GitHub Pages
  id-token: write   # OIDC token for deployment
```

## Actions Used

| Action | Version | Purpose |
|--------|---------|---------|
| `actions/checkout` | v4 | Clone repository |
| `actions/setup-node` | v4 | Setup Node.js 20 with npm cache |
| `actions/upload-pages-artifact` | v3 | Upload dist/ folder |
| `actions/deploy-pages` | v4 | Deploy to GitHub Pages |

## Local Testing

Test the build locally with the same environment variable:

```bash
GITHUB_REPOSITORY="t-h-omy/MarkenKaledruns" npm run build
```

Or without (uses fallback):

```bash
npm run build
```

Both produce the same output with base path `/MarkenKaledruns/`.

## Monitoring

- **Check workflow runs**: Actions tab in GitHub
- **View logs**: Click on a workflow run
- **Deployment status**: Pages settings shows last deployment

## Troubleshooting

**Workflow not running?**
- Check: Settings → Actions → General → Workflow permissions
- Ensure: "Read and write permissions" is enabled

**Deploy failing?**
- Check: Settings → Pages → Source is set to "GitHub Actions"
- Verify: No branch protection rules blocking deployment

**Wrong base path?**
- Check: `GITHUB_REPOSITORY` env var is set in workflow
- Verify: `vite.config.ts` has the `getBasePath()` function
