"use client";

import { useEffect, useRef, useState } from "react";

export function CoreCapabilitiesBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ThreadsComp, setThreadsComp] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const mql = window.matchMedia("(min-width: 768px)");
    if (!mql.matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && window.matchMedia("(min-width: 768px)").matches) {
          const loadThreads = () => {
            import("@/components/ui/Threads").then((mod) => {
              setThreadsComp(() => mod.default);
            });
          };

          if ("requestIdleCallback" in window) {
            (window as any).requestIdleCallback(loadThreads, { timeout: 1000 });
          } else {
            setTimeout(loadThreads, 50);
          }
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 opacity-40">
      {ThreadsComp ? (
        <ThreadsComp
          amplitude={1.5}
          distance={0}
          enableMouseInteraction={true}
          color={[0.81, 0.74, 1.0]}
        />
      ) : (
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-tertiary/5 to-transparent pointer-events-none" />
      )}
    </div>
  );
}
