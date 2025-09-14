'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { ChevronLeft, ChevronRight, Heart, Share2, MessageCircle, Instagram, Star, Loader2 } from 'lucide-react'

interface Product {
  id: string
  title: string
  slug: string
  description: string
  category: string
  tags: string[]
  personalizable: boolean
  priceINR: number
  coverUrl: string
  mediaUrls: string[]
  videoUrl: string | null
  sizeNote: string
  materials: string
  isPublished: boolean
}

interface RelatedProduct {
  id: string
  title: string
  slug: string
  coverUrl: string
  priceINR: number
}

const testimonials = [
  {
    name: 'Aarushi Sharma',
    city: 'Jaipur',
    quote: 'Absolutely loved the personalised name plate for my niece Jiya — the tassels are gorgeous!',
    rating: 5
  },
  {
    name: 'Priya Patel',
    city: 'Mumbai',
    quote: 'The quality is amazing and the personalization was perfect. Highly recommend!',
    rating: 5
  }
]

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [personalization, setPersonalization] = useState({
    name: '',
    colors: '',
    notes: ''
  })
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        const response = await fetch(`/api/products/${params.slug}`)
        if (!response.ok) {
          throw new Error('Product not found')
        }
        const data = await response.json()
        setProduct(data)
        
        // Fetch related products
        const relatedResponse = await fetch('/api/products?limit=3')
        if (relatedResponse.ok) {
          const relatedData = await relatedResponse.json()
          setRelatedProducts(relatedData.filter((p: Product) => p.slug !== params.slug))
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading product...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Product Not Found</h1>
          <p className="text-slate-600 mb-6">{error || 'The product you are looking for does not exist.'}</p>
          <Button asChild>
            <Link href="/gallery">Back to Gallery</Link>
          </Button>
        </div>
      </div>
    )
  }

  const mediaUrls = product.mediaUrls || []
  const tags = product.tags || []

  const handleWhatsAppOrder = () => {
    const message = `Hi! I'm interested in the ${product.title}. 
    
Personalization Details:
- Name: ${personalization.name || 'Not specified'}
- Preferred Colors: ${personalization.colors || 'Not specified'}
- Notes: ${personalization.notes || 'None'}

Please let me know about availability and pricing.`
    
    const whatsappUrl = `${process.env.NEXT_PUBLIC_WHATSAPP_LINK}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleInstagramOrder = () => {
    window.open('https://www.instagram.com/rainbow_artistery/', '_blank')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* SEO Structured Data */}
      <ProductJsonLd
        name={product.title}
        description={product.description}
        image={product.coverUrl}
        price={product.priceINR}
        currency="INR"
        category={product.category}
        offers={{
          price: product.priceINR || 0,
          currency: 'INR',
          availability: 'InStock',
          seller: {
            name: 'Rainbow Artistery',
          },
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Gallery', url: '/gallery' },
          { name: product.title, url: `/product/${product.slug}` },
        ]}
      />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-slate-600 mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href="/gallery" className="hover:text-primary">Gallery</Link>
          <span>/</span>
          <span className="text-slate-900">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-2xl bg-white shadow-soft">
              <Image
                src={mediaUrls[selectedImage] || product.coverUrl}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 bg-white/80 hover:bg-white"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </div>
            
            {mediaUrls.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {mediaUrls.map((url, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-primary' : 'border-slate-200'
                    }`}
                  >
                    <Image
                      src={url}
                      alt={`${product.title} ${index + 1}`}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{product.category}</Badge>
                {product.personalizable && (
                  <Badge variant="outline" className="text-accent border-accent">
                    Personalizable
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-4">{product.title}</h1>
              <p className="text-lg text-slate-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-primary">
                {product.priceINR > 0 ? `₹${product.priceINR}` : 'Made to order'}
              </span>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
                <span className="text-sm text-slate-600 ml-2">(4.9/5)</span>
              </div>
            </div>

            {/* Specifications */}
            <div className="space-y-4">
              
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Size</h3>
                <p className="text-slate-600">{product.sizeNote}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Materials</h3>
                <p className="text-slate-600">{product.materials}</p>
              </div>
            </div>

            {/* Personalization Form */}
            {product.personalizable && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Personalize Your Order</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name/Text to Display</Label>
                      <Input
                        id="name"
                        placeholder="Enter the name or text you want"
                        value={personalization.name}
                        onChange={(e) => setPersonalization(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="colors">Preferred Colors</Label>
                      <Input
                        id="colors"
                        placeholder="e.g., Pink and White"
                        value={personalization.colors}
                        onChange={(e) => setPersonalization(prev => ({ ...prev, colors: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="notes">Special Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Any special requirements or notes..."
                        value={personalization.notes}
                        onChange={(e) => setPersonalization(prev => ({ ...prev, notes: e.target.value }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Button size="lg" className="flex-1" onClick={handleWhatsAppOrder}>
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Request on WhatsApp
                </Button>
                <Button size="lg" variant="outline" onClick={handleInstagramOrder}>
                  <Instagram className="h-5 w-5 mr-2" />
                  DM on Instagram
                </Button>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Heart className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-4 italic">"{testimonial.quote}"</p>
                  <div className="text-sm">
                    <p className="font-semibold text-slate-900">{testimonial.name}</p>
                    <p className="text-slate-500">{testimonial.city}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="group hover:shadow-soft-lg transition-all duration-300">
                  <div className="aspect-square relative overflow-hidden rounded-t-lg">
                    <Image
                      src={relatedProduct.coverUrl}
                      alt={relatedProduct.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-slate-900 mb-2">{relatedProduct.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">
                        {relatedProduct.priceINR > 0 ? `₹${relatedProduct.priceINR}` : 'Made to order'}
                      </span>
                      <Button size="sm" asChild>
                        <Link href={`/product/${relatedProduct.slug}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
