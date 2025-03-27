"use client";
// import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Dashboard() {
  // const { data: session } = useSession();

  // if (!session) return <p>Loading...</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto w-full">
      <h1 className="text-3xl font-bold text-center">Welcome!</h1>

      <div className="mt-12 grid gap-6">
        <Link href="/tools/code-generator" className="p-4 bg-gray-200 rounded-lg flex justify-between items-center w-full">Frontend UI Code Generator<ArrowRight className="w-5 h-5 text-gray-700" /></Link>
        <Link href="/tools/debug-optimizer" className="p-4 bg-gray-200 rounded-lg flex justify-between items-center w-full">AI Code Debugger<ArrowRight className="w-5 h-5 text-gray-700" /></Link>
        <Link href="/tools/layout-generator" className="p-4 bg-gray-200 rounded-lg flex justify-between items-center w-full">Wireframe Creator/Layout Generator<ArrowRight className="w-5 h-5 text-gray-700" /></Link>
      </div>
    </div>
  );
}
