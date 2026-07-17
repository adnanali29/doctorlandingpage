import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

const defaultSpecialities = [
  { title: "General Physician", desc: "Fever, cough, metabolic issues, routine diagnoses", fee: "₹699", icon: "shield" },
  { title: "Medicine Specialist", desc: "Internal organ therapy, chronic disease plans", fee: "₹699", icon: "beaker" },
  { title: "Sexologist", desc: "Confidential therapy, private relationship support", fee: "₹699", icon: "heart" },
  { title: "Gynaecologist", desc: "Menstruation parameters, maternal and PCOS advice", fee: "₹699", icon: "user-group" },
  { title: "Gastroenterologist", desc: "Severe acidity, IBS, gut microbiome tracking", fee: "₹699", icon: "clipboard" },
  { title: "Psychiatrist", desc: "Mental diagnoses, emotional therapy support", fee: "₹699", icon: "bolt" },
  { title: "Mental Health", desc: "Daily counseling, grief support, anxiety reduction & relationship coaching", fee: "₹799", icon: "face-smile" },
  { title: "General Surgeon", desc: "Post-op counseling, minor outpatient assessment", fee: "₹699", icon: "scissors" },
];

const defaultConcerns = [
  { name: "Fever", key: "fever", specialist: "General Physician", count: "12 Doctors Online" },
  { name: "Cold & Cough", key: "cold_cough", specialist: "General Physician", count: "12 Doctors Online" },
  { name: "Headache", key: "headache", specialist: "General Physician", count: "12 Doctors Online" },
  { name: "Body Pain", key: "body_pain", specialist: "General Physician", count: "12 Doctors Online" },
  { name: "Acidity", key: "acidity", specialist: "General Physician", count: "12 Doctors Online" },
  { name: "Allergies", key: "allergies", specialist: "General Physician", count: "12 Doctors Online" },
  { name: "Diabetes", key: "diabetes", specialist: "Medicine Specialist", count: "8 Doctors Online" },
  { name: "High BP", key: "high_bp", specialist: "Medicine Specialist", count: "8 Doctors Online" },
  { name: "Fatty Liver", key: "fatty_liver", specialist: "Medicine Specialist", count: "8 Doctors Online" },
  { name: "COPD", key: "copd", specialist: "Medicine Specialist", count: "8 Doctors Online" },
  { name: "Erectile Dysfunction", key: "ed", specialist: "Sexologist", count: "5 Doctors Online" },
  { name: "Premature Ejaculation", key: "pe", specialist: "Sexologist", count: "5 Doctors Online" },
  { name: "Low Libido", key: "low_libido", specialist: "Sexologist", count: "5 Doctors Online" },
  { name: "Male Infertility", key: "male_infertility", specialist: "Sexologist", count: "5 Doctors Online" },
  { name: "STD Check", key: "std", specialist: "Sexologist", count: "5 Doctors Online" },
  { name: "PCOS", key: "pcos", specialist: "Gynaecologist", count: "6 Doctors Online" },
  { name: "Pregnancy", key: "pregnancy", specialist: "Gynaecologist", count: "6 Doctors Online" },
  { name: "Irregular Periods", key: "irregular_periods", specialist: "Gynaecologist", count: "6 Doctors Online" },
  { name: "Menopause", key: "menopause", specialist: "Gynaecologist", count: "6 Doctors Online" },
  { name: "UTI", key: "uti", specialist: "Gynaecologist", count: "6 Doctors Online" },
  { name: "Thyroid", key: "thyroid", specialist: "Medicine Specialist", count: "8 Doctors Online" },
  { name: "Obesity", key: "obesity", specialist: "Medicine Specialist", count: "8 Doctors Online" },
  { name: "Hormonal Disorders", key: "hormonal", specialist: "Medicine Specialist", count: "8 Doctors Online" },
  { name: "Osteoporosis", key: "osteoporosis", specialist: "Medicine Specialist", count: "8 Doctors Online" },
  { name: "Hernia", key: "hernia", specialist: "General Surgeon", count: "4 Doctors Online" },
  { name: "Gallstones", key: "gallstones", specialist: "General Surgeon", count: "4 Doctors Online" },
  { name: "Piles", key: "piles", specialist: "General Surgeon", count: "4 Doctors Online" },
  { name: "Lipoma", key: "lipoma", specialist: "General Surgeon", count: "4 Doctors Online" },
  { name: "Appendicitis", key: "appendicitis", specialist: "General Surgeon", count: "4 Doctors Online" },
  { name: "Anxiety", key: "anxiety", specialist: "Psychiatrist", count: "7 Doctors Online" },
  { name: "Depression", key: "depression", specialist: "Psychiatrist", count: "7 Doctors Online" },
  { name: "OCD", key: "ocd", specialist: "Psychiatrist", count: "7 Doctors Online" },
  { name: "Bipolar Disorder", key: "bipolar", specialist: "Psychiatrist", count: "7 Doctors Online" },
  { name: "Insomnia", key: "insomnia", specialist: "Psychiatrist", count: "7 Doctors Online" },
  { name: "IBS", key: "ibs", specialist: "Gastroenterologist", count: "5 Doctors Online" },
  { name: "GERD", key: "gerd", specialist: "Gastroenterologist", count: "5 Doctors Online" },
  { name: "Gastritis", key: "gastritis", specialist: "Gastroenterologist", count: "5 Doctors Online" },
  { name: "Constipation", key: "constipation", specialist: "Gastroenterologist", count: "5 Doctors Online" },
];

