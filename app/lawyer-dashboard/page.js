// 'use client';
// import Link from 'next/link';
// import { Scale, Clock, ArrowRight, FileText, Search, Shield, AlertCircle } from 'lucide-react';

// export default function LawyerDashboard() {
//   // Mock Data for the incoming Citizen Cases
//   const pendingCases = [
//     {
//       id: "CAS-2026-881",
//       title: "Unfair Eviction Notice",
//       description: "Landlord sent a 3-day notice without citing rent control violations.",
//       user: "Citizen ID: #4492",
//       status: "PENDING REVIEW",
//       date: "Today, 09:45 AM",
//       urgency: "High"
//     },
//     {
//       id: "CAS-2026-882",
//       title: "Workplace Harassment Claim",
//       description: "Initial FIR drafted regarding unpaid overtime and verbal abuse.",
//       user: "Citizen ID: #1022",
//       status: "AI VERIFIED",
//       date: "Yesterday, 14:20 PM",
//       urgency: "Medium"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-stone-950 font-sans text-stone-300 p-6 md:p-12 relative overflow-hidden">
      
//       {/* Background glow effect */}
//       <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

//       {/* TOP NAVIGATION */}
//       <nav className="relative z-10 flex justify-between items-center mb-12 pb-6 border-b border-stone-800">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
//             <Scale className="w-5 h-5 text-amber-500" />
//           </div>
//           <div>
//             <h1 className="font-bold text-xl text-white tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
//               Aura <span className="text-amber-500">Legal Terminal</span>
//             </h1>
//             <p className="text-xs text-stone-500 uppercase tracking-widest font-semibold">Authorized Official Portal</p>
//           </div>
//         </div>
//         <div className="flex items-center gap-4">
//           <span className="text-sm font-medium text-stone-400">Welcome, Jane Smith, Esq.</span>
//           <Link href="/" className="text-xs font-bold text-stone-500 hover:text-white transition-colors border border-stone-800 hover:bg-stone-800 px-4 py-2 rounded-lg">
//             Sign Out
//           </Link>
//         </div>
//       </nav>

//       <main className="relative z-10 max-w-6xl mx-auto space-y-8">
        
//         {/* BRIDGE SECTION: The Terminal Launcher */}
//         <div className="bg-stone-900/80 backdrop-blur-md border border-stone-800 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
//           <div className="absolute right-0 top-0 w-64 h-64 bg-amber-500/5 blur-[80px] group-hover:bg-amber-500/10 transition-colors duration-500" />
          
//           <div className="relative z-10 max-w-2xl">
//             <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
//               <Search className="w-6 h-6 text-amber-500" />
//               Neural Precedent Search
//             </h2>
//             <p className="text-stone-400 text-sm leading-relaxed">
//               Launch the AI-powered legal terminal to cross-reference case files, analyze uploaded documents, and generate actionable legal briefs in seconds.
//             </p>
//           </div>

//           <Link 
//             href="/lawyer-dashboard/terminal" 
//             className="relative z-10 w-full md:w-auto flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-stone-950 px-8 py-4 rounded-xl font-bold text-md shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] transition-all hover:-translate-y-0.5"
//           >
//             Launch Terminal <ArrowRight className="w-5 h-5" />
//           </Link>
//         </div>

//         {/* ACTIVE CASE ROSTER */}
//         <div>
//           <div className="flex justify-between items-end mb-6">
//             <div>
//               <h2 className="text-2xl font-bold text-white mb-1">Active Case Roster</h2>
//               <p className="text-sm text-stone-500">Review incoming FIRs and citizen legal requests.</p>
//             </div>
//             <div className="bg-stone-900 border border-stone-800 px-4 py-2 rounded-lg text-sm font-medium">
//               Total Pending: <span className="text-amber-500 ml-1">{pendingCases.length}</span>
//             </div>
//           </div>

