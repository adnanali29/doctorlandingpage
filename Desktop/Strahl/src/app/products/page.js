"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// Detailed B2B Product Catalog
const PRODUCTS_DATA = [
  {
    id: "air-suspension-strut",
    name: "Air Suspension Strut",
    cat: "Air Suspension",
    image: "/images/product_1.jpg",
    usps: [
      "Custom-cured reinforced multi-ply rubber sleeve for maximum flexing longevity.",
      "Individually dyno-tested to ensure match with OEM damping curves.",
      "High-strength steel crimping rings ensure leak-free seal up to 2.0 MPa.",
      "Fully compatible with original electronic damping valves."
    ],
    specs: {
      "Placement": "Front Left / Front Right",
      "Material": "Reinforced Rubber & Steel Alloy",
      "Fitment Type": "Direct OEM Replacement",
      "Operating Pressure": "Up to 2.0 MPa",
      "Certification": "IATF 16949 Sourced",
      "Warranty": "1 Year B2B Sourcing"
    }
  },
  {
    id: "air-suspension-compressor",
    name: "Air Suspension Compressor",
    cat: "Air Suspension",
    image: "/images/product_2.jpg",
    usps: [
      "Heavy-duty internal motor with integrated thermal overload protection.",
      "Precision piston ring compound prevents premature wear and pressure drop.",
      "Integrated air dryer ensures moisture-free delivery to air bellows.",
      "Pre-assembled plug-and-play wiring harness and brackets included."
    ],
    specs: {
      "Motor Type": "12V DC heavy-duty motor",
      "Max Pressure": "1.8 MPa",
      "Housing Material": "Die-cast Aluminum",
      "Cooling": "Integrated heatsink",
      "Certification": "ISO 9001 / IATF Sourced",
      "Warranty": "1 Year B2B Sourcing"
    }
  },
  {
    id: "valve-block",
    name: "Valve Block",
    cat: "Air Suspension",
    image: "/images/product_3.jpg",
    usps: [
      "High-precision solenoid valves prevent system leakages and vehicle sag.",
      "Corrosion-resistant anodized aluminum block body.",
      "Heavy-duty internal O-rings prevent cross-port air migration.",
      "Direct plug match with factory vehicle leveling systems."
    ],
    specs: {
      "Port Count": "6-Port Air Line Connections",
      "Solenoid Voltage": "12V DC Solenoids",
      "Block Material": "Anodized Aluminum Alloy",
      "Max Temp Limit": "-40°C to +120°C",
      "Certification": "ISO 9001 Sourced",
      "Warranty": "1 Year B2B Sourcing"
    }
  },
  {
    id: "upper-control-arm",
    name: "Upper Control Arm",
    cat: "Suspension",
    image: "/images/product_4.jpg",
    usps: [
      "Forged steel or aluminum body matches factory structural stiffness.",
      "Natural rubber bushings isolate Noise, Vibration, and Harshness (NVH).",
      "Premium ball joint with induction-hardened ball pins for smooth articulation.",
      "Durable anti-corrosion black electrophoretic coating."
    ],
    specs: {
      "Position": "Front Upper Left / Right",
      "Body Material": "Forged Carbon Steel / Aluminum",
      "Bushing Material": "High-density Natural Rubber",
      "Salt Spray Rating": "240 hours minimum",
      "Certification": "IATF 16949 Certified",
      "Warranty": "1 Year B2B Sourcing"
    }
  },
  {
    id: "lower-control-arm",
    name: "Lower Control Arm",
    cat: "Suspension",
    image: "/images/product_5.jpg",
    usps: [
      "Heavy-wall structural steel tubing or forged alloy composition.",
      "Hydraulic bushings pre-installed for superior driving comfort.",
      "Ball joint boot made of high-grade chloroprene rubber for grease containment.",
      "High fatigue strength under rough road conditions."
    ],
    specs: {
      "Position": "Front Lower Left / Right",
      "Body Material": "Structural Alloy Steel",
      "Bushing Type": "Hydraulic / Solid Rubber",
      "Boot Material": "Chloroprene Rubber",
      "Certification": "IATF 16949 Certified",
      "Warranty": "1 Year B2B Sourcing"
    }
  },
  {
    id: "stabilizer-link",
    name: "Stabilizer Link",
    cat: "Suspension",
    image: "/images/product_6.jpg",
    usps: [
      "Optimized rod diameter resists high torsional sway forces.",
      "Spherical joint inserts designed with low-friction POM bearings.",
      "Dual dust-seals keep road grime and salt spray out of ball socket.",
      "Threaded studs match original clamping specifications."
    ],
    specs: {
      "Position": "Front / Rear Sway Bar Link",
      "Rod Material": "Reinforced Steel Rod",
      "Joint Bearing": "Low-friction POM",
      "Thread Type": "Metric Coarse Thread",
      "Certification": "ISO 9001 Sourced",
      "Warranty": "1 Year B2B Sourcing"
    }
  },
  {
    id: "tie-rod-end",
    name: "Tie Rod End",
    cat: "Steering",
    image: "/images/product_7.jpg",
    usps: [
      "Induction-hardened ball pins provide smooth steering and long wear life.",
      "Internal high-performance synthetic grease reduces friction.",
      "Coated threads resist seizing, allowing ease of wheel alignment.",
      "Thick housing walls prevent steering play under impact loads."
    ],
    specs: {
      "Connection Type": "Threaded steering joint",
      "Housing Material": "Forged Carbon Steel",
      "Ball Stud Grade": "40Cr Steel alloy",
      "Grease Type": "Synthetic chassis lubricant",
      "Certification": "IATF 16949 Sourced",
      "Warranty": "1 Year B2B Sourcing"
    }
  },
  {
    id: "ac-compressor",
    name: "AC Compressor",
    cat: "AC System",
    image: "/images/product_8.jpg",
    usps: [
      "Precision swashplate design delivers variable displacement smooth cooling.",
      "Built-in pressure relief valve and thermal control switches.",
      "Pre-filled with correct volume of synthetic PAG oil.",
      "High-grade electromagnetic clutch coil prevents slipping."
    ],
    specs: {
      "Displacement": "Variable / Fixed Displacement",
      "Refrigerant Type": "R134a / R1234yf",
      "Oil Type": "PAG 46 / PAG 100",
      "Clutch Type": "Electromagnetic Multi-groove",
      "Certification": "ISO 9001 Sourced",
      "Warranty": "1 Year B2B Sourcing"
    }
  },
  {
    id: "ac-condenser",
    name: "AC Condenser",
    cat: "AC System",
    image: "/images/product_9.jpg",
    usps: [
      "Micro-channel aluminum tubes maximize heat rejection rates.",
      "Integrated receiver drier cartridge prevents moisture damage.",
      "Fins feature salt-spray resistant anti-corrosion coating.",
      "Mounting brackets align perfectly with vehicle radiator shroud."
    ],
    specs: {
      "Material": "Full Aluminum Brazed Core",
      "Core Thickness": "16mm / 12mm optimized",
      "Receiver Drier": "Integrated cartridge",
      "Leak Tested": "100% helium leak test",
      "Certification": "ISO 9001 Sourced",
      "Warranty": "1 Year B2B Sourcing"
    }
  },
  {
    id: "cooling-coil-evaporator",
    name: "Cooling Coil / Evaporator",
    cat: "AC System",
    image: "/images/product_10.jpg",
    usps: [
      "Highly efficient plate-fin core provides rapid cabin cooling.",
      "Anti-bacterial coating prevents mold formation and odor.",
      "Leak tested to strict high-pressure standards.",
      "Engineered for direct fit in standard HVAC cases."
    ],
    specs: {
      "Core Style": "Plate-Fin Aluminum Evaporator",
      "Core Depth": "38mm / 44mm direct fit",
      "Coating": "Hydrophilic and anti-microbial",
      "Inlet/Outlet": "O-ring block connections",
      "Certification": "ISO 9001 Sourced",
      "Warranty": "1 Year B2B Sourcing"
    }
  },
  {
    id: "expansion-valve",
    name: "Expansion Valve",
    cat: "AC System",
    image: "/images/product_11.jpg",
    usps: [
      "Precision thermal charge element guarantees accurate flow control.",
      "Spring-loaded internal metering valve maintains steady superheat levels.",
      "Solid brass or aluminum body resists high operating pressures.",
      "High reliability prevents evaporator freezing."
    ],
    specs: {
      "Valve Style": "Block Type Expansion Valve",
      "Material": "High-grade Extruded Aluminum",
      "Superheat Setting": "OEM calibrated",
      "Fitting Type": "O-ring flange mounting",
      "Certification": "ISO 9001 Sourced",
      "Warranty": "1 Year B2B Sourcing"
    }
  },
  {
    id: "hydraulic-engine-mount",
    name: "Hydraulic Engine Mount",
    cat: "Engine Mounts",
    image: "/images/product_12.png",
    usps: [
      "Hydraulic fluid-filled chamber dampens low-frequency engine vibrations.",
      "Premium natural rubber compounding isolates high-frequency NVH.",
      "Reinforced steel housing designed to withstand extreme torque shifts.",
      "Individually tested for hydraulic pressure seal integrity."
    ],
    specs: {
      "Position": "Front Right / Front Left",
      "Mount Type": "Hydraulic (Fluid-Filled)",
      "Material": "Natural Rubber & Steel Alloy",
      "Stiffness Rating": "OEM Calibrated",
      "Certification": "IATF 16949 Sourced",
      "Warranty": "1 Year B2B Sourcing"
    }
  },
  {
    id: "transmission-mount",
    name: "Transmission Mount",
    cat: "Engine Mounts",
    image: "/images/product_13.png",
    usps: [
      "Specially formulated elastomer compound maintains drivetrain alignment.",
      "Controls engine and transmission rocking motion during shifts.",
      "High-grade zinc plating resists corrosion under road debris impact.",
      "Designed to meet or exceed original NVH dampening specifications."
    ],
    specs: {
      "Position": "Rear Transmission Support",
      "Mount Type": "Solid Elastomer / Rubber-Metal",
      "Material": "Synthetic Rubber & Mild Steel",
      "Hardness": "60 Shore A Durometer",
      "Certification": "ISO 9001 Sourced",
      "Warranty": "1 Year B2B Sourcing"
    }
  },
  {
    id: "steering-rack-pinion",
    name: "Steering Rack & Pinion",
    cat: "Steering",
    image: "/images/product_14.png",
    usps: [
      "Precision-machined helical pinion gear provides smooth, responsive steering.",
      "Premium internal seals prevent hydraulic power steering fluid leakage.",
      "Hardened steel guide bar and rack teeth resist heavy road impact.",
      "Pre-installed premium rubber bellows protect internal rack gears."
    ],
    specs: {
      "Steering Type": "Hydraulic Power Steering Rack",
      "Housing Material": "Die-cast Aluminum Alloy",
      "Input Shaft Style": "Splined Shaft",
      "Rack Stroke": "145 mm total travel",
      "Certification": "IATF 16949 Sourced",
      "Warranty": "1 Year B2B Sourcing"
    }
  }
];

