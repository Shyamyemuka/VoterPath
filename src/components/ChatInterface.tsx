"use client";

import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatMessage } from "./ChatMessage";
import { SuggestedPrompts } from "./SuggestedPrompts";
import { useLanguage } from "@/contexts/LanguageContext";
import { SYSTEM_PROMPTS } from "@/lib/gemini";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const ChatInterface = () => {
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: t.chat.welcome },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<any>(null);
  const genAIRef = useRef<any>(null);

  // Initialize Gemini client
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      console.error("API key not found");
      return;
    }

    genAIRef.current = new GoogleGenerativeAI(apiKey);
    initializeChat();
  }, []);

  // Reset chat when language changes
  useEffect(() => {
    initializeChat();
    setMessages([{ role: "assistant", content: t.chat.welcome }]);
  }, [language, t]);

  const initializeChat = async () => {
    try {
      if (!genAIRef.current) return;

      const model = genAIRef.current.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction:
          SYSTEM_PROMPTS[language as keyof typeof SYSTEM_PROMPTS] ||
          SYSTEM_PROMPTS.en,
      });

      chatSessionRef.current = model.startChat({
        history: [],
        generationConfig: {
          maxOutputTokens: 1024,
          temperature: 0.7,
        },
      });
    } catch (error) {
      console.error("Error initializing chat:", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (messageText: string = input) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage = messageText;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      if (!chatSessionRef.current) {
        throw new Error("Chat session not initialized");
      }

      const response = await chatSessionRef.current.sendMessage(userMessage);
      const assistantMessage = response.response.text();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantMessage },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-[#111111] rounded-2xl shadow-lg border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="border-b border-white/10 p-6">
        <h2 className="text-2xl font-bold text-white font-serif">
          {t.chat.title}
        </h2>
        <p className="text-sm text-gray-400 mt-1">{t.chat.subtitle}</p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} role={msg.role} content={msg.content} />
        ))}

        {messages.length === 1 && !isLoading && (
          <div className="mt-8">
            <p className="text-gray-500 text-sm mb-4">
              {t.common.loading}... {t.chat.placeholder}
            </p>
            <SuggestedPrompts onPromptSelect={sendMessage} />
          </div>
        )}

        {isLoading && (
          <div className="flex gap-2 items-center">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}></div>
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.4s" }}></div>
            </div>
            <span className="text-sm text-gray-400">{t.chat.thinking}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-white/10 p-4 bg-[#0a0a0a]">
        <div className="flex gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t.chat.placeholder}
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-india-green/50 resize-none"
            rows={2}
            disabled={isLoading}
          />
          <button
            onClick={() => sendMessage()}
            disabled={isLoading || !input.trim()}
            className="bg-india-green hover:bg-india-green/90 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors self-end">
            {t.chat.send}
          </button>
        </div>
      </div>
    </div>
  );
};
