'use client';

import { CacheProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { ReactNode, createContext, useContext, useState, useEffect } from 'react';

import createEmotionCache from '@/lib/createEmotionCache';
import theme, { darkTheme } from '@/theme';

// Create emotion cache
const clientSideEmotionCache = createEmotionCache();

// Theme context for switching between light and dark modes
interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
});

export const useThemeMode = () => useContext(ThemeContext);

interface CustomThemeProviderProps {
  children: ReactNode;
  emotionCache?: any;
}

export default function CustomThemeProvider({
  children,
  emotionCache = clientSideEmotionCache,
}: CustomThemeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const currentTheme = isDarkMode ? darkTheme : theme;

  // Prevent hydration mismatch by not rendering theme-dependent content until mounted
  if (!mounted) {
    return (
      <CacheProvider value={emotionCache}>
        <ThemeContext.Provider value={{ isDarkMode: false, toggleTheme }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </ThemeContext.Provider>
      </CacheProvider>
    );
  }

  return (
    <CacheProvider value={emotionCache}>
      <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
        <ThemeProvider theme={currentTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ThemeContext.Provider>
    </CacheProvider>
  );
}