// Reusable Modal Component using HTMLDialogElement & Fallbacks
function ProductDetailModal({ product, onClose }) {
  const dialogRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: "",
    email: ""
  });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      // Open dialog modal natively
      dialog.showModal();

      // Fallback for click outside the dialog content box (light dismiss)
      const handleLightDismiss = (event) => {
        if (event.target !== dialog) return;

        const rect = dialog.getBoundingClientRect();
        const isDialogContent = (
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width
        );

        if (!isDialogContent) {
          dialog.close();
        }
      };

      dialog.addEventListener("click", handleLightDismiss);

      // Listen for the native close event (e.g., when Esc is pressed)
      const handleNativeClose = () => {
        onClose();
      };
      dialog.addEventListener("close", handleNativeClose);

      return () => {
        dialog.removeEventListener("click", handleLightDismiss);
        dialog.removeEventListener("close", handleNativeClose);
      };
    }
  }, [product, onClose]);

  const handleClose = () => {
    dialogRef.current?.close();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, phone, company, email } = formData;
    
    // User requested message format (polished for B2B professionalism): "Hi, I am {name} and I am enquiring about the {product name}"
    const message = `Hi, I am ${name} and I am enquiring about the ${product.name}.\n\n` +
      `Here are my B2B contact details:\n` +
      `- Name: ${name}\n` +
      `- Phone: ${phone}\n` +
      `- Company: ${company}\n` +
      `- Email: ${email}`;
      
    const whatsappUrl = `https://wa.me/9778803677?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    handleClose();
  };

  return (
    <dialog ref={dialogRef} className="product-modal" closedby="any" aria-labelledby="dialogTitle">
      <div className="modal-header">
        <h2 id="dialogTitle" className="modal-title">
          {showForm ? `Enquire: ${product.name}` : product.name}
        </h2>
        <button className="modal-close-btn" onClick={handleClose} aria-label="Close details">
          <svg viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div className="modal-body">
        {showForm ? (
          <form onSubmit={handleFormSubmit} className="modal-form">
            <h3 className="modal-form-title">Hi, I m {formData.name || "..."}</h3>
            
            <div className="modal-form-group">
              <label className="modal-form-label">Name</label>
              <input 
                type="text" 
                required 
                className="modal-form-input"
                placeholder="Your Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="modal-form-group">
              <label className="modal-form-label">Phone Number</label>
              <input 
                type="tel" 
                required 
                className="modal-form-input"
                placeholder="Phone Number (e.g. +91 98765 43210)"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="modal-form-group">
              <label className="modal-form-label">Company Name</label>
              <input 
                type="text" 
                required 
                className="modal-form-input"
                placeholder="Your Company Name"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>

            <div className="modal-form-group">
              <label className="modal-form-label">Email Address</label>
              <input 
                type="email" 
                required 
                className="modal-form-input"
                placeholder="your.email@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div style={{ display: "flex", gap: "12px", marginTop: "15px" }}>
              <button 
                type="submit" 
                className="modal-cta-btn"
                style={{ flex: 1, padding: "14px 24px" }}
              >
                Submit via WhatsApp
              </button>
              <button 
                type="button" 
                className="filter-btn" 
                onClick={() => setShowForm(false)}
                style={{ padding: "14px 24px", borderRadius: "30px", border: "1px solid var(--border-light)" }}
              >
                Back to Details
              </button>
            </div>
          </form>
        ) : (
          <div className="modal-grid">
            <div className="modal-img-wrap">
              <Image
                src={product.image}
                alt={product.name}
                width={350}
                height={350}
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="modal-info">
              <div>
                <h3 className="modal-section-title">Unique Selling Propositions (USPs)</h3>
                <ul className="modal-usp-list">
                  {product.usps.map((usp, i) => (
                    <li key={i}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      <span>{usp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="modal-section-title">Technical Specifications</h3>
                <table className="modal-specs-table">
                  <tbody>
                    {Object.entries(product.specs).map(([key, value]) => (
                      <tr key={key}>
                        <td>{key}</td>
                        <td>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ marginTop: "10px" }}>
                <button 
                  onClick={() => setShowForm(true)} 
                  className="modal-cta-btn"
                  style={{ width: "100%", border: "none" }}
                >
                  Enquiry Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
}

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = ["All", "Air Suspension", "Suspension", "Engine Mounts", "Steering", "AC System"];

  const filteredProducts = activeCategory === "All"
    ? PRODUCTS_DATA
    : PRODUCTS_DATA.filter((p) => p.cat === activeCategory);

  return (
    <main className="sec">
      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <span className="sec-eyebrow">Product Catalog</span>
        <h1 className="sec-title">Sourcing Portfolio</h1>
        <p className="sec-sub" style={{ margin: "0 auto", color: "#000000", fontWeight: "400" }}>
          Explore our range of premium replacement parts, engineered under strict quality systems for distributors and fleet managers.
        </p>
      </div>

      {/* FILTERS */}
      <div className="product-filters" style={{ justifyContent: "center" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCTS GRID */}
      <div className="prod-grid">
        {filteredProducts.map((prod) => (
          <div 
            key={prod.id} 
            className="prod-card"
            onClick={() => setSelectedProduct(prod)}
          >
            <div className="prod-card-img-wrap">
              <Image
                src={prod.image}
                alt={prod.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="prod-card-img"
              />
            </div>
            <div className="prod-card-body">
              <div className="prod-card-cat">{prod.cat}</div>
              <h3 className="prod-card-name">{prod.name}</h3>
              <div className="prod-card-view-btn">
                <span>View Details</span>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DIALOG MODAL FOR PRODUCT DETAILS */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </main>
  );
}
