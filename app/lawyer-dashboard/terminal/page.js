
// "use client";

// import { useState } from 'react';
// import Link from 'next/link';
// import { Search, Scale, BookmarkPlus, BookmarkCheck, Database } from 'lucide-react';
// import { useQuery, useMutation } from "convex/react";
// import { api } from "../../../convex/_generated/api"; // Adjust path if needed

// export default function LawyerTerminal() {
//   const [input, setInput] = useState('');
//   const [messages, setMessages] = useState([
//     { role: 'ai', content: 'Aura Neural Search Online. Enter a legal query to scrape Indian case law precedents.' }
//   ]);
//   const [isSearching, setIsSearching] = useState(false);

//   // 💥 CONVEX REAL-TIME HOOKS
//   const pinnedCases = useQuery(api.precedents.getPinned, { lawyerId: "Lawyer_001" });
//   const pinCaseMutation = useMutation(api.precedents.pinCase);
//   const [justPinned, setJustPinned] = useState(null); // Animation state

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const currentQuery = input; 
//     setMessages(prev => [...prev, { role: 'user', content: currentQuery }]);
//     setInput('');
//     setIsSearching(true);

//     try {
//       // Calls your Exa + Gemini Backend
//       const response = await fetch('/api/lawyer-search', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message: currentQuery }),
//       });

//       const data = await response.json();
//       setMessages(prev => [...prev, { role: 'ai', content: data.content, precedents: data.precedents }]);
//     } catch (error) {
//       setMessages(prev => [...prev, { role: 'ai', content: "Neural search failed. Please verify API connections." }]);
//     } finally {
//       setIsSearching(false);
//     }
//   };

//   const handlePin = async (prec) => {
//     setJustPinned(prec.title);
//     await pinCaseMutation({
//       lawyerId: "Lawyer_001",
//       caseTitle: prec.title,
//       relevance: prec.relevance || "High",
//       code: prec.code || "Legal Precedent",
//       datePinned: Date.now(),
//     });
//     setTimeout(() => setJustPinned(null), 2000);
//   };

//   return (
//     <div className="min-h-screen bg-stone-950 text-stone-300 p-6 flex gap-6 font-sans">
      
//       {/* LEFT SIDE: Exa Neural Search Terminal */}
//       <div className="flex-1 flex flex-col bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl">
//         <div className="p-4 border-b border-stone-800 bg-stone-950 flex items-center justify-between">
//           <h2 className="font-bold text-amber-500 tracking-widest uppercase text-sm flex items-center gap-2">
//             <Search className="w-4 h-4" /> Neural Precedent Search
//           </h2>
//           <Link href="/lawyer-dashboard" className="text-xs text-stone-500 hover:text-amber-500">Exit Terminal</Link>
//         </div>

//         <div className="flex-1 overflow-y-auto p-6 space-y-6">
//           {messages.map((msg, idx) => (
//             <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
//               <div className={`max-w-[85%] p-4 rounded-xl text-sm ${msg.role === 'user' ? 'bg-stone-800 text-stone-200' : 'bg-stone-950 border border-stone-800 text-stone-300'}`}>
//                 {msg.content}
//               </div>
              
//               {/* Render the glowing precedent cards if Exa found any */}
//               {msg.precedents && (
//                 <div className="mt-4 grid gap-3 w-full max-w-[85%]">
//                   {msg.precedents.map((prec, i) => (
//                     <div key={i} className="bg-stone-900 border border-amber-500/30 p-4 rounded-xl flex justify-between items-center group hover:border-amber-500 transition-all">
//                       <div>
//                         <h4 className="font-bold text-amber-400">{prec.title}</h4>
//                         <p className="text-xs text-stone-500 mt-1 uppercase tracking-wider">{prec.code} • {prec.relevance} Match</p>
//                       </div>
//                       <button 
//                         onClick={() => handlePin(prec)}
//                         className="p-2 bg-stone-950 border border-stone-800 rounded-lg hover:text-amber-500 transition-colors"
//                       >
//                         {justPinned === prec.title ? <BookmarkCheck className="w-5 h-5 text-emerald-500" /> : <BookmarkPlus className="w-5 h-5 text-stone-400" />}
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//           {isSearching && <div className="text-amber-500 text-sm animate-pulse flex items-center gap-2"><Database className="w-4 h-4" /> Scraping live web parameters...</div>}
//         </div>

