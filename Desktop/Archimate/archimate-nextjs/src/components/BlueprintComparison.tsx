"use client";

import { useState } from "react";
import { Layers, Eye, Sparkles } from "lucide-react";

export function BlueprintComparison() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientPositionX: number, containerRect: DOMRect) => {
    const x = clientPositionX - containerRect.left;
    const percentage = Math.max(0, Math.min(100, (x / containerRect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const containerRect = e.currentTarget.getBoundingClientRect();
    handleMove(e.touches[0].clientX, containerRect);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging && e.buttons !== 1) return;
    const containerRect = e.currentTarget.getBoundingClientRect();
    handleMove(e.clientX, containerRect);
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-[#0a0a0a] border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="sec-label">Interactive Visualization</p>
            <h2 className="section-title text-3xl md:text-5xl">
              Blueprint to <em className="font-serif-italic text-[#d4a853] font-normal">3D Reality</em>
            </h2>
            <p className="text-sm text-[#888] mt-3 max-w-xl">
              Drag the interactive slider below to see how our precise AutoCAD 2D structural blueprints transform into photorealistic 3D architectural elevations.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-xs text-[#ccc]">
            <Sparkles className="w-4 h-4 text-[#e07a3a]" />
            <span>Drag slider horizontally to compare views</span>
          </div>
        </div>

        {/* Slider Container */}
        <div
          className="relative w-full h-[400px] md:h-[550px] rounded-xl overflow-hidden border border-white/15 shadow-2xl select-none cursor-ew-resize group"
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          {/* AFTER: 3D Render Image (Base) */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=90"
              alt="Finished 3D Elevation Render"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 right-6 px-4 py-2 bg-black/80 backdrop-blur-md text-[#e07a3a] text-xs font-extrabold uppercase tracking-widest rounded border border-[#e07a3a]/40 shadow flex items-center gap-2">
              <Eye className="w-4 h-4" /> 3D Elevation Vision
            </div>
          </div>

          {/* BEFORE: 2D Blueprint Image (Clipped overlay) */}
          <div
            className="absolute inset-0 h-full overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=90"
              alt="AutoCAD 2D Blueprint Technical Drawing"
              className="w-full h-full object-cover filter contrast-125 sepia-[0.3] brightness-75 hue-rotate-180"
              style={{ width: "100%", maxWidth: "none" }}
            />
            <div className="absolute top-6 left-6 px-4 py-2 bg-black/80 backdrop-blur-md text-[#d4a853] text-xs font-extrabold uppercase tracking-widest rounded border border-[#d4a853]/40 shadow flex items-center gap-2">
              <Layers className="w-4 h-4" /> AutoCAD 2D Blueprint
            </div>
          </div>

          {/* Divider Line */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-[#e07a3a] shadow-[0_0_15px_#e07a3a]"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-[#e07a3a] text-white rounded-full flex items-center justify-center shadow-xl border-2 border-white text-xs font-black">
              ↔
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
