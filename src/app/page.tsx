'use client'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import HeaderNav from '@/app/components/HeaderNav'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faNewspaper, faListCheck, faRankingStar, faBook, faComment, faMapLocationDot } from "@fortawesome/free-solid-svg-icons"
import { fetchWOA } from '@/lib/api'

export default function HomePage() {
  const [fullName, setFullName] = useState<string>('Đoàn viên')
  const [news, setNews] = useState<any[]>([])
  const [latestSubs, setLatestSubs] = useState<any[]>([])

  useEffect(() => {
    const name = Cookies.get('fullName')
    if (name) setFullName(name)

    async function loadData() {
      try {
        const data = await fetchWOA('/main/main_page')
        setNews(data.news || [])
        setLatestSubs(data.latestSubmissions || [])
      } catch (err) {
        console.error('Lỗi khi load trang chính:', err)
      }
    }

    loadData()
  }, [])

  const features = [
    { name: 'Bản tin', icon: faNewspaper, href: '/news' },
    { name: 'Nhiệm vụ', icon: faListCheck, href: '/mission' },
    { name: 'Nhật ký', icon: faBook, href: '/diary' },
    { name: 'Chatbot', icon: faComment, href: '/chatbot' },
    { name: 'Bản đồ số', icon: faMapLocationDot, href: '/digimap' },
    { name: 'Bảng xếp hạng', icon: faRankingStar, href: '/ranking' },
  ]

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
            <p className="text-sm">Đ/c: {fullName}</p>
          </div>
        </div>
      </div>

      {/* GRID ICONS */}
      <div className="grid grid-cols-3 gap-4 px-6 py-5">
        {features.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="flex flex-col items-center text-center hover:scale-105 transition-transform"
          >
            <div className="w-18 h-18 rounded-full bg-main-gradient flex justify-center items-center shadow-md">
              <FontAwesomeIcon icon={item.icon} className="text-[40px] text-white" />
            </div>
            <p className="text-xs mt-2 font-medium text-gray-700">{item.name}</p>
          </Link>
        ))}
      </div>

      {/* MAIN NEWS */}
      <div className="p-5">
        <h2 className="text-gray-700 text-sm font-medium mx-3 mb-3">
          Mỗi ngày một tin tốt, một cuốn sách hay, một câu chuyện đẹp
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2 justify-center">
          {news.length > 0 ? (
            news.map((item, i) => (
              <Link key={i} href={item.link || '#'} target="_blank">
                <img
                  src={item.image || '/images/test.png'}
                  alt={`news-${i}`}
                  width={140}
                  height={90}
                  className="rounded-xl object-cover flex-shrink-0 w-29"
                />
              </Link>
            ))
          ) : (
            <p className="text-gray-500 text-sm">Đang tải tin tức...</p>
          )}
        </div>

        {/* SUGGESTIONS */}
        <h2 className="text-gray-700 font-medium mx-5 mt-5 mb-2">
          Gợi ý
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2 justify-center">
          {latestSubs.length > 0 ? (
            latestSubs.map((item, i) => (
              <div key={i} className="flex flex-col items-center" onClick={() => window.location.href=`/news`}>
                <img
                  src={item.imageLink || '/images/test.png'}
                  alt={`suggest-${i}`}
                  width={140}
                  height={90}
                  className="rounded-xl object-cover flex-shrink-0 w-45 h-15 cursor-pointer"
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">Đang tải gợi ý...</p>
          )}
        </div>
      </div>
    </div>
  )
}
