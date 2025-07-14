import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#E91E63',
        'primary-dark': '#C2185B',
        background: '#F9FAFB',
        surface: '#FFFFFF',
        muted: '#6B7280',
        dark: '#1F2937'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}

export default config
