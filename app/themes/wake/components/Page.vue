<script setup lang="ts">
import '../theme.css'

useHead({ htmlAttrs: { class: 'theme-bioluminescent-wake' } })
</script>

<template>
  <WakeField />
  <div class="relative z-10">
    <WakeHeader />
    <main>
      <WakeHeroSection />
      <WakeAboutSection />
      <WakeServicesSection />
      <WakeProjectsSection />
      <WakeSkillsSection />
      <WakeContactSection />
    </main>
    <WakeFooter />
  </div>
</template>
