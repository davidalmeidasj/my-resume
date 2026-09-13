import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes, installLocaleGuard } from './router'
import './assets/main.css'
import { createAppI18n } from './i18n'
import { isLocale } from './config/site'

/**
 * ViteSSG renders every route to static HTML at build time and hydrates it in
 * the browser, so the served markup already contains the page.
 *
 * That is the whole point of the exercise: social crawlers and a fair share of
 * search-engine passes never execute JavaScript, so a client-rendered SPA hands
 * them an empty <div id="app"> and nothing else.
 */
export const createApp = ViteSSG(App, { routes }, ({ app, router, routePath }) => {
  // Per app, not per module: prerendering runs the routes in parallel in one
  // process, and a shared i18n instance would let them race over the locale.
  const i18n = createAppI18n()
  app.use(i18n)
  installLocaleGuard(router, i18n)

  // During prerendering there is no navigation to trigger the guard, so the
  // locale has to be read straight off the path being rendered.
  const locale = routePath?.split('/')[1] ?? ''
  if (isLocale(locale)) i18n.global.locale.value = locale
})
