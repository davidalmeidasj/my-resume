import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        trunk: '#3B2A2A',
        spring: { ground: '#F3F8EA', leaf: '#A4DC5C', green: '#6BAE45', deep: '#4E7A2E', blossom: '#F598AC' },
        summer: { emerald: '#1E6E46', deep: '#145236' },
        autumn: { orange: '#F5832F', rust: '#BE4632' },
        winter: { ice: '#E8EFF5', frost: '#AABED2', steel: '#6E8296', slate: '#3E4756', accent: '#4F6A86' },
        paper: '#FBFBF8',
        wake: {
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
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      fontFamily: {
        sans: ['Figtree', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        'wake-display': ['Sora', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
