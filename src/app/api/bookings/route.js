import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

// Helper: generate next AFDC ID
async function generateAFDCId() {
  const rows = await sql`
    SELECT id FROM bookings
    WHERE id LIKE 'AFDC%'
    ORDER BY id DESC
    LIMIT 1
  `;
  if (rows.length === 0) return "AFDC001";
  const last = rows[0].id; // e.g. "AFDC007"
  const num = parseInt(last.replace("AFDC", ""), 10);
  const next = num + 1;
  return "AFDC" + String(next).padStart(3, "0");
}

// GET /api/bookings — list all bookings
export async function GET() {
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
      ORDER BY booking_date DESC
    `;
    return NextResponse.json(rows);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST /api/bookings — create new booking
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, phone, age, height, weight, symptoms, speciality, syncAddy, appointmentDate } = body;

    const bookingId = await generateAFDCId();

    await sql`
      INSERT INTO bookings (id, name, phone, age, height, weight, symptoms, speciality, sync_addy, status, assigned_doctor, stage, is_pain, remarks, payment_status, appointment_date)
      VALUES (${bookingId}, ${name}, ${phone}, ${age}, ${height}, ${weight}, ${symptoms}, ${speciality}, ${syncAddy || false}, 'Active', '', 'Enquiry', false, '', 'Unpaid', ${appointmentDate || ''})
    `;
    return NextResponse.json({ success: true, bookingId });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
