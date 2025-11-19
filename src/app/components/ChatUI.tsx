"use client";

import { useState, useRef, useEffect } from "react";

export default function ChatUI() {
  const [messages, setMessages] = useState<
    { user: string; bot: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        user: "",
        bot: "Xin chào! 👋 Tôi là ChatBot hỗ trợ đoàn trường Bình Long. Bạn cần tôi giúp gì?",
      },
    ]);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
  if (!input.trim() || loading) return;

  const userMessage = input; 
  setInput("");

  const newMessages = [...messages, { user: userMessage, bot: "" }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage, 
          history: messages,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Lỗi server");

      const reply = data.reply || "Bot không có phản hồi.";

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].bot = reply;
        return updated;
      });

    } catch (err) {
      console.error(err);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].bot =
          "⚠️ Đã xảy ra lỗi khi phản hồi.";
        return updated;
      });
    }

    setLoading(false);
  };


  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col h-[60vh] rounded-xl bg-white shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-3 bg-main-gradient text-white font-semibold text-lg">
        Chatbot Hỗ Trợ
      </div>

      {/* Chat content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, index) => (
          <div key={index} className="space-y-2">

            {/* User message */}
            {msg.user && (
              <div className="flex justify-end">
                <div className="bg-blue-500 text-white px-4 py-2 rounded-xl max-w-[75%] shadow">
                  {msg.user}
                </div>
              </div>
            )}

            {/* Bot message */}
            {msg.bot && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-black px-4 py-2 rounded-xl max-w-[75%] shadow">
                  {msg.bot}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Loading typing indicator */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-300 px-4 py-2 rounded-xl">
              <span className="animate-pulse">Đang trả lời...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="p-2 flex items-center gap-2 bg-white">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Nhập câu hỏi..."
          className="flex-6 px-2 py-2 border rounded-full outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-full active:scale-95 disabled:opacity-50"
        >
          Gửi
        </button>
      </div>
    </div>
  );
}
