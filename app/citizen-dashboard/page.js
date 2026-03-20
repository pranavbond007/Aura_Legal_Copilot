// // app/citizen-dashboard/page.tsx
// import Link from 'next/link';
// // Import your database adapter!
// import { getUserCases } from '@/adapters/database';

// export default async function CitizenDashboard() {
//   // We are hardcoding user ID 1 (John Doe) for now since we don't have a real login yet.
//   // This calls your SQLite database securely from the server!
//   const activeCases = await getUserCases(1);

//   return (
//     <div className="min-h-screen bg-white p-8">
//       <nav className="flex justify-between items-center mb-12 border-b pb-4">
//         <h1 className="text-2xl font-bold text-blue-600">Citizen Portal</h1>
//         <Link href="/" className="text-gray-500 hover:text-gray-900">Sign Out</Link>
//       </nav>
// {/* 
//       <div className="max-w-4xl mx-auto space-y-6">
//         <div className="flex justify-between items-center">
//           <h2 className="text-3xl font-bold text-gray-900">Your Active Cases</h2>
//           <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
//             + New FIR Draft
//           </button>
//         </div> */}
//         <div className="flex justify-between items-center">
//           <h2 className="text-3xl font-bold text-gray-900">Your Active Cases</h2>
          
//           {/* Change <button> to <a> and add the href! */}
//           <a 
//             href="/citizen-dashboard/fir-drafter" 
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 inline-block"
//           >
//             + New FIR Draft
//           </a>
          
//         </div>

//         {/* Display the cases from the database */}
//         <div className="grid gap-4">
//           {activeCases.length === 0 ? (
//             <div className="p-6 border rounded-xl bg-gray-50 text-gray-500">
//               No active cases found.
//             </div>
//           ) : (
//             activeCases.map((legalCase) => (
//               <div key={legalCase.id} className="p-6 border rounded-xl bg-white border-gray-200 shadow-sm flex justify-between items-center">
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-900">{legalCase.title}</h3>
//                   <p className="text-gray-600 mt-1">{legalCase.description}</p>
//                 </div>
//                 <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
//                   {legalCase.status}
//                 </span>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


// app/citizen-dashboard/page.tsx
import Link from 'next/link';
import { getUserCases } from '@/adapters/database';

export default async function CitizenDashboard() {
  const activeCases = await getUserCases(1);

  return (
    <div className="min-h-screen bg-white p-8">
      <nav className="flex justify-between items-center mb-12 border-b pb-4">
        <h1 className="text-2xl font-bold text-blue-600">Citizen Portal</h1>
        <Link href="/" className="text-gray-500 hover:text-gray-900">Sign Out</Link>
      </nav>

      {/* ✅ RESTORED THIS MISSING OPENING DIV! */}
      <div className="max-w-4xl mx-auto space-y-6">
        
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900">Your Active Cases</h2>
          
          {/* Working Link to FIR Drafter */}
          <a 
            href="/citizen-dashboard/fir-drafter" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 inline-block transition"
          >
            + New FIR Draft
          </a>
        </div>

        {/* Display the cases from the database */}
        <div className="grid gap-4">
          {activeCases.length === 0 ? (
            <div className="p-6 border rounded-xl bg-gray-50 text-gray-500">
              No active cases found.
            </div>
          ) : (
            activeCases.map((legalCase) => (
              <div key={legalCase.id} className="p-6 border rounded-xl bg-white border-gray-200 shadow-sm flex justify-between items-center hover:border-blue-300 transition cursor-pointer">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{legalCase.title}</h3>
                  <p className="text-gray-600 mt-1 text-sm">{legalCase.description}</p>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold uppercase tracking-wider">
                  {legalCase.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}