// adapters/database.js
"use server";
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path'; // <-- Added Node's path module

const isHackathonMode = process.env.NEXT_PUBLIC_HACKATHON_MODE === 'true';

// Helper to open the SQLite connection securely
async function getDb() {
    return open({
        // process.cwd() guarantees it looks in the root folder!
        filename: path.join(process.cwd(), 'legal_copilot.db'),
        driver: sqlite3.Database
    });
}

// Fetching a Citizen's legal cases
export async function getUserCases(userId) {
    if (isHackathonMode) {
        // 🟢 HACKATHON DAY: Convex Logic
        console.log("Fetching from Convex...");
        return []; 
    } else {
        // 🔴 PRE-HACKATHON: Local SQLite Logic
        console.log("Fetching from Local SQLite...");
        try {
            const db = await getDb();
            const rows = await db.all('SELECT * FROM Cases WHERE user_id = ?', [userId]);
            return rows;
        } catch (error) {
            console.error("Database Error:", error);
            return [];
        }
    }
}

// Add this to the bottom of adapters/database.js

// Fetching all active cases for the Lawyer Dashboard
export async function getAllCases() {
    if (isHackathonMode) {
        // 🟢 HACKATHON DAY: Convex Logic
        console.log("Fetching all cases from Convex...");
        // return await fetchQuery(api.cases.getAll);
        return []; 
    } else {
        // 🔴 PRE-HACKATHON: Local SQLite Logic
        console.log("Fetching all cases from Local SQLite...");
        try {
            const db = await getDb();
            // We order by ID descending so the newest cases show up first
            const rows = await db.all('SELECT * FROM Cases ORDER BY id DESC');
            return rows;
        } catch (error) {
            console.error("Database Error:", error);
            return [];
        }
    }
}

// Add this to the bottom of adapters/database.js

// Fetching a single case by its ID
export async function getCaseById(caseId) {
    if (isHackathonMode) {
        // 🟢 HACKATHON DAY: Convex Logic
        // return await fetchQuery(api.cases.getById, { id: caseId });
        return null; 
    } else {
        // 🔴 PRE-HACKATHON: Local SQLite Logic
        try {
            const db = await getDb();
            // db.get() fetches just one single row
            const result = await db.get('SELECT * FROM Cases WHERE id = ?', [caseId]);
            return result;
        } catch (error) {
            console.error("Database Error:", error);
            return null;
        }
    }
}