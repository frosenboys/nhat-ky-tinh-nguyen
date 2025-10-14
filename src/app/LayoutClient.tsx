'use client'

import { usePathname } from 'next/navigation'
import BottomNav from '@/app/components/BottomNav'

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideNavRoutes = ['/login'] // Add more if needed

  const shouldShowNav = !hideNavRoutes.includes(pathname)

  return (
    <>
      {children}
      {shouldShowNav && <BottomNav />}
    </>
  )
}
