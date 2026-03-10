import type { Metadata } from 'next'
import { Inter, Geist } from 'next/font/google'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import './globals.css'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://buildcopilot.ai'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s | BuildCopilot — The AI Operating System for Construction',
    default: 'BuildCopilot — The AI Operating System for Construction',
  },
  description:
    'Ready-to-use AI workflows, prompts, and guides for construction professionals. Save hours every week with BuildCopilot.',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: siteUrl,
    siteName: 'BuildCopilot',
    title: 'BuildCopilot — The AI Operating System for Construction',
    description:
      'Ready-to-use AI workflows, prompts, and guides for construction professionals. Save hours every week with BuildCopilot.',
    images: [
      {
        url: '/og-image.png',
        width: 1536,
        height: 1024,
        alt: 'BuildCopilot — The AI Operating System for Construction',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BuildCopilot — The AI Operating System for Construction',
    description:
      'Ready-to-use AI workflows, prompts, and guides for construction professionals. Save hours every week with BuildCopilot.',
    images: ['/og-image.png'],
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
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`${inter.className} min-h-screen bg-white text-slate-600 antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
