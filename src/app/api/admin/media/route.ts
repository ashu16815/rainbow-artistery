import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { supabase } from '@/lib/supabase'

export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key')

    if (!key) {
      return NextResponse.json({ error: 'Key is required' }, { status: 400 })
    }

    // Delete file from Supabase storage
    const { error } = await supabase.storage
      .from('products')
      .remove([key])

    if (error) {
      throw new Error(`Failed to delete file: ${error.message}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete media error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete file' },
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
    const folder = searchParams.get('folder') || 'products'
    const search = searchParams.get('search')

    // List files from Supabase storage
    const { data, error } = await supabase.storage
      .from('products')
      .list(folder)

    if (error) {
      throw new Error(`Failed to list files: ${error.message}`)
    }

    // Filter by search term if provided
    let filteredData = data
    if (search) {
      filteredData = data.filter(file => 
        file.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Add public URLs
    const filesWithUrls = filteredData.map(file => ({
      ...file,
      publicUrl: supabase.storage.from('products').getPublicUrl(`${folder}/${file.name}`).data.publicUrl,
    }))

    return NextResponse.json({ files: filesWithUrls })
  } catch (error) {
    console.error('List media error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to list files' },
      { status: 400 }
    )
  }
}
