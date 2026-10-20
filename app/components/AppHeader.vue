<script setup lang="ts">
import { LOCALES, type Locale } from '@/config/site'
import { NAV_FOR_SECTION } from '@/composables/useHud'

const { locale, t } = useI18n()
const mobileMenuOpen = useHudMenu()
const switchLocale = useLocaleSwitch()
const progress = useHudProgress()
const active = useHudActive()

const SECTIONS = ['home', 'about', 'projects', 'contact'] as const

const activeNav = computed(() => NAV_FOR_SECTION[active.value])

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

watch(mobileMenuOpen, (open) => document.body.classList.toggle('hud-locked', open))

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <header class="hud-header" :style="{ '--p': progress }">
    <div class="hud-header__bar">
      <BrandLogo />

      <nav class="tape" :aria-label="t('a11y.menu')">
        <span class="tape__ticks" aria-hidden="true" />
        <a
          v-for="id in SECTIONS"
          :key="id"
          :href="`#${id}`"
          class="tape__link"
          :class="{ 'tape__link--on': activeNav === id }"
          :aria-current="activeNav === id ? 'location' : undefined"
          data-lock
          @click="closeMenu"
        >
          {{ t(`menu.${id}`) }}
        </a>
      </nav>

      <div class="keys">
        <button
          v-for="lang in LOCALES"
          :key="lang"
          type="button"
          class="keys__key"
          :lang="lang"
          :aria-current="locale === lang ? 'true' : undefined"
          data-lock
          @click="switchLang(lang)"
        >
          {{ lang.toUpperCase() }}
        </button>
      </div>

      <button
        type="button"
        class="menu-toggle"
        :aria-label="t('a11y.menu')"
        :aria-expanded="mobileMenuOpen"
        aria-controls="mobile-menu"
        @click="mobileMenuOpen = !mobileMenuOpen"
      >
        <span class="menu-toggle__bar" />
        <span class="menu-toggle__bar" />
      </button>
    </div>

    <span class="hud-header__progress" aria-hidden="true" />

    <Transition name="drop">
      <div v-if="mobileMenuOpen" id="mobile-menu" class="drawer">
        <nav class="drawer__nav" :aria-label="t('a11y.menu')">
          <a
            v-for="id in SECTIONS"
            :key="id"
            :href="`#${id}`"
            class="drawer__link"
            :class="{ 'drawer__link--on': activeNav === id }"
            @click="closeMenu"
          >
            {{ t(`menu.${id}`) }}
          </a>
          <div class="drawer__keys">
            <button
              v-for="lang in LOCALES"
              :key="lang"
              type="button"
              class="keys__key"
              :lang="lang"
              :aria-current="locale === lang ? 'true' : undefined"
              @click="switchLang(lang)"
            >
              {{ lang.toUpperCase() }}
            </button>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.hud-header {
  --bar: clamp(60px, calc(var(--m) * 3.5), 72px);
  position: fixed;
  inset: 0 0 auto;
  z-index: 50;
  background: #e8e8e8;
  border-bottom: 1px solid rgb(110 126 134 / 0.55);
}

.hud-header__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--m);
  height: var(--bar);
  padding-inline: var(--m);
}

@media (min-width: 1024px) {
  .hud-header__bar {
    padding-inline: calc(var(--m) * 4);
  }
}

.tape {
  position: relative;
  display: none;
  align-self: stretch;
  align-items: flex-end;
  gap: calc(var(--m) * 2);
  padding-bottom: 14px;
}

.tape__ticks {
  position: absolute;
  inset: 0 calc(var(--m) * -1) auto;
  height: 12px;
  background: repeating-linear-gradient(90deg, #6e7e86 0 1px, transparent 1px 12px);
  background-position-x: calc(var(--p) * -480px);
  mask-image: linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent);
  opacity: 0.8;
}

.tape__link {
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  font-family: 'Chakra Petch', system-ui, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #3f4c52;
  text-decoration: none;
  transition: color 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

.tape__link::before {
  content: '';
  position: absolute;
  left: 50%;
  top: -10px;
  width: 0;
  height: 0;
  border-inline: 6px solid transparent;
  border-top: 8px solid #00799b;
  transform: translate(-50%, -6px);
  opacity: 0;
  transition:
    opacity 240ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 360ms cubic-bezier(0.16, 1, 0.3, 1);
}

.tape__link:hover,
.tape__link--on {
  color: #006480;
}

.tape__link--on::before {
  opacity: 1;
  transform: translate(-50%, 0);
}

.keys {
  display: none;
  gap: 4px;
}

.keys__key {
  min-width: 44px;
  min-height: 36px;
  padding-inline: 8px;
  font-family: 'B612 Mono', ui-monospace, monospace;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: #3f4c52;
  border: 1px solid transparent;
  transition:
    border-color 200ms cubic-bezier(0.16, 1, 0.3, 1),
    color 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

.keys__key:hover {
  color: #1b2427;
  border-color: #6e7e86;
}

.keys__key[aria-current='true'] {
  color: #1b2427;
  border-color: #1b2427;
}

.menu-toggle {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  gap: 7px;
  width: 44px;
  height: 44px;
  padding-inline: 10px;
  margin-right: -10px;
}

.menu-toggle__bar {
  display: block;
  height: 2px;
  background: #1b2427;
  transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
}

.menu-toggle[aria-expanded='true'] .menu-toggle__bar:first-child {
  transform: translateY(4.5px) rotate(45deg);
}

.menu-toggle[aria-expanded='true'] .menu-toggle__bar:last-child {
  transform: translateY(-4.5px) rotate(-45deg);
}

@media (min-width: 768px) {
  .tape,
  .keys {
    display: flex;
  }

  .menu-toggle {
    display: none;
  }
}

.hud-header__progress {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 2px;
  background: #00799b;
  transform-origin: left;
  transform: scaleX(var(--p));
}

@media (min-width: 1024px) {
  .hud-header__progress {
    display: none;
  }
}

.drawer {
  height: calc(100dvh - var(--bar));
  overflow-y: auto;
  border-top: 1px solid rgb(110 126 134 / 0.4);
  background: #e8e8e8;
}

.drawer__nav {
  display: flex;
  flex-direction: column;
  padding: var(--m);
}

.drawer__link {
  display: flex;
  align-items: center;
  min-height: 52px;
  font-family: 'Chakra Petch', system-ui, sans-serif;
  font-size: 1.375rem;
  font-weight: 400;
  color: #1b2427;
  text-decoration: none;
  border-bottom: 1px solid rgb(110 126 134 / 0.35);
}

.drawer__link--on {
  color: #006480;
}

.drawer__keys {
  display: flex;
  gap: 8px;
  margin-top: var(--m);
}

.drop-enter-active,
.drop-leave-active {
  transition:
    opacity 220ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 320ms cubic-bezier(0.16, 1, 0.3, 1);
}

.drop-enter-from,
.drop-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
