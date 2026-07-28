"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Clock, FileText, Cpu, Wrench } from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      num: "01",
      title: "AutoCAD 2D & 3D Drafting",
      subtitle: "Precision Architectural & Structural Blueprints",
      desc: "Industry-standard CAD drafting ensuring 100% measurement accuracy for construction permissions, contractor execution, and site execution. Every line drawn with engineering precision.",
      deliverables: ["2D Architectural Floor Plans", "Column & Footing Placement Sets", "Electrical & Plumbing Schematics", "Contractor Working Drawings"],
      software: "AutoCAD 2026 / Revit",
      turnaround: "48 to 72 Hours",
    },
    {
      num: "02",
      title: "3D Elevation & Facade Design",
      subtitle: "Photorealistic Exterior Renders",
      desc: "The face of your building defines its identity. We craft high-resolution 3D front elevations blending modern architectural minimalism with durable, climate-resilient exterior materials.",
      deliverables: ["High-Res 3D Exterior Renderings", "Day & Night Lighting Views", "Material & Paint Palette Specs", "Balcony & Facade Detailing"],
      software: "3ds Max / SketchUp / V-Ray",
      turnaround: "3 to 5 Days",
    },
    {
      num: "03",
      title: "Structural Load & RCC Detailing",
      subtitle: "IS 456:2000 & IS 1893 Seismic Compliance",
      desc: "Structural integrity depends on precise load-bearing calculations. We perform STAAD.Pro finite element analysis and generate Bar Bending Schedules (BBS) for columns, beams, footings, and slabs.",
      deliverables: ["STAAD.Pro Load Calculations", "Bar Bending Schedules (BBS)", "Beam & Column Cross Sections", "Earthquake Resistance Certificate"],
      software: "STAAD.Pro / ETABS",
      turnaround: "4 to 6 Days",
    },
    {
      num: "04",
      title: "Vastu & Space Layout Planning",
      subtitle: "Scientific Harmonization & Carpet Area Optimization",
      desc: "Space optimization creates comfortable, functional environments. We engineer scientific layouts that maximize carpet area while strictly observing Vastu orientations.",
      deliverables: ["Vastu Orientation Mapping", "Natural Ventilation Analysis", "Furniture Layout Plans", "Carpet vs Built-up Ratio Report"],
      software: "Custom CAD + Vastu Grid",
      turnaround: "48 Hours",
    },
    {
      num: "05",
      title: "Municipal Approval Blueprints",
      subtitle: "BDA, CDA & Municipal Authority Blueprints",
      desc: "Get your building plans sanctioned on the first attempt. We prepare official municipal approval sets adhering strictly to local development authority rules, FAR ratios, and setback norms.",
      deliverables: ["Authority Approval Drawing Sets", "FAR & Coverage Calculation Sheet", "Site Surroundings & Road Width Map", "Licensed Civil Engineer Sign-off"],
      software: "AutoCAD Municipal Standard",
      turnaround: "3 to 4 Days",
    },
    {
      num: "06",
      title: "Site Inspection & Quality Audit",
      subtitle: "On-Site Structural Verification & Material Audits",
      desc: "Ensure your contractor builds exactly as engineered. Our civil engineers visit your site during key construction milestones (footing, column casting, slab reinforcement) for quality checks.",
      deliverables: ["On-Site Rebar Tying Inspection", "Concrete Mix & Slump Verification", "Quality Deviation Audit", "Milestone Clearance Report"],
      software: "On-Site Civil Checklist",
      turnaround: "On-Demand Visits",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-28 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#e07a3a]/15 text-[#e07a3a] border border-[#e07a3a]/30 rounded text-xs font-bold uppercase tracking-widest mb-4">
            <Wrench className="w-3.5 h-3.5" /> Full-Suite Civil & Architecture
          </div>
          <h1 className="section-title text-4xl md:text-6xl">
            Our Core <em className="font-serif-italic text-[#d4a853] font-normal">Services</em>
          </h1>
          <p className="text-base text-[#888] mt-4 max-w-3xl leading-relaxed">
            From preliminary Vastu floor layouts and 3D elevation renders to STAAD.Pro structural load analysis and municipal approval sets — we deliver engineering precision at every stage.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {services.map((svc) => (
            <div
              key={svc.num}
              className="bg-[#111] border border-white/10 rounded-xl p-8 flex flex-col justify-between hover:border-[#e07a3a]/50 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-black text-[#e07a3a] font-mono">{svc.num}</span>
                  <span className="text-[11px] font-semibold text-[#d4a853] bg-[#d4a853]/10 border border-[#d4a853]/20 px-2.5 py-1 rounded">
                    {svc.software}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-white group-hover:text-[#e07a3a] transition-colors mb-1">
                  {svc.title}
                </h2>
                <p className="text-xs text-[#e07a3a] font-medium mb-4">{svc.subtitle}</p>

                <p className="text-xs text-[#aaa] leading-relaxed mb-6">{svc.desc}</p>

                {/* Key Deliverables */}
                <div className="mb-6 space-y-2 bg-white/5 p-4 rounded-lg border border-white/5">
                  <span className="text-[11px] font-bold text-white uppercase tracking-wider block mb-2">
                    Key Deliverables:
                  </span>
                  {svc.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#ccc]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#e07a3a] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-[#888]">
                  <Clock className="w-3.5 h-3.5 text-[#d4a853]" />
                  <span>Turnaround: <strong className="text-white">{svc.turnaround}</strong></span>
                </div>

                <Link
                  href={`/contact?service=${encodeURIComponent(svc.title)}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#e07a3a] group-hover:translate-x-1 transition-transform"
                >
                  Get Quote <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="p-10 bg-[#16120e] border border-[#e07a3a]/30 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Need a Customized Engineering Package?</h3>
            <p className="text-xs text-[#aaa] max-w-xl">
              Combine 2D floor plans, 3D front elevations, and structural load analysis for discounted bundle rates.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3 bg-[#e07a3a] text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-[#c9682b] transition-all whitespace-nowrap shadow-lg"
          >
            Request Custom Proposal
          </Link>
        </div>
      </div>
    </div>
  );
}
