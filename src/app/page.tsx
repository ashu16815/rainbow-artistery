import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, Palette, Truck, Star, Instagram, MessageCircle } from 'lucide-react'
import { Hero } from '@/components/hero'
import { ProductCard } from '@/components/product-card'
import { CardReveal, StaggeredReveal } from '@/components/motion/card-reveal'
import { ArtDivider } from '@/components/motion/art-divider'

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
      <Hero />

      {/* USP Cards */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <StaggeredReveal className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {uspCards.map((card) => (
              <Card key={card.title} className="text-center shadow-soft hover:shadow-soft-lg transition-all duration-300 group hover:scale-105">
                <CardContent className="pt-6">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <card.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{card.title}</h3>
                  <p className="text-slate-600">{card.description}</p>
                </CardContent>
              </Card>
            ))}
          </StaggeredReveal>
        </div>
      </section>

      <ArtDivider />

      {/* Featured Products */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <CardReveal className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Featured Products</h2>
            <p className="mt-4 text-lg text-slate-600">Discover our most popular handmade creations</p>
          </CardReveal>
          <StaggeredReveal className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </StaggeredReveal>
          <div className="text-center mt-8">
            <Button size="lg" asChild>
              <Link href="/gallery">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Krishna Highlight */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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
      <section className="py-12 sm:py-16 bg-white">
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
              href="https://www.instagram.com/rainbow_artistery/"
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
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
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
      <section className="py-12 sm:py-16 bg-gradient-to-r from-primary to-accent text-white">
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
