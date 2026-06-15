const FORM_URL =
  'https://app.formwise.ai/form_single/1781468699941x755015863171285000'

/**
 * Launch card for the Formwise RAMS tool. The inline iframe embed renders blank
 * inside a cross-origin frame (a Formwise-side limitation, even with embedding
 * set to "Allow All"), so we open the working direct form in a new tab. Keeps
 * the SEO landing page and lead capture intact.
 */
export function FormwiseEmbed() {
  return (
    <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-8 text-center sm:p-10">
      <h2 className="text-2xl font-bold text-slate-900">Generate your RAMS now</h2>
      <p className="mx-auto mt-3 max-w-xl text-slate-600">
        Answer a few quick questions about your task and get a full Risk Assessment and Method
        Statement draft, sent straight to your inbox.
      </p>
      <a
        href={FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-7 inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-white shadow-sm transition-colors hover:bg-primary/90"
      >
        Launch the RAMS Generator
        <span aria-hidden="true">→</span>
      </a>
      <p className="mt-4 text-sm text-slate-500">Free to use. Opens in a new tab.</p>
    </div>
  )
}
