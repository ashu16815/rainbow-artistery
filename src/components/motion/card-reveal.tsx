'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

interface CardRevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function CardReveal({ 
  children, 
  delay = 0, 
  className = '' 
}: CardRevealProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ 
        opacity: 0, 
        y: 12 
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0 
      }}
      viewport={{ 
        once: true, 
        margin: "-50px" 
      }}
      transition={{
        duration: 0.38,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  )
}

interface StaggeredRevealProps {
  children: React.ReactNode[]
  staggerDelay?: number
  className?: string
}

export function StaggeredReveal({ 
  children, 
  staggerDelay = 0.06, 
  className = '' 
}: StaggeredRevealProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <div className={className}>
      {children.map((child, index) => (
        <CardReveal key={index} delay={index * staggerDelay}>
          {child}
        </CardReveal>
      ))}
    </div>
  )
}
