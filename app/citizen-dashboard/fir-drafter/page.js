// // // app/citizen-dashboard/fir-drafter/page.js
// // "use client";

// // import { useState, useRef } from 'react';
// // import Link from 'next/link';
// // import { draftFIR } from '@/adapters/ai_agent';

// // export default function FIRDrafter() {
// //   const [messages, setMessages] = useState([
// //     { role: 'ai', content: 'Hello. I am here to help you draft an FIR. You can type, speak to me using the microphone, or upload evidence (like a photo of a notice or damage).' }
// //   ]);
// //   const [input, setInput] = useState('');
// //   const [isThinking, setIsThinking] = useState(false);
// //   const [finalDraft, setFinalDraft] = useState(null);
  
// //   // New States for Option 1 & 2
// //   const [isListening, setIsListening] = useState(false);
// //   const [isUploading, setIsUploading] = useState(false);
// //   const fileInputRef = useRef(null);

// //   // OPTION 1: Voice Assistant Logic
// //   const toggleListening = () => {
// //     if (isListening) {
// //       setIsListening(false);
// //       return;
// //     }
    
// //     // Check for browser support
// //     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// //     if (!SpeechRecognition) {
// //       alert("Your browser does not support voice input. Please use Chrome or Edge.");
// //       return;
// //     }

// //     const recognition = new SpeechRecognition();
// //     recognition.continuous = false;
// //     recognition.interimResults = true;

// //     recognition.onstart = () => setIsListening(true);
    
// //     recognition.onresult = (event) => {
// //       const currentTranscript = event.results[0][0].transcript;
// //       setInput(currentTranscript);
// //     };

// //     recognition.onend = () => setIsListening(false);
    
// //     recognition.start();
// //   };

// //   // OPTION 2: Smart Evidence Vault (Upload Logic)
// //   const handleFileUpload = async (event) => {
// //     const file = event.target.files[0];
// //     if (!file) return;

// //     setIsUploading(true);
    
// //     // Mocking an AI Vision delay (pretending to read the document)
// //     await new Promise(resolve => setTimeout(resolve, 2500)); 

// //     const newMessages = [
// //       ...messages, 
// //       { role: 'user', content: `[Uploaded Evidence: ${file.name}]` },
// //       { role: 'ai', content: `I have successfully scanned "${file.name}". I extracted the following key info: "Notice served on [Date], demanding immediate action." I will include this in the case file.` }
// //     ];
    
// //     setMessages(newMessages);
// //     setIsUploading(false);
// //   };

// //   // Original Chat Logic
// //   const sendMessage = async () => {
// //     if (!input.trim()) return;
// //     const newMessages = [...messages, { role: 'user', content: input }];
// //     setMessages(newMessages);
// //     setInput('');
// //     setIsThinking(true);

// //     const response = await draftFIR(input);
// //     setMessages([...newMessages, { role: 'ai', content: response.reply }]);
    
// //     if (response.isDraftComplete) setFinalDraft(response.draftText);
// //     setIsThinking(false);
// //   };

// //   return (
// //     <div className="min-h-screen bg-slate-950 p-8 font-sans">
// //       <nav className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
// //         <h1 className="text-2xl font-bold text-white tracking-wider">Aura <span className="text-blue-500">Citizen</span></h1>
// //         <Link href="/citizen-dashboard" className="text-slate-400 hover:text-white transition">Exit Chat</Link>
// //       </nav>

// //       <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
// //         {/* Left Side: Interactive Agent */}
// //         <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl flex flex-col h-[650px] overflow-hidden relative">
          
// //           {/* Upload Overlay */}
// //           {isUploading && (
// //             <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-blue-400">
// //               <div className="animate-spin text-4xl mb-4">↻</div>
// //               <p className="font-bold">AI Vision Scanning Document...</p>
// //             </div>
// //           )}

// //           <div className="p-5 border-b border-slate-800 bg-slate-900/50 font-bold text-slate-200">
// //             Secure Legal Interview
// //           </div>
          
