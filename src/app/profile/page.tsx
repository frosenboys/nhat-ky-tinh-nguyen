'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaPen, FaArrowLeft } from 'react-icons/fa'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState({
    name: 'Dư Thị Thanh Xuân',
    email: 'xudu248@gmail.com',
    unit: 'Giáo viên',
    role: 'Bí thư',
    avatar: '/images/avt.jpg',
  })

  // 👇 Các hàm chuẩn bị cho gọi API sau
  const handleEditName = () => console.log('Edit name...')
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
            src={user.avatar}
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
        <h2 className="text-lg font-bold mt-3">{user.name}</h2>
        <p className="text-gray-500 text-sm">{user.email}</p>
      </div>

      {/* SETTINGS SECTIONS */}
      <div>
        {/* CÀI ĐẶT CHUNG */}
        <p className="bg-gray-100 text-gray-600 text-xs uppercase px-8 py-3">
          Cài đặt chung
        </p>
        <div className="bg-white">
          {/* Đổi tên */}
          <button
            onClick={handleEditName}
            className="w-full flex items-center justify-between px-8 py-3  active:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <Image src="/icons/changeName.svg" alt="edit name" width={22} height={22} />
              <span>Đổi tên</span>
            </div>
            <FaArrowLeft className="text-gray-400 rotate-180" />
          </button>

          {/* Đổi mật khẩu */}
          <button
            onClick={handleChangePassword}
            className="w-full flex items-center justify-between px-8 py-3  active:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <Image src="/icons/changePassword.svg" alt="password" width={22} height={22} />
              <span>Đổi mật khẩu</span>
            </div>
            <FaArrowLeft className="text-gray-400 rotate-180" />
          </button>

          {/* Ngôn ngữ */}
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
        </div>

        {/* THÔNG TIN CÁ NHÂN */}
        <p className="bg-gray-100 text-gray-600 text-xs uppercase px-8 py-3">
          Thông tin cá nhân
        </p>
        <div className="bg-white">
          {/* Họ và tên */}
          <div className="w-full flex items-center justify-between px-8 py-3  active:bg-gray-50">
            <div className="flex items-center gap-3">
              <Image src="/icons/accountBordered.svg" alt="user" width={22} height={22} />
              <span>Họ và tên: {user.name}</span>
            </div>
            <FaArrowLeft className="text-gray-400 rotate-180" />
          </div>

          {/* Chi đoàn */}
          <div className="w-full flex items-center justify-between px-8 py-3  active:bg-gray-50">
            <div className="flex items-center gap-3">
              <Image src="/icons/note.svg" alt="group" width={22} height={22} />
              <span>Chi đoàn: {user.unit}</span>
            </div>
            <FaArrowLeft className="text-gray-400 rotate-180" />
          </div>

          {/* Chức vụ */}
          <div className="w-full flex items-center justify-between px-8 py-3  active:bg-gray-50">
            <div className="flex items-center gap-3">
              <Image src="/icons/shield.svg" alt="role" width={22} height={22} />
              <span>Chức vụ: {user.role}</span>
            </div>
            <FaArrowLeft className="text-gray-400 rotate-180" />
          </div>

          {/* Chia sẻ ứng dụng */}
          <button
            onClick={handleShareApp}
            className="w-full flex items-center justify-between px-8 py-3 active:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <Image src="/icons/share.svg" alt="share" width={22} height={22} />
              <span>Chia sẻ ứng dụng</span>
            </div>
            <FaArrowLeft className="text-gray-400 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  )
}
