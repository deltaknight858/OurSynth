interface ThemeScriptProps {
  storageKey?: string;
  attribute?: string;
  defaultMode?: "light" | "dark" | "system";
}

export default function ThemeScript({
  storageKey = "halo-theme",
  attribute = "class",
  defaultMode = "system"
}: ThemeScriptProps) {
  const themeScript = `
(function() {
  try {
    var storageKey = ${JSON.stringify(storageKey)};
    var attribute = ${JSON.stringify(attribute)};
    var defaultMode = ${JSON.stringify(defaultMode)};
    
    var savedMode = localStorage.getItem(storageKey) || defaultMode;
    var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    var resolvedTheme;
    if (savedMode === 'system') {
      resolvedTheme = systemPrefersDark ? 'dark' : 'light';
    } else {
      resolvedTheme = savedMode;
    }
    
    var root = document.documentElement;
    
    if (attribute === 'class') {
      root.classList.remove('light', 'dark');
      root.classList.add(resolvedTheme);
    } else {
      root.setAttribute('data-theme', resolvedTheme);
    }
    
    // Set a flag to prevent flash
    root.style.setProperty('color-scheme', resolvedTheme);
  } catch (e) {
    // Fallback to light mode if there's any error
    document.documentElement.classList.add('light');
  }
})();
`;

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: themeScript,
      }}
    />
  );
}