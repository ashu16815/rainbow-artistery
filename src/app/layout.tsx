import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rainbow Artistery — Handmade Wall Hangings & Gifts",
  description: "Personalised name plates, wall hangings, magnets and festive décor. Handmade with love in India.",
  keywords: ["handmade", "wall hanging", "name plate", "Krishna decor", "gifting", "India"],
  openGraph: {
    title: "Rainbow Artistery — Handmade Wall Hangings & Gifts",
    description: "Personalised name plates, wall hangings, magnets and festive décor. Handmade with love in India.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rainbow Artistery — Handmade Wall Hangings & Gifts",
    description: "Personalised name plates, wall hangings, magnets and festive décor. Handmade with love in India.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
      </body>
    </html>
  );
}
