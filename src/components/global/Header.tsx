"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const navItems = [
  { name: "UI Code Generator", path: "/tools/ui-generator" },
  { name: "Code Debugger", path: "/tools/code-debugger" },
  { name: "Layout Generator", path: "/tools/layout-generator" },
];

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-slate-950 to-slate-900 text-white shadow-md py-4 px-6 z-50">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl text-amber-100 hover:text-amber-200 font-semibold">AI DevSuite 🚀</Link>

        <div className="flex gap-6 items-center">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path}
              className={`relative text-amber-100 hover:text-amber-200 transition ${
                pathname === item.path ? "text-amber-100 font-semibold" : ""
              }`}
            >
              {item.name}
              {pathname === item.path && (
                <span className="absolute left-0 bottom-0 h-[2px] w-full bg-amber-100"></span>
              )}
            </Link>
          ))}
        
        {session && (
          <button
          onClick={handleSignOut}
            className="cursor-pointer px-4 py-2 rounded-lg text-amber-100 bg-transparent hover:bg-amber-200 hover:text-slate-900 transition"
          >
            Sign Out
          </button>
        )}
        </div>
      </nav>
    </header>
  );
}
