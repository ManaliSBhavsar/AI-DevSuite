import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import FormData from "form-data";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("output_format", "webp"); // Ensure proper format
    formData.append("style_preset", "line-art"); // Valid preset

    const apiResponse = await axios.post(
      "https://api.stability.ai/v2beta/stable-image/generate/core",
      formData,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STABILITY_API_KEY}`,
          Accept: "image/*",
          ...formData.getHeaders(),
        },
        responseType: "arraybuffer",
      }
    );

    if (apiResponse.status === 200) {
      const base64Image = Buffer.from(apiResponse.data).toString("base64");
      return NextResponse.json({ imageBase64: base64Image });
    } else {
      return NextResponse.json({ error: "Failed to generate wireframe." }, { status: 500 });
    }
  } catch (error) {
    console.error("Error generating wireframe:", error);
    return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
  }
}
