<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <section id="about" class="bg-white px-6 py-20">
    <div class="max-w-3xl mx-auto text-center">
      <h2 class="text-3xl md:text-4xl font-bold text-primary mb-8">
        {{ t('about.title') }}
      </h2>

      <p
        class="text-base md:text-lg text-muted leading-relaxed whitespace-pre-line"
      >
        <span class="text-dark font-medium">
          {{ t('about.description').split('\n\n')[0] }}
        </span>
        <br /><br />
        {{ t('about.description').split('\n\n')[1] }}
        <br /><br />
        <span class="text-dark font-medium">
          {{ t('about.description').split('\n\n')[2] }}
        </span>
        <br /><br />
        {{ t('about.description').split('\n\n')[3] }}
      </p>
    </div>
  </section>
</template>
