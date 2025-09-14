import { put, del, list } from '@vercel/blob'

export async function uploadToVercelBlob(file: File, filename: string) {
  try {
    const blob = await put(filename, file, {
      access: 'public',
    })
    return {
      success: true,
      url: blob.url,
      downloadUrl: blob.downloadUrl,
      pathname: blob.pathname,
    }
  } catch (error) {
    console.error('Error uploading to Vercel Blob:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',
    }
  }
}

export async function deleteFromVercelBlob(url: string) {
  try {
    await del(url)
    return { success: true }
  } catch (error) {
    console.error('Error deleting from Vercel Blob:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Delete failed',
    }
  }
}

export async function listVercelBlobs(prefix?: string) {
  try {
    const { blobs } = await list({
      prefix: prefix || 'products/',
      limit: 100,
    })
    return {
      success: true,
      blobs,
    }
  } catch (error) {
    console.error('Error listing Vercel Blobs:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'List failed',
      blobs: [],
    }
  }
}

export function generateBlobFilename(originalName: string, prefix: string = 'products') {
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 8)
  const extension = originalName.split('.').pop()
  return `${prefix}/${timestamp}-${randomString}.${extension}`
}
