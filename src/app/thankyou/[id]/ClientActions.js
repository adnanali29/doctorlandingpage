"use client";

import React, { useState, useEffect } from "react";

export default function ClientActions({ bookingId, speciality, price = 699, patientName }) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(`${window.location.origin}/thankyou/${bookingId}`);

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

  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => console.error("Clipboard copy failed", err));
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = shareUrl;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Fallback copy failed", err);
      }
      document.body.removeChild(textarea);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="space-y-6 w-full">
      {/* Shareable Link Block */}
      <div className="border-t border-slate-200/50 pt-4 text-left">
        <span className="block text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1.5">Shareable Consultation URL</span>
        <div className="flex gap-2 items-center bg-white border border-slate-100 rounded-2xl p-1 shadow-sm">
          <span className="text-[10px] text-slate-500 font-mono truncate flex-1 pl-3 select-all">
            {shareUrl || `https://addyfitness.com/thankyou/${bookingId}`}
          </span>
          <button
            onClick={copyToClipboard}
            className={`flex items-center gap-1.5 text-[10px] font-bold px-3.5 py-2 rounded-xl transition-all active:scale-95 cursor-pointer shrink-0 ${
              copied
                ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-100"
            }`}
          >
            {copied ? (
              <>
                <svg className="w-3 h-3 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
                <span>Copied!</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m-7 8H9m0-3h3m0-3h3" />
                </svg>
                <span>Copy URL</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Elegant Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full mt-4 print:hidden">
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
          className="flex-1 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white font-bold py-3.5 px-6 rounded-2xl transition-all text-xs uppercase tracking-wider active:scale-95 shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2 cursor-pointer font-poppins"
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
