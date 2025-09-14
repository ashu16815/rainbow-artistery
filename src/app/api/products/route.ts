import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { unstable_cache } from 'next/cache'

const getProducts = unstable_cache(
  async (searchParams: URLSearchParams) => {
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const search = searchParams.get('search')
    const category = searchParams.get('category')
    const tags = searchParams.get('tags')
    const isFeatured = searchParams.get('isFeatured')

    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {
      isPublished: true,
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (category) {
      where.category = category
    }

    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim())
      where.tags = {
        hasSome: tagArray,
      }
    }

    if (isFeatured === 'true') {
      where.isFeatured = true
    }

    const orderBy: Record<string, string> = {}
    if (isFeatured === 'true') {
      orderBy.featuredOrder = 'asc'
      orderBy.updatedAt = 'desc'
    } else {
      orderBy.updatedAt = 'desc'
    }

    const [products, total] = await Promise.all([
      db.product.findMany({
        where,
        skip,
        take: limit,
        orderBy,
      }),
      db.product.count({ where }),
    ])

    return {
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    }
  },
  ['products'],
  {
    tags: ['products'],
    revalidate: 3600, // 1 hour
  }
)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const result = await getProducts(searchParams)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Get products error:', error)
    return NextResponse.json(
      { error: 'Failed to get products' },
      { status: 500 }
    )
  }
}
