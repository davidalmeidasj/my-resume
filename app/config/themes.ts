import type { Locale } from './site'

export const THEMES = [
  { slug: 'career-seasons', season: 'spring' },
  { slug: 'daylight-hud', season: 'summer' },
  { slug: 'bitmap-specimen', season: 'autumn' },
  { slug: 'bioluminescent-wake', season: 'winter' },
] as const

export type ThemeSlug = (typeof THEMES)[number]['slug']

export const MAIN_THEME: ThemeSlug = 'career-seasons'

export const EXTRA_THEMES = THEMES.map((theme) => theme.slug).filter((slug) => slug !== MAIN_THEME)

export const isThemeSlug = (value: string): value is ThemeSlug =>
  THEMES.some((theme) => theme.slug === value)

export const themePath = (slug: ThemeSlug, locale: Locale) =>
  slug === MAIN_THEME ? `/${locale}` : `/${slug}/${locale}`
