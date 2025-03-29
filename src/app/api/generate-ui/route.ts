import { NextResponse, NextRequest } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "system", content: "Generate a React + Tailwind component." },
                 { role: "user", content: prompt }],
    });

    const generatedCode = response.choices[0]?.message?.content || "Error generating code.";
    return NextResponse.json({ code: generatedCode });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate UI code." }, { status: 500 });
  }
}
