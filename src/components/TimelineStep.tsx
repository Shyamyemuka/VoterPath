"use client";

import React, { useState } from "react";
import { TimelineStep as TimelineStepType } from "@/data/timeline";
import { useLanguage } from "@/contexts/LanguageContext";

interface TimelineStepProps {
  step: TimelineStepType;
  index: number;
  onLearnMore: (prompt: string) => void;
}

export const TimelineStep = ({
  step,
  index,
  onLearnMore,
}: TimelineStepProps) => {
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const colorMap: Record<string, string> = {
    orange: "bg-orange-500 text-white",
    green: "bg-india-green text-white",
    blue: "bg-blue-500 text-white",
    purple: "bg-purple-500 text-white",
    red: "bg-red-500 text-white",
    teal: "bg-teal-500 text-white",
    indigo: "bg-indigo-500 text-white",
  };

  return (
    <div className="reveal mb-8">
      <div
        className="flex gap-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}>
        {/* Step Number Circle */}
        <div
          className={`flex-shrink-0 w-16 h-16 rounded-full ${colorMap[step.color]} flex items-center justify-center text-2xl font-bold`}>
          {step.icon}
        </div>

        {/* Content */}
        <div className="flex-grow pt-2">
          <h3 className="text-2xl font-bold text-white mb-2 font-serif">
            {step.title[language as keyof typeof step.title]}
          </h3>
          <p className="text-gray-400 mb-2">
            {step.shortDesc[language as keyof typeof step.shortDesc]}
          </p>

          {!isExpanded && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(true);
              }}
              className="text-india-green hover:text-india-green/80 transition-colors text-sm font-semibold mt-2">
              Learn More →
            </button>
          )}
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="mt-4 ml-22 border-l-2 border-gray-700 pl-6 py-4">
          <p className="text-gray-300 mb-4 leading-relaxed">
            {step.details[language as keyof typeof step.details]}
          </p>

          <div className="mb-4">
            <h4 className="font-semibold text-white mb-2">Key Facts:</h4>
            <ul className="list-disc list-inside text-gray-400 space-y-1">
              {(
                step.keyFacts[language as keyof typeof step.keyFacts] ||
                step.keyFacts.en
              ).map((fact, idx) => (
                <li key={idx}>{fact}</li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3">
            <a
              href={step.officialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-india-green hover:bg-india-green/90 text-white rounded-lg text-sm font-semibold transition-colors">
              {
                step.officialLinkText[
                  language as keyof typeof step.officialLinkText
                ]
              }
            </a>
            <button
              onClick={() => {
                onLearnMore(step.chatPrompt);
                setIsExpanded(false);
              }}
              className="px-4 py-2 bg-india-saffron hover:bg-india-saffron/90 text-black rounded-lg text-sm font-semibold transition-colors">
              Ask AI ↗
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
