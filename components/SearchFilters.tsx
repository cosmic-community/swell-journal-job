'use client'

import type { Author, Category } from '@/types'

// Changed: Created SearchFilters component for category and author filtering
interface SearchFiltersProps {
  categories: Category[]
  authors: Author[]
  selectedCategory: string
  selectedAuthor: string
  onCategoryChange: (slug: string) => void
  onAuthorChange: (slug: string) => void
  resultCount: number
  query: string
}

export default function SearchFilters({
  categories,
  authors,
  selectedCategory,
  selectedAuthor,
  onCategoryChange,
  onAuthorChange,
  resultCount,
  query,
}: SearchFiltersProps) {
  return (
    <div className="space-y-6">
      {/* Result count */}
      <div className="text-sm text-gray-500">
        {query || selectedCategory || selectedAuthor ? (
          <span>
            Found <strong className="text-gray-900">{resultCount}</strong>{' '}
            {resultCount === 1 ? 'article' : 'articles'}
            {query && (
              <>
                {' '}for &ldquo;<span className="text-ocean-600 font-medium">{query}</span>&rdquo;
              </>
            )}
          </span>
        ) : (
          <span>Search through all articles</span>
        )}
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-3">
        {/* Category filter */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onCategoryChange('')}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                selectedCategory === ''
                  ? 'bg-ocean-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => onCategoryChange(cat.slug === selectedCategory ? '' : cat.slug)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                  selectedCategory === cat.slug
                    ? 'bg-ocean-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.metadata?.name || cat.title}
              </button>
            ))}
          </div>
        </div>

        {/* Author filter */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
            Author
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onAuthorChange('')}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                selectedAuthor === ''
                  ? 'bg-ocean-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {authors.map((author) => (
              <button
                key={author.id}
                type="button"
                onClick={() => onAuthorChange(author.slug === selectedAuthor ? '' : author.slug)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                  selectedAuthor === author.slug
                    ? 'bg-ocean-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {author.metadata?.profile_photo && (
                  <img
                    src={`${author.metadata.profile_photo.imgix_url}?w=40&h=40&fit=crop&auto=format,compress`}
                    alt=""
                    width={16}
                    height={16}
                    className="h-4 w-4 rounded-full object-cover"
                  />
                )}
                {author.metadata?.name || author.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active filters summary + clear */}
      {(selectedCategory || selectedAuthor) && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Active filters:</span>
          {selectedCategory && (
            <span className="inline-flex items-center gap-1 rounded-full bg-ocean-100 px-2.5 py-0.5 text-xs font-medium text-ocean-700">
              {categories.find((c) => c.slug === selectedCategory)?.metadata?.name || selectedCategory}
              <button
                type="button"
                onClick={() => onCategoryChange('')}
                className="ml-0.5 hover:text-ocean-900"
                aria-label="Remove category filter"
              >
                ×
              </button>
            </span>
          )}
          {selectedAuthor && (
            <span className="inline-flex items-center gap-1 rounded-full bg-ocean-100 px-2.5 py-0.5 text-xs font-medium text-ocean-700">
              {authors.find((a) => a.slug === selectedAuthor)?.metadata?.name || selectedAuthor}
              <button
                type="button"
                onClick={() => onAuthorChange('')}
                className="ml-0.5 hover:text-ocean-900"
                aria-label="Remove author filter"
              >
                ×
              </button>
            </span>
          )}
          <button
            type="button"
            onClick={() => {
              onCategoryChange('')
              onAuthorChange('')
            }}
            className="text-xs text-gray-400 hover:text-gray-600 underline transition-colors"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}