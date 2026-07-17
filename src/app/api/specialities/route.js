import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

// GET /api/specialities
export async function GET() {
  try {
    const rows = await sql`
      SELECT id, title, description AS desc, fee, icon, tag
      FROM specialities ORDER BY sort_order ASC
    `;
    return NextResponse.json(rows);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST /api/specialities — add new
export async function POST(req) {
  try {
    const { title, desc, fee, icon, tag } = await req.json();
    const countRow = await sql`SELECT COUNT(*) as cnt FROM specialities`;
    const order = parseInt(countRow[0].cnt);
    const result = await sql`
      INSERT INTO specialities (title, description, fee, icon, tag, sort_order)
      VALUES (${title}, ${desc}, ${fee}, ${icon || null}, ${tag || null}, ${order})
      RETURNING id, title, description AS desc, fee, icon, tag
    `;
    return NextResponse.json(result[0]);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
