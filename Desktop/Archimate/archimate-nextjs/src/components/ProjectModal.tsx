"use client";

import { Project } from "@/data/projects";
import { X, ArrowRight, MapPin, Calendar, ShieldCheck, CheckCircle2, Cpu } from "lucide-react";
import Link from "next/link";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[#111] border border-white/10 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-black/60 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#e07a3a] transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image */}
        <div className="relative h-72 sm:h-96 w-full overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-black/30" />

          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="px-3 py-1 bg-[#e07a3a] text-white text-[10px] font-black uppercase tracking-widest rounded shadow">
                {project.category}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2">
                {project.title}
              </h2>
            </div>
            <span className="px-3.5 py-1.5 bg-black/70 backdrop-blur-md text-[#d4a853] text-xs font-bold rounded border border-[#d4a853]/30">
              {project.builtUpArea}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center gap-4 text-xs text-[#aaa] border-b border-white/10 pb-4">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#e07a3a]" /> {project.location}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#d4a853]" /> Completed {project.completionYear}
            </span>
          </div>

          <p className="text-sm text-[#ddd] leading-relaxed">
            {project.desc}
          </p>

          {/* Client Brief & Engineering Highlight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-lg border border-white/5 space-y-1">
              <span className="text-[10px] font-bold text-[#e07a3a] uppercase tracking-wider block">
                Client Objectives & Brief:
              </span>
              <p className="text-xs text-[#bbb] leading-relaxed">{project.clientBrief}</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg border border-white/5 space-y-1">
              <span className="text-[10px] font-bold text-[#d4a853] uppercase tracking-wider block">
                Civil Engineering Challenge Solved:
              </span>
              <p className="text-xs text-[#bbb] leading-relaxed">{project.engineeringHighlight}</p>
            </div>
          </div>

          {/* Technical Specs Grid */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#d4a853] mb-3 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-[#e07a3a]" /> IS-Code & Structural Specifications
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-black/40 p-4 rounded-lg border border-white/10">
              <div>
                <span className="text-[#888] block text-[11px]">Framing System:</span>
                <span className="font-semibold text-white">{project.specs.structureType}</span>
              </div>
              <div>
                <span className="text-[#888] block text-[11px]">Foundation Depth/Type:</span>
                <span className="font-semibold text-white">{project.specs.foundation}</span>
              </div>
              <div>
                <span className="text-[#888] block text-[11px]">Steel Reinforcement:</span>
                <span className="font-semibold text-[#e07a3a]">{project.specs.steelGrade}</span>
              </div>
              <div>
                <span className="text-[#888] block text-[11px]">Concrete Grade:</span>
                <span className="font-semibold text-[#d4a853]">{project.specs.cementGrade}</span>
              </div>
              <div>
                <span className="text-[#888] block text-[11px]">Wastage Control:</span>
                <span className="font-semibold text-white">{project.specs.wastageControl}</span>
              </div>
              <div>
                <span className="text-[#888] block text-[11px]">Compliance Standard:</span>
                <span className="font-semibold text-white">{project.specs.isCode}</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.features.map((feat, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs text-[#ccc] flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#e07a3a]" /> {feat}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <Link
              href={`/contact?service=${encodeURIComponent(project.title)}`}
              onClick={onClose}
              className="px-6 py-3 bg-[#e07a3a] hover:bg-[#c9682b] text-white text-xs font-bold uppercase tracking-widest rounded transition-all inline-flex items-center gap-2"
            >
              Request Similar Project Design <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={onClose}
              className="px-5 py-3 border border-white/20 hover:border-white text-xs font-bold text-white uppercase tracking-widest rounded transition-all"
            >
              Close Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
