import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { unstable_cache } from 'next/cache'

const getProductBySlug = unstable_cache(
  async (slug: string) => {
    const product = await db.product.findUnique({
      where: {
        slug,
        isPublished: true,
      },
    })

    if (!product) {
      return null
    }

    // Get related products
    const relatedProducts = await db.product.findMany({
      where: {
        category: product.category,
        isPublished: true,
        id: { not: product.id },
      },
      take: 4,
      orderBy: { updatedAt: 'desc' },
    })

    return {
      product,
      relatedProducts,
    }
  },
  ['product'],
  {
    tags: ['products'],
    revalidate: 3600, // 1 hour
  }
)

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const result = await getProductBySlug(params.slug)
    
    if (!result) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Get product error:', error)
    return NextResponse.json(
      { error: 'Failed to get product' },
      { status: 500 }
    )
  }
}
