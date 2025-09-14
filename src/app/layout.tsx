import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import { defaultMetadata } from "@/lib/metadata";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <OrganizationJsonLd
          name="Rainbow Artistery"
          description="Handmade wall hangings & gifts — crafted with love in India. Personalised name plates, fridge magnets, festive décor & more."
          url={process.env.NEXTAUTH_URL || 'https://rainbowartistery.in'}
          logo={`${process.env.NEXTAUTH_URL || 'https://rainbowartistery.in'}/logo.png`}
          sameAs={[
            'https://www.instagram.com/rainbow_artistery/',
            process.env.NEXT_PUBLIC_WHATSAPP_LINK || 'https://wa.me/919999999999',
          ]}
          address={{
            streetAddress: 'India',
            addressLocality: 'India',
            addressRegion: 'India',
            postalCode: '000000',
            addressCountry: 'IN',
          }}
          contactPoint={{
            telephone: '+91-9999999999',
            contactType: 'Customer Service',
            email: 'hello@rainbowartistery.in',
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
