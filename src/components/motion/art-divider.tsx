'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

export function ArtDivider() {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
        <div className="mx-4 w-2 h-2 rounded-full bg-indigo-500"></div>
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
      </div>
    )
  }

  return (
    <motion.div 
      className="flex items-center justify-center py-8"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div 
        className="w-24 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      <motion.div 
        className="mx-4 w-2 h-2 rounded-full bg-indigo-500"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="w-24 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
    </motion.div>
  )
}
