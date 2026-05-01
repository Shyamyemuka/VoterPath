"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/lib/translations";

export const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const languages: { code: Language; label: string }[] = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिंदी" },
    { code: "te", label: "తెలుగు" },
    { code: "ta", label: "தமிழ்" },
    { code: "bn", label: "বাংলা" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-8 ${
        isScrolled
          ? "py-4 bg-[#050505]/80 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="text-2xl font-bold tracking-tighter font-serif">
          {t.header.title}
        </a>

        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#expertise"
            className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
            {t.timeline.title}
          </a>
          <a
            href="#works"
            className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
            {t.booth.title}
          </a>
          <a
            href="#perspectives"
            className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
            {t.cards.factsTitle}
          </a>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <button className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
              {languages.find((l) => l.code === language)?.label}
            </button>
            <div className="absolute right-0 mt-0 w-32 bg-[#111111] border border-white/10 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                    language === lang.code
                      ? "bg-[#FF4500] text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}>
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium bg-white text-black hover:scale-105 hover:bg-gray-100 transition-all duration-300">
            {t.hero.cta}
          </a>
        </div>
      </div>
    </nav>
  );
};
