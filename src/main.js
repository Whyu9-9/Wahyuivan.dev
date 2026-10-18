import './assets/main.css';

import { createWebHistory } from 'vue-router';
import { createApp } from './app';

// Error tracking
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  if (window.gtag) {
    window.gtag('event', 'exception', {
      description: event.error?.message || 'Unknown error',
      fatal: false
    });
  }
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  if (window.gtag) {
    window.gtag('event', 'exception', {
      description: event.reason?.message || 'Unhandled promise rejection',
      fatal: false
    });
  }
});

// Feeds the cursor position to the .card-link spotlight
document.addEventListener('pointermove', (event) => {
  const card = event.target.closest?.('.card-link')
  if (!card) return
  const rect = card.getBoundingClientRect()
  card.style.setProperty('--x', `${event.clientX - rect.left}px`)
  card.style.setProperty('--y', `${event.clientY - rect.top}px`)
}, { passive: true })

// Hydrates the HTML prerendered by scripts/prerender.js
const { app, router } = createApp(createWebHistory())
router.isReady().then(() => {
  // Unknown paths get the home page's HTML as SPA fallback; drop it so the 404 view mounts fresh
  if (router.currentRoute.value.name !== 'Home') document.getElementById('app').innerHTML = ''
  app.mount('#app')
})
