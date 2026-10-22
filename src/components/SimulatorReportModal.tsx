import { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  Copy,
  Check,
  X,
  Building,
  User,
  Calendar,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { ToolDefinition } from '../data/toolsData.ts';
import { exportSimulatorPdf, SWOT_DEFAULT_SESSION, PESTLE_DEFAULT_SESSION, ReportCustomizationOptions } from '../utils/pdfExport.ts';

interface SimulatorReportModalProps {
  tool: ToolDefinition;
  isOpen: boolean;
  onClose: () => void;
}

export function SimulatorReportModal({ tool, isOpen, onClose }: SimulatorReportModalProps) {
  const [companyName, setCompanyName] = useState('Acme Global Enterprises');
  const [authorName, setAuthorName] = useState('Senior Strategy Director');
  const [executiveNotes, setExecutiveNotes] = useState(
    tool.id === 'swot'
      ? 'Adopt WhatsApp lightweight dealer ordering to protect working capital while expanding organic biostimulant lines.'
      : tool.id === 'pestle'
      ? 'Hedge domestic phosphate input price volatility and expedite 100% QR-code batch traceability ahead of Supreme Court mandate.'
      : `Prioritize high-margin initiatives while aligning cross-functional teams around ${tool.name} outputs.`
  );
  const [includeCaseStudy, setIncludeCaseStudy] = useState(true);
  const [includeActionPlan, setIncludeActionPlan] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const reportDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleDownloadPdf = () => {
    setIsGenerating(true);
    try {
      const options: ReportCustomizationOptions = {
        companyName,
        authorName,
        executiveNotes,
        includeCaseStudy,
        includeActionPlan,
        reportDate
      };
      exportSimulatorPdf(tool, options);
    } catch (e) {
      console.error('PDF generation failed', e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = () => {
    const markdown = `# EXECUTIVE STRATEGY BRIEF: ${tool.name}
**Organization:** ${companyName}
**Author:** ${authorName}
**Date:** ${reportDate}
**Curriculum:** ${tool.category} (BizTools by Sundaresh Kamaraj)

## 1. Core Purpose
${tool.corePurpose}

## 2. Strategic Verdict & Team Notes
${executiveNotes}

${
  tool.id === 'swot'
    ? `## 3. SWOT Analysis Summary
${SWOT_DEFAULT_SESSION.factors.map(f => `- [${f.quadrant}] ${f.text} (${f.score})`).join('\n')}

## 4. TOWS Action Initiatives
${SWOT_DEFAULT_SESSION.towsStrategies.map(t => `### ${t.title} (${t.type})
- Action: ${t.action}
- Owner: ${t.owner} | Metric: ${t.metric} | 90-Day Milestone: ${t.milestone}`).join('\n\n')}`
    : tool.id === 'pestle'
    ? `## 3. PESTLE Macro Drivers
${PESTLE_DEFAULT_SESSION.drivers.map(d => `- [${d.category}] ${d.driver} | Impact: ${d.impact} | Response: ${d.response}`).join('\n')}`
    : `## 3. Key Operational Concepts
${tool.coreConcepts?.slice(0, 3).map(c => `- **${c.term}:** ${c.definition}`).join('\n') || ''}`
}

${
  includeCaseStudy && tool.caseStudy
    ? `## 5. Benchmark Case Study: ${tool.caseStudy.company}
- Challenge: ${tool.caseStudy.challenge}
- Results: ${tool.caseStudy.results?.join('; ') || ''}
- Lesson: ${tool.caseStudy.lessonsLearned?.[0] || ''}`
    : ''
}
`;

    navigator.clipboard.writeText(markdown);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-white print:static print:overflow-visible">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150 print:max-h-none print:border-none print:shadow-none print:overflow-visible">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between shrink-0 no-print">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  Export Executive PDF Report
                </h3>
                <span className="text-3xs font-mono px-2 py-0.5 rounded bg-indigo-900 text-indigo-200 border border-indigo-700">
                  {tool.shortName}
                </span>
              </div>
              <p className="text-2xs text-slate-400 mt-0.5">
                Generate a publication-grade strategy brief ready for board & team distribution
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Controls & Live Preview Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 print:p-0 print:block print:overflow-visible">
          {/* Left Column: Report Customization Controls */}
          <div className="lg:col-span-5 space-y-4 no-print">
            <div className="space-y-1">
              <span className="text-2xs font-extrabold uppercase tracking-wider text-slate-500">
                1. Report Header Parameters
              </span>
              <p className="text-xs text-slate-500">Customize ownership metadata for your team report.</p>
            </div>

            <div>
              <label className="block text-2xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Building className="w-3 h-3 text-slate-400" />
                <span>Organization / Business Unit</span>
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Acme Global Logistics"
                className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:bg-white outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-2xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <User className="w-3 h-3 text-slate-400" />
                <span>Prepared By / Reviewer</span>
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. VP of Strategy"
                className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:bg-white outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-2xs font-bold text-slate-700 mb-1">
                <span>Strategic Verdict & Recommendations (Executive Note)</span>
              </label>
              <textarea
                rows={3}
                value={executiveNotes}
                onChange={(e) => setExecutiveNotes(e.target.value)}
                placeholder="Enter executive conclusions and next steps for the leadership team..."
                className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:bg-white outline-none transition-all resize-none"
              />
            </div>

            {/* Inclusions */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
              <span className="text-2xs font-extrabold uppercase tracking-wider text-slate-500 block">
                Report Sections Included
              </span>

              <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                <input
                  type="checkbox"
                  checked={includeCaseStudy}
                  onChange={(e) => setIncludeCaseStudy(e.target.checked)}
                  className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                />
                <span>Include Benchmark Case Study ({tool.caseStudy?.company})</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                <input
                  type="checkbox"
                  checked={includeActionPlan}
                  onChange={(e) => setIncludeActionPlan(e.target.checked)}
                  className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                />
                <span>Include Operational Action Matrix / Roadmap</span>
              </label>
            </div>
          </div>

          {/* Right Column: Live Printable Document Preview */}
          <div className="lg:col-span-7 bg-slate-100 p-3 sm:p-4 rounded-xl border border-slate-200 flex flex-col print:bg-transparent print:p-0 print:border-none print:block">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 text-2xs font-semibold text-slate-500 no-print">
              <span>LIVE REPORT PREVIEW (A4 EXECUTIVE FORMAT)</span>
              <span>{reportDate}</span>
            </div>

            {/* Simulated Paper Sheet */}
            <div className="flex-1 bg-white p-5 rounded-lg border border-slate-200/80 shadow-2xs space-y-4 overflow-y-auto max-h-[380px] text-slate-800 text-xs print:max-h-none print:overflow-visible print:border-none print:shadow-none print:p-0 print-page">
              {/* Paper Top Band */}
              <div className="p-3 bg-slate-900 text-white rounded-lg space-y-1">
                <div className="text-2xs font-mono text-slate-400">BIZTOOLS EXECUTIVE STRATEGY BRIEF</div>
                <div className="text-base font-bold">{tool.name}</div>
                <div className="text-3xs text-slate-300">{tool.category} · {companyName}</div>
              </div>

              {/* Metadata Pill Box */}
              <div className="grid grid-cols-2 gap-2 p-2.5 bg-slate-50 rounded-md border border-slate-200 text-2xs">
                <div><span className="text-slate-400">Author:</span> <span className="font-semibold">{authorName}</span></div>
                <div><span className="text-slate-400">Horizon:</span> <span className="font-semibold">{tool.horizon || '1-3 Years'}</span></div>
                <div><span className="text-slate-400">Scope:</span> <span className="font-semibold">{tool.scope || 'Enterprise'}</span></div>
                <div><span className="text-slate-400">Status:</span> <span className="font-bold text-emerald-600">Verified Final</span></div>
              </div>

              {/* Executive Summary */}
              <div>
                <div className="text-2xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  1. Executive Context
                </div>
                <p className="text-slate-600 text-2xs leading-relaxed">
                  {tool.corePurpose}
                </p>
                {executiveNotes && (
                  <div className="mt-2 p-2 bg-indigo-50/70 border border-indigo-100 rounded text-2xs text-indigo-950 font-medium italic">
                    "{executiveNotes}"
                  </div>
                )}
              </div>

              {/* Tool Session Specific Highlights */}
              <div>
                <div className="text-2xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  2. Session Synthesis & Data Extract
                </div>

                {tool.id === 'swot' ? (
                  <div className="space-y-1.5">
                    <div className="grid grid-cols-2 gap-1.5 text-3xs">
                      <div className="p-1.5 bg-emerald-50 rounded border border-emerald-200">
                        <span className="font-bold text-emerald-900 block">Strengths (S)</span>
                        <span className="text-emerald-800">20-yr dealer network; Agronomist team</span>
                      </div>
                      <div className="p-1.5 bg-rose-50 rounded border border-rose-200">
                        <span className="font-bold text-rose-900 block">Weaknesses (W)</span>
                        <span className="text-rose-800">Zero app ordering; ₹1.8Cr delayed credit</span>
                      </div>
                      <div className="p-1.5 bg-blue-50 rounded border border-blue-200">
                        <span className="font-bold text-blue-900 block">Opportunities (O)</span>
                        <span className="text-blue-800">WhatsApp dealer adoption; Organic bio demand</span>
                      </div>
                      <div className="p-1.5 bg-amber-50 rounded border border-amber-200">
                        <span className="font-bold text-amber-900 block">Threats (T)</span>
                        <span className="text-amber-800">VC-funded agtech apps; Erratic monsoon</span>
                      </div>
                    </div>
                  </div>
                ) : tool.id === 'pestle' ? (
                  <div className="space-y-1 text-3xs">
                    {PESTLE_DEFAULT_SESSION.drivers.slice(0, 3).map((d, idx) => (
                      <div key={idx} className="p-1.5 bg-slate-50 rounded border border-slate-200 flex justify-between">
                        <span className="font-semibold text-slate-800">{d.category}: {d.driver}</span>
                        <span className="text-indigo-600 font-bold shrink-0">{d.impact}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-1 text-3xs">
                    {tool.coreConcepts?.slice(0, 2).map((c, idx) => (
                      <div key={idx} className="p-1.5 bg-slate-50 rounded border border-slate-200">
                        <span className="font-semibold text-slate-900">{c.term}:</span>{' '}
                        <span className="text-slate-600">{c.definition}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Case Study Extract */}
              {includeCaseStudy && tool.caseStudy && (
                <div className="pt-1 border-t border-slate-100 text-3xs text-slate-500">
                  <span className="font-semibold text-slate-800">Empirical Benchmark:</span> {tool.caseStudy.company} · Challenge: {tool.caseStudy.challenge}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 no-print">
          <div className="text-3xs text-slate-500 hidden sm:block">
            Includes high-resolution vector PDF formatting, corporate header & audit sign-off.
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleCopyMarkdown}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              title="Copy formatted markdown text for Slack or email"
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
              <span>{isCopied ? 'Copied Brief' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              title="Print directly or use browser's Print to PDF"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>Print / Browser PDF</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isGenerating}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              title="Download standalone executive PDF file (.pdf)"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>{isGenerating ? 'Generating PDF...' : 'Download PDF Report'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
