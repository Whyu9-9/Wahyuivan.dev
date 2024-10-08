/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js}",
  ],
  theme: {
    fontFamily: {
      sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
      mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
    },
    colors: {
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
    extend: {
      screens: {
        'too-small-min': {
          'min': '340px'
        },
        'too-small-max': {
          'max': '340px'
        }
      },
    },
  },
  plugins: [],
}

