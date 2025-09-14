'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ProductForm } from '@/components/admin/product-form'
import { ProductInput } from '@/lib/validations'
import { toast } from 'sonner'

export default function NewProductPage() {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async (data: ProductInput) => {
    setIsSaving(true)
    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create product')
      }
      
      const result = await response.json()
      toast.success('Product created successfully')
      router.push('/admin/products')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create product')
      console.error('Create error:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    router.push('/admin/products')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">New Product</h1>
      </div>
      
      <ProductForm
        onSave={handleSave}
        onCancel={handleCancel}
        isSaving={isSaving}
      />
    </div>
  )
}
