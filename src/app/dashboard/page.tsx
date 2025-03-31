"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { useEffect } from "react";
import Image from "next/image";

const items = [
  { name: "Frontend UI Code Generator", path: "/tools/ui-generator" },
  { name: "AI Code Debugger", path: "/tools/code-debugger" },
  { name: "Wireframe Creator/Layout Generator", path: "/tools/layout-generator" },
];

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center">
        <Loader2 className="w-6 h-6 animate-spin text-amber-100" />
        <p className="ml-2 text-amber-100">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row justify-center items-end gap-2 sm:gap-4 px-4 py-8 sm:px-8">
      {/* Welcome Section */}
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-xl sm:text-3xl font-bold text-amber-100 drop-shadow-lg">
          Welcome, {session?.user?.name}!
        </h1>
        <p className="text-sm sm:text-lg text-amber-200 mt-2">
            Explore Below AI-Powered Development Tools.
        </p>

        {/* Tool Links */}
        <div className="mt-8 grid gap-4 sm:gap-6">
          {items.map((tool) => (
            <Link
              key={tool.path}
              href={tool.path}
              className="p-4 bg-slate-900 text-amber-100 rounded-lg flex justify-between items-center w-full 
                hover:bg-slate-950 transition text-sm sm:text-base border border-slate-800 shadow-md"
            >
              {tool.name}
              <ArrowRight className="w-5 h-5 text-amber-100" />
            </Link>
          ))}
        </div>
      </div>

      {/* Dashboard Image */}
      <div>
        <Image
          src="/dashboard.png"
          alt="Dashboard Overview"
          width={300}
          height={150}
          className="rounded-lg"
        />
      </div>
    </div>
  );
}
