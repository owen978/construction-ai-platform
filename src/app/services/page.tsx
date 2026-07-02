import type { Metadata } from 'next'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button-variants'

export const metadata: Metadata = {
  title: 'Fixed-Fee Commercial Services for Developers, Contractors & Subcontractors',
  description:
    'Fixed-outcome commercial services for construction. Procurement packages, independent quote comparisons, cash flow forecasts, live dashboards and cost reviews, delivered in days. AI-assisted systems with every output reviewed by a qualified quantity surveyor.',
}

const ctaHref =
  'mailto:owen@subcontractorhub.co.uk?subject=Commercial%20support%20enquiry'

const proofPoints = [
  'Live commercial function for a residential developer across five sites',
  'A £340k tender priced line by line and ready to win for a contractor',
  'Reusable tender pack delivered for an electrical subcontractor',
]

const steps = [
  {
    step: '1',
    title: 'Book a 15-minute call',
    description:
      'Tell us what you need and what you are working with. Fifteen minutes is enough to scope most jobs.',
  },
  {
    step: '2',
    title: 'Fixed fee agreed up front',
    description:
      'You get a clear scope and one fixed price before any work starts. No day rates, no surprises, no creeping extras.',
  },
  {
    step: '3',
    title: 'Output delivered in days',
    description:
      'AI-assisted systems do the heavy lifting, and a qualified quantity surveyor reviews and signs off every output before it reaches you.',
  },
]

const developerServices = [
  {
    name: 'Procurement Package',
    price: 'From £395',
    priceNote: 'per trade package',
    description:
      'Scope of works documents and enquiry packs for each trade, written and ready to issue to your subcontractors.',
    features: [
      'Trade-by-trade scope of works',
      'Enquiry pack ready to send',
      'Full-project procurement package priced on scope',
    ],
  },
  {
    name: 'Independent Quote Comparison & Gap Review',
    price: 'From £495',
    priceNote: 'per trade comparison',
    description:
      'Subcontractor quotes compared like for like by an independent third party, with the missing gaps pulled out.',
    features: [
      'Like-for-like normalisation across quotes',
      'Every exclusion and qualification flagged',
      'A recommendation you can defend',
    ],
    highlighted: true,
  },
  {
    name: 'Cash Flow Forecast',
    price: 'From £950',
    priceNote: 'per project',
    description:
      'A project cash flow forecast built from your programme and cost data, so funding decisions are made with the full picture.',
    features: [
      'One-time forecast from £950',
      'Monthly refreshed forecast from £395/month',
      'Built from your actual programme and costs',
    ],
  },
  {
    name: 'Data to Dashboard',
    price: 'From £1,950',
    priceNote: 'setup per project',
    description:
      'Messy paper, spreadsheets and cost print-outs turned into a live project dashboard and information you can actually use.',
    features: [
      'Live project dashboard',
      'No more hours wading through documents',
      'Optional monthly refresh from £495',
    ],
  },
  {
    name: 'Post-Completion Cost Review & Lessons Learnt',
    price: 'From £2,450',
    priceNote: 'per project',
    description:
      'A full cost review after handover: where the money went against plan, and what to do differently next time.',
    features: [
      'Full out-turn cost review',
      'Spend against plan, explained',
      'Lessons-learnt pack for the next scheme',
    ],
  },
  {
    name: 'Bespoke System Build',
    price: 'From £4,950',
    priceNote: 'priced on scope',
    description:
      'The systems we use, built out for your business to keep and run: dashboards, cost trackers, cash flow engines, document generators.',
    features: [
      'Tailored to your projects and workflows',
      'Yours to keep and run in-house',
      'Dashboards, trackers, generators and more',
    ],
  },
]

const subcontractorServices = [
  {
    name: 'Tender Pack',
    price: 'From £1,500',
    priceNote: 'fixed price',
    description:
      'A reusable tender submission pack that makes every future bid faster and sharper.',
    features: [
      'Capability statement',
      'Pricing schedule',
      'Reusable templates and how-to guide',
      'Delivered in days',
    ],
  },
  {
    name: 'Your Numbers, Sorted',
    price: 'From £1,450',
    priceNote: 'setup',
    description:
      'Job costs, applications, retentions and pipeline out of paper and spreadsheets and into one live dashboard.',
    features: [
      'Live dashboard of job costs and cash',
      'Applications and retentions tracked',
      'Your pipeline in one place',
    ],
  },
]

const ongoingTiers = [
  {
    name: 'Core Commercial Cover',
    price: 'From £2,500',
    priceNote: 'per month',
    description:
      'Monthly valuations and applications, subcontract orders, cost tracking and cash flow, handled end to end.',
  },
  {
    name: 'Full Commercial Partner',
    price: 'From £3,950',
    priceNote: 'per month',
    description:
      'Everything in Core, plus procurement management, tender pricing, variations and EOT claims, live dashboards and monthly reporting.',
  },
  {
    name: 'Ad-hoc Support',
    price: '£475',
    priceNote: 'per day',
    description:
      'Flexible day-rate support for one-off valuations, disputes, tenders or overflow work. No ongoing commitment.',
  },
]

