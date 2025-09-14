'use client'

import { motion } from 'framer-motion'

export function HeroSkeleton() {
  return (
    <div className="w-full h-[600px] md:h-[720px] relative overflow-hidden bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Static background with subtle pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.05),transparent_50%)]" />
      
      {/* Floating geometric shapes as placeholders */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-8 opacity-20">
          {/* Ring placeholder */}
          <motion.div
            className="w-24 h-24 rounded-full border-4 border-indigo-200 bg-white/50"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Name plate placeholder */}
          <motion.div
            className="w-32 h-16 bg-white/50 rounded-lg shadow-sm"
            animate={{ 
              y: [0, -8, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Magnets placeholder */}
          <motion.div
            className="flex gap-2"
            animate={{ 
              x: [0, 4, 0]
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="w-6 h-6 bg-pink-200 rounded"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Content overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center max-w-4xl px-6">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Handmade wall hangings & gifts
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Modern artistry, traditional soul. Personalised name plates, magnets and festive décor.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-semibold hover:bg-indigo-700 transition-colors duration-220">
              Browse Gallery
            </button>
            <button className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 rounded-2xl font-semibold hover:bg-indigo-50 transition-colors duration-220">
              Custom Order
            </button>
          </motion.div>
        </div>
      </div>
      
      {/* Loading indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.div
          className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  )
}
