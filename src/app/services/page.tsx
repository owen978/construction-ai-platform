import type { Metadata } from 'next'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button-variants'

export const metadata: Metadata = {
  title: 'Commercial & QS Services for SME Developers and Contractors',
  description:
    'Outsourced quantity surveying and commercial support for SME property developers and contractors. Valuations, procurement, cost tracking and cash flow, delivered with AI-assisted systems. From £1,500/month.',
}

const ctaHref =
  'mailto:owen@subcontractorhub.co.uk?subject=Commercial%20support%20enquiry'

const systems = [
  {
    icon: '📊',
    title: 'Live project dashboards',
    description:
      'Every project gets a live procurement and programme dashboard, so you always know what is bought, what is outstanding, and what is coming next.',
  },
  {
    icon: '🧾',
    title: 'Automated cost allocation',
    description:
      'Around 95% of monthly cost allocation is automated, so cost reports are built on complete, current data rather than a quarterly catch-up.',
  },
  {
    icon: '💷',
    title: 'Unified cash flow forecasting',
    description:
      'A single cash flow forecast across all your live schemes, updated as costs land, so funding decisions are made with the full picture.',
  },
  {
    icon: '📄',
    title: 'Automated subcontract documentation',
    description:
      'Subcontract orders and pre-let documentation are generated automatically from agreed scopes, so packages are locked down quickly and consistently.',
  },
]

const tiers = [
  {
    name: 'Tender Pack',
    price: 'From £1,500',
    priceNote: 'fixed price',
    description:
      'A reusable tender submission pack that makes every future bid faster and sharper.',
    features: [
      'Capability statement',
      'Pricing schedule',
      'Reusable templates',
      'How-to guide',
      'Delivered in days',
    ],
  },
  {
    name: 'Core Commercial Support',
    price: '£1,500',
    priceNote: 'per month',
    description:
      'The essential commercial function for a live scheme, handled end to end.',
    features: [
      'Monthly valuations and applications',
      'Subcontract orders',
      'Cost tracking',
      'Cash flow forecasting',
    ],
  },
  {
    name: 'Full Commercial Partner',
    price: '£2,300',
    priceNote: 'per month',
    description:
      'Everything in Core, plus the strategic commercial work that protects your margin.',
    features: [
      'Everything in Core Commercial Support',
      'Procurement management',
      'Tender pricing',
      'Variations and EOT claims',
      'Live project dashboards',
      'Monthly reporting',
    ],
    highlighted: true,
  },
  {
    name: 'Ad-hoc Support',
    price: '£475',
    priceNote: 'per day',
    description:
      'Flexible day-rate support for one-off valuations, disputes, tenders or overflow work.',
    features: [
      'No ongoing commitment',
      'Same systems and standards',
      'Ideal for one-off pieces of work',
    ],
  },
]

const steps = [
  {
    step: '1',
    title: 'Book a 15-minute call',
    description:
      'A short call to understand your schemes, your current commercial setup, and where the gaps are.',
  },
  {
    step: '2',
    title: 'Fixed scope and monthly price',
    description:
      'You get a clear scope of work and a fixed monthly price. No surprises, no creeping day rates.',
  },
  {
    step: '3',
    title: 'Systems set up in week one',
    description:
      'Dashboards, cost tracking and cash flow are set up in the first week, then delivery runs month after month.',
  },
]

