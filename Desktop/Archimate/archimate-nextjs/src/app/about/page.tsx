import Link from "next/link";
import { ShieldCheck, Cpu, Building2, Users, Award, CheckCircle2, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-28 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <p className="sec-label">Our Story & Identity</p>
          <h1 className="section-title text-4xl md:text-6xl mb-6">
            Engineering Precision meets <em className="font-serif-italic text-[#d4a853] font-normal">Architectural Vision</em>
          </h1>
          <p className="text-base text-[#888] leading-relaxed">
            Founded in Odisha, India, **ArchiMate** is a premier civil engineering and architectural drafting studio. We bridge the gap between creative architectural design, structural engineering integrity, and municipal compliance.
          </p>
        </div>

        {/* Hero Image & Philosophy Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-center">
          <div className="lg:col-span-6 rounded-xl overflow-hidden border border-white/10 relative group">
            <img
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85"
              alt="ArchiMate Design Studio Philosophy"
              className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/60 backdrop-blur-md rounded border border-white/10">
              <p className="text-xs text-[#d4a853] font-mono">STATIONED IN ODISHA, INDIA</p>
              <p className="text-sm font-bold text-white mt-1">Serving Residential, Commercial & Heritage Restoration Projects</p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <blockquote className="p-6 bg-[#111] border-l-4 border-[#e07a3a] text-lg text-white italic rounded-r-lg font-serif">
              "Every line we draw in AutoCAD is backed by physics, Indian Standard building codes, and structural safety calculations."
            </blockquote>

            <p className="text-sm text-[#aaa] leading-relaxed">
              Whether designing a compact urban duplex on a tight plot or a 12-storey commercial apartment tower, our team approaches every blueprint with the same rigorous standard of accuracy.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-[#111] border border-white/10 rounded-lg">
                <div className="text-2xl font-extrabold text-[#e07a3a]">100%</div>
                <div className="text-xs text-[#888] mt-1">IS-Code Compliant Load Models</div>
              </div>
              <div className="p-4 bg-[#111] border border-white/10 rounded-lg">
                <div className="text-2xl font-extrabold text-[#d4a853]">22+</div>
                <div className="text-xs text-[#888] mt-1">Completed Blueprint Projects</div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-24">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="sec-label justify-center">Guiding Principles</p>
            <h2 className="section-title text-3xl md:text-4xl">
              Our Core <em className="font-serif-italic text-[#d4a853] font-normal">Values</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 bg-[#111] border border-white/10 rounded-xl">
              <span className="text-2xl font-mono font-bold text-[#e07a3a] block mb-3">01</span>
              <h3 className="text-base font-bold text-white mb-2">Structural Integrity</h3>
              <p className="text-xs text-[#888] leading-relaxed">
                Zero compromise on safety. Every beam, column, and foundation step adheres strictly to IS 456 and IS 1893 seismic standards.
              </p>
            </div>

            <div className="p-6 bg-[#111] border border-white/10 rounded-xl">
              <span className="text-2xl font-mono font-bold text-[#d4a853] block mb-3">02</span>
              <h3 className="text-base font-bold text-white mb-2">Design Harmony</h3>
              <p className="text-xs text-[#888] leading-relaxed">
                Seamlessly combining modern architectural elevations with traditional Vastu principles and natural light optimization.
              </p>
            </div>

            <div className="p-6 bg-[#111] border border-white/10 rounded-xl">
              <span className="text-2xl font-mono font-bold text-[#e07a3a] block mb-3">03</span>
              <h3 className="text-base font-bold text-white mb-2">Material Efficiency</h3>
              <p className="text-xs text-[#888] leading-relaxed">
                Through Bar Bending Schedules (BBS) and material calculators, we eliminate site steel and cement wastage by up to 15%.
              </p>
            </div>

            <div className="p-6 bg-[#111] border border-white/10 rounded-xl">
              <span className="text-2xl font-mono font-bold text-[#d4a853] block mb-3">04</span>
              <h3 className="text-base font-bold text-white mb-2">Timely Delivery</h3>
              <p className="text-xs text-[#888] leading-relaxed">
                Guaranteed 48-72 hour delivery on initial 2D layout drafting to keep your construction timeline on schedule.
              </p>
            </div>
          </div>
        </div>

        {/* Software & Tech Stack */}
        <div className="p-10 bg-[#111] border border-white/10 rounded-xl mb-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#e07a3a]">
                Software & Tool Suite
              </span>
              <h3 className="text-2xl font-bold text-white mt-1 mb-3">
                Powered by Industry-Standard Engineering Tech
              </h3>
              <p className="text-xs text-[#888] max-w-xl leading-relaxed">
                We leverage AutoCAD 2026, STAAD.Pro V8i, Revit Building Information Modeling (BIM), 3ds Max, and SketchUp to produce high-precision 2D/3D documentation.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-black border border-white/10 text-xs font-bold text-white rounded">AutoCAD 2026</span>
              <span className="px-4 py-2 bg-black border border-white/10 text-xs font-bold text-[#d4a853] rounded">STAAD.Pro</span>
              <span className="px-4 py-2 bg-black border border-white/10 text-xs font-bold text-[#e07a3a] rounded">Revit BIM</span>
              <span className="px-4 py-2 bg-black border border-white/10 text-xs font-bold text-white rounded">3ds Max & V-Ray</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#e07a3a] hover:bg-[#c9682b] text-white text-xs font-bold uppercase tracking-widest rounded shadow-xl transition-all"
          >
            Start Your Project With Us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
