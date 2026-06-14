const FORM_URL =
  'https://app.formwise.ai/form_single/1781468699941x755015863171285000'

/**
 * Embeds the Formwise RAMS tool as a direct iframe. The form URL allows framing
 * (no X-Frame-Options), so we skip Formwise's inline loader script, which is
 * fragile inside a React page (it runs immediately and relies on precise
 * config/container timing). A plain iframe is deterministic.
 */
export function FormwiseEmbed({ height = 820 }: { height?: number }) {
  return (
    <iframe
      src={FORM_URL}
      title="RAMS Generator"
      style={{ width: '100%', height: `${height}px`, border: 0 }}
      className="rounded-xl border border-slate-200 bg-white shadow-sm"
      loading="lazy"
      allow="clipboard-write"
    />
  )
}
