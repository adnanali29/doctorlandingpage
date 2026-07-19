"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const miniCards = [
    {
      num: "5+",
      lbl: "Core Categories",
      delayClass: "delay-1",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      )
    },
    {
      num: "OEM",
      lbl: "Grade Quality",
      delayClass: "delay-2",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
          <polyline points="12 22 12 12 22 8.5" />
          <polyline points="12 12 2 8.5" />
        </svg>
      )
    },
    {
      num: "100%",
      lbl: "Verified Parts",
      delayClass: "delay-3",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      )
    },
    {
      num: "1 Year",
      lbl: "B2B Warranty",
      delayClass: "delay-4",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )
    }
  ];

  // Slider products comprising all 11 original items plus the 3 new ones
  const sliderProducts = [
    { id: "air-suspension-strut", name: "Air Suspension Strut", cat: "Air Suspension", image: "/images/product_1.jpg", isBestSeller: true },
    { id: "air-suspension-compressor", name: "Air Suspension Compressor", cat: "Air Suspension", image: "/images/product_2.jpg" },
    { id: "valve-block", name: "Valve Block", cat: "Air Suspension", image: "/images/product_3.jpg" },
    { id: "upper-control-arm", name: "Upper Control Arm", cat: "Suspension", image: "/images/product_4.jpg" },
    { id: "lower-control-arm", name: "Lower Control Arm", cat: "Suspension", image: "/images/product_5.jpg" },
    { id: "stabilizer-link", name: "Stabilizer Link", cat: "Suspension", image: "/images/product_6.jpg" },
    { id: "tie-rod-end", name: "Tie Rod End", cat: "Steering", image: "/images/product_7.jpg" },
    { id: "steering-rack-pinion", name: "Steering Rack & Pinion", cat: "Steering", image: "/images/product_14.png" },
    { id: "hydraulic-engine-mount", name: "Hydraulic Engine Mount", cat: "Engine Mounts", image: "/images/product_12.png" },
    { id: "transmission-mount", name: "Transmission Mount", cat: "Engine Mounts", image: "/images/product_13.png" },
    { id: "ac-compressor", name: "AC Compressor", cat: "AC System", image: "/images/product_8.jpg" },
    { id: "ac-condenser", name: "AC Condenser", cat: "AC System", image: "/images/product_9.jpg" },
    { id: "cooling-coil-evaporator", name: "Cooling Coil / Evaporator", cat: "AC System", image: "/images/product_10.jpg" },
    { id: "expansion-valve", name: "Expansion Valve", cat: "AC System", image: "/images/product_11.jpg" }
  ];

  // Starts with Air Suspension Strut (index 0) active in the center
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Auto-slide effect (always active, no pause on hover)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % sliderProducts.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % sliderProducts.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + sliderProducts.length) % sliderProducts.length);
  };

  // Helper to determine active 3D classes circular-wise
  const getPositionClass = (idx) => {
    let diff = idx - activeIndex;
    const len = sliderProducts.length;
    while (diff < -len / 2) diff += len;
    while (diff > len / 2) diff -= len;
    
    if (diff === 0) return "podium-pos-center";
    if (diff === -1) return "podium-pos-middle-l";
    if (diff === 1) return "podium-pos-middle-r";
    if (diff === -2) return "podium-pos-back-l";
    if (diff === 2) return "podium-pos-back-r";
    
    return diff < 0 ? "podium-pos-hidden-l" : "podium-pos-hidden-r";
  };

  // Advantage parameters with distinct colors representing shades of blue progression
  const advantageList = [
    {
      num: "01",
      color: "#60A5FA", // Light sky blue
      title: "Wide Product Coverage",
      body: "A growing portfolio of steering, suspension, AC and metal-rubber mounting components for leading global vehicle models.",
      delay: "delay-1",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      )
    },
    {
      num: "02",
      color: "#3B82F6", // Royal blue
      title: "OEM Quality Standard",
      body: "Components sourced strictly from qualified facilities and verified against OEM dimensions and stress specifications.",
      delay: "delay-2",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M22 4L12 14.01l-3-3" />
        </svg>
      )
    },
    {
      num: "03",
      color: "#2563EB", // Cobalt blue
      title: "Competitive Trade Pricing",
      body: "Structured wholesale pricing tiers designed to deliver solid market margins for distributors and retailers.",
      delay: "delay-3",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          <line x1="7" y1="7" x2="7.01" y2="7" />
        </svg>
      )
    },
    {
      num: "04",
      color: "#1D4ED8", // Deep blue
      title: "Dedicated B2B Support",
      body: "Assigned account representatives to handle catalog queries, technical specifications, and bulk logistics.",
      delay: "delay-4",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        </svg>
      )
    },
    {
      num: "05",
      color: "#1E40AF", // Navy blue
      title: "Responsive Logistics",
      body: "Streamlined warehousing and dispatch pipelines, reducing transit delays for critical aftermarket supply.",
      delay: "delay-1",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      )
    }
  ];

  return (
    <main style={{ paddingTop: "0" }}>
      {/* SCREEN-TO-SCREEN FULL PARALLAX HERO SECTION */}
      <section className="hero" style={{ justifyContent: "center", paddingBottom: "35px" }}>
        <div className="hero-inner" style={{ alignItems: "center", textAlign: "center" }}>
          
          {/* Main Hero Content (Centered) */}
          <div className="hero-text animate-fade-in-up" style={{ alignItems: "center", textAlign: "center", maxWidth: "880px" }}>
            <div 
              className="sec-eyebrow" 
              style={{ 
                color: "#38BDF8", 
                marginBottom: "20px", 
                letterSpacing: "4px", 
                fontWeight: "600",
                textShadow: "0 1px 3px rgba(0,0,0,0.4)" 
              }}
            >
              STRAHL™ — AUTOMOTIVE AFTERMARKET SOURCING
            </div>
            
            <h1 className="hero-title" style={{ fontSize: "clamp(38px, 6vw, 68px)", marginBottom: "24px", color: "#ffffff" }}>
              OEM-Grade Chassis &amp;<br />
              Suspension Components
            </h1>
            
            <p className="hero-sub" style={{ fontSize: "19px", color: "rgba(255, 255, 255, 0.9)", maxWidth: "760px", marginBottom: "40px" }}>
              Engineered for absolute performance and B2B reliability. Sourcing premium steering, suspension, and climate systems for distributors and fleet managers worldwide.
            </p>
            
            <div className="hero-btns" style={{ justifyContent: "center", marginBottom: "20px" }}>
              <Link href="/products" className="btn-p">
                Explore B2B Products
              </Link>
              <Link href="/partner" className="btn-o">
                Become a Partner
              </Link>
            </div>
          </div>

          {/* Centered Staggered Mini-Cards (Solid White Boxed) */}
          <div className="hero-cards-grid">
            {miniCards.map((card, idx) => (
              <div 
                key={idx} 
                className={`hero-mini-card animate-fade-in-up ${card.delayClass}`}
              >
                <div className="hero-mini-card-icon">
                  {card.icon}
                </div>
                <div className="hero-mini-card-text">
                  <span className="hero-mini-card-num">{card.num}</span>
                  <span className="hero-mini-card-lbl">{card.lbl}</span>
                </div>
              </div>
            ))}
          </div>

          {/* 3D PRODUCT PODIUM (INTEGRATED DIRECTLY INSIDE THE HERO BANNER) */}
          <div style={{ width: "100%", marginTop: "30px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "20px" }}>
            <div style={{ textAlign: "center", marginBottom: "6px" }}>
              <span className="sec-eyebrow" style={{ color: "#38BDF8" }}>Top Sourced Parts</span>
              <h2 className="sec-title" style={{ color: "#ffffff", background: "none", marginBottom: "6px" }}>Best Selling Components</h2>
              <p className="sec-sub" style={{ color: "rgba(255, 255, 255, 0.8)", margin: "0 auto" }}>
                The most widely sourced suspension, steering, and air management components across our international trade network.
              </p>
            </div>

            {/* 3D Slider Container with manual and auto controls */}
            <div className="slider-controls-container">
              <button 
                className="slider-nav-btn slider-nav-btn-left" 
                onClick={prevSlide}
                aria-label="Previous slide"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <div 
                className="podium-container" 
                style={{ position: "relative", minHeight: "410px" }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {sliderProducts.map((prod, idx) => {
                  const posClass = getPositionClass(idx);
                  const isCenter = posClass === "podium-pos-center";
                  return (
                    <div 
                      key={prod.id} 
                      className={`podium-card ${posClass}`}
                      onClick={() => {
                        if (!isCenter) {
                          setActiveIndex(idx);
                        }
                      }}
                    >
                      {prod.isBestSeller && (
                        <span className="best-seller-tag">Best Seller</span>
                      )}
                      
                      <div style={{ position: "relative", width: "100%", aspectRatio: "1.1/1", borderRadius: "14px", overflow: "hidden", background: "#f8fafc" }}>
                        <Image
                          src={prod.image}
                          alt={prod.name}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "4px", textAlign: "center" }}>
                        <span style={{ fontSize: "10px", color: "var(--accent-blue)", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                          {prod.cat}
                        </span>
                        <h3 style={{ fontSize: "14.5px", color: "var(--text-light)", fontWeight: "600", lineHeight: "1.3" }}>
                          {prod.name}
                        </h3>
                      </div>
                      
                      {isCenter && (
                        <div style={{ textAlign: "center", marginTop: "4px" }}>
                          <Link href="/products" style={{ fontSize: "11px", color: "var(--accent-blue)", fontWeight: "700", textDecoration: "none" }}>
                            View Details →
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <button 
                className="slider-nav-btn slider-nav-btn-right" 
                onClick={nextSlide}
                aria-label="Next slide"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="slider-dots">
              {sliderProducts.map((_, idx) => (
                <button
                  key={idx}
                  className={`slider-dot ${idx === activeIndex ? "active" : ""}`}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* CORE PRODUCT GROUPS OVERVIEW */}
      <section className="sec sec-dark">
        <div className="sec-eyebrow">Product Offerings</div>
        <h2 className="sec-title">Core Sourcing Categories</h2>
        <p className="sec-sub">
          We offer a structured range of core parts groupings, designed to streamline sourcing for diverse trade clients.
        </p>
        <div className="cat-grid">
          
          {/* CATEGORY 1: SUSPENSION */}
          <div className="cat-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              {/* Suspension icon is red (background: rgba(239, 68, 68, 0.08), color: #EF4444) as requested */}
              <div className="cat-ico" style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(239, 68, 68, 0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#EF4444", marginBottom: "20px" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "32px", height: "32px", stroke: "#EF4444" }}>
                  <path d="M12 2v20M8 5h8M6 9h12M7 13h10M9 17h6" />
                  <circle cx="12" cy="2" r="1.5" fill="currentColor" />
                  <circle cx="12" cy="22" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <h3 className="cat-title">Suspension &amp; Chassis Parts</h3>
              <ul className="cat-list">
                <li>Air Suspension Struts &amp; Bellows</li>
                <li>Control Arms &amp; Silent Blocks</li>
                <li>Stabilizer Links &amp; Bushings</li>
                <li>Chassis Reinforcements</li>
              </ul>
            </div>
            
            <div>
              <div className="cat-thumbs-title">Featured Parts</div>
              <div className="cat-thumbs">
                <Link href="/products" className="cat-thumb">
                  <div className="cat-thumb-img">
                    <Image src="/images/product_4.jpg" alt="Control Arm" fill style={{ objectFit: "cover" }} />
                  </div>
                  <span className="cat-thumb-name">Control Arm</span>
                </Link>
                <Link href="/products" className="cat-thumb">
                  <div className="cat-thumb-img">
                    <Image src="/images/product_1.jpg" alt="Suspension Strut" fill style={{ objectFit: "cover" }} />
                  </div>
                  <span className="cat-thumb-name">Suspension Strut</span>
                </Link>
              </div>
            </div>
          </div>

          {/* CATEGORY 2: ENGINE MOUNTS */}
          <div className="cat-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div className="cat-ico" style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(56, 189, 248, 0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#38BDF8", marginBottom: "20px" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "32px", height: "32px" }}>
                  <rect x="3" y="3" width="18" height="18" rx="4" strokeDasharray="3 3" opacity="0.6" />
                  <circle cx="12" cy="12" r="6" strokeWidth="2.4" fill="rgba(56, 189, 248, 0.1)" />
                  <path d="M12 7v10M7 12h10" strokeWidth="2.2" />
                </svg>
              </div>
              <h3 className="cat-title">Engine Mounting Systems</h3>
              <ul className="cat-list">
                <li>Engine Mount Assemblies</li>
                <li>Transmission Support Mounts</li>
                <li>Hydraulic &amp; Rubber Dampers</li>
                <li>Torque Restrictors</li>
              </ul>
            </div>

            <div>
              <div className="cat-thumbs-title">Featured Parts</div>
              <div className="cat-thumbs">
                <Link href="/products" className="cat-thumb">
                  <div className="cat-thumb-img">
                    <Image src="/images/product_12.png" alt="Engine Mount" fill style={{ objectFit: "cover" }} />
                  </div>
                  <span className="cat-thumb-name">Engine Mount</span>
                </Link>
                <Link href="/products" className="cat-thumb">
                  <div className="cat-thumb-img">
                    <Image src="/images/product_13.png" alt="Transmission Mount" fill style={{ objectFit: "cover" }} />
                  </div>
                  <span className="cat-thumb-name">Transmission Mount</span>
                </Link>
              </div>
            </div>
          </div>

          {/* CATEGORY 3: STEERING */}
          <div className="cat-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div className="cat-ico" style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(56, 189, 248, 0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#38BDF8", marginBottom: "20px" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "32px", height: "32px" }}>
                  <path d="M3 12h18M6 8l-4 4 4 4M18 8l4 4-4 4" strokeWidth="2.4" />
                  <circle cx="12" cy="12" r="4" fill="rgba(56, 189, 248, 0.2)" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <h3 className="cat-title">Steering Gear &amp; Linkages</h3>
              <ul className="cat-list">
                <li>Tie Rod Ends &amp; Axial Joints</li>
                <li>Steering Rack Shafts &amp; Bushings</li>
                <li>Ball Joints &amp; Swivel Bearings</li>
                <li>Column Shaft Couplers</li>
              </ul>
            </div>

            <div>
              <div className="cat-thumbs-title">Featured Parts</div>
              <div className="cat-thumbs">
                <Link href="/products" className="cat-thumb">
                  <div className="cat-thumb-img">
                    <Image src="/images/product_7.jpg" alt="Tie Rod End" fill style={{ objectFit: "cover" }} />
                  </div>
                  <span className="cat-thumb-name">Tie Rod End</span>
                </Link>
                <Link href="/products" className="cat-thumb">
                  <div className="cat-thumb-img">
                    <Image src="/images/product_14.png" alt="Steering Rack" fill style={{ objectFit: "cover" }} />
                  </div>
                  <span className="cat-thumb-name">Steering Rack</span>
                </Link>
              </div>
            </div>
          </div>

          {/* CATEGORY 4: CLIMATE CONTROL */}
          <div className="cat-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div className="cat-ico" style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(56, 189, 248, 0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#38BDF8", marginBottom: "20px" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "32px", height: "32px" }}>
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="3.5" fill="currentColor" />
                  <path d="M12 3v18M3 12h18M6 6l12 12M6 18L18 6" strokeWidth="2" />
                </svg>
              </div>
              <h3 className="cat-title">Climate Control Parts</h3>
              <ul className="cat-list">
                <li>AC Compressors (Variable/Fixed)</li>
                <li>Condensers with Receiver Driers</li>
                <li>Cooling Coils &amp; Evaporators</li>
                <li>Expansion Valves &amp; Switches</li>
              </ul>
            </div>

            <div>
              <div className="cat-thumbs-title">Featured Parts</div>
              <div className="cat-thumbs">
                <Link href="/products" className="cat-thumb">
                  <div className="cat-thumb-img">
                    <Image src="/images/product_8.jpg" alt="AC Compressor" fill style={{ objectFit: "cover" }} />
                  </div>
                  <span className="cat-thumb-name">AC Compressor</span>
                </Link>
                <Link href="/products" className="cat-thumb">
                  <div className="cat-thumb-img">
                    <Image src="/images/product_9.jpg" alt="AC Condenser" fill style={{ objectFit: "cover" }} />
                  </div>
                  <span className="cat-thumb-name">AC Condenser</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* WHY CHOOSE STRAHL SECTION (ANIMATED & UNIQUE 5-COLUMN HORIZONTAL GRID) */}
      <section className="sec">
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span className="sec-eyebrow">The STRAHL Advantage</span>
          <h2 className="sec-title">Engineered to Outperform</h2>
          <p className="sec-sub" style={{ margin: "0 auto" }}>
            Five reasons wholesale distributors and automotive professionals trust STRAHL for their supply chain.
          </p>
        </div>

        <div className="why-grid">
          {advantageList.map((adv, idx) => (
            <div 
              key={idx} 
              className={`why-card animate-fade-in-up ${adv.delay}`}
              style={{ borderTop: `3px solid ${adv.color}` }}
            >
              <div className="why-card-top">
                <div className="why-card-icon">
                  {adv.icon}
                </div>
                <div 
                  className="why-num" 
                  style={{ color: adv.color }}
                >
                  {adv.num}
                </div>
              </div>
              <h3 className="why-title">{adv.title}</h3>
              <p className="why-body">{adv.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ENHANCED CTA SECTION */}
      <section className="sec" style={{ paddingBottom: "20px" }}>
        <div 
          style={{ 
            background: "linear-gradient(135deg, #0B1128 0%, #111A3E 100%)", 
            border: "1px solid rgba(37, 99, 235, 0.22)", 
            borderRadius: "28px", 
            padding: "60px 40px",
            boxShadow: "0 20px 50px rgba(11, 17, 40, 0.25)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px"
          }}
        >
          <span className="sec-eyebrow" style={{ color: "#38BDF8", letterSpacing: "3px" }}>Commercial desk</span>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 36px)", color: "#fff", fontWeight: "700", fontFamily: "var(--fd)" }}>
            Establish Your Automotive Supply Chain
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "15.5px", maxWidth: "680px", margin: "0 auto", fontWeight: "300", lineHeight: "1.7" }}>
            Partner with STRAHL™ to consolidate your product lines, access custom contract volume rates, and leverage catalog indexing to fulfill customer demands.
          </p>

          {/* Visual trust highlights inside CTA */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "24px", margin: "10px 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13.5px", color: "#38BDF8", fontWeight: "600" }}>
              <span style={{ color: "#10B981" }}>✓</span> Instant Digital Catalog Access
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13.5px", color: "#38BDF8", fontWeight: "600" }}>
              <span style={{ color: "#10B981" }}>✓</span> High-Margin Distributor Tiers
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13.5px", color: "#38BDF8", fontWeight: "600" }}>
              <span style={{ color: "#10B981" }}>✓</span> 1-Year Core Replacement Warranty
            </div>
          </div>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", marginTop: "10px" }}>
            <Link href="/contact" className="btn-p">
              Request B2B Quote
            </Link>
            <Link href="/partner" className="btn-o" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
              Become a Distributor
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
