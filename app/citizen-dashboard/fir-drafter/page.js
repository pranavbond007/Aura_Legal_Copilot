// app/citizen-dashboard/fir-drafter/page.js
"use client";

import { useState, useRef } from 'react';
import Link from 'next/link';
import { draftFIR } from '@/adapters/ai_agent';

export default function FIRDrafter() {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hello. I am here to help you draft an FIR. You can type, speak to me using the microphone, or upload evidence (like a photo of a notice or damage).' }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [finalDraft, setFinalDraft] = useState(null);
  
  // New States for Option 1 & 2
  const [isListening, setIsListening] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // OPTION 1: Voice Assistant Logic
  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }
    
    // Check for browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support voice input. Please use Chrome or Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event) => {
      const currentTranscript = event.results[0][0].transcript;
      setInput(currentTranscript);
    };

    recognition.onend = () => setIsListening(false);
    
    recognition.start();
  };

  // OPTION 2: Smart Evidence Vault (Upload Logic)
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    
    // Mocking an AI Vision delay (pretending to read the document)
    await new Promise(resolve => setTimeout(resolve, 2500)); 

    const newMessages = [
      ...messages, 
      { role: 'user', content: `[Uploaded Evidence: ${file.name}]` },
      { role: 'ai', content: `I have successfully scanned "${file.name}". I extracted the following key info: "Notice served on [Date], demanding immediate action." I will include this in the case file.` }
    ];
    
    setMessages(newMessages);
    setIsUploading(false);
  };

  // Original Chat Logic
  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setIsThinking(true);

    const response = await draftFIR(input);
    setMessages([...newMessages, { role: 'ai', content: response.reply }]);
    
    if (response.isDraftComplete) setFinalDraft(response.draftText);
    setIsThinking(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8 font-sans">
      <nav className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-white tracking-wider">Aura <span className="text-blue-500">Citizen</span></h1>
        <Link href="/citizen-dashboard" className="text-slate-400 hover:text-white transition">Exit Chat</Link>
      </nav>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Side: Interactive Agent */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl flex flex-col h-[650px] overflow-hidden relative">
          
          {/* Upload Overlay */}
          {isUploading && (
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-blue-400">
              <div className="animate-spin text-4xl mb-4">↻</div>
              <p className="font-bold">AI Vision Scanning Document...</p>
            </div>
          )}

          <div className="p-5 border-b border-slate-800 bg-slate-900/50 font-bold text-slate-200">
            Secure Legal Interview
          </div>
          
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-sm'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="text-slate-500 italic text-sm p-2 animate-pulse">Aura is analyzing...</div>
            )}
          </div>

          <div className="p-4 border-t border-slate-800 bg-slate-900 flex gap-3 items-center">
            
            {/* Hidden File Input */}
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*,.pdf" />
            
            {/* Paperclip Button */}
            <button onClick={() => fileInputRef.current.click()} className="text-slate-400 hover:text-white p-2 transition" title="Upload Evidence">
              📎
            </button>

            {/* Mic Button */}
            <button 
              onClick={toggleListening} 
              className={`p-2 rounded-full transition ${isListening ? 'bg-red-500/20 text-red-500 animate-pulse' : 'text-slate-400 hover:text-white'}`}
              title="Speak"
            >
              🎤
            </button>

            <input 
              type="text" 
              className="flex-1 bg-slate-950 border border-slate-800 p-3 rounded-xl text-white outline-none focus:border-blue-500 transition placeholder-slate-600"
              placeholder="Type or speak..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            
            <button 
              onClick={sendMessage}
              disabled={isThinking || !input.trim()}
              className="bg-blue-600 text-white px-5 py-3 rounded-xl font-bold hover:bg-blue-500 disabled:opacity-50 transition"
            >
              Send
            </button>
          </div>
        </div>

        {/* Right Side: Generated Document */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-6 h-[650px] flex flex-col">
          <h2 className="font-bold text-xl text-white mb-4 border-b border-slate-800 pb-4">Official Draft</h2>
          
          {!finalDraft ? (
            <div className="flex-1 flex items-center justify-center text-slate-600 text-center border-2 border-dashed border-slate-800 rounded-xl p-8">
              The AI will generate the formal legal document here once it has enough details and evidence.
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto bg-slate-950 p-6 rounded-xl border border-slate-800 text-slate-300 whitespace-pre-wrap font-mono text-sm leading-loose relative">
              <div className="absolute top-4 right-4 text-emerald-500 text-2xl opacity-50">⚖️</div>
              {finalDraft}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}