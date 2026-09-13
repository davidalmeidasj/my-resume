/**
 * Single source of truth for anything that needs an absolute URL or identity.
 *
 * SITE_URL must match the deployed origin, with no trailing slash. Canonical
 * links, og:url and og:image are all built from it, and social crawlers reject
 * relative URLs, so a wrong value here silently breaks link previews.
 */
export const SITE_URL = 'https://my-resume.vercel.app'

export const DEFAULT_LOCALE = 'en' as const

export const LOCALES = ['en', 'pt', 'es'] as const

export type Locale = (typeof LOCALES)[number]

/** Maps our short codes to the BCP 47 tags used by `lang`, hreflang and og:locale. */
export const LOCALE_TAGS: Record<Locale, string> = {
  en: 'en-US',
  pt: 'pt-BR',
  es: 'es-ES',
}

export const AUTHOR = {
  name: 'David Almeida',
  email: 'davidasj21@gmail.com',
  phone: '+55 21 99115-8960',
  city: 'Rio de Janeiro',
  region: 'RJ',
  country: 'BR',
  linkedin: 'https://www.linkedin.com/in/david-almeida-sj/',
  github: 'https://github.com/davidalmeidasj',
}

export const OG_IMAGE = `${SITE_URL}/og-image.png`

export const isLocale = (value: string): value is Locale =>
  (LOCALES as readonly string[]).includes(value)
