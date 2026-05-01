"use client";

import React from "react";
import { electionTimeline } from "@/data/timeline";
import { TimelineStep } from "./TimelineStep";
import { useLanguage } from "@/contexts/LanguageContext";

interface ElectionTimelineProps {
  onStepClick: (prompt: string) => void;
}

export const ElectionTimeline = ({ onStepClick }: ElectionTimelineProps) => {
  const { t } = useLanguage();

  return (
    <section id="expertise" className="py-32 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center reveal mb-20">
          <h2 className="text-3xl md:text-5xl lg:text-6xl leading-tight text-white/90 mb-6 font-serif">
            {t.timeline.title}
          </h2>
          <p className="text-xl md:text-2xl text-gray-500 leading-relaxed font-light">
            {t.timeline.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {electionTimeline.map((step, index) => (
            <TimelineStep
              key={step.id}
              step={step}
              index={index}
              onLearnMore={onStepClick}
            />
          ))}
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
