"use client";

import { useState } from 'react';
import Link from 'next/link';
import { draftFIR } from '@/adapters/ai_agent';

export default function FIRDrafter() {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hello. I am here to help you draft an FIR. Please tell me briefly what happened.' }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [finalDraft, setFinalDraft] = useState(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to screen
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setIsThinking(true);

    // Call our mock AI adapter
    const response = await draftFIR(input);

    // Add AI reply to screen
    setMessages([...newMessages, { role: 'ai', content: response.reply }]);
    
    // If the AI finished the draft, display it!
    if (response.isDraftComplete) {
        setFinalDraft(response.draftText);
    }
    
    setIsThinking(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <nav className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-2xl font-bold text-blue-600">AI FIR Drafter</h1>
        <Link href="/citizen-dashboard" className="text-gray-500 hover:text-gray-900">Back to Dashboard</Link>
      </nav>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Side: Chat Interface */}
        <div className="bg-white border rounded-xl shadow-sm flex flex-col h-[600px]">
          <div className="p-4 border-b bg-gray-50 font-bold text-gray-700">Interview with AI Agent</div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="text-gray-400 italic text-sm p-2 animate-pulse">AI is typing...</div>
            )}
          </div>

          <div className="p-4 border-t flex gap-2">
            <input 
              type="text" 
              className="flex-1 border p-2 rounded-lg text-black outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Describe the incident..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button 
              onClick={sendMessage}
              disabled={isThinking}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 disabled:bg-blue-400"
            >
              Send
            </button>
          </div>
        </div>

        {/* Right Side: Generated Document */}
        <div className="bg-white border rounded-xl shadow-sm p-6 h-[600px] flex flex-col">
          <h2 className="font-bold text-xl text-gray-900 mb-4 border-b pb-2">Final Document Draft</h2>
          
          {!finalDraft ? (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-center border-2 border-dashed border-gray-200 rounded-lg">
              The AI will generate the formal FIR draft here once it has enough details.
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto bg-gray-50 p-4 rounded-lg border border-gray-200 text-gray-800 whitespace-pre-wrap font-mono text-sm">
              {finalDraft}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}