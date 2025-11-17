'use client'

import { useState, useEffect } from 'react'
import HeaderNav from '@/app/components/HeaderNav'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPeopleRoof, faBell } from "@fortawesome/free-solid-svg-icons"
import { fetchWithAuth } from '@/lib/api'

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    async function loadNotifications() {
      try {
        const data = await fetchWithAuth('/users/notifications')
        setNotifications(data)
      } catch (err) {
        console.error('❌ Lỗi khi lấy thông báo:', err)
        setError('Không thể tải thông báo, vui lòng thử lại sau.')
      } finally {
        setLoading(false)
      }
    }

    loadNotifications()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Đang tải thông báo...
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-500">
        {error}
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col pb-24">
      {/* HEADER */}
      <div className="bg-main-gradient text-white p-4 relative mb-5 pb-16">
        <HeaderNav />
        <div className="absolute left-6 -bottom-14 flex flex-col items-center">
          <div className="bg-white rounded-full p-[20px] shadow-md">
            <div className="bg-main-gradient text-white rounded-full p-3">
              <FontAwesomeIcon icon={faBell} className="text-[40px] p-1 pt-3" />
            </div>
          </div>
          <span className="absolute left-6 -bottom-8 text-sm font-bold text-gray-800 text-center">
            Thông báo
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col w-full p-3 items-center mt-20">
        {notifications.length === 0 ? (
          <p className="text-gray-500 mt-10 text-sm">Hiện chưa có thông báo nào.</p>
        ) : (
          notifications.map((noti, i) => (
            <div
              key={i}
              className="w-full bg-gray-100 text-gray-700 rounded-lg text-md p-3 flex items-start mb-3 shadow-sm"
            >
              <FontAwesomeIcon icon={faPeopleRoof} className="text-blue-700 text-3xl mr-4 mt-1" />
              <div>
                <p className="font-semibold text-gray-900">{noti.from}</p>
                <p className="text-sm">{noti.content}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
