"use client";
import { useRouter } from "next/navigation";
export default function NotFoundPage() {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center text-amber-100">
            <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
            <p className="mt-2">The page you are looking for does not exist.</p>
            <button
                onClick={() => router.push("/")}
                className="cursor-pointer mt-6 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500 transition"
            >
                Return to Home
            </button>
        </div>
    );
}
