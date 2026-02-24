'use client'

import { useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { href: '/', label: 'Home' },
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
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-ocean-700">
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
          mobileOpen ? 'max-h-60 border-t border-ocean-100' : 'max-h-0'
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
        </ul>
      </div>
    </header>
  )
}