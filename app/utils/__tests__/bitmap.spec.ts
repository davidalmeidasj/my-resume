import { describe, it, expect } from 'vitest'

import { GLYPHS, GLYPH_COLS, GLYPH_ROWS, layoutLine } from '../bitmap'
import { AUTHOR } from '../../config/site'

describe('bitmap font', () => {
  it('keeps every glyph on the 5x7 grid', () => {
    for (const rows of Object.values(GLYPHS)) {
      expect(rows).toHaveLength(GLYPH_ROWS)
      for (const row of rows) expect(row).toMatch(new RegExp(`^[01]{${GLYPH_COLS}}$`))
    }
  })

  it('covers every letter of the name', () => {
    for (const char of AUTHOR.name.toUpperCase().replace(/\s/g, '')) {
      expect(GLYPHS[char]).toBeDefined()
    }
  })

  it('lays glyphs out with one empty column between them', () => {
    const line = layoutLine('David')
    expect(line.cols).toBe(5 * GLYPH_COLS + 4)
    expect(line.glyphs.map((glyph) => glyph.x)).toEqual([0, 6, 12, 18, 24])
  })
})
