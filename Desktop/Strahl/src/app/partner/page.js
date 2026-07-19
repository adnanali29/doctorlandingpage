import Link from "next/link";

export const metadata = {
  title: "Partner with STRAHL™ — B2B Distribution & Sourcing Channels",
  description: "Become a partner. Read about partnership benefits, authorized distributor tiers, and the 4-step B2B onboarding process.",
};

export default function PartnerPage() {
  const tiers = [
    {
      title: "Authorized Distributor",
      benefits: [
        "Exclusive territorial distribution rights for specific chassis or AC lines.",
        "Highest tier trade discount structures and wholesale margins.",
        "Direct listing on official STRAHL dealer index lists.",
        "Dedicated supply queue priority on new stock allocations."
      ]
    },
    {
      title: "Retail Partner",
      benefits: [
        "No heavy capital constraints — lower minimum order quantities (MOQs).",
        "Point-of-Sale (POS) marketing kits, brochures, and brand catalogs.",
        "Quick dispatch access on popular steering and suspension part numbers.",
        "Simple digital parts indexing for rapid vehicle model matching."
      ]
    },
    {
      title: "Fleet & Service Operators",
      benefits: [
        "Fixed contract pricing on high-wear parts (control arms, struts).",
        "Direct warranty verification and swift core exchange process.",
        "Dedicated catalog compatibility checks based on fleet vehicle VIN lists.",
        "Consolidated monthly shipping allocations directly to service bays."
      ]
    }
  ];

  const onboardingSteps = [
    {
      step: "01",
      title: "Submit Application",
      desc: "Fill out the wholesale enquiry on our contact page, including your business GST/registration details and desired product segments."
    },
    {
      step: "02",
      title: "Regional Evaluation",
      desc: "Our sales desk reviews applicant credentials and regional coverage within 48 hours to avoid channel conflict with existing partners."
    },
    {
      step: "03",
      title: "Terms Alignment",
      desc: "Align on target minimum order quantities (MOQs), shipping terms, payment schedules, and distributor discount brackets."
    },
    {
      step: "04",
      title: "Portal Onboarding",
      desc: "Receive dealer login access, product specification catalogs, marketing resources, and schedule your first batch dispatch."
    }
  ];

  return (
    <main className="sec" style={{ position: "relative" }}>
      {/* Background Graphic Overlay & Floating Glow Elements */}
      <div className="partner-bg-overlay"></div>
      <div className="partner-glow-wrapper">
        <div className="bg-glow bg-glow-1"></div>
        <div className="bg-glow bg-glow-2"></div>
        <div className="bg-glow bg-glow-3"></div>
      </div>

      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <span className="sec-eyebrow">Work with us</span>
        <h1 className="sec-title">B2B Partnership &amp; Channels</h1>
        <p className="sec-sub" style={{ margin: "0 auto", color: "#000000", fontWeight: "400" }}>
          We welcome collaborations built on quality, transparency, and joint market growth. Join our expanding auto-parts supply chain.
        </p>
      </div>

      {/* PARTNERSHIP PROFILES */}
      <div className="partner-grid" style={{ marginBottom: "80px" }}>
        <div className="partner-tag">
          <div className="partner-dot"></div>
          <span className="partner-text">Automotive Distributors</span>
        </div>
        <div className="partner-tag">
          <div className="partner-dot"></div>
          <span className="partner-text">Spare Parts Retailers</span>
        </div>
        <div className="partner-tag">
          <div className="partner-dot"></div>
          <span className="partner-text">Fleet System Operators</span>
        </div>
        <div className="partner-tag">
          <div className="partner-dot"></div>
          <span className="partner-text">Service Centers &amp; Bays</span>
        </div>
        <div className="partner-tag">
          <div className="partner-dot"></div>
          <span className="partner-text">Export Sourcing Partners</span>
        </div>
      </div>

      {/* PARTNER TIERS */}
      <div style={{ marginBottom: "80px" }}>
        <h2 style={{ fontSize: "28px", color: "var(--text-light)", marginBottom: "16px", fontFamily: "var(--fd)", fontWeight: "700" }}>Partnership Opportunities</h2>
        <p style={{ color: "#000000", fontSize: "15.5px", maxWidth: "600px", marginBottom: "40px", fontWeight: "400" }}>
          Choose a partnership tier tailored to your logistics capability, customer base, and volume capacity.
        </p>

        <div className="partner-tiers">
          {tiers.map((tier) => (
            <div key={tier.title} className="tier-card">
              <h3 className="tier-title">{tier.title}</h3>
              <ul className="tier-benefits">
                {tier.benefits.map((benefit, idx) => (
                  <li key={idx}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ONBOARDING PROCESS */}
      <div style={{ marginBottom: "60px" }}>
        <h2 style={{ fontSize: "28px", color: "var(--text-light)", marginBottom: "16px", fontFamily: "var(--fd)", fontWeight: "700" }}>Dealer Onboarding Process</h2>
        <p style={{ color: "#000000", fontSize: "15.5px", maxWidth: "600px", marginBottom: "40px", fontWeight: "400" }}>
          Our application and setup process is designed to be streamlined, getting parts into your regional warehouses quickly.
        </p>

        <div className="partner-onboarding-grid">
          {onboardingSteps.map((step) => (
            <div key={step.step} className="testing-card">
              <span className="testing-badge">Step {step.step}</span>
              <h3 className="testing-title" style={{ marginTop: "10px" }}>{step.title}</h3>
              <p className="testing-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ENHANCED DARK CTA SECTION */}
      <section style={{ margin: "60px 0 0 0" }}>
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
            gap: "20px"
          }}
        >
          <span className="sec-eyebrow" style={{ color: "#38BDF8", letterSpacing: "3px" }}>Commercial desk</span>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 36px)", color: "#fff", fontWeight: "700", fontFamily: "var(--fd)", marginBottom: "0" }}>
            Start Your Application Today
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "15.5px", maxWidth: "680px", margin: "0 auto", fontWeight: "400", lineHeight: "1.7" }}>
            Ready to partner with STRAHL™? Contact our dealer support desk to submit your initial application details.
          </p>
          <div style={{ marginTop: "10px" }}>
            <Link href="/contact?mode=partner" className="btn-p">
              Apply For Dealership
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
