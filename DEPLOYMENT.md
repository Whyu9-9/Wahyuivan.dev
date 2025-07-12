# Deployment Guide

## Build Process

This project uses Vite 6.x with Vue 3. The build process has been optimized for deployment.

### Prerequisites

-   Node.js 18.17.1 or higher
-   npm 9.6.7 or higher

### Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Deploy build (installs dependencies first)
npm run build:deploy
```

### Troubleshooting

#### Dependency Issues

If you encounter dependency conflicts:

1. Delete `node_modules` and `package-lock.json`
2. Run `npm install`
3. Run `npm run build`

#### Node.js Version Issues

The project includes an `.npmrc` file that:

-   Disables engine strict checking
-   Uses legacy peer deps for compatibility

#### Build Optimization

The build process includes:

-   Code splitting for better performance
-   ESBuild minification
-   Manual chunk optimization
-   Service worker for caching

### Deployment Platforms

#### Netlify

-   Build command: `npm run build:deploy`
-   Publish directory: `dist`
-   Node version: 18.17.1

#### Vercel

-   Build command: `npm run build:deploy`
-   Output directory: `dist`
-   Node version: 18.17.1

#### Cloudflare Pages

-   Build command: `npm run build:deploy`
-   Build output directory: `dist`
-   Node version: 18.17.1
