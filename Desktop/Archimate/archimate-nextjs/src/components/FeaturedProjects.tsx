"use client";

import { useState } from "react";
import Link from "next/link";
import { projectsData, Project } from "@/data/projects";
import { ArrowRight, MapPin, Calendar, Layers, ShieldCheck, ChevronRight } from "lucide-react";
import { ProjectModal } from "@/components/ProjectModal";

export function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Top 4 flagship projects
  const top4Projects = projectsData.slice(0, 4);

  return (
    <section className="py-24 px-6 md:px-12 bg-[#0a0a0a] border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="sec-label">Selected Work Done</p>
            <h2 className="section-title text-3xl md:text-5xl">
              Featured <em className="font-serif-italic text-[#d4a853] font-normal">Projects</em>
            </h2>
            <p className="text-sm text-[#888] mt-3 max-w-xl">
              A curated showcase of our top civil engineering and architectural drafting achievements across Odisha — built for durability, elegance, and IS-code compliance.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#e07a3a] hover:text-white transition-colors"
          >
            Explore All 22+ Projects <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Top 4 Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {top4Projects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group bg-[#111] border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-[#e07a3a]/60 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Project Image Header */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-black/30" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-black/70 backdrop-blur-md text-[#e07a3a] text-[10px] font-extrabold uppercase tracking-widest rounded border border-[#e07a3a]/30">
                      {project.category}
                    </span>
                    <span className="px-2.5 py-1 bg-black/70 backdrop-blur-md text-white text-[10px] font-medium tracking-wider rounded border border-white/10 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#d4a853]" /> IS Code Compliant
                    </span>
                  </div>

                  {/* Area Badge */}
                  <div className="absolute bottom-4 right-4 px-3 py-1 bg-[#e07a3a] text-white text-xs font-bold rounded shadow-lg">
                    {project.builtUpArea}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-4 text-xs text-[#888] mb-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#e07a3a]" /> {project.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#d4a853]" /> Completed {project.completionYear}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white group-hover:text-[#e07a3a] transition-colors mb-3">
                    {project.title}
                  </h3>

                  <p className="text-xs text-[#aaa] leading-relaxed line-clamp-2 mb-6">
                    {project.desc}
                  </p>

                  {/* Tech specs summary */}
                  <div className="p-3 bg-white/5 rounded-lg border border-white/5 text-[11px] text-[#ccc] space-y-1">
                    <div className="flex justify-between">
                      <span className="text-[#888]">Structure Frame:</span>
                      <span className="font-semibold text-white">{project.specs.structureType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#888]">Steel Rebar:</span>
                      <span className="font-semibold text-[#d4a853]">{project.specs.steelGrade}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 md:px-8 py-4 border-t border-white/10 bg-[#0d0d0d] flex items-center justify-between">
                <span className="text-xs font-bold text-white tracking-wider flex items-center gap-1 group-hover:text-[#e07a3a] transition-colors">
                  View Full Structural Specs <ChevronRight className="w-4 h-4 text-[#e07a3a]" />
                </span>
                <span className="text-[10px] text-[#666] uppercase tracking-widest font-mono">
                  ID: ARCHI-0{project.id}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}
