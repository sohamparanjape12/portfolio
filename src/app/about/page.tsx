"use client";

import { motion } from 'framer-motion'
import { useTheme } from 'next-themes';
import React from 'react'
import { siCplusplus, siCss, siGit, siHtml5, siJavascript, siNextdotjs, siNodedotjs, siPostgresql, siPython, siReact, siSupabase, siTailwindcss, siTypescript } from 'simple-icons';

const tech_stack = [
  {
    name: "Next.js",
    icon: siNextdotjs,
    color: "#1b1b1bff"
  },
  {
    name: "React.js",
    icon: siReact,
    color: "#61DAFB"
  },
  {
    name: "React Native",
    icon: siReact,
    color: "#61DAFB"
  },
  {
    name: "TypeScript",
    icon: siTypescript,
    color: "#3178C6"
  },
  {
    name: "Tailwind CSS",
    icon: siTailwindcss,
    color: "#06B6D4"
  },
  {
    name: "Node.js",
    icon: siNodedotjs,
    color: "#5FA04E"
  },
  {
    name: "Supabase",
    icon: siSupabase,
    color: "#3FCF8E"
  },
  {
    name: "PostgreSQL",
    icon: siPostgresql,
    color: "#4169E1"
  },
  {
    name: "HTML",
    icon: siHtml5,
    color: "#E34F26"
  },
  {
    name: "CSS",
    icon: siCss,
    color: "#663399"
  },
  {
    name: "Javascript",
    icon: siJavascript,
    color: "#F7DF1E"
  },
  {
    name: "Git",
    icon: siGit,
    color: "#F05032"
  },
  {
    name: "Python",
    icon: siPython,
    color: "#3776AB"
  },
  {
    name: "C++",
    icon: siCplusplus,
    color: "#00599C"
  }
]

export default function About() {

  const parent = {
    animate: { transition: { staggerChildren: 0.20, delayChildren: 1.25 } }
  }

  const child = {
    initial: {
      opacity: 0,
      y: 10
    },
    animate: {
      opacity: 1,
      y: 0
    }
  }


  return (
    <div className='bg-background/15 backdrop-blur-xl flex flex-col items-center justify-center min-h-screen p-8 pb-8 gap-4 sm:p-0'>
        <motion.div 
        initial={{ opacity: 0, }}
        animate={{ opacity: 1, }}
        transition={{ duration: 0.8 }}
        className="relative card glass flex flex-col items-start justify-start max-w-4xl gap-2 p-8 rounded-lg shadow-lg border border-gray-200/10 max-h-[80vh] overflow-y-scroll"
        >
            <motion.h1 initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className='text-5xl self-center font-bold mb-1'>About Me</motion.h1>
            <motion.div initial={{ opacity: 0, }} animate={{ opacity: 1, }} transition={{ duration: 0.8, delay: 0.6 }} className='max-w-3xl lg:text-md space-y-4 text-foreground/80 mb-6'>
                <p>
                    I am a freshman at MIT WPU pursuing a degree in Computer Science & Engineering and I am passionate about full stack development with experience in building web applications using modern technologies.
                    I love exploring new technologies and continuously improving my skills.
                    In my free time, I enjoy riding my bike, watching movies & series, and playing video games.
                </p>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, }} animate={{ opacity: 1, }} transition={{ duration: 0.6, delay: 0.95 }} className='text-3xl text-center self-center font-bold mb-4'>My Skills</motion.h1>
            <motion.div variants={parent} initial='initial' animate='animate' style={{ fontFamily: 'Space Grotesk, sans-serif' }} className='grid grid-cols-2 sm:grid-cols-4 gap-2 items-center justify-center self-center'>
              {
                tech_stack.map((tech, idx) => (
                  <motion.div
                    key={idx}
                    variants={child}
                    whileHover={{ scale: 1.1 }}
                    className={"group color-white p-1 rounded-md flex flex-col items-center justify-center gap-1"}
                  >
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill={tech.color}
                      xmlns="http://www.w3.org/2000/svg"
                      className={"transition-all ease-in-out duration-400 "}
                    >
                      <path d={tech.icon.path} />
                    </svg>
                    <h3>{tech.name}</h3>
                  </motion.div>
                ))
              }
            </motion.div>
        </motion.div>
    </div>
  )
}