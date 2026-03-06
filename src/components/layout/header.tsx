'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/ai-workflows', label: 'AI Workflows' },
  { href: '/ai-tools', label: 'AI Tools' },
  { href: '/guides', label: 'Guides' },
  { href: '/ai-for', label: 'AI for Roles' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-[#1a1a2e] border-b border-slate-800">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-xl font-bold text-white">
          <span className="inline-block h-2 w-2 rounded-sm bg-[#ff6b35] mr-2" />
          BuildCopilot
        </Link>

        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? 'text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/ai-workflows"
          className="hidden md:inline-flex items-center rounded-lg bg-[#ff6b35] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#e85d26] transition-colors"
        >
          Get Started
        </Link>

        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-300 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
              />
            )}
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#1a1a2e]">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/ai-workflows"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center rounded-lg bg-[#ff6b35] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#e85d26] transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
