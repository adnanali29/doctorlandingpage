"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

function ContactFormInner() {
  const searchParams = useSearchParams();
  const productParam = searchParams.get("product");
  const modeParam = searchParams.get("mode");

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    inquiryType: modeParam === "partner" ? "partner" : "sourcing",
    productInterest: productParam || "none",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    setSubmitted(true);
  };

  return (
    <div className="contact-form-wrap">
      {submitted ? (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <div className="chk" style={{ margin: "0 auto 20px auto", width: "48px", height: "48px" }}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h3 style={{ color: "#fff", fontSize: "22px", marginBottom: "10px" }}>Enquiry Received</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "14px", lineHeight: "1.6" }}>
            Thank you for reaching out. A STRAHL™ commercial representative will review your request and get back to your business within 24 hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h3 className="contact-form-title">Send Commercial Enquiry</h3>
          
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Contact Name *</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                placeholder="e.g. John Doe"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="company">Company Name *</label>
              <input 
                type="text" 
                id="company" 
                name="company" 
                value={formData.company} 
                onChange={handleChange} 
                required 
                placeholder="e.g. Auto Parts Dist. Ltd"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Work Email *</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                placeholder="e.g. purchasing@company.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                required 
                placeholder="e.g. +91 98765 43210"
              />
            </div>

            <div className="form-group">
              <label htmlFor="inquiryType">Inquiry Type</label>
              <select 
                id="inquiryType" 
                name="inquiryType" 
                value={formData.inquiryType} 
                onChange={handleChange}
              >
                <option value="sourcing">Volume Sourcing Quote</option>
                <option value="partner">Dealership / Distributor Application</option>
                <option value="fleet">Fleet &amp; Service Program</option>
                <option value="general">General Support / Custom Specs</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="productInterest">Product Segment</label>
              <select 
                id="productInterest" 
                name="productInterest" 
                value={formData.productInterest} 
                onChange={handleChange}
              >
                <option value="none">General Sourcing Portfolio</option>
                <option value="Air Suspension Strut">Air Suspension Strut</option>
                <option value="Air Suspension Compressor">Air Suspension Compressor</option>
                <option value="Valve Block">Valve Block</option>
                <option value="Upper Control Arm">Upper Control Arm</option>
                <option value="Lower Control Arm">Lower Control Arm</option>
                <option value="Stabilizer Link">Stabilizer Link</option>
                <option value="Tie Rod End">Tie Rod End</option>
                <option value="AC Compressor">AC Compressor</option>
                <option value="AC Condenser">AC Condenser</option>
                <option value="Cooling Coil / Evaporator">Cooling Coil / Evaporator</option>
                <option value="Expansion Valve">Expansion Valve</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label htmlFor="message">Enquiry Message *</label>
              <textarea 
                id="message" 
                name="message" 
                rows="5" 
                value={formData.message} 
                onChange={handleChange} 
                required 
                placeholder="Detail your requirements, volume demands, or target vehicle coverage..."
              ></textarea>
            </div>
          </div>

          <button type="submit" className="form-submit-btn">
            Submit B2B Inquiry
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "4px" }}>
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      )}
    </div>
  );
}

export default function ContactPage() {
  return (
    <main className="sec">
      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <span className="sec-eyebrow">Reach us</span>
        <h1 className="sec-title">Contact Sales &amp; Distribution</h1>
        <p className="sec-sub" style={{ margin: "0 auto", color: "#000000", fontWeight: "400" }}>
          Get in touch with our commercial desks regarding custom orders, technical specifications, and dealership accounts.
        </p>
      </div>

      <div className="contact-grid">
        {/* DIRECT INFORMATION */}
        <div className="c-info">
          <div className="c-item">
            <div className="c-ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div>
              <div className="c-lbl">Registered Address</div>
              <div className="c-val">
                Tamilnadu, India
                <div style={{ color: "var(--text-muted)", fontSize: "12px", marginTop: "4px" }}>
                  STRAHL™ — A Brand of Imperion Global Trade
                </div>
              </div>
            </div>
          </div>

          <div className="c-item">
            <div className="c-ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <div>
              <div className="c-lbl">Email Address</div>
              <div className="c-val">
                <a href="mailto:sales@strahl.in">sales@strahl.in</a>
              </div>
            </div>
          </div>

          <div className="c-item">
            <div className="c-ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <div>
              <div className="c-lbl">Official Portal</div>
              <div className="c-val">
                <a href="https://www.strahl.in" target="_blank" rel="noopener noreferrer">www.strahl.in</a>
              </div>
            </div>
          </div>

          <div className="c-item">
            <div className="c-ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.4 16z"/>
              </svg>
            </div>
            <div>
              <div className="c-lbl">Commercial Helpdesk</div>
              <div className="c-val">
                +91 XXXXX XXXXX
              </div>
            </div>
          </div>
        </div>

        {/* SUSPENSE BOUNDARY WRAPPED FORM */}
        <Suspense fallback={<div style={{ color: "var(--text-muted)" }}>Loading Inquiry Form...</div>}>
          <ContactFormInner />
        </Suspense>
      </div>
    </main>
  );
}
