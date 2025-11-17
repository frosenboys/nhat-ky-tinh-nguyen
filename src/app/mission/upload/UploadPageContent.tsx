"use client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

import HeaderNav from '@/app/components/HeaderNav'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faListCheck, faCloudArrowUp, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { useSearchParams } from 'next/navigation'
import { fetchWithAuth } from '@/lib/api'
import { uploadToCloudinary } from '@/lib/uploadToCloudinary'
import toast from 'react-hot-toast'

export default function UploadPageContent() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [mission, setMission] = useState<any>(null)

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const searchParams = useSearchParams()
  const missionId = searchParams.get('id')

  // Load mission
  useEffect(() => {
    if (!missionId) return

    async function fetchMission() {
      try {
        const data = await fetchWithAuth(`/mission/getMissionbyId/${missionId}`)
        setMission(data)
      } catch (err) {
        toast.error('Không tải được nhiệm vụ!')
      }
    }

    fetchMission()
  }, [missionId])

  // Handle file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null
    setFile(f)

    if (f) {
      setPreview(URL.createObjectURL(f))
    } else {
      setPreview(null)
    }
  }

  // Cleanup preview
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  // Submit
  const handleSubmit = async () => {
    if (!file) return toast.error('Vui lòng chọn hình ảnh!')
    if (!missionId) return toast.error('Thiếu ID nhiệm vụ!')

    setLoading(true)
    try {
      const imageUrl = await uploadToCloudinary(file);
      if (!imageUrl) throw new Error('Lỗi URL hình ảnh!')

      await fetchWithAuth('/users/missions/submit', {
        method: 'POST',
        body: JSON.stringify({
          missionId,
          message,
          imageUrl,
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      toast.success('Đã thêm bài thành công!', { duration: 5000 })
      setTimeout(() => history.back(), 1500)

      setFile(null)
      setMessage('')
      setPreview(null)

    } catch (err) {
      toast.error((err as any)?.message || 'Lỗi khi thêm bài!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col pb-24">
      {/* HEADER */}
      <div className="bg-main-gradient text-white p-4 relative mb-5 pb-16">
        <HeaderNav />
        <div className="absolute left-6 -bottom-16 flex flex-col items-center">
          <div className="bg-white rounded-full p-[20px]">
            <div className="bg-main-gradient text-white rounded-full p-3">
              <FontAwesomeIcon icon={faListCheck} className="text-[40px]" />
            </div>
          </div>
          <span className="absolute left-7 -bottom-2 text-sm font-bold text-gray-800">
            Nhiệm vụ
          </span>
        </div>

        <button
          onClick={() => history.back()}
          className="absolute right-6 -bottom-15 text-sm font-bold text-white bg-blue-700 rounded-full w-10 h-10 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-[20px]" />
        </button>
      </div>

      {/* INFO */}
      <div className="p-5 mt-10">
        {mission ? (
          <div className="relative flex items-center mx-5 mt-5">
            <div className="flex-shrink-0 z-10 absolute -left-2">
              <div className="bg-white rounded-full p-4">
                <div className="bg-main-gradient text-white rounded-full w-20 h-20 flex items-center justify-center">
                  <h1 className="text-5xl font-bold">{mission.id}</h1>
                </div>
              </div>
            </div>

            <div className="ml-4 flex-1 bg-gray-200 rounded-xl px-4 py-3 h-27 ml-10 pl-20">
              <p className="text-sm text-gray-700 limit-text">
                {mission.missionName}
              </p>
            </div>
          </div>

        ) : (
          <p className="text-gray-400">Đang tải thông tin nhiệm vụ...</p>
        )}
      </div>

      {/* Upload box */}
      <div className="p-5">
        <div className="relative bg-gray-200 rounded-[13px] shadow-md overflow-visible">

          {/* Avatar */}
          <div className="absolute -top-10 left-6 w-20 h-20 rounded-full border-4 border-white bg-white overflow-hidden">
            <Image src="/images/default-avatar.svg" alt="avatar" width={80} height={80} className="object-cover" />
          </div>

          {/* Hint text */}
          <div className="absolute top-3 left-28 right-6 text-gray-600 text-sm leading-tight">
            Đăng hình hoạt động và thông điệp của bạn vào đây nhé.
          </div>

          {/* Pick image */}
          <div className="flex items-center justify-center h-48 pt-10">
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-[160px] h-[160px] object-cover rounded-md shadow cursor-pointer mt-10"
                onClick={() => fileInputRef.current?.click()}
              />
            ) : (
              <div
                className="cursor-pointer text-center"
                onClick={() => fileInputRef.current?.click()}
              >
                <FontAwesomeIcon icon={faCloudArrowUp} className="text-[120px] text-gray-400" />
                <p className="text-sm font-semibold text-gray-600 mt-2">Tải ảnh lên</p>
              </div>
            )}
          </div>

          {/* Message */}
          <div className="p-4 pt-10">
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Viết thông điệp..."
              className="w-full rounded-md p-3 bg-white text-sm placeholder-gray-400 focus:outline-none resize-none text-black"
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-main-gradient text-white w-full py-2 rounded-md mt-3 disabled:opacity-50"
            >
              {loading ? 'Đang gửi...' : 'Thêm bài'}
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  )
}
