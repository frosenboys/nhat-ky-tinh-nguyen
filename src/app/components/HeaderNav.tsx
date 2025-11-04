'use client'
import Image from 'next/image'
import { FaSearch } from 'react-icons/fa'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';

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
      <Link href={"/notifications"} className="flex items-center absolute right-5 top-30">
        <div className="ml-auto relative bg-white p-1 pt-1.5 rounded-full shadow-md">
          <FontAwesomeIcon icon={faBell} className="text-[20px] text-gray-700 p-1" />
          <span className="absolute top-0 right-1 block w-2.5 h-2.5 bg-yellow-400 rounded-full ring-2 ring-white"></span>
        </div>
      </Link>
    </div>
    
  )
}
