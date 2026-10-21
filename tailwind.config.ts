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
