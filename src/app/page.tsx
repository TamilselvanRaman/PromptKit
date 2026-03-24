"use client";

import { useState, useEffect } from "react";
import {
  EXPERIENCE_LEVELS,
  DOMAINS,
  TARGET_TOOLS,
  PERSONA_DESCRIPTIONS,
  LEVEL_LABELS,
  DOMAIN_LABELS,
  ExperienceLevel,
  Domain,
  OutputMode,
  TargetTool,
  getPersonaDescription,
} from "@/lib/personas";

type HistoryItem = { raw: string; enhanced: string; persona: string; mode: string; time: string };

export default function Home() {
  const [apiKey, setApiKey] = useState("");
  const [rawInput, setRawInput] = useState("");
  const [output, setOutput] = useState("");
  const [level, setLevel] = useState<ExperienceLevel>("junior");
  const [domain, setDomain] = useState<Domain>("software-dev");
  const [mode, setMode] = useState<OutputMode>("structured");
  const [targetTool, setTargetTool] = useState<TargetTool>("chatgpt");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [infoMsg, setInfoMsg] = useState("");
  const [isApiKeyModalOpen, setApiKeyModalOpen] = useState(false);
  const [isHistoryOpen, setHistoryOpen] = useState(false);
  const [copying, setCopying] = useState(false);

  // Load API key & history on mount
  useEffect(() => {
    const savedKey = localStorage.getItem("gemini_api_key");
    if (savedKey) setApiKey(savedKey);

    try {
      const savedHist = localStorage.getItem("prompt_history");
      if (savedHist) setHistory(JSON.parse(savedHist));
    } catch {}
  }, []);

  // Save history helper
  const saveHistory = (newHist: HistoryItem[]) => {
    setHistory(newHist);
    localStorage.setItem("prompt_history", JSON.stringify(newHist));
  };

  const handleEnhance = async () => {
    if (!rawInput.trim()) {
      setErrorMsg("Please enter a prompt to enhance.");
      return;
    }
    if (!apiKey.trim()) {
      setErrorMsg("No API key configured. Click 'API Key' to add yours.");
      setApiKeyModalOpen(true);
      return;
    }

    setErrorMsg("");
    setInfoMsg("");
    setOutput("");
    setLoading(true);

    try {
      const res = await fetch("/api/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey, prompt: rawInput.trim(), level, domain, mode, targetTool }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Enhancement failed.");

      setOutput(data.result);
      const personaName = `${LEVEL_LABELS[level]} ${DOMAIN_LABELS[domain]}`;
      const time = new Date().toLocaleTimeString();
      setInfoMsg(`✓ Enhanced for ${personaName}`);
      saveHistory([{ raw: rawInput.trim(), enhanced: data.result, persona: personaName, mode, time }, ...history].slice(0, 10));
      setTimeout(() => setInfoMsg(""), 3000);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopying(true);
    setTimeout(() => setCopying(false), 2000);
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `enhanced-prompt-${Date.now()}.txt`;
    a.click();
  };

  const previewTitle = `${LEVEL_LABELS[level]} ${DOMAIN_LABELS[domain]}`;
  const previewDesc = getPersonaDescription(level, domain);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* ── TOP NAV ── */}
      <nav className="h-14 shrink-0 flex items-center justify-between px-6 border-b border-[#1e1e35] bg-[#080812]/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl overflow-hidden shadow-[0_2px_10px_rgba(37,99,235,0.3)] ring-1 ring-white/10 shrink-0">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-[17px] font-bold tracking-tight text-white leading-tight">PromptKit</div>
            <div className="text-[11px] uppercase font-semibold tracking-wide text-slate-400">Enterprise AI Workspace</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setHistoryOpen(!isHistoryOpen)} className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium rounded-lg border border-[#1e1e35] bg-[#13131f] text-slate-300 hover:text-white hover:bg-[#1a1a2e] hover:border-[#2a2a45] transition-all">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            History
          </button>
          <button onClick={() => setApiKeyModalOpen(true)} className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium rounded-lg border border-[#1e1e35] bg-[#13131f] text-slate-300 hover:text-white hover:bg-[#1a1a2e] hover:border-[#2a2a45] transition-all">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
            API Key
          </button>
        </div>
      </nav>

      {/* ── API KEY MODAL ── */}
      {isApiKeyModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={(e) => { if (e.target === e.currentTarget) setApiKeyModalOpen(false) }}>
          <div className="bg-[#13131f] border border-[#2a2a45] rounded-2xl p-7 w-[420px] shadow-2xl animate-in slide-in-from-bottom-4 fade-in duration-200">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-bold text-white">Configure API Key</h3>
              <button onClick={() => setApiKeyModalOpen(false)} className="text-slate-400 hover:text-white px-2 py-1 rounded hover:bg-[#1a1a2e] transition-colors">✕</button>
            </div>
            <p className="text-[13px] text-slate-400 mb-4">Get your free Gemini API key from <a href="https://aistudio.google.com/app/apikey" target="_blank" className="text-indigo-400 hover:underline">Google AI Studio &rarr;</a></p>
            <input type="password" value={apiKey} onChange={e => { setApiKey(e.target.value); localStorage.setItem("gemini_api_key", e.target.value) }} placeholder="AIza..." className="w-full bg-[#0e0e1a] border border-[#2a2a45] rounded-lg px-3.5 py-3 text-[13px] font-mono text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
            <div className="flex justify-end gap-2 mt-5">
              <button onClick={() => setApiKeyModalOpen(false)} className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-500 transition-colors shadow-[0_4px_16px_rgba(79,70,229,0.25)]">Done</button>
            </div>
          </div>
        </div>
      )}

      {/* ── MAIN LAYOUT ── */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT SIDEBAR */}
        <aside className="w-[280px] shrink-0 bg-[#0e0e1a] border-r border-[#1e1e35] p-5 flex flex-col gap-6 overflow-y-auto">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-3">Experience Level</div>
            <div className="grid grid-cols-2 gap-2">
              {EXPERIENCE_LEVELS.map(exp => (
                <button key={exp.id} onClick={() => setLevel(exp.id)} className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-all ${level === exp.id ? "bg-indigo-500/10 border-indigo-500 ring-1 ring-indigo-500" : "bg-[#13131f] border-[#1e1e35] hover:border-[#2a2a45] hover:bg-[#1a1a2e] hover:-translate-y-[1px]"}`}>
                  <span className="text-2xl leading-none">{exp.icon}</span>
                  <span className={`text-sm font-bold ${level === exp.id ? "text-white" : "text-slate-300"}`}>{exp.label}</span>
                  <span className="text-xs text-slate-500">{exp.range}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-3">Domain / Role</div>
            <div className="flex flex-col gap-1.5">
              {DOMAINS.map(dom => (
                <button key={dom.id} onClick={() => setDomain(dom.id)} className={`flex items-center gap-3 px-3.5 py-3 rounded-lg border text-[14px] font-medium transition-all text-left ${domain === dom.id ? "bg-indigo-500/10 border-indigo-500 text-indigo-300 shadow-sm" : "bg-[#13131f] border-[#1e1e35] text-slate-400 hover:border-[#2a2a45] hover:bg-[#1a1a2e] hover:text-white"}`}>
                  <span className="opacity-90">{dom.icon}</span> {dom.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-3">Target AI Engine</div>
            <div className="grid grid-cols-2 gap-2">
              {TARGET_TOOLS.map(t => (
                <button key={t.id} onClick={() => setTargetTool(t.id)} className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-[12px] font-medium transition-all text-left ${targetTool === t.id ? "bg-indigo-500/10 border-indigo-500 text-indigo-300 shadow-sm" : "bg-[#13131f] border-[#1e1e35] text-slate-400 hover:border-[#2a2a45] hover:bg-[#1a1a2e] hover:text-white"}`}>
                  <span className="opacity-90">{t.icon}</span> <span className="truncate">{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto bg-indigo-500/5 border border-indigo-500/20 rounded-xl p-3.5">
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">Current Profile</div>
            <div className="text-[13px] font-bold text-indigo-300 mb-1.5">{previewTitle}</div>
            <div className="text-[11px] text-slate-400 leading-relaxed">{previewDesc}</div>
          </div>
        </aside>

        {/* MAIN PANEL */}
        <main className="flex-1 p-8 overflow-y-auto flex flex-col gap-6 bg-[#080812]">
          
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight leading-snug">Enhance Your Prompt</h1>
              <p className="text-[15px] text-slate-400 mt-2">Transform raw ideas into expert-level AI instructions</p>
            </div>
            <div className="flex gap-1.5 bg-[#13131f] border border-[#1e1e35] rounded-xl p-1 shrink-0">
              {(["structured", "concise", "detailed", "json", "master"] as OutputMode[]).map(m => (
                <button key={m} onClick={() => setMode(m)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${mode === m ? "bg-indigo-600 text-white shadow-[0_2px_8px_rgba(79,70,229,0.3)]" : "text-slate-400 hover:text-white"}`}>{m}</button>
              ))}
            </div>
          </div>

          <div className="bg-[#0f111a]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl overflow-hidden focus-within:border-blue-500/50 focus-within:ring-[4px] focus-within:ring-blue-500/10 transition-all flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.12)] shrink-0">
            <div className="flex justify-between items-center px-5 py-4 border-b border-white/[0.04] bg-white/[0.01]">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Raw Prompt Input</span>
              <span className="text-xs font-medium text-slate-500">{rawInput.length} / 2000</span>
            </div>
            <textarea value={rawInput} onChange={e => setRawInput(e.target.value)} maxLength={2000} placeholder="Describe what you want to build, solve, or create...&#10;&#10;Example: I want to create a REST API for user authentication with JWT tokens" className="w-full bg-transparent text-white p-5 text-base leading-relaxed resize-none min-h-[200px] focus:outline-none placeholder:text-slate-600" />
            <div className="flex justify-between items-center px-5 py-4 border-t border-white/[0.04] bg-white/[0.01]">
              <button onClick={() => setRawInput("")} className="px-4 py-2 rounded-lg text-sm font-medium text-slate-400 border border-[#1e1e35] hover:bg-[#1a1a2e] hover:text-white hover:border-[#2a2a45] transition-colors">Clear</button>
              <button onClick={handleEnhance} disabled={loading} className="flex items-center gap-2 px-6 py-3 rounded-lg text-base font-semibold bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 transition-all shadow-[0_4px_16px_rgba(37,99,235,0.25)] ring-1 ring-white/10">
                {loading && <div className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />}
                {loading ? "Enhancing..." : "✨ Enhance Prompt"}
              </button>
            </div>
          </div>

          {errorMsg && <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-[13px] font-medium">{errorMsg}</div>}
          {infoMsg && <div className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-4 py-3 rounded-xl text-[13px] font-medium">{infoMsg}</div>}

          {loading ? (
            <div className="bg-[#0f111a]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 flex flex-col gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] animate-pulse shrink-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-5 h-5 rounded-full border-2 border-blue-500/30 border-t-blue-500 animate-spin"></div>
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">Generating Blueprint...</span>
              </div>
              <div className="h-4 bg-slate-800/50 rounded w-1/4 mb-2"></div>
              <div className="space-y-3">
                <div className="h-3 bg-slate-800/50 rounded w-full"></div>
                <div className="h-3 bg-slate-800/50 rounded w-5/6"></div>
                <div className="h-3 bg-slate-800/50 rounded w-4/6"></div>
              </div>
              <div className="space-y-3 mt-4">
                <div className="h-3 bg-slate-800/50 rounded w-full"></div>
                <div className="h-3 bg-slate-800/50 rounded w-3/4"></div>
              </div>
            </div>
          ) : output ? (
            <div className="bg-[#0f111a]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] shrink-0">
              <div className="flex justify-between items-center px-5 py-4 border-b border-white/[0.04] bg-white/[0.01]">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Enhanced Prompt</span>
                <div className="flex gap-2">
                  <button onClick={handleCopy} className="px-4 py-2 rounded-lg text-sm font-medium text-slate-400 border border-[#1e1e35] hover:bg-[#1a1a2e] hover:text-white transition-colors">{copying ? "✓ Copied!" : "Copy"}</button>
                  <button onClick={handleDownload} className="px-4 py-2 rounded-lg text-sm font-medium text-slate-400 border border-[#1e1e35] hover:bg-[#1a1a2e] hover:text-white transition-colors">Download</button>
                </div>
              </div>
              <textarea value={output} readOnly className="w-full bg-transparent text-slate-200 font-mono text-[15px] leading-relaxed p-6 resize-none min-h-[400px] focus:outline-none whitespace-pre-wrap selection:bg-blue-500/30" />
              <div className="px-5 py-3 border-t border-white/[0.04] bg-white/[0.01] text-xs text-slate-500">
                Persona: {previewTitle} • Mode: {mode}
              </div>
            </div>
          ) : null}
        </main>

        {/* RIGHT HISTORY BOARD */}
        {isHistoryOpen && (
          <aside className="w-[300px] shrink-0 bg-[#0e0e1a] border-l border-[#1e1e35] p-5 flex flex-col overflow-y-auto animate-in slide-in-from-right-8 duration-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">History</span>
              <button onClick={() => saveHistory([])} className="text-[11px] text-slate-400 border border-[#1e1e35] rounded px-2 hover:bg-[#1a1a2e] hover:text-white">Clear</button>
            </div>
            
            <div className="flex flex-col gap-2.5">
              {history.length === 0 ? (
                <div className="text-xs text-slate-500 text-center py-10 leading-relaxed">No history yet.<br/>Enhance a prompt to get started.</div>
              ) : (
                history.map((item, idx) => (
                  <button key={idx} onClick={() => { setRawInput(item.raw); setOutput(item.enhanced); setMode(item.mode as OutputMode); }} className="text-left bg-[#13131f] border border-[#1e1e35] rounded-xl p-3 hover:border-indigo-500/50 hover:bg-[#1a1a2e] transition-colors group">
                    <div className="text-[10px] text-indigo-400 font-bold uppercase tracking-wide mb-1 flex justify-between">
                      {item.persona}
                      <span className="text-slate-600 font-normal group-hover:text-slate-400">{item.time}</span>
                    </div>
                    <div className="text-[12px] text-slate-400 line-clamp-2 leading-snug">{item.raw}</div>
                  </button>
                ))
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
