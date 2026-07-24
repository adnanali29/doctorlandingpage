import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

// Default seed users if table is empty
const defaultMasterAdmin = {
  id: 1,
  name: "Master Admin",
  email: "admin@addyfitness.com",
  password: "admin123",
  role: "Admin",
  designation: "Clinical Director & Master Admin",
  created_at: new Date().toISOString()
};

async function ensureUsersTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        role VARCHAR(20) NOT NULL DEFAULT 'View',
        designation VARCHAR(100),
        department VARCHAR(100) DEFAULT 'All',
        permissions JSONB DEFAULT '{}',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Ensure columns exist if table was already created earlier
    await sql`ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS department VARCHAR(100) DEFAULT 'All'`;
    await sql`ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS permissions JSONB DEFAULT '{}'`;

    // Seed master admin if table is empty
    const countRes = await sql`SELECT COUNT(*)::int as count FROM admin_users`;
    if (countRes[0].count === 0) {
      await sql`
        INSERT INTO admin_users (name, email, password, role, designation, department, permissions)
        VALUES ('Master Admin', 'admin@addyfitness.com', 'admin123', 'Admin', 'Clinical Director & Master Admin', 'All', '{}'::jsonb)
      `;
    }
  } catch (err) {
    console.error("Auto table migration error:", err);
  }
}

// GET /api/users — list all users
export async function GET() {
  try {
    await ensureUsersTable();
    const rows = await sql`
      SELECT id, name, email, role, designation, department, permissions, created_at AS "createdAt"
      FROM admin_users
      ORDER BY id ASC
    `;
    if (rows.length === 0) {
      return NextResponse.json([defaultMasterAdmin]);
    }
    return NextResponse.json(rows);
  } catch (err) {
    return NextResponse.json([defaultMasterAdmin]);
  }
}

// POST /api/users — create new admin/staff user
export async function POST(req) {
  try {
    await ensureUsersTable();
    const { name, email, password, role, designation, department, permissions } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
    }

    const userRole = role || "View";
    const userDesignation = designation || "Staff Consultant";
    const userDept = department || "All";
    const userPerms = permissions ? JSON.stringify(permissions) : "{}";

    const result = await sql`
      INSERT INTO admin_users (name, email, password, role, designation, department, permissions)
      VALUES (${name}, ${email.toLowerCase().trim()}, ${password}, ${userRole}, ${userDesignation}, ${userDept}, ${userPerms}::jsonb)
      RETURNING id, name, email, role, designation, department, permissions, created_at AS "createdAt"
    `;

    return NextResponse.json({ success: true, user: result[0] });
  } catch (err) {
    if (err.message?.includes("unique constraint") || err.message?.includes("already exists")) {
      return NextResponse.json({ error: "A user with this email address already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
