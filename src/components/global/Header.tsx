"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { name: "UI Generator", path: "/tools/ui-generator" },
    { name: "Code Debugger", path: "/tools/code-debugger" },
    { name: "Layout Generator", path: "/tools/layout-generator" },
];

export default function Header() {
    const pathname = usePathname();

    return (
        <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-slate-950 to-slate-900 text-amber-100 shadow-md py-4 px-6 z-50">
            <nav className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-2xl font-semibold hover:text-amber-200">
                    AI DevSuite 🚀
                </Link>

                {/* Navigation */}
                <div className="flex items-center gap-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`relative text-amber-100 hover:text-amber-200 transition ${pathname === item.path ? "text-amber-100 font-semibold" : ""
                                }`}
                        >
                            {item.name}
                            {pathname === item.path && (
                                <span className="absolute left-0 bottom-0 h-[2px] w-full bg-amber-100"></span>
                            )}
                        </Link>
                    ))}

                    <button className="cursor-pointer px-4 py-2 text-amber-100 rounded-lg transition duration-300 hover:text-slate-900 hover:bg-amber-200 font-semibold">
                        Sign Out
                    </button>
                </div>
            </nav>
        </header>
    );
}
