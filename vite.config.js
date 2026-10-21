import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  base: '/',
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/medium-feed': {
        target: 'https://medium.com',
        changeOrigin: true,
        rewrite: () => '/feed/@wahyuivan',
      },
    },
  },
  build: {
    minify: 'esbuild',
    // Icons are lazy <img>s below the fold; inlining them bloated both the JS and the prerendered HTML
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        // The SSR build treats vue as external, so the vendor split only applies to the client build
        manualChunks: isSsrBuild ? undefined : {
          vendor: ['vue', 'vue-router'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
}))
