import { describe, it, expect } from 'vitest'

import { SEASONS, SECTION_ORDER, SECTION_SEASON, SEASON_ENTRY } from '../seasons'
import en from '~~/i18n/locales/en.json'
import pt from '~~/i18n/locales/pt.json'
import es from '~~/i18n/locales/es.json'

describe('seasons', () => {
  it('opens every season on a section that belongs to it', () => {
    for (const season of SEASONS) expect(SECTION_SEASON[SEASON_ENTRY[season]]).toBe(season)
  })

  it('walks the year in order before contact closes the cycle', () => {
    const order = SECTION_ORDER.map((section) => SECTION_SEASON[section])
    expect(order).toEqual(['spring', 'summer', 'summer', 'autumn', 'winter', 'spring'])
  })

  it('names every season in every locale', () => {
    for (const locale of [en, pt, es]) {
      for (const season of SEASONS) expect(locale.seasons[season]).toBeTruthy()
    }
  })
})
