"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Phone, ArrowUp } from "lucide-react";
import Link from "next/link";

export function FloatingActionBar() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Back to Top */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="w-11 h-11 bg-black/80 backdrop-blur-md border border-white/20 text-white rounded-full flex items-center justify-center shadow-xl hover:bg-[#e07a3a] hover:border-[#e07a3a] transition-all group"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

      {/* Floating Action Pill */}
      <div className="bg-[#111]/90 backdrop-blur-xl border border-white/15 p-2 rounded-full shadow-2xl flex items-center gap-2">

        <a
          href="https://wa.me/9778293547?text=Hello%20ArchiMate,%20I%20want%20to%20discuss%20my%20building%20project"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          title="WhatsApp Direct Chat"
        >
          <MessageSquare className="w-5 h-5" />
        </a>

        <a
          href="tel:+919778293547"
          className="w-10 h-10 bg-[#e07a3a] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          title="Call Chief Engineer"
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}
