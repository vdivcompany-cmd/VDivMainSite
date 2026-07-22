"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "./ProjectCard";
import { projectsData, ProjectStatus } from "@/data/projectsData";

export function ProjectShowcase() {
  const t = useTranslations("ProjectsShowcase");
  const [activeTab, setActiveTab] = useState<ProjectStatus>("finished");
  
  const filteredProjects = projectsData.filter(p => p.status === activeTab);

  return (
    <div className="relative z-10 py-xl min-h-[calc(100vh-64px)]">
      <header className="px-margin-mobile md:px-margin-desktop mb-xl text-center md:text-left max-w-7xl mx-auto">
        <Reveal direction="up">
          <div className="inline-flex items-center gap-2 px-sm py-xs bg-surface-container-high border border-outline-variant/20 rounded mb-md">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest pt-[2px]">
              {t('tag')}
            </span>
          </div>
        </Reveal>
        
        <Reveal direction="up" delay={0.1}>
          <h1 className="font-display-lg text-display-lg mb-sm">
            {t('title_start')}
            <span className="text-primary italic">{t('title_highlight')}</span>
          </h1>
        </Reveal>
        
        <Reveal direction="up" delay={0.2}>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[672px] mb-lg mx-auto md:mx-0">
            {t('desc')}
          </p>
        </Reveal>

        {/* Tabbed Navigation */}
        <Reveal direction="up" delay={0.3}>
          <div className="flex gap-lg border-b border-outline-variant/30 relative mt-xl justify-center md:justify-start">
            <button 
              onClick={() => setActiveTab("finished")}
              className={`font-label-caps text-label-caps py-md px-base transition-all duration-300 cursor-pointer ${
                activeTab === "finished" 
                  ? "text-primary border-b-2 border-primary" 
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              {t('tab_finished')}
            </button>
            <button 
              onClick={() => setActiveTab("building")}
              className={`font-label-caps text-label-caps py-md px-base transition-all duration-300 cursor-pointer ${
                activeTab === "building" 
                  ? "text-primary border-b-2 border-primary" 
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              {t('tab_building')}
            </button>
          </div>
        </Reveal>
      </header>

      {/* Gallery Grid */}
      <section className="px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg max-w-7xl mx-auto">
        {filteredProjects.map((project, index) => (
          <Reveal key={project.id} direction="up" delay={0.1 * index}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </section>
    </div>
  );
}
