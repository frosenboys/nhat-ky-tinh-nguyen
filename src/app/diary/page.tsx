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
        <Link href={"/diary/personal"} className="card card-body w-full h-24 bg-gray-200 text-gray-600 rounded-full text-3xl p-5 relative flex items-center mx-5 mt-5 mt-2 pl-22">
          <div className="flex-shrink-0 z-10 absolute -left-2">
            <div className="bg-white rounded-full p-4">
              <div className="bg-main-gradient text-white rounded-full w-16 h-16 flex items-center justify-center">
                <FontAwesomeIcon icon={faUser} className="text-4xl" />
              </div>
            </div>
          </div>
          <span className="m-auto">Cá nhân</span>
        </Link>
        <Link href={"/diary/school-union"} className="card card-body w-full h-24 bg-gray-200 text-gray-600 rounded-full text-3xl p-5 relative flex items-center mx-5 mt-5 mt-2 pl-22">
          <div className="flex-shrink-0 z-10 absolute -left-2">
            <div className="bg-white rounded-full p-4">
              <div className="text-white rounded-full w-16 h-16 flex items-center justify-center">
                <Image src="/images/doan-truong.svg" alt="Doan truong" width={70} height={70} className="m-1" />
              </div>
            </div>
          </div>
          <span className="m-auto">Đoàn trường</span>
        </Link>
      </div>
    </div>
  )
}
