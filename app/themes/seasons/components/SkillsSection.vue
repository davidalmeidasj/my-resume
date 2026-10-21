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
  <section id="skills" class="season season--summer skills">
    <div class="season__wrap">
      <h2 v-arrive class="season-heading">
        {{ t('skills.title') }}
      </h2>

      <ul class="tiles">
        <li v-for="skill in skills" :key="skill.label" class="tile">
          <Icon :name="skill.icon" class="tile__icon" aria-hidden="true" />
          <span class="tile__label">{{ skill.label }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.skills {
  padding-top: 2rem;
}

.tiles {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  margin-top: 2.5rem;
}

.tile {
  display: grid;
  justify-items: center;
  align-content: center;
  gap: 0.875rem;
  min-height: 8.5rem;
  padding: 1.25rem 0.75rem;
  border-radius: 1.5rem;
  background: var(--color-summer-deep);
  color: #ffffff;
  transition: transform 400ms var(--ease-out);
}

.tile:hover {
  transform: translateY(-4px) rotate(-1.5deg);
}

.tile__icon {
  width: 2.25rem;
  height: 2.25rem;
  color: var(--color-spring-leaf);
}

.tile__label {
  font-weight: 600;
  font-size: 0.9375rem;
  text-align: center;
}

@media (min-width: 640px) {
  .tiles {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 768px) {
  .tiles {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (min-width: 1280px) {
  .tiles {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
}
</style>
