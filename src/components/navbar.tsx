"use client";

import { motion } from 'framer-motion'
import Link from 'next/link';
import React from 'react'
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

export default function Navbar() {

  const path = usePathname();
  const { theme, setTheme } = useTheme();
  const [isChanging, setIsChanging] = React.useState(false);

  const handleThemeChange = () => {
    setIsChanging(true);
    setTheme(theme === 'light' ? 'dark' : 'light');
    setTimeout(() => setIsChanging(false), 500);
  };

  return (
    <motion.div
        initial={{ opacity: 0, }}
        animate={{ opacity: 1, }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 p-4 bg-transparent backdrop-blur-none flex items-center justify-center z-1000"
    >
        <div className='max-w-4xl w-full flex items-center justify-center' style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            <div className='flex items-center space-x-4 lg:space-x-8'>
                <Link href="/" className={cn('text-md font-light nav-link text-muted-foreground', { 'text-foreground active': path === '/' })} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Home</Link>
                <Link href="/about" className={cn('text-md font-light nav-link text-muted-foreground', { 'text-foreground active': path === '/about' })} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>About</Link>
                <Link href="/projects" className={cn('text-md font-light nav-link text-muted-foreground', { 'text-foreground active': path === '/projects' })} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Projects</Link>
                <Link href="/contact" className={cn('text-md font-light nav-link text-muted-foreground', { 'text-foreground active': path === '/contact' })} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Contact</Link>
            </div>
        </div>
        <Button 
          onClick={handleThemeChange} 
          variant="ghost" 
          size="icon" 
          className='lg:absolute right-4 lg:right-6 hover:bg-transparent dark:hover:bg-transparent hover:opacity-80 transition-all duration-500 cursor-pointer'
          disabled={isChanging}
        >
          <motion.div
            initial={false}
            animate={{
              rotate: isChanging ? 180 : 0,
              scale: isChanging ? 0.8 : 1,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {theme === 'light' ? (
              <Moon className='w-4 h-4' />
            ) : (
              <Sun className='w-4 h-4' />
            )}
          </motion.div>
        </Button>
    </motion.div>
  )
}
