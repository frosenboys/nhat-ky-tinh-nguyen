import HeaderNav from '@/app/components/HeaderNav'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faMapLocationDot } from "@fortawesome/free-solid-svg-icons";

export default function HomePage() {

  return (
    <div className="min-h-screen flex flex-col pb-24">
      {/* HEADER */}
      <div className="bg-main-gradient text-white p-4 relative mb-5 pb-16">
        <HeaderNav />
        <div className="absolute left-6 -bottom-14 flex flex-col items-center">
          <div className="bg-white rounded-full p-[20px]">
            <div className="bg-main-gradient text-white rounded-full p-3">
              <FontAwesomeIcon icon={faMapLocationDot} className="text-[40px] p-1 pt-3" />
            </div>
          </div>
          <span className="absolute left-5.5 -bottom-2 -mt- text-sm font-bold text-gray-800">Bản đồ số</span>
        </div>
      </div>
      {/* CONTENT */}
      <div className="w-full p-3 mt-10">
        <div className="p-5 rounded-lg bg-gray-300 min-h-[60vh]">
          <div className="flex items-center bg-white w-full h-15 rounded-full p-2 text-blue-800 mb-5">
            <FontAwesomeIcon icon={faLocationDot} className="text-3xl" />
            <span className="m-auto font-bold ml-5">Trường THPT Bình Long</span>
            <div className="bg-blue-800 min-w-10 h-10 rounded-full text-white flex items-center justify-center font-bold text-xl p-1">14</div>
          </div>
          <div className="flex items-center bg-white w-full h-15 rounded-full p-2 text-blue-800 mb-5">
            <FontAwesomeIcon icon={faLocationDot} className="text-3xl" />
            <span className="m-auto font-bold ml-5">Trung tâm hành chính công phường Bình Long</span>
            <div className="bg-blue-800 min-w-10 h-10 rounded-full text-white flex items-center justify-center font-bold text-xl p-1">10</div>
          </div>
        </div>
        <div className="relative -top-17 z-10 italic text-center text-sm p-5 text-gray-500">Cùng nhau điền thêm các hoạt động tình nguyện của bạn vào nhé!</div>
      </div>
      
    </div>
  )
}
