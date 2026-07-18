"use client";

import React, { useState, useEffect, useRef } from "react";

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

const concernsList = [
  // General Physician
  { name: "Fever", key: "fever", specialist: "General Physician", count: "12 Doctors Online" },
  { name: "Cold & Cough", key: "cold_cough", specialist: "General Physician", count: "12 Doctors Online" },
  { name: "Headache", key: "headache", specialist: "General Physician", count: "12 Doctors Online" },
  { name: "Body Pain", key: "body_pain", specialist: "General Physician", count: "12 Doctors Online" },
  { name: "Acidity", key: "acidity", specialist: "General Physician", count: "12 Doctors Online" },
  { name: "Allergies", key: "allergies", specialist: "General Physician", count: "12 Doctors Online" },

  // Medicine Specialist
  { name: "Diabetes", key: "diabetes", specialist: "Medicine Specialist", count: "8 Doctors Online" },
  { name: "High BP", key: "high_bp", specialist: "Medicine Specialist", count: "8 Doctors Online" },
  { name: "Fatty Liver", key: "fatty_liver", specialist: "Medicine Specialist", count: "8 Doctors Online" },
  { name: "COPD", key: "copd", specialist: "Medicine Specialist", count: "8 Doctors Online" },

  // Sexologist
  { name: "Erectile Dysfunction", key: "ed", specialist: "Sexologist", count: "5 Doctors Online" },
  { name: "Premature Ejaculation", key: "pe", specialist: "Sexologist", count: "5 Doctors Online" },
  { name: "Low Libido", key: "low_libido", specialist: "Sexologist", count: "5 Doctors Online" },
  { name: "Male Infertility", key: "male_infertility", specialist: "Sexologist", count: "5 Doctors Online" },
  { name: "STDs", key: "stds", specialist: "Sexologist", count: "5 Doctors Online" },

  // Gynaecologist
  { name: "PCOS", key: "pcos", specialist: "Gynaecologist", count: "7 Doctors Online" },
  { name: "Pregnancy", key: "pregnancy", specialist: "Gynaecologist", count: "7 Doctors Online" },
  { name: "Irregular Periods", key: "irregular_periods", specialist: "Gynaecologist", count: "7 Doctors Online" },
  { name: "Menopause", key: "menopause", specialist: "Gynaecologist", count: "7 Doctors Online" },
  { name: "UTI", key: "uti", specialist: "Gynaecologist", count: "7 Doctors Online" },

  // Endocrinologist
  { name: "Diabetes", key: "endocrine_diabetes", specialist: "Endocrinologist", count: "6 Doctors Online" },
  { name: "Thyroid", key: "thyroid", specialist: "Endocrinologist", count: "6 Doctors Online" },
  { name: "Obesity", key: "obesity", specialist: "Endocrinologist", count: "6 Doctors Online" },
  { name: "Hormonal Disorders", key: "hormonal_disorders", specialist: "Endocrinologist", count: "6 Doctors Online" },
  { name: "Osteoporosis", key: "osteoporosis", specialist: "Endocrinologist", count: "6 Doctors Online" },

  // General Surgeon
  { name: "Hernia", key: "hernia", specialist: "General Surgeon", count: "3 Doctors Online" },
  { name: "Gallstones", key: "gallstones", specialist: "General Surgeon", count: "3 Doctors Online" },
  { name: "Piles", key: "piles", specialist: "General Surgeon", count: "3 Doctors Online" },
  { name: "Lipoma", key: "lipoma", specialist: "General Surgeon", count: "3 Doctors Online" },
  { name: "Appendicitis", key: "appendicitis", specialist: "General Surgeon", count: "3 Doctors Online" },

  // Psychiatrist
  { name: "Anxiety", key: "anxiety", specialist: "Psychiatrist", count: "5 Doctors Online" },
  { name: "Depression", key: "depression", specialist: "Psychiatrist", count: "5 Doctors Online" },
  { name: "OCD", key: "ocd", specialist: "Psychiatrist", count: "5 Doctors Online" },
  { name: "Bipolar Disorder", key: "bipolar", specialist: "Psychiatrist", count: "5 Doctors Online" },
  { name: "Insomnia", key: "insomnia", specialist: "Psychiatrist", count: "5 Doctors Online" },

  // Gastroenterologist
  { name: "IBS", key: "ibs", specialist: "Gastroenterologist", count: "4 Doctors Online" },
  { name: "GERD", key: "gerd", specialist: "Gastroenterologist", count: "4 Doctors Online" },
  { name: "Fatty Liver", key: "gastro_fatty_liver", specialist: "Gastroenterologist", count: "4 Doctors Online" },
  { name: "Gastritis", key: "gastritis", specialist: "Gastroenterologist", count: "4 Doctors Online" },
  { name: "Constipation", key: "constipation", specialist: "Gastroenterologist", count: "4 Doctors Online" }
];

