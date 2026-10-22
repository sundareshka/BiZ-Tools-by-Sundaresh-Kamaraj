import { useState, useEffect } from 'react';
import {
  Sparkles,
  RefreshCw,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  Copy,
  Check,
  TrendingUp,
  Target,
  Compass,
  Coins,
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

const CATEGORY_CHIPS = [
  { label: 'All Disciplines', value: '' },
  { label: 'Strategy', value: 'Strategy & Market Positioning' },
  { label: 'Innovation', value: 'Business Model Innovation' },
  { label: 'Finance', value: 'Financial Performance' },
  { label: 'Operations', value: 'Operations & Process' },
  { label: 'Growth', value: 'Marketing & Growth' },
];

export function DailyBusinessInsight({ onSelectTool }: DailyBusinessInsightProps) {
  const [insight, setInsight] = useState<StrategyInsight | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [insightSource, setInsightSource] = useState<string>('gemini-3.8-flash');

  const fetchInsight = async (cat?: string, forceRefresh = false) => {
    setLoading(true);
    const todayKey = `biztools_daily_insight_${new Date().toISOString().slice(0, 10)}`;

    // If not force refreshed and no custom category, try to load session cache
    if (!forceRefresh && !cat) {
      try {
        const cached = sessionStorage.getItem(todayKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          setInsight(parsed.insight);
          setInsightSource(parsed.source || 'gemini-3.8-flash');
          setLoading(false);
          return;
        }
      } catch {
        // ignore cache read failure
      }
    }

    try {
      const response = await fetch('/api/gemini/daily-insight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestedCategory: cat || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.insight) {
        setInsight(data.insight);
        setInsightSource(data.source || 'gemini-3.8-flash');
        // Save to cache if default category
        if (!cat) {
          try {
            sessionStorage.setItem(
              todayKey,
              JSON.stringify({ insight: data.insight, source: data.source })
            );
          } catch {
            // ignore cache write error
          }
        }
      }
    } catch (err) {
      console.warn('Failed to fetch daily insight from API:', err);
      // Fallback local insight if server call fails
      setInsight({
        frameworkName: 'SWOT & TOWS Matrix',
        frameworkId: 'swot',
        category: 'Strategy & Planning',
        headline: 'Pair internal strengths with external market shocks',
        tip: 'A standard SWOT is passive inventory; a TOWS matrix turns it actionable. Pair your strongest core capabilities with external disruptions (WT and SO strategies) to seize non-obvious white space before competitors react.',
        actionItem: 'Pick your top 2 organizational strengths and draft one specific offensive play against a rising macro trend.',
        quote: 'Strategy is about making choices, trade-offs; it is about deliberately choosing to be different.',
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
    const text = `💡 Daily Business Insight (BizTools)
Framework: ${insight.frameworkName} (${insight.category})
Headline: ${insight.headline}

${insight.tip}

⚡ Today's Action Item: ${insight.actionItem}

"${insight.quote}"`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-linear-to-br from-slate-900 via-slate-900 to-indigo-950 text-white rounded-2xl border border-slate-800 p-5 sm:p-7 shadow-xl relative overflow-hidden">
      {/* Decorative background glow accents */}
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Band */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-1.5">
                <span>Daily Business Insight</span>
              </h3>
              <span className="text-3xs font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
                Gemini AI
              </span>
            </div>
            <p className="text-2xs text-slate-400">
              Curated strategic principle to kick off your decision-making session
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            onClick={handleCopy}
            className="px-2.5 py-1.5 text-2xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Copy insight text to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300 font-bold">Copied!</span>
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
            className="px-3 py-1.5 text-2xs font-bold text-indigo-200 bg-indigo-900/60 hover:bg-indigo-800/80 border border-indigo-700/60 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs hover:border-indigo-500 disabled:opacity-50"
            title="Generate a randomized new business tip using Gemini API"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-indigo-300' : 'text-indigo-400'}`} />
            <span>{loading ? 'Consulting Gemini...' : 'New Tip'}</span>
          </button>
        </div>
      </div>

      {/* Discipline Filter Chips */}
      <div className="relative z-10 pt-3 pb-1 flex items-center gap-1.5 overflow-x-auto text-2xs">
        <span className="text-3xs font-extrabold uppercase tracking-wider text-slate-500 mr-1 shrink-0">
          Focus:
        </span>
        {CATEGORY_CHIPS.map((chip) => {
          const isActive = selectedCategory === chip.value;
          return (
            <button
              key={chip.label}
              onClick={() => handleCategoryChange(chip.value)}
              className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-indigo-500 text-white font-bold shadow-xs'
                  : 'bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      {/* Main Insight Content Card */}
      <div className="relative z-10 mt-3 pt-3 border-t border-slate-800/60">
        {loading ? (
          <div className="py-6 space-y-3 animate-pulse">
            <div className="flex gap-2">
              <div className="h-4 w-28 bg-slate-800 rounded" />
              <div className="h-4 w-36 bg-slate-800 rounded" />
            </div>
            <div className="h-6 w-3/4 bg-slate-800 rounded" />
            <div className="h-12 w-full bg-slate-800/60 rounded" />
            <div className="h-10 w-full bg-slate-800/40 rounded" />
          </div>
        ) : insight ? (
          <div className="space-y-4">
            {/* Meta Tags */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-3xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                {insight.category}
              </span>
              <button
                onClick={() => onSelectTool(insight.frameworkId || 'swot', 'tools')}
                className="text-3xs font-semibold px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
                title="View deep framework guide"
              >
                <span>Framework: {insight.frameworkName}</span>
                <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
              </button>
            </div>

            {/* Headline */}
            <div>
              <h4 className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-snug font-display">
                "{insight.headline}"
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-normal">
                {insight.tip}
              </p>
            </div>

            {/* Two-Column Callouts: Action Item & Strategic Axiom */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-1">
              {/* Action Item */}
              <div className="md:col-span-7 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-3xs font-mono uppercase tracking-wider text-emerald-300 font-bold block">
                    Today's Tactical Execution
                  </span>
                  <p className="text-2xs text-emerald-100 font-medium mt-0.5 leading-normal">
                    {insight.actionItem}
                  </p>
                </div>
              </div>

              {/* Strategic Quote */}
              <div className="md:col-span-5 p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-md bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Target className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-3xs font-mono uppercase tracking-wider text-indigo-300 font-bold block">
                    Strategic Axiom
                  </span>
                  <p className="text-2xs text-slate-300 italic mt-0.5 leading-normal">
                    "{insight.quote}"
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Launch Bar */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-2xs text-slate-400 border-t border-slate-800/80">
              <div className="flex items-center gap-1.5 text-3xs font-mono text-slate-500">
                <span>Model: {insightSource}</span>
                <span>·</span>
                <span>BizTools Curriculum</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectTool(insight.frameworkId || 'swot', 'tools')}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                  <span>Framework Guide</span>
                </button>

                <button
                  onClick={() => onSelectTool(insight.frameworkId || 'swot', 'simulators')}
                  className="px-3.5 py-1.5 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow"
                >
                  <PlayCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Launch {insight.frameworkName.split(' ')[0]} Simulator</span>
                  <ArrowRight className="w-3 h-3 text-slate-700" />
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
