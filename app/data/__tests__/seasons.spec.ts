import { describe, it, expect } from 'vitest'

import { SEASONS, SECTION_ORDER, SECTION_SEASON } from '../seasons'
import en from '~~/i18n/locales/en.json'
import pt from '~~/i18n/locales/pt.json'
import es from '~~/i18n/locales/es.json'

describe('seasons', () => {
  it('walks the year in order and ends in winter', () => {
    const order = SECTION_ORDER.map((section) => SECTION_SEASON[section])
    expect(order).toEqual(['spring', 'summer', 'summer', 'summer', 'autumn', 'winter', 'winter'])
  })

  it('names every season in every locale', () => {
    for (const locale of [en, pt, es]) {
      for (const season of SEASONS) expect(locale.seasons[season]).toBeTruthy()
    }
  })
})
