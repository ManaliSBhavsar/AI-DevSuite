"use client";
import { useState } from "react";
import toolStore from "@/app/store/toolStore";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function LayoutGenerator() {
  const { description, setDescription } = toolStore() as {
    description: string;
    setDescription: (value: string) => void;
  };
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateLayout = async () => {
    if (!description.trim()) {
      setError("⚠️ Please enter a valid layout description.");
      return;
    }

    setLoading(true);
    setImageUrl("");
    setError("");

    try {
      const response = await fetch("/api/generate-wireframe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: description }),
      });

      const data = await response.json();

      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
      } else {
        setError("⚠️ No wireframe generated. Try a different prompt.");
      }
    } catch (err) {
      console.error("Error generating wireframe:", err);
      setError("❌ Failed to generate wireframe. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Card className="w-full max-w-2xl shadow-lg rounded-2xl bg-slate-900 border border-amber-100">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center text-amber-100">
            AI-Powered UI Layout Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <Textarea
            className="text-amber-100 placeholder:text-amber-100"
            placeholder="Describe the UI layout (e.g., 'A dashboard with a sidebar and a navbar')"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}

          <Button
            className="px-8 py-6 text-md mt-4 text-slate-900 bg-yellow-400 hover:bg-yellow-500 cursor-pointer"
            onClick={generateLayout}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Wireframe"}
          </Button>

          {imageUrl && <Separator className="my-4" />}

          {loading && <Skeleton className="h-64 w-full" />}
          
          {imageUrl && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-center">Generated Wireframe:</h2>
              <Card className="mt-2 p-2 shadow-md">
                <img src={imageUrl} alt="Generated UI Wireframe" className="w-full rounded-md" />
              </Card>
              <Button
                className="mt-2 w-full"
                onClick={() => window.open(imageUrl, "_blank")}
              >
                Download Wireframe
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
