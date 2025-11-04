"use client";
import HeaderNav from '@/app/components/HeaderNav'
import Image from 'next/image'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

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
          <span className="absolute left-7.5 -bottom-7 text-sm font-bold text-gray-800">Nhật ký tháng 9</span>
        </div>
        <button onClick={() => history.back()} className="absolute z-50 right-6 -bottom-15 -mt- text-sm font-bold text-white bg-blue-700 rounded-full w-10 h-10 flex items-center justify-center">
          <FontAwesomeIcon icon={faArrowLeft} className="text-[20px]" />
        </button>
      </div>
      <div className="absolute w-full text-center top-45 text-gray-900 font-bold text-xl flex justify-center items-center mt-2">
        <Image src="/images/doan-truong.svg" alt="User" width={70} height={50} className="text-blue-500" />
      </div>
      {/* CONTENT */}
      
      <div className="card w-full mt-15 p-2 min-w-xs">
        <div className="card card-body w-full bg-gray-300 rounded-lg p-2 pt-8 flex flex-col items-center">

          <div className="w-full relative flex flex-col items-center mb-15">
            <div className="bg-white w-full h-20 p-5 rounded-full flex items-center justify-center">
              <span className="w-50 text-lg font-bold text-center">Nhiệm vụ</span>
              <span className="w-50 ml-30 text-base font-bold text-red-600">1034 lượt tham gia</span>
            </div>
            <div className="absolute -top-5 z-10 bg-white rounded-full p-[20px]">
              <div className="bg-main-gradient text-white rounded-full p-3">
                <h1 className="text-5xl font-bold w-13 h-13 text-center">1</h1>
              </div>
            </div>
          </div>

          <div className="w-full relative flex flex-col items-center mb-15">
            <div className="bg-white w-full h-20 p-5 rounded-full flex items-center justify-center">
              <span className="w-50 text-lg font-bold text-center">Nhiệm vụ</span>
              <span className="w-50 ml-30 text-base text-blue-600">Đang thực hiện</span>
            </div>
            <div className="absolute -top-5 z-10 bg-white rounded-full p-[20px]">
              <div className="bg-main-gradient text-white rounded-full p-3">
                <h1 className="text-5xl font-bold w-13 h-13 text-center">2</h1>
              </div>
            </div>
          </div>

          <div className="w-full relative flex flex-col items-center mb-15">
            <div className="bg-white w-full h-20 p-5 rounded-full flex items-center justify-center">
              <span className="w-50 text-lg font-bold text-center">Nhiệm vụ</span>
              <span className="w-50 ml-30 text-base font-bold text-red-600">345 lượt tham gia</span>
            </div>
            <div className="absolute -top-5 z-10 bg-white rounded-full p-[20px]">
              <div className="bg-main-gradient text-white rounded-full p-3">
                <h1 className="text-5xl font-bold w-13 h-13 text-center">3</h1>
              </div>
            </div>
          </div>

          <div className="w-full relative flex flex-col items-center mb-15">
            <div className="bg-white w-full h-20 p-5 rounded-full flex items-center justify-center">
              <span className="w-50 text-lg font-bold text-center">Nhiệm vụ</span>
              <span className="w-50 ml-30 text-base font-bold text-red-600">548 lượt tham gia</span>
            </div>
            <div className="absolute -top-5 z-10 bg-white rounded-full p-[20px]">
              <div className="bg-main-gradient text-white rounded-full p-3">
                <h1 className="text-5xl font-bold w-13 h-13 text-center">4</h1>
              </div>
            </div>
          </div>
          
          
        </div>
      </div>
    </div>
  )
}
