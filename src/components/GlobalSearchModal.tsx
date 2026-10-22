import { useState, useEffect, useRef, useMemo } from 'react';
import {
  Search,
  X,
  PlayCircle,
  BookOpen,
  ArrowRight,
  Sparkles,
  Command,
  CornerDownLeft,
  CheckCircle2
} from 'lucide-react';
import { ToolDefinition } from '../data/toolsData.ts';
import { useUserProgress } from '../utils/userProgress.ts';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  tools: ToolDefinition[];
  onSelectTool: (toolId: string, targetView?: 'simulators' | 'tools') => void;
}

export function GlobalSearchModal({
  isOpen,
  onClose,
  tools,
  onSelectTool
}: GlobalSearchModalProps) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { isSimulatorDone, isQuizDone } = useUserProgress();

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
      setActiveCategory('All');
    }
  }, [isOpen]);

  // Extract unique high-level categories
  const categories = useMemo(() => {
    return [
      'All',
      'Strategy',
      'Innovation',
      'Marketing',
      'Operations',
      'Financial',
      'Project',
      'HR',
      'Risk',
      'Product',
      'Analytics'
    ];
  }, []);

  // Filter tools based on query and category
  const filteredTools = useMemo(() => {
    const q = query.trim().toLowerCase();

    return tools.filter((tool) => {
      // Category filter
      if (activeCategory !== 'All') {
        if (!tool.category.toLowerCase().includes(activeCategory.toLowerCase())) {
          return false;
        }
      }

      if (!q) return true;

      // Match against fields
      const inName = tool.name.toLowerCase().includes(q);
      const inShort = tool.shortName.toLowerCase().includes(q);
      const inTagline = tool.tagline?.toLowerCase().includes(q);
      const inPurpose = tool.corePurpose?.toLowerCase().includes(q);
      const inCompany = tool.caseStudy?.company?.toLowerCase().includes(q);
      const inCategory = tool.category?.toLowerCase().includes(q);
      const inOrigin = tool.origin?.toLowerCase().includes(q);

      return inName || inShort || inTagline || inPurpose || inCompany || inCategory || inOrigin;
    });
  }, [tools, query, activeCategory]);

  // Reset selectedIndex when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredTools.length, activeCategory]);

  // Keyboard navigation within modal
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1 < filteredTools.length ? prev + 1 : 0));
      scrollSelectedIntoView();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : Math.max(0, filteredTools.length - 1)));
      scrollSelectedIntoView();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredTools[selectedIndex]) {
        handleChoose(filteredTools[selectedIndex].id, 'simulators');
      }
    }
  };

  const scrollSelectedIntoView = () => {
    setTimeout(() => {
      const activeEl = listRef.current?.querySelector('[data-selected="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }, 10);
  };

  const handleChoose = (toolId: string, view: 'simulators' | 'tools' = 'simulators') => {
    onSelectTool(toolId, view);
    onClose();
  };

  // Helper for highlighting matching text
  const highlightMatch = (text: string, highlight: string) => {
    if (!highlight.trim() || !text) return text;
    const parts = text.split(new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <mark key={i} className="bg-amber-100 text-amber-950 font-semibold px-0.5 rounded">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const getPillarBadge = (category: string) => {
    if (category.includes('Analytics')) return 'bg-violet-100 text-violet-800 border-violet-200';
    if (category.includes('Product')) return 'bg-cyan-100 text-cyan-800 border-cyan-200';
    if (category.includes('Risk')) return 'bg-rose-100 text-rose-800 border-rose-200';
    if (category.includes('HR')) return 'bg-purple-100 text-purple-800 border-purple-200';
    if (category.includes('Project')) return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    if (category.includes('Financial')) return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    if (category.includes('Operations')) return 'bg-teal-100 text-teal-800 border-teal-200';
    if (category.includes('Marketing')) return 'bg-amber-100 text-amber-800 border-amber-200';
    if (category.includes('Innovation')) return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    return 'bg-blue-100 text-blue-800 border-blue-200';
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-start justify-center p-3 sm:p-6 sm:pt-20 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Top Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 shrink-0 ml-1" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all 57 frameworks by name, acronym (e.g. SWOT, MVP, KPI), concept or case study..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 hover:bg-slate-200 rounded-md text-slate-400 hover:text-slate-700 transition-colors shrink-0"
              title="Clear input"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-1 text-2xs font-mono font-medium text-slate-400 bg-slate-200/60 px-2 py-0.5 rounded border border-slate-300">
              <Command className="w-3 h-3" />
              <span>K</span>
            </div>
          )}
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500 hover:text-slate-800 transition-colors shrink-0 sm:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Pills Scroller */}
        <div className="px-4 py-2 bg-slate-100/70 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto text-xs shrink-0">
          <span className="text-3xs font-extrabold uppercase tracking-wider text-slate-400 mr-1 shrink-0">
            Pillar:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          className="overflow-y-auto flex-1 divide-y divide-slate-100 p-2 space-y-1 focus:outline-none"
        >
          {filteredTools.length > 0 ? (
            filteredTools.map((tool, idx) => {
              const isSelected = idx === selectedIndex;
              const globalIdx = tools.findIndex((t) => t.id === tool.id) + 1;

              return (
                <div
                  key={tool.id}
                  data-selected={isSelected}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-xl transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 ${
                    isSelected
                      ? 'bg-indigo-50/70 border border-indigo-200 shadow-2xs'
                      : 'hover:bg-slate-50 border border-transparent'
                  }`}
                  onClick={() => handleChoose(tool.id, 'simulators')}
                >
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-3xs font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        #{globalIdx}
                      </span>
                      <span
                        className={`text-3xs font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getPillarBadge(
                          tool.category
                        )}`}
                      >
                        {tool.category}
                      </span>
                      {tool.caseStudy?.company && (
                        <span className="text-3xs text-slate-500 font-medium">
                          Case: <strong className="text-slate-700">{tool.caseStudy.company}</strong>
                        </span>
                      )}
                      {isSimulatorDone(tool.id) && (
                        <span className="text-3xs font-semibold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-0.5">
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" /> Sim Done
                        </span>
                      )}
                      {isQuizDone(tool.id) && (
                        <span className="text-3xs font-semibold px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800 border border-indigo-200 flex items-center gap-0.5">
                          <CheckCircle2 className="w-2.5 h-2.5 text-indigo-600" /> Quiz Passed
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-900 transition-colors">
                        {highlightMatch(tool.shortName, query)}
                        <span className="text-xs font-normal text-slate-600 ml-1.5">
                          — {highlightMatch(tool.name, query)}
                        </span>
                      </h4>
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                      {highlightMatch(tool.tagline || tool.corePurpose, query)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleChoose(tool.id, 'simulators');
                      }}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                        isSelected
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                      title="Launch Simulator"
                    >
                      <PlayCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Simulator</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleChoose(tool.id, 'tools');
                      }}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center gap-1 transition-all"
                      title="Read Executive Guide"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                      <span>Guide</span>
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-slate-500">
              <Sparkles className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">No frameworks found matching "{query}"</p>
              <p className="text-xs text-slate-400 mt-1">
                Try searching by acronym (e.g. SWOT, PESTLE, RACI, RICE, DAX), methodology (e.g. Agile, Lean, Monte Carlo, Hold-out), or category.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                {['SWOT', 'Porter 5 Forces', 'Lean 5S', 'NPV', 'RACI', 'Monte Carlo', 'MVP', 'KPIs', 'Cohort', 'Star Schema'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="text-xs px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700 font-medium transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-2xs text-slate-500 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-mono">
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded shadow-2xs font-semibold">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded shadow-2xs font-semibold">↓</kbd>
              <span>to navigate</span>
            </span>
            <span className="flex items-center gap-1 font-mono">
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded shadow-2xs font-semibold flex items-center">
                <CornerDownLeft className="w-3 h-3" />
              </kbd>
              <span>to launch</span>
            </span>
            <span className="flex items-center gap-1 font-mono">
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded shadow-2xs font-semibold">Esc</kbd>
              <span>to close</span>
            </span>
          </div>

          <div className="font-semibold text-slate-600">
            {filteredTools.length} of {tools.length} frameworks
          </div>
        </div>
      </div>
    </div>
  );
}
