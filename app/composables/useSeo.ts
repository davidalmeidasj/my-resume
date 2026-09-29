import { AUTHOR, LOCALES, LOCALE_TAGS, OG_IMAGE, SITE_URL } from '@/config/site'
import type { Locale } from '@/config/site'

export function useSeo() {
  const { t, locale } = useI18n()
  const localeHead = useLocaleHead()

  const url = computed(() => `${SITE_URL}/${locale.value}`)
  const jobTitle = computed(() => t('seo.jobTitle'))
  const title = computed(() => `${AUTHOR.name} | ${jobTitle.value}`)
  const description = computed(() => t('seo.description'))

  useHead({
    htmlAttrs: { lang: () => localeHead.value.htmlAttrs.lang },
    link: () => localeHead.value.link,
    meta: () => localeHead.value.meta,
    script: [
      {
        type: 'application/ld+json',
        innerHTML: () =>
          JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: AUTHOR.name,
            jobTitle: jobTitle.value,
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
            knowsLanguage: LOCALES.map((code: Locale) => LOCALE_TAGS[code]),
          }),
      },
    ],
  })

  useSeoMeta({
    title,
    description,
    author: AUTHOR.name,
    ogType: 'profile',
    ogSiteName: AUTHOR.name,
    ogTitle: title,
    ogDescription: description,
    ogUrl: url,
    ogImage: OG_IMAGE,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: () => `${AUTHOR.name}, ${jobTitle.value}`,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: OG_IMAGE,
  })
}
