import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { pageMetadata } from '@/lib/metadata'
import { AUTHOR } from '@/lib/author'
import { SITE_URL } from '@/lib/site'
import { breadcrumbSchema, jsonLdScriptProps, profilePageSchema } from '@/lib/schema'
import { ServiceCTA } from '@/components/sections/service-cta'

export const metadata: Metadata = pageMetadata({
  path: AUTHOR.path,
  title: `${AUTHOR.name}, ${AUTHOR.jobTitle}`,
  description:
    'Owen Hagger, quantity surveyor with 25 years in UK construction and founder of Contractor Systems: AI systems for commercial, operations, site and H&S teams.',
})

export default function OwenHaggerPage() {
  const links = [
    { label: AUTHOR.company.name, href: AUTHOR.company.url, note: 'AI systems for UK contractors' },
    { label: 'constructionrating.co.uk', href: 'https://constructionrating.co.uk', note: 'Check how a main contractor pays' },
    ...(AUTHOR.profiles.linkedin ? [{ label: 'LinkedIn', href: AUTHOR.profiles.linkedin, note: 'Posts and updates' }] : []),
    ...(AUTHOR.profiles.x ? [{ label: 'X', href: AUTHOR.profiles.x, note: 'Posts and updates' }] : []),
  ]

  return (
    <>
      <script
        {...jsonLdScriptProps([
          profilePageSchema(),
          breadcrumbSchema([
            { name: 'Home', url: SITE_URL },
            { name: 'About', url: `${SITE_URL}/about` },
            { name: AUTHOR.name },
          ]),
        ])}
      />

      {/* Header */}
      <div className="bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-3xl px-4 pt-12 pb-8 sm:pt-16">
          <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
            <span className="font-medium text-slate-900">{AUTHOR.name}</span>
          </nav>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            {AUTHOR.photo ? (
              <Image
                src={AUTHOR.photo}
                alt={AUTHOR.name}
                width={112}
                height={112}
                loading="eager"
                className="h-28 w-28 shrink-0 rounded-full object-cover"
              />
            ) : (
              <div
                aria-hidden="true"
                className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-charcoal text-3xl font-bold text-white"
              >
                {AUTHOR.initials}
              </div>
            )}
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">{AUTHOR.name}</h1>
              <p className="mt-3 text-lg text-slate-600">
                Quantity surveyor, 25 years in UK construction. Founder of {AUTHOR.company.name}.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="space-y-10 text-slate-600 leading-relaxed">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">Who I am</h2>
            <p>I&apos;m Owen. I&apos;ve spent 25 years as a quantity surveyor in UK construction.</p>
            <p className="mt-4">
              A lot of that time goes on the work around the work. Valuations, variations, chasing paperwork, monthly reports.
            </p>
            <p className="mt-4">That&apos;s the part AI is good at, if you set it up properly.</p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">What I build</h2>
            <p>
              Through{' '}
              <a href={AUTHOR.company.url} className="font-semibold text-primary hover:text-primary/90 transition-colors">
                {AUTHOR.company.name}
              </a>{' '}
              I build AI systems for UK contractors turning over £10m+.
            </p>
            <p className="mt-4">
              Not just the commercial side. Operations, site management and health and safety too.
            </p>
            <p className="mt-4">
              The aim is simple. Take the repeat admin off your teams, in the office and on site, and keep a person checking what goes out.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">Why BuildCopilot exists</h2>
            <p>
              BuildCopilot is where I put the prompts, workflows and templates for free. No login, no paywall.
            </p>
            <p className="mt-4">
              Use them as they are. If you want them built into your own systems, that&apos;s what the Roadmap Review is for.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">How the content is made</h2>
            <p>
              I use AI to help draft the guides and workflows here, following rules I&apos;ve set for accuracy and UK practice.
            </p>
            <p className="mt-4">
              Every workflow tells you what to check before you trust the output. That&apos;s the part AI still gets wrong, and the part that matters on a real job.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">Elsewhere</h2>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="font-semibold text-primary hover:text-primary/90 transition-colors">
                    {link.label}
                  </a>
                  <span className="text-slate-500">: {link.note}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <ServiceCTA config={null} utmContent="about-owen-hagger" />
      </div>
    </>
  )
}
