'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function LoadingOverlay() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed left-0 right-0 top-0 bottom-[env(safe-area-inset-bottom,0)] z-[9999] flex flex-col items-center justify-center bg-white text-black pointer-events-none select-none"
>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: 'linear'
            }}
          >
            <Image
              src="/images/logo.png"
              alt="Loading Icon"
              width={100}
              height={100}
              priority
              style={{ filter: 'invert(0)' }}
            />
          </motion.div>

          <motion.p
            className="mt-4 text-sm tracking-wide font-medium text-black"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.2 }}
          >
            Đang tải...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
