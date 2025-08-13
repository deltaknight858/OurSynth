"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeMode = "light" | "dark" | "system";

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  isDark: boolean;
  setLight: () => void;
  setDark: () => void;
  setSystem: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeMode;
  storageKey?: string;
  attribute?: string;
}

export default function ThemeProvider({
  children,
  defaultMode = "system",
  storageKey = "halo-theme",
  attribute = "class"
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeMode>(defaultMode);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem(storageKey) as ThemeMode;
    const initialMode = savedMode || defaultMode;
    setThemeState(initialMode);
  }, [defaultMode, storageKey]);

  useEffect(() => {
    const updateTheme = () => {
      const root = window.document.documentElement;
      let resolvedTheme: "light" | "dark";

      if (theme === "system") {
        resolvedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches 
          ? "dark" 
          : "light";
      } else {
        resolvedTheme = theme;
      }

      const isDarkTheme = resolvedTheme === "dark";
      setIsDark(isDarkTheme);

      if (attribute === "class") {
        root.classList.remove("light", "dark");
        root.classList.add(resolvedTheme);
      } else {
        root.setAttribute("data-theme", resolvedTheme);
      }
    };

    updateTheme();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleMediaChange = () => {
      if (theme === "system") {
        updateTheme();
      }
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, [theme, attribute]);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem(storageKey, newTheme);
  };

  const setLight = () => setTheme("light");
  const setDark = () => setTheme("dark");
  const setSystem = () => setTheme("system");

  const value: ThemeContextType = {
    theme,
    setTheme,
    isDark,
    setLight,
    setDark,
    setSystem,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};