// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPostBySlug, getPosts } from '@/lib/cosmic'
import CategoryBadge from '@/components/CategoryBadge'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: `${post.title} — Swell Journal`,
    description: post.metadata?.content?.slice(0, 160) || '',
  }
}

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const category = post.metadata?.category
  const content = post.metadata?.content || ''

  return (
    <article>
      {/* Hero Image */}
      {featuredImage && (
        <div className="relative h-72 md:h-96 overflow-hidden">
          <img
            src={`${featuredImage.imgix_url}?w=1600&h=768&fit=crop&auto=format,compress`}
            alt={post.title}
            width={800}
            height={384}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}

      <div className="mx-auto max-w-3xl px-6 py-12">
        {/* Meta */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          {category && <CategoryBadge category={category} size="md" />}
          {post.created_at && (
            <time className="text-sm text-gray-400">
              {new Date(post.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl font-black text-gray-900 leading-tight md:text-5xl mb-8">
          {post.title}
        </h1>

        {/* Author */}
        {author && (
          <Link
            href={`/authors/${author.slug}`}
            className="mb-10 flex items-center gap-4 group"
          >
            {author.metadata?.profile_photo && (
              <img
                src={`${author.metadata.profile_photo.imgix_url}?w=100&h=100&fit=crop&auto=format,compress`}
                alt={author.metadata?.name || author.title}
                width={50}
                height={50}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-ocean-100"
              />
            )}
            <div>
              <p className="font-semibold text-gray-900 group-hover:text-ocean-600 transition-colors duration-200">
                {author.metadata?.name || author.title}
              </p>
              {author.metadata?.bio && (
                <p className="text-sm text-gray-500 line-clamp-1">
                  {author.metadata.bio}
                </p>
              )}
            </div>
          </Link>
        )}

        {/* Content */}
        <div className="prose prose-lg prose-ocean max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-ocean-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-li:text-gray-700">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>

        {/* Back Link */}
        <div className="mt-16 border-t border-gray-200 pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-ocean-600 hover:text-ocean-800 transition-colors duration-200"
          >
            <span>←</span>
            Back to all posts
          </Link>
        </div>
      </div>
    </article>
  )
}