//           <div className="grid gap-4">
//             {pendingCases.map((caseItem) => (
//               <div 
//                 key={caseItem.id} 
//                 className="bg-stone-900/50 hover:bg-stone-900 border border-stone-800 hover:border-amber-500/30 rounded-xl p-5 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group"
//               >
//                 <div className="flex-1">
//                   <div className="flex items-center gap-3 mb-2">
//                     <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">{caseItem.title}</h3>
//                     <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
//                       caseItem.status === 'PENDING REVIEW' 
//                         ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' 
//                         : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
//                     }`}>
//                       {caseItem.status}
//                     </span>
//                     {caseItem.urgency === 'High' && (
//                       <span className="text-[10px] font-bold bg-red-500/10 text-red-500 border border-red-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
//                         <AlertCircle className="w-3 h-3" /> URGENT
//                       </span>
//                     )}
//                   </div>
//                   <p className="text-sm text-stone-400 mb-3">{caseItem.description}</p>
//                   <div className="flex items-center gap-4 text-xs font-mono text-stone-500">
//                     <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> {caseItem.id}</span>
//                     <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> Submitted by {caseItem.user}</span>
//                     <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {caseItem.date}</span>
//                   </div>
//                 </div>

//                 <Link 
//                   href="/lawyer-dashboard/terminal"
//                   className="w-full md:w-auto text-sm font-semibold bg-stone-800 hover:bg-stone-700 text-white px-6 py-3 rounded-lg border border-stone-700 hover:border-stone-600 transition-all flex items-center justify-center gap-2"
//                 >
//                   Review & Strategize <ArrowRight className="w-4 h-4" />
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>

//       </main>
//     </div>
//   );
// }


// "use client";

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { Terminal, Activity, ArrowRight, ExternalLink } from 'lucide-react';

// export default function LawyerDashboard() {
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const res = await fetch('/api/legal-news');
//         const data = await res.json();
//         if (data.success) {
//           setNews(data.news);
//         }
//       } catch (error) {
//         console.error("Failed to load news widget");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNews();
//   }, []);

//   return (
//     <div className="min-h-screen bg-stone-950 text-stone-300 p-8 font-sans">
//       <div className="max-w-6xl mx-auto space-y-8">
        
//         {/* Header */}
//         <div className="flex justify-between items-end border-b border-stone-800 pb-6">
//           <div>
//             <h1 className="text-3xl font-bold text-stone-100">Official Counsel Portal</h1>
//             <p className="text-stone-500 mt-2">Aura Legal Command Center</p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
//           {/* Main Action Card: The Terminal */}
//           <div className="md:col-span-2 bg-stone-900 border border-stone-800 rounded-2xl p-8 shadow-2xl flex flex-col justify-center items-start space-y-4">
//             <div className="p-4 bg-amber-500/10 rounded-xl">
//               <Terminal className="w-8 h-8 text-amber-500" />
//             </div>
//             <h2 className="text-2xl font-bold text-stone-200">Neural Precedent Terminal</h2>
//             <p className="text-stone-400 max-w-md">Access the Exa + Gemini dual-engine brain. Search live case laws, generate briefs, and pin precedents to your secure Convex vault.</p>
//             <Link href="/lawyer-dashboard/terminal" className="mt-4 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold px-6 py-3 rounded-lg flex items-center gap-2 transition-all">
//               Launch Terminal <ArrowRight className="w-4 h-4" />
//             </Link>
//           </div>

//           {/* APIFY SPONSOR BOUNTY: Live Legal Intel Widget */}
//           <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden flex flex-col shadow-2xl">
//             <div className="p-4 bg-stone-950 border-b border-stone-800 flex items-center gap-2">
//               <Activity className="w-4 h-4 text-emerald-500" />
//               <h3 className="font-bold text-emerald-500 uppercase tracking-widest text-sm">Live Legal Intel</h3>
//               <span className="ml-auto text-[10px] bg-stone-800 text-stone-400 px-2 py-1 rounded">Powered by Apify</span>
//             </div>
            
