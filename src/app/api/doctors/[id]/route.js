import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

// PUT /api/doctors/[id]
export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const { name, spec, exp, img, focus } = await req.json();
    await sql`
      UPDATE doctors
      SET name=${name}, spec=${spec}, exp=${exp || null}, img=${img || null}, focus=${focus || null}
      WHERE id=${parseInt(id)}
    `;
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE /api/doctors/[id]
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    await sql`DELETE FROM doctors WHERE id=${parseInt(id)}`;
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
