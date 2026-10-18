import { createSSRApp } from 'vue';
import App from './App.vue';
import { createRouter } from './router';
import Icon from './components/Icon.vue';

// Shared by the browser entry (main.js) and the build-time prerender (entry-server.js)
export const createApp = (history) => {
  const app = createSSRApp(App);
  const router = createRouter(history);
  app.use(router);
  app.component('Icon', Icon);
  return { app, router };
};
