
import Link from 'next/link';

import { Shield, FileText, Clock, ChevronRight, Plus, User, LogOut, Scale, Building2 } from 'lucide-react';

export default async function CitizenDashboard() {
  // 🚨 HACKATHON MOCK DATA BYPASS 🚨
  // Vercel can't read SQLite, so we feed the UI this realistic data instead!
  const activeCases = [
    {
      id: 1,
      caseNumber: "CAS-2026-881",
      status: "Pending",
      title: "Unfair Eviction Notice",
      description: "Landlord sent a 3-day notice without citing rent control violations.",
      filedDate: "2026-03-28T09:45:00Z",
      lastUpdated: "2026-03-28T09:45:00Z"
    },
    {
      id: 2,
      caseNumber: "CAS-2026-882",
      status: "AI Scanned",
      title: "Workplace Harassment Claim",
      description: "Initial FIR drafted regarding unpaid overtime and verbal abuse.",
      filedDate: "2026-03-27T10:00:00Z",
      lastUpdated: "2026-03-27T14:20:00Z"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Official Government Header Bar */}
      <div className="bg-slate-900 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            <span className="font-medium">National Legal Services Portal</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span>Govt. of India Initiative</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">Skip to main content</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white border-b-4 border-blue-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-900 rounded">
                <Scale className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-blue-900 tracking-tight">Citizen Legal Portal</h1>
                <p className="text-xs text-slate-500 -mt-0.5">Ministry of Law & Justice</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded border border-slate-200">
                <User className="h-4 w-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-700">John Doe</span>
                <span className="text-xs text-slate-500">(Citizen ID: 1)</span>
              </div>
              <Link 
                href="/" 
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded border border-transparent hover:border-slate-200 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Premium Legal Hero Section */}
      <section className="relative w-full overflow-hidden">
        {/* Highly Realistic Courtroom Background */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=85&w=2000')",
            backgroundPosition: "center 30%",
            backgroundSize: "cover",
          }}
        />
        
        {/* Deep Authoritative Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-950/95 via-stone-900/90 to-amber-950/85" />
        
        {/* Subtle Vignette Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Left: Text Content with Glassmorphism Card */}
            <div className="flex-1 max-w-2xl">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                <Shield className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-medium text-amber-100">Government Certified Legal Portal</span>
              </div>
              
              {/* Main Heading */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight text-balance mb-6">
                Your Legal
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-yellow-200">
                  Command Center
                </span>
              </h2>
              
              {/* Glassmorphism Description Card */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 mb-8 shadow-2xl">
                <p className="text-lg text-stone-200 leading-relaxed">
                  Securely track your proceedings, review AI-verified evidence, and draft official legal documents with full confidentiality and encryption.
                </p>
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-amber-300/90 text-sm">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span>256-bit Encryption Active</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 text-amber-300/90 text-sm">
                    <Scale className="h-4 w-4" />
                    <span>Legally Privileged</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right: Premium CTA Button */}
            <div className="flex flex-col items-center lg:items-end gap-6">
              <a 
                href="/citizen-dashboard/fir-drafter" 
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden"
              >
                {/* Button Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 rounded-xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                
                {/* Button Content */}
                <div className="relative flex items-center gap-3 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-stone-950 px-8 py-5 font-bold text-base uppercase tracking-wider rounded-xl shadow-2xl shadow-amber-500/30 hover:shadow-amber-400/50 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-center w-10 h-10 bg-stone-950/20 rounded-lg">
                    <Plus className="h-6 w-6" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-xs font-medium opacity-80 normal-case tracking-normal">Start New Case</span>
                    <span>File FIR Draft</span>
                  </div>
                  <ChevronRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                </div>
              </a>
              
              {/* Supporting Text */}
              <p className="text-stone-400 text-sm text-center lg:text-right max-w-xs">
                AI-assisted drafting with real-time legal compliance verification
              </p>
            </div>
          </div>
        </div>
        
        {/* Bottom Fade to Page */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent" />
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border-t-4 border-blue-900 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded">
                <FileText className="h-5 w-5 text-blue-900" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{activeCases.length}</p>
                <p className="text-sm text-slate-600">Total Cases</p>
              </div>
            </div>
          </div>
          <div className="bg-white border-t-4 border-amber-500 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-50 rounded">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {activeCases.filter(c => c.status === 'Pending' || c.status === 'Under Review').length}
                </p>
                <p className="text-sm text-slate-600">Awaiting Action</p>
              </div>
            </div>
          </div>
          <div className="bg-white border-t-4 border-emerald-600 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 rounded">
                <Shield className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {activeCases.filter(c => c.status === 'AI Scanned').length}
                </p>
                <p className="text-sm text-slate-600">AI Verified</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cases List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b-2 border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wide">Case Registry</h3>
            <span className="text-sm text-slate-500">Last updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>

          {activeCases.length === 0 ? (
            <div className="bg-white border-t-4 border-slate-300 p-8 text-center shadow-sm">
              <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-slate-700 mb-2">No Active Cases Found</h4>
              <p className="text-slate-500 mb-6">You currently have no ongoing legal cases registered in the system.</p>
              <a 
                href="/citizen-dashboard/fir-drafter" 
                className="inline-flex items-center gap-2 bg-blue-900 text-white px-6 py-3 font-semibold text-sm uppercase tracking-wide hover:bg-blue-800 transition-all"
              >
                <Plus className="h-4 w-4" />
                <span>File Your First FIR</span>
              </a>
            </div>
          ) : (
            activeCases.map((legalCase) => (
              <div 
                key={legalCase.id} 
                className="bg-white border-t-4 border-blue-900 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    {/* Case Details */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="hidden sm:flex items-center justify-center w-12 h-12 bg-slate-100 rounded border border-slate-200 flex-shrink-0">
                          <FileText className="h-6 w-6 text-blue-900" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            {legalCase.caseNumber && (
                              <span className="text-xs font-mono font-bold text-blue-900 bg-blue-50 px-2 py-0.5 border border-blue-200">
                                {legalCase.caseNumber}
                              </span>
                            )}
                            <StatusBadge status={legalCase.status} />
                          </div>
                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                            {legalCase.title}
                          </h3>
                          <p className="text-slate-600 mt-1 text-sm leading-relaxed">
                            {legalCase.description}
                          </p>
                          {(legalCase.filedDate || legalCase.lastUpdated) && (
                            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-500">
                              {legalCase.filedDate && (
                                <span className="flex items-center gap-1">
                                  <FileText className="h-3.5 w-3.5" />
                                  Filed: {new Date(legalCase.filedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </span>
                              )}
                              {legalCase.lastUpdated && (
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3.5 w-3.5" />
                                  Updated: {new Date(legalCase.lastUpdated).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Arrow */}
                    <div className="flex items-center justify-end lg:justify-center">
                      <div className="flex items-center gap-2 text-sm font-semibold text-blue-900 group-hover:text-blue-700">
                        <span className="hidden lg:inline">View Details</span>
                        <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Help Section */}
        <div className="mt-12 bg-slate-100 border border-slate-200 p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-900 rounded flex-shrink-0">
              <Scale className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-slate-900">Need Legal Assistance?</h4>
              <p className="text-slate-600 text-sm mt-1">
                Our AI-powered copilot can help you understand your rights and guide you through legal procedures.
              </p>
            </div>
            <a 
              href="/citizen-dashboard/assistant"
              className="inline-flex items-center gap-2 bg-white border-2 border-blue-900 text-blue-900 px-5 py-2.5 font-semibold text-sm hover:bg-blue-900 hover:text-white transition-all"
            >
              <span>Access AI Assistant</span>
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </main>

      {/* Premium Dark Footer - Matching Hero Aesthetic */}
      <footer className="bg-stone-950 border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Main Footer Content */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo & Tagline */}
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-lg">
                <Scale className="h-5 w-5 text-stone-950" />
              </div>
              <div>
                <span className="font-semibold text-white tracking-wide">Legal Command Center</span>
                <p className="text-xs text-stone-500">Secure Legal Infrastructure</p>
              </div>
            </div>
            
            {/* Navigation Links */}
            <nav className="flex items-center gap-8 text-sm">
              <a 
                href="#" 
                className="text-stone-400 hover:text-amber-400 transition-colors duration-200"
              >
                Support & FAQ
              </a>
              <a 
                href="#" 
                className="text-stone-400 hover:text-amber-400 transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="text-stone-400 hover:text-amber-400 transition-colors duration-200"
              >
                Terms of Service
              </a>
            </nav>
          </div>
          
          {/* Security Tagline */}
          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="font-mono text-xs tracking-widest text-stone-600 uppercase">
              Secure Infrastructure • Encrypted Connection
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
// Status Badge Component with Gov-Tech styling (Fixed for JavaScript)
function StatusBadge({ status }) {
  const getStatusStyles = (statusText) => {
    // Safety check: prevents crashing if status is missing
    if (!statusText) return 'bg-slate-100 text-slate-700 border-slate-300';
    
    switch (statusText.toLowerCase()) {
      case 'pending':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'under review':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'ai scanned':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'resolved':
        return 'bg-slate-100 text-slate-700 border-slate-300';
      case 'urgent':
        return 'bg-red-100 text-red-900 border-red-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider border ${getStatusStyles(status)}`}>
      {status || 'Unknown'}
    </span>
  );
}


// import Link from 'next/link';
// import { getUserCases } from '@/adapters/database';
// import { Shield, FileText, Clock, ChevronRight, Plus, User, LogOut, Scale, Building2 } from 'lucide-react';

// export default async function CitizenDashboard() {
//   const activeCases = await getUserCases(1);

//   return (
//     <div className="min-h-screen bg-slate-50">
      
//       {/* Official Government Header Bar */}
//       <div className="bg-slate-900 text-white py-2 px-4">
//         <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
//           <div className="flex items-center gap-2">
//             <Building2 className="h-4 w-4 text-slate-400" />
//             <span className="font-medium text-slate-300">National Legal Services Portal</span>
//           </div>
//           <div className="flex items-center gap-4 text-slate-400">
//             <span>Govt. of India Initiative</span>
//             <span className="hidden sm:inline">|</span>
//             <span className="hidden sm:inline">Skip to main content</span>
//           </div>
//         </div>
//       </div>

//       {/* Main Navigation */}
//       <nav className="bg-white border-b border-slate-200 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center gap-3">
//               <div className="flex items-center justify-center w-10 h-10 bg-slate-900 rounded-lg shadow-inner">
//                 <Scale className="h-5 w-5 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-slate-900 tracking-tight">Citizen Legal Portal</h1>
//                 <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 -mt-0.5">Ministry of Law & Justice</p>
//               </div>
//             </div>
            
//             <div className="flex items-center gap-4">
//               <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-md border border-slate-200">
//                 <User className="h-4 w-4 text-slate-500" />
//                 <span className="text-sm font-semibold text-slate-700">John Doe</span>
//                 <span className="text-xs font-medium text-slate-400">(Citizen ID: 1)</span>
//               </div>
//               <Link 
//                 href="/" 
//                 className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
//               >
//                 <LogOut className="h-4 w-4" />
//                 <span>Sign Out</span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Premium Legal Hero Section - Swapped to Deep Navy/Slate to fix the gold fatigue */}
//       <section className="relative w-full overflow-hidden bg-slate-950">
//         {/* Subtle Background Pattern instead of image for cleaner look */}
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        
//         {/* Deep Authoritative Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800/90" />

//         {/* Content Container */}
//         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//           <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
//             {/* Left: Text Content */}
//             <div className="flex-1 max-w-2xl">
//               <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-full">
//                 <Shield className="h-4 w-4 text-emerald-400" />
//                 <span className="text-sm font-semibold text-slate-200 tracking-wide">Government Certified Portal</span>
//               </div>
              
//               <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
//                 Your Legal
//                 <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">
//                   Command Center
//                 </span>
//               </h2>
              
//               <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 mb-8">
//                 <p className="text-lg text-slate-300 leading-relaxed">
//                   Securely track your proceedings, review AI-verified evidence, and draft official legal documents with full confidentiality and encryption.
//                 </p>
//                 <div className="flex items-center gap-4 mt-5 pt-5 border-t border-slate-700/50">
//                   <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
//                     <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
//                     <span>256-bit Encryption Active</span>
//                   </div>
//                   <div className="hidden sm:flex items-center gap-2 text-slate-400 text-sm font-medium">
//                     <Scale className="h-4 w-4" />
//                     <span>Legally Privileged</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Right: Primary CTA Button (The ONLY gold element to make it pop) */}
//             <div className="flex flex-col items-center lg:items-end gap-6">
//               <a 
//                 href="/citizen-dashboard/fir-drafter" 
//                 className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl"
//               >
//                 {/* Button Glow Effect */}
//                 <div className="absolute inset-0 bg-amber-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                
//                 {/* Button Content */}
//                 <div className="relative flex items-center gap-3 bg-amber-500 text-slate-950 px-8 py-5 font-bold text-base uppercase tracking-wider rounded-xl shadow-lg hover:shadow-amber-500/25 transition-all duration-300 hover:-translate-y-1">
//                   <div className="flex items-center justify-center w-10 h-10 bg-slate-950/10 rounded-lg">
//                     <Plus className="h-6 w-6" />
//                   </div>
//                   <div className="flex flex-col items-start">
//                     <span className="text-xs font-bold opacity-80 normal-case tracking-normal">Start New Case</span>
//                     <span>File FIR Draft</span>
//                   </div>
//                   <ChevronRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
//                 </div>
//               </a>
              
//               <p className="text-slate-400 text-sm font-medium text-center lg:text-right max-w-xs">
//                 AI-assisted drafting with real-time legal compliance verification
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Main Content Area */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-8 relative z-20">

//         {/* Quick Stats Bar */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
//           <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-slate-100 rounded-lg">
//                 <FileText className="h-6 w-6 text-slate-700" />
//               </div>
//               <div>
//                 <p className="text-2xl font-bold text-slate-900">{activeCases.length}</p>
//                 <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">Total Cases</p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-blue-50 rounded-lg">
//                 <Clock className="h-6 w-6 text-blue-600" />
//               </div>
//               <div>
//                 <p className="text-2xl font-bold text-slate-900">
//                   {activeCases.filter(c => c.status === 'Pending' || c.status === 'Under Review').length}
//                 </p>
//                 <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">Awaiting Action</p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-emerald-50 rounded-lg">
//                 <Shield className="h-6 w-6 text-emerald-600" />
//               </div>
//               <div>
//                 <p className="text-2xl font-bold text-slate-900">
//                   {activeCases.filter(c => c.status === 'AI Scanned').length}
//                 </p>
//                 <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">AI Verified</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Cases List */}
//         <div className="space-y-4">
//           <div className="flex items-center justify-between pb-2 mb-4">
//             <h3 className="text-lg font-bold text-slate-900">Active Case Registry</h3>
//             <span className="text-sm font-medium text-slate-500">Last updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
//           </div>

//           {activeCases.length === 0 ? (
//             <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-sm">
//               <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <FileText className="h-8 w-8 text-slate-400" />
//               </div>
//               <h4 className="text-lg font-bold text-slate-900 mb-2">No Active Cases Found</h4>
//               <p className="text-slate-500 mb-6">You currently have no ongoing legal cases registered in the system.</p>
//               <a 
//                 href="/citizen-dashboard/fir-drafter" 
//                 className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-slate-800 transition-colors shadow-sm"
//               >
//                 <Plus className="h-4 w-4" />
//                 <span>File Your First FIR</span>
//               </a>
//             </div>
//           ) : (
//             activeCases.map((legalCase) => (
//               <div 
//                 key={legalCase.id} 
//                 className="bg-white rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all cursor-pointer group p-6"
//               >
//                 <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
//                   <div className="flex-1 flex items-start gap-5">
//                     <div className="hidden sm:flex items-center justify-center w-12 h-12 bg-slate-50 rounded-lg border border-slate-100 flex-shrink-0">
//                       <FileText className="h-6 w-6 text-slate-400" />
//                     </div>
//                     <div>
//                       <div className="flex items-center gap-3 mb-2">
//                         {legalCase.caseNumber && (
//                           <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">
//                             {legalCase.caseNumber}
//                           </span>
//                         )}
//                         <StatusBadge status={legalCase.status} />
//                       </div>
//                       <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
//                         {legalCase.title}
//                       </h3>
//                       <p className="text-slate-500 mt-1 text-sm leading-relaxed">
//                         {legalCase.description}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-end lg:justify-center">
//                     <div className="flex items-center gap-2 text-sm font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
//                       <span>View Case File</span>
//                       <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Support Section */}
//         <div className="mt-8 bg-slate-900 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden relative">
//           <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
//           <div className="relative z-10 flex items-center gap-4">
//             <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
//               <Scale className="h-6 w-6 text-white" />
//             </div>
//             <div>
//               <h4 className="text-lg font-bold text-white">Need Legal Assistance?</h4>
//               <p className="text-slate-400 text-sm mt-1">Our AI copilot can help you understand your rights.</p>
//             </div>
//           </div>
//           <a 
//             href="/citizen-dashboard/assistant"
//             className="relative z-10 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg font-bold text-sm hover:bg-slate-100 transition-colors"
//           >
//             Access AI Assistant <ChevronRight className="h-4 w-4" />
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }

// // Status Badge Component
// function StatusBadge({ status }) {
//   const getStatusStyles = (statusText) => {
//     if (!statusText) return 'bg-slate-100 text-slate-700';
    
//     switch (statusText.toLowerCase()) {
//       case 'pending':
//         return 'bg-amber-100 text-amber-800';
//       case 'under review':
//         return 'bg-blue-100 text-blue-800';
//       case 'ai scanned':
//         return 'bg-emerald-100 text-emerald-800';
//       default:
//         return 'bg-slate-100 text-slate-700';
//     }
//   };

//   return (
//     <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${getStatusStyles(status)}`}>
//       {status || 'Unknown'}
//     </span>
//   );
// }