"use client";

import { useState, useEffect, useId, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Phone, Mail, MapPin, Send, MessageSquare, CheckCircle2, ShieldCheck } from "lucide-react";
import { FAQSection } from "@/components/FAQSection";

function ContactFormContent() {
  const searchParams = useSearchParams();

  const nameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const plotSizeId = useId();
  const serviceId = useId();
  const locationId = useId();
  const messageId = useId();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    plotSize: "",
    service: "AutoCAD 2D & 3D Drafting",
    location: "Bhubaneswar",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const serviceParam = searchParams?.get("service");
    const noteParam = searchParams?.get("note");
    if (serviceParam) {
      setFormData((prev) => ({ ...prev, service: serviceParam }));
    }
    if (noteParam) {
      setFormData((prev) => ({ ...prev, message: `Attached Estimate: ${noteParam}` }));
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
      {/* CONTACT INFO COLUMN */}
      <div className="lg:col-span-5 space-y-8">
        <div className="bg-[#111] border border-white/10 rounded-xl p-8 space-y-6">
          <h2 className="text-xl font-bold text-white uppercase tracking-wider">
            Studio Contact Details
          </h2>

          <div className="space-y-6 text-sm text-[#aaa]">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#e07a3a]/15 border border-[#e07a3a]/30 flex items-center justify-center text-[#e07a3a] shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-[#888] uppercase tracking-wider block mb-0.5">Phone Consultation</span>
                <a href="tel:+919778293547" className="text-base font-bold text-white hover:text-[#e07a3a] transition-colors">
                  +91 97782 93547
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-[#888] uppercase tracking-wider block mb-0.5">WhatsApp Direct Chat</span>
                <a
                  href="https://wa.me/9778293547?text=Hello%20ArchiMate,%20I%20want%20to%20discuss%20my%20building%20project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-bold text-white hover:text-[#25D366] transition-colors flex items-center gap-1.5"
                >
                  Chat on WhatsApp (+91 97782 93547)
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#d4a853]/15 border border-[#d4a853]/30 flex items-center justify-center text-[#d4a853] shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-[#888] uppercase tracking-wider block mb-0.5">Email Inquiry</span>
                <a href="mailto:archimate@studio.com" className="text-base font-bold text-white hover:text-[#d4a853] transition-colors">
                  archimate@studio.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-[#888] uppercase tracking-wider block mb-0.5">Office Location</span>
                <p className="text-sm font-semibold text-white">
                  Patia & Infocity Area, Bhubaneswar, Odisha, 751024, India
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Guarantee Box */}
        <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d4a853]">
            <ShieldCheck className="w-4 h-4 text-[#e07a3a]" /> IS Code Guarantee
          </div>
          <p className="text-xs text-[#aaa] leading-relaxed">
            All drawings are vetted by licensed civil structural engineers and checked for local municipal setback compliance (BDA/CDA).
          </p>
        </div>
      </div>

      {/* FORM COLUMN */}
      <div className="lg:col-span-7 bg-[#111] border border-white/10 rounded-xl p-8">
        <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-6">
          Request Project Estimate
        </h2>

        {submitted ? (
          <div className="p-8 bg-[#e07a3a]/10 border border-[#e07a3a]/40 rounded-xl text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-[#e07a3a] mx-auto" />
            <h3 className="text-2xl font-bold text-white">Thank You!</h3>
            <p className="text-xs text-[#ccc] max-w-md mx-auto leading-relaxed">
              Your project inquiry has been received. Our chief civil engineer will review your plot details and contact you within 24 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-2 bg-[#e07a3a] text-white text-xs font-bold uppercase tracking-wider rounded"
            >
              Send Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor={nameId} className="block text-xs font-semibold text-[#888] uppercase tracking-wider mb-2">
                  Your Full Name *
                </label>
                <input
                  id={nameId}
                  type="text"
                  required
                  placeholder="e.g. Er. Soumya Ranjan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-black/40 border border-white/15 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-[#e07a3a]"
                />
              </div>

              <div>
                <label htmlFor={phoneId} className="block text-xs font-semibold text-[#888] uppercase tracking-wider mb-2">
                  Phone Number *
                </label>
                <input
                  id={phoneId}
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-black/40 border border-white/15 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-[#e07a3a]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor={emailId} className="block text-xs font-semibold text-[#888] uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  id={emailId}
                  type="email"
                  placeholder="name@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-black/40 border border-white/15 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-[#e07a3a]"
                />
              </div>

              <div>
                <label htmlFor={plotSizeId} className="block text-xs font-semibold text-[#888] uppercase tracking-wider mb-2">
                  Plot Dimensions / Built-up Area
                </label>
                <input
                  id={plotSizeId}
                  type="text"
                  placeholder="e.g. 30x40 ft (1200 sq.ft G+2)"
                  value={formData.plotSize}
                  onChange={(e) => setFormData({ ...formData, plotSize: e.target.value })}
                  className="w-full bg-black/40 border border-white/15 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-[#e07a3a]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor={serviceId} className="block text-xs font-semibold text-[#888] uppercase tracking-wider mb-2">
                  Primary Service Required
                </label>
                <select
                  id={serviceId}
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-black/40 border border-white/15 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-[#e07a3a]"
                >
                  <option value="AutoCAD 2D & 3D Drafting">AutoCAD 2D & 3D Drafting</option>
                  <option value="3D Elevation & Facade Design">3D Elevation & Facade Design</option>
                  <option value="Structural Load & RCC Detailing">Structural Load & RCC Detailing</option>
                  <option value="Vastu & Space Layout Planning">Vastu & Space Layout Planning</option>
                  <option value="Municipal Approval Blueprints">Municipal Approval Blueprints</option>
                  <option value="Site Inspection & Quality Audit">Site Inspection & Quality Audit</option>
                </select>
              </div>

              <div>
                <label htmlFor={locationId} className="block text-xs font-semibold text-[#888] uppercase tracking-wider mb-2">
                  Project Location
                </label>
                <input
                  id={locationId}
                  type="text"
                  placeholder="e.g. Bhubaneswar, Cuttack, Puri"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-black/40 border border-white/15 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-[#e07a3a]"
                />
              </div>
            </div>

            <div>
              <label htmlFor={messageId} className="block text-xs font-semibold text-[#888] uppercase tracking-wider mb-2">
                Project Details & Notes
              </label>
              <textarea
                id={messageId}
                rows={4}
                placeholder="Describe your requirements, preferred floor count (G+1, G+2), Vastu preferences, or material estimates..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-black/40 border border-white/15 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-[#e07a3a]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#e07a3a] hover:bg-[#c9682b] text-white text-xs font-bold uppercase tracking-widest rounded transition-all shadow-xl flex items-center justify-center gap-2"
            >
              Submit Inquiry <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-28 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="sec-label">Get In Touch</p>
          <h1 className="section-title text-4xl md:text-6xl mb-4">
            Start Your <em className="font-serif-italic text-[#d4a853] font-normal">Project</em>
          </h1>
          <p className="text-base text-[#888] max-w-2xl leading-relaxed">
            Have a building project in mind? Contact our civil engineering and architectural drafting studio for 2D plans, 3D front elevations, or site quantity verification.
          </p>
        </div>

        <Suspense fallback={<div className="text-white text-center py-12">Loading form...</div>}>
          <ContactFormContent />
        </Suspense>

        {/* FAQ Section */}
        <FAQSection />
      </div>
    </div>
  );
}
