/** A line on its own in a guide's Markdown that marks where the offer block goes. */
export const CTA_MARKER = '<!-- cta -->'

/**
 * Splits a Markdown article where a call to action should sit between two
 * sections. A line reading exactly CTA_MARKER wins (and is dropped);
 * otherwise the "## " heading nearest the middle, never before the second
 * section. Returns null when there are fewer than three H2s and no marker.
 * Lines inside code fences are ignored.
 */
export function splitAtMiddleHeading(md: string): [string, string] | null {
  const starts: number[] = []
  let marker = -1
  let offset = 0
  let inFence = false
  for (const line of md.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence
    else if (!inFence && line.trim() === CTA_MARKER) marker = offset
    else if (!inFence && line.startsWith('## ')) starts.push(offset)
    offset += line.length + 1
  }
  if (marker >= 0) {
    return [md.slice(0, marker), md.slice(marker + CTA_MARKER.length).replace(/^[^\n]*\n?/, '')]
  }
  if (starts.length < 3) return null

  const middle = md.length / 2
  const at = starts
    .slice(1)
    .reduce((best, start) => (Math.abs(start - middle) < Math.abs(best - middle) ? start : best))
  return [md.slice(0, at), md.slice(at)]
}
