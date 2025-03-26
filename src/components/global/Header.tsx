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
        <header className="fixed top-0 left-0 w-full bg-slate-900 text-white shadow-md py-4 px-6 z-50">
            <nav className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-2xl font-semibold tracking-wide hover:text-blue-400 transition">
                    AI DevSuite 🚀
                </Link>

                {/* Navigation */}
                <div className="flex gap-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`relative text-gray-300 hover:text-white transition ${
                                pathname === item.path ? "text-white font-semibold" : ""
                            }`}
                        >
                            {item.name}
                            {pathname === item.path && (
                                <span className="absolute left-0 bottom-0 h-[2px] w-full bg-blue-500"></span>
                            )}
                        </Link>
                    ))}
                </div>
            </nav>
        </header>
    );
}
