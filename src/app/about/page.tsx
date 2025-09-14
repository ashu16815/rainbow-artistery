import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FAQJsonLd } from '@/components/seo/json-ld'
import { Heart, Palette, Award, Users } from 'lucide-react'

const features = [
  {
    icon: Heart,
    title: 'Handmade with Love',
    description: 'Every piece is crafted by hand with attention to detail and love for the craft.'
  },
  {
    icon: Palette,
    title: 'Unique Designs',
    description: 'Each creation is one-of-a-kind, reflecting traditional Indian craftsmanship.'
  },
  {
    icon: Award,
    title: 'Quality Materials',
    description: 'We use only the finest materials to ensure durability and beauty.'
  },
  {
    icon: Users,
    title: 'Personal Touch',
    description: 'Custom personalization makes each piece special for your loved ones.'
  }
]

const process = [
  {
    step: '1',
    title: 'Design Consultation',
    description: 'We discuss your requirements, preferred colors, and personalization details.'
  },
  {
    step: '2',
    title: 'Material Selection',
    description: 'Carefully choose high-quality materials including threads, mirrors, and embellishments.'
  },
  {
    step: '3',
    title: 'Handcrafting',
    description: 'Our skilled artisans create your piece using traditional techniques and modern precision.'
  },
  {
    step: '4',
    title: 'Quality Check',
    description: 'Each piece undergoes thorough quality inspection before packaging.'
  },
  {
    step: '5',
    title: 'Safe Delivery',
    description: 'Carefully packaged and shipped to your doorstep across India.'
  }
]

const faqs = [
  {
    question: 'How long does it take to make a custom order?',
    answer: 'Typically 5-7 business days, depending on complexity and current order volume.'
  },
  {
    question: 'What materials do you use for your products?',
    answer: 'We use high-quality cotton threads, traditional mirror work, beads, and wooden bases to ensure durability and beauty.'
  },
  {
    question: 'Do you ship outside India?',
    answer: 'Currently, we only ship within India. International shipping is coming soon!'
  },
  {
    question: 'Can I see a preview before finalizing my order?',
    answer: 'Yes! We share progress photos during the creation process so you can see your piece coming to life.'
  },
  {
    question: 'What if I\'m not satisfied with my order?',
    answer: 'We offer a 100% satisfaction guarantee. Contact us for any concerns and we\'ll make it right.'
  },
  {
    question: 'How do I care for my handmade products?',
    answer: 'Gently dust with a soft, dry cloth. Store in a cool, dry place away from direct sunlight to prevent fading.'
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* FAQ Structured Data */}
      <FAQJsonLd faqs={faqs} />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="absolute inset-0 rainbow-gradient opacity-5"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              About Rainbow Artistery
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 max-w-3xl mx-auto">
              At Rainbow Artistery, we turn names, moments, and traditions into keepsakes. 
              Every piece is handmade with mirror-work, tassels, and colours inspired by Indian festivals.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-slate-600">
                <p>
                  Rainbow Artistery was born from a passion for preserving traditional Indian craftsmanship 
                  while creating modern, personalized pieces that families can treasure for generations.
                </p>
                <p>
                  Our founder, inspired by the vibrant colors and intricate designs of Indian festivals, 
                  started creating handmade wall hangings and name plates for friends and family. 
                  The overwhelming response led to the birth of Rainbow Artistery.
                </p>
                <p>
                  Today, we continue to blend traditional techniques like mirror-work, tassel-making, 
                  and bead embroidery with contemporary designs, ensuring each piece is both timeless and trendy.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square relative overflow-hidden rounded-2xl shadow-soft-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center">
                  <div className="text-center">
                    <Heart className="h-16 w-16 text-pink-500 mx-auto mb-4" />
                    <p className="text-slate-600">Our Craft in Action</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Why Choose Handmade?</h2>
            <p className="mt-4 text-lg text-slate-600">The beauty and value of handmade crafts</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center shadow-soft hover:shadow-soft-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Our Crafting Process</h2>
            <p className="mt-4 text-lg text-slate-600">From concept to creation, every step is carefully executed</p>
          </div>
          <div className="space-y-8">
            {process.map((step, index) => (
              <div key={step.step} className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  {step.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials & Care */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Materials We Use</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Cotton Threads</h3>
                  <p className="text-slate-600">High-quality cotton threads in vibrant colors that don't fade over time.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Mirror Work</h3>
                  <p className="text-slate-600">Traditional Indian mirror work that adds sparkle and elegance to every piece.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Beads & Embellishments</h3>
                  <p className="text-slate-600">Carefully selected beads and decorative elements for that perfect finishing touch.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Wooden Base</h3>
                  <p className="text-slate-600">Durable wooden bases for name plates and wall hangings that last for years.</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Care Instructions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Cleaning</h3>
                  <p className="text-slate-600">Gently dust with a soft, dry cloth. Avoid using water or cleaning solutions.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Storage</h3>
                  <p className="text-slate-600">Store in a cool, dry place away from direct sunlight to prevent fading.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Handling</h3>
                  <p className="text-slate-600">Handle with care, especially the mirror work and tassels which are delicate.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Repairs</h3>
                  <p className="text-slate-600">Minor repairs can be done by our team. Contact us for assistance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Your Own Story?</h2>
          <p className="text-lg mb-8 opacity-90">
            Let us help you create a personalized piece that will be treasured for years to come.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <a href="/contact">Start Your Order</a>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
              <a href="/gallery">Browse Our Gallery</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
