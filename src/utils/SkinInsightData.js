export  const SKIN_TYPES = ["Normal", "Dry", "Oily", "Combination", "Sensitive"];

export  const CONCERNS = [
  { id: "acne", label: "Acne & Breakouts" },
  { id: "dry", label: "Dryness & Dehydration" },
  { id: "oily", label: "Oily Skin" },
  { id: "spots", label: "Dark Spots / Pigmentation" },
  { id: "ageing", label: "Ageing Signs" },
  { id: "pores", label: "Texture & Pores" },
  { id: "under-eye", label: "Under-Eye Issues" },
  { id: "redness", label: "Redness & Blotching" },
  { id: "Sun-Damage", label: "Sun Damage" },
];
export  const SUB_CONCERNS = {
  acne: ["Pimples", "Whiteheads", "Blackheads", "Scars"],
  dry: ["Flaky skin", "Tight skin", "Rough texture"],
  oily: ["Greasy shine", "Enlarged pores", "Breakouts"],
  spots: ["Dark spots", "Melasma", "Uneven tone"],
  ageing: ["Wrinkles", "Fine lines", "Sagging"],
  pores: ["Bumps", "Milia", "Clogged pores"],
  "under-eye": ["Dark circles", "Puffiness", "Fine lines"],
  redness: ["Facial flushing", "Rosacea", "Visible vessels"],
  "Sun-Damage": ["Sunburn", "Tanning", "Early wrinkles"],
};

export  const LIFESTYLE = [
  { id: "sun", label: "Long Sun Exposure" },
  { id: "stress", label: "Busy / Stressed" },
  { id: "sleep", label: "Minimal Sleep" },
  { id: "pollution", label: "Pollution Exposure" },
  { id: "indoor", label: "Mostly Indoors" },
];

export  const ROUTINE_LEVELS = [
  { id: "beginner", label: "Beginner (Cleanser + Moisturizer)" },
  { id: "intermediate", label: "Intermediate (add 1–2 treatments)" },
  { id: "advanced", label: "Advanced (full routine)" },
  { id: "none", label: "None at the moment" },
];

export  const GOALS = [
  { id: "bright", label: "Brighter & Even-Toned" },
  { id: "hydrate", label: "Hydrated & Plump" },
  { id: "antiage", label: "Youthful Glow (Anti-aging)" },
  { id: "clear", label: "Clear & Blemish-Free" },
  { id: "calm", label: "Calm & Balanced" },
];

/** Example product catalog (mock). Replace with your real SKUs later. */
export  const CATALOG = {
  cleanser: {
    Normal: {
      name: "pH Gentle Cleanser",
      reasons: ["Balances without stripping."],
    },
    Dry: {
      name: "Cream Cleanser",
      reasons: ["Non-foaming, protects barrier."],
    },
    Oily: {
      name: "Gel Cleanser",
      reasons: ["Cuts excess sebum, fresh finish."],
    },
    Combination: {
      name: "Low-foam Cleanser",
      reasons: ["Cleans T-zone, gentle on cheeks."],
    },
    Sensitive: {
      name: "Fragrance-free Cleanser",
      reasons: ["Ultra-gentle, minimal surfactants."],
    },
  },
  moisturizer: {
    Normal: {
      name: "Balancing Moisturizer",
      reasons: ["Lightweight daily hydration."],
    },
    Dry: {
      name: "Ceramide Rich Cream",
      reasons: ["Deeply nourishing, repairs barrier."],
    },
    Oily: {
      name: "Oil-free Gel Moisturizer",
      reasons: ["Hydration without shine."],
    },
    Combination: {
      name: "Light Lotion",
      reasons: ["Comforts dry areas, light on T-zone."],
    },
    Sensitive: {
      name: "Barrier Relief Cream",
      reasons: ["Soothes redness, fragrance-free."],
    },
  },
  spf: {
    any: {
      name: "SPF 50 PA++++",
      reasons: ["Daily broad-spectrum protection."],
    },
  },
  serums: {
    acne: {
      name: "2% BHA Serum",
      reasons: ["Clears pores, reduces breakouts."],
    },
    spots: {
      name: "15% Vitamin C Serum",
      reasons: ["Targets dark spots, brightens tone."],
    },
    arbutin: {
      name: "Alpha Arbutin 2%",
      reasons: ["Fades pigmentation gently."],
    },
    wrinkles: {
      name: "Peptide Serum",
      reasons: ["Supports firmness, softens lines."],
    },
    retinol: { name: "Retinol 0.3%", reasons: ["Cell turnover, anti-aging."] },
    redness: {
      name: "Centella + Allantoin Serum",
      reasons: ["Soothes redness, calms skin."],
    },
    tone: {
      name: "Niacinamide 10%",
      reasons: ["Balances oil, refines texture."],
    },
    dull: { name: "Lactic Acid 5%", reasons: ["Gentle exfoliation, glow."] },
    hydrate: {
      name: "Hyaluronic Acid Serum",
      reasons: ["Plumps with multi-weight HA."],
    },
    antioxidant: {
      name: "EGCG Antioxidant Serum",
      reasons: ["Pollution defense, reduces stress."],
    },
  },
};