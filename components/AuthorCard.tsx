import Link from 'next/link'
import type { Author } from '@/types'

interface AuthorCardProps {
  author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
  const profilePhoto = author.metadata?.profile_photo

  return (
    <Link
      href={`/authors/${author.slug}`}
      className="group flex items-center gap-5 rounded-xl bg-white p-5 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      {profilePhoto && (
        <img
          src={`${profilePhoto.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
          alt={author.metadata?.name || author.title}
          width={80}
          height={80}
          className="h-20 w-20 rounded-full object-cover ring-4 ring-ocean-100 group-hover:ring-ocean-200 transition-all duration-300"
        />
      )}
      <div>
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-ocean-600 transition-colors duration-200">
          {author.metadata?.name || author.title}
        </h3>
        {author.metadata?.bio && (
          <p className="mt-1 text-sm text-gray-500 line-clamp-2 leading-relaxed">
            {author.metadata.bio}
          </p>
        )}
      </div>
    </Link>
  )
}