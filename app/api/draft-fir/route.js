
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { NextResponse } from "next/server";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// export async function POST(req) {
//   try {
//     const { message, history, action } = await req.json();
//     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//     // CRITICAL FIX: Slice off the first static greeting so we don't break Gemini's User/AI alternating rule
//     const validHistory = history.length > 1 ? history.slice(1) : [];
    
//     const formattedHistory = validHistory.map(msg => ({
//       role: msg.role === 'ai' ? 'model' : 'user',
//       parts: [{ text: msg.content }]
//     }));

//     // ACTION 1: Generate the Formal Document
//     if (action === "draft") {
//       const draftPrompt = `Based on the following conversation history between a citizen and a legal advisor, generate a highly professional, formal Indian legal document (like an FIR, Legal Notice, or Complaint). Do not include any conversational text, only the document itself. Use placeholders like [Name] if information is missing.`;
      
//       const chat = model.startChat({ history: formattedHistory });
//       const result = await chat.sendMessage(draftPrompt);
//       return NextResponse.json({ draftText: result.response.text() });
//     }

//     // ACTION 2: General Legal Q&A Chat
//     const systemPrompt = `You are Aura, an empathetic, highly professional legal AI advisor for citizens in India. 
//     Your job is to answer legal questions, explain procedures, and advise users on their rights based on Indian Law. 
    
//     CRITICAL INSTRUCTIONS:
//     1. NEVER use Markdown formatting (no **, no ##, no bullet points). Use plain text and standard paragraph breaks only. 
//     2. Be supportive, clear, and avoid overly dense legal jargon. Do not generate full legal documents here, just converse and advise.`;

//     const chat = model.startChat({
//       history: [
//         { role: "user", parts: [{ text: systemPrompt }] },
//         { role: "model", parts: [{ text: "Understood. I am ready to advise." }] },
//         ...formattedHistory
//       ],
//     });

//     // ... (previous chat initialization code) ...

//     const result = await chat.sendMessage(message);
    
//     // 1. THIS IS THE MISSING LINE! Grab the text first.
//     let cleanReply = result.response.text();

//     // 2. The Failsafe: Forcefully remove stubborn Markdown characters
//     cleanReply = cleanReply.replace(/\*\*/g, ""); // Removes bolding
//     cleanReply = cleanReply.replace(/^\s*\*\s/gm, "- "); // Changes bullet points from * to -
//     cleanReply = cleanReply.replace(/#/g, ""); // Removes heading hashes

//     // 3. RETURN THE CLEANED REPLY (Not the raw result)
//     return NextResponse.json({ reply: cleanReply });

//   } catch (error) {
//     console.error("Gemini API Error:", error);
//     return NextResponse.json({ error: "Failed to process the legal query. Please try again." }, { status: 500 });
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
      const draftPrompt = `Based on the following conversation history between a citizen and a legal advisor, generate a highly professional, formal Indian legal document (like an FIR, Legal Notice, or Complaint). Do not include any conversational text, only the document itself. Use placeholders like [Name] if information is missing. IMPORTANT: Return plain text only. Do not use any markdown formatting, asterisks, or bold text.`;
      
      const chat = model.startChat({ history: formattedHistory });
      const result = await chat.sendMessage(draftPrompt);
      
      // 🔥 THE FIX: Strip out any stubborn markdown stars before sending it to the screen
      let cleanDraft = result.response.text();
      cleanDraft = cleanDraft.replace(/\*\*/g, ""); // Removes all **
      cleanDraft = cleanDraft.replace(/#/g, ""); // Removes heading hashes
      
      return NextResponse.json({ draftText: cleanDraft });
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

    const result = await chat.sendMessage(message);
    
    // Grab the text first.
    let cleanReply = result.response.text();

    // The Failsafe: Forcefully remove stubborn Markdown characters
    cleanReply = cleanReply.replace(/\*\*/g, ""); // Removes bolding
    cleanReply = cleanReply.replace(/^\s*\*\s/gm, "- "); // Changes bullet points from * to -
    cleanReply = cleanReply.replace(/#/g, ""); // Removes heading hashes

    // RETURN THE CLEANED REPLY
    return NextResponse.json({ reply: cleanReply });

  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: "Failed to process the legal query. Please try again." }, { status: 500 });
  }
}