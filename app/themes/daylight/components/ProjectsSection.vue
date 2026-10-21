<script setup lang="ts">
import { projects } from '@/data/projects'

const { t } = useI18n()

const { isOpen, toggle } = useProjectToggle()
</script>

<template>
  <section id="projects" class="hud-section">
    <div class="projects">
      <h2 class="hud-heading" data-lock-heading>
        {{ t('projects.title') }}
      </h2>

      <ol class="tracks">
        <li
          v-for="(project, index) in projects"
          :key="project.titleKey"
          class="track"
          :class="{ 'track--open': isOpen(index) }"
        >
          <h3 class="track__heading">
            <button
              :id="`project-${index}`"
              type="button"
              class="track__toggle"
              :aria-expanded="isOpen(index)"
              :aria-controls="`project-${index}-panel`"
              data-lock
              @click="toggle(index)"
            >
              <span class="track__title">{{ t(project.titleKey) }}</span>
              <span class="track__summary">{{ t(project.descriptionKey) }}</span>
              <Icon name="lucide:plus" class="track__icon" aria-hidden="true" />
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
                  data-lock
                >
                  {{ t('projects.viewOnGitHub') }}
                  <Icon name="lucide:arrow-up-right" class="size-4" aria-hidden="true" />
                </a>
                <p v-else class="track__goal">
                  <strong class="hud-label track__goal-label">{{ t('projects.goalLabel') }}</strong>
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
.projects {
  max-width: 80rem;
  margin-inline: auto;
}

.tracks {
  margin-top: calc(var(--m) * 2);
  border-top: 1px solid #1b2427;
}

.track {
  border-bottom: 1px solid rgb(110 126 134 / 0.55);
}

.track__heading {
  font-weight: inherit;
}

.track__toggle {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 24px;
  gap: 8px var(--m);
  width: 100%;
  padding-block: calc(var(--m) * 1.25);
  text-align: left;
}

@media (min-width: 1024px) {
  .track__toggle {
    grid-template-columns: minmax(0, 5fr) minmax(0, 6fr) 24px;
    column-gap: calc(var(--m) * 2);
    align-items: baseline;
  }
}

.track__title {
  font-family: 'Chakra Petch', system-ui, sans-serif;
  font-weight: 400;
  font-size: clamp(1.375rem, 2.4vw, 1.875rem);
  line-height: 1.15;
  letter-spacing: -0.01em;
  color: #1b2427;
  transition: color 240ms cubic-bezier(0.16, 1, 0.3, 1);
}

.track__summary {
  grid-row: 2;
  grid-column: 1 / -1;
  font-family: B612, system-ui, sans-serif;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: #3f4c52;
  max-width: 62ch;
  text-wrap: pretty;
}

@media (min-width: 1024px) {
  .track__title {
    grid-column: 1;
    grid-row: 1;
  }

  .track__summary {
    grid-column: 2;
    grid-row: 1;
  }
}

.track__icon {
  grid-column: -2;
  grid-row: 1;
  width: 24px;
  height: 24px;
  color: #00799b;
  align-self: center;
  transition: transform 460ms cubic-bezier(0.16, 1, 0.3, 1);
}

.track__toggle:hover .track__title,
.track--open .track__title {
  color: #006480;
}

.track--open .track__icon {
  transform: rotate(135deg);
}

.track__panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 520ms cubic-bezier(0.16, 1, 0.3, 1);
}

.track--open .track__panel {
  grid-template-rows: 1fr;
}

.track__inner {
  overflow: hidden;
}

.track__detail {
  display: grid;
  gap: var(--m);
  padding-bottom: calc(var(--m) * 1.5);
  opacity: 0;
  transform: translateY(-6px);
  transition:
    opacity 320ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 420ms cubic-bezier(0.16, 1, 0.3, 1);
}

@media (min-width: 1024px) {
  .track__detail {
    grid-template-columns: minmax(0, 5fr) minmax(0, 6fr) 24px;
    column-gap: calc(var(--m) * 2);
  }

  .track__techs {
    grid-column: 1;
    align-content: start;
  }

  .track__goal,
  .track__link {
    grid-column: 2;
    grid-row: 1;
  }
}

.track--open .track__detail {
  opacity: 1;
  transform: none;
  transition-delay: 120ms;
}

.track__techs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 8px;
}

.track__tech {
  font-family: B612, system-ui, sans-serif;
  font-size: 0.75rem;
  line-height: 1.5;
  padding: 3px 8px;
  background: #1b2427;
  color: #e8e8e8;
}

.track__goal {
  color: #1b2427;
  max-width: 68ch;
}

.track__goal-label {
  display: block;
  margin-bottom: 10px;
  color: #006480;
}

.track__link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  align-self: start;
  justify-self: start;
  min-height: 44px;
  font-family: 'Chakra Petch', system-ui, sans-serif;
  font-weight: 500;
  color: #006480;
  text-decoration: underline;
}
</style>
