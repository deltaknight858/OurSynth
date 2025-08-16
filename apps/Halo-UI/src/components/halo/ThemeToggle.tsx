"use client";

import React from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import HaloButton from "./HaloButton";
import { useTheme } from "@/contexts/ThemeContext";

interface ThemeToggleProps {
  showSystemOption?: boolean;
  variant?: "icon" | "dropdown";
  className?: string;
}

export default function ThemeToggle({
  showSystemOption = true,
  variant = "icon",
  className = ""
}: ThemeToggleProps) {
  const { theme, setTheme, isDark } = useTheme();

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun size={18} />;
      case "dark":
        return <Moon size={18} />;
      case "system":
        return <Monitor size={18} />;
      default:
        return isDark ? <Moon size={18} /> : <Sun size={18} />;
    }
  };

  const getNextMode = () => {
    if (!showSystemOption) {
      return theme === "light" ? "dark" : "light";
    }
    
    switch (theme) {
      case "light":
        return "dark";
      case "dark":
        return "system";
      case "system":
        return "light";
      default:
        return "system";
    }
  };

  const handleToggle = () => {
    const nextMode = getNextMode();
    setTheme(nextMode as "light" | "dark" | "system");
  };

  const getAriaLabel = () => {
    const nextMode = getNextMode();
    const modeLabels = {
      light: "light mode",
      dark: "dark mode",
      system: "system preference"
    };
    return `Switch to ${modeLabels[nextMode as keyof typeof modeLabels]}`;
  };

  if (variant === "dropdown") {
    return (
      <div className={`relative ${className}`}>
        <HaloButton
          variant="ghost"
          size="sm"
          onClick={handleToggle}
          aria-label={getAriaLabel()}
          className="halo-hover"
        >
          {getIcon()}
          <span className="ml-2 text-sm capitalize">{theme}</span>
        </HaloButton>
      </div>
    );
  }

  return (
    <HaloButton
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      className={`halo-hover halo-focus-ring ${className}`}
      aria-label={getAriaLabel()}
    >
      {getIcon()}
    </HaloButton>
  );
}