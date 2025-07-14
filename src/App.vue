<template>
  <AppHeader />
  <router-view />
  <FooterSection />
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import FooterSection from '@/components/FooterSection.vue'
</script>
