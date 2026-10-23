import { useState, useMemo } from 'react';
import { STRATEGY_GLOSSARY, GlossaryItem } from '../data/toolsData.ts';
import { CATEGORY_2_GLOSSARY } from '../data/innovationToolsData.ts';
import { CATEGORY_3_GLOSSARY } from '../data/marketingToolsData.ts';
import { CATEGORY_4_GLOSSARY } from '../data/operationsToolsData.ts';
import { CATEGORY_5_GLOSSARY } from '../data/financialToolsData.ts';
import { CATEGORY_6_GLOSSARY } from '../data/projectToolsData.ts';
import { CATEGORY_7_GLOSSARY } from '../data/hrToolsData.ts';
import { CATEGORY_8_GLOSSARY } from '../data/riskToolsData.ts';
import { CATEGORY_9_GLOSSARY } from '../data/productToolsData.ts';
import { CATEGORY_10_GLOSSARY } from '../data/analyticsToolsData.ts';
import { Search, BookOpen, Layers, X, Filter } from 'lucide-react';

export interface EnrichedGlossaryItem extends GlossaryItem {
  pillar: string;
}

const COMBINED_GLOSSARY: EnrichedGlossaryItem[] = [
  ...STRATEGY_GLOSSARY.map(g => ({ ...g, pillar: 'Strategy' })),
  ...CATEGORY_2_GLOSSARY.map(g => ({ ...g, pillar: 'Innovation' })),
  ...CATEGORY_3_GLOSSARY.map(g => ({ ...g, pillar: 'Marketing' })),
  ...CATEGORY_4_GLOSSARY.map(g => ({ ...g, pillar: 'Operations' })),
  ...CATEGORY_5_GLOSSARY.map(g => ({ ...g, pillar: 'Financial' })),
  ...CATEGORY_6_GLOSSARY.map(g => ({ ...g, pillar: 'Project' })),
  ...CATEGORY_7_GLOSSARY.map(g => ({ ...g, pillar: 'HR' })),
  ...CATEGORY_8_GLOSSARY.map(g => ({ ...g, pillar: 'Risk' })),
  ...CATEGORY_9_GLOSSARY.map(g => ({ ...g, pillar: 'Product' })),
  ...CATEGORY_10_GLOSSARY.map(g => ({ ...g, pillar: 'Analytics' }))
];

interface PillarOption {
  id: string;
  name: string;
  shortName: string;
}

const PILLARS: PillarOption[] = [
  { id: 'all', name: 'All 10 Pillars', shortName: 'All Pillars' },
  { id: 'Strategy', name: '1. Strategy & Planning', shortName: '1. Strategy' },
  { id: 'Innovation', name: '2. Business Model Innovation', shortName: '2. Innovation' },
  { id: 'Marketing', name: '3. Marketing & Growth', shortName: '3. Marketing' },
  { id: 'Operations', name: '4. Operations & Process', shortName: '4. Operations' },
  { id: 'Financial', name: '5. Financial Performance', shortName: '5. Financial' },
  { id: 'Project', name: '6. Project Management', shortName: '6. Project' },
  { id: 'HR', name: '7. HR & Organizational', shortName: '7. HR & Org' },
  { id: 'Risk', name: '8. Risk & Decision-Making', shortName: '8. Risk' },
  { id: 'Product', name: '9. Product & Startup', shortName: '9. Product' },
  { id: 'Analytics', name: '10. Data & Analytics', shortName: '10. Analytics' }
];

