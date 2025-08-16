
"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  HaloButton,
  HaloCard,
  HaloInput,
  HaloDialog,
  HaloBadge,
  HaloTooltip,
  HaloToggle,
  HaloProgress,
  HaloSelect,
  HaloCheckbox,
  HaloSlider,
  HaloTabs,
  HaloAlert,
  HaloSpinner,
  HaloAvatar,
  ThemeToggle,
  CommandCenter 
} from "@/components/halo";
import { useCommandCenter, useRegisterCommands } from "@/hooks/useCommandCenter";
import { Sparkles, Wand2, Stars, Settings, Code, Users, Bell, ArrowRight, Command as CommandIcon, Home, HelpCircle, MessageSquare, Edit3, Zap } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import ThemeLayout from "@/components/layout/ThemeLayout";
import { useTheme } from "@/contexts/ThemeContext";
import { useToast } from "@/hooks/use-toast";

export default function HaloShowcase() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [progress, setProgress] = React.useState(67);
  const [sliderValue, setSliderValue] = React.useState(42);
  const [activeTab, setActiveTab] = React.useState("components");
  const [showAlert, setShowAlert] = React.useState(true);
  const [toggleStates, setToggleStates] = React.useState({
    notifications: true,
    darkMode: false,
    animations: true
  });
  const [checkboxStates, setCheckboxStates] = React.useState({
    terms: false,
    marketing: true,
    newsletter: false
  });
  const [selectValue, setSelectValue] = React.useState("");

  const { isOpen, setIsOpen } = useCommandCenter();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  // Register global commands for the main app
  const globalCommands = [
    {
      id: "navigate-home",
      title: "Go to Home",
      description: "Navigate to the main homepage",
      group: "Navigation" as const,
      keywords: ["home", "main", "index"],
      icon: Home,
      shortcut: "Ctrl+H",
      run: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      id: "navigate-command-demo",
      title: "Command Center Demo",
      description: "View the command palette demonstration",
      group: "Navigation" as const,
      keywords: ["command", "palette", "demo"],
      icon: CommandIcon,
      run: () => {
        window.location.href = "/command-center-demo";
      }
    },
    {
      id: "navigate-chat-demo",
      title: "Chat Interface Demo",
      description: "Experience the advanced chat interface with streaming",
      group: "Navigation" as const,
      keywords: ["chat", "interface", "messaging", "ai", "streaming"],
      icon: MessageSquare,
      run: () => {
        window.location.href = "/chat-interface-demo";
      }
    },
    {
      id: "navigate-toast-demo",
      title: "Toast Demo",
      description: "View the toast notification system",
      group: "Navigation" as const,
      keywords: ["toast", "notifications"],
      icon: Bell,
      run: () => {
        window.location.href = "/toast-demo";
      }
    },
    {
      id: "toggle-theme",
      title: "Toggle Theme",
      description: "Switch between light and dark themes",
      group: "Actions" as const,
      keywords: ["theme", "dark", "light", "mode"],
      icon: theme === "dark" ? Sparkles : Stars,
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
      id: "open-dialog",
      title: "Open Welcome Dialog",
      description: "Display the main welcome dialog",
      group: "Actions" as const,
      keywords: ["dialog", "modal", "welcome"],
      icon: Wand2,
      run: () => {
        setDialogOpen(true);
      }
    },
    {
      id: "help-shortcuts",
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
    }
  ];

  useRegisterCommands(globalCommands);

  const selectOptions = [
    { value: "design", label: "Design System" },
    { value: "components", label: "Components" },
    { value: "animations", label: "Animations" },
    { value: "glassmorphism", label: "Glassmorphism" }
  ];

  const tabData = [
    {
      id: "components",
      label: "Components",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-[rgb(var(--halo-fg))] mb-3">Form Controls</h4>
              <div className="space-y-3">
                <HaloButton variant="primary" size="sm" className="w-full">Primary Button</HaloButton>
                <HaloButton variant="secondary" size="sm" className="w-full">Secondary Button</HaloButton>
                <HaloButton variant="glass" size="sm" className="w-full">Glass Button</HaloButton>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-[rgb(var(--halo-fg))] mb-3">Feedback</h4>
              <div className="flex items-center gap-2 mb-3">
                <HaloSpinner size="sm" variant="primary" />
                <span className="text-sm text-[rgb(var(--halo-muted))]">Loading...</span>
              </div>
              <div className="flex gap-2">
                <HaloBadge variant="primary" size="sm">New</HaloBadge>
                <HaloBadge variant="tertiary" size="sm">Beta</HaloBadge>
                <HaloBadge variant="ghost" size="sm">Draft</HaloBadge>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "forms",
      label: "Forms",
      content: (
        <div className="space-y-4">
          <HaloCheckbox
            label="Accept Terms & Conditions"
            description="By checking this box, you agree to our terms of service"
            checked={checkboxStates.terms}
            onChange={(e) => setCheckboxStates({...checkboxStates, terms: e.target.checked})}
          />
          <HaloCheckbox
            label="Marketing Communications"
            checked={checkboxStates.marketing}
            onChange={(e) => setCheckboxStates({...checkboxStates, marketing: e.target.checked})}
            variant="secondary"
          />
          <HaloSlider
            label="Volume"
            value={sliderValue}
            onChange={setSliderValue}
            showValue
            variant="tertiary"
          />
        </div>
      )
    },
    {
      id: "showcase",
      label: "Showcase",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <HaloAvatar fallback="JD" status="online" />
            <HaloAvatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="User" status="away" />
            <HaloAvatar fallback="AI" variant="rounded" status="busy" />
            <HaloAvatar fallback="SY" variant="square" size="lg" />
          </div>
          <p className="text-[rgb(var(--halo-muted))] text-sm">
            Experience the complete design system with consistent theming, smooth animations, and accessibility-first approach.
          </p>
        </div>
      )
    }
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 1));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeLayout>
      <div className="min-h-screen halo-noise relative overflow-x-hidden">
        <ThemeToggle />
        
        {/* Alert Banner */}
        {showAlert && (
          <div className="fixed top-16 left-4 right-4 z-40 flex justify-center">
            <HaloAlert
              variant="info"
              title="Welcome to Halo UI"
              description="Experience the complete design system with glassmorphism and neon accents. Press ⌘K to open the command palette!"
              dismissible
              onDismiss={() => setShowAlert(false)}
              className="max-w-md"
            />
          </div>
        )}
        
        {/* Hero Section */}
        <motion.section 
          className="relative pt-16 pb-24 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              className="mb-8"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <HaloBadge variant="primary" className="mb-6">
                <Sparkles size={14} className="mr-1" />
                Design System
              </HaloBadge>
              
              <h1 className="text-6xl md:text-7xl font-light mb-6 tracking-tight">
                <span className="halo-text-glow-primary">Halo</span>{" "}
                <span className="text-[rgb(var(--halo-fg))]">UI</span>
              </h1>
              
              <p className="text-xl text-[rgb(var(--halo-muted))] max-w-2xl mx-auto leading-relaxed">
                Cinematic glassmorphism components with neon accents. 
                Accessibility-first design meets stunning visual effects.
              </p>
              
              <div className="flex items-center justify-center gap-2 mt-6">
                <HaloBadge variant="glass" size="sm" className="animate-pulse">
                  <CommandIcon size={12} className="mr-1" />
                  Press ⌘K for commands
                </HaloBadge>
              </div>
            </motion.div>
            
            <motion.div
              className="flex flex-wrap gap-4 justify-center mb-12"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <HaloButton variant="primary" size="lg" onClick={() => setDialogOpen(true)}>
                <Wand2 size={18} />
                Open Dialog
              </HaloButton>
              
              <HaloTooltip content="Try the command palette - Press ⌘K" side="bottom">
                <HaloButton variant="glass" size="lg" onClick={() => setIsOpen(true)}>
                  <CommandIcon size={18} />
                  Command Palette
                </HaloButton>
              </HaloTooltip>
              
              <HaloButton variant="tertiary" size="lg">
                <Stars size={18} />
                Get Started
              </HaloButton>
            </motion.div>
          </div>
        </motion.section>

        {/* Components Showcase Grid */}
        <motion.section 
          className="px-4 pb-24"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Interactive Tabs Component */}
              <HaloCard variant="glass" glow="primary" className="p-6 col-span-1 lg:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <Code className="text-[rgb(var(--halo-primary))] h-6 w-6" />
                  <h3 className="text-xl font-semibold">Interactive Components</h3>
                </div>
                
                <HaloTabs
                  tabs={tabData}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  variant="glass"
                />
              </HaloCard>

              {/* Forms & Controls */}
              <HaloCard variant="elevated" className="p-6">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Settings className="text-[rgb(var(--halo-secondary))] h-5 w-5" />
                  Form Controls
                </h3>
                
                <div className="space-y-6">
                  <HaloInput
                    label="Username"
                    placeholder="Enter username"
                    variant="elevated"
                    size="sm"
                  />
                  
                  <HaloSelect
                    label="Preferences"
                    options={selectOptions}
                    value={selectValue}
                    onChange={setSelectValue}
                    placeholder="Choose option"
                    variant="elevated"
                    size="sm"
                  />
                  
                  <div className="space-y-4">
                    <HaloToggle
                      label="Notifications"
                      checked={toggleStates.notifications}
                      onChange={(checked) => setToggleStates({...toggleStates, notifications: checked})}
                      variant="primary"
                      size="sm"
                    />
                    
                    <HaloToggle
                      label="Auto-save"
                      checked={toggleStates.animations}
                      onChange={(checked) => setToggleStates({...toggleStates, animations: checked})}
                      variant="tertiary"
                      size="sm"
                    />
                  </div>
                </div>
              </HaloCard>

              {/* Progress & Feedback */}
              <HaloCard variant="glass" glow="tertiary" className="p-6">
                <h3 className="text-xl font-semibold mb-6">Progress & Feedback</h3>
                
                <div className="space-y-6">
                  <HaloProgress
                    value={progress}
                    variant="primary"
                    showValue
                    animated
                  />
                  
                  <HaloSlider
                    label="Brightness"
                    value={sliderValue}
                    onChange={setSliderValue}
                    showValue
                    variant="secondary"
                    size="sm"
                  />
                  
                  <div className="flex items-center justify-between">
                    <HaloSpinner size="sm" variant="tertiary" />
                    <div className="flex gap-2">
                      <HaloAvatar fallback="AI" size="sm" status="online" />
                      <HaloAvatar fallback="UI" size="sm" status="away" variant="rounded" />
                    </div>
                  </div>
                </div>
              </HaloCard>

              {/* User Profiles */}
              <HaloCard variant="elevated" glow="secondary" className="p-6">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Users className="text-[rgb(var(--halo-secondary))] h-5 w-5" />
                  Team Members
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <HaloAvatar 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" 
                      alt="Team member"
                      status="online"
                    />
                    <div>
                      <p className="text-sm font-medium text-[rgb(var(--halo-fg))]">Alex Chen</p>
                      <p className="text-xs text-[rgb(var(--halo-muted))]">Lead Designer</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <HaloAvatar fallback="SM" status="away" variant="rounded" />
                    <div>
                      <p className="text-sm font-medium text-[rgb(var(--halo-fg))]">Sarah Miller</p>
                      <p className="text-xs text-[rgb(var(--halo-muted))]">Frontend Dev</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <HaloAvatar fallback="JD" status="busy" variant="square" />
                    <div>
                      <p className="text-sm font-medium text-[rgb(var(--halo-fg))]">Jordan Davis</p>
                      <p className="text-xs text-[rgb(var(--halo-muted))]">UX Engineer</p>
                    </div>
                  </div>
                </div>
              </HaloCard>

              {/* Interactive Checkboxes */}
              <HaloCard variant="minimal" className="p-6">
                <h3 className="text-xl font-semibold mb-6">Preferences</h3>
                
                <div className="space-y-4">
                  <HaloCheckbox
                    label="Email Notifications"
                    description="Receive updates via email"
                    checked={checkboxStates.terms}
                    onChange={(e) => setCheckboxStates({...checkboxStates, terms: e.target.checked})}
                    variant="primary"
                  />
                  
                  <HaloCheckbox
                    label="Marketing Updates"
                    checked={checkboxStates.marketing}
                    onChange={(e) => setCheckboxStates({...checkboxStates, marketing: e.target.checked})}
                    variant="secondary"
                  />
                  
                  <HaloCheckbox
                    label="Newsletter Subscription"
                    checked={checkboxStates.newsletter}
                    onChange={(e) => setCheckboxStates({...checkboxStates, newsletter: e.target.checked})}
                    variant="tertiary"
                    size="lg"
                  />
                </div>
              </HaloCard>

              {/* Status & Loading */}
              <HaloCard variant="glass" className="p-6">
                <h3 className="text-xl font-semibold mb-6">Status Indicators</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[rgb(var(--halo-fg))]">Loading states</span>
                    <HaloSpinner size="sm" variant="primary" />
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <HaloBadge variant="primary" size="sm">Active</HaloBadge>
                    <HaloBadge variant="secondary" size="sm" pulse>Live</HaloBadge>
                    <HaloBadge variant="tertiary" size="sm">Premium</HaloBadge>
                    <HaloBadge variant="glass" size="sm">Draft</HaloBadge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <HaloButton variant="ghost" size="sm" className="w-full" loading>
                      Processing
                    </HaloButton>
                    <HaloButton variant="primary" size="sm" className="w-full">
                      Complete
                    </HaloButton>
                  </div>
                </div>
              </HaloCard>
            </div>
          </div>
        </motion.section>

        {/* Dialog Component */}
        <HaloDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          title="Welcome to Halo UI"
          description="Experience the future of component design with glassmorphism and neon accents."
        >
          <div className="space-y-4">
            <p className="text-[rgb(var(--halo-muted))]">
              This comprehensive design system combines accessibility with stunning visual effects. 
              Every component is keyboard navigable and screen reader friendly.
            </p>
            
            <div className="space-y-3">
              <HaloCheckbox
                label="I understand the component capabilities"
                checked={checkboxStates.terms}
                onChange={(e) => setCheckboxStates({...checkboxStates, terms: e.target.checked})}
                size="sm"
              />
            </div>
            
            <div className="flex gap-3 justify-end pt-4">
              <HaloButton 
                variant="ghost" 
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </HaloButton>
              <HaloButton 
                variant="primary"
                onClick={() => setDialogOpen(false)}
              >
                Get Started
              </HaloButton>
            </div>
          </div>
        </HaloDialog>

        {/* Footer */}
        <footer className="border-t border-[rgba(var(--halo-fg),0.1)] py-12 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-[rgb(var(--halo-muted))] mb-4">
              Built with React, TypeScript, Framer Motion, and Tailwind CSS
            </p>
            <div className="flex justify-center gap-2">
              <HaloBadge variant="glass" size="sm">Glassmorphism</HaloBadge>
              <HaloBadge variant="glass" size="sm">Accessibility First</HaloBadge>
              <HaloBadge variant="glass" size="sm">Neon Accents</HaloBadge>
              <HaloBadge variant="glass" size="sm">Tree Shakeable</HaloBadge>
            </div>
          </div>
        </footer>

        <section className="py-20 bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent">
                Component Showcase
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Explore our comprehensive collection of beautifully designed components
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Command Center Demo Link */}
              <Link href="/command-center-demo" passHref>
                <Card className="h-full border-neutral-200/60 hover:border-purple-300/60 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      <CommandIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Command Center</h3>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        Lightning-fast command palette with fuzzy search, keyboard navigation, and organized command groups
                      </p>
                    </div>
                    <div className="flex items-center text-purple-600 dark:text-purple-400 text-sm font-medium">
                      Explore Demo
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* Chat Interface Demo Link */}
              <Link href="/chat-interface-demo" passHref>
                <Card className="h-full border-neutral-200/60 hover:border-emerald-300/60 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      <MessageSquare className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Chat Interface</h3>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        Advanced chat component with streaming responses, syntax highlighting, and interactive message actions
                      </p>
                    </div>
                    <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                      Explore Demo
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* Toast Demo Link */}
              <Link href="/toast-demo" passHref>
                <Card className="h-full border-neutral-200/60 hover:border-blue-300/60 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      <Bell className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Toast System</h3>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        Portal-based notifications with neon highlights, multiple positions, and smooth animations
                      </p>
                    </div>
                    <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                      Explore Demo
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* GlobalBottomNavBar Demo Link */}
              <Link href="/global-bottom-navbar-demo" passHref>
                <Card className="h-full border-neutral-200/60 hover:border-cyan-300/60 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      <Settings className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">GlobalBottomNavBar</h3>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        Mobile-first navigation with neon halo effects, haptic-friendly touch targets, and safe area support
                      </p>
                    </div>
                    <div className="flex items-center text-cyan-600 dark:text-cyan-400 text-sm font-medium">
                      Explore Demo
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* PromptInput Demo Link */}
              <Link href="/prompt-input-demo" passHref>
                <Card className="h-full border-neutral-200/60 hover:border-emerald-300/60 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      <Edit3 className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">PromptInput</h3>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        Sophisticated prompt input with auto-resize, token counting, keyboard shortcuts, and accessory slots.
                      </p>
                    </div>
                    <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                      Explore Demo
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* StepWizard Demo Link */}
              <Link href="/step-wizard-demo" passHref>
                <Card className="h-full border-neutral-200/60 hover:border-orange-300/60 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      <Zap className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Step Wizard</h3>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        Multi-step flow with progress tracking, validation, optional steps, and persistent state management.
                      </p>
                    </div>
                    <div className="flex items-center text-orange-600 dark:text-orange-400 text-sm font-medium">
                      Explore Demo
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Global Command Center */}
        <CommandCenter
          open={isOpen}
          onOpenChange={setIsOpen}
          placeholder="Search commands or navigate..."
        />

        <Toaster />
      </div>
    </ThemeLayout>
  )
}