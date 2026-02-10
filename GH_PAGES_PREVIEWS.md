# GitHub Pages Preview Deployments

This repository is configured to deploy to GitHub Pages with support for branch previews.

## How It Works

The workflow `.github/workflows/gh-pages-previews.yml` automatically deploys:
- **Main branch** → Root of GitHub Pages (`https://t-h-omy.github.io/MarkenKaledruns/`)
- **Other branches** → Preview subdirectories (`https://t-h-omy.github.io/MarkenKaledruns/previews/<branch-name>/`)

## Setup Instructions

### 1. Configure GitHub Pages

In your repository settings:
1. Go to **Settings** → **Pages**
2. Set **Source** to "Deploy from a branch"
3. Select branch: `gh-pages`
4. Select folder: `/ (root)`
5. Click **Save**

### 2. First Deployment

The workflow will automatically create the `gh-pages` branch on the first deployment. After the first successful deployment:
1. Refresh the Pages settings to verify `gh-pages` is selected
2. Wait a few minutes for GitHub to deploy the branch
3. Access your site at the GitHub Pages URL

## Features

### Branch-Specific Deployments

Every push to any branch triggers a deployment:
- Pushes to `main` update the root site
- Pushes to other branches create/update preview deployments in `/previews/<branch>/`

### Persistent Previews

- Previews are **not deleted** when branches are updated
- Each branch maintains its own preview directory
- Multiple preview deployments can coexist
- The `previews/` directory persists across deployments

### Clean Deployments

- The workflow only updates the specific deployment directory
- Main deployments don't affect preview directories
- Preview deployments don't affect the root or other previews

## Deployment URLs

| Branch | Deployment URL |
|--------|---------------|
| `main` | `https://t-h-omy.github.io/MarkenKaledruns/` |
| `feature-x` | `https://t-h-omy.github.io/MarkenKaledruns/previews/feature-x/` |
| `fix/bug-123` | `https://t-h-omy.github.io/MarkenKaledruns/previews/fix-bug-123/` |

**Note:** Branch names with `/` are converted to `-` for URL compatibility.

## How the Workflow Works

### 1. Determine Deployment Location

```bash
if branch == "main":
  destination = "." (root)
  base_path = "/MarkenKaledruns/"
else:
  destination = "previews/<branch-name>/"
  base_path = "/MarkenKaledruns/previews/<branch-name>/"
```

### 2. Build with Correct Base Path

The workflow sets `VITE_BASE_PATH` environment variable, which is read by `vite.config.ts` to configure the base URL for all assets.

### 3. Deploy to gh-pages Branch

The workflow:
1. Clones or creates the `gh-pages` branch
2. Creates/updates the destination directory
3. Copies built files to the destination
4. Commits and pushes changes
5. GitHub Pages automatically serves the updated content

## Vite Configuration

The `vite.config.ts` is configured to read the base path in this priority order:

1. **`VITE_BASE_PATH` environment variable** (set by workflow for previews)
2. **Computed from `GITHUB_REPOSITORY`** (for standard deployments)
3. **Hardcoded fallback** (for local development)

This ensures the app works correctly in all deployment scenarios.

## Manual Cleanup

To remove old preview deployments:

1. Clone the `gh-pages` branch:
   ```bash
   git clone -b gh-pages https://github.com/t-h-omy/MarkenKaledruns.git gh-pages
   cd gh-pages
   ```

2. Remove unwanted preview directories:
   ```bash
   rm -rf previews/old-branch-name
   ```

3. Commit and push:
   ```bash
   git add -A
   git commit -m "Remove old preview"
   git push
   ```

## Advantages Over actions/deploy-pages

This approach:
- ✅ Avoids GitHub Pages environment restrictions
- ✅ Supports multiple concurrent deployments (previews)
- ✅ Maintains full control over the deployment structure
- ✅ Allows incremental updates without clearing the entire site
- ✅ No manual approval required for branch deployments
- ✅ Works with the standard GitHub Pages serving from a branch

## Troubleshooting

### Preview URLs return 404

- Verify the `gh-pages` branch exists and has the preview directory
- Check that GitHub Pages is configured to serve from `gh-pages` branch, root folder
- Wait a few minutes after deployment for GitHub to update the site

### Assets not loading

- Check the browser console for 404 errors
- Verify the base path is correct in the built `index.html`
- Ensure `VITE_BASE_PATH` is set correctly in the workflow

### Workflow fails to push

- Verify the workflow has `contents: write` permission
- Check that the GitHub token has access to push to the repository
- Review the workflow logs for detailed error messages
