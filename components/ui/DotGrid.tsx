'use client';
import { useRef, useEffect, useCallback, useMemo } from 'react';

function easeOutQuad(t: number): number {
  return 1 - (1 - t) * (1 - t);
}

function easeOutElastic(t: number, a = 1, p = 0.75): number {
  if (t === 0) return 0;
  if (t === 1) return 1;
  const s = (p / (2 * Math.PI)) * Math.asin(1 / a);
  return a * Math.pow(2, -10 * t) * Math.sin(((t - s) * (2 * Math.PI)) / p) + 1;
}

function animateDot(
  dot: DotItem,
  startX: number,
  startY: number,
  targetX: number,
  targetY: number,
  duration: number,
  easeFn: (t: number) => number,
  onUpdate: () => void,
  onComplete?: () => void
) {
  if (dot._animCancel) {
    dot._animCancel();
  }
  let isCancelled = false;
  let rafId = 0;
  dot._animCancel = () => {
    isCancelled = true;
    cancelAnimationFrame(rafId);
  };
  const startTime = performance.now();
  function step(now: number) {
    if (isCancelled) return;
    const elapsed = (now - startTime) / (duration * 1000);
    const progress = Math.min(1, Math.max(0, elapsed));
    const eased = easeFn(progress);
    dot.xOffset = startX + (targetX - startX) * eased;
    dot.yOffset = startY + (targetY - startY) * eased;
    onUpdate();
    if (progress < 1) {
      rafId = requestAnimationFrame(step);
    } else {
      dot.xOffset = targetX;
      dot.yOffset = targetY;
      dot._animCancel = undefined;
      if (onComplete) onComplete();
    }
  }
  rafId = requestAnimationFrame(step);
}

const throttle = (func: any, limit: number) => {
  let lastCall = 0;
  return function (this: any, ...args: any[]) {
    const now = performance.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  };
};

function hexToRgb(hex: string) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16)
  };
}

interface DotGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  speedTrigger?: number;
  shockRadius?: number;
  shockStrength?: number;
  maxSpeed?: number;
  resistance?: number;
  returnDuration?: number;
  className?: string;
  style?: React.CSSProperties;
}

interface DotItem {
  cx: number;
  cy: number;
  xOffset: number;
  yOffset: number;
  _inertiaApplied: boolean;
  _animCancel?: () => void;
}

