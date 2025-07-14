import { createI18n } from 'vue-i18n'
import pt from './locales/pt.json'
import en from './locales/en.json'
import es from './locales/es.json'
export const i18n = createI18n({
  locale: 'pt',
  fallbackLocale: 'en',
  messages: { pt, en, es }
})
