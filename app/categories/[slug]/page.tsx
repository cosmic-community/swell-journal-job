// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCategoryBySlug, getPostsByCategory, getCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    return { title: 'Category Not Found' }
  }

  return {
    title: `${category.metadata?.name || category.title} — Swell Journal`,
    description: category.metadata?.description || '',
  }
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((cat) => ({ slug: cat.slug }))
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id)

  const emojiMap: Record<string, string> = {
    'surf-travel': '✈️',
    'technique': '🎯',
    'gear-reviews': '🏄‍♂️',
  }
  const emoji = emojiMap[category.slug] || '🏷️'

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-ocean-600 hover:text-ocean-800 transition-colors duration-200 mb-6"
        >
          <span>←</span>
          Back to all posts
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-5xl">{emoji}</span>
          <div>
            <h1 className="text-4xl font-black text-gray-900">
              {category.metadata?.name || category.title}
            </h1>
            {category.metadata?.description && (
              <p className="mt-2 text-lg text-gray-500">
                {category.metadata.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Posts */}
      {posts.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl bg-white p-12 text-center shadow-md">
          <span className="text-5xl block mb-4">🌊</span>
          <p className="text-lg text-gray-500">
            No posts in this category yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  )
}