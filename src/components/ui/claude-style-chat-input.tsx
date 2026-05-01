"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Plus,
  ChevronDown,
  ArrowUp,
  X,
  FileText,
  Loader2,
  Check,
  Archive,
} from "lucide-react";

/* --- ICONS --- */
export const Icons = {
  Plus: Plus,
  Thinking: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path d="M10.3857 2.50977C14.3486 2.71054 17.5 5.98724 17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 9.72386 2.72386 9.5 3 9.5C3.27614 9.5 3.5 9.72386 3.5 10C3.5 13.5899 6.41015 16.5 10 16.5C13.5899 16.5 16.5 13.5899 16.5 10C16.5 6.5225 13.7691 3.68312 10.335 3.50879L10 3.5L9.89941 3.49023C9.67145 3.44371 9.5 3.24171 9.5 3C9.5 2.72386 9.72386 2.5 10 2.5L10.3857 2.50977ZM10 5.5C10.2761 5.5 10.5 5.72386 10.5 6V9.69043L13.2236 11.0527C13.4706 11.1762 13.5708 11.4766 13.4473 11.7236C13.3392 11.9397 13.0957 12.0435 12.8711 11.9834L12.7764 11.9473L9.77637 10.4473C9.60698 10.3626 9.5 10.1894 9.5 10V6C9.5 5.72386 9.72386 5.5 10 5.5ZM3.66211 6.94141C4.0273 6.94159 4.32303 7.23735 4.32324 7.60254C4.32324 7.96791 4.02743 8.26446 3.66211 8.26465C3.29663 8.26465 3 7.96802 3 7.60254C3.00021 7.23723 3.29676 6.94141 3.66211 6.94141ZM4.95605 4.29395C5.32146 4.29404 5.61719 4.59063 5.61719 4.95605C5.6171 5.3214 5.3214 5.61709 4.95605 5.61719C4.59063 5.61719 4.29403 5.32146 4.29395 4.95605C4.29395 4.59057 4.59057 4.29395 4.95605 4.29395ZM7.60254 3C7.96802 3 8.26465 3.29663 8.26465 3.66211C8.26446 4.02743 7.96791 4.32324 7.60254 4.32324C7.23736 4.32302 6.94159 4.0273 6.94141 3.66211C6.94141 3.29676 7.23724 3.00022 7.60254 3Z"></path>
    </svg>
  ),
  SelectArrow: ChevronDown,
  ArrowUp: ArrowUp,
  X: X,
  FileText: FileText,
  Loader2: Loader2,
  Check: Check,
  Archive: Archive,
};

interface AttachedFile {
  id: string;
  file: File;
  type: string;
  preview: string | null;
  uploadStatus: string;
  content?: string;
}

interface ClaudeChatInputProps {
  onSendMessage: (data: {
    message: string;
    files: AttachedFile[];
    pastedContent: AttachedFile[];
    isThinkingEnabled: boolean;
  }) => void;
  placeholder?: string;
}

export const ClaudeChatInput: React.FC<ClaudeChatInputProps> = ({
  onSendMessage,
  placeholder = "Ask about elections, voting, or anything else...",
}) => {
  const [message, setMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isThinkingEnabled, setIsThinkingEnabled] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 384) + "px";
    }
  }, [message]);

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleSend = () => {
    if (!message.trim()) return;
    onSendMessage({
      message,
      files: [],
      pastedContent: [],
      isThinkingEnabled,
    });
    setMessage("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const hasContent = message.trim().length > 0;

  return (
    <div
      className="w-full max-w-4xl mx-auto font-sans"
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}>
      <div className="flex flex-col mx-2 md:mx-0 items-stretch transition-all duration-200 relative z-10 rounded-2xl cursor-text border border-gray-300 dark:border-gray-700 shadow-lg hover:shadow-xl focus-within:shadow-2xl bg-white dark:bg-gray-900">
        <div className="flex flex-col px-4 pt-4 pb-3 gap-3">
          {/* Input Area */}
          <div className="relative mb-1">
            <div className="max-h-96 w-full overflow-y-auto font-sans break-words transition-opacity duration-200 min-h-[2.5rem] pl-1">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="w-full bg-transparent border-0 outline-none text-gray-900 dark:text-white text-base placeholder:text-gray-400 dark:placeholder:text-gray-600 resize-none overflow-hidden py-0 leading-relaxed block font-normal"
                rows={1}
                autoFocus
                style={{ minHeight: "1.5em" }}
              />
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex gap-2 w-full items-center">
            {/* Left Tools */}
            <div className="flex-1 flex items-center gap-1">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center justify-center h-8 w-8 rounded-lg active:scale-95 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                type="button"
                aria-label="Attach file">
                <Icons.Plus className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsThinkingEnabled(!isThinkingEnabled)}
                className={`transition-all duration-200 h-8 w-8 flex items-center justify-center rounded-lg active:scale-95 ${
                  isThinkingEnabled
                    ? "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30"
                    : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                aria-label="Extended thinking">
                <Icons.Thinking className="w-5 h-5" />
              </button>
            </div>

            {/* Right Tools - Send Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleSend}
                disabled={!hasContent}
                className={`
                                    inline-flex items-center justify-center h-8 w-8 rounded-lg active:scale-95 transition-colors
                                    ${
                                      hasContent
                                        ? "bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600"
                                        : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                                    }
                                `}
                type="button"
                aria-label="Send message">
                <Icons.ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={(e) => {
          if (e.target.files) {
            // Handle files if needed
          }
          e.target.value = "";
        }}
        className="hidden"
      />

      <div className="text-center mt-4">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          AI can make mistakes. Please verify important information.
        </p>
      </div>
    </div>
  );
};

export default ClaudeChatInput;
