import { GoogleGenerativeAI } from "@google/generative-ai";
import Exa from "exa-js";
import { NextResponse } from "next/server";

// Initialize both AI engines using the keys in your .env.local
const exa = new Exa(process.env.EXA_API_KEY);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 🚨 THIS IS THE FIX: Next.js requires named exports like "POST" for API routes!
export async function POST(req) {
  try {
    const { message } = await req.json();

    // ==========================================
    // ENGINE 1: EXA NEURAL SEARCH (The Scraper)
    // ==========================================
 // ==========================================
    // ENGINE 1: EXA NEURAL SEARCH (The Scraper)
    // ==========================================
    const searchResults = await exa.searchAndContents(message + " Indian Supreme Court High Court judgment", {
      type: "neural", // "neural" is much smarter than "auto" for legal queries
      numResults: 10, // We scrape 10 sites now instead of 6
      text: { maxCharacters: 2000 } // We grab more text from each site
    });

    const rawContext = searchResults.results.map(r => `Title: ${r.title}\nURL: ${r.url}\nContent: ${r.text}`).join("\n\n");

    // ==========================================
    // ENGINE 2: GEMINI (The Analyzer)
    // ==========================================
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `You are an expert Indian Legal AI. A lawyer has asked: "${message}".
    
    Here are the real-time web search results regarding this legal query scraped from the internet:
    ---
    ${rawContext}
    ---
    
    Analyze these live cases and respond in STRICTLY valid JSON format matching this exact structure (no markdown). 
  CRITICAL INSTRUCTIONS: 
    1. You MUST extract and list EVERY distinct legal case found in the search results. Try your absolute hardest to return at least 4 to 5 cases. 
    2. You MUST include the "details" field for every single precedent.
    
    {
      "content": "A brief, professional 2-sentence summary of how these precedents apply to the lawyer's query.",
      "precedents": [
        {
          "title": "Name of the Case (Year)",
          "relevance": "High/Medium",
          "code": "The specific IPC, CRPC, or Act mentioned",
          "details": "REQUIRED: A full 3-to-4 sentence deep dive explaining the exact facts of the case, the judge's ruling, and why it matters."
        },
        {
          "title": "Second Case Example",
          "relevance": "High",
          "code": "...",
          "details": "..."
        }
      ]
    }`;

    const result = await model.generateContent(prompt);
    
    const cleanedText = result.response.text().replace(/```json/g, "").replace(/```/g, "").trim();
    const parsedResponse = JSON.parse(cleanedText);

    return NextResponse.json(parsedResponse);

  } catch (error) {
    console.error("Dual-Engine API Error:", error);
    return NextResponse.json(
      { 
        content: "System encountered an error while cross-referencing neural databases. Please verify your search parameters and API keys.", 
        precedents: null 
      },
      { status: 500 }
    );
  }
}