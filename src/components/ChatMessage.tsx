"use client";

import React from "react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export const ChatMessage = ({ role, content }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isUser
            ? "bg-india-green text-white rounded-br-none"
            : "bg-slate-100 text-black rounded-bl-none"
        }`}>
        <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">
          {content}
        </p>
      </div>
    </div>
  );
};
