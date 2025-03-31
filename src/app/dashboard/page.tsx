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
    <div className="flex flex-col justify-center items-center px-4 py-8 sm:px-8">
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-xl sm:text-3xl font-bold text-amber-100">
          Welcome, {session?.user?.name}!
        </h1>

        <div className="mt-8 grid gap-4 sm:gap-6">
          <Link
            href="/tools/ui-generator"
            className="p-3 sm:p-4 bg-slate-900 text-amber-100 rounded-lg flex justify-between items-center w-full hover:bg-slate-950 transition text-sm sm:text-base"
          >
            Frontend UI Code Generator
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-amber-100" />
          </Link>

          <Link
            href="/tools/code-debugger"
            className="p-3 sm:p-4 bg-slate-900 text-amber-100 rounded-lg flex justify-between items-center w-full hover:bg-slate-950 transition text-sm sm:text-base"
          >
            AI Code Debugger
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-amber-100" />
          </Link>

          <Link
            href="/tools/layout-generator"
            className="p-3 sm:p-4 bg-slate-900 text-amber-100 rounded-lg flex justify-between items-center w-full hover:bg-slate-950 transition text-sm sm:text-base"
          >
            Wireframe Creator/Layout Generator
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-amber-100" />
          </Link>
        </div>
      </div>
    </div>
  );
}
