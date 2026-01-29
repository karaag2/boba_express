"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useSpring } from "framer-motion";

interface ProductBottleScrollProps {
  folderPath?: string;
  frameCount?: number;
}

export default function ProductBottleScroll({
  folderPath = "/frames",
  frameCount = 192,
}: ProductBottleScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = `${folderPath}/${i}.webp`;
        img.onload = () => {
            loadedCount++;
            if (loadedCount === frameCount) {
                setIsLoaded(true);
            }
        };
        loadedImages.push(img);
    }
    setImages(loadedImages);
  }, [folderPath, frameCount]);

  // Draw to canvas
  useEffect(() => {
    if (!isLoaded || !canvasRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const render = () => {
        const progress = smoothProgress.get();
        const frameIndex = Math.min(
            frameCount - 1,
            Math.floor(progress * frameCount)
        );

        const img = images[frameIndex];
        if (img) {
            // Responsive canvas sizing
            const scale = Math.min(
                canvas.width / img.width,
                canvas.height / img.height
            );
            const x = (canvas.width - img.width * scale) / 2;
            const y = (canvas.height - img.height * scale) / 2;
            
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(
                img,
                x,
                y,
                img.width * scale,
                img.height * scale
            );
        }
        requestAnimationFrame(render);
    };

    const handleResize = () => {
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const animationId = requestAnimationFrame(render);

    return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener("resize", handleResize);
    };
  }, [isLoaded, images, frameCount, smoothProgress]);

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-background">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-background z-50">
            <div className="text-display text-4xl animate-pulse">Chargement de l&apos;expérience...</div>
          </div>
        )}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain"
        />
        
        {/* Overlay Content based on scroll progress */}
        <div className="absolute inset-0 z-10 pointer-events-none">
            {/* You can add dynamic text here that fades in/out based on scroll */}
        </div>
      </div>
    </div>
  );
}
