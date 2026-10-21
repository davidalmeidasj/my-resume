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
  <section id="contact" class="season season--winter contact-season">
    <div class="contact season__wrap">
      <div class="contact__intro">
        <h2 v-arrive class="season-heading contact__heading">
          {{ t('contact.title') }}
        </h2>

        <ul class="contact__socials">
          <li v-for="item in socials" :key="item.name">
            <a :href="item.url" target="_blank" rel="noopener noreferrer" class="social">
              <Icon :name="item.icon" class="social__icon" aria-hidden="true" />
              <span>{{ item.name }}</span>
              <svg viewBox="0 0 20 20" class="social__arrow" aria-hidden="true" focusable="false">
                <path d="M6 14 L14 6 M7 6 H14 V13" />
              </svg>
            </a>
          </li>
        </ul>
      </div>

      <form action="https://formspree.io/f/xdkdnboy" method="POST" class="form">
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

        <div>
          <button type="submit" class="season-key season-key--solid form__send">
            {{ t('contact.send') }}
            <svg viewBox="0 0 20 20" class="form__icon" aria-hidden="true" focusable="false">
              <path d="M4 10 H16 M11 5 L16 10 L11 15" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped>
.contact-season {
  padding-top: 2rem;
}

.contact {
  display: grid;
  gap: 3rem;
}

.contact__heading {
  color: var(--season-accent);
}

.contact__socials {
  display: grid;
  margin-top: 2.5rem;
  border-top: 2px solid var(--season-ink);
}

.social {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  min-height: 64px;
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
  font-weight: 700;
  font-size: 1.375rem;
  letter-spacing: -0.01em;
  border-bottom: 1px solid var(--color-border);
}

.social__icon {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--season-accent);
}

.social__arrow {
  width: 1.25rem;
  height: 1.25rem;
  margin-left: auto;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  transition: transform 360ms var(--ease-out);
}

.social:hover .social__arrow {
  transform: translate(3px, -3px);
}

.form {
  display: grid;
  gap: 1.5rem;
}

.field {
  display: grid;
  gap: 0.5rem;
}

.field__label {
  font-weight: 600;
  font-size: 0.9375rem;
}

.field__input {
  width: 100%;
  min-height: 3.25rem;
  padding: 0.75rem 1rem;
  border-radius: 0.875rem;
  border: 1.5px solid rgb(62 71 86 / 0.45);
  background: #ffffff;
  font-size: 1rem;
  color: var(--color-winter-slate);
  transition:
    border-color 240ms var(--ease-out),
    box-shadow 240ms var(--ease-out);
}

.field__input:hover {
  border-color: var(--color-winter-slate);
}

.field__input:focus-visible {
  outline: none;
  border-color: var(--season-accent);
  box-shadow: 0 0 0 3px rgb(79 106 134 / 0.3);
}

.field__input--area {
  resize: vertical;
  min-height: 10rem;
}

.form__send {
  width: 100%;
}

.form__icon {
  width: 1.125rem;
  height: 1.125rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

@media (min-width: 640px) {
  .form__send {
    width: auto;
  }
}

@media (min-width: 1024px) {
  .contact {
    grid-template-columns: 5fr 7fr;
    gap: 5rem;
  }

  .contact__intro {
    position: sticky;
    top: calc(var(--bar) + 3rem);
    align-self: start;
  }
}
</style>
