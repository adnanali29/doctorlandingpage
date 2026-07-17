import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

// GET /api/bookings — list all bookings
export async function GET() {
  try {
    const rows = await sql`
      SELECT id, name, phone, age, height, weight, symptoms, speciality,
             sync_addy AS "syncAddy", status, booking_date AS "date"
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
    const { id, name, phone, age, height, weight, symptoms, speciality, syncAddy } = body;
    await sql`
      INSERT INTO bookings (id, name, phone, age, height, weight, symptoms, speciality, sync_addy, status)
      VALUES (${id}, ${name}, ${phone}, ${age}, ${height}, ${weight}, ${symptoms}, ${speciality}, ${syncAddy || false}, 'Active')
    `;
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
