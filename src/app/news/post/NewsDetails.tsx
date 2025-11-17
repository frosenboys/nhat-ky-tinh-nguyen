"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import HeaderNav from "@/app/components/HeaderNav";
import { fetchWOA, fetchWithAuth } from "@/lib/api";
import {
  faHeart,
  faComment,
  faArrowLeft,
  faUserCircle,
  faLink
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";

export default function NewsDetail() {
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));

  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [commentInput, setCommentInput] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const loadDetail = async () => {
      try {
        const data = await fetchWOA(`/news/${id}`);
        setNews(data);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    loadDetail();
  }, [id]);

  const likePost = async () => {
    if (news.liked) return;
    try {
      const res = await fetchWithAuth(`/news/${id}/like`, {
        method: "POST",
      });
      if (res.liked) {
        setNews({
          ...news,
          liked: true,
          _count: {
            ...news._count,
            likes: news._count.likes + 1,
          },
        });
      }
    } catch (e) {
      alert("Bạn cần đăng nhập để like!");
    }
  };

  const sendComment = async () => {
    if (!commentInput.trim()) return;

    setSending(true);

    try {
      await fetchWithAuth(`/news/${id}/comment`, {
        method: "POST",
        body: JSON.stringify({ content: commentInput }),
      });

      const updated = await fetchWOA(`/news/${id}`);
      setNews(updated);
      setCommentInput("");
    } catch (e) {
      alert("Không gửi được bình luận!");
    }

    setSending(false);
  };

  const share = async () => {
    await navigator.clipboard.writeText(window.location.href);
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
    return (
      <div className="min-h-screen flex justify-center items-center">
        Đang tải...
      </div>
    );

  if (!news)
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600">
        Không tìm thấy bài viết
      </div>
    );

  return (
    <div className="min-h-screen pb-24">
      {/* HEADER */}
      <div className="bg-main-gradient text-white p-4 relative mb-5 pb-16">
        <HeaderNav />
        <div className="absolute left-6 -bottom-16 flex flex-col items-center">
          <div className="bg-white rounded-full p-[20px]">
            <div className="bg-main-gradient text-white rounded-full p-3">
              <FontAwesomeIcon icon={faComment} className="text-[40px] p-1 pt-3" />
            </div>
          </div>
          <span className="absolute left-9 -bottom-2 text-sm font-bold text-gray-800">
            Bài viết
          </span>
        </div>
        <button
          onClick={() => history.back()}
          className="absolute right-6 -bottom-15 text-sm font-bold text-white bg-blue-700 rounded-full w-10 h-10 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-[20px]" />
        </button>
      </div>

      {/* CONTENT */}
      <div className="px-4 mt-20">
        <h1 className="text-xl font-bold text-gray-800">{news.content}</h1>

        <div className="flex items-center gap-2 mt-2 text-gray-500 bg-white p-2 rounded-lg shadow-lg">
          <FontAwesomeIcon icon={faUserCircle} className="text-2xl text-gray-400" />
          <span>{news.author?.fullName || "Ẩn danh"}</span>

          <span className="ml-auto text-sm">
            {new Date(news.createdAt).toLocaleDateString("vi-VN")}
          </span>
        </div>

        <img
          src={news.imageUrl}
          width={600}
          height={400}
          alt=""
          className="w-full rounded-lg mt-3 cursor-pointer shadow-lg"
          onClick={() => setSelectedImage(news.imageUrl)}
        />

        <div className="flex gap-10 mt-4 text-gray-700 bg-white p-4 rounded-lg shadow-md justify-around">
          <div className="flex items-center gap-1">
            <FontAwesomeIcon
              icon={faHeart}
              className={`text-[26px] ${
                news.liked ? "text-red-600" : "text-blue-600"
              } cursor-pointer active:scale-90`}
              onClick={likePost}
            />
            <span>{news._count.likes}</span>
          </div>

          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faComment} className="text-blue-600 text-[26px]" />
            <span>{news._count.comments}</span>
          </div>

          <button className="flex flex-col items-center" onClick={share}>
            <FontAwesomeIcon icon={faLink} className="text-blue-600 text-[30px]" />
            Share
          </button>
        </div>

        {/* COMMENT LIST */}
        <div className="space-y-4 bg-white p-2 rounded-lg shadow-md mt-6">
          <h2 className="mb-2 font-bold text-xl">Bình luận</h2>

          {news.comments.length === 0 && (
            <p className="text-gray-500">Chưa có bình luận nào</p>
          )}

          {news.comments.map((c: any) => (
            <div key={c.id} className="bg-gray-100 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <img
                  src={c.user?.avatarUrl || "/images/default-avatar.svg"}
                  width={35}
                  height={35}
                  className="rounded-full"
                  alt=""
                />
                <b>{c.user?.fullName}</b>
              </div>
              <p className="mt-1 text-sm">{c.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex gap-2 bg-white p-3 rounded-lg shadow-md">
          <input
            type="text"
            placeholder="Nhập bình luận..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            className="flex-1 border px-3 py-2 rounded-lg"
          />

          <button
            onClick={sendComment}
            disabled={sending}
            className="bg-blue-600 text-white px-4 rounded-lg active:scale-95"
          >
            Gửi
          </button>
        </div>
      </div>

      {/* IMAGE MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            className="rounded-lg max-h-[90vh]"
            alt=""
          />
        </div>
      )}
    </div>
  );
}
