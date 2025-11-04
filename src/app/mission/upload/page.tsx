"use client";
import HeaderNav from '@/app/components/HeaderNav'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck, faCloudArrowUp, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function HomePage() {
  
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    if (f) {
      const url = URL.createObjectURL(f);
      setPreview(url);
    } else {
      setPreview(null);
    }
  }

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    }
  }, [preview]);

  const handleSubmit = async () => {
    if (!file) {
      alert('Vui lòng chọn hình ảnh trước khi thêm bài.');
      return;
    }
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      fd.append('message', message);

      // Simple POST to /api/upload — replace with your API helper if needed
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: fd,
      });

      if (!res.ok) throw new Error('Upload failed');
      // Reset on success
      setFile(null);
      setMessage('');
      setPreview(null);
      alert('Đã thêm bài thành công');
    } catch (err) {
      console.error(err);
      alert('Lỗi khi thêm bài');
    } finally {
      setLoading(false);
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
              <FontAwesomeIcon icon={faListCheck} className="text-[40px] p-1 pt-3" />
            </div>
          </div>
          <span className="absolute left-6 -bottom-2 -mt- text-sm font-bold text-gray-800">Nhiệm vụ</span>
        </div>
        <button onClick={() => history.back()} className="absolute right-6 -bottom-15 -mt- text-sm font-bold text-white bg-blue-700 rounded-full w-10 h-10 flex items-center justify-center">
          <FontAwesomeIcon icon={faArrowLeft} className="text-[20px]" />
        </button>
      </div>
      {/* CONTENT */}
      <div className="p-5 mt-10">
        <h2 className="text-gray-700 text-[16px] font-medium mx-3">
          Hãy chọn nhiệm vụ bạn muốn thử thách!
        </h2>
      </div>
      <div className="flex items-center">
        <div className="z-10 bg-white rounded-full p-[20px]">
          <div className="bg-main-gradient text-white rounded-full p-3">
            <h1 className="text-5xl font-bold w-13 h-13 text-center">1</h1>
          </div>
        </div>
        <div className="absolute w-auto rounded-[13px] ml-10 bg-gray-300 z-0 h-25 pl-20 mr-5">
          <div className="text-gray-700 text-sm mx-3 mt-3">
            Thực hiện theo Công văn số 05-KH/ĐTN của BCH Đoàn phường Bình Long về thực hiện “1000 bước chân mỗi ngày” ...
          </div>
        </div>
      </div>
      {/* Upload Task Content */}
      <div className="p-5 w-full mt-10">
        <div className="relative bg-gray-300 rounded-[13px] shadow-md overflow-visible z-0">
          <div className="absolute -top-10 left-6 w-20 h-20 rounded-full border-4 border-white bg-white z-30 overflow-hidden">
            <Image src="/images/default-avatar.svg" alt="avatar" width={80} height={80} className="object-cover" />
          </div>
          <div className="absolute top-3 left-28 right-6 text-gray-600 text-sm leading-tight">
            Đăng hình hoạt động và thông điệp của bạn vào đây nhé.
          </div>
          {/* Image Upload Area */}
          <div className="flex items-center justify-center h-48 pt-6">
            {preview ? (
              <div
                className="w-fit h-40 mt-20 rounded-md shadow-md object-cover cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <img src={preview} alt="preview" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div
                className="cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
                role="button"
                aria-label="Chọn hình"
                >
                  <FontAwesomeIcon icon={faCloudArrowUp} className="text-[120px] text-gray-400 mt-15" /><br/>
                  <span className="text-sm mx-10 font-semibold text-gray-600">Tải ảnh lên</span>
              </div>
            )}
          </div>
          <div className="p-4 pt-15 z-40">
            {/* Message Input */}
            <div>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Viết thông điệp..."
                className="w-full rounded-md p-3 bg-white text-sm placeholder-gray-400 focus:outline-none resize-none h-20"
                aria-label="Thông điệp"
              />
            </div>
            {/* Add Button */}
            <div className="flex justify-end mt-3">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-main-gradient text-white w-full py-2 rounded-md disabled:opacity-50"
              >
                {loading ? 'Đang gửi...' : 'Thêm bài'}
              </button>
            </div>
          </div>

          {/* File Input (hidden)*/}
          <input
            ref={fileInputRef}
            onChange={handleFileChange}
            type="file"
            accept="image/png, image/jpeg"
            className="absolute inset-0 w-full h-40 opacity-0 cursor-pointer z-10"
            aria-label="Tải lên hình ảnh nhiệm vụ"
          />
        </div>
      </div>
    </div>
  )
}
