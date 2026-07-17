import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

// PUT /api/specialities/[id]
export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const { title, desc, fee, icon, tag } = await req.json();
    await sql`
      UPDATE specialities
      SET title=${title}, description=${desc}, fee=${fee}, icon=${icon || null}, tag=${tag || null}
      WHERE id=${parseInt(id)}
    `;
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE /api/specialities/[id]
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    await sql`DELETE FROM specialities WHERE id=${parseInt(id)}`;
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
