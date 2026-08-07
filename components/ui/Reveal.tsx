"use client";

import { useEffect, useRef, useState } from "react";

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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Check if element is already in viewport on mount (e.g. above fold hero)
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  let initialTransform = "translate3d(0, 50px, 0)";
  switch (direction) {
    case "up": initialTransform = "translate3d(0, 50px, 0)"; break;
    case "down": initialTransform = "translate3d(0, -50px, 0)"; break;
    case "left": initialTransform = "translate3d(-50px, 0, 0)"; break;
    case "right": initialTransform = "translate3d(50px, 0, 0)"; break;
  }

  return (
    <div 
      ref={containerRef} 
      className={`transform-gpu ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate3d(0, 0, 0)" : initialTransform,
        transition: `opacity ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
        willChange: isVisible ? "auto" : "opacity, transform"
      }}
    >
      {children}
    </div>
  );
}
