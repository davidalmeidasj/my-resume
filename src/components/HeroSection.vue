<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()

const scrollToContact = () => {
  router.push({ hash: '#contact' })
}
</script>

<template>
  <section
    id="home"
    class="flex flex-col justify-center items-center text-center min-h-screen px-6 bg-background"
  >
    <div class="animate-fade-in max-w-2xl">
      <h1
        class="text-4xl md:text-5xl font-bold text-dark mb-4 leading-tight tracking-tight"
      >
        {{ t('hero.title') }}
      </h1>

      <p
        class="text-base md:text-lg text-muted leading-relaxed mb-6"
      >
        {{ t('hero.subtitle') }}
      </p>

      <button
        @click="scrollToContact"
        class="bg-primary text-white font-medium px-6 py-3 rounded-lg hover:bg-primary-dark transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
      >
        {{ t('hero.cta') }}
      </button>
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
