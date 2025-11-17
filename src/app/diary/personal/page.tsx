"use client";

import { useEffect, useState } from "react";
import HeaderNav from "@/app/components/HeaderNav";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBook, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { fetchWithAuth, fetchWOA } from "@/lib/api";

export default function DiaryPersonalPage() {
  const [diaries, setDiaries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchWithAuth("/users/missions");

        setDiaries(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err.message || "Không thể tải nhật ký cá nhân");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Đang tải nhật ký...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col pb-24">
      {/* HEADER */}
      <div className="bg-main-gradient text-white p-4 relative mb-5 pb-16">
        <HeaderNav />
        <div className="absolute left-6 -bottom-14 flex flex-col items-center">
          <div className="bg-white rounded-full p-[20px]">
            <div className="bg-main-gradient text-white rounded-full p-3">
              <FontAwesomeIcon icon={faBook} className="text-[40px] p-1 pt-3" />
            </div>
          </div>
          <span className="absolute left-7.5 -bottom-7 text-sm font-bold text-gray-800">
            Nhật ký tháng 9
          </span>
        </div>

        <button
          onClick={() => history.back()}
          className="absolute z-50 right-6 -bottom-15 text-sm font-bold text-white bg-blue-700 rounded-full w-10 h-10 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-[20px]" />
        </button>
      </div>

      <FontAwesomeIcon icon={faUser} className="mx-auto text-blue-500 text-6xl" />

      {/* CONTENT */}
      <div className="card w-full mt-15 p-2 min-w-xs">
        <div className="card card-body w-full bg-gray-300 rounded-lg p-2 pt-8 flex flex-col items-center text-black">
          {diaries.length === 0 ? (
            <p className="text-gray-700 text-center mt-10">Chưa có nhiệm vụ nào</p>
          ) : (
            diaries.map((item, index) => (
              <div
                key={item.id}
                className="w-full relative flex flex-col items-center mb-15"
              >
                <div className="bg-white w-full h-20 p-5 rounded-full flex items-center justify-center">
                  <span className="w-50 text-lg font-bold text-center">
                    Nhiệm vụ
                  </span>

                  {/* STATUS */}
                  <span
                    className={`w-50 ml-30 text-base font-bold ${
                      item.isSubmitted
                        ? "text-red-600" // đã tham gia
                        : item.status === "open"
                        ? "text-blue-600" // đang mở
                        : "text-gray-400" // đã đóng
                    }`}
                  >
                    {item.statusText}
                  </span>
                </div>

                {/* RANK NUMBER */}
                <div className="absolute -top-5 z-10 bg-white rounded-full p-[20px]">
                  <div className="bg-main-gradient text-white rounded-full p-3">
                    <h1 className="text-5xl font-bold w-13 h-13 text-center">
                      {index + 1}
                    </h1>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