const symptomAssets = {
  fever: {
    bg: "from-[#fee2e2] to-[#ffedd5]",
    border: "border-rose-200",
    icon: (
      <g>
        {/* Thermometer tilted */}
        <path d="M44 32c-2-2-2-5 0-7l12-12c2-2 5-2 7 0s2 5 0 7L51 32c-2 2-5 2-7 0z" fill="#ffffff" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="38" cy="62" r="10" fill="#f43f5e" stroke="#0f172a" strokeWidth="3.5" />
        <path d="M42 56l10-10" stroke="#f43f5e" strokeWidth="4.5" strokeLinecap="round" />
        {/* Heat lines */}
        <path d="M60 48c2 2 4 1 6-1M32 30c-2-2-4-1-6 1" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
      </g>
    )
  },
  cold_cough: {
    bg: "from-[#e0f2fe] to-[#dbeafe]",
    border: "border-sky-200",
    icon: (
      <g>
        {/* Lungs outline */}
        <path d="M38 34c2-2 5-1 7 2v16c0 4-3 7-7 7s-7-3-7-7v-3c0-4 3-7 7-7z" fill="#fda4af" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M62 34c-2-2-5-1-7 2v16c0 4 3 7 7 7s7-3 7-7v-3c0-4-3-7-7-7z" fill="#fda4af" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Wind lines */}
        <path d="M46 22v10M54 22v10" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M38 52h24" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      </g>
    )
  },
  headache: {
    bg: "from-[#fee2e2] to-[#ffedd5]",
    border: "border-rose-200",
    icon: (
      <g>
        {/* Head profile */}
        <path d="M36 60c0-8 6-14 14-14s14 6 14 14v4H36v-4z" fill="#ffedd5" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="50" cy="40" r="10" fill="#ffedd5" stroke="#0f172a" strokeWidth="3.5" />
        {/* Lightning headache sparks */}
        <path d="M42 22l4 4-3 1M58 22l-4 4 3 1" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    )
  },
  body_pain: {
    bg: "from-[#fee2e2] to-[#ffedd5]",
    border: "border-orange-200",
    icon: (
      <g>
        {/* Figure outline */}
        <circle cx="50" cy="30" r="6" fill="#ffffff" stroke="#0f172a" strokeWidth="3.5" />
        <path d="M50 36v18M38 42h24M44 68l6-14 6 14" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Pain spots */}
        <circle cx="38" cy="42" r="3.5" fill="#f43f5e" stroke="#0f172a" strokeWidth="2" />
        <circle cx="62" cy="42" r="3.5" fill="#f43f5e" stroke="#0f172a" strokeWidth="2" />
        <circle cx="50" cy="48" r="3.5" fill="#f43f5e" stroke="#0f172a" strokeWidth="2" />
      </g>
    )
  },
  acidity: {
    bg: "from-[#fee2e2] to-[#ffedd5]",
    border: "border-orange-200",
    icon: (
      <g>
        {/* Stomach with fire */}
        <path d="M50 25c-5 0-9 4-9 9 0 4 2 6 4 9l1 5c2-1 4-3 4-6v-3c0-3 3-5 5-5s5 2 5 5v3c0 3 2 5 4 6l1-5c2-3 4-5 4-9 0-5-4-9-9-9z" fill="#fca5a5" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M46 54s2 4 4 4 4-4 4-4" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" />
        {/* Flame element inside */}
        <path d="M50 33c1 2 0 4-1 5s2 0 2-2" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
      </g>
    )
  },
  allergies: {
    bg: "from-[#fee2e2] to-[#ffedd5]",
    border: "border-rose-200",
    icon: (
      <g>
        {/* Shield and floating dots */}
        <path d="M50 22L34 26v12c0 8 7 15 16 18 9-3 16-10 16-18V26L50 22z" fill="#e2e8f0" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="30" cy="22" r="2.5" fill="#ef4444" stroke="#0f172a" strokeWidth="2" />
        <circle cx="70" cy="24" r="2" fill="#ef4444" stroke="#0f172a" strokeWidth="1.5" />
        <circle cx="68" cy="46" r="3" fill="#ef4444" stroke="#0f172a" strokeWidth="2" />
      </g>
    )
  },
  diabetes: {
    bg: "from-[#e0f2fe] to-[#dbeafe]",
    border: "border-blue-200",
    icon: (
      <g>
        {/* Test strip and droplet */}
        <rect x="36" y="24" width="28" height="34" rx="4" fill="#ffffff" stroke="#0f172a" strokeWidth="3.5" />
        <path d="M44 32h12M44 40h12" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
        <path d="M50 54c-2.5 0-4-2-4-4s2.5-4 4-6c1.5 2 4 4 4 6s-1.5 4-4 4z" fill="#ef4444" stroke="#0f172a" strokeWidth="2.5" />
      </g>
    )
  },
  high_bp: {
    bg: "from-[#e0f2fe] to-[#dbeafe]",
    border: "border-blue-200",
    icon: (
      <g>
        {/* Heart with gauge pointer */}
        <path d="M50 49.3l-1.4-1.4A9.5 9.5 0 0150 34.5a9.5 9.5 0 011.4 13.4L50 49.3z" fill="#fca5a5" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M42 42c-2.5-3-2.5-7 0-10s7-3 10 0l-2 2-8 8z" fill="#fca5a5" stroke="#0f172a" strokeWidth="3.5" opacity="0.3" />
        {/* Dial meter */}
        <path d="M34 44a16 16 0 0132 0" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M50 44l6-6" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
      </g>
    )
  },
  fatty_liver: {
    bg: "from-[#e0f2fe] to-[#dbeafe]",
    border: "border-blue-200",
    icon: (
      <g>
        {/* Liver shape with fat globules */}
        <path d="M32 42c5-10 14-12 22-8s14 12 14 12-5 8-12 8h-18c-3 0-6-4-6-12z" fill="#fca5a5" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="44" cy="40" r="2.5" fill="#fbbf24" stroke="#0f172a" strokeWidth="1.5" />
        <circle cx="56" cy="44" r="2" fill="#fbbf24" stroke="#0f172a" strokeWidth="1.5" />
        <circle cx="48" cy="46" r="1.5" fill="#fbbf24" stroke="#0f172a" strokeWidth="1" />
      </g>
    )
  },
  copd: {
    bg: "from-[#e0f2fe] to-[#dbeafe]",
    border: "border-blue-200",
    icon: (
      <g>
        {/* Lungs outline */}
        <path d="M38 32c2-2 5-1 7 2v14c0 4-3 7-7 7s-7-3-7-7v-3c0-4 3-7 7-7z" fill="#fca5a5" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M62 32c-2-2-5-1-7 2v14c0 4 3 7 7 7s7-3 7-7v-3c0-4-3-7-7-7z" fill="#fca5a5" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Blockage marker */}
        <path d="M50 20v10" stroke="#0f172a" strokeWidth="3.5" />
        <path d="M48 26h4" stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" />
      </g>
    )
  },
  ed: {
    bg: "from-[#f3e8ff] to-[#fae8ff]",
    border: "border-purple-200",
    icon: (
      <g>
        {/* Heart with lock */}
        <path d="M50 48c-4-4-9-1-9 3s4 8 9 11c5-3 9-7 9-11s-5-7-9-3z" fill="#fca5a5" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="42" y="24" width="16" height="14" rx="2" fill="#fbbf24" stroke="#0f172a" strokeWidth="3.5" />
        <path d="M46 24V20a4 4 0 018 0v4" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
      </g>
    )
  },
  pe: {
    bg: "from-[#f3e8ff] to-[#fae8ff]",
    border: "border-purple-200",
    icon: (
      <g>
        {/* Stopwatch with heart */}
        <circle cx="50" cy="46" r="16" fill="#ffffff" stroke="#0f172a" strokeWidth="3.5" />
        <path d="M50 24v6M46 22h8" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
        {/* Heart */}
        <path d="M50 46c-2-2-4 0-4 2s2 3 4 4c2-1 4-2 4-4s-2-4-4-2z" fill="#f43f5e" />
        {/* Hand */}
        <path d="M50 46l8-8" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
      </g>
    )
  },
  low_libido: {
    bg: "from-[#f3e8ff] to-[#fae8ff]",
    border: "border-purple-200",
    icon: (
      <g>
        {/* Battery low with heart */}
        <rect x="36" y="26" width="28" height="14" rx="2" fill="#ffffff" stroke="#0f172a" strokeWidth="3.5" />
        <rect x="40" y="30" width="6" height="6" fill="#ef4444" />
        {/* Heart with down arrow */}
        <path d="M44 48h12M50 44l-6 6 6 6" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    )
  },
  male_infertility: {
    bg: "from-[#f3e8ff] to-[#fae8ff]",
    border: "border-purple-200",
    icon: (
      <g>
        {/* Sperm cell structure */}
        <path d="M36 36c-4 4-2 9 2 11s9 1 11-2l16-16" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="38" cy="38" r="6" fill="#ffffff" stroke="#0f172a" strokeWidth="3.5" />
        <path d="M54 44c4 4 8 2 12 6" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
      </g>
    )
  },
  stds: {
    bg: "from-[#f3e8ff] to-[#fae8ff]",
    border: "border-purple-200",
    icon: (
      <g>
        {/* Warning shield */}
        <path d="M50 20L34 26v12c0 8 7 15 16 18 9-3 16-10 16-18V26L50 20z" fill="#fef08a" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M50 28v10M50 44h.01" stroke="#0f172a" strokeWidth="4.5" strokeLinecap="round" />
      </g>
    )
  },
  pcos: {
    bg: "from-[#fce7f3] to-[#fbcfe8]",
    border: "border-pink-200",
    icon: (
      <g>
        {/* Uterus with cystic ovaries */}
        <path d="M50 26c-5 0-9 4-9 9 0 4 2 6 4 9l1 6c2-1 4-3 4-6v-3c0-3 3-5 5-5s5 2 5 5v3c0 3 2 5 4 6l1-6c2-3 4-5 4-9 0-5-4-9-9-9z" fill="#fda4af" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Cystic circles on ovaries */}
        <circle cx="36" cy="34" r="2.5" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
        <circle cx="64" cy="34" r="2.5" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
      </g>
    )
  },
  pregnancy: {
    bg: "from-[#fce7f3] to-[#fbcfe8]",
    border: "border-pink-200",
    icon: (
      <g>
        {/* Pregnant belly silhouette */}
        <path d="M42 22a4 4 0 100 8 4 4 0 000-8zM44 32c-3 0-5 2-5 5v12c0 3 2 5 5 5s2-1 4-3l4-8v-6c0-3-3-5-8-5z" fill="#fda4af" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M46 42c3 0 5 2 5 5s-2 5-5 5-5-2-5-5 2-5 5-5z" fill="#f43f5e" opacity="0.8" />
      </g>
    )
  },
  irregular_periods: {
    bg: "from-[#fce7f3] to-[#fbcfe8]",
    border: "border-pink-200",
    icon: (
      <g>
        {/* Calendar drop */}
        <rect x="36" y="24" width="28" height="28" rx="3" fill="#ffffff" stroke="#0f172a" strokeWidth="3.5" />
        <path d="M36 32h28" stroke="#0f172a" strokeWidth="3" />
        {/* Irregular drop */}
        <path d="M50 48c-2 0-3.5-1.5-3.5-3s2-4.5 3.5-5.5c1.5 1 3.5 4 3.5 5.5s-1.5 3-3.5 3z" fill="#ef4444" stroke="#0f172a" strokeWidth="2" />
        <circle cx="42" cy="40" r="1.5" fill="#ef4444" />
        <circle cx="58" cy="44" r="1.5" fill="#ef4444" />
      </g>
    )
  },
  menopause: {
    bg: "from-[#fce7f3] to-[#fbcfe8]",
    border: "border-pink-200",
    icon: (
      <g>
        {/* Hot/Cold sun split */}
        <circle cx="50" cy="46" r="12" fill="#ffedd5" stroke="#0f172a" strokeWidth="3.5" />
        <path d="M50 28v6M50 58v6M32 46h6M62 46h6" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
        {/* Cold snowflake lines inside */}
        <path d="M44 40l12 12M56 40l-12 12" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    )
  },
  uti: {
    bg: "from-[#fce7f3] to-[#fbcfe8]",
    border: "border-pink-200",
    icon: (
      <g>
        {/* Bladder outline */}
        <path d="M50 22c-6 0-10 4-10 10v10c0 6 4 10 10 10s10-4 10-10V32c0-6-4-10-10-10z" fill="#fda4af" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M50 52v8M44 58h12" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
        {/* Infection target */}
        <circle cx="50" cy="38" r="4.5" fill="#ef4444" stroke="#0f172a" strokeWidth="2" />
      </g>
    )
  },
  endocrine_diabetes: {
    bg: "from-[#d1fae5] to-[#a7f3d0]",
    border: "border-emerald-200",
    icon: (
      <g>
        {/* Test strip and droplet */}
        <rect x="36" y="24" width="28" height="34" rx="4" fill="#ffffff" stroke="#0f172a" strokeWidth="3.5" />
        <path d="M44 32h12M44 40h12" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
        <path d="M50 54c-2.5 0-4-2-4-4s2.5-4 4-6c1.5 2 4 4 4 6s-1.5 4-4 4z" fill="#ef4444" stroke="#0f172a" strokeWidth="2.5" />
      </g>
    )
  },
  thyroid: {
    bg: "from-[#d1fae5] to-[#a7f3d0]",
    border: "border-emerald-200",
    icon: (
      <g>
        {/* Butterfly gland */}
        <path d="M50 30c-1.5 2-3 3-4.5 3S41 31 41 29v6c0 3 2 5 4.5 5h9c2.5 0 4.5-2 4.5-5v-6c0 2-1 3-2.5 3s-3-1-4.5-3z" fill="#fda4af" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M45 36c1.5.5 3.5.5 5 0" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
      </g>
    )
  },
  obesity: {
    bg: "from-[#d1fae5] to-[#a7f3d0]",
    border: "border-emerald-200",
    icon: (
      <g>
        {/* Scale */}
        <rect x="34" y="26" width="32" height="32" rx="4" fill="#ffffff" stroke="#0f172a" strokeWidth="3.5" />
        <circle cx="50" cy="42" r="10" fill="#e2e8f0" stroke="#0f172a" strokeWidth="3" />
        <path d="M50 42l4-5" stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" />
      </g>
    )
  },
  hormonal_disorders: {
    bg: "from-[#d1fae5] to-[#a7f3d0]",
    border: "border-emerald-200",
    icon: (
      <g>
        {/* Molecular chains */}
        <circle cx="38" cy="34" r="5" fill="#ffffff" stroke="#0f172a" strokeWidth="3.5" />
        <circle cx="62" cy="34" r="5" fill="#ffffff" stroke="#0f172a" strokeWidth="3.5" />
        <circle cx="50" cy="52" r="6" fill="#fda4af" stroke="#0f172a" strokeWidth="3.5" />
        <path d="M42 37l5 9M58 37l-5 9" stroke="#0f172a" strokeWidth="3" />
      </g>
    )
  },
  osteoporosis: {
    bg: "from-[#d1fae5] to-[#a7f3d0]",
    border: "border-emerald-200",
    icon: (
      <g>
        {/* Bone structure */}
        <path d="M34 46c-2-2-4-2-4 0v4c0 2 2 2 4 0h32c2 2 4 2 4 0v-4c0-2-2-2-4 0H34z" fill="#ffffff" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="42" cy="46" r="1" fill="#0f172a" />
        <circle cx="50" cy="46" r="1" fill="#0f172a" />
        <circle cx="58" cy="46" r="1" fill="#0f172a" />
      </g>
    )
  },
  hernia: {
    bg: "from-[#e0f7fa] to-[#b2ebf2]",
    border: "border-cyan-200",
    icon: (
      <g>
        {/* Abdomen herniation bulge */}
        <path d="M32 46h12c2 0 3-2 3-4s1-4 3-4 3 2 3 4 1 4 3 4h12" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
        <circle cx="50" cy="36" r="5" fill="#fda4af" stroke="#0f172a" strokeWidth="3" />
      </g>
    )
  },
  gallstones: {
    bg: "from-[#e0f7fa] to-[#b2ebf2]",
    border: "border-cyan-200",
    icon: (
      <g>
        {/* Gallbladder stones */}
        <path d="M40 30c0-5 4-8 10-8s10 3 10 8c0 6-4 12-10 16-6-4-10-10-10-16z" fill="#a7f3d0" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="48" cy="32" r="2.5" fill="#fbbf24" stroke="#0f172a" strokeWidth="1.5" />
        <circle cx="52" cy="38" r="2" fill="#fbbf24" stroke="#0f172a" strokeWidth="1.5" />
      </g>
    )
  },
  piles: {
    bg: "from-[#e0f7fa] to-[#b2ebf2]",
    border: "border-cyan-200",
    icon: (
      <g>
        {/* Colon segments with inflamed nodes */}
        <path d="M38 46c0-6 4-10 12-10s12 4 12 10H38z" fill="#ffffff" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="42" cy="46" r="3.5" fill="#ef4444" stroke="#0f172a" strokeWidth="2" />
        <circle cx="58" cy="46" r="3.5" fill="#ef4444" stroke="#0f172a" strokeWidth="2" />
      </g>
    )
  },
  lipoma: {
    bg: "from-[#e0f7fa] to-[#b2ebf2]",
    border: "border-cyan-200",
    icon: (
      <g>
        {/* Skin fatty lump */}
        <path d="M32 46h10c4 0 5-6 8-6s4 6 8 6h10" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="50" cy="42" rx="6" ry="4" fill="#fbbf24" stroke="#0f172a" strokeWidth="3" />
      </g>
    )
  },
  appendicitis: {
    bg: "from-[#e0f7fa] to-[#b2ebf2]",
    border: "border-cyan-200",
    icon: (
      <g>
        {/* Appendix inflamed */}
        <path d="M46 22v20c0 4 2 6 4 6s4-2 4-6V22" fill="#ffffff" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M50 46v6" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
        <circle cx="50" cy="52" r="2.5" fill="#ef4444" stroke="#0f172a" strokeWidth="1.5" />
      </g>
    )
  },
  anxiety: {
    bg: "from-[#ede9fe] to-[#ddd6fe]",
    border: "border-violet-200",
    icon: (
      <g>
        {/* Head with scribble brain */}
        <path d="M38 56c0-6 5-11 12-11s12 5 12 11v6H38v-6z" fill="#ffffff" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="50" cy="38" r="10" fill="#ffffff" stroke="#0f172a" strokeWidth="3.5" />
        {/* Scribble path */}
        <path d="M47 35s1.5-1.5 3 0-1.5 3 0 3 3-1.5 3 0" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    )
  },
  depression: {
    bg: "from-[#ede9fe] to-[#ddd6fe]",
    border: "border-violet-200",
    icon: (
      <g>
        {/* Head with rain cloud */}
        <path d="M38 56c0-6 5-11 12-11s12 5 12 11v6H38v-6z" fill="#ffffff" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Rain cloud */}
        <path d="M44 32c-2 0-3-1.5-3-3s1.5-3 3.5-3 3 1.5 3 3M54 32c2 0 3-1.5 3-3s-1.5-3-3.5-3-3 1.5-3 3" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" fill="#cbd5e1" />
        <path d="M46 38v3M54 38v3" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    )
  },
  ocd: {
    bg: "from-[#ede9fe] to-[#ddd6fe]",
    border: "border-violet-200",
    icon: (
      <g>
        {/* Perfect alignment checkboxes */}
        <rect x="34" y="26" width="32" height="32" rx="3" fill="#ffffff" stroke="#0f172a" strokeWidth="3.5" />
        <path d="M40 36l3 3 6-6M40 48l3 3 6-6" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    )
  },
  bipolar: {
    bg: "from-[#ede9fe] to-[#ddd6fe]",
    border: "border-violet-200",
    icon: (
      <g>
        {/* Smiling/Frowning masks */}
        <circle cx="42" cy="42" r="10" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
        <circle cx="58" cy="42" r="10" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
        <path d="M39 46s1 1.5 3 1.5 3-1.5 3-1.5M55 47.5s1-1.5 3-1.5 3 1.5 3 1.5" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
      </g>
    )
  },
  insomnia: {
    bg: "from-[#ede9fe] to-[#ddd6fe]",
    border: "border-violet-200",
    icon: (
      <g>
        {/* Moon clock */}
        <path d="M42 26a14 14 0 0014 14 14 14 0 0011-5.5 16 16 0 11-25-8.5z" fill="#fef08a" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M50 44l4 4" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
      </g>
    )
  },
  ibs: {
    bg: "from-[#ecfccb] to-[#d9f99d]",
    border: "border-lime-200",
    icon: (
      <g>
        {/* Spastic colon waves */}
        <path d="M34 46c0-6 4-10 12-10s12 4 12 10M34 46h24" fill="#ffffff" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M38 40s2 2 4 0 2-2 4 0" stroke="#a7f3d0" strokeWidth="3" strokeLinecap="round" />
      </g>
    )
  },
  gerd: {
    bg: "from-[#ecfccb] to-[#d9f99d]",
    border: "border-lime-200",
    icon: (
      <g>
        {/* Acid reflux splashes */}
        <path d="M50 25c-5 0-9 4-9 9 0 4 2 6 4 9l1 6c2-1 4-3 4-6v-3c0-3 3-5 5-5s5 2 5 5v3c0 3 2 5 4 6l1-6c2-3 4-5 4-9 0-5-4-9-9-9z" fill="#fca5a5" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M50 32v12m-3-9l3-3 3 3" stroke="#fbbf24" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    )
  },
  gastro_fatty_liver: {
    bg: "from-[#ecfccb] to-[#d9f99d]",
    border: "border-lime-200",
    icon: (
      <g>
        {/* Liver shape with fat globules */}
        <path d="M32 42c5-10 14-12 22-8s14 12 14 12-5 8-12 8h-18c-3 0-6-4-6-12z" fill="#fca5a5" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="44" cy="40" r="2.5" fill="#fbbf24" stroke="#0f172a" strokeWidth="1.5" />
        <circle cx="56" cy="44" r="2" fill="#fbbf24" stroke="#0f172a" strokeWidth="1.5" />
        <circle cx="48" cy="46" r="1.5" fill="#fbbf24" stroke="#0f172a" strokeWidth="1" />
      </g>
    )
  },
  gastritis: {
    bg: "from-[#ecfccb] to-[#d9f99d]",
    border: "border-lime-200",
    icon: (
      <g>
        {/* Stomach with inflamed core */}
        <path d="M50 25c-5 0-9 4-9 9 0 4 2 6 4 9l1 6c2-1 4-3 4-6v-3c0-3 3-5 5-5s5 2 5 5v3c0 3 2 5 4 6l1-6c2-3 4-5 4-9 0-5-4-9-9-9z" fill="#fca5a5" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="50" cy="34" r="5" fill="#ef4444" stroke="#0f172a" strokeWidth="2" />
      </g>
    )
  },
  constipation: {
    bg: "from-[#ecfccb] to-[#d9f99d]",
    border: "border-lime-200",
    icon: (
      <g>
        {/* Hourglass stomach blockage */}
        <path d="M50 25c-5 0-9 4-9 9 0 4 2 6 4 9l1 6c2-1 4-3 4-6v-3c0-3 3-5 5-5s5 2 5 5v3c0 3 2 5 4 6l1-6c2-3 4-5 4-9 0-5-4-9-9-9z" fill="#ffffff" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
        {/* Hourglass */}
        <path d="M45 32h10l-10 16h10z" fill="#fbbf24" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    )
  }
};

