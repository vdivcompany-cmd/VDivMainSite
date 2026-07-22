"use client";

import { useRef, useEffect } from "react";
import { Reveal } from "@/components/ui/Reveal";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";

export function HomeHero3D() {
  const t = useTranslations("HomeHero3D");
  const containerRef = useRef<HTMLDivElement>(null);
  const shaderContainerRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Engine Core 3D
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xf2ca50, 1.5);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const group = new THREE.Group();
    scene.add(group);

    const coreGeometry = new THREE.OctahedronGeometry(1.5, 0);
    const coreMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xf2ca50, 
        wireframe: true,
        emissive: 0xf2ca50,
        emissiveIntensity: 0.2
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(core);

    const ringGeometry = new THREE.TorusGeometry(2.5, 0.05, 16, 100);
    const ringMaterial = new THREE.MeshPhongMaterial({ color: 0x00eefc });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    const timer = new THREE.Timer();
    let animationFrameId: number;

    function animate() {
        timer.update();
        const elapsedTime = timer.getElapsed();
        
        core.rotation.y = elapsedTime * 0.5;
        core.rotation.x = elapsedTime * 0.3;
        
        ring.rotation.z = elapsedTime * 0.2;
        ring.rotation.x = Math.PI / 2 + Math.sin(elapsedTime * 0.5) * 0.2;
        
        group.rotation.y = Math.sin(elapsedTime * 0.2) * 0.1;

        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
    }
    
    animate();

    const handleResize = () => {
        if (!containerRef.current) return;
        const w = containerRef.current.clientWidth || window.innerWidth;
        const h = containerRef.current.clientHeight || window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
    };
  }, []);

  // Shader
  useEffect(() => {
    const canvas = shaderContainerRef.current;
    if (!canvas) return;

    let animationFrameId: number;

    function syncSize() {
      const w = canvas!.clientWidth  || 1280;
      const h = canvas!.clientHeight || 720;
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width  = w;
        canvas!.height = h;
      }
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

void main() {
    vec2 uv = v_texCoord;
    
    float grid = sin(uv.x * 50.0 + u_time) * sin(uv.y * 50.0 + u_time);
    grid = smoothstep(0.9, 1.0, grid);
    
    float wave = sin(uv.x * 10.0 + u_time * 0.5) * 0.5 + 0.5;
    float wave2 = cos(uv.y * 8.0 - u_time * 0.3) * 0.5 + 0.5;
    
    vec3 color1 = vec3(0.06, 0.08, 0.10); 
    vec3 color2 = vec3(0.95, 0.79, 0.31); 
    vec3 color3 = vec3(0.0, 0.93, 0.98); 
    
    vec3 finalColor = mix(color1, color2 * 0.1, grid);
    finalColor += color3 * (wave * wave2) * 0.05;
    
    gl_FragColor = vec4(finalColor, 1.0);
}`;
    function cs(type: number, src: string) {
      const s = (gl as WebGLRenderingContext).createShader(type);
      if (!s) return null;
      (gl as WebGLRenderingContext).shaderSource(s, src);
      (gl as WebGLRenderingContext).compileShader(s);
      return s;
    }
    
    const prog = gl.createProgram();
    if (!prog) return;

    const vShader = cs(gl.VERTEX_SHADER, vs);
    const fShader = cs(gl.FRAGMENT_SHADER, fs);
    if (vShader) gl.attachShader(prog, vShader);
    if (fShader) gl.attachShader(prog, fShader);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    
    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    
    function render(t: number) {
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      if (uTime) gl!.uniform1f(uTime, t * 0.001);
      if (uRes) gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    }
    
    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  useGSAP(() => {
    if (!heroRef.current) return;
    
    const tl = gsap.timeline();
    tl.from('.hero-title', { opacity: 0, y: 50, duration: 1, ease: 'power4.out' })
      .from('.hero-desc', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .from('.hero-btn', { opacity: 0, scale: 0.9, stagger: 0.2, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.4')
      .from('.floating-core', { opacity: 0, scale: 0.8, duration: 1.5, ease: 'power2.out' }, '-=1');

    gsap.to('.floating-core', {
        y: 20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
  }, { scope: heroRef });

  return (
    <>
      <div 
        ref={containerRef} 
        className="fixed inset-0 w-full h-full pointer-events-none opacity-40 z-0" 
      />
      <section ref={heroRef} className="relative min-h-[921px] flex flex-col items-center justify-center overflow-hidden px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl items-center w-full max-w-7xl mx-auto">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/20 border border-primary/20 mb-md">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label-caps text-label-caps text-primary uppercase">{t('tag')}</span>
            </div>
            <h1 className="hero-title font-display-lg text-display-lg text-on-surface mb-md">
                {t('title_start')} <span className="text-primary italic">{t('title_highlight')}</span> {t('title_end')}
            </h1>
            <p className="hero-desc font-body-lg text-body-lg text-on-surface-variant mb-xl max-w-[576px]">
                {t('desc')}
            </p>
            <div className="flex flex-wrap gap-md">
              <button className="hero-btn px-xl py-md bg-primary text-on-primary font-headline-md rounded-lg shadow-xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all">
                  {t('btn_primary')}
              </button>
              <button className="hero-btn px-xl py-md border border-outline text-on-surface font-technical-data rounded-lg hover:bg-on-surface/5 transition-all">
                  {t('btn_secondary')}
              </button>
            </div>
          </div>
          
          <div className="relative h-[400px] lg:h-[600px] order-1 lg:order-2 flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(103,80,164,0.1)_0%,transparent_70%)]"></div>
            
            <div className="w-full h-full floating-core">
              <canvas ref={shaderContainerRef} className="w-full h-full block" />
            </div>
            
            {/* Circuit Decorative Overlay */}
            <div className="absolute inset-0 pointer-events-none border border-primary/10 rounded-full scale-110 animate-spin-slow"></div>
          </div>
        </div>
      </section>
    </>
  );
}
