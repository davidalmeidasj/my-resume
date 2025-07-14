<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const name = ref('')
const email = ref('')
const message = ref('')

const handleSubmit = () => {
  alert('📨 Form submission logic goes here.')
  name.value = ''
  email.value = ''
  message.value = ''
}
</script>

<template>
  <section id="contact" class="py-20 px-6 bg-gray-50">
    <div class="max-w-3xl mx-auto">
      <h2 class="text-3xl md:text-4xl font-bold text-center text-primary mb-8">
        {{ t('contact.title') }}
      </h2>

      <form @submit.prevent="handleSubmit" class="grid gap-4">
        <input
          type="text"
          v-model="name"
          :placeholder="t('contact.name')"
          required
          class="p-3 rounded border border-gray-300 focus:outline-primary"
        />
        <input
          type="email"
          v-model="email"
          :placeholder="t('contact.email')"
          required
          class="p-3 rounded border border-gray-300 focus:outline-primary"
        />
        <textarea
          v-model="message"
          :placeholder="t('contact.message')"
          required
          rows="5"
          class="p-3 rounded border border-gray-300 focus:outline-primary"
        ></textarea>

        <button
          type="submit"
          class="bg-primary text-white px-6 py-3 rounded hover:bg-primary-dark transition"
        >
          {{ t('contact.submit') }}
        </button>
      </form>

      <div class="flex justify-center gap-6 mt-10 text-gray-600">
        <a
          href="https://github.com/seu-usuario"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-primary"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/seu-usuario"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-primary"
        >
          LinkedIn
        </a>
        <a
          href="mailto:davidasj21@gmail.com"
          class="hover:text-primary"
        >
          Email
        </a>
      </div>
    </div>
  </section>
</template>
