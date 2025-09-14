'use client'

import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-r from-[#eef2ff] via-white to-[#fdf2f8]">
      {/* Subtle decorative SVG background */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <svg
            width="400"
            height="200"
            viewBox="0 0 400 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="blur-sm"
          >
            <circle
              cx="200"
              cy="100"
              r="80"
              stroke="#4f46e5"
              strokeWidth="2"
              fill="none"
              opacity="0.3"
            />
            <circle
              cx="200"
              cy="100"
              r="60"
              stroke="#10b981"
              strokeWidth="1.5"
              fill="none"
              opacity="0.2"
            />
            <circle
              cx="200"
              cy="100"
              r="40"
              stroke="#d946ef"
              strokeWidth="1"
              fill="none"
              opacity="0.15"
            />
          </svg>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 sm:py-18 lg:py-24 flex flex-col items-center text-center gap-5">
        {/* Headline */}
        <h1 className="text-[clamp(2.25rem,4.5vw,3.5rem)] font-extrabold tracking-wide text-slate-900 leading-[1.12]">
          Handmade wall hangings & gifts
        </h1>
        
        {/* Subcopy */}
        <p className="max-w-2xl text-slate-600 text-[clamp(1rem,1.6vw,1.125rem)] leading-relaxed">
          Modern artistry, traditional soul. Personalised name plates, magnets and festive décor — crafted with love in India.
        </p>
        
        {/* CTA Group */}
        <div className="mt-4 flex w-full sm:w-auto flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Link
            href="/gallery"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 transition-colors duration-200 font-semibold text-center"
          >
            Browse Gallery
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl border border-indigo-600 text-indigo-700 hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 transition-colors duration-200 font-semibold text-center"
          >
            Custom Order
          </Link>
        </div>
        
        {/* Badges */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <div className="inline-flex items-center rounded-full px-4 py-2 text-sm bg-white/70 backdrop-blur ring-1 ring-indigo-100 shadow-sm">
            ✨ Handcrafted
          </div>
          <div className="inline-flex items-center rounded-full px-4 py-2 text-sm bg-white/70 backdrop-blur ring-1 ring-indigo-100 shadow-sm">
            🎨 Personalized
          </div>
          <div className="inline-flex items-center rounded-full px-4 py-2 text-sm bg-white/70 backdrop-blur ring-1 ring-indigo-100 shadow-sm">
            💝 Perfect Gifts
          </div>
        </div>
      </div>
    </section>
  )
}
