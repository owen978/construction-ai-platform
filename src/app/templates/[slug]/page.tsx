export const revalidate = 3600

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTemplateBySlug, getTemplateSlugs } from '@/lib/queries/templates'
import { CopyButton } from '@/components/ui/copy-button'
import { CopilotCTA } from '@/components/ui/copilot-cta'
import { breadcrumbSchema, jsonLdScriptProps } from '@/lib/schema'
import { NewsletterSidebar } from '@/components/ui/newsletter-sidebar'
import { NewsletterBanner } from '@/components/sections/newsletter-banner'
import { PromptPackBanner } from '@/components/sections/prompt-pack-banner'
import { PromptPackCTA } from '@/components/ui/prompt-pack-cta'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://buildcopilot.ai'

export async function generateStaticParams() {
  const slugs = await getTemplateSlugs()
  return slugs.map(({ slug }) => ({ slug }))
}

interface TemplateDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: TemplateDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const template = await getTemplateBySlug(slug)

  if (!template) {
    return { title: 'Template Not Found' }
  }

  return {
    title: template.meta_title || template.name,
    description: template.meta_description || template.description || undefined,
  }
}

export default async function TemplateDetailPage({ params }: TemplateDetailPageProps) {
  const { slug } = await params
  const template = await getTemplateBySlug(slug)

  if (!template) {
    notFound()
  }

  const schemas = [
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Templates', url: `${SITE_URL}/templates` },
      { name: template.name },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: template.name,
      description: template.description || `Free ${template.name} for construction professionals`,
      url: `${SITE_URL}/templates/${template.slug}`,
      isAccessibleForFree: true,
      inLanguage: 'en',
      publisher: {
        '@type': 'Organization',
        name: 'BuildCopilot',
        url: SITE_URL,
      },
    },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <script {...jsonLdScriptProps(schemas)} />

      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
        <Link href="/templates" className="hover:text-primary transition-colors">Templates</Link>
        <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
        <span className="font-medium text-slate-900">{template.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-orange-50 text-3xl">
            {template.icon || '\uD83D\uDCC4'}
          </div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{template.name}</h1>

          {template.description && (
            <p className="mb-6 text-lg leading-relaxed text-slate-600">
              {template.description}
            </p>
          )}

          {/* What is it */}
          {template.what_is_it && (
            <div className="mt-8">
              <h2 className="mb-4 border-b border-slate-200 pb-3 text-xl font-semibold text-slate-900">
                What is a {template.name}?
              </h2>
              <div className="whitespace-pre-wrap text-slate-600 leading-relaxed">
                {template.what_is_it}
              </div>
            </div>
          )}

          {/* Key Sections */}
          {template.key_sections && (
            <div className="mt-8">
              <h2 className="mb-4 border-b border-slate-200 pb-3 text-xl font-semibold text-slate-900">
                Key Sections to Include
              </h2>
              <div className="whitespace-pre-wrap text-slate-600 leading-relaxed">
                {template.key_sections}
              </div>
            </div>
          )}

          <PromptPackBanner context="template" />

          {/* Template Content */}
          {template.template_content && (
            <div className="mt-8">
              <h2 className="mb-4 border-b border-slate-200 pb-3 text-xl font-semibold text-slate-900">
                Free Template
              </h2>
              <div className="relative">
                <div className="absolute top-4 right-4">
                  <CopyButton text={template.template_content} />
                </div>
                <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg bg-slate-900 p-6 font-mono text-sm leading-relaxed text-slate-100 shadow-lg">
                  {template.template_content}
                </pre>
              </div>
            </div>
          )}

          <NewsletterBanner />

          {/* When to Use */}
          {template.when_to_use && (
            <div className="mt-8">
              <h2 className="mb-4 border-b border-slate-200 pb-3 text-xl font-semibold text-slate-900">
                When Do You Need This?
              </h2>
              <div className="whitespace-pre-wrap text-slate-600 leading-relaxed">
                {template.when_to_use}
              </div>
            </div>
          )}

          {/* Who Uses It */}
          {template.who_uses_it && (
            <div className="mt-8">
              <h2 className="mb-4 border-b border-slate-200 pb-3 text-xl font-semibold text-slate-900">
                Who Uses This Template?
              </h2>
              <div className="whitespace-pre-wrap text-slate-600 leading-relaxed">
                {template.who_uses_it}
              </div>
            </div>
          )}

          {/* AI Tips */}
          {template.ai_tips && (
            <div className="mt-8">
              <h2 className="mb-4 border-b border-slate-200 pb-3 text-xl font-semibold text-slate-900">
                Generate This with AI
              </h2>
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
                <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                  {template.ai_tips}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6 lg:sticky lg:top-24">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Template Details
            </h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="font-medium text-slate-900">Cost</dt>
                <dd className="text-primary font-semibold">Free</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-900">Format</dt>
                <dd className="text-slate-600">Copy-paste ready</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-900">Industry</dt>
                <dd className="text-slate-600">Construction</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Related AI Workflows
            </h3>
            <p className="text-sm text-slate-600">
              Want to generate this document automatically with AI? Check our{' '}
              <Link href="/ai-workflows" className="text-primary hover:underline font-medium">
                AI workflows
              </Link>{' '}
              for step-by-step prompts.
            </p>
          </div>

          <PromptPackCTA context="template" />

          <CopilotCTA />

          <NewsletterSidebar />
        </div>
      </div>
    </div>
  )
}
