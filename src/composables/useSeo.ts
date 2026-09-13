import { computed } from 'vue'
import { useHead, type ResolvableLink } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { AUTHOR, LOCALES, LOCALE_TAGS, OG_IMAGE, SITE_URL, DEFAULT_LOCALE } from '@/config/site'
import type { Locale } from '@/config/site'

/**
 * Builds the per-language head: title, description, canonical, Open Graph,
 * hreflang alternates and the Person structured data.
 *
 * Everything here is rendered into the HTML at build time by vite-ssg, which is
 * the point: social crawlers and search engines read the served markup and never
 * run the app, so tags applied only at runtime would be invisible to them.
 */
export function useSeo() {
  const { t, locale } = useI18n()

  const current = computed(() => locale.value as Locale)
  const url = computed(() => `${SITE_URL}/${current.value}`)
  // Built here rather than stored in the locale files: vue-i18n treats "|" as a
  // plural-form separator, so a title containing one comes back truncated.
  const title = computed(() => `${AUTHOR.name} | ${t('seo.jobTitle')}`)
  const description = computed(() => t('seo.description'))

  // Tells Google these three pages are the same content in different languages,
  // so it serves the right one per user instead of treating them as duplicates.
  // The cast is needed because unhead types `rel: "alternate"` as an RSS feed
  // link and demands a `type`, which hreflang alternates must not carry.
  const alternates = [
    ...LOCALES.map((code) => ({ hreflang: LOCALE_TAGS[code], href: `${SITE_URL}/${code}` })),
    { hreflang: 'x-default', href: `${SITE_URL}/${DEFAULT_LOCALE}` },
  ].map((entry) => ({ rel: 'alternate', ...entry }) as ResolvableLink)

  const structuredData = computed(() =>
    JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: AUTHOR.name,
      jobTitle: t('seo.jobTitle'),
      description: description.value,
      url: url.value,
      image: OG_IMAGE,
      email: `mailto:${AUTHOR.email}`,
      telephone: AUTHOR.phone,
      address: {
        '@type': 'PostalAddress',
        addressLocality: AUTHOR.city,
        addressRegion: AUTHOR.region,
        addressCountry: AUTHOR.country,
      },
      sameAs: [AUTHOR.linkedin, AUTHOR.github],
      knowsLanguage: LOCALES.map((code) => LOCALE_TAGS[code]),
    }),
  )

  useHead({
    htmlAttrs: { lang: computed(() => LOCALE_TAGS[current.value]) },
    title,
    meta: [
      { name: 'description', content: description },
      { name: 'author', content: AUTHOR.name },
      { property: 'og:type', content: 'profile' },
      { property: 'og:site_name', content: AUTHOR.name },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:locale', content: computed(() => LOCALE_TAGS[current.value].replace('-', '_')) },
      { property: 'og:image', content: OG_IMAGE },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: computed(() => `${AUTHOR.name}, ${t('seo.jobTitle')}`) },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: OG_IMAGE },
    ],
    link: [{ rel: 'canonical', href: url }, ...alternates],
    script: [{ type: 'application/ld+json', innerHTML: structuredData }],
  })
}
