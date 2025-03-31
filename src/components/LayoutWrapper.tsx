"use client";
import { usePathname } from "next/navigation";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideHeaderRoutes = ["/login", "/404", "/not-found"];
  const showHeader = !hideHeaderRoutes.some((route) => pathname.startsWith(route));

  return (
    <>
      {showHeader && <Header />}
      <main className="flex-grow container mx-auto p-6 flex flex-col justify-center overflow-hidden">
        {children}
      </main>
      <Footer />
    </>
  );
}
