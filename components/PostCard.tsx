import Link from 'next/link'
import type { Post } from '@/types'
import CategoryBadge from '@/components/CategoryBadge'

interface PostCardProps {
  post: Post
  featured?: boolean
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const category = post.metadata?.category

  if (featured) {
    return (
      <article className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
        <Link href={`/posts/${post.slug}`} className="block">
          {featuredImage && (
            <div className="relative h-80 overflow-hidden">
              <img
                src={`${featuredImage.imgix_url}?w=1200&h=640&fit=crop&auto=format,compress`}
                alt={post.title}
                width={600}
                height={320}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                {category && (
                  <div className="mb-3">
                    <CategoryBadge category={category} size="md" />
                  </div>
                )}
                <h2 className="text-3xl font-bold text-white leading-tight mb-3">
                  {post.title}
                </h2>
                {author && (
                  <div className="flex items-center gap-3">
                    {author.metadata?.profile_photo && (
                      <img
                        src={`${author.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                        alt={author.metadata?.name || author.title}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full object-cover border-2 border-white/50"
                      />
                    )}
                    <span className="text-sm text-white/90 font-medium">
                      {author.metadata?.name || author.title}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </Link>
      </article>
    )
  }

  return (
    <article className="group overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <Link href={`/posts/${post.slug}`} className="block">
        {featuredImage && (
          <div className="relative h-52 overflow-hidden">
            <img
              src={`${featuredImage.imgix_url}?w=800&h=416&fit=crop&auto=format,compress`}
              alt={post.title}
              width={400}
              height={208}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-6">
          {category && (
            <div className="mb-3">
              <CategoryBadge category={category} />
            </div>
          )}
          <h3 className="text-lg font-bold text-gray-900 leading-snug mb-3 group-hover:text-ocean-600 transition-colors duration-200">
            {post.title}
          </h3>
          {author && (
            <div className="flex items-center gap-2">
              {author.metadata?.profile_photo && (
                <img
                  src={`${author.metadata.profile_photo.imgix_url}?w=60&h=60&fit=crop&auto=format,compress`}
                  alt={author.metadata?.name || author.title}
                  width={30}
                  height={30}
                  className="h-7 w-7 rounded-full object-cover"
                />
              )}
              <span className="text-sm text-gray-500">
                {author.metadata?.name || author.title}
              </span>
            </div>
          )}
        </div>
      </Link>
    </article>
  )
}