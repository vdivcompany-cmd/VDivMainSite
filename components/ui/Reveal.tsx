"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  className?: string;
  duration?: number;
}

export function Reveal({ 
  children, 
  direction = "up", 
  delay = 0, 
  className = "",
  duration = 1
}: RevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    let x = 0;
    let y = 0;

    switch (direction) {
      case "up": y = 50; break;
      case "down": y = -50; break;
      case "left": x = -50; break;
      case "right": x = 50; break;
    }

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, x, y, willChange: "transform, opacity" },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease: "power3.out",
        force3D: true,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={`opacity-0 ${className}`}>
      {children}
    </div>
  );
}
