import Link from "next/link";

export const metadata = {
  title: "About STRAHL™ — Engineering Sourcing Excellence",
  description: "Learn about the mission, values, engineering pillars, and B2B commitment that define the STRAHL™ brand.",
};

export default function AboutPage() {
  return (
    <main className="sec">
      {/* HEADER BANNER */}
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <span className="sec-eyebrow">About the brand</span>
        <h1 className="sec-title">Engineering Sourcing Excellence</h1>
        <p className="sec-sub" style={{ margin: "0 auto", color: "#000000", fontWeight: "400" }}>
          STRAHL™ is a specialized B2B brand committed to supply chain excellence in steering, suspension, and climate systems.
        </p>
      </div>

      {/* CORE INFORMATION GRID */}
      <div className="about-grid" style={{ marginBottom: "80px" }}>
        <div className="about-body">
          <h2 style={{ fontSize: "28px", color: "var(--text-light)", marginBottom: "16px", fontWeight: "700" }}>Who We Are</h2>
          <p>
            STRAHL™ is a trusted automotive aftermarket brand dedicated to delivering high-quality suspension, steering, and climate control components. Our core focus is supporting commercial fleets, retail vendors, and parts distributors with replacements that meet the intense mechanical demands of modern roads.
          </p>
          <p>
            Operating under Imperion Global Trade, the STRAHL™ brand bridges the gap between top-tier precision manufacturing and the distribution networks that keep vehicles running safely. We do not just supply parts; we design solutions that ensure fitment precision, extreme durability, and consistent performance.
          </p>
          <p>
            By working with certified manufacturing facilities (certified under IATF 16949 and ISO 9001 systems), our products are audited to guarantee compliance with original specifications, giving our partners confidence in every shipment.
          </p>
          <p style={{ marginTop: "24px" }}>
            <Link href="/products" className="btn-p" style={{ padding: "10px 24px", fontSize: "13px" }}>
              Explore Our Portfolio
            </Link>
          </p>
        </div>

        <div className="pillars">
          <div className="pillar">
            <div className="pillar-ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div>
              <div className="pillar-t">Wide Vehicle Coverage</div>
              <div className="pillar-s">Precision fitments for passenger cars, SUVs, and light commercial vehicles across global platforms.</div>
            </div>
          </div>

          <div className="pillar">
            <div className="pillar-ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <div>
              <div className="pillar-t">Extended Service Life</div>
              <div className="pillar-s">Engineered to withstand demanding temperature fluctuations, road salts, and high-frequency load stress.</div>
            </div>
          </div>

          <div className="pillar">
            <div className="pillar-ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <div>
              <div className="pillar-t">Verified Quality Standards</div>
              <div className="pillar-s">Rigorous multi-point testing protocols matching metallurgical and structural OEM requirements.</div>
            </div>
          </div>

          <div className="pillar">
            <div className="pillar-ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div>
              <div className="pillar-t">Distributor-Centric Support</div>
              <div className="pillar-s">Dedicated supply terms, low logistics lead times, and digital parts indexing catalogs.</div>
            </div>
          </div>
        </div>
      </div>

      {/* VISION & MISSION */}
      <div className="vm-grid" style={{ marginBottom: "40px" }}>
        <div className="vm-card vm-v">
          <div className="vm-header">
            <div className="vm-ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </div>
            <div>
              <div className="vm-lbl">Our Vision</div>
              <h3 className="vm-title">Recognized. Trusted. Relied Upon.</h3>
            </div>
          </div>
          <p className="vm-body">
            To establish STRAHL™ as the leading benchmark for replacement components in the global automotive aftermarket. We aim to achieve this by consistently supplying parts that represent the peak of durability and reliability, creating long-term value for automotive professionals and distribution networks.
          </p>
        </div>

        <div className="vm-card vm-m">
          <div className="vm-header">
            <div className="vm-ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="6"/>
                <circle cx="12" cy="12" r="2"/>
              </svg>
            </div>
            <div>
              <div className="vm-lbl">Our Mission</div>
              <h3 className="vm-title">Precision. Service. Continuous Growth.</h3>
            </div>
          </div>
          <p className="vm-body">
            To provide the global automotive supply chain with reliable chassis and climate control components built to stringent quality regulations. We are committed to refining our catalog, expanding platform coverage, and offering professional, prompt support that empowers our B2B partners.
          </p>
        </div>
      </div>
    </main>
  );
}
