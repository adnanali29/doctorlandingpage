import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

// PUT /api/chatbot-rules/[id]
export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const { keywords, diagnosis, specialist, advice, userExample, botResponse } = await req.json();
    await sql`
      UPDATE chatbot_rules
      SET keywords=${keywords}, diagnosis=${diagnosis}, specialist=${specialist},
          advice=${advice || null}, user_example=${userExample || null}, bot_response=${botResponse || null}
      WHERE id=${parseInt(id)}
    `;
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE /api/chatbot-rules/[id]
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    await sql`DELETE FROM chatbot_rules WHERE id=${parseInt(id)}`;
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
