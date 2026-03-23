'use client';
import React, { useState } from 'react';
import { Upload, Send, Download, FileText, MessageSquare, Scale } from 'lucide-react';

export default function LawyerTerminalPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);

  const [history] = useState([
    { id: 1, title: 'Eviction Notice - Rent Control' },
    { id: 2, title: 'Corporate Embezzlement 420 IPC' }
  ]);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
      setMessages([...messages, { role: 'user', content: `[Attached Document: ${file.name}] Please analyze this.` }]);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim() && !uploadedFile) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setUploadedFile(null);

    setTimeout(() => {
      const aiResponse = {
        role: 'ai',
        content: "I have analyzed the query. Here are the most relevant precedents:",
        precedents: [
          { title: "State vs. Sharma (2018)", relevance: "94%", code: "IPC 420" },
          { title: "Mehta Properties vs. Union (2021)", relevance: "88%", code: "Rent Control Act Sec 14" }
        ]
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handleGenerateBrief = () => {
    alert("Generating PDF Brief from the current chat context...");
  };

  return (
    <div className="flex h-screen bg-stone-950 font-sans">

      {/* LEFT SIDEBAR */}
      <div className="w-72 border-r border-stone-800 hidden md:flex flex-col bg-stone-900">
        {/* Sidebar Header */}
        <div className="p-5 border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Scale className="w-4 h-4 text-amber-500" />
            </div>
            <span className="font-semibold text-sm tracking-wide uppercase text-amber-500">Aura Legal</span>
          </div>
        </div>

        {/* History */}
        <div className="p-4 flex-1 overflow-y-auto">
          <p className="text-[11px] font-medium uppercase tracking-widest text-stone-400 mb-3">Research History</p>
          <div className="space-y-1.5">
            {history.map((session) => (
              <button
                key={session.id}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm truncate text-stone-300 transition-all duration-200 hover:bg-stone-800 hover:shadow-[0_0_15px_rgba(245,158,11,0.08)] group"
              >
                <MessageSquare className="inline w-3.5 h-3.5 mr-2.5 text-stone-500 group-hover:text-amber-500 transition-colors" />
                {session.title}
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-stone-800">
          <p className="text-[10px] text-stone-500 text-center tracking-wider">AURA LEGAL AI • v2.0</p>
        </div>
      </div>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col relative">

        {/* Header */}
        <header className="px-6 py-4 border-b border-stone-800 flex justify-between items-center bg-stone-950/80 backdrop-blur-xl">
          <div>
            <h1 className="font-bold text-lg tracking-tight text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Aura Legal Terminal
            </h1>
            <p className="text-[11px] text-stone-400 mt-0.5">AI-Powered Precedent Research</p>
          </div>
          <button
            onClick={handleGenerateBrief}
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-stone-950 px-5 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 hover:shadow-[0_0_25px_rgba(245,158,11,0.35)]"
          >
            <Download className="w-4 h-4" /> Generate Brief
          </button>
        </header>

        {/* Chat Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-5">
                <Scale className="w-8 h-8 text-amber-500/60" />
              </div>
              <p className="text-stone-400 text-sm max-w-md">
                Upload a document or type a query to begin precedent search.
              </p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-2xl p-4 rounded-xl ${
                    msg.role === 'user'
                      ? 'bg-stone-800 text-stone-200'
                      : 'bg-stone-900 border border-stone-700 text-stone-300'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.content}</p>

                  {msg.precedents && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                      {msg.precedents.map((prec, i) => (
                        <div
                          key={i}
                          className="bg-stone-950 p-4 rounded-lg border border-amber-500/20 transition-all duration-300 hover:border-amber-500/50 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-semibold text-sm text-amber-500">{prec.title}</h4>
                            <span className="text-[10px] font-bold bg-amber-500/15 text-amber-500 px-2 py-0.5 rounded-full whitespace-nowrap">
                              {prec.relevance}
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-400 mt-2 font-mono tracking-wide">
                            § {prec.code}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input Zone */}
        <div className="p-4 border-t border-stone-800 bg-stone-950/60 backdrop-blur-xl">
          <form
            onSubmit={handleSendMessage}
            className="max-w-4xl mx-auto relative flex items-end gap-2 bg-stone-900/80 backdrop-blur-md p-2 rounded-xl border border-stone-700 transition-all duration-300 focus-within:border-amber-500/40 focus-within:shadow-[0_0_20px_rgba(245,158,11,0.12)]"
          >
            <label className="cursor-pointer p-3 text-stone-400 hover:text-amber-500 transition-colors duration-200">
              <Upload className="w-5 h-5" />
              <input type="file" className="hidden" onChange={handleFileUpload} />
            </label>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a legal question or cross-examine precedents..."
              className="flex-1 bg-transparent text-stone-200 p-2 focus:outline-none resize-none min-h-[44px] max-h-32 placeholder:text-stone-500 text-sm"
              rows={1}
            />

            <button
              type="submit"
              className="p-3 bg-amber-600 hover:bg-amber-500 text-stone-950 rounded-lg transition-all duration-300 disabled:opacity-30 disabled:hover:bg-amber-600 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)]"
              disabled={!input.trim() && !uploadedFile}
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          {uploadedFile && (
            <div className="max-w-4xl mx-auto mt-2 text-xs text-amber-500 flex items-center gap-1.5">
              <FileText className="w-3 h-3" /> Attached: {uploadedFile}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}