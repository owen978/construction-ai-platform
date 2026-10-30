/**
 * The site's named editor, used by the author page, bylines and the
 * Person structured data. Empty profile links and photo are simply not shown.
 */
export const AUTHOR = {
  name: 'Owen Hagger',
  initials: 'OH',
  jobTitle: 'Quantity Surveyor',
  path: '/about/owen-hagger',
  /**
   * Byline role. "Editor" credits Owen as responsible for the content without
   * claiming he wrote or checked each page (the content tasks publish
   * automatically). Pages he has read himself are listed in REVIEWED_PAGES
   * and say "Reviewed by" instead.
   */
  bylineLabel: 'Editor',
  /** Short credential after his name on reviewed pages: "Reviewed by Owen Hagger, QS". */
  credential: 'QS',
  /** Square headshot in /public, e.g. '/owen-hagger.jpg'. Initials show until set. */
  photo: '/owen-hagger.jpg' as string | null,
  /** Personal profiles, used on the author page and as Person.sameAs. */
  profiles: {
    linkedin: 'https://www.linkedin.com/in/owen-hagger/' as string | null,
    x: 'https://x.com/owenhagger' as string | null,
  },
  company: {
    name: 'Contractor Systems',
    url: 'https://contractorsystems.co.uk',
  },
}

/**
 * Pages Owen has read and signed off himself, by path, with the date he did.
 * They show "Reviewed by Owen Hagger, QS" and name him as the author in the
 * structured data. Everything the content tasks publish keeps "Editor".
 * Only add a page once Owen has actually reviewed it (his rule, 30 Oct 2026).
 */
export const REVIEWED_PAGES: Record<string, string> = {}

export function isReviewed(path: string) {
  return path in REVIEWED_PAGES
}
