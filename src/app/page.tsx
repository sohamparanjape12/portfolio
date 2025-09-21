"use client";

import Image from "next/image";
import profilePic from "../../public/profile.jpeg";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import blob1 from "../../public/blob1.png";
import SimpleIconComponent from "@/components/simple-icon";
import { siNextdotjs, siNodedotjs, siSupabase, siTailwindcss, siTypescript } from "simple-icons";
import { useState } from "react";
import { useTheme } from "next-themes";

const tech_stack = [
  {
    name: "Next.js",
    icon: siNextdotjs,
    color: "#1b1b1bff"
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
  }
]

export default function Home() {

  const { resolvedTheme } = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const parent = {
    animate: { transition: { staggerChildren: 0.25, delayChildren: 1.2 } }
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
    <div className="bg-background/05 backdrop-blur-xl flex flex-col items-center justify-center min-h-screen p-8 lg:pb-20 gap-16 pb-24">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between h-full w-full max-w-4xl gap-8 sm:gap-16">
        <div className="text-left h-full flex flex-col items-start justify-between gap-8">
          <div className="space-y-1">
            <motion.h1 className="text-5xl font-bold" initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>Full Stack Developer</motion.h1>
            <motion.p 
              className="text-md text-foreground/80 max-w-lg"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{ lineHeight: "1" }}
            >
              Hi, I am <span className="shiny-text p-0 m-0 pl-1 text-lg" style={{ fontFamily: "Space Grotesk", fontWeight: "bold" }}>Soham Paranjape</span>, a passionate full stack developer who loves building web applications and exploring new technologies. 
            </motion.p>
          </div>
          <div className="flex flex-row items-center justify-start space-x-4 mx-2">
            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Link
                href="https://www.linkedin.com/in/soham-paranjape-982b001b4/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-300 hover:underline transition-colors duration-300"
              >
                <Linkedin size={26} />
              </Link>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link
                href="https://github.com/sohamparanjape"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-200 hover:underline transition-colors duration-300"
              >
                <Github size={26} />
              </Link>
            </motion.div>
          </div>
        </div>
        <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} perspective={1000} glareEnable glareColor="#f0f0f0" glareBorderRadius="15px" glareMaxOpacity={0.25} glarePosition="all" tiltReverse>
          <motion.div
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <Image
              src={profilePic}
              alt="Profile Picture"
              width={200}
              height={200}
              className="rounded-lg aspect-square object-cover w-38 h-38 sm:w-42 sm:h-42 md:w-54 md:h-54 lg:w-62 lg:h-62 xl:w-70 xl:h-70"
            />
          </motion.div>
        </Tilt>
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-1.5"
        >
          <motion.h3
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-lg font-semibold text-gray-600/80 dark:text-gray-200/80"
          >
            Tech Stack
          </motion.h3>
          <motion.div variants={parent} initial='initial' animate='animate' className="flex flex-row gap-2.5">
            {
              tech_stack.map((tech, idx) => {

                return(
                  <motion.div
                    key={idx}
                    variants={child}
                    whileHover={{ scale: 1.1 }}
                    className={"group tech-stack color-white bg-gray-300/10 dark:bg-gray-800/10 p-1 rounded-md flex items-center justify-center hover:color-[" + tech.color + "]"}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill={hoveredIndex === idx ? tech.color : resolvedTheme == 'dark' ? '#f0f0f0': "#0f0f0f99"}
                      xmlns="http://www.w3.org/2000/svg"
                      className={"transition-all ease-in-out duration-400 "}
                    >
                      <path d={tech.icon.path} />
                    </svg>
                  </motion.div>
                )
              
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
