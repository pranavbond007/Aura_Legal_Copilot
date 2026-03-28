import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Fetch all pinned cases for the dashboard
export const getPinned = query({
  args: { lawyerId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("pinnedPrecedents")
      .filter((q) => q.eq(q.field("lawyerId"), args.lawyerId))
      .order("desc") // Newest pins first
      .collect();
  },
});

// Save a new case law to the pinboard
export const pinCase = mutation({
  args: {
    lawyerId: v.string(),
    caseTitle: v.string(),
    relevance: v.string(),
    code: v.string(),
    datePinned: v.number(),
  },
  handler: async (ctx, args) => {
    const newPinId = await ctx.db.insert("pinnedPrecedents", args);
    return newPinId;
  },
});