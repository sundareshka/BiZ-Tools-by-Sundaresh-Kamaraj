import { useState } from 'react';
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
import { Search, BookOpen, Layers } from 'lucide-react';

const COMBINED_GLOSSARY: GlossaryItem[] = [
  ...STRATEGY_GLOSSARY,
  ...CATEGORY_2_GLOSSARY,
  ...CATEGORY_3_GLOSSARY,
  ...CATEGORY_4_GLOSSARY,
  ...CATEGORY_5_GLOSSARY,
  ...CATEGORY_6_GLOSSARY,
  ...CATEGORY_7_GLOSSARY,
  ...CATEGORY_8_GLOSSARY,
  ...CATEGORY_9_GLOSSARY,
  ...CATEGORY_10_GLOSSARY
];

export function GlossaryView() {
  const [search, setSearch] = useState('');
  const [selectedTool, setSelectedTool] = useState<string>('All');

  const tools = [
    'All',
    'SWOT',
    'PESTLE',
    'Five Forces',
    'Balanced Scorecard',
    'Ansoff',
    'Blue Ocean',
    'VRIO',
    'OKRs',
    'BMC',
    'Lean Canvas',
    'VPC',
    'Design Thinking',
    'JTBD',
    'Navigator',
    'Marketing Mix',
    'STP',
    'AIDA',
    'Journey Map',
    'Growth Hacking',
    'NPS',
    'Lean Management',
    'Six Sigma',
    'Kaizen',
    'Value Stream Mapping',
    'Business Process Reengineering',
    'Kanban System',
    'Break-Even Analysis',
    'Cost-Benefit Analysis',
    'Budgeting & Variance Analysis',
    'Working Capital & CCC',
    'DuPont Analysis',
    'Activity-Based Costing',
    'Gantt Chart',
    'Critical Path (CPM)',
    'PERT Chart',
    'Agile Methodology',
    'Scrum Framework',
    'McKinsey 7S',
    'RACI Matrix',
    'Engagement Surveys',
    'Performance Appraisal',
    'Competency Mapping',
    'Risk Matrix',
    'Decision Tree',
    'Monte Carlo',
    'Scenario Planning',
    'Pareto Analysis',
    'Minimum Viable Product',
    'Product Roadmap',
    'User Story Mapping',
    'A/B Testing',
    'Churn Analysis',
    'Key Performance Indicators',
    'Data Visualization Dashboards',
    'Cohort Analysis',
    'Predictive Analytics',
    'Business Intelligence (BI) Tools'
  ];

  const filteredItems = COMBINED_GLOSSARY.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(search.toLowerCase()) ||
                          item.definition.toLowerCase().includes(search.toLowerCase());
    const matchesTool = selectedTool === 'All' || item.tool.toLowerCase().includes(selectedTool.toLowerCase());
    return matchesSearch && matchesTool;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
          <span>Lexicon & Definitions</span>
          <span>·</span>
          <span>Back Matter Reference</span>
          <span>·</span>
          <span>{COMBINED_GLOSSARY.length} Terms across 8 Pillars</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">Strategic Management Glossary</h3>
        <p className="text-sm text-slate-600 max-w-2xl">
          Quick dictionary of key strategic management terms, concepts, and acronyms from the official guide.
        </p>

        {/* Search & Tool Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search terminology (e.g. Causal ambiguity, ERRC, Leading indicator)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto text-xs shrink-0">
            {tools.map(t => (
              <button
                key={t}
                onClick={() => setSelectedTool(t)}
                className={`px-3 py-1.5 font-medium rounded-lg whitespace-nowrap transition-colors ${
                  selectedTool === t ? 'bg-slate-900 text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredItems.map((item, i) => (
          <div key={i} className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-1.5 hover:border-slate-300 transition-colors">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900">{item.term}</h4>
              <span className="text-2xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                {item.tool}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">{item.definition}</p>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="p-8 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
          No glossary definitions found matching "{search}".
        </div>
      )}
    </div>
  );
}
