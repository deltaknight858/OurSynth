"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface HaloTab {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface HaloTabsProps {
  tabs: HaloTab[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  variant?: "glass" | "elevated" | "minimal";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function HaloTabs({
  tabs,
  activeTab,
  onTabChange,
  variant = "glass",
  size = "md",
  className
}: HaloTabsProps) {
  const [internalActiveTab, setInternalActiveTab] = React.useState(tabs[0]?.id || "");
  
  const currentActiveTab = activeTab ?? internalActiveTab;
  const currentTab = tabs.find(tab => tab.id === currentActiveTab);

  const handleTabChange = (tabId: string) => {
    if (onTabChange) {
      onTabChange(tabId);
    } else {
      setInternalActiveTab(tabId);
    }
  };

  const sizeClasses = {
    sm: { tab: "px-3 py-2 text-sm", content: "p-4" },
    md: { tab: "px-4 py-3 text-sm", content: "p-6" },
    lg: { tab: "px-6 py-4 text-base", content: "p-8" }
  };

  const variantClasses = {
    glass: {
      container: "halo-glass rounded-halo",
      tabList: "border-b border-[rgba(var(--halo-fg),0.1)]",
      activeTab: "bg-[rgba(var(--halo-primary),0.15)] text-[rgb(var(--halo-primary))] border-b-2 border-[rgb(var(--halo-primary))]",
      inactiveTab: "text-[rgb(var(--halo-muted))] hover:text-[rgb(var(--halo-fg))] hover:bg-[rgba(var(--halo-fg),0.05)]"
    },
    elevated: {
      container: "bg-[rgb(var(--halo-bg-elev))] rounded-halo shadow-[var(--halo-shadow)] border border-[rgba(var(--halo-fg),0.1)]",
      tabList: "border-b border-[rgba(var(--halo-fg),0.1)]",
      activeTab: "bg-[rgba(var(--halo-primary),0.1)] text-[rgb(var(--halo-primary))] border-b-2 border-[rgb(var(--halo-primary))]",
      inactiveTab: "text-[rgb(var(--halo-muted))] hover:text-[rgb(var(--halo-fg))] hover:bg-[rgba(var(--halo-fg),0.05)]"
    },
    minimal: {
      container: "",
      tabList: "border-b border-[rgba(var(--halo-fg),0.2)]",
      activeTab: "text-[rgb(var(--halo-primary))] border-b-2 border-[rgb(var(--halo-primary))]",
      inactiveTab: "text-[rgb(var(--halo-muted))] hover:text-[rgb(var(--halo-fg))]"
    }
  };

  return (
    <div className={cn("w-full", variantClasses[variant].container, className)}>
      {/* Tab List */}
      <div 
        className={cn("flex", variantClasses[variant].tabList)}
        role="tablist"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={cn(
              "relative transition-all duration-[var(--halo-duration)] ease-[var(--halo-ease)] font-medium rounded-t-halo halo-focus-ring",
              sizeClasses[size].tab,
              tab.id === currentActiveTab
                ? variantClasses[variant].activeTab
                : variantClasses[variant].inactiveTab,
              tab.disabled && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => !tab.disabled && handleTabChange(tab.id)}
            disabled={tab.disabled}
            role="tab"
            aria-selected={tab.id === currentActiveTab}
            aria-controls={`panel-${tab.id}`}
            tabIndex={tab.id === currentActiveTab ? 0 : -1}
          >
            {tab.label}
            
            {/* Active tab indicator */}
            {tab.id === currentActiveTab && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[rgb(var(--halo-primary))]"
                layoutId="activeTabIndicator"
                transition={{ duration: 0.2, ease: "easeInOut" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div
        className={sizeClasses[size].content}
        role="tabpanel"
        id={`panel-${currentActiveTab}`}
        aria-labelledby={currentActiveTab}
      >
        <motion.div
          key={currentActiveTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {currentTab?.content}
        </motion.div>
      </div>
    </div>
  );
}