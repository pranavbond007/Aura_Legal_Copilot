// import Link from 'next/link';

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
//       <div className="max-w-3xl text-center space-y-8">
//         <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
//           Aura <span className="text-blue-600">Legal Copilot</span>
//         </h1>
//         <p className="text-xl text-gray-600">
//           Bridging the gap between everyday citizens and complex legal systems using AI.
//         </p>
        
//         <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
//           {/* Fake Login for Citizen */}
//           <Link href="/citizen-dashboard" 
//             className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition">
//             Log in as Citizen
//           </Link>

//           {/* Fake Login for Lawyer */}
//           <Link href="/lawyer-dashboard" 
//             className="px-8 py-4 bg-slate-900 text-white rounded-lg font-semibold shadow-lg hover:bg-slate-800 transition">
//             Log in as Lawyer
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }



import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      
      {/* Central Glassmorphism Card */}
      <div className="max-w-4xl w-full text-center space-y-10 bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 p-12 md:p-20 rounded-3xl shadow-2xl relative overflow-hidden">
        
        {/* Subtle inner glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-blue-500/20 blur-[60px] pointer-events-none" />

        <div className="space-y-4 relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-bold tracking-widest mb-4">
            NEXT-GEN LEGAL TECH
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">
            Aura <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Legal Copilot</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Bridging the gap between everyday citizens and complex legal systems using deterministic AI and neural precedent search.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12 relative z-10">
          {/* Citizen Entry */}
          <Link href="/citizen-dashboard" 
            className="group relative px-8 py-5 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:-translate-y-1 transition-all duration-300">
            <span className="flex items-center gap-3">
              Enter Citizen Portal <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </Link>

          {/* Lawyer Entry */}
          <Link href="/lawyer-dashboard" 
            className="group relative px-8 py-5 bg-slate-800 text-white border border-slate-700 rounded-xl font-bold text-lg hover:bg-slate-700 hover:border-slate-500 hover:-translate-y-1 transition-all duration-300">
            <span className="flex items-center gap-3">
              Access Lawyer Terminal <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </Link>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-8 text-slate-500 text-sm font-medium tracking-wide">
        Powered by Exa & Gemini
      </div>
    </div>
  );
}