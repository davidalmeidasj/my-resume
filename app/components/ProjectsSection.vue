<script setup lang="ts">
import { projects } from '@/data/projects'

const { t } = useI18n()

const open = ref<number[]>([0])

const isOpen = (index: number) => open.value.includes(index)

const toggle = (index: number) => {
  open.value = isOpen(index) ? open.value.filter((item) => item !== index) : [...open.value, index]
}
</script>

<template>
  <section id="projects" class="season season--winter">
    <SeasonEdge season="winter" />
    <div class="season__wrap">
      <SeasonMark season="winter" />
      <h2 v-arrive class="season-heading projects__heading">
        {{ t('projects.title') }}
      </h2>

      <ol class="tracks">
        <li
          v-for="(project, index) in projects"
          :key="project.titleKey"
          class="track"
          :class="{ 'track--open': isOpen(index), 'track--lead': index === 0 }"
        >
          <h3 class="track__heading">
            <button
              :id="`project-${index}`"
              type="button"
              class="track__toggle"
              :aria-expanded="isOpen(index)"
              :aria-controls="`project-${index}-panel`"
              @click="toggle(index)"
            >
              <span class="track__title">{{ t(project.titleKey) }}</span>
              <span class="track__summary">{{ t(project.descriptionKey) }}</span>
              <span class="track__icon" aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </h3>

          <div
            :id="`project-${index}-panel`"
            class="track__panel"
            role="region"
            :aria-labelledby="`project-${index}`"
            :inert="!isOpen(index) || undefined"
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
                  <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                    <path d="M6 14 L14 6 M7 6 H14 V13" />
                  </svg>
                </a>
                <p v-else class="track__goal">
                  <strong class="track__goal-label">{{ t('projects.goalLabel') }}</strong>
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
.projects__heading {
  margin-top: 1rem;
}

.tracks {
  margin-top: 3rem;
  border-top: 2px solid var(--season-ink);
}

.track {
  border-bottom: 1px solid rgb(62 71 86 / 0.24);
}

.track__heading {
  font-weight: inherit;
}

.track__toggle {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 2.75rem;
  gap: 0.5rem 1.25rem;
  width: 100%;
  padding-block: 1.5rem;
  text-align: left;
}

.track__title {
  grid-column: 1;
  grid-row: 1;
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
  font-weight: 700;
  font-size: clamp(1.375rem, 2.4vw, 1.875rem);
  line-height: 1.15;
  letter-spacing: -0.02em;
  transition: color 300ms var(--ease-out);
}

.track--lead .track__title {
  font-size: clamp(1.75rem, 3.4vw, 2.75rem);
}

.track__summary {
  grid-row: 2;
  grid-column: 1 / -1;
  max-width: 62ch;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--season-soft);
  text-wrap: pretty;
}

.track__icon {
  position: relative;
  grid-column: -2;
  grid-row: 1;
  align-self: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  border: 1.5px solid var(--season-ink);
  transition:
    background-color 300ms var(--ease-out),
    transform 400ms var(--ease-out);
}

.track__icon span {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 14px;
  height: 2px;
  margin: -1px 0 0 -7px;
  border-radius: 2px;
  background: var(--season-ink);
  transition: transform 400ms var(--ease-out);
}

.track__icon span:last-child {
  transform: rotate(90deg);
}

.track__toggle:hover .track__icon {
  background: var(--color-winter-frost);
}

.track--open .track__icon {
  background: var(--color-winter-frost);
  transform: rotate(180deg);
}

.track--open .track__icon span:last-child {
  transform: rotate(0deg);
}

.track__toggle:hover .track__title,
.track--open .track__title {
  color: var(--season-accent);
}

.track__panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 520ms var(--ease-out);
}

.track--open .track__panel {
  grid-template-rows: 1fr;
}

.track__inner {
  overflow: hidden;
}

.track__detail {
  display: grid;
  gap: 1.5rem;
  padding-bottom: 2rem;
}

.track__techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-content: start;
}

.track__tech {
  padding: 0.3125rem 0.75rem;
  border-radius: 999px;
  background: var(--color-winter-slate);
  color: #ffffff;
  font-size: 0.8125rem;
  font-weight: 500;
}

.track__goal {
  max-width: 68ch;
  line-height: 1.7;
}

.track__goal-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 700;
  color: var(--season-accent);
}

.track__link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  align-self: start;
  justify-self: start;
  min-height: 44px;
  font-weight: 700;
  color: var(--season-accent);
  text-decoration: underline;
  text-underline-offset: 4px;
  text-decoration-thickness: 2px;
}

.track__link svg {
  width: 1rem;
  height: 1rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
}

@media (min-width: 1024px) {
  .track__toggle {
    grid-template-columns: minmax(0, 5fr) minmax(0, 6fr) 2.75rem;
    column-gap: 2.5rem;
    align-items: baseline;
  }

  .track__summary {
    grid-column: 2;
    grid-row: 1;
  }

  .track__detail {
    grid-template-columns: minmax(0, 5fr) minmax(0, 6fr) 2.75rem;
    column-gap: 2.5rem;
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
