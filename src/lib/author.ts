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
   * claiming he wrote or checked each page (the content task publishes
   * automatically). Change to "Reviewed by" only if every page gets reviewed.
   */
  bylineLabel: 'Editor',
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
