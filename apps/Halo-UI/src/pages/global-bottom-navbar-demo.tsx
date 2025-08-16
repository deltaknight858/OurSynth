import React, { useState } from "react";
import { GlobalBottomNavBar, NavBarItem, HaloCard } from "@/components/halo";
import { Home, Search, Heart, User, Settings, Bell, Plus, MessageCircle, Camera } from "lucide-react";

export default function GlobalBottomNavBarDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [demoVariant, setDemoVariant] = useState<"default" | "five-items" | "minimal">("default");

  // Default navigation items
  const defaultItems: NavBarItem[] = [
    { icon: <Home size={20} />, label: "Home", active: activeIndex === 0 },
    { icon: <Search size={20} />, label: "Search", active: activeIndex === 1 },
    { icon: <Heart size={20} />, label: "Favorites", active: activeIndex === 2 },
    { icon: <User size={20} />, label: "Profile", active: activeIndex === 3 },
  ];

  // Five items variant
  const fiveItems: NavBarItem[] = [
    { icon: <Home size={20} />, label: "Home", active: activeIndex === 0 },
    { icon: <Search size={20} />, label: "Search", active: activeIndex === 1 },
    { icon: <Plus size={18} />, label: "Create", active: activeIndex === 2 },
    { icon: <Bell size={20} />, label: "Notifications", active: activeIndex === 3 },
    { icon: <User size={20} />, label: "Profile", active: activeIndex === 4 },
  ];

  // Minimal three items
  const minimalItems: NavBarItem[] = [
    { icon: <MessageCircle size={20} />, label: "Chat", active: activeIndex === 0 },
    { icon: <Camera size={20} />, label: "Camera", active: activeIndex === 1 },
    { icon: <Settings size={20} />, label: "Settings", active: activeIndex === 2 },
  ];

  const getCurrentItems = () => {
    switch (demoVariant) {
      case "five-items":
        return fiveItems;
      case "minimal":
        return minimalItems;
      default:
        return defaultItems;
    }
  };

  const handleNavChange = (item: NavBarItem, index: number) => {
    setActiveIndex(index);
  };

  const handleVariantChange = (variant: "default" | "five-items" | "minimal") => {
    setDemoVariant(variant);
    setActiveIndex(0); // Reset active index when switching variants
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-blue-50/30 dark:from-neutral-950 dark:via-neutral-900 dark:to-blue-950/30 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg border-b border-neutral-200/50 dark:border-neutral-700/50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent">
            GlobalBottomNavBar Demo
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Mobile-first navigation with neon halo effects and haptic-friendly interactions
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Variant Selector */}
        <HaloCard className="p-6">
          <h2 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-white">
            Navigation Variants
          </h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleVariantChange("default")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                demoVariant === "default"
                  ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              }`}
            >
              Default (4 Items)
            </button>
            <button
              onClick={() => handleVariantChange("five-items")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                demoVariant === "five-items"
                  ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              }`}
            >
              Five Items
            </button>
            <button
              onClick={() => handleVariantChange("minimal")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                demoVariant === "minimal"
                  ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              }`}
            >
              Minimal (3 Items)
            </button>
          </div>
        </HaloCard>

        {/* Current Active Section */}
        <HaloCard className="p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 mb-4 halo-glow-primary">
            {getCurrentItems()[activeIndex]?.icon}
          </div>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
            {getCurrentItems()[activeIndex]?.label} Section
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Currently viewing the {getCurrentItems()[activeIndex]?.label.toLowerCase()} section. 
            The active navigation item has a neon halo effect and enhanced visual feedback.
          </p>
        </HaloCard>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-2 gap-6">
          <HaloCard className="p-6">
            <h3 className="text-lg font-semibold mb-3 text-neutral-900 dark:text-white">
              ✨ Neon Halo Effects
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
              Active navigation items feature a dynamic neon glow with cyan halo effects, 
              enhanced drop shadows, and smooth color transitions that respond to user interactions.
            </p>
          </HaloCard>

          <HaloCard className="p-6">
            <h3 className="text-lg font-semibold mb-3 text-neutral-900 dark:text-white">
              📱 Haptic-Friendly Design
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
              Each navigation item has a minimum 44×44px touch target for optimal mobile 
              interaction, with tactile feedback through scale animations and ripple effects.
            </p>
          </HaloCard>

          <HaloCard className="p-6">
            <h3 className="text-lg font-semibold mb-3 text-neutral-900 dark:text-white">
              🎨 Glassmorphism Backdrop
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
              The navigation bar uses advanced backdrop blur with subtle noise patterns 
              for depth, creating an elegant floating effect over page content.
            </p>
          </HaloCard>

          <HaloCard className="p-6">
            <h3 className="text-lg font-semibold mb-3 text-neutral-900 dark:text-white">
              📐 Safe Area Support
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
              Built-in support for device safe areas using CSS environment variables, 
              ensuring proper spacing on devices with notches or home indicators.
            </p>
          </HaloCard>
        </div>

        {/* Implementation Example */}
        <HaloCard className="p-6">
          <h3 className="text-lg font-semibold mb-3 text-neutral-900 dark:text-white">
            Implementation Example
          </h3>
          <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-neutral-700 dark:text-neutral-300">
{`import { GlobalBottomNavBar, NavBarItem } from "@/components/halo";
import { Home, Search, Heart, User } from "lucide-react";

const items: NavBarItem[] = [
  { icon: <Home size={20} />, label: "Home", active: activeIndex === 0 },
  { icon: <Search size={20} />, label: "Search", active: activeIndex === 1 },
  { icon: <Heart size={20} />, label: "Favorites", active: activeIndex === 2 },
  { icon: <User size={20} />, label: "Profile", active: activeIndex === 3 },
];

<GlobalBottomNavBar 
  items={items} 
  onChange={(item, index) => setActiveIndex(index)} 
/>`}
            </pre>
          </div>
        </HaloCard>

        <div className="h-32" /> {/* Spacer for bottom navigation */}
      </div>

      {/* Global Bottom Navigation Bar */}
      <GlobalBottomNavBar
        items={getCurrentItems()}
        onChange={handleNavChange}
      />
    </div>
  );
}