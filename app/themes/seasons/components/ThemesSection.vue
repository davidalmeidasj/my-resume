<script setup lang="ts">
const { t } = useI18n()
const { links } = useThemeLocation()
const NuxtLink = resolveComponent('NuxtLink')
</script>

<template>
  <section id="themes" class="season season--summer themes">
    <div class="season__wrap">
      <h2 v-arrive class="season-heading themes__heading">
        {{ t('themes.title') }}
      </h2>

      <ul class="cards">
        <li v-for="item in links" :key="item.slug" class="cards__item">
          <component
            :is="item.current ? 'div' : NuxtLink"
            :to="item.current ? undefined : item.href"
            class="card"
            :class="[`card--${item.season}`, { 'card--current': item.current }]"
            :aria-current="item.current ? 'page' : undefined"
          >
            <p class="card__season">
              <SeasonsWheel :season="item.season" color="var(--card-mark)" />
              <span>{{ t(`seasons.${item.season}`) }}</span>
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
            <span v-if="item.current" class="card__badge">{{ t('themes.current') }}</span>
            <span v-else class="card__open">
              {{ t('themes.open') }}
              <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                <path d="M6 14 L14 6 M7 6 H14 V13" />
              </svg>
            </span>
          </component>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.themes {
  padding-top: 2rem;
}

.themes__heading {
  max-width: 18ch;
}

.cards {
  display: grid;
  gap: 1rem;
  margin-top: 2.5rem;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  height: 100%;
  padding: 1.25rem;
  border-radius: 1.75rem;
  background: var(--card-ground);
  color: var(--card-ink);
  transition: transform 420ms var(--ease-out);
}

.card--spring {
  --card-ground: var(--color-spring-ground);
  --card-ink: var(--color-tree-trunk);
  --card-soft: var(--color-text-secondary);
  --card-mark: var(--color-spring-blossom);
}

.card--summer {
  --card-ground: var(--color-spring-leaf);
  --card-ink: var(--color-summer-deep);
  --card-soft: #1e4a2c;
  --card-mark: var(--color-summer-emerald);
}

.card--autumn {
  --card-ground: var(--color-autumn-orange);
  --card-ink: var(--color-tree-trunk);
  --card-soft: #4a2e22;
  --card-mark: var(--color-autumn-rust);
}

.card--winter {
  --card-ground: var(--color-winter-ice);
  --card-ink: var(--color-winter-slate);
  --card-soft: #56677a;
  --card-mark: var(--color-winter-steel);
}

a.card:hover {
  transform: translateY(-6px);
}

.card__season {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
}

.card__frame {
  display: block;
  overflow: hidden;
  border-radius: 1rem;
  aspect-ratio: 16 / 10;
  background: var(--card-ink);
}

.card__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 700ms var(--ease-out);
}

a.card:hover .card__image {
  transform: scale(1.04);
}

.card__name {
  margin-top: 0.25rem;
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
  font-weight: 700;
  font-size: 1.375rem;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.card__text {
  font-size: 0.9375rem;
  line-height: 1.55;
  color: var(--card-soft);
  text-wrap: pretty;
}

.card__badge,
.card__open {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  align-self: flex-start;
  margin-top: auto;
  min-height: 2.25rem;
  padding: 0 0.875rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.875rem;
}

.card__badge {
  background: var(--card-ink);
  color: var(--card-ground);
}

.card__open {
  border: 1.5px solid currentColor;
}

.card__open svg {
  width: 1rem;
  height: 1rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  transition: transform 360ms var(--ease-out);
}

a.card:hover .card__open svg {
  transform: translate(2px, -2px);
}

a.card:focus-visible {
  outline: 3px solid #ffffff;
  outline-offset: 4px;
}

@media (min-width: 640px) {
  .cards {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1280px) {
  .cards {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
