"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";

interface Props {
  /** Called as frames finish loading. Throttled to every 5 frames + final. */
  onProgress?: (loaded: number, total: number) => void;
}

export default function ScrollyCanvas({ onProgress }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  const totalFrames = 100;
  const { scrollYProgress } = useScroll({
    target:  containerRef,
    offset:  ["start start", "end end"],
  });
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

  const basePath = typeof process.env.NEXT_PUBLIC_BASE_PATH === "string"
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : "";

  // ── Preload frames ─────────────────────────────────────────────────────
  const onProgressRef = useRef(onProgress);
  useEffect(() => { onProgressRef.current = onProgress; }, [onProgress]);

  useEffect(() => {
    const preloadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];

      for (let i = 0; i < totalFrames; i++) {
        const img     = new Image();
        const frameStr = i.toString().padStart(2, "0");
        img.src = `${basePath}/sequence/frame_${frameStr}_delay-0.066s.webp`;

        await new Promise<void>((resolve) => {
          img.onload  = () => resolve();
          img.onerror = () => resolve(); // continue on failure
        });

        loadedImages.push(img);
        const loaded = i + 1;

        // Throttle: report every 5 frames and on the final frame
        if (loaded % 5 === 0 || loaded === totalFrames) {
          onProgressRef.current?.(loaded, totalFrames);
        }
      }

      setImages(loadedImages);
    };

    preloadImages();
  }, [basePath]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Sync canvas to scroll position ────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const unsubscribe = frameIndex.on("change", (latest) => {
      const img = images[Math.round(latest)];
      if (img?.complete) renderFrame(ctx, img, canvas);
    });

    if (images[0]) renderFrame(ctx, images[0], canvas);

    return () => unsubscribe();
  }, [images, frameIndex]);

  const renderFrame = (
    ctx:    CanvasRenderingContext2D,
    img:    HTMLImageElement,
    canvas: HTMLCanvasElement,
  ) => {
    const { width, height } = canvas;
    const imgRatio    = img.width / img.height;
    const canvasRatio = width / height;

    let drawWidth  = width;
    let drawHeight = height;
    let offsetX    = 0;
    let offsetY    = 0;

    if (imgRatio > canvasRatio) {
      drawWidth  = height * imgRatio;
      offsetX    = (width - drawWidth) / 2;
    } else {
      drawHeight = width / imgRatio;
      offsetY    = (height - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // ── Debounced resize + orientationchange ───────────────────────────────
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const applyResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width  = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      if (images.length > 0) {
        const ctx   = canvasRef.current.getContext("2d");
        const index = Math.round(frameIndex.get());
        if (ctx && images[index]) renderFrame(ctx, images[index], canvasRef.current);
      }
    };

    const handleResize = () => {
      clearTimeout(timer);
      timer = setTimeout(applyResize, 120);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", applyResize);
    applyResize();

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", applyResize);
    };
  }, [images, frameIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ objectFit: "cover" }}
        />
        {/* No internal loading overlay — LoadingScreen handles visibility */}
      </div>
    </div>
  );
}
