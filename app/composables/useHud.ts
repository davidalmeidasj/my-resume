export const HUD_SECTIONS = ['home', 'about', 'services', 'projects', 'skills', 'contact'] as const

export type HudSection = (typeof HUD_SECTIONS)[number]

export const NAV_FOR_SECTION: Record<HudSection, string> = {
  home: 'home',
  about: 'about',
  services: 'about',
  projects: 'projects',
  skills: 'projects',
  contact: 'contact',
}

export const useHudProgress = () => useState('hud-progress', () => 0)

export const useHudActive = () => useState<HudSection>('hud-active', () => 'home')

export const useHudMenu = () => useState('hud-menu', () => false)
