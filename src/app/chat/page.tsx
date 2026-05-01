"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Volume2, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
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
  const { user, logOut, loading, isAuthenticated } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "left",
      type: "text",
      content: t.chat.welcome,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messageIdRef = useRef(Math.max(...messages.map((m) => m.id), 0));

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth/signin");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center text-white">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          <p className="mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleLogOut = async () => {
    try {
      await logOut();
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Update welcome message when language changes
  useEffect(() => {
    setMessages((prev) => {
      const newMessages = [...prev];
      if (newMessages.length > 0 && newMessages[0].id === 1) {
        newMessages[0] = {
          ...newMessages[0],
          content: t.chat.welcome,
        };
      }
      return newMessages;
    });
  }, [t.chat.welcome]);

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
    <div className="min-h-screen bg-[#050505] selection:bg-[#FF4500] selection:text-white">
      {/* Global Noise Overlay */}
      <div
        className="fixed inset-0 z-50 pointer-events-none opacity-5 mix-blend-overlay"
        style={{
          backgroundImage:
            'url("https://grainy-gradients.vercel.app/noise.svg")',
          backgroundRepeat: "repeat",
        }}></div>

      {/* Navigation Header */}
      <div className="sticky top-0 z-40 border-b border-white/5 backdrop-blur-md bg-[#050505]/80 transition-all duration-500">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            aria-label="Go back"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white rounded-md px-2 py-1">
            <ArrowLeft size={20} aria-hidden="true" />
            <span className="text-sm">{t.common.back}</span>
          </button>

          <h1 className="text-xl font-bold text-white font-serif">
            {t.chat.title}
          </h1>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {}}
              aria-label="Voice input"
              className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
              title="Voice input">
              <Volume2 size={20} aria-hidden="true" />
            </button>
            <div className="relative">
              <label htmlFor="language-select" className="sr-only">
                Select Language
              </label>
              <select
                id="language-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="appearance-none bg-[#111111] text-gray-400 hover:text-white border border-white/10 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white transition-colors cursor-pointer text-sm"
                title="Select Language">
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="bn">বাংলা (Bengali)</option>
              </select>
            </div>
            <div className="relative group">
              <button
                className="text-gray-400 hover:text-white text-sm px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                title={user?.email}>
                {user?.email?.split("@")[0] || "User"}
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-[#111111] border border-white/10 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="px-4 py-2 border-b border-white/10">
                  <p className="text-xs text-gray-500">Signed in as</p>
                  <p className="text-sm text-white truncate">{user?.email}</p>
                </div>
                <button
                  onClick={handleLogOut}
                  className="w-full text-left px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="container mx-auto px-6 py-12 flex flex-col items-center min-h-[calc(100vh-140px)]">
        <ChatComponent
          config={{
            leftPerson: {
              name: t.chat.title,
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
            backgroundColor: "#050505",
            leftChat: {
              backgroundColor: "#111111",
              textColor: "#f0f0f0",
              borderColor: "#333333",
              showBorder: true,
            },
            rightChat: {
              backgroundColor: "#FF4500",
              textColor: "#050505",
              borderColor: "#FF4500",
              showBorder: false,
            },
          }}
        />

        {/* Input Area */}
        <div className="w-full max-w-2xl mt-12">
          <ClaudeChatInput
            onSendMessage={handleSendMessage}
            placeholder={t.chat.placeholder}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 bg-[#050505] relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xs text-gray-600">{t.common.democracy}</p>
        </div>
      </footer>
    </div>
  );
}
