import pluginVitest from '@vitest/eslint-plugin'
import pluginPlaywright from 'eslint-plugin-playwright'
import pluginOxlint from 'eslint-plugin-oxlint'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    ...pluginVitest.configs.recommended,
    files: ['app/**/__tests__/*'],
  },
  {
    ...pluginPlaywright.configs['flat/recommended'],
    files: ['e2e/**/*.spec.ts'],
  },
  ...pluginOxlint.configs['flat/recommended'],
  skipFormatting,
)
