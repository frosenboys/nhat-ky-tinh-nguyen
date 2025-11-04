'use client'
import HeaderNav from '@/app/components/HeaderNav'
import Image from 'next/image'
import styles from '../rankBadge.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRankingStar, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

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
      <div className="absolute w-full text-center top-45 text-gray-900 font-bold text-xl flex justify-center items-center mt-2">
        <FontAwesomeIcon icon={faUser} className="text-blue-800 text-6xl ml-5" />
        <button onClick={() => history.back()} className="absolute right-6 text-sm font-bold text-white bg-blue-700 rounded-full w-10 h-10 flex items-center justify-center">
          <FontAwesomeIcon icon={faArrowLeft} className="text-[20px]" />
        </button>
      </div>

      {/* CONTENT */}
      
      <div className="w-full p-3 mt-15">
        <div className="p-5 rounded-lg bg-gray-300 min-h-[60vh]">
          <div className={`flex items-center bg-white w-full h-12 rounded-full p-2 text-blue-800 mb-5 ${styles.top1}`}>
            <Image src={"/images/default-avatar.svg"} alt="avatar" width={40} height={40} className="" />
            <Image src={"/icons/crown1.svg"} alt="crown" width={30} height={30} className="relative -left-12 -top-5 -rotate-20"/>
            <span className="-ml-5 text-sm max-w-[calc(100%-100px)] text-blue-700">Dư Thị Thanh Xuân -  Chi Đoàn GV</span>
            <div className={`${styles.rankBadge} mr-2`} aria-hidden="true" />
          </div>

          <div className={`flex items-center bg-white w-full h-12 rounded-full p-2 text-blue-800 mb-5 ${styles.top2}`}>
            <Image src={"/images/default-avatar.svg"} alt="avatar" width={40} height={40} className="" />
            <Image src={"/icons/crown2.svg"} alt="crown" width={30} height={30} className="relative -left-12 -top-5 -rotate-20 z-20"/>
            <span className="-ml-5 text-sm max-w-[calc(100%-100px)] text-blue-700"> Nguyễn Thị Tường Vy -  Chi Đoàn 10A2</span>
            <div className={`${styles.rankBadge} mr-2`} aria-hidden="true" />
          </div>
          
          <div className={`flex items-center bg-white w-full h-12 rounded-full p-2 text-blue-800 mb-5 ${styles.top3}`}>
            <Image src={"/images/default-avatar.svg"} alt="avatar" width={40} height={40} className="" />
            <Image src={"/icons/crown3.svg"} alt="crown" width={30} height={30} className="relative -left-12 -top-5 -rotate-20 z-20"/>
            <span className="-ml-5 text-sm max-w-[calc(100%-100px)] text-blue-700">Trương Gia Kiệt - Chi Đoàn 11A9</span>
            <div className={`${styles.rankBadge} mr-2`} aria-hidden="true" />
          </div>

          <div className="flex items-center bg-white w-full h-12 rounded-full p-2 text-blue-800 mb-5">
            <Image src={"/images/default-avatar.svg"} alt="avatar" width={40} height={40} className="" />
            <span className="ml-2.5 text-sm max-w-[calc(100%-100px)] text-blue-700">Nguyễn Gia Huy - Chi Đoàn 12A3</span>
            <div className={"bg-blue-800 min-w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-xl p-1 absolute right-10"}>4</div>
          </div>
          
          <div className="flex items-center bg-white w-full h-12 rounded-full p-2 text-blue-800 mb-5">
            <Image src={"/images/default-avatar.svg"} alt="avatar" width={40} height={40} className="" />
            <span className="ml-2.5 text-sm max-w-[calc(100%-100px)] text-blue-700">Hà Ngọc Tiến -  Chi Đoàn GV</span>
            <div className={"bg-blue-800 min-w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-xl p-1 absolute right-10"}>5</div>
          </div>

          <div className="flex items-center bg-white w-full h-12 rounded-full p-2 text-blue-800 mb-5">
            <Image src={"/images/default-avatar.svg"} alt="avatar" width={40} height={40} className="" />
            <span className="ml-2.5 text-sm max-w-[calc(100%-100px)] text-blue-700">Đoàn Thiên Nam - Chi Đoàn 12A2</span>
            <div className={"bg-blue-800 min-w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-xl p-1 absolute right-10"}>6</div>
          </div>
          
          
          </div>
        </div>
    </div>
  )
}
