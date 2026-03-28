

// import Link from 'next/link';

// export default function Home() {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      
//       {/* Central Glassmorphism Card */}
//       <div className="max-w-4xl w-full text-center space-y-10 bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 p-12 md:p-20 rounded-3xl shadow-2xl relative overflow-hidden">
        
//         {/* Subtle inner glow */}
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-blue-500/20 blur-[60px] pointer-events-none" />

//         <div className="space-y-4 relative z-10">
//           <div className="inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-bold tracking-widest mb-4">
//             NEXT-GEN LEGAL TECH
//           </div>
//           <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">
//             Aura <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Legal Copilot</span>
//           </h1>
//           <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
//             Bridging the gap between everyday citizens and complex legal systems using deterministic AI and neural precedent search.
//           </p>
//         </div>
        
//         <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12 relative z-10">
//           {/* Citizen Entry */}
//           <Link href="/citizen-dashboard" 
//             className="group relative px-8 py-5 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:-translate-y-1 transition-all duration-300">
//             <span className="flex items-center gap-3">
//               Enter Citizen Portal <span className="group-hover:translate-x-1 transition-transform">→</span>
//             </span>
//           </Link>

//           {/* Lawyer Entry */}
//           <Link href="/lawyer-dashboard" 
//             className="group relative px-8 py-5 bg-slate-800 text-white border border-slate-700 rounded-xl font-bold text-lg hover:bg-slate-700 hover:border-slate-500 hover:-translate-y-1 transition-all duration-300">
//             <span className="flex items-center gap-3">
//               Access Lawyer Terminal <span className="group-hover:translate-x-1 transition-transform">→</span>
//             </span>
//           </Link>
//         </div>
//       </div>

//       {/* Footer Branding */}
//       <div className="absolute bottom-8 text-slate-500 text-sm font-medium tracking-wide">
//         Powered by Exa & Gemini
//       </div>
//     </div>
//   );
// }


// app/page.js
import Link from 'next/link';
import { Landmark, Shield, Scale, ShieldCheck } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-stone-950 font-sans">
      
      {/* 1. Local Background Image + Dark Overlay */}
      <div 
        className="absolute inset-0"
        style={{ 
          backgroundImage: "url('/images/courtroom-bg.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover"
        }} 
      />
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-stone-950/80 to-stone-950 z-0" />

      {/* 2. Premium Navigation */}
      <nav className="relative z-20 w-full px-6 md:px-12 py-5 flex items-center justify-between bg-stone-950/40 backdrop-blur-md border-b border-white/10">
        <Link href="/" className="flex items-center gap-2.5 text-white font-bold text-lg tracking-wide">
          <Landmark className="w-6 h-6 text-amber-500" />
          Aura Legal Copilot
        </Link>
        <div className="flex items-center gap-8">
          <a href="#features" className="hidden sm:block text-sm font-medium text-stone-300 hover:text-amber-400 transition-colors">Features</a>
          <a href="#security" className="hidden sm:block text-sm font-medium text-stone-300 hover:text-amber-400 transition-colors">Security</a>
          <Link href="/sign-in" className="text-sm font-medium text-stone-300 hover:text-white transition-colors">
            Sign In
          </Link>
          <Link href="/create-account" className="text-sm font-bold text-amber-500 border border-amber-500/50 hover:bg-amber-500/10 px-5 py-2.5 rounded-full transition-all">
            Create Account
          </Link>
        </div>
      </nav>

      {/* 3. Hero Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 mt-12 mb-24 text-center">
        
        {/* Top Tagline */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-amber-500/10 backdrop-blur-md border border-amber-500/20 rounded-full">
          <Shield className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold uppercase tracking-widest text-amber-200">Authoritative Legal Intelligence</span>
        </div>

        {/* Massive Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg">
          Aura <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Legal Copilot</span>
        </h1>

        <Scale className="w-12 h-12 text-amber-500/80 mb-6" />

        <p className="max-w-2xl text-lg sm:text-xl text-stone-300 font-medium leading-relaxed mb-12 drop-shadow-md">
          Bridging the gap between everyday citizens and complex legal systems using deterministic AI and neural precedent search.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-16 w-full sm:w-auto">
          <Link 
            href="/citizen-dashboard" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 px-10 py-4 rounded-xl font-bold text-lg shadow-[0_0_40px_rgba(245,158,11,0.3)] hover:shadow-[0_0_60px_rgba(245,158,11,0.5)] transition-all hover:-translate-y-1"
          >
            Citizen Portal
            <span className="text-xl leading-none">→</span>
          </Link>
          
          <Link 
            href="/lawyer-dashboard" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-stone-900/80 hover:bg-stone-800 backdrop-blur-md border border-white/10 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all hover:-translate-y-1"
          >
            Lawyer Portal
            <span className="text-xl leading-none">→</span>
          </Link>
        </div>

        {/* Trust Badges Row (Streamlined) */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 mt-4 pt-8 border-t border-white/10 w-full max-w-3xl">
          <div className="flex items-center gap-2 text-stone-400">
            <Scale className="w-5 h-5 text-stone-500" />
            <span className="text-sm font-semibold tracking-wide">Legally Privileged</span>
          </div>
          <div className="flex items-center gap-2 text-stone-400">
            <ShieldCheck className="w-5 h-5 text-stone-500" />
            <span className="text-sm font-semibold tracking-wide">AI-Verified Precedent</span>
          </div>
        </div>

      </main>
    </div>
  );
}