import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import AuthProvider from "@/components/providers/SessionProvider";
import LayoutWrapper from "@/components/LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI DevSuite",
  description: "AI DevSuite offers AI tools for UI code generation, debugging, and layout designing. Boost your frontend development workflow effortlessly!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-indigo-950 flex flex-col min-h-screen`}
      >
        <AuthProvider> 
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </AuthProvider>  
      </body>
    </html>
  );
}
