"use client";

import Link from "next/link";
import { HeroCarousel } from "@/components/HeroCarousel";
import { Marquee } from "@/components/Marquee";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { EngineeringCalculators } from "@/components/EngineeringCalculators";
import { BlueprintComparison } from "@/components/BlueprintComparison";
import { QuickEstimatorWidget } from "@/components/QuickEstimatorWidget";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FAQSection } from "@/components/FAQSection";
import { ArrowRight, ShieldCheck, Calculator, Building, Compass, FileCheck, Sparkles, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* 6-IMAGE HERO CAROUSEL */}
      <HeroCarousel />

      {/* MARQUEE TICKER */}
      <Marquee />

      {/* QUICK ESTIMATOR WIDGET */}
      <QuickEstimatorWidget />

      {/* TOP 4 FEATURED WORK DONE SECTION */}
      <FeaturedProjects />

      {/* 2D BLUEPRINT VS 3D ELEVATION SLIDER */}
      <BlueprintComparison />

      {/* CIVIL ENGINEERING CALCULATORS SECTION */}
      <section className="py-24 px-6 md:px-12 bg-[#0d0d0d] border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <p className="sec-label">Interactive Construction Suite</p>
              <h2 className="section-title text-3xl md:text-5xl">
                Civil Engineering <em className="font-serif-italic text-[#d4a853] font-normal">Calculators</em>
              </h2>
              <p className="text-sm text-[#888] mt-3 max-w-2xl">
                Calculate exact site material estimates — bricks, cement bags, concrete slab volume, tile boxes, and steel rod weights (d²/162.2) right here.
              </p>
            </div>

            <Link
              href="/calculators"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#e07a3a] hover:text-white transition-colors"
            >
              Full Calculator Suite <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Calculator Component */}
          <EngineeringCalculators />
        </div>
      </section>

      {/* CORE CAPABILITIES / SERVICES PREVIEW */}
      <section className="py-24 px-6 md:px-12 bg-[#0a0a0a] border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="sec-label justify-center">Engineering Expertise</p>
            <h2 className="section-title text-3xl md:text-5xl">
              Core <em className="font-serif-italic text-[#d4a853] font-normal">Capabilities</em>
            </h2>
            <p className="text-sm text-[#888] mt-3">
              Comprehensive civil engineering and architectural drafting services designed for regulatory approval, structural stability, and contractor execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-[#111] border border-white/10 rounded-xl flex flex-col justify-between group hover:border-[#e07a3a]/50 transition-all shadow-xl">
              <div>
                <Building className="w-10 h-10 text-[#e07a3a] mb-6" />
                <h3 className="text-xl font-bold uppercase text-white mb-3">
                  AutoCAD 2D & 3D Drafting
                </h3>
                <p className="text-xs text-[#888] leading-relaxed mb-6">
                  Precision architectural drafting including floor plans, electrical schematics, plumbing layouts, and contractor-ready construction sets.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-2.5 py-1 bg-white/5 text-[10px] font-semibold text-[#aaa] rounded">Floor Plans</span>
                  <span className="px-2.5 py-1 bg-white/5 text-[10px] font-semibold text-[#aaa] rounded">Structural Column Sets</span>
                </div>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#e07a3a] group-hover:translate-x-1 transition-transform"
              >
                Explore Services <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-8 bg-[#111] border border-white/10 rounded-xl flex flex-col justify-between group hover:border-[#e07a3a]/50 transition-all shadow-xl">
              <div>
                <Compass className="w-10 h-10 text-[#d4a853] mb-6" />
                <h3 className="text-xl font-bold uppercase text-white mb-3">
                  3D Elevation & Facade
                </h3>
                <p className="text-xs text-[#888] leading-relaxed mb-6">
                  Photorealistic 3D exterior renders and facade modeling blending modern minimalist aesthetics with durable structural materials.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-2.5 py-1 bg-white/5 text-[10px] font-semibold text-[#aaa] rounded">3D Renders</span>
                  <span className="px-2.5 py-1 bg-white/5 text-[10px] font-semibold text-[#aaa] rounded">Lighting & Texture</span>
                </div>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#e07a3a] group-hover:translate-x-1 transition-transform"
              >
                View Elevation Work <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-8 bg-[#111] border border-white/10 rounded-xl flex flex-col justify-between group hover:border-[#e07a3a]/50 transition-all shadow-xl">
              <div>
                <FileCheck className="w-10 h-10 text-[#e07a3a] mb-6" />
                <h3 className="text-xl font-bold uppercase text-white mb-3">
                  Municipal Approvals
                </h3>
                <p className="text-xs text-[#888] leading-relaxed mb-6">
                  Government authority-compliant blueprint sets (BDA, CDA, Municipal Corporations) engineered to ensure 100% approval rates.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-2.5 py-1 bg-white/5 text-[10px] font-semibold text-[#aaa] rounded">BDA / CDA Compliant</span>
                  <span className="px-2.5 py-1 bg-white/5 text-[10px] font-semibold text-[#aaa] rounded">Setback Verification</span>
                </div>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#e07a3a] group-hover:translate-x-1 transition-transform"
              >
                Get Approval Blueprints <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <TestimonialsSection />

      {/* FAQ SECTION */}
      <FAQSection />

      {/* BOTTOM CALL TO ACTION */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-r from-[#111] via-[#16120e] to-[#111] border-t border-white/10">
        <div className="max-w-5xl mx-auto text-center">
          <span className="px-3 py-1 bg-[#e07a3a]/20 text-[#e07a3a] border border-[#e07a3a]/30 text-xs font-bold uppercase tracking-widest rounded inline-block mb-4">
            Start Your Building Journey
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
            Ready to Turn Blueprints Into <em className="font-serif-italic text-[#d4a853] font-normal">Reality?</em>
          </h2>
          <p className="text-sm text-[#aaa] max-w-2xl mx-auto mb-8 leading-relaxed">
            Whether you need a Vastu-compliant residential 2D floor plan, 3D front elevation design, or material estimations, our engineers are here to assist.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 bg-[#e07a3a] hover:bg-[#c9682b] text-white text-xs font-bold uppercase tracking-widest rounded shadow-xl transition-all inline-flex items-center gap-2"
            >
              Request Consultation <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/calculators"
              className="px-8 py-4 border border-white/20 hover:border-white text-white text-xs font-bold uppercase tracking-widest rounded transition-all inline-flex items-center gap-2"
            >
              Try Civil Calculators <Calculator className="w-4 h-4 text-[#e07a3a]" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
