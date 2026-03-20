// app/lawyer-dashboard/page.js
import Link from 'next/link';
import { getAllCases } from '@/adapters/database';

export default async function LawyerDashboard() {
  // Fetch all cases directly from SQLite
  const allCases = await getAllCases();

  return (
    <div className="min-h-screen bg-slate-950 p-8 font-sans">
      <nav className="flex justify-between items-center mb-12 border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-white tracking-wider">AURA <span className="text-blue-500">LEGAL TERMINAL</span></h1>
        <div className="flex gap-6 items-center">
            <span className="text-slate-400 text-sm">Welcome, Jane Smith, Esq.</span>
            <Link href="/" className="text-slate-500 hover:text-white transition">Sign Out</Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Active Case Roster</h2>
            <p className="text-slate-400">Review incoming FIRs and citizen legal requests.</p>
          </div>
          <div className="text-slate-400 bg-slate-900 px-4 py-2 rounded-md border border-slate-800">
            Total Pending: <span className="text-white font-bold">{allCases.length}</span>
          </div>
        </div>

        {/* Case Data Grid */}
        <div className="grid grid-cols-1 gap-4">
          {allCases.length === 0 ? (
            <div className="p-8 border border-slate-800 rounded-xl bg-slate-900 text-slate-500 text-center">
              No active cases currently in the system.
            </div>
          ) : (
            allCases.map((legalCase) => (
              <div key={legalCase.id} className="p-6 border border-slate-800 rounded-xl bg-slate-900 hover:border-blue-500 transition group flex justify-between items-center">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-slate-100 group-hover:text-blue-400 transition">{legalCase.title}</h3>
                    <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded text-xs uppercase tracking-wider font-bold">
                      {legalCase.status}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm line-clamp-1">{legalCase.description}</p>
                  <p className="text-slate-600 text-xs mt-2">Case ID: #{legalCase.id} • Submitted by User ID: {legalCase.user_id}</p>
                </div>
                
                {/* The button to open the specific case (We will build this page tomorrow!) */}
                <Link 
                    href={`/lawyer-dashboard/case/${legalCase.id}`}
                    className="bg-slate-800 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-600 transition border border-slate-700 hover:border-blue-500"
                >
                  Review & Strategize →
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}