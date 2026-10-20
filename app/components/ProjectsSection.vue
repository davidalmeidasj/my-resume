<script setup lang="ts">
import { projects } from '@/data/projects'

const { t } = useI18n()
</script>

<template>
  <section id="projects" class="px-4 py-28 sm:px-6 md:py-36">
    <div class="mx-auto max-w-6xl">
      <h2
        class="text-[clamp(2.25rem,4.5vw,3.75rem)] font-extralight leading-none tracking-[-0.03em]"
      >
        {{ t('projects.title') }}
      </h2>

      <div class="mt-16">
        <article
          v-for="(project, index) in projects"
          :key="project.titleKey"
          class="project group grid gap-8 border-t border-line py-12 lg:grid-cols-12 lg:gap-12"
          :class="{ 'lg:py-16': index === 0 }"
        >
          <div class="lg:col-span-5">
            <h3
              class="font-light tracking-[-0.02em] transition-colors duration-500 group-hover:text-crest"
              :class="
                index === 0
                  ? 'text-[clamp(2rem,3.5vw,2.75rem)] leading-tight'
                  : 'text-[clamp(1.5rem,2.4vw,1.875rem)] leading-snug'
              "
            >
              {{ t(project.titleKey) }}
            </h3>
            <p class="mt-4 max-w-[52ch] leading-relaxed text-haze">
              {{ t(project.descriptionKey) }}
            </p>
            <ul class="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-[13px] text-mist/85">
              <li v-for="tech in project.techs" :key="tech" class="flex items-center gap-2">
                <span class="h-1 w-1 rounded-full bg-crest" aria-hidden="true" />
                {{ tech }}
              </li>
            </ul>
          </div>

          <div class="lg:col-span-7">
            <a
              v-if="project.github"
              :href="project.github"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex min-h-[44px] items-center gap-2 font-display text-sm tracking-[0.08em] text-signal hover:text-mist"
            >
              {{ t('projects.viewOnGitHub') }}
              <Icon name="lucide:arrow-up-right" class="h-4 w-4" />
            </a>
            <div v-else-if="project.goalKey">
              <p class="font-display text-xs uppercase tracking-[0.25em] text-crest">
                {{ t('projects.goalLabel') }}
              </p>
              <p
                class="mt-4 max-w-[36rem] leading-relaxed text-haze"
                :class="{ 'text-mist/90 md:text-lg': index === 0 }"
              >
                {{ t(project.goalKey) }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
