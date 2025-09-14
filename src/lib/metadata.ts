import { Metadata } from 'next'

const baseUrl = process.env.NEXTAUTH_URL || 'https://rainbowartistery.in'
const siteName = 'Rainbow Artistery'
const siteDescription = 'Handmade wall hangings & gifts — crafted with love in India. Personalised name plates, fridge magnets, festive décor & more.'

export const defaultMetadata: Metadata = {
  title: {
    default: `${siteName} — Handmade Wall Hangings & Gifts`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    'handmade',
    'wall hanging',
    'name plate',
    'Krishna decor',
    'gifting',
    'India',
    'personalized gifts',
    'festival decor',
    'fridge magnets',
    'custom name plates',
    'handmade crafts',
    'Indian handicrafts',
    'mirror work',
    'tassels',
    'beads',
    'traditional crafts'
  ],
  authors: [{ name: 'Rainbow Artistery' }],
  creator: 'Rainbow Artistery',
  publisher: 'Rainbow Artistery',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: baseUrl,
    title: `${siteName} — Handmade Wall Hangings & Gifts`,
    description: siteDescription,
    siteName: siteName,
    images: [
      {
        url: '/og/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Rainbow Artistery - Handmade Wall Hangings & Gifts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} — Handmade Wall Hangings & Gifts`,
    description: siteDescription,
    images: ['/og/og-default.jpg'],
    creator: '@rainbowartistery',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

export function generateProductMetadata(product: {
  title: string
  description: string
  coverUrl: string
  priceINR?: number
  category: string
  tags: string
}) {
  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      type: 'product',
      images: [
        {
          url: product.coverUrl,
          width: 800,
          height: 800,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.description,
      images: [product.coverUrl],
    },
    keywords: [
      product.title,
      product.category,
      ...product.tags.split(',').map(tag => tag.trim()),
      'handmade',
      'custom',
      'personalized',
      'gift',
      'India'
    ],
  }
}

export function generatePageMetadata({
  title,
  description,
  path,
  keywords = [],
}: {
  title: string
  description: string
  path: string
  keywords?: string[]
}) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}${path}`,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    keywords: [...keywords, 'handmade', 'crafts', 'India'],
  }
}
