"use client";

import { useEffect, useState } from "react";

interface DebugInfo {
  url?: string;
  origin?: string;
  NEXT_PUBLIC_API_URL?: string;
  NEXTAUTH_URL?: string;
  browser_time?: string;
}

export default function DebugEnv() {
  const [info, setInfo] = useState<DebugInfo>({});

  useEffect(() => {
    setInfo({
      url: window.location.href,
      origin: window.location.origin,
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      browser_time: new Date().toISOString(),
    });

    console.log("DEBUG INFO:", {
      env: process.env,
      location: window.location
    });
  }, []);

  return (
    <div className="p-10 font-mono text-sm bg-zinc-950 text-green-400 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 border-b border-green-800 pb-2">Diagnostic Data</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-white font-bold mb-2 uppercase text-xs tracking-widest">Client-Side Location</h2>
          <pre className="bg-zinc-900 p-4 rounded border border-green-900 shadow-xl overflow-auto">
            {JSON.stringify({ url: info.url, origin: info.origin }, null, 2)}
          </pre>
        </section>
  
        <section>
          <h2 className="text-white font-bold mb-2 uppercase text-xs tracking-widest">Public Environment Variables</h2>
          <pre className="bg-zinc-900 p-4 rounded border border-green-900 shadow-xl overflow-auto">
            {JSON.stringify({ NEXT_PUBLIC_API_URL: info.NEXT_PUBLIC_API_URL }, null, 2)}
          </pre>
        </section>

        <section className="bg-zinc-900/50 p-4 rounded border border-yellow-900/30">
          <h2 className="text-yellow-500 font-bold mb-2">Instruções de Debug:</h2>
          <ul className="list-disc list-inside space-y-2 text-zinc-400">
            <li>Se o <b>origin</b> for <span className="text-red-400">onrender.com</span>, você ainda está no site antigo!</li>
            <li>Se o <b>NEXT_PUBLIC_API_URL</b> for o do Render, mude nas configurações da Vercel e faça <b>REDEPLOY</b>.</li>
            <li>Abra o Console do Navegador (F12) e veja o log &quot;DEBUG INFO&quot; para mais detalhes.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
