<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const skills = [
  { label: 'Vue.js', icon: '/assets/icons/vuedotjs.svg' },
  { label: 'React', icon: '/assets/icons/react.svg' },
  { label: 'Next.js', icon: '/assets/icons/nextdotjs.svg' },
  { label: 'TypeScript', icon: '/assets/icons/typescript.svg' },
  { label: 'JavaScript', icon: '/assets/icons/javascript.svg' },
  { label: 'Node.js', icon: '/assets/icons/nodedotjs.svg' },
  { label: 'PHP', icon: '/assets/icons/php.svg' },
  { label: 'Tailwind CSS', icon: '/assets/icons/tailwindcss.svg' },
  { label: 'GraphQL', icon: '/assets/icons/graphql.svg' },
  { label: 'MySQL', icon: '/assets/icons/mysql.svg' },
  { label: 'PostgreSQL', icon: '/assets/icons/postgresql.svg' },
  { label: 'Figma', icon: '/assets/icons/figma.svg' }
]

</script>

<template>
  <section id="skills" class="py-20 px-6 bg-white">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
        {{ t('skills.title') }}
      </h2>

      <div class="grid gap-6 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 place-items-center">
        <div
          v-for="(skill, index) in skills"
          :key="index"
          class="flex flex-col items-center gap-2 text-sm text-gray-700 hover:text-primary transition"
        >
          <img :src="skill.icon" :alt="skill.label" class="w-10 h-10" />
          <span>{{ skill.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
