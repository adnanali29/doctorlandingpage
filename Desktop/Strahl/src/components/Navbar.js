"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Quality", path: "/quality" },
    { name: "Partner", path: "/partner" },
    { name: "Contact", path: "/contact" }
  ];

  const isActive = (path) => pathname === path;

  return (
    <div className="navbar-floating-container">
      <nav className="navbar-floating">
        <Link href="/" className="nav-logo">
          <Image
            src="/images/logo.jpg"
            alt="STRAHL Logo"
            width={120}
            height={32}
            priority
            style={{ height: "32px", width: "auto", objectFit: "contain" }}
          />
          <span className="nav-logo-text">STRAHL</span>
        </Link>

        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link 
                href={link.path} 
                className={isActive(link.path) ? "active" : ""}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/contact" className="nav-cta">
          Get in touch
        </Link>

        <button 
          className="burger-btn" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <svg viewBox="0 0 24 24">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {mobileMenuOpen && (
          <div className="mobile-menu-overlay">
            <ul className="mobile-nav-links">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    href={link.path} 
                    onClick={() => setMobileMenuOpen(false)}
                    className={isActive(link.path) ? "active" : ""}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link 
              href="/contact" 
              className="mobile-cta"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get in Touch
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}
