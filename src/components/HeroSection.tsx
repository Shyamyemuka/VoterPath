"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export const HeroSection = () => {
  const { t } = useLanguage();
  const [time, setTime] = useState("11:11 PM");
  const [heroOffset, setHeroOffset] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      setTime(`${hours}:${minutes} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setHeroOffset(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20 bg-[#050505]">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-60 mix-blend-screen">
          <img
            src="https://framerusercontent.com/images/9zvwRJAavKKacVyhFCwHyXW1U.png?width=1536&height=1024"
            alt="Atmosphere"
            className="w-full h-full object-cover object-center opacity-80"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505] z-10"></div>
      </div>

      {/* Floating Surrealist Elements */}
      <div className="absolute -left-[10%] top-[-10%] md:left-[-5%] md:top-[-15%] w-[50vw] md:w-[40vw] max-w-[800px] z-10 pointer-events-none mix-blend-hard-light opacity-80 animate-float-left">
        <img
          src="https://framerusercontent.com/images/KNhiA5A2ykNYqNkj04Hk6BVg5A.png?width=1540&height=1320"
          alt="Hand Reaching"
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="absolute -right-[10%] bottom-[-10%] md:right-[-5%] md:bottom-[-5%] w-[45vw] md:w-[35vw] max-w-[700px] z-10 pointer-events-none mix-blend-hard-light opacity-80 animate-float-right">
        <img
          src="https://framerusercontent.com/images/X89VFCABCEjjZ4oLGa3PjbOmsA.png?width=1542&height=1002"
          alt="Hand Receiving"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-6 relative z-20 text-center flex flex-col items-center justify-center h-full">
        <div
          className="max-w-4xl mx-auto"
          style={{
            transform: `translateY(${heroOffset * 0.4}px)`,
            opacity: Math.max(0, 1 - heroOffset / 600),
          }}>
          <div className="reveal">
            <h1
              className="text-5xl md:text-7xl font-medium leading-[1.1] tracking-tight mb-6 text-[#ffe0e0] mix-blend-overlay font-serif"
              style={{ textShadow: "0 0 12px rgba(255,255,255,0.71)" }}>
              VoterPath. <br />
              <span className="italic font-light text-[#ffe0e0]">
                {t.hero.subtitle}
              </span>
            </h1>
          </div>

          <div className="reveal" style={{ transitionDelay: "200ms" }}>
            <p
              className="text-base md:text-lg text-[#ffe0e0]/90 max-w-lg mx-auto mb-16 font-light tracking-wide leading-relaxed mix-blend-overlay"
              style={{ textShadow: "0 0 12px rgba(255,255,255,0.71)" }}>
              {t.hero.description}
            </p>
          </div>

          <div
            className="reveal flex flex-col items-center gap-6"
            style={{ transitionDelay: "400ms" }}>
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-[#FF4500]/20 blur-xl rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="relative border border-white/20 bg-white/5 backdrop-blur-sm px-6 py-2 rounded-full flex items-center gap-3 text-xs md:text-sm text-white/80 uppercase tracking-widest hover:bg-white/10 transition-colors duration-300">
                <span>{t.hero.enterVoid}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[10px] md:text-xs text-white/40 uppercase tracking-widest mt-8 font-mono">
              <span>{time}</span>
              <span className="w-px h-3 bg-white/20"></span>
              <span>{t.hero.location}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
