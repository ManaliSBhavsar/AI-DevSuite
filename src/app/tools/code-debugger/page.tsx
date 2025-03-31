"use client";
import { useState } from "react";
import toolStore from "@/app/store/toolStore";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

export default function CodeDebugger() {
  const { code, setCode } = toolStore() as {
    code: string;
    setCode: (value: string) => void;
  };
  const [optimizedCode, setOptimizedCode] = useState("");
  const [loading, setLoading] = useState(false);

  const debugCode = async () => {
    if (!code.trim()) return;

    setLoading(true);
    setOptimizedCode("");

    try {
      const response = await fetch("/api/debug-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }), // ✅ Fixed request body
      });

      const data = await response.json();

      if (data.optimizedCode) {
        setOptimizedCode(data.optimizedCode); // ✅ Fixed response handling
      } else {
        setOptimizedCode("⚠️ No optimized code generated. Try modifying your input.");
      }
    } catch (error) {
      console.error("Error:", error);
      setOptimizedCode("❌ Failed to optimize code. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-8">
      <Card className="w-full max-w-2xl shadow-lg rounded-2xl bg-slate-900 border border-amber-100">
        <CardHeader>
          <CardTitle className="text-md sm:text-xl font-bold text-center text-amber-100">
            AI Code Debugger & Optimizer
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <Textarea
            className="text-amber-100 placeholder:text-sm placeholder:text-amber-100 min-h-24 max-h-24 overflow-y-auto custom-scrollbar"
            placeholder="Paste your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <Button
            className="px-6 py-4 text-sm sm:text-md mt-8 text-slate-900 bg-yellow-400 hover:bg-yellow-500 cursor-pointer"
            onClick={debugCode}
            disabled={loading}
          >
            {loading ? "Optimizing..." : "Optimize Code"}
          </Button>

          {optimizedCode && (
            <ScrollArea className="text-left mt-4 h-32 max-h-64 p-2 bg-gray-800 text-white rounded-md overflow-auto">
              {loading ? <Skeleton className="h-16 w-full" /> : <pre className="text-xs sm:text-sm whitespace-pre-wrap">{optimizedCode.replace(/```jsx|```/g, "").trim()}</pre>}
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
