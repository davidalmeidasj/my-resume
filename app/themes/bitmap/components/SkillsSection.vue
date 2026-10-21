<script setup lang="ts">
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
  <section id="skills" class="px-section">
    <div class="px-wrap">
      <h2 v-arrive class="px-heading">
        {{ t('skills.title') }}
      </h2>

      <ul class="glyphset">
        <li v-for="skill in skills" :key="skill.label" class="glyph px-frame">
          <Icon :name="skill.icon" class="glyph__icon" aria-hidden="true" />
          <span class="glyph__label">{{ skill.label }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.glyphset {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: calc(var(--cell) * 2);
  margin-top: calc(var(--cell) * 6);
}

.glyph {
  display: grid;
  justify-items: center;
  align-content: center;
  gap: calc(var(--cell) * 2);
  min-height: calc(var(--cell) * 16);
  padding: calc(var(--cell) * 2);
}

.glyph__icon {
  width: 32px;
  height: 32px;
  color: #ece0fb;
  transition: transform calc(var(--step) * 2) steps(2, end);
}

.glyph:hover .glyph__icon {
  color: #cb9cf2;
  transform: translateY(-4px);
}

.glyph__label {
  font-size: 0.875rem;
  color: #9e7b9b;
  text-align: center;
}

@media (min-width: 640px) {
  .glyphset {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 768px) {
  .glyphset {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .glyphset {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
}
</style>
