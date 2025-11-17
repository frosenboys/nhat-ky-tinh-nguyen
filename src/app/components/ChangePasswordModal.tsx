'use client'

import { useState } from "react"
import toast from "react-hot-toast"
import { fetchWithAuth } from "@/lib/api"

export default function ChangePasswordModal({ onClose }:any) {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!oldPassword || !newPassword || !confirmPassword)
      return toast.error("Vui lòng nhập đủ thông tin")

    if (newPassword.length < 6)
      return toast.error("Mật khẩu mới phải ≥ 6 ký tự")

    if (newPassword !== confirmPassword)
      return toast.error("Mật khẩu nhập lại không khớp")

    setLoading(true)

    try {
      const res = await fetchWithAuth("/users/password", {
        method: "POST",
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
        headers: { "Content-Type": "application/json" }
      })

      toast.success("Đổi mật khẩu thành công!")
      onClose()

    } catch (err: any) {
      toast.error(err.message || "Đổi mật khẩu thất bại")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
      <div className="bg-white p-5 rounded-lg w-[90%] max-w-sm shadow">
        <h2 className="text-lg font-bold mb-4 text-center">Đổi mật khẩu</h2>

        <div className="flex flex-col gap-3">
          <input
            type="password"
            placeholder="Mật khẩu cũ"
            className="border p-2 rounded"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mật khẩu mới"
            className="border p-2 rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Nhập lại mật khẩu mới"
            className="border p-2 rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="flex justify-between mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 text-black"
          >
            Hủy
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 rounded bg-main-gradient text-white disabled:opacity-50"
          >
            {loading ? "Đang xử lý..." : "Xác nhận"}
          </button>
        </div>
      </div>
    </div>
  )
}
