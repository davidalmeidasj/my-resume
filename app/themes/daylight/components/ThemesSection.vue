<script setup lang="ts">
import { SEASON_SWATCH } from '@/data/seasons'

const { t } = useI18n()
const { links } = useThemeLocation()
const NuxtLink = resolveComponent('NuxtLink')
</script>

<template>
  <section id="themes" class="hud-section themes">
    <div class="themes__wrap">
      <h2 class="hud-heading">
        {{ t('themes.title') }}
      </h2>

      <ul class="cards">
        <li v-for="(item, index) in links" :key="item.slug">
          <component
            :is="item.current ? 'div' : NuxtLink"
            :to="item.current ? undefined : item.href"
            class="card"
            :class="{ 'card--current': item.current }"
            :style="{ '--swatch': SEASON_SWATCH[item.season] }"
            :data-lock="item.current ? undefined : ''"
            :aria-current="item.current ? 'page' : undefined"
          >
            <p class="hud-label card__readout">
              <span class="card__swatch" aria-hidden="true" />
              {{ t(`seasons.${item.season}`) }}
              <span class="card__index">{{ String(index + 1).padStart(2, '0') }}</span>
            </p>
            <span class="card__frame">
              <img
                class="card__image"
                :src="`/images/themes/${item.slug}.webp`"
                width="720"
                height="450"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </span>
            <h3 class="card__name">{{ t(`themes.items.${item.slug}.name`) }}</h3>
            <p class="card__text">{{ t(`themes.items.${item.slug}.description`) }}</p>
            <span v-if="item.current" class="hud-label card__badge">{{ t('themes.current') }}</span>
            <span v-else class="card__open">
              {{ t('themes.open') }}
              <Icon name="lucide:arrow-up-right" class="size-4" aria-hidden="true" />
            </span>
          </component>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.themes {
  padding-top: 0;
}

.themes__wrap {
  max-width: 80rem;
  margin-inline: auto;
}

.cards {
  display: grid;
  gap: var(--m);
  margin-top: calc(var(--m) * 2);
}

.card {
  display: flex;
  flex-direction: column;
  gap: calc(var(--m) * 0.75);
  height: 100%;
  padding: var(--m);
  background: #e8e8e8;
  border: 1px solid #6e7e86;
  transition: border-color 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

a.card:hover {
  border-color: #1b2427;
}

.card.card--current {
  border-color: #1b2427;
  border-width: 1.5px;
}

.card__readout {
  display: flex;
  align-items: center;
  gap: 8px;
}

.card__swatch {
  width: 10px;
  height: 10px;
  background: var(--swatch);
  outline: 1px solid #1b2427;
}

.card__index {
  margin-left: auto;
  color: #6e7e86;
}

.card__frame {
  display: block;
  overflow: hidden;
  aspect-ratio: 16 / 10;
  border: 1px solid #6e7e86;
  background: #dcdfe0;
}

.card__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
}

a.card:hover .card__image {
  transform: scale(1.03);
}

.card__name {
  font-weight: 500;
  font-size: 1.375rem;
  line-height: 1.15;
}

.card__text {
  font-size: 0.875rem;
  line-height: 1.55;
  color: #3f4c52;
  text-wrap: pretty;
}

.card__badge,
.card__open {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  align-self: flex-start;
  margin-top: auto;
  min-height: 40px;
  padding-inline: 12px;
}

.card .card__badge {
  background: #1b2427;
  color: #e8e8e8;
}

.card__open {
  font-family: 'Chakra Petch', system-ui, sans-serif;
  font-weight: 500;
  font-size: 0.9375rem;
  letter-spacing: 0.04em;
  color: #1b2427;
  border: 1.5px solid #1b2427;
  transition:
    background-color 200ms cubic-bezier(0.16, 1, 0.3, 1),
    color 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

a.card:hover .card__open {
  background: #1b2427;
  color: #e8e8e8;
}

@media (min-width: 640px) {
  .cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1280px) {
  .cards {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
