'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, Grid, List } from 'lucide-react'

const products = [
  {
    id: '1',
    title: 'Jiya — Personalized Ring Wall Hanging',
    slug: 'jiya-ring-wall-hanging',
    description: 'Pink center with mirror-work border and soft tassels. Perfect gift for newborns and birthdays.',
    category: 'Wall Hanging',
    tags: 'personalized,birthday,nursery',
    coverUrl: '/seed/jiya-ring.jpg',
    priceINR: 899,
    colors: 'Pink,White,Silver',
    sizeNote: 'Approx. 8 inch ring',
    materials: 'Cotton threads, mirrors, beads',
    isPublished: true
  },
  {
    id: '2',
    title: 'Ankit & Divya — Name Ring',
    slug: 'ankit-divya-name-ring',
    description: 'Elegant blue gradient ring with white/blue tassels. Ideal for couples & housewarming.',
    category: 'Name Plate',
    tags: 'couple,housewarming',
    coverUrl: '/seed/ankit-divya-blue.jpg',
    priceINR: 1299,
    colors: 'Blue,White',
    sizeNote: 'Approx. 10 inch ring',
    materials: 'Cotton threads, beads',
    isPublished: true
  },
  {
    id: '3',
    title: 'Mini Animal Magnets Set',
    slug: 'mini-animal-magnets',
    description: 'Pastel square magnets with cute animals and custom names. Great return gifts.',
    category: 'Fridge Magnet',
    tags: 'kids,birthday,return gifts',
    coverUrl: '/seed/animal-magnets.jpg',
    priceINR: 599,
    colors: 'Pastels',
    sizeNote: 'Approx. 2.5 inch squares',
    materials: 'Wood, paint, magnets',
    isPublished: true
  },
  {
    id: '4',
    title: 'Krishna Motif Plate',
    slug: 'krishna-motif-plate',
    description: 'Serene blue-white plate inspired by Lord Krishna — perfect for pooja rooms and Janmashtami.',
    category: 'Festival',
    tags: 'Krishna,festival,pooja',
    coverUrl: '/seed/krishna-plate.jpg',
    priceINR: 799,
    colors: 'Blue,White',
    sizeNote: 'Approx. 9 inch plate',
    materials: 'Hand-painted wood, embellishments',
    isPublished: true
  },
  {
    id: '5',
    title: 'Aarav — Custom Name Plate',
    slug: 'aarav-custom-name-plate',
    description: 'Beautiful wooden name plate with traditional motifs and golden accents.',
    category: 'Name Plate',
    tags: 'personalized,wooden,traditional',
    coverUrl: '/seed/aarav-name-plate.jpg',
    priceINR: 699,
    colors: 'Brown,Gold',
    sizeNote: 'Approx. 12 inch length',
    materials: 'Wood, gold paint, varnish',
    isPublished: true
  },
  {
    id: '6',
    title: 'Diwali Décor Set',
    slug: 'diwali-decor-set',
    description: 'Festive wall hangings and decorative pieces for Diwali celebrations.',
    category: 'Festival',
    tags: 'Diwali,festival,decor',
    coverUrl: '/seed/diwali-decor.jpg',
    priceINR: 1199,
    colors: 'Red,Gold,Orange',
    sizeNote: 'Various sizes',
    materials: 'Fabric, mirrors, beads, tassels',
    isPublished: true
  }
]

const categories = [
  { value: 'all', label: 'All Products' },
  { value: 'wall-hanging', label: 'Wall Hangings' },
  { value: 'name-plate', label: 'Name Plates' },
  { value: 'fridge-magnet', label: 'Fridge Magnets' },
  { value: 'festival', label: 'Festival Décor' }
]

const occasions = [
  { value: 'all', label: 'All Occasions' },
  { value: 'birthday', label: 'Birthday' },
  { value: 'housewarming', label: 'Housewarming' },
  { value: 'festival', label: 'Festivals' },
  { value: 'pooja', label: 'Pooja' },
  { value: 'baby', label: 'Baby' }
]

export default function GalleryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedOccasion, setSelectedOccasion] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.tags.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = selectedCategory === 'all' || 
                             product.category.toLowerCase().replace(' ', '-') === selectedCategory
      
      const matchesOccasion = selectedOccasion === 'all' || 
                             product.tags.toLowerCase().includes(selectedOccasion)
      
      return matchesSearch && matchesCategory && matchesOccasion
    })
  }, [searchTerm, selectedCategory, selectedOccasion])

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white shadow-soft">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-900">Our Gallery</h1>
            <p className="mt-4 text-lg text-slate-600">
              Discover our collection of handmade wall hangings, name plates, and festive décor
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedOccasion} onValueChange={setSelectedOccasion}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Occasion" />
                </SelectTrigger>
                <SelectContent>
                  {occasions.map((occasion) => (
                    <SelectItem key={occasion.value} value={occasion.value}>
                      {occasion.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* View Mode Toggle */}
              <div className="flex border border-slate-300 rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No products found</h3>
            <p className="text-slate-600 mb-4">Try adjusting your search or filter criteria</p>
            <Button onClick={() => {
              setSearchTerm('')
              setSelectedCategory('all')
              setSelectedOccasion('all')
            }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-slate-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }>
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-soft-lg transition-all duration-300">
                  <div className={viewMode === 'grid' ? 'aspect-square relative overflow-hidden rounded-t-lg' : 'flex'}>
                    <Image
                      src={product.coverUrl}
                      alt={product.title}
                      fill={viewMode === 'grid'}
                      width={viewMode === 'list' ? 200 : undefined}
                      height={viewMode === 'list' ? 200 : undefined}
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {viewMode === 'list' && (
                      <div className="flex-1 p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold text-slate-900">{product.title}</h3>
                          <span className="text-xl font-bold text-primary">₹{product.priceINR}</span>
                        </div>
                        <p className="text-slate-600 mb-3">{product.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.tags.split(',').map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag.trim()}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-slate-500">
                            <p>Colors: {product.colors}</p>
                            <p>Size: {product.sizeNote}</p>
                          </div>
                          <Button asChild>
                            <Link href={`/product/${product.slug}`}>View Details</Link>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  {viewMode === 'grid' && (
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">{product.title}</h3>
                      <p className="text-sm text-slate-600 mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {product.tags.split(',').slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag.trim()}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">₹{product.priceINR}</span>
                        <Button size="sm" asChild>
                          <Link href={`/product/${product.slug}`}>View Details</Link>
                        </Button>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
