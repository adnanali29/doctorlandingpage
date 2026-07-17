import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

// PUT /api/concerns/[id]
export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const { name, key, specialist, count, img } = await req.json();
    await sql`
      UPDATE concerns
      SET name=${name}, key=${key}, specialist=${specialist}, count=${count || null}, img_url=${img || null}
      WHERE id=${parseInt(id)}
    `;
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE /api/concerns/[id]
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    await sql`DELETE FROM concerns WHERE id=${parseInt(id)}`;
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
