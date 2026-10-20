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

const autoplay = ref(2500)

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) autoplay.value = 0
})
</script>

<template>
  <section id="skills" class="px-section">
    <div class="px-wrap">
      <h2 v-arrive class="px-heading">
        {{ t('skills.title') }}
      </h2>

      <Carousel
        :key="autoplay"
        :items-to-show="2"
        :wrap-around="true"
        :autoplay="autoplay"
        :pause-autoplay-on-hover="true"
        :mouse-drag="true"
        :breakpoints="{
          640: { itemsToShow: 3 },
          768: { itemsToShow: 5 },
          1024: { itemsToShow: 6 },
        }"
        class="glyphset"
      >
        <Slide v-for="skill in skills" :key="skill.label">
          <div class="glyph px-frame">
            <Icon :name="skill.icon" class="glyph__icon" />
            <span class="glyph__label">{{ skill.label }}</span>
          </div>
        </Slide>
      </Carousel>
    </div>
  </section>
</template>

<style scoped>
.glyphset {
  margin-top: calc(var(--cell) * 6);
}

.glyphset :deep(.carousel__track) {
  transition-timing-function: steps(6, end) !important;
}

.glyph {
  display: grid;
  justify-items: center;
  align-content: center;
  gap: calc(var(--cell) * 2);
  width: calc(100% - var(--cell) * 2);
  min-height: calc(var(--cell) * 18);
  padding: calc(var(--cell) * 2);
}

.glyph__icon {
  width: 40px;
  height: 40px;
  color: #ece0fb;
}

.glyph:hover .glyph__icon {
  color: #cb9cf2;
}

.glyph__label {
  font-size: 0.875rem;
  color: #9e7b9b;
  text-align: center;
}
</style>
