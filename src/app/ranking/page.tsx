import HeaderNav from '@/app/components/HeaderNav'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleRoof, faCircleUser, faListCheck, faRankingStar } from "@fortawesome/free-solid-svg-icons";

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
          <span className="absolute left-8.5 -bottom-7 text-sm font-bold text-gray-800 text-center">BXH <br/>tháng 9</span>
          
        </div>
      </div>
      {/* CONTENT */}
      <div className="card flex-1 flex flex-col w-full p-5 items-center justify-center">
        <Link href={"/ranking/union"} className="card card-body w-full bg-gray-300 text-gray-600 rounded-lg text-3xl p-5 flex items-center mt-2">
          <FontAwesomeIcon icon={faPeopleRoof} className="text-blue-700 text-6xl mb-4 mr-3" />
          Theo chi đoàn
        </Link>
        <Link href={"/ranking/mission"} className="card card-body w-full bg-gray-300 text-gray-600 rounded-lg text-3xl p-5 flex items-center mt-2">
          <FontAwesomeIcon icon={faListCheck} className="text-blue-700 text-6xl mb-4 mr-3" />
          Theo nhiệm vụ
        </Link>
        <Link href={"/ranking/personal"} className="card card-body w-full bg-gray-300 text-gray-600 rounded-lg text-3xl p-5 flex items-center mt-2">
          <FontAwesomeIcon icon={faCircleUser} className="text-blue-700 text-6xl mb-4 mr-3" />
          Theo cá nhân
        </Link>
      </div>

      
    </div>
  )
}
