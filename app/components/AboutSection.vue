<script setup lang="ts">
import { stackGroups } from '@/data/stack'

const { t, tm, rt } = useI18n()

const paragraphs = computed(() => (tm('about.paragraphs') as unknown[]).map((p) => rt(p as string)))
</script>

<template>
  <section id="about" class="px-4 py-28 sm:px-6 md:py-36">
    <div class="mx-auto max-w-6xl">
      <div class="grid gap-12 lg:grid-cols-12">
        <h2
          class="text-[clamp(2.25rem,4.5vw,3.75rem)] font-extralight leading-none tracking-[-0.03em] lg:col-span-4"
        >
          {{ t('about.title') }}
        </h2>

        <div class="lg:col-span-8">
          <p
            class="font-display text-[clamp(1.375rem,2.4vw,1.875rem)] font-light leading-snug text-mist"
          >
            {{ t('about.lead') }}
          </p>

          <div class="mt-12 grid gap-x-10 gap-y-6 md:grid-cols-2">
            <p
              v-for="(paragraph, index) in paragraphs"
              :key="index"
              class="max-w-[36rem] leading-relaxed text-haze"
            >
              {{ paragraph }}
            </p>
          </div>
        </div>
      </div>

      <div class="mt-24 border-t border-line pt-12">
        <h3 class="text-2xl font-light tracking-[-0.02em]">{{ t('about.stackTitle') }}</h3>

        <dl class="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="group in stackGroups" :key="group.key">
            <dt class="font-display text-xs uppercase tracking-[0.25em] text-crest">
              {{ t(`about.stack.${group.key}`) }}
            </dt>
            <dd class="mt-4">
              <ul class="flex flex-wrap gap-2">
                <li
                  v-for="tech in group.techs"
                  :key="tech"
                  class="rounded-full border border-line px-3 py-1 text-[13px] text-mist/90 transition-colors duration-300 hover:border-crest/60 hover:text-mist"
                >
                  {{ tech }}
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>
