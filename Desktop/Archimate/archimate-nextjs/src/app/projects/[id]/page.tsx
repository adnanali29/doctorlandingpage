import { projectsData } from "@/data/projects";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id.toString(),
  }));
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projectsData.find((p) => p.id.toString() === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#888] hover:text-[#e07a3a] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>

        <div className="bg-[#111] border border-white/10 rounded-sm overflow-hidden">
          <div className="h-[380px] md:h-[480px] w-full relative">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#e07a3a] mb-2 block">
                {project.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-black uppercase text-white">
                {project.title}
              </h1>
            </div>
          </div>

          <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="md:col-span-2">
              <h2 className="text-xl font-bold uppercase text-white mb-4">
                Overview
              </h2>
              <p className="text-sm text-[#888] leading-relaxed mb-8">
                {project.desc}
              </p>

              <h3 className="text-sm font-bold uppercase text-white mb-4">
                Key Features
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.features.map((feat, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-bold uppercase tracking-wider text-[#888] px-3 py-1.5 border border-white/10 rounded-sm"
                  >
                    {feat}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#0a0a0a] p-6 border border-white/10 rounded-sm h-fit">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4 border-b border-white/10 pb-3">
                Project Info
              </h3>
              <div className="space-y-4 text-xs">
                <div>
                  <span className="block text-[#888] text-[9px] uppercase tracking-wider mb-1">
                    Client
                  </span>
                  <span className="font-semibold text-white">Private Client</span>
                </div>
                <div>
                  <span className="block text-[#888] text-[9px] uppercase tracking-wider mb-1">
                    Location
                  </span>
                  <span className="font-semibold text-white">Odisha, India</span>
                </div>
                <div>
                  <span className="block text-[#888] text-[9px] uppercase tracking-wider mb-1">
                    Year
                  </span>
                  <span className="font-semibold text-white">2026</span>
                </div>
              </div>

              <Link
                href={`/contact?service=${encodeURIComponent(project.title)}`}
                className="w-full mt-6 btn-p text-xs justify-center flex items-center gap-2"
              >
                Request Similar <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
