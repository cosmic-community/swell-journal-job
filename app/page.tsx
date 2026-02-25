import { getPosts, getCategories, getAuthors } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import AuthorCard from '@/components/AuthorCard'
import NewsletterForm from '@/components/NewsletterForm'
import Link from 'next/link'

// Changed: Added search CTA section and newsletter subscription to the homepage

export default async function HomePage() {
  const [posts, categories, authors] = await Promise.all([
    getPosts(),
    getCategories(),
    getAuthors(),
  ])

  const featuredPost = posts[0]
  const remainingPosts = posts.slice(1)

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ocean-900 via-ocean-800 to-ocean-950 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwYzIwIDQwIDUwIDYwIDEwMCA2MHM4MC0yMCAxMDAtNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgb3BhY2l0eT0iMC4zIi8+PC9zdmc+')] bg-repeat" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-ocean-300">
            🌊 Surf Stories & Guides
          </p>
          <h1 className="text-5xl font-black leading-tight md:text-7xl md:leading-none tracking-tight">
            Swell
            <br />
            <span className="text-ocean-300">Journal</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-ocean-200 leading-relaxed">
            Stories, guides, and tips from surfers who live and breathe the
            ocean. Discover new breaks, refine your technique, and find your
            next adventure.
          </p>
          {/* Changed: Added search CTA link */}
          <Link
            href="/search"
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Search all articles
          </Link>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="mx-auto max-w-6xl px-6 -mt-8 relative z-10">
          <PostCard post={featuredPost} featured />
        </section>
      )}

      {/* All Posts */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-10">
          Latest Articles
        </h2>
        {remainingPosts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2">
            {remainingPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No additional posts to show yet. Check back soon!
          </p>
        )}
      </section>

      {/* Changed: Added Newsletter Subscription section */}
      <section className="bg-gradient-to-br from-ocean-800 via-ocean-900 to-ocean-950 py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <span className="text-4xl mb-4 block">📬</span>
          <h2 className="text-3xl font-bold text-white mb-3">
            Stay in the Lineup
          </h2>
          <p className="text-ocean-200 mb-8 leading-relaxed">
            Get the latest surf stories, technique tips, and gear reviews
            delivered straight to your inbox. Join the Swell Journal community.
          </p>
          <div className="mx-auto max-w-xl">
            <NewsletterForm />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">
            Browse by Category
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {categories.map((category) => {
              const emojiMap: Record<string, string> = {
                'surf-travel': '✈️',
                'technique': '🎯',
                'gear-reviews': '🏄‍♂️',
              }
              const emoji = emojiMap[category.slug] || '🏷️'

              return (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="group rounded-xl border border-gray-200 p-6 hover:border-ocean-300 hover:shadow-md transition-all duration-300"
                >
                  <span className="text-3xl mb-3 block">{emoji}</span>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-ocean-600 transition-colors duration-200">
                    {category.metadata?.name || category.title}
                  </h3>
                  {category.metadata?.description && (
                    <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                      {category.metadata.description}
                    </p>
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Authors */}
      <section id="authors" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-10">
          Meet the Writers
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {authors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      </section>
    </>
  )
}