import { describe, it, expect } from 'vitest'

import { projects } from '../projects'
import en from '@/locales/en.json'
import pt from '@/locales/pt.json'
import es from '@/locales/es.json'

const locales = { en, pt, es } as Record<string, Record<string, unknown>>

const resolve = (locale: Record<string, unknown>, key: string) =>
  key.split('.').reduce<unknown>((node, part) => {
    if (node && typeof node === 'object') return (node as Record<string, unknown>)[part]
    return undefined
  }, locale)

describe('projects data', () => {
  it('exposes a non-empty list', () => {
    expect(projects.length).toBeGreaterThan(0)
  })

  it('gives every project a goal or a GitHub link', () => {
    // the card renders the goal only when there is no repository to link to
    const orphans = projects.filter((p) => !p.github && !p.goalKey).map((p) => p.titleKey)
    expect(orphans).toEqual([])
  })

  it.each(Object.keys(locales))('translates every project key in %s', (locale) => {
    const missing: string[] = []

    for (const project of projects) {
      const keys = [project.titleKey, project.descriptionKey, project.goalKey].filter(
        (k): k is string => Boolean(k),
      )

      for (const key of keys) {
        const value = resolve(locales[locale], key)
        if (typeof value !== 'string' || value.trim() === '') missing.push(key)
      }
    }

    expect(missing).toEqual([])
  })
})
