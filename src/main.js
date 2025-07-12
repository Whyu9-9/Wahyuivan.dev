import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import gtag from 'vue-gtag';
import 'devicon/devicon.min.css';
import './assets/bg.css';
import VueLazyload from 'vue-lazyload'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faStar, faCodeBranch, faCode, faLaptopCode, faCopyright, faDownload } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faInstagram, faTiktok, faMedium, faYoutube, faXTwitter } from '@fortawesome/free-brands-svg-icons';

library.add(faGithub, faLinkedin, faInstagram, faTiktok, faMedium, faYoutube, faXTwitter, faStar, faCodeBranch, faCode, faLaptopCode, faCopyright, faDownload)

// Performance monitoring
if ('performance' in window) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0];
      if (perfData) {
        console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart, 'ms');
      }
    }, 0);
  });
}

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

const app = createApp(App)
app.use(router) // Use the router
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(VueLazyload, {
  preLoad: 1.3,
  error: '/error.gif',
  loading: '/loading.gif',
  attempt: 1
})
app.use(gtag, {
  property: {
    id: import.meta.env.VITE_GA_ID,
  },
})
app.mount('#app')
