"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <ThemeSync />
      {children}
    </NextThemesProvider>
  );
}

function ThemeSync() {
  const { theme, resolvedTheme } = useTheme();

  React.useLayoutEffect(() => {
    const updateThemeColor = () => {
      const activeTheme = resolvedTheme || theme;
      const color = activeTheme === "dark" ? "#050505" : "#FAF9F6";
      
      // 1. Force a "Reflow" of meta tags for iOS Safari
      // We clear all existing theme-color tags (including static ones from layout.tsx)
      document.querySelectorAll('meta[name="theme-color"]').forEach(tag => tag.remove());

      // 2. Inject a fresh, clean manual override tag without any media queries
      const meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      meta.setAttribute("content", color);
      document.head.appendChild(meta);

      // 3. Apple-specific status bar style sync (synergizes with black-translucent)
      let appleMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
      if (!appleMeta) {
        appleMeta = document.createElement("meta");
        appleMeta.setAttribute("name", "apple-mobile-web-app-status-bar-style");
        document.head.appendChild(appleMeta);
      }
      appleMeta.setAttribute("content", activeTheme === "dark" ? "black" : "default");
    };

    updateThemeColor();
    
    // Catch hydration edges with a tiny sequence
    const t1 = setTimeout(updateThemeColor, 20);
    const t2 = setTimeout(updateThemeColor, 200);
    const t3 = setTimeout(updateThemeColor, 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [theme, resolvedTheme]);

  return null;
}
