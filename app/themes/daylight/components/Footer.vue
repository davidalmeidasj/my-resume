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
      <p class="hud-label foot__themes-label">{{ t('themes.label') }}</p>
      <ul class="foot__theme-list">
        <li v-for="item in links" :key="item.slug">
          <NuxtLink
            :to="item.href"
            class="foot__theme"
            data-lock
            :aria-current="item.current ? 'page' : undefined"
          >
            {{ t(`themes.items.${item.slug}.name`) }}
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <div class="foot__row">
      <label class="foot__locale" data-lock>
        <Icon name="lucide:globe" class="size-4 text-[#00799B]" aria-hidden="true" />
        <select :value="locale" :aria-label="t('a11y.language')" @change="switchLang">
          <option v-for="lang in LOCALES" :key="lang" :value="lang" :selected="locale === lang">
            {{ lang.toUpperCase() }}
          </option>
        </select>
        <Icon
          name="lucide:chevron-down"
          class="size-4 text-[#3F4C52] pointer-events-none"
          aria-hidden="true"
        />
      </label>

      <p class="foot__credits">© 2025 David Almeida. All rights reserved.</p>

      <button type="button" class="foot__top" data-lock @click="scrollToTop">
        <Icon name="lucide:arrow-up" class="size-4" aria-hidden="true" />
        {{ t('footer.backToTop') }}
      </button>
    </div>
  </footer>
</template>

<style scoped>
.foot {
  border-top: 1px solid rgb(110 126 134 / 0.55);
  background: #dcdfe0;
  padding: calc(var(--m) * 1.5) var(--m);
}

@media (min-width: 1024px) {
  .foot {
    padding-inline: calc(var(--m) * 4);
  }
}

.foot__themes {
  display: grid;
  gap: calc(var(--m) * 0.75);
  max-width: 80rem;
  margin: 0 auto var(--m);
  padding-bottom: var(--m);
  border-bottom: 1px solid rgb(110 126 134 / 0.55);
}

.foot__themes-label {
  color: #3f4c52;
}

.foot__theme-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.foot__theme {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding-inline: 14px;
  font-family: B612, system-ui, sans-serif;
  font-weight: 700;
  font-size: 0.8125rem;
  letter-spacing: 0.06em;
  color: #1b2427;
  border: 1.5px solid #1b2427;
  transition:
    background-color 200ms cubic-bezier(0.16, 1, 0.3, 1),
    color 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

.foot__theme:hover,
.foot__theme[aria-current='page'] {
  background-color: #1b2427;
  color: #e8e8e8;
}

.foot__row {
  display: grid;
  gap: var(--m);
  justify-items: center;
  max-width: 80rem;
  margin-inline: auto;
}

@media (min-width: 768px) {
  .foot__row {
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
  }

  .foot__locale {
    justify-self: start;
  }

  .foot__top {
    justify-self: end;
    margin-right: -12px;
  }
}

.foot__locale {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding-inline: 12px;
  border: 1px solid #6e7e86;
  cursor: pointer;
}

.foot__locale select {
  appearance: none;
  background: transparent;
  font-family: B612, system-ui, sans-serif;
  font-weight: 700;
  font-size: 0.8125rem;
  letter-spacing: 0.08em;
  color: #1b2427;
  padding-right: 4px;
  cursor: pointer;
}

.foot__locale select:focus-visible {
  outline: none;
}

.foot__locale:focus-within {
  outline: 2px solid #00799b;
  outline-offset: 3px;
}

.foot__credits {
  font-size: 0.8125rem;
  color: #3f4c52;
  text-align: center;
}

.foot__top {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding-inline: 12px;
  font-family: 'Chakra Petch', system-ui, sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 0.04em;
  color: #006480;
  border: 1px solid transparent;
  transition: border-color 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

@media (max-width: 767px) {
  .foot__top {
    margin-top: -12px;
  }
}

.foot__top:hover {
  border-color: #006480;
}
</style>
