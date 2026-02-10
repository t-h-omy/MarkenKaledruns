# Workflow Migration Note

The previous workflow `pages.yml` has been disabled (renamed to `pages.yml.disabled`) because:

1. It used `actions/deploy-pages@v4` which has GitHub Pages environment restrictions
2. It couldn't support branch-specific preview deployments
3. The new `gh-pages-previews.yml` workflow provides better functionality

## Key Differences

### Old Workflow (pages.yml.disabled)
- Used `actions/upload-pages-artifact@v3` and `actions/deploy-pages@v4`
- Required GitHub Pages environment with restrictions
- Could only deploy one version at a time
- Required manual approval for non-main branches
- Limited to specific branch patterns

### New Workflow (gh-pages-previews.yml)
- Deploys directly to `gh-pages` branch
- No environment restrictions
- Supports multiple concurrent deployments (previews)
- Main branch → root, other branches → `/previews/<branch>/`
- Automatic deployments without approval
- Preserves existing deployments

## Re-enabling the Old Workflow

If you need to re-enable the old workflow:

```bash
mv .github/workflows/pages.yml.disabled .github/workflows/pages.yml
```

**Note:** You should disable `gh-pages-previews.yml` first to avoid conflicts.

## Recommended Action

Keep the new `gh-pages-previews.yml` workflow and delete `pages.yml.disabled` once you verify the new setup works correctly.
