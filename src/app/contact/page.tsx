'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { MessageCircle, Instagram, Mail, Phone, MapPin, Send } from 'lucide-react'
import { toast } from 'sonner'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    file: null as File | null
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({ ...prev, file }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, this would submit to your API
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      
      toast.success('Thank you for your message! We\'ll get back to you soon.')
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        file: null
      })
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="absolute inset-0 rainbow-gradient opacity-5"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              Get in Touch
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 max-w-2xl mx-auto">
              Have a custom order in mind? Need help choosing the perfect piece? 
              We'd love to hear from you!
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Tell us about your requirements, preferred colors, personalization details, or any questions you have..."
                      rows={6}
                    />
                  </div>

                  <div>
                    <Label htmlFor="file">Reference Image (Optional)</Label>
                    <Input
                      id="file"
                      name="file"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    />
                    <p className="text-sm text-slate-500 mt-1">
                      Upload an image to help us understand your vision better
                    </p>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">WhatsApp</h3>
                    <p className="text-slate-600">Quick responses for urgent queries</p>
                    <a
                      href={process.env.NEXT_PUBLIC_WHATSAPP_LINK || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Chat with us
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Instagram className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Instagram</h3>
                    <p className="text-slate-600">See our latest creations and behind-the-scenes</p>
                    <a
                      href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Follow us
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Email</h3>
                    <p className="text-slate-600">For detailed inquiries and custom orders</p>
                    <a
                      href="mailto:hello@rainbowartistery.in"
                      className="text-primary hover:underline"
                    >
                      hello@rainbowartistery.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Location</h3>
                    <p className="text-slate-600">Based in India, shipping nationwide</p>
                    <p className="text-slate-500">We ship across India with safe packaging</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button variant="outline" asChild>
                    <a href="/gallery">Browse Gallery</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/about">About Us</a>
                  </Button>
                </div>
                <div className="pt-4 border-t">
                  <h4 className="font-semibold text-slate-900 mb-2">Popular Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Wall Hangings', 'Name Plates', 'Fridge Magnets', 'Festival Décor'].map((category) => (
                      <Button key={category} variant="ghost" size="sm" asChild>
                        <a href={`/gallery?category=${category.toLowerCase().replace(' ', '-')}`}>
                          {category}
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">How long does it take to make a custom order?</h4>
                  <p className="text-sm text-slate-600">Typically 5-7 business days, depending on complexity.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Do you ship outside India?</h4>
                  <p className="text-sm text-slate-600">Currently, we only ship within India. International shipping coming soon!</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Can I see a preview before finalizing?</h4>
                  <p className="text-sm text-slate-600">Yes! We'll share progress photos during the creation process.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">What if I'm not satisfied with my order?</h4>
                  <p className="text-sm text-slate-600">We offer a 100% satisfaction guarantee. Contact us for any concerns.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
