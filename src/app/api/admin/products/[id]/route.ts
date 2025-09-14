import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { productUpdateSchema, isSlugUnique } from '@/lib/validations'
import { revalidateTag } from 'next/cache'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const data = productUpdateSchema.parse(body)

    // Check if product exists
    const existingProduct = await db.product.findUnique({
      where: { id: params.id },
    })

    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Check slug uniqueness if slug is being updated
    if (data.slug && data.slug !== existingProduct.slug) {
      const isUnique = await isSlugUnique(data.slug, params.id)
      if (!isUnique) {
        return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })
      }
    }

    // Update product
    const product = await db.product.update({
      where: { id: params.id },
      data,
    })

    // Revalidate cache
    revalidateTag('products')
    revalidateTag(`product:${product.slug}`)

    return NextResponse.json({ product })
  } catch (error) {
    console.error('Update product error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update product' },
      { status: 400 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if product exists
    const existingProduct = await db.product.findUnique({
      where: { id: params.id },
    })

    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Delete product
    await db.product.delete({
      where: { id: params.id },
    })

    // Revalidate cache
    revalidateTag('products')
    revalidateTag(`product:${existingProduct.slug}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete product error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete product' },
      { status: 400 }
    )
  }
}
