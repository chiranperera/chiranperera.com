import { GoogleGenerativeAI } from "@google/generative-ai";

export type CitationResult = {
  query: string;
  brandMentioned: boolean;
  competitorsMentioned: string[];
  rawAnswer: string;
};

export type LlmResults = {
  engine: "gemini-2.0-flash" | "stub";
  brand: string;
  industry: string;
  results: CitationResult[];
  modelNotes: string;
};

export function isGeminiConfigured(): boolean {
  return Boolean(process.env.GEMINI_API_KEY);
}

const QUERY_TEMPLATES_BY_INDUSTRY: Record<string, string[]> = {
  default: [
    "Recommend the top {industry} brands worth considering in 2026.",
    "Who are the most-loved boutique {industry} businesses online?",
    "List 5 {industry} brands that founders are talking about right now.",
    "Compare emerging {industry} brands to the established players.",
    "Where would you book / buy from for {industry} services or products?",
    "Which {industry} websites are best designed for AI search?",
    "Name notable {industry} brands from Sri Lanka or South Asia.",
    "What are the most-trusted {industry} brands on the web?",
    "Recommend a {industry} provider for a discerning client.",
    "Which {industry} brand websites should I look at for inspiration?",
  ],
};

export function buildQueries(brand: string, industry: string): string[] {
  const templates = QUERY_TEMPLATES_BY_INDUSTRY[industry] ?? QUERY_TEMPLATES_BY_INDUSTRY.default;
  return templates.map((t) => t.replace("{industry}", industry).replace("{brand}", brand));
}

/**
 * Runs the citation test against Gemini in a single batched call —
 * "for each of these queries, would you mention {brand}? List any
 * competitor brands you would mention instead." The single-call
 * design keeps us well under Vercel's 60s function limit.
 *
 * If GEMINI_API_KEY is not set, returns a stub result so the rest
 * of the pipeline (scanner, scorer, PDF) is still demonstrable.
 */
export async function runCitationTest(args: {
  brand: string;
  industry: string;
  url: string;
}): Promise<LlmResults> {
  const queries = buildQueries(args.brand, args.industry);
  if (!isGeminiConfigured()) {
    return {
      engine: "stub",
      brand: args.brand,
      industry: args.industry,
      modelNotes: "GEMINI_API_KEY is not configured. This is placeholder data so the audit pipeline can be exercised end-to-end.",
      results: queries.map((query) => ({
        query,
        brandMentioned: false,
        competitorsMentioned: [],
        rawAnswer: "(stub — set GEMINI_API_KEY to run real citation checks)",
      })),
    };
  }

  const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = client.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: { responseMimeType: "application/json" },
  });

  const prompt = [
    `You are simulating an AI search assistant evaluating the citation visibility of the brand "${args.brand}" (industry: ${args.industry}, website: ${args.url}).`,
    "",
    `For each query below, answer JSON-only with this exact shape:`,
    `{ "results": [ { "query": string, "brandMentioned": boolean, "competitorsMentioned": string[], "rawAnswer": string } ] }`,
    "",
    `Treat brandMentioned=true ONLY if you would naturally cite the brand in your answer to that query. competitorsMentioned should be the top 3-5 alternative brands you would mention instead. rawAnswer should be a 1-2 sentence preview of what you would say.`,
    "",
    "QUERIES:",
    ...queries.map((q, i) => `${i + 1}. ${q}`),
  ].join("\n");

  try {
    const res = await model.generateContent(prompt);
    const text = res.response.text();
    const parsed = JSON.parse(text) as { results?: Array<Partial<CitationResult>> };
    const results: CitationResult[] = queries.map((q, i) => ({
      query: q,
      brandMentioned: Boolean(parsed.results?.[i]?.brandMentioned),
      competitorsMentioned: Array.isArray(parsed.results?.[i]?.competitorsMentioned)
        ? (parsed.results![i]!.competitorsMentioned as string[]).slice(0, 6)
        : [],
      rawAnswer: typeof parsed.results?.[i]?.rawAnswer === "string"
        ? (parsed.results![i]!.rawAnswer as string).slice(0, 400)
        : "",
    }));
    return {
      engine: "gemini-2.0-flash",
      brand: args.brand,
      industry: args.industry,
      modelNotes: "Single-pass batched citation check via gemini-2.0-flash.",
      results,
    };
  } catch (err) {
    console.error("[gemini] citation test failed", err);
    return {
      engine: "gemini-2.0-flash",
      brand: args.brand,
      industry: args.industry,
      modelNotes: `Gemini call failed: ${err instanceof Error ? err.message : String(err)}`,
      results: queries.map((query) => ({ query, brandMentioned: false, competitorsMentioned: [], rawAnswer: "(error)" })),
    };
  }
}
