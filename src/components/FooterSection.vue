<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale, availableLocales } = useI18n()

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="bg-light border-t border-accent1 px-6 py-10 text-dark">
    <div
      class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6"
    >
      <!-- Language Switcher -->
      <div class="flex items-center gap-2">
        <span class="text-base">🌐</span>
        <select
          v-model="locale"
          class="bg-white border border-muted text-sm rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option
            v-for="lang in availableLocales"
            :key="lang"
            :value="lang"
          >
            {{ lang.toUpperCase() }}
          </option>
        </select>
      </div>

      <!-- Credits -->
      <p class="text-sm text-muted text-center md:text-left">
        © 2025 David Almeida. All rights reserved.
      </p>

      <!-- Scroll to Top -->
      <button
        @click="scrollToTop"
        class="text-primary hover:underline text-sm transition duration-300 hover:scale-105 w-[250px]"
        aria-label="Scroll to top"
      >
        ↑ {{ $t('footer.backToTop') || 'Back to top' }}
      </button>
    </div>
  </footer>
</template>
