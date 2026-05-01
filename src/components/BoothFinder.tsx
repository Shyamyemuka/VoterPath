"use client";

import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export const BoothFinder = () => {
  const { t } = useLanguage();
  const [location, setLocation] = useState("");

  const handleGoogleMapsSearch = () => {
    if (location.trim()) {
      const searchQuery = encodeURIComponent(`polling booth near ${location}`);
      window.open(
        `https://www.google.com/maps/search/${searchQuery}`,
        "_blank",
      );
    }
  };

  const handleOfficialLookup = () => {
    window.open("https://voters.eci.gov.in", "_blank");
  };

  return (
    <section id="works" className="py-40 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="reveal mb-20 text-center">
          <h2 className="text-5xl md:text-7xl text-center font-serif">
            {t.booth.title}
          </h2>
          <p className="text-gray-500 mt-6">{t.booth.subtitle}</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-[#111111] rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
            <div className="space-y-4 mb-6">
              <input
                type="text"
                placeholder={t.booth.placeholder}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && handleGoogleMapsSearch()
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-india-green/50"
              />
            </div>

            <div className="help-text text-sm text-gray-400 mb-6">
              {t.booth.helpText}
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={handleGoogleMapsSearch}
                disabled={!location.trim()}
                className="flex-1 bg-india-green hover:bg-india-green/90 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                {t.booth.searchBtn}
              </button>
              <button
                onClick={handleOfficialLookup}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold transition-colors border border-white/10">
                {t.booth.officialBtn}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #333 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}></div>
    </section>
  );
};
