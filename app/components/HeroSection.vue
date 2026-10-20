<script setup lang="ts">
import { AUTHOR } from '@/config/site'

const { t, locale } = useI18n()
const router = useRouter()

const greeting = computed(() => t('hero.title').replace(AUTHOR.name, '').trim())

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
    <div class="hero__grid px-wrap">
      <div class="hero__copy">
        <h1 class="hero__title">
          <span class="hero__greeting">{{ greeting }}</span>
          <span class="sr-only">{{ AUTHOR.name }}</span>
          <PixelName :text="AUTHOR.name" class="hero__name" />
        </h1>

        <p class="hero__subtitle">
          {{ t('hero.subtitle') }}
        </p>

        <div class="hero__keys">
          <button type="button" class="px-key px-key--primary" @click="scrollToContact">
            {{ t('hero.cta') }}
            <PixelIcon name="arrow-down" />
          </button>
          <button type="button" class="px-key" @click="downloadResume">
            {{ t('hero.downloadResume') }}
            <PixelIcon name="download" />
          </button>
        </div>
      </div>

      <GlyphInspector class="hero__inspector" />
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
  padding: calc(72px + var(--cell) * 6) var(--gutter) calc(var(--cell) * 14);
}

.hero__grid {
  width: 100%;
  display: grid;
  gap: calc(var(--cell) * 8);
  align-items: center;
}

.hero__title {
  display: grid;
  gap: calc(var(--cell) * 3);
  font-weight: 400;
}

.hero__greeting {
  font-size: clamp(1.375rem, 2.2vw, 2rem);
  line-height: 1.2;
  color: #9e7b9b;
}

.hero__subtitle {
  max-width: 40rem;
  margin-top: calc(var(--cell) * 5);
  font-size: clamp(1.125rem, 1.5vw, 1.375rem);
  line-height: 1.55;
  text-wrap: pretty;
}

.hero__keys {
  display: grid;
  gap: calc(var(--cell) * 4);
  margin-top: calc(var(--cell) * 6);
}

.hero__inspector {
  display: none;
}

@media (min-width: 640px) {
  .hero__keys {
    display: inline-grid;
    grid-template-columns: 1fr 1fr;
    gap: calc(var(--cell) * 3);
  }
}

@media (min-width: 640px) and (max-width: 1023px) and (min-height: 900px) {
  .hero__inspector {
    display: grid;
  }
}

@media (min-width: 1024px) {
  .hero__grid {
    grid-template-columns: 7fr 4fr;
  }

  .hero__inspector {
    display: grid;
  }
}
</style>
