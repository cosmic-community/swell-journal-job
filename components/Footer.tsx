import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-ocean-950 text-ocean-200">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🏄</span>
              <span className="text-xl font-bold text-white tracking-tight">
                Swell Journal
              </span>
            </Link>
            <p className="text-sm text-ocean-300 leading-relaxed max-w-xs">
              Stories, guides, and tips from surfers who live and breathe the ocean.
              Powered by Cosmic.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors duration-200">
                  All Posts
                </Link>
              </li>
              {/* Changed: Added About link */}
              <li>
                <Link href="/about" className="hover:text-white transition-colors duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link href="/categories/surf-travel" className="hover:text-white transition-colors duration-200">
                  Surf Travel
                </Link>
              </li>
              <li>
                <Link href="/categories/technique" className="hover:text-white transition-colors duration-200">
                  Technique
                </Link>
              </li>
              <li>
                <Link href="/categories/gear-reviews" className="hover:text-white transition-colors duration-200">
                  Gear Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Credits */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Built With
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://www.cosmicjs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  Cosmic
                </a>
              </li>
              <li>
                <a
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  Next.js
                </a>
              </li>
              <li>
                <a
                  href="https://tailwindcss.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  Tailwind CSS
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-ocean-800 pt-8 text-center text-xs text-ocean-400">
          © {new Date().getFullYear()} Swell Journal. All rights reserved.
        </div>
      </div>
    </footer>
  )
}