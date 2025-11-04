import HeaderNav from '@/app/components/HeaderNav'
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";


export default function HomePage() {

  return (
    <div className="min-h-screen flex flex-col pb-24">
      {/* HEADER */}
      <div className="bg-main-gradient text-white p-4 relative mb-5 pb-16">
        <HeaderNav />
        <div className="absolute left-6 -bottom-14 flex flex-col items-center">
          <div className="bg-white rounded-full p-[20px]">
            <div className="bg-main-gradient text-white rounded-full p-3">
              <FontAwesomeIcon icon={faComment} className="text-[40px] p-1 pt-3" />
            </div>
          </div>
          <span className="absolute left-7 -bottom-2 -mt- text-sm font-bold text-gray-800">Chatbot</span>
        </div>
        
      </div>


      
    </div>
  )
}
