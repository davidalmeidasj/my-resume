<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()

const scrollToContact = () => {
  router.push({ hash: '#contact' })
}
</script>

<template>
  <section id="home" class="min-h-screen flex flex-col justify-center items-center text-center px-6">
    <h1 class="text-4xl md:text-5xl font-bold text-primary mb-4">
      {{ t('hero.title') }}
    </h1>
    <p class="text-lg md:text-xl text-gray-600 max-w-xl mb-6">
      {{ t('hero.subtitle') }}
    </p>
    <button
      @click="scrollToContact"
      class="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition"
    >
      {{ t('hero.cta') }}
    </button>
  </section>
</template>

