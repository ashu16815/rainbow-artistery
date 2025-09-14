'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-r from-[#eef2ff] via-white to-[#fdf2f8]">
      {/* Layered gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-transparent to-pink-50/30" />
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-50/20 via-transparent to-purple-50/20" />
      </div>

      {/* 3D Orb shapes for depth */}
      <div className="absolute inset-0 -z-10">
        {/* Blue orb */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl transition-transform duration-1000 ease-out"
          style={{
            background: 'radial-gradient(circle, rgba(79, 70, 229, 0.3) 0%, rgba(79, 70, 229, 0.1) 50%, transparent 70%)',
            transform: `translateZ(-1px) translate(${-20 + mousePosition.x * 10}%, ${-10 + mousePosition.y * 5}%)`
          }}
        />
        {/* Pink orb */}
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-25 blur-3xl transition-transform duration-1000 ease-out"
          style={{
            background: 'radial-gradient(circle, rgba(217, 70, 239, 0.3) 0%, rgba(217, 70, 239, 0.1) 50%, transparent 70%)',
            transform: `translateZ(-1px) translate(${15 - mousePosition.x * 8}%, ${20 - mousePosition.y * 8}%)`
          }}
        />
        {/* Emerald orb */}
        <div 
          className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full opacity-15 blur-3xl transition-transform duration-1000 ease-out"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, rgba(16, 185, 129, 0.1) 50%, transparent 70%)',
            transform: `translateZ(-1px) translate(${10 + mousePosition.x * 6}%, ${-15 + mousePosition.y * 6}%)`
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 sm:py-18 lg:py-24 flex flex-col items-center text-center gap-5">
        {/* Headline */}
        <h1 
          className="text-[clamp(2.25rem,4.5vw,3.5rem)] font-extrabold tracking-wide text-slate-900 leading-[1.12]"
          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
        >
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
            className="group w-full sm:w-auto px-6 py-3 rounded-2xl text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 transition-all duration-200 ease-out font-semibold text-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #d946ef 100%)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 6px -1px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02) translateY(-1px)'
              e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.2), 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) translateY(0)'
              e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 6px -1px rgba(0,0,0,0.1)'
            }}
          >
            Browse Gallery
          </Link>
          <Link
            href="/contact"
            className="group w-full sm:w-auto px-6 py-3 rounded-2xl border border-indigo-600 text-indigo-700 hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 transition-all duration-200 ease-out font-semibold text-center hover:scale-102 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Custom Order
          </Link>
        </div>
        
        {/* Badges */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <div className="group inline-flex items-center rounded-full px-4 py-2 text-sm bg-white/40 backdrop-blur-sm border border-white/30 shadow-sm hover:rotate-x-2 hover:-rotate-y-2 transition-transform duration-300 ease-out cursor-default">
            ✨ Handcrafted
          </div>
          <div className="group inline-flex items-center rounded-full px-4 py-2 text-sm bg-white/40 backdrop-blur-sm border border-white/30 shadow-sm hover:rotate-x-2 hover:-rotate-y-2 transition-transform duration-300 ease-out cursor-default">
            🎨 Personalized
          </div>
          <div className="group inline-flex items-center rounded-full px-4 py-2 text-sm bg-white/40 backdrop-blur-sm border border-white/30 shadow-sm hover:rotate-x-2 hover:-rotate-y-2 transition-transform duration-300 ease-out cursor-default">
            💝 Perfect Gifts
          </div>
        </div>
      </div>
    </section>
  )
}
