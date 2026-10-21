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
    <nav class="foot__themes" :aria-label="t('themes.label')">
      <p class="foot__themes-label">{{ t('themes.label') }}</p>
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

    <div class="foot__inner">
      <label class="foot__locale">
        <svg viewBox="0 0 20 20" class="foot__glyph" aria-hidden="true" focusable="false">
          <circle cx="10" cy="10" r="7.5" />
          <path d="M2.5 10 H17.5 M10 2.5 C7 6 7 14 10 17.5 C13 14 13 6 10 2.5" />
        </svg>
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
        <svg viewBox="0 0 20 20" class="foot__chevron" aria-hidden="true" focusable="false">
          <path d="M6 8 L10 12 L14 8" />
        </svg>
      </label>

      <p class="foot__credits">© 2025 David Almeida. All rights reserved.</p>

      <button type="button" class="foot__top" aria-label="Scroll to top" @click="scrollToTop">
        <svg viewBox="0 0 20 20" class="foot__glyph" aria-hidden="true" focusable="false">
          <path d="M10 16 V4 M5 9 L10 4 L15 9" />
        </svg>
        {{ t('footer.backToTop') }}
      </button>
    </div>
  </footer>
</template>

<style scoped>
.foot {
  padding: 2.5rem var(--gutter);
  background: var(--color-tree-trunk);
  color: #f3ede6;
  --color-focus: #f3ede6;
}

.foot__themes {
  max-width: 76rem;
  margin: 0 auto 1.75rem;
  padding-bottom: 1.75rem;
  display: grid;
  gap: 0.75rem;
  border-bottom: 1px solid rgb(243 237 230 / 0.2);
}

.foot__themes-label {
  font-weight: 600;
  font-size: 0.875rem;
  color: #cfc3bb;
}

.foot__theme-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.foot__theme {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 1rem;
  border-radius: 999px;
  border: 1.5px solid rgb(243 237 230 / 0.45);
  font-weight: 600;
  font-size: 0.875rem;
  transition:
    background-color 260ms var(--ease-out),
    color 260ms var(--ease-out);
}

.foot__theme:hover {
  background: rgb(243 237 230 / 0.12);
}

.foot__theme[aria-current='page'] {
  background: #f3ede6;
  border-color: #f3ede6;
  color: var(--color-tree-trunk);
}

.foot__inner {
  max-width: 76rem;
  margin-inline: auto;
  display: grid;
  justify-items: center;
  gap: 1.25rem;
}

.foot__glyph,
.foot__chevron {
  width: 1.125rem;
  height: 1.125rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.75;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.foot__locale {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 44px;
  padding: 0 0.875rem;
  border: 1.5px solid rgb(243 237 230 / 0.45);
  border-radius: 999px;
}

.foot__locale:focus-within {
  outline: 3px solid var(--color-paper);
  outline-offset: 3px;
}

.foot__select {
  appearance: none;
  background: transparent;
  padding: 0 1.5rem 0 0.125rem;
  min-height: 40px;
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--color-paper);
  cursor: pointer;
}

.foot__select:focus-visible {
  outline: none;
}

.foot__select option {
  background: var(--color-tree-trunk);
  color: var(--color-paper);
}

.foot__chevron {
  position: absolute;
  right: 0.75rem;
  pointer-events: none;
}

.foot__credits {
  font-size: 0.875rem;
  color: #cfc3bb;
  text-align: center;
}

.foot__top {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 44px;
  padding: 0 0.875rem;
  font-weight: 600;
  font-size: 0.9375rem;
  border-radius: 999px;
  transition: background-color 260ms var(--ease-out);
}

.foot__top:hover {
  background: rgb(243 237 230 / 0.12);
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
    margin-right: -0.875rem;
  }
}
</style>
