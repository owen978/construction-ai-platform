import type { WorkflowExtras as Extras } from '@/lib/workflow-extras'

const heading = 'mb-4 border-b border-slate-200 pb-3 text-xl font-semibold text-slate-900'

/** "When not to use it", "Common mistakes" and FAQs on a workflow page. */
export function WorkflowExtras({ extras }: { extras: Extras }) {
  return (
    <>
      {extras.whenNotToUse && (
        <section className="mt-8">
          <h2 className={heading}>When not to use it</h2>
          {extras.whenNotToUse.split(/\n{2,}/).map((p) => (
            <p key={p} className="mt-3 leading-relaxed text-slate-600 first:mt-0">{p}</p>
          ))}
        </section>
      )}

      {extras.commonMistakes.length > 0 && (
        <section className="mt-8">
          <h2 className={heading}>Common mistakes</h2>
          <ul className="list-disc space-y-2 pl-5 leading-relaxed text-slate-600">
            {extras.commonMistakes.map((m) => <li key={m}>{m}</li>)}
          </ul>
        </section>
      )}

      {extras.faqs.length > 0 && (
        <section className="mt-8">
          <h2 className={heading}>Frequently asked questions</h2>
          <dl className="space-y-5">
            {extras.faqs.map((f) => (
              <div key={f.question}>
                <dt className="font-semibold text-slate-900">{f.question}</dt>
                <dd className="mt-1 leading-relaxed text-slate-600">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}
    </>
  )
}
