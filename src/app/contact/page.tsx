"use client";

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { Github, Linkedin, Twitter, Instagram, Send, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { url } from 'inspector';

const links = [
    {
        label: "GitHub",
        url: "https://github.com/sohamparanjape",
        icon: <Github className='w-4 h-4' />
    },
    {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/soham-paranjape-982b001b4/",
        icon: <Linkedin className='w-4 h-4' />
    },
    {
        label: "Twitter",
        url: "https://twitter.com/sohamparanjape",
        icon: <Twitter className='w-4 h-4' />
    },
    {
        label: "Instagram",
        url: "https://www.instagram.com/sohamparanjape/",
        icon: <Instagram className='w-4 h-4' />
    },
    {
        label: "sohamparanjape1204@gmail.com",
        url: "mailto:sohamparanjape1204@gmail.com",
        icon: <Mail className='w-4 h-4' />
    },
    {
        label: "+91 9766602596",
        url: "tel:+919766602596",
        icon: <Phone className='w-4 h-4' />
    }
]

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(false);

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    });

    if (res.ok) {
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    } else {
      setError(true);
    }

    setLoading(false);
  };

  return (
    <div className='bg-background/15 backdrop-blur-xl flex flex-col items-center justify-center min-h-screen p-8 lg:pb-10 gap-4 p-0 z-10'>
        <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative glass flex flex-col items-center justify-center max-w-3xl gap-4 p-8 rounded-lg shadow-lg border border-gray-200/10"
        >
            <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className='text-5xl font-bold mb-2'
            >
                Contact
            </motion.h1>
            <div className='w-full flex flex-col lg:flex-row gap-4'>
                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, }}
                    animate={{ opacity: 1, }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className='flex-2 flex flex-col gap-2 px-4 pt-2'
                >
                    <Input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required className='border-gray-500 dark:border-border' />
                    <Input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required className='border-gray-500 dark:border-border' />
                    <Textarea placeholder='Message' value={message} onChange={(e) => setMessage(e.target.value)} required className='border-gray-500 dark:border-border' />
                    <Button type="submit" disabled={loading} className='self-end mt-2 font-medium bg-transparent' style={{ fontFamily: 'Space Grotesk, sans-serif' }} variant={'outline'}>
                        {loading ? 'Sending...' : 'Send'}
                        <Send className='w-4 h-4' />
                    </Button>
                    {success && <p className="text-green-500">Message sent successfully!</p>}
                    {error && <p className="text-red-500">Error sending message. Please try again.</p>}
                </motion.form>
                <div className='flex-1 flex flex-col items-center gap-2 justify-center pt-2 pb-2 lg:pt-0 lg:pl-6 border-t lg:border-t-0 lg:border-l border-accent-foreground/20'>
                    <motion.h3
                    initial={{ opacity: 0, }}
                    animate={{ opacity: 1, }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className='text-xl font-medium text-center mt-2 lg:mt-0'
                    >
                        My Links
                    </motion.h3>
                    <div className='flex flex-row items-start justify-center mb-auto flex-wrap gap-1 grow content-center mt-2 lg:mt-0'>
                        {
                            links.map((link, idx) => (
                                <motion.a
                                    key={idx}
                                    href={link.url}
                                    target="_blank"
                                    initial={{ opacity: 0, }}
                                    animate={{ opacity: 1, }}
                                    transition={{ duration: 0.5, delay: 0.25 + idx * 0.2, ease: "easeInOut" }}
                                    className='inline-flex gap-2 items-center justify-center text-md bg-gray-400/10 dark:bg-gray-200/10 hover:bg-gray-200/20 transition-colors duration-300 rounded-md px-3 py-1.5 m-0 border border-gray-600/10 dark:border-gray-200/10 text-foreground/80 font-medium'
                                >
                                    {link.label}
                                    {link.icon}
                                </motion.a>
                            ))
                        }
                    </div>
                </div>
            </div>
        </motion.div>
    </div>
  )
}
