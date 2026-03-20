"use client";

import { useState } from 'react';
import Link from 'next/link';
import { translateLegalese } from '@/adapters/ai_agent';

export default function DocumentTranslator() {
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [result, setResult] = useState(null);

  const handleTranslate = async () => {
    if (!inputText) return;
    setIsThinking(true);
    
    // Calls our mock AI adapter
    const aiResponse = await translateLegalese(inputText);
    
    setResult(aiResponse);
    setIsThinking(false);
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <nav className="flex justify-between items-center mb-12 border-b pb-4">
        <h1 className="text-2xl font-bold text-blue-600">Jargon Translator</h1>
        <Link href="/citizen-dashboard" className="text-gray-500 hover:text-gray-900">Back to Dashboard</Link>
      </nav>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Side: User Input */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Paste Legal Text Here</h2>
          <textarea 
            className="w-full h-64 p-4 border rounded-xl bg-gray-50 text-gray-800 focus:ring-2 focus:ring-blue-600 outline-none"
            placeholder="Paste confusing contracts, notices, or terms of service here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button 
            onClick={handleTranslate}
            disabled={isThinking}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition disabled:bg-blue-400"
          >
            {isThinking ? "AI is analyzing..." : "Simplify Document"}
          </button>
        </div>

        {/* Right Side: AI Output */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">AI Plain English Summary</h2>
          
          {!result && !isThinking && (
            <div className="h-64 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400">
              Your simplified translation will appear here.
            </div>
          )}

          {isThinking && (
             <div className="h-64 border rounded-xl flex items-center justify-center text-blue-600 animate-pulse font-semibold">
               Scanning for legal traps...
             </div>
          )}

          {result && (
            <div className="border rounded-xl p-6 bg-blue-50 border-blue-100 space-y-4 shadow-sm">
              <div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${result.urgency === 'High' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  Urgency: {result.urgency}
                </span>
              </div>
              <p className="text-gray-800 font-medium">{result.summary}</p>
              
              <div className="pt-4 border-t border-blue-200">
                <h4 className="text-sm font-bold text-gray-900 mb-2">Recommended Next Steps:</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
                  {result.action_items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}