<script setup lang="ts">
import '../theme.css'

useHead({ htmlAttrs: { class: 'theme-daylight-hud' } })
</script>

<template>
  <DaylightHeader />
  <main>
    <DaylightHeroSection />
    <DaylightAboutSection />
    <DaylightServicesSection />
    <DaylightProjectsSection />
    <DaylightSkillsSection />
    <DaylightThemesSection />
    <DaylightContactSection />
  </main>
  <DaylightFooter />
  <DaylightInstruments />
</template>
