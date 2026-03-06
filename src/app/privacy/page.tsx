import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — BuildCopilot',
  description:
    'How BuildCopilot collects, uses, and protects your data. Read our full privacy policy.',
}

export default function PrivacyPage() {
  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-7xl px-4 pt-12 pb-8 sm:pt-16">
          <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-[#ff6b35] transition-colors">Home</Link>
            <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
            <span className="font-medium text-slate-900">Privacy Policy</span>
          </nav>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Privacy Policy</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">Last updated: March 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="space-y-8 text-slate-600 leading-relaxed">

          <div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">1. Who We Are</h2>
            <p>
              BuildCopilot (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) provides free AI workflows, prompts, and guides for construction professionals. This privacy policy explains how we collect, use, and protect your information when you use our website at buildcopilot.ai.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">2. Information We Collect</h2>
            <p className="mb-3">We may collect the following types of information:</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6b35]" />
                <span><strong className="text-slate-900">Email address</strong> — if you voluntarily subscribe to our newsletter or contact us.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6b35]" />
                <span><strong className="text-slate-900">Usage data</strong> — anonymous analytics data such as pages visited, time on site, and referral sources, collected via privacy-friendly analytics.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6b35]" />
                <span><strong className="text-slate-900">Device information</strong> — browser type, operating system, and screen resolution for optimising our website experience.</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">3. How We Use Your Information</h2>
            <p className="mb-3">We use your information to:</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6b35]" />
                <span>Send you our newsletter and updates about new AI workflows (only if you opt in).</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6b35]" />
                <span>Respond to enquiries you send via our contact page.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6b35]" />
                <span>Improve our website, content, and user experience through anonymous analytics.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6b35]" />
                <span>Comply with legal obligations.</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">4. Legal Basis for Processing (GDPR)</h2>
            <p>
              We process your personal data under the following legal bases: <strong className="text-slate-900">consent</strong> (when you subscribe to our newsletter), <strong className="text-slate-900">legitimate interests</strong> (to improve our services and understand usage patterns), and <strong className="text-slate-900">legal obligation</strong> (where required by law).
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">5. Cookies</h2>
            <p>
              We use minimal, privacy-friendly cookies. We do not use advertising or third-party tracking cookies. Any analytics cookies we use are anonymised and do not track you across other websites. You can disable cookies in your browser settings at any time.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">6. Third-Party Services</h2>
            <p className="mb-3">We may use the following third-party services:</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6b35]" />
                <span><strong className="text-slate-900">Email marketing platform</strong> — to manage newsletter subscriptions and send updates.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6b35]" />
                <span><strong className="text-slate-900">Website hosting</strong> — to serve our website securely and reliably.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6b35]" />
                <span><strong className="text-slate-900">Analytics</strong> — to understand how visitors use our site (anonymised data only).</span>
              </li>
            </ul>
            <p className="mt-3">
              We do not sell, rent, or share your personal data with third parties for marketing purposes.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">7. Data Retention</h2>
            <p>
              We retain your email address for as long as you remain subscribed to our newsletter. You can unsubscribe at any time using the link in any email we send. Analytics data is retained in anonymised form and cannot be linked back to individual users.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">8. Your Rights</h2>
            <p className="mb-3">Under UK GDPR, you have the right to:</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6b35]" />
                <span>Access the personal data we hold about you.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6b35]" />
                <span>Request correction of inaccurate data.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6b35]" />
                <span>Request deletion of your data.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6b35]" />
                <span>Withdraw consent at any time (for newsletter subscriptions).</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6b35]" />
                <span>Lodge a complaint with the Information Commissioner&apos;s Office (ICO).</span>
              </li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at{' '}
              <a href="mailto:hello@buildcopilot.ai" className="font-semibold text-[#ff6b35] hover:text-[#e85d26] transition-colors">
                hello@buildcopilot.ai
              </a>.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">9. Data Security</h2>
            <p>
              We take reasonable technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. Our website is served over HTTPS, and any third-party services we use are vetted for their security practices.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">10. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">11. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or how we handle your data, please contact us at{' '}
              <a href="mailto:hello@buildcopilot.ai" className="font-semibold text-[#ff6b35] hover:text-[#e85d26] transition-colors">
                hello@buildcopilot.ai
              </a>.
            </p>
          </div>

        </div>
      </div>
    </>
  )
}
