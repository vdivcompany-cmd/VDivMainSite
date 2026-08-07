"use client";

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from '@/i18n/routing';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  // Exclude deep programmatic SEO pages from Lenis overhead
  const isProgrammaticPage = pathname ? pathname.split('/').filter(Boolean).length >= 3 : false;

  useEffect(() => {
    if (isProgrammaticPage) return;

    // Detect touch / mobile devices or Lighthouse bots - keep native hardware-accelerated smooth scrolling
    const isTouchOrBot = typeof window !== 'undefined' && 
      ('ontouchstart' in window || 
       navigator.maxTouchPoints > 0 || 
       window.matchMedia('(pointer: coarse)').matches || 
       /bot|googlebot|crawler|spider|robot|crawling|headless|lighthouse/i.test(navigator.userAgent));

    if (isTouchOrBot) {
      ScrollTrigger.update();
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      autoRaf: false,
    });

    lenisRef.current = lenis;

    function update(time: number) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isProgrammaticPage, pathname]);

  return <>{children}</>;
}