const defaultDoctors = [
  { name: "Dr. Swastik Pattnaik", spec: "General Physician", exp: "12+ Years Experience", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&h=150&q=80", focus: "General Physician" },
  { name: "Dr. Anup Sarkar", spec: "General Surgeon", exp: "15+ Years Experience", img: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&w=150&h=150&q=80", focus: "General Surgeon" },
  { name: "Dr. Kavya Prakash", spec: "Psychiatrist & Medicine Specialist", exp: "10+ Years Experience", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=150&h=150&q=80", focus: "Psychiatrist" },
  { name: "Aliya Hasim", spec: "Mental Health Educator", exp: "6+ Years Experience", img: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=150&h=150&q=80", focus: "Mental Health" },
  { name: "Dipika Das", spec: "Mental Health Educator", exp: "8+ Years Experience", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=150&h=150&q=80", focus: "Mental Health" },
];

const defaultChatbotRules = [
  { keywords: "fever, high temperature, warmth, body hot", diagnosis: "General Physician - Viral Fever / Pyrexia", specialist: "General Physician", advice: "Monitor body temperature every 4 hours, stay hydrated, and take plenty of rest.", userExample: "I have a high temperature and feel hot all over my body.", botResponse: "Hey! Sorry to hear you are running a temperature. Fever often signals a viral response. I recommend tracking it and booking a consult with our General Physician (₹699) to confirm if you need medical care." },
  { keywords: "cold, cough, runny nose, sneezing, sneeze, congestion", diagnosis: "General Physician - Cold & Cough (Common Cold / Upper Respiratory Infection)", specialist: "General Physician", advice: "Inhale steam, drink warm fluids, and rest to ease throat and nasal congestion.", userExample: "I have been coughing and sneezing with a runny nose all day.", botResponse: "Hey! A cold and cough can be very irritating. Drinking warm liquids and steam inhalation will help. I recommend consult with a General Physician (₹699) to check your chest health." },
  { keywords: "headache, head pain, migraine, temple pain", diagnosis: "General Physician - Headache (Tension Headache / Migraine)", specialist: "General Physician", advice: "Rest in a quiet, dark room, stay hydrated, and avoid screen time.", userExample: "My temples are throbbing and my head hurts whenever I look at screens.", botResponse: "Hey! I understand that head pain is very draining. Screen glare makes migraines worse. Rest in a dark room. Let's get you checked by our General Physician (₹699)." },
  { keywords: "body pain, body ache, muscle pain, joints pain", diagnosis: "General Physician - Body Pain (Myalgia)", specialist: "General Physician", advice: "Rest your muscles, apply a warm compress if needed, and stay hydrated.", userExample: "My muscles are aching and my joints hurt all over.", botResponse: "Hey! Muscle fatigue and body aches can indicate general weakness or viral strain. I recommend consult with our General Physician (₹699) to diagnose the source." },
  { keywords: "acidity, heartburn, acid reflux", diagnosis: "General Physician - Acidity (Hyperacidity / Reflux)", specialist: "General Physician", advice: "Avoid heavy/spicy foods, drink cold milk, and stay upright after meals.", userExample: "I have a burning sensation in my chest after eating spicy food.", botResponse: "Hey! Chest burn after meals is usually acidity or acid reflux. A consultation with our General Physician (₹699) will help you get quick antacid relief." },
  { keywords: "allergy, allergies, skin allergy, rash, itching", diagnosis: "General Physician - Allergies (Allergic Reaction / Urticaria)", specialist: "General Physician", advice: "Avoid contact with known allergens. Keep the skin cool and hydrated.", userExample: "I have developed red itchy rashes and allergies on my skin.", botResponse: "Hey! Red itchy rashes suggest an allergic reaction. I highly recommend consult with our General Physician (₹699) to identify the allergen." },
  { keywords: "high bp, hypertension, blood pressure", diagnosis: "Medicine Specialist - High BP (Hypertension)", specialist: "Medicine Specialist", advice: "Rest in a quiet place, avoid high sodium food, and take your prescribed drugs.", userExample: "My blood pressure is high and my head feels heavy.", botResponse: "Hey! A heavy head with high blood pressure is something to check carefully. Let's schedule a session with our Medicine Specialist (₹699)." },
  { keywords: "diabetes, sugar, blood sugar, insulin", diagnosis: "Medicine Specialist - Diabetes Triage", specialist: "Medicine Specialist", advice: "Track blood glucose values, regulate carb intake, and review regular drug doses.", userExample: "I want to check my blood sugar levels and consult about my diabetes.", botResponse: "Hey! Managing diabetes requires consistent tracking of blood glucose. Our Medicine Specialist (₹699) is ready to review your history today." },
  { keywords: "anxiety, panic attack, stress, overthinking", diagnosis: "Psychiatrist - Anxiety (Generalised Anxiety Disorder)", specialist: "Psychiatrist", advice: "Practice deep breathing, limit caffeine intake, and consider journaling your thoughts.", userExample: "I have been feeling very anxious and have panic attacks lately.", botResponse: "Hey! Anxiety and panic attacks can be overwhelming. Our Psychiatrist (₹699) can help you manage them with proven therapies." },
  { keywords: "depression, depressed, feeling low, hopeless", diagnosis: "Psychiatrist - Depression (Major Depressive Disorder)", specialist: "Psychiatrist", advice: "Engage in light physical activity, connect with someone trusted, and avoid isolation.", userExample: "I feel hopeless and have no motivation to do anything.", botResponse: "Hey! Feeling this way is valid and manageable. Our Psychiatrist (₹699) specializes in compassionate therapy for depression." },
];

export async function GET() {
  try {
    // Create all tables
    await sql`
      CREATE TABLE IF NOT EXISTS hero_content (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        img_url TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS specialities (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        fee TEXT NOT NULL,
        icon TEXT,
        tag TEXT,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS concerns (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        key TEXT NOT NULL,
        specialist TEXT NOT NULL,
        count TEXT,
        img_url TEXT,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS doctors (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        spec TEXT NOT NULL,
        exp TEXT,
        img TEXT,
        focus TEXT,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS chatbot_rules (
        id SERIAL PRIMARY KEY,
        keywords TEXT NOT NULL,
        diagnosis TEXT NOT NULL,
        specialist TEXT NOT NULL,
        advice TEXT,
        user_example TEXT,
        bot_response TEXT,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS bookings (
        id TEXT PRIMARY KEY,
        name TEXT,
        phone TEXT,
        age TEXT,
        height TEXT,
        weight TEXT,
        symptoms TEXT,
        speciality TEXT,
        sync_addy BOOLEAN DEFAULT FALSE,
        status TEXT DEFAULT 'Active',
        booking_date TIMESTAMP DEFAULT NOW()
      )
    `;

    // Migrate: add new columns if they don't exist yet
    await sql`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS assigned_doctor TEXT DEFAULT ''`;
    await sql`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS stage TEXT DEFAULT 'Enquiry'`;
    await sql`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS is_pain BOOLEAN DEFAULT FALSE`;
    await sql`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS remarks TEXT DEFAULT ''`;
    await sql`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'Unpaid'`;
    await sql`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS appointment_date TEXT DEFAULT ''`;

    // Seed hero_content if empty
    const heroCount = await sql`SELECT COUNT(*) as cnt FROM hero_content`;
    if (parseInt(heroCount[0].cnt) === 0) {
      await sql`
        INSERT INTO hero_content (title, description, img_url)
        VALUES (
          'Skip the queue. Consult doctors online at home',
          'Empowering healthcare diagnostics in minutes. Experience secure 1-on-1 private video medical assessments, instant legal digital prescriptions, and certified fitness syncing.',
          '/hero_banner.png'
        )
      `;
    }

    // Seed specialities if empty
    const specCount = await sql`SELECT COUNT(*) as cnt FROM specialities`;
    if (parseInt(specCount[0].cnt) === 0) {
      for (let i = 0; i < defaultSpecialities.length; i++) {
        const s = defaultSpecialities[i];
        await sql`
          INSERT INTO specialities (title, description, fee, icon, sort_order)
          VALUES (${s.title}, ${s.desc}, ${s.fee}, ${s.icon || null}, ${i})
        `;
      }
    }

    // Seed concerns if empty
    const concernCount = await sql`SELECT COUNT(*) as cnt FROM concerns`;
    if (parseInt(concernCount[0].cnt) === 0) {
      for (let i = 0; i < defaultConcerns.length; i++) {
        const c = defaultConcerns[i];
        await sql`
          INSERT INTO concerns (name, key, specialist, count, sort_order)
          VALUES (${c.name}, ${c.key}, ${c.specialist}, ${c.count}, ${i})
        `;
      }
    }

    // Seed doctors if empty
    const docCount = await sql`SELECT COUNT(*) as cnt FROM doctors`;
    if (parseInt(docCount[0].cnt) === 0) {
      for (let i = 0; i < defaultDoctors.length; i++) {
        const d = defaultDoctors[i];
        await sql`
          INSERT INTO doctors (name, spec, exp, img, focus, sort_order)
          VALUES (${d.name}, ${d.spec}, ${d.exp}, ${d.img}, ${d.focus}, ${i})
        `;
      }
    }

    // Seed chatbot_rules if empty
    const ruleCount = await sql`SELECT COUNT(*) as cnt FROM chatbot_rules`;
    if (parseInt(ruleCount[0].cnt) === 0) {
      for (let i = 0; i < defaultChatbotRules.length; i++) {
        const r = defaultChatbotRules[i];
        await sql`
          INSERT INTO chatbot_rules (keywords, diagnosis, specialist, advice, user_example, bot_response, sort_order)
          VALUES (${r.keywords}, ${r.diagnosis}, ${r.specialist}, ${r.advice}, ${r.userExample}, ${r.botResponse}, ${i})
        `;
      }
    }

    return NextResponse.json({ success: true, message: "All tables created and seeded successfully." });
  } catch (err) {
    console.error("DB init error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
