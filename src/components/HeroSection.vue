<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

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
  <section
    id="home"
    class="flex flex-col justify-center items-center text-center min-h-screen px-6 bg-light"
  >
    <div class="animate-fade-in max-w-2xl">
      <h1 class="text-4xl md:text-5xl font-bold text-primary mb-4 leading-tight tracking-tight">
        {{ t('hero.title') }}
      </h1>

      <p class="text-base md:text-lg text-muted leading-relaxed mb-6">
        {{ t('hero.subtitle') }}
      </p>

      <div class="flex flex-col gap-4 items-center sm:flex-row sm:justify-center">
        <button
          @click="scrollToContact"
          class="bg-accent2 text-white font-semibold px-6 py-3 rounded-xl hover:bg-accent1 transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent2 w-full sm:w-auto sm:min-w-[200px]"
        >
          {{ t('hero.cta') }}
        </button>

        <button
          @click="downloadResume"
          class="bg-white text-accent2 font-semibold px-6 py-3 rounded-xl border border-accent2 hover:bg-accent2 hover:text-white transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent2 w-full sm:w-auto sm:min-w-[200px]"
        >
          {{ t('hero.downloadResume') }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}
</style>
