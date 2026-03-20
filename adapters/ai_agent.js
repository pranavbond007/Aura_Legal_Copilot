"use server";

const isHackathonMode = process.env.NEXT_PUBLIC_HACKATHON_MODE === 'true';

export async function translateLegalese(documentText) {
    if (isHackathonMode) {
        // 🟢 HACKATHON DAY: Gemini API Logic Goes Here
        console.log("Calling Gemini API...");
        return null; 
    } else {
        // 🔴 PRE-HACKATHON: Mock AI Response
        console.log("Mocking AI Agent response...");
        
        // We add a 1.5 second fake delay so it actually feels like an AI is "thinking"
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        return {
            summary: "This is a standard 3-Day Eviction Notice. The landlord is legally requiring you to pay outstanding rent or vacate the premises within 72 hours.",
            urgency: "High",
            action_items: [
                "Locate your most recent rent payment receipt.",
                "Do not ignore this notice; the 3-day clock is ticking.",
                "Contact your landlord immediately in writing."
            ]
        };
    }
}


// Add this below translateLegalese in adapters/ai_agent.js

export async function draftFIR(userMessage) {
    if (isHackathonMode) {
        // 🟢 HACKATHON DAY: Gemini Multi-turn Chat Logic
        console.log("Calling Gemini Chat API...");
        return null; 
    } else {
        // 🔴 PRE-HACKATHON: Mock Chat Response
        console.log("Mocking FIR generation...");
        
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second thinking delay
        
        // Simulating that the AI gathered enough info and drafted the document
        return {
            reply: "I have gathered enough information. I have drafted the official FIR document for you to review and print.",
            isDraftComplete: true,
            draftText: `OFFICIAL FIRST INFORMATION REPORT (FIR) DRAFT\n\nDate of Incident: [Current Date]\nNature of Incident: Financial Fraud\n\nDetails: The complainant reports unauthorized transactions from their bank account... \n\n[Print this document and submit to your local precinct]`
        };
    }
}

// Add this to the bottom of adapters/ai_agent.js

export async function generateStrategyBrief(caseDetails, precedents) {
    if (isHackathonMode) {
        // 🟢 HACKATHON DAY: Gemini API Logic 
        // You will send the case and precedents to Gemini and ask for JSON back.
        console.log("Calling Gemini Strategy API...");
        return null; 
    } else {
        // 🔴 PRE-HACKATHON: Mock Strategy Response
        console.log("Mocking AI Strategy Generation...");
        
        await new Promise(resolve => setTimeout(resolve, 3000)); // 3-second deep thinking delay
        
        return {
            confidenceScore: 88,
            overview: "The client has a highly defensible position against this eviction. The landlord's 3-day notice violates recent state mandates regarding non-damage-related evictions.",
            keyArguments: [
                "Cite 'State v. TechCorp Properties' to invalidate the notice due to lack of a 14-day certified mail warning.",
                "Argue that 'Smith v. Horizon Housing' restricts 3-day notices strictly to severe property damage scenarios."
            ],
            recommendedAction: "Draft a formal Cease & Desist letter to the landlord citing the above precedents. Advise the client not to vacate the premises."
        };
    }
}