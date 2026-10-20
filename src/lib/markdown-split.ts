/**
 * Splits a Markdown article at the "## " heading nearest its middle, so a
 * call to action can sit between two sections instead of after the whole
 * piece. Returns null when there are fewer than three H2s (nothing long
 * enough to break up). Headings inside code fences are ignored.
 */
export function splitAtMiddleHeading(md: string): [string, string] | null {
  const starts: number[] = []
  let offset = 0
  let inFence = false
  for (const line of md.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence
    else if (!inFence && line.startsWith('## ')) starts.push(offset)
    offset += line.length + 1
  }
  if (starts.length < 3) return null

  // Never before the first section: the reader needs some of the answer first.
  const middle = md.length / 2
  const at = starts
    .slice(1)
    .reduce((best, start) => (Math.abs(start - middle) < Math.abs(best - middle) ? start : best))
  return [md.slice(0, at), md.slice(at)]
}
