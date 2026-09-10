<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { projects } from '@/data/projects'
const { t } = useI18n()
</script>

<template>
  <section id="projects" class="bg-white px-6 py-20">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
        {{ t('projects.title') }}
      </h2>

      <div class="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(project, index) in projects"
          :key="index"
          class="bg-background p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col h-full"
        >
          <div>
            <h3 class="text-lg font-semibold text-dark mb-2">
              {{ t(project.titleKey) }}
            </h3>
            <p class="text-sm text-muted leading-relaxed mb-4">
              {{ t(project.descriptionKey) }}
            </p>
            <ul class="flex flex-wrap gap-2 mb-4">
              <li
                v-for="(tech, idx) in project.techs"
                :key="idx"
                class="bg-primary text-white text-xs px-2 py-1 rounded"
              >
                {{ tech }}
              </li>
            </ul>
          </div>

          <!-- a link is short enough to sit at the card foot; the goal text follows the chips -->
          <div v-if="project.github" class="mt-auto">
            <a
              :href="project.github"
              class="text-primary text-sm font-medium hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ t('projects.viewOnGitHub') }} →
            </a>
          </div>
          <div v-else class="text-sm text-muted leading-relaxed">
            <strong>{{ t('projects.goalLabel') }}:</strong> {{ t(project.goalKey || '') }}
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
