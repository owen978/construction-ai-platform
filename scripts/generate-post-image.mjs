#!/usr/bin/env node
/**
 * generate-post-image.mjs — generate an on-brand LinkedIn hook card (1080x1080 PNG).
 *
 * Usage:
 *   node scripts/generate-post-image.mjs \
 *     --out marketing/post-images/<slug>-1.png \
 *     --kicker "RAMS GUIDE" \
 *     --title "What is a RAMS?" \
 *     --bullets "Risk Assessment + Method Statement|Legal under CDM 2015|Free template inside"
 *
 * --bullets is optional (pipe-separated). With bullets you get a listicle card;
 * without, a big-title card. Brand: charcoal #14152a, orange #ff6b35, white text.
 */

import { writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

function arg(name, fallback = '') {
  const i = process.argv.indexOf(`--${name}`)
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback
}

const W = 1080
const H = 1080
const BG = '#14152a'
const BG2 = '#1d1f3a'
const ORANGE = '#ff6b35'
const WHITE = '#ffffff'
const MUTED = '#aeb0c4'

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/** Greedy word-wrap to a max characters-per-line. */
function wrap(text, maxChars) {
  const words = text.split(/\s+/)
  const lines = []
  let line = ''
  for (const w of words) {
    if ((line + ' ' + w).trim().length > maxChars && line) {
      lines.push(line.trim())
      line = w
    } else {
      line = (line + ' ' + w).trim()
    }
  }
  if (line) lines.push(line.trim())
  return lines
}

function buildSvg({ kicker, title, bullets }) {
  const hasBullets = bullets && bullets.length > 0

  // Title sizing adapts to length.
  const titleSize = title.length > 38 ? 70 : title.length > 22 ? 84 : 104
  const titleMax = title.length > 38 ? 22 : title.length > 22 ? 18 : 15
  const titleLines = wrap(title, titleMax)

  const marginX = 90
  let y = 305

  const kickerSvg = kicker
    ? `<text x="${marginX}" y="150" font-family="Helvetica, Arial, sans-serif" font-size="34" font-weight="700" letter-spacing="3" fill="${ORANGE}">${esc(kicker.toUpperCase())}</text>`
    : ''

  const titleSvg = titleLines
    .map((ln, i) => {
      const ty = y + i * (titleSize + 14)
      return `<text x="${marginX}" y="${ty}" font-family="Helvetica, Arial, sans-serif" font-size="${titleSize}" font-weight="800" fill="${WHITE}">${esc(ln)}</text>`
    })
    .join('\n')

  y = y + titleLines.length * (titleSize + 14) + 50

  let bulletsSvg = ''
  if (hasBullets) {
    bulletsSvg = bullets
      .map((b) => {
        const lines = wrap(b, 38)
        const block = lines
          .map((ln, j) => {
            const by = y + j * 46
            const dot =
              j === 0
                ? `<circle cx="${marginX + 12}" cy="${by - 12}" r="9" fill="${ORANGE}"/>`
                : ''
            return `${dot}<text x="${marginX + 44}" y="${by}" font-family="Helvetica, Arial, sans-serif" font-size="38" font-weight="500" fill="${WHITE}">${esc(ln)}</text>`
          })
          .join('\n')
        y += lines.length * 46 + 24
        return block
      })
      .join('\n')
  }

  // Decorative grid lines.
  const grid = Array.from({ length: 9 }, (_, i) => {
    const gx = (i + 1) * (W / 10)
    const gy = (i + 1) * (H / 10)
    return `<line x1="${gx}" y1="0" x2="${gx}" y2="${H}" stroke="#ffffff" stroke-opacity="0.03"/><line x1="0" y1="${gy}" x2="${W}" y2="${gy}" stroke="#ffffff" stroke-opacity="0.03"/>`
  }).join('')

  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${BG}"/>
      <stop offset="1" stop-color="${BG2}"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  ${grid}
  <rect x="0" y="0" width="14" height="${H}" fill="${ORANGE}"/>
  <rect x="${marginX}" y="185" width="64" height="6" fill="${ORANGE}"/>
  ${kickerSvg}
  ${titleSvg}
  ${bulletsSvg}
  <text x="${marginX}" y="${H - 70}" font-family="Helvetica, Arial, sans-serif" font-size="34" font-weight="800" fill="${WHITE}">BuildCopilot<tspan fill="${ORANGE}">.</tspan></text>
  <text x="${W - marginX}" y="${H - 70}" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="30" font-weight="500" fill="${MUTED}">buildcopilot.ai</text>
</svg>`
}

async function main() {
  const out = arg('out')
  if (!out) {
    console.error('Usage: --out <path.png> --title "..." [--kicker "..."] [--bullets "a|b|c"]')
    process.exit(1)
  }
  const kicker = arg('kicker')
  const title = arg('title')
  const bulletsRaw = arg('bullets')
  const bullets = bulletsRaw ? bulletsRaw.split('|').map((s) => s.trim()).filter(Boolean) : []

  if (!title) {
    console.error('Missing --title')
    process.exit(1)
  }

  const svg = buildSvg({ kicker, title, bullets })
  const outPath = resolve(ROOT, out)
  mkdirSync(dirname(outPath), { recursive: true })
  await sharp(Buffer.from(svg)).png().toFile(outPath)
  console.log(`Wrote ${out} (1080x1080)`)
}

main().catch((err) => {
  console.error('Image generation failed:', err.message)
  process.exit(1)
})
