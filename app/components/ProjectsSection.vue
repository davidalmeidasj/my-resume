<script setup lang="ts">
import { projects } from '@/data/projects'

const { t } = useI18n()

const open = ref(0)

const ANCHOR_MS = 600

const toggle = (index: number, event: MouseEvent) => {
  const button = event.currentTarget as HTMLElement
  const startTop = button.getBoundingClientRect().top
  const until = performance.now() + ANCHOR_MS
  open.value = open.value === index ? -1 : index

  const hold = () => {
    const drift = button.getBoundingClientRect().top - startTop
    if (Math.abs(drift) >= 1) window.scrollBy(0, drift)
    if (performance.now() < until) requestAnimationFrame(hold)
  }
  requestAnimationFrame(hold)
}
</script>

<template>
  <section id="projects" class="px-section">
    <div class="px-wrap">
      <h2 v-arrive class="px-heading">
        {{ t('projects.title') }}
      </h2>

      <ol class="tracks">
        <li
          v-for="(project, index) in projects"
          :key="project.titleKey"
          class="track"
          :class="{ 'track--open': open === index }"
        >
          <h3 class="track__heading">
            <button
              :id="`project-${index}`"
              type="button"
              class="track__toggle"
              :aria-expanded="open === index"
              :aria-controls="`project-${index}-panel`"
              @click="toggle(index, $event)"
            >
              <span class="track__title">{{ t(project.titleKey) }}</span>
              <span class="track__summary">{{ t(project.descriptionKey) }}</span>
              <span class="track__icon px-frame">
                <PixelIcon :name="open === index ? 'minus' : 'plus'" />
              </span>
            </button>
          </h3>

          <div
            :id="`project-${index}-panel`"
            class="track__panel"
            role="region"
            :aria-labelledby="`project-${index}`"
            :inert="open !== index || undefined"
          >
            <div class="track__inner">
              <div class="track__detail">
                <ul class="track__techs">
                  <li v-for="tech in project.techs" :key="tech" class="track__tech">
                    {{ tech }}
                  </li>
                </ul>

                <a
                  v-if="project.github"
                  :href="project.github"
                  class="track__link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ t('projects.viewOnGitHub') }}
                  <PixelIcon name="arrow-out" />
                </a>
                <p v-else class="track__goal">
                  <strong class="px-label track__goal-label">{{ t('projects.goalLabel') }}</strong>
                  {{ t(project.goalKey || '') }}
                </p>
              </div>
            </div>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.tracks {
  margin-top: calc(var(--cell) * 6);
  border-top: 4px solid #374a67;
}

.track {
  border-bottom: 4px solid #374a67;
}

.track__heading {
  font-weight: inherit;
}

.track__toggle {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 40px;
  gap: var(--cell) calc(var(--cell) * 3);
  width: 100%;
  padding-block: calc(var(--cell) * 3);
  text-align: left;
}

.track__title {
  grid-column: 1;
  grid-row: 1;
  font-family: 'Pixelify Sans', system-ui, sans-serif;
  font-weight: 600;
  font-size: clamp(1.375rem, 2.4vw, 1.875rem);
  line-height: 1.15;
  color: #ece0fb;
  transition: color calc(var(--step) * 2) steps(2, end);
}

.track__summary {
  grid-row: 2;
  grid-column: 1 / -1;
  max-width: 62ch;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: #9e7b9b;
  text-wrap: pretty;
}

.track__icon {
  grid-column: -2;
  grid-row: 1;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  color: #cb9cf2;
  align-self: center;
}

.track__toggle:hover .track__title,
.track--open .track__title {
  color: #cb9cf2;
}

.track--open .track__icon {
  color: #0e1116;
  border-image: var(--fill-wisteria) 4 fill / 4px stretch;
}

.track__panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows calc(var(--step) * 8) steps(6, end);
}

.track--open .track__panel {
  grid-template-rows: 1fr;
}

.track__inner {
  overflow: hidden;
}

.track__detail {
  display: grid;
  gap: calc(var(--cell) * 3);
  padding-bottom: calc(var(--cell) * 4);
}

.track__techs {
  display: flex;
  flex-wrap: wrap;
  gap: var(--cell);
  align-content: start;
}

.track__tech {
  padding: 0.25rem 0.625rem;
  font-size: 0.8125rem;
  line-height: 1.4;
  color: #0e1116;
  background: #9e7b9b;
}

.track__goal {
  max-width: 68ch;
  line-height: 1.65;
  color: #ece0fb;
}

.track__goal-label {
  display: block;
  margin-bottom: calc(var(--cell) * 1.5);
  color: #cb9cf2;
  font-weight: 400;
}

.track__link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  align-self: start;
  justify-self: start;
  min-height: 44px;
  font-weight: 700;
  color: #cb9cf2;
  text-decoration: underline;
  text-underline-offset: 4px;
  text-decoration-thickness: 2px;
}

@media (min-width: 1024px) {
  .track__toggle {
    grid-template-columns: minmax(0, 5fr) minmax(0, 6fr) 40px;
    column-gap: calc(var(--cell) * 5);
    align-items: baseline;
  }

  .track__summary {
    grid-column: 2;
    grid-row: 1;
  }

  .track__detail {
    grid-template-columns: minmax(0, 5fr) minmax(0, 6fr) 40px;
    column-gap: calc(var(--cell) * 5);
  }

  .track__techs {
    grid-column: 1;
  }

  .track__goal,
  .track__link {
    grid-column: 2;
    grid-row: 1;
  }
}
</style>
