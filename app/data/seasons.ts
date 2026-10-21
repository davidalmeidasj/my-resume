export const SEASONS = ['spring', 'summer', 'autumn', 'winter'] as const

export type Season = (typeof SEASONS)[number]

export const SECTION_SEASON = {
  home: 'spring',
  services: 'summer',
  skills: 'summer',
  themes: 'summer',
  about: 'autumn',
  projects: 'winter',
  contact: 'winter',
} as const satisfies Record<string, Season>

export type SeasonSection = keyof typeof SECTION_SEASON

export const SECTION_ORDER = Object.keys(SECTION_SEASON) as SeasonSection[]

export const SEASON_SWATCH: Record<Season, string> = {
  spring: '#F598AC',
  summer: '#A4DC5C',
  autumn: '#F5832F',
  winter: '#AABED2',
}
