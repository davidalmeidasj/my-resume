import { createRouter, createWebHistory, type Router, type RouteRecordRaw } from 'vue-router'
import Home from '@/views/HomeView.vue'
import { DEFAULT_LOCALE, isLocale } from '@/config/site'
import { i18n } from '@/i18n'

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
export function installLocaleGuard(router: Router) {
  router.beforeEach((to) => {
    const locale = String(to.params.locale ?? '')
    if (!isLocale(locale)) return `/${DEFAULT_LOCALE}`

    i18n.global.locale.value = locale
    return true
  })
}

export function createAppRouter() {
  const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to) {
      if (to.hash) return { el: to.hash, behavior: 'smooth' }
      return { top: 0 }
    },
  })

  installLocaleGuard(router)
  return router
}

export default createAppRouter()