const faqs = [
  {
    question: 'Do you work remotely?',
    answer:
      'Yes. I am based in South Wales and work with clients across the UK remotely. Everything runs through shared dashboards, regular calls and clear monthly reporting, so you always know where each scheme stands.',
  },
  {
    question: 'Do you have JCT and NEC experience?',
    answer:
      'Yes. I work with JCT and NEC contracts day to day, covering valuations, applications, variations, EOT claims and subcontract administration under both forms.',
  },
  {
    question: 'Is there a minimum term?',
    answer:
      'No. After the first month, both monthly plans run on a rolling basis. If it is not adding value, you can stop. In practice, clients stay because the systems keep proving their worth.',
  },
  {
    question: 'How do you use AI?',
    answer:
      'AI powers the delivery systems: dashboards, cost allocation, cash flow and document generation. It handles the repetitive work so I can focus on the commercial decisions. Every output gets professional review before it reaches you or your supply chain.',
  },
  {
    question: 'What areas do you cover?',
    answer:
      'The whole of the UK. Most work is delivered remotely, with site or office visits arranged where a scheme genuinely needs them.',
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-b from-orange-50 via-amber-50/50 to-white">
        <div className="mx-auto max-w-4xl px-4 pt-16 pb-12 text-center sm:pt-24">
          <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            Commercial Support
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Your outsourced commercial function
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            Quantity surveying and commercial support for SME property developers and contractors
            running £300k to £5M schemes. All the output of a commercial team, without the cost of
            a full-time hire.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <a
              href={ctaHref}
              className={buttonVariants({ className: 'px-8 py-3 text-base shadow-lg shadow-primary/25' })}
            >
              Book a 15-minute call
            </a>
            <p className="text-sm text-slate-400">
              Fixed monthly pricing. No minimum term after month one.
            </p>
          </div>
        </div>
      </div>

      {/* Who */}
      <div className="mx-auto max-w-3xl px-4 py-16">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Who you are working with</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            A quantity surveyor who builds the systems he works with
          </h2>
        </div>
        <div className="mt-8 space-y-4 leading-relaxed text-slate-600">
          <p>
            I am Owen Hagger, a quantity surveyor and commercial consultant based in South Wales,
            working with developers and contractors across the UK. I run BuildCopilot, and I
            currently act as the outsourced commercial function for a residential developer across
            five live sites.
          </p>
          <p>
            If your schemes sit between £300k and £5M, you probably know the problem: too much
            commercial work to ignore, not enough to justify a full-time QS. You end up doing
            valuations at 10pm, chasing subcontract orders between site visits, and guessing at
            cash flow. That is the gap I fill.
          </p>
        </div>
      </div>

      {/* What makes it different */}
      <div className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">What makes it different</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              One consultant, the output of a small commercial team
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              I built AI-assisted delivery systems and use them daily on live schemes. They do the
              repetitive work, and every output gets professional review before it reaches you.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {systems.map((system) => (
              <div key={system.title} className="rounded-lg border border-slate-200 bg-white p-6">
                <div className="mb-3 text-3xl">{system.icon}</div>
                <h3 className="text-lg font-semibold text-slate-900">{system.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{system.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Offers */}
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Ways to work together</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Clear scope, fixed pricing
          </h2>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col rounded-lg border bg-white p-6 ${
                tier.highlighted
                  ? 'border-primary/40 shadow-lg shadow-primary/10'
                  : 'border-slate-200'
              }`}
            >
              <h3 className="text-lg font-semibold text-slate-900">{tier.name}</h3>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-slate-900">{tier.price}</span>
                <span className="text-sm text-slate-500">{tier.priceNote}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{tier.description}</p>
              <ul className="mt-4 space-y-2">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-slate-600">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">How it works</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              From first call to full delivery
            </h2>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {steps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                  {step.step}
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900">
          Frequently asked questions
        </h2>

        <div className="mt-10 space-y-6">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-lg border border-slate-200 bg-white p-6">
              <h3 className="font-semibold text-slate-900">{faq.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Get your commercial function sorted
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-600">
            A 15-minute call is enough to work out whether this is a fit. If it is, your systems
            are up and running within a week.
          </p>
          <div className="mt-8">
            <a
              href={ctaHref}
              className={buttonVariants({ className: 'px-8 py-3 text-base shadow-lg shadow-primary/25' })}
            >
              Book a 15-minute call
            </a>
          </div>
          <p className="mt-4 text-sm text-slate-400">
            Prefer to browse first? <Link href="/ai-workflows" className="text-primary hover:underline">Explore the free AI workflows</Link>.
          </p>
        </div>
      </div>
    </>
  )
}
