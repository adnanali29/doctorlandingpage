"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Calculator } from "lucide-react";

export function HeroCarousel() {
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=90",
      title: "Building Excellence",
      subtitle: "From Blueprint",
      tagline: "Odisha, India · Est. 2023",
      desc: "We specialize in high-precision civil engineering structural design, 2D/3D AutoCAD drafting, and architectural solutions across Odisha.",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=90",
      title: "Structural Precision",
      subtitle: "High-Rise Engineering",
      tagline: "IS-Code & BDA Approved",
      desc: "Commercial apartment towers and multi-storey framed structures designed to IS 456 & IS 1893 seismic standards.",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=90",
      title: "Vastu & Modernity",
      subtitle: "Luxury Residences",
      tagline: "Custom Villa Planning",
      desc: "Harmonizing traditional Vastu orientations with contemporary front elevation 3D renders and carpet area optimization.",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=90",
      title: "Commercial Hubs",
      subtitle: "Steel Trusses & Glass",
      tagline: "Sustainable Eco Design",
      desc: "Open-plan corporate offices featuring structural steel roof trusses, double-glazed facades, and rainwater harvesting pits.",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=90",
      title: "Urban Duplexes",
      subtitle: "Space Maximized",
      tagline: "Narrow Plot Experts",
      desc: "Smart space utilization for compact urban plots with mezzanine levels, skylight shafts, and private terrace gardens.",
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1920&q=90",
      title: "Terrain Masterplanning",
      subtitle: "Resorts & Cottages",
      tagline: "Coastal & Slope Engineering",
      desc: "Topographical slope analysis, marine-grade pile foundations, and cantilevered infinity pool structural designs.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section id="hero" className="p-0 border-b border-white/10 relative overflow-hidden h-[90vh] min-h-[700px] flex flex-col justify-end">
      {/* Automatic Background Images Carousel */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-0" : "opacity-0 pointer-events-none z-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className={`w-full h-full object-cover transform transition-transform duration-[7000ms] ${
              index === currentIndex ? "scale-105" : "scale-100"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#0a0a0a]" />
        </div>
      ))}

      <div className="hero-giant">ARCHIMATE</div>

      {/* Hero Overlay Content */}
      <div className="hero-content relative z-10 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#e07a3a]/20 border border-[#e07a3a]/40 backdrop-blur-md rounded text-[11px] font-extrabold uppercase tracking-widest text-[#e07a3a] mb-4 shadow-lg">
            <ShieldCheck className="w-4 h-4" /> {slides[currentIndex].tagline}
          </div>
          <h1 className="hero-h1">
            {slides[currentIndex].title}
            <br />
            <em className="font-serif-italic text-[#d4a853] not-italic font-normal">
              {slides[currentIndex].subtitle}
            </em>
          </h1>
        </div>

        <div className="hero-right">
          <p className="hero-desc">
            {slides[currentIndex].desc}
          </p>
          <div className="hero-btns">
            <Link href="/projects" className="btn-p shadow-xl shadow-[#e07a3a]/20">
              View Projects <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/calculators" className="btn-o flex items-center gap-2">
              <Calculator className="w-4 h-4 text-[#e07a3a]" /> Civil Calculators
            </Link>
          </div>
        </div>
      </div>

      {/* HERO STATS */}
      <div className="hero-stats">
        <div className="hstat">
          <div className="hstat-num">
            3<span className="text-[#e07a3a]">+</span>
          </div>
          <div className="hstat-lbl">Years Experience</div>
        </div>
        <div className="hstat">
          <div className="hstat-num">
            22<span className="text-[#e07a3a]">+</span>
          </div>
          <div className="hstat-lbl">Projects Delivered</div>
        </div>
        <div className="hstat">
          <div className="hstat-num">
            100<span className="text-[#e07a3a]">%</span>
          </div>
          <div className="hstat-lbl">Municipal Approvals</div>
        </div>
        <div className="hstat">
          <div className="hstat-num">
            99<span className="text-[#e07a3a]">%</span>
          </div>
          <div className="hstat-lbl">Client Satisfaction</div>
        </div>
      </div>
    </section>
  );
}
