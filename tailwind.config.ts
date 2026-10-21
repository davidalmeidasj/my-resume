import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        brand: {
          sky: '#74B3CE',
          sun: '#FFB400',
          autumn: '#D84A05',
          burgundy: '#2C1A1D',
          forest: '#25642B',
          growth: '#1EAE38',
        },
        paper: '#F6F5F0',
        snow: '#EAF2F6',
      },
      fontFamily: {
        sans: ['Figtree', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
