import { isLocale, type Locale } from '@/config/site'
import { MAIN_THEME, THEMES, isThemeSlug, themePath, type ThemeSlug } from '@/config/themes'

export function useThemeLocation() {
  const route = useRoute()
  const { locale } = useI18n()

  const theme = computed<ThemeSlug>(() => {
    const param = String(route.params.theme ?? '')
    return isThemeSlug(param) ? param : MAIN_THEME
  })
  const current = computed<Locale>(() => (isLocale(locale.value) ? locale.value : 'en'))

  const switchLocale = (lang: Locale) =>
    navigateTo({ path: themePath(theme.value, lang), hash: route.hash })

  const links = computed(() =>
    THEMES.map((item) => ({
      ...item,
      href: themePath(item.slug, current.value),
      current: item.slug === theme.value,
    })),
  )

  return { theme, locale: current, switchLocale, links }
}
