<script setup lang="ts">
const { t, locale } = useI18n()
const router = useRouter()

const scrollToContact = () => {
  router.push({ hash: '#contact' })
}

const downloadResume = () => {
  const lang = locale.value
  const filename = `david-almeida-resume-${lang}.pdf`
  const link = document.createElement('a')
  link.href = `/${filename}`
  link.download = filename
  link.click()
}
</script>

<template>
  <section id="home" class="hero season season--spring">
    <div class="hero__grid season__wrap">
      <div class="hero__copy">
        <SeasonMark season="spring" class="hero__mark" />

        <h1 class="hero__title">
          {{ t('hero.title') }}
        </h1>

        <p class="hero__subtitle">
          {{ t('hero.subtitle') }}
        </p>

        <div class="hero__keys">
          <button type="button" class="season-key season-key--solid" @click="scrollToContact">
            {{ t('hero.cta') }}
            <svg viewBox="0 0 20 20" class="hero__icon" aria-hidden="true" focusable="false">
              <path d="M10 3 V16 M4 10 L10 16 L16 10" />
            </svg>
          </button>
          <button type="button" class="season-key season-key--ghost" @click="downloadResume">
            {{ t('hero.downloadResume') }}
            <svg viewBox="0 0 20 20" class="hero__icon" aria-hidden="true" focusable="false">
              <path d="M10 3 V12 M5 8 L10 13 L15 8 M4 17 H16" />
            </svg>
          </button>
        </div>
      </div>

      <HeroLeaves class="hero__leaves" />
    </div>

    <ScrollDown />
  </section>
</template>

<style scoped>
.hero {
  display: flex;
  align-items: center;
  min-height: 100svh;
  padding-top: calc(var(--bar) + 3rem);
  padding-bottom: calc(var(--edge) + 6rem);
  overflow: hidden;
}

.hero__grid {
  position: relative;
  width: 100%;
  display: grid;
  align-items: center;
  gap: 1rem;
}

.hero__copy {
  position: relative;
  z-index: 1;
}

.hero__title {
  margin-top: 1.5rem;
  max-width: 12ch;
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
  font-weight: 800;
  font-size: clamp(3rem, 8.4vw, 7rem);
  line-height: 0.95;
  letter-spacing: -0.04em;
  animation: hero-rise 1100ms var(--ease-out) 120ms both;
}

.hero__subtitle {
  max-width: 36rem;
  margin-top: 1.75rem;
  font-size: clamp(1.125rem, 1.5vw, 1.3125rem);
  line-height: 1.55;
  color: var(--season-soft);
  text-wrap: pretty;
  animation: hero-rise 1100ms var(--ease-out) 260ms both;
}

.hero__keys {
  display: grid;
  gap: 0.75rem;
  margin-top: 2.5rem;
  animation: hero-rise 1100ms var(--ease-out) 380ms both;
}

.hero__icon {
  width: 1.125rem;
  height: 1.125rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.hero__leaves {
  justify-self: end;
  width: min(36vw, 9rem);
  margin-top: -1rem;
  margin-bottom: 2rem;
  pointer-events: none;
}

@keyframes hero-rise {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (min-width: 640px) {
  .hero__leaves {
    width: 15rem;
    margin-bottom: 0;
  }

  .hero__keys {
    display: inline-grid;
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1024px) {
  .hero__grid {
    grid-template-columns: 7fr 5fr;
    gap: 3rem;
  }

  .hero__leaves {
    width: 100%;
    max-width: 30rem;
    margin-top: 0;
  }
}
</style>
