"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { FcGoogle } from "react-icons/fc";

export default function SignUpPage() {
  const router = useRouter();
  const { signUp, signInWithGoogle, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validation
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password should be at least 6 characters");
      setIsLoading(false);
      return;
    }

    try {
      await signUp(email, password);
      router.push("/chat");
    } catch (err: any) {
      const errorMessage = err?.message || "Failed to create account";
      if (errorMessage.includes("email-already-in-use")) {
        setError("This email is already registered. Please sign in instead.");
      } else if (errorMessage.includes("invalid-email")) {
        setError("Please enter a valid email address");
      } else {
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setIsLoading(true);
    try {
      await signInWithGoogle();
      router.push("/chat");
    } catch (err: any) {
      setError(err?.message || "Failed to sign in with Google");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-4 relative overflow-hidden selection:bg-[#FF4500] selection:text-white">
      {/* Global Noise Overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-5 mix-blend-overlay"
        style={{
          backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")',
          backgroundRepeat: "repeat",
        }}></div>

      <div className="w-full max-w-md relative z-10">
        <div className="mb-6 flex items-center">
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2">
            <span>←</span> Back to Home
          </Link>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
          <h1 className="text-3xl font-bold text-white mb-2 text-center font-serif">
            VoterPath
          </h1>
          <p className="text-gray-400 text-center mb-8 font-light">
            Create your account to get started
          </p>

          <form onSubmit={handleSignUp} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded text-sm text-center">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#FF9933] focus:ring-1 focus:ring-[#FF9933] text-white placeholder-gray-500 transition-colors"
                placeholder="you@example.com"
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#FF9933] focus:ring-1 focus:ring-[#FF9933] text-white placeholder-gray-500 transition-colors"
                placeholder="Minimum 6 characters"
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#FF9933] focus:ring-1 focus:ring-[#FF9933] text-white placeholder-gray-500 transition-colors"
                placeholder="Re-enter your password"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || loading}
              className="w-full bg-[#FF9933] hover:bg-[#FF7700] disabled:opacity-50 disabled:cursor-not-allowed text-[#050505] font-semibold py-3 px-4 rounded-xl transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:ring-offset-2 focus:ring-offset-[#111]">
              {isLoading || loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-white/10"></div>
            <span className="px-4 text-xs text-gray-500 uppercase tracking-wider">Or continue with</span>
            <div className="flex-1 border-t border-white/10"></div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading || loading}
            className="w-full bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-xl transition duration-300 focus:outline-none focus:ring-2 focus:ring-white/20 flex items-center justify-center gap-3">
            <FcGoogle className="text-xl" />
            Sign in with Google
          </button>

          <p className="text-center text-gray-400 mt-8 text-sm">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="text-[#FF9933] hover:text-[#FF7700] font-medium transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
