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
    setLoading(true);
    setOptimizedCode("");

    try {
      const response = await fetch("/api/debug-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      setOptimizedCode(data.optimizedCode || "No optimized code found.");
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Card className="w-full max-w-2xl shadow-lg rounded-2xl bg-slate-900 border border-amber-100">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center text-amber-100">AI Code Debugger & Optimizer</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <Textarea className="text-amber-100 placeholder:text-amber-100"
            placeholder="Paste your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <Button className="px-8 py-6 text-md mt-8 text-slate-900 bg-yellow-400 hover:bg-yellow-500 cursor-pointer" onClick={debugCode} disabled={loading}>
            {loading ? "Optimizing..." : "Optimize Code"}
          </Button>

          {optimizedCode && (<ScrollArea className="mt-4 max-h-64 p-2 bg-gray-800 text-white rounded-md">
            {loading ? <Skeleton className="h-16 w-full" /> : <pre className="text-sm">{optimizedCode}</pre>}
          </ScrollArea>)}
        </CardContent>
      </Card>
    </div>
  );
}
