import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        ink: '#0E1116',
        dusk: '#374A67',
        grape: '#616283',
        mauve: '#9E7B9B',
        wisteria: '#CB9CF2',
        lilac: '#ECE0FB',
      },
      fontFamily: {
        sans: ['"Atkinson Hyperlegible Next"', 'system-ui', 'sans-serif'],
        pixel: ['"Pixelify Sans"', 'system-ui', 'sans-serif'],
        bitmap: ['Silkscreen', 'ui-monospace', 'monospace'],
      },
      spacing: {
        cell: 'var(--cell)',
        '2cell': 'calc(var(--cell) * 2)',
        '3cell': 'calc(var(--cell) * 3)',
        '4cell': 'calc(var(--cell) * 4)',
        '6cell': 'calc(var(--cell) * 6)',
        '8cell': 'calc(var(--cell) * 8)',
        '12cell': 'calc(var(--cell) * 12)',
      },
    },
  },
  plugins: [],
}

export default config
