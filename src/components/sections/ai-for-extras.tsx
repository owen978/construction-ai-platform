import type { AiForExtras as Extras } from '@/lib/ai-for-extras'

const heading = 'mb-4 border-b border-slate-200 pb-3 text-xl font-semibold text-slate-900'

/** Overview, where AI helps, where to be careful and FAQs on an /ai-for/ hub. */
export function AiForExtras({ extras, title }: { extras: Extras; title: string }) {
  return (
    <div className="mb-10 max-w-3xl">
      {extras.overview && (
        <section>
          <h2 className={heading}>{title}</h2>
          {extras.overview.split(/\n{2,}/).map((p) => (
            <p key={p} className="mt-3 leading-relaxed text-slate-600 first:mt-0">{p}</p>
          ))}
        </section>
      )}

      {extras.helps.length > 0 && (
        <section className="mt-8">
          <h2 className={heading}>Where AI helps most</h2>
          <ul className="list-disc space-y-2 pl-5 leading-relaxed text-slate-600">
            {extras.helps.map((h) => <li key={h}>{h}</li>)}
          </ul>
        </section>
      )}

      {extras.careful.length > 0 && (
        <section className="mt-8">
          <h2 className={heading}>Where to be careful</h2>
          <ul className="list-disc space-y-2 pl-5 leading-relaxed text-slate-600">
            {extras.careful.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </section>
      )}

      {extras.faqs.length > 0 && (
        <section id="faqs" className="mt-8 scroll-mt-20">
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
    </div>
  )
}
