"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

type Message = { type: "user" | "bot"; text: string };

const SUGGESTED = [
  "What's your experience?",
  "What projects have you built?",
  "Are you open to work?",
];

function ChatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function CloseIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  );
}

function TypingDots() {
  return (
    <div className="flex items-end gap-2 justify-start">
      <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 mb-0.5 border border-zinc-200">
        <Image src="/Images/MyPic.png" alt="" width={24} height={24} className="w-full h-full object-cover object-top" />
      </div>
      <div className="bg-white border border-zinc-100 shadow-sm px-4 py-3 rounded-2xl rounded-bl-sm">
        <div className="flex items-center gap-1.5 h-4">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      if (messages.length === 0) {
        setMessages([
          {
            type: "bot",
            text: "Hi! I'm Sushruth's assistant — ask me anything about his experience, projects, or skills.",
          },
        ]);
      }
      setTimeout(() => inputRef.current?.focus(), 320);
    }
  }, [open]);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { type: "user", text: q }]);
    setLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setMessages((prev) => [...prev, { type: "bot", text: data.answer }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "Sorry, I couldn't connect right now. Please try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const showSuggestions = messages.length === 1 && messages[0].type === "bot" && !loading;

  return (
    <>
      {/* Chat panel */}
      <div
        role="dialog"
        aria-label="Chat with Sushruth's assistant"
        aria-hidden={!open}
        className={`fixed bottom-[76px] right-5 z-50 w-[360px] max-w-[calc(100vw-1.25rem)] flex flex-col rounded-2xl overflow-hidden border border-zinc-200/70 shadow-2xl bg-[#FAF8F5] transition-all duration-300 ease-out origin-bottom-right ${
          open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 translate-y-3 pointer-events-none"
        }`}
        style={{ height: "520px" }}
      >
        {/* Header */}
        <div className="bg-[#3C0008] px-4 py-3 flex items-center gap-3 flex-shrink-0">
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/20 flex-shrink-0">
            <Image
              src="/Images/MyPic.png"
              alt="Sushruth"
              width={36}
              height={36}
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm leading-tight truncate">
              Sushruth Murakare
            </p>
            <span className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
              <span className="text-[11px] text-white/60">Always available</span>
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-7 h-7 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close chat"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-end gap-2 ${msg.type === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.type === "bot" && (
                <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 mb-0.5 border border-zinc-200">
                  <Image
                    src="/Images/MyPic.png"
                    alt=""
                    width={24}
                    height={24}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              )}
              <div
                className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.type === "user"
                    ? "bg-[#3C0008] text-white rounded-br-sm"
                    : "bg-white text-zinc-800 border border-zinc-100 shadow-sm rounded-bl-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Quick-start chips — only before the user has sent anything */}
          {showSuggestions && (
            <div className="flex flex-wrap gap-2 pt-1">
              {SUGGESTED.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="text-[11px] font-medium px-3 py-1.5 rounded-full border border-[#3C0008]/25 text-[#3C0008] bg-white hover:bg-[#3C0008] hover:text-white hover:border-[#3C0008] transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {loading && <TypingDots />}

          <div ref={bottomRef} />
        </div>

        {/* Input bar */}
        <div className="px-3 py-3 bg-white border-t border-zinc-100 flex-shrink-0">
          <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-full px-4 py-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Ask about my work…"
              disabled={loading}
              className="flex-1 bg-transparent text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none disabled:opacity-50"
            />
            <button
              onClick={() => send(input)}
              disabled={loading || !input.trim()}
              aria-label="Send"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#3C0008] text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#5a0010] active:scale-95 transition-all flex-shrink-0"
            >
              <SendIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Floating trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Chat with Sushruth's assistant"}
        className={`fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full shadow-lg transition-all duration-300 active:scale-95 ${
          open
            ? "bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 w-10 h-10 justify-center"
            : "bg-[#3C0008] text-white hover:bg-[#5a0010] px-4 py-2.5"
        }`}
      >
        {open ? <CloseIcon size={14} /> : (
          <>
            <ChatIcon />
            <span className="text-sm font-medium pr-0.5">Ask me</span>
          </>
        )}
      </button>
    </>
  );
}
