'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { X, Plus, Save, Eye } from 'lucide-react'
import { toast } from 'sonner'
import { productInputSchema, ProductInput, generateSlug } from '@/lib/validations'
import { MediaUploader } from './media-uploader'

interface ProductFormProps {
  product?: ProductInput & { id?: string }
  onSave: (data: ProductInput) => Promise<void>
  onCancel: () => void
  isSaving?: boolean
}

export function ProductForm({ product, onSave, onCancel, isSaving = false }: ProductFormProps) {
  const [tags, setTags] = useState<string[]>(product?.tags || [])
  const [newTag, setNewTag] = useState('')
  const [mediaUrls, setMediaUrls] = useState<string[]>(product?.mediaUrls || [])
  const [coverUrl, setCoverUrl] = useState(product?.coverUrl || '')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<ProductInput>({
    resolver: zodResolver(productInputSchema),
    defaultValues: {
      title: product?.title || '',
      slug: product?.slug || '',
      description: product?.description || '',
      category: product?.category || '',
      tags: product?.tags || [],
      personalizable: product?.personalizable ?? true,
      priceINR: product?.priceINR || undefined,
      isFeatured: product?.isFeatured || false,
      featuredOrder: product?.featuredOrder || undefined,
      isPublished: product?.isPublished || false,
      coverUrl: product?.coverUrl || '',
      mediaUrls: product?.mediaUrls || [],
      videoUrl: product?.videoUrl || '',
      materials: product?.materials || '',
      sizeNote: product?.sizeNote || '',
    },
  })

  const watchedTitle = watch('title')
  const watchedSlug = watch('slug')

  // Auto-generate slug from title
  useEffect(() => {
    if (watchedTitle && !watchedSlug) {
      const generatedSlug = generateSlug(watchedTitle)
      setValue('slug', generatedSlug)
    }
  }, [watchedTitle, watchedSlug, setValue])

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim()) && tags.length < 10) {
      const updatedTags = [...tags, newTag.trim()]
      setTags(updatedTags)
      setValue('tags', updatedTags)
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove)
    setTags(updatedTags)
    setValue('tags', updatedTags)
  }

  const handleMediaUpload = (url: string, path: string) => {
    const updatedMediaUrls = [...mediaUrls, url]
    setMediaUrls(updatedMediaUrls)
    setValue('mediaUrls', updatedMediaUrls)
  }

  const handleMediaRemove = (path: string) => {
    // Remove from mediaUrls array
    const updatedMediaUrls = mediaUrls.filter(url => !url.includes(path))
    setMediaUrls(updatedMediaUrls)
    setValue('mediaUrls', updatedMediaUrls)
  }

  const handleCoverUpload = (url: string, path: string) => {
    setCoverUrl(url)
    setValue('coverUrl', url)
  }

  const onSubmit = async (data: ProductInput) => {
    try {
      await onSave(data)
      toast.success('Product saved successfully')
    } catch (error) {
      toast.error('Failed to save product')
      console.error('Save error:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                {...register('title')}
                placeholder="Product title"
              />
              {errors.title && (
                <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                {...register('slug')}
                placeholder="product-slug"
              />
              {errors.slug && (
                <p className="text-sm text-red-500 mt-1">{errors.slug.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Input
                id="category"
                {...register('category')}
                placeholder="e.g., Wall Hanging, Name Plate"
              />
              {errors.category && (
                <p className="text-sm text-red-500 mt-1">{errors.category.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                {...register('description')}
                placeholder="Product description"
                rows={4}
              />
              {errors.description && (
                <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="priceINR">Price (INR)</Label>
              <Input
                id="priceINR"
                type="number"
                {...register('priceINR', { valueAsNumber: true })}
                placeholder="999"
              />
              {errors.priceINR && (
                <p className="text-sm text-red-500 mt-1">{errors.priceINR.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Media */}
        <Card>
          <CardHeader>
            <CardTitle>Media</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Cover Image *</Label>
              <MediaUploader
                onUpload={handleCoverUpload}
                maxFiles={1}
                acceptedTypes={['image/*']}
              />
              {coverUrl && (
                <div className="mt-2">
                  <img
                    src={coverUrl}
                    alt="Cover preview"
                    className="w-20 h-20 object-cover rounded"
                  />
                </div>
              )}
            </div>

            <div>
              <Label>Gallery Images</Label>
              <MediaUploader
                onUpload={handleMediaUpload}
                onRemove={handleMediaRemove}
                maxFiles={10}
                acceptedTypes={['image/*']}
              />
              {mediaUrls.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {mediaUrls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Gallery ${index + 1}`}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ))}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="videoUrl">Video URL</Label>
              <Input
                id="videoUrl"
                {...register('videoUrl')}
                placeholder="https://youtube.com/watch?v=..."
              />
              {errors.videoUrl && (
                <p className="text-sm text-red-500 mt-1">{errors.videoUrl.message}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tags */}
      <Card>
        <CardHeader>
          <CardTitle>Tags</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add a tag"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            />
            <Button type="button" onClick={addTag} disabled={!newTag.trim() || tags.length >= 10}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Additional Details */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="materials">Materials</Label>
              <Input
                id="materials"
                {...register('materials')}
                placeholder="e.g., Cotton threads, mirrors, beads"
              />
            </div>

            <div>
              <Label htmlFor="sizeNote">Size Note</Label>
              <Input
                id="sizeNote"
                {...register('sizeNote')}
                placeholder="e.g., Approx. 8 inch ring"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="personalizable"
                checked={watch('personalizable')}
                onCheckedChange={(checked) => setValue('personalizable', checked)}
              />
              <Label htmlFor="personalizable">Personalizable</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isFeatured"
                checked={watch('isFeatured')}
                onCheckedChange={(checked) => setValue('isFeatured', checked)}
              />
              <Label htmlFor="isFeatured">Featured Product</Label>
            </div>

            {watch('isFeatured') && (
              <div>
                <Label htmlFor="featuredOrder">Featured Order</Label>
                <Input
                  id="featuredOrder"
                  type="number"
                  {...register('featuredOrder', { valueAsNumber: true })}
                  placeholder="1"
                />
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Switch
                id="isPublished"
                checked={watch('isPublished')}
                onCheckedChange={(checked) => setValue('isPublished', checked)}
              />
              <Label htmlFor="isPublished">Published</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Product
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
