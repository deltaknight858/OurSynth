"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Copy, RotateCcw, Edit3, Send, User, Bot, Settings, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import HaloButton from "./HaloButton";
import HaloBadge from "./HaloBadge";

export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  status?: "sending" | "streaming" | "complete" | "error";
}

export interface ChatInterfaceProps {
  messages: Message[];
  onSend: (text: string) => void;
  isLoading?: boolean;
  className?: string;
}

const ChatInterface = React.forwardRef<HTMLDivElement, ChatInterfaceProps>(
  ({ messages, onSend, isLoading = false, className }, ref) => {
    const [inputValue, setInputValue] = useState("");
    const [editingMessage, setEditingMessage] = useState<string | null>(null);
    const [editingContent, setEditingContent] = useState("");
    const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Auto-resize textarea
    const adjustTextareaHeight = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    };

    useEffect(() => {
      adjustTextareaHeight();
    }, [inputValue]);

    const handleSend = () => {
      if (inputValue.trim() && !isLoading) {
        onSend(inputValue.trim());
        setInputValue("");
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    };

    const handleCopy = async (messageId: string, content: string) => {
      try {
        await navigator.clipboard.writeText(content);
        setCopiedMessageId(messageId);
        setTimeout(() => setCopiedMessageId(null), 2000);
      } catch (err) {
        console.error("Failed to copy message:", err);
      }
    };

    const handleRetry = (messageId: string) => {
      const messageIndex = messages.findIndex(m => m.id === messageId);
      if (messageIndex > 0) {
        const previousMessage = messages[messageIndex - 1];
        if (previousMessage.role === "user") {
          onSend(previousMessage.content);
        }
      }
    };

    const handleEdit = (messageId: string, content: string) => {
      setEditingMessage(messageId);
      setEditingContent(content);
    };

    const handleEditSave = () => {
      if (editingContent.trim()) {
        onSend(editingContent.trim());
        setEditingMessage(null);
        setEditingContent("");
      }
    };

    const handleEditCancel = () => {
      setEditingMessage(null);
      setEditingContent("");
    };

    const renderMessage = (message: Message) => {
      const isEditing = editingMessage === message.id;
      const roleConfig = {
        user: {
          icon: User,
          badge: "You",
          className: "bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20",
          badgeVariant: "primary" as const
        },
        assistant: {
          icon: Bot,
          badge: "Assistant",
          className: "bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20",
          badgeVariant: "secondary" as const
        },
        system: {
          icon: Settings,
          badge: "System",
          className: "bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20",
          badgeVariant: "tertiary" as const
        }
      };

      const config = roleConfig[message.role];
      const IconComponent = config.icon;

      return (
        <motion.div
          key={message.id}
          className={cn(
            "group p-4 rounded-halo-lg halo-glass border transition-all duration-300",
            config.className,
            message.status === "error" && "border-[rgb(var(--halo-secondary))] bg-[rgba(var(--halo-secondary),0.05)]"
          )}
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-start gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <div className="p-2 rounded-full bg-[rgba(var(--halo-fg),0.08)] border border-[rgba(var(--halo-fg),0.1)]">
                <IconComponent className="w-4 h-4 text-[rgb(var(--halo-fg))]" />
              </div>
              <HaloBadge variant={config.badgeVariant} size="sm">
                {config.badge}
              </HaloBadge>
              {message.status === "streaming" && (
                <motion.div
                  className="flex gap-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 bg-[rgb(var(--halo-primary))] rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <HaloButton
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(message.id, message.content)}
                className="h-8 w-8 p-0"
              >
                {copiedMessageId === message.id ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </HaloButton>
              {message.role === "assistant" && (
                <HaloButton
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRetry(message.id)}
                  className="h-8 w-8 p-0"
                >
                  <RotateCcw className="w-3 h-3" />
                </HaloButton>
              )}
              {message.role === "user" && (
                <HaloButton
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(message.id, message.content)}
                  className="h-8 w-8 p-0"
                >
                  <Edit3 className="w-3 h-3" />
                </HaloButton>
              )}
            </div>
          </div>

          <div className="mt-3 ml-11">
            {isEditing ? (
              <div className="space-y-3">
                <textarea
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  className="w-full min-h-[100px] p-3 rounded-halo bg-[rgba(var(--halo-bg-elev),0.8)] border border-[rgba(var(--halo-fg),0.1)] text-[rgb(var(--halo-fg))] placeholder:text-[rgb(var(--halo-muted))] resize-none halo-focus-ring"
                  placeholder="Edit your message..."
                  autoFocus
                />
                <div className="flex gap-2">
                  <HaloButton variant="primary" size="sm" onClick={handleEditSave}>
                    Send Edit
                  </HaloButton>
                  <HaloButton variant="ghost" size="sm" onClick={handleEditCancel}>
                    Cancel
                  </HaloButton>
                </div>
              </div>
            ) : (
              <MessageContent content={message.content} />
            )}
          </div>
        </motion.div>
      );
    };

    const currentStreamingMessage = messages.find(m => m.status === "streaming");
    const generationProgress = currentStreamingMessage ? 
      Math.min(currentStreamingMessage.content.length / 100, 1) : 0;

    return (
      <div ref={ref} className={cn("flex flex-col h-full", className)}>
        {/* Messages List */}
        <div className="flex-1 overflow-y-auto space-y-4 p-4">
          <AnimatePresence>
            {messages.map((message) => renderMessage(message))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Sticky Generation Status Bar */}
        <AnimatePresence>
          {(isLoading || currentStreamingMessage) && (
            <motion.div
              className="sticky bottom-0 p-3 mx-4 mb-2 rounded-halo-lg halo-glass-strong border border-[rgba(var(--halo-primary),0.2)] backdrop-blur-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="text-xs text-[rgb(var(--halo-muted))] mb-1">
                    {currentStreamingMessage ? "Streaming response..." : "Generating response..."}
                  </div>
                  <div className="h-1.5 bg-[rgba(var(--halo-fg),0.1)] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[rgb(var(--halo-primary))] to-[rgb(var(--halo-secondary))] rounded-full"
                      style={{
                        background: "linear-gradient(90deg, rgb(var(--halo-primary)) 0%, rgb(var(--halo-secondary)) 100%)",
                        boxShadow: "0 0 10px rgba(var(--halo-primary), 0.5)"
                      }}
                      initial={{ width: "0%" }}
                      animate={{ 
                        width: currentStreamingMessage ? `${generationProgress * 100}%` : "100%",
                        x: isLoading && !currentStreamingMessage ? [0, 100, 0] : 0
                      }}
                      transition={
                        isLoading && !currentStreamingMessage
                          ? { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
                          : { duration: 0.3 }
                      }
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Area */}
        <div className="p-4 border-t border-[rgba(var(--halo-fg),0.1)]">
          <div className="relative">
            <div className="flex gap-3 p-3 rounded-halo-lg halo-glass border border-[rgba(var(--halo-fg),0.1)] focus-within:border-[rgba(var(--halo-primary),0.3)] focus-within:shadow-[0_0_20px_rgba(var(--halo-primary),0.1)] transition-all duration-300">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-[rgb(var(--halo-fg))] placeholder:text-[rgb(var(--halo-muted))] resize-none border-none outline-none min-h-[40px] max-h-[200px] text-sm leading-6"
                placeholder="Type your message... (Shift+Enter for new line)"
                rows={1}
                disabled={isLoading}
              />
              <HaloButton
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                className="self-end p-2 h-10 w-10"
                variant="primary"
              >
                <Send className="w-4 h-4" />
              </HaloButton>
            </div>
            <div className="text-xs text-[rgb(var(--halo-muted))] mt-2 px-1">
              Press <kbd className="px-1.5 py-0.5 bg-[rgba(var(--halo-fg),0.1)] rounded text-xs">Enter</kbd> to send, <kbd className="px-1.5 py-0.5 bg-[rgba(var(--halo-fg),0.1)] rounded text-xs">Shift+Enter</kbd> for new line
            </div>
          </div>
        </div>
      </div>
    );
  }
);

const MessageContent: React.FC<{ content: string }> = ({ content }) => {
  // Parse code blocks and regular text
  const parseContent = (text: string) => {
    const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
    const inlineCodeRegex = /`([^`]+)`/g;
    const parts: Array<{ type: "text" | "code" | "inline-code"; content: string; language?: string }> = [];
    let lastIndex = 0;

    // Find code blocks first
    let match;
    const codeBlocks: Array<{ start: number; end: number; language?: string; content: string }> = [];
    
    while ((match = codeBlockRegex.exec(text)) !== null) {
      codeBlocks.push({
        start: match.index,
        end: match.index + match[0].length,
        language: match[1],
        content: match[2].trim()
      });
    }

    // Split text around code blocks
    codeBlocks.forEach((block, index) => {
      // Add text before code block
      if (lastIndex < block.start) {
        const textContent = text.slice(lastIndex, block.start);
        parts.push({ type: "text", content: textContent });
      }
      
      // Add code block
      parts.push({
        type: "code",
        content: block.content,
        language: block.language
      });
      
      lastIndex = block.end;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push({ type: "text", content: text.slice(lastIndex) });
    }

    return parts;
  };

  const renderTextWithInlineCode = (text: string) => {
    const inlineCodeRegex = /`([^`]+)`/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = inlineCodeRegex.exec(text)) !== null) {
      // Add text before inline code
      if (lastIndex < match.index) {
        parts.push(text.slice(lastIndex, match.index));
      }
      
      // Add inline code
      parts.push(
        <code
          key={match.index}
          className="px-1.5 py-0.5 bg-[rgba(var(--halo-fg),0.1)] text-[rgb(var(--halo-primary))] rounded text-sm font-mono"
        >
          {match[1]}
        </code>
      );
      
      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts;
  };

  const parts = parseContent(content);

  return (
    <div className="space-y-3">
      {parts.map((part, index) => (
        <div key={index}>
          {part.type === "code" ? (
            <div className="relative group">
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <HaloButton
                  variant="ghost"
                  size="sm"
                  onClick={() => navigator.clipboard.writeText(part.content)}
                  className="h-8 w-8 p-0 bg-[rgba(var(--halo-bg),0.8)] backdrop-blur-sm"
                >
                  <Copy className="w-3 h-3" />
                </HaloButton>
              </div>
              <SyntaxHighlighter
                language={part.language || "text"}
                style={oneDark}
                customStyle={{
                  background: "rgba(var(--halo-bg-elev), 0.8)",
                  border: "1px solid rgba(var(--halo-fg), 0.1)",
                  borderRadius: "var(--halo-radius)",
                  padding: "1rem",
                  fontSize: "0.875rem",
                  lineHeight: "1.5"
                }}
              >
                {part.content}
              </SyntaxHighlighter>
            </div>
          ) : (
            <div className="text-[rgb(var(--halo-fg))] leading-7 whitespace-pre-wrap">
              {renderTextWithInlineCode(part.content)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

ChatInterface.displayName = "ChatInterface";

export default ChatInterface;