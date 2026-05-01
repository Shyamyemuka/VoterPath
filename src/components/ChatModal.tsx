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

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: t.chat.welcome },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<any>(null);
  const genAIRef = useRef<any>(null);

  // Initialize Gemini client on mount
  useEffect(() => {
    if (!isOpen) return;

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    console.log("API Key available:", !!apiKey);

    if (!apiKey) {
      console.error("NEXT_PUBLIC_GEMINI_API_KEY not found");
      setMessages([
        {
          role: "assistant",
          content:
            "⚠️ Error: Gemini API key not configured. Please add NEXT_PUBLIC_GEMINI_API_KEY to .env.local",
        },
      ]);
      return;
    }

    try {
      genAIRef.current = new GoogleGenerativeAI(apiKey);
      console.log("GoogleGenerativeAI initialized");
      initializeChat();
    } catch (error) {
      console.error("Failed to initialize GoogleGenerativeAI:", error);
    }
  }, [isOpen]);

  // Reset chat when language changes
  useEffect(() => {
    if (isOpen && chatSessionRef.current) {
      initializeChat();
      setMessages([{ role: "assistant", content: t.chat.welcome }]);
    }
  }, [language]);

  const initializeChat = async () => {
    try {
      if (!genAIRef.current) {
        console.error("genAIRef is not initialized");
        return;
      }

      const systemPrompt =
        SYSTEM_PROMPTS[language as keyof typeof SYSTEM_PROMPTS] ||
        SYSTEM_PROMPTS.en;

      const model = genAIRef.current.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction: systemPrompt,
      });

      console.log("Model initialized:", model);

      chatSessionRef.current = model.startChat({
        history: [],
        generationConfig: {
          maxOutputTokens: 1024,
          temperature: 0.7,
        },
      });

      console.log("Chat session started");
    } catch (error) {
      console.error("Error initializing chat:", error);
      setMessages([
        {
          role: "assistant",
          content: `Error initializing chat: ${error instanceof Error ? error.message : "Unknown error"}`,
        },
      ]);
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

      console.log("Sending message:", userMessage);
      const response = await chatSessionRef.current.sendMessage(userMessage);
      console.log("Response received:", response);

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
          content: `Error: ${error instanceof Error ? error.message : "Failed to get response"}. Please try again.`,
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#111111] rounded-2xl shadow-2xl border border-white/10 w-full max-w-2xl h-[80vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b border-white/10 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white font-serif">
              {t.chat.title}
            </h2>
            <p className="text-sm text-gray-400 mt-1">{t.chat.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2">
            <span className="text-2xl">×</span>
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, idx) => (
            <ChatMessage key={idx} role={msg.role} content={msg.content} />
          ))}

          {messages.length === 1 && !isLoading && (
            <div className="mt-8">
              <p className="text-gray-500 text-sm mb-4">
                {t.common?.suggestions || "Try asking about..."}
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
              <span className="text-gray-400 text-sm">
                {t.chat.thinking || "Thinking..."}
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-white/10 p-4 bg-[#0a0a0a]">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t.chat.placeholder}
              className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-full px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF9933] transition-colors"
              disabled={isLoading}
            />
            <button
              onClick={() => sendMessage()}
              disabled={isLoading || !input.trim()}
              className="bg-[#138808] hover:bg-[#0f6b06] disabled:bg-gray-700 text-white font-semibold rounded-full px-6 py-3 transition-colors">
              {isLoading ? "..." : t.chat.send || "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
