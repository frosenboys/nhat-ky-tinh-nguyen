'use client'
import HeaderNav from '@/app/components/HeaderNav'
import Image from 'next/image'
import { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHeart, faComment, faListCheck, faLink, faNewspaper } from "@fortawesome/free-solid-svg-icons";

// function Reaction({ icon: Icon, count, color }: ReactionProps) {
//   const [num, setNum] = useState(count)
//   const [clicked, setClicked] = useState(false)

//   return (
//     <button
//       onClick={() => {
//         setClicked(!clicked)
//         setNum(num + (clicked ? -1 : 1))
//       }}
//       className="flex flex-col items-center transition-transform active:scale-90 focus:outline-none"
//     >
//       <Icon
//         className={`text-lg ${color} ${clicked ? 'scale-110 animate-pulse' : ''}`}
//       />
//       <span className="text-xs font-semibold text-gray-700">{num}</span>
//     </button>
//   )
// }

export default function HomePage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const posts = [
    {
      id: 1,
      date: '25/6/2025',
      img: '/images/banner.png',
      caption: 'Các bạn khối 12 yên tâm, tất cả đã sẵn sàng đồng hành!',
      likes: 1089,
      comments: 357,
      shares: 200,
      games: 50,
      sends: 15,
    },
    {
      id: 2,
      date: '25/6/2025',
      img: '/images/banner.png',
      caption: 'Tạm biệt búp bê thân yêu ❤️',
      likes: 10,
      comments: 25,
      shares: 2,
      games: 56,
      sends: 1,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col pb-24">
      {/* HEADER */}
      <div className="bg-main-gradient text-white p-4 relative mb-5 pb-16">
        <HeaderNav />
        <div className="absolute left-6 -bottom-14 flex flex-col items-center">
          <div className="bg-white rounded-full p-[20px]">
            <div className="bg-main-gradient text-white rounded-full p-3">
              <FontAwesomeIcon icon={faNewspaper} className="text-[40px] p-1 pt-3" />
            </div>
          </div>
          <span className="absolute left-8 -bottom-2 text-sm font-bold text-gray-800">
            Bản tin
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 bg-white px-4 mt-20 pb-10">
        
        {/* Post list */}
        {posts.map((post) => (
          <div key={post.id} className="mb-8 border-b border-gray-200 pb-4">
            <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
              <span>{post.date}</span>
            </div>
            <div className="flex">
              <Image
                src={post.img}
                alt="Post Image"
                width={600}
                height={400}
                className="w-60 h-auto rounded-lg mb-2 cursor-pointer"
                onClick={() => setSelectedImage(post.img)}
              />
              <p className="text-gray-400 font-bold mb-1 bg-gray-200 h-fit w-30 ml-2 rounded-lg p-2">{post.caption}</p>
            </div>
            <div key={post.id} className="flex justify-between items-center mt-2 px-2 text-gray-700 text-xl bg-gray-100 rounded-full py-2">
              <div className="flex items-center space-x-1">
                <FontAwesomeIcon icon={faShieldHeart} className="text-blue-600 text-[30px]" />
                <span className="text-red-500 font-bold">{post.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <FontAwesomeIcon icon={faComment} className="text-blue-600 text-[30px]" />
                <span className="text-red-500 font-bold">{post.comments}</span>
              </div>
              <div className="flex items-center space-x-1">
                <FontAwesomeIcon icon={faListCheck} className="text-blue-600 text-[30px]" />
                <span className="text-red-500 font-bold">{post.shares}</span>
              </div>
              <div className="flex items-center space-x-1">
                <FontAwesomeIcon icon={faLink} className="text-blue-600 text-[30px]" />
              </div>
            </div>
          </div>
        ))}
        {/* Modal for enlarged image */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-1000" onClick={() => setSelectedImage(null)}>
            <div className="relative max-w-[90%] max-h-[90%]" onClick={(e) => e.stopPropagation()}>
              <button
                aria-label="Close image"
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 text-white text-3xl leading-none"
              >
                x
              </button>
              <Image
                src={selectedImage}
                alt="Enlarged image"
                width={1200}
                height={800}
                className="object-contain max-h-[90vh] rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}