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
  <section id="services" class="season season--summer">
    <SeasonsEdge season="summer" />
    <div class="season__wrap">
      <SeasonsMark season="summer" />
      <h2 v-arrive class="season-heading services__heading">
        {{ t('services.title') }}
      </h2>

      <ul class="services">
        <li v-for="service in services" :key="service.key" class="service">
          <span class="service__sun" aria-hidden="true" />
          <h3 class="service__title">
            {{ service.title }}
          </h3>
          <p class="service__text">
            {{ service.description }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.services__heading {
  margin-top: 1rem;
  font-size: clamp(3rem, 8vw, 6.5rem);
  font-weight: 800;
  letter-spacing: -0.045em;
}

.services {
  display: grid;
  gap: 2.5rem 3rem;
  margin-top: 3.5rem;
}

.service {
  display: grid;
  grid-template-columns: 2.75rem minmax(0, 1fr);
  column-gap: 1rem;
  row-gap: 0.5rem;
  align-content: start;
  padding-top: 1.5rem;
  border-top: 2px solid var(--season-ink);
}

.service__sun {
  grid-column: 1;
  grid-row: 1;
  align-self: center;
  width: 2.75rem;
  height: 2.75rem;
  margin-block: -0.5rem;
  border-radius: 50%;
  background: var(--season-accent);
  transform: scale(0.55);
  transform-origin: center;
  transition: transform 500ms var(--ease-out);
}

.service:hover .service__sun {
  transform: scale(1);
}

.service__title {
  grid-column: 2;
  grid-row: 1;
  align-self: center;
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.service__text {
  grid-column: 2;
  grid-row: 2;
  max-width: 44ch;
  line-height: 1.6;
  color: var(--season-soft);
  text-wrap: pretty;
}

@media (min-width: 768px) {
  .services {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1280px) {
  .services {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
