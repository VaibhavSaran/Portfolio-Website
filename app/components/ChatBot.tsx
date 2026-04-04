"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Message = {
  role: "user" | "assistant";
  content: string;
  id: string;
};

const STARTER_CHIPS = [
  "What are your flagship projects?",
  "Tell me about your IEEE paper",
  "What's your tech stack?",
  "Are you open to relocation?",
];

const FALLBACK_MSG =
  "I'm not fully set up yet — but you can reach Vaibhav directly at vaibhavsaran8@gmail.com or schedule a call at calendly.com/vaibhavsaran8/30min";

function TypingIndicator() {
  return (
    <div
      style={{
        display: "inline-flex",
        gap: "5px",
        alignItems: "center",
        padding: "10px 14px",
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "18px 18px 18px 4px",
      }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.5)",
            display: "inline-block",
            animation: `typing-bounce 1.2s ease-in-out ${i * 0.15}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content, id: Date.now().toString() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputValue("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) throw new Error(`status:${response.status}`);

      const assistantId = (Date.now() + 1).toString();
      setMessages((prev) => [...prev, { role: "assistant", content: "", id: assistantId }]);
      setIsTyping(false);

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: m.content + chunk } : m))
        );
      }
    } catch {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: FALLBACK_MSG, id: (Date.now() + 2).toString() },
      ]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  const hasUserMessages = messages.length > 0;

  // Mobile: left+right 12px; desktop: fixed right 24px, width 420px
  const panelStyle: React.CSSProperties = {
    position: "fixed",
    bottom: "88px",
    right: "24px",
    width: "420px",
    maxHeight: "580px",
    zIndex: 9998,
    background: "#1a1a2e",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "16px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
    transformOrigin: "bottom right",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  };

  return (
    <>
      <style>{`
        @keyframes typing-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes green-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }
        .chatbot-md p { margin: 0 0 6px 0; line-height: 1.65; font-size: 14px; }
        .chatbot-md p:last-child { margin-bottom: 0; }
        .chatbot-md ul { margin: 4px 0 6px 0; padding-left: 16px; }
        .chatbot-md li { margin-bottom: 3px; font-size: 14px; line-height: 1.6; }
        .chatbot-md strong { font-weight: 600; color: rgba(255,255,255,0.95); }
        .chatbot-md a { color: #7C6FFF; text-decoration: underline; }
        .chatbot-md code { background: rgba(255,255,255,0.1); padding: 1px 5px; border-radius: 3px; font-size: 13px; }
        @media (max-width: 479px) {
          .chatbot-panel-mobile { right: 12px !important; left: 12px !important; width: auto !important; }
        }
      `}</style>

      {/* Floating button — hidden when panel is open */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="chat-button"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            onClick={() => setIsOpen(true)}
            style={{
              position: "fixed",
              bottom: "24px",
              right: "24px",
              zIndex: 9999,
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #7c3aed, #2563eb)",
              color: "white",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 20px rgba(124,58,237,0.4)",
              border: "none",
              cursor: "pointer",
              transformOrigin: "bottom right",
            }}
            aria-label="Open Vaibhav Echo Bot"
          >
            <span
              style={{
                position: "absolute",
                top: "-2px",
                right: "-2px",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#22c55e",
                border: "2px solid #0a0a12",
                animation: "green-pulse 2s ease-in-out infinite",
              }}
            />
            <span style={{ fontSize: "14px", fontWeight: 600 }}>VS</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={panelStyle}
            className="chatbot-panel-mobile"
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #7c3aed, #2563eb)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: "14px", fontWeight: 600, color: "white" }}>VS</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "15px", fontWeight: 600, color: "white", margin: 0, lineHeight: 1.2 }}>
                  Vaibhav Echo Bot
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "3px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", flexShrink: 0, display: "inline-block" }} />
                  <span style={{ fontSize: "12px", color: "#22c55e" }}>Online</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "6px",
                  borderRadius: "8px",
                  color: "rgba(255,255,255,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
                aria-label="Close chat"
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
              >
                <X size={18} />
              </button>
            </div>

            {/* Message list */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                minHeight: 0,
              }}
            >
              {/* Welcome card */}
              <div
                style={{
                  background: "rgba(124,58,237,0.15)",
                  border: "1px solid rgba(124,58,237,0.3)",
                  borderRadius: "12px",
                  padding: "12px 14px",
                  marginBottom: "4px",
                }}
              >
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.85)", lineHeight: 1.5, margin: 0 }}>
                  Hi! I&apos;m Vaibhav&apos;s AI assistant. Ask me about his projects, research, or experience!
                </p>
                <a
                  href="mailto:vaibhavsaran8@gmail.com"
                  style={{ display: "inline-block", marginTop: "8px", fontSize: "13px", fontWeight: 500, color: "#818cf8" }}
                >
                  Contact Vaibhav →
                </a>
              </div>

              {/* Suggestion chips */}
              {!hasUserMessages && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", paddingBottom: "4px" }}>
                  {STARTER_CHIPS.map((chip) => (
                    <button
                      key={chip}
                      onClick={() => sendMessage(chip)}
                      style={{
                        fontSize: "12px",
                        padding: "6px 12px",
                        borderRadius: "20px",
                        border: "1px solid rgba(255,255,255,0.2)",
                        background: "rgba(255,255,255,0.05)",
                        color: "rgba(255,255,255,0.75)",
                        cursor: "pointer",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}

              {/* Messages */}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}
                >
                  <div
                    style={{
                      maxWidth: "75%",
                      padding: "10px 14px",
                      color: "white",
                      wordBreak: "break-word",
                      ...(msg.role === "user"
                        ? {
                            background: "linear-gradient(135deg, #6366f1, #7c3aed)",
                            borderRadius: "18px 18px 4px 18px",
                            fontSize: "14px",
                            lineHeight: 1.65,
                          }
                        : {
                            background: "rgba(255,255,255,0.08)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "18px 18px 18px 4px",
                          }),
                    }}
                  >
                    {msg.role === "assistant" ? (
                      <div className="chatbot-md">
                        {msg.content ? (
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        ) : (
                          isLoading && <span style={{ opacity: 0.5 }}>…</span>
                        )}
                      </div>
                    ) : (
                      <span>{msg.content}</span>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <TypingIndicator />
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 14px",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                flexShrink: 0,
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                disabled={isLoading}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "24px",
                  padding: "10px 16px",
                  fontSize: "14px",
                  color: "white",
                  outline: "none",
                  opacity: isLoading ? 0.5 : 1,
                }}
              />
              <button
                onClick={() => sendMessage(inputValue)}
                disabled={!inputValue.trim() || isLoading}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #6366f1, #7c3aed)",
                  border: "none",
                  cursor: inputValue.trim() && !isLoading ? "pointer" : "not-allowed",
                  opacity: !inputValue.trim() || isLoading ? 0.4 : 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "opacity 0.15s",
                }}
                aria-label="Send message"
              >
                <Send size={14} color="white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
