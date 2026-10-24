import React, { useState, useEffect } from 'react';
import {
  X,
  Presentation,
  ChevronLeft,
  ChevronRight,
  Printer,
  Trash2,
  Plus,
  Edit3,
  Layers,
  Sparkles,
  Download,
  Calendar,
  Building,
  CheckCircle2,
  TrendingUp,
  FileText
} from 'lucide-react';
import { DeckSlide, loadDeckSlides, removeDeckSlide, updateDeckSlide } from '../utils/slideDeck.ts';

interface StrategyDeckSlideBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchTool?: (toolId: string) => void;
}

export function StrategyDeckSlideBuilderModal({
  isOpen,
  onClose,
  onLaunchTool
}: StrategyDeckSlideBuilderModalProps) {
  const [slides, setSlides] = useState<DeckSlide[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [presenterName, setPresenterName] = useState('Sundaresh Kamaraj');
  const [companyName, setCompanyName] = useState('Enterprise Strategic Planning Committee');
  const [deckTheme, setDeckTheme] = useState<'executive-dark' | 'clean-light'>('executive-dark');
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [currentNotes, setCurrentNotes] = useState('');

  useEffect(() => {
    if (isOpen) {
      const loaded = loadDeckSlides();
      setSlides(loaded);
      setCurrentSlideIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (slides[currentSlideIndex]) {
      setCurrentNotes(slides[currentSlideIndex].notes || '');
    }
  }, [currentSlideIndex, slides]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' || e.key === 'PageDown') nextSlide();
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentSlideIndex, slides.length]);

  if (!isOpen) return null;

  const totalDeckSlides = slides.length + 2; // +1 Cover, +1 Action Summary
  const isCover = currentSlideIndex === 0;
  const isSummary = currentSlideIndex === totalDeckSlides - 1;
  const activeFrameworkSlide = !isCover && !isSummary ? slides[currentSlideIndex - 1] : null;

  const nextSlide = () => {
    if (currentSlideIndex < totalDeckSlides - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  const handleDeleteCurrent = () => {
    if (!activeFrameworkSlide) return;
    const updated = removeDeckSlide(activeFrameworkSlide.id);
    setSlides(updated);
    if (currentSlideIndex > updated.length) {
      setCurrentSlideIndex(Math.max(0, updated.length));
    }
  };

  const handleSaveNotes = () => {
    if (!activeFrameworkSlide) return;
    const updated = updateDeckSlide(activeFrameworkSlide.id, { notes: currentNotes });
    setSlides(updated);
    setIsEditingNotes(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div
        className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-full max-w-6xl overflow-hidden flex flex-col my-auto max-h-[96vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header Controls (Hidden on print) */}
        <div className="p-3 sm:p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-3 text-white shrink-0 print:hidden">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Presentation className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs sm:text-sm text-white">Board Deck Slide Builder</span>
                <span className="text-3xs font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-800/60 px-2 py-0.5 rounded">
                  16:9 Widescreen
                </span>
              </div>
              <p className="text-3xs text-slate-400 hidden sm:block">
                Slide {currentSlideIndex + 1} of {totalDeckSlides} · Navigate with arrow keys or controls
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={() => setDeckTheme(deckTheme === 'executive-dark' ? 'clean-light' : 'executive-dark')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-colors cursor-pointer"
              title="Toggle Slide Presentation Palette"
            >
              {deckTheme === 'executive-dark' ? '🌙 Dark Deck' : '☀️ Light Deck'}
            </button>

            {/* Print / Export Deck */}
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
              title="Print or Save Deck as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Export PDF Deck</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close Slide Builder"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 16:9 Presentation Canvas Container */}
        <div className="p-3 sm:p-6 flex-1 flex items-center justify-center overflow-auto bg-slate-950">
          <div
            className={`w-full aspect-[16/9] max-w-5xl rounded-xl border transition-all p-6 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden print:shadow-none print:border-none print:w-full print:h-screen print:max-w-none ${
              deckTheme === 'executive-dark'
                ? 'bg-slate-900 border-slate-800 text-white'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Background Accent Gradients */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* SLIDE 1: COVER SLIDE */}
            {isCover && (
              <div className="h-full flex flex-col justify-between relative z-10">
                <div className="flex items-center justify-between border-b border-slate-800/40 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                      Executive Strategy Dossier
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">
                    {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>

                <div className="my-auto space-y-4">
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    Confidential · Board of Directors & C-Suite
                  </div>
                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                    Strategic Analysis & Operational Decisions
                  </h1>
                  <p className="text-sm sm:text-base text-slate-400 max-w-2xl font-normal leading-relaxed">
                    Synthesized frameworks, stress-tested scenario projections, and resource allocation trade-offs across {slides.length} core strategic domains.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-6 border-t border-slate-800/40 text-xs text-slate-400 gap-2">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-indigo-400" />
                    <input
                      type="text"
                      value={companyName}
                      onChange={e => setCompanyName(e.target.value)}
                      className="bg-transparent border-b border-dashed border-slate-700 hover:border-slate-500 focus:outline-none text-slate-300 font-medium"
                      title="Click to edit organization name"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Presenter:</span>
                    <input
                      type="text"
                      value={presenterName}
                      onChange={e => setPresenterName(e.target.value)}
                      className="bg-transparent border-b border-dashed border-slate-700 hover:border-slate-500 focus:outline-none text-slate-300 font-medium"
                      title="Click to edit presenter name"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 2..N-1: FRAMEWORK SLIDES */}
            {activeFrameworkSlide && (
              <div className="h-full flex flex-col justify-between relative z-10">
                {/* Slide Top Metadata */}
                <div className="flex items-center justify-between border-b border-slate-800/40 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {activeFrameworkSlide.pillar}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      Framework: {activeFrameworkSlide.toolName}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    Slide {currentSlideIndex + 1}
                  </span>
                </div>

                {/* Slide Body */}
                <div className="my-auto space-y-5">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    {activeFrameworkSlide.title}
                  </h2>

                  {/* Executive Summary Callout */}
                  <div className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed ${
                    deckTheme === 'executive-dark'
                      ? 'bg-slate-800/80 border-slate-700/80 text-slate-200'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}>
                    <span className="font-bold text-indigo-400 uppercase tracking-wide text-2xs block mb-1">
                      Executive Summary & Findings
                    </span>
                    {activeFrameworkSlide.executiveSummary}
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    {activeFrameworkSlide.keyMetrics.map((m, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg border ${
                          deckTheme === 'executive-dark'
                            ? 'bg-slate-950/60 border-slate-800'
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        <span className="text-3xs uppercase font-extrabold tracking-wider text-slate-400 block mb-0.5">
                          {m.label}
                        </span>
                        <div className="text-base sm:text-xl font-black text-indigo-400 tabular-nums">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Strategic Action Items Checklist */}
                  <div className="space-y-1.5">
                    <span className="text-3xs uppercase font-extrabold tracking-wider text-slate-400 block">
                      Recommended Strategic Initiatives
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {activeFrameworkSlide.strategicRecommendations.map((rec, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-slate-300 leading-tight">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Slide Footer */}
                <div className="pt-3 border-t border-slate-800/40 flex items-center justify-between text-2xs text-slate-500">
                  <div className="flex items-center gap-3">
                    {onLaunchTool && (
                      <button
                        onClick={() => {
                          onClose();
                          onLaunchTool(activeFrameworkSlide.toolId);
                        }}
                        className="text-indigo-400 hover:underline cursor-pointer"
                      >
                        Open Live Simulator →
                      </button>
                    )}
                    <span className="italic truncate max-w-md">
                      Notes: {activeFrameworkSlide.notes || 'None recorded'}
                    </span>
                  </div>
                  <span className="font-mono">{companyName}</span>
                </div>
              </div>
            )}

            {/* SLIDE LAST: ACTION SUMMARY */}
            {isSummary && (
              <div className="h-full flex flex-col justify-between relative z-10">
                <div className="flex items-center justify-between border-b border-slate-800/40 pb-4">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
                    Executive Next Steps & 90-Day Execution
                  </span>
                  <span className="text-xs text-slate-500 font-mono">Final Slide</span>
                </div>

                <div className="my-auto space-y-6">
                  <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                    Strategic Synthesis & Resource Allocation
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/80 space-y-2">
                      <span className="text-xs font-bold text-emerald-400 block">Horizon 1 (Day 1–30)</span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Halt capital allocations to commoditizing legacy layers. Enforce governance guardrails across operational bottlenecks.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/80 space-y-2">
                      <span className="text-xs font-bold text-indigo-400 block">Horizon 2 (Day 31–60)</span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Deploy pilot squads into uncontested market spaces identified in the Blue Ocean & JTBD analyses.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/80 space-y-2">
                      <span className="text-xs font-bold text-purple-400 block">Horizon 3 (Day 61–90)</span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Review quarterly velocity metrics and adjust capital buffers based on competitive rivalry feedback loops.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/40 flex items-center justify-between text-xs text-slate-500">
                  <span>Authorized for Executive Review</span>
                  <span className="font-mono">{presenterName} · {companyName}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Slide Navigation Bar (Hidden on print) */}
        <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3 text-white shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              disabled={currentSlideIndex === 0}
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlideIndex === totalDeckSlides - 1}
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Slide Dots / Thumbnails */}
          <div className="flex items-center gap-1.5 overflow-x-auto px-2">
            {Array.from({ length: totalDeckSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentSlideIndex === idx
                    ? 'w-6 bg-indigo-500'
                    : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
                title={`Jump to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {activeFrameworkSlide && (
              <button
                onClick={handleDeleteCurrent}
                className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                title="Remove this slide from deck"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <span className="text-xs font-mono text-slate-400">
              {currentSlideIndex + 1} / {totalDeckSlides}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
