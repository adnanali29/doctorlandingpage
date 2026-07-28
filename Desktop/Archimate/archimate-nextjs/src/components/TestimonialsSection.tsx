"use client";

import { testimonialsData } from "@/data/testimonials";
import { Star, Quote, CheckCircle2 } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section className="py-24 px-6 md:px-12 bg-[#0d0d0d] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="sec-label justify-center">Client & Contractor Trust</p>
          <h2 className="section-title text-3xl md:text-5xl">
            Words From Our <em className="font-serif-italic text-[#d4a853] font-normal">Clients</em>
          </h2>
          <p className="text-sm text-[#888] mt-3">
            Read verified feedback from property owners, chief contractors, and commercial developers who built their projects with ArchiMate drawings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              className="bg-[#111] border border-white/10 p-8 rounded-xl relative flex flex-col justify-between hover:border-[#e07a3a]/40 transition-all shadow-xl"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-white/5 pointer-events-none" />

              <div>
                <div className="flex items-center gap-1 mb-4 text-[#e07a3a]">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-sm text-[#ddd] leading-relaxed italic mb-6">
                  "{item.content}"
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center gap-4">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#e07a3a]"
                />
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-1.5">
                    {item.name}
                    {item.verified && (
                      <span title="Verified Client">
                        <CheckCircle2 className="w-4 h-4 text-[#e07a3a] inline" />
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-[#d4a853] font-medium">{item.role}</p>
                  <p className="text-[11px] text-[#888] mt-0.5">{item.projectType} • {item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
