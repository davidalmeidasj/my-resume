import { describe, it, expect } from 'vitest'

import { EXTRA_THEMES, MAIN_THEME, THEMES, themePath } from '../../config/themes'
import en from '~~/i18n/locales/en.json'
import pt from '~~/i18n/locales/pt.json'
import es from '~~/i18n/locales/es.json'

describe('themes', () => {
  it('keeps the main theme at the locale root and the others under their slug', () => {
    expect(themePath(MAIN_THEME, 'pt')).toBe('/pt')
    for (const slug of EXTRA_THEMES) expect(themePath(slug, 'es')).toBe(`/${slug}/es`)
  })

  it('gives every theme its own season', () => {
    expect(new Set(THEMES.map((theme) => theme.season)).size).toBe(THEMES.length)
  })

  it('names and describes every theme in every locale', () => {
    for (const locale of [en, pt, es]) {
      for (const { slug } of THEMES) {
        const item = (locale.themes.items as Record<string, { name: string; description: string }>)[
          slug
        ]
        expect(item?.name).toBeTruthy()
        expect(item?.description).toBeTruthy()
      }
    }
  })
})
