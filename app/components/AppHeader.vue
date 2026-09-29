<script setup lang="ts">
import { LOCALES, type Locale } from '@/config/site'

const { locale, t } = useI18n()
const mobileMenuOpen = ref(false)
const route = useRoute()
const switchLocalePath = useSwitchLocalePath()

const switchLang = (lang: Locale) => {
  mobileMenuOpen.value = false
  navigateTo({ path: switchLocalePath(lang), hash: route.hash })
}

// Plain anchors, no preventDefault: the browser's own #hash jump is the
// baseline, so in-page navigation keeps working even if the router or the
// smooth-scroll animation does not. The handler only closes the mobile menu.
const SECTIONS = ['home', 'about', 'projects', 'contact'] as const

const closeMenu = () => {
  mobileMenuOpen.value = false
}
</script>

<template>
  <header class="fixed top-0 w-full bg-white shadow-md z-50">
    <div class="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
      <BrandLogo class="h-10 w-auto" />

      <!-- Desktop Menu -->
      <nav class="hidden md:flex gap-6 text-sm font-medium">
        <a v-for="id in SECTIONS" :key="id" :href="`#${id}`" @click="closeMenu">
          {{ t(`menu.${id}`) }}
        </a>
      </nav>

      <!-- Language Switcher -->
      <div class="hidden md:flex gap-2">
        <button
          v-for="lang in LOCALES"
          :key="lang"
          type="button"
          :lang="lang"
          :aria-current="locale === lang ? 'true' : undefined"
          :class="{ 'font-bold': locale === lang }"
          @click="switchLang(lang)"
        >
          {{ lang.toUpperCase() }}
        </button>
      </div>

      <!-- Mobile Hamburger -->
      <button class="md:hidden" @click="mobileMenuOpen = !mobileMenuOpen">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            :class="{ hidden: mobileMenuOpen, block: !mobileMenuOpen }"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
          <path
            :class="{ block: mobileMenuOpen, hidden: !mobileMenuOpen }"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div v-if="mobileMenuOpen" class="md:hidden bg-white shadow-lg">
      <nav class="flex flex-col gap-4 px-4 py-6">
        <a v-for="id in SECTIONS" :key="id" :href="`#${id}`" @click="closeMenu">
          {{ t(`menu.${id}`) }}
        </a>
        <div class="flex gap-4 mt-4">
          <button
            v-for="lang in LOCALES"
            :key="lang"
            type="button"
            :lang="lang"
            :aria-current="locale === lang ? 'true' : undefined"
            :class="{ 'font-bold': locale === lang }"
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
a {
  @apply cursor-pointer text-gray-700 hover:text-primary transition;
}
</style>
