'use client'
import { useState, useEffect } from 'react'
import HeaderNav from '@/app/components/HeaderNav'
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faListCheck } from "@fortawesome/free-solid-svg-icons"
import { fetchWOA } from '@/lib/api'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const [missions, setMissions] = useState<any[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchWOA('/mission/getAllMissions')
        setMissions(data)
      } catch (err: any) {
        setError('Có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ với dev ngay lập tức.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-500">
        {error}
        <button
          onClick={() => {
            Cookies.remove('token')
            router.push('/login')
          }}
          className="mt-3 bg-main-gradient text-white rounded-full px-4 py-2"
        >
          Đăng nhập lại
        </button>
      </div>
    )

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Đang tải dữ liệu...
      </div>
    )

  return (
    <div className="min-h-screen flex flex-col pb-24">
      {/* HEADER */}
      <div className="bg-main-gradient text-white p-4 relative mb-5 pb-16">
        <HeaderNav />
        <div className="absolute left-6 -bottom-16 flex flex-col items-center">
          <div className="bg-white rounded-full p-[20px]">
            <div className="bg-main-gradient text-white rounded-full p-3">
              <FontAwesomeIcon icon={faListCheck} className="text-[40px] p-1 pt-3" />
            </div>
          </div>
          <span className="absolute left-7 -bottom-2 text-sm font-bold text-gray-800">Nhiệm vụ</span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 mt-10">
        <h2 className="text-gray-700 text-[16px] font-medium mx-3">
          Hãy chọn nhiệm vụ bạn muốn thử thách!
        </h2>

        <div className="mt-6 flex flex-col space-y-5">
          {missions.map((mission) => (
            <Link
              key={mission.id}
              href={`mission/upload?id=${mission.id}`}
              className="relative flex items-center mx-5 mt-5"
            >
              <div className="flex-shrink-0 z-10 absolute -left-2">
                <div className="bg-white rounded-full p-4">
                  <div className="bg-main-gradient text-white rounded-full w-20 h-20 flex items-center justify-center">
                    <h1 className="text-5xl font-bold">{mission.id}</h1>
                  </div>
                </div>
              </div>
              <div className="ml-4 flex-1 bg-gray-200 rounded-xl px-4 py-3 h-27 ml-10 pl-20 flex items-center">
                <p className="text-md text-gray-700 limit-text">
                  {mission.missionName}
                </p>
              </div>

            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
