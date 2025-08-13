"use client";

import ThemeProvider from "@/contexts/ThemeContext";
import ThemeScript from "@/components/halo/ThemeScript";

interface ThemeLayoutProps {
  children: React.ReactNode;
}

export default function ThemeLayout({ children }: ThemeLayoutProps) {
  return (
    <>
      <ThemeScript />
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </>
  );
}