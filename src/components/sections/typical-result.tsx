import { formatMins } from '@/lib/utils'
import type { WorkflowResult } from '@/lib/workflow-results'

/** Cautious typical time by hand vs with AI, what it replaces, and what still needs a person. */
export function TypicalResult({ result }: { result: WorkflowResult }) {
  return (
    <section aria-labelledby="typical-result-heading" className="mt-8 rounded-lg border border-emerald-200 bg-emerald-50/60 p-6">
      <h2 id="typical-result-heading" className="text-xl font-semibold text-slate-900">
        Typical result
      </h2>

      <p className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-slate-700">
        <span className="text-2xl font-bold text-slate-900">~{formatMins(result.timeByHandMins)}</span>
        <span>by hand</span>
        <span aria-hidden="true" className="px-1 text-slate-400">→</span>
        <span className="text-2xl font-bold text-emerald-700">~{formatMins(result.timeWithAiMins)}</span>
        <span>with AI</span>
      </p>
      <p className="mt-1 text-xs text-slate-500">
        A cautious typical estimate, including the time to gather the inputs and check the output. It varies with the job.
      </p>

      {result.whatItReplaces && (
        <p className="mt-4 leading-relaxed text-slate-700">
          <span className="font-semibold text-slate-900">What it replaces: </span>
          {result.whatItReplaces}.
        </p>
      )}

      {result.whatToCheck.length > 0 && (
        <>
          <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-slate-900">What you still check</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed text-slate-700">
            {result.whatToCheck.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </>
      )}
    </section>
  )
}
