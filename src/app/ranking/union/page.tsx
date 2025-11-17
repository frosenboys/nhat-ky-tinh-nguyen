'use client'

import { useEffect, useState } from 'react'
import HeaderNav from '@/app/components/HeaderNav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleRoof, faRankingStar, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import styles from '../rankBadge.module.css'
import { fetchWOA } from '@/lib/api'

export default function RankUnionPage() {
  const [ranking, setRanking] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadRanking = async () => {
      try {
        const data = await fetchWOA('/main/ranking/unionGroup')
        setRanking(data)
      } catch (err: any) {
        setError(err.message || 'Không thể tải bảng xếp hạng')
      } finally {
        setLoading(false)
      }
    }

    loadRanking()
  }, [])

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Đang tải bảng xếp hạng...
      </div>
    )

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    )

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
          <span className="absolute left-8.5 -bottom-7 text-sm font-bold text-gray-800 text-center">
            BXH <br /> tháng 9
          </span>
        </div>
      </div>

      {/* ICON + BACK BUTTON */}
      <div className="absolute w-full text-center top-45 text-gray-900 font-bold text-xl flex justify-center items-center mt-2 max-w-lg mx-auto">
        <FontAwesomeIcon icon={faPeopleRoof} className="text-blue-800 text-6xl" />
        <button
          onClick={() => history.back()}
          className="absolute right-6 text-sm font-bold text-white bg-blue-700 rounded-full w-10 h-10 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-[20px]" />
        </button>
      </div>

      {/* CONTENT */}
      <div className="w-full p-3 mt-15">
        <div className="p-5 rounded-lg bg-gray-200 min-h-[60vh]">
          {ranking.length === 0 && (
            <p className="text-center text-gray-700">Chưa có dữ liệu xếp hạng</p>
          )}

          {/* Top 1 - 3 */}
          {ranking.slice(0, 3).map((group, index) => {
            const topClass =
              index === 0
                ? styles.top1
                : index === 1
                ? styles.top2
                : styles.top3

            return (
              <div
                key={group.name || index}
                className={`flex items-center bg-white w-full h-12 rounded-full p-2 text-blue-800 mb-5 ${topClass}`}
              >
                <FontAwesomeIcon icon={faPeopleRoof} className="text-3xl ml-2 text-blue-800" />
                <span className="ml-5 font-bold">
                  {group.name}
                  <span className="ml-3 text-gray-500 text-sm">({group.total_points} điểm)</span>
                </span>
                <div className={`${styles.rankBadge} -mr-3`} aria-hidden="true" />
              </div>
            )
          })}

          {/* Top 4 - 10 */}
          {ranking.slice(3).map((group, index) => (
            <div
              key={group.name || index + 3}
              className="flex items-center bg-white w-full h-12 rounded-full p-2 text-blue-800 mb-5"
            >
              <FontAwesomeIcon icon={faPeopleRoof} className="text-3xl ml-2" />
              <span className="ml-5 font-bold">
                {group.name}
                <span className="ml-3 text-gray-500 text-sm">({group.total_points} điểm)</span>
              </span>
              <div className="bg-blue-800 min-w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-xl p-1 ml-auto">
                {index + 4}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
