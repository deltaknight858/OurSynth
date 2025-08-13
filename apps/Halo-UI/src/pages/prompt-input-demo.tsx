import { useState } from "react";
import { motion } from "framer-motion";
import { PromptInput, HaloCard, HaloButton, HaloBadge, HaloSelect } from "@/components/halo";
import { Send, Settings, Sparkles, Bot, User, Zap } from "lucide-react";

export default function PromptInputDemo() {
  const [promptValue, setPromptValue] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{id: string; content: string; role: 'user' | 'assistant'}>>([
    { id: '1', content: 'Hello! I\'m here to help you with anything you need. What would you like to know or discuss?', role: 'assistant' }
  ]);
  const [selectedModel, setSelectedModel] = useState("gpt-4");

  const handlePromptSubmit = (value: string) => {
    const newMessage = {
      id: Date.now().toString(),
      content: value,
      role: 'user' as const
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    setPromptValue("");
    
    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        content: `Thanks for your message: "${value}". This is a demo response showing how the PromptInput integrates with a chat interface.`,
        role: 'assistant' as const
      };
      setChatMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  const models = [
    { value: "gpt-4", label: "GPT-4", icon: <Sparkles className="w-3 h-3" /> },
    { value: "claude-3", label: "Claude 3", icon: <Bot className="w-3 h-3" /> },
    { value: "gemini-pro", label: "Gemini Pro", icon: <Zap className="w-3 h-3" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            PromptInput Component
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            A sophisticated prompt input component with auto-resizing, token counting, keyboard shortcuts, and accessory slots.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: <Settings className="w-5 h-5" />, title: "Auto-resize", desc: "Textarea grows with content" },
            { icon: <Sparkles className="w-5 h-5" />, title: "Token Counter", desc: "Real-time token estimation" },
            { icon: <Zap className="w-5 h-5" />, title: "Shortcuts", desc: "Cmd+K, Enter, Shift+Enter" }
          ].map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <HaloCard className="text-center p-4">
                <div className="text-blue-500 mb-2 flex justify-center">{feature.icon}</div>
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{feature.desc}</p>
              </HaloCard>
            </motion.div>
          ))}
        </div>

        {/* Chat Interface Demo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <HaloCard className="p-0 overflow-hidden">
            <div className="p-4 border-b border-neutral-200/60 dark:border-neutral-700/60 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">AI Assistant</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-xs text-neutral-600 dark:text-neutral-400">Online</span>
                    </div>
                  </div>
                </div>
                <HaloBadge variant="glass">{selectedModel}</HaloBadge>
              </div>
            </div>

            {/* Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                    message.role === 'user' 
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-500'
                  }`}>
                    {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`max-w-[80%] p-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-tr-sm'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-tl-sm'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* PromptInput */}
            <div className="p-4 border-t border-neutral-200/60 dark:border-neutral-700/60 bg-neutral-50/50 dark:bg-neutral-800/50">
              <PromptInput
                value={promptValue}
                onChange={setPromptValue}
                onSubmit={handlePromptSubmit}
                maxTokens={4000}
                placeholderHints={[
                  "Ask me anything...",
                  "What would you like to know?",
                  "How can I help you today?",
                  "Share your thoughts...",
                  "Let's have a conversation!"
                ]}
                leftAddon={
                  <HaloSelect
                    value={selectedModel}
                    onChange={setSelectedModel}
                    options={models}
                    variant="minimal"
                    size="sm"
                  />
                }
                rightAddon={
                  <HaloButton
                    size="sm"
                    variant="glass"
                    onClick={() => promptValue.trim() && handlePromptSubmit(promptValue.trim())}
                    disabled={!promptValue.trim()}
                    className="px-2"
                  >
                    <Send className="w-4 h-4" />
                  </HaloButton>
                }
                minRows={1}
                maxRows={6}
                autoFocus
              />
            </div>
          </HaloCard>
        </motion.div>

        {/* Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold text-center">Component Variants</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Glass Variant */}
            <HaloCard className="space-y-4">
              <h3 className="font-semibold text-center">Glass Variant</h3>
              <PromptInput
                variant="glass"
                placeholder="Glass style prompt..."
                maxTokens={100}
                rightAddon={
                  <HaloButton size="sm" variant="glass" className="px-2">
                    <Send className="w-3 h-3" />
                  </HaloButton>
                }
              />
            </HaloCard>

            {/* Elevated Variant */}
            <HaloCard className="space-y-4">
              <h3 className="font-semibold text-center">Elevated Variant</h3>
              <PromptInput
                variant="elevated"
                placeholder="Elevated style prompt..."
                maxTokens={100}
                rightAddon={
                  <HaloButton size="sm" variant="primary" className="px-2">
                    <Send className="w-3 h-3" />
                  </HaloButton>
                }
              />
            </HaloCard>

            {/* Minimal Variant */}
            <HaloCard className="space-y-4">
              <h3 className="font-semibold text-center">Minimal Variant</h3>
              <PromptInput
                variant="minimal"
                placeholder="Minimal style prompt..."
                maxTokens={100}
                rightAddon={
                  <HaloButton size="sm" variant="ghost" className="px-2">
                    <Send className="w-3 h-3" />
                  </HaloButton>
                }
              />
            </HaloCard>
          </div>
        </motion.div>

        {/* Usage Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <HaloCard className="p-6">
            <h3 className="text-xl font-bold mb-4">Keyboard Shortcuts</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 rounded bg-neutral-200 dark:bg-neutral-700 text-xs">
                  {typeof navigator !== 'undefined' && navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'}+K
                </kbd>
                <span>Open Command Center</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 rounded bg-neutral-200 dark:bg-neutral-700 text-xs">Enter</kbd>
                <span>Submit message</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 rounded bg-neutral-200 dark:bg-neutral-700 text-xs">Shift+Enter</kbd>
                <span>New line</span>
              </div>
            </div>
          </HaloCard>
        </motion.div>
      </div>
    </div>
  );
}