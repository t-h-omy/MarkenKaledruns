# GitHub Pages Deployment via GitHub Actions

This repository automatically deploys to GitHub Pages using GitHub Actions.

## How It Works

### Automatic Deployment
- **Every push** to **any branch** triggers a build and deployment
- The latest push to any branch will be deployed (all branches deploy to the same site)
- Merges to `main` are automatically deployed

### Workflow Details

The deployment is handled by `.github/workflows/pages.yml`:

1. **Trigger**: On push to any branch (`**`)
2. **Build Job**:
   - Checkout code
   - Setup Node.js 20 with npm caching
   - Install dependencies with `npm ci`
   - Build the project with `npm run build`
   - Upload `dist/` folder as artifact
3. **Deploy Job**:
   - Deploy to GitHub Pages using official action

### Configuration

#### Vite Base Path
The `vite.config.ts` automatically derives the base path from the repository name:
- In GitHub Actions: Uses `GITHUB_REPOSITORY` environment variable
- Locally: Falls back to `/MarkenKaledruns/`

This ensures the app works correctly at `https://t-h-omy.github.io/MarkenKaledruns/`

#### Concurrency
Only one deployment runs at a time. If a new push happens while deployment is in progress, the old deployment is cancelled.

## GitHub Pages Settings

Make sure GitHub Pages is configured in your repository settings:
1. Go to **Settings** → **Pages**
2. Under "Build and deployment":
   - **Source**: GitHub Actions
   - This option should appear after the first workflow run

## Local Development

Local builds work without any environment variables:
```bash
npm run build
```

The base path will default to `/MarkenKaledruns/` for local development.

## Deployment Status

Check the **Actions** tab in GitHub to see deployment status and logs.
