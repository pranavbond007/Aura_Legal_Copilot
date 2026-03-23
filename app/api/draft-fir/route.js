// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { NextResponse } from "next/server";

// // Initialize Gemini
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// export async function POST(req) {
//   try {
//     const { message, history } = await req.json();

//     // Use the fast and capable Flash model
//     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//     // The System Prompt that gives Aura its personality and rules
//     const systemPrompt = `You are Aura, an empathetic, highly professional legal AI assistant for citizens in India. 
//     Your job is to listen to the user's problem, ask 1 or 2 clarifying questions if necessary (like dates, locations, or names), and then draft a formal FIR (First Information Report) or Legal Notice.
    
//     CRITICAL: You must always respond in valid JSON format with two keys:
//     1. "reply": Your conversational response to the user.
//     2. "draftText": The formal legal document text. If you don't have enough info to draft it yet, return null for this.
    
//     Example Output:
//     {
//       "reply": "I am so sorry you experienced this. I can help you draft the FIR. What date did the lockout occur?",
//       "draftText": null
//     }`;

//     // Format the previous chat history for Gemini
//     const formattedHistory = history.map(msg => ({
//       role: msg.role === 'ai' ? 'model' : 'user',
//       parts: [{ text: msg.content }]
//     }));

//     // Start the chat session
//     const chat = model.startChat({
//       history: [
//         { role: "user", parts: [{ text: systemPrompt }] },
//         { role: "model", parts: [{ text: "Understood. I will respond only in JSON." }] },
//         ...formattedHistory
//       ],
//     });

//     // Send the new message
//     const result = await chat.sendMessage(message);
//     const responseText = result.response.text();
    
//     // Clean the response to ensure it's valid JSON (sometimes LLMs add markdown code blocks)
//     const cleanedText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
//     const parsedResponse = JSON.parse(cleanedText);

//     return NextResponse.json(parsedResponse);

//   } catch (error) {
//     console.error("Gemini API Error:", error);
//     return NextResponse.json(
//       { error: "Failed to process the legal query." },
//       { status: 500 }
//     );
//   }
// }
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { message, history, action } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // CRITICAL FIX: Slice off the first static greeting so we don't break Gemini's User/AI alternating rule
    const validHistory = history.length > 1 ? history.slice(1) : [];
    
    const formattedHistory = validHistory.map(msg => ({
      role: msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // ACTION 1: Generate the Formal Document
    if (action === "draft") {
      const draftPrompt = `Based on the following conversation history between a citizen and a legal advisor, generate a highly professional, formal Indian legal document (like an FIR, Legal Notice, or Complaint). Do not include any conversational text, only the document itself. Use placeholders like [Name] if information is missing.`;
      
      const chat = model.startChat({ history: formattedHistory });
      const result = await chat.sendMessage(draftPrompt);
      return NextResponse.json({ draftText: result.response.text() });
    }

    // ACTION 2: General Legal Q&A Chat
    const systemPrompt = `You are Aura, an empathetic, highly professional legal AI advisor for citizens in India. 
    Your job is to answer legal questions, explain procedures, and advise users on their rights based on Indian Law. 
    
    CRITICAL INSTRUCTIONS:
    1. NEVER use Markdown formatting (no **, no ##, no bullet points). Use plain text and standard paragraph breaks only. 
    2. Be supportive, clear, and avoid overly dense legal jargon. Do not generate full legal documents here, just converse and advise.`;

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "model", parts: [{ text: "Understood. I am ready to advise." }] },
        ...formattedHistory
      ],
    });

    // ... (previous chat initialization code) ...

    const result = await chat.sendMessage(message);
    
    // 1. THIS IS THE MISSING LINE! Grab the text first.
    let cleanReply = result.response.text();

    // 2. The Failsafe: Forcefully remove stubborn Markdown characters
    cleanReply = cleanReply.replace(/\*\*/g, ""); // Removes bolding
    cleanReply = cleanReply.replace(/^\s*\*\s/gm, "- "); // Changes bullet points from * to -
    cleanReply = cleanReply.replace(/#/g, ""); // Removes heading hashes

    // 3. RETURN THE CLEANED REPLY (Not the raw result)
    return NextResponse.json({ reply: cleanReply });

  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: "Failed to process the legal query. Please try again." }, { status: 500 });
  }
}