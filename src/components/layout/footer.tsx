import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Instagram, MessageCircle, Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t">
      {/* Gradient line divider */}
      <div className="h-px bg-gradient-to-r from-indigo-200 via-pink-200 to-emerald-200"></div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-full rainbow-gradient"></div>
              <span className="text-xl font-bold text-slate-800">Rainbow Artistery</span>
            </div>
            <p className="text-slate-600 mb-4 max-w-md">
              Handmade wall hangings & gifts — crafted with love in India. 
              Personalised name plates, fridge magnets, festive décor & more.
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <a
                  href="https://www.instagram.com/rainbow_artistery/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-accent"
                >
                  <Instagram className="h-4 w-4 mr-2" />
                  Instagram
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a
                  href={process.env.NEXT_PUBLIC_WHATSAPP_LINK || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-green-600"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/gallery" className="text-slate-600 hover:text-primary transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-600 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/gallery?category=wall-hanging" className="text-slate-600 hover:text-primary transition-colors">
                  Wall Hangings
                </Link>
              </li>
              <li>
                <Link href="/gallery?category=name-plate" className="text-slate-600 hover:text-primary transition-colors">
                  Name Plates
                </Link>
              </li>
              <li>
                <Link href="/gallery?category=fridge-magnet" className="text-slate-600 hover:text-primary transition-colors">
                  Fridge Magnets
                </Link>
              </li>
              <li>
                <Link href="/gallery?category=festival" className="text-slate-600 hover:text-primary transition-colors">
                  Festival Décor
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-slate-600">
              © {new Date().getFullYear()} Rainbow Artistery. All rights reserved.
            </p>
            <p className="text-sm text-slate-600 flex items-center mt-2 sm:mt-0">
              Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
