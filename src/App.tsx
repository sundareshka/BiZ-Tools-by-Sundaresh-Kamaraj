import { useState, useEffect } from 'react';
import { TOOLS_DATA, ToolDefinition } from './data/toolsData.ts';
import { INNOVATION_TOOLS_DATA } from './data/innovationToolsData.ts';
import { MARKETING_TOOLS_DATA } from './data/marketingToolsData.ts';
import { OPERATIONS_TOOLS_DATA } from './data/operationsToolsData.ts';
import { FINANCIAL_TOOLS_DATA } from './data/financialToolsData.ts';
import { PROJECT_TOOLS_DATA } from './data/projectToolsData.ts';
import { HR_TOOLS_DATA } from './data/hrToolsData.ts';
import { RISK_TOOLS_DATA } from './data/riskToolsData.ts';
import { PRODUCT_TOOLS_DATA } from './data/productToolsData.ts';
import { ANALYTICS_TOOLS_DATA } from './data/analyticsToolsData.ts';

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

// Category 5: Financial & Performance Simulators
import { BreakEvenSimulator } from './components/simulators/BreakEvenSimulator.tsx';
import { CostBenefitSimulator } from './components/simulators/CostBenefitSimulator.tsx';
import { BudgetingVarianceSimulator } from './components/simulators/BudgetingVarianceSimulator.tsx';
import { WorkingCapitalSimulator } from './components/simulators/WorkingCapitalSimulator.tsx';
import { DuPontSimulator } from './components/simulators/DuPontSimulator.tsx';
import { ActivityBasedCostingSimulator } from './components/simulators/ActivityBasedCostingSimulator.tsx';

// Category 6: Project Management Simulators
import { GanttSimulator } from './components/simulators/GanttSimulator.tsx';
import { CPMSimulator } from './components/simulators/CPMSimulator.tsx';
import { PertSimulator } from './components/simulators/PertSimulator.tsx';
import { AgileSimulator } from './components/simulators/AgileSimulator.tsx';
import { ScrumSimulator } from './components/simulators/ScrumSimulator.tsx';

// Category 7: HR & Organizational Simulators
import { McKinsey7SSimulator } from './components/simulators/McKinsey7SSimulator.tsx';
import { RACISimulator } from './components/simulators/RACISimulator.tsx';
import { EngagementSurveySimulator } from './components/simulators/EngagementSurveySimulator.tsx';
import { PerformanceAppraisalSimulator } from './components/simulators/PerformanceAppraisalSimulator.tsx';
import { CompetencyMappingSimulator } from './components/simulators/CompetencyMappingSimulator.tsx';

// Category 8: Risk & Decision-Making Simulators
import { RiskMatrixSimulator } from './components/simulators/RiskMatrixSimulator.tsx';
import { DecisionTreeSimulator } from './components/simulators/DecisionTreeSimulator.tsx';
import { MonteCarloSimulator } from './components/simulators/MonteCarloSimulator.tsx';
import { ScenarioPlanningSimulator } from './components/simulators/ScenarioPlanningSimulator.tsx';
import { ParetoAnalysisSimulator } from './components/simulators/ParetoAnalysisSimulator.tsx';

// Category 9: Product & Startup Simulators
import { MVPSimulator } from './components/simulators/MVPSimulator.tsx';
import { ProductRoadmapSimulator } from './components/simulators/ProductRoadmapSimulator.tsx';
import { UserStoryMappingSimulator } from './components/simulators/UserStoryMappingSimulator.tsx';
import { ABTestingSimulator } from './components/simulators/ABTestingSimulator.tsx';
import { ChurnAnalysisSimulator } from './components/simulators/ChurnAnalysisSimulator.tsx';

// Category 10: Data & Analytics Simulators
import { KPISimulator } from './components/simulators/KPISimulator.tsx';
import { DashboardDesignerSimulator } from './components/simulators/DashboardDesignerSimulator.tsx';
import { CohortRetentionSimulator } from './components/simulators/CohortRetentionSimulator.tsx';
import { PredictiveAnalyticsSimulator } from './components/simulators/PredictiveAnalyticsSimulator.tsx';
import { BIToolSimulator } from './components/simulators/BIToolSimulator.tsx';

