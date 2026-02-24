import { getPageBySlug, getAuthors } from '@/lib/cosmic'
import type { Metadata } from 'next'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// Changed: Dynamic metadata from Cosmic CMS
export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('about')

  return {
    title: page?.metadata?.heading
      ? `${page.metadata.heading} — Swell Journal`
      : 'About — Swell Journal',
    description:
      page?.metadata?.seo_description ??
      'Learn more about Swell Journal — who we are, what drives us, and our passion for surf culture.',
  }
}

export default async function AboutPage() {
  const [page, authors] = await Promise.all([
    getPageBySlug('about'),
    getAuthors(),
  ])

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ocean-900 via-ocean-800 to-ocean-950 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwYzIwIDQwIDUwIDYwIDEwMCA2MHM4MC0yMCAxMDAtNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgb3BhY2l0eT0iMC4zIi8+PC9zdmc+')] bg-repeat" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-ocean-300">
            🌊 About Us
          </p>
          <h1 className="text-5xl font-black leading-tight md:text-7xl md:leading-none tracking-tight">
            {page?.metadata?.heading ?? 'About Swell Journal'}
          </h1>
        </div>
      </section>

      {/* Hero Image */}
      {page?.metadata?.hero_image?.imgix_url && (
        <section className="mx-auto max-w-6xl px-6 -mt-8 relative z-10">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src={`${page.metadata.hero_image.imgix_url}?w=1200&h=500&fit=crop&auto=format,compress`}
              alt={page.metadata.heading ?? 'About Swell Journal'}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
        </section>
      )}

      {/* Content Section — Changed: renders Markdown from Cosmic */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        {page?.metadata?.content ? (
          <div className="prose prose-lg prose-ocean max-w-none text-gray-700 leading-relaxed">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {page.metadata.content}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="prose prose-lg prose-ocean max-w-none text-gray-700 leading-relaxed">
            <p>
              Swell Journal is a surf blog built by wave riders, for wave riders.
              We share stories, guides, and tips from surfers who live and breathe
              the ocean. Whether you&apos;re chasing barrels in the Mentawais or
              learning to bottom turn at your local break, we&apos;ve got something
              for you.
            </p>
            <p>
              Our mission is simple — inspire more people to get in the water,
              improve their surfing, and discover new destinations. Every article is
              written from firsthand experience by our team of surfers and ocean
              lovers.
            </p>
          </div>
        )}
      </section>

      {/* Authors / Meet the Team */}
      {authors.length > 0 && (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-10">
              Meet the Writers
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {authors.map((author) => (
                <Link
                  key={author.id}
                  href={`/authors/${author.slug}`}
                  className="group flex items-start gap-5 rounded-xl border border-gray-200 p-6 hover:border-ocean-300 hover:shadow-md transition-all duration-300"
                >
                  {author.metadata?.profile_photo?.imgix_url ? (
                    <img
                      src={`${author.metadata.profile_photo.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                      alt={author.metadata?.name ?? author.title}
                      className="h-20 w-20 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="h-20 w-20 rounded-full bg-ocean-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">✍️</span>
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-ocean-600 transition-colors duration-200">
                      {author.metadata?.name ?? author.title}
                    </h3>
                    {author.metadata?.bio && (
                      <p className="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-3">
                        {author.metadata.bio}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}