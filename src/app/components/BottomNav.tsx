'use client'
import { FaHome, FaSearch, FaUser, FaCompass } from 'react-icons/fa'

export default function BottomNav() {
  return (
    <div className="btnNav bg-main-gradient text-white flex justify-around py-2 pt-5 h-20 rounded-t-2xl shadow-lg">
      <button onClick={() => {window.location.href = '/'}} className="w-25 flex flex-col items-center text-xs active:opacity-70">
        <FaHome className="text-2xl mb-1" />
        <span>Trang chủ</span>
      </button>
      <button className="w-25 flex flex-col items-center text-xs active:opacity-70">
        <FaCompass className="text-2xl mb-1" />
        <span>Mở rộng</span>
      </button>
      <button className="w-25 flex flex-col items-center text-xs active:opacity-70">
        <FaSearch className="text-2xl mb-1" />
        <span>Tìm kiếm</span>
      </button>
      <button onClick={() => {window.location.href = '/profile'}} className="w-25 flex flex-col items-center text-xs active:opacity-70">
        <FaUser className="text-2xl mb-1" />
        <span>Trang cá nhân</span>
      </button>
    </div>
  )
}