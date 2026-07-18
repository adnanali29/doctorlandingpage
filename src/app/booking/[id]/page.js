import React from "react";
import { sql } from "@/lib/db";
import Link from "next/link";
import ClientActions from "./ClientActions";

async function getBooking(id) {
  try {
    const rows = await sql`
      SELECT id, name, phone, age, height, weight, symptoms, speciality,
             sync_addy AS "syncAddy", status,
             booking_date AS "date",
             assigned_doctor AS "assignedDoctor",
             stage, is_pain AS "isPain", remarks,
             payment_status AS "paymentStatus",
             appointment_date AS "appointmentDate"
      FROM bookings
      WHERE id = ${id}
      LIMIT 1
    `;
    return rows[0] || null;
  } catch (err) {
    console.error("Database query failed:", err);
    return null;
  }
}

const specialtyFees = {
  "General Physician": 699,
  "Medicine Specialist": 699,
  "Sexologist": 699,
  "Gynaecologist": 699,
  "Endocrinologist": 699,
  "General Surgeon": 699,
  "Psychiatrist": 699,
  "Gastroenterologist": 699,
  "Mental Health": 799
};

export default async function BookingDetailPage({ params }) {
  const { id } = await params;
  const booking = await getBooking(id);

  if (!booking) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-xl border border-slate-100 text-center space-y-6">
          <div className="w-16 h-16 bg-rose-50 border border-rose-100 rounded-full flex items-center justify-center mx-auto text-rose-500">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-black font-poppins text-slate-800">Booking Reference Not Found</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            The booking ID <span className="font-mono bg-slate-100 px-2 py-0.5 rounded font-bold text-rose-600">{id}</span> could not be found or may have been deleted.
          </p>
          <a
            href="/"
            className="block w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 px-6 rounded-2xl transition-all text-xs uppercase tracking-wider shadow-md shadow-brand-500/20"
          >
            Back to Homepage
          </a>
        </div>
      </div>
    );
  }

  // Format creation timestamp
  const rawDate = booking.date ? new Date(booking.date) : new Date();
  const createdTime = rawDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }) + " at " + rawDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });

  const price = specialtyFees[booking.speciality] || 699;

  const apptRaw = booking.appointmentDate;
  let apptFormatted = "Pending allocation";
  if (apptRaw) {
    const rawDateObj = new Date(apptRaw);
    if (!isNaN(rawDateObj.getTime())) {
      apptFormatted = rawDateObj.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
      }) + " at " + rawDateObj.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      });
    } else {
      apptFormatted = apptRaw;
    }
  }

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between antialiased pb-12">
      {/* Dynamic Header */}
      <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm print:hidden">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center bg-slate-900 shadow-sm border border-slate-800">
            <img
              src="/logo.png"
              alt="Addy Fitness"
              className="w-8 h-8 object-contain"
            />
          </div>
          <div>
            <h1 className="text-xs font-bold font-poppins tracking-wider text-slate-900">ADDY FITNESS</h1>
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-0.5">Clinical Outpatient</p>
          </div>
        </Link>
        <span className="text-[9px] bg-slate-900 text-brand-300 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-slate-800">
          Booking Terminal
        </span>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-lg bg-white rounded-[32px] border border-slate-100 shadow-xl p-6 sm:p-10 flex flex-col items-center gap-6">
          
          {/* Animated Success Ring */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-20 h-20 rounded-full bg-emerald-500/10 animate-ping print:hidden" style={{ animationDuration: '3s' }} />
            <div className="w-16 h-16 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center relative z-10">
              <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-black text-slate-900 font-poppins">Appointment Booked!</h2>
            <p className="text-[11px] text-slate-500 mt-1.5 max-w-sm mx-auto leading-relaxed">
              Thank you, <strong className="text-slate-800 font-bold">{booking.name}</strong>. Your medical consultation booking has been verified and logged. This page serves as your official confirmation receipt.
            </p>
          </div>

          {/* Premium Ticket Card Layout */}
          <div className="w-full bg-slate-50/50 border border-slate-200/50 rounded-3xl p-5 sm:p-7 text-left space-y-4 shadow-inner relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/5 rounded-full blur-2xl pointer-events-none" />
            
            {/* Card Header */}
            <div className="border-b border-slate-200/60 pb-3.5 flex justify-between items-center">
              <div>
                <span className="text-[9px] text-slate-400 uppercase font-black tracking-widest">Consultation Ref ID</span>
                <h3 className="text-lg font-black text-brand-600 font-poppins leading-tight mt-0.5">{booking.id}</h3>
              </div>
              <div className="text-right">
                <span className="text-[9px] text-slate-400 uppercase font-black tracking-widest block">Booking Status</span>
                <span className="inline-flex items-center gap-1.5 text-[9px] bg-emerald-50 border border-emerald-100 text-emerald-700 font-bold px-3 py-1 rounded-full mt-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Confirmed
                </span>
              </div>
            </div>

            {/* Receipt Details Grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-[11px] border-b border-slate-200/40 pb-4">
              <div>
                <span className="block text-[9px] text-slate-400 font-black uppercase tracking-widest mb-0.5">Patient Name</span>
                <span className="font-semibold text-slate-800 truncate block">{booking.name}</span>
              </div>
              <div>
                <span className="block text-[9px] text-slate-400 font-black uppercase tracking-widest mb-0.5">Contact Number</span>
                <span className="font-semibold text-slate-800 block">{booking.phone}</span>
              </div>
              <div>
                <span className="block text-[9px] text-slate-400 font-black uppercase tracking-widest mb-0.5">Age &amp; Vitals</span>
                <span className="font-semibold text-slate-800 block">
                  {booking.age} yrs · {booking.height}cm · {booking.weight}kg
                </span>
              </div>
              <div>
                <span className="block text-[9px] text-slate-400 font-black uppercase tracking-widest mb-0.5">Payment Details</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1">
                  ₹{price} · <span className="text-amber-600 font-bold">{booking.paymentStatus || "Unpaid"}</span>
                </span>
              </div>
              <div className="col-span-2">
                <span className="block text-[9px] text-slate-400 font-black uppercase tracking-widest mb-0.5">Scheduled Slot (Preferred)</span>
                <span className="font-semibold text-brand-700 flex items-center gap-1.5 bg-brand-50/50 border border-brand-100 rounded-lg px-2.5 py-1 text-xs">
                  <svg className="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {apptFormatted}
                </span>
              </div>
              <div className="col-span-2">
                <span className="block text-[9px] text-slate-400 font-black uppercase tracking-widest mb-0.5">Focus Specialty / Domain</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-brand-500" />
                  {booking.speciality}
                </span>
              </div>
              {booking.symptoms && (
                <div className="col-span-2">
                  <span className="block text-[9px] text-slate-400 font-black uppercase tracking-widest mb-0.5">Reported Concern / Symptoms</span>
                  <div className="text-slate-600 leading-relaxed italic bg-white border border-slate-100 rounded-2xl px-4 py-2.5 text-[11px] font-medium shadow-sm">
                    "{booking.symptoms}"
                  </div>
                </div>
              )}
            </div>

            {/* Interactive Actions and Copy Block */}
            <ClientActions
              bookingId={booking.id}
              speciality={booking.speciality}
              price={price}
              patientName={booking.name}
            />

          </div>

          <div className="text-center text-[10px] text-slate-400 leading-relaxed max-w-sm mt-2 print:hidden">
            <p>Our virtual triage coordinator will review the booking parameters shortly. Meta/GTM tags on this page will track conversion signals correctly.</p>
          </div>
        </div>
      </main>

      {/* Dynamic Footer */}
      <footer className="text-center text-[10px] text-slate-400 pt-6 border-t border-slate-100 w-full max-w-md mx-auto print:hidden">
        © 2026 Addy Fitness. All rights reserved. Registered Telemedicine Outpatient Terminal.
      </footer>
    </div>
  );
}
