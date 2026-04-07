/* DevHosting — AI Chat Button
   Design: Obsidian Premium — Compact floating chat, mobile-first */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIChatButton() {
  const { t } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [initialized, setInitialized] = useState(false);

  // Reset greeting when language changes
  useEffect(() => {
    setMessages([{ role: "assistant", content: t.chat.greeting }]);
    setInitialized(true);
  }, [t]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = { role: "user", content: messageText };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || t.chat.errorRetry },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: t.chat.errorConn },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = (content: string) =>
    content.split("**").map((part, i) =>
      i % 2 === 1 ? <strong key={i}>{part}</strong> : part
    );

  return (
    <>
      {/* Chat Window — fixed size, anchored to bottom-right */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            style={{
              position: "fixed",
              bottom: "5.5rem",
              right: "1rem",
              width: "min(340px, calc(100vw - 2rem))",
              height: "460px",
              display: "flex",
              flexDirection: "column",
              borderRadius: "1.25rem",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "oklch(0.11 0.005 285)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
              zIndex: 9999,
            }}
          >
            {/* Header */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.75rem 1rem",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              background: "oklch(0.13 0.008 285)",
              flexShrink: 0,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                <div className="shimmer" style={{
                  width: 32, height: 32, borderRadius: "0.625rem",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <Sparkles style={{ width: 15, height: 15, color: "black" }} />
                </div>
                <div>
                  <p style={{ color: "white", fontWeight: 700, fontSize: "0.8125rem", fontFamily: "Syne, sans-serif", margin: 0 }}>
                    DevHosting IA
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", display: "inline-block" }} />
                    <span style={{ color: "#34d399", fontSize: "0.6875rem" }}>{t.chat.online}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  width: 28, height: 28, borderRadius: "0.5rem", border: "none",
                  background: "transparent", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                <X style={{ width: 15, height: 15 }} />
              </button>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1,
              overflowY: "auto",
              padding: "0.875rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.625rem",
            }}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: msg.role === "user" ? "row-reverse" : "row",
                    alignItems: "flex-start",
                    gap: "0.5rem",
                  }}
                >
                  {/* Avatar */}
                  <div
                    className={msg.role === "assistant" ? "shimmer" : ""}
                    style={{
                      width: 26, height: 26, borderRadius: "0.5rem", flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: msg.role === "user" ? "rgba(255,255,255,0.08)" : undefined,
                      border: msg.role === "user" ? "1px solid rgba(255,255,255,0.1)" : undefined,
                    }}
                  >
                    {msg.role === "assistant"
                      ? <Bot style={{ width: 13, height: 13, color: "black" }} />
                      : <User style={{ width: 13, height: 13, color: "rgba(255,255,255,0.5)" }} />
                    }
                  </div>

                  {/* Bubble */}
                  <div
                    className={msg.role === "user" ? "shimmer" : ""}
                    style={{
                      maxWidth: "75%",
                      padding: "0.5rem 0.75rem",
                      borderRadius: msg.role === "assistant" ? "0.25rem 1rem 1rem 1rem" : "1rem 0.25rem 1rem 1rem",
                      fontSize: "0.8125rem",
                      lineHeight: 1.55,
                      color: msg.role === "user" ? "black" : "rgba(255,255,255,0.88)",
                      background: msg.role === "assistant" ? "rgba(255,255,255,0.06)" : undefined,
                      border: msg.role === "assistant" ? "1px solid rgba(255,255,255,0.07)" : undefined,
                      fontWeight: msg.role === "user" ? 600 : 400,
                      wordBreak: "break-word",
                    }}
                  >
                    {renderMessage(msg.content)}
                  </div>
                </div>
              ))}

              {/* Loading dots */}
              {isLoading && (
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                  <div className="shimmer" style={{
                    width: 26, height: 26, borderRadius: "0.5rem", flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Bot style={{ width: 13, height: 13, color: "black" }} />
                  </div>
                  <div style={{
                    padding: "0.625rem 0.875rem",
                    borderRadius: "0.25rem 1rem 1rem 1rem",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    display: "flex", gap: "0.3rem", alignItems: "center",
                  }}>
                    {[0, 150, 300].map((delay) => (
                      <span key={delay} style={{
                        width: 6, height: 6, borderRadius: "50%", background: "#f59e0b",
                        display: "inline-block", animation: "bounce 1s infinite",
                        animationDelay: `${delay}ms`,
                      }} />
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {messages.length === 1 && !isLoading && initialized && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginTop: "0.25rem" }}>
                  {t.chat.suggestions.map((s, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.07 }}
                      onClick={() => sendMessage(s)}
                      style={{
                        padding: "0.375rem 0.75rem",
                        borderRadius: "0.75rem",
                        border: "1px solid rgba(245,158,11,0.2)",
                        background: "transparent",
                        color: "rgba(245,158,11,0.75)",
                        fontSize: "0.6875rem",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        transition: "all 0.2s",
                      }}
                    >
                      {s}
                    </motion.button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={{
              padding: "0.625rem 0.75rem 0.75rem",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              background: "oklch(0.13 0.008 285)",
              flexShrink: 0,
            }}>
              <div style={{
                display: "flex", alignItems: "center", gap: "0.5rem",
                padding: "0.5rem 0.75rem",
                borderRadius: "0.875rem",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.09)",
              }}>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                  placeholder={t.chat.placeholder}
                  disabled={isLoading}
                  style={{
                    flex: 1, background: "transparent", border: "none", outline: "none",
                    color: "white", fontSize: "0.8125rem",
                  }}
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isLoading}
                  className="shimmer"
                  style={{
                    width: 28, height: 28, borderRadius: "0.5rem", border: "none",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: input.trim() && !isLoading ? "pointer" : "not-allowed",
                    opacity: input.trim() && !isLoading ? 1 : 0.4,
                    flexShrink: 0,
                  }}
                >
                  {isLoading
                    ? <Loader2 style={{ width: 13, height: 13, color: "black", animation: "spin 1s linear infinite" }} />
                    : <Send style={{ width: 13, height: 13, color: "black" }} />
                  }
                </button>
              </div>
              <p style={{ textAlign: "center", fontSize: "0.625rem", color: "rgba(255,255,255,0.18)", margin: "0.375rem 0 0" }}>
{t.chat.poweredBy}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="shimmer"
        style={{
          position: "fixed", bottom: "1.5rem", right: "1rem",
          width: 52, height: 52, borderRadius: "50%", border: "none",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", zIndex: 9999,
          boxShadow: "0 0 30px rgba(245,158,11,0.35)",
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close"
              initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}
            >
              <X style={{ width: 22, height: 22, color: "black" }} />
            </motion.div>
          ) : (
            <motion.div key="chat"
              initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}
            >
              <MessageSquare style={{ width: 22, height: 22, color: "black" }} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
