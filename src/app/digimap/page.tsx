"use client";

import HeaderNav from "@/app/components/HeaderNav";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchWOA } from "@/lib/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";

export default function DigiMapPage() {
  const [pins, setPins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchWOA("/main/digiMap");
        setPins(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Lỗi tải DigiMap:", e);
      }
      setLoading(false);
    };

    load();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Đang tải dữ liệu...
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
              <FontAwesomeIcon
                icon={faMapLocationDot}
                className="text-[40px] p-1 pt-3"
              />
            </div>
          </div>
          <span className="absolute left-5.5 -bottom-2 text-sm font-bold text-gray-800">
            Bản đồ số
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="w-full p-3 mt-10">
        <div className="p-5 rounded-lg bg-gray-200 min-h-[60vh]">
          {pins.length === 0 && (
            <p className="text-center text-gray-600 mt-8">
              Chưa có địa điểm tình nguyện nào.
            </p>
          )}

          {pins.map((p) => (
            <Link
              href={`${p.pinLink}`}
              target="_blank"
              key={p.id}
              className="flex items-center bg-white w-full h-15 rounded-full p-2 text-blue-800 mb-5"
            >
              <FontAwesomeIcon icon={faLocationDot} className="text-3xl" />

              <span className="m-auto font-bold ml-5">{p.pinName}</span>

              <div className="bg-blue-800 min-w-10 h-10 rounded-full text-white flex items-center justify-center font-bold text-xl p-1">
                {p.joined || 0}
              </div>
            </Link>
          ))}
        </div>

        <div className="relative -top-17 z-10 italic text-center text-sm p-5 text-gray-500">
          Cùng nhau điền thêm các hoạt động tình nguyện của bạn vào nhé!
        </div>
      </div>
    </div>
  );
}
