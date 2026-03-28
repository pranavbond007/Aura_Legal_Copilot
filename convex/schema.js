import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Table 1: For the Citizen's private FIR Drafts
  cases: defineTable({
    citizenId: v.string(),
    title: v.string(),
    description: v.string(),
    documentText: v.string(),
    status: v.string(),
    urgency: v.string(),
    dateFiled: v.number(),
  }),
  
  // Table 2: The Lawyer's collaborative pinboard
  pinnedPrecedents: defineTable({
    lawyerId: v.string(),
    caseTitle: v.string(),
    relevance: v.string(),
    code: v.string(),
    datePinned: v.number(),
  }),
});