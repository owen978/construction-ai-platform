import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'

/**
 * Renders Markdown guide/article content with BuildCopilot styling.
 * Replaces the old plaintext (whitespace-pre-wrap) rendering so articles
 * get proper heading tags, lists, and tables — important for both SEO
 * (semantic structure) and GEO (AI engines extract from clear headings).
 */
export function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="text-slate-700">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 className="mt-12 mb-4 scroll-mt-24 border-b border-slate-200 pb-2 text-2xl font-bold tracking-tight text-slate-900">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-8 mb-3 text-xl font-semibold text-slate-900">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="mt-6 mb-2 text-lg font-semibold text-slate-900">{children}</h4>
          ),
          p: ({ children }) => (
            <p className="mb-5 text-base leading-relaxed text-slate-700">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="mb-5 ml-5 list-disc space-y-2 text-slate-700 marker:text-primary">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-5 ml-5 list-decimal space-y-2 text-slate-700 marker:text-slate-400">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          a: ({ href, children }) => {
            const url = href ?? '#'
            const isInternal = url.startsWith('/')
            if (isInternal) {
              return (
                <Link href={url} className="font-medium text-primary underline underline-offset-2 hover:text-primary/80">
                  {children}
                </Link>
              )
            }
            return (
              <a href={url} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-2 hover:text-primary/80">
                {children}
              </a>
            )
          },
          strong: ({ children }) => <strong className="font-semibold text-slate-900">{children}</strong>,
          blockquote: ({ children }) => (
            <blockquote className="my-6 border-l-4 border-primary bg-slate-50 py-2 pl-4 pr-3 text-slate-600 italic">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full border-collapse text-left text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-slate-50">{children}</thead>,
          th: ({ children }) => (
            <th className="border-b border-slate-200 px-4 py-3 font-semibold text-slate-900">{children}</th>
          ),
          td: ({ children }) => (
            <td className="border-b border-slate-100 px-4 py-3 align-top text-slate-700">{children}</td>
          ),
          code: ({ children }) => (
            <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-slate-800">{children}</code>
          ),
          hr: () => <hr className="my-10 border-slate-200" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
