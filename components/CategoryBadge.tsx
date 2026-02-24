import Link from 'next/link'
import type { Category } from '@/types'

const categoryColors: Record<string, string> = {
  'surf-travel': 'bg-ocean-100 text-ocean-700 hover:bg-ocean-200',
  'technique': 'bg-sand-100 text-sand-700 hover:bg-sand-200',
  'gear-reviews': 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200',
}

interface CategoryBadgeProps {
  category: Category
  size?: 'sm' | 'md'
}

export default function CategoryBadge({ category, size = 'sm' }: CategoryBadgeProps) {
  const colorClasses = categoryColors[category.slug] || 'bg-gray-100 text-gray-700 hover:bg-gray-200'
  const sizeClasses = size === 'md' ? 'px-4 py-1.5 text-sm' : 'px-3 py-1 text-xs'

  return (
    <Link
      href={`/categories/${category.slug}`}
      className={`inline-block rounded-full font-semibold transition-colors duration-200 ${colorClasses} ${sizeClasses}`}
    >
      {category.metadata?.name || category.title}
    </Link>
  )
}