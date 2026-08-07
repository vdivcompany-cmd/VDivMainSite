"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const DotGrid = dynamic(() => import("@/components/ui/DotGrid"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

export function AboutHeroBackground() {
  const [isDesktopReady, setIsDesktopReady] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    if (!mql.matches) return;

    let cancelIdle: (() => void) | null = null;
    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        const id = (window as any).requestIdleCallback(
          () => setIsDesktopReady(true),
          { timeout: 1000 }
        );
        cancelIdle = () => (window as any).cancelIdleCallback(id);
      } else {
        const id = setTimeout(() => setIsDesktopReady(true), 150);
        cancelIdle = () => clearTimeout(id);
      }
    }

    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsDesktopReady(true);
      } else {
        setIsDesktopReady(false);
      }
    };
    mql.addEventListener("change", handler);
    return () => {
      if (cancelIdle) cancelIdle();
      mql.removeEventListener("change", handler);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      {isDesktopReady ? (
        <DotGrid
          dotSize={2}
          gap={20}
          baseColor="#494551"
          activeColor="#cfbdff"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      ) : (
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-surface-container/20 to-transparent" />
      )}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-tertiary/5 rounded-full blur-[150px] pointer-events-none"></div>
    </div>
  );
}
