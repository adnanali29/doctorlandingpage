import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

// GET /api/doctors
export async function GET() {
  try {
    const rows = await sql`
      SELECT id, name, spec, exp, img, focus
      FROM doctors ORDER BY sort_order ASC
    `;
    return NextResponse.json(rows);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST /api/doctors — add new
export async function POST(req) {
  try {
    const { name, spec, exp, img, focus } = await req.json();
    const countRow = await sql`SELECT COUNT(*) as cnt FROM doctors`;
    const order = parseInt(countRow[0].cnt);
    const result = await sql`
      INSERT INTO doctors (name, spec, exp, img, focus, sort_order)
      VALUES (${name}, ${spec}, ${exp || null}, ${img || null}, ${focus || null}, ${order})
      RETURNING id, name, spec, exp, img, focus
    `;
    return NextResponse.json(result[0]);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
