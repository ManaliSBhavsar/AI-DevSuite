"use client";
import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center space-y-6 px-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-amber-100 mb-8 text-center">
        Sign In to AI DevSuite
      </h1>

      <button
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        className="mb-4 cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-slate-900 px-4 sm:px-6 py-2 sm:py-3 rounded-lg w-52 sm:w-60 text-sm sm:text-base font-semibold transition"
      >
        Sign in with Google
      </button>

      <button
        onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
        className="cursor-pointer bg-cyan-400 hover:bg-cyan-500 text-slate-900 px-4 sm:px-6 py-2 sm:py-3 rounded-lg w-52 sm:w-60 text-sm sm:text-base font-semibold transition"
      >
        Sign in with GitHub
      </button>
    </div>
  );
}
