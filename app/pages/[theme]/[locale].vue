<script setup lang="ts">
import { isLocale } from '@/config/site'
import { EXTRA_THEMES, type ThemeSlug } from '@/config/themes'

definePageMeta({
  i18n: false,
  validate: (route) =>
    (EXTRA_THEMES as string[]).includes(String(route.params.theme)) &&
    isLocale(String(route.params.locale)),
})

const route = useRoute()
const nuxtApp = useNuxtApp()
const { locale } = useI18n()

const param = String(route.params.locale)
const target = isLocale(param) ? param : 'en'
await nuxtApp.$i18n.loadLocaleMessages(target)
locale.value = target

const theme = String(route.params.theme) as ThemeSlug
</script>

<template>
  <LazyBitmapPage v-if="theme === 'bitmap-specimen'" />
</template>
