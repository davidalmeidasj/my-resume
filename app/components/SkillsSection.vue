<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'

const { t } = useI18n()

const autoplay = ref(2600)

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) autoplay.value = 0
})

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
  <section id="skills" class="px-4 py-28 sm:px-6 md:py-36">
    <div class="mx-auto max-w-6xl">
      <h2
        class="text-[clamp(2.25rem,4.5vw,3.75rem)] font-extralight leading-none tracking-[-0.03em]"
      >
        {{ t('skills.title') }}
      </h2>

      <div class="fade-edges mt-16">
        <Carousel
          :key="autoplay"
          :items-to-show="2.5"
          :wrap-around="true"
          :autoplay="autoplay"
          :transition="900"
          :pause-autoplay-on-hover="true"
          :mouse-drag="true"
          :breakpoints="{
            640: { itemsToShow: 3.5 },
            768: { itemsToShow: 4.5 },
            1024: { itemsToShow: 6 },
          }"
          class="w-full"
        >
          <Slide v-for="skill in skills" :key="skill.label">
            <div class="group flex flex-col items-center gap-4 px-4 py-6">
              <Icon
                :name="skill.icon"
                class="h-10 w-10 text-mist/70 transition-colors duration-500 group-hover:text-crest"
              />
              <span class="text-sm text-haze">{{ skill.label }}</span>
            </div>
          </Slide>
        </Carousel>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-edges {
  mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
}
</style>
