'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, X, Instagram, MessageCircle } from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-soft sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full rainbow-gradient"></div>
              <span className="text-xl font-bold text-slate-800">Rainbow Artistery</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-slate-600 hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Social Links & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Social Links */}
            <div className="hidden sm:flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <a
                  href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-accent"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a
                  href={process.env.NEXT_PUBLIC_WHATSAPP_LINK || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-green-600"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <div className="h-6 w-6 rounded-full rainbow-gradient"></div>
                      <span className="text-lg font-bold text-slate-800">Rainbow Artistery</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <nav className="flex-1 space-y-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block text-slate-600 hover:text-primary transition-colors duration-200 font-medium py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                  
                  <div className="flex items-center space-x-2 pt-4 border-t">
                    <Button variant="ghost" size="sm" asChild>
                      <a
                        href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-accent"
                      >
                        <Instagram className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <a
                        href={process.env.NEXT_PUBLIC_WHATSAPP_LINK || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-green-600"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
