import { createI18n } from 'vue-i18n'
import pt from './locales/pt.json'
import en from './locales/en.json'
import es from './locales/es.json'
import { DEFAULT_LOCALE } from './config/site'

/**
 * A fresh instance per app, never a module-level singleton.
 *
 * Prerendering renders every route in the same Node process and in parallel, so
 * a shared instance means the routes race over one `locale` value and all four
 * pages come out in whichever language happened to be written last.
 *
 * `legacy: false` puts vue-i18n in Composition API mode, which is what makes
 * `locale` a writable ref the router guard can set on navigation.
 */
export function createAppI18n() {
  return createI18n({
    legacy: false,
    locale: DEFAULT_LOCALE,
    fallbackLocale: DEFAULT_LOCALE,
    messages: { pt, en, es },
  })
}

export type AppI18n = ReturnType<typeof createAppI18n>
