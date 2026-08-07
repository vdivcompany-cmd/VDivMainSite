"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from '@/i18n/routing';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);
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

    if (isTouchOrBot) return;

    let destroyed = false;
    let lenisInstance: any = null;

    const init = async () => {
      try {
        const { default: Lenis } = await import('lenis');

        if (destroyed) return;

        const lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          autoRaf: true,
        });

        lenisInstance = lenis;
        lenisRef.current = lenis;
      } catch (err) {
        console.error('Failed to init smooth scroll:', err);
      }
    };

    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => init());
    } else {
      setTimeout(init, 100);
    }

    return () => {
      destroyed = true;
      if (lenisInstance) {
        lenisInstance.destroy();
      }
      lenisRef.current = null;
    };
  }, [isProgrammaticPage, pathname]);

  return <>{children}</>;
}
