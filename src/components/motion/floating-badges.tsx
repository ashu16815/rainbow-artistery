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
      <div className="flex flex-wrap gap-3 justify-center">
        <div className="px-3 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium border border-emerald-100">
          ✨ Handcrafted
        </div>
        <div className="px-3 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium border border-indigo-100">
          🎨 Personalized
        </div>
        <div className="px-3 py-2 bg-pink-50 text-pink-700 rounded-full text-sm font-medium border border-pink-100">
          🎁 Perfect Gifts
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <FloatingBadge delay={0} duration={2.5}>
        <div className="px-3 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium border border-emerald-100">
          ✨ Handcrafted
        </div>
      </FloatingBadge>
      <FloatingBadge delay={0.8} duration={2.2}>
        <div className="px-3 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium border border-indigo-100">
          🎨 Personalized
        </div>
      </FloatingBadge>
      <FloatingBadge delay={1.6} duration={2.8}>
        <div className="px-3 py-2 bg-pink-50 text-pink-700 rounded-full text-sm font-medium border border-pink-100">
          🎁 Perfect Gifts
        </div>
      </FloatingBadge>
    </div>
  )
}
