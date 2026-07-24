import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

// Helper: Ensure bookings table and required columns exist
async function ensureBookingsTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS bookings (
        id TEXT PRIMARY KEY,
        name TEXT,
        phone TEXT,
        age TEXT,
        height TEXT,
        weight TEXT,
        symptoms TEXT,
        speciality TEXT,
        sync_addy BOOLEAN DEFAULT FALSE,
        status TEXT DEFAULT 'Active',
        booking_date TIMESTAMP DEFAULT NOW(),
        assigned_doctor TEXT DEFAULT '',
        stage TEXT DEFAULT 'Enquiry',
        is_pain BOOLEAN DEFAULT FALSE,
        remarks TEXT DEFAULT '',
        payment_status TEXT DEFAULT 'Unpaid',
        appointment_date TEXT DEFAULT ''
      )
    `;
    await sql`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS assigned_doctor TEXT DEFAULT ''`;
    await sql`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS stage TEXT DEFAULT 'Enquiry'`;
    await sql`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS is_pain BOOLEAN DEFAULT FALSE`;
    await sql`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS remarks TEXT DEFAULT ''`;
    await sql`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'Unpaid'`;
    await sql`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS appointment_date TEXT DEFAULT ''`;
  } catch (err) {
    console.error("Bookings table migration error:", err);
  }
}

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
    await ensureBookingsTable();
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
    console.error("GET /api/bookings error:", err);
    return NextResponse.json([], { status: 500 });
  }
}

// POST /api/bookings — create new booking
export async function POST(req) {
  try {
    await ensureBookingsTable();
    const body = await req.json();
    const { name, phone, age, height, weight, symptoms, speciality, syncAddy, appointmentDate } = body;

    const bookingId = await generateAFDCId();

    await sql`
      INSERT INTO bookings (id, name, phone, age, height, weight, symptoms, speciality, sync_addy, status, assigned_doctor, stage, is_pain, remarks, payment_status, appointment_date)
      VALUES (${bookingId}, ${name || ''}, ${phone || ''}, ${age || ''}, ${height || ''}, ${weight || ''}, ${symptoms || ''}, ${speciality || ''}, ${syncAddy || false}, 'Active', '', 'Enquiry', false, '', 'Unpaid', ${appointmentDate || ''})
    `;
    return NextResponse.json({ success: true, bookingId });
  } catch (err) {
    console.error("POST /api/bookings error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
