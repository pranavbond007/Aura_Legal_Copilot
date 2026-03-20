// adapters/search.js
"use server";

const isHackathonMode = process.env.NEXT_PUBLIC_HACKATHON_MODE === 'true';

export async function findPrecedents(caseDescription) {
    if (isHackathonMode) {
        // 🟢 HACKATHON DAY: Real Exa API Logic
        console.log("Calling Exa Neural Search API...");
        return []; 
    } else {
        // 🔴 PRE-HACKATHON: Mock Exa Search Results
        console.log("Mocking Exa Search...");
        
        await new Promise(resolve => setTimeout(resolve, 2500)); // Fake 2.5s search delay
        
        return [
            { 
                id: 1, 
                title: "State v. TechCorp Properties (2023)", 
                summary: "Ruled that digital eviction notices without a 14-day prior certified mail warning are legally void.", 
                relevance: 98 
            },
            { 
                id: 2, 
                title: "Smith v. Horizon Housing (2021)", 
                summary: "Established precedent that 3-day notices apply only to severe property damage, not late rent disputes.", 
                relevance: 85 
            },
            { 
                id: 3, 
                title: "Doe v. Metropolis Management (2019)", 
                summary: "Landlord was heavily fined for constructive eviction via improper notice serving.", 
                relevance: 72 
            }
        ];
    }
}