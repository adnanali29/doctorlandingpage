"use client";

import { EngineeringCalculators } from "@/components/EngineeringCalculators";
import { FAQSection } from "@/components/FAQSection";
import { ShieldCheck, Zap, BookOpen, Download } from "lucide-react";

export default function CalculatorsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-28 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#e07a3a]/15 text-[#e07a3a] border border-[#e07a3a]/30 rounded text-xs font-bold uppercase tracking-widest mb-4">
            <Zap className="w-3.5 h-3.5" /> Interactive Construction Tools
          </div>
          <h1 className="section-title text-4xl md:text-6xl">
            Civil Engineering <em className="font-serif-italic text-[#d4a853] font-normal">Calculators</em>
          </h1>
          <p className="text-base text-[#888] max-w-3xl mt-4 leading-relaxed">
            Estimate exact material quantities for your building construction project — calculate bricks, cement bags, sand volume, slab concrete, tile counts, and iron rebar steel weights with Indian Standard (IS Code) dry volume adjustments.
          </p>
        </div>

        {/* Calculator Cards */}
        <div className="mb-20">
          <EngineeringCalculators />
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="p-8 bg-[#111] border border-white/10 rounded-xl">
            <ShieldCheck className="w-8 h-8 text-[#e07a3a] mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">IS Code Compliant Ratios</h3>
            <p className="text-xs text-[#888] leading-relaxed">
              Formulas integrate wet-to-dry conversion factors (1.54 multiplier for concrete and 1.33 for brick mortar) ensuring zero shortage on site during casting.
            </p>
          </div>

          <div className="p-8 bg-[#111] border border-white/10 rounded-xl">
            <Zap className="w-8 h-8 text-[#d4a853] mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Instant Steel Weight (d²/162.2)</h3>
            <p className="text-xs text-[#888] leading-relaxed">
              Calculate exact steel rebar weight in kilograms and metric tons across all standard rod diameters (8mm to 32mm) for accurate contractor procurement.
            </p>
          </div>

          <div className="p-8 bg-[#111] border border-white/10 rounded-xl">
            <BookOpen className="w-8 h-8 text-[#e07a3a] mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Site Wastage Factor</h3>
            <p className="text-xs text-[#888] leading-relaxed">
              Default 5% to 10% safety margin included for brick cutting, tile lap joint trimming, and steel scrap prevention.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <FAQSection />
      </div>
    </div>
  );
}