const DotGrid = ({
  dotSize = 16,
  gap = 32,
  baseColor = '#5227FF',
  activeColor = '#5227FF',
  proximity = 150,
  speedTrigger = 100,
  shockRadius = 250,
  shockStrength = 5,
  maxSpeed = 5000,
  resistance = 750,
  returnDuration = 1.5,
  className = '',
  style = {}
}: DotGridProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<DotItem[]>([]);
  const cachedRectRef = useRef<DOMRect | null>(null);
  const isVisibleRef = useRef(false);
  const isRunningRef = useRef(false);
  const activeTweensRef = useRef(0);
  const isPointerInsideRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  const pointerRef = useRef({
    x: -9999,
    y: -9999,
    vx: 0,
    vy: 0,
    speed: 0,
    lastTime: 0,
    lastX: 0,
    lastY: 0
  });

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);
  const radius = dotSize / 2;

  const updateCachedRect = useCallback(() => {
    if (canvasRef.current) {
      cachedRectRef.current = canvasRef.current.getBoundingClientRect();
    }
  }, []);

  // Optimized draw function with batching
  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const { x: px, y: py } = pointerRef.current;
    const proxSq = proximity * proximity;
    const dots = dotsRef.current;
    const isPointerValid = px > -9000 && py > -9000;

    // Fast pass: Draw all static base dots in a single batch path
    ctx.beginPath();
    ctx.fillStyle = baseColor;
    
    // Arrays for dots requiring individual customized rendering
    const activeDots: { ox: number; oy: number; color: string }[] = [];

    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i];
      const hasOffset = dot.xOffset !== 0 || dot.yOffset !== 0;

      if (isPointerValid) {
        const dx = dot.cx - px;
        const dy = dot.cy - py;
        const dsq = dx * dx + dy * dy;

        if (dsq <= proxSq) {
          const dist = Math.sqrt(dsq);
          const t = 1 - dist / proximity;
          const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
          const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
          const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
          activeDots.push({
            ox: dot.cx + dot.xOffset,
            oy: dot.cy + dot.yOffset,
            color: `rgb(${r},${g},${b})`
          });
          continue;
        }
      }

      if (hasOffset) {
        activeDots.push({
          ox: dot.cx + dot.xOffset,
          oy: dot.cy + dot.yOffset,
          color: baseColor
        });
        continue;
      }

      // Base static dot - batch into single path
      ctx.moveTo(dot.cx + radius, dot.cy);
      ctx.arc(dot.cx, dot.cy, radius, 0, Math.PI * 2);
    }

    ctx.fill();

    // Render active/displaced dots
    for (let i = 0; i < activeDots.length; i++) {
      const item = activeDots[i];
      ctx.beginPath();
      ctx.fillStyle = item.color;
      ctx.arc(item.ox, item.oy, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [baseColor, proximity, baseRgb, activeRgb, radius]);

  const requestRender = useCallback(() => {
    if (!isVisibleRef.current) return;
    if (isRunningRef.current) return;

    isRunningRef.current = true;
    const loop = () => {
      drawFrame();

      // Only continue RAF loop if there are active inertia animations running
      if (activeTweensRef.current > 0) {
        rafIdRef.current = requestAnimationFrame(loop);
      } else {
        isRunningRef.current = false;
        rafIdRef.current = null;
      }
    };

    rafIdRef.current = requestAnimationFrame(loop);
  }, [drawFrame]);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const { width, height } = wrap.getBoundingClientRect();
    cachedRectRef.current = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);

    const cols = Math.floor((width + gap) / (dotSize + gap));
    const rows = Math.floor((height + gap) / (dotSize + gap));
    const cell = dotSize + gap;

    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;

    const extraX = width - gridW;
    const extraY = height - gridH;

    const startX = extraX / 2 + dotSize / 2;
    const startY = extraY / 2 + dotSize / 2;

    const totalDots = rows * cols;
    const dots: DotItem[] = new Array(totalDots);
    let idx = 0;
    for (let y = 0; y < rows; y++) {
      const cy = startY + y * cell;
      for (let x = 0; x < cols; x++) {
        dots[idx++] = { cx: startX + x * cell, cy, xOffset: 0, yOffset: 0, _inertiaApplied: false };
      }
    }
    dotsRef.current = dots;
    drawFrame();
  }, [dotSize, gap, drawFrame]);

  // IntersectionObserver to freeze when offscreen
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          updateCachedRect();
          drawFrame();
        } else {
          if (rafIdRef.current) {
            cancelAnimationFrame(rafIdRef.current);
            rafIdRef.current = null;
          }
          isRunningRef.current = false;
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [drawFrame, updateCachedRect]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      buildGrid();
    });
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        buildGrid();
        updateCachedRect();
      });
      wrapperRef.current && ro.observe(wrapperRef.current);
    } else {
      window.addEventListener('resize', buildGrid);
    }

    window.addEventListener('scroll', updateCachedRect, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      else window.removeEventListener('resize', buildGrid);
      window.removeEventListener('scroll', updateCachedRect);
    };
  }, [buildGrid, updateCachedRect]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isVisibleRef.current) return;

      const now = performance.now();
      const pr = pointerRef.current;
      const dt = pr.lastTime ? now - pr.lastTime : 16;
      const dx = e.clientX - pr.lastX;
      const dy = e.clientY - pr.lastY;
      let vx = (dx / dt) * 1000;
      let vy = (dy / dt) * 1000;
      let speed = Math.hypot(vx, vy);
      if (speed > maxSpeed) {
        const scale = maxSpeed / speed;
        vx *= scale;
        vy *= scale;
        speed = maxSpeed;
      }
      pr.lastTime = now;
      pr.lastX = e.clientX;
      pr.lastY = e.clientY;
      pr.vx = vx;
      pr.vy = vy;
      pr.speed = speed;

      let rect = cachedRectRef.current;
      if (!rect) {
        if (!canvasRef.current) return;
        rect = canvasRef.current.getBoundingClientRect();
        cachedRectRef.current = rect;
      }

      pr.x = e.clientX - rect.left;
      pr.y = e.clientY - rect.top;

      // Check if pointer is inside or close to grid
      const isInside = 
        pr.x >= -proximity && 
        pr.x <= rect.width + proximity && 
        pr.y >= -proximity && 
        pr.y <= rect.height + proximity;

      isPointerInsideRef.current = isInside;

      if (!isInside) {
        pr.x = -9999;
        pr.y = -9999;
        requestRender();
        return;
      }

      requestRender();

      const dots = dotsRef.current;
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const dist = Math.hypot(dot.cx - pr.x, dot.cy - pr.y);
        if (speed > speedTrigger && dist < proximity && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          const pushX = dot.cx - pr.x + vx * 0.005;
          const pushY = dot.cy - pr.y + vy * 0.005;
          
          activeTweensRef.current++;
          animateDot(dot, 0, 0, pushX, pushY, 0.3, easeOutQuad, requestRender, () => {
            animateDot(dot, pushX, pushY, 0, 0, returnDuration, easeOutElastic, requestRender, () => {
              dot._inertiaApplied = false;
              activeTweensRef.current = Math.max(0, activeTweensRef.current - 1);
              requestRender();
            });
          });
        }
      }
    };

    const onLeave = () => {
      isPointerInsideRef.current = false;
      pointerRef.current.x = -9999;
      pointerRef.current.y = -9999;
      requestRender();
    };

    const onClick = (e: MouseEvent) => {
      if (!isVisibleRef.current) return;
      let rect = cachedRectRef.current;
      if (!rect) {
        if (!canvasRef.current) return;
        rect = canvasRef.current.getBoundingClientRect();
        cachedRectRef.current = rect;
      }

      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      if (cx < 0 || cx > rect.width || cy < 0 || cy > rect.height) return;

      const dots = dotsRef.current;
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
        if (dist < shockRadius && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          const falloff = Math.max(0, 1 - dist / shockRadius);
          const pushX = (dot.cx - cx) * shockStrength * falloff;
          const pushY = (dot.cy - cy) * shockStrength * falloff;
          
          activeTweensRef.current++;
          animateDot(dot, 0, 0, pushX, pushY, 0.2, easeOutQuad, requestRender, () => {
            animateDot(dot, pushX, pushY, 0, 0, returnDuration, easeOutElastic, requestRender, () => {
              dot._inertiaApplied = false;
              activeTweensRef.current = Math.max(0, activeTweensRef.current - 1);
              requestRender();
            });
          });
        }
      }
      requestRender();
    };

    const throttledMove = throttle(onMove, 30);
    window.addEventListener('mousemove', throttledMove as EventListener, { passive: true });
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('click', onClick as EventListener);

    return () => {
      window.removeEventListener('mousemove', throttledMove as EventListener);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('click', onClick as EventListener);
    };
  }, [maxSpeed, speedTrigger, proximity, returnDuration, shockRadius, shockStrength, requestRender]);

  return (
    <section className={`flex items-center justify-center h-full w-full relative ${className}`} style={style}>
      <div ref={wrapperRef} className="w-full h-full relative">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      </div>
    </section>
  );
};

export default DotGrid;
