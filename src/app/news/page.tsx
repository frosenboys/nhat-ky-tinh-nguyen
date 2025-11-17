"use client";

import { useEffect, useState } from "react";
import HeaderNav from "@/app/components/HeaderNav";
import { fetchWOA, fetchWithAuth } from "@/lib/api";
import {
  faHeart,
  faComment,
  faLink,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";

export default function NewsPage() {
  const [newsList, setNewsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchWOA("/news");
        setNewsList(data);
      } catch (err: any) {
        setError("Không thể tải bản tin");
      }
      setLoading(false);
    };
    load();
  }, []);

  const handleLike = async (id: number) => {
    try {
      const res = await fetchWithAuth(`/news/${id}/like`, { method: "POST" });

      if (res.liked) {
        setNewsList((prev) =>
          prev.map((n) =>
            n.id === id
              ? {
                  ...n,
                  liked: true,
                  _count: {
                    ...n._count,
                    likes: n._count.likes + 1,
                  },
                }
              : n
          )
        );
      }
    } catch (e) {
      alert("Bạn cần đăng nhập để like!");
    }
  };

  const share = async (id: number) => {
    await navigator.clipboard.writeText(`${window.location.origin}/news/post?id=${id}`);
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-slide-in" : "animate-slide-out"
        } bg-white shadow-xl border border-blue-300 rounded-xl px-4 py-3 mb-20 flex items-center gap-3`}
      >
        <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg">
          🔗
        </div>
        <div>
          <p className="font-bold text-blue-700">Đã sao chép liên kết!</p>
          <p className="text-sm text-gray-500">Bạn có thể chia sẻ ngay.</p>
        </div>
      </div>
    ));

  };

  if (loading)
    return <div className="min-h-screen flex justify-center items-center">Đang tải...</div>;

  return (
    <div className="min-h-screen pb-24">

      {/* HEADER */}
      <div className="bg-main-gradient text-white p-4 relative mb-5 pb-16">
        <HeaderNav />
        <div className="absolute left-6 -bottom-16 flex flex-col items-center">
          <div className="bg-white rounded-full p-[20px]">
            <div className="bg-main-gradient text-white rounded-full p-3">
              <FontAwesomeIcon icon={faNewspaper} className="text-[40px] p-1 pt-3" />
            </div>
          </div>
          <span className="absolute left-8 -bottom-2 text-sm font-bold text-gray-800">Bảng tin</span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-4 mt-20">
        {newsList.map((post) => (
          <div key={post.id} className="mb-8 pb-2 bg-white p-2 rounded-4xl shadow-xl">

            <div className="text-sm text-gray-500 mb-2 mx-2">
              {new Date(post.createdAt).toLocaleDateString("vi-VN")}
            </div>

            <div className="flex">
              <img
                src={post.imageUrl}
                alt=""
                width={600}
                height={400}
                className="w-70 h-auto rounded-lg cursor-pointer"
                onClick={() => setSelectedImage(post.imageUrl)}
              />
              <p className="text-gray-700 font-bold ml-2 bg-gray-200 p-2 rounded-lg text-sm word-break w-full">
                {post.title}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="relative left-0 flex justify-around items-center mt-3 pt-3 py-2 bg-gray-100 rounded-lg shadow-md rounded-b-3xl">

              {/* LIKE */}
              <button
                disabled={post.liked}
                onClick={() => !post.liked && handleLike(post.id)}
                className={`flex flex-col items-center ${
                  post.liked ? "opacity-50 cursor-not-allowed" : "active:scale-90"
                }`}
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  className={`text-[30px] my-1 ${
                    post.liked ? "text-red-600" : "text-gray-400"
                  }`}
                />
                <span className="font-bold">{post._count.likes}</span>
              </button>

              {/* COMMENT */}
              <button
                onClick={() => (window.location.href = `/news/post?id=${post.id}`)}
                className="flex flex-col items-center"
              >
                <FontAwesomeIcon icon={faComment} className="text-gray-400 text-[30px]" />
                <span className="font-bold">{post._count.comments}</span>
              </button>

              {/* SHARE */}
              <button className="flex flex-col items-center" onClick={() => share(post.id)}>
                <FontAwesomeIcon icon={faLink} className="text-blue-600 text-[30px]" />
                Share
              </button>
            </div>

          </div>
        ))}

        {/* MODAL */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-[90%] max-h-[90%]">
              <button
                className="absolute top-2 right-2 text-white text-2xl"
                onClick={() => setSelectedImage(null)}
              >
                ×
              </button>
              <img
                src={selectedImage}
                alt=""
                width={1200}
                height={800}
                className="object-contain rounded-lg max-h-[90vh]"
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
