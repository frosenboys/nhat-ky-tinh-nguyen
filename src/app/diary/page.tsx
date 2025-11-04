import HeaderNav from '@/app/components/HeaderNav'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBook } from "@fortawesome/free-solid-svg-icons";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col pb-24">
      {/* HEADER */}
      <div className="bg-main-gradient text-white p-4 relative mb-5 pb-16">
        <HeaderNav />
        <div className="absolute left-6 -bottom-14 flex flex-col items-center">
          <div className="bg-white rounded-full p-[20px]">
            <div className="bg-main-gradient text-white rounded-full p-3">
              <FontAwesomeIcon icon={faBook} className="text-[40px] p-1 pt-3" />
            </div>
          </div>
          <span className="absolute left-7.5 -bottom-2 text-sm font-bold text-gray-800">Nhật ký</span>
        </div>
      </div>
      {/* CONTENT */}
      <div className="card flex-1 flex flex-col w-full p-5 items-center justify-center">
        <Link href={"/diary/personal"} className="card card-body w-full bg-gray-300 text-gray-600 rounded-lg text-3xl p-5 flex items-center mt-2">
          <FontAwesomeIcon icon={faUser} className="text-blue-500 text-6xl mb-4" />
          Cá nhân
        </Link>
        <Link href={"/diary/school-union"} className="card card-body w-full bg-gray-300 text-gray-600 rounded-lg text-3xl p-5 flex items-center mt-2">
          <Image src="/images/doan-truong.svg" alt="Doan truong" width={70} height={70} className="m-1" />
          Đoàn trường
        </Link>
      </div>
    </div>
  )
}
