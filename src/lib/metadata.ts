import type { Metadata } from 'next'

export const SITE_NAME = 'BuildCopilot'

export const DEFAULT_OG_IMAGE = {
  url: '/og-image.png',
  width: 1536,
  height: 1024,
  alt: 'BuildCopilot — The AI Operating System for Construction',
}

export const FEED_ALTERNATE = { 'application/rss+xml': '/feed.xml' }

/**
 * Canonical URL plus Open Graph and Twitter tags for a public page.
 *
 * Next.js replaces (rather than merges) top-level metadata keys from the root
 * layout, so a page that set only `openGraph.url` would lose the site-wide
 * image, and one that set only `alternates.canonical` would lose the RSS link.
 * Pages that set neither inherit the homepage's og:title, og:description and
 * og:url, so every share preview looked like the homepage.
 *
 * `path` is relative; the root layout's metadataBase makes it absolute.
 */
export function pageMetadata({
  path,
  title,
  description,
  type = 'website',
}: {
  path: string
  title: string
  description?: string
  type?: 'website' | 'article'
}): Metadata {
  return {
    // Titles that already name the site (e.g. "About BuildCopilot", or a CMS
    // meta_title ending "| BuildCopilot") skip the layout's "%s | BuildCopilot".
    title: title.includes(SITE_NAME) ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
      types: FEED_ALTERNATE,
    },
    openGraph: {
      type,
      locale: 'en_GB',
      siteName: SITE_NAME,
      url: path,
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  }
}
