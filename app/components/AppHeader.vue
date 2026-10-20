<script setup lang="ts">
import { LOCALES, type Locale } from '@/config/site'
import { NAV_FOR_SECTION } from '@/composables/usePx'

const { locale, t } = useI18n()
const switchLocale = useLocaleSwitch()
const active = usePxActive()
const mobileMenuOpen = usePxMenu()

const SECTIONS = ['home', 'about', 'projects', 'contact'] as const

const current = computed(() => NAV_FOR_SECTION[active.value])

const links = ref<HTMLAnchorElement[]>([])
const marker = reactive({ x: 0, width: 0, ready: false })

const place = () => {
  const index = SECTIONS.indexOf(current.value as (typeof SECTIONS)[number])
  const link = links.value[index]
  if (!link) return
  marker.x = link.offsetLeft
  marker.width = link.offsetWidth
  marker.ready = true
}

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

watch(current, () => nextTick(place))
watch(locale, () => nextTick(place))
watch(mobileMenuOpen, (value) => document.body.classList.toggle('px-locked', value))

onMounted(() => {
  place()
  document.fonts?.ready.then(place)
  window.addEventListener('resize', place, { passive: true })
  window.addEventListener('keydown', onKey)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', place)
  window.removeEventListener('keydown', onKey)
  document.body.classList.remove('px-locked')
})
</script>

<template>
  <header class="bar">
    <div class="bar__inner">
      <BrandLogo @click="closeMenu" />

      <nav class="bar__nav" :aria-label="t('a11y.menu')">
        <a
          v-for="id in SECTIONS"
          :key="id"
          ref="links"
          :href="`#${id}`"
          class="bar__link"
          :aria-current="current === id ? 'location' : undefined"
          @click="closeMenu"
        >
          {{ t(`menu.${id}`) }}
        </a>
        <span
          class="bar__marker"
          :class="{ 'bar__marker--ready': marker.ready }"
          :style="{ transform: `translateX(${marker.x}px)`, width: `${marker.width}px` }"
          aria-hidden="true"
        />
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
        <svg
          viewBox="0 0 7 7"
          width="21"
          height="21"
          shape-rendering="crispEdges"
          aria-hidden="true"
          focusable="false"
        >
          <g v-if="!mobileMenuOpen">
            <rect x="0" y="1" width="7" height="1" />
            <rect x="0" y="3" width="7" height="1" />
            <rect x="0" y="5" width="7" height="1" />
          </g>
          <g v-else>
            <rect x="0" y="0" width="1" height="1" />
            <rect x="1" y="1" width="1" height="1" />
            <rect x="2" y="2" width="3" height="3" />
            <rect x="5" y="1" width="1" height="1" />
            <rect x="6" y="0" width="1" height="1" />
            <rect x="1" y="5" width="1" height="1" />
            <rect x="0" y="6" width="1" height="1" />
            <rect x="5" y="5" width="1" height="1" />
            <rect x="6" y="6" width="1" height="1" />
          </g>
        </svg>
      </button>
    </div>

    <Transition name="drop">
      <div v-if="mobileMenuOpen" id="mobile-menu" class="drawer">
        <nav class="drawer__nav" :aria-label="t('a11y.menu')">
          <a
            v-for="id in SECTIONS"
            :key="id"
            :href="`#${id}`"
            class="drawer__link"
            :aria-current="current === id ? 'location' : undefined"
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
  --bar: 72px;
  position: fixed;
  inset: 0 0 auto;
  z-index: 50;
  background: #0e1116;
  border-bottom: 4px solid #374a67;
}

.bar__inner {
  max-width: calc(80rem + var(--gutter) * 2);
  height: calc(var(--bar) - 4px);
  margin-inline: auto;
  padding-inline: var(--gutter);
  display: flex;
  align-items: center;
  gap: calc(var(--cell) * 4);
}

.bar__nav {
  position: relative;
  display: none;
  gap: calc(var(--cell) * 4);
  margin-left: auto;
  align-self: stretch;
}

.bar__link {
  display: flex;
  align-items: center;
  align-self: center;
  min-height: 44px;
  padding-inline: 0.25rem;
  color: #9e7b9b;
  font-size: 0.9375rem;
  transition: color calc(var(--step) * 2) steps(2, end);
}

.bar__link:hover,
.bar__link[aria-current='location'] {
  color: #ece0fb;
}

.bar__marker {
  position: absolute;
  left: 0;
  bottom: -4px;
  height: 4px;
  background: #cb9cf2;
  opacity: 0;
  transition:
    transform calc(var(--step) * 6) steps(6, end),
    width calc(var(--step) * 6) steps(6, end);
}

.bar__marker--ready {
  opacity: 1;
}

.bar__locales {
  display: none;
  gap: var(--cell);
}

.bar__locale {
  min-width: 44px;
  min-height: 44px;
  padding: 0 0.5rem;
  font-family: Silkscreen, ui-monospace, monospace;
  font-size: 0.8125rem;
  color: #9e7b9b;
  border: 4px solid transparent;
}

.bar__locale:hover {
  color: #ece0fb;
}

.bar__locale[aria-current='true'] {
  color: #cb9cf2;
  border-image: var(--frame-wisteria) 4 / 4px stretch;
}

.bar__toggle {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  margin-left: auto;
  margin-right: -12px;
  color: #cb9cf2;
  fill: currentColor;
}

.drawer {
  height: calc(100dvh - var(--bar));
  overflow-y: auto;
  padding: calc(var(--cell) * 6) var(--gutter);
  background: #0e1116;
  background-image: var(--dots);
  display: flex;
  flex-direction: column;
  gap: calc(var(--cell) * 6);
}

.drawer__nav {
  display: grid;
}

.drawer__link {
  display: flex;
  align-items: center;
  min-height: 64px;
  font-family: 'Pixelify Sans', system-ui, sans-serif;
  font-weight: 600;
  font-size: 2rem;
  color: #9e7b9b;
  border-bottom: 4px solid #374a67;
}

.drawer__link[aria-current='location'] {
  color: #cb9cf2;
}

.drawer__locales {
  display: flex;
  gap: var(--cell);
  margin-left: -0.5rem;
}

.drop-enter-active,
.drop-leave-active {
  transition: clip-path calc(var(--step) * 6) steps(6, end);
}

.drop-enter-from,
.drop-leave-to {
  clip-path: inset(0 0 100% 0);
}

.drop-enter-to,
.drop-leave-from {
  clip-path: inset(0 0 0 0);
}

@media (min-width: 1024px) {
  .bar__nav,
  .bar__locales {
    display: flex;
  }

  .bar__toggle,
  .drawer {
    display: none;
  }
}
</style>
