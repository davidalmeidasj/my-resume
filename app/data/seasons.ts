export const SEASONS = ['spring', 'summer', 'autumn', 'winter'] as const

export type Season = (typeof SEASONS)[number]

export const SECTION_SEASON = {
  home: 'spring',
  services: 'summer',
  skills: 'summer',
  about: 'autumn',
  projects: 'winter',
  contact: 'spring',
} as const satisfies Record<string, Season>

export type SeasonSection = keyof typeof SECTION_SEASON

export const SECTION_ORDER = Object.keys(SECTION_SEASON) as SeasonSection[]

export const SEASON_ENTRY: Record<Season, SeasonSection> = {
  spring: 'home',
  summer: 'services',
  autumn: 'about',
  winter: 'projects',
}

export const SEASON_COLOR: Record<Season, string> = {
  spring: '#1EAE38',
  summer: '#FFB400',
  autumn: '#D84A05',
  winter: '#74B3CE',
}
