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
  <section id="services" class="hud-section hud-band services-band">
    <div class="services">
      <h2 class="hud-heading" data-lock-heading>
        {{ t('services.title') }}
      </h2>

      <ul class="systems">
        <li v-for="service in services" :key="service.key" class="systems__row">
          <span class="systems__pip" aria-hidden="true" />
          <h3 class="systems__title">
            {{ service.title }}
          </h3>
          <p class="systems__text">
            {{ service.description }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.services-band {
  background-color: #dcdfe0;
  border-block: 1px solid rgb(110 126 134 / 0.45);
}

.services {
  max-width: 80rem;
  margin-inline: auto;
}

.systems {
  margin-top: calc(var(--m) * 2);
  display: grid;
  border-top: 1px solid #6e7e86;
}

@media (min-width: 1024px) {
  .systems {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: calc(var(--m) * 3);
    border-top: 0;
  }
}

.systems__row {
  position: relative;
  display: grid;
  grid-template-columns: 12px minmax(0, 1fr);
  column-gap: var(--m);
  row-gap: 8px;
  padding-block: calc(var(--m) * 1.25);
  border-bottom: 1px solid rgb(110 126 134 / 0.45);
}

@media (min-width: 1024px) {
  .systems__row {
    border-top: 1px solid #6e7e86;
    border-bottom: 0;
  }
}

.systems__pip {
  width: 10px;
  height: 10px;
  margin-top: 0.55em;
  border: 2px solid #00799b;
  transition:
    background-color 240ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 360ms cubic-bezier(0.16, 1, 0.3, 1);
}

.systems__row:hover .systems__pip {
  background: #00799b;
  transform: rotate(45deg);
}

.systems__title {
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 1.4;
}

.systems__text {
  grid-column: 2;
  color: #3f4c52;
  max-width: 62ch;
}
</style>
