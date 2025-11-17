import { NextResponse } from "next/server";

async function loadRemoteText(url?: string) {
  if (!url) return "";
  try {
    const res = await fetch(url, { cache: "no-store" });
    return await res.text();
  } catch (e) {
    console.warn("Cannot load:", url);
    return "";
  }
}

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    const API_KEY = process.env.GEMINI_API_KEY;
    const KNOWLEDGE_URL = process.env.KNOWLEDGE_URL;
    const INSTRUCTION_URL = process.env.INSTRUCTION_URL;

    if (!API_KEY) {
      return NextResponse.json(
        { error: "Missing GEMINI_API_KEY" },
        { status: 500 }
      );
    }

    const KNOWLEDGE = await loadRemoteText(KNOWLEDGE_URL);
    const INSTRUCTIONS = await loadRemoteText(INSTRUCTION_URL);

    const prompt = `
${INSTRUCTIONS || "You are a helpful assistant."}

==========================
### KNOWLEDGE BASE:
${KNOWLEDGE || "(Không có dữ liệu)"}
==========================

### HISTORY:
${history.map((h: any) => `User: ${h.user}\nBot: ${h.bot}`).join("\n")}

### USER ASK:
${message}
`;

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await geminiResponse.json();

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Không có phản hồi hợp lệ.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("❌ Chat API Error:", err);
    return NextResponse.json(
      { error: "Server crashed" },
      { status: 500 }
    );
  }
}
