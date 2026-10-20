<script setup lang="ts">
import { AUTHOR } from '@/config/site'

const { t } = useI18n()

const socials = [
  { name: 'GitHub', url: AUTHOR.github, icon: 'simple-icons:github' },
  { name: 'LinkedIn', url: AUTHOR.linkedin, icon: 'simple-icons:linkedin' },
]
</script>

<template>
  <section id="contact" class="px-4 py-28 sm:px-6 md:py-36">
    <div class="mx-auto grid max-w-6xl gap-16 lg:grid-cols-12">
      <div class="lg:col-span-5">
        <h2
          class="text-[clamp(2.5rem,5vw,4.5rem)] font-extralight leading-none tracking-[-0.035em]"
        >
          {{ t('contact.title') }}
        </h2>

        <ul class="mt-12 flex flex-col gap-2">
          <li v-for="item in socials" :key="item.name">
            <a
              :href="item.url"
              target="_blank"
              rel="noopener noreferrer"
              class="group inline-flex min-h-[44px] items-center gap-3 text-haze transition-colors duration-300 hover:text-mist"
            >
              <Icon
                :name="item.icon"
                class="h-5 w-5 transition-colors duration-300 group-hover:text-crest"
              />
              {{ item.name }}
              <Icon
                name="lucide:arrow-up-right"
                class="h-4 w-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </a>
          </li>
        </ul>
      </div>

      <form
        action="https://formspree.io/f/xdkdnboy"
        method="POST"
        class="flex flex-col gap-8 lg:col-span-7"
      >
        <div>
          <label for="name" class="field-label">{{ t('contact.name') }}</label>
          <input
            id="name"
            type="text"
            name="name"
            required
            autocomplete="name"
            placeholder="John Doe"
            class="field"
          />
        </div>

        <div>
          <label for="email" class="field-label">{{ t('contact.email') }}</label>
          <input
            id="email"
            type="email"
            name="email"
            required
            autocomplete="email"
            placeholder="john@example.com"
            class="field"
          />
        </div>

        <div>
          <label for="message" class="field-label">{{ t('contact.message') }}</label>
          <textarea
            id="message"
            name="message"
            required
            rows="5"
            placeholder="Your message..."
            class="field resize-y"
          />
        </div>

        <button
          type="submit"
          class="group inline-flex min-h-[3.5rem] items-center justify-center gap-3 self-start rounded-full bg-spark px-8 font-display text-sm text-abyss transition-colors duration-300 hover:bg-signal"
        >
          {{ t('contact.send') }}
          <Icon
            name="lucide:send"
            class="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
          />
        </button>
      </form>
    </div>
  </section>
</template>

<style scoped>
.field-label {
  @apply block font-display text-xs uppercase tracking-[0.25em] text-haze;
}

.field {
  @apply mt-3 w-full border-0 border-b border-line bg-transparent px-0 py-3 text-lg text-mist transition-colors duration-300 placeholder:text-[#83939A] hover:border-haze/50;
}

.field:focus {
  @apply border-crest outline-none;
}

.field:focus-visible {
  outline: none;
  box-shadow: 0 1px 0 0 #4cc3df;
}
</style>
