import { useState } from 'react';
import { TOOLS_DATA, ToolDefinition } from './data/toolsData.ts';
import { INNOVATION_TOOLS_DATA } from './data/innovationToolsData.ts';
import { MARKETING_TOOLS_DATA } from './data/marketingToolsData.ts';
import { OPERATIONS_TOOLS_DATA } from './data/operationsToolsData.ts';

// Category 1: Strategy & Planning Simulators
import { SWOTSimulator } from './components/simulators/SWOTSimulator.tsx';
import { PESTLESimulator } from './components/simulators/PESTLESimulator.tsx';
import { FiveForcesSimulator } from './components/simulators/FiveForcesSimulator.tsx';
import { BalancedScorecardSimulator } from './components/simulators/BalancedScorecardSimulator.tsx';
import { AnsoffSimulator } from './components/simulators/AnsoffSimulator.tsx';
import { BlueOceanSimulator } from './components/simulators/BlueOceanSimulator.tsx';
import { VRIOSimulator } from './components/simulators/VRIOSimulator.tsx';
import { OKRSimulator } from './components/simulators/OKRSimulator.tsx';

// Category 2: Business Model & Innovation Simulators
import { BMCSimulator } from './components/simulators/BMCSimulator.tsx';
import { LeanCanvasSimulator } from './components/simulators/LeanCanvasSimulator.tsx';
import { ValuePropositionSimulator } from './components/simulators/ValuePropositionSimulator.tsx';
import { DesignThinkingSimulator } from './components/simulators/DesignThinkingSimulator.tsx';
import { JTBDSimulator } from './components/simulators/JTBDSimulator.tsx';
import { BMNSimulator } from './components/simulators/BMNSimulator.tsx';

// Category 3: Marketing & Growth Simulators
import { MarketingMixSimulator } from './components/simulators/MarketingMixSimulator.tsx';
import { STPSimulator } from './components/simulators/STPSimulator.tsx';
import { AIDASimulator } from './components/simulators/AIDASimulator.tsx';
import { JourneyMapSimulator } from './components/simulators/JourneyMapSimulator.tsx';
import { GrowthHackingSimulator } from './components/simulators/GrowthHackingSimulator.tsx';
import { NPSSimulator } from './components/simulators/NPSSimulator.tsx';

// Category 4: Operations & Process Simulators
import { LeanSimulator } from './components/simulators/LeanSimulator.tsx';
import { SixSigmaSimulator } from './components/simulators/SixSigmaSimulator.tsx';
import { KaizenSimulator } from './components/simulators/KaizenSimulator.tsx';
import { VSMSimulator } from './components/simulators/VSMSimulator.tsx';
import { BPRSimulator } from './components/simulators/BPRSimulator.tsx';
import { KanbanSimulator } from './components/simulators/KanbanSimulator.tsx';

// Interactive Modules
import { ScenarioSimulator } from './components/ScenarioSimulator.tsx';
import { TrainingQuizModule } from './components/TrainingQuizModule.tsx';
import { MasterComparisonView } from './components/MasterComparisonView.tsx';
import { ToolDetailView } from './components/ToolDetailView.tsx';
import { GlossaryView } from './components/GlossaryView.tsx';
import {
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Sparkles,
  Layers,
  PlayCircle,
  BookOpen,
  ShieldAlert,
  CheckCircle2,
  GitCompare,
  FileText,
  SlidersHorizontal,
  ArrowRight,
  HelpCircle,
  Building
} from 'lucide-react';

const ALL_TOOLS: ToolDefinition[] = [
  ...TOOLS_DATA,
  ...INNOVATION_TOOLS_DATA,
  ...MARKETING_TOOLS_DATA,
  ...OPERATIONS_TOOLS_DATA
];

