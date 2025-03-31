"use client";
import { useRouter } from "next/navigation";
export default function NotFoundPage() {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center text-amber-100 p-4 text-center">
            <h1 className="text-2xl sm:text-4xl font-bold">404 - Page Not Found</h1>
            <p className="mt-2 text-sm sm:text-base">The page you are looking for does not exist.</p>
            <button
                onClick={() => router.push("/")}
                className="cursor-pointer mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500 transition"
            >
                Return to Home
            </button>
        </div>
    );
}
