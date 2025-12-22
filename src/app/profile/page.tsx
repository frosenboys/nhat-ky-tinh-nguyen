'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaPen, FaArrowLeft, FaPowerOff } from 'react-icons/fa'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'

import { fetchWithAuth } from '@/lib/api'
import AvatarCropper from '@/app/components/AvatarCropper'
import { uploadToCloudinary } from '@/lib/uploadToCloudinary'
import ChangePasswordModal from '@/app/components/ChangePasswordModal'

export default function ProfilePage() {
  const router = useRouter()

  const [user, setUser] = useState<any>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [showCropper, setShowCropper] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)

  // Load user
  useEffect(() => {
    fetchWithAuth('/users/profile')
      .then(setUser)
      .catch(() => toast.error("Không thể tải thông tin người dùng"))
  }, [])

  // Choose avatar
  const chooseAvatar = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"

    input.onchange = (e: any) => {
      const file = e.target.files?.[0]
      if (file) {
        const url = URL.createObjectURL(file)
        setSelectedImage(url)
        setShowCropper(true)
      }
    }

    input.click()
  }

  // Crop
  const onCropDone = async (blob: Blob) => {
    try {
      setShowCropper(false)

      const loadingToast = toast.loading("Đang tải ảnh...")

      const file = new File([blob], "avatar.jpg", {
        type: "image/jpeg",
        lastModified: Date.now(),
      })

      const avatarUrl = await uploadToCloudinary(file)

      await fetchWithAuth("/users/avatar", {
        method: "POST",
        body: JSON.stringify({ avatarUrl }),
      })

      setUser((prev: any) => ({ ...prev, avatarUrl }))

      toast.dismiss(loadingToast)
      toast.success("Ảnh đại diện đã được cập nhật!")
    } catch (err) {
      toast.dismiss()
      toast.error("Lỗi khi cập nhật ảnh!")
    }
  }

  const handleShareApp = async () => {
    const text = 
  `📘 Ứng dụng Nhật ký Đoàn Viên
  Hãy tham gia các hoạt động cùng Đoàn trường THPT Bình Long nhé!

  👉 Link truy cập: ${window.location.origin}`;

    try {
      await navigator.clipboard.writeText(text);
      toast.success("Đã sao chép nội dung!");
    } catch (err) {
      toast.error("Không thể sao chép nội dung!");
    }
  };

  // Logout
  const logout = () => {
    Cookies.remove('token')
    Cookies.remove('fullName')
    Cookies.remove('avatarUrl')
    Cookies.remove('monthNow')

    toast.success("Đăng xuất thành công!")
    router.push("/login")
  }

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Đang tải...
      </div>
    )

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24">
      {/* HEADER */}
      <div className="bg-main-gradient text-white text-center px-4 py-5 flex items-center gap-3">
        <button onClick={() => router.back()} className="p-2 fixed left-4">
          <FaArrowLeft className="text-xl" />
        </button>
        <h1 className="w-100 text-center text-lg font-bold">Thông tin cá nhân</h1>
      </div>

      {/* AVATAR */}
      <div className="flex flex-col items-center py-6 bg-white text-black">
        <div className="relative">
          <img
            src={user.avatarUrl || "/images/default-avatar.svg"}
            alt="avatar"
            width={90}
            height={90}
            className="rounded-full border-2 border-white shadow-md object-cover"
          />
          <button
            onClick={chooseAvatar}
            className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full"
          >
            <FaPen size={10} />
          </button>
        </div>

        <h2 className="text-lg font-bold mt-3">{user.fullName}</h2>
        <p className="text-gray-500 text-sm">{user.studentId}</p>
      </div>

      {/* SETTINGS */}
      <div className="text-black">

        <p className="bg-gray-100 text-gray-600 text-xs uppercase px-8 py-3">
          Cài đặt chung
        </p>

        <div className="bg-white">
          <button
            onClick={() => setShowChangePassword(true)}
            className="w-full flex items-center justify-between px-8 py-3 active:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <img src="/icons/changePassword.svg" width={22} height={22} />
              <span>Đổi mật khẩu</span>
            </div>
            <FaArrowLeft className="text-gray-400 rotate-180" />
          </button>

          <button
            onClick={handleShareApp}
            className="w-full flex items-center justify-between px-8 py-3 active:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <img src="/icons/share.svg" width={22} height={22} />
              <span>Chia sẻ ứng dụng</span>
            </div>
          </button>
        </div>

        <p className="bg-gray-100 text-gray-600 text-xs uppercase px-8 py-3">
          Thông tin cá nhân
        </p>

        <div className="bg-white">
          <div className="px-8 py-3 flex items-center gap-3">
            <img src="/icons/accountBordered.svg" width={22} height={22} />
            <span>Họ và tên: {user.fullName}</span>
          </div>

          <div className="px-8 py-3 flex items-center gap-3">
            <img src="/icons/note.svg" width={22} height={22} />
            <span>Chi đoàn: {user.unionGroup}</span>
          </div>

          <div className="px-8 py-3 flex items-center gap-3">
            <img src="/icons/shield.svg" width={22} height={22} />
            <span>Chức vụ: {user.position}</span>
          </div>
        </div>

        <button
          onClick={logout}
          className="mt-10 w-full flex items-center bg-white justify-between px-8 py-3 text-red-500"
        >
          <div className="flex items-center gap-3">
            <FaPowerOff className="text-xl" />
            <span>Đăng xuất</span>
          </div>
        </button>
      </div>

      {/* Footer logo */}
      <img src="/images/sblc.svg" className="mx-auto mt-10" width={200} />

      {/* MODALS */}
      {showCropper && selectedImage && (
        <AvatarCropper
          imageSrc={selectedImage}
          onCancel={() => setShowCropper(false)}
          onCropDone={onCropDone}
        />
      )}

      {showChangePassword && (
        <ChangePasswordModal onClose={() => setShowChangePassword(false)} />
      )}
    </div>
  )
}
