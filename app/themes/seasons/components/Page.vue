<script setup lang="ts">
import '../theme.css'

useHead({ htmlAttrs: { class: 'theme-career-seasons' } })
</script>

<template>
  <SeasonsHeader />
  <main>
    <SeasonsHeroSection />
    <SeasonsServicesSection />
    <SeasonsSkillsSection />
    <SeasonsThemesSection />
    <SeasonsAboutSection />
    <SeasonsProjectsSection />
    <SeasonsContactSection />
  </main>
  <SeasonsFooter />
  <SeasonsTracker />
</template>
