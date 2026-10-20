<script setup lang="ts">
import { stackGroups } from '@/data/stack'

const { t, tm, rt } = useI18n()

const paragraphs = computed(() => (tm('about.paragraphs') as unknown[]).map((p) => rt(p as string)))
</script>

<template>
  <section id="about" class="hud-section">
    <div class="about">
      <div class="about__intro">
        <h2 class="hud-heading" data-lock-heading>
          {{ t('about.title') }}
        </h2>
        <p class="about__lead">
          {{ t('about.lead') }}
        </p>
      </div>

      <div class="about__body">
        <p v-for="(paragraph, index) in paragraphs" :key="index" class="about__para">
          {{ paragraph }}
        </p>
      </div>

      <div class="about__stack">
        <h3 class="about__stack-title">
          {{ t('about.stackTitle') }}
        </h3>

        <dl class="readout">
          <div v-for="group in stackGroups" :key="group.key" class="readout__row">
            <dt class="hud-label readout__label">
              {{ t(`about.stack.${group.key}`) }}
            </dt>
            <dd>
              <ul class="readout__techs">
                <li v-for="tech in group.techs" :key="tech" class="readout__tech">
                  {{ tech }}
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  display: grid;
  gap: calc(var(--m) * 2);
  max-width: 80rem;
  margin-inline: auto;
}

@media (min-width: 1024px) {
  .about {
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    column-gap: calc(var(--m) * 3);
    row-gap: calc(var(--m) * 4);
  }
}

.about__lead {
  margin-top: calc(var(--m) * 1.5);
  font-family: 'Chakra Petch', system-ui, sans-serif;
  font-weight: 300;
  font-size: clamp(1.375rem, 2.2vw, 1.75rem);
  line-height: 1.35;
  color: #1b2427;
  max-width: 30ch;
}

.about__body {
  display: grid;
  gap: var(--m);
  align-content: start;
}

@media (min-width: 768px) {
  .about__body {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: calc(var(--m) * 1.5);
    padding-top: calc(var(--m) * 0.5);
  }
}

.about__para {
  color: #3f4c52;
  max-width: 62ch;
}

.about__stack {
  display: grid;
  gap: var(--m);
}

@media (min-width: 1024px) {
  .about__stack {
    grid-column: 1 / -1;
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    column-gap: calc(var(--m) * 3);
  }
}

.about__stack-title {
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 1.3;
}

.readout {
  border-top: 1px solid #6e7e86;
}

.readout__row {
  display: grid;
  gap: 10px;
  padding-block: var(--m);
  border-bottom: 1px solid rgb(110 126 134 / 0.45);
}

@media (min-width: 640px) {
  .readout__row {
    grid-template-columns: 11rem minmax(0, 1fr);
    gap: var(--m);
    align-items: baseline;
  }
}

.readout__label {
  color: #006480;
}

.readout__techs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 8px;
}

.readout__tech {
  font-size: 0.8125rem;
  line-height: 1.5;
  padding: 2px 8px;
  border: 1px solid rgb(110 126 134 / 0.6);
  color: #1b2427;
}
</style>
