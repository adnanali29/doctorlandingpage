"use client";

import { useState, useRef } from "react";
import { projectsData, Project } from "@/data/projects";
import { ProjectModal } from "@/components/ProjectModal";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (trackRef.current) {
      const scrollAmount = direction === "left" ? -420 : 420;
      trackRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] pt-28 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
          <div>
            <p className="sec-label">Portfolio</p>
            <h1 className="section-title">
              Selected <em className="font-serif-italic text-[#d4a853] font-normal">Works</em>
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="pnav-btn"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="pnav-btn"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Gallery Track */}
        <div className="proj-track" ref={trackRef}>
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="proj-card"
              onClick={() => setSelectedProject(project)}
            >
              <img src={project.image} alt={project.title} loading="lazy" />
              <div className="proj-overlay">
                <span className="proj-cat">{project.category}</span>
                <h3 className="proj-title">{project.title}</h3>
                <span className="proj-link">
                  View Details <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
