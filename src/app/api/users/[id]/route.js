import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

// PUT /api/users/[id] — update user role, designation, department, permissions, or password
export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const { name, role, designation, department, permissions, password } = await req.json();

    const userDept = department || "All";
    const userPerms = permissions ? JSON.stringify(permissions) : "{}";

    if (password) {
      await sql`
        UPDATE admin_users
        SET name=${name}, role=${role}, designation=${designation}, department=${userDept}, permissions=${userPerms}::jsonb, password=${password}
        WHERE id=${id}
      `;
    } else {
      await sql`
        UPDATE admin_users
        SET name=${name}, role=${role}, designation=${designation}, department=${userDept}, permissions=${userPerms}::jsonb
        WHERE id=${id}
      `;
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE /api/users/[id] — delete user
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    await sql`DELETE FROM admin_users WHERE id=${id}`;
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
