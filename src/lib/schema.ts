/**
 * JSON-LD Schema Markup Generators for BuildCopilot
 *
 * Generates structured data for Google Search rich results.
 * See: https://developers.google.com/search/docs/appearance/structured-data
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://buildcopilot.ai'
const SITE_NAME = 'BuildCopilot'

// ─── Organization (shared across schemas) ───────────────────────────

export function organizationSchema() {
  return {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      'Ready-to-use AI workflows, prompts, and guides for construction professionals.',
    sameAs: [
      // Add social profile URLs when created
      // 'https://www.linkedin.com/company/buildcopilot',
      // 'https://twitter.com/BuildCopilotAI',
    ],
  }
}

// ─── WebSite (homepage) ─────────────────────────────────────────────

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    alternateName: 'BuildCopilot — The AI Operating System for Construction',
    url: SITE_URL,
    description:
      'Ready-to-use AI workflows, prompts, and guides for construction professionals. Save hours every week with BuildCopilot.',
    publisher: organizationSchema(),
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/ai-workflows?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

// ─── BreadcrumbList ─────────────────────────────────────────────────

interface BreadcrumbItem {
  name: string
  url?: string
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  }
}

// ─── HowTo (for workflow pages) ─────────────────────────────────────

interface HowToOptions {
  name: string
  description: string
  slug: string
  steps: string[]
  difficulty?: string | null
  tool?: { name: string; url?: string | null } | null
  estimatedTime?: string // ISO 8601 duration e.g. "PT10M"
}

export function howToSchema(options: HowToOptions) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: options.name,
    description: options.description,
    url: `${SITE_URL}/ai-workflows/${options.slug}`,
    step: options.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      text: step,
    })),
    publisher: organizationSchema(),
  }

  if (options.estimatedTime) {
    schema.totalTime = options.estimatedTime
  }

  if (options.tool) {
    schema.tool = {
      '@type': 'HowToTool',
      name: options.tool.name,
      ...(options.tool.url ? { url: options.tool.url } : {}),
    }
  }

  return schema
}

// ─── Article (for guide pages) ──────────────────────────────────────

interface ArticleOptions {
  title: string
  description: string
  slug: string
  datePublished?: string | null
  dateModified?: string | null
  readingTimeMinutes?: number | null
}

export function articleSchema(options: ArticleOptions) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: options.title,
    description: options.description,
    url: `${SITE_URL}/guides/${options.slug}`,
    publisher: organizationSchema(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/guides/${options.slug}`,
    },
    isAccessibleForFree: true,
  }

  if (options.datePublished) {
    schema.datePublished = options.datePublished
  }
  if (options.dateModified) {
    schema.dateModified = options.dateModified
  }
  if (options.readingTimeMinutes) {
    schema.timeRequired = `PT${options.readingTimeMinutes}M`
  }

  return schema
}

// ─── SoftwareApplication (for tool pages) ───────────────────────────

interface SoftwareAppOptions {
  name: string
  description: string
  slug: string
  category?: string | null
  pricing?: string | null
  url?: string | null
}

export function softwareApplicationSchema(options: SoftwareAppOptions) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: options.name,
    description: options.description,
    url: options.url || `${SITE_URL}/ai-tools/${options.slug}`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    publisher: organizationSchema(),
  }

  if (options.category) {
    schema.applicationSubCategory = options.category
  }

  if (options.pricing) {
    const isFree =
      options.pricing.toLowerCase().includes('free') ||
      options.pricing.toLowerCase().includes('freemium')
    schema.offers = {
      '@type': 'Offer',
      price: isFree ? '0' : undefined,
      priceCurrency: 'USD',
      description: options.pricing,
    }
  }

  return schema
}

// ─── CollectionPage (for list pages & role/task pages) ──────────────

interface CollectionPageOptions {
  name: string
  description: string
  url: string
  items?: { name: string; url: string }[]
}

export function collectionPageSchema(options: CollectionPageOptions) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: options.name,
    description: options.description,
    url: options.url,
    publisher: organizationSchema(),
    isAccessibleForFree: true,
  }

  if (options.items && options.items.length > 0) {
    schema.mainEntity = {
      '@type': 'ItemList',
      numberOfItems: options.items.length,
      itemListElement: options.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: item.url,
      })),
    }
  }

  return schema
}

// ─── Helper: Render JSON-LD script tag content ──────────────────────

export function jsonLdScriptProps(schema: unknown | unknown[]) {
  return {
    type: 'application/ld+json' as const,
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(Array.isArray(schema) ? schema : schema),
    },
  }
}
