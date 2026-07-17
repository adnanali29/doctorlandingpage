"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

const keywordSynonyms = {
  "fever": ["high temperature", "warmth", "body hot", "chills", "cold", "shivering", "febrile", "running hot", "burning up", "hot forehead", "pyrexia", "temp", "temp high"],
  "cold": ["cough", "runny nose", "sneezing", "sneeze", "congestion", "sore throat", "coughing", "phlegm", "mucus", "blocked nose", "sinus", "sniffles", "throat pain", "runny", "sneez", "colds"],
  "headache": ["head pain", "migraine", "temple pain", "throbbing head", "head ache", "brow ache", "cluster headache", "head hurts", "temple throbbing"],
  "body pain": ["body ache", "muscle pain", "muscle ache", "joints pain", "body soreness", "muscle sore", "bone pain", "myalgia", "fatigue", "weakness", "body hurts", "aches all over"],
  "acidity": ["heartburn", "acid reflux", "chest burn", "reflux", "stomach burn", "hyperacidity", "sour burps", "burning throat", "indigestion", "acidic", "gerd reflux"],
  "allergy": ["allergies", "skin allergy", "rash", "red spots", "itching", "itchy skin", "hives", "urticaria", "redness", "skin bumps", "allergic", "eczema", "itchy rash"],
  "diabetes": ["sugar", "diabetic", "blood sugar", "insulin", "glucose", "regular sugar", "high sugar", "low sugar", "type 1", "type 2", "diabetis"],
  "high bp": ["hypertension", "blood pressure", "high blood pressure", "hyper tension", "bp high", "pressure high", "bp spike", "high pressure", "hypertensive"],
  "fatty liver": ["liver fat", "liver pain", "liver inflammation", "liver ultrasound", "hepatomegaly", "steatosis", "fatty liver signs"],
  "copd": ["asthma", "wheezing", "bronchitis", "short of breath", "breathless", "hard to breathe", "chest tightness", "wheeze", "lung issue", "chronic bronchitis", "copd flare"],
  "erectile dysfunction": ["ed", "impotence", "erection issue", "sexual health", "soft erection", "low hardness", "no erection", "cant get hard", "premature soft", "erectile issue"],
  "premature ejaculation": ["pe", "early ejaculation", "early release", "early discharge", "quick discharge", "quick cumming", "fast finish", "ejaculation issue"],
  "low libido": ["sex drive", "low sex drive", "intimacy drive", "loss of desire", "no sex desire", "sexual apathy", "libido loss"],
  "male infertility": ["sperm count", "semen issue", "low sperm", "sperm check", "child conceiving", "semen analysis", "poor sperm motility", "infertility male"],
  "std": ["stds", "hiv", "syphilis", "gonorrhea", "genital rash", "burning intimacy", "venereal", "chlamydia", "penal discharge", "vaginal discharge", "std test", "unsafe sex"],
  "pcos": ["pcod", "ovarian cyst", "cyst", "period delay", "facial hair", "hirsutism", "polycystic ovaries", "pcod issue"],
  "pregnancy": ["pregnant", "baby check", "prenatal", "positive test", "missed period", "maternity", "gestational", "morning sickness", "conceived"],
  "irregular periods": ["missed period", "cycle late", "periods late", "irregular cycle", "skipped period", "menstrual delay", "oligomenorrhea", "heavy flow", "periods delay"],
  "menopause": ["hot flashes", "night sweats", "late 40s cycles", "climacteric", "dry vagina", "vaginal dryness", "menopausal"],
  "uti": ["urine infection", "burning urine", "painful urination", "bladder pain", "burning pee", "painful urine", "cystitis", "cloudy urine", "frequent pee", "urine burn"],
  "thyroid": ["goitre", "hypothyroidism", "hyperthyroidism", "tsh", "thyroid gland", "tsh high", "tsh low", "neck swelling", "goiter"],
  "obesity": ["overweight", "rapid weight gain", "metabolic weight", "fat", "obese", "high bmi", "double chin", "weight increase"],
  "hormonal disorders": ["hormonal imbalance", "hormones", "hair loss", "mood swings", "endocrine disorder", "hormone issue"],
  "osteoporosis": ["bone density", "weak bones", "calcium loss", "osteopenia", "brittle bone", "fragile bones", "bone density test"],
  "hernia": ["groin lump", "umbilical lump", "hernia bulge", "inguinal hernia", "umbilical bulge", "stomach lump", "belly button lump", "abdominal bulge"],
  "gallstones": ["gallstone", "gall bladder pain", "sharp stomach pain", "cholelithiasis", "biliary colic", "right upper side pain", "gall bladder stone"],
  "piles": ["hemorrhoids", "bleeding stool", "anal pain", "blood in poop", "anal lump", "piles bleeding"],
  "lipoma": ["skin lump", "fatty lump", "painless lump", "soft lump", "painless skin lump", "moveable lump", "lipoma lump"],
  "appendicitis": ["appendix", "lower right stomach pain", "navel pain", "navel pain shifting", "acute appendix", "appendix inflammation"],
  "anxiety": ["panic attack", "stressed", "stress", "overthinking", "panic", "worried", "nervous", "heartbeat fast", "tension", "jittery", "anxious feeling"],
  "depression": ["depressed", "sad", "sadness", "hopeless", "feeling low", "empty", "no energy", "tearful", "sorrow", "depressive"],
  "ocd": ["obsessive compulsive", "checking things", "repetitive thoughts", "obsessive", "compulsive", "clean hands", "hand washing", "intrusive thoughts", "checking lock", "ocd loop"],
  "bipolar": ["mood swings", "mania", "manic", "highs and lows", "swing mood", "bipolar swing"],
  "insomnia": ["sleep issue", "cannot sleep", "sleeplessness", "wake up tired", "sleep cycle", "no sleep", "struggle to sleep"],
  "ibs": ["irritable bowel", "stomach cramps", "gas", "cramps", "bowel cramp", "colon irritation", "spastic colon", "ibs flare"],
  "gerd": ["reflux", "chronic acid", "heartburn", "stomach reflux", "throat burn", "regurgitation", "gastroesophageal", "gerd issue"],
  "gastritis": ["stomach burning", "bloating", "gas pain", "stomach lining burning", "stomach inflammation", "epigastric pain", "severe bloating", "burning stomach"],
  "constipation": ["hard stool", "bowel movement", "no stool", "dry stool", "dry poop", "bowel movement difficulty", "cant poop", "constipated"]
};

function getAugmentedKeywords(ruleKeywords) {
  if (!ruleKeywords) return [];
  const list = ruleKeywords.split(",").map(k => k.trim().toLowerCase());
  const augmented = new Set(list);
  
  list.forEach(kw => {
    Object.keys(keywordSynonyms).forEach(key => {
      if (kw === key || kw.includes(key) || key.includes(kw)) {
        keywordSynonyms[key].forEach(syn => augmented.add(syn));
      }
    });
  });
  return Array.from(augmented);
}

const normalizeSpecialistName = (name) => {
  if (!name) return "General Physician";
  const lower = name.toLowerCase().trim();
  if (lower.includes("physican") || lower === "gp") return "General Physician";
  if (lower.includes("spealist") || lower.includes("medicine")) return "Medicine Specialist";
  if (lower.includes("sex")) return "Sexologist";
  if (lower.includes("gyn")) return "Gynaecologist";
  if (lower.includes("gastro") || lower.includes("gastroenterologist") || lower.includes("gastrologist")) return "Gastroenterologist";
  if (lower.includes("psych") || lower.includes("psychiatrist") || lower.includes("psychiritist")) return "Psychiatrist";
  if (lower.includes("mental")) return "Mental Health";
  if (lower.includes("surgeon")) return "General Surgeon";
  return name;
};

