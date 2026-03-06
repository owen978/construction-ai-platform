import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Use — BuildCopilot',
  description:
    'Terms and conditions for using the BuildCopilot website and its content.',
}

export default function TermsPage() {
  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-7xl px-4 pt-12 pb-8 sm:pt-16">
          <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-[#ff6b35] transition-colors">Home</Link>
            <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
            <span className="font-medium text-slate-900">Terms of Use</span>
          </nav>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Terms of Use</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">Last updated: March 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="space-y-8 text-slate-600 leading-relaxed">

          <div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the BuildCopilot website (&quot;the Site&quot;), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the Site.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">2. Description of Service</h2>
            <p>
              BuildCopilot provides free AI workflows, prompts, guides, and educational content designed for construction professionals. The Site is intended as a resource to help users integrate AI tools into their construction workflows.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">3. Use of Content</h2>
            <p className="mb-3">The AI workflows, prompts, and guides on this Site are provided for your personal and professional use, subject to the following conditions:</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6b35]" />
                <span>You may copy, use, and adapt the AI prompts and workflows for your own construction projects and professional work.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6b35]" />
                <span>You may not republish, redistribute, or resell our content in bulk or as part of a competing service without written permission.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6b35]" />
                <span>Attribution is appreciated but not required when using individual prompts in your day-to-day work.</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">4. AI Output Disclaimer</h2>
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
              <p className="text-amber-900">
                <strong>Important:</strong> AI-generated outputs are not a substitute for professional judgement. The workflows and prompts on this Site are designed to assist construction professionals, not replace qualified human oversight. All AI outputs should be reviewed, verified, and validated by appropriately qualified professionals before being relied upon for construction decisions, costings, safety assessments, or contractual matters.
              </p>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">5. No Professional Advice</h2>
            <p>
              The content on this Site does not constitute professional advice (legal, financial, engineering, or otherwise). While our workflows are designed by people with construction industry experience, every project is unique. You are responsible for ensuring that any AI outputs you use are appropriate for your specific situation and comply with applicable regulations and standards.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">6. Intellectual Property</h2>
            <p>
              The BuildCopilot name, logo, website design, and original content (including articles, guides, and descriptions) are owned by BuildCopilot. The AI prompt templates themselves are provided freely for your professional use as described in Section 3.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">7. Third-Party Links and Tools</h2>
            <p>
              The Site may contain links to third-party websites, AI tools, and software products (including AI Construction Copilot). We are not responsible for the content, privacy practices, or terms of any third-party services. Use of third-party tools is subject to their own terms and conditions.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">8. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, BuildCopilot shall not be liable for any direct, indirect, incidental, consequential, or special damages arising out of or in connection with your use of the Site or any AI workflows, prompts, or outputs derived from our content. This includes, without limitation, any losses arising from reliance on AI-generated content for construction decisions.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">9. Availability</h2>
            <p>
              We aim to keep the Site available at all times, but we do not guarantee uninterrupted access. We may modify, suspend, or discontinue any part of the Site at any time without notice.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">10. Changes to These Terms</h2>
            <p>
              We may update these Terms of Use from time to time. Changes will be posted on this page with an updated revision date. Your continued use of the Site after changes are posted constitutes your acceptance of the revised terms.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">11. Governing Law</h2>
            <p>
              These Terms of Use are governed by and construed in accordance with the laws of England and Wales. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">12. Contact</h2>
            <p>
              If you have any questions about these terms, please contact us at{' '}
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
