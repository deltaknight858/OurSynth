
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Command as CommandIcon, 
  ArrowLeft, 
  Home, 
  Settings, 
  HelpCircle,
  Zap,
  Navigation,
  Eye,
  Code,
  RotateCcw,
  Moon,
  Sun,
  Github,
  ExternalLink,
  Copy,
  Share2,
  Bell
} from "lucide-react";
import ThemeLayout from "@/components/layout/ThemeLayout";
import { 
  HaloCard, 
  HaloButton, 
  HaloBadge, 
  CommandCenter, 
  HaloAlert,
  HaloProgress,
  HaloSpinner
} from "@/components/halo";
import { useCommandCenter, useRegisterCommands } from "@/hooks/useCommandCenter";
import { useTheme } from "@/contexts/ThemeContext";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function CommandCenterDemo() {
  const { isOpen, setIsOpen } = useCommandCenter();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [showAlert, setShowAlert] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  // Register demo commands
  const demoCommands = [
    // Navigation Commands
    {
      id: "navigate-home",
      title: "Go to Home",
      description: "Navigate to the main homepage",
      group: "Navigation" as const,
      keywords: ["home", "main", "index"],
      icon: Home,
      shortcut: "Ctrl+H",
      run: () => {
        window.location.href = "/";
      }
    },
    {
      id: "navigate-toast-demo",
      title: "Toast Demo",
      description: "View the toast notification system",
      group: "Navigation" as const,
      keywords: ["toast", "notifications", "demo"],
      icon: Bell,
      run: () => {
        window.location.href = "/toast-demo";
      }
    },
    {
      id: "navigate-navbar-demo",
      title: "Bottom NavBar Demo",
      description: "View the global bottom navigation bar",
      group: "Navigation" as const,
      keywords: ["navbar", "navigation", "bottom"],
      icon: Navigation,
      run: () => {
        window.location.href = "/global-bottom-navbar-demo";
      }
    },

    // Action Commands
    {
      id: "toggle-theme",
      title: "Toggle Theme",
      description: "Switch between light and dark themes",
      group: "Actions" as const,
      keywords: ["theme", "dark", "light", "mode"],
      icon: theme === "dark" ? Sun : Moon,
      shortcut: "Ctrl+T",
      run: () => {
        setTheme(theme === "dark" ? "light" : "dark");
        toast({
          title: "Theme Changed",
          description: `Switched to ${theme === "dark" ? "light" : "dark"} theme`,
        });
      }
    },
    {
      id: "show-alert",
      title: "Show Alert",
      description: "Display a sample alert notification",
      group: "Actions" as const,
      keywords: ["alert", "notification", "show", "display"],
      icon: Bell,
      run: () => {
        setShowAlert(true);
        toast({
          title: "Alert Displayed",
          description: "Sample alert has been shown",
        });
      }
    },
    {
      id: "copy-url",
      title: "Copy Current URL",
      description: "Copy the current page URL to clipboard",
      group: "Actions" as const,
      keywords: ["copy", "url", "clipboard", "link"],
      icon: Copy,
      shortcut: "Ctrl+L",
      run: () => {
        navigator.clipboard.writeText(window.location.href);
        toast({
          title: "URL Copied",
          description: "Current page URL copied to clipboard",
        });
      }
    },
    {
      id: "start-loading",
      title: "Start Loading Demo",
      description: "Demonstrate loading state with progress",
      group: "Actions" as const,
      keywords: ["loading", "progress", "demo", "spinner"],
      icon: RotateCcw,
      run: () => {
        setIsLoading(true);
        setProgress(0);
        
        const interval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 100) {
              clearInterval(interval);
              setIsLoading(false);
              toast({
                title: "Loading Complete",
                description: "Demo loading sequence finished",
              });
              return 100;
            }
            return prev + 10;
          });
        }, 200);
      }
    },
    {
      id: "share-page",
      title: "Share Page",
      description: "Share current page via Web Share API",
      group: "Actions" as const,
      keywords: ["share", "web", "api", "social"],
      icon: Share2,
      run: async () => {
        if (navigator.share) {
          try {
            await navigator.share({
              title: "Command Center Demo - Halo UI",
              text: "Check out this amazing command palette!",
              url: window.location.href,
            });
          } catch {
            console.log("Share cancelled");
          }
        } else {
          navigator.clipboard.writeText(window.location.href);
          toast({
            title: "URL Copied",
            description: "Sharing not supported, URL copied instead",
          });
        }
      }
    },

    // Help Commands
    {
      id: "keyboard-shortcuts",
      title: "View Keyboard Shortcuts",
      description: "Display all available keyboard shortcuts",
      group: "Help" as const,
      keywords: ["shortcuts", "keyboard", "help", "keys"],
      icon: HelpCircle,
      shortcut: "?",
      run: () => {
        toast({
          title: "Keyboard Shortcuts",
          description: "⌘K: Open Command Palette, Ctrl+T: Toggle Theme, ?: Help",
        });
      }
    },
    {
      id: "documentation",
      title: "View Documentation",
      description: "Open component documentation",
      group: "Help" as const,
      keywords: ["docs", "documentation", "help", "guide"],
      icon: ExternalLink,
      run: () => {
        toast({
          title: "Documentation",
          description: "Opening documentation in new tab...",
        });
        // In real app, would open actual docs
      }
    },
    {
      id: "github-repo",
      title: "GitHub Repository",
      description: "View source code on GitHub",
      group: "Help" as const,
      keywords: ["github", "source", "code", "repository"],
      icon: Github,
      run: () => {
        toast({
          title: "GitHub Repository",
          description: "Opening repository in new tab...",
        });
        // In real app, would open actual repo
      }
    },

    // System Commands
    {
      id: "refresh-page",
      title: "Refresh Page",
      description: "Reload the current page",
      group: "System" as const,
      keywords: ["refresh", "reload", "page"],
      icon: RotateCcw,
      shortcut: "F5",
      run: () => {
        window.location.reload();
      }
    },
    {
      id: "toggle-fullscreen",
      title: "Toggle Fullscreen",
      description: "Enter or exit fullscreen mode",
      group: "System" as const,
      keywords: ["fullscreen", "full", "screen", "mode"],
      icon: ExternalLink,
      shortcut: "F11",
      run: () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
          toast({
            title: "Fullscreen Enabled",
            description: "Press F11 or Esc to exit fullscreen",
          });
        } else {
          document.exitFullscreen();
          toast({
            title: "Fullscreen Disabled",
            description: "Returned to normal view",
          });
        }
      }
    }
  ];

  useRegisterCommands(demoCommands);

  return (
    <ThemeLayout>
      <div className="min-h-screen halo-noise relative overflow-x-hidden">
        {/* Alert */}
        {showAlert && (
          <div className="fixed top-16 left-4 right-4 z-40 flex justify-center">
            <HaloAlert
              variant="success"
              title="Command Executed"
              description="This alert was triggered via the command palette!"
              dismissible
              onDismiss={() => setShowAlert(false)}
              className="max-w-md"
            />
          </div>
        )}

        {/* Header */}
        <motion.header 
          className="sticky top-0 z-30 bg-gradient-to-br from-[rgba(var(--halo-bg),0.95)] to-[rgba(var(--halo-bg),0.9)] backdrop-blur-xl border-b border-[rgba(var(--halo-fg),0.1)]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <HaloButton variant="ghost" size="sm" className="p-2">
                  <ArrowLeft size={18} />
                </HaloButton>
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-[rgb(var(--halo-fg))]">Command Center</h1>
                <p className="text-sm text-[rgb(var(--halo-muted))]">Keyboard-driven command palette</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <HaloBadge variant="primary" size="sm" className="hidden md:flex">
                Press ⌘K or Ctrl+K
              </HaloBadge>
              <HaloButton 
                variant="primary" 
                size="sm"
                onClick={() => setIsOpen(true)}
              >
                <CommandIcon size={16} />
                Open Palette
              </HaloButton>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <motion.main 
          className="px-4 py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-6">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[rgb(var(--halo-primary))] to-[rgb(var(--halo-secondary))] text-white mb-6 halo-glow-primary">
                  <CommandIcon size={32} />
                </div>
                
                <h2 className="text-4xl font-light mb-4">
                  <span className="halo-text-glow-primary">Command</span>{" "}
                  <span className="text-[rgb(var(--halo-fg))]">Center</span>
                </h2>
                
                <p className="text-xl text-[rgb(var(--halo-muted))] max-w-2xl mx-auto">
                  Lightning-fast command palette with fuzzy search, keyboard navigation, and organized command groups. 
                  Press <kbd className="px-2 py-1 bg-[rgba(var(--halo-fg),0.1)] rounded border text-sm font-mono">⌘K</kbd> to get started.
                </p>
              </motion.div>
            </div>

            {/* Demo Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Features Card */}
              <HaloCard variant="glass" glow="primary" className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="text-[rgb(var(--halo-primary))] h-6 w-6" />
                  <h3 className="text-xl font-semibold">Features</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[rgb(var(--halo-primary))]"></div>
                    <span className="text-[rgb(var(--halo-fg))]">Fuzzy search with smart scoring</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[rgb(var(--halo-secondary))]"></div>
                    <span className="text-[rgb(var(--halo-fg))]">Full keyboard navigation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[rgb(var(--halo-tertiary))]"></div>
                    <span className="text-[rgb(var(--halo-fg))]">Organized command groups</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[rgb(var(--halo-primary))]"></div>
                    <span className="text-[rgb(var(--halo-fg))]">Custom keyboard shortcuts</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[rgb(var(--halo-secondary))]"></div>
                    <span className="text-[rgb(var(--halo-fg))]">Accessibility-first design</span>
                  </div>
                </div>
              </HaloCard>

              {/* Usage Card */}
              <HaloCard variant="elevated" className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Code className="text-[rgb(var(--halo-secondary))] h-6 w-6" />
                  <h3 className="text-xl font-semibold">Usage</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-[rgba(var(--halo-fg),0.05)] rounded-lg p-4 border border-[rgba(var(--halo-fg),0.1)]">
                    <p className="text-sm text-[rgb(var(--halo-muted))] mb-2">Register a command:</p>
                    <code className="text-xs text-[rgb(var(--halo-fg))] font-mono">
                      {`registerCommand({
  id: "my-command",
  title: "My Command",
  group: "Actions",
  run: () => { ... }
})`}
                    </code>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-[rgb(var(--halo-fg))]">Keyboard Shortcuts:</p>
                    <div className="flex flex-wrap gap-2">
                      <kbd className="px-2 py-1 bg-[rgba(var(--halo-fg),0.1)] rounded border text-xs font-mono">⌘K</kbd>
                      <kbd className="px-2 py-1 bg-[rgba(var(--halo-fg),0.1)] rounded border text-xs font-mono">Ctrl+K</kbd>
                      <span className="text-xs text-[rgb(var(--halo-muted))]">Open palette</span>
                    </div>
                  </div>
                </div>
              </HaloCard>

              {/* Command Groups */}
              <HaloCard variant="glass" glow="secondary" className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Navigation className="text-[rgb(var(--halo-secondary))] h-6 w-6" />
                  <h3 className="text-xl font-semibold">Command Groups</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Navigation size={16} className="text-[rgb(var(--halo-primary))]" />
                      <span className="text-sm text-[rgb(var(--halo-fg))]">Navigation</span>
                    </div>
                    <HaloBadge variant="primary" size="sm">3 commands</HaloBadge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap size={16} className="text-[rgb(var(--halo-secondary))]" />
                      <span className="text-sm text-[rgb(var(--halo-fg))]">Actions</span>
                    </div>
                    <HaloBadge variant="secondary" size="sm">5 commands</HaloBadge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <HelpCircle size={16} className="text-[rgb(var(--halo-tertiary))]" />
                      <span className="text-sm text-[rgb(var(--halo-fg))]">Help</span>
                    </div>
                    <HaloBadge variant="tertiary" size="sm">3 commands</HaloBadge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Settings size={16} className="text-[rgb(var(--halo-muted))]" />
                      <span className="text-sm text-[rgb(var(--halo-fg))]">System</span>
                    </div>
                    <HaloBadge variant="ghost" size="sm">2 commands</HaloBadge>
                  </div>
                </div>
              </HaloCard>

              {/* Interactive Demo */}
              <HaloCard variant="elevated" glow="tertiary" className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Eye className="text-[rgb(var(--halo-tertiary))] h-6 w-6" />
                  <h3 className="text-xl font-semibold">Try It Out</h3>
                </div>
                
                <div className="space-y-4">
                  <p className="text-sm text-[rgb(var(--halo-muted))]">
                    Click the buttons below or use the command palette to test various actions.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <HaloButton 
                      variant="primary" 
                      size="sm" 
                      className="w-full"
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    >
                      Toggle Theme
                    </HaloButton>
                    
                    <HaloButton 
                      variant="secondary" 
                      size="sm" 
                      className="w-full"
                      onClick={() => setShowAlert(true)}
                    >
                      Show Alert
                    </HaloButton>
                  </div>
                  
                  {isLoading && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <HaloSpinner size="sm" variant="primary" />
                        <span className="text-sm text-[rgb(var(--halo-muted))]">Loading demo...</span>
                      </div>
                      <HaloProgress value={progress} variant="primary" showValue animated />
                    </div>
                  )}
                </div>
              </HaloCard>
            </div>

            {/* Call to Action */}
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-lg text-[rgb(var(--halo-muted))] mb-6">
                Ready to experience the command palette?
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <HaloButton 
                  variant="primary" 
                  size="lg"
                  onClick={() => setIsOpen(true)}
                >
                  <CommandIcon size={18} />
                  Open Command Palette
                </HaloButton>
                
                <Link href="/">
                  <HaloButton variant="glass" size="lg">
                    <Home size={18} />
                    Back to Showcase
                  </HaloButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.main>

        {/* Command Center */}
        <CommandCenter
          open={isOpen}
          onOpenChange={setIsOpen}
          placeholder="Search commands or type to filter..."
        />

        <Toaster />
      </div>
    </ThemeLayout>
  );
}