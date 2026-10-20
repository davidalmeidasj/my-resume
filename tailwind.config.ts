import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        glass: '#E8E8E8',
        'glass-deep': '#DCDFE0',
        ink: '#1B2427',
        'ink-2': '#3F4C52',
        slate: '#6E7E86',
        teal: '#00799B',
        'teal-ink': '#006480',
        hot: '#FF6816',
        lock: '#FCD800',
      },
      fontFamily: {
        display: ['"Chakra Petch"', 'system-ui', 'sans-serif'],
        sans: ['B612', 'system-ui', 'sans-serif'],
        mono: ['"B612 Mono"', 'ui-monospace', 'monospace'],
      },
      spacing: {
        m: 'var(--m)',
        '2m': 'calc(var(--m) * 2)',
        '3m': 'calc(var(--m) * 3)',
        '4m': 'calc(var(--m) * 4)',
        '6m': 'calc(var(--m) * 6)',
      },
      maxWidth: {
        frame: '72rem',
      },
      transitionTimingFunction: {
        lock: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

export default config