const symptomImages = {
  fever: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=400&h=300&q=80",
  cold_cough: "https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=400&h=300&q=80",
  headache: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&h=300&q=80",
  body_pain: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=400&h=300&q=80",
  acidity: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=400&h=300&q=80",
  allergies: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&h=300&q=80",
  diabetes: "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=400&h=300&q=80",
  high_bp: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&h=300&q=80",
  fatty_liver: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=400&h=300&q=80",
  copd: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=400&h=300&q=80",
  ed: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&h=300&q=80",
  pe: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&h=300&q=80",
  low_libido: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&h=300&q=80",
  male_infertility: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=400&h=300&q=80",
  stds: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&h=300&q=80",
  pcos: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=400&h=300&q=80",
  pregnancy: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=400&h=300&q=80",
  irregular_periods: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&h=300&q=80",
  menopause: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=400&h=300&q=80",
  uti: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=400&h=300&q=80",
  endocrine_diabetes: "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=400&h=300&q=80",
  thyroid: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&h=300&q=80",
  obesity: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&h=300&q=80",
  hormonal_disorders: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&h=300&q=80",
  osteoporosis: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&h=300&q=80",
  hernia: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=400&h=300&q=80",
  gallstones: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=400&h=300&q=80",
  piles: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&h=300&q=80",
  lipoma: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=400&h=300&q=80",
  appendicitis: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=400&h=300&q=80",
  anxiety: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=400&h=300&q=80",
  depression: "https://images.unsplash.com/photo-1489659639091-8b687bc4386e?auto=format&fit=crop&w=400&h=300&q=80",
  ocd: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=400&h=300&q=80",
  bipolar: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=400&h=300&q=80",
  insomnia: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&h=300&q=80",
  ibs: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=400&h=300&q=80",
  gerd: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=400&h=300&q=80",
  gastro_fatty_liver: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=400&h=300&q=80",
  gastritis: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=400&h=300&q=80",
  constipation: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=400&h=300&q=80"
};

