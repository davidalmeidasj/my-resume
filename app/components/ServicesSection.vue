<script setup lang="ts">
const { t } = useI18n()

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
  <section id="services" class="px-4 py-28 sm:px-6 md:py-36">
    <div class="mx-auto max-w-6xl">
      <h2
        class="text-[clamp(2.25rem,4.5vw,3.75rem)] font-extralight leading-none tracking-[-0.03em]"
      >
        {{ t('services.title') }}
      </h2>

      <ul class="mt-16">
        <li
          v-for="service in services"
          :key="service.key"
          class="service group grid gap-4 border-t border-line py-10 md:grid-cols-12 md:gap-10"
        >
          <h3
            class="text-2xl font-light tracking-[-0.02em] transition-colors duration-500 group-hover:text-crest md:col-span-4"
          >
            {{ service.title }}
          </h3>
          <p class="max-w-[36rem] leading-relaxed text-haze md:col-span-8">
            {{ service.description }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.service {
  position: relative;
}

.service::before {
  content: '';
  @apply absolute left-0 top-[-1px] h-px w-full origin-left scale-x-0 bg-crest transition-transform duration-[600ms] ease-out-expo;
}

.service:hover::before,
.service:focus-within::before {
  @apply scale-x-100;
}
</style>
