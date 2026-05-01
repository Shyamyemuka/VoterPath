"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const router = useRouter();
  const { t } = useLanguage();

  const handleStartChat = () => {
    router.push("/chat");
  };

  return (
    <main className="min-h-screen bg-[#050505] selection:bg-[#FF4500] selection:text-white">
      {/* Global Noise Overlay */}
      <div className="noise-overlay"></div>

      {/* Landing Page */}
      <div className="min-h-screen bg-[#050505] relative overflow-hidden flex items-center justify-center">
        {/* Floating background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF4500]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#138808]/5 rounded-full blur-3xl"></div>

        {/* Animated floating hands */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Left floating hand */}
          <div className="absolute top-32 left-0 opacity-10 animate-float-left">
            <svg
              className="w-64 h-64"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M50 50 Q 60 40 65 20 M50 50 Q 70 45 85 35 M50 50 Q 75 50 90 60 M50 50 Q 70 60 85 80 M50 50 Q 60 65 65 85"
                stroke="currentColor"
                strokeWidth="2"
                className="text-[#FF9933]"
              />
            </svg>
          </div>

          {/* Right floating hand */}
          <div className="absolute bottom-32 right-0 opacity-10 animate-float-right">
            <svg
              className="w-64 h-64"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M50 50 Q 40 40 35 20 M50 50 Q 30 45 15 35 M50 50 Q 25 50 10 60 M50 50 Q 30 60 15 80 M50 50 Q 40 65 35 85"
                stroke="currentColor"
                strokeWidth="2"
                className="text-[#138808]"
              />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          {/* Logo/Title */}
          <div className="mb-8 animate-reveal">
            <h1 className="text-7xl md:text-8xl font-bold font-serif mb-4">
              <span className="bg-gradient-to-r from-[#FF9933] via-white to-[#138808] bg-clip-text text-transparent">
                VoterPath
              </span>
            </h1>
            <p className="text-2xl md:text-3xl font-serif text-gray-300 italic mb-4">
              Your AI Election Guide
            </p>
          </div>

          {/* Subtitle */}
          <div
            className="mb-12 space-y-4 animate-reveal"
            style={{ animationDelay: "0.1s" }}>
            <p className="text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
              {t.hero?.subtitle ||
                "Understand India&apos;s democratic process with the power of AI. Ask anything about voter registration, polling booths, EVMs, and your voting rights."}
            </p>

            <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
              <span>🇮🇳</span>
              <span>Powered by Google Gemini</span>
              <span>🤖</span>
            </div>
          </div>

          {/* Main CTA Button */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-reveal"
            style={{ animationDelay: "0.2s" }}>
            <button
              onClick={handleStartChat}
              className="group relative px-8 py-4 bg-[#138808] hover:bg-[#0f6b06] text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg">
              <span>💬</span>
              <span>{t.hero?.cta || "Talk to us"}</span>
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>

            <button
              onClick={() => {
                const timelineElement =
                  document.getElementById("timeline-section");
                if (timelineElement) {
                  timelineElement.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="px-8 py-4 border-2 border-gray-600 hover:border-[#FF9933] text-gray-300 hover:text-[#FF9933] font-semibold rounded-full transition-all duration-300">
              {t.timeline?.title || "Learn More"}
            </button>
          </div>

          {/* Stats/Features */}
          <div
            className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-16 animate-reveal"
            style={{ animationDelay: "0.3s" }}>
            <div className="p-4">
              <div className="text-3xl font-bold text-[#FF9933] mb-2">7</div>
              <p className="text-gray-400 text-sm">
                {t.common?.steps || "Election Steps"}
              </p>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-[#138808] mb-2">5</div>
              <p className="text-gray-400 text-sm">
                {t.common?.languages || "Languages"}
              </p>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-[#FF4500] mb-2">∞</div>
              <p className="text-gray-400 text-sm">
                {t.common?.questions || "Your Questions"}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="absolute bottom-8 w-full text-center">
          <p className="text-gray-500 text-sm">
            ✨{" "}
            {t.common?.democracy ||
              "Empowering democracy, one voter at a time."}{" "}
            ✨
          </p>
        </div>
      </div>

      {/* Timeline Section (visible on scroll) */}
      <div id="timeline-section" className="relative z-10 bg-[#050505] py-20">
        <div className="container mx-auto px-6 text-center py-12">
          <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-[#FF9933] to-[#138808] bg-clip-text mb-8">
            Learn About Elections
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Click &quot;Talk to us&quot; above to learn more about the Indian
            election process with our AI assistant!
          </p>
          <button
            onClick={handleStartChat}
            className="px-8 py-3 bg-[#FF9933] hover:bg-[#FF7700] text-[#050505] font-semibold rounded-full transition-all duration-300 transform hover:scale-105">
            {t.hero?.cta || "Talk to us"}
          </button>
        </div>
      </div>
    </main>
  );
}
