<script setup lang="ts">
import { stackGroups } from '@/data/stack'

const { t, tm, rt } = useI18n()

const paragraphs = computed(() => (tm('about.paragraphs') as unknown[]).map((p) => rt(p as string)))
</script>

<template>
  <section id="about" class="px-section">
    <div class="about px-wrap">
      <div class="about__intro">
        <h2 v-arrive class="px-heading">
          {{ t('about.title') }}
        </h2>
        <p class="about__lead">
          {{ t('about.lead') }}
        </p>
      </div>

      <div class="about__main">
        <div class="about__body">
          <p v-for="(paragraph, index) in paragraphs" :key="index">
            {{ paragraph }}
          </p>
        </div>

        <div class="about__stack">
          <h3 v-arrive class="about__stack-title">
            {{ t('about.stackTitle') }}
          </h3>
          <dl class="charset">
            <div v-for="group in stackGroups" :key="group.key" class="charset__row">
              <dt class="px-label charset__label">
                {{ t(`about.stack.${group.key}`) }}
              </dt>
              <dd>
                <ul class="charset__list">
                  <li v-for="tech in group.techs" :key="tech" class="charset__tech">
                    {{ tech }}
                  </li>
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  display: grid;
  gap: calc(var(--cell) * 8);
}

.about__lead {
  margin-top: calc(var(--cell) * 4);
  max-width: 34rem;
  font-family: 'Pixelify Sans', system-ui, sans-serif;
  font-size: clamp(1.25rem, 1.9vw, 1.625rem);
  line-height: 1.4;
  text-wrap: pretty;
}

.about__body {
  display: grid;
  gap: calc(var(--cell) * 3);
  max-width: 68ch;
  color: #ece0fb;
  line-height: 1.65;
}

.about__stack {
  margin-top: calc(var(--cell) * 8);
}

.about__stack-title {
  font-family: 'Pixelify Sans', system-ui, sans-serif;
  font-weight: 600;
  font-size: 1.75rem;
  color: #cb9cf2;
  width: fit-content;
}

.charset {
  margin-top: calc(var(--cell) * 3);
  border-top: 4px solid #374a67;
}

.charset__row {
  display: grid;
  gap: calc(var(--cell) * 1.5);
  padding-block: calc(var(--cell) * 2.5);
  border-bottom: 4px solid #374a67;
}

.charset__label {
  color: #9e7b9b;
}

.charset__list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--cell);
}

.charset__tech {
  padding: 0.25rem 0.625rem;
  font-size: 0.875rem;
  line-height: 1.4;
  color: #ece0fb;
  border: 4px solid transparent;
  border-image: var(--frame-grape) 4 / 4px stretch;
}

@media (min-width: 768px) {
  .about__body {
    grid-template-columns: 1fr 1fr;
    gap: calc(var(--cell) * 3) calc(var(--cell) * 5);
  }

  .charset__row {
    grid-template-columns: 12rem 1fr;
    align-items: baseline;
  }
}

@media (min-width: 1024px) {
  .about {
    grid-template-columns: 5fr 7fr;
    gap: calc(var(--cell) * 10);
  }

  .about__intro {
    position: sticky;
    top: calc(72px + var(--cell) * 6);
    align-self: start;
  }

  .about__body {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 1280px) {
  .about__body {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
