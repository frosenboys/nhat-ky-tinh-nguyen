import HeaderNav from '@/app/components/HeaderNav'
import Image from 'next/image'
import Link from 'next/link'
import { FaRegBell } from 'react-icons/fa'

export default function HomePage() {
  const features = [
    { name: 'Bản tin', icon: '/icons/news.svg', href: '/login' },
    { name: 'Nhiệm vụ', icon: '/icons/mission.svg', href: '/nhiemvu' },
    { name: 'Nhật ký', icon: '/icons/diary.svg', href: '/nhatky' },
    { name: 'Bộ sưu tập', icon: '/icons/collection.svg', href: '/bosuutap' },
    { name: 'Chatbot', icon: '/icons/chatbot.svg', href: '/chatbot' },
    { name: 'Bản đồ số', icon: '/icons/map.svg', href: '/bandos' },
    { name: 'Bảng xếp hạng', icon: '/icons/ranking.svg', href: '/bangxephang' },
    { name: 'Tất cả', icon: '/icons/all.svg', href: '/tatca' }
  ]

  const suggestions = Array(2).fill('/images/test.png')
  const mainImgs = Array(3).fill('/images/test.png')

  

  return (
    <div className="min-h-screen flex flex-col pb-24">
      {/* HEADER */}
      <div className="bg-main-gradient text-white p-4 rounded-b-3xl relative mb-5">
        <HeaderNav />
        <div className="flex items-center">
          <Image
            src="/images/avt.jpg"
            alt="Avatar"
            width={50}
            height={50}
            className="rounded-full border-2 border-white"
          />
          <div className="ml-3">
            <p className="text-sm font-semibold">CHÀO MỪNG!</p>
            <p className="text-sm">Đ/c: Dư Thị Thanh Xuân</p>
          </div>
          <div className="ml-auto relative bg-white p-2 rounded-full shadow-md">
            <FaRegBell className="text-[30px] text-black p-1" />
            <span className="absolute top-1 right-1 block w-2.5 h-2.5 bg-yellow-400 rounded-full ring-2 ring-white"></span>
          </div>
        </div>
      </div>

      {/* GRID ICONS */}
      <div className="grid grid-cols-4 gap-4 px-6 py-5">
        {features.map((item, i) => (
          <Link key={i} href={item.href} className="flex flex-col items-center text-center hover:scale-105 transition-transform">
            <div className="w-18 h-18 rounded-full bg-main-gradient flex justify-center items-center shadow-md">
              <Image src={item.icon} alt={item.name} width={40} height={40} />
            </div>
            <p className="text-xs mt-2 font-medium text-gray-700">{item.name}</p>
          </Link>
        ))}
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <h2 className="text-gray-700 text-sm font-medium mx-3 mb-3">
          Mỗi ngày một tin tốt, một cuốn sách hay, một câu chuyện đẹp
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2 justify-center">
          {mainImgs.map((img, i) => (
            <Image key={i} src={img} alt="suggest" width={140} height={90} className="rounded-xl object-cover flex-shrink-0 w-29" />
          ))}
        </div>

        <h2 className="text-gray-700 font-medium mx-5 mt-3">
          Gợi ý
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2 justify-center">
          {suggestions.map((img, i) => (
            <Image key={i} src={img} alt="suggest" width={140} height={90} className="rounded-xl object-cover flex-shrink-0 w-45" />
          ))}
        </div>
      </div>
    </div>
  )
}
