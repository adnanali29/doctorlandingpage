import Link from "next/link";
import { Calculator } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 px-6 md:px-12 pt-16 pb-8 text-[#888]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 pb-14 border-b border-white/10">
        <div className="md:col-span-1">
          <Link href="/" className="flex items-center mb-4 group">
            <img
              src="/logo.png"
              alt="ArchiMate Civil Engineering Studio"
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>
          <p className="text-xs leading-relaxed text-[#888] max-w-xs mt-4">
            High-precision civil engineering, structural drafting, and architectural solutions across Odisha. IS-Code compliant & Vastu friendly.
          </p>
          <div className="flex gap-2.5 mt-6">
            <a
              href="https://wa.me/9778293547"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 border border-white/10 flex items-center justify-center rounded-sm text-xs font-bold text-[#888] hover:border-[#e07a3a] hover:text-[#e07a3a] transition-all"
            >
              WhatsApp Us
            </a>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#f0ece4]/30 mb-5">
            Quick Navigation
          </p>
          <div className="flex flex-col gap-3 text-xs text-[#888]">
            <Link href="/" className="hover:text-[#e07a3a] transition-colors">
              Home
            </Link>
            <Link href="/calculators" className="hover:text-[#e07a3a] transition-colors flex items-center gap-1.5 text-[#e07a3a]">
              <Calculator className="w-3.5 h-3.5" /> Civil Calculators
            </Link>
            <Link href="/services" className="hover:text-[#e07a3a] transition-colors">
              Core Services
            </Link>
            <Link href="/projects" className="hover:text-[#e07a3a] transition-colors">
              Featured Work
            </Link>
            <Link href="/about" className="hover:text-[#e07a3a] transition-colors">
              About Studio
            </Link>
            <Link href="/process" className="hover:text-[#e07a3a] transition-colors">
              Workflow Process
            </Link>
            <Link href="/contact" className="hover:text-[#e07a3a] transition-colors">
              Contact & Location
            </Link>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#f0ece4]/30 mb-5">
            Engineering Tools
          </p>
          <div className="flex flex-col gap-3 text-xs text-[#888]">
            <Link href="/calculators" className="hover:text-[#e07a3a] transition-colors">
              🧱 Brick & Mortar Calculator
            </Link>
            <Link href="/calculators" className="hover:text-[#e07a3a] transition-colors">
              🏗️ Concrete & Slab Estimator
            </Link>
            <Link href="/calculators" className="hover:text-[#e07a3a] transition-colors">
              📐 Floor Tile & Adhesive Calculator
            </Link>
            <Link href="/calculators" className="hover:text-[#e07a3a] transition-colors">
              ⚡ Iron Rod / Rebar Weight Calculator
            </Link>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#f0ece4]/30 mb-5">
            Contact & Office
          </p>
          <div className="flex flex-col gap-3 text-xs text-[#888]">
            <a href="tel:+919778293547" className="hover:text-[#e07a3a] transition-colors font-bold text-white">
              +91 97782 93547
            </a>
            <a href="https://wa.me/9778293547" target="_blank" rel="noopener noreferrer" className="hover:text-[#e07a3a] transition-colors">
              WhatsApp Direct Chat
            </a>
            <a href="mailto:archimate@studio.com" className="hover:text-[#e07a3a] transition-colors">
              archimate@studio.com
            </a>
            <span>Patia & Infocity Area, Bhubaneswar, Odisha, India</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 flex flex-col md:flex-row justify-between items-center text-[11px] text-[#888]/40 gap-4">
        <p>© 2026 ArchiMate Civil & Architectural Studio. All rights reserved.</p>
        <p className="uppercase tracking-[0.25em] font-bold text-[#e07a3a]/60">
          Precision · IS Code Compliant · Innovation
        </p>
      </div>
    </footer>
  );
}
