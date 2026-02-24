import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-lg border-b border-ocean-100">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-3xl group-hover:rotate-12 transition-transform duration-300">🏄</span>
          <span className="text-xl font-bold text-ocean-900 tracking-tight">
            Swell Journal
          </span>
        </Link>

        <ul className="flex items-center gap-8 text-sm font-medium text-ocean-700">
          <li>
            <Link
              href="/"
              className="hover:text-ocean-500 transition-colors duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/#categories"
              className="hover:text-ocean-500 transition-colors duration-200"
            >
              Categories
            </Link>
          </li>
          <li>
            <Link
              href="/#authors"
              className="hover:text-ocean-500 transition-colors duration-200"
            >
              Authors
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}