// //           <div className="flex-1 overflow-y-auto p-5 space-y-6">
// //             {messages.map((msg, idx) => (
// //               <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
// //                 <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-sm'}`}>
// //                   {msg.content}
// //                 </div>
// //               </div>
// //             ))}
// //             {isThinking && (
// //               <div className="text-slate-500 italic text-sm p-2 animate-pulse">Aura is analyzing...</div>
// //             )}
// //           </div>

// //           <div className="p-4 border-t border-slate-800 bg-slate-900 flex gap-3 items-center">
            
// //             {/* Hidden File Input */}
// //             <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*,.pdf" />
            
// //             {/* Paperclip Button */}
// //             <button onClick={() => fileInputRef.current.click()} className="text-slate-400 hover:text-white p-2 transition" title="Upload Evidence">
// //               📎
// //             </button>

// //             {/* Mic Button */}
// //             <button 
// //               onClick={toggleListening} 
// //               className={`p-2 rounded-full transition ${isListening ? 'bg-red-500/20 text-red-500 animate-pulse' : 'text-slate-400 hover:text-white'}`}
// //               title="Speak"
// //             >
// //               🎤
// //             </button>

// //             <input 
// //               type="text" 
// //               className="flex-1 bg-slate-950 border border-slate-800 p-3 rounded-xl text-white outline-none focus:border-blue-500 transition placeholder-slate-600"
// //               placeholder="Type or speak..."
// //               value={input}
// //               onChange={(e) => setInput(e.target.value)}
// //               onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
// //             />
            
// //             <button 
// //               onClick={sendMessage}
// //               disabled={isThinking || !input.trim()}
// //               className="bg-blue-600 text-white px-5 py-3 rounded-xl font-bold hover:bg-blue-500 disabled:opacity-50 transition"
// //             >
// //               Send
// //             </button>
// //           </div>
// //         </div>

// //         {/* Right Side: Generated Document */}
// //         <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-6 h-[650px] flex flex-col">
// //           <h2 className="font-bold text-xl text-white mb-4 border-b border-slate-800 pb-4">Official Draft</h2>
          
// //           {!finalDraft ? (
// //             <div className="flex-1 flex items-center justify-center text-slate-600 text-center border-2 border-dashed border-slate-800 rounded-xl p-8">
// //               The AI will generate the formal legal document here once it has enough details and evidence.
// //             </div>
// //           ) : (
// //             <div className="flex-1 overflow-y-auto bg-slate-950 p-6 rounded-xl border border-slate-800 text-slate-300 whitespace-pre-wrap font-mono text-sm leading-loose relative">
// //               <div className="absolute top-4 right-4 text-emerald-500 text-2xl opacity-50">⚖️</div>
// //               {finalDraft}
// //             </div>
// //           )}
// //         </div>

// //       </div>
// //     </div>
// //   );
// // }


// "use client";

// import { useState, useRef, useEffect } from 'react';
// import Link from 'next/link';
// import { Shield, Paperclip, Mic, Send, Scale, FileText, ArrowLeft, Save, CheckCircle } from 'lucide-react';
// // import { draftFIR } from '@/adapters/ai_agent'; // Keep your adapter ready!

// export default function FIRDrafter() {
//   const [messages, setMessages] = useState([
//     { 
//       role: 'ai', 
//       content: 'Hello. I am Aura, your legal copilot. I am here to help you draft a formal complaint or FIR. Please tell me what happened in plain English. You can also upload any evidence, like a notice or photographs.' 
//     }
//   ]);
//   const [input, setInput] = useState('');
//   const [isThinking, setIsThinking] = useState(false);
//   const [finalDraft, setFinalDraft] = useState(null);
  
//   // Interaction States
//   const [isListening, setIsListening] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);
//   const [isSaved, setIsSaved] = useState(false);
//   const fileInputRef = useRef(null);
//   const chatEndRef = useRef(null);

