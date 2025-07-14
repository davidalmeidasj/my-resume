<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale, availableLocales } = useI18n()

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="bg-gray-100 border-t border-gray-200 px-6 py-10">
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="flex items-center gap-4">
        <span class="text-sm text-gray-700">🌐</span>
        <select
          v-model="locale"
          class="bg-white border border-gray-300 text-sm rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option v-for="lang in availableLocales" :key="lang" :value="lang">
            {{ lang.toUpperCase() }}
          </option>
        </select>
      </div>

      <p class="text-sm text-gray-600 text-center md:text-left">
        © 2025 David Almeida. All rights reserved.
      </p>

      <button
        @click="scrollToTop"
        class="text-primary hover:underline text-sm transition hover:scale-105"
        aria-label="Scroll to top"
      >
        ↑ {{ $t('footer.backToTop') || 'Back to top' }}
      </button>
    </div>
  </footer>
</template>
