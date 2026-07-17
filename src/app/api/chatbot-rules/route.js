import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

const defaultRules = [
  { keywords: "fever, high temperature, warmth, body hot", diagnosis: "General Physician - Viral Fever / Pyrexia", specialist: "General Physician", advice: "Monitor body temperature every 4 hours, stay hydrated, and take plenty of rest.", userExample: "I have a high temperature and feel hot all over my body.", botResponse: "Hey! Sorry to hear you are running a temperature. Fever often signals a viral response. I recommend tracking it and booking a consult with our General Physician (₹699) to confirm if you need medical care." },
  { keywords: "cold, cough, runny nose, sneezing, sneeze, congestion", diagnosis: "General Physician - Cold & Cough (Common Cold / Upper Respiratory Infection)", specialist: "General Physician", advice: "Inhale steam, drink warm fluids, and rest to ease throat and nasal congestion.", userExample: "I have been coughing and sneezing with a runny nose all day.", botResponse: "Hey! A cold and cough can be very irritating. Drinking warm liquids and steam inhalation will help. I recommend consult with a General Physician (₹699) to check your chest health." },
  { keywords: "headache, head pain, migraine, temple pain", diagnosis: "General Physician - Headache (Tension Headache / Migraine)", specialist: "General Physician", advice: "Rest in a quiet, dark room, stay hydrated, and avoid screen time.", userExample: "My temples are throbbing and my head hurts whenever I look at screens.", botResponse: "Hey! I understand that head pain is very draining. Screen glare makes migraines worse. Rest in a dark room. Let's get you checked by our General Physician (₹699)." },
  { keywords: "body pain, body ache, muscle pain, joints pain", diagnosis: "General Physician - Body Pain (Myalgia)", specialist: "General Physician", advice: "Rest your muscles, apply a warm compress if needed, and stay hydrated.", userExample: "My muscles are aching and my joints hurt all over.", botResponse: "Hey! Muscle fatigue and body aches can indicate general weakness or viral strain. I recommend consult with our General Physician (₹699) to diagnose the source." },
  { keywords: "acidity, heartburn, acid reflux", diagnosis: "General Physician - Acidity (Hyperacidity / Reflux)", specialist: "General Physician", advice: "Avoid heavy/spicy foods, drink cold milk, and stay upright after meals.", userExample: "I have a burning sensation in my chest after eating spicy food.", botResponse: "Hey! Chest burn after meals is usually acidity or acid reflux. A consultation with our General Physician (₹699) will help." },
  { keywords: "allergy, allergies, skin allergy, rash, itching", diagnosis: "General Physician - Allergies (Allergic Reaction / Urticaria)", specialist: "General Physician", advice: "Avoid contact with known allergens. Keep the skin cool and hydrated.", userExample: "I have developed red itchy rashes and allergies on my skin.", botResponse: "Hey! Red itchy rashes suggest an allergic reaction. I highly recommend consult with our General Physician (₹699) to identify the allergen." },
  { keywords: "high bp, hypertension, blood pressure", diagnosis: "Medicine Specialist - High BP (Hypertension)", specialist: "Medicine Specialist", advice: "Rest in a quiet place, avoid high sodium food, and take your prescribed drugs.", userExample: "My blood pressure is high and my head feels heavy.", botResponse: "Hey! A heavy head with high blood pressure is something to check carefully. Let's schedule a session with our Medicine Specialist (₹699)." },
  { keywords: "diabetes, sugar, blood sugar, insulin", diagnosis: "Medicine Specialist - Diabetes Triage", specialist: "Medicine Specialist", advice: "Track blood glucose values, regulate carb intake, and review regular drug doses.", userExample: "I want to check my blood sugar levels and consult about my diabetes.", botResponse: "Hey! Managing diabetes requires consistent tracking of blood glucose. Our Medicine Specialist (₹699) is ready to review your history today." },
  { keywords: "anxiety, panic attack, stress, overthinking", diagnosis: "Psychiatrist - Anxiety (Generalised Anxiety Disorder)", specialist: "Psychiatrist", advice: "Practice deep breathing, limit caffeine intake, and consider journaling your thoughts.", userExample: "I have been feeling very anxious and have panic attacks lately.", botResponse: "Hey! Anxiety and panic attacks can be overwhelming. Our Psychiatrist (₹699) can help you manage them with proven therapies." },
  { keywords: "depression, depressed, feeling low, hopeless", diagnosis: "Psychiatrist - Depression (Major Depressive Disorder)", specialist: "Psychiatrist", advice: "Engage in light physical activity, connect with someone trusted, and avoid isolation.", userExample: "I feel hopeless and have no motivation to do anything.", botResponse: "Hey! Feeling this way is valid and manageable. Our Psychiatrist (₹699) specializes in compassionate therapy for depression." },
];

// GET /api/chatbot-rules
export async function GET() {
  try {
    const rows = await sql`
      SELECT id, keywords, diagnosis, specialist, advice,
             user_example AS "userExample", bot_response AS "botResponse"
      FROM chatbot_rules ORDER BY sort_order ASC
    `;
    return NextResponse.json(rows);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST /api/chatbot-rules — add new OR reset (body: { reset: true })
export async function POST(req) {
  try {
    const body = await req.json();
    if (body.reset) {
      await sql`DELETE FROM chatbot_rules`;
      for (let i = 0; i < defaultRules.length; i++) {
        const r = defaultRules[i];
        await sql`
          INSERT INTO chatbot_rules (keywords, diagnosis, specialist, advice, user_example, bot_response, sort_order)
          VALUES (${r.keywords}, ${r.diagnosis}, ${r.specialist}, ${r.advice}, ${r.userExample}, ${r.botResponse}, ${i})
        `;
      }
      return NextResponse.json({ success: true, message: "Rules reset to defaults" });
    }

    const { keywords, diagnosis, specialist, advice, userExample, botResponse } = body;
    const countRow = await sql`SELECT COUNT(*) as cnt FROM chatbot_rules`;
    const order = parseInt(countRow[0].cnt);
    const result = await sql`
      INSERT INTO chatbot_rules (keywords, diagnosis, specialist, advice, user_example, bot_response, sort_order)
      VALUES (${keywords}, ${diagnosis}, ${specialist}, ${advice || null}, ${userExample || null}, ${botResponse || null}, ${order})
      RETURNING id, keywords, diagnosis, specialist, advice,
                user_example AS "userExample", bot_response AS "botResponse"
    `;
    return NextResponse.json(result[0]);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
