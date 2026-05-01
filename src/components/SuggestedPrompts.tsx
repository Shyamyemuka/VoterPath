"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SuggestedPromptsProps {
  onPromptSelect: (prompt: string) => void;
}

export const SuggestedPrompts = ({ onPromptSelect }: SuggestedPromptsProps) => {
  const { language } = useLanguage();

  const prompts: Record<string, string[]> = {
    en: [
      "How do I register to vote?",
      "What is an EVM?",
      "How to find my polling booth?",
      "What are my voting rights?",
    ],
    hi: [
      "मैं मतदाता के रूप में पंजीकृत कैसे होऊं?",
      "EVM क्या है?",
      "अपना मतदान केंद्र कैसे खोजें?",
      "मेरे मतदान अधिकार क्या हैं?",
    ],
    te: [
      "నేను ఓటరుగా నమోదు చేయడం ఎలా?",
      "EVM అంటే ఏమిటి?",
      "నా పోలింగ్ బూత్ ఎలా కనుగొనాలి?",
      "నా ఓటింగ్ హక్కులు ఏమిటి?",
    ],
    ta: [
      "நான் வாக்காளராக பதிவு செய்ய எப்படி?",
      "EVM என்றால் என்ன?",
      "எனது வாக்குச்சாலை எப்படி கண்டுபிடிக்கலாம்?",
      "எனது வாக்கு வாங்குவதற்கான உரிமைகள் என்ன?",
    ],
    bn: [
      "আমি কীভাবে ভোটার হিসাবে রেজিস্টার করব?",
      "EVM কী?",
      "আমার ভোটদান কেন্দ্র কীভাবে খুঁজে পাব?",
      "আমার ভোটাধিকার কী?",
    ],
  };

  const currentPrompts = prompts[language] || prompts.en;

  return (
    <div className="space-y-2">
      {currentPrompts.map((prompt, idx) => (
        <button
          key={idx}
          onClick={() => onPromptSelect(prompt)}
          className="w-full text-left px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors text-sm">
          {prompt}
        </button>
      ))}
    </div>
  );
};
