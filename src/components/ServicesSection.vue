<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const services = [
  {
    title: t('services.frontend.title'),
    description: t('services.frontend.description'),
  },
  {
    title: t('services.fullstack.title'),
    description: t('services.fullstack.description'),
  },
  {
    title: t('services.uiux.title'),
    description: t('services.uiux.description'),
  },
  {
    title: t('services.api.title'),
    description: t('services.api.description'),
  }
]
</script>

<template>
  <section id="services" class="py-20 px-6 bg-white">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
        {{ t('services.title') }}
      </h2>

      <div class="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div v-for="(service, index) in services" :key="index" class="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ service.title }}</h3>
          <p class="text-sm text-gray-600 leading-relaxed">{{ service.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
