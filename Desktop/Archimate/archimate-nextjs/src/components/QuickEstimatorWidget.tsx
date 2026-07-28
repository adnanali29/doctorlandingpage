"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, ArrowRight, Layers } from "lucide-react";

export function QuickEstimatorWidget() {
  const [plotArea, setPlotArea] = useState<number>(0);
  const [floors, setFloors] = useState<number>(0);

  const builtUpArea = plotArea * floors;
  // Standard Indian empirical averages:
  // Cement: ~0.4 bags per sq.ft of builtup area
  const cementBags = Math.round(builtUpArea * 0.4);
  // Steel: ~3.5 kg per sq.ft of builtup area -> in Tons
  const steelTons = Math.round((builtUpArea * 3.5) / 1000 * 10) / 10;
  // CAD turnaround: 3 to 5 days
  const cadDays = floors <= 2 ? "3 - 4 Days" : "5 - 7 Days";

  return (
    <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-[#0d0d0d] via-[#120e0a] to-[#0a0a0a] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#111] border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#e07a3a]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Info & Inputs */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest text-[#e07a3a] bg-[#e07a3a]/15 px-3 py-1 rounded border border-[#e07a3a]/30 mb-3">
                  <Zap className="w-3.5 h-3.5" /> Instant Construction Estimator
                </span>
                <h3 className="text-3xl md:text-4xl font-extrabold text-white">
                  Quick House &amp; Project <em className="font-serif-italic text-[#d4a853] font-normal">Scope Estimator</em>
                </h3>
                <p className="text-xs text-[#888] mt-2 leading-relaxed">
                  Enter your plot size and number of floors to instantly estimate total material requirements and AutoCAD blueprint drafting turnaround.
                </p>
              </div>

              {/* Inputs */}
              <div className="space-y-5 bg-black/40 p-6 rounded-xl border border-white/10">
                {/* Plot Size Input */}
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-white mb-2">
                    <label htmlFor="plot-area" className="text-[#888] uppercase tracking-wider">Plot Size (Sq.Ft):</label>
                    {plotArea > 0 && (
                      <span className="text-[#e07a3a] font-mono text-sm">{plotArea.toLocaleString()} Sq.Ft</span>
                    )}
                  </div>
                  <input
                    id="plot-area"
                    type="number"
                    min={1}
                    value={plotArea === 0 ? "" : plotArea}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setPlotArea(isNaN(val) || val < 0 ? 0 : val);
                    }}
                    placeholder="e.g. 1200"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-white text-sm font-mono placeholder-[#555] focus:outline-none focus:border-[#e07a3a] focus:ring-1 focus:ring-[#e07a3a]/40 transition-all"
                  />
                </div>

                {/* Floor Count Input */}
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-white mb-2">
                    <label htmlFor="floor-count" className="text-[#888] uppercase tracking-wider">Number of Floors:</label>
                    {floors > 0 && (
                      <span className="text-[#d4a853] font-mono text-sm">
                        {floors === 1 ? "Ground Floor (G)" : `G+${floors - 1} (${floors} Floors)`}
                      </span>
                    )}
                  </div>
                  <input
                    id="floor-count"
                    type="number"
                    min={1}
                    max={20}
                    value={floors === 0 ? "" : floors}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setFloors(isNaN(val) || val < 0 ? 0 : val);
                    }}
                    placeholder="e.g. 2  (G+1 = 2 floors)"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-white text-sm font-mono placeholder-[#555] focus:outline-none focus:border-[#d4a853] focus:ring-1 focus:ring-[#d4a853]/40 transition-all"
                  />
                  <p className="text-[10px] text-[#555] mt-1.5">Enter total floors — 1 = Ground only · 2 = G+1 · 3 = G+2</p>
                </div>
              </div>
            </div>

            {/* Right Result Display */}
            <div className="lg:col-span-6 bg-gradient-to-br from-[#16120e] to-black border border-white/15 rounded-xl p-8 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-[#d4a853] mb-4 pb-3 border-b border-white/10 flex justify-between items-center">
                  <span>Instant Estimates</span>
                  <span className="text-[10px] text-[#888] font-normal">IS Code Avg.</span>
                </div>

                {plotArea > 0 && floors > 0 ? (
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                      <span className="text-[11px] text-[#888] block mb-1">Built-Up Area</span>
                      <span className="text-xl font-extrabold text-white font-mono">
                        {builtUpArea.toLocaleString()} <span className="text-xs text-[#e07a3a]">sq.ft</span>
                      </span>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                      <span className="text-[11px] text-[#888] block mb-1">Est. Cement Bags</span>
                      <span className="text-xl font-extrabold text-white font-mono">
                        {cementBags.toLocaleString()} <span className="text-xs text-[#d4a853]">Bags</span>
                      </span>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                      <span className="text-[11px] text-[#888] block mb-1">Steel Rebar Weight</span>
                      <span className="text-xl font-extrabold text-white font-mono">
                        {steelTons} <span className="text-xs text-[#e07a3a]">Tons</span>
                      </span>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                      <span className="text-[11px] text-[#888] block mb-1">CAD Delivery Time</span>
                      <span className="text-xl font-extrabold text-white font-mono">
                        {cadDays}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center mb-6">
                    <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                      <Layers className="w-6 h-6 text-[#555]" />
                    </div>
                    <p className="text-xs text-[#555] leading-relaxed">
                      Enter your plot size and number of floors<br />on the left to see instant estimates
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-[#aaa]">
                  Need full structural drawings &amp; 3D elevation?
                </span>
                <Link
                  href={`/contact?note=${encodeURIComponent(
                    `Estimator: ${plotArea} sq.ft (${floors === 1 ? "G" : `G+${floors - 1}`}), Built-up: ${builtUpArea} sq.ft`
                  )}`}
                  className="px-5 py-3 bg-[#e07a3a] hover:bg-[#c9682b] text-white text-xs font-bold uppercase tracking-widest rounded transition-all inline-flex items-center gap-2 shadow-lg"
                >
                  Get Official Drawings <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