const faqs = [
  {
    question: 'Do you replace our QS or commercial team?',
    answer:
      'No. We take the tedious, data-heavy work off them: the quote comparisons, the cost allocation, the forecast updates, the document drudgery. Your team keeps the decisions and the relationships; we hand them finished outputs to work from.',
  },
  {
    question: 'How is AI used?',
    answer:
      'AI-assisted systems do the heavy lifting: sorting the data, drafting the documents, building the comparisons. A qualified quantity surveyor reviews and signs off everything before it reaches you. Nothing goes out on the strength of the machine alone.',
  },
  {
    question: 'How does fixed pricing work?',
    answer:
      'Every job is scoped on a short call and quoted as a single fixed fee before work starts. If the scope changes part-way through, we agree the change and the price before carrying on. No day rates, no open-ended invoices.',
  },
  {
    question: 'Do you work remotely?',
    answer:
      'Yes. We are based in South Wales and work with clients across the UK remotely. Everything runs through shared dashboards, clear handovers and short calls, so you always know where each job stands.',
  },
  {
    question: 'Do you have JCT and NEC experience?',
    answer:
      'Yes. We work with JCT and NEC contracts day to day, covering valuations, applications, variations, EOT claims and subcontract administration under both forms.',
  },
  {
    question: 'What areas do you cover?',
    answer:
      'The whole of the UK. Most work is delivered remotely, with site or office visits arranged where a scheme genuinely needs them.',
  },
]

type Service = {
  name: string
  price: string
  priceNote: string
  description: string
  features: string[]
  highlighted?: boolean
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <div
      className={`flex flex-col rounded-lg border bg-white p-6 ${
        service.highlighted
          ? 'border-primary/40 shadow-lg shadow-primary/10'
          : 'border-slate-200'
      }`}
    >
      <h3 className="text-lg font-semibold text-slate-900">{service.name}</h3>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-3xl font-bold text-slate-900">{service.price}</span>
        <span className="text-sm text-slate-500">{service.priceNote}</span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{service.description}</p>
      <ul className="mt-4 space-y-2">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-slate-600">
            <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-b from-orange-50 via-amber-50/50 to-white">
        <div className="mx-auto max-w-4xl px-4 pt-16 pb-12 text-center sm:pt-24">
          <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            BuildCopilot Commercial Services
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            We do the data work. You get the finished answer.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            Fixed-fee commercial services for construction. Hand us the quote comparisons,
            procurement packs, cash flow forecasts and cost reviews that eat your week, and get a
            finished, usable output back in days. AI-assisted systems do the heavy lifting. A
            qualified quantity surveyor reviews every output before it reaches you.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <a
              href={ctaHref}
              className={buttonVariants({ className: 'px-8 py-3 text-base shadow-lg shadow-primary/25' })}
            >
              Book a 15-minute call
            </a>
            <p className="text-sm text-slate-400">
              Fixed fee agreed up front. Delivered in days, not weeks.
            </p>
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-400">
            Recent work
          </p>
          <div className="mt-4 grid gap-4 text-center sm:grid-cols-3">
            {proofPoints.map((point) => (
              <p key={point} className="text-sm leading-relaxed text-slate-600">
                {point}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">How it works</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            One call, one fixed fee, one finished output
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

      {/* Developers & main contractors */}
      <div className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              For developers and main contractors
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Fixed-price outputs for £300k to £5M schemes
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Pick the output you need. We take the raw information, do the tedious work, and hand
              back something finished.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {developerServices.map((service) => (
              <ServiceCard key={service.name} service={service} />
            ))}
          </div>
        </div>
      </div>

      {/* Subcontractors */}
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            For subcontractors
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Win more work, know your numbers
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Two fixed-price packages built for trade contractors: one to sharpen every bid you
            send, one to get your job costs and cash out of the shoebox.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-8 sm:grid-cols-2">
          {subcontractorServices.map((service) => (
            <ServiceCard key={service.name} service={service} />
          ))}
        </div>
      </div>

      {/* Ongoing cover */}
      <div className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Ongoing Commercial Cover
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Want us on hand every month?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
              For teams running £2M to £5M schemes that want the fixed-outcome work plus a
              commercial function on tap, month after month.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {ongoingTiers.map((tier) => (
              <div key={tier.name} className="rounded-lg border border-slate-200 bg-white p-5">
                <h3 className="font-semibold text-slate-900">{tier.name}</h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-slate-900">{tier.price}</span>
                  <span className="text-sm text-slate-500">{tier.priceNote}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{tier.description}</p>
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
            Hand over the tedious work
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-600">
            Send us the job that keeps getting pushed to the bottom of the pile. A 15-minute call
            is enough to scope it and put a fixed fee on it.
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
