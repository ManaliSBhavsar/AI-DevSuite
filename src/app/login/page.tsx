"use client";
import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <h1 className="text-3xl font-bold text-amber-100 mb-12">Sign In to AI DevSuite</h1>
      <button
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 px-6 py-3 rounded-lg w-60 cursor-pointer font-semibold transition"
      >
        Sign in with Google
      </button>

      <button
        onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
        className="bg-cyan-400 hover:bg-cyan-500 text-slate-900 px-6 py-3 rounded-lg w-60 cursor-pointer font-semibold transition"
      >
        Sign in with GitHub
      </button>
    </div>
  );
}
