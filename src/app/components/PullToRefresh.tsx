'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PullToRefresh({ children }: { children: React.ReactNode }) {
  const [pullStartY, setPullStartY] = useState<number | null>(null)
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const maxPull = 100 // pixel kéo tối đa để kích hoạt refresh

  // Khi bắt đầu kéo
  const handleTouchStart = (e: TouchEvent) => {
    if (window.scrollY === 0 && !isRefreshing) {
      setPullStartY(e.touches[0].clientY)
    }
  }

  // Khi kéo xuống
  const handleTouchMove = (e: TouchEvent) => {
    if (pullStartY !== null && !isRefreshing) {
      const distance = e.touches[0].clientY - pullStartY
      if (distance > 0) {
        e.preventDefault() // chặn scroll mặc định
        setPullDistance(Math.min(distance, maxPull))
      }
    }
  }

  // Khi buông tay
  const handleTouchEnd = () => {
    if (pullDistance >= maxPull * 1 && !isRefreshing) {
      setIsRefreshing(true)
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    }
    setPullStartY(null)
    setPullDistance(0)
  }

  useEffect(() => {
    const container = containerRef.current
    container?.addEventListener('touchstart', handleTouchStart, { passive: false })
    container?.addEventListener('touchmove', handleTouchMove, { passive: false })
    container?.addEventListener('touchend', handleTouchEnd)
    return () => {
      container?.removeEventListener('touchstart', handleTouchStart)
      container?.removeEventListener('touchmove', handleTouchMove)
      container?.removeEventListener('touchend', handleTouchEnd)
    }
  }, [pullStartY, pullDistance, isRefreshing])

  return (
    <div ref={containerRef} className="min-h-screen overflow-x-hidden"
      style={{ touchAction: 'pan-y' }}
    >
      {/* Khu vực hiển thị spinner khi kéo */}
      <AnimatePresence>
        {pullDistance > 0 && !isRefreshing && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="fixed top-3 left-0 right-0 flex justify-center items-center z-[999]"
          >
            <div
              className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"
              
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nội dung trang */}
      <div
        style={{
          transform: `translateY(${pullDistance * 0.4}px)`,
          transition: isRefreshing ? 'transform 0.3s ease' : undefined,
        }}
      >
        {children}
      </div>
    </div>
  )
}
