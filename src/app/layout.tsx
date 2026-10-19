import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Header } from '@/components/layout/header'
import { isDailyIdeasEnabled } from '@/lib/features'
import { getPublishedIdeas } from '@/lib/daily-ideas'
import { Footer } from '@/components/layout/footer'
import { StickyCallBar } from '@/components/leads/sticky-call-bar'
import './globals.css'
import { cn } from "@/lib/utils";
import { SITE_URL } from '@/lib/site'
import { DEFAULT_OG_IMAGE, FEED_ALTERNATE, SITE_NAME } from '@/lib/metadata'

// One font: Inter, exposed as --font-sans for Tailwind's font-sans. (Geist was
// also loaded and preloaded, but Inter on <body> overrode it everywhere.)
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s | BuildCopilot',
    default: 'BuildCopilot: Free AI Workflows for UK Construction',
  },
  description:
    'Free AI workflows, prompts and templates for UK construction teams. Copy-paste prompts for QSs, project managers and site managers, edited by a working QS.',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'BuildCopilot: Free AI Workflows for UK Construction',
    description:
      'Free AI workflows, prompts and templates for UK construction teams. Copy-paste prompts for QSs, project managers and site managers, edited by a working QS.',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BuildCopilot: Free AI Workflows for UK Construction',
    description:
      'Free AI workflows, prompts and templates for UK construction teams. Copy-paste prompts for QSs, project managers and site managers, edited by a working QS.',
    images: [DEFAULT_OG_IMAGE.url],
  },
  alternates: {
    types: FEED_ALTERNATE,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const showDailyIdeas = isDailyIdeasEnabled() && getPublishedIdeas().length > 0

  return (
    <html lang="en-GB" className={cn('font-sans', inter.variable)}>
      <body className="min-h-screen bg-white text-slate-600 antialiased">
        <Header showDailyIdeas={showDailyIdeas} />
        <main>{children}</main>
        <Footer showDailyIdeas={showDailyIdeas} />
        <StickyCallBar />
        <Analytics />
      </body>
    </html>
  )
}
