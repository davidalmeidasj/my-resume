/**
 * The stack shown in the About section, grouped by area.
 *
 * Only the group labels are translated; the entries are product names, which
 * stay identical in every language.
 */
export type StackGroup = {
  /** Maps to `about.stack.<key>` in the locale files. */
  key: string
  techs: string[]
}

export const stackGroups: StackGroup[] = [
  {
    key: 'frontend',
    techs: [
      'React',
      'Next.js',
      'Vue 3',
      'TypeScript',
      'Tailwind CSS',
      'Redux / Saga',
      'Zustand',
      'React Query',
      'Design System',
    ],
  },
  {
    key: 'backend',
    techs: [
      'Node.js',
      'NestJS',
      'Express',
      'GraphQL',
      'WebSockets',
      'Zod',
      'Java / Kotlin (Spring)',
      'PHP (Laravel)',
    ],
  },
  {
    key: 'mobile',
    techs: [
      'React Native',
      'Kotlin / Android',
      'White-label',
      'Build flavors',
      'App Store',
      'Google Play',
    ],
  },
  {
    key: 'data',
    techs: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Supabase', 'TypeORM', 'Prisma'],
  },
  {
    key: 'cloud',
    techs: ['AWS', 'Docker', 'Terraform', 'SST', 'BullMQ', 'AWS SQS', 'CI/CD', 'GitHub Actions'],
  },
  {
    key: 'quality',
    techs: [
      'Jest',
      'Vitest',
      'Playwright',
      'Cypress',
      'TDD / BDD',
      'Clean Architecture',
      'DDD',
      'SOLID',
    ],
  },
]
