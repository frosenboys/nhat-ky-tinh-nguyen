import HeaderNav from '@/app/components/HeaderNav'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";

export default function HomePage() {

  return (
    <div className="min-h-screen flex flex-col pb-24">
      {/* HEADER */}
      <div className="bg-main-gradient text-white p-4 relative mb-5 pb-16">
        <HeaderNav />
        <div className="absolute left-6 -bottom-16 flex flex-col items-center">
          <div className="bg-white rounded-full p-[20px]">
            <div className="bg-main-gradient text-white rounded-full p-3">
              <FontAwesomeIcon icon={faListCheck} className="text-[40px] p-1 pt-3" />
            </div>
          </div>
          <span className="absolute left-6 -bottom-2 -mt- text-sm font-bold text-gray-800">Nhiệm vụ</span>
        </div>
      </div>
      {/* CONTENT */}
      <div className="p-5 mt-10">
        <h2 className="text-gray-700 text-[16px] font-medium mx-3">
          Hãy chọn nhiệm vụ bạn muốn thử thách!
        </h2>
      </div>
      <Link href={"mission/upload?id=1"} className="flex items-center">
        <div className="z-10 bg-white rounded-full p-[20px]">
          <div className="bg-main-gradient text-white rounded-full p-3">
            <h1 className="text-5xl font-bold w-13 h-13 text-center">1</h1>
          </div>
        </div>
        <div className="absolute w-auto rounded-[13px] ml-10 bg-gray-300 z-0 h-25 pl-20 mr-5">
          <div className="text-gray-700 text-sm mx-3 mt-3">
            Thực hiện theo Công văn số 05-KH/ĐTN của BCH Đoàn phường Bình Long về thực hiện “1000 bước chân mỗi ngày” ...
          </div>
        </div>
      </Link>

      <div className="flex items-center mt-5">
        <div className="z-10 bg-white rounded-full p-[20px]">
          <div className="bg-main-gradient text-white rounded-full p-3">
            <h1 className="text-5xl font-bold w-13 h-13 text-center">2</h1>
          </div>
        </div>
        <div className="absolute w-auto rounded-[13px] ml-10 bg-gray-300 z-0 h-25 pl-20 mr-5">
          <div className="text-gray-700 text-sm mx-3 mt-3">
            Thực hiện theo Công văn số 06-KH/ĐTN của BCH Đoàn phường Bình Long về thực hiện “Mỗi ngày một cuốn sách làm bạn”  ...
          </div>
        </div>
      </div>

      <div className="flex items-center mt-5">
        <div className="z-10 bg-white rounded-full p-[20px]">
          <div className="bg-main-gradient text-white rounded-full p-3">
            <h1 className="text-5xl font-bold w-13 h-13 text-center">3</h1>
          </div>
        </div>
        <div className="absolute w-auto rounded-[13px] ml-10 bg-gray-300 z-0 h-25 pl-20 mr-5">
          <div className="text-gray-700 text-sm mx-3 mt-3">
            Thực hiện theo Công văn số 11-KH/ĐTN của BCH Đoàn trường THPT Bình Long về thực hiện “Phân loại rác thải nhựa” ...
          </div>
        </div>
      </div>

      <div className="flex items-center mt-5">
        <div className="z-10 bg-white rounded-full p-[20px]">
          <div className="bg-main-gradient text-white rounded-full p-3">
            <h1 className="text-5xl font-bold w-13 h-13 text-center">4</h1>
          </div>
        </div>
        <div className="absolute w-auto rounded-[13px] ml-10 bg-gray-300 z-0 h-25 pl-20 mr-5">
          <div className="text-gray-700 text-sm mx-3 mt-3">
            Thực hiện theo Công văn số 12-KH/ĐTN của BCH tỉnh Đoàn Đồng Nai về thực hiện chiến dịch “90 ngày đêm” thực hiện chữ ký ...
          </div>
        </div>
      </div>
    </div>
  )
}
