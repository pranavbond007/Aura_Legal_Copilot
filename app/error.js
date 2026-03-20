"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // This logs the error silently in the background so you can debug later
    console.error("Caught by Error Boundary:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-slate-900 border border-red-500/30 p-8 rounded-2xl max-w-md w-full shadow-[0_0_30px_rgba(239,68,68,0.1)]">
        <div className="text-4xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold text-white mb-2">System Interruption</h2>
        <p className="text-slate-400 text-sm mb-6">
          The legal copilot encountered a temporary anomaly while processing your request. 
        </p>
        <button
          onClick={() => reset()}
          className="bg-red-600/20 text-red-400 border border-red-500/50 px-6 py-2 rounded-lg font-bold hover:bg-red-600/40 transition w-full"
        >
          Reboot System
        </button>
      </div>
    </div>
  );
}