import { ChatMessage } from "@/modules/chat/interface";
import { Content, GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_SECRET_KEY;
const genAI = new GoogleGenerativeAI(apiKey ?? "");

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

export async function POST(request: Request) {
  const body = (await request.json()) as {
    chatHistory: ChatMessage[];
    systemInstruction: string;
  };
  const { chatHistory, systemInstruction } = body;

  const contents: Content[] = chatHistory.map((chat) => ({
    role: "user",
    parts: [{ text: chat.text }],
  }));

  try {
    const data = await model.generateContent({ contents, systemInstruction });
    const candidates = data.response.candidates ?? [];
    const result = candidates[0].content.parts[0].text;

    return NextResponse.json({ response: { result } }, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
