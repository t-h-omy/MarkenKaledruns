import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Read version from package.json
import { readFileSync } from 'fs'
const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'))

// Get branch name from environment or fallback to "local"
const getBranch = () => {
  return process.env.GITHUB_REF_NAME || 'local'
}

const appVersion = packageJson.version
const gitBranch = getBranch()

// Derive base path from environment variable or GitHub repository name
// Priority: VITE_BASE_PATH env var > computed from GITHUB_REPOSITORY > local dev fallback
const getBasePath = () => {
  // If VITE_BASE_PATH is set (from GitHub Actions), use it
  if (process.env.VITE_BASE_PATH) {
    return process.env.VITE_BASE_PATH
  }
  
  // Otherwise, derive from GitHub repository name
  const repo = process.env.GITHUB_REPOSITORY
  if (repo) {
    const repoName = repo.split('/')[1]
    return `/${repoName}/`
  }
  
  // Fallback for local development
  return '/MarkenKaledruns/'
}

const basePath = getBasePath()

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['vite.svg'],
      workbox: {
        cleanupOutdatedCaches: true
      },
      manifest: {
        name: 'React PWA',
        short_name: 'ReactPWA',
        start_url: basePath,
        description: 'A Progressive Web App built with React, TypeScript, and Vite',
        theme_color: '#1a1a1a',
        background_color: '#1a1a1a',
        display: 'standalone',
        icons: [
          {
            src: '/vite.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          }
        ]
      }
    })
  ],
  base: basePath,
  define: {
    '__APP_VERSION__': JSON.stringify(appVersion),
    '__GIT_BRANCH__': JSON.stringify(gitBranch)
  }
})
