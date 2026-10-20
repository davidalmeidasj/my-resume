<script setup lang="ts">
const { t } = useI18n()

const socials = [
  { name: 'GitHub', url: 'https://github.com/davidalmeidasj', icon: 'simple-icons:github' },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/david-almeida-sj/',
    icon: 'simple-icons:linkedin',
  },
]
</script>

<template>
  <section id="contact" class="hud-section">
    <div class="contact">
      <div class="contact__intro">
        <h2 class="hud-heading" data-lock-heading>
          {{ t('contact.title') }}
        </h2>

        <ul class="contact__socials">
          <li v-for="item in socials" :key="item.name">
            <a
              :href="item.url"
              target="_blank"
              rel="noopener noreferrer"
              class="contact__social"
              data-lock
            >
              <Icon :name="item.icon" class="size-5" aria-hidden="true" />
              {{ item.name }}
              <Icon name="lucide:arrow-up-right" class="size-4 text-teal" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>

      <form action="https://formspree.io/f/xdkdnboy" method="POST" class="form">
        <div class="field">
          <label for="name" class="hud-label field__label">{{ t('contact.name') }}</label>
          <input
            id="name"
            type="text"
            name="name"
            required
            autocomplete="name"
            placeholder="John Doe"
            class="field__input"
            data-lock
          />
        </div>

        <div class="field">
          <label for="email" class="hud-label field__label">{{ t('contact.email') }}</label>
          <input
            id="email"
            type="email"
            name="email"
            required
            autocomplete="email"
            placeholder="john@example.com"
            class="field__input"
            data-lock
          />
        </div>

        <div class="field field--wide">
          <label for="message" class="hud-label field__label">{{ t('contact.message') }}</label>
          <textarea
            id="message"
            name="message"
            required
            rows="5"
            placeholder="Your message..."
            class="field__input field__input--area"
            data-lock
          ></textarea>
        </div>

        <div class="form__send">
          <button type="submit" class="hud-key hud-key--hot" data-lock>
            {{ t('contact.send') }}
            <Icon name="lucide:send" class="size-5" aria-hidden="true" />
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped>
.contact {
  display: grid;
  gap: calc(var(--m) * 2);
  max-width: 80rem;
  margin-inline: auto;
}

@media (min-width: 1024px) {
  .contact {
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    column-gap: calc(var(--m) * 3);
  }
}

.contact__socials {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: calc(var(--m) * 1.5);
}

.contact__social {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding-inline: 14px;
  font-family: 'Chakra Petch', system-ui, sans-serif;
  font-weight: 500;
  color: #1b2427;
  text-decoration: none;
  border: 1px solid #6e7e86;
  transition: border-color 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

.contact__social:hover {
  border-color: #1b2427;
}

.form {
  display: grid;
  gap: var(--m);
}

@media (min-width: 640px) {
  .form {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .field--wide,
  .form__send {
    grid-column: 1 / -1;
  }
}

.field {
  display: grid;
  gap: 10px;
}

.field__input {
  width: 100%;
  min-height: 48px;
  padding: 12px 14px;
  font-family: B612, system-ui, sans-serif;
  font-size: 1rem;
  color: #1b2427;
  background: #f2f2f2;
  border: 1px solid #6e7e86;
  border-radius: 0;
  outline: none;
  transition:
    border-color 200ms cubic-bezier(0.16, 1, 0.3, 1),
    background-color 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

.field__input:hover {
  border-color: #3f4c52;
}

.field__input:focus {
  border-color: #00799b;
  background: #fff;
  box-shadow: inset 0 -2px 0 #00799b;
}

.field__input--area {
  resize: vertical;
  min-height: 9rem;
}

.form__send {
  display: grid;
}

@media (min-width: 640px) {
  .form__send {
    display: flex;
    justify-content: flex-start;
  }
}
</style>
