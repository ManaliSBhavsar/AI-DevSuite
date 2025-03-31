"use client";
import { useState } from "react";
import toolStore from "@/app/store/toolStore";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

export default function UIGenerator() {
  const { prompt, setPrompt } = toolStore() as {
    prompt: string;
    setPrompt: (value: string) => void;
  };

  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);

  const generateUI = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setGeneratedCode("");

    try {
      const response = await fetch("/api/generate-ui", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (data.code) {
        setGeneratedCode(data.code?.parts?.[0]?.text || "Error generating code");
      } else {
        setGeneratedCode("No code generated. Try a different prompt.");
      }
    } catch (error) {
      console.error("Error:", error);
      setGeneratedCode("Failed to generate code. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-8">
      <Card className="w-full max-w-2xl shadow-lg rounded-2xl bg-slate-900 border border-amber-100">
        <CardHeader>
          <CardTitle className="text-md sm:text-xl font-bold text-center text-amber-100">
            Frontend UI Code Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
        <Textarea
            className="text-amber-100 placeholder:text-sm placeholder:text-amber-100 min-h-24 max-h-24 overflow-y-auto custom-scrollbar"
            placeholder="Describe your UI (example: 'A login form with email & password fields')"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button
            className="px-6 py-4 text-sm sm:text-md mt-8 text-slate-900 bg-yellow-400 hover:bg-yellow-500 cursor-pointer"
            onClick={generateUI}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Code"}
          </Button>

          {generatedCode &&(<ScrollArea className="text-left mt-4 h-32 max-h-64 p-2 bg-gray-800 text-white rounded-md overflow-auto">
            {loading ? <Skeleton className="h-12 w-full" /> : <pre className="text-xs sm:text-sm whitespace-pre-wrap">{generatedCode.replace(/```jsx|```/g, "").trim()}</pre>}
          </ScrollArea>)}
        </CardContent>
      </Card>
    </div>
  );
}
