"use client";
import { usePathname } from "next/navigation";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import Dots from "./global/Dots";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Show Header only on specific routes
  const showHeaderRoutes = [
    "/dashboard",
    "/tools/code-debugger",
    "/tools/ui-generator",
    "/tools/layout-generator",
  ];

  const showHeader = showHeaderRoutes.includes(pathname);

  return (
    <>
      {showHeader && <Header />}
      <Dots />
      <main className="flex-grow container mt-[var(--header-height)] mx-auto p-6 flex flex-col justify-center overflow-hidden">
        {children}
      </main>
      <Footer />
    </>
  );
}
