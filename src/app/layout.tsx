import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { LocomotiveProvider } from "@/components/locomotive-provider";
import { Inter, Mona_Sans } from "next/font/google";

const inter = Inter({
  subsets: ['latin'],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  preload: true,
  adjustFontFallback: false,
});

const monaSans = Mona_Sans({
  subsets: ['latin'],
  variable: "--font-mona-sans",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  preload: true,
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Soham Paranjape | Portfolio",
  description: "Full-Stack Developer based in Pune, IN. Specialist in Next.js, Supabase, and considered design.",
  icons: [
    { rel: 'icon', url: '/logo.png' }
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF9F6" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
};

// ─── OVERUSED GROTESK (body / labels) ─────────────────────────────────────────
// Variable font — all weights from one file
const overusedGrotesk = localFont({
  src: [
    {
      path: "../../public/fonts/OverusedGrotesk-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/OverusedGrotesk-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/OverusedGrotesk-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/OverusedGrotesk-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-overused-grotesk",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  preload: true,
  adjustFontFallback: false,
});

import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${overusedGrotesk.variable} ${monaSans.variable}`} suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground selection:bg-accent selection:text-black min-h-[100dvh]">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LocomotiveProvider>
            {children}
          </LocomotiveProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
