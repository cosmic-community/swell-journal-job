'use client'

import { useState } from 'react'
import Link from 'next/link'
import SearchBar from '@/components/SearchBar'

// Changed: Added Search link to navigation and integrated SearchBar component

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/search', label: 'Search' },
  { href: '/#categories', label: 'Categories' },
  { href: '/#authors', label: 'Authors' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-lg border-b border-ocean-100">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-3xl group-hover:rotate-12 transition-transform duration-300">🏄</span>
          <span className="text-xl font-bold text-ocean-900 tracking-tight">
            Swell Journal
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-8 text-sm font-medium text-ocean-700">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-ocean-500 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <SearchBar variant="header" />
        </div>

        {/* Hamburger button – mobile only */}
        <button
          type="button"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-lg hover:bg-ocean-100 transition-colors duration-200"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <span
            className={`block h-0.5 w-5 rounded bg-ocean-800 transition-all duration-300 ${
              mobileOpen ? 'translate-y-[3px] rotate-45' : '-translate-y-1'
            }`}
          />
          <span
            className={`block h-0.5 w-5 rounded bg-ocean-800 transition-all duration-300 ${
              mobileOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`block h-0.5 w-5 rounded bg-ocean-800 transition-all duration-300 ${
              mobileOpen ? '-translate-y-[3px] -rotate-45' : 'translate-y-1'
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? 'max-h-72 border-t border-ocean-100' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col gap-1 px-6 py-4 text-sm font-medium text-ocean-700">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2.5 hover:bg-ocean-100 hover:text-ocean-500 transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
          {/* Mobile search link */}
          <li>
            <Link
              href="/search"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 hover:bg-ocean-100 hover:text-ocean-500 transition-colors duration-200"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Search Articles
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}