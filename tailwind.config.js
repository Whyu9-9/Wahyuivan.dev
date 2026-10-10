/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js}",
  ],
  theme: {
    fontFamily: {
      sans: ['"Geist"', ...defaultTheme.fontFamily.sans],
      mono: ['"Geist Mono"', ...defaultTheme.fontFamily.mono],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'one-dark-deep': '#1d2026',      // Page background
      'one-dark-line': '#323843',      // Hairline borders
      'one-dark-bg': '#282c34',        // Background color
      'one-dark-foreground': '#abb2bf', // Foreground color (text)
      'one-dark-white': '#ffffff',      // White color for high contrast
      'one-dark-blue': '#61afef',       // Blue color for syntax highlighting
      'one-dark-cyan': '#56b6c2',       // Cyan color for syntax highlighting
      'one-dark-green': '#98c379',      // Green color for syntax highlighting
      'one-dark-orange': '#d19a66',     // Orange color for syntax highlighting
      'one-dark-purple': '#c678dd',     // Purple color for syntax highlighting
      'one-dark-red': '#e06c75',        // Red color for syntax highlighting
      'one-dark-yellow': '#e5c07b',     // Yellow color for syntax highlighting
      'one-dark-gray': '#5c6370',       // Dark gray for comments and borders
    },
    extend: {},
  },
  plugins: [],
}

