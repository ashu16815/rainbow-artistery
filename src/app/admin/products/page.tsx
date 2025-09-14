'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  Copy,
  Star,
  StarOff
} from 'lucide-react'
import { toast } from 'sonner'
import { ProductForm } from '@/components/admin/product-form'

interface Product {
  id: string
  title: string
  slug: string
  category: string
  priceINR?: number
  isPublished: boolean
  isFeatured: boolean
  featuredOrder?: number
  coverUrl: string
  updatedAt: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      if (category) params.append('category', category)
      
      const response = await fetch(`/api/admin/products?${params}`)
      if (!response.ok) throw new Error('Failed to fetch products')
      
      const data = await response.json() as { products: Product[] }
      setProducts(data.products)
    } catch (error) {
      toast.error('Failed to fetch products')
      console.error('Fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [search, category])

  const handleSave = async (data: any) => {
    setIsSaving(true)
    try {
      const url = editingProduct ? `/api/admin/products/${editingProduct.id}` : '/api/admin/products'
      const method = editingProduct ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      if (!response.ok) throw new Error('Failed to save product')
      
      await fetchProducts()
      setShowForm(false)
      setEditingProduct(null)
    } catch (error) {
      toast.error('Failed to save product')
      console.error('Save error:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleDelete = async (product: Product) => {
    if (!confirm(`Are you sure you want to delete "${product.title}"?`)) return
    
    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) throw new Error('Failed to delete product')
      
      await fetchProducts()
      toast.success('Product deleted successfully')
    } catch (error) {
      toast.error('Failed to delete product')
      console.error('Delete error:', error)
    }
  }

  const handleToggleFeatured = async (product: Product) => {
    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isFeatured: !product.isFeatured,
          featuredOrder: !product.isFeatured ? 1 : undefined,
        }),
      })
      
      if (!response.ok) throw new Error('Failed to update product')
      
      await fetchProducts()
      toast.success(`Product ${!product.isFeatured ? 'featured' : 'unfeatured'} successfully`)
    } catch (error) {
      toast.error('Failed to update product')
      console.error('Toggle featured error:', error)
    }
  }

  const handleTogglePublished = async (product: Product) => {
    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !product.isPublished }),
      })
      
      if (!response.ok) throw new Error('Failed to update product')
      
      await fetchProducts()
      toast.success(`Product ${!product.isPublished ? 'published' : 'unpublished'} successfully`)
    } catch (error) {
      toast.error('Failed to update product')
      console.error('Toggle published error:', error)
    }
  }

  const categories = Array.from(new Set(products.map(p => p.category)))

  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            {editingProduct ? 'Edit Product' : 'New Product'}
          </h1>
          <Button variant="outline" onClick={() => {
            setShowForm(false)
            setEditingProduct(null)
          }}>
            Back to Products
          </Button>
        </div>
        
        <ProductForm
          product={editingProduct || undefined}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false)
            setEditingProduct(null)
          }}
          isSaving={isSaving}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Product
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <div className="w-48">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Products ({products.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.coverUrl}
                          alt={product.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <div className="font-medium">{product.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {product.slug}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      {product.priceINR ? `₹${product.priceINR}` : '—'}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        {product.isFeatured && (
                          <Badge variant="secondary">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                        <Badge variant={product.isPublished ? 'default' : 'secondary'}>
                          {product.isPublished ? 'Published' : 'Draft'}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(product.updatedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(product)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleFeatured(product)}>
                            {product.isFeatured ? (
                              <>
                                <StarOff className="w-4 h-4 mr-2" />
                                Unfeature
                              </>
                            ) : (
                              <>
                                <Star className="w-4 h-4 mr-2" />
                                Feature
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleTogglePublished(product)}>
                            {product.isPublished ? 'Unpublish' : 'Publish'}
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(product)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
