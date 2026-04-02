'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button-variants'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  SheetTitle,
} from '@/components/ui/sheet'

const navLinks = [
  { href: '/ai-workflows', label: 'AI Workflows' },
  { href: '/templates', label: 'Templates' },
  { href: '/ai-tools', label: 'AI Tools' },
  { href: '/guides', label: 'Guides' },
  { href: '/ai-for', label: 'AI for Roles' },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-charcoal border-b border-slate-800">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-xl font-bold text-white">
          <span className="inline-block h-2 w-2 rounded-sm bg-primary mr-2" />
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
          className={buttonVariants({ className: 'hidden md:inline-flex' })}
        >
          Get Started
        </Link>

        <Sheet>
          <SheetTrigger
            render={
              <button
                type="button"
                className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-300 hover:text-white"
                aria-label="Toggle menu"
              />
            }
          >
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="right" className="bg-charcoal border-l-slate-800" showCloseButton={false}>
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <nav className="flex flex-col gap-4 p-4">
              {navLinks.map((link) => (
                <SheetClose
                  key={link.href}
                  render={
                    <Link
                      href={link.href}
                      className={`text-sm font-medium transition-colors ${
                        pathname === link.href
                          ? 'text-white'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    />
                  }
                >
                  {link.label}
                </SheetClose>
              ))}
              <SheetClose
                render={
                  <Link
                    href="/ai-workflows"
                    className={buttonVariants({ className: 'mt-2' })}
                  />
                }
              >
                Get Started
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
