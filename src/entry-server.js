import { createMemoryHistory } from 'vue-router';
import { renderToString } from 'vue/server-renderer';
import { createApp } from './app';

export const render = async (url) => {
  const { app, router } = createApp(createMemoryHistory());
  await router.push(url);
  await router.isReady();
  return renderToString(app);
};
