import { useState, useEffect } from 'react';
import {
  Sparkles,
  RefreshCw,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  Copy,
  Check,
  Target,
  PlayCircle,
  ExternalLink,
  BookOpen
} from 'lucide-react';

export interface StrategyInsight {
  frameworkName: string;
  frameworkId: string;
  category: string;
  headline: string;
  tip: string;
  actionItem: string;
  quote: string;
}

interface DailyBusinessInsightProps {
  onSelectTool: (toolId: string, view: 'simulators' | 'tools') => void;
}

const CATEGORY_TABS = [
  { label: 'All Disciplines', value: '' },
  { label: 'Strategy', value: 'Strategy & Market Positioning' },
  { label: 'Innovation', value: 'Business Model Innovation' },
  { label: 'Financial', value: 'Financial Performance' },
  { label: 'Operations', value: 'Operations & Process' },
  { label: 'Marketing', value: 'Marketing & Growth' },
  { label: 'Risk', value: 'Risk & Decision-Making' },
  { label: 'Analytics', value: 'Data & Analytics' },
];

export function DailyBusinessInsight({ onSelectTool }: DailyBusinessInsightProps) {
  const [insight, setInsight] = useState<StrategyInsight | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [insightSource, setInsightSource] = useState<string>('gemini-3.8-flash');

  const fetchInsight = async (categoryFilter?: string, forceRefresh = false) => {
    setLoading(true);
    const sessionKey = 'biztools_session_daily_insight';

    // In a session, retain the current insight unless forced to refresh or changing category
    if (!forceRefresh && !categoryFilter) {
      try {
        const cached = sessionStorage.getItem(sessionKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed?.insight) {
            setInsight(parsed.insight);
            setInsightSource(parsed.source || 'gemini-3.8-flash');
            setLoading(false);
            return;
          }
        }
      } catch {
        // Continue to API fetch if storage read fails
      }
    }

    try {
      const response = await fetch('/api/gemini/daily-insight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestedCategory: categoryFilter || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.insight) {
        setInsight(data.insight);
        setInsightSource(data.source || 'gemini-3.8-flash');
        if (!categoryFilter) {
          try {
            sessionStorage.setItem(
              sessionKey,
              JSON.stringify({ insight: data.insight, source: data.source })
            );
          } catch {
            // Ignore sessionStorage quota error
          }
        }
      }
    } catch (err) {
      console.warn('Failed to fetch daily insight from API, falling back gracefully:', err);
      setInsight({
        frameworkName: 'SWOT & TOWS Matrix',
        frameworkId: 'swot',
        category: 'Strategy & Market Positioning',
        headline: 'Pair internal strengths with external market shocks',
        tip: 'A standard SWOT is passive inventory; a TOWS matrix turns it actionable. Pair your strongest core capabilities with external disruptions (WT and SO strategies) to seize non-obvious white space before competitors react.',
        actionItem: 'Pick your top 2 organizational strengths and draft one specific offensive play against a rising macro trend.',
        quote: 'Strategy is about making choices, trade-offs; it’s about deliberately choosing to be different.',
      });
      setInsightSource('curated-offline');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsight();
  }, []);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    fetchInsight(cat, true);
  };

  const handleCopy = () => {
    if (!insight) return;
    const text = `💡 Daily Business Insight (BizTools by Sundaresh Kamaraj)
Framework: ${insight.frameworkName} · ${insight.category}
"${insight.headline}"

${insight.tip}

⚡ Today's Tactical Execution: ${insight.actionItem}

"${insight.quote}"`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-slate-900 text-white rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-xl relative overflow-hidden">
      {/* Background radial accent */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Header Bar */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-400/20 flex items-center justify-center text-indigo-400 shrink-0">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white tracking-tight font-display">
                Daily Business Insight
              </h3>
              <span className="text-slate-500" aria-hidden="true">·</span>
              <span className="text-xs font-mono font-medium text-emerald-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                Gemini API
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Concise executive strategy tip generated to start your session with fresh perspective
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Copy insight text to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300 font-bold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy</span>
              </>
            )}
          </button>

          <button
            onClick={() => fetchInsight(selectedCategory, true)}
            disabled={loading}
            className="px-3.5 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-50"
            title="Generate a fresh randomized business tip via Gemini API"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Consulting Gemini...' : 'New Tip'}</span>
          </button>
        </div>
      </div>

      {/* Category Filter Tabs (Clean Segmented Control) */}
      <div className="relative z-10 pt-4 pb-2 flex items-center gap-1.5 overflow-x-auto text-xs">
        <span className="text-3xs font-bold uppercase tracking-wider text-slate-500 mr-1 shrink-0">
          Focus:
        </span>
        <div className="flex items-center gap-1 p-1 bg-slate-950/80 rounded-xl border border-slate-800/80">
          {CATEGORY_TABS.map((tab) => {
            const isActive = selectedCategory === tab.value;
            return (
              <button
                key={tab.label}
                onClick={() => handleCategoryChange(tab.value)}
                className={`px-3 py-1 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white font-bold shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Insight Card Content */}
      <div className="relative z-10 mt-2 pt-3 border-t border-slate-800/60">
        {loading ? (
          <div className="py-8 space-y-4 animate-pulse">
            <div className="h-4 w-40 bg-slate-800 rounded" />
            <div className="h-7 w-3/4 bg-slate-800 rounded" />
            <div className="h-14 w-full bg-slate-800/60 rounded-xl" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="h-16 bg-slate-800/40 rounded-xl" />
              <div className="h-16 bg-slate-800/40 rounded-xl" />
            </div>
          </div>
        ) : insight ? (
          <div className="space-y-4">
            {/* Metadata Line (Zero-Pill Discipline) */}
            <div className="flex items-center gap-2 text-xs text-slate-400 flex-wrap">
              <span className="font-semibold text-indigo-300">{insight.category}</span>
              <span aria-hidden="true">·</span>
              <button
                onClick={() => onSelectTool(insight.frameworkId || 'swot', 'tools')}
                className="font-medium text-slate-300 hover:text-white hover:underline flex items-center gap-1 cursor-pointer"
                title="Open framework guide"
              >
                <span>Framework: {insight.frameworkName}</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-70" />
              </button>
              <span aria-hidden="true">·</span>
              <span className="text-3xs font-mono text-slate-500">
                Model: {insightSource}
              </span>
            </div>

            {/* Headline */}
            <div>
              <h4 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug font-display text-balance">
                "{insight.headline}"
              </h4>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                {insight.tip}
              </p>
            </div>

            {/* Tactical Execution & Strategic Axiom Cards */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2">
              {/* Tactical Execution */}
              <div className="md:col-span-7 p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-3xs font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                    Today's Tactical Execution
                  </span>
                  <p className="text-xs text-emerald-100 font-medium mt-1 leading-relaxed">
                    {insight.actionItem}
                  </p>
                </div>
              </div>

              {/* Strategic Axiom */}
              <div className="md:col-span-5 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-3xs font-mono uppercase tracking-wider text-indigo-400 font-bold block">
                    Strategic Axiom
                  </span>
                  <p className="text-xs text-slate-300 italic mt-1 leading-relaxed">
                    "{insight.quote}"
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Actions: Guides and Interactive Simulator */}
            <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-800/80">
              <span className="text-xs text-slate-500 font-mono">
                57 Executive Simulators · 10 Disciplines
              </span>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => onSelectTool(insight.frameworkId || 'swot', 'tools')}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                  <span>Framework Guide</span>
                </button>

                <button
                  onClick={() => onSelectTool(insight.frameworkId || 'swot', 'simulators')}
                  className="px-4 py-2 text-xs font-bold text-slate-950 bg-white hover:bg-slate-100 rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-sm hover:shadow"
                >
                  <PlayCircle className="w-4 h-4 text-emerald-600" />
                  <span>Launch Simulator</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