//         <form onSubmit={handleSendMessage} className="p-4 bg-stone-950 border-t border-stone-800 flex gap-2">
//           <input 
//             type="text" 
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             className="flex-1 bg-stone-900 border border-stone-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-amber-500/50"
//             placeholder="Search Exa database for case laws..."
//           />
//           <button type="submit" className="bg-amber-600 hover:bg-amber-500 text-stone-950 px-6 font-bold rounded-lg transition-colors">
//             Query
//           </button>
//         </form>
//       </div>

//       {/* RIGHT SIDE: Convex Real-Time Pinboard */}
//       <div className="w-80 bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
//         <div className="p-4 border-b border-stone-800 bg-stone-950">
//           <h2 className="font-bold text-emerald-500 tracking-widest uppercase text-sm flex items-center gap-2">
//             <Scale className="w-4 h-4" /> Case Pinboard
//           </h2>
//           <p className="text-[10px] text-stone-500 mt-1 uppercase">Live Convex Sync</p>
//         </div>
        
//         <div className="flex-1 overflow-y-auto p-4 space-y-3">
//           {pinnedCases === undefined ? (
//             <div className="text-stone-500 text-sm animate-pulse text-center mt-10">Connecting to Vault...</div>
//           ) : pinnedCases.length === 0 ? (
//             <div className="text-stone-600 text-sm text-center mt-10">No precedents pinned yet.</div>
//           ) : (
//             pinnedCases.map((pin) => (
//               <div key={pin._id} className="bg-stone-950 border border-stone-800 p-3 rounded-lg shadow-sm">
//                 <h4 className="font-bold text-sm text-stone-200">{pin.caseTitle}</h4>
//                 <div className="flex items-center gap-2 mt-2">
//                   <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded uppercase font-bold">{pin.relevance}</span>
//                   <span className="text-[10px] text-stone-500 uppercase">{pin.code}</span>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//     </div>
//   );
// }



"use client";

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Search, Scale, BookmarkPlus, BookmarkCheck, Database, Paperclip, Download, ChevronDown, ChevronUp } from 'lucide-react';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api"; 

