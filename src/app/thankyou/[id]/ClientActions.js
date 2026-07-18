"use client";

import React, { useEffect } from "react";

export default function ClientActions({ bookingId, speciality, price = 699, patientName }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Track Meta Pixel Lead event
      if (window.fbq) {
        window.fbq("track", "Lead", {
          content_name: speciality,
          value: price,
          currency: "INR"
        });
      }

      // Track GA4 Purchase event
      if (window.gtag) {
        window.gtag("event", "purchase", {
          transaction_id: bookingId,
          value: price,
          currency: "INR",
          items: [{
            item_name: `${speciality} Consultation`,
            price: price
          }]
        });
      }
    }
  }, [bookingId, speciality, price]);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="space-y-6 w-full">
      {/* Elegant Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full print:hidden">
        <button
          onClick={handlePrint}
          className="flex-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold py-3.5 px-6 rounded-2xl transition-all text-xs uppercase tracking-wider active:scale-95 shadow-sm flex items-center justify-center gap-2 cursor-pointer font-poppins"
        >
          <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-4a2 2 0 00-2-2H9v4a2 2 0 002 2zm8-9v2m-5-2v2m-5-2v2" />
          </svg>
          Print Receipt
        </button>
        <a
          href="/"
          className="flex-1 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white font-bold py-3.5 px-6 rounded-2xl transition-all text-xs uppercase tracking-wider active:scale-95 shadow-lg shadow-brand-600/20 flex items-center justify-center gap-2 cursor-pointer font-poppins"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Back to Home
        </a>
      </div>
    </div>
  );
}
