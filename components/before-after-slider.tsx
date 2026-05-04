'use client';

import { useState, useRef, useEffect, useCallback, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from 'react';
import Image from 'next/image';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  className?: string;
  onClick?: () => void;
}

export function BeforeAfterSlider({ beforeImage, afterImage, className = "", onClick }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  }, []);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      handleMove(e.clientX);
    };

    const handleTouchMove = (e: globalThis.TouchEvent) => {
      handleMove(e.touches[0].clientX);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMove]);

  return (
    <div 
      className={`relative w-full overflow-hidden select-none cursor-pointer ${className}`}
      ref={containerRef}
      onMouseDown={(e: ReactMouseEvent) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onTouchStart={(e: ReactTouchEvent) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
      }}
    >
      {/* After Image (Base) */}
      <div className="absolute inset-0 w-full h-full" onClick={onClick}>
        <Image 
          src={afterImage} 
          alt="After" 
          fill 
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          referrerPolicy="no-referrer"
        />
        <div className="absolute bottom-2 right-2 bg-slate-900/60 text-white text-[10px] uppercase px-2 py-1 rounded-sm tracking-widest backdrop-blur-sm">
          After
        </div>
      </div>

      {/* Before Image (Top layer, clipped) */}
      <div 
        className="absolute inset-y-0 left-0 h-full overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
        onClick={onClick}
      >
        <div className="relative w-full h-full">
          <Image 
            src={beforeImage} 
            alt="Before" 
            fill 
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute bottom-2 left-2 bg-slate-900/60 text-white text-[10px] uppercase px-2 py-1 rounded-sm tracking-widest backdrop-blur-sm">
          Before
        </div>
      </div>

      {/* Slider Line & Handle */}
      <div 
        className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_5px_rgba(0,0,0,0.5)] z-10 touch-none pointer-events-none"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.3)] cursor-ew-resize">
          <div className="flex gap-1">
            <div className="w-0.5 h-3 bg-slate-400 rounded-full" />
            <div className="w-0.5 h-3 bg-slate-400 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
