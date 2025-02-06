import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_SECRET_KEY;
const genAI = new GoogleGenerativeAI(apiKey ?? "");

export async function POST(request: Request) {
  const body = await request.json();
  const { prompt } = body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    return NextResponse.json({ response: { result } }, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