//   // Auto-scroll chat to bottom
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   // OPTION 1: Voice Assistant Logic (Untouched, just polished UI)
//   const toggleListening = () => {
//     if (isListening) {
//       setIsListening(false);
//       return;
//     }
    
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       alert("Your browser does not support voice input. Please use Chrome or Edge.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.continuous = false;
//     recognition.interimResults = true;

//     recognition.onstart = () => setIsListening(true);
//     recognition.onresult = (event) => {
//       setInput(event.results[0][0].transcript);
//     };
//     recognition.onend = () => setIsListening(false);
//     recognition.start();
//   };

//   // OPTION 2: Smart Evidence Vault (Upload Logic)
//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     setIsUploading(true);
//     await new Promise(resolve => setTimeout(resolve, 2500)); 

//     const newMessages = [
//       ...messages, 
//       { role: 'user', content: `[Attached Evidence: ${file.name}]` },
//       { role: 'ai', content: `I have securely scanned "${file.name}". I noted the dates and key demands mentioned in the document. This will significantly strengthen your case. What else happened?` }
//     ];
    
//     setMessages(newMessages);
//     setIsUploading(false);
//   };

//   // // The AI "Brain" (Demo Logic for Hackathon Presentation)
//   // const sendMessage = async () => {
//   //   if (!input.trim()) return;
    
//   //   const newMessages = [...messages, { role: 'user', content: input }];
//   //   setMessages(newMessages);
//   //   setInput('');
//   //   setIsThinking(true);

//   //   // --- HACKATHON DEMO LOGIC ---
//   //   // If you hook up your `draftFIR` backend, just replace this setTimeout block 
//   //   // with your original: const response = await draftFIR(input);
//   //   setTimeout(() => {
//   //     if (newMessages.length <= 3) {
//   //       // Step 1: Empathy & Fact Finding
//   //       setMessages([...newMessages, { 
//   //         role: 'ai', 
//   //         content: 'I am so sorry you are dealing with this. It sounds incredibly stressful, but you have clear legal rights here. To ensure the FIR is legally sound, could you clarify exactly what date this occurred, and if there were any witnesses?' 
//   //       }]);
//   //     } else {
//   //       // Step 2: Drafting the Document
//   //       setMessages([...newMessages, { 
//   //         role: 'ai', 
//   //         content: 'Thank you for providing those details. I have generated a formal FIR draft on the right side of your screen using the exact terminology required by the authorities. Please review it, and if it looks accurate, you can save it securely to your Case Vault.' 
//   //       }]);
//   //       setFinalDraft("TO THE OFFICER IN CHARGE,\n\nSUBJECT: First Information Report regarding unlawful actions.\n\nRESPECTED SIR/MADAM,\n\nI am writing to formally report an incident that occurred recently involving the violation of my rights. Despite previous communications and attached evidence, the opposing party has acted in contravention of standard legal protocols (Ref: Section 14 & 420).\n\nI request immediate intervention by the authorities to register this complaint and initiate preliminary investigations.\n\nI have attached all relevant photographic evidence and notices to this portal for your reference.\n\nSincerely,\nJohn Doe\nCitizen ID: #1");
//   //     }
//   //     setIsThinking(false);
//   //   }, 1500);
//   // };


//   // The LIVE AI "Brain" (Connected to Gemini API)
//   const sendMessage = async () => {
//     if (!input.trim()) return;
    
//     // 1. Instantly show the user's message in the chat
//     const newMessages = [...messages, { role: 'user', content: input }];
//     setMessages(newMessages);
//     setInput('');
//     setIsThinking(true);

//     try {
//       // 2. Send the message AND the chat history to our secure backend
//       const response = await fetch('/api/draft-fir', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           message: input,
//           history: messages, // Gemini needs this to remember the conversation!
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to communicate with Aura API.");
//       }

//       // 3. Parse the JSON response from our route
//       const data = await response.json();

//       // 4. Update the chat with Aura's conversational reply
//       setMessages((prev) => [...prev, { role: 'ai', content: data.reply }]);

//       // 5. If Aura decided she has enough info to draft the document, update the right panel!
//       if (data.draftText) {
//         setFinalDraft(data.draftText);
//       }

//     } catch (error) {
//       console.error("AI Connection Error:", error);
//       setMessages((prev) => [
//         ...prev, 
//         { role: 'ai', content: "I apologize, but I am having trouble connecting to the secure neural network right now. Please try sending your message again." }
//       ]);
//     } finally {
//       setIsThinking(false);
//     }
//   };

//   const handleSaveToVault = () => {
//     setIsSaved(true);
//     setTimeout(() => {
//       window.location.href = '/citizen-dashboard';
//     }, 1500);
//   };

//   return (
//     <div className="min-h-screen bg-stone-950 p-6 sm:p-8 font-sans">
      
//       {/* Top Navigation */}
//       <nav className="flex justify-between items-center mb-8 border-b border-stone-800 pb-6">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
//             <Shield className="w-5 h-5 text-amber-500" />
//           </div>
//           <div>
//             <h1 className="font-bold text-xl text-white tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
//               Aura <span className="text-amber-500">Legal Copilot</span>
//             </h1>
//             <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">Secure Intake Terminal</p>
//           </div>
//         </div>
//         <Link href="/citizen-dashboard" className="flex items-center gap-2 text-sm font-semibold text-stone-400 hover:text-white transition-colors bg-stone-900 px-4 py-2 rounded-lg border border-stone-800">
//           <ArrowLeft className="w-4 h-4" /> Return to Vault
//         </Link>
//       </nav>

//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        
//         {/* LEFT SIDE: Interactive Agent Chat */}
//         <div className="bg-stone-900/50 backdrop-blur-xl border border-stone-800 rounded-2xl shadow-2xl flex flex-col h-[700px] relative overflow-hidden">
          
//           {/* Upload Overlay */}
//           {isUploading && (
//             <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-amber-500">
//               <div className="animate-spin mb-4"><Scale className="w-10 h-10" /></div>
//               <p className="font-bold tracking-widest uppercase text-sm">Neural Engine Scanning Document...</p>
//             </div>
//           )}

//           <div className="p-5 border-b border-stone-800 bg-stone-900 flex justify-between items-center">
//             <span className="font-bold text-sm text-stone-200 uppercase tracking-wider flex items-center gap-2">
//               <Mic className="w-4 h-4 text-emerald-500" /> Secure Legal Interview
//             </span>
//             <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-full font-bold uppercase tracking-widest">
//               End-to-End Encrypted
//             </span>
//           </div>
          
//           {/* Chat Feed */}
//           <div className="flex-1 overflow-y-auto p-6 space-y-6">
//             {messages.map((msg, idx) => (
//               <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
//                 <div 
//                   className={`max-w-[85%] p-4 text-sm leading-relaxed ${
//                     msg.role === 'user' 
//                       ? 'bg-stone-800 text-stone-200 rounded-2xl rounded-tr-sm' 
//                       : 'bg-stone-900 border border-stone-700 text-stone-300 rounded-2xl rounded-tl-sm'
//                   }`}
//                 >
//                   {msg.content}
//                 </div>
//               </div>
//             ))}
//             {isThinking && (
//               <div className="flex justify-start">
//                 <div className="bg-stone-900 border border-stone-700 text-stone-400 p-4 rounded-2xl rounded-tl-sm flex items-center gap-2 text-sm">
//                   <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
//                   Aura is analyzing your case...
//                 </div>
//               </div>
//             )}
//             <div ref={chatEndRef} />
//           </div>

//           {/* Input Zone */}
//           <div className="p-4 border-t border-stone-800 bg-stone-900/80">
//             <div className="flex gap-2 items-end">
              
//               <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*,.pdf" />
              
//               <button 
//                 onClick={() => fileInputRef.current.click()} 
//                 className="p-3.5 bg-stone-800 hover:bg-stone-700 border border-stone-700 rounded-xl text-stone-400 hover:text-white transition-colors" 
//                 title="Upload Evidence"
//               >
//                 <Paperclip className="w-5 h-5" />
//               </button>

//               <button 
//                 onClick={toggleListening} 
//                 className={`p-3.5 border rounded-xl transition-colors ${
//                   isListening 
//                     ? 'bg-red-500/10 border-red-500/30 text-red-500 animate-pulse' 
//                     : 'bg-stone-800 hover:bg-stone-700 border-stone-700 text-stone-400 hover:text-white'
//                 }`}
//                 title="Speak"
//               >
//                 <Mic className="w-5 h-5" />
//               </button>

//               <textarea 
//                 className="flex-1 bg-stone-950 border border-stone-700 p-3.5 rounded-xl text-stone-200 focus:outline-none focus:border-amber-500/50 transition-colors placeholder-stone-600 resize-none min-h-[52px] max-h-32 text-sm"
//                 placeholder="Explain your situation..."
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter' && !e.shiftKey) {
//                     e.preventDefault();
//                     sendMessage();
//                   }
//                 }}
//                 rows={1}
//               />
              
//               <button 
//                 onClick={sendMessage}
//                 disabled={isThinking || !input.trim()}
//                 className="bg-amber-600 hover:bg-amber-500 text-stone-950 p-3.5 rounded-xl font-bold disabled:opacity-30 disabled:hover:bg-amber-600 transition-all shadow-lg hover:shadow-amber-500/20"
//               >
//                 <Send className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT SIDE: Generated Document */}
//         <div className="bg-stone-900/50 backdrop-blur-xl border border-stone-800 rounded-2xl shadow-2xl flex flex-col h-[700px]">
//           <div className="p-5 border-b border-stone-800 flex justify-between items-center bg-stone-900">
//             <h2 className="font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
//               <FileText className="w-4 h-4 text-amber-500" /> Official Draft Viewer
//             </h2>
//           </div>
          
//           {!finalDraft ? (
//             <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
//               <div className="w-16 h-16 bg-stone-800/50 rounded-full flex items-center justify-center mb-4">
//                 <FileText className="w-8 h-8 text-stone-600" />
//               </div>
//               <p className="text-stone-400 text-sm max-w-sm leading-relaxed">
//                 Your formalized legal document will be generated here once Aura has gathered enough context from your interview.
//               </p>
//             </div>
//           ) : (
//             <div className="flex-1 flex flex-col h-full overflow-hidden">
//               {/* Document Text Area */}
//               <div className="flex-1 overflow-y-auto p-8 bg-stone-950">
//                 <div className="max-w-prose mx-auto text-stone-300 whitespace-pre-wrap font-serif text-sm leading-loose">
//                   {finalDraft}
//                 </div>
//               </div>
              
//               {/* Save to Vault Action Bar */}
//               <div className="p-6 border-t border-stone-800 bg-stone-900/80 backdrop-blur-md">
//                 <button 
//                   onClick={handleSaveToVault}
//                   disabled={isSaved}
//                   className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm transition-all duration-300 ${
//                     isSaved 
//                       ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
//                       : 'bg-amber-600 hover:bg-amber-500 text-stone-950 shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]'
//                   }`}
//                 >
//                   {isSaved ? (
//                     <><CheckCircle className="w-5 h-5" /> Saved to Active Case Registry</>
//                   ) : (
//                     <><Save className="w-5 h-5" /> Save Draft to Case Vault</>
//                   )}
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }



