import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        {/* COLUMN 1: BRAND SUMMARY */}
        <div className="footer-col">
          <div className="footer-logo">
            <Image
              src="/images/logo.jpg"
              alt="STRAHL Logo"
              width={100}
              height={24}
              style={{ height: "24px", width: "auto", objectFit: "contain", filter: "brightness(100)" }}
            />
            <span className="footer-logo-txt">STRAHL</span>
          </div>
          <p style={{ marginTop: "10px" }}>
            STRAHL™ is a trusted automotive aftermarket brand specializing in premium, OEM-grade steering, suspension, and climate systems. We supply high-end control arms, air struts, valve blocks, AC compressors, and chassis rubber-metal dampening components for passenger and fleet vehicles.
          </p>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
            A Brand of Imperion Global Trade
          </div>
        </div>

        {/* COLUMN 2: PAGE DIRECTORY */}
        <div className="footer-col">
          <h4>Navigation</h4>
          <ul>
            <li><Link href="/">Home Portal</Link></li>
            <li><Link href="/about">About STRAHL</Link></li>
            <li><Link href="/products">Sourcing Catalog</Link></li>
            <li><Link href="/quality">Quality Control</Link></li>
            <li><Link href="/partner">B2B Dealership</Link></li>
            <li><Link href="/contact">Commercial Desk</Link></li>
          </ul>
        </div>

        {/* COLUMN 3: PRODUCT DIRECTORY */}
        <div className="footer-col">
          <h4>Sourcing Directory</h4>
          <ul>
            <li><Link href="/products">Air Suspension Struts</Link></li>
            <li><Link href="/products">Air Suspension Compressors</Link></li>
            <li><Link href="/products">Upper &amp; Lower Control Arms</Link></li>
            <li><Link href="/products">Stabilizer Sway Links</Link></li>
            <li><Link href="/products">AC Solenoid Compressors</Link></li>
            <li><Link href="/products">Expansion Valves &amp; Coils</Link></li>
          </ul>
        </div>

        {/* COLUMN 4: SOURCING HELP */}
        <div className="footer-col">
          <h4>Enquiry Support</h4>
          <p style={{ marginBottom: "10px" }}>
            Reach out to our global dispatch desk to receive catalog indexes, lead times, and distributor trade terms.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13.5px" }}>
            <span style={{ color: "rgba(255,255,255,0.6)" }}>
              Email: <a href="mailto:sales@strahl.in" style={{ color: "var(--accent-blue)", fontWeight: "600" }}>sales@strahl.in</a>
            </span>
            <span style={{ color: "rgba(255,255,255,0.6)" }}>
              Official: <a href="https://www.strahl.in" target="_blank" rel="noopener noreferrer" style={{ color: "#fff" }}>www.strahl.in</a>
            </span>
            <span style={{ color: "rgba(255,255,255,0.6)" }}>
              Address: Tamilnadu, India
            </span>
          </div>
        </div>
      </div>

      {/* BOTTOM LEGAL & POLICIES BAR */}
      <div className="footer-bottom">
        <div>
          <span>© 2026 STRAHL. All rights reserved. All manufacturer names, symbols, and descriptions are used solely for identification purposes.</span>
        </div>
        <div style={{ display: "flex", gap: "16px" }}>
          <Link href="/contact">Trade Terms</Link>
          <Link href="/contact">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
