<script setup lang="ts">
import { LOCALES, type Locale } from '@/config/site'

const { t, locale } = useI18n()
const switchLocale = useLocaleSwitch()
const { links } = useThemeLocation()

const switchLang = (event: Event) =>
  switchLocale((event.target as HTMLSelectElement).value as Locale)

const scrollToTop = () => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
}
</script>

<template>
  <footer class="border-t border-wake-line px-4 py-10 sm:px-6">
    <nav
      class="mx-auto mb-8 flex max-w-6xl flex-col gap-4 border-b border-wake-line pb-8"
      :aria-label="t('themes.label')"
    >
      <p class="text-sm text-wake-haze">{{ t('themes.label') }}</p>
      <ul class="flex flex-wrap gap-2">
        <li v-for="item in links" :key="item.slug">
          <NuxtLink
            :to="item.href"
            class="inline-flex h-11 items-center rounded-full border px-5 text-sm transition-colors duration-300"
            :class="
              item.current
                ? 'border-wake-crest text-wake-mist'
                : 'border-wake-line text-wake-haze hover:border-wake-haze/50 hover:text-wake-mist'
            "
            :aria-current="item.current ? 'page' : undefined"
          >
            {{ t(`themes.items.${item.slug}.name`) }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <div
      class="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between"
    >
      <p class="text-sm text-wake-haze">© 2025 David Almeida. {{ t('footer.rights') }}</p>

      <div class="flex items-center gap-3 md:justify-end">
        <label
          class="relative inline-flex h-11 items-center rounded-full border border-wake-line text-wake-haze transition-colors duration-300 focus-within:border-wake-crest hover:border-wake-haze/50 hover:text-wake-mist"
        >
          <Icon name="lucide:globe" class="pointer-events-none absolute left-4 h-4 w-4" />
          <span class="sr-only">Language</span>
          <select
            :value="locale"
            class="h-full cursor-pointer appearance-none rounded-full bg-transparent pl-10 pr-10 text-sm text-wake-mist outline-none"
            @change="switchLang"
          >
            <option
              v-for="lang in LOCALES"
              :key="lang"
              :value="lang"
              :selected="lang === locale"
              class="bg-wake-abyss"
            >
              {{ lang.toUpperCase() }}
            </option>
          </select>
          <Icon name="lucide:chevron-down" class="pointer-events-none absolute right-4 h-4 w-4" />
        </label>

        <button
          type="button"
          class="group inline-flex h-11 items-center gap-2 rounded-full border border-wake-line px-5 text-sm text-wake-haze transition-colors duration-300 hover:border-wake-haze/50 hover:text-wake-mist"
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
