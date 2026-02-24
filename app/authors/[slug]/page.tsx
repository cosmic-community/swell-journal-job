// app/authors/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAuthorBySlug, getPostsByAuthor, getAuthors } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    return { title: 'Author Not Found' }
  }

  return {
    title: `${author.metadata?.name || author.title} — Swell Journal`,
    description: author.metadata?.bio || '',
  }
}

export async function generateStaticParams() {
  const authors = await getAuthors()
  return authors.map((a) => ({ slug: a.slug }))
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)
  const profilePhoto = author.metadata?.profile_photo

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      {/* Back Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-ocean-600 hover:text-ocean-800 transition-colors duration-200 mb-10"
      >
        <span>←</span>
        Back to all posts
      </Link>

      {/* Author Profile */}
      <div className="mb-14 flex flex-col items-center text-center md:flex-row md:items-start md:text-left md:gap-8">
        {profilePhoto && (
          <img
            src={`${profilePhoto.imgix_url}?w=320&h=320&fit=crop&auto=format,compress`}
            alt={author.metadata?.name || author.title}
            width={160}
            height={160}
            className="h-40 w-40 rounded-full object-cover ring-4 ring-ocean-100 shadow-lg mb-6 md:mb-0"
          />
        )}
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-ocean-500 mb-2">
            ✍️ Author
          </p>
          <h1 className="text-4xl font-black text-gray-900">
            {author.metadata?.name || author.title}
          </h1>
          {author.metadata?.bio && (
            <p className="mt-4 max-w-xl text-lg text-gray-500 leading-relaxed">
              {author.metadata.bio}
            </p>
          )}
        </div>
      </div>

      {/* Author's Posts */}
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Posts by {author.metadata?.name || author.title}
      </h2>
      {posts.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl bg-white p-12 text-center shadow-md">
          <span className="text-5xl block mb-4">📝</span>
          <p className="text-lg text-gray-500">
            No posts from this author yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  )
}