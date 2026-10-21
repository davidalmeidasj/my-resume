<script setup lang="ts">
import '../theme.css'

useHead({ htmlAttrs: { class: 'theme-bitmap-specimen' } })
</script>

<template>
  <BitmapHeader />
  <main>
    <BitmapHeroSection />
    <BitmapAboutSection />
    <BitmapServicesSection />
    <BitmapProjectsSection />
    <BitmapSkillsSection />
    <BitmapThemesSection />
    <BitmapContactSection />
  </main>
  <BitmapFooter />
  <BitmapTracker />
</template>
