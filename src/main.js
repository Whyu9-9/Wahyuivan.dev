import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import Icon from './components/Icon.vue';

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

const app = createApp(App)
app.use(router) // Use the router
app.component('Icon', Icon)
app.mount('#app')
