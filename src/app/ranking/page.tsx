'use client'
import HeaderNav from '@/app/components/HeaderNav'
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleRoof, faUser, faListCheck, faRankingStar } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col pb-24">
      {/* HEADER */}
      <div className="bg-main-gradient text-white p-4 relative mb-5 pb-16">
        <HeaderNav />
        <div className="absolute left-6 -bottom-14 flex flex-col items-center">
          <div className="bg-white rounded-full p-[20px]">
            <div className="bg-main-gradient text-white rounded-full p-3">
              <FontAwesomeIcon icon={faRankingStar} className="text-[40px] p-1 pt-3" />
            </div>
          </div>
          <span className="absolute left-8.5 -bottom-7 text-sm font-bold text-gray-800 text-center">BXH <br/>tháng <span>{moment().month() + 1}</span></span>
          
        </div>
      </div>
      {/* CONTENT */}
      <div className="card flex-1 flex flex-col w-full p-5 items-center justify-center mt-10">
        <Link href={"/ranking/personal"} className="card card-body w-full h-24 bg-gray-200 text-gray-600 rounded-full text-3xl p-5 relative flex items-center mx-5 mt-5 mt-2 pl-22">
          <div className="flex-shrink-0 z-10 absolute -left-2">
            <div className="bg-white rounded-full p-4">
              <div className="bg-main-gradient text-white rounded-full w-16 h-16 flex items-center justify-center">
                <FontAwesomeIcon icon={faUser} className="text-4xl" />
              </div>
            </div>
          </div>
          <span className="m-auto">Theo cá nhân</span>
        </Link>
        <Link href={"/ranking/union"} className="card card-body w-full h-24 bg-gray-200 text-gray-600 rounded-full text-3xl p-5 relative flex items-center mx-5 mt-5 mt-2 pl-22">
          <div className="flex-shrink-0 z-10 absolute -left-2">
            <div className="bg-white rounded-full p-4">
              <div className="bg-main-gradient text-white rounded-full w-16 h-16 flex items-center justify-center">
                <FontAwesomeIcon icon={faPeopleRoof} className="text-4xl" />
              </div>
            </div>
          </div>
          <span className="m-auto">Theo chi đoàn</span>
        </Link>
        <Link href={"/ranking/mission"} className="card card-body w-full h-24 bg-gray-200 text-gray-600 rounded-full text-3xl p-5 relative flex items-center mx-5 mt-5 mt-2 pl-22">
          <div className="flex-shrink-0 z-10 absolute -left-2">
            <div className="bg-white rounded-full p-4">
              <div className="bg-main-gradient text-white rounded-full w-16 h-16 flex items-center justify-center">
                <FontAwesomeIcon icon={faListCheck} className="text-4xl" />
              </div>
            </div>
          </div>
          <span className="m-auto">Theo nhiệm vụ</span>
        </Link>
        
      </div>

      
    </div>
  )
}
