"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, Layers, ShieldCheck, Compass, HardHat } from "lucide-react";

export default function ProcessPage() {
  const steps = [
    {
      num: "01",
      title: "Discovery & Site Topography Survey",
      duration: "Day 1 - Day 2",
      text: "We begin with an in-depth consultation to understand your project vision, plot dimensions, soil bearing capacity, budget boundaries, and local BDA/CDA municipal setback regulations.",
      deliverables: ["Site Boundary Verification", "Soil Bearing Assessment Note", "Client Requirement Specification"],
      icon: <Compass className="w-6 h-6 text-[#e07a3a]" />,
    },
    {
      num: "02",
      title: "Vastu & Conceptual 2D Layout",
      duration: "Day 2 - Day 4",
      text: "Preliminary floor plans are drafted incorporating Vastu principles (entry facing, kitchen fire zone, master bedroom quadrant) and solar orientation for maximum room lighting.",
      deliverables: ["Initial 2D Conceptual Floor Plan", "Vastu Compliance Map", "Iterative Revision Reviews"],
      icon: <Layers className="w-6 h-6 text-[#d4a853]" />,
    },
    {
      num: "03",
      title: "Detailed AutoCAD Technical Drafting",
      duration: "Day 4 - Day 6",
      text: "Once the concept is frozen, we generate complete 2D working drawings — including column placement, footing layouts, beam cross-sections, plumbing schematics, and electrical point drawings.",
      deliverables: ["AutoCAD Full Construction Blueprint", "Column & Footing Placement Sets", "Plumbing & Sanitary Drawings"],
      icon: <FileText className="w-6 h-6 text-[#e07a3a]" />,
    },
    {
      num: "04",
      title: "Structural Load Analysis & Bar Bending Schedule",
      duration: "Day 6 - Day 8",
      text: "Using STAAD.Pro finite element modeling, we calculate dead loads, live loads, and wind/seismic shear forces per IS 456 & IS 1893 standards, generating precise Bar Bending Schedules (BBS).",
      deliverables: ["STAAD.Pro Load Analysis Report", "Bar Bending Schedule (BBS)", "Rebar Detailing & Lap Length Sheet"],
      icon: <ShieldCheck className="w-6 h-6 text-[#d4a853]" />,
    },
    {
      num: "05",
      title: "3D Elevation Rendering & Facade Specs",
      duration: "Day 8 - Day 10",
      text: "High-definition 3D front elevations are rendered showcasing exterior color combinations, lighting fixtures, balcony railings, and modern cladding materials.",
      deliverables: ["High-Res 3D Exterior Views", "Material & Paint Shade Cards", "Day / Night Lighting Preview"],
      icon: <Compass className="w-6 h-6 text-[#e07a3a]" />,
    },
    {
      num: "06",
      title: "Final Handoff & On-Site Civil Supervision",
      duration: "Ongoing Construction Support",
      text: "Final construction drawings are delivered in PDF, DWG, and printed blue format. Our civil team conducts key site stage inspections prior to slab and footing casting.",
      deliverables: ["Complete DWG & PDF Drawing Vault", "Municipal Approval Blueprint Copies", "On-Site Rebar Tying Verification"],
      icon: <HardHat className="w-6 h-6 text-[#d4a853]" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-28 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16">
          <p className="sec-label">How We Work</p>
          <h1 className="section-title text-4xl md:text-6xl mb-4">
            Our 6-Phase <em className="font-serif-italic text-[#d4a853] font-normal">Workflow Process</em>
          </h1>
          <p className="text-base text-[#888] leading-relaxed">
            From initial site topography survey and Vastu layout sketching to STAAD.Pro structural load verification and on-site rebar inspection — our step-by-step process ensures zero errors.
          </p>
        </div>

        {/* Workflow Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-[#111] border border-white/10 rounded-xl p-8 flex flex-col justify-between hover:border-[#e07a3a]/50 transition-all duration-300 relative"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                      {step.icon}
                    </div>
                    <span className="text-2xl font-black text-white font-mono">{step.num}</span>
                  </div>
                  <span className="text-xs font-bold text-[#e07a3a] bg-[#e07a3a]/10 border border-[#e07a3a]/20 px-3 py-1 rounded">
                    {step.duration}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-xs text-[#aaa] leading-relaxed mb-6">{step.text}</p>

                {/* Key Deliverables */}
                <div className="space-y-2 bg-white/5 p-4 rounded-lg border border-white/5">
                  <span className="text-[10px] font-bold text-[#d4a853] uppercase tracking-wider block mb-2">
                    Phase Deliverables:
                  </span>
                  {step.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#ccc]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#e07a3a] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="p-10 bg-[#16120e] border border-[#e07a3a]/30 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Ready to Start Step 01?</h3>
            <p className="text-xs text-[#aaa] max-w-xl">
              Book a free 30-minute site consultation or upload your plot dimensions to receive a preliminary Vastu layout concept.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3 bg-[#e07a3a] text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-[#c9682b] transition-all whitespace-nowrap shadow-lg inline-flex items-center gap-2"
          >
            Schedule Consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
