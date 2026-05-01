"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Volume2, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ClaudeChatInput } from "@/components/ui/claude-style-chat-input";
import ChatComponent from "@/components/ui/chat-interface";
import { getGeminiClient, SYSTEM_PROMPTS } from "@/lib/gemini";

interface ChatMessage {
  id: number;
  sender: "left" | "right";
  type: "text" | "image" | "text-with-links";
  content: string;
}

export default function ChatPage() {
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "left",
      type: "text",
      content:
        "Hello! 👋 I'm your AI Election Guide. I'm here to help you understand India's democratic process, voter registration, polling booths, EVMs, and your voting rights. What would you like to know?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messageIdRef = useRef(Math.max(...messages.map((m) => m.id), 0));

  const handleSendMessage = async (data: {
    message: string;
    files: any[];
    pastedContent: any[];
    isThinkingEnabled: boolean;
  }) => {
    const userMessage: ChatMessage = {
      id: ++messageIdRef.current,
      sender: "right",
      type: "text",
      content: data.message,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const client = getGeminiClient();
      const systemPrompt =
        SYSTEM_PROMPTS[language as keyof typeof SYSTEM_PROMPTS];

      // Build conversation history for context
      const conversationHistory = messages
        .map(
          (msg) =>
            `${msg.sender === "left" ? "Assistant" : "User"}: ${msg.content}`,
        )
        .join("\n");

      const fullPrompt = `${systemPrompt}\n\n${conversationHistory}\nUser: ${data.message}`;

      const model = client.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(fullPrompt);
      const response = result.response.text();

      const aiMessage: ChatMessage = {
        id: ++messageIdRef.current,
        sender: "left",
        type: "text",
        content: response,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      console.error("Error:", error);

      let errorMessage = "An error occurred. ";
      if (error.message?.includes("429")) {
        errorMessage +=
          "API quota exceeded. Please try again later or enable billing.";
      } else if (error.message?.includes("403")) {
        errorMessage += "API key issue. Please check your configuration.";
      } else {
        errorMessage += error.message || "Please try again.";
      }

      const errorAiMessage: ChatMessage = {
        id: ++messageIdRef.current,
        sender: "left",
        type: "text",
        content: errorMessage,
      };

      setMessages((prev) => [...prev, errorAiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050505] to-[#0a0a0a]">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-gray-800 backdrop-blur-md bg-[#050505]/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>

          <h1 className="text-xl font-bold text-transparent bg-gradient-to-r from-[#FF9933] via-white to-[#138808] bg-clip-text">
            VoterPath AI Assistant
          </h1>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {}}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
              title="Voice input">
              <Volume2 size={20} />
            </button>
            <button
              onClick={() => {}}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
              title="Language">
              <Globe size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="container mx-auto px-4 py-8 flex flex-col items-center min-h-[calc(100vh-120px)]">
        <ChatComponent
          config={{
            leftPerson: {
              name: "VoterPath Assistant",
              avatar:
                "https://api.dicebear.com/7.x/avataaars/svg?seed=voterpath",
            },
            rightPerson: {
              name: "You",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user123",
            },
            messages: messages,
          }}
          uiConfig={{
            containerWidth: 600,
            containerHeight: 500,
            backgroundColor: "#0a0a0a",
            leftChat: {
              backgroundColor: "#1a1a1a",
              textColor: "#f0f0f0",
              borderColor: "#333333",
              showBorder: true,
            },
            rightChat: {
              backgroundColor: "#FF9933",
              textColor: "#050505",
              borderColor: "#FF7700",
              showBorder: false,
            },
          }}
        />

        {/* Input Area */}
        <div className="w-full max-w-2xl mt-8">
          <ClaudeChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}
