/**
 * Renders resume-src/<locale>.html to public/david-almeida-resume-<locale>.pdf
 * using headless Chrome.
 *
 * Usage:  node resume-src/build.mjs [pt en es]
 *         CHROME_PATH=/path/to/chrome node resume-src/build.mjs
 */
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium'
].filter(Boolean)

const chrome = CHROME_CANDIDATES.find((p) => existsSync(p))
if (!chrome) {
  console.error('Chrome not found. Set CHROME_PATH to your Chrome or Chromium binary.')
  process.exit(1)
}

const locales = process.argv.slice(2).length ? process.argv.slice(2) : ['pt', 'en', 'es']

for (const locale of locales) {
  const source = resolve(here, `${locale}.html`)
  if (!existsSync(source)) {
    console.error(`missing source: resume-src/${locale}.html`)
    process.exit(1)
  }

  const target = resolve(root, 'public', `david-almeida-resume-${locale}.pdf`)

  execFileSync(
    chrome,
    [
      '--headless',
      '--disable-gpu',
      '--no-pdf-header-footer',
      `--print-to-pdf=${target}`,
      `file://${source}`
    ],
    { stdio: ['ignore', 'ignore', 'ignore'] }
  )

  console.log(`built  public/david-almeida-resume-${locale}.pdf`)
}
