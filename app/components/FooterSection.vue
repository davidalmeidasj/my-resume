<script setup lang="ts">
import { LOCALES, type Locale } from '@/config/site'

const { t, locale } = useI18n()
const switchLocale = useLocaleSwitch()

const switchLang = (event: Event) =>
  switchLocale((event.target as HTMLSelectElement).value as Locale)

const scrollToTop = () => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
}
</script>

<template>
  <footer class="border-t border-line px-4 py-10 sm:px-6">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between"
    >
      <p class="text-sm text-haze">© 2025 David Almeida. {{ t('footer.rights') }}</p>

      <div class="flex items-center justify-between gap-6 md:justify-end">
        <label class="flex items-center gap-2 text-haze">
          <Icon name="lucide:globe" class="h-4 w-4" />
          <span class="sr-only">Language</span>
          <select
            :value="locale"
            class="min-h-[44px] rounded-full border border-line bg-abyss px-3 font-display text-xs tracking-[0.2em] text-mist"
            @change="switchLang"
          >
            <option v-for="lang in LOCALES" :key="lang" :value="lang" :selected="lang === locale">
              {{ lang.toUpperCase() }}
            </option>
          </select>
        </label>

        <button
          type="button"
          class="group inline-flex min-h-[44px] items-center gap-2 text-sm text-haze transition-colors duration-300 hover:text-mist"
          @click="scrollToTop"
        >
          <Icon
            name="lucide:arrow-up"
            class="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5"
          />
          {{ t('footer.backToTop') }}
        </button>
      </div>
    </div>
  </footer>
</template>
