'use client'
import Image from 'next/image'
import { FaSearch, FaRegBell } from 'react-icons/fa'

export default function BottomNav() {
  return (
    <div className="flex items-center gap-3 mt-3 mb-4">
      <Image
        src="/icons/fist.svg"
        alt="fist"
        width={70}
        height={70}
      />
      {/* Search Bar */}
      <div className="bg-white flex items-center rounded-full px-3 py-2 mb-3 w-full mt-3">
        <input
          type="text"
          placeholder="Bạn muốn tìm gì?"
          className="flex-1 text-sm text-gray-700 focus:outline-none px-2"
        />
        <FaSearch className="text-gray-500" />
      </div>
    </div>
  )
}
