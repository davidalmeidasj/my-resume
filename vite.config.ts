/// <reference types="vite-ssg" />
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

import { LOCALES } from './src/config/site.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  ssgOptions: {
    // The locale routes are dynamic (/:locale), so the crawler cannot discover
    // them; they have to be listed for each one to get its own static HTML.
    // "/" is prerendered too as a fallback for hosts without redirect support,
    // and its canonical points at the default locale to avoid duplicate content.
    includedRoutes: () => ['/', ...LOCALES.map((locale: string) => `/${locale}`)],
    formatting: 'minify',
  },
})
