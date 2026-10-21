<script setup lang="ts">
import { LOCALES, type Locale } from '@/config/site'

const { t, locale } = useI18n()
const switchLocale = useLocaleSwitch()
const { links } = useThemeLocation()

const switchLang = (event: Event) =>
  switchLocale((event.target as HTMLSelectElement).value as Locale)

const scrollToTop = () => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
}
</script>

<template>
  <footer class="foot">
    <nav class="foot__themes px-wrap" :aria-label="t('themes.label')">
      <p class="px-label foot__themes-label">{{ t('themes.label') }}</p>
      <ul class="foot__theme-list">
        <li v-for="item in links" :key="item.slug">
          <NuxtLink
            :to="item.href"
            class="foot__theme"
            :aria-current="item.current ? 'page' : undefined"
          >
            {{ t(`themes.items.${item.slug}.name`) }}
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <div class="foot__inner px-wrap">
      <label class="foot__locale px-frame">
        <BitmapPixelIcon name="globe" class="foot__globe" />
        <select
          :value="locale"
          class="foot__select"
          :aria-label="t('a11y.language')"
          @change="switchLang"
        >
          <option v-for="lang in LOCALES" :key="lang" :value="lang" :selected="lang === locale">
            {{ lang.toUpperCase() }}
          </option>
        </select>
        <BitmapPixelIcon name="chevron" class="foot__chevron" />
      </label>

      <p class="foot__credits">© 2025 David Almeida. All rights reserved.</p>

      <button type="button" class="foot__top" aria-label="Scroll to top" @click="scrollToTop">
        <BitmapPixelIcon name="arrow-up" />
        {{ t('footer.backToTop') }}
      </button>
    </div>
  </footer>
</template>

<style scoped>
.foot__themes {
  display: grid;
  gap: calc(var(--cell) * 2);
  padding-bottom: calc(var(--cell) * 4);
  margin-bottom: calc(var(--cell) * 4);
  border-bottom: 4px solid #374a67;
}

.foot__themes-label {
  color: #9e7b9b;
}

.foot__theme-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--cell);
}

.foot__theme {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 0.875rem;
  font-weight: 700;
  font-size: 0.9375rem;
  color: #ece0fb;
  border: 4px solid transparent;
  border-image: var(--frame-grape) 4 / 4px stretch;
  transition: transform calc(var(--step) * 2) steps(2, end);
}

.foot__theme:hover {
  border-image: var(--frame-wisteria) 4 / 4px stretch;
  transform: translateY(-4px);
}

.foot__theme[aria-current='page'] {
  color: #0e1116;
  border-image: var(--fill-wisteria) 4 fill / 4px stretch;
}

.foot {
  padding: calc(var(--cell) * 6) var(--gutter);
  border-top: 4px solid #374a67;
  background: #0e1116;
}

.foot__inner {
  display: grid;
  justify-items: center;
  gap: calc(var(--cell) * 3);
}

.foot__locale {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 48px;
  padding: 0 0.75rem;
  color: #cb9cf2;
}

.foot__select {
  appearance: none;
  background: transparent;
  padding: 0 1.5rem 0 0.25rem;
  min-height: 40px;
  font-family: Silkscreen, ui-monospace, monospace;
  font-size: 0.875rem;
  color: #ece0fb;
  cursor: pointer;
}

.foot__select:focus-visible {
  outline: none;
}

.foot__locale:focus-within {
  outline: 4px solid #ece0fb;
  outline-offset: 4px;
}

.foot__select option {
  background: #0e1116;
  color: #ece0fb;
}

.foot__chevron {
  position: absolute;
  right: 0.75rem;
  pointer-events: none;
}

.foot__credits {
  font-size: 0.875rem;
  color: #9e7b9b;
  text-align: center;
}

.foot__top {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 48px;
  padding: 0 0.75rem;
  font-size: 0.9375rem;
  font-weight: 700;
  color: #cb9cf2;
  transition: transform calc(var(--step) * 2) steps(2, end);
}

.foot__top:hover {
  color: #ece0fb;
  transform: translateY(-4px);
}

@media (min-width: 768px) {
  .foot__inner {
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
  }

  .foot__locale {
    justify-self: start;
  }

  .foot__top {
    justify-self: end;
    margin-right: -0.75rem;
  }
}
</style>
