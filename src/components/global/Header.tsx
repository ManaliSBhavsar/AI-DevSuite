"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navItems = [
  { name: "UI Code Generator", path: "/tools/ui-generator" },
  { name: "Code Debugger", path: "/tools/code-debugger" },
  { name: "Layout Generator", path: "/tools/layout-generator" },
];

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-slate-950 to-slate-900 text-white shadow-md py-3 sm:py-4 px-4 sm:px-6 z-50">
      <nav className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex gap-2 items-center text-lg sm:text-2xl text-amber-100 hover:text-amber-200 font-semibold">
          <Image src="/logo.png" alt="AI DevSuite Logo" width={40} height={40} className="w-8 h-8 sm:w-10 sm:h-10" />
          AI DevSuite
        </Link>

        {/* Hamburger Menu Button (Mobile) */}
        <button className="sm:hidden text-amber-100" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation (Desktop) */}
        <div className="hidden sm:flex gap-6 items-center">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`relative text-sm sm:text-base text-amber-100 hover:text-amber-200 transition ${pathname === item.path ? "text-amber-100 font-semibold" : ""
                }`}
            >
              {item.name}
              {pathname === item.path && (
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-amber-100"></span>
              )}
            </Link>
          ))}

          {session && (
            <button
              onClick={handleSignOut}
              className="cursor-pointer px-4 py-2 rounded-md text-amber-100 bg-transparent hover:bg-amber-200 hover:text-slate-900 transition"
            >
              Sign Out
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className={`sm:hidden absolute top-12 left-0 w-full bg-slate-900 shadow-lg flex flex-col items-center gap-4 py-4 transition-transform duration-300 ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"
            }`}
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`relative text-lg text-amber-100 hover:text-amber-200 transition ${pathname === item.path ? "font-semibold" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
              {pathname === item.path && (
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-amber-100"></span>
              )}
            </Link>
          ))}

          {session && (
            <button
              onClick={() => {
                handleSignOut();
                setIsOpen(false);
              }}
              className="cursor-pointer px-6 py-2 rounded-md text-amber-100 bg-transparent hover:bg-amber-200 hover:text-slate-900 transition"
            >
              Sign Out
            </button>
          )}
        </div>
      )}
    </header>
  );
}
