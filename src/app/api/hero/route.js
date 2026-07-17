import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

// GET /api/hero
export async function GET() {
  try {
    const rows = await sql`SELECT title, description AS desc, img_url AS "imgUrl" FROM hero_content LIMIT 1`;
    if (rows.length === 0) {
      return NextResponse.json({
        title: "Skip the queue. Consult doctors online at home",
        desc: "Empowering healthcare diagnostics in minutes.",
        imgUrl: "/hero_banner.png"
      });
    }
    return NextResponse.json(rows[0]);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT /api/hero
export async function PUT(req) {
  try {
    const { title, desc, imgUrl } = await req.json();
    const existing = await sql`SELECT id FROM hero_content LIMIT 1`;
    if (existing.length === 0) {
      await sql`INSERT INTO hero_content (title, description, img_url) VALUES (${title}, ${desc}, ${imgUrl})`;
    } else {
      await sql`UPDATE hero_content SET title=${title}, description=${desc}, img_url=${imgUrl}, updated_at=NOW() WHERE id=${existing[0].id}`;
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