function SymptomIllustration({ symptomKey, imageUrl, className = "h-44" }) {
  const finalImageUrl = imageUrl || symptomImages[symptomKey] || symptomImages.fever;
  return (
    <div className={`w-full ${className} bg-slate-100 rounded-[28px] overflow-hidden mb-4 relative border border-slate-100 group/img shadow-inner`}>
      <img
        src={finalImageUrl}
        alt={symptomKey}
        className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500 ease-out"
        loading="lazy"
      />
      {/* Decorative Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-80" />
      
      {/* Small floating category/specialty badge */}
      <div className="absolute top-3.5 right-3.5 bg-white/90 backdrop-blur-md text-[9px] font-bold text-slate-800 px-2 py-0.5 rounded shadow-sm border border-slate-200/40">
        Clinical Reference
      </div>
      
      {/* Left floating medical cross badge */}
      <div className="absolute bottom-3.5 left-3.5 flex items-center justify-center bg-brand-600/90 backdrop-blur-md text-white rounded-full w-7 h-7 shadow-md border border-brand-500/20">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      
      {/* Right floating verify badge */}
      <div className="absolute bottom-3.5 right-3.5 flex items-center justify-center bg-white/95 backdrop-blur-md text-emerald-600 rounded-full w-7 h-7 shadow-md border border-slate-200/40">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 12l2 2 4-4" />
        </svg>
      </div>
    </div>
  );
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

const specialitiesList = [
  { title: "General Physician", desc: "Fever, cough, metabolic issues, routine diagnoses", fee: "₹699", icon: "shield" },
  { title: "Medicine Specialist", desc: "Internal organ therapy, chronic disease plans", fee: "₹699", icon: "beaker" },
  { title: "Sexologist", desc: "Confidential therapy, private relationship support", fee: "₹699", icon: "heart" },
  { title: "Gynaecologist", desc: "Menstruation parameters, maternal and PCOS advice", fee: "₹699", icon: "user-group" },
  { title: "Gastroenterologist", desc: "Severe acidity, IBS, gut microbiome tracking", fee: "₹699", icon: "clipboard" },
  { title: "Psychiatrist", desc: "Mental diagnoses, emotional therapy support", fee: "₹699", icon: "bolt" },
  { title: "Mental Health", desc: "Daily counseling, grief support, anxiety reduction & relationship coaching", fee: "₹799", tag: "PREMIUM", icon: "face-smile" },
  { title: "General Surgeon", desc: "Post-op counseling, minor outpatient assessment", fee: "₹699", icon: "scissors" }
];

const specialtyDoctorNames = {
  "General Physician": "Dr. Swastik Pattnaik",
  "Medicine Specialist": "Dr. Kavya Prakash",
  "Sexologist": "Dr. Swastik Pattnaik",
  "Gynaecologist": "Dr. Kavya Prakash",
  "Gastroenterologist": "Dr. Swastik Pattnaik",
  "Psychiatrist": "Dr. Kavya Prakash",
  "Mental Health": "Dipika Das",
  "General Surgeon": "Dr. Anup Sarkar"
};

export default function Home() {
  // Live Clinic Stats
  const [totalConsultations, setTotalConsultations] = useState(258410);
  const [activeDoctors, setActiveDoctors] = useState(38);
  const [averageWaitSeconds, setAverageWaitSeconds] = useState(255); // 4m 15s

  // Symptom Checker Search
  const [symptomSearchQuery, setSymptomSearchQuery] = useState("");

  // FAQ Active State
  const [activeFAQIndex, setActiveFAQIndex] = useState(null);

  // Booking Modal States
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingSpeciality, setBookingSpeciality] = useState("General Physician");
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingAge, setBookingAge] = useState("");
  const [bookingHeight, setBookingHeight] = useState("");
  const [bookingWeight, setBookingWeight] = useState("");
  const [bookingSymptoms, setBookingSymptoms] = useState("");
  const [syncAddy, setSyncAddy] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAllConcernsModalOpen, setIsAllConcernsModalOpen] = useState(false);
  const [isAllSpecialitiesModalOpen, setIsAllSpecialitiesModalOpen] = useState(false);

  // Booking Progression
  const [bookingStep, setBookingStep] = useState("form"); // form | loading | confirmed
  const [bookingConfirmedId, setBookingConfirmedId] = useState("");
  const [bookingConfirmedTime, setBookingConfirmedTime] = useState("");
  const [copied, setCopied] = useState(false);
  const [appointmentDateVal, setAppointmentDateVal] = useState("");
  const [appointmentTimeVal, setAppointmentTimeVal] = useState("");

  // Sandbox Assistant States
  const [sandboxMessages, setSandboxMessages] = useState([
    {
      sender: "CF",
      text: "Hi, I'm here to help — what's bothering you today?",
      isUser: false,
    }
  ]);
  const [sandboxInput, setSandboxInput] = useState("");
  const [isSandboxAnalyzing, setIsSandboxAnalyzing] = useState(false);
  const [trainingRules, setTrainingRules] = useState([]);
  const [triageState, setTriageState] = useState({ clarifyingFor: null });

  // Dynamic CMS States loaded from localStorage
  const [heroContent, setHeroContent] = useState({
    title: "Skip the queue. Consult doctors online at home",
    desc: "Empowering healthcare diagnostics in minutes. Experience secure 1-on-1 private video medical assessments, instant legal digital prescriptions, and certified fitness syncing.",
    imgUrl: "/hero_banner.png"
  });

  const [specialities, setSpecialities] = useState([]);
  const [concerns, setConcerns] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [symptomImgMap, setSymptomImgMap] = useState({});

  useEffect(() => {
    // Load all CMS data from the database via API
    const loadData = async () => {
      try {
        // 1. Hero Content
        const heroRes = await fetch("/api/hero");
        if (heroRes.ok) {
          const heroData = await heroRes.json();
          setHeroContent(heroData);
        }

        // 2. Specialities
        const specsRes = await fetch("/api/specialities");
        if (specsRes.ok) {
          const specsData = await specsRes.json();
          setSpecialities(specsData);
        }


        // 3. Concerns
        const concernsRes = await fetch("/api/concerns");
        if (concernsRes.ok) {
          const concernsData = await concernsRes.json();
          setConcerns(concernsData);
        }


        // 4. Doctors
        const docsRes = await fetch("/api/doctors");
        if (docsRes.ok) {
          const docsData = await docsRes.json();
          setDoctors(docsData);
        }

        // 5. Symptom Images — build map from concerns img field
        const imgMap = {};
        const concernsForImg = await fetch("/api/concerns");
        if (concernsForImg.ok) {
          const cd = await concernsForImg.json();
          cd.forEach(c => { if (c.img) imgMap[c.key] = c.img; });
          setSymptomImgMap(imgMap);
        }

        // 6. Chatbot Training Rules
        const rulesRes = await fetch("/api/chatbot-rules");
        if (rulesRes.ok) {
          const rulesData = await rulesRes.json();
          setTrainingRules(rulesData);
        }
      } catch (err) {
        console.error("Failed to load data from DB:", err);
      }
    };
    loadData();
  }, []);


  // Refs for scroll sliders
  // Refs for scroll sliders
  const specialitiesSliderRef = useRef(null);
  const concernsSliderRef = useRef(null);
  const sandboxChatOutputRef = useRef(null);

  // Stat ticking simulation (natural fluctuations)
  useEffect(() => {
    const interval = setInterval(() => {
      // Tick total consultations up
      setTotalConsultations(prev => prev + Math.floor(Math.random() * 3));

      // Fluctuate active doctors slightly
      setActiveDoctors(prev => {
        const delta = Math.random() > 0.5 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        const newVal = prev + delta;
        return Math.max(32, Math.min(45, newVal));
      });

      // Fluctuate average wait time
      setAverageWaitSeconds(prev => {
        const delta = Math.random() > 0.5 ? (Math.random() > 0.5 ? 4 : -4) : 0;
        const newVal = prev + delta;
        return Math.max(210, Math.min(290, newVal));
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Scroll to bottom of chat windows on update
  useEffect(() => {
    if (sandboxChatOutputRef.current) {
      sandboxChatOutputRef.current.scrollTop = sandboxChatOutputRef.current.scrollHeight;
    }
  }, [sandboxMessages, isSandboxAnalyzing]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-sliding logic for clinical symptoms carousel
  useEffect(() => {
    const slider = concernsSliderRef.current;
    if (!slider) return;

    let isHovered = false;
    
    const handleMouseEnter = () => { isHovered = true; };
    const handleMouseLeave = () => { isHovered = false; };
    
    slider.addEventListener("mouseenter", handleMouseEnter);
    slider.addEventListener("mouseleave", handleMouseLeave);

    const interval = setInterval(() => {
      if (isHovered) return;
      
      const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
      if (maxScrollLeft <= 0) return;

      if (slider.scrollLeft >= maxScrollLeft - 10) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        // Scroll by one card width (320px) + gap (24px) = 344px
        slider.scrollBy({ left: 344, behavior: "smooth" });
      }
    }, 3000);

    return () => {
      slider.removeEventListener("mouseenter", handleMouseEnter);
      slider.removeEventListener("mouseleave", handleMouseLeave);
      clearInterval(interval);
    };
  }, []);

  // Wait time string formatting
  const formatWaitTime = (totalSecs) => {
    const min = Math.floor(totalSecs / 60);
    const sec = totalSecs % 60;
    return `${min}m ${sec}s`;
  };

  // Slider navigation
  const scrollSlider = (sliderRef, direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction * 310;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Filter Symptoms
  const filteredConcerns = concerns.filter(item => {
    const query = symptomSearchQuery.toLowerCase().trim();
    return (
      item.name.toLowerCase().includes(query) ||
      item.specialist.toLowerCase().includes(query)
    );
  });

  // Modal handlers
  const openBookingModal = (speciality = "") => {
    // Reset modal steps
    setBookingStep("form");
    
    if (speciality) {
      // Match mapped string in case it's compound
      let matchedKey = Object.keys(specialtyDoctorNames).find(key => 
        speciality.toLowerCase().includes(key.toLowerCase())
      ) || "General Physician";
      setBookingSpeciality(matchedKey);
    }
    
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    // Reset after close animation completes
    setTimeout(() => {
      setBookingStep("form");
      setBookingConfirmedId("");
    }, 300);
  };

  const copyToClipboard = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => console.error("Clipboard copy failed", err));
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Fallback copy failed", err);
      }
      document.body.removeChild(textarea);
    }
  };


  const submitSimplifiedBooking = async (e) => {
    e.preventDefault();
    setBookingStep("loading");

    // Formulate appointmentDate string for the database
    let apptDateString = "";
    if (appointmentDateVal && appointmentTimeVal) {
      apptDateString = `${appointmentDateVal}T${appointmentTimeVal}`;
    }

    // Save to database via API — server generates AFDC sequential ID
    const newBooking = {
      name: bookingName || "Patient",
      phone: bookingPhone || "--",
      age: bookingAge || "--",
      height: bookingHeight || "--",
      weight: bookingWeight || "--",
      symptoms: bookingSymptoms || "unspecified parameters",
      speciality: bookingSpeciality,
      syncAddy: syncAddy,
      appointmentDate: apptDateString,
    };

    let generatedId = "";
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBooking)
      });
      if (res.ok) {
        const data = await res.json();
        generatedId = data.bookingId || "";
      }
    } catch (err) {
      console.error("Failed to save booking to DB", err);
    }

    // Show thank-you confirmation page redirect
    setTimeout(() => {
      if (generatedId) {
        window.location.href = `/thankyou/${generatedId}`;
      } else {
        setBookingStep("confirmed");
      }
    }, 2000);
  };



  // Sandbox Assistant Trigger
  const triggerSandboxResponse = (userSymptom) => {
    setIsSandboxAnalyzing(true);
    
    setTimeout(() => {
      setIsSandboxAnalyzing(false);
      
      const textLower = userSymptom.toLowerCase().trim();
      
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
        setSandboxMessages(prev => [
          ...prev,
          {
            sender: "CF",
            text: "This sounds like a very difficult time. Please reach out for support immediately. You are not alone. Please call emergency services (108/112) or reach out to a crisis helpline like iCall at 9152987821 or AASRA at 9820466726 right now. Please connect with someone who can support you.",
            isUser: false
          }
        ]);
        setTriageState({ clarifyingFor: null });
        return;
      }

      if (isEmergency(textLower)) {
        setSandboxMessages(prev => [
          ...prev,
          {
            sender: "CF",
            text: "This sounds like it could be a medical emergency. Please call emergency services (dial 108/112) or go to your nearest emergency room right now. I'm not able to help with emergencies through chat, but please don't wait — get help immediately.",
            isUser: false
          }
        ]);
        setTriageState({ clarifyingFor: null });
        return;
      }

      // 2. CHECK ACTIVE CLARIFYING STATES
      if (triageState.clarifyingFor === "diabetes") {
        const isOngoing = textLower.includes("already") || textLower.includes("diagnosed") || textLower.includes("meds") || textLower.includes("review") || textLower.includes("management") || textLower.includes("chronic") || textLower.includes("old") || textLower.includes("yes");
        const specialist = isOngoing ? "Endocrinologist" : "Medicine Specialist";
        const fee = 699;
        setSandboxMessages(prev => [
          ...prev,
          {
            sender: "CF",
            text: `Got it, thanks for clarifying. I'd recommend booking with a ${specialist} (₹${fee} consult). Would you like to Consult now or Chat on WhatsApp so a doctor can take a proper look?`,
            isUser: false,
            recommendation: specialist
          }
        ]);
        setTriageState({ clarifyingFor: null });
        return;
      }

      if (triageState.clarifyingFor === "fatty_liver") {
        const isDigestion = textLower.includes("bloat") || textLower.includes("acidity") || textLower.includes("digestion") || textLower.includes("acid") || textLower.includes("stomach") || textLower.includes("yes") || textLower.includes("digestive");
        const specialist = isDigestion ? "Gastroenterologist" : "Medicine Specialist";
        const fee = 699;
        setSandboxMessages(prev => [
          ...prev,
          {
            sender: "CF",
            text: `Got it, thanks for clarifying. I'd recommend booking with a ${specialist} (₹${fee} consult). Would you like to Consult now or Chat on WhatsApp so a doctor can take a proper look?`,
            isUser: false,
            recommendation: specialist
          }
        ]);
        setTriageState({ clarifyingFor: null });
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
          setSandboxMessages(prev => [...prev, { sender: "CF", text: response, isUser: false }]);
          return;
        }
      }

      // 4. AMBIGUOUS CASES INTERCEPTION
      if (textLower.includes("diabetes") || textLower.includes("diabetic") || textLower.includes("sugar")) {
        setTriageState({ clarifyingFor: "diabetes" });
        setSandboxMessages(prev => [
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
        setTriageState({ clarifyingFor: "fatty_liver" });
        setSandboxMessages(prev => [
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
            `Hi, I need assistance. Here is my medical concern:\n\n"${userSymptom}"`
          )}`;
          replyText = `I'm not able to understand your concern as I'm AI bot. For better understanding, I'm connecting you with a human. You can chat with us on WhatsApp.`;
        }
      }

      setSandboxMessages(prev => [
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
    }, 1200);
  };

  const sendSandboxChip = (chipText) => {
    setSandboxMessages(prev => [...prev, { sender: "Patient", text: chipText, isUser: true }]);
    triggerSandboxResponse(chipText);
  };

  const sendSandboxFreeText = () => {
    if (!sandboxInput.trim()) return;
    setSandboxMessages(prev => [...prev, { sender: "Patient", text: sandboxInput.trim(), isUser: true }]);
    const query = sandboxInput;
    setSandboxInput("");
    triggerSandboxResponse(query);
  };

  const handleSandboxEnter = (e) => {
    if (e.key === "Enter") {
      sendSandboxFreeText();
    }
  };

  const toggleFAQ = (idx) => {
    setActiveFAQIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <>
{/* Hero Section */}
      <header 
        className="relative overflow-hidden border-b border-slate-100/50 min-h-[500px] lg:h-[540px] max-w-[1600px] mx-auto flex items-center w-full pt-12 pb-12 lg:pt-0 lg:pb-0"

        style={{ 
          backgroundImage: `url('${heroContent.imgUrl}')`, 
          backgroundRepeat: "no-repeat", 
          backgroundPosition: "center right", 
          backgroundSize: "cover" 
        }}
      >
        {/* Soft background gradient overlay for high contrast and readability on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#faf6f0] via-[#faf6f0]/98 md:via-[#faf6f0]/95 md:via-[45%] to-[#faf6f0]/90 md:to-transparent pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="max-w-2xl flex flex-col justify-center space-y-6 text-left">

            <h1 className="text-4xl sm:text-5xl lg:text-[46px] font-extrabold text-slate-800 leading-[1.15] tracking-tight font-poppins">
              {heroContent.title}
            </h1>

            <p className="text-slate-600 text-sm sm:text-base max-w-xl leading-relaxed font-normal">
              {heroContent.desc}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
              <button
                onClick={() => openBookingModal()}
                className="w-full sm:w-auto bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white font-bold px-6 py-3.5 rounded-2xl shadow-xl shadow-brand-200 hover:shadow-brand-300 transition-all hover:-translate-y-0.5 active:translate-y-0 text-sm tracking-wide flex items-center justify-center gap-2"
              >
                <span>Consult Now</span>
                <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
              
              <a
                href="https://wa.me/919861787335?text=Hello,%20I%20would%20like%20to%20consult%20a%20specialist%20online."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-2xl shadow-xl shadow-emerald-100 hover:shadow-emerald-200 transition-all hover:-translate-y-0.5 active:translate-y-0 text-sm tracking-wide flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 448 512">
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                </svg>
                <span>Chat on WhatsApp</span>
              </a>


            </div>

            {/* Live Stats Dynamic Grid */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200/60 max-w-md">
              <div className="bg-white/70 backdrop-blur-sm p-3.5 rounded-2xl border border-white/95 shadow-sm hover:shadow transition-all duration-300 flex flex-col justify-center">
                <span className="block text-sm sm:text-base font-extrabold text-brand-600 uppercase tracking-wide leading-tight">
                  Connect
                </span>
                <span className="block text-[11px] font-bold text-slate-800 tracking-wide mt-0.5">
                  Instantly
                </span>
              </div>
              <div className="bg-white/70 backdrop-blur-sm p-3.5 rounded-2xl border border-white/95 shadow-sm hover:shadow transition-all duration-300">
                <span className="block text-xl sm:text-2xl font-extrabold text-slate-800">
                  580
                </span>
                <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">
                  Sessions Done
                </span>
              </div>
              <div className="bg-white/70 backdrop-blur-sm p-3.5 rounded-2xl border border-white/95 shadow-sm hover:shadow transition-all duration-300">
                <span className="block text-xl sm:text-2xl font-extrabold text-slate-800">4.0★</span>
                <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">
                  Clarity Score
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
{/* Specialities Panel */}
      <section id="specialities" className="py-10 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-brand-600 tracking-widest uppercase block mb-2">
                Medical Council Specialties
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-poppins">
                Consult Verified Specialists
              </h2>
              <p className="text-slate-500 mt-2 max-w-xl text-sm sm:text-base">
                Meticulously selected doctors offering immediate 1-on-1 virtual appointments across crucial health realms.
              </p>
            </div>
            {/* Control Buttons & See All */}
            <div className="flex items-center gap-2.5 mt-4 md:mt-0">
              <button
                onClick={() => scrollSlider(specialitiesSliderRef, -1)}
                className="w-10 h-10 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center shadow-sm active:scale-95 transition-all cursor-pointer"
                title="Previous"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scrollSlider(specialitiesSliderRef, 1)}
                className="w-10 h-10 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center shadow-sm active:scale-95 transition-all cursor-pointer"
                title="Next"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              <button
                type="button"
                onClick={() => setIsAllSpecialitiesModalOpen(true)}
                className="bg-brand-50 hover:bg-brand-100 text-brand-700 font-extrabold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-brand-100 shadow-sm"
              >
                <span>See All</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Scrollable Cards Container */}
          <div
            ref={specialitiesSliderRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-6"
          >
            {/* Cards definitions */}
            {specialities.map((spec, i) => {
              const displayTitle = {
                "General Physician": "General Physician",
                "Medicine Specialist": "Internal Medicine",
                "Sexologist": "Sexology",
                "Gynaecologist": "Gynaecology",
                "Endocrinologist": "Endocrinology",
                "General Surgeon": "General Surgery",
                "Psychiatrist": "Psychiatry",
                "Gastroenterologist": "Gastroenterology",
                "Mental Health": "Mental Health"
              }[spec.title] || spec.title;

              return (
                <div
                  key={i}
                  onClick={() => openBookingModal(spec.title)}
                  className="flex-shrink-0 w-[280px] bg-white border border-slate-200 rounded-3xl p-6 shadow-[0_4px_24px_0_rgba(148,163,184,0.18)] hover:shadow-[0_8px_32px_0_rgba(148,163,184,0.28)] hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 group snap-start cursor-pointer flex flex-col items-center text-center"
                >
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-6 group-hover:scale-105 transition-transform shadow-md border border-slate-100 flex items-center justify-center bg-slate-50">
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
                      alt={displayTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Centered Title */}
                  <h3 className="text-[17px] font-bold text-slate-800 font-poppins mb-1 tracking-tight">
                    {displayTitle}
                  </h3>

                  {/* Centered Description */}
                  <p className="text-xs text-slate-400 font-medium mb-3 px-2 leading-relaxed">
                    {spec.desc}
                  </p>
                  
                  {/* Centered Price */}
                  <p className="text-slate-500 text-sm font-semibold mb-5 font-dmsans">
                    {spec.fee}
                  </p>

                  {/* 2 CTA Buttons */}
                  <div className="grid grid-cols-2 gap-2.5 w-full mt-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openBookingModal(spec.title);
                      }}
                      className="bg-brand-600 hover:bg-brand-700 text-white text-[11px] font-bold py-2.5 px-1 rounded-xl transition-all shadow-sm active:scale-95 text-center whitespace-nowrap"
                    >
                      Consult now
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openBookingModal(spec.title);
                      }}
                      className="border border-slate-200 hover:bg-slate-50 text-slate-600 text-[11px] font-bold py-2.5 px-1 rounded-xl transition-all active:scale-95 text-center whitespace-nowrap"
                    >
                      Consult later
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Concerns Panel */}
      <section id="concerns" className="py-14 bg-[#fafcfe] border-y border-slate-100/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-6">
            <div>
              <span className="text-xs font-bold text-brand-600 tracking-widest uppercase block mb-2">
                Live Symptom Matching
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-poppins">
                Identify Your Clinical Symptoms
              </h2>
              <p className="text-slate-500 mt-2 max-w-xl text-sm sm:text-base">
                Search or click common issues to seamlessly trigger the correct medical specialist matching engine.
              </p>
            </div>

            {/* Controls: Search, Slider Navigation, See All */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full lg:w-auto shrink-0">
              {/* Search Input */}
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  value={symptomSearchQuery}
                  onChange={(e) => setSymptomSearchQuery(e.target.value)}
                  placeholder="Search symptom..."
                  className="w-full bg-white border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 rounded-2xl px-4 py-2.5 pl-10 text-xs focus:outline-none shadow-sm transition-all text-slate-800 font-medium"
                />
                <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Slider Arrows & See All CTA */}
              <div className="flex items-center gap-2.5 justify-end">
                <button 
                  onClick={() => scrollSlider(concernsSliderRef, -1)}
                  className="w-10 h-10 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center shadow-sm active:scale-95 transition-all cursor-pointer"
                  title="Previous"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button 
                  onClick={() => scrollSlider(concernsSliderRef, 1)}
                  className="w-10 h-10 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center shadow-sm active:scale-95 transition-all cursor-pointer"
                  title="Next"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                </button>
                
                <button
                  type="button"
                  onClick={() => setIsAllConcernsModalOpen(true)}
                  className="bg-brand-50 hover:bg-brand-100 text-brand-700 font-extrabold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-brand-100 shadow-sm"
                >
                  <span>See All</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" /></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Concerns Slider */}
          <div className="mt-12 relative">
            {filteredConcerns.length > 0 ? (
              <div
                ref={concernsSliderRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-6"
              >
                {filteredConcerns.map((c, idx) => (
                  <div
                    key={idx}
                    className="symptom-card flex-shrink-0 w-80 bg-white border border-slate-100 rounded-[28px] p-5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between snap-start"
                  >
                    <div>
                      <SymptomIllustration symptomKey={c.key} imageUrl={symptomImgMap[c.key]} className="h-44" />
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-base font-bold text-slate-800 font-poppins">{c.name}</h3>
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                          {c.count}
                        </span>
                      </div>
                      <p className="text-xs text-brand-600 font-semibold mb-4">Recommended: {c.specialist}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-2 border-t border-slate-100 pt-4">
                      <button
                        onClick={() => openBookingModal(c.specialist)}
                        className="bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white text-xs font-bold py-3 px-4 rounded-xl transition-all shadow-md shadow-brand-100 active:scale-95"
                      >
                        Consult
                      </button>
                      <a
                        href={`https://wa.me/919861787335?text=Hi,%20I%20am%20facing%20${encodeURIComponent(c.name)}%20and%20would%20like%20to%20connect%20with%20a%20doctor.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-emerald-100 bg-emerald-50/55 hover:bg-emerald-50 text-emerald-800 text-xs font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5 active:scale-95"
                      >
                        <svg className="w-3.5 h-3.5 fill-emerald-600" viewBox="0 0 448 512">
                          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                        </svg>
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-slate-400 py-12 font-medium">
                No symptoms match your search. Try searching for &quot;Fever&quot;, &quot;Cough&quot;, &quot;PCOS&quot;, or connect directly to a General Physician.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* See All Symptoms Modal */}
      <div
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300 ${
          isAllConcernsModalOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`bg-[#fafcfe] w-full max-w-5xl rounded-[32px] shadow-2xl border border-slate-100 p-6 sm:p-8 transition-all duration-300 overflow-y-auto max-h-[85vh] scrollbar-hide ${
            isAllConcernsModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-poppins">All Clinical Symptoms</h3>
              <p className="text-xs text-slate-500 mt-1">Select a symptom to connect directly with the recommended clinical specialist.</p>
            </div>
            <button
              onClick={() => setIsAllConcernsModalOpen(false)}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all cursor-pointer active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Grid of all concerns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {concerns.map((c, idx) => (
              <div
                key={idx}
                className="symptom-card w-full bg-white border border-slate-100 rounded-[28px] p-5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <SymptomIllustration symptomKey={c.key} imageUrl={symptomImgMap[c.key]} className="h-36" />
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-bold text-slate-800 font-poppins leading-tight">{c.name}</h3>
                    <span className="text-[9px] font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100 whitespace-nowrap shrink-0">
                      {c.count}
                    </span>
                  </div>
                  <p className="text-[10px] text-brand-600 font-semibold mb-4">Recommended: {c.specialist}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2 border-t border-slate-100 pt-4">
                  <button
                    onClick={() => {
                      setIsAllConcernsModalOpen(false);
                      openBookingModal(c.specialist);
                    }}
                    className="bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-[10px] font-bold py-2.5 px-3 rounded-xl transition-all shadow-md shadow-brand-100 active:scale-95"
                  >
                    Consult
                  </button>
                  <a
                    href={`https://wa.me/919861787335?text=Hi,%20I%20am%20facing%20${encodeURIComponent(c.name)}%20and%20would%20like%20to%20connect%20with%20a%20doctor.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-emerald-100 bg-emerald-50/55 hover:bg-emerald-50 text-emerald-800 text-[10px] font-bold py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1 active:scale-95"
                  >
                    <svg className="w-3 h-3 fill-emerald-600" viewBox="0 0 448 512">
                      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                    </svg>
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* See All Specialties Modal */}
      <div
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300 ${
          isAllSpecialitiesModalOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`bg-[#fafcfe] w-full max-w-5xl rounded-[32px] shadow-2xl border border-slate-100 p-6 sm:p-8 transition-all duration-300 overflow-y-auto max-h-[85vh] scrollbar-hide ${
            isAllSpecialitiesModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-poppins">All Specialties</h3>
              <p className="text-xs text-slate-500 mt-1">Select a specialty to consult with our medical council practitioners.</p>
            </div>
            <button
              onClick={() => setIsAllSpecialitiesModalOpen(false)}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all cursor-pointer active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Grid of all specialties */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {specialities.map((spec, i) => {
              const displayTitle = {
                "General Physician": "General Physician",
                "Medicine Specialist": "Internal Medicine",
                "Sexologist": "Sexology",
                "Gynaecologist": "Gynaecology",
                "Endocrinologist": "Endocrinology",
                "General Surgeon": "General Surgery",
                "Psychiatrist": "Psychiatry",
                "Gastroenterologist": "Gastroenterology",
                "Mental Health": "Mental Health"
              }[spec.title] || spec.title;

              return (
                <div
                  key={i}
                  onClick={() => {
                    setIsAllSpecialitiesModalOpen(false);
                    openBookingModal(spec.title);
                  }}
                  className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-lg hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col items-center text-center"
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4 group-hover:scale-105 transition-transform shadow-md border border-slate-100 flex items-center justify-center bg-slate-50">
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
                      alt={displayTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <h3 className="text-base font-bold text-slate-800 font-poppins mb-1 tracking-tight">
                    {displayTitle}
                  </h3>

                  <p className="text-[11px] text-slate-400 font-medium mb-3 px-2 leading-relaxed">
                    {spec.desc}
                  </p>
                  
                  <p className="text-slate-500 text-xs font-semibold mb-5 font-dmsans">
                    {spec.fee}
                  </p>

                  <div className="grid grid-cols-2 gap-2 w-full mt-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsAllSpecialitiesModalOpen(false);
                        openBookingModal(spec.title);
                      }}
                      className="bg-brand-600 hover:bg-brand-700 text-white text-[10px] font-bold py-2 px-1 rounded-xl transition-all shadow-sm active:scale-95 text-center whitespace-nowrap"
                    >
                      Consult now
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsAllSpecialitiesModalOpen(false);
                        openBookingModal(spec.title);
                      }}
                      className="border border-slate-200 hover:bg-slate-50 text-slate-600 text-[10px] font-bold py-2 px-1 rounded-xl transition-all active:scale-95 text-center whitespace-nowrap"
                    >
                      Consult later
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Why Trust Us Section */}
      <section id="why-trust-us" className="py-8 relative overflow-hidden" style={{ backgroundColor: '#faf5ec' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-brand-600 tracking-widest uppercase block mb-2">
              Our Quality Standard
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-poppins">
              Why Patients Trust Addy Fitness
            </h2>
            <p className="text-slate-500 mt-2 text-sm sm:text-base">
              Pioneering safe, encrypted digital diagnostics tied directly with legal medical compliance protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Trust Card 1 */}
            <div className="bg-[#fafcfe] border border-slate-100 rounded-[28px] p-6 hover:shadow-xl hover:border-brand-200 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-50 text-brand-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-slate-800 font-poppins mb-2">Confidential 1 on 1</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Encrypted high-definition channels keeping medical history strictly confidential between provider and patient.
              </p>
            </div>

            {/* Trust Card 2 */}
            <div className="bg-[#fafcfe] border border-slate-100 rounded-[28px] p-6 hover:shadow-xl hover:border-brand-200 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-slate-800 font-poppins mb-2">Digital Prescription</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Instantly download legal e-prescriptions with verified doctor digital stamps accepted at all major pharmacies.
              </p>
            </div>

            {/* Trust Card 3 */}
            <div className="bg-[#fafcfe] border border-slate-100 rounded-[28px] p-6 hover:shadow-xl hover:border-brand-200 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-slate-800 font-poppins mb-2">98% Clear Rating</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Top clarity scoring where doctors explain diagnostics clearly without complex clinical medical jargon.
              </p>
            </div>

            {/* Trust Card 4 */}
            <div className="bg-[#fafcfe] border border-slate-100 rounded-[28px] p-6 hover:shadow-xl hover:border-brand-200 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-slate-800 font-poppins mb-2">Instant Prescription</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                No clinic travel time or delays. Connect, get examined, and receive help in less than 10 minutes.
              </p>
            </div>

            {/* Trust Card 5 (AddyFitness Segment) */}
            <div className="bg-gradient-to-tr from-[#0284c7] to-[#4338ca] border border-brand-400 rounded-[28px] p-6 text-white shadow-xl hover:shadow-brand-200/50 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group flex flex-col justify-between">
              <div className="absolute -right-8 -bottom-8 w-28 h-28 bg-white/10 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 bg-white/15 text-white rounded-2xl flex items-center justify-center">
                    <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3.05 11H5M19 11h1.95M12 3v18M12 3l3 3m-3-3L9 6m3 15l3-3m-3 3l-3-3" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-1 bg-emerald-500/80 px-2 py-0.5 rounded text-[9px] font-bold">
                    <span>74 bpm</span>
                  </div>
                </div>
                <h3 className="text-base font-bold font-poppins mb-1.5">AddyFitness Sync</h3>
                <p className="text-[11px] text-slate-100 leading-relaxed font-normal">
                  Coordinated therapeutic routines linking physical therapy and diet alongside prescription metrics with{" "}
                  <span className="underline">www.addyfitness.com</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Medical Council Section */}
      <section id="doctors" className="py-14 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-brand-600 tracking-widest uppercase block mb-2">
              Our Digital Council
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-poppins">
              Meet Active Registered Doctors
            </h2>
            <p className="text-slate-500 mt-2 text-sm sm:text-base">
              Each panelist maintains a pristine license registration and years of dedicated clinical expertise.
            </p>
          </div>

          {/* Doctor Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {doctors.map((doc, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-[28px] p-6 text-center shadow-sm hover:shadow-lg hover:border-brand-200 transition-all duration-300">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className={`w-full h-full rounded-full p-1 bg-gradient-to-tr ${doc.gradient || "from-brand-500 to-indigo-400"}`}>
                    <div className="w-full h-full bg-slate-100 rounded-full overflow-hidden flex items-center justify-center relative border border-white">
                      <img 
                        src={doc.img && (doc.img.startsWith("http") || doc.img.startsWith("/")) ? doc.img : `https://placehold.co/150x150/${
                          i % 5 === 0 ? "e0f2fe/075985" :
                          i % 5 === 1 ? "e2fbf0/047857" :
                          i % 5 === 2 ? "fce7f3/be185d" :
                          i % 5 === 3 ? "fef3c7/d97706" :
                          "f3e8ff/6b21a8"
                        }?text=${encodeURIComponent(doc.img || doc.name)}`} 
                        alt={doc.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  </div>
                  <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
                </div>
                
                <span className={`inline-block text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-3 ${
                  i % 5 === 0 ? "bg-brand-50 text-brand-700" :
                  i % 5 === 1 ? "bg-cyan-50 text-cyan-700" :
                  i % 5 === 2 ? "bg-emerald-50 text-emerald-700" :
                  i % 5 === 3 ? "bg-pink-50 text-pink-700" :
                  "bg-violet-50 text-violet-700"
                }`}>
                  {doc.spec}
                </span>
                
                <h3 className="text-sm sm:text-base font-bold text-slate-800 font-poppins min-h-[3rem] flex items-center justify-center leading-tight">{doc.name}</h3>
                <p className="text-xs text-slate-400">{doc.exp}</p>
                
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-600 font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    Live Online
                  </span>
                  <button onClick={() => openBookingModal(doc.focus)} className="bg-slate-50 hover:bg-brand-500 hover:text-white border border-slate-200 hover:border-brand-500 text-slate-700 font-bold px-4 py-2 rounded-xl transition-all text-xs">
                    Consult
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-14 bg-[#0b0f19] relative overflow-hidden">
        {/* Floating grid dots decoration */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase mb-4 border" style={{ background: 'rgba(225,29,72,0.1)', borderColor: 'rgba(225,29,72,0.25)', color: '#fb7185' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping inline-block" />
              Booking Flow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-poppins mb-3 leading-tight" style={{ color: '#ffffff' }}>
              Three Steps To{' '}
              <span style={{ background: 'linear-gradient(90deg, #fb7185, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Connected Care
              </span>
            </h2>
            <p className="text-sm sm:text-base" style={{ color: 'rgba(148,163,184,0.9)' }}>
              Follow this step-by-step flow to connect with a registered physician instantly.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">

            {/* Connecting dashed line 1 (Step 1 -> Step 2) */}
            <div className="hidden md:flex absolute top-[72px] left-[calc(16.6%+45px)] right-[calc(50%+45px)] items-center justify-center z-0 pointer-events-none gap-1">
              <div className="flex-1 h-[2px] border-t-2 border-dashed" style={{ borderColor: 'rgba(148,163,184,0.25)' }} />
              <svg className="w-4 h-4 text-indigo-400/60" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.22 19.03a.75.75 0 010-1.06l5.47-5.47H3a.75.75 0 010-1.5h15.69l-5.47-5.47a.75.75 0 011.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 01-1.06 0z" />
              </svg>
            </div>

            {/* Connecting dashed line 2 (Step 2 -> Step 3) */}
            <div className="hidden md:flex absolute top-[72px] left-[calc(50%+45px)] right-[calc(16.6%+45px)] items-center justify-center z-0 pointer-events-none gap-1">
              <div className="flex-1 h-[2px] border-t-2 border-dashed" style={{ borderColor: 'rgba(148,163,184,0.25)' }} />
              <svg className="w-4 h-4 text-emerald-400/60" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.22 19.03a.75.75 0 010-1.06l5.47-5.47H3a.75.75 0 010-1.5h15.69l-5.47-5.47a.75.75 0 011.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 01-1.06 0z" />
              </svg>
            </div>

            {/* Step 1 */}
            <div className="group relative rounded-[28px] p-6 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 cursor-default z-10" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(251,113,133,0.4)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
            >
              <div className="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(251,113,133,0.08) 0%, transparent 70%)' }} />

              {/* Step number orb */}
              <div className="relative w-14 h-14 mb-4 z-10">
                <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: 'linear-gradient(135deg, #f43f5e, #fb7185)', animationDuration: '3s' }} />
                <div className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl" style={{ background: 'linear-gradient(135deg, #e11d48, #f43f5e)', boxShadow: '0 0 30px rgba(225,29,72,0.35)' }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-black" style={{ background: '#0f172a', borderColor: '#f43f5e', color: '#f43f5e' }}>1</div>
              </div>

              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase mb-3" style={{ background: 'rgba(251,113,133,0.12)', color: '#fb7185' }}>Step One</span>

              <h3 className="text-xl font-bold font-poppins mb-3" style={{ color: '#f1f5f9' }}>Select Your Symptom</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(148,163,184,0.85)' }}>
                Choose from our specialized medical fields, or use our live AI-filter to instantly match your symptoms to the right specialist.
              </p>

              <div className="mt-6 w-12 h-1 rounded-full" style={{ background: 'linear-gradient(90deg, #e11d48, #f43f5e)' }} />
            </div>

            {/* Step 2 */}
            <div className="group relative rounded-[28px] p-6 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 cursor-default z-10" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(129,140,248,0.4)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
            >
              <div className="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 70%)' }} />

              {/* Step number orb */}
              <div className="relative w-14 h-14 mb-4 z-10">
                <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: 'linear-gradient(135deg, #6366f1, #818cf8)', animationDuration: '3s', animationDelay: '1s' }} />
                <div className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl" style={{ background: 'linear-gradient(135deg, #4f46e5, #6366f1)', boxShadow: '0 0 30px rgba(99,102,241,0.35)' }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-black" style={{ background: '#0f172a', borderColor: '#6366f1', color: '#818cf8' }}>2</div>
              </div>

              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase mb-3" style={{ background: 'rgba(99,102,241,0.12)', color: '#818cf8' }}>Step Two</span>

              <h3 className="text-xl font-bold font-poppins mb-3" style={{ color: '#f1f5f9' }}>Pay &amp; Connect Securely</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(148,163,184,0.85)' }}>
                Submit your health metrics in one simplified stage, finalize your secure booking, and instantly receive your confirmed consultation details.
              </p>

              <div className="mt-6 w-12 h-1 rounded-full" style={{ background: 'linear-gradient(90deg, #4f46e5, #818cf8)' }} />
            </div>

            {/* Step 3 */}
            <div className="group relative rounded-[28px] p-6 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 cursor-default z-10" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(16,185,129,0.4)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
            >
              <div className="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(16,185,129,0.08) 0%, transparent 70%)' }} />

              {/* Step number orb */}
              <div className="relative w-14 h-14 mb-4 z-10">
                <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: 'linear-gradient(135deg, #10b981, #34d399)', animationDuration: '3s', animationDelay: '2s' }} />
                <div className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl" style={{ background: 'linear-gradient(135deg, #059669, #10b981)', boxShadow: '0 0 30px rgba(16,185,129,0.35)' }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-black" style={{ background: '#0f172a', borderColor: '#10b981', color: '#34d399' }}>3</div>
              </div>

              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase mb-3" style={{ background: 'rgba(16,185,129,0.12)', color: '#34d399' }}>Step Three</span>

              <h3 className="text-xl font-bold font-poppins mb-3" style={{ color: '#f1f5f9' }}>Get Your Prescription</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(148,163,184,0.85)' }}>
                Download your digitally stamped legal prescription instantly, request follow-up schedules, and sync your fitness care plan.
              </p>

              <div className="mt-6 w-12 h-1 rounded-full" style={{ background: 'linear-gradient(90deg, #10b981, #34d399)' }} />
            </div>

          </div>

          {/* Booking CTA Button inside the flow */}
          <div className="text-center mt-12 relative z-20">
            <button
              onClick={() => openBookingModal()}
              className="bg-gradient-to-r from-brand-500 to-indigo-500 hover:from-brand-600 hover:to-indigo-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-98 text-sm tracking-wide inline-flex items-center gap-2 cursor-pointer"
            >
              Start Your Consultation Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <p className="mt-3 text-xs" style={{ color: 'rgba(148,163,184,0.6)' }}>No appointment needed · Available 24/7 · MCI-verified doctors</p>
          </div>

        </div>
      </section>
      {/* Why Trust Us — Merged Section */}
      <section className="py-10 bg-gradient-to-b from-white to-[#faf6f0]/30 relative overflow-hidden">
        {/* Subtle background blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand-50/40 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-50/30 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Centered Heading */}
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="text-xs font-extrabold text-brand-600 tracking-widest uppercase block mb-1.5">Our Advantage Matrix</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-poppins leading-tight">
              Expert Virtual Consultations &amp; Instant Digital Prescriptions
            </h2>
            <p className="text-slate-500 mt-2 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
              Skip the waiting room &mdash; connect with verified doctors online, get a diagnosis, and receive your digital prescription instantly from home.
            </p>
          </div>

          {/* Grid Container for USPs only (Graph removed) - Realigned & Animated */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03] flex flex-col items-center text-center hover:border-brand-200">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shadow-sm mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-sm font-bold text-slate-800 font-poppins mb-2">24&times;7 Expert Consultations</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Connect with certified doctors anytime through instant chat or scheduled video consultations.</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03] flex flex-col items-center text-center hover:border-indigo-200">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-sm mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-sm font-bold text-slate-800 font-poppins mb-2">Quick &amp; Hassle-Free</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Book your consultation in minutes and receive expert guidance from the comfort of your home.</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03] flex flex-col items-center text-center hover:border-teal-200">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shadow-sm mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <h3 className="text-sm font-bold text-slate-800 font-poppins mb-2">Secure &amp; Confidential</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Your health records and prescriptions are protected with complete privacy and AES-256 encryption.</p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03] flex flex-col items-center text-center hover:border-amber-200">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-sm mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-.553.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="text-sm font-bold text-slate-800 font-poppins mb-2">Clinic-Like Experience</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Enjoy personalized one-on-one video consultations with the same care as an in-person visit.</p>
            </div>

            {/* Card 5 */}
            <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03] flex flex-col items-center text-center hover:border-emerald-200">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-sm mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <h3 className="text-sm font-bold text-slate-800 font-poppins mb-2">Digital Prescription &amp; Follow-Up</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Receive a verified digital prescription and complimentary follow-up support to keep your treatment on track.</p>
            </div>
          </div>

        </div>
      </section>
            {/* FAQ Section */}
      <section className="py-14 bg-slate-50 relative border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-brand-600 tracking-widest uppercase block mb-2">
              Patient Queries
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-poppins">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 mt-2 text-sm sm:text-base">
              Everything you need to know about credentials, billing policies, and medical legality.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What credentials do Addy Fitness doctors hold?",
                a: "Every single general practitioner and clinical specialist on our portal is carefully vetted against national medical licensing databases. They hold verified MBBS, MD, MS, or PhD qualifications with extensive experience in physical outpatient facilities."
              },
              {
                q: "Is my private digital prescription valid at physical pharmacies?",
                a: "Absolutely. Your downloadable consultation prescription contains direct digital registry signatures, official clinic stamps, and registered MCI/council license numbers, making them completely compliant with national telemedicine mandates and legal pharmacy regulations."
              },
              {
                q: "How long does it take to connect with an active online doctor?",
                a: "Our average triage and connection speed is under 10 minutes. Based on specialty workloads, we automatically pipeline you with secondary on-call clinicians if your primary provider is handling an active video consultation."
              },
              {
                q: "How does the AddyFitness physical lifestyle syncing work?",
                a: "When you opt-in for our complementary fitness plan syncing during the booking process, your dynamic metabolic diagnostic recommendations are linked securely with exercise regimes structured by the physiologists at www.addyfitness.com. This bridges pharmacological therapy and metabolic movement seamlessly."
              }
            ].map((faq, idx) => (
              <div key={idx} className="border border-slate-200/60 bg-white rounded-3xl overflow-hidden shadow-sm transition-all duration-300">
                <button
                  onClick={() => setActiveFAQIndex(activeFAQIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors text-left focus:outline-none"
                >
                  <span className="font-bold text-slate-800 text-sm sm:text-base font-poppins">{faq.q}</span>
                  <svg
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ${activeFAQIndex === idx ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className="transition-all duration-300 ease-out bg-white overflow-hidden"
                  style={{ maxHeight: activeFAQIndex === idx ? "200px" : "0px" }}
                >
                  <div className="p-6 text-xs sm:text-sm text-slate-500 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 pt-16 pb-11 relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            
            {/* Brand block */}
            <div className="lg:col-span-2">
              <div className="flex flex-col sm:flex-row items-center gap-6 text-left">
                <img
                  src="/logo.png"
                  alt="Addy Fitness Logo"
                  className="rounded-lg object-contain shrink-0"
                  style={{ width: '200px', height: '200px' }}
                />
                <div className="space-y-4">
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
                    Addy Fitness is a premier clinical triage ecosystem, connecting patients directly with certified National Medical Council practitioners for secure virtual diagnosis, outpatient prescriptions, and continuous fitness health sync.
                  </p>
                  <div className="flex gap-2 items-center text-xs text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-xl w-fit">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                    <span>38 active medical council panel members online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Links 1: Specialities */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-poppins">Specialities</h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                {['General Physician', 'Medicine Specialist', 'Sexologist', 'Gynaecologist', 'Psychiatrist', 'Gastroenterologist'].map(item => (
                  <li key={item}>
                    <button onClick={() => openBookingModal(item)} className="hover:text-white transition-colors text-left cursor-pointer">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links 2: Trust & Support */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-poppins">Legal & Trust</h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li><span className="text-slate-500">Privacy Policy</span></li>
                <li><span className="text-slate-500">Terms & Consent</span></li>
                <li><span className="text-slate-500">MCI Guidelines Compliance</span></li>
                <li><span className="text-slate-500">Telemedicine Act 2020</span></li>
                <li><span className="text-slate-500">24/7 Clinical Support</span></li>
              </ul>
            </div>

          </div>

          <div className="border-t border-slate-800 pt-3 flex flex-col items-center justify-center text-center">
            <p className="text-[11px] text-slate-500">
              © 2026 Addy Fitness. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Streamlined Booking Modal */}
      <div
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300 ${
          isBookingModalOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className={`bg-white w-full max-w-lg rounded-[24px] sm:rounded-[32px] shadow-2xl border border-slate-100 p-4.5 sm:p-8 transition-all duration-300 overflow-y-auto max-h-[90vh] scrollbar-hide ${
            isBookingModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          {/* Header Block */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-poppins">Direct Doctor Consultation</h3>
              <p className="text-xs text-slate-500 mt-1">
                Fill out the quick patient parameters below to pay and connect instantly.
              </p>
            </div>
            <button
              onClick={closeBookingModal}
              className="w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-600 flex items-center justify-center transition-all focus:outline-none"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Step 1: Form */}
          {bookingStep === "form" && (
            <form onSubmit={submitSimplifiedBooking} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                  Patient Full Name
                </label>
                <input
                  type="text"
                  value={bookingName}
                  onChange={(e) => setBookingName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:bg-white rounded-xl px-4 py-3 text-xs focus:outline-none transition-all text-slate-800 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={bookingPhone}
                  onChange={(e) => setBookingPhone(e.target.value)}
                  placeholder="9876543210"
                  required
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:bg-white rounded-xl px-4 py-3 text-xs focus:outline-none transition-all text-slate-800 font-medium"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Age</label>
                  <input
                    type="number"
                    value={bookingAge}
                    onChange={(e) => setBookingAge(e.target.value)}
                    placeholder="28"
                    required
                    min="1"
                    max="120"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:bg-white rounded-xl px-3 py-3 text-xs focus:outline-none transition-all text-slate-800 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    value={bookingHeight}
                    onChange={(e) => setBookingHeight(e.target.value)}
                    placeholder="175"
                    required
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:bg-white rounded-xl px-3 py-3 text-xs focus:outline-none transition-all text-slate-800 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={bookingWeight}
                    onChange={(e) => setBookingWeight(e.target.value)}
                    placeholder="70"
                    required
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:bg-white rounded-xl px-3 py-3 text-xs focus:outline-none transition-all text-slate-800 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                  Choose Medical Focus
                </label>
                <select
                  value={bookingSpeciality}
                  onChange={(e) => setBookingSpeciality(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:bg-white rounded-xl px-4 py-3 text-xs font-semibold text-slate-800 focus:outline-none transition-all"
                >
                  <option value="General Physician">General Physician (₹699)</option>
                  <option value="Medicine Specialist">Medicine Specialist (₹699)</option>
                  <option value="Sexologist">Sexologist (₹699)</option>
                  <option value="Gynaecologist">Gynaecologist (₹699)</option>
                  <option value="Endocrinologist">Endocrinologist (₹699)</option>
                  <option value="General Surgeon">General Surgeon (₹699)</option>
                  <option value="Psychiatrist">Psychiatrist (₹699)</option>
                  <option value="Gastroenterologist">Gastroenterologist (₹699)</option>
                  <option value="Mental Health">Mental Health (₹799)</option>
                </select>
              </div>

              {/* Date & Time Picker Row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={appointmentDateVal}
                    onChange={(e) => setAppointmentDateVal(e.target.value)}
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:bg-white rounded-xl px-3.5 py-3 text-xs focus:outline-none transition-all text-slate-800 font-semibold cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Preferred Time
                  </label>
                  <input
                    type="time"
                    value={appointmentTimeVal}
                    onChange={(e) => setAppointmentTimeVal(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:bg-white rounded-xl px-3.5 py-3 text-xs focus:outline-none transition-all text-slate-800 font-semibold cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                  Briefly Describe Your Concern
                </label>
                <textarea
                  value={bookingSymptoms}
                  onChange={(e) => setBookingSymptoms(e.target.value)}
                  placeholder="Type primary symptom details here (e.g., headache for 3 days, metabolic tracking)..."
                  rows="3"
                  required
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:bg-white rounded-xl px-4 py-3 text-xs focus:outline-none transition-all resize-none text-slate-800"
                />
              </div>

              <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-4 flex items-start gap-3 mt-2">
                <input
                  type="checkbox"
                  id="sync-addy"
                  checked={syncAddy}
                  onChange={(e) => setSyncAddy(e.target.checked)}
                  className="mt-1 rounded border-indigo-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                />
                <label
                  htmlFor="sync-addy"
                  className="text-[11px] text-indigo-900 leading-relaxed cursor-pointer select-none"
                >
                  <span className="block font-bold">Synchronize with www.addyfitness.com</span>
                  Share session parameters to generate custom metabolic lifestyle workout targets automatically alongside clinical care plans.
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white font-bold py-4 px-6 rounded-2xl shadow-xl shadow-brand-100 hover:shadow-brand-200 transition-all active:scale-95 flex items-center justify-center gap-2 montserrat-font text-xs uppercase tracking-wider mt-4"
              >
                <span>Book your appointment</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          )}

          {bookingStep === "loading" && (
            <div className="text-center py-12 space-y-6 flex flex-col items-center">
              <div className="relative">
                <div className="animate-spin rounded-full h-20 w-20 border-4 border-brand-500 border-t-transparent" />
                <div className="absolute inset-0 flex items-center justify-center font-bold text-xs text-brand-600">
                  triage
                </div>
              </div>
              <h4 className="text-lg font-bold text-slate-800 font-poppins">Confirming Booking...</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                Registering your consultation request and generating your booking ID...
              </p>
              <div className="text-[11px] text-indigo-600 font-bold bg-indigo-50 px-3 py-1.5 rounded-full inline-block">
                Estimated Wait: 2s
              </div>
            </div>
          )}

          {/* ── Thank-You Confirmation Screen ── */}
          {bookingStep === "confirmed" && (() => {
            const shareUrl = typeof window !== "undefined"
              ? `${window.location.origin}/booking/${bookingConfirmedId}`
              : `https://addyfitness.com/booking/${bookingConfirmedId}`;
            return (
              <div className="text-center py-4 flex flex-col items-center gap-5">
                {/* Modern Animated Success Checkmark Ring */}
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-20 h-20 rounded-full bg-emerald-500/10 animate-ping" style={{ animationDuration: '3s' }} />
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center relative z-10">
                    <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-black text-slate-900 font-poppins">Booking Confirmed!</h4>
                  <p className="text-[11px] text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong className="text-slate-800 font-bold">{bookingName || "Patient"}</strong>. Your medical consultation request has been successfully registered and routed to our specialist panel.
                  </p>
                </div>

                {/* Premium Ticket/Receipt Card */}
                <div className="w-full bg-slate-50/50 border border-slate-100 rounded-3xl p-5 text-left space-y-4 shadow-inner relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-brand-500/5 rounded-full blur-xl pointer-events-none" />
                  
                  {/* Card Header */}
                  <div className="border-b border-slate-200/50 pb-3 flex justify-between items-center">
                    <div>
                      <span className="text-[9px] text-slate-400 uppercase font-black tracking-widest">Consultation Ref</span>
                      <h5 className="text-base font-black text-brand-600 font-poppins mt-0.5">{bookingConfirmedId || "AFDC---"}</h5>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] text-slate-400 uppercase font-black tracking-widest block">Status</span>
                      <span className="inline-flex items-center gap-1 text-[9px] bg-emerald-50 border border-emerald-100 text-emerald-700 font-bold px-2.5 py-0.5 rounded-full mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Active
                      </span>
                    </div>
                  </div>

                  {/* Receipt Details Grid */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 text-[11px]">
                    <div>
                      <span className="block text-[9px] text-slate-400 font-black uppercase tracking-widest mb-0.5">Patient Name</span>
                      <span className="font-semibold text-slate-800 truncate block">{bookingName || "Patient"}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] text-slate-400 font-black uppercase tracking-widest mb-0.5">Requested Time</span>
                      <span className="font-semibold text-slate-800 block">{bookingConfirmedTime || "Just now"}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="block text-[9px] text-slate-400 font-black uppercase tracking-widest mb-0.5">Focus Specialty / Domain</span>
                      <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-brand-500" />
                        {bookingSpeciality}
                      </span>
                    </div>
                    {bookingSymptoms && (
                      <div className="col-span-2">
                        <span className="block text-[9px] text-slate-400 font-black uppercase tracking-widest mb-0.5">Reported Concern / Symptoms</span>
                        <div className="text-slate-600 leading-relaxed italic bg-white border border-slate-100 rounded-2xl px-4 py-2.5 text-[11px] font-medium shadow-sm">
                          "{bookingSymptoms}"
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Shareable Link Block */}
                  <div className="border-t border-slate-200/50 pt-4">
                    <span className="block text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1.5">Shareable Consultation URL</span>
                    <div className="flex gap-2 items-center bg-white border border-slate-100 rounded-2xl p-1 shadow-sm">
                      <span className="text-[10px] text-slate-500 font-mono truncate flex-1 pl-3 select-all">
                        {shareUrl}
                      </span>
                      <button
                        onClick={() => copyToClipboard(shareUrl)}
                        className={`flex items-center gap-1.5 text-[10px] font-bold px-3.5 py-2 rounded-xl transition-all active:scale-95 cursor-pointer shrink-0 ${
                          copied
                            ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                            : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-100"
                        }`}
                      >
                        {copied ? (
                          <>
                            <svg className="w-3 h-3 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m-7 8H9m0-3h3m0-3h3" />
                            </svg>
                            <span>Copy URL</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Single Primary Finish Action */}
                <div className="w-full mt-2">
                  <button
                    onClick={closeBookingModal}
                    className="w-full bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white font-bold py-4 px-6 rounded-2xl transition-all text-xs uppercase tracking-wider active:scale-95 shadow-lg shadow-brand-500/25 cursor-pointer font-poppins"
                  >
                    Finish &amp; Return
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      </div>



      {/* Floating Sandbox AI Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* Chat Window Panel */}
        <div
          className={`bg-white border border-slate-100/80 shadow-2xl rounded-[28px] overflow-hidden w-[350px] sm:w-[380px] h-[480px] max-h-[80vh] flex flex-col mb-4 transition-all duration-300 transform origin-bottom-right ${
            isChatOpen ? "scale-100 opacity-100 visible" : "scale-90 opacity-0 invisible"
          }`}
        >
          {/* Header */}
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
                <h4 className="text-xs font-bold font-poppins">Clinical Support Bot</h4>
                <p className="text-[9px] text-slate-400 font-medium">Automated Triage Terminal</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[8px] bg-slate-800 text-indigo-300 px-2 py-0.5 rounded font-extrabold uppercase tracking-wider">Demo Sandbox</span>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Chat Messages Console */}
          <div
            ref={sandboxChatOutputRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 scrollbar-hide text-xs"
          >
            {sandboxMessages.map((msg, idx) => (
              <div key={idx} className={`flex gap-2 ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
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
                    ? 'bg-brand-600 text-white rounded-tr-sm font-medium'
                    : 'bg-white border border-slate-100/70 text-slate-700 rounded-tl-sm'
                }`}>
                  {msg.text.split('\n\n').map((para, pIdx) => {
                    if (para.startsWith('**Triage recommendation:**')) {
                      return (
                        <p key={pIdx} className="mb-1.5">
                          <strong>Suggested Specialist:</strong>{' '}
                          <span className="text-brand-600 font-extrabold">{msg.recommendation}</span>
                        </p>
                      );
                    }
                    
                    let elements = [];
                    let lastIdx = 0;
                    const regex = /\*\*(.*?)\*\*/g;
                    let match;
                    while ((match = regex.exec(para)) !== null) {
                      if (match.index > lastIdx) {
                        elements.push(para.substring(lastIdx, match.index));
                      }
                      elements.push(<strong key={match.index} className="font-extrabold text-slate-900">{match[1]}</strong>);
                      lastIdx = regex.lastIndex;
                    }
                    if (lastIdx < para.length) {
                      elements.push(para.substring(lastIdx));
                    }
                    
                    return <p key={pIdx} className="mb-1 last:mb-0">{elements}</p>;
                  })}
                  {msg.recommendation && (
                    <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          setIsChatOpen(false);
                          openBookingModal(msg.recommendation);
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
                        <svg className="w-3.5 h-3.5 fill-current flex-shrink-0" viewBox="0 0 448 512">
                          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                        </svg>
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
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 448 512">
                          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                        </svg>
                        <span>Chat on WhatsApp</span>
                      </a>
                    </div>
                  )}
                </div>
                {msg.isUser && (
                  <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
            {isSandboxAnalyzing && (
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

          {/* Quick Chips */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto scrollbar-hide shrink-0">
            <span className="text-[9px] text-slate-400 font-semibold self-center shrink-0">Try:</span>
            {['Fever & Cold', 'Diabetes Care', 'Fatty Liver', 'Anxiety issue', 'Low Libido'].map(chip => (
              <button
                key={chip}
                onClick={() => sendSandboxChip(chip)}
                className="bg-slate-50 hover:bg-brand-50 border border-slate-100 hover:border-brand-200 text-slate-600 hover:text-brand-600 transition-all font-semibold rounded-full px-2.5 py-1 text-[9px] cursor-pointer whitespace-nowrap active:scale-95"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-100 flex gap-2 items-center shrink-0">
            <input
              type="text"
              value={sandboxInput}
              onChange={(e) => setSandboxInput(e.target.value)}
              onKeyDown={handleSandboxEnter}
              placeholder="Describe your symptoms..."
              className="flex-1 bg-slate-50 border border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 rounded-xl px-3 py-2.5 text-[11px] focus:outline-none transition-all placeholder:text-slate-400 font-medium text-slate-800"
            />
            <button
              onClick={sendSandboxFreeText}
              className="bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white font-bold text-[10px] px-3.5 py-2.5 rounded-xl transition-all active:scale-95 shadow flex items-center gap-1 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span>Send</span>
            </button>
          </div>

          <p className="text-center text-slate-400 text-[8px] py-1 bg-white border-t border-slate-50 shrink-0 font-medium">
            🔒 Sandbox triage only. Not a medical advice substitute.
          </p>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-brand-600 to-indigo-600 text-white flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer relative"
          title="Sandbox AI Chat"
        >
          {isChatOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
          <span className="flex h-3 w-3 absolute -top-0.5 -right-0.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-white"></span>
          </span>
        </button>
      </div>
    </>
  );
}