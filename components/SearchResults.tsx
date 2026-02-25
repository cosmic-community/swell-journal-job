'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { Post, Author, Category } from '@/types'
import PostCard from '@/components/PostCard'
import SearchBar from '@/components/SearchBar'
import SearchFilters from '@/components/SearchFilters'

// Changed: Created SearchResults client component for real-time search with debounce and filters

interface SearchApiResponse {
  posts: Post[]
  categories: Category[]
  authors: Author[]
  query: string
  filters: {
    category: string | null
    author: string | null
  }
  error?: string
}

export default function SearchResults() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') ?? ''
  const initialCategory = searchParams.get('category') ?? ''
  const initialAuthor = searchParams.get('author') ?? ''

  const [query, setQuery] = useState(initialQuery)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [selectedAuthor, setSelectedAuthor] = useState(initialAuthor)
  const [posts, setPosts] = useState<Post[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [authors, setAuthors] = useState<Author[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasSearched, setHasSearched] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const fetchResults = useCallback(async (q: string, cat: string, auth: string) => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      if (q.trim()) params.set('q', q.trim())
      if (cat) params.set('category', cat)
      if (auth) params.set('author', auth)

      const response = await fetch(`/api/search?${params.toString()}`)
      const data: SearchApiResponse = await response.json()

      if (!response.ok) {
        console.error('Search API error:', data.error)
        setPosts([])
      } else {
        setPosts(data.posts)
        if (data.categories.length > 0) {
          setCategories(data.categories)
        }
        if (data.authors.length > 0) {
          setAuthors(data.authors)
        }
      }
      setHasSearched(true)
    } catch (error) {
      console.error('Search fetch error:', error)
      setPosts([])
      setHasSearched(true)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Changed: Update URL params without full page reload
  const updateUrl = useCallback(
    (q: string, cat: string, auth: string) => {
      const params = new URLSearchParams()
      if (q.trim()) params.set('q', q.trim())
      if (cat) params.set('category', cat)
      if (auth) params.set('author', auth)
      const paramString = params.toString()
      router.replace(`/search${paramString ? `?${paramString}` : ''}`, { scroll: false })
    },
    [router]
  )

  // Changed: Debounced search on query change
  const handleSearch = useCallback(
    (newQuery: string) => {
      setQuery(newQuery)
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
      debounceRef.current = setTimeout(() => {
        updateUrl(newQuery, selectedCategory, selectedAuthor)
        fetchResults(newQuery, selectedCategory, selectedAuthor)
      }, 300)
    },
    [selectedCategory, selectedAuthor, updateUrl, fetchResults]
  )

  // Changed: Immediate search on filter change
  const handleCategoryChange = useCallback(
    (slug: string) => {
      setSelectedCategory(slug)
      updateUrl(query, slug, selectedAuthor)
      fetchResults(query, slug, selectedAuthor)
    },
    [query, selectedAuthor, updateUrl, fetchResults]
  )

  const handleAuthorChange = useCallback(
    (slug: string) => {
      setSelectedAuthor(slug)
      updateUrl(query, selectedCategory, slug)
      fetchResults(query, selectedCategory, slug)
    },
    [query, selectedCategory, updateUrl, fetchResults]
  )

  // Changed: Initial load
  useEffect(() => {
    fetchResults(initialQuery, initialCategory, initialAuthor)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Changed: Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [])

  return (
    <div className="space-y-8">
      {/* Search input */}
      <SearchBar variant="page" initialQuery={query} onSearch={handleSearch} />

      {/* Filters */}
      <SearchFilters
        categories={categories}
        authors={authors}
        selectedCategory={selectedCategory}
        selectedAuthor={selectedAuthor}
        onCategoryChange={handleCategoryChange}
        onAuthorChange={handleAuthorChange}
        resultCount={posts.length}
        query={query}
      />

      {/* Results */}
      <div className="min-h-[200px]">
        {isLoading ? (
          <div className="grid gap-8 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={`skeleton-${i}`}
                className="animate-pulse rounded-xl bg-white shadow-md overflow-hidden"
              >
                <div className="h-52 bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-4 w-20 rounded bg-gray-200" />
                  <div className="h-5 w-3/4 rounded bg-gray-200" />
                  <div className="h-4 w-1/2 rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : hasSearched ? (
          <div className="rounded-xl bg-white p-12 text-center shadow-md">
            <span className="text-5xl block mb-4">🔍</span>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {query
                ? `We couldn't find any articles matching "${query}". Try a different search term or adjust your filters.`
                : 'Try searching for a topic or adjusting your filters.'}
            </p>
            {(selectedCategory || selectedAuthor) && (
              <button
                type="button"
                onClick={() => {
                  handleCategoryChange('')
                  handleAuthorChange('')
                }}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-ocean-100 px-4 py-2 text-sm font-medium text-ocean-700 hover:bg-ocean-200 transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}