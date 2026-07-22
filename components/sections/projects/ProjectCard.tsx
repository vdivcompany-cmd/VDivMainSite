"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, Activity } from "lucide-react";
import type { Project } from "@/data/projectsData";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations("ProjectsShowcase");
  
  const isFinished = project.status === "finished";
  
  // Dynamic color classes based on status
  const colorText = isFinished ? "text-primary" : "text-tertiary";
  const colorBg = isFinished ? "bg-primary" : "bg-tertiary";
  const colorBgOverlay = isFinished ? "bg-primary/20" : "bg-tertiary/20";
  const colorBorderOverlay = isFinished ? "border-primary/40" : "border-tertiary/40";
  
  // Custom CSS for card and glint effects (can be handled inline or in globals)
  // We'll use inline styles/tailwind for perspective 
  
  return (
    <div className={`project-card perspective-1000 group ${project.status}`} style={{ perspective: '1000px' }}>
      <div 
        className="card-inner relative bg-surface-container-low border border-outline-variant/30 p-gutter overflow-hidden rounded-lg transition-transform duration-100"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Glint Effect */}
        <div 
          className="glint absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)' }}
        ></div>
        
        {/* Image Container */}
        <div className="relative h-64 w-full bg-surface-container mb-lg rounded-sm overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            src={project.image}
            alt={project.title}
          />
          <div className={`absolute top-4 right-4 ${colorBgOverlay} backdrop-blur-md px-sm py-xs border ${colorBorderOverlay} rounded z-20`}>
            <span className={`font-technical-data text-technical-data ${colorText}`}>
              {project.versionOrStage}
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="relative">
          {/* Circuit Divider Line */}
          <div className={`absolute -top-10 left-0 w-12 h-px ${colorBg}`}>
            <div className={`absolute w-1 h-1 rounded-full ${colorBg} -right-1 -top-[1.5px]`}></div>
          </div>
          
          <h3 className="font-headline-md text-headline-md mb-xs">{project.title}</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-md">
            {project.description}
          </p>
          
          <div className="flex justify-between items-center mt-auto pt-sm">
            <span className="font-technical-data text-technical-data text-on-surface-variant/60">
              {project.dateOrVersionInfo}
            </span>
            <button className={`flex items-center gap-xs font-label-caps text-label-caps ${colorText} hover:gap-md transition-all relative z-20`}>
              {isFinished ? t('btn_details') : t('btn_track')} 
              {isFinished ? <ArrowRight className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
