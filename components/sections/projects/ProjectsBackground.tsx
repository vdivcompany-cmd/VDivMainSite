"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ProjectsBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

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

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xf2ca50, 1.5);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Geometry: A central "Engine" or core representing technology
    const group = new THREE.Group();
    scene.add(group);

    // Central shape removed per user request

    // Ring shape removed per user request

    // Animation Loop
    const clock = new THREE.Clock();
    let animationFrameId: number;

    function animate() {
        const elapsedTime = clock.getElapsedTime();
        
        // core removed
        // ring removed
        
        group.rotation.y = Math.sin(elapsedTime * 0.2) * 0.1;

        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    function handleResize() {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth || window.innerWidth;
      const h = containerRef.current.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      // Clean up geometries and materials
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 w-full h-full z-0 opacity-40 pointer-events-none" 
      ref={containerRef}
    />
  );
}