const defaultTrainingRules = [
  {
    keywords: "fever, high temperature, warmth, body hot",
    diagnosis: "General Physician - Viral Fever / Pyrexia",
    specialist: "General Physician",
    advice: "Monitor body temperature every 4 hours, stay hydrated, and take plenty of rest.",
    userExample: "I have a high temperature and feel hot all over my body.",
    botResponse: "Hey! Sorry to hear you are running a temperature. Fever often signals a viral response. I recommend tracking it and booking a consult with our General Physician (₹699) to confirm if you need medical care."
  },
  {
    keywords: "cold, cough, runny nose, sneezing, sneeze, congestion",
    diagnosis: "General Physician - Cold & Cough (Common Cold / Upper Respiratory Infection)",
    specialist: "General Physician",
    advice: "Inhale steam, drink warm fluids, and rest to ease throat and nasal congestion.",
    userExample: "I have been coughing and sneezing with a runny nose all day.",
    botResponse: "Hey! A cold and cough can be very irritating. Drinking warm liquids and steam inhalation will help. I recommend consult with a General Physician (₹699) to check your chest health."
  },
  {
    keywords: "headache, head pain, migraine, temple pain",
    diagnosis: "General Physician - Headache (Tension Headache / Migraine)",
    specialist: "General Physician",
    advice: "Rest in a quiet, dark room, stay hydrated, and avoid screen time.",
    userExample: "My temples are throbbing and my head hurts whenever I look at screens.",
    botResponse: "Hey! I understand that head pain is very draining. Screen glare makes migraines worse. Rest in a dark room. Let's get you checked by our General Physician (₹699)."
  },
  {
    keywords: "body pain, body ache, muscle pain, muscle ache, joints pain",
    diagnosis: "General Physician - Body Pain (Myalgia)",
    specialist: "General Physician",
    advice: "Rest your muscles, apply a warm compress if needed, and stay hydrated.",
    userExample: "My muscles are aching and my joints hurt all over.",
    botResponse: "Hey! Muscle fatigue and body aches can indicate general weakness or viral strain. I recommend consult with our General Physician (₹699) to diagnose the source."
  },
  {
    keywords: "acidity, heartburn, acid reflux",
    diagnosis: "General Physician - Acidity (Hyperacidity / Reflux)",
    specialist: "General Physician",
    advice: "Avoid heavy/spicy foods, drink cold milk, and stay upright after meals.",
    userExample: "I have a burning sensation in my chest after eating spicy food.",
    botResponse: "Hey! Chest burn after meals is usually acidity or acid reflux. Try to sit upright and avoid heavy spices. A consultation with our General Physician (₹699) will help you get quick antacid relief."
  },
  {
    keywords: "allergy, allergies, skin allergy, rash, red spots",
    diagnosis: "General Physician - Allergies (Allergic Reaction / Urticaria)",
    specialist: "General Physician",
    advice: "Avoid contact with known allergens. Keep the skin cool and hydrated.",
    userExample: "I have developed red itchy rashes and allergies on my skin.",
    botResponse: "Hey! Red itchy rashes suggest an allergic reaction. Please avoid scratching the skin. I highly recommend consult with our General Physician (₹699) to identify the allergen."
  },
  {
    keywords: "high bp, hypertension, blood pressure, high blood pressure",
    diagnosis: "Medicine Specialist - High BP (Hypertension)",
    specialist: "Medicine Specialist",
    advice: "Rest in a quiet place, avoid high sodium food, and take your prescribed drugs.",
    userExample: "My blood pressure is high and my head feels heavy.",
    botResponse: "Hey! A heavy head with high blood pressure is something to check carefully. Please rest in a calm environment. Let's schedule a session with our Medicine Specialist (₹699) to check your vitals."
  },
  {
    keywords: "copd, asthma, wheezing, bronchitis",
    diagnosis: "Medicine Specialist - COPD (Chronic Obstructive Pulmonary Disease)",
    specialist: "Medicine Specialist",
    advice: "Use your rescue inhaler if prescribed. Avoid dusty or smoky spaces.",
    userExample: "I am wheezing and finding it hard to breathe due to my asthma.",
    botResponse: "Hey! Wheezing and breathing constraints are critical. Please use your rescue inhaler. I strongly recommend consult with our Medicine Specialist (₹699) to review your chronic plan."
  },
  {
    keywords: "erectile dysfunction, ed, impotence, erection issue",
    diagnosis: "Sexologist - Erectile Dysfunction",
    specialist: "Sexologist",
    advice: "Reduce daily stress, focus on physical exercise, and consult privately.",
    userExample: "I have been struggling to maintain an erection and feel stressed.",
    botResponse: "Hey! There is absolutely no need to worry or feel embarrassed. Erection issues are very common and highly treatable. A private, confidential consultation with our Sexologist (₹699) will help you resolve this."
  },
  {
    keywords: "premature ejaculation, pe, early ejaculation",
    diagnosis: "Sexologist - Premature Ejaculation",
    specialist: "Sexologist",
    advice: "Try pelvic floor control exercises and reduce anxiety before intimacy.",
    userExample: "I suffer from early ejaculation and it is affecting my relationship.",
    botResponse: "Hey! Please rest assured that early ejaculation is a highly treatable concern. Try pelvic exercises to help. I suggest booking a confidential consult with our Sexologist (₹699) to get a proper solution."
  },
  {
    keywords: "low libido, sex drive, low sex drive",
    diagnosis: "Sexologist - Low Libido (Hypoactive Sexual Desire)",
    specialist: "Sexologist",
    advice: "Focus on sleep, check hormone levels, and discuss with a specialist.",
    userExample: "My sex drive is extremely low lately and I don't feel like intimacy.",
    botResponse: "Hey! Low sex drive can stem from stress, hormonal shifts, or fatigue. A consultation with our Sexologist (₹699) is a great, private way to review hormone markers and find a solution."
  },
  {
    keywords: "male infertility, sperm count, semen issue",
    diagnosis: "Sexologist - Male Infertility (Factor Infertility)",
    specialist: "Sexologist",
    advice: "Maintain a healthy diet, avoid heat exposure, and check semen parameters.",
    userExample: "We have been trying for a baby and I want to test my sperm count.",
    botResponse: "Hey! Testing semen quality is a standard first step. Avoid tight clothing or hot baths. I suggest scheduling a consult with our Sexologist (₹699) to guide you through fertility protocols."
  },
  {
    keywords: "std, stds, hiv, syphilis, gonorrhea, genital rash",
    diagnosis: "Sexologist - STDs (Suspected STI)",
    specialist: "Sexologist",
    advice: "Avoid sexual contact until tested. Keep the area clean and dry.",
    userExample: "I have a burning sensation and genital rash after unprotected intimacy.",
    botResponse: "Hey! Genital rashes or burning after intimacy suggest a possible infection. Please avoid further contact until tested. I highly recommend a private session with our Sexologist (₹699) for a safe clinical review."
  },
  {
    keywords: "pcos, pcod, cyst, ovarian cysts",
    diagnosis: "Gynaecologist - PCOS (Polycystic Ovary Syndrome)",
    specialist: "Gynaecologist",
    advice: "Track menstrual irregularities, maintain a balanced diet, and test hormone profiles.",
    userExample: "I have rapid weight gain, facial hair, and think I might have PCOS.",
    botResponse: "Hey! Facial hair, irregular cycles, and weight gain are common indicators of PCOS. Our Gynaecologist (₹699) can guide you through ovarian scans and hormonal therapy to balance your system."
  },
  {
    keywords: "pregnancy, pregnant, baby check, prenatal",
    diagnosis: "Gynaecologist - Pregnancy (Antenatal Care)",
    specialist: "Gynaecologist",
    advice: "Avoid self-medication, consume prenatal vitamins, and track fetal movement.",
    userExample: "I just had a positive pregnancy test and want to know next steps.",
    botResponse: "Hey! Congratulations! Please make sure to avoid any self-medication and start prenatal vitamins. I highly suggest booking a session with our Gynaecologist (₹699) to schedule your first scan."
  },
  {
    keywords: "irregular periods, missed period, cycle late",
    diagnosis: "Gynaecologist - Irregular Periods",
    specialist: "Gynaecologist",
    advice: "Maintain a menstrual calendar log. Avoid extreme calorie restrictions.",
    userExample: "My period is late by two weeks and my cycle is always irregular.",
    botResponse: "Hey! A late period can be triggered by stress, thyroid issues, or PCOS. Tracking your dates is very helpful. I highly recommend consult with our Gynaecologist (₹699) to regulate your cycle."
  },
  {
    keywords: "menopause, hot flashes, night sweats",
    diagnosis: "Gynaecologist - Menopause (Climacteric Syndrome)",
    specialist: "Gynaecologist",
    advice: "Dress in layers to manage hot flashes, exercise regularly, and ensure calcium intake.",
    userExample: "I am experiencing hot flashes, night sweats, and irregular cycles in my late 40s.",
    botResponse: "Hey! Hot flashes and night sweats are classic indicators of menopause. Ensure good calcium intake. I recommend a consultation with our Gynaecologist (₹699) to discuss relief options."
  },
  {
    keywords: "uti, urine infection, burning urine, painful urination",
    diagnosis: "Gynaecologist - UTI (Urinary Tract Infection)",
    specialist: "Gynaecologist",
    advice: "Drink plenty of water, do not hold urine, and maintain local hygiene.",
    userExample: "I feel a severe burning sensation when passing urine and go frequently.",
    botResponse: "Hey! Burning and frequent urination are classic signs of a UTI. Please drink a lot of water to help flush the tract. I highly suggest scheduling with our Gynaecologist (₹699) to prescribe the correct antibiotic."
  },
  {
    keywords: "thyroid, goitre, hypothyroidism, hyperthyroidism",
    diagnosis: "Medicine Specialist - Thyroid (Gland Dysfunction)",
    specialist: "Medicine Specialist",
    advice: "Take your thyroid medication on an empty stomach in the morning.",
    userExample: "I am feeling constantly fatigued and my thyroid test values are abnormal.",
    botResponse: "Hey! Fatigue combined with abnormal thyroid numbers points to thyroid dysfunction. Always take thyroid drugs on an empty stomach. I recommend booking with our Medicine Specialist (₹699) to adjust your dose."
  },
  {
    keywords: "obesity, overweight, rapid weight gain",
    diagnosis: "Medicine Specialist - Obesity (Metabolic Excess)",
    specialist: "Medicine Specialist",
    advice: "Integrate active exercises, monitor daily calorie intake, and evaluate hormones.",
    userExample: "I am gaining weight rapidly despite dieting and need metabolic guidance.",
    botResponse: "Hey! Unexplained weight gain despite diets often points to underlying metabolic or thyroid factors. I suggest consulting our Medicine Specialist (₹699) to run hormone evaluations and build a structured health plan."
  },
  {
    keywords: "hormonal disorders, hormonal imbalance, hormones",
    diagnosis: "Medicine Specialist - Hormonal Disorders",
    specialist: "Medicine Specialist",
    advice: "Maintain a sleep schedule, avoid processed sugars, and run hormone panels.",
    userExample: "I have mood swings, hair loss, and suspect a hormonal imbalance.",
    botResponse: "Hey! Mood fluctuations and hair loss are closely linked to hormonal imbalances. I recommend setting up a virtual consult with our Medicine Specialist (₹699) to isolate which hormone is fluctuating."
  },
  {
    keywords: "osteoporosis, bone density, weak bones",
    diagnosis: "Medicine Specialist - Osteoporosis (Bone Density Loss)",
    specialist: "Medicine Specialist",
    advice: "Include Calcium and Vitamin D3 supplements in your diet. Practice low-impact weight exercises.",
    userExample: "My doctor said my bone density is low and I have osteoporosis.",
    botResponse: "Hey! Weak bones and low density put you at risk of fractures. Ensure good Calcium and D3 intake. I highly recommend consult with our Medicine Specialist (₹699) to start bone density therapies."
  },
  {
    keywords: "hernia, groin lump, umbilical lump",
    diagnosis: "General Surgeon - Hernia (Inguinal / Umbilical)",
    specialist: "General Surgeon",
    advice: "Avoid heavy lifting, keep bowel movements smooth, and get a surgical check.",
    userExample: "I have a painful lump in my groin that bulges when I cough.",
    botResponse: "Hey! A groin bulge that swells when you cough is highly characteristic of a hernia. Avoid lifting heavy weights. I recommend consult with our General Surgeon (₹699) to evaluate if surgery is required."
  },
  {
    keywords: "gallstones, gallstone, gall bladder pain",
    diagnosis: "General Surgeon - Gallstones (Cholelithiasis)",
    specialist: "General Surgeon",
    advice: "Avoid fatty, greasy meals to prevent gall bladder contractions and pain.",
    userExample: "I have sharp pain in my upper right abdomen that spreads to my back.",
    botResponse: "Hey! Sharp upper right side abdomen pain spreading to the back suggest gallstones. Avoid greasy foods. I suggest setting up an appointment with our General Surgeon (₹699) to review your scans."
  },
  {
    keywords: "piles, hemorrhoids, bleeding stool",
    diagnosis: "General Surgeon - Piles (Hemorrhoids)",
    specialist: "General Surgeon",
    advice: "Eat high-fiber foods, drink lots of water, and avoid straining during bowel movements.",
    userExample: "I have severe pain and notice bleeding during bowel movements.",
    botResponse: "Hey! Bleeding and pain during stools points to piles or hemorrhoids. Avoid straining and drink plenty of water. I recommend consult with our General Surgeon (₹699) to check the severity."
  },
  {
    keywords: "lipoma, skin lump, fatty lump",
    diagnosis: "General Surgeon - Lipoma (Benign Skin Lump)",
    specialist: "General Surgeon",
    advice: "Monitor the size of the lump. Surgical excision is optional and simple.",
    userExample: "I have a soft, painless lump under my skin that moves when touched.",
    botResponse: "Hey! A soft, moveable, painless lump under the skin is typical of a benign lipoma. I recommend a consultation with our General Surgeon (₹699) to evaluate if you want it simply removed."
  },
  {
    keywords: "appendicitis, appendix, lower right stomach pain",
    diagnosis: "General Surgeon - Appendicitis (Acute Appendix)",
    specialist: "General Surgeon",
    advice: "Do not eat or drink anything, avoid painkillers, and seek surgical care immediately.",
    userExample: "I have severe pain that started around my navel and moved to the lower right side.",
    botResponse: "Hey! Pain shifting from the navel to the lower right side of the stomach points to appendicitis. Avoid eating or drinking. I recommend consult with our General Surgeon (₹699) to run diagnostic checks."
  },
  {
    keywords: "anxiety, panic attack, stressed, stress",
    diagnosis: "Psychiatrist - Anxiety (Generalized Anxiety)",
    specialist: "Psychiatrist",
    advice: "Practice box breathing (inhale 4s, hold 4s, exhale 4s, hold 4s).",
    userExample: "I feel constantly anxious, stressed, and suffer from random panic attacks.",
    botResponse: "Hey! Chronic stress and panic attacks are very difficult to cope with. Practice slow box breathing. I strongly suggest booking a therapy session with our Psychiatrist (₹699) to build strong coping strategies."
  },
  {
    keywords: "depression, depressed, sad, sadness",
    diagnosis: "Psychiatrist - Depression (Depressive Episode)",
    specialist: "Psychiatrist",
    advice: "Engage in light physical walking, maintain a sleep routine, and seek guidance.",
    userExample: "I feel persistently sad, low, and have lost interest in all activities.",
    botResponse: "Hey! Feeling low and losing interest in things can indicate depression. Please remember you don't have to carry this alone. I highly recommend consult with our Psychiatrist (₹699) for support."
  },
  {
    keywords: "ocd, obsessive compulsive, checking things",
    diagnosis: "Psychiatrist - OCD (Obsessive Compulsive)",
    specialist: "Psychiatrist",
    advice: "Attempt to delay compulsive reactions by 2 minutes when triggers occur.",
    userExample: "I have repetitive thoughts and feel forced to wash my hands constantly.",
    botResponse: "Hey! Repetitive thoughts and compulsive hand washing are classic indicators of OCD. Delaying the action can help break the cycle. I suggest consult with our Psychiatrist (₹699) to start therapy."
  },
  {
    keywords: "bipolar disorder, bipolar, mood swings",
    diagnosis: "Psychiatrist - Bipolar Disorder",
    specialist: "Psychiatrist",
    advice: "Maintain a structured mood chart log and ensure stable sleep hours.",
    userExample: "I swing between extreme happiness and deep sadness within days.",
    botResponse: "Hey! Swings between mania and low moods point to bipolar disorder. Keeping a structured sleep cycle is helpful. I recommend consult with our Psychiatrist (₹699) to help stabilize your moods."
  },
  {
    keywords: "insomnia, sleep issue, cannot sleep, sleeplessness",
    diagnosis: "Psychiatrist - Insomnia (Sleep Disturbance)",
    specialist: "Psychiatrist",
    advice: "Avoid screen exposure 1 hour before bed, avoid late caffeine.",
    userExample: "I struggle to fall asleep at night and wake up tired every morning.",
    botResponse: "Hey! Sleeplessness impacts overall recovery and energy. Try to limit late caffeine and screen time. I highly recommend consult with our Psychiatrist (₹699) to regulate your sleep cycle."
  },
  {
    keywords: "ibs, irritable bowel, stomach cramps",
    diagnosis: "Gastroenterologist - IBS (Irritable Bowel Syndrome)",
    specialist: "Gastroenterologist",
    advice: "Avoid gluten and dairy products, eat high-fiber food, and reduce stress.",
    userExample: "I suffer from constant stomach cramps, gas, alternating diarrhea and constipation.",
    botResponse: "Hey! Stomach cramps and bowel fluctuations are typical signs of IBS. Avoiding gluten can give relief. I recommend scheduling a consult with our Gastroenterologist (₹699) to guide your diet."
  },
  {
    keywords: "gerd, reflux, chronic acid",
    diagnosis: "Gastroenterologist - GERD (Gastroesophageal Reflux)",
    specialist: "Gastroenterologist",
    advice: "Avoid lying down for 2 hours after meals, eat smaller food portions.",
    userExample: "I have chronic acid reflux and a sour taste in my mouth after sleeping.",
    botResponse: "Hey! Chronic acid reflux leaving a sour taste is typical of GERD. Try to eat smaller portions and stay upright after dinner. I highly suggest consult with our Gastroenterologist (₹699)."
  },
  {
    keywords: "gastritis, stomach burning, bloating",
    diagnosis: "Gastroenterologist - Gastritis (Stomach Lining Inflammation)",
    specialist: "Gastroenterologist",
    advice: "Avoid NSAID painkillers, stop smoking, and eat bland foods.",
    userExample: "I have a constant burning pain in my stomach along with heavy bloating.",
    botResponse: "Hey! Stomach lining burning and bloating suggest gastritis. Avoid greasy foods and NSAID painkillers. I recommend setting up a consultation with our Gastroenterologist (₹699) for care."
  },
  {
    keywords: "constipation, hard stool, bowel movement",
    diagnosis: "Gastroenterologist - Constipation",
    specialist: "Gastroenterologist",
    advice: "Consume adequate soluble fiber and drink warm liquids in the morning.",
    userExample: "I have not had a bowel movement in three days and feel extremely heavy.",
    botResponse: "Hey! Chronic constipation can make you feel bloated and heavy. Drink warm fluids in the morning. I recommend consulting our Gastroenterologist (₹699) to regulate your digestive patterns."
  },
  {
    keywords: "mental counseling, stress release, daily stress, emotional support, grief counseling, relationship issues, emotional counselor, relationship stress",
    diagnosis: "Mental Health - Stress, Grief & Relationship Counseling",
    specialist: "Mental Health",
    advice: "Take daily breaks, practice mindfulness, set healthy boundaries, and speak to a wellness coach.",
    userExample: "I am feeling overwhelmed by daily stress and need emotional counseling.",
    botResponse: "Hey! Whether it's daily stress, grief, or relationship struggles — our Mental Health team is here for you. I recommend a confidential premium counseling session (₹799) to get the support you deserve."
  }
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("bookings"); // bookings | hero | specialties | symptoms | doctors | chatbot

  // ── AUTH STATE ──────────────────────────────────────────────────────────────
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginId, setLoginId] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // credentials stored in localStorage under addy_admin_credentials
  const getCredentials = () => {
    try {
      const stored = localStorage.getItem("addy_admin_credentials");
      if (stored) return JSON.parse(stored);
    } catch(e) {}
    return { id: "1", pass: "1" };
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const creds = getCredentials();
    if (loginId === creds.id && loginPass === creds.pass) {
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Invalid ID or Password. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginId("");
    setLoginPass("");
  };

  // ── SETTINGS MODAL ──────────────────────────────────────────────────────────
  const [showSettings, setShowSettings] = useState(false);
  const [settingsForm, setSettingsForm] = useState({ newId: "", newPass: "", confirmPass: "" });
  const [settingsMsg, setSettingsMsg] = useState({ text: "", type: "" });

  const handleSaveCredentials = (e) => {
    e.preventDefault();
    if (!settingsForm.newId.trim() || !settingsForm.newPass.trim()) {
      setSettingsMsg({ text: "ID and Password cannot be empty.", type: "error" });
      return;
    }
    if (settingsForm.newPass !== settingsForm.confirmPass) {
      setSettingsMsg({ text: "Passwords do not match.", type: "error" });
      return;
    }
    localStorage.setItem("addy_admin_credentials", JSON.stringify({ id: settingsForm.newId.trim(), pass: settingsForm.newPass }));
    setSettingsMsg({ text: "Credentials updated successfully!", type: "success" });
    setSettingsForm({ newId: "", newPass: "", confirmPass: "" });
    setTimeout(() => setSettingsMsg({ text: "", type: "" }), 3000);
  };


  // ── SETTINGS MODAL OVERLAY ──────────────────────────────────────────────────

  // Bookings list
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Lead Detail Drawer
  const [selectedLead, setSelectedLead] = useState(null);
  const [leadDrawerOpen, setLeadDrawerOpen] = useState(false);
  const [leadForm, setLeadForm] = useState({
    assignedDoctor: "",
    stage: "Enquiry",
    paymentStatus: "Unpaid",
    remarks: "",
    appointmentDate: ""
  });
  const [leadSaving, setLeadSaving] = useState(false);
  const [leadSaved, setLeadSaved] = useState(false);

  const openLeadDrawer = (booking) => {
    setSelectedLead(booking);
    setLeadForm({
      assignedDoctor: booking.assignedDoctor || "",
      stage: booking.stage || "Enquiry",
      paymentStatus: booking.paymentStatus || "Unpaid",
      remarks: booking.remarks || "",
      appointmentDate: booking.appointmentDate || ""
    });
    setLeadSaved(false);
    setLeadDrawerOpen(true);
  };

  const closeLeadDrawer = () => {
    setLeadDrawerOpen(false);
    setTimeout(() => setSelectedLead(null), 300);
  };

  // CMS States
  const [heroContent, setHeroContent] = useState({
    title: "Skip the queue. Consult doctors online at home",
    desc: "Empowering healthcare diagnostics in minutes. Experience secure 1-on-1 private video medical assessments, instant legal digital prescriptions, and certified fitness syncing.",
    imgUrl: "/hero_banner.png"
  });
  
  const [specialities, setSpecialities] = useState([]);
  const [concerns, setConcerns] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [symptomImgMap, setSymptomImgMap] = useState({});

  // Active form structures
  const [editingSpeciality, setEditingSpeciality] = useState(null); // null or spec index
  const [specialityForm, setSpecialityForm] = useState({ title: "", desc: "", fee: "", img: "" });
  const [isAddingSpeciality, setIsAddingSpeciality] = useState(false);

  const [editingSymptom, setEditingSymptom] = useState(null); // null or symptom index
  const [symptomForm, setSymptomForm] = useState({ name: "", key: "", specialist: "", count: "", img: "" });
  const [isAddingSymptom, setIsAddingSymptom] = useState(false);

  const [editingDoctor, setEditingDoctor] = useState(null); // null or doctor index
  const [doctorForm, setDoctorForm] = useState({ name: "", spec: "", exp: "", img: "", focus: "" });
  const [isAddingDoctor, setIsAddingDoctor] = useState(false);

  // Chatbot Training States
  const [trainingRules, setTrainingRules] = useState([]);
  const [editingRule, setEditingRule] = useState(null); // null or rule index
  const [ruleForm, setRuleForm] = useState({ keywords: "", diagnosis: "", specialist: "General Physician", advice: "", userExample: "", botResponse: "" });
  const [isAddingRule, setIsAddingRule] = useState(false);
  const [selectedPresetSymptom, setSelectedPresetSymptom] = useState("");

  const symptomPresets = {
    "General Physician": [
      {
        name: "Fever",
        keywords: "fever, high temperature, warmth, body hot, chills, cold, shivering",
        diagnosis: "General Physician - Viral Fever / Pyrexia",
        advice: "Monitor body temperature every 4 hours, stay hydrated, and take plenty of rest.",
        userExample: "I have a high temperature and feel hot all over my body.",
        botResponse: "Hey! Sorry to hear you are running a temperature. Fever often signals a viral response. I recommend tracking it and booking a consult with our General Physician (₹699) to confirm if you need medical care."
      },
      {
        name: "Cold & Cough",
        keywords: "cold, cough, runny nose, sneezing, sneeze, congestion, sore throat",
        diagnosis: "General Physician - Cold & Cough (Common Cold / Upper Respiratory Infection)",
        advice: "Inhale steam, drink warm fluids, and rest to ease throat and nasal congestion.",
        userExample: "I have been coughing and sneezing with a runny nose all day.",
        botResponse: "Hey! A cold and cough can be very irritating. Drinking warm liquids and steam inhalation will help. I recommend consult with a General Physician (₹699) to check your chest health."
      },
      {
        name: "Headache",
        keywords: "headache, head pain, migraine, temple pain, throbbing head",
        diagnosis: "General Physician - Headache (Tension Headache / Migraine)",
        advice: "Rest in a quiet, dark room, stay hydrated, and avoid screen time.",
        userExample: "My temples are throbbing and my head hurts whenever I look at screens.",
        botResponse: "Hey! I understand that head pain is very draining. Screen glare makes migraines worse. Rest in a dark room. Let's get you checked by our General Physician (₹699)."
      },
      {
        name: "Body Pain",
        keywords: "body pain, body ache, muscle pain, muscle ache, joints pain, body soreness",
        diagnosis: "General Physician - Body Pain (Myalgia)",
        advice: "Rest your muscles, apply a warm compress if needed, and stay hydrated.",
        userExample: "My muscles are aching and my joints hurt all over.",
        botResponse: "Hey! Muscle fatigue and body aches can indicate general weakness or viral strain. I recommend consult with our General Physician (₹699) to diagnose the source."
      },
      {
        name: "Acidity",
        keywords: "acidity, heartburn, acid reflux, chest burn, reflux",
        diagnosis: "General Physician - Acidity (Hyperacidity / Reflux)",
        advice: "Avoid heavy/spicy foods, drink cold milk, and stay upright after meals.",
        userExample: "I have a burning sensation in my chest after eating spicy food.",
        botResponse: "Hey! Chest burn after meals is usually acidity or acid reflux. Try to sit upright and avoid heavy spices. A consultation with our General Physician (₹699) will help you get quick antacid relief."
      },
      {
        name: "Allergies",
        keywords: "allergy, allergies, skin allergy, rash, red spots, itching",
        diagnosis: "General Physician - Allergies (Allergic Reaction / Urticaria)",
        advice: "Avoid contact with known allergens. Keep the skin cool and hydrated.",
        userExample: "I have developed red itchy rashes and allergies on my skin.",
        botResponse: "Hey! Red itchy rashes suggest an allergic reaction. Please avoid scratching the skin. I highly recommend consult with our General Physician (₹699) to identify the allergen."
      }
    ],
    "Medicine Specialist": [
      {
        name: "Diabetes",
        keywords: "diabetes, sugar, diabetic, blood sugar, insulin",
        diagnosis: "Medicine Specialist - Diabetes Triage",
        advice: "Track blood glucose values, regulate carb intake, and review regular drug doses.",
        userExample: "I want to check my blood sugar levels and consult about my diabetes.",
        botResponse: "Hey! Managing diabetes requires consistent tracking of blood glucose and carb intake. Our Medicine Specialist (₹699) is ready to review your medical history and prescription today."
      },
      {
        name: "High BP",
        keywords: "high bp, hypertension, blood pressure, high blood pressure",
        diagnosis: "Medicine Specialist - High BP (Hypertension)",
        advice: "Rest in a quiet place, avoid high sodium food, and take your prescribed drugs.",
        userExample: "My blood pressure is high and my head feels heavy.",
        botResponse: "Hey! A heavy head with high blood pressure is something to check carefully. Please rest in a calm environment. Let's schedule a session with our Medicine Specialist (₹699) to check your vitals."
      },
      {
        name: "Fatty Liver",
        keywords: "fatty liver, liver fat, liver pain, liver inflammation",
        diagnosis: "Medicine Specialist - Fatty Liver (Hepatic Steatosis)",
        advice: "Reduce alcohol intake, limit saturated fat, and engage in daily physical exercise.",
        userExample: "I was diagnosed with fatty liver on my ultrasound and need guidance.",
        botResponse: "Hey! Hepatic fat accumulation is highly manageable with diet control and lipid panels. Let's schedule a consultation with our Medicine Specialist (₹699)."
      },
      {
        name: "COPD",
        keywords: "copd, asthma, wheezing, bronchitis, short of breath",
        diagnosis: "Medicine Specialist - COPD (Chronic Obstructive Pulmonary Disease)",
        advice: "Use your rescue inhaler if prescribed. Avoid dusty or smoky spaces.",
        userExample: "I am wheezing and finding it hard to breathe due to my asthma.",
        botResponse: "Hey! Wheezing and breathing constraints are critical. Please use your rescue inhaler. I strongly recommend consult with our Medicine Specialist (₹699) to review your chronic plan."
      },
      {
        name: "Thyroid",
        keywords: "thyroid, goitre, hypothyroidism, hyperthyroidism, tsh",
        diagnosis: "Medicine Specialist - Thyroid (Gland Dysfunction)",
        advice: "Take your thyroid medication on an empty stomach in the morning.",
        userExample: "I am feeling constantly fatigued and my thyroid test values are abnormal.",
        botResponse: "Hey! Fatigue combined with abnormal thyroid numbers points to thyroid dysfunction. Always take thyroid drugs on an empty stomach. I recommend booking with our Medicine Specialist (₹699) to adjust your dose."
      },
      {
        name: "Obesity",
        keywords: "obesity, overweight, rapid weight gain, metabolic weight",
        diagnosis: "Medicine Specialist - Obesity (Metabolic Excess)",
        advice: "Integrate active exercises, monitor daily calorie intake, and evaluate hormones.",
        userExample: "I am gaining weight rapidly despite dieting and need metabolic guidance.",
        botResponse: "Hey! Unexplained weight gain despite diets often points to underlying metabolic or thyroid factors. I suggest consulting our Medicine Specialist (₹699) to run hormone evaluations and build a structured health plan."
      },
      {
        name: "Hormonal Disorders",
        keywords: "hormonal disorders, hormonal imbalance, hormones, hair loss",
        diagnosis: "Medicine Specialist - Hormonal Disorders",
        advice: "Maintain a sleep schedule, avoid processed sugars, and run hormone panels.",
        userExample: "I have mood swings, hair loss, and suspect a hormonal imbalance.",
        botResponse: "Hey! Mood fluctuations and hair loss are closely linked to hormonal imbalances. I recommend setting up a virtual consult with our Medicine Specialist (₹699) to isolate which hormone is fluctuating."
      },
      {
        name: "Osteoporosis",
        keywords: "osteoporosis, bone density, weak bones, calcium loss",
        diagnosis: "Medicine Specialist - Osteoporosis (Bone Density Loss)",
        advice: "Include Calcium and Vitamin D3 supplements in your diet. Practice low-impact weight exercises.",
        userExample: "My doctor said my bone density is low and I have osteoporosis.",
        botResponse: "Hey! Weak bones and low density put you at risk of fractures. Ensure good Calcium and D3 intake. I highly recommend consult with our Medicine Specialist (₹699) to start bone density therapies."
      }
    ],
    "Sexologist": [
      {
        name: "Erectile Dysfunction",
        keywords: "erectile dysfunction, ed, impotence, erection issue, sexual health",
        diagnosis: "Sexologist - Erectile Dysfunction",
        advice: "Reduce daily stress, focus on physical exercise, and consult privately.",
        userExample: "I have been struggling to maintain an erection and feel stressed.",
        botResponse: "Hey! There is absolutely no need to worry or feel embarrassed. Erection issues are very common and highly treatable. A private, confidential consultation with our Sexologist (₹699) will help you resolve this."
      },
      {
        name: "Premature Ejaculation",
        keywords: "premature ejaculation, pe, early ejaculation, early release",
        diagnosis: "Sexologist - Premature Ejaculation",
        advice: "Try pelvic floor control exercises and reduce anxiety before intimacy.",
        userExample: "I suffer from early ejaculation and it is affecting my relationship.",
        botResponse: "Hey! Please rest assured that early ejaculation is a highly treatable concern. Try pelvic exercises to help. I suggest booking a confidential consult with our Sexologist (₹699) to get a proper solution."
      },
      {
        name: "Low Libido",
        keywords: "low libido, sex drive, low sex drive, intimacy drive",
        diagnosis: "Sexologist - Low Libido (Hypoactive Sexual Desire)",
        advice: "Focus on sleep, check hormone levels, and discuss with a specialist.",
        userExample: "My sex drive is extremely low lately and I don't feel like intimacy.",
        botResponse: "Hey! Low sex drive can stem from stress, hormonal shifts, or fatigue. A consultation with our Sexologist (₹699) is a great, private way to review hormone markers and find a solution."
      },
      {
        name: "Male Infertility",
        keywords: "male infertility, sperm count, semen issue, low sperm",
        diagnosis: "Sexologist - Male Infertility (Factor Infertility)",
        advice: "Maintain a healthy diet, avoid heat exposure, and check semen parameters.",
        userExample: "We have been trying for a baby and I want to test my sperm count.",
        botResponse: "Hey! Testing semen quality is a standard first step. Avoid tight clothing or hot baths. I suggest scheduling a consult with our Sexologist (₹699) to guide you through fertility protocols."
      },
      {
        name: "STDs",
        keywords: "std, stds, hiv, syphilis, gonorrhea, genital rash, burning intimacy",
        diagnosis: "Sexologist - STDs (Suspected STI)",
        advice: "Avoid sexual contact until tested. Keep the area clean and dry.",
        userExample: "I have a burning sensation and genital rash after unprotected intimacy.",
        botResponse: "Hey! Genital rashes or burning after intimacy suggest a possible infection. Please avoid further contact until tested. I highly recommend a private session with our Sexologist (₹699) for a safe clinical review."
      }
    ],
    "Gynaecologist": [
      {
        name: "PCOS",
        keywords: "pcos, pcod, ovarian cyst, cyst, period delay",
        diagnosis: "Gynaecologist - PCOS (Polycystic Ovary Syndrome)",
        advice: "Track menstrual irregularities, maintain a balanced diet, and test hormone profiles.",
        userExample: "I have rapid weight gain, facial hair, and think I might have PCOS.",
        botResponse: "Hey! Facial hair, irregular cycles, and weight gain are common indicators of PCOS. Our Gynaecologist (₹699) can guide you through ovarian scans and hormonal therapy to balance your system."
      },
      {
        name: "Pregnancy",
        keywords: "pregnancy, pregnant, baby check, prenatal, positive test",
        diagnosis: "Gynaecologist - Pregnancy (Antenatal Care)",
        advice: "Avoid self-medication, consume prenatal vitamins, and track fetal movement.",
        userExample: "I just had a positive pregnancy test and want to know next steps.",
        botResponse: "Hey! Congratulations! Please make sure to avoid any self-medication and start prenatal vitamins. I highly suggest booking a session with our Gynaecologist (₹699) to schedule your first scan."
      },
      {
        name: "Irregular Periods",
        keywords: "irregular periods, missed period, cycle late, periods late",
        diagnosis: "Gynaecologist - Irregular Periods",
        advice: "Maintain a menstrual calendar log. Avoid extreme calorie restrictions.",
        userExample: "My period is late by two weeks and my cycle is always irregular.",
        botResponse: "Hey! A late period can be triggered by stress, thyroid issues, or PCOS. Tracking your dates is very helpful. I highly recommend consult with our Gynaecologist (₹699) to regulate your cycle."
      },
      {
        name: "Menopause",
        keywords: "menopause, hot flashes, night sweats, late 40s cycles",
        diagnosis: "Gynaecologist - Menopause (Climacteric Syndrome)",
        advice: "Dress in layers to manage hot flashes, exercise regularly, and ensure calcium intake.",
        userExample: "I am experiencing hot flashes, night sweats, and irregular cycles in my late 40s.",
        botResponse: "Hey! Hot flashes and night sweats are classic indicators of menopause. Ensure good calcium intake. I recommend a consultation with our Gynaecologist (₹699) to discuss relief options."
      },
      {
        name: "UTI",
        keywords: "uti, urine infection, burning urine, painful urination, bladder pain",
        diagnosis: "Gynaecologist - UTI (Urinary Tract Infection)",
        advice: "Drink plenty of water, do not hold urine, and maintain local hygiene.",
        userExample: "I feel a severe burning sensation when passing urine and go frequently.",
        botResponse: "Hey! Burning and frequent urination are classic signs of a UTI. Please drink a lot of water to help flush the tract. I highly suggest scheduling with our Gynaecologist (₹699) to prescribe the correct antibiotic."
      }
    ],
    "Mental Health": [
      {
        name: "Stress, Grief & Relationship Counseling",
        keywords: "mental counseling, stress release, daily stress, emotional support, grief counseling, relationship issues, emotional counselor, relationship stress",
        diagnosis: "Mental Health - Stress, Grief & Relationship Counseling",
        advice: "Take daily breaks, practice mindfulness, set healthy boundaries, and speak to a wellness coach.",
        userExample: "I am feeling overwhelmed by daily stress and need emotional counseling.",
        botResponse: "Hey! Whether it's daily stress, grief, or relationship struggles — our Mental Health team is here for you. I recommend a confidential premium counseling session (₹799) to get the support you deserve."
      }
    ],
    "General Surgeon": [
      {
        name: "Hernia",
        keywords: "hernia, groin lump, umbilical lump, hernia bulge",
        diagnosis: "General Surgeon - Hernia (Inguinal / Umbilical)",
        advice: "Avoid heavy lifting, keep bowel movements smooth, and get a surgical check.",
        userExample: "I have a painful lump in my groin that bulges when I cough.",
        botResponse: "Hey! A groin bulge that swells when you cough is highly characteristic of a hernia. Avoid lifting heavy weights. I recommend consult with our General Surgeon (₹699) to evaluate if surgery is required."
      },
      {
        name: "Gallstones",
        keywords: "gallstones, gallstone, gall bladder pain, sharp stomach pain",
        diagnosis: "General Surgeon - Gallstones (Cholelithiasis)",
        advice: "Avoid fatty, greasy meals to prevent gall bladder contractions and pain.",
        userExample: "I have sharp pain in my upper right abdomen that spreads to my back.",
        botResponse: "Hey! Sharp upper right side abdomen pain spreading to the back suggest gallstones. Avoid greasy foods. I suggest setting up an appointment with our General Surgeon (₹699) to review your scans."
      },
      {
        name: "Piles",
        keywords: "piles, hemorrhoids, bleeding stool, anal pain",
        diagnosis: "General Surgeon - Piles (Hemorrhoids)",
        advice: "Eat high-fiber foods, drink lots of water, and avoid straining during bowel movements.",
        userExample: "I have severe pain and notice bleeding during bowel movements.",
        botResponse: "Hey! Bleeding and pain during stools points to piles or hemorrhoids. Avoid straining and drink plenty of water. I recommend consult with our General Surgeon (₹699) to check the severity."
      },
      {
        name: "Lipoma",
        keywords: "lipoma, skin lump, fatty lump, painless lump",
        diagnosis: "General Surgeon - Lipoma (Benign Skin Lump)",
        advice: "Monitor the size of the lump. Surgical excision is optional and simple.",
        userExample: "I have a soft, painless lump under my skin that moves when touched.",
        botResponse: "Hey! A soft, moveable, painless lump under the skin is typical of a benign lipoma. I recommend a consultation with our General Surgeon (₹699) to evaluate if you want it simply removed."
      },
      {
        name: "Appendicitis",
        keywords: "appendicitis, appendix, lower right stomach pain, navel pain",
        diagnosis: "General Surgeon - Appendicitis (Acute Appendix)",
        advice: "Do not eat or drink anything, avoid painkillers, and seek surgical care immediately.",
        userExample: "I have severe pain that started around my navel and moved to the lower right side.",
        botResponse: "Hey! Pain shifting from the navel to the lower right side of the stomach points to appendicitis. Avoid eating or drinking. I recommend consult with our General Surgeon (₹699) to run diagnostic checks."
      }
    ],
    "Psychiatrist": [
      {
        name: "Anxiety",
        keywords: "anxiety, panic attack, stressed, stress, overthinking",
        diagnosis: "Psychiatrist - Anxiety (Generalized Anxiety)",
        advice: "Practice box breathing (inhale 4s, hold 4s, exhale 4s, hold 4s).",
        userExample: "I feel constantly anxious, stressed, and suffer from random panic attacks.",
        botResponse: "Hey! Chronic stress and panic attacks are very difficult to cope with. Practice slow box breathing. I strongly suggest booking a therapy session with our Psychiatrist (₹699) to build strong coping strategies."
      },
      {
        name: "Depression",
        keywords: "depression, depressed, sad, sadness, hopless",
        diagnosis: "Psychiatrist - Depression (Depressive Episode)",
        advice: "Engage in light physical walking, maintain a sleep routine, and seek guidance.",
        userExample: "I feel persistently sad, low, and have lost interest in all activities.",
        botResponse: "Hey! Feeling low and losing interest in things can indicate depression. Please remember you don't have to carry this alone. I highly recommend consult with our Psychiatrist (₹699) for support."
      },
      {
        name: "OCD",
        keywords: "ocd, obsessive compulsive, checking things, repetitive thoughts",
        diagnosis: "Psychiatrist - OCD (Obsessive Compulsive)",
        advice: "Attempt to delay compulsive reactions by 2 minutes when triggers occur.",
        userExample: "I have repetitive thoughts and feel forced to wash my hands constantly.",
        botResponse: "Hey! Repetitive thoughts and compulsive hand washing are classic indicators of OCD. Delaying the action can help break the cycle. I suggest consult with our Psychiatrist (₹699) to start therapy."
      },
      {
        name: "Bipolar Disorder",
        keywords: "bipolar disorder, bipolar, mood swings, mania",
        diagnosis: "Psychiatrist - Bipolar Disorder",
        advice: "Maintain a structured mood chart log and ensure stable sleep hours.",
        userExample: "I swing between extreme happiness and deep sadness within days.",
        botResponse: "Hey! Swings between mania and low moods point to bipolar disorder. Keeping a structured sleep cycle is helpful. I recommend consult with our Psychiatrist (₹699) to help stabilize your moods."
      },
      {
        name: "Insomnia",
        keywords: "insomnia, sleep issue, cannot sleep, sleeplessness, wake up tired",
        diagnosis: "Psychiatrist - Insomnia (Sleep Disturbance)",
        advice: "Avoid screen exposure 1 hour before bed, avoid late caffeine.",
        userExample: "I struggle to fall asleep at night and wake up tired every morning.",
        botResponse: "Hey! Sleeplessness impacts overall recovery and energy. Try to limit late caffeine and screen time. I highly recommend consult with our Psychiatrist (₹699) to regulate your sleep cycle."
      }
    ],
    "Gastroenterologist": [
      {
        name: "IBS",
        keywords: "ibs, irritable bowel, stomach cramps, gas, cramps",
        diagnosis: "Gastroenterologist - IBS (Irritable Bowel Syndrome)",
        advice: "Avoid gluten and dairy products, eat high-fiber food, and reduce stress.",
        userExample: "I suffer from constant stomach cramps, gas, alternating diarrhea and constipation.",
        botResponse: "Hey! Stomach cramps and bowel fluctuations are typical signs of IBS. Avoiding gluten can give relief. I recommend scheduling a consult with our Gastroenterologist (₹699) to guide your diet."
      },
      {
        name: "GERD",
        keywords: "gerd, reflux, chronic acid, heartburn, stomach reflux",
        diagnosis: "Gastroenterologist - GERD (Gastroesophageal Reflux)",
        advice: "Avoid lying down for 2 hours after meals, eat smaller food portions.",
        userExample: "I have chronic acid reflux and a sour taste in my mouth after sleeping.",
        botResponse: "Hey! Chronic acid reflux leaving a sour taste is typical of GERD. Try to eat smaller portions and stay upright after dinner. I highly suggest consult with our Gastroenterologist (₹699)."
      },
      {
        name: "Fatty Liver",
        keywords: "fatty liver, liver fat, liver enzymes, hepatomegaly",
        diagnosis: "Gastroenterologist - Fatty Liver (GI Assessment)",
        advice: "Follow a low glycemic diet, manage calorie expenditure, and run liver enzymes profiles.",
        userExample: "I have bloating, high liver enzymes, and fatty liver signs.",
        botResponse: "Hey! Digestion bloating combined with fatty liver indications is best reviewed by our Gastroenterologist (₹699) to structure your gut health metrics."
      },
      {
        name: "Gastritis",
        keywords: "gastritis, stomach burning, bloating, gas pain",
        diagnosis: "Gastroenterologist - Gastritis (Stomach Lining Inflammation)",
        advice: "Avoid NSAID painkillers, stop smoking, and eat bland foods.",
        userExample: "I have a constant burning pain in my stomach along with heavy bloating.",
        botResponse: "Hey! Stomach lining burning and bloating suggest gastritis. Avoid greasy foods and NSAID painkillers. I recommend setting up a consultation with our Gastroenterologist (₹699) for care."
      },
      {
        name: "Constipation",
        keywords: "constipation, hard stool, bowel movement, no stool",
        diagnosis: "Gastroenterologist - Constipation",
        advice: "Consume adequate soluble fiber and drink warm liquids in the morning.",
        userExample: "I have not had a bowel movement in three days and feel extremely heavy.",
        botResponse: "Hey! Chronic constipation can make you feel bloated and heavy. Drink warm fluids in the morning. I recommend consulting our Gastroenterologist (₹699) to regulate your digestive patterns."
      }
    ]
  };
  
  // Admin Live Preview Chat States
  const [testMessages, setTestMessages] = useState([
    { sender: "CF", text: "Hi, I'm here to help — what's bothering you today?", isUser: false }
  ]);
  const [testInput, setTestInput] = useState("");
  const [isTestingAnalyzing, setIsTestingAnalyzing] = useState(false);
  const [testTriageState, setTestTriageState] = useState({ clarifyingFor: null });
  const testChatOutputRef = useRef(null);

  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    completed: 0,
    syncRate: 0,
  });

  // Load datasets on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // 1. Bookings
        const bookingsRes = await fetch("/api/bookings");
        if (bookingsRes.ok) {
          const list = await bookingsRes.json();
          setBookings(list);
          calculateStats(list);
        }

        // 2. Hero Content
        const heroRes = await fetch("/api/hero");
        if (heroRes.ok) {
          const heroData = await heroRes.json();
          setHeroContent(heroData);
        }

        // 3. Specialties
        const specsRes = await fetch("/api/specialities");
        if (specsRes.ok) {
          setSpecialities(await specsRes.json());
        }

        // 4. Concerns/Symptoms
        const concernsRes = await fetch("/api/concerns");
        if (concernsRes.ok) {
          const concernsData = await concernsRes.json();
          setConcerns(concernsData);
          // Build symptom image map
          const imgMap = {};
          concernsData.forEach(c => { if (c.img) imgMap[c.key] = c.img; });
          setSymptomImgMap(imgMap);
        }

        // 5. Doctors
        const docsRes = await fetch("/api/doctors");
        if (docsRes.ok) {
          setDoctors(await docsRes.json());
        }

        // 6. Chatbot Training Rules
        const rulesRes = await fetch("/api/chatbot-rules");
        if (rulesRes.ok) {
          setTrainingRules(await rulesRes.json());
        }
      } catch (err) {
        console.error("Failed to load admin data:", err);
      }
    };
    loadData();
  }, []);

  // Auto-scroll test chat
  useEffect(() => {
    if (testChatOutputRef.current) {
      testChatOutputRef.current.scrollTop = testChatOutputRef.current.scrollHeight;
    }
  }, [testMessages, isTestingAnalyzing]);

  function calculateStats(list) {
    const total = list.length;
    const active = list.filter(b => b.status === "Active").length;
    const completed = list.filter(b => b.status === "Completed").length;
    const synced = list.filter(b => b.syncAddy).length;
    const syncRate = total > 0 ? Math.round((synced / total) * 100) : 0;
    setStats({ total, active, completed, syncRate });
  }

  // --- Hero Section Save ---
  const handleSaveHero = async (e) => {
    e.preventDefault();
    await fetch("/api/hero", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(heroContent)
    });
    alert("Hero Content successfully saved! It will now reflect on the clinic landing page.");
  };

  // --- Specialty Save / Add / Delete ---
  const handleSaveSpeciality = async (e) => {
    e.preventDefault();
    if (editingSpeciality !== null) {
      const spec = specialities[editingSpeciality];
      await fetch(`/api/specialities/${spec.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(specialityForm)
      });
      setEditingSpeciality(null);
    } else {
      await fetch("/api/specialities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(specialityForm)
      });
      setIsAddingSpeciality(false);
    }
    setSpecialityForm({ title: "", desc: "", fee: "", img: "" });
    const res = await fetch("/api/specialities");
    if (res.ok) setSpecialities(await res.json());
  };

  const handleStartEditSpeciality = (idx) => {
    setEditingSpeciality(idx);
    setSpecialityForm(specialities[idx]);
    setIsAddingSpeciality(true);
  };

  const handleDeleteSpeciality = async (idx) => {
    if (!confirm("Delete this specialty?")) return;
    const spec = specialities[idx];
    await fetch(`/api/specialities/${spec.id}`, { method: "DELETE" });
    const res = await fetch("/api/specialities");
    if (res.ok) setSpecialities(await res.json());
  };

  // --- Symptom Save / Add / Delete ---
  const handleSaveSymptom = async (e) => {
    e.preventDefault();
    const cleanKey = symptomForm.key.toLowerCase().trim().replace(/\s+/g, "_");
    const formattedSymptom = { ...symptomForm, key: cleanKey };

    if (editingSymptom !== null) {
      const concern = concerns[editingSymptom];
      await fetch(`/api/concerns/${concern.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedSymptom)
      });
      setEditingSymptom(null);
    } else {
      await fetch("/api/concerns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedSymptom)
      });
      setIsAddingSymptom(false);
    }
    setSymptomForm({ name: "", key: "", specialist: "", count: "", img: "" });
    const res = await fetch("/api/concerns");
    if (res.ok) {
      const updated = await res.json();
      setConcerns(updated);
      const imgMap = {};
      updated.forEach(c => { if (c.img) imgMap[c.key] = c.img; });
      setSymptomImgMap(imgMap);
    }
  };

  const handleStartEditSymptom = (idx) => {
    setEditingSymptom(idx);
    const item = concerns[idx];
    setSymptomForm({ ...item, img: item.img || symptomImgMap[item.key] || "" });
    setIsAddingSymptom(true);
  };

  const handleDeleteSymptom = async (idx) => {
    if (!confirm("Delete this symptom?")) return;
    const item = concerns[idx];
    await fetch(`/api/concerns/${item.id}`, { method: "DELETE" });
    const res = await fetch("/api/concerns");
    if (res.ok) {
      const updated = await res.json();
      setConcerns(updated);
      const imgMap = {};
      updated.forEach(c => { if (c.img) imgMap[c.key] = c.img; });
      setSymptomImgMap(imgMap);
    }
  };

  // --- Doctor Save / Add / Delete ---
  const handleSaveDoctor = async (e) => {
    e.preventDefault();
    if (editingDoctor !== null) {
      const doc = doctors[editingDoctor];
      await fetch(`/api/doctors/${doc.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doctorForm)
      });
      setEditingDoctor(null);
    } else {
      await fetch("/api/doctors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doctorForm)
      });
      setIsAddingDoctor(false);
    }
    setDoctorForm({ name: "", spec: "", exp: "", img: "", focus: "" });
    const res = await fetch("/api/doctors");
    if (res.ok) setDoctors(await res.json());
  };

  const handleStartEditDoctor = (idx) => {
    setEditingDoctor(idx);
    setDoctorForm(doctors[idx]);
    setIsAddingDoctor(true);
  };

  const handleDeleteDoctor = async (idx) => {
    if (!confirm("Delete this doctor?")) return;
    const doc = doctors[idx];
    await fetch(`/api/doctors/${doc.id}`, { method: "DELETE" });
    const res = await fetch("/api/doctors");
    if (res.ok) setDoctors(await res.json());
  };

  // --- Chatbot Rules CRUD Handlers ---
  const handleSaveRule = async (e) => {
    e.preventDefault();
    const cleanKeywords = ruleForm.keywords
      .split(",")
      .map(k => k.trim().toLowerCase())
      .filter(k => k.length > 0)
      .join(", ");
    const formattedRule = { ...ruleForm, keywords: cleanKeywords };

    if (editingRule !== null) {
      const rule = trainingRules[editingRule];
      await fetch(`/api/chatbot-rules/${rule.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedRule)
      });
      setEditingRule(null);
    } else {
      await fetch("/api/chatbot-rules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedRule)
      });
      setIsAddingRule(false);
    }
    setRuleForm({ keywords: "", diagnosis: "", specialist: "General Physician", advice: "", userExample: "", botResponse: "" });
    const res = await fetch("/api/chatbot-rules");
    if (res.ok) setTrainingRules(await res.json());
  };

  const handleStartEditRule = (idx) => {
    setEditingRule(idx);
    const rule = trainingRules[idx];
    setRuleForm({
      keywords: rule.keywords || "",
      diagnosis: rule.diagnosis || "",
      specialist: rule.specialist || "General Physician",
      advice: rule.advice || "",
      userExample: rule.userExample || "",
      botResponse: rule.botResponse || ""
    });
    setIsAddingRule(true);
  };

  const handleDeleteRule = async (idx) => {
    if (!confirm("Are you sure you want to delete this chatbot rule?")) return;
    const rule = trainingRules[idx];
    await fetch(`/api/chatbot-rules/${rule.id}`, { method: "DELETE" });
    const res = await fetch("/api/chatbot-rules");
    if (res.ok) setTrainingRules(await res.json());
  };

  const handleResetRules = async () => {
    if (!confirm("Are you sure you want to reset ALL chatbot training rules to defaults?")) return;
    await fetch("/api/chatbot-rules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reset: true })
    });
    const res = await fetch("/api/chatbot-rules");
    if (res.ok) setTrainingRules(await res.json());
  };

  // --- Admin Live Test Chat Logic ---
  const sendTestMessage = () => {
    if (!testInput.trim()) return;
    const userQuery = testInput.trim();
    
    // Append user message
    setTestMessages(prev => [...prev, { sender: "User", text: userQuery, isUser: true }]);
    setTestInput("");
    setIsTestingAnalyzing(true);
    
    setTimeout(() => {
      setIsTestingAnalyzing(false);
      const textLower = userQuery.toLowerCase().trim();
      
      // 1. SILENT EMERGENCY CHECK (Highest Priority)
      const isEmergency = (t) => {
        return (
          t.includes("chest pain") || 
          t.includes("difficulty breathing") || 
          t.includes("can't breathe") || 
          t.includes("cannot breathe") || 
          t.includes("short of breath") || 
          t.includes("breathing trouble") || 
          t.includes("tight chest") || 
          t.includes("chest tightness") ||
          t.includes("blue lips") ||
          t.includes("uncontrolled bleeding") ||
          t.includes("bleeding heavily") ||
          t.includes("slurred speech") ||
          t.includes("face drooping") ||
          t.includes("drooping face") ||
          t.includes("stroke") ||
          t.includes("one-sided weakness") ||
          t.includes("weakness on one side") ||
          t.includes("loss of consciousness") ||
          t.includes("passed out") ||
          t.includes("seizures") ||
          t.includes("seizure") ||
          t.includes("convulsion") ||
          t.includes("suicidal") ||
          t.includes("self-harm") ||
          t.includes("suicide") ||
          t.includes("kill myself") ||
          t.includes("harm myself") ||
          t.includes("allergic reaction") ||
          t.includes("throat swelling") ||
          t.includes("poisoning") ||
          t.includes("overdose") ||
          t.includes("severe injury") ||
          t.includes("accident")
        );
      };

      const isSuicidal = (t) => {
        return t.includes("suicidal") || t.includes("self-harm") || t.includes("suicide") || t.includes("kill myself") || t.includes("harm myself");
      };

      if (isSuicidal(textLower)) {
        setTestMessages(prev => [
          ...prev,
          {
            sender: "CF",
            text: "This sounds like a very difficult time. Please reach out for support immediately. You are not alone. Please call emergency services (108/112) or reach out to a crisis helpline like iCall at 9152987821 or AASRA at 9820466726 right now. Please connect with someone who can support you.",
            isUser: false
          }
        ]);
        setTestTriageState({ clarifyingFor: null });
        return;
      }

      if (isEmergency(textLower)) {
        setTestMessages(prev => [
          ...prev,
          {
            sender: "CF",
            text: "This sounds like it could be a medical emergency. Please call emergency services (dial 108/112) or go to your nearest emergency room right now. I'm not able to help with emergencies through chat, but please don't wait — get help immediately.",
            isUser: false
          }
        ]);
        setTestTriageState({ clarifyingFor: null });
        return;
      }

      // 2. CHECK ACTIVE CLARIFYING STATES
      if (testTriageState.clarifyingFor === "diabetes") {
        const isOngoing = textLower.includes("already") || textLower.includes("diagnosed") || textLower.includes("meds") || textLower.includes("review") || textLower.includes("management") || textLower.includes("chronic") || textLower.includes("old") || textLower.includes("yes");
        const specialist = isOngoing ? "Endocrinologist" : "Medicine Specialist";
        const fee = 699;
        setTestMessages(prev => [
          ...prev,
          {
            sender: "CF",
            text: `Got it, thanks for clarifying. I'd recommend booking with a ${specialist} (₹${fee} consult). Would you like to Consult now or Chat on WhatsApp so a doctor can take a proper look?`,
            isUser: false,
            recommendation: specialist
          }
        ]);
        setTestTriageState({ clarifyingFor: null });
        return;
      }

      if (testTriageState.clarifyingFor === "fatty_liver") {
        const isDigestion = textLower.includes("bloat") || textLower.includes("acidity") || textLower.includes("digestion") || textLower.includes("acid") || textLower.includes("stomach") || textLower.includes("yes") || textLower.includes("digestive");
        const specialist = isDigestion ? "Gastroenterologist" : "Medicine Specialist";
        const fee = 699;
        setTestMessages(prev => [
          ...prev,
          {
            sender: "CF",
            text: `Got it, thanks for clarifying. I'd recommend booking with a ${specialist} (₹${fee} consult). Would you like to Consult now or Chat on WhatsApp so a doctor can take a proper look?`,
            isUser: false,
            recommendation: specialist
          }
        ]);
        setTestTriageState({ clarifyingFor: null });
        return;
      }

      // 3. GENERAL WARM CHITCHAT CHECK
      const chitchatResponses = {
        hello: "Hey! How can I help you today? Describe your symptoms, and I'll suggest a potential diagnosis and recommend a specialist.",
        hi: "Hey! How can I help you today? Describe your symptoms, and I'll suggest a potential diagnosis and recommend a specialist.",
        hey: "Hey! How can I help you today? Describe your symptoms, and I'll suggest a potential diagnosis and recommend a specialist.",
        "how are you": "I'm doing great, thanks for asking! I'm your digital clinic assistant. How are you feeling today?",
        "who are you": "I'm Sana, the AI health assistant for Addy Fitness. I can analyze symptoms, suggest potential diagnoses, and recommend the correct specialist.",
        thanks: "You're very welcome! I'm glad I could assist. Let me know if you have other symptoms to test.",
        "thank you": "You're very welcome! I'm glad I could assist. Let me know if you have other symptoms to test.",
        ok: "Let me know whenever you're ready to list your symptoms or test a scenario!",
        okay: "Let me know whenever you're ready to list your symptoms or test a scenario!"
      };

      const textCleanMatch = (text, trigger) => {
        return text === trigger || text.startsWith(trigger + " ") || text.endsWith(" " + trigger) || text.includes(" " + trigger + " ");
      };

      for (const [trigger, response] of Object.entries(chitchatResponses)) {
        if (textCleanMatch(textLower, trigger)) {
          setTestMessages(prev => [...prev, { sender: "CF", text: response, isUser: false }]);
          return;
        }
      }

      // 4. AMBIGUOUS CASES INTERCEPTION
      if (textLower.includes("diabetes") || textLower.includes("diabetic") || textLower.includes("sugar")) {
        setTestTriageState({ clarifyingFor: "diabetes" });
        setTestMessages(prev => [
          ...prev,
          {
            sender: "CF",
            text: "Sure, I can help you get connected. Quick one — is this a new concern you want checked out, or are you already diagnosed and looking for ongoing management?",
            isUser: false
          }
        ]);
        return;
      }

      if (textLower.includes("fatty liver") || textLower.includes("liver fat")) {
        setTestTriageState({ clarifyingFor: "fatty_liver" });
        setTestMessages(prev => [
          ...prev,
          {
            sender: "CF",
            text: "Sure, I can help you get connected. Are you dealing with digestion issues alongside this (bloating, acidity), or is it more of a general health/liver concern?",
            isUser: false
          }
        ]);
        return;
      }

      // 5. SCORE TRAINING RULES
      let matchedRule = null;
      let highestScore = 0;
      for (const rule of trainingRules) {
        let score = 0;
        if (rule.keywords) {
          const keywordsList = getAugmentedKeywords(rule.keywords);
          for (const keyword of keywordsList) {
            if (keyword) {
              const regex = new RegExp(`\\b${keyword}\\b`, 'i');
              if (regex.test(textLower)) {
                score += 12; // High weight for exact word matches
              } else if (textLower.includes(keyword)) {
                score += 4;  // Medium weight for substring matches
              }
            }
          }
        }
        if (rule.userExample) {
          const exampleWords = rule.userExample.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"").split(/\s+/);
          const userWords = textLower.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"").split(/\s+/);
          let overlapCount = 0;
          for (const word of userWords) {
            if (word.length > 3 && exampleWords.includes(word)) {
              overlapCount++;
            }
          }
          score += (overlapCount * 4);
        }
        if (rule.diagnosis && textLower.includes(rule.diagnosis.toLowerCase())) {
          score += 5;
        }
        if (score > highestScore) {
          highestScore = score;
          matchedRule = rule;
        }
      }

      let specialist = "General Physician";
      let fee = 699;
      let replyText = "";
      let isFallbackWhatsAppLink = false;
      let fallbackWhatsAppUrl = "";

      if (highestScore >= 3 && matchedRule) {
        specialist = normalizeSpecialistName(matchedRule.specialist);
        fee = (specialist === "Mental Health") ? 799 : 699;
        
        if (matchedRule.botResponse) {
          replyText = matchedRule.botResponse;
        } else {
          replyText = `I understand, that sounds uncomfortable. Based on the symptoms described, this is indicative of **${matchedRule.diagnosis}**.\n\n${matchedRule.advice}\n\nI'd recommend booking with a ${specialist} (₹${fee} consult). Would you like to Consult now or Chat on WhatsApp so a doctor can take a proper look?`;
        }
      } else {
        // 6. SYMPTOM TO SPECIALIST STATIC MAP
        const mappingTable = [
          { keys: ["fever", "cold", "cough", "headache", "migraine", "head pain", "temple pain", "body pain", "body ache", "muscle pain", "muscle ache", "acidity", "heartburn", "acid reflux", "allergy", "allergies", "sneezing", "sneeze"], spec: "General Physician", fee: 699 },
          { keys: ["high bp", "hypertension", "blood pressure", "bp", "copd", "asthma", "lung", "thyroid", "goitre", "hypothyroidism", "hyperthyroidism", "obesity", "overweight", "weight gain", "fat", "hormonal disorders", "hormonal imbalance", "hormone", "osteoporosis", "bone density", "weak bones"], spec: "Medicine Specialist", fee: 699 },
          { keys: ["erectile dysfunction", "ed", "premature ejaculation", "pe", "low libido", "sex drive", "low sex drive", "male infertility", "semen", "sperm count", "std", "stds", "hiv", "syphilis", "gonorrhea"], spec: "Sexologist", fee: 699 },
          { keys: ["pcos", "pcod", "ovary", "ovarian", "pregnancy", "pregnant", "baby", "maternity", "periods", "period", "irregular periods", "menstruation", "menstrual", "menopause", "uti", "urinary tract", "urine infection", "painful urination"], spec: "Gynaecologist", fee: 699 },
          { keys: ["hernia", "gallstone", "gallstones", "gall bladder", "piles", "hemorrhoids", "pile", "lipoma", "skin lump", "fatty lump", "appendicitis", "appendix"], spec: "General Surgeon", fee: 699 },
          { keys: ["ibs", "irritable bowel", "gerd", "reflux", "gastritis", "stomach burning", "bloating", "constipation", "hard stool", "bowel movement"], spec: "Gastroenterologist", fee: 699 },
          { keys: ["mental health", "mental counseling", "stress release", "daily stress", "emotional support"], spec: "Mental Health", fee: 799 },
          { keys: ["anxiety", "panic attack", "stressed", "stress", "depression", "depressed", "sad", "sadness", "ocd", "obsessive compulsive", "bipolar disorder", "bipolar", "insomnia", "sleep issue", "cannot sleep", "sleeplessness"], spec: "Psychiatrist", fee: 699 },
          { keys: ["grief counseling", "relationship issues", "emotional counselor", "relationship stress", "mental counseling", "stress release", "daily stress", "emotional support"], spec: "Mental Health", fee: 799 }
        ];

        let foundMatch = null;
        for (const item of mappingTable) {
          const augmentedKeys = getAugmentedKeywords(item.keys.join(","));
          if (augmentedKeys.some(k => textLower.includes(k))) {
            foundMatch = item;
            break;
          }
        }

        if (foundMatch) {
          specialist = normalizeSpecialistName(foundMatch.spec);
          fee = foundMatch.fee;
          replyText = `I understand, that sounds uncomfortable. I'd recommend booking with a ${specialist} (₹${fee} consult). Would you like to Consult now or Chat on WhatsApp so a doctor can take a proper look?`;
        } else {
          // 7. FALLBACK UNMAPPED SYMPTOMS
          specialist = null;
          isFallbackWhatsAppLink = true;
          fallbackWhatsAppUrl = `https://wa.me/919861787335?text=${encodeURIComponent(
            `Hi, I need assistance. Here is my medical concern:\n\n"${userQuery}"`
          )}`;
          replyText = `I'm not able to understand your concern as I'm AI bot. For better understanding, I'm connecting you with a human. You can chat with us on WhatsApp.`;
        }
      }

      setTestMessages(prev => [
        ...prev,
        {
          sender: "CF",
          text: replyText,
          isUser: false,
          recommendation: specialist,
          isFallbackWhatsAppLink,
          fallbackWhatsAppUrl
        }
      ]);
    }, 1000);
  };

  const textCleanMatch = (text, trigger) => {
    return text === trigger || text.startsWith(trigger + " ") || text.endsWith(" " + trigger) || text.includes(" " + trigger + " ");
  };

  const handleTestEnter = (e) => {
    if (e.key === "Enter") {
      sendTestMessage();
    }
  };

  // --- Bookings queue controls ---
  const updateBookingStatus = async (id, newStatus) => {
    await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    });
    const res = await fetch("/api/bookings");
    if (res.ok) {
      const list = await res.json();
      setBookings(list);
      calculateStats(list);
    }
  };

  const deleteBooking = async (id) => {
    if (!confirm("Are you sure you want to delete this consultation log?")) return;
    await fetch(`/api/bookings/${id}`, { method: "DELETE" });
    const res = await fetch("/api/bookings");
    if (res.ok) {
      const list = await res.json();
      setBookings(list);
      calculateStats(list);
    }
  };

  const exportToCSV = () => {
    if (!bookings || bookings.length === 0) return;
    
    const headers = [
      "Booking ID",
      "Patient Name",
      "Phone",
      "Age",
      "Height (cm)",
      "Weight (kg)",
      "Symptoms",
      "Specialty",
      "Sync Addy",
      "Status",
      "Date",
      "Assigned Doctor",
      "Stage",
      "Payment Status",
      "Remarks"
    ];

    const escapeCSV = (val) => {
      if (val === null || val === undefined) return "";
      let str = String(val);
      str = str.replace(/"/g, '""');
      if (str.includes(",") || str.includes("\n") || str.includes("\r") || str.includes('"')) {
        return `"${str}"`;
      }
      return str;
    };

    const rows = bookings.map(b => [
      b.id,
      b.name,
      b.phone,
      b.age,
      b.height,
      b.weight,
      b.symptoms,
      b.speciality,
      b.syncAddy ? "Yes" : "No",
      b.status,
      b.date ? new Date(b.date).toLocaleString() : "",
      b.assignedDoctor,
      b.stage,
      b.paymentStatus,
      b.remarks
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(escapeCSV).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `bookings_export_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const saveLeadDetails = async () => {
    if (!selectedLead) return;
    setLeadSaving(true);
    try {
      await fetch(`/api/bookings/${selectedLead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assignedDoctor: leadForm.assignedDoctor,
          stage: leadForm.stage,
          paymentStatus: leadForm.paymentStatus,
          remarks: leadForm.remarks,
          appointmentDate: leadForm.appointmentDate
        })
      });
      // Refresh bookings list
      const res = await fetch("/api/bookings");
      if (res.ok) {
        const list = await res.json();
        setBookings(list);
        calculateStats(list);
        // Update selectedLead with fresh data
        const updated = list.find(b => b.id === selectedLead.id);
        if (updated) setSelectedLead(updated);
      }
      setLeadSaved(true);
      setTimeout(() => setLeadSaved(false), 2500);
    } catch (err) {
      console.error("Failed to save lead details", err);
    } finally {
      setLeadSaving(false);
    }
  };


  const filteredBookings = bookings.filter(b => {
    const matchesSearch = 
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.symptoms.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.speciality.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (statusFilter === "All") return matchesSearch;
    return matchesSearch && b.status === statusFilter;
  });

  // ── LOGIN PAGE ──────────────────────────────────────────────────────────────
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background glow blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md z-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <img src="/logo.png" alt="Addy Fitness" className="w-16 h-16 rounded-2xl mx-auto mb-4 shadow-lg" />
            <h1 className="text-2xl font-black text-white font-poppins tracking-tight">Admin Portal</h1>
            <p className="text-slate-400 text-sm mt-1">Secure access to Addy Fitness management dashboard</p>
          </div>

          {/* Login Card */}
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-lg font-bold text-white mb-6 font-poppins">Sign In to Continue</h2>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Admin ID</label>
                <input
                  type="text"
                  value={loginId}
                  onChange={e => setLoginId(e.target.value)}
                  placeholder="Enter your Admin ID"
                  required
                  className="w-full bg-white/10 border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={loginPass}
                    onChange={e => setLoginPass(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full bg-white/10 border border-white/10 text-white placeholder-slate-500 rounded-xl pl-4 pr-12 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white focus:outline-none transition-all p-1.5"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl px-4 py-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-rose-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  </svg>
                  <p className="text-rose-400 text-xs font-semibold">{loginError}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-bold py-3 rounded-xl transition-all text-sm shadow-lg shadow-brand-600/30 cursor-pointer"
              >
                Sign In to Dashboard
              </button>
            </form>
          </div>

          <p className="text-center text-slate-600 text-xs mt-6">Protected access — Addy Fitness Admin System</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16 font-sans antialiased text-slate-800">
      {/* Top Banner Navigation */}
      <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Addy Fitness Logo"
              className="rounded-lg object-contain"
              style={{ width: '50px', height: '50px' }}
            />
            <div className="border-l border-slate-700 pl-3">
              <span className="text-sm font-extrabold font-poppins tracking-tight block text-white">Addy Fitness Portal</span>
              <span className="text-[10px] text-slate-400 font-medium block">Outpatient Management Terminal</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Settings Button */}
            <button
              onClick={() => { setShowSettings(true); setSettingsMsg({ text: "", type: "" }); setSettingsForm({ newId: "", newPass: "", confirmPass: "" }); }}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 border border-white/5 shadow-sm cursor-pointer"
              title="Settings"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Settings</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 border border-rose-500/20 shadow-sm cursor-pointer"
              title="Logout"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>

            <Link
              href="/"
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 border border-white/5 shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Clinic Site</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-8 border-b border-slate-200/60 pb-4">
          {[
            { id: "bookings", name: "Bookings Queue", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
            { id: "hero", name: "Hero Section CMS", icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" },
            { id: "specialties", name: "Medical Specialties", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 9.172V5L8 4z" },
            { id: "symptoms", name: "Live Symptom Matcher", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
            { id: "doctors", name: "Digital Doctor Council", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
            { id: "chatbot", name: "AI Chatbot Trainer", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl border transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-100"
                  : "bg-white text-slate-500 border-slate-200 hover:text-slate-900 hover:border-slate-300"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.3" d={tab.icon} />
              </svg>
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* ----------------- TAB 1: BOOKINGS QUEUE ----------------- */}
        {activeTab === "bookings" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-black text-slate-950 font-poppins tracking-tight">Active Consultations Queue</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">Review live patient details, logged metrics, and AddyFitness sync details.</p>
              </div>
              
              {bookings.length > 0 && (
                <button
                  onClick={exportToCSV}
                  className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-extrabold px-4 py-2.5 rounded-xl border border-indigo-100 transition-all flex items-center gap-1.5 w-fit shadow-sm active:scale-95 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Export Data to Excel CSV</span>
                </button>
              )}
            </div>

            {/* Analytics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm flex flex-col justify-between min-h-[120px] relative overflow-hidden">
                <div>
                  <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Total Triaged</span>
                  <h3 className="text-3xl font-black text-slate-900 font-poppins mt-2">{stats.total}</h3>
                </div>
                <div className="absolute right-4 bottom-4 text-brand-100 w-12 h-12 flex items-center justify-center rounded-full bg-brand-50/50">
                  <svg className="w-6 h-6 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
              <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm flex flex-col justify-between min-h-[120px] relative overflow-hidden">
                <div>
                  <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Active Outpatients</span>
                  <h3 className="text-3xl font-black text-amber-600 font-poppins mt-2">{stats.active}</h3>
                </div>
                <div className="absolute right-4 bottom-4 text-amber-100 w-12 h-12 flex items-center justify-center rounded-full bg-amber-50/50">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm flex flex-col justify-between min-h-[120px] relative overflow-hidden">
                <div>
                  <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Completed Diagnoses</span>
                  <h3 className="text-3xl font-black text-emerald-600 font-poppins mt-2">{stats.completed}</h3>
                </div>
                <div className="absolute right-4 bottom-4 text-emerald-100 w-12 h-12 flex items-center justify-center rounded-full bg-emerald-50/50">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm flex flex-col justify-between min-h-[120px] relative overflow-hidden">
                <div>
                  <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Fitness Sync Rate</span>
                  <h3 className="text-3xl font-black text-indigo-600 font-poppins mt-2">{stats.syncRate}%</h3>
                </div>
                <div className="absolute right-4 bottom-4 text-indigo-100 w-12 h-12 flex items-center justify-center rounded-full bg-indigo-50/50">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Filter controls */}
            <div className="bg-white border border-slate-100 rounded-[28px] p-5 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by patient, symptom, or doctor..."
                  className="w-full bg-slate-50 border border-slate-200/80 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 rounded-xl px-4 py-2.5 pl-10 text-xs focus:outline-none transition-all text-slate-800 font-medium placeholder:text-slate-400"
                />
                <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <div className="flex gap-1.5 p-1 bg-slate-100 rounded-xl w-full md:w-auto overflow-x-auto">
                {["All", "Active", "Completed"].map(status => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`text-xs font-bold px-4 py-2 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                      statusFilter === status 
                        ? "bg-white text-slate-900 shadow-sm border border-slate-200/20" 
                        : "text-slate-500 hover:text-slate-950"
                    }`}
                  >
                    {status} List
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-[28px] shadow-sm overflow-hidden">
              {filteredBookings.length > 0 ? (
                <>
                  {/* Desktop Table View */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-100">
                          <th className="py-4 px-6">Booking ID</th>
                          <th className="py-4 px-6">Patient Details</th>
                          <th className="py-4 px-6">Metrics &amp; Vitals</th>
                          <th className="py-4 px-6">Assigned Specialty &amp; Doctor</th>
                          <th className="py-4 px-6">Fitness Sync</th>
                          <th className="py-4 px-6">Stage</th>
                          <th className="py-4 px-6">Payment</th>
                          <th className="py-4 px-6">Status</th>
                          <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50 text-xs font-medium text-slate-600">
                        {filteredBookings.map((b) => (
                          <tr
                            key={b.id}
                            className="hover:bg-brand-50/30 transition-colors cursor-pointer group"
                            onClick={() => openLeadDrawer(b)}
                          >
                            {/* Booking ID */}
                            <td className="py-4 px-6">
                              <span className="inline-flex items-center bg-brand-50 border border-brand-100 text-brand-700 font-black text-[10px] px-2.5 py-1 rounded-lg tracking-wide font-poppins">{b.id}</span>
                            </td>
                            {/* Patient */}
                            <td className="py-4 px-6">
                              <div className="font-extrabold text-slate-900 text-sm font-poppins">{b.name}</div>
                              <div className="text-[10px] text-slate-400 mt-0.5">{b.phone}</div>
                              <div className="text-[10px] text-slate-300 mt-0.5">{b.date ? new Date(b.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : ""}</div>
                            </td>
                            {/* Metrics */}
                            <td className="py-4 px-6 space-y-1">
                              <div>Age: <strong className="text-slate-900 font-bold">{b.age} yrs</strong></div>
                              <div className="text-[10px] text-slate-400">H: {b.height} cm | W: {b.weight} kg</div>
                            </td>
                            {/* Specialty + assigned doctor */}
                            <td className="py-4 px-6">
                              <div className="font-bold text-slate-900">{b.speciality}</div>
                              {b.assignedDoctor && (
                                <div className="text-[10px] text-indigo-600 font-semibold mt-0.5">Dr: {b.assignedDoctor}</div>
                              )}
                              <div className="text-[10px] text-brand-600 font-semibold mt-0.5">Triage: &quot;{b.symptoms}&quot;</div>
                            </td>
                            {/* Sync */}
                            <td className="py-4 px-6">
                              {b.syncAddy ? (
                                <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 text-emerald-700 font-bold px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider">
                                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                  Synced
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-200 text-slate-400 font-bold px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider">
                                  No Sync
                                </span>
                              )}
                            </td>
                            {/* Stage */}
                            <td className="py-4 px-6">
                              {b.stage === "Appointment Booked" ? (
                                <div className="space-y-1">
                                  <span className="inline-flex items-center gap-1 bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold px-2 py-0.5 rounded text-[8px] uppercase tracking-wider">Booked</span>
                                  {b.appointmentDate && (
                                    <div className="text-[10px] text-slate-500 font-semibold">{new Date(b.appointmentDate).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</div>
                                  )}
                                </div>
                              ) : (
                                <div className="space-y-1">
                                  <span className="inline-flex items-center gap-1 bg-slate-100 border border-slate-200 text-slate-500 font-bold px-2 py-0.5 rounded text-[8px] uppercase tracking-wider">Enquiry</span>
                                  <div className="text-[10px] text-slate-400 font-semibold">{b.date ? new Date(b.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : ""}</div>
                                </div>
                              )}
                            </td>
                            {/* Payment */}
                            <td className="py-4 px-6">
                              {b.paymentStatus === "Paid" ? (
                                <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-100 text-emerald-700 font-bold px-2.5 py-1 rounded text-[9px] uppercase tracking-wider">Paid</span>
                              ) : (
                                <span className="inline-flex items-center gap-1 bg-rose-50 border border-rose-100 text-rose-600 font-bold px-2.5 py-1 rounded text-[9px] uppercase tracking-wider">Unpaid</span>
                              )}
                            </td>
                            {/* Status */}
                            <td className="py-4 px-6">
                              {b.status === "Active" ? (
                                <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-100 text-amber-700 font-extrabold px-2 py-0.5 rounded text-[10px]">Active</span>
                              ) : (
                                <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-100 text-emerald-700 font-extrabold px-2 py-0.5 rounded text-[10px]">Completed</span>
                              )}
                            </td>
                            {/* Actions — stop propagation so row click doesn't also fire */}
                            <td className="py-4 px-6 text-right" onClick={e => e.stopPropagation()}>
                              <div className="flex items-center justify-end gap-2.5">
                                {b.status === "Active" ? (
                                  <button
                                    onClick={() => updateBookingStatus(b.id, "Completed")}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold py-1.5 px-3 rounded-lg shadow-sm active:scale-95 transition-all cursor-pointer"
                                  >
                                    Complete
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => updateBookingStatus(b.id, "Active")}
                                    className="bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-bold py-1.5 px-3 rounded-lg border border-slate-200 transition-all cursor-pointer"
                                  >
                                    Re-open
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Responsive Card List for Mobile */}
                  <div className="block md:hidden divide-y divide-slate-100">
                    {filteredBookings.map((b) => (
                      <div
                        key={b.id}
                        onClick={() => openLeadDrawer(b)}
                        className="p-5 hover:bg-brand-50/20 active:bg-brand-50/40 transition-colors cursor-pointer space-y-3.5"
                      >
                        {/* Top Row: ID, status, stage */}
                        <div className="flex items-center justify-between">
                          <span className="bg-brand-50 border border-brand-100 text-brand-700 font-black text-[10px] px-2.5 py-1 rounded-lg font-poppins">
                            {b.id}
                          </span>
                          <div className="flex gap-1.5">
                            {b.stage === "Appointment Booked" ? (
                              <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold px-2 py-0.5 rounded text-[8px] uppercase tracking-wider">Booked</span>
                            ) : (
                              <span className="bg-slate-100 border border-slate-200 text-slate-500 font-bold px-2 py-0.5 rounded text-[8px] uppercase tracking-wider">Enquiry</span>
                            )}
                            {b.paymentStatus === "Paid" ? (
                              <span className="bg-emerald-50 border border-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded text-[8px] uppercase tracking-wider">Paid</span>
                            ) : (
                              <span className="bg-rose-50 border border-rose-100 text-rose-600 font-bold px-2 py-0.5 rounded text-[8px] uppercase tracking-wider">Unpaid</span>
                            )}
                          </div>
                        </div>

                        {/* Middle block: Name, Phone */}
                        <div>
                          <div className="font-extrabold text-slate-900 text-base font-poppins">{b.name}</div>
                          <div className="text-xs text-slate-500 font-medium mt-0.5">{b.phone}</div>
                          <div className="text-[10px] mt-1.5 flex flex-col gap-0.5">
                            {b.stage === "Appointment Booked" ? (
                              <div className="text-indigo-600 font-semibold bg-indigo-50/50 border border-indigo-100/30 rounded-lg px-2.5 py-1 w-fit">
                                Booked for: {b.appointmentDate ? new Date(b.appointmentDate).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "Not Scheduled"}
                              </div>
                            ) : (
                              <div className="text-slate-400 font-medium">
                                Enquired at: {b.date ? new Date(b.date).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : ""}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Stats & Details Grid */}
                        <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-2xl text-[11px]">
                          <div>
                            <div className="text-slate-400 font-black uppercase text-[8px] tracking-wider mb-0.5">Vitals</div>
                            <div className="font-bold text-slate-700">{b.age} yrs · {b.height}cm · {b.weight}kg</div>
                          </div>
                          <div>
                            <div className="text-slate-400 font-black uppercase text-[8px] tracking-wider mb-0.5">Focus</div>
                            <div className="font-bold text-slate-700">{b.speciality}</div>
                            {b.assignedDoctor && (
                              <div className="text-[10px] text-indigo-600 font-bold mt-0.5">Dr: {b.assignedDoctor}</div>
                            )}
                          </div>
                        </div>

                        {/* Triage summary */}
                        <div className="text-xs text-slate-600 bg-brand-50/30 border border-brand-100/20 px-3.5 py-2.5 rounded-xl">
                          <strong className="text-brand-700 font-bold block text-[9px] uppercase tracking-wider mb-0.5">Triage Symptom</strong>
                          &quot;{b.symptoms}&quot;
                        </div>

                        {/* Bottom actions strip */}
                        <div className="flex items-center justify-between pt-1.5" onClick={e => e.stopPropagation()}>
                          <div className="flex gap-2">
                            {b.status === "Active" ? (
                              <button
                                onClick={() => updateBookingStatus(b.id, "Completed")}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold py-2 px-4 rounded-xl shadow-sm active:scale-95 transition-all cursor-pointer"
                              >
                                Complete
                              </button>
                            ) : (
                              <button
                                onClick={() => updateBookingStatus(b.id, "Active")}
                                className="bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-bold py-2 px-4 rounded-xl border border-slate-200 transition-all cursor-pointer"
                              >
                                Re-open
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-16 px-4">
                  <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h4 className="text-base font-bold text-slate-800 font-poppins">No consultations logged</h4>
                  <p className="text-xs text-slate-400 mt-1">Once outpatients fill the booking consultation request on the main page, their live triage records will appear here.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══════════════ LEAD DETAIL DRAWER ═══════════════ */}
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-all duration-300 ${
            leadDrawerOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={closeLeadDrawer}
        />
        {/* Drawer Panel */}
        <div
          className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out ${
            leadDrawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {selectedLead && (
            <>
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-5 border-b border-slate-100 bg-slate-50">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="bg-brand-100 text-brand-700 text-[11px] font-black px-2.5 py-1 rounded-lg tracking-wide font-poppins">{selectedLead.id}</span>
                    {selectedLead.status === "Active" ? (
                      <span className="bg-amber-50 border border-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded">Active</span>
                    ) : (
                      <span className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded">Completed</span>
                    )}
                  </div>
                  <h3 className="text-base font-black text-slate-900 font-poppins mt-1.5">{selectedLead.name}</h3>
                  <p className="text-xs text-slate-400">{selectedLead.phone} · {selectedLead.speciality}</p>
                </div>
                <button
                  onClick={closeLeadDrawer}
                  className="w-9 h-9 rounded-full bg-white border border-slate-200 hover:bg-slate-100 text-slate-500 flex items-center justify-center transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Patient Summary Strip */}
              <div className="px-4 sm:px-6 py-3 bg-slate-50 border-b border-slate-100 flex gap-4 text-[10px] text-slate-500 font-medium flex-wrap">
                <span>Age: <strong className="text-slate-800">{selectedLead.age} yrs</strong></span>
                <span>H: <strong className="text-slate-800">{selectedLead.height} cm</strong></span>
                <span>W: <strong className="text-slate-800">{selectedLead.weight} kg</strong></span>
                <span className="text-slate-500">&quot;{selectedLead.symptoms}&quot;</span>
              </div>

              {/* Form Fields */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6">

                {/* Assign Doctor */}
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Assign Doctor</label>
                  <select
                    value={leadForm.assignedDoctor}
                    onChange={e => setLeadForm(prev => ({ ...prev, assignedDoctor: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:bg-white rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none transition-all"
                  >
                    <option value="">— Not Assigned —</option>
                    {doctors.map(d => (
                      <option key={d.id} value={d.name}>{d.name} ({d.spec})</option>
                    ))}
                  </select>
                </div>

                {/* Stage */}
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Lead Stage</label>
                  <select
                    value={leadForm.stage}
                    onChange={e => setLeadForm(prev => ({ ...prev, stage: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:bg-white rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none transition-all"
                  >
                    <option value="Enquiry">Enquiry</option>
                    <option value="Appointment Booked">Appointment Booked</option>
                  </select>

                  {leadForm.stage === "Enquiry" && (
                    <div className="text-[11px] text-slate-500 mt-2 bg-slate-50 border border-slate-100/70 p-3 rounded-xl">
                      Enquired at: <strong className="text-slate-800 font-bold">{selectedLead.date ? new Date(selectedLead.date).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "N/A"}</strong>
                    </div>
                  )}

                  {leadForm.stage === "Appointment Booked" && (
                    <div className="mt-3.5 space-y-1.5">
                      <label className="block text-[10px] font-bold text-indigo-700 uppercase tracking-wider">Book Appointment Date &amp; Time</label>
                      <input
                        type="datetime-local"
                        value={leadForm.appointmentDate}
                        onChange={e => setLeadForm(prev => ({ ...prev, appointmentDate: e.target.value }))}
                        className="w-full bg-indigo-50/50 border border-indigo-100 focus:border-brand-500 focus:bg-white rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none transition-all"
                      />
                    </div>
                  )}
                </div>

                {/* Payment Status */}
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Payment Status</label>
                  <select
                    value={leadForm.paymentStatus}
                    onChange={e => setLeadForm(prev => ({ ...prev, paymentStatus: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:bg-white rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none transition-all"
                  >
                    <option value="Unpaid">Unpaid</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>

                {/* Remarks */}
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Remarks / Notes</label>
                  <textarea
                    value={leadForm.remarks}
                    onChange={e => setLeadForm(prev => ({ ...prev, remarks: e.target.value }))}
                    placeholder="Add clinical notes, follow-up instructions, or any remarks..."
                    rows={4}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:bg-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-all resize-none text-slate-800"
                  />
                </div>
              </div>

              {/* Save Footer */}
              <div className="px-4 sm:px-6 py-4 border-t border-slate-100 bg-white">
                {leadSaved && (
                  <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold mb-3 animate-fade-in">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    Changes saved successfully!
                  </div>
                )}
                <button
                  onClick={saveLeadDetails}
                  disabled={leadSaving}
                  className="w-full bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-brand-100 transition-all active:scale-95 text-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {leadSaving ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>Save Lead Details</>
                  )}
                </button>
              </div>
            </>
          )}
        </div>

        {/* ----------------- TAB 2: HERO SECTION CMS ----------------- */}
        {activeTab === "hero" && (
          <div className="max-w-2xl bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
            <h3 className="text-xl font-bold font-poppins text-slate-900 mb-2">Edit Home Hero Section</h3>
            <p className="text-xs text-slate-500 mb-6">Modify the main introduction headline, paragraph, and background banner image.</p>
            
            <form onSubmit={handleSaveHero} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Hero Headline</label>
                <textarea
                  required
                  rows={2}
                  value={heroContent.title}
                  onChange={(e) => setHeroContent({ ...heroContent, title: e.target.value })}
                  placeholder="e.g. Skip the queue. Consult doctors online at home"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 rounded-xl px-4 py-3 text-xs focus:outline-none transition-all text-slate-800 font-medium leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Hero Subtitle / Paragraph Description</label>
                <textarea
                  required
                  rows={4}
                  value={heroContent.desc}
                  onChange={(e) => setHeroContent({ ...heroContent, desc: e.target.value })}
                  placeholder="e.g. Outpatient private diagnoses details..."
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 rounded-xl px-4 py-3 text-xs focus:outline-none transition-all text-slate-800 font-medium leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Background Banner Image URL</label>
                <input
                  type="text"
                  required
                  value={heroContent.imgUrl}
                  onChange={(e) => setHeroContent({ ...heroContent, imgUrl: e.target.value })}
                  placeholder="/hero_banner.png or Unsplash URL"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 rounded-xl px-4 py-2.5 text-xs focus:outline-none transition-all text-slate-800 font-medium"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-extrabold px-6 py-3 rounded-xl shadow-md shadow-brand-100 hover:shadow-brand-200 transition-all cursor-pointer"
                >
                  Save Hero Section Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ----------------- TAB 3: MEDICAL SPECIALTIES ----------------- */}
        {activeTab === "specialties" && (
          <div>
            <div className="flex items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-black text-slate-950 font-poppins tracking-tight">Specialty Cards Directory</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">Manage specialties, set consulting fees, update card details and images.</p>
              </div>

              {!isAddingSpeciality && (
                <button
                  onClick={() => {
                    setEditingSpeciality(null);
                    setSpecialityForm({ title: "", desc: "", fee: "₹699", img: "" });
                    setIsAddingSpeciality(true);
                  }}
                  className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Add Specialty Card</span>
                </button>
              )}
            </div>

            {/* Specialty Card Editor Form */}
            {isAddingSpeciality && (
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm mb-8 max-w-xl">
                <h3 className="text-base font-bold font-poppins text-slate-900 mb-4">
                  {editingSpeciality !== null ? "Edit Specialty Card" : "Create New Specialty Card"}
                </h3>
                
                <form onSubmit={handleSaveSpeciality} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Specialty Title</label>
                      <input
                        type="text"
                        required
                        value={specialityForm.title}
                        onChange={(e) => setSpecialityForm({ ...specialityForm, title: e.target.value })}
                        placeholder="e.g. Cardiologist"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 rounded-xl px-3.5 py-2 text-xs focus:outline-none transition-all text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Consultation Fee</label>
                      <input
                        type="text"
                        required
                        value={specialityForm.fee}
                        onChange={(e) => setSpecialityForm({ ...specialityForm, fee: e.target.value })}
                        placeholder="e.g. ₹799"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 rounded-xl px-3.5 py-2 text-xs focus:outline-none transition-all text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Short Card Description</label>
                    <textarea
                      required
                      rows={2}
                      value={specialityForm.desc}
                      onChange={(e) => setSpecialityForm({ ...specialityForm, desc: e.target.value })}
                      placeholder="e.g. Heart health assessments, hypertension control..."
                      className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition-all text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Custom Image URL (Optional)</label>
                    <input
                      type="text"
                      value={specialityForm.img}
                      onChange={(e) => setSpecialityForm({ ...specialityForm, img: e.target.value })}
                      placeholder="Leave blank for default placeholder, or Unsplash URL"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 rounded-xl px-3.5 py-2 text-xs focus:outline-none transition-all text-slate-800"
                    />
                  </div>

                  <div className="flex gap-2.5 pt-2">
                    <button
                      type="submit"
                      className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm cursor-pointer"
                    >
                      Save Specialty
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingSpeciality(false)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Specialties Card List Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {specialities.map((spec, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-[28px] p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full overflow-hidden mb-4 mx-auto border border-slate-100 bg-slate-50 flex items-center justify-center">
                      <img
                        src={spec.img || {
                          "General Physician": "/images/specialists/general-physician.png",
                          "Medicine Specialist": "/images/specialists/medicine-specialist.png",
                          "Sexologist": "/images/specialists/sexologist.png",
                          "Gynaecologist": "/images/specialists/gynaecologist.png",
                          "Endocrinologist": "/images/specialists/endocrinologist.png",
                          "General Surgeon": "/images/specialists/general-surgeon.png",
                          "Psychiatrist": "/images/specialists/psychiatrist.png",
                          "Gastroenterologist": "/images/specialists/gastroenterologist.png",
                          "Mental Health": "/images/specialists/mental-health.png"
                        }[spec.title] || "/images/specialists/general-physician.png"}
                        alt={spec.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="text-base font-bold font-poppins text-slate-800 mb-1">{spec.title}</h4>
                    <p className="text-[11px] text-slate-400 font-medium px-2 leading-relaxed mb-2">{spec.desc}</p>
                    <span className="inline-block bg-slate-100 text-slate-600 font-bold px-2.5 py-0.5 rounded text-[10px]">{spec.fee}</span>
                  </div>

                  <div className="flex gap-2 mt-5 border-t border-slate-100 pt-3">
                    <button
                      onClick={() => handleStartEditSpeciality(i)}
                      className="w-full bg-slate-50 hover:bg-brand-50 border border-slate-200 hover:border-brand-200 text-slate-600 hover:text-brand-600 text-[10px] font-bold py-1.5 rounded-lg transition-all cursor-pointer"
                    >
                      Edit Card
                    </button>
                    <button
                      onClick={() => handleDeleteSpeciality(i)}
                      className="bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-400 hover:text-rose-600 p-1.5 rounded-lg transition-all cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------- TAB 4: LIVE SYMPTOM MATCHER ----------------- */}
        {activeTab === "symptoms" && (
          <div>
            <div className="flex items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-black text-slate-950 font-poppins tracking-tight">Live Symptoms Directory</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">Configure diagnostic symptom matching keys, recommended specialists, and symptom photos.</p>
              </div>

              {!isAddingSymptom && (
                <button
                  onClick={() => {
                    setEditingSymptom(null);
                    setSymptomForm({ name: "", key: "", specialist: "General Physician", count: "1200+ cases", img: "" });
                    setIsAddingSymptom(true);
                  }}
                  className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Add Symptom Card</span>
                </button>
              )}
            </div>

            {/* Symptom Card Editor Form */}
            {isAddingSymptom && (
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm mb-8 max-w-xl">
                <h3 className="text-base font-bold font-poppins text-slate-900 mb-4">
                  {editingSymptom !== null ? "Edit Symptom Details" : "Create New Symptom Matching Card"}
                </h3>
                
                <form onSubmit={handleSaveSymptom} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Symptom Display Name</label>
                      <input
                        type="text"
                        required
                        value={symptomForm.name}
                        onChange={(e) => setSymptomForm({ ...symptomForm, name: e.target.value })}
                        placeholder="e.g. High Fever"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 rounded-xl px-3.5 py-2 text-xs focus:outline-none transition-all text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">System Key (unique lookup)</label>
                      <input
                        type="text"
                        required
                        value={symptomForm.key}
                        onChange={(e) => setSymptomForm({ ...symptomForm, key: e.target.value })}
                        placeholder="e.g. fever"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 rounded-xl px-3.5 py-2 text-xs focus:outline-none transition-all text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Recommended Specialty</label>
                      <select
                        value={symptomForm.specialist}
                        onChange={(e) => setSymptomForm({ ...symptomForm, specialist: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition-all text-slate-800"
                      >
                        {specialities.map((spec, i) => (
                          <option key={i} value={spec.title}>{spec.title}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Monthly Case Counter</label>
                      <input
                        type="text"
                        required
                        value={symptomForm.count}
                        onChange={(e) => setSymptomForm({ ...symptomForm, count: e.target.value })}
                        placeholder="e.g. 1,420 cases"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 rounded-xl px-3.5 py-2 text-xs focus:outline-none transition-all text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Symptom Real Human Photo URL</label>
                    <input
                      type="text"
                      required
                      value={symptomForm.img}
                      onChange={(e) => setSymptomForm({ ...symptomForm, img: e.target.value })}
                      placeholder="Paste Unsplash image URL here"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 rounded-xl px-3.5 py-2 text-xs focus:outline-none transition-all text-slate-800"
                    />
                  </div>

                  <div className="flex gap-2.5 pt-2">
                    <button
                      type="submit"
                      className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm cursor-pointer"
                    >
                      Save Symptom
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingSymptom(false)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Symptom cards grid view */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {concerns.map((c, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-[28px] p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-full h-32 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 mb-4">
                      <img
                        src={symptomImgMap[c.key] || "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=400&h=300&q=80"}
                        alt={c.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-sm font-bold font-poppins text-slate-800">{c.name}</h4>
                      <span className="bg-slate-50 text-slate-400 font-bold border border-slate-100 px-1.5 py-0.5 rounded text-[8px]">{c.count}</span>
                    </div>
                    <div className="text-[10px] text-brand-600 font-semibold mb-1">Lookup Key: &quot;{c.key}&quot;</div>
                    <div className="text-xs text-slate-500 font-medium">Recommends: <strong className="text-slate-800 font-bold">{c.specialist}</strong></div>
                  </div>

                  <div className="flex gap-2 mt-5 border-t border-slate-100 pt-3">
                    <button
                      onClick={() => handleStartEditSymptom(i)}
                      className="w-full bg-slate-50 hover:bg-brand-50 border border-slate-200 hover:border-brand-200 text-slate-600 hover:text-brand-600 text-[10px] font-bold py-1.5 rounded-lg transition-all cursor-pointer"
                    >
                      Edit Card
                    </button>
                    <button
                      onClick={() => handleDeleteSymptom(i)}
                      className="bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-400 hover:text-rose-600 p-1.5 rounded-lg transition-all cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------- TAB 5: DIGITAL DOCTOR COUNCIL ----------------- */}
        {activeTab === "doctors" && (
          <div>
            <div className="flex items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-black text-slate-950 font-poppins tracking-tight">Digital Council Members</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">Add, edit or retire doctors from the active registered medical council listing.</p>
              </div>

              {!isAddingDoctor && (
                <button
                  onClick={() => {
                    setEditingDoctor(null);
                    setDoctorForm({ name: "", spec: "", exp: "8+ Years Experience", img: "", focus: "General Physician" });
                    setIsAddingDoctor(true);
                  }}
                  className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Add Registered Doctor</span>
                </button>
              )}
            </div>

            {/* Doctor Editor Form */}
            {isAddingDoctor && (
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm mb-8 max-w-xl">
                <h3 className="text-base font-bold font-poppins text-slate-900 mb-4">
                  {editingDoctor !== null ? "Edit Doctor Information" : "Register Doctor to Council"}
                </h3>
                
                <form onSubmit={handleSaveDoctor} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Doctor Full Name</label>
                      <input
                        type="text"
                        required
                        value={doctorForm.name}
                        onChange={(e) => setDoctorForm({ ...doctorForm, name: e.target.value })}
                        placeholder="e.g. Dr. Kavya Prakash"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 rounded-xl px-3.5 py-2 text-xs focus:outline-none transition-all text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Experience (Years/Text)</label>
                      <input
                        type="text"
                        required
                        value={doctorForm.exp}
                        onChange={(e) => setDoctorForm({ ...doctorForm, exp: e.target.value })}
                        placeholder="e.g. 10+ Years Experience"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 rounded-xl px-3.5 py-2 text-xs focus:outline-none transition-all text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Specialty Subtitle Text</label>
                      <input
                        type="text"
                        required
                        value={doctorForm.spec}
                        onChange={(e) => setDoctorForm({ ...doctorForm, spec: e.target.value })}
                        placeholder="e.g. Psychiatrist & Therapist"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 rounded-xl px-3.5 py-2 text-xs focus:outline-none transition-all text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Specialist Focus Match Key</label>
                      <select
                        value={doctorForm.focus}
                        onChange={(e) => setDoctorForm({ ...doctorForm, focus: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition-all text-slate-800"
                      >
                        {specialities.map((spec, i) => (
                          <option key={i} value={spec.title}>{spec.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Doctor Photo Image URL</label>
                    <input
                      type="text"
                      required
                      value={doctorForm.img}
                      onChange={(e) => setDoctorForm({ ...doctorForm, img: e.target.value })}
                      placeholder="Paste Unsplash avatar image URL"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 rounded-xl px-3.5 py-2 text-xs focus:outline-none transition-all text-slate-800"
                    />
                  </div>

                  <div className="flex gap-2.5 pt-2">
                    <button
                      type="submit"
                      className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm cursor-pointer"
                    >
                      Save Doctor
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingDoctor(false)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Doctor listing card grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {doctors.map((doc, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-[28px] p-6 text-center shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="relative w-20 h-20 mx-auto mb-3">
                      <div className="w-full h-full rounded-full p-0.5 bg-gradient-to-tr from-brand-500 to-indigo-400">
                        <div className="w-full h-full bg-slate-100 rounded-full overflow-hidden flex items-center justify-center relative border border-white">
                          <img
                            src={doc.img && (doc.img.startsWith("http") || doc.img.startsWith("/")) ? doc.img : `https://placehold.co/150x150/f3e8ff/6b21a8?text=${encodeURIComponent(doc.name)}`}
                            alt={doc.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                    </div>

                    <h4 className="text-sm font-bold font-poppins text-slate-800 mb-0.5">{doc.name}</h4>
                    <p className="text-[10px] text-slate-400 font-medium mb-2">{doc.exp}</p>
                    <span className="inline-block bg-brand-50 text-brand-700 font-extrabold text-[9px] uppercase px-2.5 py-0.5 rounded-full mb-1">{doc.spec}</span>
                    <div className="text-[10px] text-slate-400 font-bold mt-1">Focus match: &quot;{doc.focus}&quot;</div>
                  </div>

                  <div className="flex gap-2 mt-5 border-t border-slate-100 pt-3">
                    <button
                      onClick={() => handleStartEditDoctor(i)}
                      className="w-full bg-slate-50 hover:bg-brand-50 border border-slate-200 hover:border-brand-200 text-slate-600 hover:text-brand-600 text-[10px] font-bold py-1.5 rounded-lg transition-all cursor-pointer"
                    >
                      Edit Card
                    </button>
                    <button
                      onClick={() => handleDeleteDoctor(i)}
                      className="bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-400 hover:text-rose-600 p-1.5 rounded-lg transition-all cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------- TAB 6: AI CHATBOT TRAINER ----------------- */}
        {activeTab === "chatbot" && (
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-black text-slate-950 font-poppins tracking-tight">AI Chatbot Trainer</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Configure custom diagnosis mapping and advice based on patient-described symptoms.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleResetRules}
                  className="bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold px-4 py-2.5 rounded-xl border border-amber-100 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3-3 3 3" />
                  </svg>
                  <span>Reset to Defaults</span>
                </button>

                <button
                  onClick={() => {
                    setEditingRule(null);
                    setRuleForm({ keywords: "", diagnosis: "", specialist: "General Physician", advice: "" });
                    setIsAddingRule(true);
                  }}
                  className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Create Training Rule</span>
                </button>
              </div>
            </div>

            {/* Split Screen Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Rules List */}
              <div className="lg:col-span-7 space-y-6">

                {/* Rules List Table */}
                <div className="bg-white border border-slate-100 rounded-[28px] shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-sm font-bold font-poppins text-slate-900">Active Keyword Match Rules ({trainingRules.length})</h3>
                  </div>

                  {(() => {
                    const groupedRules = {};
                    trainingRules.forEach((rule, idx) => {
                      const spec = normalizeSpecialistName(rule.specialist || "Other / Uncategorized");
                      if (!groupedRules[spec]) {
                        groupedRules[spec] = [];
                      }
                      groupedRules[spec].push({ ...rule, originalIndex: idx });
                    });

                    return trainingRules.length > 0 ? (
                      <div className="space-y-6 p-6 bg-slate-50/50">
                        {Object.keys(groupedRules).map((specName, groupIdx) => (
                          <div key={groupIdx} className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
                            <div className="bg-slate-100/80 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 bg-brand-500 rounded-full"></span>
                                {specName}
                              </h4>
                              <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                {groupedRules[specName].length} Rules
                              </span>
                            </div>
                            <div className="overflow-x-auto">
                              <table className="w-full text-left border-collapse">
                                <thead>
                                  <tr className="bg-slate-50/50 text-[9px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-100">
                                    <th className="py-2.5 px-5 w-[240px]">Triggers (Keywords)</th>
                                    <th className="py-2.5 px-5">Resulting Diagnosis & Advice</th>
                                    <th className="py-2.5 px-5 text-right w-[110px]">Actions</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-600">
                                  {groupedRules[specName].map((rule, ruleIdx) => (
                                    <tr key={ruleIdx} className="hover:bg-slate-50/30 transition-colors">
                                      <td className="py-3 px-5">
                                        <div className="flex flex-wrap gap-1">
                                          {rule.keywords.split(",").map((kw, kIdx) => (
                                            <span key={kIdx} className="bg-indigo-50 border border-indigo-100 text-indigo-700 text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                                              {kw.trim()}
                                            </span>
                                          ))}
                                        </div>
                                      </td>
                                      <td className="py-3 px-5">
                                        <div className="font-extrabold text-slate-900 text-xs font-poppins">{rule.diagnosis}</div>
                                        {rule.userExample && (
                                          <div className="text-[10px] text-indigo-600 bg-indigo-50/30 px-1.5 py-0.5 rounded-md mt-1 border border-indigo-100/50 inline-block max-w-full truncate">
                                            <span className="font-bold">Example:</span> &ldquo;{rule.userExample}&rdquo;
                                          </div>
                                        )}
                                        {rule.botResponse && (
                                          <div className="text-[10px] text-emerald-700 bg-emerald-50/30 px-1.5 py-0.5 rounded-md mt-1 border border-emerald-100/50 block">
                                            <span className="font-bold">Clinician Reply:</span> &ldquo;{rule.botResponse}&rdquo;
                                          </div>
                                        )}
                                      </td>
                                      <td className="py-3 px-5 text-right">
                                        <div className="flex items-center justify-end gap-1.5">
                                          <button
                                            onClick={() => handleStartEditRule(rule.originalIndex)}
                                            className="bg-slate-50 hover:bg-brand-50 border border-slate-200 hover:border-brand-200 text-slate-600 hover:text-brand-600 text-[9px] font-bold py-1 px-2.5 rounded-lg transition-all cursor-pointer"
                                          >
                                            Edit
                                          </button>
                                          <button
                                            onClick={() => handleDeleteRule(rule.originalIndex)}
                                            className="bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 border border-slate-200 hover:border-rose-200 p-1.5 rounded-lg transition-all cursor-pointer"
                                          >
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 px-4">
                        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        </div>
                        <h4 className="text-sm font-bold text-slate-800 font-poppins">No training rules defined</h4>
                        <p className="text-xs text-slate-400 mt-1">Create rules to map user symptoms to diagnoses and specialists.</p>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Right Column: Live Chat Sandbox Preview */}
              <div className="lg:col-span-5">
                <div className="bg-white border border-slate-200/80 shadow-lg rounded-[28px] overflow-hidden flex flex-col h-[520px] sticky top-24">
                  {/* Chat Header */}
                  <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center bg-slate-950 border border-slate-800 relative shadow-sm">
                        <img
                          src="/logo.png"
                          alt="Addy Fitness"
                          className="w-8 h-8 object-contain"
                        />
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border border-slate-900 rounded-full"></span>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold font-poppins">Trained AI Bot Simulator</h4>
                        <p className="text-[9px] text-slate-400 font-medium">Real-Time Rule Tester</p>
                      </div>
                    </div>
                    <span className="text-[8px] bg-slate-800 text-indigo-300 px-2 py-0.5 rounded font-extrabold uppercase tracking-wider">
                      Live Testing
                    </span>
                  </div>

                  {/* Messages Console */}
                  <div
                    ref={testChatOutputRef}
                    className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 scrollbar-hide text-xs"
                  >
                    {testMessages.map((msg, idx) => (
                      <div key={idx} className={`flex gap-2 ${msg.isUser ? "justify-end" : "justify-start"}`}>
                        {!msg.isUser && (
                          <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center bg-slate-950 border border-slate-800 shrink-0 mt-0.5 shadow-sm">
                            <img
                              src="/logo.png"
                              alt="Addy Fitness"
                              className="w-5 h-5 object-contain"
                            />
                          </div>
                        )}
                        <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-[11px] leading-relaxed shadow-sm ${
                          msg.isUser
                            ? "bg-brand-600 text-white rounded-tr-sm font-medium"
                            : "bg-white border border-slate-100/70 text-slate-700 rounded-tl-sm whitespace-pre-line"
                        }`}>
                          {msg.text}
                          {msg.recommendation && (
                            <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex flex-wrap gap-2">
                              <button
                                onClick={() => {
                                  alert(`Booking Modal for "${msg.recommendation}" would open here!`);
                                }}
                                className="bg-brand-600 hover:bg-brand-700 text-white font-extrabold px-3 py-1.5 rounded-lg transition-all text-[10px] inline-flex items-center gap-1 shadow cursor-pointer active:scale-95"
                              >
                                <span>Consult Now</span>
                              </button>
                              <a
                                href={`https://wa.me/919861787335?text=Hello,%20I%20have%20been%20recommended%20to%20consult%20a%20${encodeURIComponent(msg.recommendation)}%20via%20Addy%20Fitness.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-3 py-1.5 rounded-lg transition-all text-[10px] inline-flex items-center gap-1 shadow cursor-pointer active:scale-95 text-center decoration-none no-underline"
                              >
                                <span>Chat on WhatsApp</span>
                              </a>
                            </div>
                          )}
                          {msg.isFallbackWhatsAppLink && msg.fallbackWhatsAppUrl && (
                            <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex">
                              <a
                                href={msg.fallbackWhatsAppUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-3 py-1.5 rounded-lg transition-all text-[10px] inline-flex items-center gap-1 shadow cursor-pointer active:scale-95 text-center decoration-none no-underline"
                              >
                                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.45 5.467 0 9.92-4.447 9.924-9.917.002-2.65-1.028-5.138-2.902-7.01C16.39 1.805 13.912.775 11.261.775c-5.474 0-9.93 4.45-9.934 9.919-.001 1.514.397 2.994 1.155 4.3l-.97 3.548 3.635-.953z"/>
                                </svg>
                                <span className="ml-1">Chat on WhatsApp</span>
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    {isTestingAnalyzing && (
                      <div className="flex gap-2 justify-start">
                        <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center bg-slate-950 border border-slate-800 shrink-0 shadow-sm">
                          <img
                            src="/logo.png"
                            alt="Addy Fitness"
                            className="w-5 h-5 object-contain"
                          />
                        </div>
                        <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-3 py-2 shadow-sm flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce [animation-delay:0ms]" />
                          <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce [animation-delay:150ms]" />
                          <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce [animation-delay:300ms]" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input Console */}
                  <div className="p-3 bg-white border-t border-slate-100 flex gap-2 items-center shrink-0">
                    <input
                      type="text"
                      value={testInput}
                      onChange={(e) => setTestInput(e.target.value)}
                      onKeyDown={handleTestEnter}
                      placeholder="Type symptoms (e.g. fever, headache)..."
                      className="flex-1 bg-slate-50 border border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 rounded-xl px-3 py-2.5 text-[11px] focus:outline-none transition-all placeholder:text-slate-400 font-medium text-slate-800"
                    />
                    <button
                      onClick={sendTestMessage}
                      className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-[10px] px-3.5 py-2.5 rounded-xl transition-all active:scale-95 shadow flex items-center gap-1 cursor-pointer"
                    >
                      <span>Send</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Dialog overlay for Create/Edit Rule */}
            {isAddingRule && (
              <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white border border-slate-200/80 rounded-[32px] p-6 shadow-2xl w-full max-w-lg relative flex flex-col max-h-[90vh]">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
                    <h3 className="text-base font-bold font-poppins text-slate-950 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-brand-500 rounded-full"></span>
                      {editingRule !== null ? "Edit Training Rule" : "Create Chatbot Training Rule"}
                    </h3>
                    <button
                      onClick={() => {
                        setIsAddingRule(false);
                        setEditingRule(null);
                      }}
                      className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Scrollable Form Body */}
                  <form onSubmit={handleSaveRule} className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 scrollbar-thin">
                    {/* Symptom Preset Helper Selector */}
                    <div className="bg-indigo-50/50 border border-indigo-100/80 rounded-2xl p-4">
                      <label className="block text-[10px] font-bold text-indigo-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-indigo-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Symptom Category Preset Auto-Filler
                      </label>
                      <div className="grid grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">1. Specialty Category</label>
                          <select
                            value={ruleForm.specialist}
                            onChange={(e) => {
                              const spec = e.target.value;
                              setRuleForm({ ...ruleForm, specialist: spec });
                              setSelectedPresetSymptom("");
                            }}
                            className="w-full bg-white border border-slate-200 focus:border-indigo-500 text-slate-800 text-xs rounded-xl px-3 py-2 focus:outline-none transition-all font-bold cursor-pointer"
                          >
                            {specialities.map((spec, i) => (
                              <option key={i} value={spec.title}>{spec.title}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">2. Symptom Concern</label>
                          <select
                            value={selectedPresetSymptom}
                            onChange={(e) => {
                              const symName = e.target.value;
                              setSelectedPresetSymptom(symName);
                              if (symName && symptomPresets[ruleForm.specialist]) {
                                const preset = symptomPresets[ruleForm.specialist].find(p => p.name === symName);
                                if (preset) {
                                  setRuleForm({
                                    ...ruleForm,
                                    keywords: preset.keywords,
                                    diagnosis: preset.diagnosis,
                                    advice: preset.advice,
                                    userExample: preset.userExample,
                                    botResponse: preset.botResponse
                                  });
                                }
                              }
                            }}
                            className="w-full bg-white border border-slate-200 focus:border-indigo-500 text-slate-800 text-xs rounded-xl px-3 py-2 focus:outline-none transition-all font-bold cursor-pointer"
                          >
                            <option value="">-- Choose Symptom Preset --</option>
                            {symptomPresets[ruleForm.specialist]?.map((sym, i) => (
                              <option key={i} value={sym.name}>{sym.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <p className="text-[9px] text-slate-400 mt-2">
                        Selecting a symptom preset will automatically populate all of the rule keywords, clinical advice, and patient conversational reply fields below for you.
                      </p>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        Symptom Keywords (comma separated)
                      </label>
                      <input
                        type="text"
                        required
                        value={ruleForm.keywords}
                        onChange={(e) => setRuleForm({ ...ruleForm, keywords: e.target.value })}
                        placeholder="e.g. stomach pain, acidity, bloating, heartburn"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 rounded-xl px-3.5 py-2 text-xs focus:outline-none transition-all text-slate-800"
                      />
                      <p className="text-[9px] text-slate-400 mt-1">If the patient&apos;s message contains any of these words, this rule will trigger.</p>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        Example Patient Chat Message (To Train Human Meaning)
                      </label>
                      <input
                        type="text"
                        value={ruleForm.userExample || ""}
                        onChange={(e) => setRuleForm({ ...ruleForm, userExample: e.target.value })}
                        placeholder="e.g. My stomach feels like it is on fire and I have been burping a lot since morning"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 rounded-xl px-3.5 py-2 text-xs focus:outline-none transition-all text-slate-800"
                      />
                      <p className="text-[9px] text-slate-400 mt-1">Write how a real patient would text their symptoms. The AI will learn the sentence structure and meaning.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Suggested Diagnosis</label>
                        <input
                          type="text"
                          required
                          value={ruleForm.diagnosis}
                          onChange={(e) => setRuleForm({ ...ruleForm, diagnosis: e.target.value })}
                          placeholder="e.g. Acid Reflux / Gastritis"
                          className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 rounded-xl px-3.5 py-2 text-xs focus:outline-none transition-all text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Recommend Specialty</label>
                        <select
                          value={ruleForm.specialist}
                          onChange={(e) => setRuleForm({ ...ruleForm, specialist: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition-all text-slate-800 font-bold"
                        >
                          {specialities.map((spec, i) => (
                            <option key={i} value={spec.title}>{spec.title}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Advice & Clinical Notes</label>
                      <textarea
                        required
                        rows={2}
                        value={ruleForm.advice}
                        onChange={(e) => setRuleForm({ ...ruleForm, advice: e.target.value })}
                        placeholder="e.g. Avoid heavy meals before lying down. Consider drinking small sips of water."
                        className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition-all text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        Trained Clinician Chat Response (How human replies - Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={ruleForm.botResponse || ""}
                        onChange={(e) => setRuleForm({ ...ruleForm, botResponse: e.target.value })}
                        placeholder="e.g. Hey! I am really sorry to hear that. Acid burn in the stomach can be caused by gastric reflux. Please avoid fatty foods. I recommend seeing our Gastroenterologist immediately."
                        className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition-all text-slate-800"
                      />
                      <p className="text-[9px] text-slate-400 mt-1">Write the exact human response the bot should give. Keep it empty to auto-generate a professional clinician recommendation.</p>
                    </div>

                    <div className="flex gap-2.5 pt-2">
                      <button
                        type="submit"
                        className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm cursor-pointer"
                      >
                        Save Training Rule
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingRule(false);
                          setEditingRule(null);
                        }}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* ── SETTINGS MODAL OVERLAY ─────────────────────────────────────────── */}
      {showSettings && (
        <div
          className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setShowSettings(false); }}
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
            {/* Modal Header */}
            <div className="bg-slate-900 px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-base font-poppins">Admin Settings</h3>
                  <p className="text-slate-400 text-xs">Change your login credentials</p>
                </div>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1 rounded-lg hover:bg-white/10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 flex items-start gap-2 mb-6">
                <svg className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
                <p className="text-amber-700 text-xs font-medium">Current credentials: <strong>ID: {getCredentials().id}</strong> — Keep these safe. Default is ID: 1, Password: 1</p>
              </div>

              <form onSubmit={handleSaveCredentials} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-widest">New Admin ID</label>
                  <input
                    type="text"
                    value={settingsForm.newId}
                    onChange={e => setSettingsForm({ ...settingsForm, newId: e.target.value })}
                    placeholder="Enter new Admin ID"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-widest">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPass ? "text" : "password"}
                      value={settingsForm.newPass}
                      onChange={e => setSettingsForm({ ...settingsForm, newPass: e.target.value })}
                      placeholder="Enter new password"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 rounded-xl pl-4 pr-12 py-3 text-sm font-medium outline-none transition-all text-slate-800"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPass(!showNewPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none transition-all p-1.5"
                    >
                      {showNewPass ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-widest">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPass ? "text" : "password"}
                      value={settingsForm.confirmPass}
                      onChange={e => setSettingsForm({ ...settingsForm, confirmPass: e.target.value })}
                      placeholder="Re-enter new password"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 rounded-xl pl-4 pr-12 py-3 text-sm font-medium outline-none transition-all text-slate-800"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPass(!showConfirmPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none transition-all p-1.5"
                    >
                      {showConfirmPass ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {settingsMsg.text && (
                  <div className={`rounded-xl px-4 py-3 flex items-center gap-2 ${settingsMsg.type === "success" ? "bg-emerald-50 border border-emerald-200" : "bg-rose-50 border border-rose-200"}`}>
                    <svg className={`w-4 h-4 flex-shrink-0 ${settingsMsg.type === "success" ? "text-emerald-500" : "text-rose-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {settingsMsg.type === "success"
                        ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                      }
                    </svg>
                    <p className={`text-xs font-semibold ${settingsMsg.type === "success" ? "text-emerald-700" : "text-rose-700"}`}>{settingsMsg.text}</p>
                  </div>
                )}

                <div className="flex gap-2.5 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-bold py-3 rounded-xl transition-all text-sm cursor-pointer"
                  >
                    Save New Credentials
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSettings(false)}
                    className="px-5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-3 rounded-xl transition-all text-sm cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
