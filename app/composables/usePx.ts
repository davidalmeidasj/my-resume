export const PX_SECTIONS = ['home', 'about', 'services', 'projects', 'skills', 'contact'] as const
export type PxSection = (typeof PX_SECTIONS)[number]

export const PX_NAV_FOR_SECTION: Record<PxSection, string> = {
  home: 'home',
  about: 'about',
  services: 'about',
  projects: 'projects',
  skills: 'projects',
  contact: 'contact',
}

export const usePxActive = () => useState<PxSection>('px-active', () => 'home')
export const usePxMenu = () => useState('px-menu', () => false)
export const usePxGlyph = () => useState('px-glyph', () => 'D')
