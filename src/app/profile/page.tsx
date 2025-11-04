'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaPen, FaArrowLeft } from 'react-icons/fa'
// import { getUserProfile } from '@/lib/api'
import Cookies from 'js-cookie'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const data = await getUserProfile()
  //       setUser(data)
  //     } catch (err: any) {
  //       // console.error('Lỗi khi fetch user:', err)
  //       setError('Có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ với dev ngay lập tức.')
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   fetchData()
  // }, [])

  // Create fake data for testing
  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      setUser({
        fullName: 'Nguyễn Văn A',
        email: 'a@example.com',
        unionGroup: 'Chi đoàn 1',
        position: 'Ủy viên',
      })
      setLoading(false)
    }, 1000)
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

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Không có dữ liệu người dùng.
      </div>
    )

  // 👇 Các hàm chuẩn bị cho gọi API sau
  const handleChangePassword = () => console.log('Change password...')
  const handleLanguageChange = () => console.log('Change language...')
  const handleShareApp = () => console.log('Share app...')

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24">
      {/* HEADER */}
      <div className="bg-main-gradient text-white text-center px-4 py-5 flex items-center gap-3">
        <button onClick={() => router.back()} className="p-2 fixed left-4">
          <FaArrowLeft className="text-xl" />
        </button>
        <h1 className="w-100 text-center text-lg font-bold">Thông tin cá nhân</h1>
      </div>

      {/* AVATAR + INFO */}
      <div className="flex flex-col items-center py-6 bg-white">
        <div className="relative">
          <Image
            src="/images/default-avatar.svg"
            alt="avatar"
            width={90}
            height={90}
            className="rounded-full border-2 border-white shadow-md object-cover"
          />
          <button
            onClick={() => console.log('Edit avatar')}
            className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full"
          >
            <FaPen size={10} />
          </button>
        </div>

        <h2 className="text-lg font-bold mt-3">{user.fullName}</h2>
        <p className="text-gray-500 text-sm">{user.email}</p>
      </div>

      {/* SETTINGS SECTIONS */}
      <div>
        {/* CÀI ĐẶT CHUNG */}
        <p className="bg-gray-100 text-gray-600 text-xs uppercase px-8 py-3">
          Cài đặt chung
        </p>
        <div className="bg-white">
          <button
            onClick={handleChangePassword}
            className="w-full flex items-center justify-between px-8 py-3 active:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <Image src="/icons/changePassword.svg" alt="password" width={22} height={22} />
              <span>Đổi mật khẩu</span>
            </div>
            <FaArrowLeft className="text-gray-400 rotate-180" />
          </button>

          <button
            onClick={handleLanguageChange}
            className="w-full flex items-center justify-between px-8 py-3 active:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <Image src="/icons/language.svg" alt="language" width={22} height={22} />
              <span>Ngôn ngữ</span>
            </div>
            <FaArrowLeft className="text-gray-400 rotate-180" />
          </button>
          <button
            onClick={handleShareApp}
            className="w-full flex items-center justify-between px-8 py-3 active:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <Image src="/icons/share.svg" alt="share" width={22} height={22} />
              <span>Chia sẻ ứng dụng</span>
            </div>
          </button>
        </div>

        {/* THÔNG TIN CÁ NHÂN */}
        <p className="bg-gray-100 text-gray-600 text-xs uppercase px-8 py-3">
          Thông tin cá nhân
        </p>
        <div className="bg-white">
          <div className="w-full flex items-center justify-between px-8 py-3 active:bg-gray-50">
            <div className="flex items-center gap-3">
              <Image src="/icons/accountBordered.svg" alt="user" width={22} height={22} />
              <span>Họ và tên: {user.fullName}</span>
            </div>
          </div>

          <div className="w-full flex items-center justify-between px-8 py-3 active:bg-gray-50">
            <div className="flex items-center gap-3">
              <Image src="/icons/note.svg" alt="group" width={22} height={22} />
              <span>Chi đoàn: {user.unionGroup}</span>
            </div>
          </div>

          <div className="w-full flex items-center justify-between px-8 py-3 active:bg-gray-50">
            <div className="flex items-center gap-3">
              <Image src="/icons/shield.svg" alt="role" width={22} height={22} />
              <span>Chức vụ: {user.position}</span>
            </div>
          </div>
        </div>
      </div>
      <Image src="/images/sblc.svg" className="mx-auto mt-10" alt="share" width={180} height={100} />
    </div>
  )
}
