import type { Metadata } from 'next'

export const SITE_NAME = 'BuildCopilot'

export const DEFAULT_OG_IMAGE = {
  // JPEG copy of og-image.png: 278 KB instead of 2.4 MB, so previews load reliably.
  url: '/og-image.jpg',
  width: 1536,
  height: 1024,
  alt: 'BuildCopilot: The AI Operating System for Construction',
}

/** Roughly what Google shows before truncating a title. */
const MAX_TITLE_LENGTH = 60

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
 *
 * Pass `routeImage: true` on routes with their own opengraph-image file:
 * explicit images here would win over the file, so they're left out and the
 * file supplies og:image (X falls back to og:image for its card).
 */
export function pageMetadata({
  path,
  title,
  description,
  type = 'website',
  routeImage = false,
}: {
  path: string
  title: string
  description?: string
  type?: 'website' | 'article'
  routeImage?: boolean
}): Metadata {
  return {
    // Skip the layout's "%s | BuildCopilot" when the title already names the
    // site (e.g. "About BuildCopilot", or a CMS meta_title ending
    // "| BuildCopilot"), or when the suffix would push it past 60 characters
    // and get the keyword part truncated in search results.
    title:
      title.includes(SITE_NAME) || `${title} | ${SITE_NAME}`.length > MAX_TITLE_LENGTH
        ? { absolute: title }
        : title,
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
      ...(routeImage ? {} : { images: [DEFAULT_OG_IMAGE] }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(routeImage ? {} : { images: [DEFAULT_OG_IMAGE.url] }),
    },
  }
}
