"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export const QuickInfoCards = () => {
  const { t } = useLanguage();

  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Helpline Card */}
          <div className="reveal bg-[#111111] rounded-2xl p-8 border border-white/10 hover:border-india-green/50 transition-colors shadow-lg">
            <div className="text-4xl mb-4">📞</div>
            <h3 className="text-2xl font-bold text-white mb-2 font-serif">
              {t.cards.helplineTitle}
            </h3>
            <p className="text-gray-400 mb-4">{t.cards.helplineDesc}</p>
            <div className="bg-india-green/20 border border-india-green/50 rounded-lg p-3 text-center">
              <p className="text-india-green font-bold text-lg">1950</p>
              <p className="text-xs text-gray-300 mt-1">Toll-free</p>
            </div>
          </div>

          {/* Rights Card */}
          <div
            className="reveal bg-[#111111] rounded-2xl p-8 border border-white/10 hover:border-india-saffron/50 transition-colors shadow-lg"
            style={{ transitionDelay: "100ms" }}>
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-white mb-2 font-serif">
              {t.cards.rightsTitle}
            </h3>
            <p className="text-gray-400 mb-4">{t.cards.rightsDesc}</p>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Secret ballot guaranteed</li>
              <li>• NOTA option available</li>
              <li>• Free to all citizens</li>
            </ul>
          </div>

          {/* Facts Card */}
          <div
            className="reveal bg-[#111111] rounded-2xl p-8 border border-white/10 hover:border-blue-500/50 transition-colors shadow-lg"
            style={{ transitionDelay: "200ms" }}>
            <div className="text-4xl mb-4">🗳️</div>
            <h3 className="text-2xl font-bold text-white mb-2 font-serif">
              {t.cards.factsTitle}
            </h3>
            <p className="text-gray-400 mb-4">{t.cards.factsDesc}</p>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
              <p className="text-blue-200 text-sm font-semibold">
                Largest democracy by voters
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
