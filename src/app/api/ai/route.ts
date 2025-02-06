import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_SECRET_KEY;
const genAI = new GoogleGenerativeAI(apiKey ?? "");

const instructions = "Always start your answers by Yo Yo";

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  generationConfig: {
    maxOutputTokens: 100,
  },
  systemInstruction: instructions,
});

export async function POST(request: Request) {
  const body = await request.json();
  const { prompt } = body;

  try {
    const data = await model.generateContent(prompt);
    const candidates = data.response.candidates ?? [];
    const result = candidates[0].content.parts[0].text;

    return NextResponse.json({ response: { result } }, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
