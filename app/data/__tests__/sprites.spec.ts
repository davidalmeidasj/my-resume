import { describe, it, expect } from 'vitest'

import { SPRITES, SPRITE_INKS } from '../sprites'

describe('service sprites', () => {
  it('draws every frame on a 16x16 grid with known inks', () => {
    for (const frames of Object.values(SPRITES)) {
      expect(frames).toHaveLength(2)
      for (const frame of frames) {
        expect(frame).toHaveLength(16)
        for (const row of frame) {
          expect(row).toHaveLength(16)
          for (const ink of row.replaceAll('.', '')) expect(SPRITE_INKS[ink]).toBeDefined()
        }
      }
    }
  })
})
