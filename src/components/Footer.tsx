"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-20 border-t border-white/5 bg-[#050505] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div className="w-full md:w-auto">
            <h2 className="text-[10vw] leading-[0.8] tracking-tighter text-white/10 font-bold select-none pointer-events-none">
              VOTERPATH.
            </h2>
          </div>

          <div className="flex flex-col gap-8 text-right w-full md:w-auto">
            <div className="flex flex-col gap-4 text-gray-400">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors">
                {t.footer.instagram}
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors">
                {t.footer.twitter}
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors">
                {t.footer.linkedin}
              </a>
            </div>
            <p className="text-sm text-gray-600">{t.footer.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