"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Shield, Paperclip, Mic, Send, Scale, FileText, ArrowLeft, Save, CheckCircle, FileSignature } from 'lucide-react';



// Add this right below your imports!
const TypewriterText = ({ text = "" }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    setDisplayedText(''); // Reset on new text
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 15); // Adjust this number to make it type faster or slower (15ms is good)

    return () => clearInterval(timer);
  }, [text]);

  return <>{displayedText}</>;
};




export default function FIRDrafter() {
  const [messages, setMessages] = useState([
    { 
      role: 'ai', 
      content: 'Hello. I am Aura, your legal copilot. Ask me any legal question, request procedural guidance, or tell me about a situation. When you are ready, you can click "Generate Draft" to create a formal document based on our chat.' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isDrafting, setIsDrafting] = useState(false);
  const [finalDraft, setFinalDraft] = useState(null);
  
  const [isListening, setIsListening] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const fileInputRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Voice Input
  const toggleListening = () => {
    if (isListening) return setIsListening(false);
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Browser not supported.");
    const recognition = new SpeechRecognition();
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (e) => setInput(e.results[0][0].transcript);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  // Chat Mode (General Q&A)
 // Chat Mode (General Q&A)
 const sendMessage = async () => {
  if (!input.trim()) return;
  
  const newMessages = [...messages, { role: 'user', content: input }];
  setMessages(newMessages);
  setInput('');
  setIsThinking(true);

  try {
    const response = await fetch('/api/draft-fir', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input, history: messages, action: "chat" }),
    });
    
    const data = await response.json();
    
    // Stop blank bubbles if API errors out
    if (!response.ok) throw new Error(data.error || "Server Error");
    
    setMessages((prev) => [...prev, { role: 'ai', content: data.reply }]);
  } catch (error) {
    setMessages((prev) => [...prev, { role: 'ai', content: "I am having trouble connecting to the neural network. Please try again." }]);
  } finally {
    setIsThinking(false);
  }
};

// ... (keep generateFormalDraft and handleSaveToVault exactly the same) ...
  // Draft Mode (Triggered by Button)
  const generateFormalDraft = async () => {
    setIsDrafting(true);
    try {
      const response = await fetch('/api/draft-fir', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: "", history: messages, action: "draft" }),
      });
      const data = await response.json();
      setFinalDraft(data.draftText);
    } catch (error) {
      alert("Failed to generate draft. Please try again.");
    } finally {
      setIsDrafting(false);
    }
  };

  const handleSaveToVault = () => {
    setIsSaved(true);
    setTimeout(() => { window.location.href = '/citizen-dashboard'; }, 1500);
  };

  return (
    <div className="min-h-screen bg-stone-950 p-6 sm:p-8 font-sans">
      
      {/* Top Navigation */}
      <nav className="flex justify-between items-center mb-8 border-b border-stone-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
            <Shield className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-white tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
              Aura <span className="text-amber-500">Legal Copilot</span>
            </h1>
            <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">General Legal Advisor & Drafter</p>
          </div>
        </div>
        <Link href="/citizen-dashboard" className="flex items-center gap-2 text-sm font-semibold text-stone-400 hover:text-white transition-colors bg-stone-900 px-4 py-2 rounded-lg border border-stone-800">
          <ArrowLeft className="w-4 h-4" /> Return to Vault
        </Link>
      </nav>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        
        {/* LEFT SIDE: General Chat */}
        <div className="bg-stone-900/50 backdrop-blur-xl border border-stone-800 rounded-2xl shadow-2xl flex flex-col h-[700px]">
          <div className="p-5 border-b border-stone-800 bg-stone-900 flex justify-between items-center">
            <span className="font-bold text-sm text-stone-200 uppercase tracking-wider flex items-center gap-2">
              <Mic className="w-4 h-4 text-emerald-500" /> Legal Q&A Consultation
            </span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 text-sm leading-relaxed ${msg.role === 'user' ? 'bg-stone-800 text-stone-200 rounded-2xl rounded-tr-sm' : 'bg-stone-900 border border-stone-700 text-stone-300 rounded-2xl rounded-tl-sm whitespace-pre-wrap'}`}>
                {/* UPDATE THIS LINE: Use Typewriter for AI, normal text for User */}
              {/* CRITICAL FIX: Only type if it's the AI AND it's the very last message in the chat */}
              {msg.role === 'ai' && idx !== 0 && idx === messages.length - 1 
                    ? <TypewriterText text={msg.content} /> 
                    : msg.content}
                  
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex justify-start">
                <div className="bg-stone-900 border border-stone-700 text-stone-400 p-4 rounded-2xl rounded-tl-sm flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" /> Aura is typing...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 border-t border-stone-800 bg-stone-900/80">
            <div className="flex gap-2 items-end">
              {/* Added File Upload Button Back! */}
              <input type="file" ref={fileInputRef} onChange={() => alert("File uploaded to secure vault.")} className="hidden" accept="image/*,.pdf" />
              <button onClick={() => fileInputRef.current.click()} className="p-3.5 border rounded-xl bg-stone-800 hover:bg-stone-700 border-stone-700 text-stone-400 hover:text-white transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
              <button onClick={toggleListening} className={`p-3.5 border rounded-xl transition-colors ${isListening ? 'bg-red-500/10 border-red-500/30 text-red-500 animate-pulse' : 'bg-stone-800 hover:bg-stone-700 border-stone-700 text-stone-400'}`}>
                <Mic className="w-5 h-5" />
              </button>
              <textarea 
                className="flex-1 bg-stone-950 border border-stone-700 p-3.5 rounded-xl text-stone-200 focus:outline-none focus:border-amber-500/50 transition-colors placeholder-stone-600 resize-none min-h-[52px] max-h-32 text-sm"
                placeholder="Ask a legal question or explain your situation..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                rows={1}
              />
              <button onClick={sendMessage} disabled={isThinking || !input.trim()} className="bg-amber-600 hover:bg-amber-500 text-stone-950 p-3.5 rounded-xl font-bold disabled:opacity-30 transition-all shadow-lg hover:shadow-amber-500/20">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Document Generator */}
        <div className="bg-stone-900/50 backdrop-blur-xl border border-stone-800 rounded-2xl shadow-2xl flex flex-col h-[700px] overflow-hidden">
          <div className="p-5 border-b border-stone-800 flex justify-between items-center bg-stone-900">
            <h2 className="font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-500" /> Official Draft Viewer
            </h2>
          </div>
          
          {!finalDraft ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-stone-950 relative">
              {/* Draft Button */}
              <button 
                onClick={generateFormalDraft}
                disabled={isDrafting || messages.length < 3}
                className="group relative inline-flex items-center justify-center gap-3 bg-stone-800 hover:bg-stone-700 border border-stone-700 hover:border-amber-500/50 text-white px-8 py-5 rounded-2xl font-bold text-base transition-all shadow-xl hover:shadow-amber-500/10 disabled:opacity-50 disabled:cursor-not-allowed z-10"
              >
                {isDrafting ? (
                  <><div className="animate-spin"><Scale className="w-5 h-5 text-amber-500" /></div> Generating Document...</>
                ) : (
                  <><FileSignature className="w-6 h-6 text-amber-500 group-hover:scale-110 transition-transform" /> Generate Document from Chat</>
                )}
              </button>
              
              <p className="text-stone-500 text-sm mt-6 max-w-sm leading-relaxed">
                Chat with Aura first. Once you have discussed your situation, click this button to automatically generate a formal legal document based on your conversation.
              </p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              <div className="flex-1 overflow-y-auto p-8 bg-stone-950">
                <div className="max-w-prose mx-auto text-stone-300 whitespace-pre-wrap font-serif text-sm leading-loose">
                  {finalDraft}
                </div>
              </div>
              
              <div className="p-6 border-t border-stone-800 bg-stone-900/80 backdrop-blur-md">
                <button 
                  onClick={handleSaveToVault} disabled={isSaved}
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm transition-all ${isSaved ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-600 hover:bg-amber-500 text-stone-950 shadow-[0_0_20px_rgba(245,158,11,0.2)]'}`}
                >
                  {isSaved ? <><CheckCircle className="w-5 h-5" /> Saved to Active Case Registry</> : <><Save className="w-5 h-5" /> Save Draft to Case Vault</>}
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}