<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t } = useI18n()

const services = computed(() => [
  {
    title: t('services.frontend.title'),
    description: t('services.frontend.description')
  },
  {
    title: t('services.fullstack.title'),
    description: t('services.fullstack.description')
  },
  {
    title: t('services.uiux.title'),
    description: t('services.uiux.description')
  },
  {
    title: t('services.api.title'),
    description: t('services.api.description')
  },
  {
    title: t('services.devops.title'),
    description: t('services.devops.description')
  }
])
</script>


<template>
  <section id="services" class="bg-background px-6 py-20">
    <div class="max-w-6xl mx-auto text-center">
      <h2 class="text-3xl md:text-4xl font-bold text-primary mb-12">
        {{ t('services.title') }}
      </h2>

      <div class="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="bg-white rounded-xl shadow-md p-6 transition hover:shadow-xl hover:-translate-y-1 duration-300"
        >
          <h3 class="text-lg font-semibold text-dark mb-2">
            {{ service.title }}
          </h3>
          <p class="text-sm text-muted leading-relaxed">
            {{ service.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
