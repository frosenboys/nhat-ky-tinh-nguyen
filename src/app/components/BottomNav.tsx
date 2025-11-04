'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faListCheck, faRankingStar, faUser } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', icon: <FontAwesomeIcon icon={faHouse} />, label: 'Trang chủ' },
    { href: '/mission', icon: <FontAwesomeIcon icon={faListCheck} />, label: 'Nhiệm vụ' },
    { href: '/ranking', icon: <FontAwesomeIcon icon={faRankingStar} />, label: 'Bảng xếp hạng' },
    { href: '/profile', icon: <FontAwesomeIcon icon={faUser} />, label: 'Cá nhân' },
  ]

  return (
    <div className="btnNav fixed bottom-0 left-0 right-0 bg-main-gradient text-white flex justify-around py-2 pt-5 h-20 rounded-t-2xl shadow-lg z-50">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`w-1/4 flex flex-col items-center text-xs transition-all duration-200 ${
              isActive ? 'opacity-100 scale-110' : 'opacity-100'
            }`}
          >
            <div
              className={`text-2xl mb-1 transition-all duration-200 ${
                isActive ? 'text-yellow-300' : 'text-white'
              }`}
            >
              {item.icon}
            </div>
            <span
              className={`transition-colors duration-200 ${
                isActive ? 'text-yellow-300 font-semibold' : 'text-white'
              }`}
            >
              {item.label}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
