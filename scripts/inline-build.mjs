#!/usr/bin/env node
// Inlines the built JS and CSS into a single dist/index.html.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const dist = 'dist'
const html = readFileSync(join(dist, 'index.html'), 'utf8')
const assets = readdirSync(join(dist, 'assets'))
const js = assets.find((f) => f.endsWith('.js'))
const css = assets.find((f) => f.endsWith('.css'))
if (!js) throw new Error('no js chunk in dist/assets')

// a literal </script> inside the bundle would close the inline tag early
const jsBody = readFileSync(join(dist, 'assets', js), 'utf8').replace(/<\/script/gi, '<\\/script')
const cssBody = css ? readFileSync(join(dist, 'assets', css), 'utf8') : ''

let out = html
  .replace(new RegExp(`<script[^>]*src="[^"]*${js}"[^>]*></script>`), '')
  .replace(/<link[^>]*rel="stylesheet"[^>]*>/, cssBody ? `<style>${cssBody}</style>` : '')
  .replace('</body>', `<script type="module">${jsBody}</script></body>`)

writeFileSync(join(dist, 'index.html'), out)
console.log(`[single] dist/index.html  ${(out.length / 1024).toFixed(0)} KB`)
