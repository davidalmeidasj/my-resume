<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const socials = [
  { name: 'GitHub', url: 'https://github.com/seuusuario' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/seuusuario' },
  { name: 'Twitter', url: 'https://twitter.com/seuusuario' }
]
</script>

<template>
  <section id="contact" class="bg-white px-6 py-20">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
        {{ t('contact.title') }}
      </h2>

      <form class="space-y-6">
        <div>
          <label for="name" class="block mb-2 text-sm font-medium text-gray-700">
            {{ t('contact.name') }}
          </label>
          <input
            type="text"
            id="name"
            placeholder="John Doe"
            class="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary outline-none transition"
          />
        </div>

        <div>
          <label for="email" class="block mb-2 text-sm font-medium text-gray-700">
            {{ t('contact.email') }}
          </label>
          <input
            type="email"
            id="email"
            placeholder="john@example.com"
            class="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary outline-none transition"
          />
        </div>

        <div>
          <label for="message" class="block mb-2 text-sm font-medium text-gray-700">
            {{ t('contact.message') }}
          </label>
          <textarea
            id="message"
            rows="5"
            placeholder="Your message..."
            class="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary outline-none transition"
          ></textarea>
        </div>

        <div class="text-center">
          <button
            type="submit"
            class="bg-primary text-white font-medium px-6 py-3 rounded-md hover:bg-pink-600 transition"
          >
            {{ t('contact.send') }}
          </button>
        </div>
      </form>

      <!-- Social Links -->
      <div class="mt-10 flex justify-center gap-6">
        <a
          v-for="(item, index) in socials"
          :key="index"
          :href="item.url"
          target="_blank"
          rel="noopener noreferrer"
          class="text-muted hover:text-primary transition"
        >
          {{ item.name }}
        </a>
      </div>
    </div>
  </section>
</template>
