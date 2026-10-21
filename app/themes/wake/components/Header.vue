<script setup lang="ts">
import { LOCALES, type Locale } from '@/config/site'

const { locale, t } = useI18n()
const switchLocale = useLocaleSwitch()
const menuOpen = ref(false)
const scrolled = ref(false)

const SECTIONS = ['home', 'about', 'projects', 'contact'] as const

const switchLang = (lang: Locale) => {
  menuOpen.value = false
  switchLocale(lang)
}

const closeMenu = () => {
  menuOpen.value = false
}

const onScroll = () => {
  scrolled.value = window.scrollY > 24
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ease-out-expo"
    :class="
      scrolled || menuOpen ? 'border-wake-line bg-wake-abyss' : 'border-transparent bg-transparent'
    "
  >
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
      <WakeBrand @click="closeMenu" />

      <nav class="hidden items-center gap-8 md:flex" :aria-label="t('menu.home')">
        <a v-for="id in SECTIONS" :key="id" :href="`#${id}`" class="nav-link">
          {{ t(`menu.${id}`) }}
        </a>
      </nav>

      <div class="hidden items-center gap-1 md:flex">
        <button
          v-for="lang in LOCALES"
          :key="lang"
          type="button"
          :lang="lang"
          :aria-current="locale === lang ? 'true' : undefined"
          class="lang"
          @click="switchLang(lang)"
        >
          {{ lang.toUpperCase() }}
        </button>
      </div>

      <button
        type="button"
        class="-mr-2 grid h-11 w-11 place-items-center text-wake-mist md:hidden"
        :aria-expanded="menuOpen"
        aria-controls="mobile-menu"
        :aria-label="t('menu.home')"
        @click="menuOpen = !menuOpen"
      >
        <Icon :name="menuOpen ? 'lucide:x' : 'lucide:menu'" class="h-6 w-6" />
      </button>
    </div>

    <div v-if="menuOpen" id="mobile-menu" class="border-t border-wake-line bg-wake-abyss md:hidden">
      <nav class="flex flex-col px-4 py-4 sm:px-6">
        <a
          v-for="id in SECTIONS"
          :key="id"
          :href="`#${id}`"
          class="border-b border-wake-line py-4 font-wake-display text-2xl font-extralight text-wake-mist"
          @click="closeMenu"
        >
          {{ t(`menu.${id}`) }}
        </a>
        <div class="flex gap-2 pt-5">
          <button
            v-for="lang in LOCALES"
            :key="lang"
            type="button"
            :lang="lang"
            :aria-current="locale === lang ? 'true' : undefined"
            class="lang"
            @click="switchLang(lang)"
          >
            {{ lang.toUpperCase() }}
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav-link {
  @apply relative py-2 text-sm text-wake-haze transition-colors duration-300 hover:text-wake-mist;
}

.nav-link::after {
  content: '';
  @apply absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-wake-crest transition-transform duration-500 ease-out-expo;
}

.nav-link:hover::after,
.nav-link:focus-visible::after {
  @apply scale-x-100;
}

.lang {
  @apply min-h-[44px] min-w-[44px] px-2 font-wake-display text-xs tracking-[0.2em] text-wake-haze transition-colors duration-300 hover:text-wake-mist;
}

.lang[aria-current='true'] {
  @apply text-wake-signal;
}
</style>
