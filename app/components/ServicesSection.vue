<script setup lang="ts">
const { t } = useI18n()

// Driven by a key list so adding an area means touching the locale files only.
const AREAS = ['frontend', 'backend', 'mobile', 'queues', 'devops', 'quality'] as const

const services = computed(() =>
  AREAS.map((key) => ({
    key,
    title: t(`services.${key}.title`),
    description: t(`services.${key}.description`),
  })),
)
</script>

<template>
  <section id="services" class="bg-background px-6 py-20">
    <div class="max-w-6xl mx-auto text-center">
      <h2 class="text-3xl md:text-4xl font-bold text-primary mb-12">
        {{ t('services.title') }}
      </h2>

      <div class="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-left">
        <div
          v-for="service in services"
          :key="service.key"
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
