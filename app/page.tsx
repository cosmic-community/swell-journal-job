import { getPosts, getCategories, getAuthors } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import AuthorCard from '@/components/AuthorCard'
import Link from 'next/link'

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