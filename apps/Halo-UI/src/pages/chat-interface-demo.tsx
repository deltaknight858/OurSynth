import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Sparkles, Zap } from "lucide-react";
import { ChatInterface, Message, HaloButton, HaloCard } from "@/components/halo";

export default function ChatInterfaceDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "system",
      content: "Welcome to Halo UI ChatInterface! I'm here to help you explore the features.",
      status: "complete"
    },
    {
      id: "2",
      role: "assistant",
      content: "Hi there! 👋 I'm your AI assistant. I can help you with:\n\n- Code examples and syntax highlighting\n- Answer questions about web development\n- Demonstrate streaming responses\n- Show off the chat interface features\n\nTry sending me a message with some code like:\n\n```javascript\nconst greeting = \"Hello World\";\nconsole.log(greeting);\n```\n\nOr ask me anything!",
      status: "complete"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (text: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      status: "complete"
    };
    setMessages(prev => [...prev, userMessage]);

    // Simulate AI thinking
    setIsLoading(true);
    
    // Add streaming assistant message
    setTimeout(async () => {
      setIsLoading(false);
      const assistantMessageId = (Date.now() + 1).toString();
      
      const assistantMessage: Message = {
        id: assistantMessageId,
        role: "assistant",
        content: "",
        status: "streaming"
      };
      setMessages(prev => [...prev, assistantMessage]);

      // Simulate streaming response
      const responses = getResponse(text);
      let currentContent = "";
      
      for (let i = 0; i < responses.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 30 + Math.random() * 50));
        currentContent += responses[i];
        
        setMessages(prev => 
          prev.map(msg => 
            msg.id === assistantMessageId 
              ? { ...msg, content: currentContent }
              : msg
          )
        );
      }

      // Mark as complete
      setMessages(prev => 
        prev.map(msg => 
          msg.id === assistantMessageId 
            ? { ...msg, status: "complete" }
            : msg
        )
      );
    }, 1000);
  };

  const getResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes("code") || lowerInput.includes("javascript") || lowerInput.includes("react")) {
      return `Great question about code! Here's a comprehensive example:

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
}

const fetchUser = async (id: string): Promise<User> => {
  const response = await fetch(\`/api/users/\${id}\`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
};

// Usage with React Hook
const useUser = (userId: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchUser(userId)
      .then(setUser)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [userId]);
  
  return { user, loading };
};
\`\`\`

This shows TypeScript interfaces, async/await patterns, error handling, and React hooks! The syntax highlighting makes it easy to read. ✨

Try copying the code block above using the copy button that appears on hover!`;
    }
    
    if (lowerInput.includes("feature") || lowerInput.includes("demo")) {
      return `This ChatInterface has tons of cool features:

🎯 **Message Actions**:
- Copy any message to clipboard
- Retry assistant responses
- Edit and resend your messages

💫 **Streaming Support**:
- Real-time response streaming (like this!)
- Animated typing indicators
- Progress bars with neon glow effects

🎨 **Rich Content**:
- Inline code like \`useState\` and \`useEffect\`
- Full syntax highlighting for code blocks
- Role-based styling (user, assistant, system)

⚡ **UX Delights**:
- Auto-scrolling to new messages
- Textarea auto-resize
- Keyboard shortcuts (Enter to send, Shift+Enter for new line)
- Smooth animations and transitions

Want to see streaming in action? Ask me to "demonstrate streaming" or send a longer message!`;
    }

    if (lowerInput.includes("stream")) {
      return `Here's a demonstration of streaming responses! This text is being typed out character by character, simulating how a real AI assistant would generate responses in real-time.

You can see the streaming indicators (the animated dots) and the progress bar at the bottom while this message is being generated. The progress bar has a beautiful neon gradient that glows as it fills up!

\`\`\`python
# This is how you might implement streaming in Python
import asyncio
import json

async def stream_response(message: str):
    response = generate_ai_response(message)
    
    for chunk in response:
        yield {
            "type": "content",
            "data": chunk
        }
        await asyncio.sleep(0.05)  # Simulate processing time
    
    yield {
        "type": "done",
        "data": None
    }
\`\`\`

The streaming effect makes conversations feel more natural and engaging! ✨`;
    }

    return `Thanks for your message! I can help with various topics:

- **Web Development**: React, TypeScript, Next.js, CSS
- **UI/UX**: Component design, animations, user experience  
- **Code Examples**: With beautiful syntax highlighting
- **Feature Demos**: Try asking about "features" or "streaming"

Feel free to:
- Copy this message using the copy button
- Try the retry button on my responses
- Edit and resend your messages
- Send some code to see the syntax highlighting in action

What would you like to explore? 🚀`;
  };

  const demoMessages = [
    "Show me a JavaScript example",
    "What features does this chat have?",
    "Demonstrate streaming responses",
    "Tell me about React hooks"
  ];

  return (
    <div className="min-h-screen bg-[rgb(var(--halo-bg))] halo-noise">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full halo-glass border border-[rgba(var(--halo-primary),0.2)]">
              <MessageSquare className="w-8 h-8 text-[rgb(var(--halo-primary))]" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[rgb(var(--halo-primary))] to-[rgb(var(--halo-secondary))] bg-clip-text text-transparent">
              ChatInterface
            </h1>
          </div>
          <p className="text-lg text-[rgb(var(--halo-muted))] max-w-2xl mx-auto leading-relaxed">
            A sophisticated chat interface with streaming support, syntax highlighting, message actions, and beautiful animations.
          </p>
        </motion.div>

        {/* Demo Cards */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <HaloCard className="p-6 halo-glass">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-[rgb(var(--halo-primary))]" />
              <h3 className="text-xl font-semibold">Key Features</h3>
            </div>
            <ul className="space-y-2 text-[rgb(var(--halo-muted))]">
              <li>• Role-based message styling</li>
              <li>• Streaming response support</li>
              <li>• Code block syntax highlighting</li>
              <li>• Copy, retry, and edit actions</li>
              <li>• Auto-scrolling and resize</li>
              <li>• Neon progress indicators</li>
            </ul>
          </HaloCard>

          <HaloCard className="p-6 halo-glass">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-[rgb(var(--halo-secondary))]" />
              <h3 className="text-xl font-semibold">Try These Messages</h3>
            </div>
            <div className="space-y-2">
              {demoMessages.map((message, index) => (
                <HaloButton
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-left h-auto p-2 text-[rgb(var(--halo-muted))] hover:text-[rgb(var(--halo-fg))]"
                  onClick={() => handleSend(message)}
                >
                  "{message}"
                </HaloButton>
              ))}
            </div>
          </HaloCard>
        </motion.div>

        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <HaloCard className="h-[600px] p-0 overflow-hidden halo-glass">
            <ChatInterface
              messages={messages}
              onSend={handleSend}
              isLoading={isLoading}
              className="h-full"
            />
          </HaloCard>
        </motion.div>

        {/* Usage Example */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <HaloCard className="p-6 halo-glass">
            <h3 className="text-xl font-semibold mb-4">Usage Example</h3>
            <pre className="bg-[rgba(var(--halo-bg-elev),0.8)] p-4 rounded-halo text-sm overflow-x-auto">
{`import { ChatInterface, Message } from "@/components/halo";

const [messages, setMessages] = useState<Message[]>([]);
const [isLoading, setIsLoading] = useState(false);

const handleSend = (text: string) => {
  // Your send logic here
};

<ChatInterface
  messages={messages}
  onSend={handleSend}
  isLoading={isLoading}
/>`}
            </pre>
          </HaloCard>
        </motion.div>
      </div>
    </div>
  );
}