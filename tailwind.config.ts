import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        abyss: '#031216',
        deep: '#061C22',
        teal: '#00799B',
        crest: '#4CC3DF',
        spark: '#FF6816',
        signal: '#FCD800',
        mist: '#E8E8E8',
        slate: '#6E7E86',
        haze: '#A3B1B7',
        line: 'rgb(232 232 232 / 0.12)',
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['Figtree', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

export default config
