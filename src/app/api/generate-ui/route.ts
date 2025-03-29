import { NextResponse, NextRequest } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

console.log("OpenAI API Key:", process.env.OPENAI_API_KEY ? "Loaded" : "Not Found");

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: "Generate a React + Tailwind CSS component." },
                 { role: "user", content: prompt }],
    });

    const generatedCode = response.choices[0]?.message?.content || "Error generating code.";
    return NextResponse.json({ code: generatedCode });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return NextResponse.json({ error: "Failed to generate UI code." }, { status: 500 });
  }
}