export default function LawyerTerminal() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Aura Neural Search Online. Enter a legal query to scrape Indian case law precedents.' }
  ]);
  const [isSearching, setIsSearching] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null); // Tracks which card is clicked open
  
  const fileInputRef = useRef(null);

  // CONVEX REAL-TIME HOOKS
  const pinnedCases = useQuery(api.precedents.getPinned, { lawyerId: "Lawyer_001" });
  const pinCaseMutation = useMutation(api.precedents.pinCase);
  const [justPinned, setJustPinned] = useState(null); 

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const currentQuery = input; 
    setMessages(prev => [...prev, { role: 'user', content: currentQuery }]);
    setInput('');
    setIsSearching(true);

    try {
      const response = await fetch('/api/lawyer-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentQuery }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'ai', content: data.content, precedents: data.precedents }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: "Neural search failed. Please verify API connections." }]);
    } finally {
      setIsSearching(false);
    }
  };

  const handlePin = async (e, prec) => {
    e.stopPropagation(); // Stops the card from expanding when clicking the pin button
    setJustPinned(prec.title);
    await pinCaseMutation({
      lawyerId: "Lawyer_001",
      caseTitle: prec.title,
      relevance: prec.relevance || "High",
      code: prec.code || "Legal Precedent",
      datePinned: Date.now(),
    });
    setTimeout(() => setJustPinned(null), 2000);
  };

  // Hackathon Trick: Generate a downloadable text file of the case brief!
  const handleDownloadBrief = () => {
    const briefContent = messages
      .filter(m => m.precedents)
      .map(m => m.precedents.map(p => `CASE: ${p.title}\nACT: ${p.code}\nRULING: ${p.details || "Details not available."}\n---\n`).join('\n'))
      .join('\n');
    
    if (!briefContent) return alert("No precedents to download yet!");

    const blob = new Blob([briefContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Aura_Legal_Brief.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-300 p-6 flex gap-6 font-sans">
      
      {/* LEFT SIDE: Exa Neural Search Terminal */}
      <div className="flex-1 flex flex-col bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-stone-800 bg-stone-950 flex items-center justify-between">
          <h2 className="font-bold text-amber-500 tracking-widest uppercase text-sm flex items-center gap-2">
            <Search className="w-4 h-4" /> Neural Precedent Search
          </h2>
          <div className="flex items-center gap-4">
            {/* DOWNLOAD BUTTON */}
            <button onClick={handleDownloadBrief} className="text-xs flex items-center gap-1 bg-stone-800 hover:bg-stone-700 px-3 py-1.5 rounded-md text-stone-300 transition-colors">
              <Download className="w-3 h-3" /> Export Brief
            </button>
            <Link href="/lawyer-dashboard" className="text-xs text-stone-500 hover:text-amber-500">Exit Terminal</Link>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-xl text-sm ${msg.role === 'user' ? 'bg-stone-800 text-stone-200' : 'bg-stone-950 border border-stone-800 text-stone-300'}`}>
                {msg.content}
              </div>
              
              {msg.precedents && (
                <div className="mt-4 grid gap-3 w-full max-w-[85%]">
                  {msg.precedents.map((prec, i) => (
                    // CLICK TO EXPAND LOGIC
                    <div 
                      key={i} 
                      onClick={() => setExpandedCard(expandedCard === prec.title ? null : prec.title)}
                      className="bg-stone-900 border border-amber-500/30 rounded-xl cursor-pointer hover:border-amber-500 transition-all overflow-hidden"
                    >
                      <div className="p-4 flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-amber-400">{prec.title}</h4>
                          <p className="text-xs text-stone-500 mt-1 uppercase tracking-wider">{prec.code} • {prec.relevance} Match</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button onClick={(e) => handlePin(e, prec)} className="p-2 bg-stone-950 border border-stone-800 rounded-lg hover:text-amber-500 transition-colors">
                            {justPinned === prec.title ? <BookmarkCheck className="w-5 h-5 text-emerald-500" /> : <BookmarkPlus className="w-5 h-5 text-stone-400" />}
                          </button>
                          {expandedCard === prec.title ? <ChevronUp className="w-5 h-5 text-stone-500" /> : <ChevronDown className="w-5 h-5 text-stone-500" />}
                        </div>
                      </div>
                      
                      {/* EXPANDED DETAILS SECTION */}
                      {expandedCard === prec.title && (
                        <div className="px-4 pb-4 pt-2 border-t border-stone-800 bg-stone-950/50">
                          <p className="text-sm text-stone-400 leading-relaxed">{prec.details || "Generating deep-dive analytics for this precedent..."}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          {isSearching && <div className="text-amber-500 text-sm animate-pulse flex items-center gap-2"><Database className="w-4 h-4" /> Scraping live web parameters...</div>}
        </div>

        <form onSubmit={handleSendMessage} className="p-4 bg-stone-950 border-t border-stone-800 flex gap-2 items-center">
          {/* UPLOAD BUTTON */}
          <input type="file" ref={fileInputRef} className="hidden" accept=".pdf,.doc,.docx" />
          <button type="button" onClick={() => fileInputRef.current.click()} className="p-3 bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded-lg text-stone-400 hover:text-amber-500 transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>
          
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-stone-900 border border-stone-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-amber-500/50"
            placeholder="Search Exa database for case laws..."
          />
          <button type="submit" className="bg-amber-600 hover:bg-amber-500 text-stone-950 px-6 py-3 font-bold rounded-lg transition-colors">
            Query
          </button>
        </form>
      </div>

      {/* RIGHT SIDE: Convex Real-Time Pinboard (Remains Exactly the Same) */}
      <div className="w-80 bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        <div className="p-4 border-b border-stone-800 bg-stone-950">
          <h2 className="font-bold text-emerald-500 tracking-widest uppercase text-sm flex items-center gap-2">
            <Scale className="w-4 h-4" /> Case Pinboard
          </h2>
          <p className="text-[10px] text-stone-500 mt-1 uppercase">Live Convex Sync</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {pinnedCases === undefined ? (
            <div className="text-stone-500 text-sm animate-pulse text-center mt-10">Connecting to Vault...</div>
          ) : pinnedCases.length === 0 ? (
            <div className="text-stone-600 text-sm text-center mt-10">No precedents pinned yet.</div>
          ) : (
            pinnedCases.map((pin) => (
              <div key={pin._id} className="bg-stone-950 border border-stone-800 p-3 rounded-lg shadow-sm">
                <h4 className="font-bold text-sm text-stone-200">{pin.caseTitle}</h4>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded uppercase font-bold">{pin.relevance}</span>
                  <span className="text-[10px] text-stone-500 uppercase">{pin.code}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}