export default function App() {
  const [activeMainTab, setActiveMainTab] = useState<'tools' | 'simulators' | 'scenarios' | 'quizzes' | 'stacks' | 'glossary'>('simulators');
  const [selectedToolId, setSelectedToolId] = useState<string>('lean');
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Strategy' | 'Innovation' | 'Marketing' | 'Operations'>('Operations');
  const [showCurriculumOverview, setShowCurriculumOverview] = useState<boolean>(false);

  const currentTool = ALL_TOOLS.find(t => t.id === selectedToolId) || ALL_TOOLS[0];
  const currentIndex = ALL_TOOLS.findIndex(t => t.id === selectedToolId);

  const filteredTools = ALL_TOOLS.filter(t => {
    if (categoryFilter === 'Strategy') return t.category.includes('Strategy');
    if (categoryFilter === 'Innovation') return t.category.includes('Innovation');
    if (categoryFilter === 'Marketing') return t.category.includes('Marketing');
    if (categoryFilter === 'Operations') return t.category.includes('Operations');
    return true;
  });

  const handleSetCategory = (cat: 'All' | 'Strategy' | 'Innovation' | 'Marketing' | 'Operations') => {
    setCategoryFilter(cat);
    if (cat === 'Strategy') {
      if (!TOOLS_DATA.some(t => t.id === selectedToolId)) {
        setSelectedToolId('swot');
      }
    } else if (cat === 'Innovation') {
      if (!INNOVATION_TOOLS_DATA.some(t => t.id === selectedToolId)) {
        setSelectedToolId('bmc');
      }
    } else if (cat === 'Marketing') {
      if (!MARKETING_TOOLS_DATA.some(t => t.id === selectedToolId)) {
        setSelectedToolId('marketingmix');
      }
    } else if (cat === 'Operations') {
      if (!OPERATIONS_TOOLS_DATA.some(t => t.id === selectedToolId)) {
        setSelectedToolId('lean');
      }
    }
  };

  const handleSelectTool = (toolId: string) => {
    setSelectedToolId(toolId);
    const tool = ALL_TOOLS.find(t => t.id === toolId);
    if (tool) {
      if (categoryFilter === 'Strategy' && !tool.category.includes('Strategy')) {
        setCategoryFilter('All');
      } else if (categoryFilter === 'Innovation' && !tool.category.includes('Innovation')) {
        setCategoryFilter('All');
      } else if (categoryFilter === 'Marketing' && !tool.category.includes('Marketing')) {
        setCategoryFilter('All');
      } else if (categoryFilter === 'Operations' && !tool.category.includes('Operations')) {
        setCategoryFilter('All');
      }
    }
  };

  const handlePrevTool = () => {
    const nextIdx = (currentIndex - 1 + ALL_TOOLS.length) % ALL_TOOLS.length;
    handleSelectTool(ALL_TOOLS[nextIdx].id);
  };

  const handleNextTool = () => {
    const nextIdx = (currentIndex + 1) % ALL_TOOLS.length;
    handleSelectTool(ALL_TOOLS[nextIdx].id);
  };

  // Helper for pillar styling
  const getToolPillarMeta = (tool: ToolDefinition) => {
    if (tool.category.includes('Operations')) {
      return {
        pillarNumber: 'Pillar 4',
        pillarName: 'Operations & Process',
        badgeClass: 'bg-teal-50 text-teal-800 border-teal-200'
      };
    }
    if (tool.category.includes('Marketing')) {
      return {
        pillarNumber: 'Pillar 3',
        pillarName: 'Marketing & Growth',
        badgeClass: 'bg-amber-50 text-amber-900 border-amber-200'
      };
    }
    if (tool.category.includes('Innovation')) {
      return {
        pillarNumber: 'Pillar 2',
        pillarName: 'Business Model Innovation',
        badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200'
      };
    }
    return {
      pillarNumber: 'Pillar 1',
      pillarName: 'Strategy & Planning',
      badgeClass: 'bg-blue-50 text-blue-800 border-blue-200'
    };
  };

  const pillarMeta = getToolPillarMeta(currentTool);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-slate-200">
      {/* 1. Top Global Navigation Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Platform Info */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white font-extrabold text-sm tracking-tight shadow-xs">
              SL
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-slate-900 tracking-tight text-base sm:text-lg leading-tight">
                  StratLearn
                </h1>
                <span className="text-3xs font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 tracking-wide font-mono">
                  26 Tools
                </span>
              </div>
                        </div>
          </div>

          {/* Primary View Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-semibold">
            <button
              onClick={() => setActiveMainTab('simulators')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeMainTab === 'simulators'
                  ? 'bg-slate-900 text-white font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span>Simulators</span>
            </button>
            <button
              onClick={() => setActiveMainTab('tools')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeMainTab === 'tools'
                  ? 'bg-slate-900 text-white font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Guides</span>
            </button>
            <button
              onClick={() => setActiveMainTab('scenarios')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeMainTab === 'scenarios'
                  ? 'bg-slate-900 text-white font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Missions</span>
              <span className={`text-3xs font-bold px-1.5 py-0.2 rounded-full ${
                activeMainTab === 'scenarios' ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                15
              </span>
            </button>
            <button
              onClick={() => setActiveMainTab('quizzes')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeMainTab === 'quizzes'
                  ? 'bg-slate-900 text-white font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Quizzes</span>
              <span className={`text-3xs font-bold px-1.5 py-0.2 rounded-full ${
                activeMainTab === 'quizzes' ? 'bg-slate-700 text-white' : 'bg-blue-100 text-blue-800'
              }`}>
                130
              </span>
            </button>
            <button
              onClick={() => setActiveMainTab('stacks')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeMainTab === 'stacks'
                  ? 'bg-slate-900 text-white font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <GitCompare className="w-3.5 h-3.5" />
              <span>Matrix & Stacks</span>
            </button>
            <button
              onClick={() => setActiveMainTab('glossary')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeMainTab === 'glossary'
                  ? 'bg-slate-900 text-white font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Glossary</span>
              <span className={`text-3xs font-bold px-1.5 py-0.2 rounded-full ${
                activeMainTab === 'glossary' ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                110+
              </span>
            </button>
          </nav>

          {/* External Action */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://sundaresh.blog"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <span>sundaresh.blog</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Mobile Navigation strip */}
        <div className="md:hidden flex items-center gap-1 overflow-x-auto px-4 py-2 border-t border-slate-100 bg-slate-50 text-xs font-medium">
          <button
            onClick={() => setActiveMainTab('simulators')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
              activeMainTab === 'simulators' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600'
            }`}
          >
            Simulators
          </button>
          <button
            onClick={() => setActiveMainTab('tools')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
              activeMainTab === 'tools' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600'
            }`}
          >
            Guides
          </button>
          <button
            onClick={() => setActiveMainTab('scenarios')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
              activeMainTab === 'scenarios' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600'
            }`}
          >
            Missions (15)
          </button>
          <button
            onClick={() => setActiveMainTab('quizzes')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
              activeMainTab === 'quizzes' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600'
            }`}
          >
            Quizzes (130)
          </button>
          <button
            onClick={() => setActiveMainTab('stacks')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
              activeMainTab === 'stacks' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600'
            }`}
          >
            Matrix
          </button>
          <button
            onClick={() => setActiveMainTab('glossary')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
              activeMainTab === 'glossary' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600'
            }`}
          >
            Glossary
          </button>
        </div>
      </header>

      {/* 2. Streamlined Executive Framework Control Bar (Simulators & Guides) */}
      {(activeMainTab === 'simulators' || activeMainTab === 'tools') && (
        <div className="bg-white border-b border-slate-200 shadow-2xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top Row: Pillar Segmented Filter + Tool Jump & Prev/Next */}
            <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100">
              {/* Pillar Switcher */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
                <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0 hidden lg:inline">
                  Pillars:
                </span>
                <button
                  onClick={() => handleSetCategory('All')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                    categoryFilter === 'All'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  All 26
                </button>
                <button
                  onClick={() => handleSetCategory('Strategy')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                    categoryFilter === 'Strategy'
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-blue-900 hover:bg-blue-50'
                  }`}
                >
                  1. Strategy <span className="opacity-70 text-2xs ml-0.5">(8)</span>
                </button>
                <button
                  onClick={() => handleSetCategory('Innovation')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                    categoryFilter === 'Innovation'
                      ? 'bg-emerald-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-emerald-900 hover:bg-emerald-50'
                  }`}
                >
                  2. Innovation <span className="opacity-70 text-2xs ml-0.5">(6)</span>
                </button>
                <button
                  onClick={() => handleSetCategory('Marketing')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                    categoryFilter === 'Marketing'
                      ? 'bg-amber-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-amber-900 hover:bg-amber-50'
                  }`}
                >
                  3. Marketing <span className="opacity-70 text-2xs ml-0.5">(6)</span>
                </button>
                <button
                  onClick={() => handleSetCategory('Operations')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    categoryFilter === 'Operations'
                      ? 'bg-teal-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-teal-900 hover:bg-teal-50'
                  }`}
                >
                  <span>4. Operations</span>
                  <span className={`px-1.5 py-0.2 rounded text-3xs font-extrabold uppercase ${
                    categoryFilter === 'Operations' ? 'bg-teal-800 text-teal-200' : 'bg-teal-100 text-teal-800'
                  }`}>
                    6
                  </span>
                </button>
              </div>

              {/* Framework Selector, Prev/Next & Simulator/Guide Toggle */}
              <div className="flex items-center gap-2 shrink-0">
                {/* Prev / Next Pagination */}
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                  <button
                    onClick={handlePrevTool}
                    title="Previous Framework"
                    className="p-1.5 hover:bg-slate-200 text-slate-700 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="px-2 text-2xs font-mono font-semibold text-slate-500 whitespace-nowrap">
                    {currentIndex + 1} / {ALL_TOOLS.length}
                  </span>
                  <button
                    onClick={handleNextTool}
                    title="Next Framework"
                    className="p-1.5 hover:bg-slate-200 text-slate-700 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Quick Jump Dropdown */}
                <div className="relative">
                  <select
                    id="framework-select"
                    value={selectedToolId}
                    onChange={(e) => handleSelectTool(e.target.value)}
                    className="appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-900 text-xs font-semibold rounded-lg pl-3 pr-8 py-1.5 focus:ring-2 focus:ring-slate-900 outline-none cursor-pointer transition-colors max-w-[190px] sm:max-w-[240px] truncate"
                  >
                    <optgroup label="1. Strategy & Planning">
                      {TOOLS_DATA.map(t => (
                        <option key={t.id} value={t.id}>
                          {t.shortName} — {t.name}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="2. Business Model Innovation">
                      {INNOVATION_TOOLS_DATA.map(t => (
                        <option key={t.id} value={t.id}>
                          {t.shortName} — {t.name}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="3. Marketing & Growth">
                      {MARKETING_TOOLS_DATA.map(t => (
                        <option key={t.id} value={t.id}>
                          {t.shortName} — {t.name}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="4. Operations & Process">
                      {OPERATIONS_TOOLS_DATA.map(t => (
                        <option key={t.id} value={t.id}>
                          {t.shortName} — {t.name}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Direct Simulation / Guide Mode switcher */}
                <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                  <button
                    onClick={() => setActiveMainTab('simulators')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1 ${
                      activeMainTab === 'simulators'
                        ? 'bg-white text-slate-900 shadow-2xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <PlayCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="hidden sm:inline">Sim</span>
                  </button>
                  <button
                    onClick={() => setActiveMainTab('tools')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1 ${
                      activeMainTab === 'tools'
                        ? 'bg-white text-slate-900 shadow-2xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    <span className="hidden sm:inline">Guide</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Row: Focused Tool Chips for the Active Pillar (Clean, not noisy) */}
            <div className="py-2 flex items-center gap-1.5 overflow-x-auto pb-2">
              {filteredTools.map((tool) => {
                const isSelected = tool.id === selectedToolId;
                const globalIdx = ALL_TOOLS.findIndex(t => t.id === tool.id) + 1;

                return (
                  <button
                    key={tool.id}
                    onClick={() => handleSelectTool(tool.id)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow-xs font-bold ring-1 ring-slate-900'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
                    }`}
                  >
                    <span className={`text-3xs font-mono px-1 py-0.2 rounded ${
                      isSelected ? 'bg-slate-700 text-slate-200' : 'bg-slate-200 text-slate-600'
                    }`}>
                      #{globalIdx}
                    </span>
                    <span>{tool.shortName}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* VIEW 1: INTERACTIVE SIMULATORS */}
        {activeMainTab === 'simulators' && (
          <div className="space-y-6">
            {/* Active Framework Context Header (Replaces the massive 4-card clutter) */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-2xs font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${pillarMeta.badgeClass}`}>
                      {pillarMeta.pillarNumber}: {pillarMeta.pillarName}
                    </span>
                    <span className="text-2xs font-mono font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      Tool #{currentIndex + 1} of 26
                    </span>
                    <span className="text-2xs text-slate-500 font-medium hidden sm:inline">
                      Case: <span className="text-slate-700 font-semibold">{currentTool.caseStudy.company}</span>
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                    {currentTool.name}
                  </h2>
                  <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">
                    {currentTool.tagline} · {currentTool.corePurpose}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-start md:self-center">
                  <button
                    onClick={() => setActiveMainTab('tools')}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                    <span>Deep Guide</span>
                  </button>
                  <button
                    onClick={() => setActiveMainTab('quizzes')}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>Quiz (5 Qs)</span>
                  </button>
                  <button
                    onClick={() => setShowCurriculumOverview(!showCurriculumOverview)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-700 border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Layers className="w-3.5 h-3.5 text-slate-500" />
                    <span>{showCurriculumOverview ? 'Hide Blueprint' : 'Curriculum Blueprint'}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showCurriculumOverview ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Optional Expandable Curriculum Blueprint Drawer */}
              {showCurriculumOverview && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {/* Pillar 1 */}
                    <div
                      onClick={() => handleSetCategory('Strategy')}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        TOOLS_DATA.some(t => t.id === selectedToolId)
                          ? 'bg-blue-50/80 border-blue-300 ring-2 ring-blue-500/20 shadow-xs'
                          : 'bg-slate-50/70 border-slate-200 hover:border-blue-200 hover:bg-blue-50/30'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-blue-950 mb-1">
                        <span>1. Strategy & Planning</span>
                        <span className="text-2xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-mono">
                          8 Tools
                        </span>
                      </div>
                      <p className="text-2xs text-slate-500 mb-2">Macro-environment, competitive forces, resource audit & OKRs</p>
                      <div className="flex flex-wrap gap-1">
                        {TOOLS_DATA.map(t => (
                          <button
                            key={t.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectTool(t.id);
                            }}
                            className={`px-1.5 py-0.5 text-3xs font-semibold rounded ${
                              t.id === selectedToolId
                                ? 'bg-blue-900 text-white font-bold'
                                : 'bg-white text-slate-700 border border-slate-200 hover:bg-blue-100'
                            }`}
                          >
                            {t.shortName}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Pillar 2 */}
                    <div
                      onClick={() => handleSetCategory('Innovation')}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        INNOVATION_TOOLS_DATA.some(t => t.id === selectedToolId)
                          ? 'bg-emerald-50/80 border-emerald-300 ring-2 ring-emerald-500/20 shadow-xs'
                          : 'bg-slate-50/70 border-slate-200 hover:border-emerald-200 hover:bg-emerald-50/30'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-emerald-950 mb-1">
                        <span>2. Innovation & BM</span>
                        <span className="text-2xs bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-mono">
                          6 Tools
                        </span>
                      </div>
                      <p className="text-2xs text-slate-500 mb-2">Value creation, customer pains/gains, prototyping & St. Gallen 55</p>
                      <div className="flex flex-wrap gap-1">
                        {INNOVATION_TOOLS_DATA.map(t => (
                          <button
                            key={t.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectTool(t.id);
                            }}
                            className={`px-1.5 py-0.5 text-3xs font-semibold rounded ${
                              t.id === selectedToolId
                                ? 'bg-emerald-900 text-white font-bold'
                                : 'bg-white text-slate-700 border border-slate-200 hover:bg-emerald-100'
                            }`}
                          >
                            {t.shortName}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Pillar 3 */}
                    <div
                      onClick={() => handleSetCategory('Marketing')}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        MARKETING_TOOLS_DATA.some(t => t.id === selectedToolId)
                          ? 'bg-amber-50/90 border-amber-400 ring-2 ring-amber-500/20 shadow-xs'
                          : 'bg-slate-50/70 border-slate-200 hover:border-amber-300 hover:bg-amber-50/30'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-amber-950 mb-1">
                        <span>3. Marketing & Growth</span>
                        <span className="text-2xs bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-mono font-bold">
                          6 Tools
                        </span>
                      </div>
                      <p className="text-2xs text-slate-500 mb-2">4Ps/7Ps mix, STP segmentation, AIDA copy, journey maps & NPS</p>
                      <div className="flex flex-wrap gap-1">
                        {MARKETING_TOOLS_DATA.map(t => (
                          <button
                            key={t.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectTool(t.id);
                            }}
                            className={`px-1.5 py-0.5 text-3xs font-semibold rounded ${
                              t.id === selectedToolId
                                ? 'bg-amber-900 text-white font-bold'
                                : 'bg-white text-amber-900 border border-amber-200 hover:bg-amber-100'
                            }`}
                          >
                            {t.shortName}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Pillar 4 */}
                    <div
                      onClick={() => handleSetCategory('Operations')}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        OPERATIONS_TOOLS_DATA.some(t => t.id === selectedToolId)
                          ? 'bg-teal-50/90 border-teal-400 ring-2 ring-teal-500/20 shadow-xs'
                          : 'bg-slate-50/70 border-slate-200 hover:border-teal-300 hover:bg-teal-50/30'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-teal-950 mb-1">
                        <span className="flex items-center gap-1.5">
                          <span>4. Operations & Process</span>
                          <span className="bg-teal-600 text-white text-3xs font-black px-1.5 py-0.2 rounded uppercase">
                            New
                          </span>
                        </span>
                        <span className="text-2xs bg-teal-100 text-teal-900 px-1.5 py-0.5 rounded font-mono font-bold">
                          6 Tools
                        </span>
                      </div>
                      <p className="text-2xs text-slate-500 mb-2">Lean 8 wastes & 5S, DMAIC & DPMO, Kaizen blitz, VSM, BPR & Kanban</p>
                      <div className="flex flex-wrap gap-1">
                        {OPERATIONS_TOOLS_DATA.map(t => (
                          <button
                            key={t.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectTool(t.id);
                            }}
                            className={`px-1.5 py-0.5 text-3xs font-semibold rounded ${
                              t.id === selectedToolId
                                ? 'bg-teal-900 text-white font-bold'
                                : 'bg-white text-teal-900 border border-teal-200 hover:bg-teal-100'
                            }`}
                          >
                            {t.shortName}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Category 1: Strategy & Planning */}
            {selectedToolId === 'swot' && <SWOTSimulator />}
            {selectedToolId === 'pestle' && <PESTLESimulator />}
            {selectedToolId === 'porter' && <FiveForcesSimulator />}
            {selectedToolId === 'bsc' && <BalancedScorecardSimulator />}
            {selectedToolId === 'ansoff' && <AnsoffSimulator />}
            {selectedToolId === 'blueocean' && <BlueOceanSimulator />}
            {selectedToolId === 'vrio' && <VRIOSimulator />}
            {selectedToolId === 'okrs' && <OKRSimulator />}

            {/* Category 2: Business Model & Innovation */}
            {selectedToolId === 'bmc' && <BMCSimulator />}
            {selectedToolId === 'leancanvas' && <LeanCanvasSimulator />}
            {selectedToolId === 'vpc' && <ValuePropositionSimulator />}
            {selectedToolId === 'designthinking' && <DesignThinkingSimulator />}
            {selectedToolId === 'jtbd' && <JTBDSimulator />}
            {selectedToolId === 'bmn' && <BMNSimulator />}

            {/* Category 3: Marketing & Growth */}
            {selectedToolId === 'marketingmix' && <MarketingMixSimulator />}
            {selectedToolId === 'stp' && <STPSimulator />}
            {selectedToolId === 'aida' && <AIDASimulator />}
            {selectedToolId === 'journeymap' && <JourneyMapSimulator />}
            {selectedToolId === 'growthhacking' && <GrowthHackingSimulator />}
            {selectedToolId === 'nps' && <NPSSimulator />}

            {/* Category 4: Operations & Process */}
            {selectedToolId === 'lean' && <LeanSimulator />}
            {selectedToolId === 'sixsigma' && <SixSigmaSimulator />}
            {selectedToolId === 'kaizen' && <KaizenSimulator />}
            {selectedToolId === 'vsm' && <VSMSimulator />}
            {selectedToolId === 'bpr' && <BPRSimulator />}
            {selectedToolId === 'kanban' && <KanbanSimulator />}
          </div>
        )}

        {/* VIEW 2: TOOL EXPLANATIONS & CASE STUDIES */}
        {activeMainTab === 'tools' && (
          <ToolDetailView
            tool={currentTool}
            onLaunchSimulator={() => setActiveMainTab('simulators')}
            onLaunchQuiz={() => setActiveMainTab('quizzes')}
          />
        )}

        {/* VIEW 3: CRISIS MISSIONS & SCENARIOS */}
        {activeMainTab === 'scenarios' && <ScenarioSimulator />}

        {/* VIEW 4: CERTIFICATION QUIZZES */}
        {activeMainTab === 'quizzes' && <TrainingQuizModule />}

        {/* VIEW 5: MASTER COMPARISON MATRIX & STACKS */}
        {activeMainTab === 'stacks' && (
          <MasterComparisonView
            onSelectTool={(id) => {
              handleSelectTool(id);
              setActiveMainTab('simulators');
            }}
          />
        )}

        {/* VIEW 6: GLOSSARY */}
        {activeMainTab === 'glossary' && <GlossaryView />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <p className="font-semibold text-slate-700">
              StratLearn Enterprise Curriculum: Strategy, Business Model Innovation, Marketing & Operations
            </p>
            <p className="mt-0.5 text-slate-500">
              Authored by Sundaresh Kamaraj · Version 1.0 (October 2026) · Covering 26 Core Executive Frameworks across 4 Pillars
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveMainTab('stacks')}
              className="hover:text-slate-900 transition-colors"
            >
              Master Matrix (26)
            </button>
            <button
              onClick={() => setActiveMainTab('glossary')}
              className="hover:text-slate-900 transition-colors"
            >
              Glossary (110+)
            </button>
            <a
              href="https://sundaresh.blog"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-900 transition-colors flex items-center gap-1 font-semibold text-slate-700"
            >
              sundaresh.blog <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
