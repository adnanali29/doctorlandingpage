import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

// PATCH /api/bookings/[id] — update status, syncAddy, or lead details
export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status, syncAddy, assignedDoctor, stage, isPain, remarks, paymentStatus, appointmentDate } = body;

    // Build update dynamically — only update fields that are explicitly provided
    if (status !== undefined && syncAddy !== undefined) {
      await sql`UPDATE bookings SET status=${status}, sync_addy=${syncAddy} WHERE id=${id}`;
    } else if (status !== undefined) {
      await sql`UPDATE bookings SET status=${status} WHERE id=${id}`;
    } else if (syncAddy !== undefined) {
      await sql`UPDATE bookings SET sync_addy=${syncAddy} WHERE id=${id}`;
    }

    // Lead detail fields (can be sent independently or together)
    if (assignedDoctor !== undefined || stage !== undefined || isPain !== undefined || remarks !== undefined || paymentStatus !== undefined || appointmentDate !== undefined) {
      await sql`
        UPDATE bookings SET
          assigned_doctor   = COALESCE(${assignedDoctor ?? null}, assigned_doctor),
          stage             = COALESCE(${stage ?? null}, stage),
          is_pain           = COALESCE(${isPain ?? null}, is_pain),
          remarks           = COALESCE(${remarks ?? null}, remarks),
          payment_status    = COALESCE(${paymentStatus ?? null}, payment_status),
          appointment_date  = COALESCE(${appointmentDate ?? null}, appointment_date)
        WHERE id = ${id}
      `;
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
