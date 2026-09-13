import { createI18n } from 'vue-i18n'
import pt from './locales/pt.json'
import en from './locales/en.json'
import es from './locales/es.json'
import { DEFAULT_LOCALE } from './config/site'

// `legacy: false` puts vue-i18n in Composition API mode, which is what makes
// `locale` a writable ref that the router can set on navigation.
export const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  messages: { pt, en, es },
})
