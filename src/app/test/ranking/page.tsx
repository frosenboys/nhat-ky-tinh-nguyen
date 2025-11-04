import HeaderNav from '@/app/components/HeaderNav'
import Image from 'next/image'
import Link from 'next/link'
import { FaNewspaper } from 'react-icons/fa'

export default function HomePage() {

  return (
    <div className="min-h-screen flex flex-col pb-24">
      {/* HEADER */}
      <div className="bg-main-gradient text-white p-4 relative mb-5 pb-16">
        <HeaderNav />
        <div className="absolute left-6 -bottom-16 flex flex-col items-center">
          <div className="bg-white rounded-full p-[20px]">
            <div className="bg-main-gradient text-white rounded-full p-3">
              <Image src="/icons/ranking.svg" alt="Bảng xếp hạng" width={50} height={50} />
            </div>
          </div>
          <span className="absolute left-2 -bottom-2 -mt- text-sm font-bold text-gray-800 w-30">Bảng xếp hạng</span>
        </div>
        
      </div>


      
    </div>
  )
}
