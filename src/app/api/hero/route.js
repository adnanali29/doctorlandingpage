import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

// GET /api/hero
export async function GET() {
  const defaultSlides = [
    {
      id: "slide-1",
      title: "Skip the queue. Consult doctors online at home",
      desc: "Empowering healthcare diagnostics in minutes. Experience secure 1-on-1 private video medical assessments, instant legal digital prescriptions, and certified fitness syncing.",
      imgUrl: "/hero_banner.png"
    },
    {
      id: "slide-2",
      title: "Verified NMC Doctors Available 24/7",
      desc: "Connect directly with top certified medical specialists within minutes. Instant video calls, digital prescriptions & personalized care plans.",
      imgUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1920&auto=format&fit=crop"
    },
    {
      id: "slide-3",
      title: "Instant Digital Prescriptions & Follow-ups",
      desc: "Receive legally valid e-prescriptions on your phone immediately following your video session.",
      imgUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1920&auto=format&fit=crop"
    }
  ];

  try {
    // Attempt auto-migration to ensure slides column exists
    try {
      await sql`ALTER TABLE hero_content ADD COLUMN IF NOT EXISTS slides JSONB`;
    } catch (e) {
      // Ignore if table doesn't exist yet or DB user lacks permission
    }

    const rows = await sql`SELECT title, description AS desc, img_url AS "imgUrl", slides FROM hero_content LIMIT 1`;
    if (rows.length === 0) {
      return NextResponse.json({
        title: defaultSlides[0].title,
        desc: defaultSlides[0].desc,
        imgUrl: defaultSlides[0].imgUrl,
        slides: defaultSlides
      });
    }

    let parsedSlides = defaultSlides;
    if (rows[0].slides) {
      try {
        parsedSlides = typeof rows[0].slides === "string" ? JSON.parse(rows[0].slides) : rows[0].slides;
      } catch (e) {
        parsedSlides = defaultSlides;
      }
    }

    return NextResponse.json({
      title: rows[0].title || defaultSlides[0].title,
      desc: rows[0].desc || defaultSlides[0].desc,
      imgUrl: rows[0].imgUrl || defaultSlides[0].imgUrl,
      slides: Array.isArray(parsedSlides) && parsedSlides.length > 0 ? parsedSlides : defaultSlides
    });
  } catch (err) {
    return NextResponse.json({
      title: defaultSlides[0].title,
      desc: defaultSlides[0].desc,
      imgUrl: defaultSlides[0].imgUrl,
      slides: defaultSlides
    });
  }
}

// PUT /api/hero
export async function PUT(req) {
  try {
    const { title, desc, imgUrl, slides } = await req.json();

    try {
      await sql`ALTER TABLE hero_content ADD COLUMN IF NOT EXISTS slides JSONB`;
    } catch (e) {}

    const slidesJson = slides ? JSON.stringify(slides) : null;
    const existing = await sql`SELECT id FROM hero_content LIMIT 1`;

    if (existing.length === 0) {
      await sql`INSERT INTO hero_content (title, description, img_url, slides) VALUES (${title}, ${desc}, ${imgUrl}, ${slidesJson}::jsonb)`;
    } else {
      await sql`UPDATE hero_content SET title=${title}, description=${desc}, img_url=${imgUrl}, slides=${slidesJson}::jsonb, updated_at=NOW() WHERE id=${existing[0].id}`;
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
