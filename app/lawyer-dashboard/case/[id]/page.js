// app/lawyer-dashboard/case/[id]/page.js
"use client"; // Needs to be a client component for the search button state



// Add generateStrategyBrief to your imports at the top:
import { generateStrategyBrief } from '@/adapters/ai_agent';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCaseById } from '@/adapters/database';
import { findPrecedents } from '@/adapters/search';
import { use } from 'react'; // React hook for unwrapping params

export default function CaseDetail({ params }) {
  // Unwrapping params properly for Next.js 15
  const unwrappedParams = use(params);
  const caseId = unwrappedParams.id;

  const [caseData, setCaseData] = useState(null);
  const [precedents, setPrecedents] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  // Inside your component, add these two new state variables right below your others:
  const [isGeneratingBrief, setIsGeneratingBrief] = useState(false);
  const [strategyBrief, setStrategyBrief] = useState(null);

  // Fetch the case data when the page loads
  useEffect(() => {
    async function loadCase() {
      const data = await getCaseById(caseId);
      setCaseData(data);
    }
    loadCase();
  }, [caseId]);

  const handleRunExaSearch = async () => {
    setIsSearching(true);
    const results = await findPrecedents(caseData.description);
    setPrecedents(results);
    setIsSearching(false);
  };
  // Add this new function right below handleRunExaSearch:
  const handleGenerateStrategy = async () => {
    setIsGeneratingBrief(true);
    const brief = await generateStrategyBrief(caseData, precedents);
    setStrategyBrief(brief);
    setIsGeneratingBrief(false);
};

  if (!caseData) return <div className="min-h-screen bg-slate-950 text-white p-8">Loading case file...</div>;

  return (
    <div className="min-h-screen bg-slate-950 p-8 font-sans">
      <nav className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
        <h1 className="text-xl font-bold text-slate-400">
          <Link href="/lawyer-dashboard" className="hover:text-white transition">← Back to Roster</Link>
        </h1>
        <span className="text-slate-500 text-sm">Case File #{caseId}</span>
      </nav>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Case Details */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-slate-400 text-sm uppercase tracking-widest mb-2 font-bold">Client Brief</h2>
            <h3 className="text-2xl font-bold text-white mb-4">{caseData.title}</h3>
            <p className="text-slate-300 leading-relaxed mb-6">{caseData.description}</p>
            
            <div className="pt-4 border-t border-slate-800">
              <p className="text-slate-500 text-sm">Status: <span className="text-yellow-500">{caseData.status}</span></p>
            </div>
          </div>
        </div>

        {/* Right Column: Exa Research Engine */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-white">Exa Precedent Engine</h2>
              <p className="text-slate-400 text-sm">Search global legal databases for matching case laws.</p>
            </div>
            <button 
              onClick={handleRunExaSearch}
              disabled={isSearching}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-500 disabled:bg-blue-800 transition shadow-[0_0_15px_rgba(37,99,235,0.5)]"
            >
              {isSearching ? 'Deep Searching...' : 'Run Neural Search'}
            </button>
          </div>

          {/* Research Results */}
          {isSearching && (
             <div className="border border-slate-800 rounded-xl p-12 flex flex-col items-center justify-center text-blue-500 animate-pulse bg-slate-900/50">
               <div className="text-xl font-bold mb-2">Querying LexisNexis & Public Records...</div>
               <div className="text-slate-500 text-sm">Analyzing semantic similarity...</div>
             </div>
          )}

          {precedents.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-slate-300 font-bold uppercase tracking-widest text-sm mb-4">Found {precedents.length} High-Match Precedents</h3>
              {precedents.map(prec => (
                <div key={prec.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-600 transition">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-bold text-blue-400">{prec.title}</h4>
                    <span className="bg-blue-900/30 text-blue-400 border border-blue-800 rounded px-2 py-1 text-xs font-bold">
                      {prec.relevance}% Match
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm">{prec.summary}</p>
                </div>
              ))}
            </div>
          )}
          {/* AI Strategy Generation Section */}
          {precedents.length > 0 && !strategyBrief && (
            <div className="mt-8 pt-8 border-t border-slate-800 flex justify-end">
              <button 
                onClick={handleGenerateStrategy}
                disabled={isGeneratingBrief}
                className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-emerald-500 disabled:bg-emerald-800 transition shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              >
                {isGeneratingBrief ? 'Synthesizing Strategy...' : 'Generate AI Strategy Brief ✨'}
              </button>
            </div>
          )}

          {/* The Final Strategy Brief */}
          {strategyBrief && (
            <div className="mt-8 pt-8 border-t border-slate-800">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-emerald-500/30 rounded-xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-bl-xl font-bold text-sm border-b border-l border-emerald-500/30">
                  Win Probability: {strategyBrief.confidenceScore}%
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-emerald-500">✨</span> AI Strategy Brief
                </h2>
                
                <p className="text-slate-300 mb-6 leading-relaxed">{strategyBrief.overview}</p>
                
                <h3 className="text-emerald-400 font-bold mb-3 uppercase tracking-wider text-sm">Key Legal Arguments</h3>
                <ul className="space-y-3 mb-6">
                  {strategyBrief.keyArguments.map((arg, idx) => (
                    <li key={idx} className="flex gap-3 text-slate-300">
                      <span className="text-emerald-500 font-bold">→</span> {arg}
                    </li>
                  ))}
                </ul>

                <div className="bg-slate-950/50 rounded-lg p-5 border border-slate-700/50">
                  <h3 className="text-slate-400 font-bold mb-2 uppercase tracking-wider text-sm">Recommended Next Step</h3>
                  <p className="text-white font-medium">{strategyBrief.recommendedAction}</p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}


