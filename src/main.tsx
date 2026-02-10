import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { validateRequests } from './game/requests'
import { registerSW } from 'virtual:pwa-register'

// Run validation in development mode only
if (import.meta.env.DEV) {
  validateRequests();
}

// Register service worker with immediate activation and auto-reload on update
const updateServiceWorker = registerSW({
  immediate: true,
  onNeedRefresh() {
    // Update the service worker and reload the page
    updateServiceWorker(true)
  },
  onOfflineReady() {
    console.log('App ready to work offline')
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
