export const metadata = {
  title: "Quality Standards — STRAHL™ Sourcing & Sourcing verification",
  description: "Learn about the extensive testing, metallurgical inspections, and factory certifications that guarantee the durability of STRAHL™ automotive parts.",
};

export default function QualityPage() {
  const testingPhases = [
    {
      phase: "01",
      name: "Metallurgical Analysis",
      desc: "Spectrometric inspection of incoming raw steel, high-grade forged aluminum alloys, and custom natural rubber formulations to verify density, grain structure, and material purity conform exactly to specifications."
    },
    {
      phase: "02",
      name: "Salt Spray Corrosion Resistance",
      desc: "Chassis and steel mounting brackets undergo strict ASTM B117 / ISO 9227 salt spray tests for a minimum of 240 hours to guarantee anti-corrosion protection in high moisture and winter environments."
    },
    {
      phase: "03",
      name: "Dynamic Fatigue Testing",
      desc: "Hydraulic actuators subject suspension control arms, ball joints, and air strut bellows to continuous high-frequency load cycles (minimum 5 million stress cycles) to verify fatigue limits before release."
    },
    {
      phase: "04",
      name: "3D Coordinate Precision",
      desc: "CNC Coordinate Measuring Machines (CMM) analyze physical dimensions down to micron-level tolerances. This ensures a 100% direct-fit installation with original steering knuckles and subframes."
    },
    {
      phase: "05",
      name: "Elastomer Elasticity & Tensile",
      desc: "Rubber bushings, strut mounts, and bellows undergo Shore hardness verification, elongation tests, and tensile pulling checks to ensure rubber-to-metal bonding does not separate under load."
    },
    {
      phase: "06",
      name: "High-Pressure Helium Leakage",
      desc: "Air suspension struts, compressors, and AC condensers are subjected to intensive high-pressure helium leakage testing, identifying structural microscopic leaks invisible to standard air bubble tests."
    }
  ];

  return (
    <main className="sec">
      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <span className="sec-eyebrow">Our standards</span>
        <h1 className="sec-title">Quality Assurance &amp; Sourcing Control</h1>
        <p className="sec-sub" style={{ margin: "0 auto", color: "#000000", fontWeight: "400" }}>
          Every STRAHL™ component is selected and evaluated under strict verification protocols, ensuring consistent B2B replacement reliability.
        </p>
      </div>

      {/* CORE QUALITY COMMITMENT */}
      <div className="qual-grid" style={{ marginBottom: "80px" }}>
        <div className="qual-item">
          <div className="chk">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M12 7v10M7 12h10"/>
            </svg>
          </div>
          <div>
            <h3 className="chk-t">Precision Engineering</h3>
            <p className="chk-s">Parts are machined to extremely tight dimensional tolerances matching global standards.</p>
          </div>
        </div>

        <div className="qual-item">
          <div className="chk">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12a10 10 0 1 1 20 0"/>
              <path d="m19 19-4-4"/>
              <path d="M12 12V6"/>
              <circle cx="12" cy="12" r="1"/>
            </svg>
          </div>
          <div>
            <h3 className="chk-t">Consistent Performance</h3>
            <p className="chk-s">Evaluated to perform reliably across severe temperature fluctuations and load peaks.</p>
          </div>
        </div>

        <div className="qual-item">
          <div className="chk">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M12 8v8M9 11h6"/>
            </svg>
          </div>
          <div>
            <h3 className="chk-t">Durability Under Demand</h3>
            <p className="chk-s">Built using carbon steel, forged aluminum, and vulcanized rubber to resist rough driving conditions.</p>
          </div>
        </div>

        <div className="qual-item">
          <div className="chk">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="4" width="9" height="9" rx="2"/>
              <rect x="11" y="11" width="9" height="9" rx="2"/>
            </svg>
          </div>
          <div>
            <h3 className="chk-t">Direct OEM Fitment</h3>
            <p className="chk-s">Original equipment dimensions are mapped identically, ensuring simple plug-and-play installation.</p>
          </div>
        </div>
      </div>

      {/* DETAILED TESTING PIPELINE */}
      <div style={{ marginBottom: "60px" }}>
        <h2 style={{ fontSize: "28px", color: "var(--text-light)", marginBottom: "16px", fontFamily: "var(--fd)", fontWeight: "700" }}>Testing &amp; Inspection Protocol</h2>
        <p style={{ color: "#000000", fontSize: "15.5px", maxWidth: "600px", marginBottom: "30px", fontWeight: "400" }}>
          Before batch orders are dispatched to our distribution partners, samples are subjected to the following testing procedures at qualified testing centers.
        </p>

        <div className="testing-timeline">
          {testingPhases.map((phase) => (
            <div key={phase.phase} className="testing-card">
              <span className="testing-badge">Phase {phase.phase}</span>
              <h3 className="testing-title">{phase.name}</h3>
              <p className="testing-desc">{phase.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CERTIFICATIONS & PRODUCTION SOURCING */}
      <section className="sec-dark" style={{ margin: "40px 0 0 0", borderTop: "4px solid var(--accent-blue)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
          <h2 style={{ fontSize: "28px", color: "var(--text-light)", fontFamily: "var(--fd)", fontWeight: "700" }}>Accredited Production Sourcing</h2>
          <p style={{ color: "#000000", fontSize: "15.5px", lineHeight: "1.8", fontWeight: "400" }}>
            STRAHL™ operates under a strict manufacturer selection standard. We collaborate exclusively with production facilities whose quality management systems have achieved <strong style={{ color: "var(--accent-blue)", fontWeight: "600" }}>IATF 16949:2016</strong> accreditation (the global technical specification for automotive supply chains) and <strong style={{ color: "var(--accent-blue)", fontWeight: "600" }}>ISO 9001:2015</strong>. This ensures that traceability, corrective actions, and continuous improvement are embedded in the production of every component.
          </p>
        </div>
      </section>
    </main>
  );
}
