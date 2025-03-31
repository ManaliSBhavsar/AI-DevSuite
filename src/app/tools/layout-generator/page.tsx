"use client";
import { useState } from "react";
import toolStore from "@/app/store/toolStore";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function LayoutGenerator() {
  const { description, setDescription } = toolStore() as {
    description: string;
    setDescription: (value: string) => void;
  };
  const [imageBase64, setImageBase64] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateLayout = async () => {
    if (!description.trim()) {
      setError("⚠️ Please enter a valid layout description.");
      return;
    }

    setLoading(true);
    setImageBase64("");
    setError("");

    try {
      const response = await fetch("/api/generate-wireframe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: description }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.imageBase64) {
        setImageBase64(`data:image/png;base64,${data.imageBase64}`);
      } else {
        setError("⚠️ No wireframe generated. Try a different prompt.");
      }
    } catch (err) {
      console.error("Error generating wireframe:", err);
      setError("❌ Failed to generate wireframe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const downloadWireframe = () => {
    if (!imageBase64) return;

    const link = document.createElement("a");
    link.href = imageBase64;
    link.download = "wireframe.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-8">
      <Card className="w-full max-w-2xl shadow-lg rounded-2xl bg-slate-900 border border-amber-100">
        <CardHeader>
          <CardTitle className="text-md sm:text-xl font-bold text-center text-amber-100">
            AI-Powered UI Layout Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <Textarea
            className="text-amber-100 placeholder:text-sm placeholder:text-amber-100 min-h-24 max-h-24 overflow-y-auto custom-scrollbar"
            placeholder="Describe the UI layout (e.g., 'A dashboard with a sidebar and a navbar')"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}

          <Button
            className="px-6 py-4 text-sm sm:text-md mt-8 text-slate-900 bg-yellow-400 hover:bg-yellow-500 cursor-pointer"
            onClick={generateLayout}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Wireframe"}
          </Button>

          {imageBase64 && <Separator className="my-4" />}

          {loading && <Skeleton className="h-64 w-full" />}

          {imageBase64 && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-center text-amber-100">Generated Wireframe:</h2>
              <Card className="mt-2 p-2 shadow-md max-h-32 overflow-y-auto custom-scrollbar">
                <img src={imageBase64} alt="Generated UI Wireframe" className="w-full rounded-md" />
              </Card>
              <Button className="px-6 py-4 text-sm sm:text-md mt-8 text-slate-900 bg-yellow-400 hover:bg-yellow-500 cursor-pointer" onClick={downloadWireframe}>
                Download Wireframe
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
