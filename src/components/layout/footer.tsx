import Link from 'next/link'

const resourceLinks = [
  { href: '/ai-workflows', label: 'AI Workflows' },
  { href: '/templates', label: 'Templates' },
  { href: '/ai-tools', label: 'AI Tools' },
  { href: '/guides', label: 'Guides' },
  { href: '/ai-for', label: 'AI for Roles' },
]

const roleLinks = [
  { href: '/ai-for/quantity-surveyor', label: 'QS' },
  { href: '/ai-for/project-manager', label: 'Project Manager' },
  { href: '/ai-for/site-manager', label: 'Site Manager' },
  { href: '/ai-for/estimator', label: 'Estimator' },
  { href: '/ai-for/contracts-manager', label: 'Contracts Manager' },
  { href: '/ai-for/construction-director', label: 'Construction Director' },
]

const companyLinks = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/newsletter', label: 'Newsletter' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Use' },
]

export function Footer() {
  return (
    <footer className="bg-charcoal geometric-grid">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="text-xl font-bold text-white">
              <span className="inline-block h-2 w-2 rounded-sm bg-primary mr-2" />
              BuildCopilot
            </Link>
            <p className="mt-3 text-sm text-slate-400">
              AI-powered workflows for construction professionals
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Resources
            </h3>
            <ul className="mt-4 space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Roles
            </h3>
            <ul className="mt-4 space-y-3">
              {roleLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} BuildCopilot. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/feed.xml" className="hover:text-primary transition-colors">RSS Feed</Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
