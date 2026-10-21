import { SECTION_SEASON, type SeasonSection } from '@/data/seasons'

export const useSeasonSection = () => useState<SeasonSection>('season-section', () => 'home')
export const useSeasonMenu = () => useState('season-menu', () => false)
export const useSeason = () => {
  const section = useSeasonSection()
  return computed(() => SECTION_SEASON[section.value])
}
