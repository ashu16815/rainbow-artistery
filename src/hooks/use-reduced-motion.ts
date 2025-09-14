'use client'

import { useEffect, useState } from 'react'

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

export function usePerformanceMode() {
  const [isLowPerformance, setIsLowPerformance] = useState(false)

  useEffect(() => {
    // Check for low-end device indicators
    const checkPerformance = () => {
      const isLowEnd = 
        navigator.hardwareConcurrency <= 2 || // Low CPU cores
        navigator.deviceMemory && navigator.deviceMemory <= 2 || // Low RAM
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) // Mobile devices
        
      setIsLowPerformance(isLowEnd)
    }

    checkPerformance()
  }, [])

  return isLowPerformance
}
