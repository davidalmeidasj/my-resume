<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'

const { t } = useI18n()

const skills = [
  { label: 'Vue.js', icon: 'simple-icons:vuedotjs' },
  { label: 'React', icon: 'simple-icons:react' },
  { label: 'Next.js', icon: 'simple-icons:nextdotjs' },
  { label: 'TypeScript', icon: 'simple-icons:typescript' },
  { label: 'JavaScript', icon: 'simple-icons:javascript' },
  { label: 'Node.js', icon: 'simple-icons:nodedotjs' },
  { label: 'PHP', icon: 'simple-icons:php' },
  { label: 'Tailwind CSS', icon: 'simple-icons:tailwindcss' },
  { label: 'GraphQL', icon: 'simple-icons:graphql' },
  { label: 'MySQL', icon: 'simple-icons:mysql' },
  { label: 'PostgreSQL', icon: 'simple-icons:postgresql' },
  { label: 'Figma', icon: 'simple-icons:figma' },
]
</script>

<template>
  <section id="skills" class="bg-white px-6 py-20">
    <div class="max-w-6xl mx-auto text-center">
      <h2 class="text-3xl md:text-4xl font-bold text-primary mb-12">
        {{ t('skills.title') }}
      </h2>

      <Carousel
        :items-to-show="2"
        :wrap-around="true"
        :autoplay="2500"
        :pause-autoplay-on-hover="true"
        :mouse-drag="true"
        :breakpoints="{
          640: { itemsToShow: 3 },
          768: { itemsToShow: 5 },
          1024: { itemsToShow: 6 },
        }"
        class="w-full"
      >
        <Slide v-for="(skill, index) in skills" :key="index">
          <div class="flex flex-col items-center justify-center gap-2 px-4 py-6">
            <Icon :name="skill.icon" class="w-10 h-10 text-black" />
            <span class="text-sm text-muted">{{ skill.label }}</span>
          </div>
        </Slide>
      </Carousel>
    </div>
  </section>
</template>
