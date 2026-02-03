import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/MarkenKaledruns/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'MarkenKaledruns',
        short_name: 'Kaledruns',
        description: 'A Proof-of-Fun strategy game where you rule as a king',
        theme_color: '#1a1a1a',
        background_color: '#242424',
        display: 'standalone',
        icons: [
          {
            src: '/MarkenKaledruns/vite.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          }
        ]
      }
    })
  ],
})
