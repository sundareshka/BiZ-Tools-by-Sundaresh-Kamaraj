import React, { useState } from 'react';
import {
  X,
  Printer,
  Download,
  Building,
  Calendar,
  ShieldCheck,
  Award,
  Layers,
  CheckCircle2,
  FileText,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { ToolDefinition } from '../data/toolsData.ts';

interface ExecutiveStrategyDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  allTools: ToolDefinition[];
  completedToolIds: string[];
  savedWorkspaceIds: string[];
  userEmail?: string;
}

export function ExecutiveStrategyDossierModal({
  isOpen,
  onClose,
  allTools,
  completedToolIds,
  savedWorkspaceIds,
  userEmail = 'ka.sundaresh@gmail.com'
}: ExecutiveStrategyDossierModalProps) {
  const [organizationName, setOrganizationName] = useState('Global Enterprise Holdings');
  const [executiveAuthor, setExecutiveAuthor] = useState('Executive Leadership Committee');
  const [scopeFilter, setScopeFilter] = useState<'workspace' | 'completed' | 'all'>('workspace');

  if (!isOpen) return null;

  // Selected tool collection for the dossier
  const selectedTools = allTools.filter(tool => {
    if (scopeFilter === 'workspace') {
      return (savedWorkspaceIds.length > 0 ? savedWorkspaceIds : completedToolIds).includes(tool.id);
    }
    if (scopeFilter === 'completed') {
      return (completedToolIds.length > 0 ? completedToolIds : savedWorkspaceIds).includes(tool.id);
    }
    return true;
  });

  const displayTools = selectedTools.length > 0 ? selectedTools : allTools.slice(0, 8);
  const generationDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  const reportId = `DOSSIER-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-4xl w-full border border-slate-300 shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]">
        {/* Modal Controls Toolbar (Hidden in Print) */}
        <div className="p-4 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white leading-tight">Executive Strategy Dossier</h3>
              <p className="text-3xs text-slate-300">Boardroom Briefing Binder · Printable Synthesis</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Scope Filter */}
            <div className="flex items-center bg-slate-800 rounded-lg p-0.5 text-2xs">
              <button
                onClick={() => setScopeFilter('workspace')}
                className={`px-2.5 py-1 rounded font-semibold transition-all cursor-pointer ${
                  scopeFilter === 'workspace' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                My Workspace ({savedWorkspaceIds.length})
              </button>
              <button
                onClick={() => setScopeFilter('completed')}
                className={`px-2.5 py-1 rounded font-semibold transition-all cursor-pointer ${
                  scopeFilter === 'completed' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Completed ({completedToolIds.length})
              </button>
              <button
                onClick={() => setScopeFilter('all')}
                className={`px-2.5 py-1 rounded font-semibold transition-all cursor-pointer ${
                  scopeFilter === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                All 57
              </button>
            </div>

            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF Dossier</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Customization Ribbon (Hidden in Print) */}
        <div className="bg-slate-50 border-b border-slate-200 px-5 py-2.5 flex flex-col sm:flex-row items-center gap-3 text-xs print:hidden shrink-0">
          <div className="flex items-center gap-2 w-full sm:w-auto flex-1">
            <span className="text-2xs font-bold text-slate-500 uppercase tracking-wider shrink-0">Organization:</span>
            <input
              type="text"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              className="w-full text-xs font-semibold px-2.5 py-1 bg-white border border-slate-200 rounded-md text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="Your Organization Name"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto flex-1">
            <span className="text-2xs font-bold text-slate-500 uppercase tracking-wider shrink-0">Prepared By:</span>
            <input
              type="text"
              value={executiveAuthor}
              onChange={(e) => setExecutiveAuthor(e.target.value)}
              className="w-full text-xs font-semibold px-2.5 py-1 bg-white border border-slate-200 rounded-md text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="Author or Committee"
            />
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-8 sm:p-12 overflow-y-auto space-y-10 font-sans text-slate-900 bg-white print:p-0 print:overflow-visible">
          {/* 1. COVER PAGE / EXECUTIVE HEADER */}
          <div className="border-b-2 border-slate-900 pb-8 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-900 p-0.5 border border-slate-700 shadow-sm shrink-0">
                  <img
                    src="/assets/aistudio/Sundaresh_Kamaraj_Logo-01_840f0755.jpg"
                    alt="BizTools by Sundaresh Kamaraj"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-black tracking-tight text-slate-900 font-display">
                    BIZTOOLS EXECUTIVE STRATEGY DOSSIER
                  </h1>
                  <p className="text-xs text-slate-500 font-medium">
                    Version 1.21 · 57 Management Frameworks & Strategic Execution Audit
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-3xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 block">
                  {reportId}
                </span>
                <span className="text-2xs text-slate-400 mt-1 block">{generationDate}</span>
              </div>
            </div>

            {/* Target Org Metadata Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <div>
                <span className="text-3xs font-bold uppercase tracking-wider text-slate-400 block">Target Organization</span>
                <span className="font-bold text-slate-900 text-sm">{organizationName}</span>
              </div>
              <div>
                <span className="text-3xs font-bold uppercase tracking-wider text-slate-400 block">Prepared By</span>
                <span className="font-semibold text-slate-800">{executiveAuthor}</span>
              </div>
              <div>
                <span className="text-3xs font-bold uppercase tracking-wider text-slate-400 block">Framework Curriculum</span>
                <span className="font-semibold text-slate-800">Sundaresh Kamaraj (sundaresh.blog)</span>
              </div>
            </div>

            {/* Executive Memorandum / Context Statement */}
            <div className="text-xs text-slate-700 leading-relaxed space-y-2 font-normal pt-2">
              <p>
                <strong>Executive Memorandum:</strong> This compiled dossier presents structured analytical findings, diagnostic models, and resource allocation recommendations for <strong>{organizationName}</strong>. The frameworks included within this document represent verified cross-functional methodologies spanning strategic positioning, business model innovation, operating discipline, and capital governance.
              </p>
            </div>
          </div>

          {/* 2. TABLE OF CONTENTS / CURRICULUM SYNTHESIS */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide">
                Table of Contents · Selected Framework Modules ({displayTools.length})
              </h2>
              <span className="text-2xs font-semibold text-slate-500">
                {completedToolIds.length} Simulators Completed · {savedWorkspaceIds.length} Saved in Active Workspace
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {displayTools.map((t, idx) => (
                <div
                  key={t.id}
                  className="p-2.5 bg-slate-50/70 border border-slate-200 rounded-lg flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-3xs font-mono font-bold text-slate-400 w-5 shrink-0">
                      #{idx + 1}
                    </span>
                    <span className="font-bold text-slate-900 truncate">{t.shortName}</span>
                    <span className="text-3xs text-slate-500 truncate hidden sm:inline">· {t.category}</span>
                  </div>

                  <span className="text-3xs font-mono px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200 shrink-0">
                    {t.difficulty}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. DETAILED FRAMEWORK DOSSIERS */}
          <div className="space-y-6 pt-4">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-2">
              Framework Strategic Profiles & Action Triggers
            </h2>

            <div className="space-y-6">
              {displayTools.map((t, idx) => (
                <div
                  key={t.id}
                  className="p-5 bg-white border border-slate-200 rounded-xl space-y-3 print:border-slate-300 print:break-inside-avoid shadow-xs"
                >
                  <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-3xs font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-1.5 py-0.2 rounded">
                          Module {idx + 1}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900">{t.name}</h3>
                      </div>
                      <p className="text-2xs text-slate-500 mt-0.5 font-medium">
                        {t.tagline}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-3xs font-bold text-slate-600 uppercase block">{t.category}</span>
                      <span className="text-3xs text-slate-400 font-mono">Horizon: {t.horizon || '1-3 Yrs'}</span>
                    </div>
                  </div>

                  {/* Core Purpose & Case Context */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
                      <span className="text-3xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Core Strategic Purpose
                      </span>
                      <p className="text-slate-700 font-normal leading-relaxed">{t.corePurpose}</p>
                    </div>

                    <div className="p-3 bg-indigo-50/40 rounded-lg border border-indigo-100">
                      <span className="text-3xs font-bold uppercase tracking-wider text-indigo-500 block mb-1">
                        Benchmark Case: {t.caseStudy.company}
                      </span>
                      <p className="text-slate-700 font-normal leading-relaxed">{t.caseStudy.challenge.slice(0, 160)}...</p>
                    </div>
                  </div>

                  {/* Operational Deliverables Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-2xs">
                    <div className="bg-slate-50 p-2 rounded-lg">
                      <span className="text-slate-400 font-bold block uppercase">Time to Value</span>
                      <span className="font-bold text-slate-800">{t.timeToResult}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg">
                      <span className="text-slate-400 font-bold block uppercase">Primary Output</span>
                      <span className="font-bold text-slate-800 truncate block">{t.keyOutput}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg">
                      <span className="text-slate-400 font-bold block uppercase">Executive Scope</span>
                      <span className="font-bold text-slate-800">{t.scope}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg">
                      <span className="text-slate-400 font-bold block uppercase">Method Origin</span>
                      <span className="font-bold text-slate-800 truncate block">{t.origin}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. EXECUTIVE SIGN-OFF & CERTIFICATION SEAL */}
          <div className="pt-8 border-t-2 border-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 print:break-inside-avoid">
            <div className="space-y-1">
              <span className="text-3xs font-bold uppercase tracking-wider text-slate-400 block">Verified Curriculum Endorsement</span>
              <div className="font-display font-bold text-slate-900 text-lg tracking-tight">
                Sundaresh Kamaraj
              </div>
              <p className="text-xs text-slate-500">
                Author & Enterprise Strategist · <a href="https://sundaresh.blog" className="underline text-indigo-600">sundaresh.blog</a>
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center min-w-[200px]">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-1">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-2xs font-bold text-slate-800 uppercase tracking-wider block">Boardroom Certified</span>
              <span className="text-3xs font-mono text-slate-500">{reportId}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