// Interactive Modules
import { HomePage } from './components/HomePage.tsx';
import { ScenarioSimulator } from './components/ScenarioSimulator.tsx';
import { TrainingQuizModule } from './components/TrainingQuizModule.tsx';
import { MasterComparisonView } from './components/MasterComparisonView.tsx';
import { ToolDetailView } from './components/ToolDetailView.tsx';
import { GlossaryView } from './components/GlossaryView.tsx';
import { GlobalSearchModal } from './components/GlobalSearchModal.tsx';
import { UserProgressIndicator } from './components/UserProgressIndicator.tsx';
import { SimulatorReportModal } from './components/SimulatorReportModal.tsx';
import { useUserProgress, setSimulatorComplete } from './utils/userProgress.ts';
import {
  Home,
  Download,
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
  Building,
  Coins,
  KanbanSquare,
  Users,
  AlertOctagon,
  Flame,
  Rocket,
  BarChart3,
  Search,
  Trophy
} from 'lucide-react';

const ALL_TOOLS: ToolDefinition[] = [
  ...TOOLS_DATA,
  ...INNOVATION_TOOLS_DATA,
  ...MARKETING_TOOLS_DATA,
  ...OPERATIONS_TOOLS_DATA,
  ...FINANCIAL_TOOLS_DATA,
  ...PROJECT_TOOLS_DATA,
  ...HR_TOOLS_DATA,
  ...RISK_TOOLS_DATA,
  ...PRODUCT_TOOLS_DATA,
  ...ANALYTICS_TOOLS_DATA
];

