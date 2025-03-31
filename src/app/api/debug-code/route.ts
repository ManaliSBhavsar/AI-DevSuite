import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();
    if (!code) {
      return NextResponse.json({ error: "Code input is required." }, { status: 400 });
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
                  text: `Optimize the following React or JavaScript code and return only the code:\n\n${code}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!data?.candidates || data.candidates.length === 0) {
      return NextResponse.json({ error: "Failed to get a response from Gemini API.", details: data }, { status: 500 });
    }

    // Extract optimized code
    const optimizedCode = data.candidates[0]?.content?.parts?.[0]?.text?.trim();
    return NextResponse.json({ optimizedCode: optimizedCode || "No optimized code returned." });
  } catch (error) {
    console.error("Error optimizing code:", error);
    return NextResponse.json(
      { error: "Failed to optimize code.", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
