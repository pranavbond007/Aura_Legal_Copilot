"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";

// This URL was automatically added to your .env.local by Convex
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export default function ConvexClientProvider({ children }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}