export function GlossaryView() {
  const [search, setSearch] = useState('');
  const [selectedPillar, setSelectedPillar] = useState<string>('all');
  const [selectedTool, setSelectedTool] = useState<string>('All');

  // Compute distinct tools for the selected pillar
  const availableTools = useMemo(() => {
    const pool = selectedPillar === 'all'
      ? COMBINED_GLOSSARY
      : COMBINED_GLOSSARY.filter(item => item.pillar === selectedPillar);
    const distinct = Array.from(new Set(pool.map(item => item.tool))).sort();
    return ['All', ...distinct];
  }, [selectedPillar]);

  // When pillar changes, reset tool filter if previous selection no longer applies
  const handleSelectPillar = (pillarId: string) => {
    setSelectedPillar(pillarId);
    setSelectedTool('All');
  };

  const filteredItems = useMemo(() => {
    return COMBINED_GLOSSARY.filter(item => {
      const matchesSearch = !search ||
        item.term.toLowerCase().includes(search.toLowerCase()) ||
        item.definition.toLowerCase().includes(search.toLowerCase()) ||
        item.tool.toLowerCase().includes(search.toLowerCase());

      const matchesPillar = selectedPillar === 'all' || item.pillar === selectedPillar;
      const matchesTool = selectedTool === 'All' || item.tool.toLowerCase() === selectedTool.toLowerCase();

      return matchesSearch && matchesPillar && matchesTool;
    });
  }, [search, selectedPillar, selectedTool]);

  return (
    <div className="space-y-6 w-full max-w-full overflow-hidden">
      {/* Top Banner & Filter Container - Constrained and clean */}
      <div className="p-5 sm:p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4 w-full max-w-full overflow-hidden">
        {/* Meta Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 flex-wrap">
            <span className="font-bold text-slate-700">Lexicon & Definitions</span>
            <span>·</span>
            <span>Back Matter Reference</span>
            <span>·</span>
            <span className="text-3xs font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200/80">
              {COMBINED_GLOSSARY.length} Terms across 10 Pillars
            </span>
          </div>

          <span className="text-2xs font-mono font-semibold text-slate-500">
            {filteredItems.length} of {COMBINED_GLOSSARY.length} definitions
          </span>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600 shrink-0" />
            <span>Strategic Management Glossary</span>
          </h3>
          <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Quick reference lexicon covering authoritative strategic management terms, microeconomic principles, frameworks, formula definitions, and operational acronyms from the curriculum by Sundaresh Kamaraj.
          </p>
        </div>

        {/* Row 1: Search Bar & Dropdown Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 pt-1">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 shrink-0" />
            <input
              type="text"
              placeholder="Search terminology, definitions, or acronyms..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all shadow-2xs"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 p-0.5"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Pillar Selector Dropdown */}
          <div className="md:col-span-3 flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 shadow-2xs">
            <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider mr-2 shrink-0">Pillar:</span>
            <select
              value={selectedPillar}
              onChange={(e) => handleSelectPillar(e.target.value)}
              className="w-full bg-transparent text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer truncate"
            >
              {PILLARS.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Specific Tool Selector Dropdown */}
          <div className="md:col-span-3 flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 shadow-2xs">
            <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider mr-2 shrink-0">Tool:</span>
            <select
              value={selectedTool}
              onChange={(e) => setSelectedTool(e.target.value)}
              className="w-full bg-transparent text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer truncate"
            >
              <option value="All">All Frameworks ({availableTools.length - 1})</option>
              {availableTools.filter(t => t !== 'All').map(t => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2: Pillars Quick Filter Rail */}
        <div className="pt-1">
          <div className="flex items-center gap-1.5 overflow-x-auto min-w-0 w-full pb-1 text-xs">
            <span className="text-2xs font-bold uppercase tracking-wider text-slate-400 mr-1 shrink-0">
              Pillars:
            </span>
            {PILLARS.map(p => {
              const isActive = selectedPillar === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handleSelectPillar(p.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-slate-900 text-white font-bold shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  {p.shortName}
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 3: Active Framework Chips (Filtered by Selected Pillar) */}
        {availableTools.length > 1 && (
          <div className="pt-0.5">
            <div className="flex items-center gap-1.5 overflow-x-auto min-w-0 w-full pb-1 text-xs">
              <span className="text-2xs font-bold uppercase tracking-wider text-slate-400 mr-1 shrink-0">
                Frameworks:
              </span>
              {availableTools.map(t => {
                const isToolActive = selectedTool === t;
                return (
                  <button
                    key={t}
                    onClick={() => setSelectedTool(t)}
                    className={`px-2.5 py-0.5 text-xs rounded-md whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                      isToolActive
                        ? 'bg-indigo-600 text-white font-bold shadow-2xs'
                        : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredItems.map((item, i) => (
          <div
            key={i}
            className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-1.5 hover:border-indigo-300 hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-sm font-bold text-slate-900 leading-snug">{item.term}</h4>
              <div className="flex items-center gap-1 shrink-0">
                <span className="text-3xs font-semibold uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                  {item.pillar}
                </span>
                <span className="text-2xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/80 px-2 py-0.5 rounded whitespace-nowrap">
                  {item.tool}
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">{item.definition}</p>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="p-12 text-center bg-white border border-dashed border-slate-200 rounded-xl space-y-2">
          <BookOpen className="w-8 h-8 text-slate-300 mx-auto" />
          <h5 className="text-sm font-bold text-slate-700">No definitions found</h5>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No terms matched your query "{search}". Try searching for another keyword or reset the pillar and tool filters.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedPillar('all');
              setSelectedTool('All');
            }}
            className="mt-2 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
