import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#606C38',         // Dark Olive Green
        'primary-dark': '#C2185B',  // (Consider updating this — it doesn’t match the new palette)
        background: '#F9FAFB',      // Consider replacing with `light`
        surface: '#FFFFFF',
        muted: '#6B7280',
        dark: '#1F2937',
        secondary: '#283618',       // Very Dark Green
        light: '#FEFAE0',           // Light Cream
        accent1: '#DDA15E',         // Warm Beige
        accent2: '#BC6C25',         // Burnt Orange
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}

export default config
