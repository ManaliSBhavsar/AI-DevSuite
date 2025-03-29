import OpenAI from "openai";
import { NextRequest } from "next/server";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `Generate a UI wireframe based on the following description: ${prompt}`,
      n: 1,
      size: "1024x1024",
    });

    return Response.json({ imageUrl: response.data[0].url });
  } catch (error) {
    console.error("Error generating wireframe:", error);
    return Response.json({ error: "Failed to generate image" }, { status: 500 });
  }
}
