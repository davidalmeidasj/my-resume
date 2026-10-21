<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'

const { t } = useI18n()

const autoplay = ref(2500)

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
  <section id="skills" class="hud-section hud-band skills-band">
    <div class="skills">
      <h2 class="hud-heading" data-lock-heading>
        {{ t('skills.title') }}
      </h2>

      <div class="skills__tape">
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
          class="w-full"
        >
          <Slide v-for="skill in skills" :key="skill.label">
            <div class="skill">
              <Icon :name="skill.icon" class="skill__icon" aria-hidden="true" />
              <span class="skill__label">{{ skill.label }}</span>
            </div>
          </Slide>
        </Carousel>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-band {
  background-color: #dcdfe0;
  border-block: 1px solid rgb(110 126 134 / 0.45);
}

.skills {
  max-width: 80rem;
  margin-inline: auto;
}

.skills__tape {
  position: relative;
  margin-top: calc(var(--m) * 2);
  border-block: 1px solid #6e7e86;
  background:
    repeating-linear-gradient(90deg, #6e7e86 0 1px, transparent 1px var(--m)) top / 100% 8px
      no-repeat,
    repeating-linear-gradient(90deg, #6e7e86 0 1px, transparent 1px var(--m)) bottom / 100% 8px
      no-repeat;
}

.skills__tape :deep(.carousel__viewport) {
  mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
}

.skill {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: calc(var(--m) * 1.5) var(--m);
}

.skill__icon {
  width: 36px;
  height: 36px;
  color: #3f4c52;
  transition: color 240ms cubic-bezier(0.16, 1, 0.3, 1);
}

.skill:hover .skill__icon {
  color: #00799b;
}

.skill__label {
  font-family: B612, system-ui, sans-serif;
  font-size: 0.8125rem;
  color: #1b2427;
}
</style>
