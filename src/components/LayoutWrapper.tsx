"use client";
import { usePathname } from "next/navigation";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide Header for Specific Routes + Automatically Detect 404 Pages
  const hideHeaderRoutes = ["/login"];
  const isNotFoundPage = pathname.includes("not-found") || pathname === "/404";

  const showHeader = !hideHeaderRoutes.some((route) => pathname.startsWith(route)) && !isNotFoundPage;

  return (
    <>
      {showHeader && <Header />}
      <main className="flex-grow container mt-[var(--header-height)] mx-auto p-6 flex flex-col justify-center overflow-hidden">
        {children}
      </main>
      <Footer />
    </>
  );
}
