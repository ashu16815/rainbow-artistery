import { z } from 'zod'

export const productInputSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters').max(80, 'Title must be less than 80 characters'),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(1200, 'Description must be less than 1200 characters'),
  category: z.string().min(2, 'Category must be at least 2 characters'),
  tags: z.array(z.string()).max(10, 'Maximum 10 tags allowed').default([]),
  personalizable: z.boolean().default(true),
  priceINR: z.number().positive('Price must be positive').optional(),
  isFeatured: z.boolean().default(false),
  featuredOrder: z.number().int().min(0, 'Featured order must be 0 or greater').optional(),
  isPublished: z.boolean().default(false),
  coverUrl: z.string().url('Cover URL must be a valid URL'),
  mediaUrls: z.array(z.string().url('Media URL must be a valid URL')).max(10, 'Maximum 10 media URLs allowed').default([]),
  videoUrl: z.string().url('Video URL must be a valid URL').optional(),
  materials: z.string().optional(),
  sizeNote: z.string().optional(),
})

export const productUpdateSchema = productInputSchema.partial()

export const mediaUploadSchema = z.object({
  filename: z.string().min(1, 'Filename is required'),
  contentType: z.string().regex(/^(image|video)\//, 'Only image and video files are allowed'),
  size: z.number().max(8 * 1024 * 1024, 'File size must be less than 8MB'),
})

export type ProductInput = z.infer<typeof productInputSchema>
export type ProductUpdate = z.infer<typeof productUpdateSchema>
export type MediaUpload = z.infer<typeof mediaUploadSchema>

// Utility function to generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
}

// Utility function to validate slug uniqueness
export async function isSlugUnique(slug: string, excludeId?: string): Promise<boolean> {
  const { db } = await import('./db')
  
  const existing = await db.product.findFirst({
    where: {
      slug,
      ...(excludeId && { id: { not: excludeId } })
    }
  })
  
  return !existing
}
