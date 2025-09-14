import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, Palette, Truck, Star, Instagram, MessageCircle } from 'lucide-react'

const uspCards = [
  {
    icon: Heart,
    title: 'Handmade with Love',
    description: 'Every piece is crafted with care and attention to detail'
  },
  {
    icon: Palette,
    title: 'Custom Names & Colours',
    description: 'Personalize your order with names and preferred colors'
  },
  {
    icon: Truck,
    title: 'Ships Across India',
    description: 'Safe packaging and timely delivery nationwide'
  }
]

const featuredProducts = [
  {
    id: '1',
    title: 'Jiya — Personalized Ring Wall Hanging',
    slug: 'jiya-ring-wall-hanging',
    description: 'Pink center with mirror-work border and soft tassels.',
    coverUrl: '/seed/jiya-ring.jpg',
    priceINR: 899,
    isFeatured: true,
    featuredOrder: 1,
    tags: ['personalized', 'birthday', 'nursery']
  },
  {
    id: '2',
    title: 'Ankit & Divya — Name Ring',
    slug: 'ankit-divya-name-ring',
    description: 'Elegant blue gradient ring with white/blue tassels.',
    coverUrl: '/seed/ankit-divya-blue.jpg',
    priceINR: 1299,
    isFeatured: true,
    featuredOrder: 2,
    tags: ['couple', 'housewarming']
  },
  {
    id: '3',
    title: 'Mini Animal Magnets Set',
    slug: 'mini-animal-magnets',
    description: 'Pastel square magnets with cute animals and custom names.',
    coverUrl: '/seed/animal-magnets.jpg',
    priceINR: 599,
    isFeatured: true,
    featuredOrder: 3,
    tags: ['kids', 'birthday', 'return gifts']
  },
  {
    id: '4',
    title: 'Krishna Motif Plate',
    slug: 'krishna-motif-plate',
    description: 'Serene blue-white plate inspired by Lord Krishna.',
    coverUrl: '/seed/krishna-plate.jpg',
    priceINR: 799,
    isFeatured: true,
    featuredOrder: 4,
    tags: ['Krishna', 'festival', 'pooja']
  }
]

const testimonials = [
  {
    name: 'Aarushi Sharma',
    city: 'Jaipur',
    quote: 'Absolutely loved the personalised name plate for my niece Jiya — the tassels are gorgeous!',
    rating: 5
  },
  {
    name: 'Rohan Mehta',
    city: 'Mumbai',
    quote: 'Ordered return-gift magnets for Mohit\'s birthday. Kids went crazy. Fab quality!',
    rating: 5
  },
  {
    name: 'Nandini Iyer',
    city: 'Chennai',
    quote: 'The Krishna wall hanging was perfect for our pooja room.',
    rating: 5
  }
]

const giftingBadges = ['Birthday', 'Housewarming', 'Festivals', 'Baby Naming']

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="absolute inset-0 rainbow-gradient opacity-5"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              Handmade wall hangings & gifts — crafted with love in India.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 max-w-2xl mx-auto">
              Personalised name plates, fridge magnets, festive décor & more. 
              Every piece tells a story of tradition, craftsmanship, and love.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild>
                <Link href="/gallery">Browse Gallery</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Custom Order</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* USP Cards */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {uspCards.map((card) => (
              <Card key={card.title} className="text-center shadow-soft hover:shadow-soft-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <card.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{card.title}</h3>
                  <p className="text-slate-600">{card.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Featured Products</h2>
            <p className="mt-4 text-lg text-slate-600">Discover our most popular handmade creations</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-soft-lg transition-all duration-300">
                <div className="aspect-square relative overflow-hidden rounded-t-lg">
                  <Image
                    src={product.coverUrl}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">{product.title}</h3>
                  <p className="text-sm text-slate-600 mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">₹{product.priceINR}</span>
                    <Button size="sm" asChild>
                      <Link href={`/product/${product.slug}`}>View Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button size="lg" asChild>
              <Link href="/gallery">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Krishna Highlight */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Divine Inspirations</h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Krishna-themed pieces for Janmashtami and gifting. 
              Serene blue and white designs that bring peace and spirituality to your space.
            </p>
            <Button size="lg" asChild>
              <Link href="/gallery?category=festival">Explore Krishna Collection</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Instagram Reel */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">See Our Craft in Action</h2>
          <div className="bg-slate-100 rounded-2xl p-8 mb-6">
            <div className="aspect-video bg-gradient-to-br from-pink-200 to-purple-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Instagram className="h-12 w-12 text-pink-500 mx-auto mb-4" />
                <p className="text-slate-600">Instagram Reel Coming Soon</p>
              </div>
            </div>
          </div>
          <Button size="lg" asChild>
            <a
              href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <Instagram className="h-5 w-5 mr-2" />
              Watch on Instagram
            </a>
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">What Our Customers Say</h2>
            <p className="mt-4 text-lg text-slate-600">Real stories from happy customers across India</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-4 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="text-sm">
                    <p className="font-semibold text-slate-900">{testimonial.name}</p>
                    <p className="text-slate-500">{testimonial.city}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gifting Badges */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Perfect for Every Occasion</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {giftingBadges.map((badge) => (
              <span
                key={badge}
                className="px-4 py-2 bg-primary/10 text-primary rounded-full font-medium"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Something Special?</h2>
          <p className="text-lg mb-8 opacity-90">
            Get in touch with us to discuss your custom requirements or browse our gallery for inspiration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Start Custom Order</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
              <a
                href={process.env.NEXT_PUBLIC_WHATSAPP_LINK || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Chat on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
