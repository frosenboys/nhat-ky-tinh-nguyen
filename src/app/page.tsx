import HeaderNav from '@/app/components/HeaderNav'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper, faListCheck, faRankingStar, faBook, faComment, faMapLocationDot } from "@fortawesome/free-solid-svg-icons";

export default function HomePage() {
  const features = [
    { name: 'Bản tin', icon: faNewspaper, href: '/news' },
    { name: 'Nhiệm vụ', icon: faListCheck, href: '/mission' },
    { name: 'Nhật ký', icon: faBook, href: '/diary' },
    { name: 'Chatbot', icon: faComment, href: '/chatbot' },
    { name: 'Bản đồ số', icon: faMapLocationDot, href: '/digimap' },
    { name: 'Bảng xếp hạng', icon: faRankingStar, href: '/ranking' },
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
            src="/images/default-avatar.svg"
            alt="Avatar"
            width={50}
            height={50}
            className="rounded-full border-2 border-white bg-white"
          />
          <div className="ml-3">
            <p className="text-sm font-semibold">CHÀO MỪNG!</p>
            <p className="text-sm">Đ/c: Dư Thị Thanh Xuân</p>
          </div>
        </div>
      </div>

      {/* GRID ICONS */}
      <div className="grid grid-cols-3 gap-4 px-6 py-5">
        {features.map((item, i) => (
          <Link key={i} href={item.href} className="flex flex-col items-center text-center hover:scale-105 transition-transform">
            <div className="w-18 h-18 rounded-full bg-main-gradient flex justify-center items-center shadow-md">
              <FontAwesomeIcon icon={item.icon} className="text-[40px] text-white" />
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
