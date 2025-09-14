'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

interface FloatingBadgeProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}

export function FloatingBadge({ 
  children, 
  delay = 0, 
  duration = 2, 
  className = '' 
}: FloatingBadgeProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -8, 0],
        rotate: [0, 2, 0, -2, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

export function FloatingBadges() {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        <div className="inline-flex items-center rounded-full px-4 py-2 text-sm shadow-sm bg-white/70 backdrop-blur ring-1 ring-indigo-100">
          ✨ Handcrafted
        </div>
        <div className="inline-flex items-center rounded-full px-4 py-2 text-sm shadow-sm bg-white/70 backdrop-blur ring-1 ring-indigo-100">
          🎨 Personalized
        </div>
        <div className="inline-flex items-center rounded-full px-4 py-2 text-sm shadow-sm bg-white/70 backdrop-blur ring-1 ring-indigo-100">
          💝 Perfect Gifts
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
      <FloatingBadge delay={0} duration={2.5}>
        <div className="inline-flex items-center rounded-full px-4 py-2 text-sm shadow-sm bg-white/70 backdrop-blur ring-1 ring-indigo-100">
          ✨ Handcrafted
        </div>
      </FloatingBadge>
      <FloatingBadge delay={0.8} duration={2.2}>
        <div className="inline-flex items-center rounded-full px-4 py-2 text-sm shadow-sm bg-white/70 backdrop-blur ring-1 ring-indigo-100">
          🎨 Personalized
        </div>
      </FloatingBadge>
      <FloatingBadge delay={1.6} duration={2.8}>
        <div className="inline-flex items-center rounded-full px-4 py-2 text-sm shadow-sm bg-white/70 backdrop-blur ring-1 ring-indigo-100">
          💝 Perfect Gifts
        </div>
      </FloatingBadge>
    </div>
  )
}
