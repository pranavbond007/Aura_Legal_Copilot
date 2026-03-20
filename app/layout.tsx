import "./globals.css";

export const metadata = {
  title: "Aura Legal Copilot",
  description: "AI-Powered Legal Strategy and FIR Drafting",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      {/* We moved all the background and text colors right here! */}
      <body className="bg-slate-950 text-slate-50 antialiased selection:bg-blue-600 selection:text-white min-h-screen relative overflow-x-hidden">
        
        {/* Ambient glowing background effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
        
        {/* Your actual app pages render inside here */}
        <div className="relative z-0">
          {children}
        </div>
      </body>
    </html>
  );
}