import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { productInputSchema, generateSlug, isSlugUnique } from '@/lib/validations'
import { revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const data = productInputSchema.parse(body)

    // Generate slug if not provided
    if (!data.slug) {
      data.slug = generateSlug(data.title)
    }

    // Check slug uniqueness
    const isUnique = await isSlugUnique(data.slug)
    if (!isUnique) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })
    }

    // Create product
    const product = await db.product.create({
      data: {
        ...data,
        slug: data.slug,
      },
    })

    // Revalidate cache
    revalidateTag('products')
    revalidateTag(`product:${product.slug}`)

    return NextResponse.json({ product })
  } catch (error) {
    console.error('Create product error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create product' },
      { status: 400 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search')
    const category = searchParams.get('category')
    const isPublished = searchParams.get('isPublished')

    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {}
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }
    if (category) {
      where.category = category
    }
    if (isPublished !== null) {
      where.isPublished = isPublished === 'true'
    }

    const [products, total] = await Promise.all([
      db.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { updatedAt: 'desc' },
      }),
      db.product.count({ where }),
    ])

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Get products error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to get products' },
      { status: 400 }
    )
  }
}
