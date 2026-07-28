"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What technical drawings are included in a full AutoCAD blueprint set?",
      a: "Our complete AutoCAD drawing package includes 2D Architectural Floor Plans (G+1, G+2, etc.), Structural Column & Footing Layouts, Beam-Slab Rebar Details, 3D Front Elevation Renders, Cross-Section Views, Plumbing/Sanitary Schematics, and Electrical Layouts ready for municipal approval and contractor execution."
    },
    {
      q: "How do your Civil Engineering Calculators estimate material requirements?",
      a: "Our calculators utilize standard Indian Standard (IS Code) formulas and empirical dry volume factors (e.g. 1.54 multiplier for wet-to-dry concrete volume, 1.33 factor for mortar, and W = d²/162.2 for rebar steel weight per meter). This guarantees accurate material estimates with minimum site wastage."
    },
    {
      q: "Are your building floor plans compliant with Vastu Shastra and Municipal Setback Rules?",
      a: "Yes! Every residential and commercial plan we draft is carefully optimized to harmonize Vastu principles (direction of entrance, kitchen fire zone, master bedroom placement) with local municipal corporation guidelines (BDA / CDA / Municipal setback & FAR requirements)."
    },
    {
      q: "What is the standard turnaround time for a residential house plan?",
      a: "Initial 2D layout concepts are delivered within 48 to 72 hours. Complete structural, elevation, and 3D rendering packages take between 5 to 7 business days following iterative client reviews."
    },
    {
      q: "Do you provide on-site structural inspection and bar-bending supervision?",
      a: "Yes. In addition to digital drafting, our civil engineers conduct key site stage inspections prior to foundation pouring, column casting, and slab rebar tying to verify contractor compliance with drawing specifications."
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-[#0a0a0a] border-t border-white/10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="sec-label justify-center">Got Questions?</p>
          <h2 className="section-title text-3xl md:text-5xl">
            Frequently Asked <em className="font-serif-italic text-[#d4a853] font-normal">Questions</em>
          </h2>
          <p className="text-sm text-[#888] mt-3">
            Everything you need to know about our civil drafting services, IS-code standards, and calculation tools.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#111] border border-white/10 rounded-lg overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="text-base font-bold text-white flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#e07a3a] shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#d4a853] shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-sm text-[#aaa] leading-relaxed border-t border-white/5 bg-black/30">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
