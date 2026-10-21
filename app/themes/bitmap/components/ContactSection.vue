<script setup lang="ts">
import { CONTACT_FORM_ACTION, SOCIALS } from '@/config/site'

const { t } = useI18n()
</script>

<template>
  <section id="contact" class="px-section">
    <div class="contact px-wrap">
      <div class="contact__intro">
        <h2 v-arrive class="px-heading">
          {{ t('contact.title') }}
        </h2>

        <ul class="contact__socials">
          <li v-for="item in SOCIALS" :key="item.name">
            <a :href="item.url" target="_blank" rel="noopener noreferrer" class="social">
              <Icon :name="item.icon" class="social__icon" aria-hidden="true" />
              <span>{{ item.name }}</span>
              <BitmapPixelIcon name="arrow-out" class="social__arrow" />
            </a>
          </li>
        </ul>
      </div>

      <form :action="CONTACT_FORM_ACTION" method="POST" class="form">
        <div class="field">
          <label for="name" class="field__label">{{ t('contact.name') }}</label>
          <input
            id="name"
            type="text"
            name="name"
            required
            autocomplete="name"
            placeholder="John Doe"
            class="field__input"
          />
        </div>

        <div class="field">
          <label for="email" class="field__label">{{ t('contact.email') }}</label>
          <input
            id="email"
            type="email"
            name="email"
            required
            autocomplete="email"
            placeholder="john@example.com"
            class="field__input"
          />
        </div>

        <div class="field">
          <label for="message" class="field__label">{{ t('contact.message') }}</label>
          <textarea
            id="message"
            name="message"
            required
            rows="5"
            placeholder="Your message..."
            class="field__input field__input--area"
          ></textarea>
        </div>

        <div class="form__actions">
          <button type="submit" class="px-key px-key--primary form__send">
            {{ t('contact.send') }}
            <BitmapPixelIcon name="arrow-out" />
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped>
.contact {
  display: grid;
  gap: calc(var(--cell) * 8);
}

.contact__socials {
  display: grid;
  margin-top: calc(var(--cell) * 5);
  border-top: 4px solid #374a67;
}

.social {
  display: flex;
  align-items: center;
  gap: calc(var(--cell) * 2);
  min-height: 64px;
  font-family: 'Pixelify Sans', system-ui, sans-serif;
  font-weight: 600;
  font-size: 1.375rem;
  color: #ece0fb;
  border-bottom: 4px solid #374a67;
  transition: color calc(var(--step) * 2) steps(2, end);
}

.social__icon {
  width: 24px;
  height: 24px;
  color: #9e7b9b;
}

.social__arrow {
  margin-left: auto;
  color: #cb9cf2;
  transition: transform calc(var(--step) * 3) steps(3, end);
}

.social:hover {
  color: #cb9cf2;
}

.social:hover .social__arrow {
  transform: translate(6px, -6px);
}

.form {
  display: grid;
  gap: calc(var(--cell) * 4);
}

.field {
  display: grid;
  gap: var(--cell);
}

.field__label {
  font-weight: 700;
  font-size: 0.9375rem;
  color: #ece0fb;
}

.field__input {
  width: 100%;
  min-height: 56px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  color: #ece0fb;
  background: #0e1116;
  border: 4px solid transparent;
  border-image: var(--frame-grape) 4 / 4px stretch;
  outline: none;
}

.field__input:hover {
  border-image: var(--frame-wisteria) 4 / 4px stretch;
}

.field__input:focus-visible {
  border-image: var(--frame-wisteria) 4 / 4px stretch;
  outline: 4px solid #ece0fb;
  outline-offset: 4px;
}

.field__input--area {
  resize: vertical;
  min-height: 10rem;
}

.form__actions {
  padding-bottom: 12px;
}

.form__send {
  width: 100%;
}

@media (min-width: 640px) {
  .form__send {
    width: auto;
  }
}

@media (min-width: 1024px) {
  .contact {
    grid-template-columns: 5fr 7fr;
    gap: calc(var(--cell) * 10);
  }

  .contact__intro {
    position: sticky;
    top: calc(72px + var(--cell) * 6);
    align-self: start;
  }
}
</style>
