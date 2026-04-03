export const revalidate = 3600

import type { Metadata } from 'next'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button-variants'
import { NewsletterInline } from '@/components/sections/newsletter-inline'

export const metadata: Metadata = {
  title: 'Construction AI Prompt Pack - 50 Prompts, 13 Templates, Role Cheat Sheets',
  description:
    'Download the complete Construction AI Prompt Pack. 50 ready-made prompts, 13 editable templates, role cheat sheets, and tool setup guides. Built for UK construction professionals.',
}

const features = [
  {
    icon: '📝',
    title: '50 AI Prompts',
    description:
      'Every workflow prompt from BuildCopilot, formatted and categorised by role. Risk registers, method statements, BOQs, daily reports, tender analysis, and more.',
  },
  {
    icon: '📄',
    title: '13 Editable Templates',
    description:
      'All construction templates as editable Word documents. Method statements, RAMS, daily reports, snag lists, meeting minutes, and more. Fill in and submit.',
  },
  {
    icon: '👷',
    title: 'Role Cheat Sheets',
    description:
      'One-page quick reference for each construction role with the top 5 workflows, recommended tools, and tips. Hand it to your team on day one.',
  },
  {
    icon: '🛠️',
    title: 'Tool Setup Guides',
    description:
      'Quick start guides for ChatGPT, Claude, and Microsoft Copilot, written specifically for construction use. Get set up in 10 minutes.',
  },
  {
    icon: '🎯',
    title: 'Prompt Customisation Guide',
    description:
      'Learn how to adapt any prompt to your specific project, client requirements, and company standards. Make every output sound like you wrote it.',
  },
  {
    icon: '📦',
    title: 'Offline Access',
    description:
      'Everything packaged as downloadable files. Use on site, on the train, or anywhere without internet. No subscription, no login, yours forever.',
  },
]

const roles = [
  'Quantity Surveyor',
  'Estimator',
  'Site Manager',
  'Project Manager',
  'Contracts Manager',
  'Commercial Manager',
  'Construction Director',
  'BIM Manager',
  'Health & Safety Manager',
  'Procurement Manager',
  'Planning Engineer',
  'Document Controller',
]

const faqs = [
  {
    question: 'What format are the files in?',
    answer:
      'The prompt pack is a zip file containing a PDF guide, editable Word documents (.docx) for all templates, and individual prompt files organised by role. Works on any device.',
  },
  {
    question: 'How is this different from the free content on BuildCopilot?',
    answer:
      'All the prompts and templates on BuildCopilot.ai are free and will stay free. The Prompt Pack is for people who want everything packaged as editable, offline documents they can hand to their team. No copy-pasting from a website.',
  },
  {
    question: 'Can I share it with my team?',
    answer:
      'The pack is licensed for use within your organisation. Share it with your team, put it on your shared drive, include it in training materials.',
  },
  {
    question: 'Do I get updates?',
    answer:
      'Yes. When new prompts or templates are added to BuildCopilot, purchasers get an updated pack via email at no extra cost.',
  },
  {
    question: 'What if it is not useful for me?',
    answer:
      'If the pack does not help you, email hello@buildcopilot.ai within 30 days for a full refund. No questions asked.',
  },
]

export default function PromptPackPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-b from-orange-50 via-amber-50/50 to-white">
        <div className="mx-auto max-w-4xl px-4 pt-16 pb-12 text-center sm:pt-24">
          <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            Digital Download
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            The Construction AI Prompt Pack
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            50 ready-made prompts, 13 editable templates, role cheat sheets, and tool setup guides.
            Everything you need to start using AI in construction today.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-slate-900">£29</span>
              <span className="text-slate-500">one-time payment</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center gap-3">
            <a
              href="#buy"
              className={buttonVariants({ className: 'px-8 py-3 text-base shadow-lg shadow-primary/25' })}
            >
              Get the Prompt Pack
            </a>
            <p className="text-sm text-slate-400">Instant download. 30-day money-back guarantee.</p>
          </div>
        </div>
      </div>

      {/* What's Included */}
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">What you get</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Everything in one download
          </h2>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-lg border border-slate-200 bg-white p-6">
              <div className="mb-3 text-3xl">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Who It's For */}
      <div className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Built for your role</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Prompts for every construction role
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Each role gets a dedicated cheat sheet with the top workflows, recommended tools, and tips
              for getting the best results from AI.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {roles.map((role) => (
              <div
                key={role}
                className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-center text-sm font-medium text-slate-700"
              >
                {role}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social Proof / Value Stack */}
      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-orange-50 to-amber-50 p-8 sm:p-12">
          <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
            What you would spend without this
          </h2>
          <div className="mt-8 space-y-4">
            {[
              { item: 'Hiring a consultant to set up AI workflows', value: '£500+' },
              { item: 'Time spent writing prompts from scratch (20+ hours)', value: '£1,000+' },
              { item: 'Trial and error with the wrong AI tools', value: 'Weeks' },
              { item: 'Formatting templates for your team', value: '£200+' },
            ].map((row) => (
              <div key={row.item} className="flex items-center justify-between border-b border-primary/10 pb-3">
                <span className="text-slate-700">{row.item}</span>
                <span className="font-semibold text-slate-500 line-through">{row.value}</span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-2">
              <span className="text-lg font-bold text-slate-900">The Construction AI Prompt Pack</span>
              <span className="text-2xl font-bold text-primary">£29</span>
            </div>
          </div>

          <div id="buy" className="mt-8 text-center">
            <a
              href="#buy"
              className={buttonVariants({ className: 'px-8 py-3 text-base shadow-lg shadow-primary/25' })}
            >
              Get the Prompt Pack - £29
            </a>
            <p className="mt-3 text-sm text-slate-500">
              Instant download. Use it today. 30-day money-back guarantee.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-slate-50">
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
      </div>

      {/* Final CTA */}
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          Start using AI in construction today
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-slate-600">
          50 prompts. 13 templates. Role cheat sheets. Tool setup guides. One download. No subscription.
        </p>
        <div className="mt-8">
          <a
            href="#buy"
            className={buttonVariants({ className: 'px-8 py-3 text-base shadow-lg shadow-primary/25' })}
          >
            Get the Prompt Pack - £29
          </a>
        </div>
        <p className="mt-4 text-sm text-slate-400">
          Not ready to buy? <Link href="/newsletter" className="text-primary hover:underline">Join the free newsletter</Link> for weekly AI workflows.
        </p>
      </div>

      <NewsletterInline />
    </>
  )
}
