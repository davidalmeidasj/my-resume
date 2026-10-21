import type { SeasonSection } from '@/data/seasons'

export const useSeasonSection = () => useState<SeasonSection>('season-section', () => 'home')
export const useSeasonMenu = () => useState('season-menu', () => false)
