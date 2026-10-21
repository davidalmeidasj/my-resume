<script setup lang="ts">
import { LOCALES, type Locale } from '@/config/site'

const { locale, t } = useI18n()
const switchLocale = useLocaleSwitch()
const section = useSeasonSection()
const season = useSeason()
const mobileMenuOpen = useSeasonMenu()

const SECTIONS = ['home', 'about', 'projects', 'contact'] as const

const switchLang = (lang: Locale) => {
  mobileMenuOpen.value = false
  switchLocale(lang)
}

const closeMenu = () => {
  mobileMenuOpen.value = false
}

const onKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape') closeMenu()
}

watch(mobileMenuOpen, (value) => document.body.classList.toggle('season-locked', value))

onMounted(() => window.addEventListener('keydown', onKey))

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  document.body.classList.remove('season-locked')
})
</script>

<template>
  <header class="bar">
    <div class="bar__inner">
      <BrandLogo @click="closeMenu" />

      <p class="bar__season">
        <SeasonWheel :season="season" />
        <span>{{ t(`seasons.${season}`) }}</span>
      </p>

      <nav class="bar__nav" :aria-label="t('a11y.menu')">
        <a
          v-for="id in SECTIONS"
          :key="id"
          :href="`#${id}`"
          class="bar__link"
          :aria-current="section === id ? 'location' : undefined"
          @click="closeMenu"
        >
          {{ t(`menu.${id}`) }}
        </a>
      </nav>

      <div class="bar__locales">
        <button
          v-for="lang in LOCALES"
          :key="lang"
          type="button"
          class="bar__locale"
          :lang="lang"
          :aria-current="locale === lang ? 'true' : undefined"
          @click="switchLang(lang)"
        >
          {{ lang.toUpperCase() }}
        </button>
      </div>

      <button
        type="button"
        class="bar__toggle"
        :aria-label="t('a11y.menu')"
        :aria-expanded="mobileMenuOpen"
        aria-controls="mobile-menu"
        @click="mobileMenuOpen = !mobileMenuOpen"
      >
        <span
          class="bar__burger"
          :class="{ 'bar__burger--open': mobileMenuOpen }"
          aria-hidden="true"
        >
          <span />
          <span />
        </span>
      </button>
    </div>

    <Transition name="drawer">
      <div v-if="mobileMenuOpen" id="mobile-menu" class="drawer">
        <nav class="drawer__nav" :aria-label="t('a11y.menu')">
          <a
            v-for="id in SECTIONS"
            :key="id"
            :href="`#${id}`"
            class="drawer__link"
            :aria-current="section === id ? 'location' : undefined"
            @click="closeMenu"
          >
            {{ t(`menu.${id}`) }}
          </a>
        </nav>
        <div class="drawer__locales">
          <button
            v-for="lang in LOCALES"
            :key="lang"
            type="button"
            class="bar__locale"
            :lang="lang"
            :aria-current="locale === lang ? 'true' : undefined"
            @click="switchLang(lang)"
          >
            {{ lang.toUpperCase() }}
          </button>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.bar {
  position: fixed;
  inset: 0 0 auto;
  z-index: 50;
  background: var(--color-paper);
  border-bottom: 1.5px solid var(--color-tree-trunk);
}

.bar__inner {
  height: calc(var(--bar) - 1.5px);
  max-width: calc(76rem + var(--gutter) * 2);
  margin-inline: auto;
  padding-inline: var(--gutter);
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.bar__season {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem 0.25rem 0.375rem;
  border: 1.5px solid var(--color-tree-trunk);
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-left: auto;
}

.bar__nav {
  display: none;
  gap: 2rem;
}

.bar__link {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 44px;
  font-weight: 500;
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  transition: color 240ms var(--ease-out);
}

.bar__link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 8px;
  height: 2px;
  border-radius: 2px;
  background: var(--color-spring-deep);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 360ms var(--ease-out);
}

.bar__link:hover,
.bar__link[aria-current='location'] {
  color: var(--color-tree-trunk);
}

.bar__link:hover::after,
.bar__link[aria-current='location']::after {
  transform: scaleX(1);
}

.bar__locales {
  display: none;
  gap: 0.25rem;
}

.bar__locale {
  min-width: 44px;
  min-height: 44px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
}

.bar__locale:hover {
  color: var(--color-tree-trunk);
}

.bar__locale[aria-current='true'] {
  background: var(--color-tree-trunk);
  color: var(--color-paper);
}

.bar__toggle {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  margin-right: -12px;
}

.bar__burger {
  position: relative;
  width: 22px;
  height: 12px;
}

.bar__burger span {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  border-radius: 2px;
  background: var(--color-tree-trunk);
  transition:
    transform 320ms var(--ease-out),
    top 320ms var(--ease-out);
}

.bar__burger span:first-child {
  top: 0;
}

.bar__burger span:last-child {
  top: 10px;
}

.bar__burger--open span:first-child {
  top: 5px;
  transform: rotate(45deg);
}

.bar__burger--open span:last-child {
  top: 5px;
  transform: rotate(-45deg);
}

.drawer {
  height: calc(100dvh - var(--bar));
  overflow-y: auto;
  padding: 2rem var(--gutter);
  background: var(--color-paper);
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.drawer__nav {
  display: grid;
}

.drawer__link {
  display: flex;
  align-items: center;
  min-height: 64px;
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
  font-weight: 700;
  font-size: 2rem;
  letter-spacing: -0.02em;
  border-bottom: 1.5px solid var(--color-border);
}

.drawer__link[aria-current='location'] {
  color: var(--color-spring-deep);
}

.drawer__locales {
  display: flex;
  gap: 0.5rem;
}

.drawer-enter-active,
.drawer-leave-active {
  transition:
    opacity 280ms var(--ease-out),
    transform 280ms var(--ease-out);
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

@media (min-width: 1024px) {
  .bar__nav,
  .bar__locales {
    display: flex;
  }

  .bar__season {
    margin-left: 0;
  }

  .bar__nav {
    margin-left: auto;
  }

  .bar__toggle,
  .drawer {
    display: none;
  }
}

@media (max-width: 380px) {
  .bar__season span {
    display: none;
  }

  .bar__season {
    padding-right: 0.375rem;
  }
}
</style>
