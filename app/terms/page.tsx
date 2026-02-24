import { getPageBySlug } from '@/lib/cosmic'
import type { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// Changed: Dynamic metadata from Cosmic CMS for terms page
export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('terms')

  return {
    title: page?.metadata?.heading
      ? `${page.metadata.heading} — Swell Journal`
      : 'Terms & Conditions — Swell Journal',
    description:
      page?.metadata?.seo_description ??
      'Terms and conditions for using Swell Journal.',
  }
}

export default async function TermsPage() {
  const page = await getPageBySlug('terms')

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ocean-900 via-ocean-800 to-ocean-950 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwYzIwIDQwIDUwIDYwIDEwMCA2MHM4MC0yMCAxMDAtNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgb3BhY2l0eT0iMC4zIi8+PC9zdmc+')] bg-repeat" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-ocean-300">
            📜 Legal
          </p>
          <h1 className="text-5xl font-black leading-tight md:text-7xl md:leading-none tracking-tight">
            {page?.metadata?.heading ?? 'Terms & Conditions'}
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        {page?.metadata?.content ? (
          <div className="prose prose-lg prose-ocean max-w-none text-gray-700 leading-relaxed">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {page.metadata.content}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="prose prose-lg prose-ocean max-w-none text-gray-700 leading-relaxed">
            <p>
              Terms and conditions content is coming soon. Please check back
              later.
            </p>
          </div>
        )}
      </section>
    </>
  )
}