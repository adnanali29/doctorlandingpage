import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

// PATCH /api/bookings/[id] — update status or syncAddy
export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status, syncAddy } = body;

    if (status !== undefined && syncAddy !== undefined) {
      await sql`UPDATE bookings SET status=${status}, sync_addy=${syncAddy} WHERE id=${id}`;
    } else if (status !== undefined) {
      await sql`UPDATE bookings SET status=${status} WHERE id=${id}`;
    } else if (syncAddy !== undefined) {
      await sql`UPDATE bookings SET sync_addy=${syncAddy} WHERE id=${id}`;
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE /api/bookings/[id] — delete booking
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    await sql`DELETE FROM bookings WHERE id=${id}`;
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
