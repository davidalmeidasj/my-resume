import type { Config } from 'tailwindcss'
export default {
  content: ['./index.html','./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#e91e63',
        dark: '#0d0d0d'
      }
    }
  },
  plugins: [],
} satisfies Config

