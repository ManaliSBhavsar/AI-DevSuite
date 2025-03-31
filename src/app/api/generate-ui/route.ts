import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!API_KEY) {
      return NextResponse.json({ error: "API key is missing." }, { status: 500 });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Generate a React component using Tailwind CSS. The component should be: ${prompt}. Return only the code, without any explanation.`,
                },
              ],
            },
          ],
        }),
      }
    );
    
    const data = await response.json();

    if (!data || !data.candidates || data.candidates.length === 0) {
      return NextResponse.json({ error: "Failed to get a response from Gemini API." }, { status: 500 });
    }

    return NextResponse.json({ code: data.candidates[0].content });
  } catch (error) {
    console.error("Error generating UI code:", error);
    return NextResponse.json({ error: "Failed to generate UI code.", details: (error as Error).message }, { status: 500 });
  }
}
