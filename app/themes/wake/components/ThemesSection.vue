<script setup lang="ts">
import { SEASON_SWATCH } from '@/data/seasons'

const { t } = useI18n()
const { links } = useThemeLocation()
const NuxtLink = resolveComponent('NuxtLink')
</script>

<template>
  <section id="themes" class="px-4 pb-28 sm:px-6 md:pb-36">
    <div class="mx-auto max-w-6xl">
      <h2
        class="text-[clamp(2.25rem,4.5vw,3.75rem)] font-extralight leading-none tracking-[-0.03em]"
      >
        {{ t('themes.title') }}
      </h2>

      <ul class="mt-16 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <li v-for="item in links" :key="item.slug">
          <component
            :is="item.current ? 'div' : NuxtLink"
            :to="item.current ? undefined : item.href"
            class="card group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border p-5 transition-colors duration-500"
            :class="
              item.current
                ? 'border-wake-crest/60 bg-wake-deep/60'
                : 'border-wake-line bg-wake-deep/40 hover:border-wake-haze/40'
            "
            :style="{ '--swatch': SEASON_SWATCH[item.season] }"
            :aria-current="item.current ? 'page' : undefined"
          >
            <p class="flex items-center gap-2.5 text-sm text-wake-haze">
              <span class="card__glow h-2 w-2 rounded-full" aria-hidden="true" />
              {{ t(`seasons.${item.season}`) }}
            </p>
            <span class="block aspect-[16/10] overflow-hidden rounded-2xl bg-wake-abyss">
              <img
                class="h-full w-full object-cover opacity-90 transition duration-700 ease-out-expo group-hover:scale-[1.03] group-hover:opacity-100"
                :src="`/images/themes/${item.slug}.webp`"
                width="720"
                height="450"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </span>
            <h3 class="text-xl font-light tracking-[-0.02em] text-wake-mist">
              {{ t(`themes.items.${item.slug}.name`) }}
            </h3>
            <p class="text-sm leading-relaxed text-wake-haze">
              {{ t(`themes.items.${item.slug}.description`) }}
            </p>
            <span
              v-if="item.current"
              class="mt-auto inline-flex h-10 items-center self-start rounded-full bg-wake-crest/15 px-4 text-sm text-wake-crest"
            >
              {{ t('themes.current') }}
            </span>
            <span
              v-else
              class="mt-auto inline-flex h-10 items-center gap-2 self-start rounded-full border border-wake-line px-4 text-sm text-wake-mist transition-colors duration-500 group-hover:border-wake-crest group-hover:text-wake-crest"
            >
              {{ t('themes.open') }}
              <Icon
                name="lucide:arrow-up-right"
                class="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </component>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.card::before {
  content: '';
  @apply absolute left-0 top-[-1px] h-px w-full origin-left scale-x-0 bg-wake-crest transition-transform duration-[600ms] ease-out-expo;
}

a.card:hover::before,
a.card:focus-visible::before {
  @apply scale-x-100;
}

.card__glow {
  background: var(--swatch);
  box-shadow: 0 0 12px var(--swatch);
}
</style>