//             <div className="p-4 flex-1 overflow-y-auto space-y-4">
//               {loading ? (
//                 <div className="text-stone-500 text-sm animate-pulse flex flex-col gap-4">
//                   <div className="h-16 bg-stone-800/50 rounded-lg"></div>
//                   <div className="h-16 bg-stone-800/50 rounded-lg"></div>
//                   <p className="text-center mt-2">Deploying Apify Scraper...</p>
//                 </div>
//               ) : news.length > 0 ? (
//                 news.map((item, idx) => (
//                   <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className="block group">
//                     <div className="bg-stone-950 border border-stone-800 p-3 rounded-lg hover:border-emerald-500/50 transition-colors">
//                       <h4 className="text-sm font-bold text-stone-200 group-hover:text-emerald-400 transition-colors line-clamp-2">{item.title}</h4>
//                       <div className="flex items-center justify-between mt-2">
//                         <span className="text-[10px] text-stone-500">{item.source || "News"}</span>
//                         <ExternalLink className="w-3 h-3 text-stone-600 group-hover:text-emerald-500" />
//                       </div>
//                     </div>
//                   </a>
//                 ))
//               ) : (
//                 <div className="text-sm text-stone-500 text-center mt-4">No recent intel found.</div>
//               )}
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }





"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Scale, Clock, ArrowRight, FileText, Search, Shield, AlertCircle, Activity, ExternalLink } from 'lucide-react';

