<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { locale, t } = useI18n()

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const switchLang = (lang: string) => {
  locale.value = lang
}
</script>

<template>
  <footer class="bg-white border-t py-6 px-4 text-center text-sm text-gray-500">
    <div class="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto gap-4">
      <div class="flex gap-2">
        <button @click="switchLang('pt')" :class="{ 'font-bold text-primary': locale === 'pt' }">PT</button>
        <button @click="switchLang('en')" :class="{ 'font-bold text-primary': locale === 'en' }">EN</button>
        <button @click="switchLang('es')" :class="{ 'font-bold text-primary': locale === 'es' }">ES</button>
      </div>

      <div>
        © {{ new Date().getFullYear() }} David Almeida. {{ t('footer.rights') }}
      </div>

      <button @click="scrollToTop" class="text-primary hover:underline">
        ↑ {{ t('footer.backToTop') }}
      </button>
    </div>
  </footer>
</template>
