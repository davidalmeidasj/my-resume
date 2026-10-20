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
  <section id="home" class="hero">
    <div class="hero__grid">
      <div class="hero__copy">
        <h1 class="hero__title" data-lock-heading>
          {{ t('hero.title') }}
        </h1>

        <p class="hero__subtitle">
          {{ t('hero.subtitle') }}
        </p>

        <div class="hero__keys">
          <button type="button" class="hud-key hud-key--hot" data-lock @click="scrollToContact">
            {{ t('hero.cta') }}
            <Icon name="lucide:arrow-down-right" class="size-5" aria-hidden="true" />
          </button>

          <button type="button" class="hud-key" data-lock @click="downloadResume">
            {{ t('hero.downloadResume') }}
            <Icon name="lucide:download" class="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div class="hero__instrument">
        <AttitudeReticle />
      </div>
    </div>

    <ScrollDown />
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 100svh;
  padding: calc(var(--m) * 6) var(--m) calc(var(--m) * 6);
}

@media (min-width: 1024px) {
  .hero {
    padding-inline: calc(var(--m) * 4);
  }
}

.hero__grid {
  display: grid;
  width: 100%;
  max-width: 80rem;
  margin-inline: auto;
  gap: calc(var(--m) * 2);
  align-items: center;
}

@media (min-width: 1024px) {
  .hero__grid {
    grid-template-columns: minmax(0, 7fr) minmax(0, 4fr);
    gap: calc(var(--m) * 3);
  }
}

.hero__title {
  font-weight: 300;
  font-size: clamp(2.75rem, 7.4vw, 6rem);
  line-height: 0.98;
  letter-spacing: -0.03em;
  max-width: 11ch;
  animation: rise 900ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

.hero__subtitle {
  margin-top: calc(var(--m) * 1.5);
  max-width: 54ch;
  font-size: clamp(1.0625rem, 1.5vw, 1.25rem);
  line-height: 1.6;
  color: #3f4c52;
  text-wrap: pretty;
  animation: rise 900ms 120ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

.hero__keys {
  display: grid;
  gap: 12px;
  margin-top: calc(var(--m) * 2);
  animation: rise 900ms 220ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

@media (min-width: 640px) {
  .hero__keys {
    display: inline-grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    gap: var(--m);
  }
}

.hero__instrument {
  display: none;
}

@media (min-width: 640px) {
  .hero__instrument {
    display: block;
    width: min(100%, 22rem);
    justify-self: end;
    animation: fade 1400ms 300ms cubic-bezier(0.16, 1, 0.3, 1) both;
  }
}

@media (min-width: 1024px) {
  .hero__instrument {
    width: 100%;
    justify-self: stretch;
  }
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
}

@keyframes fade {
  from {
    opacity: 0;
  }
}
</style>
