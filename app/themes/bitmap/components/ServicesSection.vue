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
  <section id="services" class="px-section services-band">
    <div class="px-wrap">
      <h2 v-arrive class="px-heading">
        {{ t('services.title') }}
      </h2>

      <ul class="plates">
        <li v-for="service in services" :key="service.key" class="plate">
          <BitmapPixelSprite :name="service.key" class="plate__sprite" />
          <h3 class="plate__title">
            {{ service.title }}
          </h3>
          <p class="plate__text">
            {{ service.description }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.services-band {
  background-color: #374a67;
}

.plates {
  display: grid;
  gap: calc(var(--cell) * 6) calc(var(--cell) * 5);
  margin-top: calc(var(--cell) * 8);
}

.plate {
  display: grid;
  align-content: start;
  gap: calc(var(--cell) * 2);
}

.plate:hover :deep(.sprite__frame--0) {
  visibility: hidden;
}

.plate:hover :deep(.sprite__frame--1) {
  visibility: visible;
}

.plate__sprite {
  margin-bottom: var(--cell);
}

.plate__title {
  font-family: 'Pixelify Sans', system-ui, sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 1.2;
  color: #cb9cf2;
}

.plate__text {
  max-width: 42ch;
  line-height: 1.6;
  color: #ece0fb;
  text-wrap: pretty;
}

@media (min-width: 640px) {
  .plates {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1024px) {
  .plates {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
