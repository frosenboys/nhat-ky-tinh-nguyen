'use client'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export default function LoginPage() {
  const [studentId, setStudentId] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, password }),
      })

      if (!res.ok) throw new Error('Sai mã số đoàn viên hoặc mật khẩu!')

      const data = await res.json()
      Cookies.set('token', data.access_token, { expires: 7 })
      Cookies.set('fullName', data.user.fullName, { expires: 7 })

      router.push('/')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full min-h-screen sm:min-h-[700px] shadow-lg flex flex-col">
        {/* HEADER */}
        <div className="bg-main-gradient text-white text-center px-4 py-5">
          <h1 className="text-xl font-bold">NHẬT KÝ TÌNH NGUYỆN</h1>
          <p className="text-sm mt-1">
            Số hóa hoạt động tình nguyện của ĐVTN<br />
            Trường THPT Bình Long
          </p>
        </div>

        {/* ẢNH MINH HỌA */}
        <div className="relative w-full aspect-[3/2]">
          <Image
            src="/images/banner.png"
            alt="Ảnh minh họa"
            fill
            className="object-cover"
          />
        </div>

        {/* FORM ĐĂNG NHẬP */}
        <div className="flex-1 px-6 py-8 flex flex-col justify-center">
          <form onSubmit={handleLogin} className="flex flex-col space-y-4">
            <div className="border border-blue-500 p-4 rounded-lg shadow-sm flex flex-col space-y-4">
              <div>
                <label className="block text-sm text-blue-500 font-semibold mb-1">
                  Mã đoàn viên:
                </label>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  required
                  className="w-full border border-blue-500 rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm text-blue-500 font-semibold mb-1">
                  Mật khẩu:
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-blue-500 rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-center text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-main-gradient text-white rounded-full py-2 mt-2 h-12 hover:opacity-90 transition"
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>

            <div className="ml-2 text-sm text-gray-500 mb-3">
              <a href="#" className="underline font-bold">
                Bạn đã quên mật khẩu?
              </a>
            </div>
          </form>

          <div className="mt-2 text-xs text-center bg-main-gradient py-2 rounded-full text-white">
            Tất cả thông tin của bạn sẽ được bảo mật
          </div>

          <div className="mt-5 text-xs text-center text-gray-500 py-3 border-t">
            <p className="flex items-center justify-center gap-2 mt-2">
              <Image
                src="/images/sblc.svg"
                alt="STEAM Binh Long logo"
                width={200}
                height={50}
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
