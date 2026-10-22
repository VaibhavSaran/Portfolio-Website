"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Message = { role: "user" | "assistant"; content: string; id: string };
const starters = [
  "Tell me about your experience",
  "Explore StockPilot & F1",
  "What is your research about?",
];
const fallback =
  "The assistant is unavailable right now. You can reach Vaibhav at [vaibhavsaran8@gmail.com](mailto:vaibhavsaran8@gmail.com) or [schedule a call](https://calendly.com/vaibhavsaran8/30min).";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  useEffect(() => () => abortRef.current?.abort(), []);
  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, loading]);
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        window.requestAnimationFrame(() => launcherRef.current?.focus());
      }
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open]);
  function close() {
    setOpen(false);
    window.requestAnimationFrame(() => launcherRef.current?.focus());
  }
  async function send(content: string) {
    if (!content.trim() || loading) return;
    const next: Message[] = [
      ...messages,
      { role: "user", content: content.trim(), id: crypto.randomUUID() },
    ];
    const id = crypto.randomUUID();
    setMessages([...next, { role: "assistant", content: "", id }]);
    setInput("");
    setLoading(true);
    const abort = new AbortController();
    abortRef.current = abort;
    try {
      const history = next.slice(-19);
      while (history[0]?.role === "assistant") history.shift();
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: abort.signal,
        body: JSON.stringify({
          messages: history.map(({ role, content }) => ({ role, content })),
        }),
      });
      if (!response.ok || !response.body) throw new Error("Chat unavailable");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";
      while (true) {
        const { done, value } = await reader.read();
        answer += done
          ? decoder.decode()
          : decoder.decode(value, { stream: true });
        setMessages((previous) =>
          previous.map((message) =>
            message.id === id ? { ...message, content: answer } : message,
          ),
        );
        if (done) break;
      }
      if (!answer.trim()) throw new Error("Empty response");
    } catch {
      if (!abort.signal.aborted)
        setMessages((previous) =>
          previous.map((message) =>
            message.id === id
              ? {
                  ...message,
                  content: message.content
                    ? `${message.content}\n\nThe connection was interrupted. Please try again.`
                    : fallback,
                }
              : message,
          ),
        );
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      {!open && (
        <button
          ref={launcherRef}
          className="chat-launcher"
          onClick={() => setOpen(true)}
          aria-label="Open portfolio assistant"
          aria-expanded={open}
          aria-controls="portfolio-chat"
        >
          <MessageCircle size={16} /> Ask about my work{" "}
          <span className="status-dot" />
        </button>
      )}
      {open && (
        <div
          id="portfolio-chat"
          className="chat-panel"
          role="dialog"
          aria-labelledby="chat-title"
        >
          <div className="chat-header">
            <div>
              <strong id="chat-title">A little more about my work.</strong>
              <p>Vaibhav’s portfolio assistant</p>
            </div>
            <button
              className="chat-close"
              aria-label="Close chat"
              onClick={close}
            >
              <X size={18} />
            </button>
          </div>
          <div
            className="chat-messages"
            ref={listRef}
            role="log"
            aria-live="polite"
            aria-relevant="additions text"
          >
            <p className="chat-welcome">
              Curious about the work
              <br />
              behind the portfolio?
            </p>
            {messages.length === 0 && (
              <div className="chat-chips">
                {starters.map((text) => (
                  <button key={text} onClick={() => send(text)}>
                    {text}
                  </button>
                ))}
              </div>
            )}
            {messages.map((message) => (
              <div className={`chat-message ${message.role}`} key={message.id}>
                {message.role === "assistant" ? (
                  <ReactMarkdown
                    components={{
                      a: ({ children, ...props }) => (
                        <a {...props} target="_blank" rel="noopener noreferrer">
                          {children}
                        </a>
                      ),
                    }}
                  >
                    {message.content || (loading ? "Thinking…" : "")}
                  </ReactMarkdown>
                ) : (
                  message.content
                )}
              </div>
            ))}
          </div>
          <form
            className="chat-input"
            onSubmit={(event) => {
              event.preventDefault();
              send(input);
            }}
          >
            <input
              ref={inputRef}
              aria-label="Your question"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              maxLength={2000}
              placeholder="Ask about my work…"
              disabled={loading}
            />
            <button
              type="submit"
              aria-label="Send question"
              disabled={loading || !input.trim()}
            >
              <Send size={15} />
            </button>
          </form>
          <p className="chat-disclaimer">
            AI answers may be imperfect. For details, reach out directly.
          </p>
        </div>
      )}
    </>
  );
}
