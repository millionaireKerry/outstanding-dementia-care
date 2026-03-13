/**
 * Outstanding Dementia Care – Stripe Products & Prices
 * All amounts are in pence (GBP).
 */

export const PRODUCTS = {
  familyWorkshop: {
    name: "Family Dementia Workshop",
    description:
      "90-minute live Zoom session for families navigating dementia. " +
      "Includes live Q&A with Kerry Goodearl, dementia specialist.",
    amount: 2500, // £25.00 in pence
    currency: "gbp",
    priceId: null as string | null, // set after creating in Stripe dashboard
  },
  dementiaExperience: {
    name: "The Dementia Experience – Full Day Training",
    description:
      "Full-day immersive dementia training for care home teams (up to 10 delegates). " +
      "DTSF 2026 aligned. Delivered by Kerry Goodearl.",
    amount: 65000, // £650.00 in pence
    currency: "gbp",
    priceId: null as string | null,
  },
  excellenceProgramme: {
    name: "Dementia Excellence Programme – 3-Month Package",
    description:
      "Training day + follow-up coaching session + staff resources + family workshop option. " +
      "Ideal for homes seeking CQC improvement evidence.",
    amount: 175000, // £1,750.00 in pence
    currency: "gbp",
    priceId: null as string | null,
  },
} as const;

export type ProductKey = keyof typeof PRODUCTS;
