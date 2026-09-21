"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { chatWithAIAssistant } from "@/lib/actions/ai";
import { IoClose, IoSend } from "react-icons/io5";
import { HiSparkles } from "react-icons/hi2";
import { RiRobot2Line } from "react-icons/ri";
import { LuRefreshCw } from "react-icons/lu";

const DEFAULT_CHIPS = [
  "🔍 Find active tasks",
  "✍️ Help me post a task",
  "💡 Tips to win proposals",
  "❓ How does SkillSwap work?",
];

const INITIAL_MESSAGE = {
  id: "welcome-1",
  sender: "bot",
  text: "Hello! 👋 I'm **SwapAi Assistant**, your SkillSwap AI guide.\n\nWhether you want to find exciting tasks to bid on, need help drafting a task post, or want winning proposal strategies, I'm here to assist you!",
  suggestedChips: DEFAULT_CHIPS,
};

// Formats simple markdown links [text](url), bold **text**, and line breaks
function renderFormattedMessage(rawText) {
  if (!rawText) return null;

  // Split into lines for paragraph handling
  const lines = rawText.split("\n");

  return lines.map((line, lineIdx) => {
    // Process markdown link pattern [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(line.substring(lastIndex, match.index));
      }
      const label = match[1];
      const url = match[2];
      parts.push(
        <Link
          key={`link-${lineIdx}-${match.index}`}
          href={url}
          className="text-violet-400 hover:text-violet-300 underline font-semibold transition-colors inline-flex items-center gap-0.5 mx-0.5"
        >
          {label}
        </Link>
      );
      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < line.length) {
      parts.push(line.substring(lastIndex));
    }

    // Helper to format bold **text** in non-link string segments
    const formattedParts = parts.map((part, partIdx) => {
      if (typeof part === "string") {
        const boldRegex = /\*\*([^*]+)\*\*/g;
        const bParts = [];
        let bLastIdx = 0;
        let bMatch;

        while ((bMatch = boldRegex.exec(part)) !== null) {
          if (bMatch.index > bLastIdx) {
            bParts.push(part.substring(bLastIdx, bMatch.index));
          }
          bParts.push(
            <strong key={`b-${lineIdx}-${partIdx}-${bMatch.index}`} className="text-white font-bold">
              {bMatch[1]}
            </strong>
          );
          bLastIdx = boldRegex.lastIndex;
        }

        if (bLastIdx < part.length) {
          bParts.push(part.substring(bLastIdx));
        }

        return <React.Fragment key={`part-${partIdx}`}>{bParts}</React.Fragment>;
      }
      return part;
    });

    return (
      <span key={`line-${lineIdx}`} className="block min-h-[1.1rem]">
        {formattedParts}
      </span>
    );
  });
}

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chips, setChips] = useState(DEFAULT_CHIPS);
  const messagesEndRef = useRef(null);

  // Save to localStorage when messages change
  useEffect(() => {
    try {
      if (messages.length > 1) {
        localStorage.setItem("skillswap_swapbot_chat", JSON.stringify(messages.slice(-20)));
      }
    } catch {
      // ignore
    }
  }, [messages]);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  const handleOpenChat = () => {
    setIsOpen(true);
    try {
      const saved = localStorage.getItem("skillswap_swapbot_chat");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          const lastBotMsg = [...parsed].reverse().find((m) => m.sender === "bot");
          if (lastBotMsg?.suggestedChips?.length) {
            setChips(lastBotMsg.suggestedChips);
          }
        }
      }
    } catch {
      // ignore
    }
  };

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMessage = {
      id: `user-${messages.length + 1}`,
      sender: "user",
      text,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      // Build history payload (last 6 messages)
      const historyPayload = newMessages.slice(-6).map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
      }));

      const res = await chatWithAIAssistant({
        message: text,
        history: historyPayload,
      });

      if (res?.success && res?.data?.reply) {
        const botReply = res.data.reply;
        const nextChips = res.data.suggestedChips || DEFAULT_CHIPS;

        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${prev.length + 1}`,
            sender: "bot",
            text: botReply,
            suggestedChips: nextChips,
          },
        ]);
        setChips(nextChips);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${prev.length + 1}`,
            sender: "bot",
            text: res?.message || "I encountered an error getting a response. Please try again!",
            suggestedChips: DEFAULT_CHIPS,
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${prev.length + 1}`,
          sender: "bot",
          text: "Something went wrong communicating with SwapAi Assistant. Please check your network connection.",
          suggestedChips: DEFAULT_CHIPS,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([INITIAL_MESSAGE]);
    setChips(DEFAULT_CHIPS);
    try {
      localStorage.removeItem("skillswap_swapbot_chat");
    } catch {
      // ignore
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={handleOpenChat}
            aria-label="Open AI Chatbot"
            className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-violet-600 via-purple-600 to-fuchsia-600 text-white shadow-xl shadow-violet-600/30 hover:shadow-violet-600/50 hover:scale-110 active:scale-95 transition-all duration-300 border border-violet-400/40 cursor-pointer"
          >
            <RiRobot2Line className="text-2xl transition-transform duration-300 group-hover:rotate-12" />
            
            {/* Sparkle badge */}
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400 text-slate-950 text-[10px] font-bold shadow-md animate-bounce">
              <HiSparkles className="text-xs" />
            </span>

            {/* Pulsing online ring */}
            <span className="absolute inset-0 rounded-full border-2 border-violet-400 opacity-20 animate-ping pointer-events-none" />

            {/* Hover Tooltip */}
            <span className="pointer-events-none absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-slate-900/90 backdrop-blur-md px-3 py-1.5 text-xs font-semibold text-violet-200 border border-violet-500/20 shadow-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100 hidden sm:block">
              Chat with SwapAi Assistant ✨
            </span>
          </button>
        )}
      </div>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 w-[94vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-[#0c1222]/95 backdrop-blur-2xl border border-violet-500/30 rounded-3xl shadow-2xl shadow-violet-950/50 flex flex-col z-50 overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
          
          {/* Chat Header */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-violet-900/50 via-purple-900/30 to-slate-900/50 border-b border-violet-500/20">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 text-white shadow-md shadow-violet-500/30">
                <RiRobot2Line className="text-xl" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-white tracking-wide">SwapAi Assistant</h3>
                  <span className="px-1.5 py-0.2 rounded-md bg-violet-500/20 text-violet-300 text-[10px] font-semibold border border-violet-500/30">
                    AI Assistant
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">Always here to help you</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearHistory}
                title="Clear conversation"
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
              >
                <LuRefreshCw className="text-sm" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Minimize chat"
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
              >
                <IoClose className="text-lg" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "bot" && (
                  <div className="w-7 h-7 rounded-xl bg-violet-600/30 border border-violet-500/40 flex items-center justify-center text-violet-300 flex-shrink-0 text-sm mt-0.5">
                    <RiRobot2Line />
                  </div>
                )}

                <div
                  className={`max-w-[84%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-gradient-to-tr from-violet-600 to-purple-600 text-white rounded-br-none shadow-md shadow-violet-600/20"
                      : "bg-slate-800/90 text-slate-200 border border-slate-700/60 rounded-bl-none shadow-sm"
                  }`}
                >
                  {renderFormattedMessage(msg.text)}
                </div>
              </div>
            ))}

            {/* Typing Loader */}
            {isLoading && (
              <div className="flex gap-2.5 justify-start items-center">
                <div className="w-7 h-7 rounded-xl bg-violet-600/30 border border-violet-500/40 flex items-center justify-center text-violet-300 flex-shrink-0 text-sm">
                  <RiRobot2Line className="animate-spin" />
                </div>
                <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl rounded-bl-none px-4 py-3 text-xs text-slate-400 flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" />
                  <span className="ml-1 text-[11px] text-slate-400">SwapAi Assistant is typing...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          {chips && chips.length > 0 && (
            <div className="px-4 py-2 border-t border-slate-800/60 bg-slate-950/40 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {chips.map((chip, idx) => (
                <button
                  key={`chip-${idx}`}
                  onClick={() => handleSendMessage(chip)}
                  disabled={isLoading}
                  className="whitespace-nowrap text-[11px] font-medium px-2.5 py-1 rounded-full bg-violet-950/50 hover:bg-violet-900/70 text-violet-300 hover:text-white border border-violet-500/30 hover:border-violet-400/50 transition-all cursor-pointer disabled:opacity-50 flex-shrink-0"
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/* Message Input Box */}
          <div className="p-3 border-t border-violet-500/20 bg-slate-900/70">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask SwapAi Assistant anything..."
                disabled={isLoading}
                className="flex-1 bg-slate-800/80 border border-slate-700/80 focus:border-violet-500 text-slate-100 placeholder:text-slate-500 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="p-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-md shadow-violet-600/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer flex-shrink-0"
              >
                <IoSend className="text-sm" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
