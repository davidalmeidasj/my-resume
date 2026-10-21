<script setup lang="ts">
import { stackGroups } from '@/data/stack'

const { t, tm, rt } = useI18n()

const paragraphs = computed(() => (tm('about.paragraphs') as unknown[]).map((p) => rt(p as string)))
</script>

<template>
  <section id="about" class="season season--autumn">
    <SeasonsEdge season="autumn" />
    <div class="about season__wrap">
      <div class="about__intro">
        <SeasonsMark season="autumn" />
        <h2 v-arrive class="season-heading about__heading">
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

        <h3 v-arrive class="about__stack-title">
          {{ t('about.stackTitle') }}
        </h3>
        <ol class="timeline">
          <li v-for="group in stackGroups" :key="group.key" v-arrive class="timeline__item">
            <span class="timeline__dot" aria-hidden="true" />
            <h4 class="timeline__label">
              {{ t(`about.stack.${group.key}`) }}
            </h4>
            <ul class="timeline__techs">
              <li v-for="tech in group.techs" :key="tech" class="timeline__tech">
                {{ tech }}
              </li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  display: grid;
  gap: 3.5rem;
}

.about__heading {
  margin-top: 1rem;
  color: var(--season-accent);
}

.about__lead {
  margin-top: 1.75rem;
  max-width: 30rem;
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
  font-weight: 500;
  font-size: clamp(1.375rem, 2.2vw, 1.875rem);
  line-height: 1.3;
  letter-spacing: -0.01em;
  text-wrap: pretty;
}

.about__body {
  display: grid;
  gap: 1.25rem;
  max-width: 66ch;
  line-height: 1.7;
  color: var(--season-soft);
}

.about__stack-title {
  margin-top: 4rem;
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
  font-weight: 700;
  font-size: 2rem;
  letter-spacing: -0.02em;
  color: var(--season-accent);
}

.timeline {
  position: relative;
  margin-top: 1.75rem;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 0.5rem;
  bottom: 0.5rem;
  width: 2px;
  background: var(--season-ink);
}

.timeline__item {
  position: relative;
  padding-bottom: 1.75rem;
}

.timeline__dot {
  position: absolute;
  left: -2rem;
  top: 0.3rem;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--season-mark);
  border: 3px solid var(--season-ink);
}

.timeline__label {
  font-weight: 700;
  font-size: 1.0625rem;
  color: var(--season-ink);
}

.timeline__techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.timeline__tech {
  padding: 0.3125rem 0.75rem;
  border-radius: 999px;
  border: 1.5px solid rgb(59 42 42 / 0.4);
  font-size: 0.875rem;
  color: var(--season-ink);
}

@media (min-width: 768px) {
  .about__body {
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem 2.5rem;
  }
}

@media (min-width: 1024px) {
  .about {
    grid-template-columns: 5fr 7fr;
    gap: 5rem;
  }

  .about__intro {
    position: sticky;
    top: calc(var(--bar) + 3rem);
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