export default function App() {
  const [activeMainTab, setActiveMainTab] = useState<'home' | 'tools' | 'simulators' | 'scenarios' | 'quizzes' | 'stacks' | 'glossary'>('home');
  const [selectedToolId, setSelectedToolId] = useState<string>('swot');
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Strategy' | 'Innovation' | 'Marketing' | 'Operations' | 'Financial' | 'Project' | 'HR' | 'Risk' | 'Product' | 'Analytics'>('Analytics');
  const [showCurriculumOverview, setShowCurriculumOverview] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isExportReportOpen, setIsExportReportOpen] = useState<boolean>(false);

  // Persistent user learning progress hook
  const { progress, toggleSimulator, isSimulatorDone, isQuizDone } = useUserProgress();

  // Global hotkey to trigger search (Cmd+K / Ctrl+K or /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-mark simulator as completed when active in simulator tab (registers after brief engagement)
  useEffect(() => {
    if (activeMainTab === 'simulators' && selectedToolId) {
      const timer = setTimeout(() => {
        setSimulatorComplete(selectedToolId, true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [activeMainTab, selectedToolId]);

  const currentTool = ALL_TOOLS.find(t => t.id === selectedToolId) || ALL_TOOLS[0];
  const currentIndex = ALL_TOOLS.findIndex(t => t.id === selectedToolId);

  const filteredTools = ALL_TOOLS.filter(t => {
    if (categoryFilter === 'Strategy') return t.category.includes('Strategy');
    if (categoryFilter === 'Innovation') return t.category.includes('Innovation');
    if (categoryFilter === 'Marketing') return t.category.includes('Marketing');
    if (categoryFilter === 'Operations') return t.category.includes('Operations');
    if (categoryFilter === 'Financial') return t.category.includes('Financial');
    if (categoryFilter === 'Project') return t.category.includes('Project');
    if (categoryFilter === 'HR') return t.category.includes('HR');
    if (categoryFilter === 'Risk') return t.category.includes('Risk');
    if (categoryFilter === 'Product') return t.category.includes('Product');
    if (categoryFilter === 'Analytics') return t.category.includes('Analytics');
    return true;
  });

  const handleSetCategory = (cat: 'All' | 'Strategy' | 'Innovation' | 'Marketing' | 'Operations' | 'Financial' | 'Project' | 'HR' | 'Risk' | 'Product' | 'Analytics') => {
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
    } else if (cat === 'Financial') {
      if (!FINANCIAL_TOOLS_DATA.some(t => t.id === selectedToolId)) {
        setSelectedToolId('breakeven');
      }
    } else if (cat === 'Project') {
      if (!PROJECT_TOOLS_DATA.some(t => t.id === selectedToolId)) {
        setSelectedToolId('gantt');
      }
    } else if (cat === 'HR') {
      if (!HR_TOOLS_DATA.some(t => t.id === selectedToolId)) {
        setSelectedToolId('mckinsey7s');
      }
    } else if (cat === 'Risk') {
      if (!RISK_TOOLS_DATA.some(t => t.id === selectedToolId)) {
        setSelectedToolId('riskmatrix');
      }
    } else if (cat === 'Product') {
      if (!PRODUCT_TOOLS_DATA.some(t => t.id === selectedToolId)) {
        setSelectedToolId('mvp');
      }
    } else if (cat === 'Analytics') {
      if (!ANALYTICS_TOOLS_DATA.some(t => t.id === selectedToolId)) {
        setSelectedToolId('kpis');
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
      } else if (categoryFilter === 'Financial' && !tool.category.includes('Financial')) {
        setCategoryFilter('All');
      } else if (categoryFilter === 'Project' && !tool.category.includes('Project')) {
        setCategoryFilter('All');
      } else if (categoryFilter === 'HR' && !tool.category.includes('HR')) {
        setCategoryFilter('All');
      } else if (categoryFilter === 'Risk' && !tool.category.includes('Risk')) {
        setCategoryFilter('All');
      } else if (categoryFilter === 'Product' && !tool.category.includes('Product')) {
        setCategoryFilter('All');
      } else if (categoryFilter === 'Analytics' && !tool.category.includes('Analytics')) {
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
    if (tool.category.includes('Analytics')) {
      return {
        pillarNumber: 'Pillar 10',
        pillarName: 'Data & Analytics',
        badgeClass: 'bg-violet-50 text-violet-900 border-violet-300'
      };
    }
    if (tool.category.includes('Product')) {
      return {
        pillarNumber: 'Pillar 9',
        pillarName: 'Product & Startup',
        badgeClass: 'bg-cyan-50 text-cyan-900 border-cyan-300'
      };
    }
    if (tool.category.includes('Risk')) {
      return {
        pillarNumber: 'Pillar 8',
        pillarName: 'Risk & Decision-Making',
        badgeClass: 'bg-rose-50 text-rose-900 border-rose-300'
      };
    }
    if (tool.category.includes('HR')) {
      return {
        pillarNumber: 'Pillar 7',
        pillarName: 'HR & Organizational',
        badgeClass: 'bg-purple-50 text-purple-900 border-purple-300'
      };
    }
    if (tool.category.includes('Project')) {
      return {
        pillarNumber: 'Pillar 6',
        pillarName: 'Project Management',
        badgeClass: 'bg-indigo-50 text-indigo-900 border-indigo-300'
      };
    }
    if (tool.category.includes('Financial')) {
      return {
        pillarNumber: 'Pillar 5',
        pillarName: 'Financial & Performance',
        badgeClass: 'bg-emerald-50 text-emerald-900 border-emerald-300'
      };
    }
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
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-slate-200 overflow-x-hidden w-full max-w-full">
      {/* 1. Top Global Navigation Bar - Clean, Organized Executive Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between gap-2 sm:gap-4">
            {/* Left: Brand Identity */}
            <div
              onClick={() => setActiveMainTab('home')}
              className="flex items-center gap-2.5 sm:gap-3 shrink-0 cursor-pointer group"
              title="Return to BizTools Home"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-linear-to-br from-slate-900 to-indigo-950 flex items-center justify-center text-white font-black text-xs sm:text-sm tracking-tight shadow-xs border border-slate-800 shrink-0 group-hover:scale-105 transition-transform">
                BT
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h1 className="font-extrabold text-slate-900 group-hover:text-indigo-950 tracking-tight text-lg sm:text-xl leading-none font-display transition-colors">
                    BizTools
                  </h1>
                  <span className="text-3xs font-extrabold uppercase px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200/80 tracking-wide font-mono hidden md:inline-block">
                    57 Tools · 10 Pillars
                  </span>
                </div>
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 text-2xs sm:text-xs text-slate-500 font-medium mt-0.5 sm:mt-1"
                >
                  <span>by</span>
                  <a
                    href="https://sundaresh.blog"
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors hover:underline inline-flex items-center gap-0.5"
                  >
                    Sundaresh Kamaraj
                    <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                  </a>
                </div>
              </div>
            </div>

            {/* Center: Primary View Navigation Tabs (Clean segmented control for large screens) */}
            <nav className="hidden xl:flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200/80 text-xs font-semibold gap-0.5">
              <button
                onClick={() => setActiveMainTab('home')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeMainTab === 'home'
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <Home className="w-3.5 h-3.5 text-slate-700" />
                <span>Home</span>
              </button>
              <button
                onClick={() => setActiveMainTab('simulators')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeMainTab === 'simulators'
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <PlayCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Simulators</span>
              </button>
              <button
                onClick={() => setActiveMainTab('tools')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeMainTab === 'tools'
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                <span>Guides</span>
              </button>
              <button
                onClick={() => setActiveMainTab('scenarios')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeMainTab === 'scenarios'
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                <span>Missions</span>
                <span className="text-3xs font-mono font-bold text-slate-400">44</span>
              </button>
              <button
                onClick={() => setActiveMainTab('quizzes')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeMainTab === 'quizzes'
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                <span>Quizzes</span>
                <span className="text-3xs font-mono font-bold text-slate-400">285</span>
              </button>
              <button
                onClick={() => setActiveMainTab('stacks')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeMainTab === 'stacks'
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <GitCompare className="w-3.5 h-3.5 text-purple-600" />
                <span>Matrix</span>
              </button>
              <button
                onClick={() => setActiveMainTab('glossary')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeMainTab === 'glossary'
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-slate-600" />
                <span>Glossary</span>
                <span className="text-3xs font-mono font-bold text-slate-400">350+</span>
              </button>
            </nav>

            {/* Right: Quick Search & Progress Hub */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200/90 border border-slate-200/90 text-slate-500 hover:text-slate-800 text-xs px-2 sm:px-3 py-1.5 rounded-xl transition-all w-9 sm:w-36 md:w-44 justify-center sm:justify-between group shadow-2xs shrink-0"
                title="Search 57 frameworks (Cmd+K or /)"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-colors shrink-0" />
                  <span className="hidden sm:inline truncate text-slate-600 font-medium text-xs">Search...</span>
                </div>
                <kbd className="hidden sm:inline-flex items-center text-3xs font-mono font-semibold bg-white border border-slate-300 text-slate-500 px-1.5 py-0.2 rounded shadow-2xs">
                  ⌘K
                </kbd>
              </button>

              {/* User Progress Indicator */}
              <UserProgressIndicator
                allTools={ALL_TOOLS}
                currentToolId={selectedToolId}
                onSelectTool={(toolId, view) => {
                  handleSelectTool(toolId);
                  setActiveMainTab(view);
                }}
              />
            </div>
          </div>
        </div>

        {/* Secondary View Navigation (Clean horizontal strip for mobile/tablet screens < xl) */}
        <div className="xl:hidden flex items-center gap-1 overflow-x-auto px-4 py-2 border-t border-slate-100 bg-slate-50 text-xs font-semibold">
          <button
            onClick={() => setActiveMainTab('home')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMainTab === 'home' ? 'bg-slate-900 text-white font-bold shadow-xs' : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <Home className="w-3.5 h-3.5 text-slate-400" />
            <span>Home</span>
          </button>
          <button
            onClick={() => setActiveMainTab('simulators')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMainTab === 'simulators' ? 'bg-slate-900 text-white font-bold shadow-xs' : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <PlayCircle className="w-3.5 h-3.5 text-emerald-500" />
            <span>Simulators</span>
          </button>
          <button
            onClick={() => setActiveMainTab('tools')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeMainTab === 'tools' ? 'bg-slate-900 text-white font-bold shadow-xs' : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-500" />
            <span>Guides</span>
          </button>
          <button
            onClick={() => setActiveMainTab('scenarios')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeMainTab === 'scenarios' ? 'bg-slate-900 text-white font-bold shadow-xs' : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
            <span>Missions (44)</span>
          </button>
          <button
            onClick={() => setActiveMainTab('quizzes')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeMainTab === 'quizzes' ? 'bg-slate-900 text-white font-bold shadow-xs' : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
            <span>Quizzes (285)</span>
          </button>
          <button
            onClick={() => setActiveMainTab('stacks')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeMainTab === 'stacks' ? 'bg-slate-900 text-white font-bold shadow-xs' : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5 text-purple-500" />
            <span>Matrix</span>
          </button>
          <button
            onClick={() => setActiveMainTab('glossary')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeMainTab === 'glossary' ? 'bg-slate-900 text-white font-bold shadow-xs' : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            <span>Glossary</span>
          </button>
        </div>
      </header>

      {/* 2. Streamlined Executive Framework Control Bar (Simulators & Guides) */}
      {(activeMainTab === 'simulators' || activeMainTab === 'tools') && (
        <div className="bg-white border-b border-slate-200 shadow-2xs w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Row 1: Framework Navigation, Dropdown Jump & Mode/Completion Controls */}
            <div className="py-2.5 flex items-center justify-between gap-3 border-b border-slate-100 flex-wrap">
              {/* Left: Prev/Next & Framework Quick Jump Dropdown */}
              <div className="flex items-center gap-2 min-w-0 flex-1 sm:flex-initial">
                {/* Prev / Next Pagination */}
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50 shrink-0">
                  <button
                    onClick={handlePrevTool}
                    title="Previous Framework"
                    className="p-1.5 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="px-2 text-2xs font-mono font-semibold text-slate-500 whitespace-nowrap">
                    {currentIndex + 1} / {ALL_TOOLS.length}
                  </span>
                  <button
                    onClick={handleNextTool}
                    title="Next Framework"
                    className="p-1.5 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Quick Jump Dropdown */}
                <div className="relative min-w-0 flex-1 sm:flex-initial">
                  <select
                    id="framework-select"
                    value={selectedToolId}
                    onChange={(e) => handleSelectTool(e.target.value)}
                    className="appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-900 text-xs font-semibold rounded-lg pl-3 pr-8 py-1.5 focus:ring-2 focus:ring-slate-900 outline-none cursor-pointer transition-colors w-full max-w-[200px] sm:max-w-[260px] truncate"
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
                    <optgroup label="5. Financial & Performance">
                      {FINANCIAL_TOOLS_DATA.map(t => (
                        <option key={t.id} value={t.id}>
                          {t.shortName} — {t.name}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="6. Project Management">
                      {PROJECT_TOOLS_DATA.map(t => (
                        <option key={t.id} value={t.id}>
                          {t.shortName} — {t.name}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="7. HR & Organizational">
                      {HR_TOOLS_DATA.map(t => (
                        <option key={t.id} value={t.id}>
                          {t.shortName} — {t.name}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="8. Risk & Decision-Making">
                      {RISK_TOOLS_DATA.map(t => (
                        <option key={t.id} value={t.id}>
                          {t.shortName} — {t.name}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="9. Product & Startup">
                      {PRODUCT_TOOLS_DATA.map(t => (
                        <option key={t.id} value={t.id}>
                          {t.shortName} — {t.name}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="10. Data & Analytics">
                      {ANALYTICS_TOOLS_DATA.map(t => (
                        <option key={t.id} value={t.id}>
                          {t.shortName} — {t.name}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Right: Direct Simulation / Guide Mode switcher & Completed Toggle */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                  <button
                    onClick={() => setActiveMainTab('simulators')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1 cursor-pointer ${
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
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                      activeMainTab === 'tools'
                        ? 'bg-white text-slate-900 shadow-2xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    <span className="hidden sm:inline">Guide</span>
                  </button>
                </div>

                {/* Direct Progress Completion Toggle right beside Sim/Guide */}
                <button
                  onClick={() => toggleSimulator(selectedToolId)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border ${
                    isSimulatorDone(selectedToolId)
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-2xs font-bold ring-1 ring-emerald-400/40'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50 hover:border-slate-400 shadow-2xs'
                  }`}
                  title={
                    isSimulatorDone(selectedToolId)
                      ? 'Simulator marked as completed in your learning progress (click to unmark)'
                      : 'Click to mark this simulator completed in your learning progress'
                  }
                >
                  <CheckCircle2
                    className={`w-3.5 h-3.5 ${
                      isSimulatorDone(selectedToolId) ? 'text-emerald-600 fill-emerald-100' : 'text-slate-400'
                    }`}
                  />
                  <span>
                    {isSimulatorDone(selectedToolId) ? 'Completed' : 'Mark Done'}
                  </span>
                </button>

                {/* PDF Report Export Button */}
                <button
                  onClick={() => setIsExportReportOpen(true)}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:border-slate-400 shadow-2xs"
                  title="Export completed simulator session data as a printable PDF report"
                >
                  <Download className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="hidden sm:inline">Export PDF</span>
                </button>
              </div>
            </div>

            {/* Row 2: 10 Pillars Segmented Filter (Dedicated Horizontal Scroll Rail) */}
            <div className="py-2 flex items-center gap-1.5 overflow-x-auto min-w-0 w-full border-b border-slate-100 text-xs">
              <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
                Pillars:
              </span>
              <button
                onClick={() => handleSetCategory('All')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  categoryFilter === 'All'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                All 57
              </button>
              <button
                onClick={() => handleSetCategory('Strategy')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  categoryFilter === 'Strategy'
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-blue-900 hover:bg-blue-50'
                }`}
              >
                1. Strategy <span className="opacity-70 text-2xs ml-0.5">(8)</span>
              </button>
              <button
                onClick={() => handleSetCategory('Innovation')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  categoryFilter === 'Innovation'
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-emerald-900 hover:bg-emerald-50'
                }`}
              >
                2. Innovation <span className="opacity-70 text-2xs ml-0.5">(6)</span>
              </button>
              <button
                onClick={() => handleSetCategory('Marketing')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  categoryFilter === 'Marketing'
                    ? 'bg-amber-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-amber-900 hover:bg-amber-50'
                }`}
              >
                3. Marketing <span className="opacity-70 text-2xs ml-0.5">(6)</span>
              </button>
              <button
                onClick={() => handleSetCategory('Operations')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  categoryFilter === 'Operations'
                    ? 'bg-teal-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-teal-900 hover:bg-teal-50'
                }`}
              >
                4. Operations <span className="opacity-70 text-2xs ml-0.5">(6)</span>
              </button>
              <button
                onClick={() => handleSetCategory('Financial')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  categoryFilter === 'Financial'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-emerald-900 hover:bg-emerald-50'
                }`}
              >
                <Coins className="w-3 h-3 text-emerald-400" />
                <span>5. Financial</span>
                <span className={`px-1.5 py-0.2 rounded text-3xs font-extrabold uppercase ${
                  categoryFilter === 'Financial' ? 'bg-emerald-900 text-emerald-200' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  6
                </span>
              </button>
              <button
                onClick={() => handleSetCategory('Project')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  categoryFilter === 'Project'
                    ? 'bg-indigo-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-indigo-900 hover:bg-indigo-50'
                }`}
              >
                <KanbanSquare className="w-3 h-3 text-indigo-400" />
                <span>6. Project</span>
                <span className={`px-1.5 py-0.2 rounded text-3xs font-extrabold uppercase ${
                  categoryFilter === 'Project' ? 'bg-indigo-950 text-indigo-200' : 'bg-indigo-100 text-indigo-800'
                }`}>
                  5
                </span>
              </button>
              <button
                onClick={() => handleSetCategory('HR')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  categoryFilter === 'HR'
                    ? 'bg-purple-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-purple-900 hover:bg-purple-50'
                }`}
              >
                <Users className="w-3 h-3 text-purple-400" />
                <span>7. HR & Org</span>
                <span className={`px-1.5 py-0.2 rounded text-3xs font-extrabold uppercase ${
                  categoryFilter === 'HR' ? 'bg-purple-950 text-purple-200' : 'bg-purple-100 text-purple-800'
                }`}>
                  5
                </span>
              </button>
              <button
                onClick={() => handleSetCategory('Risk')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  categoryFilter === 'Risk'
                    ? 'bg-rose-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-rose-900 hover:bg-rose-50'
                }`}
              >
                <AlertOctagon className="w-3 h-3 text-rose-400" />
                <span>8. Risk & Decision</span>
                <span className={`px-1.5 py-0.2 rounded text-3xs font-extrabold uppercase ${
                  categoryFilter === 'Risk' ? 'bg-rose-950 text-rose-200' : 'bg-rose-100 text-rose-800'
                }`}>
                  5
                </span>
              </button>
              <button
                onClick={() => handleSetCategory('Product')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  categoryFilter === 'Product'
                    ? 'bg-cyan-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-cyan-900 hover:bg-cyan-50'
                }`}
              >
                <Rocket className="w-3 h-3 text-cyan-400" />
                <span>9. Product & Startup</span>
                <span className={`px-1.5 py-0.2 rounded text-3xs font-extrabold uppercase ${
                  categoryFilter === 'Product' ? 'bg-cyan-950 text-cyan-200' : 'bg-cyan-100 text-cyan-800'
                }`}>
                  5
                </span>
              </button>
              <button
                onClick={() => handleSetCategory('Analytics')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  categoryFilter === 'Analytics'
                    ? 'bg-violet-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-violet-900 hover:bg-violet-50'
                }`}
              >
                <BarChart3 className="w-3 h-3 text-violet-400" />
                <span>10. Data & Analytics</span>
                <span className={`px-1.5 py-0.2 rounded text-3xs font-extrabold uppercase ${
                  categoryFilter === 'Analytics' ? 'bg-violet-950 text-violet-200' : 'bg-violet-100 text-violet-800'
                }`}>
                  5
                </span>
              </button>
            </div>

            {/* Bottom Row: Focused Tool Chips for the Active Pillar (Clean, not noisy) */}
            <div className="py-2 flex items-center gap-1.5 overflow-x-auto pb-2">
              {filteredTools.map((tool) => {
                const isSelected = tool.id === selectedToolId;
                const globalIdx = ALL_TOOLS.findIndex(t => t.id === tool.id) + 1;
                const isSimDone = isSimulatorDone(tool.id);
                const isQzDone = isQuizDone(tool.id);

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
                    {isSimDone && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" title="Simulator completed" />
                    )}
                    {isQzDone && (
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" title="Quiz completed" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* VIEW 0: EXECUTIVE HOME PAGE */}
        {activeMainTab === 'home' && (
          <HomePage
            allTools={ALL_TOOLS}
            onSelectTool={(toolId, view) => {
              handleSelectTool(toolId);
              setActiveMainTab(view);
            }}
            onNavigateTab={(tab) => setActiveMainTab(tab)}
          />
        )}

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
                      Tool #{currentIndex + 1} of {ALL_TOOLS.length}
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

                <div className="flex items-center gap-2 shrink-0 self-start md:self-center flex-wrap">
                  {/* Interactive Simulator Completion Toggle (localStorage) */}
                  <button
                    onClick={() => toggleSimulator(currentTool.id)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSimulatorDone(currentTool.id)
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 hover:bg-emerald-200 shadow-2xs font-bold'
                        : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-2xs'
                    }`}
                    title={isSimulatorDone(currentTool.id) ? 'Simulator completed in localStorage (click to toggle)' : 'Mark this simulator as completed'}
                  >
                    <CheckCircle2 className={`w-3.5 h-3.5 ${isSimulatorDone(currentTool.id) ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span>{isSimulatorDone(currentTool.id) ? 'Simulator Completed' : 'Mark Completed'}</span>
                  </button>

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
                    <CheckCircle2 className={`w-3.5 h-3.5 ${isQuizDone(currentTool.id) ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span>{isQuizDone(currentTool.id) ? 'Quiz Passed' : 'Quiz (5 Qs)'}</span>
                  </button>
                  <button
                    onClick={() => setShowCurriculumOverview(!showCurriculumOverview)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-700 border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Layers className="w-3.5 h-3.5 text-slate-500" />
                    <span>{showCurriculumOverview ? 'Hide Blueprint' : 'Curriculum Blueprint'}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showCurriculumOverview ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Export PDF Report Button */}
                  <button
                    onClick={() => setIsExportReportOpen(true)}
                    className="px-3 py-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    title="Export completed simulator session data as a printable PDF report"
                  >
                    <Download className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Export PDF Report</span>
                  </button>
                </div>
              </div>

              {/* Optional Expandable Curriculum Blueprint Drawer */}
              {showCurriculumOverview && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
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

                    {/* Pillar 5: Financial & Performance */}
                    <div
                      onClick={() => handleSetCategory('Financial')}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        FINANCIAL_TOOLS_DATA.some(t => t.id === selectedToolId)
                          ? 'bg-emerald-50/90 border-emerald-400 ring-2 ring-emerald-500/20 shadow-xs'
                          : 'bg-slate-50/70 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-emerald-950 mb-1">
                        <span className="flex items-center gap-1.5">
                          <span>5. Financial & Perf</span>
                          <span className="bg-emerald-600 text-white text-3xs font-black px-1.5 py-0.2 rounded uppercase">
                            New
                          </span>
                        </span>
                        <span className="text-2xs bg-emerald-100 text-emerald-900 px-1.5 py-0.5 rounded font-mono font-bold">
                          6 Tools
                        </span>
                      </div>
                      <p className="text-2xs text-slate-500 mb-2">Break-Even, CBA & NPV, ZBB & Variances, CCC Cash, DuPont ROE & ABC</p>
                      <div className="flex flex-wrap gap-1">
                        {FINANCIAL_TOOLS_DATA.map(t => (
                          <button
                            key={t.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectTool(t.id);
                            }}
                            className={`px-1.5 py-0.5 text-3xs font-semibold rounded ${
                              t.id === selectedToolId
                                ? 'bg-emerald-900 text-white font-bold'
                                : 'bg-white text-emerald-900 border border-emerald-200 hover:bg-emerald-100'
                            }`}
                          >
                            {t.shortName}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Pillar 6: Project Management */}
                    <div
                      onClick={() => handleSetCategory('Project')}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        PROJECT_TOOLS_DATA.some(t => t.id === selectedToolId)
                          ? 'bg-indigo-50/90 border-indigo-400 ring-2 ring-indigo-500/20 shadow-xs'
                          : 'bg-slate-50/70 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-indigo-950 mb-1">
                        <span className="flex items-center gap-1.5">
                          <span>6. Project Mgmt</span>
                          <span className="bg-indigo-600 text-white text-3xs font-black px-1.5 py-0.2 rounded uppercase">
                            New
                          </span>
                        </span>
                        <span className="text-2xs bg-indigo-100 text-indigo-900 px-1.5 py-0.5 rounded font-mono font-bold">
                          5 Tools
                        </span>
                      </div>
                      <p className="text-2xs text-slate-500 mb-2">Gantt bar schedule, CPM float & crashing, PERT variance, Agile & Scrum</p>
                      <div className="flex flex-wrap gap-1">
                        {PROJECT_TOOLS_DATA.map(t => (
                          <button
                            key={t.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectTool(t.id);
                            }}
                            className={`px-1.5 py-0.5 text-3xs font-semibold rounded ${
                              t.id === selectedToolId
                                ? 'bg-indigo-900 text-white font-bold'
                                : 'bg-white text-indigo-900 border border-indigo-200 hover:bg-indigo-100'
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

            {/* Category 5: Financial & Performance */}
            {selectedToolId === 'breakeven' && <BreakEvenSimulator />}
            {selectedToolId === 'costbenefit' && <CostBenefitSimulator />}
            {selectedToolId === 'budgeting' && <BudgetingVarianceSimulator />}
            {selectedToolId === 'workingcapital' && <WorkingCapitalSimulator />}
            {selectedToolId === 'dupont' && <DuPontSimulator />}
            {selectedToolId === 'abc' && <ActivityBasedCostingSimulator />}

            {/* Category 6: Project Management */}
            {selectedToolId === 'gantt' && <GanttSimulator />}
            {selectedToolId === 'cpm' && <CPMSimulator />}
            {selectedToolId === 'pert' && <PertSimulator />}
            {selectedToolId === 'agile' && <AgileSimulator />}
            {selectedToolId === 'scrum' && <ScrumSimulator />}

            {/* Category 7: HR & Organizational */}
            {selectedToolId === 'mckinsey7s' && <McKinsey7SSimulator />}
            {selectedToolId === 'raci' && <RACISimulator />}
            {selectedToolId === 'engagement' && <EngagementSurveySimulator />}
            {selectedToolId === 'appraisal' && <PerformanceAppraisalSimulator />}
            {selectedToolId === 'competency' && <CompetencyMappingSimulator />}

            {/* Category 8: Risk & Decision-Making */}
            {selectedToolId === 'riskmatrix' && <RiskMatrixSimulator />}
            {selectedToolId === 'decisiontree' && <DecisionTreeSimulator />}
            {selectedToolId === 'montecarlo' && <MonteCarloSimulator />}
            {selectedToolId === 'scenarioplanning' && <ScenarioPlanningSimulator />}
            {selectedToolId === 'pareto' && <ParetoAnalysisSimulator />}

            {/* Category 9: Product & Startup */}
            {selectedToolId === 'mvp' && <MVPSimulator />}
            {selectedToolId === 'productroadmap' && <ProductRoadmapSimulator />}
            {selectedToolId === 'userstorymapping' && <UserStoryMappingSimulator />}
            {selectedToolId === 'abtesting' && <ABTestingSimulator />}
            {selectedToolId === 'churnanalysis' && <ChurnAnalysisSimulator />}

            {/* Category 10: Data & Analytics */}
            {selectedToolId === 'kpis' && <KPISimulator />}
            {selectedToolId === 'dashboards' && <DashboardDesignerSimulator />}
            {selectedToolId === 'cohort' && <CohortRetentionSimulator />}
            {selectedToolId === 'predictive' && <PredictiveAnalyticsSimulator />}
            {selectedToolId === 'bitools' && <BIToolSimulator />}
          </div>
        )}

        {/* VIEW 2: TOOL EXPLANATIONS & CASE STUDIES */}
        {activeMainTab === 'tools' && (
          <ToolDetailView
            tool={currentTool}
            onLaunchSimulator={() => setActiveMainTab('simulators')}
            onLaunchQuiz={() => setActiveMainTab('quizzes')}
            onExportReport={() => setIsExportReportOpen(true)}
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
              BizTools · Executive Strategy, Operations, Finance, Product & Data Analytics Platform
            </p>
            <p className="mt-0.5 text-slate-500">
              by Sundaresh Kamaraj · Version 1.0 (October 2026) · Covering 57 Core Executive Frameworks across 10 Pillars
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveMainTab('stacks')}
              className="hover:text-slate-900 transition-colors"
            >
              Master Matrix (57)
            </button>
            <button
              onClick={() => setActiveMainTab('glossary')}
              className="hover:text-slate-900 transition-colors"
            >
              Glossary (350+)
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

      {/* Global Search & Command Palette Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        tools={ALL_TOOLS}
        onSelectTool={(id, view) => {
          handleSelectTool(id);
          if (view) {
            setActiveMainTab(view);
          }
        }}
      />

      {/* Printable / Downloadable PDF Report Modal */}
      <SimulatorReportModal
        tool={currentTool}
        isOpen={isExportReportOpen}
        onClose={() => setIsExportReportOpen(false)}
      />
    </div>
  );
}
