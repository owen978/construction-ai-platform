import { ImageResponse } from 'next/og'

/**
 * Shared renderer for per-page share images (opengraph-image.tsx files).
 * Styled after /og-image.png: dark grid background, orange square, wordmark.
 */

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

const BACKGROUND = '#202124'
const GRID = 'rgba(255,255,255,0.045)'
const ORANGE = '#fa6e1d'
const TEXT = '#f4f1ec'
const MUTED = '#a1a1aa'

type FontWeight = 400 | 700

// Geist is the site font. next/og only bundles Geist Regular, so both weights
// are fetched once per build; if that fails, the bundled regular is used.
let fontsPromise: Promise<{ name: string; data: ArrayBuffer; weight: FontWeight }[]> | undefined

async function loadGeist(weight: FontWeight) {
  const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Geist:wght@${weight}`)).text()
  const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1]
  if (!url) throw new Error(`No TTF for Geist ${weight}`)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Geist ${weight}: ${res.status}`)
  return { name: 'Geist', data: await res.arrayBuffer(), weight }
}

function loadFonts() {
  fontsPromise ??= Promise.all([loadGeist(400), loadGeist(700)]).catch((err) => {
    console.warn('Share images: using the bundled font,', err.message)
    return []
  })
  return fontsPromise
}

function titleSize(title: string) {
  if (title.length > 90) return 50
  if (title.length > 60) return 58
  return 66
}

export async function renderOgImage({
  kicker,
  title,
  chips = [],
}: {
  /** Small orange label above the title, e.g. "Free AI prompt". */
  kicker: string
  title: string
  /** Up to three short labels, e.g. role and task names. */
  chips?: string[]
}) {
  const fonts = await loadFonts()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          backgroundColor: BACKGROUND,
          backgroundImage: `linear-gradient(${GRID} 1px, transparent 1px), linear-gradient(90deg, ${GRID} 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          color: TEXT,
          fontFamily: 'Geist',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 26, height: 26, borderRadius: 4, backgroundColor: ORANGE }} />
          <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: -0.5 }}>BuildCopilot</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: ORANGE,
              textTransform: 'uppercase',
              letterSpacing: 2,
            }}
          >
            {kicker}
          </div>
          <div
            style={{
              fontSize: titleSize(title),
              fontWeight: 700,
              lineHeight: 1.12,
              maxWidth: 1000,
              lineClamp: 3,
            }}
          >
            {title}
          </div>
          {chips.length > 0 && (
            <div style={{ display: 'flex', gap: 12 }}>
              {chips.slice(0, 3).map((chip) => (
                <div
                  key={chip}
                  style={{
                    display: 'flex',
                    padding: '8px 18px',
                    border: `2px solid rgba(255,255,255,0.18)`,
                    borderRadius: 999,
                    fontSize: 22,
                    color: TEXT,
                  }}
                >
                  {chip}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 120, height: 5, backgroundColor: ORANGE }} />
          <div style={{ fontSize: 24, color: MUTED }}>buildcopilot.ai</div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: fonts.length ? fonts : undefined }
  )
}
