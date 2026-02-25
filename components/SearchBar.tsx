'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Changed: Created SearchBar component for header integration with keyboard shortcut support
interface SearchBarProps {
  variant?: 'header' | 'page'
  initialQuery?: string
  onSearch?: (query: string) => void
}

export default function SearchBar({ variant = 'header', initialQuery = '', onSearch }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery)
  const [isExpanded, setIsExpanded] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Changed: Keyboard shortcut (Cmd/Ctrl + K) to focus search
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (variant === 'header') {
          setIsExpanded(true)
          setTimeout(() => inputRef.current?.focus(), 100)
        } else {
          inputRef.current?.focus()
        }
      }
      if (e.key === 'Escape' && variant === 'header') {
        setIsExpanded(false)
        setQuery('')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [variant])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      const trimmed = query.trim()
      if (onSearch) {
        onSearch(trimmed)
      } else if (trimmed) {
        router.push(`/search?q=${encodeURIComponent(trimmed)}`)
        if (variant === 'header') {
          setIsExpanded(false)
        }
      }
    },
    [query, onSearch, router, variant]
  )

  // Header variant: compact icon that expands
  if (variant === 'header') {
    return (
      <div className="relative flex items-center">
        {isExpanded ? (
          <form onSubmit={handleSubmit} className="flex items-center">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search posts..."
                className="w-48 rounded-full border border-ocean-200 bg-white px-4 py-1.5 pr-8 text-sm text-gray-900 placeholder:text-gray-400 focus:border-ocean-400 focus:outline-none focus:ring-1 focus:ring-ocean-400 transition-all duration-200"
                autoFocus
              />
              <button
                type="button"
                onClick={() => {
                  setIsExpanded(false)
                  setQuery('')
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Close search"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </form>
        ) : (
          <button
            type="button"
            onClick={() => {
              setIsExpanded(true)
              setTimeout(() => inputRef.current?.focus(), 100)
            }}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-ocean-600 hover:bg-ocean-100 transition-colors duration-200"
            aria-label="Open search"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="hidden lg:inline text-xs text-gray-400">⌘K</span>
          </button>
        )}
      </div>
    )
  }

  // Page variant: full-width search input
  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            if (onSearch) {
              onSearch(e.target.value)
            }
          }}
          placeholder="Search articles by title or content..."
          className="w-full rounded-xl border border-gray-200 bg-white py-4 pl-12 pr-4 text-lg text-gray-900 placeholder:text-gray-400 focus:border-ocean-400 focus:outline-none focus:ring-2 focus:ring-ocean-200 shadow-sm transition-all duration-200"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('')
              if (onSearch) {
                onSearch('')
              }
              inputRef.current?.focus()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </form>
  )
}