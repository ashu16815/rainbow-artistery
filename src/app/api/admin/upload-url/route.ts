import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { supabase, generateFilePath } from '@/lib/supabase'
import { mediaUploadSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { filename, contentType, size } = mediaUploadSchema.parse(body)

    // Generate unique file path
    const filePath = generateFilePath(filename)

    // Get signed URL for upload
    const { data, error } = await supabase.storage
      .from('products')
      .createSignedUploadUrl(filePath, {
        upsert: false,
        cacheControl: '3600',
      })

    if (error) {
      throw new Error(`Failed to create signed URL: ${error.message}`)
    }

    return NextResponse.json({
      url: data.signedUrl,
      path: filePath,
      publicUrl: supabase.storage.from('products').getPublicUrl(filePath).data.publicUrl,
    })
  } catch (error) {
    console.error('Upload URL error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create upload URL' },
      { status: 400 }
    )
  }
}
