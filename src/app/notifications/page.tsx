import HeaderNav from '@/app/components/HeaderNav'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleRoof, faBell, faRankingStar } from "@fortawesome/free-solid-svg-icons";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col pb-24">
      {/* HEADER */}
      <div className="bg-main-gradient text-white p-4 relative mb-5 pb-16">
        <HeaderNav />
        <div className="absolute left-6 -bottom-14 flex flex-col items-center">
          <div className="bg-white rounded-full p-[20px]">
            <div className="bg-main-gradient text-white rounded-full p-3">
              <FontAwesomeIcon icon={faBell} className="text-[40px] p-1 pt-3" />
            </div>
          </div>
          <span className="absolute left-6 -bottom-2 text-sm font-bold text-gray-800 text-center">Thông báo</span>
          
        </div>
      </div>
      {/* CONTENT */}
      <div className="card flex-1 flex flex-col w-full p-3 items-center mt-10">
        <div className="card card-body w-full bg-gray-300 text-gray-600 rounded-lg text-xl p-2 flex items-center mb-5">
          <FontAwesomeIcon icon={faPeopleRoof} className="text-blue-700 text-5xl m-4" />
          Đoàn trường vừa đăng một nhiệm vụ mới
        </div>
        <div className="card card-body w-full bg-gray-300 text-gray-600 rounded-lg text-xl p-2 flex items-center mb-5">
          <div className="bg-main-gradient text-white rounded-full p-1 m-2">
            <FontAwesomeIcon icon={faBell} className="text-[40px] p-1 pt-3" />
          </div>
          Đoàn trường vừa đăng một nhiệm vụ mới
        </div>
      </div>      
    </div>
  )
}
