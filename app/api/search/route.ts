import { NextRequest, NextResponse } from 'next/server'
import { searchPosts, getCategories, getAuthors } from '@/lib/cosmic'

// Changed: Created search API route for real-time search with filters
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q') ?? ''
  const categorySlug = searchParams.get('category') ?? undefined
  const authorSlug = searchParams.get('author') ?? undefined

  try {
    const [posts, categories, authors] = await Promise.all([
      searchPosts(query, categorySlug, authorSlug),
      getCategories(),
      getAuthors(),
    ])

    return NextResponse.json({
      posts,
      categories,
      authors,
      query,
      filters: {
        category: categorySlug ?? null,
        author: authorSlug ?? null,
      },
    })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Failed to search posts', posts: [], categories: [], authors: [] },
      { status: 500 }
    )
  }
}