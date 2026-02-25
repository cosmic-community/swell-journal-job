import { Suspense } from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import SearchResults from '@/components/SearchResults'

// Changed: Created dedicated search page with real-time filtering

export const metadata: Metadata = {
  title: 'Search — Swell Journal',
  description: 'Search through surf stories, guides, and tips on Swell Journal.',
}

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      {/* Header */}
      <div className="mb-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-ocean-600 hover:text-ocean-800 transition-colors duration-200 mb-6"
        >
          <span>←</span>
          Back to home
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-5xl">🔍</span>
          <div>
            <h1 className="text-4xl font-black text-gray-900">Search Articles</h1>
            <p className="mt-2 text-lg text-gray-500">
              Find stories, guides, and tips across all categories
            </p>
          </div>
        </div>
      </div>

      {/* Search interface wrapped in Suspense for useSearchParams */}
      <Suspense
        fallback={
          <div className="space-y-8">
            <div className="animate-pulse h-14 rounded-xl bg-gray-200" />
            <div className="animate-pulse h-20 rounded bg-gray-100" />
            <div className="grid gap-8 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={`fallback-${i}`} className="animate-pulse rounded-xl bg-white shadow-md overflow-hidden">
                  <div className="h-52 bg-gray-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 w-20 rounded bg-gray-200" />
                    <div className="h-5 w-3/4 rounded bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
      >
        <SearchResults />
      </Suspense>
    </div>
  )
}