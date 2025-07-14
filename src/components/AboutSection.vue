<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <section id="about" class="py-20 px-6 bg-gray-50">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl md:text-4xl font-bold text-center text-primary mb-8">
        {{ t('about.title') }}
      </h2>
      <p class="text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-line">
        {{ t('about.description') }}
      </p>
    </div>
  </section>
</template>
