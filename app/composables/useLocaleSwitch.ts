import type { Locale } from '@/config/site'

export function useLocaleSwitch() {
  const route = useRoute()
  const switchLocalePath = useSwitchLocalePath()

  return (lang: Locale) => navigateTo({ path: switchLocalePath(lang), hash: route.hash })
}
