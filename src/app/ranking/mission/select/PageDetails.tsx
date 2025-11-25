'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import HeaderNav from '@/app/components/HeaderNav'
import Image from 'next/image'
import styles from '../../rankBadge.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faListCheck, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { fetchWOA } from '@/lib/api'

export default function Details() {
  const searchParams = useSearchParams()
  const missionId = searchParams.get("id")

  const [ranking, setRanking] = useState<any[]>([])
  const [mission, setMission] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const info = await fetchWOA(`/mission/getMissionbyId/${missionId}`)
        setMission(info)

        const rank = await fetchWOA(`/main/ranking/mission_${missionId}`)
        setRanking(rank)
      } catch (e) {}
      setLoading(false)
    }

    load()
  }, [missionId])

  if (loading)
    return <div className="min-h-screen flex justify-center items-center">Đang tải...</div>

  return (
    <div className="min-h-screen flex flex-col pb-24">
      {/* HEADER */}
      <div className="bg-main-gradient text-white p-4 relative mb-5 pb-16">
        <HeaderNav />

        <div className="absolute left-6 -bottom-14 flex flex-col items-center">
          <div className="bg-white rounded-full p-[20px]">
            <div className="bg-main-gradient text-white rounded-full p-3">
              <FontAwesomeIcon icon={faListCheck} className="text-[40px] p-1 pt-3" />
            </div>
          </div>
          <span className="absolute left-7 -bottom-7 text-sm font-bold text-gray-800 text-center">
            BXH <br /> nhiệm vụ
          </span>
        </div>
      </div>

      {/* BACK */}
      <div className="absolute w-full text-center top-55 text-gray-900 font-bold text-xl flex justify-center items-center mt-2 max-w-lg">
        <button
          onClick={() => history.back()}
          className="absolute right-10 text-sm font-bold text-white bg-blue-700 rounded-full w-10 h-10 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-[20px]" />
        </button>
      </div>

      {/* CONTENT */}
      <div className="w-full p-3 mt-17">
        <h2 className="font-bold text-lg ml-5 mb-3 text-gray-800">
          {mission?.missionName}
        </h2>

        <div className="p-5 rounded-lg bg-gray-200 min-h-[60vh]">
          {/* TOP 1 - 3 */}
          {ranking.slice(0, 3).map((user, index) => {
            const crowns = ["/icons/crown1.svg", "/icons/crown2.svg", "/icons/crown3.svg"]
            const topClass =
              index === 0 ? styles.top1 : index === 1 ? styles.top2 : styles.top3

            return (
              <div
                key={user.studentId}
                className={`flex items-center bg-white w-full h-12 rounded-full p-2 text-blue-800 mb-5 ${topClass}`}
              >
                <img
                  src={user.avatarUrl || "/images/default-avatar.svg"}
                  width={40}
                  height={40}
                  className="rounded-full"
                />

                <Image
                  src={crowns[index]}
                  alt="crown"
                  width={30}
                  height={30}
                  className="relative -left-12 -top-5 -rotate-20 z-20"
                />

                <span className="-ml-5 text-sm max-w-[calc(100%-100px)] text-blue-700 truncate">
                  {user.fullName} - {user.unionGroup}
                </span>

                <div className={`${styles.rankBadge} -mr-3`} />
              </div>
            )
          })}

          {/* TOP 4+ */}
          {ranking.slice(3).map((user, index) => (
            <div
              key={user.studentId}
              className="flex items-center bg-white w-full h-12 rounded-full p-2 text-blue-800 mb-5"
            >
              <img
                src={user.avatarUrl || "/images/default-avatar.svg"}
                width={40}
                height={40}
                className="rounded-full"
              />

              <span className="ml-2.5 text-sm max-w-[calc(100%-100px)] text-blue-700 truncate">
                {user.fullName} - {user.unionGroup}
              </span>

              <div className="bg-blue-800 min-w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-xl ml-auto">
                {index + 4}
              </div>
            </div>
          ))}

          {ranking.length === 0 && (
            <p className="text-center text-gray-600">Chưa có ai.</p>
          )}
        </div>
      </div>
    </div>
  )
}
