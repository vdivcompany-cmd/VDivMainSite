"use client";

import { useEffect, useRef } from "react";

export function ContactNode3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cachedRect: DOMRect | null = null;
    let isVisible = false;
    let animationFrameId: number | null = null;

    // Sync the WebGL drawing-buffer size with the CSS-driven layout size.
    function syncSize() {
      if (!canvas) return;
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      cachedRect = canvas.getBoundingClientRect();
    }

    const resizeObserver = new ResizeObserver(syncSize);
    resizeObserver.observe(canvas);
    syncSize();

    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) return;

    const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

    const fs = `precision highp float;
varying vec2 v_texCoord;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

void main() {
    vec2 uv = v_texCoord;
    
    // Create a technical circuit-like grid pulse
    float grid = sin(uv.x * 50.0 + u_time) * sin(uv.y * 50.0 + u_time);
    grid = smoothstep(0.9, 1.0, grid);
    
    // Flowing digital waves
    float wave = sin(uv.x * 10.0 + u_time * 0.5) * 0.5 + 0.5;
    float wave2 = cos(uv.y * 8.0 - u_time * 0.3) * 0.5 + 0.5;
    
    vec3 color1 = vec3(0.06, 0.08, 0.10); // Surface-dim dark
    vec3 color2 = vec3(0.95, 0.79, 0.31); // Primary Gold (normalized)
    vec3 color3 = vec3(0.0, 0.93, 0.98); // Secondary Blue (normalized)
    
    vec3 finalColor = mix(color1, color2 * 0.1, grid);
    finalColor += color3 * (wave * wave2) * 0.05;
    
    // Interactive mouse glow
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec2 mouseNorm = u_mouse / u_resolution;
    // Simple glow around mouse
    float dist = distance(st, mouseNorm);
    finalColor += color2 * (0.02 / (dist + 0.01));
    
    gl_FragColor = vec4(finalColor, 1.0);
}`;

    function cs(type: number, src: string) {
      if (!gl) return null;
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }

    const vertexShader = cs(gl.VERTEX_SHADER, vs);
    const fragmentShader = cs(gl.FRAGMENT_SHADER, fs);
    if (!vertexShader || !fragmentShader) return;

    const prog = gl.createProgram();
    if (!prog) return;

    gl.attachShader(prog, vertexShader);
    gl.attachShader(prog, fragmentShader);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');

    const mouse = { x: canvas.width / 2, y: canvas.height / 2 };

    const onMouseMove = (event: MouseEvent) => {
      if (!cachedRect) cachedRect = canvas.getBoundingClientRect();
      if (cachedRect.width && cachedRect.height) {
        const nx = (event.clientX - cachedRect.left) / cachedRect.width;
        const ny = 1.0 - (event.clientY - cachedRect.top) / cachedRect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    function render(t: number) {
      if (!gl || !canvas || !isVisible || document.hidden) {
        animationFrameId = null;
        return;
      }

      gl.viewport(0, 0, canvas.width, canvas.height);

      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    }

    function startLoop() {
      if (animationFrameId !== null) return;
      animationFrameId = requestAnimationFrame(render);
    }

    function stopLoop() {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    }

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          cachedRect = canvas.getBoundingClientRect();
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(canvas);

    return () => {
      stopLoop();
      intersectionObserver.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      resizeObserver.disconnect();

      if (gl) {
        gl.deleteProgram(prog);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        gl.deleteBuffer(buf);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden glassmorphism flex items-center justify-center p-4">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-auto"
      />
    </div>
  );
}
