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

    console.log("Using API Key:", API_KEY); // Log API key (REMOVE THIS IN PRODUCTION)

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }], // Ensure the structure matches Google's API
            },
          ],
        }),
      }
    );
      

    const data = await response.json();
    console.log("API Response:", data); // Log full response

    if (!data || !data.candidates || data.candidates.length === 0) {
      return NextResponse.json({ error: "Failed to get a response from Gemini API.", details: data }, { status: 500 });
    }

    return NextResponse.json({ optimizedCode: data.candidates[0].content });
  } catch (error) {
    console.error("Error optimizing code:", error);
    return NextResponse.json({ 
      error: "Failed to optimize code.", 
      details: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 });
  }
}
