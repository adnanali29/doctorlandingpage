"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Calculator } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "Calculators", href: "/calculators", isNew: true },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Process", href: "/process" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 h-20 z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl"
            : "bg-gradient-to-b from-[#0a0a0a]/90 via-[#0a0a0a]/40 to-transparent backdrop-blur-sm"
        }`}
      >
        <Link href="/" className="flex items-center group">
          <img
            src="/logo.png"
            alt="ArchiMate Civil Engineering Studio"
            className="h-11 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-7 list-none">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-xs font-semibold uppercase tracking-[0.15em] relative transition-colors duration-300 flex items-center gap-1.5 ${
                    isActive ? "text-[#e07a3a]" : "text-[#f0ece4]/80 hover:text-[#f0ece4]"
                  }`}
                >
                  {link.name === "Calculators" && <Calculator className="w-3.5 h-3.5 text-[#e07a3a]" />}
                  {link.name}
                  {link.isNew && (
                    <span className="px-1.5 py-0.5 bg-[#e07a3a] text-white text-[9px] font-black rounded-sm leading-none uppercase">
                      Tools
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-[#e07a3a]" />
                  )}
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href="/contact"
              className="px-5 py-2 border-1.5 border-[#e07a3a] text-[#e07a3a] text-xs font-bold uppercase tracking-[0.18em] rounded-sm hover:bg-[#e07a3a] hover:text-white transition-all duration-300 shadow-md shadow-[#e07a3a]/10"
            >
              Get Quote
            </Link>
          </li>
        </ul>

        {/* Mobile Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-[#f0ece4] p-1 focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col items-center justify-center gap-7 md:hidden px-6"
          >
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className={`text-2xl font-black uppercase tracking-tight ${
                pathname === "/" ? "text-[#e07a3a]" : "text-[#f0ece4]/40 hover:text-[#f0ece4]"
              }`}
            >
              Home
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-2xl font-black uppercase tracking-tight flex items-center gap-2 ${
                  pathname === link.href ? "text-[#e07a3a]" : "text-[#f0ece4]/40 hover:text-[#f0ece4]"
                }`}
              >
                {link.name}
                {link.isNew && (
                  <span className="px-2 py-0.5 bg-[#e07a3a] text-white text-xs font-bold rounded">
                    Calculator Tools
                  </span>
                )}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className={`text-2xl font-black uppercase tracking-tight ${
                pathname === "/contact" ? "text-[#e07a3a]" : "text-[#f0ece4]/40 hover:text-[#f0ece4]"
              }`}
            >
              Contact Us
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
