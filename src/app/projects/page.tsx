"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion, useScroll } from "framer-motion";
import Image from "next/image";
import SimpleIconComponent from "../../components/simple-icon";
import { Key, useEffect, useRef, useState } from "react";
import { 
    siNextdotjs,
    siReact,
    siTypescript,
    siTailwindcss,
    siNodedotjs,
    siMongodb,
    siPostgresql,
    siVuedotjs,
    siDjango,
    siSupabase,
 } from "simple-icons";
import { ChevronLeft, ChevronRight, Github, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import useWindowSize from "@rooks/use-window-size";
import { supabase } from "@/lib/supabase";

function ProjectsView({ projects }: { projects: any[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentProject, setCurrentProject] = useState(0);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { scrollXProgress } = useScroll({ container: scrollContainerRef });

  useEffect(() => {
    const unsubscribe = scrollXProgress.on("change", (latest) => {
      const numProjects = projects.length;
      if (numProjects > 0) {
        const activeProject = Math.round(latest * (numProjects - 1));
        setCurrentProject(activeProject);
      }
    });
    return () => unsubscribe();
  }, [scrollXProgress, projects]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const projectWidth = projectRefs.current[0]?.offsetWidth || 400;
      scrollContainerRef.current.scrollBy({ 
        left: -projectWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const projectWidth = projectRefs.current[0]?.offsetWidth || 400;
      scrollContainerRef.current.scrollBy({ 
        left: projectWidth,
        behavior: "smooth",
      });
    }
  };

  const { innerWidth } = useWindowSize();

  return (
    <div className="bg-background/05 backdrop-blur-xl flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-4 sm:p-20 z-10">
        <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl font-bold"
        >
            Projects
        </motion.h1>
        <div className="relative w-full max-w-4xl">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollLeft}
            className="hidden lg:flex absolute -left-20 top-1/2 -translate-y-1/2 z-10 bg-[#f0f0f055] backdrop-blur-md hover:bg-[#f0f0f077] transition-colors duration-300"
          >
            <ChevronLeft className="m-0 p-0" />
          </Button>
          <div 
            ref={scrollContainerRef}
            className="flex flex-row overflow-x-scroll overflow-y-hidden scrollbar-hidden h-full w-full gap-8 mt-0 py-12 pb-16 snap-x snap-mandatory snap-center lg:pl-96 lg:pr-96"
          >
              {projects.map((project, index) => (
                  <motion.div 
                      key={index}
                      ref={(el: HTMLDivElement | null) => { projectRefs.current[index] = el; }}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.2 }}
                      className="snap-center"
                  >
                      <Card 
                            className="relative overflow-hidden glass transform transition-all duration-300 flex flex-col gap-0 p-0 min-w-xs lg:min-w-lg w-full h-full"
                        >
                            <Image src={project.image} alt={project.name} width={200} height={200} className="w-full h-58 object-cover object-top rounded-t-md mb-0" />
                            <div className="p-4 pt-3 flex flex-col flex-1 mb-0">
                                <div className="flex flex-col gap-0 mb-2.5 flex-0">
                                  <h3 className="text-xl font-semibold">{project.name}</h3>
                                  <p className="text-sm text-foreground/80 text-ellipsis overflow-hidden">{project.description}</p>
                                </div>
                                <div className="flex flex-wrap gap-2 flex-1 items-end" style={{ justifySelf: 'flex-end' }}>
                                    {project.techstack && project.techstack.map((tech: string, idx: Key | null | undefined) => (
                                        <span key={idx} className="bg-gray-600/10 dark:bg-gray-200/10 text-foreground/80 rounded-md flex h-fit px-1 py-1 text-xs font-medium">
                                            {
                                                tech === "React" ? <SimpleIconComponent icon={siReact} /> :
                                                tech === "Next.js" ? <SimpleIconComponent icon={siNextdotjs} /> :
                                                tech === "TypeScript" ? <SimpleIconComponent icon={siTypescript} /> :
                                                tech === "Tailwind CSS" ? <SimpleIconComponent icon={siTailwindcss} /> :
                                                tech === "Node.js" ? <SimpleIconComponent icon={siNodedotjs} /> :
                                                tech === "MongoDB" ? <SimpleIconComponent icon={siMongodb} /> :
                                                tech === "PostgreSQL" ? <SimpleIconComponent icon={siPostgresql} /> :
                                                tech === "Vue.js" ? <SimpleIconComponent icon={siVuedotjs} /> :
                                                tech === "Django" ? <SimpleIconComponent icon={siDjango} /> :
                                                tech === "Supabase" ? <SimpleIconComponent icon={siSupabase} /> :
                                                null
                                            }
                                        </span>
                                    ))}
                                </div>
                                <div className="absolute bottom-2.5 right-2.5 flex flex-row gap-2">
                                  {
                                    project.github && (
                                      <Link href={project.github} target="_blank" style={{ fontFamily: 'Space Grotesk, sans-serif' }} className="bg-gray-600/10 dark:bg-gray-200/10 text-foreground/80 hover:text-foreground hover:bg-gray-300/80 dark:hover:bg-gray-500/80 transition-colors duration-300 rounded-md flex px-2 py-2 text-xs font-medium cursor-pointer">
                                        <Github size={innerWidth && innerWidth <= 478 ? 16 : 20} />
                                      </Link>
                                    )
                                  }
                                  {
                                    project.link && (
                                      <Link href={project.link} target="_blank" style={{ fontFamily: 'Space Grotesk, sans-serif' }} className="bg-gray-600/10 dark:bg-gray-200/10 text-foreground/80 hover:text-foreground hover:bg-gray-300/80 dark:hover:bg-gray-500/80 transition-colors duration-300 rounded-md flex px-2 py-2 text-xs font-medium cursor-pointer">
                                        <LinkIcon size={innerWidth && innerWidth <= 478 ? 16 : 20} />
                                      </Link>
                                    )
                                  }
                                </div>
                            </div>
                        </Card>
                  </motion.div>
              ))}
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {projects.map((_, index) => (
              <div key={index} className="relative w-2 h-2">
                <motion.div
                  className="w-full h-full rounded-full bg-gray-500"
                  animate={{
                    backgroundColor: currentProject === index ? "var(--primary)" : "#6b728088",
                  }}
                />
                {currentProject === index && (
                  <motion.div
                    className="absolute inset-0 w-full h-full rounded-full bg-primary"
                    layoutId="dot"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollRight}
            className="hidden lg:flex absolute -right-20 top-1/2 -translate-y-1/2 z-10 bg-[#f0f0f055] backdrop-blur-md hover:bg-[#f0f0f077] transition-colors duration-300"
          >
            <ChevronRight />
          </Button>
        </div>
    </div>
  )
}

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from('projects').select('*');
      if (error) {
        console.error('Error fetching projects:', error);
      } else {
        setProjects(data);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  return <ProjectsView projects={projects} />
}