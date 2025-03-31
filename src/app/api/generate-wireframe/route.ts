import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    const response = await fetch(
      `https://api.stability.ai/v2beta/stable-image/generate/core`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STABILITY_API_KEY}`,
        },
        body: JSON.stringify({
          prompt,
          output_format: "png",
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json({ imageUrl: data?.image_url || "" });
  } catch (error) {
    console.error("Error generating wireframe:", error);
    return NextResponse.json({ error: "Failed to generate wireframe." }, { status: 500 });
  }
}
