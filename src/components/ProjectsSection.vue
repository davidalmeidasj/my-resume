<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const projects = [
  {
    title: t('projects.trackmall.title'),
    description: t('projects.trackmall.description'),
    techs: ['Vue.js', 'Tailwind', 'Node.js'],
    github: 'https://github.com/seu-usuario/trackmall'
  },
  {
    title: t('projects.bookaboat.title'),
    description: t('projects.bookaboat.description'),
    techs: ['React', 'TypeScript', 'GraphQL'],
    github: 'https://github.com/seu-usuario/book-a-boat'
  },
  {
    title: t('projects.vxdoc.title'),
    description: t('projects.vxdoc.description'),
    techs: ['Next.js', 'Styled-Components', 'REST API'],
    github: 'https://github.com/seu-usuario/vxdoc'
  }
]
</script>

<template>
  <section id="projects" class="py-20 px-6 bg-gray-100">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
        {{ t('projects.title') }}
      </h2>

      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
        >
          <h3 class="text-xl font-semibold mb-2 text-gray-800">{{ project.title }}</h3>
          <p class="text-sm text-gray-600 mb-4">{{ project.description }}</p>

          <ul class="flex flex-wrap gap-2 mb-4">
            <li
              v-for="(tech, idx) in project.techs"
              :key="idx"
              class="text-xs bg-primary text-white px-2 py-1 rounded"
            >
              {{ tech }}
            </li>
          </ul>

          <a
            :href="project.github"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary hover:underline text-sm font-medium"
          >
            {{ t('projects.viewOnGitHub') }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
