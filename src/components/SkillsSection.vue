<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'

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
  <section id="skills" class="bg-white px-6 py-20">
    <div class="max-w-6xl mx-auto text-center">
      <h2 class="text-3xl md:text-4xl font-bold text-primary mb-12">
        {{ t('skills.title') }}
      </h2>

      <Carousel
        :itemsToShow="2"
        :wrapAround="true"
        :autoplay="2500"
        :pauseAutoplayOnHover="true"
        :mouseDrag="true"
        :breakpoints="{
          640: { itemsToShow: 3 },
          768: { itemsToShow: 5 },
          1024: { itemsToShow: 6 }
        }"
        class="w-full"
      >
        <Slide v-for="(skill, index) in skills" :key="index">
          <div class="flex flex-col items-center justify-center gap-2 px-4 py-6">
            <img :src="skill.icon" :alt="skill.label" class="w-10 h-10 object-contain" />
            <span class="text-sm text-muted">{{ skill.label }}</span>
          </div>
        </Slide>
      </Carousel>
    </div>
  </section>
</template>
