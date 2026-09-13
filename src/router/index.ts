import type { Router, RouterOptions, RouteRecordRaw } from 'vue-router'
import Home from '@/views/HomeView.vue'
import { DEFAULT_LOCALE, isLocale } from '@/config/site'
import type { AppI18n } from '@/i18n'

/**
 * The locale lives in the URL (/en, /pt, /es) rather than in component state.
 *
 * That is what makes each language a real, crawlable page: search engines index
 * three documents instead of one, hreflang can point them at each other, and a
 * shared link always opens in the language it was shared in.
 */
export const routes: RouteRecordRaw[] = [
  { path: '/', redirect: `/${DEFAULT_LOCALE}` },
  { path: '/:locale', name: 'Home', component: Home },
  { path: '/:pathMatch(.*)*', redirect: `/${DEFAULT_LOCALE}` },
]

/**
 * Applies the locale on every navigation.
 *
 * This has to be a global guard rather than the route's own `beforeEnter`:
 * moving from /pt to /es reuses the same route record, so per-route guards
 * never fire and the page would keep the previous language.
 */
export function installLocaleGuard(router: Router, i18n: AppI18n) {
  router.beforeEach((to) => {
    const locale = String(to.params.locale ?? '')
    if (!isLocale(locale)) return `/${DEFAULT_LOCALE}`

    i18n.global.locale.value = locale
    return true
  })
}

/**
 * Anchor scrolling for the in-page nav.
 *
 * This has to be handed to the router factory explicitly: vite-ssg builds the
 * router itself, so options not passed through here silently fall back to the
 * defaults and #about-style links change the URL without moving the page.
 *
 * The offset for the fixed header is CSS (`scroll-margin-top` in main.css) so
 * that native anchor loads land in the right place too, not just router ones.
 */
export const scrollBehavior: RouterOptions['scrollBehavior'] = (to, _from, savedPosition) => {
  if (savedPosition) return savedPosition
  if (to.hash) return { el: to.hash, behavior: 'smooth' }
  return { top: 0 }
}
