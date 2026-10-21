<script setup lang="ts">
import { SEASON_SWATCH } from '@/data/seasons'

const { t } = useI18n()
const { links } = useThemeLocation()
const NuxtLink = resolveComponent('NuxtLink')
</script>

<template>
  <section id="themes" class="px-section themes">
    <div class="px-wrap">
      <h2 v-arrive class="px-heading">
        {{ t('themes.title') }}
      </h2>

      <ul class="cards">
        <li v-for="item in links" :key="item.slug">
          <component
            :is="item.current ? 'div' : NuxtLink"
            :to="item.current ? undefined : item.href"
            class="card px-frame"
            :class="{ 'card--current': item.current }"
            :style="{ '--swatch': SEASON_SWATCH[item.season] }"
            :aria-current="item.current ? 'page' : undefined"
          >
            <p class="px-label card__season">
              <span class="card__swatch" aria-hidden="true" />
              {{ t(`seasons.${item.season}`) }}
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
            <span v-if="item.current" class="px-label card__badge">{{ t('themes.current') }}</span>
            <span v-else class="px-label card__open">
              <BitmapPixelIcon name="arrow-out" />
              {{ t('themes.open') }}
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

.cards {
  display: grid;
  gap: calc(var(--cell) * 2);
  margin-top: calc(var(--cell) * 6);
}

.card {
  display: flex;
  flex-direction: column;
  gap: calc(var(--cell) * 2);
  height: 100%;
  padding: calc(var(--cell) * 2);
  background: #0e1116;
  transition: transform calc(var(--step) * 2) steps(2, end);
}

a.card:hover {
  transform: translateY(-4px);
  border-image: var(--frame-wisteria) 4 / 4px stretch;
}

.card.card--current {
  border-image: var(--frame-wisteria) 4 / 4px stretch;
}

.card__season {
  display: inline-flex;
  align-items: center;
  gap: var(--cell);
  color: #ece0fb;
}

.card__swatch {
  width: 12px;
  height: 12px;
  background: var(--swatch);
  box-shadow: 4px 4px 0 #374a67;
}

.card__frame {
  display: block;
  overflow: hidden;
  aspect-ratio: 16 / 10;
  background: #374a67;
  border: 4px solid #374a67;
}

.card__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card__name {
  font-family: 'Pixelify Sans', system-ui, sans-serif;
  font-weight: 600;
  font-size: 1.375rem;
  line-height: 1.15;
  color: #cb9cf2;
}

.card__text {
  font-size: 0.9375rem;
  line-height: 1.55;
  color: #9e7b9b;
  text-wrap: pretty;
}

.card__badge,
.card__open {
  display: inline-flex;
  align-items: center;
  gap: var(--cell);
  align-self: flex-start;
  margin-top: auto;
  min-height: 40px;
  padding: 0 0.75rem;
}

.card__badge {
  color: #0e1116;
  border: 4px solid transparent;
  border-image: var(--fill-wisteria) 4 fill / 4px stretch;
}

.card__open {
  color: #cb9cf2;
  border: 4px solid transparent;
  border-image: var(--frame-wisteria) 4 / 4px stretch;
}

a.card:hover .card__open {
  color: #0e1116;
  border-image: var(--fill-wisteria) 4 fill / 4px stretch;
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
