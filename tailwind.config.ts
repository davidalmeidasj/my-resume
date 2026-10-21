import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        trunk: '#3B2A2A',
        spring: { ground: '#F3F8EA', leaf: '#A4DC5C', green: '#6BAE45', deep: '#4E7A2E', blossom: '#F598AC' },
        summer: { emerald: '#1E6E46', green: '#1E8246', olive: '#6E961E', deep: '#145236' },
        autumn: { orange: '#F5832F', burnt: '#D26E32', rust: '#BE4632', mustard: '#D99F2E' },
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
