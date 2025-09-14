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
      <div className="flex flex-wrap gap-4 justify-center">
        <div className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
          ✨ Handcrafted
        </div>
        <div className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
          🎨 Personalized
        </div>
        <div className="px-4 py-2 bg-pink-100 text-pink-800 rounded-full text-sm font-medium">
          💝 Perfect Gifts
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <FloatingBadge delay={0} duration={2.5}>
        <div className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium shadow-sm">
          ✨ Handcrafted
        </div>
      </FloatingBadge>
      <FloatingBadge delay={0.8} duration={2.2}>
        <div className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium shadow-sm">
          🎨 Personalized
        </div>
      </FloatingBadge>
      <FloatingBadge delay={1.6} duration={2.8}>
        <div className="px-4 py-2 bg-pink-100 text-pink-800 rounded-full text-sm font-medium shadow-sm">
          💝 Perfect Gifts
        </div>
      </FloatingBadge>
    </div>
  )
}
