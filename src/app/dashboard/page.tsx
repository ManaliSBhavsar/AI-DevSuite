"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p className="text-center text-amber-100">Loading...</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center p-8">
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-3xl font-bold text-amber-100">Welcome, {session?.user?.name}!</h1>

        <div className="mt-12 grid gap-6">
          <Link
            href="/tools/code-generator"
            className="p-4 bg-slate-900 text-amber-100 rounded-lg flex justify-between items-center w-full hover:bg-slate-950 transition"
          >
            Frontend UI Code Generator
            <ArrowRight className="w-5 h-5 text-amber-100" />
          </Link>

          <Link
            href="/tools/debug-optimizer"
            className="p-4 bg-slate-900 text-amber-100 rounded-lg flex justify-between items-center w-full hover:bg-slate-950 transition"
          >
            AI Code Debugger
            <ArrowRight className="w-5 h-5 text-amber-100" />
          </Link>

          <Link
            href="/tools/layout-generator"
            className="p-4 bg-slate-900 text-amber-100 rounded-lg flex justify-between items-center w-full hover:bg-slate-950 transition"
          >
            Wireframe Creator/Layout Generator
            <ArrowRight className="w-5 h-5 text-amber-100" />
          </Link>
        </div>
      </div>
    </div>
  );
}
