import type { Locale } from '@/config/site'

export function useLocaleSwitch() {
  const { switchLocale } = useThemeLocation()

  return (lang: Locale) => switchLocale(lang)
}
