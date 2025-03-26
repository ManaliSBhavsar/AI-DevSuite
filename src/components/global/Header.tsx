"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const navItems = [
    { name: "UI Generator", path: "/tools/ui-generator" },
    { name: "Code Debugger", path: "/tools/code-debugger" },
    { name: "Layout Generator", path: "/tools/layout-generator" },
];

export default function Header() {
    const pathname = usePathname();

    return (
        <header className="fixed w-full bg-slate-900 text-white p-5 shadow-md">
            <nav className="container mx-auto flex justify-between items-center py-4 px-6">
                <Link href="/" className="text-2xl font-bold">
                    AI DevSuite 🚀
                </Link>
                <div className="flex gap-4">
                    {navItems.map((item) => (
                        <Button
                            key={item.path}
                            variant={pathname === item.path ? "default" : "outline"}
                            asChild
                        >
                            <Link href={item.path}>{item.name}</Link>
                        </Button>
                    ))}
                </div>
            </nav>
        </header>
    );
}
