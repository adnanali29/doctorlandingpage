import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

// GET /api/concerns
export async function GET() {
  try {
    const rows = await sql`
      SELECT id, name, key, specialist, count, img_url AS "img"
      FROM concerns ORDER BY sort_order ASC
    `;
    return NextResponse.json(rows);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST /api/concerns — add new
export async function POST(req) {
  try {
    const { name, key, specialist, count, img } = await req.json();
    const countRow = await sql`SELECT COUNT(*) as cnt FROM concerns`;
    const order = parseInt(countRow[0].cnt);
    const result = await sql`
      INSERT INTO concerns (name, key, specialist, count, img_url, sort_order)
      VALUES (${name}, ${key}, ${specialist}, ${count || null}, ${img || null}, ${order})
      RETURNING id, name, key, specialist, count, img_url AS img
    `;
    return NextResponse.json(result[0]);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
