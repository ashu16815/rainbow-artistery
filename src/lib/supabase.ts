import { createClient } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side Supabase client
export function createServerSupabaseClient() {
  const cookieStore = cookies()

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: Record<string, unknown>) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: Record<string, unknown>) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
}

// Storage functions
export async function uploadFile(
  bucket: string,
  path: string,
  file: File,
  options?: {
    cacheControl?: string
    contentType?: string
    upsert?: boolean
  }
) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, options)

  if (error) {
    throw new Error(`Upload failed: ${error.message}`)
  }

  return data
}

export async function getPublicUrl(bucket: string, path: string) {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path)

  return data.publicUrl
}

export async function deleteFile(bucket: string, path: string) {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path])

  if (error) {
    throw new Error(`Delete failed: ${error.message}`)
  }
}

export async function listFiles(bucket: string, folder?: string) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .list(folder)

  if (error) {
    throw new Error(`List failed: ${error.message}`)
  }

  return data
}

// Generate unique file path
export function generateFilePath(filename: string, folder = 'products') {
  const timestamp = Date.now()
  const randomId = Math.random().toString(36).substring(2, 15)
  const extension = filename.split('.').pop()
  return `${folder}/${timestamp}-${randomId}.${extension}`
}
