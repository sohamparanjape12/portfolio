"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk, Lato } from "next/font/google";
import "./globals.css";
import "../styles/glass.module.css";
import { ThemeProvider } from "../../components/theme-provider";
import Navbar from "@/components/navbar";
import { motion } from "framer-motion";
import Image from "next/image";
import blob1 from "../../public/blob1.png";
import blob2 from "../../public/blob2.png";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div
              animate={{
                scale: [1, 1.25],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              
                className={cn("absolute -bottom-30 -right-40 lg:-bottom-30 lg:-right-50 transition-all ease-in-out duration-1800 -z-1 object-cover blur-xl",
                  path == '/about' ? "bottom-120 -right-80 lg:bottom-100 lg:-right-60 transform rotate-80 scale-150 lg:scale-220" : 
                  path == '/projects' || path == '/contact' ? "bottom-220 right-50 lg:bottom-140 lg:-right-150" : ""
                )}
            >
              <Image
                src={blob1}
                alt="Background Blobs"
              />
            </motion.div>
            <motion.div
              animate={{
                scale: [1, 1.2],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 2,
              }}
                className={cn("absolute -top-35 -left-45 lg:-top-50 lg:-left-60 transition-all ease-in-out duration-1500 -z-1 object-cover blur-xl",
                  path == '/about' ? "top-120 -left-45 lg:top-80 lg:-left-55 transform rotate-90 scale-150 lg:scale-220" : 
                  path == '/projects' || path == '/contact' ? "top-220 left-50 lg:top-140 lg:-left-150" : ""
                )}
            >
              <Image
                src={blob1}
                alt="Background Blobs"
              />
            </motion.div>

            <motion.div
              animate={{
                x: [0, -100, 0],
                y: [0, 100, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 5,
              }}
                className={cn(path == '/projects' ? "absolute -top-1/2 left-0 top-30 lg:top-0 lg:left-0 transform -rotate-60 lg:rotate-20 scale-320 lg:scale-150 transition-all ease duration-1500 -z-10 object-cover blur-xl opacity-100 -hue-rotate-5" : path == '/contact' ? "absolute -top-1/2 -left-45 top-40 left-0 lg:top-0 lg:left-0 transform -rotate-20 transition-all duration-1500 -z-10 object-cover blur-xl opacity-100 scale-300 lg:scale-250 saturate-90" : "absolute -top-100 transition-all ease duration-1500 -z-10 object-cover blur-xl opacity-0"
                )}
            >
              <Image
                src={blob2}
                alt="Background Blobs"
              />
            </motion.div>
          </motion.div>
        </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
