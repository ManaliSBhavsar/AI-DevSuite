import { NextResponse, NextRequest } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: "Optimize and debug JavaScript/React code." },
                 { role: "user", content: code }],
    });

    const optimizedCode = response.choices[0]?.message?.content || "Error optimizing code.";
    return NextResponse.json({ optimizedCode });
  } catch (error) {
    return NextResponse.json({ error: "Failed to optimize code." }, { status: 500 });
  }
}
