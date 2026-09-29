<script setup lang="ts">
import { stackGroups } from '@/data/stack'

const { t, tm, rt } = useI18n()

// `tm` returns the raw array so paragraphs stay data instead of one blob split
// on newlines, which silently dropped text whenever the count changed.
const paragraphs = computed(() => (tm('about.paragraphs') as unknown[]).map((p) => rt(p as string)))
</script>

<template>
  <section id="about" class="bg-white px-6 py-20">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
        {{ t('about.title') }}
      </h2>

      <p class="text-lg md:text-xl text-dark font-medium leading-relaxed text-center mb-8">
        {{ t('about.lead') }}
      </p>

      <div class="grid gap-5 sm:grid-cols-2 mb-12">
        <p
          v-for="(paragraph, index) in paragraphs"
          :key="index"
          class="text-base text-muted leading-relaxed"
        >
          {{ paragraph }}
        </p>
      </div>

      <h3 class="text-sm font-semibold uppercase tracking-widest text-muted text-center mb-6">
        {{ t('about.stackTitle') }}
      </h3>

      <dl class="grid gap-x-8 gap-y-5 sm:grid-cols-2">
        <div v-for="group in stackGroups" :key="group.key">
          <dt class="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
            {{ t(`about.stack.${group.key}`) }}
          </dt>
          <dd>
            <ul class="flex flex-wrap gap-2">
              <li
                v-for="tech in group.techs"
                :key="tech"
                class="bg-background text-dark text-xs px-2 py-1 rounded border border-primary/15"
              >
                {{ tech }}
              </li>
            </ul>
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>
