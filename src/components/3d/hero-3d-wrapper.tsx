'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { HeroSkeleton } from './hero-skeleton'
import { useReducedMotion, usePerformanceMode } from '@/hooks/use-reduced-motion'

// Dynamic import of the 3D hero component
const Hero3D = dynamic(() => import('./hero-3d'), {
  ssr: false,
  loading: () => <HeroSkeleton />
})

export function Hero3DWrapper() {
  const prefersReducedMotion = useReducedMotion()
  const isLowPerformance = usePerformanceMode()

  // Show static fallback for reduced motion or low performance
  if (prefersReducedMotion || isLowPerformance) {
    return <HeroSkeleton />
  }

  return (
    <Suspense fallback={<HeroSkeleton />}>
      <Hero3D />
    </Suspense>
  )
}