export default function LawyerDashboard() {
  // --- APIFY LIVE NEWS STATE ---
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/legal-news');
        const data = await res.json();
        if (data.success) {
          setNews(data.news);
        }
      } catch (error) {
        console.error("Failed to load news widget");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  // --- YOUR ORIGINAL MOCK DATA ---
  const pendingCases = [
    {
      id: "CAS-2026-881",
      title: "Unfair Eviction Notice",
      description: "Landlord sent a 3-day notice without citing rent control violations.",
      user: "Citizen ID: #4492",
      status: "PENDING REVIEW",
      date: "Today, 09:45 AM",
      urgency: "High"
    },
    {
      id: "CAS-2026-882",
      title: "Workplace Harassment Claim",
      description: "Initial FIR drafted regarding unpaid overtime and verbal abuse.",
      user: "Citizen ID: #1022",
      status: "AI VERIFIED",
      date: "Yesterday, 14:20 PM",
      urgency: "Medium"
    }
  ];

  return (
    <div className="min-h-screen bg-stone-950 font-sans text-stone-300 p-6 md:p-12 relative overflow-hidden">
      
      {/* Background glow effect */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* TOP NAVIGATION */}
      <nav className="relative z-10 flex justify-between items-center mb-12 pb-6 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
            <Scale className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-white tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
              Aura <span className="text-amber-500">Legal Terminal</span>
            </h1>
            <p className="text-xs text-stone-500 uppercase tracking-widest font-semibold">Authorized Official Portal</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-stone-400">Welcome, Jane Smith, Esq.</span>
          <Link href="/" className="text-xs font-bold text-stone-500 hover:text-white transition-colors border border-stone-800 hover:bg-stone-800 px-4 py-2 rounded-lg">
            Sign Out
          </Link>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto space-y-10">
        
        {/* TOP ROW: Terminal Launcher & Apify Widget Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* YOUR ORIGINAL BRIDGE SECTION (Takes up 2/3 of the space) */}
          <div className="lg:col-span-2 bg-stone-900/80 backdrop-blur-md border border-stone-800 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-64 h-64 bg-amber-500/5 blur-[80px] group-hover:bg-amber-500/10 transition-colors duration-500" />
            
            <div className="relative z-10 max-w-lg">
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <Search className="w-6 h-6 text-amber-500" />
                Neural Precedent Search
              </h2>
              <p className="text-stone-400 text-sm leading-relaxed">
                Launch the AI-powered legal terminal to cross-reference case files, analyze uploaded documents, and generate actionable legal briefs in seconds.
              </p>
            </div>

            <Link 
              href="/lawyer-dashboard/terminal" 
              className="relative z-10 w-full md:w-auto flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-stone-950 px-8 py-4 rounded-xl font-bold text-md shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] transition-all hover:-translate-y-0.5"
            >
              Launch Terminal <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* NEW APIFY SPONSOR WIDGET (Takes up 1/3 of the space) */}
          <div className="bg-stone-900/80 backdrop-blur-md border border-stone-800 rounded-2xl overflow-hidden flex flex-col relative">
            <div className="p-4 bg-stone-950/50 border-b border-stone-800 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-500" />
              <h3 className="font-bold text-emerald-500 uppercase tracking-widest text-[11px]">Live Legal Intel</h3>
              <span className="ml-auto text-[9px] bg-stone-800 text-stone-400 px-2 py-0.5 rounded uppercase">Apify Sync</span>
            </div>
            
            <div className="p-4 flex-1 overflow-y-auto space-y-3">
              {loading ? (
                <div className="text-stone-500 text-sm animate-pulse flex flex-col gap-3">
                  <div className="h-12 bg-stone-800/50 rounded-lg"></div>
                  <div className="h-12 bg-stone-800/50 rounded-lg"></div>
                  <p className="text-center mt-2 text-xs">Deploying Apify Scraper...</p>
                </div>
              ) : news.length > 0 ? (
                news.map((item, idx) => (
                  <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className="block group">
                    <div className="bg-stone-950 border border-stone-800 p-3 rounded-lg hover:border-emerald-500/50 transition-colors">
                      <h4 className="text-xs font-bold text-stone-200 group-hover:text-emerald-400 transition-colors line-clamp-2">{item.title}</h4>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[9px] uppercase text-stone-500">{item.source || "News"}</span>
                        <ExternalLink className="w-3 h-3 text-stone-600 group-hover:text-emerald-500" />
                      </div>
                    </div>
                  </a>
                ))
              ) : (
                <div className="text-xs text-stone-500 text-center mt-4">No recent intel found.</div>
              )}
            </div>
          </div>
        </div>

        {/* YOUR ORIGINAL ACTIVE CASE ROSTER */}
        <div>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Active Case Roster</h2>
              <p className="text-sm text-stone-500">Review incoming FIRs and citizen legal requests.</p>
            </div>
            <div className="bg-stone-900 border border-stone-800 px-4 py-2 rounded-lg text-sm font-medium">
              Total Pending: <span className="text-amber-500 ml-1">{pendingCases.length}</span>
            </div>
          </div>

          <div className="grid gap-4">
            {pendingCases.map((caseItem) => (
              <div 
                key={caseItem.id} 
                className="bg-stone-900/50 hover:bg-stone-900 border border-stone-800 hover:border-amber-500/30 rounded-xl p-5 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">{caseItem.title}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      caseItem.status === 'PENDING REVIEW' 
                        ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' 
                        : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                    }`}>
                      {caseItem.status}
                    </span>
                    {caseItem.urgency === 'High' && (
                      <span className="text-[10px] font-bold bg-red-500/10 text-red-500 border border-red-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> URGENT
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-stone-400 mb-3">{caseItem.description}</p>
                  <div className="flex items-center gap-4 text-xs font-mono text-stone-500">
                    <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> {caseItem.id}</span>
                    <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> Submitted by {caseItem.user}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {caseItem.date}</span>
                  </div>
                </div>

                <Link 
                  href="/lawyer-dashboard/terminal"
                  className="w-full md:w-auto text-sm font-semibold bg-stone-800 hover:bg-stone-700 text-white px-6 py-3 rounded-lg border border-stone-700 hover:border-stone-600 transition-all flex items-center justify-center gap-2"
                >
                  Review & Strategize <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}