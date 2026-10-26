import { useState, useEffect, useMemo } from 'react';
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
import { AuthorBiographyView } from './components/AuthorBiographyView.tsx';
import { SEOHeadManager } from './components/SEOHeadManager.tsx';
import { GlobalSearchModal } from './components/GlobalSearchModal.tsx';
import { UserProgressIndicator } from './components/UserProgressIndicator.tsx';
import { ProgressRing } from './components/ProgressRing.tsx';
import { SimulatorReportModal } from './components/SimulatorReportModal.tsx';
import { UserSessionPerformancePanel } from './components/UserSessionPerformancePanel.tsx';
import { QuickJumpDropdown } from './components/QuickJumpDropdown.tsx';
import { PillarMethodologyComparison } from './components/PillarMethodologyComparison.tsx';
import { ToolExamplesModal } from './components/ToolExamplesModal.tsx';
import { WorkspaceDrawer } from './components/WorkspaceDrawer.tsx';
import { PillarMasteryCertificateModal } from './components/PillarMasteryCertificateModal.tsx';
import { FrameworkRecommenderModal } from './components/FrameworkRecommenderModal.tsx';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal.tsx';
import { PWAInstallButton } from './components/PWAInstallButton.tsx';
import { OfflineIndicator } from './components/OfflineIndicator.tsx';
import { SimulatorPresetToolbar } from './components/SimulatorPresetToolbar.tsx';
import { ScenarioSnapshotModal } from './components/ScenarioSnapshotModal.tsx';
import { ExecutiveStrategyDossierModal } from './components/ExecutiveStrategyDossierModal.tsx';
import { StrategyChainRunnerModal } from './components/StrategyChainRunnerModal.tsx';
import { StrategyDeckSlideBuilderModal } from './components/StrategyDeckSlideBuilderModal.tsx';
import { MultiFrameworkWorkbenchModal } from './components/MultiFrameworkWorkbenchModal.tsx';
import { ExecutiveAchievementsModal } from './components/ExecutiveAchievementsModal.tsx';
import { StrategyHealthAuditModal } from './components/StrategyHealthAuditModal.tsx';
import { ScenarioPresetsModal } from './components/ScenarioPresetsModal.tsx';
import { StrategyVaultModal } from './components/StrategyVaultModal.tsx';
import { SITUATIONAL_TAGS } from './data/situationalTags.ts';
import { getSnapshotsForTool, ScenarioSnapshot, decodeSnapshotFromURL } from './utils/scenarioSnapshots.ts';
import { loadDeckSlides, saveDeckSlide } from './utils/slideDeck.ts';
import { TOOL_ICONS, getToolIcon } from './data/toolIcons.ts';
import { useUserProgress, setSimulatorComplete, addSimulatorTimeSpent, saveUserProgress, loadUserProgress } from './utils/userProgress.ts';
import { triggerCompletionConfetti } from './utils/confetti.ts';
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
  Trophy,
  BrainCircuit,
  Compass,
  Share2,
  Check,
  Bookmark,
  BookmarkCheck,
  Award,
  Keyboard,
  Camera,
  Printer,
  Presentation,
  SplitSquareVertical,
  Gamepad2,
  Menu,
  X,
  Activity,
  Tag,
  UserCheck,
  Briefcase,
  Database
} from 'lucide-react';

const RAW_TOOLS: ToolDefinition[] = [
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

const ALL_TOOLS: ToolDefinition[] = RAW_TOOLS.map(tool => ({
  ...tool,
  icon: TOOL_ICONS[tool.id] || Compass
}));

export default function App() {
  // Read URL query parameters on initial load for deep linking
  const [initialDeepLink] = useState(() => {
    if (typeof window === 'undefined') return null;
    try {
      const params = new URLSearchParams(window.location.search);
      const tool = params.get('tool');
      const tab = params.get('tab') as 'home' | 'tools' | 'simulators' | 'scenarios' | 'quizzes' | 'stacks' | 'glossary' | 'performance' | 'author' | null;
      const category = params.get('category') as any;
      const compare = params.get('compare');
      return { tool, tab, category, compare };
    } catch {
      return null;
    }
  });

  const [activeMainTab, setActiveMainTab] = useState<'home' | 'tools' | 'simulators' | 'scenarios' | 'quizzes' | 'stacks' | 'glossary' | 'performance' | 'author'>(() => {
    if (initialDeepLink?.tab) return initialDeepLink.tab;
    if (initialDeepLink?.tool) return 'simulators';
    return 'home';
  });
  const [selectedToolId, setSelectedToolId] = useState<string>(() => {
    if (initialDeepLink?.tool && ALL_TOOLS.some(t => t.id === initialDeepLink.tool)) {
      return initialDeepLink.tool;
    }
    return 'swot';
  });
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Strategy' | 'Innovation' | 'Marketing' | 'Operations' | 'Financial' | 'Project' | 'HR' | 'Risk' | 'Product' | 'Analytics'>(() => {
    if (initialDeepLink?.category) return initialDeepLink.category;
    if (initialDeepLink?.tool) {
      const matched = ALL_TOOLS.find(t => t.id === initialDeepLink.tool);
      if (matched) {
        if (matched.category.includes('Analytics')) return 'Analytics';
        if (matched.category.includes('Product')) return 'Product';
        if (matched.category.includes('Risk')) return 'Risk';
        if (matched.category.includes('HR')) return 'HR';
        if (matched.category.includes('Project')) return 'Project';
        if (matched.category.includes('Financial')) return 'Financial';
        if (matched.category.includes('Operations')) return 'Operations';
        if (matched.category.includes('Marketing')) return 'Marketing';
        if (matched.category.includes('Innovation')) return 'Innovation';
        return 'Strategy';
      }
    }
    return 'Analytics';
  });
  const [showCurriculumOverview, setShowCurriculumOverview] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isExportReportOpen, setIsExportReportOpen] = useState<boolean>(false);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(() => {
    return Boolean(initialDeepLink?.compare);
  });
  const [compareSecondaryToolId, setCompareSecondaryToolId] = useState<string>(() => {
    return initialDeepLink?.compare || '';
  });
  const [copiedShareLink, setCopiedShareLink] = useState<boolean>(false);
  const [shareFeedbackMsg, setShareFeedbackMsg] = useState<string | null>(null);
  const [isExamplesModalOpen, setIsExamplesModalOpen] = useState<boolean>(false);
  const [workspaceToastMsg, setWorkspaceToastMsg] = useState<string | null>(null);

  // Additional workflow modals & actions
  const [isWorkspaceDrawerOpen, setIsWorkspaceDrawerOpen] = useState<boolean>(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState<boolean>(false);
  const [isRecommenderOpen, setIsRecommenderOpen] = useState<boolean>(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState<boolean>(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState<boolean>(false);
  const [situationalFilter, setSituationalFilter] = useState<string | null>(null);
  const [appliedTemplateToast, setAppliedTemplateToast] = useState<string | null>(null);

  // New High-Impact Feature States
  const [activePresetId, setActivePresetId] = useState<string | null>(null);
  const [isSnapshotModalOpen, setIsSnapshotModalOpen] = useState<boolean>(false);
  const [isDossierModalOpen, setIsDossierModalOpen] = useState<boolean>(false);
  const [isChainRunnerOpen, setIsChainRunnerOpen] = useState<boolean>(false);
  const [snapshotCount, setSnapshotCount] = useState<number>(0);
  const [isDeckBuilderOpen, setIsDeckBuilderOpen] = useState<boolean>(false);
  const [isWorkbenchOpen, setIsWorkbenchOpen] = useState<boolean>(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState<boolean>(false);
  const [isPresetsModalOpen, setIsPresetsModalOpen] = useState<boolean>(false);
  const [isVaultModalOpen, setIsVaultModalOpen] = useState<boolean>(false);
  const [deckSlideCount, setDeckSlideCount] = useState<number>(() => {
    return typeof window !== 'undefined' ? loadDeckSlides().length : 2;
  });

  // Clean Navigation States (Strict single-row structure)
  const [isStudioMenuOpen, setIsStudioMenuOpen] = useState<boolean>(false);
  const [isMoreNavOpen, setIsMoreNavOpen] = useState<boolean>(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);

  const currentTool = ALL_TOOLS.find(t => t.id === selectedToolId) || ALL_TOOLS[0];
  const currentIndex = ALL_TOOLS.findIndex(t => t.id === selectedToolId);

  useEffect(() => {
    setSnapshotCount(getSnapshotsForTool(selectedToolId).length);
    setActivePresetId(null);
  }, [selectedToolId]);

  // Detect shared scenario from URL hash on initial load
  useEffect(() => {
    const shared = decodeSnapshotFromURL();
    if (shared && shared.toolId) {
      handleSelectTool(shared.toolId);
      setAppliedTemplateToast(`Loaded shared scenario: "${shared.name}"`);
      setTimeout(() => setAppliedTemplateToast(null), 4000);
    }
  }, []);

  const handleSelectPreset = (presetId: string, presetName: string, _inputs: { label: string; value: string }[]) => {
    setActivePresetId(presetId);
    setAppliedTemplateToast(`Loaded "${presetName}" profile into ${currentTool.shortName}!`);
    setTimeout(() => setAppliedTemplateToast(null), 3000);
  };

  const handleResetDefault = () => {
    setActivePresetId(null);
    setAppliedTemplateToast(`Reset ${currentTool.shortName} to baseline model`);
    setTimeout(() => setAppliedTemplateToast(null), 2500);
  };

  const handleApplySnapshot = (snapshot: ScenarioSnapshot) => {
    setAppliedTemplateToast(`Restored snapshot "${snapshot.name}" into ${currentTool.shortName}!`);
    setTimeout(() => setAppliedTemplateToast(null), 3000);
  };

  const handleAddCurrentToDeck = () => {
    saveDeckSlide({
      toolId: currentTool.id,
      toolName: currentTool.name,
      pillar: currentTool.category,
      title: `${currentTool.name} Strategic Diagnostic`,
      executiveSummary: currentTool.corePurpose,
      keyMetrics: [
        { label: 'Planning Horizon', value: currentTool.horizon },
        { label: 'Scope', value: currentTool.scope },
        { label: 'Time to First Result', value: currentTool.timeToResult }
      ],
      strategicRecommendations: [
        `Establish operational baseline using ${currentTool.shortName} mechanics`,
        `Stress-test critical resource assumptions against competitive shifts`,
        `Review quarterly alignment milestones with executive steering committee`
      ],
      notes: `Captured from active ${currentTool.name} session.`
    });
    setDeckSlideCount(loadDeckSlides().length);
    setAppliedTemplateToast(`✨ Added slide for ${currentTool.shortName} into Board Deck!`);
    setTimeout(() => setAppliedTemplateToast(null), 3000);
  };

  const handleCopyExecutiveMemo = async () => {
    const memo = `# Executive Strategy Briefing Memorandum
**Date:** ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
**Framework:** ${currentTool.name} (${currentTool.category})
**Executive Lead:** Office of Strategy & Corporate Development · BizTools Platform
**Reference URL:** https://sundaresh.blog

## 1. Executive Summary & Strategic Context
${currentTool.corePurpose}

## 2. Quantitative & Analytical Methodology
- **Time Horizon:** ${currentTool.horizon}
- **Decision Scope:** ${currentTool.scope}
- **Primary Deliverable:** ${currentTool.keyOutput}
- **Analytical Mechanics:** ${currentTool.howItWorks}

## 3. Real-World Corporate Benchmark Case
- **Company:** ${currentTool.caseStudy.company} (${currentTool.caseStudy.profile || 'Enterprise Benchmark'})
- **Challenge:** ${currentTool.caseStudy.challenge}
- **Business Impact:** ${currentTool.caseStudy.results?.[0] || 'Validated operational efficiency and ROI'}

## 4. 30-60-90 Day C-Suite Execution Plan
1. **Days 1-30 (Baseline & Alignment):** Map baseline metrics using ${currentTool.shortName} mechanics and audit input data integrity.
2. **Days 31-60 (Stress-Testing & Trade-offs):** Stress-test unit economics and resource bottlenecks against competitive shifts.
3. **Days 61-90 (Board Governance & Rollout):** Cascade accountability via cross-functional OKRs and operational telemetry.

## 5. Critical Pitfall to Avoid
${currentTool.implementationGuide?.proTips?.[0] || currentTool.limitations?.[0] || 'Avoid confusing operational efficiency with defensible strategy.'}

---
*Generated via BizTools C-Suite Platform by Sundaresh Kamaraj*`;

    try {
      await navigator.clipboard.writeText(memo);
      setAppliedTemplateToast(`📋 Copied Executive Memo for ${currentTool.shortName} to clipboard!`);
      setTimeout(() => setAppliedTemplateToast(null), 3000);
    } catch (err) {
      console.error('Failed to copy memo', err);
    }
  };

  // Persistent user learning progress hook
  const { progress, toggleSimulator, isSimulatorDone, isQuizDone, toggleWorkspace, isSavedInWorkspace, getTimeSpent } = useUserProgress();

  const handleToggleWorkspace = () => {
    const isNowSaved = toggleWorkspace(currentTool.id);
    setWorkspaceToastMsg(
      isNowSaved
        ? `Saved ${currentTool.shortName} to Workspace!`
        : `Removed ${currentTool.shortName} from Workspace`
    );
    setTimeout(() => setWorkspaceToastMsg(null), 2500);
  };

  const handleClearWorkspace = () => {
    const current = loadUserProgress();
    saveUserProgress({ ...current, savedWorkspace: [] });
    setWorkspaceToastMsg('Cleared all items from workspace');
    setTimeout(() => setWorkspaceToastMsg(null), 2500);
  };

  const handleApplyTemplate = (scenarioName: string, _inputs: { label: string; value: string }[]) => {
    setAppliedTemplateToast(`Applied "${scenarioName}" dataset to ${currentTool.shortName}!`);
    setIsExamplesModalOpen(false);
    setTimeout(() => setAppliedTemplateToast(null), 3000);
  };

  // Dynamic pillar completion statistics for visual progress rings
  const pillarStats = useMemo(() => {
    const calc = (tools: ToolDefinition[]) => {
      const total = tools.length;
      const completed = tools.filter(t => progress.completedSimulators.includes(t.id)).length;
      const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
      return { completed, total, percentage };
    };

    return {
      All: calc(ALL_TOOLS),
      Strategy: calc(TOOLS_DATA),
      Innovation: calc(INNOVATION_TOOLS_DATA),
      Marketing: calc(MARKETING_TOOLS_DATA),
      Operations: calc(OPERATIONS_TOOLS_DATA),
      Financial: calc(FINANCIAL_TOOLS_DATA),
      Project: calc(PROJECT_TOOLS_DATA),
      HR: calc(HR_TOOLS_DATA),
      Risk: calc(RISK_TOOLS_DATA),
      Product: calc(PRODUCT_TOOLS_DATA),
      Analytics: calc(ANALYTICS_TOOLS_DATA),
    };
  }, [progress.completedSimulators]);


  // Auto-mark simulator as completed when active in simulator tab (registers after brief engagement)
  useEffect(() => {
    if (activeMainTab === 'simulators' && selectedToolId) {
      const timer = setTimeout(() => {
        setSimulatorComplete(selectedToolId, true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [activeMainTab, selectedToolId]);

  // Track active dwell time in the current simulator (increments every 5 seconds)
  useEffect(() => {
    if (activeMainTab === 'simulators' && selectedToolId) {
      const interval = setInterval(() => {
        addSimulatorTimeSpent(selectedToolId, 5);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [activeMainTab, selectedToolId]);

  // Sibling tools in the active pillar for side-by-side methodology comparison
  const currentPillarTools = useMemo(() => {
    if (currentTool.category.includes('Analytics')) return ANALYTICS_TOOLS_DATA;
    if (currentTool.category.includes('Product')) return PRODUCT_TOOLS_DATA;
    if (currentTool.category.includes('Risk')) return RISK_TOOLS_DATA;
    if (currentTool.category.includes('HR')) return HR_TOOLS_DATA;
    if (currentTool.category.includes('Project')) return PROJECT_TOOLS_DATA;
    if (currentTool.category.includes('Financial')) return FINANCIAL_TOOLS_DATA;
    if (currentTool.category.includes('Operations')) return OPERATIONS_TOOLS_DATA;
    if (currentTool.category.includes('Marketing')) return MARKETING_TOOLS_DATA;
    if (currentTool.category.includes('Innovation')) return INNOVATION_TOOLS_DATA;
    return TOOLS_DATA;
  }, [currentTool.category]);

  const currentSiblingTools = useMemo(() => {
    return currentPillarTools.filter(t => t.id !== currentTool.id);
  }, [currentPillarTools, currentTool.id]);

  const secondaryTool = useMemo(() => {
    const match = currentSiblingTools.find(t => t.id === compareSecondaryToolId);
    return match || currentSiblingTools[0] || ALL_TOOLS[0];
  }, [currentSiblingTools, compareSecondaryToolId]);

  // Keep URL query parameters in sync with current view state
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const url = new URL(window.location.href);
      if (activeMainTab === 'home') {
        url.searchParams.delete('tab');
        url.searchParams.delete('tool');
        url.searchParams.delete('category');
        url.searchParams.delete('compare');
      } else {
        url.searchParams.set('tab', activeMainTab);
        if (activeMainTab === 'simulators' || activeMainTab === 'tools' || activeMainTab === 'quizzes') {
          url.searchParams.set('tool', selectedToolId);
          url.searchParams.set('category', categoryFilter);
          if (isCompareOpen && compareSecondaryToolId) {
            url.searchParams.set('compare', compareSecondaryToolId);
          } else {
            url.searchParams.delete('compare');
          }
        } else {
          url.searchParams.delete('tool');
          url.searchParams.delete('compare');
        }
      }
      window.history.replaceState({}, '', url.toString());
    } catch {
      // In case of cross-origin or iframe restrictions
    }
  }, [activeMainTab, selectedToolId, categoryFilter, isCompareOpen, compareSecondaryToolId]);

  // Generate shareable deep-link URL and copy to clipboard
  const handleShareCurrentSimulator = async () => {
    if (typeof window === 'undefined') return;
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', 'simulators');
      url.searchParams.set('tool', currentTool.id);
      url.searchParams.set('category', categoryFilter);
      if (isCompareOpen && secondaryTool) {
        url.searchParams.set('compare', secondaryTool.id);
      } else {
        url.searchParams.delete('compare');
      }

      const shareUrl = url.toString();

      let copied = false;
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(shareUrl);
          copied = true;
        } catch {
          // fallback below
        }
      }

      if (!copied) {
        try {
          const textarea = document.createElement('textarea');
          textarea.value = shareUrl;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          copied = true;
        } catch (err) {
          console.error('Fallback clipboard copy failed', err);
        }
      }

      if (copied) {
        setCopiedShareLink(true);
        setShareFeedbackMsg(`Copied deep-link for ${currentTool.shortName}!`);
        setTimeout(() => {
          setCopiedShareLink(false);
          setShareFeedbackMsg(null);
        }, 2500);
      }
    } catch (err) {
      console.error('Failed to generate share URL', err);
    }
  };

  const filteredTools = ALL_TOOLS.filter(t => {
    if (situationalFilter) {
      const tag = SITUATIONAL_TAGS.find(st => st.id === situationalFilter);
      if (tag && !tag.toolIds.includes(t.id)) return false;
    }
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

  // Global keyboard shortcuts & hotkey navigation listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName) || (e.target as HTMLElement)?.isContentEditable;

      // Cmd+K or Ctrl+K triggers command search palette
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
        return;
      }

      // Close popover menus on Escape
      if (e.key === 'Escape') {
        setIsStudioMenuOpen(false);
        setIsMoreNavOpen(false);
        setIsMobileNavOpen(false);
      }

      // Guard single-character hotkeys from firing inside form inputs
      if (isInput || e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === '/') {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === '?') {
        e.preventDefault();
        setIsShortcutsOpen(prev => !prev);
      } else if (e.key === '[') {
        e.preventDefault();
        handlePrevTool();
      } else if (e.key === ']') {
        e.preventDefault();
        handleNextTool();
      } else if (e.key.toLowerCase() === 'w') {
        e.preventDefault();
        setIsWorkspaceDrawerOpen(prev => !prev);
      } else if (e.key.toLowerCase() === 'e') {
        e.preventDefault();
        setIsExamplesModalOpen(prev => !prev);
      } else if (e.key.toLowerCase() === 'c') {
        e.preventDefault();
        setIsCompareOpen(prev => !prev);
      } else if (e.key.toLowerCase() === 'r') {
        e.preventDefault();
        setIsRecommenderOpen(prev => !prev);
      } else if (e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsAuditModalOpen(prev => !prev);
      } else if (e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleShareCurrentSimulator();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isCompareOpen, currentTool]);

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
      {/* Dynamic SEO, AEO & GEO Head Meta Manager */}
      <SEOHeadManager activeMainTab={activeMainTab} selectedTool={currentTool} />

      {/* 1. Global Navigation Bar - Two-Row Architecture */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs w-full">
        {/* ROW 1: Executive Brand & Utility Bar */}
        <div className="w-full border-b border-slate-100 bg-white">
          <div className="w-full max-w-7xl 2xl:max-w-[1600px] mx-auto px-3 sm:px-4 lg:px-6">
            <div className="h-14 sm:h-15 flex items-center justify-between gap-3 relative">
              {/* Left: Brand Identity */}
              <div
                onClick={() => setActiveMainTab('home')}
                className="flex items-center gap-2 sm:gap-2.5 shrink-0 cursor-pointer group"
                title="Return to BizTools Home"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden bg-white border border-slate-200/90 shadow-xs shrink-0 group-hover:scale-105 group-hover:border-indigo-400 group-hover:shadow-sm transition-all flex items-center justify-center">
                  <img
                    src="/assets/aistudio/Sundaresh_Kamaraj_Logo-01_840f0755.jpg"
                    alt="BizTools by Sundaresh Kamaraj"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <h1 className="font-extrabold text-slate-900 group-hover:text-indigo-950 tracking-tight text-lg sm:text-xl leading-none font-display transition-colors">
                      BizTools
                    </h1>
                    <span className="text-3xs font-extrabold uppercase px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200/80 tracking-wide font-mono hidden md:inline-block">
                      v1.21 · 57 Tools
                    </span>
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMainTab('author');
                    }}
                    className="flex items-center gap-1.5 text-2xs sm:text-xs text-slate-500 font-medium mt-0.5 sm:mt-1 cursor-pointer group/author"
                    title="View Sundaresh Kamaraj Author Biography"
                  >
                    <span>by</span>
                    <span className="text-indigo-600 group-hover/author:text-indigo-900 font-semibold group-hover/author:underline inline-flex items-center gap-0.5">
                      Sundaresh Kamaraj
                    </span>
                    <a
                      href="https://sundaresh.blog"
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-slate-400 hover:text-indigo-600 transition-colors p-0.5"
                      title="Visit personal website (sundaresh.blog)"
                    >
                      <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right: Consolidated Executive Suite, Workspace, Search & Progress */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                {/* Search Trigger */}
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200/90 border border-slate-200 text-slate-600 hover:text-slate-900 text-xs px-2.5 py-1.5 rounded-xl transition-all shadow-2xs shrink-0 cursor-pointer"
                  title="Search 57 frameworks (Cmd+K or /)"
                >
                  <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="hidden sm:inline text-xs font-medium">Search</span>
                  <kbd className="hidden sm:inline-flex text-3xs font-mono font-semibold bg-white border border-slate-300 text-slate-500 px-1 py-0.2 rounded">
                    ⌘K
                  </kbd>
                </button>

                {/* Consolidated Executive Studio Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setIsStudioMenuOpen(prev => !prev);
                      setIsMoreNavOpen(false);
                    }}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-2xs shrink-0 ${
                      isStudioMenuOpen
                        ? 'bg-indigo-900 text-white shadow-indigo-200'
                        : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200/80'
                    }`}
                    title="Executive Suite & Tools"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span className="font-semibold">Studio</span>
                    {deckSlideCount > 0 && (
                      <span className="text-3xs font-mono font-bold bg-indigo-700 text-white px-1.5 py-0.2 rounded-full">
                        {deckSlideCount}
                      </span>
                    )}
                    <ChevronDown className={`w-3 h-3 text-indigo-600 transition-transform ${isStudioMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isStudioMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-30"
                        onClick={() => setIsStudioMenuOpen(false)}
                      />
                      <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-40 animate-in fade-in zoom-in-95 duration-150">
                        <div className="px-3 py-1.5 border-b border-slate-100 text-2xs font-bold uppercase tracking-wider text-slate-400">
                          Executive Suite & Tools
                        </div>
                        <div className="py-1 space-y-0.5">
                          {/* Strategy Health Audit */}
                          <button
                            onClick={() => {
                              setIsAuditModalOpen(true);
                              setIsStudioMenuOpen(false);
                            }}
                            className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors text-left group cursor-pointer"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors">
                                <Activity className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-xs font-semibold text-slate-800">Strategy Health Audit</div>
                                <div className="text-2xs text-slate-500">10-point radar diagnosis</div>
                              </div>
                            </div>
                            <kbd className="text-3xs font-mono font-semibold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200">
                              A
                            </kbd>
                          </button>

                          {/* Board Deck Builder */}
                          <button
                            onClick={() => {
                              setDeckSlideCount(loadDeckSlides().length);
                              setIsDeckBuilderOpen(true);
                              setIsStudioMenuOpen(false);
                            }}
                            className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors text-left group cursor-pointer"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 group-hover:bg-indigo-100 transition-colors">
                                <Presentation className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-xs font-semibold text-slate-800">Board Deck Builder</div>
                                <div className="text-2xs text-slate-500">16:9 Widescreen slide deck</div>
                              </div>
                            </div>
                            <span className="text-3xs font-mono font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
                              {deckSlideCount} slides
                            </span>
                          </button>

                          {/* Dual Studio Workbench */}
                          <button
                            onClick={() => {
                              setIsWorkbenchOpen(true);
                              setIsStudioMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors text-left group cursor-pointer"
                          >
                            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 group-hover:bg-purple-100 transition-colors">
                              <SplitSquareVertical className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-slate-800">Dual Studio Workbench</div>
                              <div className="text-2xs text-slate-500">Side-by-side framework comparison</div>
                            </div>
                          </button>

                          {/* Crisis Wargames */}
                          <button
                            onClick={() => {
                              setIsChainRunnerOpen(true);
                              setIsStudioMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors text-left group cursor-pointer"
                          >
                            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors">
                              <Gamepad2 className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-slate-800">Crisis Wargames</div>
                              <div className="text-2xs text-slate-500">Strategic decision campaigns</div>
                            </div>
                          </button>

                          {/* Strategy Dossier */}
                          <button
                            onClick={() => {
                              setIsDossierModalOpen(true);
                              setIsStudioMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors text-left group cursor-pointer"
                          >
                            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 group-hover:bg-slate-200 transition-colors">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-slate-800">Executive Dossier</div>
                              <div className="text-2xs text-slate-500">Boardroom binder & PDF export</div>
                            </div>
                          </button>

                          {/* Milestone Badges */}
                          <button
                            onClick={() => {
                              setIsAchievementsOpen(true);
                              setIsStudioMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors text-left group cursor-pointer"
                          >
                            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 group-hover:bg-amber-100 transition-colors">
                              <Trophy className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-slate-800">Milestone Badges</div>
                              <div className="text-2xs text-slate-500">Credentials & achievements</div>
                            </div>
                          </button>

                          {/* Author Biography */}
                          <button
                            onClick={() => {
                              setActiveMainTab('author');
                              setIsStudioMenuOpen(false);
                            }}
                            className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors text-left group cursor-pointer"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 group-hover:bg-indigo-100 transition-colors">
                                <UserCheck className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-xs font-semibold text-slate-800">Author Biography</div>
                                <div className="text-2xs text-slate-500">Sundaresh Kamaraj profile & books</div>
                              </div>
                            </div>
                            <span className="text-3xs font-mono font-bold bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded border border-indigo-200">
                              Bio
                            </span>
                          </button>

                          {/* Framework Wizard */}
                          <button
                            onClick={() => {
                              setIsRecommenderOpen(true);
                              setIsStudioMenuOpen(false);
                            }}
                            className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors text-left group cursor-pointer"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                                <Sparkles className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-xs font-semibold text-slate-800">Framework Wizard</div>
                                <div className="text-2xs text-slate-500">3-step tool selector</div>
                              </div>
                            </div>
                            <kbd className="text-3xs font-mono font-semibold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200">
                              R
                            </kbd>
                          </button>

                          {/* Industry Scenario Presets */}
                          <button
                            onClick={() => {
                              setIsPresetsModalOpen(true);
                              setIsStudioMenuOpen(false);
                            }}
                            className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors text-left group cursor-pointer"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0 group-hover:bg-cyan-100 transition-colors">
                                <Briefcase className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-xs font-semibold text-slate-800">Industry Presets</div>
                                <div className="text-2xs text-slate-500">5 enterprise case studies</div>
                              </div>
                            </div>
                            <span className="text-3xs font-mono font-bold bg-cyan-100 text-cyan-800 px-1.5 py-0.5 rounded border border-cyan-200">
                              Cases
                            </span>
                          </button>

                          {/* Strategy Portfolio Vault (JSON) */}
                          <button
                            onClick={() => {
                              setIsVaultModalOpen(true);
                              setIsStudioMenuOpen(false);
                            }}
                            className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors text-left group cursor-pointer"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors">
                                <Database className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-xs font-semibold text-slate-800">Strategy Vault</div>
                                <div className="text-2xs text-slate-500">Backup / restore workspace JSON</div>
                              </div>
                            </div>
                            <span className="text-3xs font-mono font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-200">
                              JSON
                            </span>
                          </button>

                          {/* Keyboard Shortcuts */}
                          <button
                            onClick={() => {
                              setIsShortcutsOpen(true);
                              setIsStudioMenuOpen(false);
                            }}
                            className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors text-left group cursor-pointer"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center shrink-0 group-hover:bg-slate-100 transition-colors">
                                <Keyboard className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-xs font-semibold text-slate-800">Keyboard Shortcuts</div>
                                <div className="text-2xs text-slate-500">Quick hotkey cheatsheet</div>
                              </div>
                            </div>
                            <kbd className="text-3xs font-mono font-semibold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200">
                              ?
                            </kbd>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* My Workspace Drawer Trigger */}
                <button
                  onClick={() => setIsWorkspaceDrawerOpen(true)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-xl bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-900 border border-slate-200 hover:border-amber-300 transition-all cursor-pointer shadow-2xs shrink-0"
                  title="Open My Workspace Drawer (Hotkey: W)"
                >
                  <Bookmark className="w-3.5 h-3.5 text-amber-500 fill-amber-100 shrink-0" />
                  <span className="hidden sm:inline text-xs">Workspace</span>
                  <span className="text-3xs font-mono font-bold bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded-full">
                    {progress.savedWorkspace?.length || 0}
                  </span>
                </button>

                {/* User Progress Indicator */}
                <UserProgressIndicator
                  allTools={ALL_TOOLS}
                  currentToolId={selectedToolId}
                  onSelectTool={(toolId, view) => {
                    handleSelectTool(toolId);
                    setActiveMainTab(view);
                  }}
                  onOpenPerformance={() => setActiveMainTab('performance')}
                />

                {/* PWA Install Trigger */}
                <PWAInstallButton />

                {/* Responsive Mobile Menu Toggle */}
                <button
                  onClick={() => {
                    setIsMobileNavOpen(prev => !prev);
                    setIsStudioMenuOpen(false);
                    setIsMoreNavOpen(false);
                  }}
                  className="lg:hidden p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                  aria-label="Toggle navigation"
                >
                  {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2: Primary Navigation Tab Bar - Dedicated horizontal bar so menu never overflows table */}
        <div className="w-full bg-slate-50/95 border-t border-slate-100">
          <div className="w-full max-w-7xl 2xl:max-w-[1600px] mx-auto px-3 sm:px-4 lg:px-6">
            <div className="flex items-center justify-between gap-3 py-1.5 overflow-x-auto no-scrollbar scroll-smooth">
              <nav className="flex items-center gap-1 sm:gap-1.5 shrink-0 min-w-max">
                {/* 1. Home */}
                <button
                  onClick={() => setActiveMainTab('home')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                    activeMainTab === 'home'
                      ? 'bg-indigo-900 text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Home className={`w-3.5 h-3.5 ${activeMainTab === 'home' ? 'text-indigo-200' : 'text-slate-500'}`} />
                  <span>Home</span>
                </button>

                {/* 2. Simulators */}
                <button
                  onClick={() => setActiveMainTab('simulators')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                    activeMainTab === 'simulators'
                      ? 'bg-indigo-900 text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <PlayCircle className={`w-3.5 h-3.5 ${activeMainTab === 'simulators' ? 'text-emerald-300' : 'text-emerald-600'}`} />
                  <span>Simulators</span>
                  <span className={`text-3xs font-mono font-bold px-1.5 py-0.2 rounded-full ${
                    activeMainTab === 'simulators' ? 'bg-indigo-800 text-indigo-100' : 'bg-emerald-100/80 text-emerald-800 border border-emerald-200/60'
                  }`}>
                    57
                  </span>
                </button>

                {/* 3. Guides */}
                <button
                  onClick={() => setActiveMainTab('tools')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                    activeMainTab === 'tools'
                      ? 'bg-indigo-900 text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <BookOpen className={`w-3.5 h-3.5 ${activeMainTab === 'tools' ? 'text-blue-300' : 'text-blue-600'}`} />
                  <span>Guides</span>
                </button>

                {/* 4. Missions */}
                <button
                  onClick={() => setActiveMainTab('scenarios')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                    activeMainTab === 'scenarios'
                      ? 'bg-indigo-900 text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <ShieldAlert className={`w-3.5 h-3.5 ${activeMainTab === 'scenarios' ? 'text-amber-300' : 'text-amber-600'}`} />
                  <span>Missions</span>
                  <span className={`text-3xs font-mono font-bold px-1.5 py-0.2 rounded-full ${
                    activeMainTab === 'scenarios' ? 'bg-indigo-800 text-indigo-100' : 'bg-amber-100/80 text-amber-800 border border-amber-200/60'
                  }`}>
                    44
                  </span>
                </button>

                {/* 5. Quizzes */}
                <button
                  onClick={() => setActiveMainTab('quizzes')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                    activeMainTab === 'quizzes'
                      ? 'bg-indigo-900 text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <CheckCircle2 className={`w-3.5 h-3.5 ${activeMainTab === 'quizzes' ? 'text-indigo-200' : 'text-indigo-600'}`} />
                  <span>Quizzes</span>
                  <span className={`text-3xs font-mono font-bold px-1.5 py-0.2 rounded-full ${
                    activeMainTab === 'quizzes' ? 'bg-indigo-800 text-indigo-100' : 'bg-indigo-100/80 text-indigo-800 border border-indigo-200/60'
                  }`}>
                    285
                  </span>
                </button>

                {/* 6. Matrix Comparison */}
                <button
                  onClick={() => setActiveMainTab('stacks')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                    activeMainTab === 'stacks'
                      ? 'bg-indigo-900 text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <GitCompare className={`w-3.5 h-3.5 ${activeMainTab === 'stacks' ? 'text-purple-300' : 'text-purple-600'}`} />
                  <span>Matrix</span>
                  <span className={`text-3xs font-mono font-bold px-1.5 py-0.2 rounded-full ${
                    activeMainTab === 'stacks' ? 'bg-indigo-800 text-indigo-100' : 'bg-purple-100/80 text-purple-800 border border-purple-200/60'
                  }`}>
                    57
                  </span>
                </button>

                {/* 7. MBA Glossary */}
                <button
                  onClick={() => setActiveMainTab('glossary')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                    activeMainTab === 'glossary'
                      ? 'bg-indigo-900 text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <FileText className={`w-3.5 h-3.5 ${activeMainTab === 'glossary' ? 'text-sky-300' : 'text-sky-600'}`} />
                  <span>Glossary</span>
                  <span className={`text-3xs font-mono font-bold px-1.5 py-0.2 rounded-full ${
                    activeMainTab === 'glossary' ? 'bg-indigo-800 text-indigo-100' : 'bg-sky-100/80 text-sky-800 border border-sky-200/60'
                  }`}>
                    350+
                  </span>
                </button>

                {/* 8. Performance Analytics */}
                <button
                  onClick={() => setActiveMainTab('performance')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                    activeMainTab === 'performance'
                      ? 'bg-indigo-900 text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <BrainCircuit className={`w-3.5 h-3.5 ${activeMainTab === 'performance' ? 'text-indigo-200' : 'text-indigo-600'}`} />
                  <span>Performance</span>
                </button>

                {/* 9. Author Biography */}
                <button
                  onClick={() => setActiveMainTab('author')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                    activeMainTab === 'author'
                      ? 'bg-indigo-900 text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                  title="Author Biography & Credential Dossier"
                >
                  <UserCheck className={`w-3.5 h-3.5 ${activeMainTab === 'author' ? 'text-indigo-200' : 'text-indigo-600'}`} />
                  <span>Author Bio</span>
                </button>
              </nav>

              {/* Right side helper info in Row 2 */}
              <div className="hidden lg:flex items-center gap-3 shrink-0 text-2xs text-slate-500 font-medium pl-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  57 C-Suite Frameworks Ready
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Menu (Strict single-row header, overlay only when opened) */}
        {isMobileNavOpen && (
          <>
            <div
              className="fixed inset-0 z-30 bg-slate-900/30 backdrop-blur-xs lg:hidden"
              onClick={() => setIsMobileNavOpen(false)}
            />
            <div className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl z-40 p-4 lg:hidden animate-in fade-in slide-in-from-top-2 duration-150 max-h-[85vh] overflow-y-auto">
              <div className="text-2xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Navigation
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button
                  onClick={() => {
                    setActiveMainTab('home');
                    setIsMobileNavOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold cursor-pointer ${
                    activeMainTab === 'home' ? 'bg-indigo-900 text-white' : 'bg-slate-50 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </button>
                <button
                  onClick={() => {
                    setActiveMainTab('simulators');
                    setIsMobileNavOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold cursor-pointer ${
                    activeMainTab === 'simulators' ? 'bg-indigo-900 text-white' : 'bg-slate-50 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <PlayCircle className="w-4 h-4 text-emerald-500" />
                  <span>Simulators</span>
                </button>
                <button
                  onClick={() => {
                    setActiveMainTab('tools');
                    setIsMobileNavOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold cursor-pointer ${
                    activeMainTab === 'tools' ? 'bg-indigo-900 text-white' : 'bg-slate-50 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  <span>Guides</span>
                </button>
                <button
                  onClick={() => {
                    setActiveMainTab('scenarios');
                    setIsMobileNavOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold cursor-pointer ${
                    activeMainTab === 'scenarios' ? 'bg-indigo-900 text-white' : 'bg-slate-50 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <ShieldAlert className="w-4 h-4 text-amber-500" />
                  <span>Missions (44)</span>
                </button>
                <button
                  onClick={() => {
                    setActiveMainTab('quizzes');
                    setIsMobileNavOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold cursor-pointer ${
                    activeMainTab === 'quizzes' ? 'bg-indigo-900 text-white' : 'bg-slate-50 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                  <span>Quizzes (285)</span>
                </button>
                <button
                  onClick={() => {
                    setActiveMainTab('stacks');
                    setIsMobileNavOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold cursor-pointer ${
                    activeMainTab === 'stacks' ? 'bg-indigo-900 text-white' : 'bg-slate-50 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <GitCompare className="w-4 h-4 text-purple-500" />
                  <span>Matrix</span>
                </button>
                <button
                  onClick={() => {
                    setActiveMainTab('glossary');
                    setIsMobileNavOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold cursor-pointer ${
                    activeMainTab === 'glossary' ? 'bg-indigo-900 text-white' : 'bg-slate-50 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <FileText className="w-4 h-4 text-slate-500" />
                  <span>Glossary (350+)</span>
                </button>
                <button
                  onClick={() => {
                    setActiveMainTab('performance');
                    setIsMobileNavOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold cursor-pointer ${
                    activeMainTab === 'performance' ? 'bg-indigo-900 text-white' : 'bg-slate-50 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <BrainCircuit className="w-4 h-4 text-indigo-400" />
                  <span>Performance</span>
                </button>
                <button
                  onClick={() => {
                    setActiveMainTab('author');
                    setIsMobileNavOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold cursor-pointer col-span-2 ${
                    activeMainTab === 'author' ? 'bg-indigo-900 text-white' : 'bg-indigo-50/70 hover:bg-indigo-100 text-indigo-900 border border-indigo-200/60'
                  }`}
                >
                  <UserCheck className="w-4 h-4 text-indigo-600" />
                  <span>Author Biography · Sundaresh Kamaraj</span>
                </button>
              </div>

              <div className="text-2xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Executive Studio Tools
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setDeckSlideCount(loadDeckSlides().length);
                    setIsDeckBuilderOpen(true);
                    setIsMobileNavOpen(false);
                  }}
                  className="flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium bg-slate-50 hover:bg-slate-100 text-slate-800 text-left cursor-pointer"
                >
                  <Presentation className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Board Deck ({deckSlideCount})</span>
                </button>
                <button
                  onClick={() => {
                    setIsWorkbenchOpen(true);
                    setIsMobileNavOpen(false);
                  }}
                  className="flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium bg-slate-50 hover:bg-slate-100 text-slate-800 text-left cursor-pointer"
                >
                  <SplitSquareVertical className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Dual Studio</span>
                </button>
                <button
                  onClick={() => {
                    setIsChainRunnerOpen(true);
                    setIsMobileNavOpen(false);
                  }}
                  className="flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium bg-slate-50 hover:bg-slate-100 text-slate-800 text-left cursor-pointer"
                >
                  <Gamepad2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Wargames</span>
                </button>
                <button
                  onClick={() => {
                    setIsDossierModalOpen(true);
                    setIsMobileNavOpen(false);
                  }}
                  className="flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium bg-slate-50 hover:bg-slate-100 text-slate-800 text-left cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-slate-600 shrink-0" />
                  <span>Dossier PDF</span>
                </button>
                <button
                  onClick={() => {
                    setIsAchievementsOpen(true);
                    setIsMobileNavOpen(false);
                  }}
                  className="flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium bg-slate-50 hover:bg-slate-100 text-slate-800 text-left cursor-pointer"
                >
                  <Trophy className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Badges</span>
                </button>
                <button
                  onClick={() => {
                    setIsRecommenderOpen(true);
                    setIsMobileNavOpen(false);
                  }}
                  className="flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium bg-slate-50 hover:bg-slate-100 text-slate-800 text-left cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Wizard (R)</span>
                </button>
              </div>
            </div>
          </>
        )}
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

                {/* Quick Jump Dropdown with Framework Lucide Icons */}
                <QuickJumpDropdown
                  tools={ALL_TOOLS}
                  selectedToolId={selectedToolId}
                  onSelectTool={handleSelectTool}
                  isSimulatorDone={isSimulatorDone}
                  isQuizDone={isQuizDone}
                />
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
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const originX = (rect.left + rect.width / 2) / window.innerWidth;
                    const originY = (rect.top + rect.height / 2) / window.innerHeight;
                    const wasDone = isSimulatorDone(selectedToolId);
                    toggleSimulator(selectedToolId);
                    if (!wasDone) {
                      triggerCompletionConfetti({ x: originX, y: originY });
                      setAppliedTemplateToast(`🎉 ${currentTool.name} marked completed!`);
                      setTimeout(() => setAppliedTemplateToast(null), 3000);
                    }
                  }}
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
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:border-indigo-400 hover:text-indigo-900 shadow-2xs hover:animate-subtle-pulse group"
                  title="Export completed simulator session data as a printable PDF report"
                >
                  <Printer className="w-3.5 h-3.5 text-indigo-600 shrink-0 group-hover:scale-110 transition-transform duration-200" />
                  <span className="hidden sm:inline">Export PDF</span>
                </button>

                {/* Add to Board Deck Button */}
                <button
                  onClick={handleAddCurrentToDeck}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer bg-white text-slate-700 border border-slate-300 hover:bg-indigo-50 hover:border-indigo-400 hover:text-indigo-900 shadow-2xs"
                  title="Capture this framework snapshot into Board Deck Builder"
                >
                  <Presentation className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span className="hidden sm:inline">Add to Deck</span>
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
                className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 sm:gap-2 shrink-0 cursor-pointer ${
                  categoryFilter === 'All'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title={`All Tools (${pillarStats.All.completed}/${pillarStats.All.total} completed - ${pillarStats.All.percentage}%)`}
              >
                <ProgressRing
                  percentage={pillarStats.All.percentage}
                  size={18}
                  strokeWidth={2.4}
                  isActive={categoryFilter === 'All'}
                  progressColor={
                    pillarStats.All.percentage === 100
                      ? (categoryFilter === 'All' ? '#34d399' : '#10b981')
                      : (categoryFilter === 'All' ? '#ffffff' : '#0f172a')
                  }
                />
                <span>All 57</span>
                <span
                  className={`text-3xs font-mono font-bold px-1.5 py-0.5 rounded transition-colors ${
                    pillarStats.All.percentage === 100
                      ? (categoryFilter === 'All' ? 'bg-emerald-500 text-white font-black shadow-2xs' : 'bg-emerald-100 text-emerald-800 font-extrabold border border-emerald-300')
                      : (categoryFilter === 'All' ? 'bg-slate-800 text-slate-200' : 'bg-slate-200/80 text-slate-700')
                  }`}
                >
                  {pillarStats.All.percentage}%
                  <span className="opacity-75 font-normal ml-0.5 hidden xl:inline">
                    ({pillarStats.All.completed}/{pillarStats.All.total})
                  </span>
                </span>
              </button>

              {/* 1. Strategy */}
              <button
                onClick={() => handleSetCategory('Strategy')}
                className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 sm:gap-2 shrink-0 cursor-pointer ${
                  categoryFilter === 'Strategy'
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-blue-900 hover:bg-blue-50'
                }`}
                title={`Strategy (${pillarStats.Strategy.completed}/${pillarStats.Strategy.total} completed - ${pillarStats.Strategy.percentage}%)`}
              >
                <ProgressRing
                  percentage={pillarStats.Strategy.percentage}
                  size={18}
                  strokeWidth={2.4}
                  isActive={categoryFilter === 'Strategy'}
                  progressColor={
                    pillarStats.Strategy.percentage === 100
                      ? (categoryFilter === 'Strategy' ? '#34d399' : '#10b981')
                      : (categoryFilter === 'Strategy' ? '#ffffff' : '#2563eb')
                  }
                />
                <span>1. Strategy</span>
                <span
                  className={`text-3xs font-mono font-bold px-1.5 py-0.5 rounded transition-colors ${
                    pillarStats.Strategy.percentage === 100
                      ? (categoryFilter === 'Strategy' ? 'bg-emerald-500 text-white font-black shadow-2xs' : 'bg-emerald-100 text-emerald-800 font-extrabold border border-emerald-300')
                      : (categoryFilter === 'Strategy' ? 'bg-blue-950 text-blue-200' : 'bg-blue-100/80 text-blue-800')
                  }`}
                >
                  {pillarStats.Strategy.percentage}%
                  <span className="opacity-75 font-normal ml-0.5 hidden xl:inline">
                    ({pillarStats.Strategy.completed}/{pillarStats.Strategy.total})
                  </span>
                </span>
              </button>

              {/* 2. Innovation */}
              <button
                onClick={() => handleSetCategory('Innovation')}
                className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 sm:gap-2 shrink-0 cursor-pointer ${
                  categoryFilter === 'Innovation'
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-emerald-900 hover:bg-emerald-50'
                }`}
                title={`Innovation (${pillarStats.Innovation.completed}/${pillarStats.Innovation.total} completed - ${pillarStats.Innovation.percentage}%)`}
              >
                <ProgressRing
                  percentage={pillarStats.Innovation.percentage}
                  size={18}
                  strokeWidth={2.4}
                  isActive={categoryFilter === 'Innovation'}
                  progressColor={
                    pillarStats.Innovation.percentage === 100
                      ? (categoryFilter === 'Innovation' ? '#34d399' : '#10b981')
                      : (categoryFilter === 'Innovation' ? '#ffffff' : '#059669')
                  }
                />
                <span>2. Innovation</span>
                <span
                  className={`text-3xs font-mono font-bold px-1.5 py-0.5 rounded transition-colors ${
                    pillarStats.Innovation.percentage === 100
                      ? (categoryFilter === 'Innovation' ? 'bg-emerald-500 text-white font-black shadow-2xs' : 'bg-emerald-100 text-emerald-800 font-extrabold border border-emerald-300')
                      : (categoryFilter === 'Innovation' ? 'bg-emerald-950 text-emerald-200' : 'bg-emerald-100/80 text-emerald-800')
                  }`}
                >
                  {pillarStats.Innovation.percentage}%
                  <span className="opacity-75 font-normal ml-0.5 hidden xl:inline">
                    ({pillarStats.Innovation.completed}/{pillarStats.Innovation.total})
                  </span>
                </span>
              </button>

              {/* 3. Marketing */}
              <button
                onClick={() => handleSetCategory('Marketing')}
                className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 sm:gap-2 shrink-0 cursor-pointer ${
                  categoryFilter === 'Marketing'
                    ? 'bg-amber-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-amber-900 hover:bg-amber-50'
                }`}
                title={`Marketing (${pillarStats.Marketing.completed}/${pillarStats.Marketing.total} completed - ${pillarStats.Marketing.percentage}%)`}
              >
                <ProgressRing
                  percentage={pillarStats.Marketing.percentage}
                  size={18}
                  strokeWidth={2.4}
                  isActive={categoryFilter === 'Marketing'}
                  progressColor={
                    pillarStats.Marketing.percentage === 100
                      ? (categoryFilter === 'Marketing' ? '#34d399' : '#10b981')
                      : (categoryFilter === 'Marketing' ? '#ffffff' : '#d97706')
                  }
                />
                <span>3. Marketing</span>
                <span
                  className={`text-3xs font-mono font-bold px-1.5 py-0.5 rounded transition-colors ${
                    pillarStats.Marketing.percentage === 100
                      ? (categoryFilter === 'Marketing' ? 'bg-emerald-500 text-white font-black shadow-2xs' : 'bg-emerald-100 text-emerald-800 font-extrabold border border-emerald-300')
                      : (categoryFilter === 'Marketing' ? 'bg-amber-950 text-amber-200' : 'bg-amber-100/80 text-amber-800')
                  }`}
                >
                  {pillarStats.Marketing.percentage}%
                  <span className="opacity-75 font-normal ml-0.5 hidden xl:inline">
                    ({pillarStats.Marketing.completed}/{pillarStats.Marketing.total})
                  </span>
                </span>
              </button>

              {/* 4. Operations */}
              <button
                onClick={() => handleSetCategory('Operations')}
                className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 sm:gap-2 shrink-0 cursor-pointer ${
                  categoryFilter === 'Operations'
                    ? 'bg-teal-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-teal-900 hover:bg-teal-50'
                }`}
                title={`Operations (${pillarStats.Operations.completed}/${pillarStats.Operations.total} completed - ${pillarStats.Operations.percentage}%)`}
              >
                <ProgressRing
                  percentage={pillarStats.Operations.percentage}
                  size={18}
                  strokeWidth={2.4}
                  isActive={categoryFilter === 'Operations'}
                  progressColor={
                    pillarStats.Operations.percentage === 100
                      ? (categoryFilter === 'Operations' ? '#34d399' : '#10b981')
                      : (categoryFilter === 'Operations' ? '#ffffff' : '#0d9488')
                  }
                />
                <span>4. Operations</span>
                <span
                  className={`text-3xs font-mono font-bold px-1.5 py-0.5 rounded transition-colors ${
                    pillarStats.Operations.percentage === 100
                      ? (categoryFilter === 'Operations' ? 'bg-emerald-500 text-white font-black shadow-2xs' : 'bg-emerald-100 text-emerald-800 font-extrabold border border-emerald-300')
                      : (categoryFilter === 'Operations' ? 'bg-teal-950 text-teal-200' : 'bg-teal-100/80 text-teal-800')
                  }`}
                >
                  {pillarStats.Operations.percentage}%
                  <span className="opacity-75 font-normal ml-0.5 hidden xl:inline">
                    ({pillarStats.Operations.completed}/{pillarStats.Operations.total})
                  </span>
                </span>
              </button>

              {/* 5. Financial */}
              <button
                onClick={() => handleSetCategory('Financial')}
                className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 sm:gap-2 shrink-0 cursor-pointer ${
                  categoryFilter === 'Financial'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-emerald-900 hover:bg-emerald-50'
                }`}
                title={`Financial (${pillarStats.Financial.completed}/${pillarStats.Financial.total} completed - ${pillarStats.Financial.percentage}%)`}
              >
                <ProgressRing
                  percentage={pillarStats.Financial.percentage}
                  size={18}
                  strokeWidth={2.4}
                  isActive={categoryFilter === 'Financial'}
                  progressColor={
                    pillarStats.Financial.percentage === 100
                      ? (categoryFilter === 'Financial' ? '#34d399' : '#10b981')
                      : (categoryFilter === 'Financial' ? '#ffffff' : '#10b981')
                  }
                />
                <span>5. Financial</span>
                <span
                  className={`text-3xs font-mono font-bold px-1.5 py-0.5 rounded transition-colors ${
                    pillarStats.Financial.percentage === 100
                      ? (categoryFilter === 'Financial' ? 'bg-emerald-500 text-white font-black shadow-2xs' : 'bg-emerald-100 text-emerald-800 font-extrabold border border-emerald-300')
                      : (categoryFilter === 'Financial' ? 'bg-emerald-950 text-emerald-200' : 'bg-emerald-100/80 text-emerald-800')
                  }`}
                >
                  {pillarStats.Financial.percentage}%
                  <span className="opacity-75 font-normal ml-0.5 hidden xl:inline">
                    ({pillarStats.Financial.completed}/{pillarStats.Financial.total})
                  </span>
                </span>
              </button>

              {/* 6. Project */}
              <button
                onClick={() => handleSetCategory('Project')}
                className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 sm:gap-2 shrink-0 cursor-pointer ${
                  categoryFilter === 'Project'
                    ? 'bg-indigo-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-indigo-900 hover:bg-indigo-50'
                }`}
                title={`Project (${pillarStats.Project.completed}/${pillarStats.Project.total} completed - ${pillarStats.Project.percentage}%)`}
              >
                <ProgressRing
                  percentage={pillarStats.Project.percentage}
                  size={18}
                  strokeWidth={2.4}
                  isActive={categoryFilter === 'Project'}
                  progressColor={
                    pillarStats.Project.percentage === 100
                      ? (categoryFilter === 'Project' ? '#34d399' : '#10b981')
                      : (categoryFilter === 'Project' ? '#ffffff' : '#6366f1')
                  }
                />
                <span>6. Project</span>
                <span
                  className={`text-3xs font-mono font-bold px-1.5 py-0.5 rounded transition-colors ${
                    pillarStats.Project.percentage === 100
                      ? (categoryFilter === 'Project' ? 'bg-emerald-500 text-white font-black shadow-2xs' : 'bg-emerald-100 text-emerald-800 font-extrabold border border-emerald-300')
                      : (categoryFilter === 'Project' ? 'bg-indigo-950 text-indigo-200' : 'bg-indigo-100/80 text-indigo-800')
                  }`}
                >
                  {pillarStats.Project.percentage}%
                  <span className="opacity-75 font-normal ml-0.5 hidden xl:inline">
                    ({pillarStats.Project.completed}/{pillarStats.Project.total})
                  </span>
                </span>
              </button>

              {/* 7. HR */}
              <button
                onClick={() => handleSetCategory('HR')}
                className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 sm:gap-2 shrink-0 cursor-pointer ${
                  categoryFilter === 'HR'
                    ? 'bg-purple-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-purple-900 hover:bg-purple-50'
                }`}
                title={`HR & Org (${pillarStats.HR.completed}/${pillarStats.HR.total} completed - ${pillarStats.HR.percentage}%)`}
              >
                <ProgressRing
                  percentage={pillarStats.HR.percentage}
                  size={18}
                  strokeWidth={2.4}
                  isActive={categoryFilter === 'HR'}
                  progressColor={
                    pillarStats.HR.percentage === 100
                      ? (categoryFilter === 'HR' ? '#34d399' : '#10b981')
                      : (categoryFilter === 'HR' ? '#ffffff' : '#9333ea')
                  }
                />
                <span>7. HR & Org</span>
                <span
                  className={`text-3xs font-mono font-bold px-1.5 py-0.5 rounded transition-colors ${
                    pillarStats.HR.percentage === 100
                      ? (categoryFilter === 'HR' ? 'bg-emerald-500 text-white font-black shadow-2xs' : 'bg-emerald-100 text-emerald-800 font-extrabold border border-emerald-300')
                      : (categoryFilter === 'HR' ? 'bg-purple-950 text-purple-200' : 'bg-purple-100/80 text-purple-800')
                  }`}
                >
                  {pillarStats.HR.percentage}%
                  <span className="opacity-75 font-normal ml-0.5 hidden xl:inline">
                    ({pillarStats.HR.completed}/{pillarStats.HR.total})
                  </span>
                </span>
              </button>

              {/* 8. Risk */}
              <button
                onClick={() => handleSetCategory('Risk')}
                className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 sm:gap-2 shrink-0 cursor-pointer ${
                  categoryFilter === 'Risk'
                    ? 'bg-rose-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-rose-900 hover:bg-rose-50'
                }`}
                title={`Risk & Decision (${pillarStats.Risk.completed}/${pillarStats.Risk.total} completed - ${pillarStats.Risk.percentage}%)`}
              >
                <ProgressRing
                  percentage={pillarStats.Risk.percentage}
                  size={18}
                  strokeWidth={2.4}
                  isActive={categoryFilter === 'Risk'}
                  progressColor={
                    pillarStats.Risk.percentage === 100
                      ? (categoryFilter === 'Risk' ? '#34d399' : '#10b981')
                      : (categoryFilter === 'Risk' ? '#ffffff' : '#e11d48')
                  }
                />
                <span>8. Risk & Decision</span>
                <span
                  className={`text-3xs font-mono font-bold px-1.5 py-0.5 rounded transition-colors ${
                    pillarStats.Risk.percentage === 100
                      ? (categoryFilter === 'Risk' ? 'bg-emerald-500 text-white font-black shadow-2xs' : 'bg-emerald-100 text-emerald-800 font-extrabold border border-emerald-300')
                      : (categoryFilter === 'Risk' ? 'bg-rose-950 text-rose-200' : 'bg-rose-100/80 text-rose-800')
                  }`}
                >
                  {pillarStats.Risk.percentage}%
                  <span className="opacity-75 font-normal ml-0.5 hidden xl:inline">
                    ({pillarStats.Risk.completed}/{pillarStats.Risk.total})
                  </span>
                </span>
              </button>

              {/* 9. Product */}
              <button
                onClick={() => handleSetCategory('Product')}
                className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 sm:gap-2 shrink-0 cursor-pointer ${
                  categoryFilter === 'Product'
                    ? 'bg-cyan-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-cyan-900 hover:bg-cyan-50'
                }`}
                title={`Product & Startup (${pillarStats.Product.completed}/${pillarStats.Product.total} completed - ${pillarStats.Product.percentage}%)`}
              >
                <ProgressRing
                  percentage={pillarStats.Product.percentage}
                  size={18}
                  strokeWidth={2.4}
                  isActive={categoryFilter === 'Product'}
                  progressColor={
                    pillarStats.Product.percentage === 100
                      ? (categoryFilter === 'Product' ? '#34d399' : '#10b981')
                      : (categoryFilter === 'Product' ? '#ffffff' : '#0891b2')
                  }
                />
                <span>9. Product & Startup</span>
                <span
                  className={`text-3xs font-mono font-bold px-1.5 py-0.5 rounded transition-colors ${
                    pillarStats.Product.percentage === 100
                      ? (categoryFilter === 'Product' ? 'bg-emerald-500 text-white font-black shadow-2xs' : 'bg-emerald-100 text-emerald-800 font-extrabold border border-emerald-300')
                      : (categoryFilter === 'Product' ? 'bg-cyan-950 text-cyan-200' : 'bg-cyan-100/80 text-cyan-800')
                  }`}
                >
                  {pillarStats.Product.percentage}%
                  <span className="opacity-75 font-normal ml-0.5 hidden xl:inline">
                    ({pillarStats.Product.completed}/{pillarStats.Product.total})
                  </span>
                </span>
              </button>

              {/* 10. Analytics */}
              <button
                onClick={() => handleSetCategory('Analytics')}
                className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 sm:gap-2 shrink-0 cursor-pointer ${
                  categoryFilter === 'Analytics'
                    ? 'bg-violet-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-violet-900 hover:bg-violet-50'
                }`}
                title={`Data & Analytics (${pillarStats.Analytics.completed}/${pillarStats.Analytics.total} completed - ${pillarStats.Analytics.percentage}%)`}
              >
                <ProgressRing
                  percentage={pillarStats.Analytics.percentage}
                  size={18}
                  strokeWidth={2.4}
                  isActive={categoryFilter === 'Analytics'}
                  progressColor={
                    pillarStats.Analytics.percentage === 100
                      ? (categoryFilter === 'Analytics' ? '#34d399' : '#10b981')
                      : (categoryFilter === 'Analytics' ? '#ffffff' : '#7c3aed')
                  }
                />
                <span>10. Data & Analytics</span>
                <span
                  className={`text-3xs font-mono font-bold px-1.5 py-0.5 rounded transition-colors ${
                    pillarStats.Analytics.percentage === 100
                      ? (categoryFilter === 'Analytics' ? 'bg-emerald-500 text-white font-black shadow-2xs' : 'bg-emerald-100 text-emerald-800 font-extrabold border border-emerald-300')
                      : (categoryFilter === 'Analytics' ? 'bg-violet-950 text-violet-200' : 'bg-violet-100/80 text-violet-800')
                  }`}
                >
                  {pillarStats.Analytics.percentage}%
                  <span className="opacity-75 font-normal ml-0.5 hidden xl:inline">
                    ({pillarStats.Analytics.completed}/{pillarStats.Analytics.total})
                  </span>
                </span>
              </button>
            </div>

            {/* Situational Filter Rail (Curated Context Tags) */}
            <div className="py-1.5 flex items-center gap-1.5 overflow-x-auto min-w-0 w-full border-b border-slate-100 text-xs">
              <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0 flex items-center gap-1">
                <Tag className="w-3 h-3 text-indigo-500" />
                Situation:
              </span>
              <button
                onClick={() => setSituationalFilter(null)}
                className={`px-2.5 py-1 rounded-lg text-2xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  situationalFilter === null
                    ? 'bg-slate-900 text-white font-bold shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                All Situations
              </button>
              {SITUATIONAL_TAGS.map(tag => {
                const isActive = situationalFilter === tag.id;
                return (
                  <button
                    key={tag.id}
                    onClick={() => {
                      const next = isActive ? null : tag.id;
                      setSituationalFilter(next);
                      if (next && !tag.toolIds.includes(selectedToolId)) {
                        handleSelectTool(tag.toolIds[0]);
                      }
                    }}
                    className={`px-2.5 py-1 rounded-lg text-2xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-indigo-900 text-white border-indigo-900 font-bold shadow-2xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40'
                    }`}
                    title={`${tag.label}: ${tag.description}`}
                  >
                    <span>#{tag.shortLabel}</span>
                    <span className="text-3xs font-mono opacity-80 ml-1">({tag.toolIds.length})</span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Row: Focused Tool Chips for the Active Pillar (Clean, not noisy) */}
            <div className="py-2 flex items-center gap-1.5 overflow-x-auto pb-2">
              {filteredTools.map((tool) => {
                const isSelected = tool.id === selectedToolId;
                const globalIdx = ALL_TOOLS.findIndex(t => t.id === tool.id) + 1;
                const isSimDone = isSimulatorDone(tool.id);
                const isQzDone = isQuizDone(tool.id);
                const ToolIcon = tool.icon || getToolIcon(tool.id);

                return (
                  <button
                    key={tool.id}
                    onClick={() => handleSelectTool(tool.id)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow-xs font-bold ring-1 ring-slate-900'
                        : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200 shadow-2xs'
                    }`}
                    title={`${tool.shortName} — ${tool.name} (${tool.category})`}
                  >
                    <span className={`text-3xs font-mono px-1.5 py-0.2 rounded ${
                      isSelected ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-500'
                    }`}>
                      #{globalIdx}
                    </span>
                    <ToolIcon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-indigo-300' : 'text-slate-500'}`} />
                    <span>{tool.shortName}</span>
                    {isSimDone && (
                      <span title="Simulator completed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      </span>
                    )}
                    {isQzDone && (
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" title="Quiz passed" />
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
            {/* Active Framework Context Header */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Left: Framework Identity & Context (Never squished) */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className={`text-2xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border whitespace-nowrap shrink-0 ${pillarMeta.badgeClass}`}>
                      {pillarMeta.pillarNumber}: {pillarMeta.pillarName}
                    </span>
                    <span className="text-2xs font-mono font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded whitespace-nowrap shrink-0">
                      Tool #{currentIndex + 1} of {ALL_TOOLS.length}
                    </span>
                    <span className="text-2xs text-slate-500 font-medium whitespace-nowrap">
                      Case: <span className="text-slate-800 font-semibold">{currentTool.caseStudy.company}</span>
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
                    {(() => {
                      const ActiveToolIcon = currentTool.icon || getToolIcon(currentTool.id);
                      return (
                        <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-200/60 flex items-center justify-center shrink-0">
                          <ActiveToolIcon className="w-4 h-4 text-indigo-600 shrink-0" />
                        </div>
                      );
                    })()}
                    <span className="truncate">{currentTool.name}</span>
                  </h2>
                  <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">
                    {currentTool.tagline} · <span className="text-slate-500">{currentTool.corePurpose}</span>
                  </p>
                </div>

                {/* Right: Actions in Two Neat, Organized Rows */}
                <div className="flex flex-col gap-2 shrink-0 self-start lg:self-end">
                  {/* Button Row 1: Execution, Workspace & Utilities */}
                  <div className="flex items-center gap-1.5 flex-wrap sm:flex-nowrap">
                    {/* Interactive Simulator Completion Toggle */}
                    <button
                      onClick={() => toggleSimulator(currentTool.id)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                        isSimulatorDone(currentTool.id)
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 hover:bg-emerald-200 shadow-2xs font-bold'
                          : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-2xs'
                      }`}
                      title={isSimulatorDone(currentTool.id) ? 'Simulator completed in localStorage (click to toggle)' : 'Mark this simulator as completed'}
                    >
                      <CheckCircle2 className={`w-3.5 h-3.5 ${isSimulatorDone(currentTool.id) ? 'text-emerald-600' : 'text-slate-400'}`} />
                      <span>{isSimulatorDone(currentTool.id) ? 'Completed' : 'Mark Done'}</span>
                    </button>

                    {/* Quick Action: Save to Workspace (localStorage) */}
                    <button
                      onClick={handleToggleWorkspace}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 shadow-2xs ${
                        isSavedInWorkspace(currentTool.id)
                          ? 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200 font-bold shadow-xs'
                          : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                      title={isSavedInWorkspace(currentTool.id) ? 'Saved in personal workspace (click to remove)' : 'Save this framework to your personal workspace (stored locally)'}
                    >
                      {isSavedInWorkspace(currentTool.id) ? (
                        <>
                          <BookmarkCheck className="w-3.5 h-3.5 text-amber-600" />
                          <span>In Workspace</span>
                        </>
                      ) : (
                        <>
                          <Bookmark className="w-3.5 h-3.5 text-slate-400" />
                          <span>Save to Workspace</span>
                        </>
                      )}
                    </button>

                    {/* Quick Action: View Examples (Pop-up Modal with Mock Data) */}
                    <button
                      onClick={() => setIsExamplesModalOpen(true)}
                      className="px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs whitespace-nowrap shrink-0"
                      title="View realistic mock data examples, industry templates, and deep case studies"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      <span>View Examples</span>
                    </button>

                    {/* Scenario Snapshot Vault Trigger */}
                    <button
                      onClick={() => setIsSnapshotModalOpen(true)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs whitespace-nowrap shrink-0"
                      title="Manage, compare, and restore saved scenario snapshots for this framework"
                    >
                      <Camera className="w-3.5 h-3.5 text-slate-600" />
                      <span>Snapshots</span>
                      <span className="text-3xs font-mono font-bold px-1.5 py-0.2 rounded bg-slate-200 text-slate-800">
                        {snapshotCount}
                      </span>
                    </button>

                    {/* Export PDF Report Button */}
                    <button
                      onClick={() => setIsExportReportOpen(true)}
                      className="px-3 py-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs whitespace-nowrap shrink-0"
                      title="Export completed simulator session data as a printable PDF report"
                    >
                      <Download className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Export PDF</span>
                    </button>

                    {/* Share Deep-Link Button */}
                    <button
                      onClick={handleShareCurrentSimulator}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs whitespace-nowrap shrink-0 ${
                        copiedShareLink
                          ? 'bg-emerald-600 text-white font-bold ring-2 ring-emerald-400/40 shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                      title="Copy shareable deep-link URL for this simulator and active configuration"
                      aria-label="Share simulator deep-link"
                    >
                      {copiedShareLink ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-200" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3.5 h-3.5 text-slate-500" />
                          <span>Share</span>
                        </>
                      )}
                    </button>

                    {/* Pillar Mastery Certificate (Earned when pillar reaches 100%) */}
                    {(categoryFilter === 'All' ? pillarStats.All.percentage === 100 : (pillarStats[categoryFilter]?.percentage === 100)) && (
                      <button
                        onClick={() => setIsCertificateModalOpen(true)}
                        className="px-3 py-1.5 text-xs font-bold text-amber-950 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 hover:from-amber-400 hover:to-yellow-500 border border-amber-500 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap shrink-0 animate-pulse"
                        title="View, personalize, and export your official executive Pillar Mastery Certificate"
                      >
                        <Award className="w-3.5 h-3.5 text-amber-900" />
                        <span>Mastery Certificate</span>
                      </button>
                    )}
                  </div>

                  {/* Button Row 2: Learning & Navigation Guides */}
                  <div className="flex items-center gap-1.5 flex-wrap sm:flex-nowrap justify-start lg:justify-end">
                    {/* Compare within Pillar Button */}
                    <button
                      onClick={() => setIsCompareOpen(!isCompareOpen)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                        isCompareOpen
                          ? 'bg-indigo-600 text-white shadow-xs font-bold'
                          : 'bg-indigo-50 text-indigo-800 border border-indigo-200 hover:bg-indigo-100 shadow-2xs'
                      }`}
                      title={`Compare methodology differences side-by-side with ${currentSiblingTools.length} peer tools in ${pillarMeta.pillarName}`}
                    >
                      <GitCompare className="w-3.5 h-3.5" />
                      <span>Compare in Pillar</span>
                      <span className={`text-3xs font-mono font-bold px-1.5 py-0.2 rounded ${
                        isCompareOpen ? 'bg-indigo-700 text-white' : 'bg-indigo-200/80 text-indigo-900'
                      }`}>
                        {currentSiblingTools.length} peers
                      </span>
                    </button>

                    <button
                      onClick={() => setActiveMainTab('tools')}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                      <span>Deep Guide</span>
                    </button>

                    <button
                      onClick={() => setActiveMainTab('quizzes')}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <CheckCircle2 className={`w-3.5 h-3.5 ${isQuizDone(currentTool.id) ? 'text-indigo-600' : 'text-slate-400'}`} />
                      <span>{isQuizDone(currentTool.id) ? 'Quiz Passed' : 'Quiz (5 Qs)'}</span>
                    </button>

                    <button
                      onClick={() => setShowCurriculumOverview(!showCurriculumOverview)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <Layers className="w-3.5 h-3.5 text-slate-500" />
                      <span>{showCurriculumOverview ? 'Hide Blueprint' : 'Curriculum Blueprint'}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showCurriculumOverview ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
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

            {/* Compare within Pillar Side-by-Side Methodology Benchmark */}
            {isCompareOpen && secondaryTool && (
              <PillarMethodologyComparison
                primaryTool={currentTool}
                secondaryTool={secondaryTool}
                siblingTools={currentSiblingTools}
                pillarNumber={pillarMeta.pillarNumber}
                pillarName={pillarMeta.pillarName}
                onSelectSecondaryTool={(id) => setCompareSecondaryToolId(id)}
                onSwapTools={() => {
                  const oldPrimary = currentTool.id;
                  const oldSecondary = secondaryTool.id;
                  handleSelectTool(oldSecondary);
                  setCompareSecondaryToolId(oldPrimary);
                }}
                onSwitchSimulator={(id) => {
                  handleSelectTool(id);
                  setIsCompareOpen(false);
                }}
                onClose={() => setIsCompareOpen(false)}
              />
            )}

            {/* 1-Click Industry & Corporate Presets Toolbar, Snapshot Trigger & Direct Export */}
            <SimulatorPresetToolbar
              tool={currentTool}
              activePresetId={activePresetId}
              onSelectPreset={handleSelectPreset}
              onResetDefault={handleResetDefault}
              onOpenSnapshots={() => setIsSnapshotModalOpen(true)}
              snapshotCount={snapshotCount}
              onAddToDeck={handleAddCurrentToDeck}
              onCopyMemo={handleCopyExecutiveMemo}
            />

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
            onAddToDeck={handleAddCurrentToDeck}
            onCopyMemo={handleCopyExecutiveMemo}
          />
        )}

        {/* VIEW 3: CRISIS MISSIONS & SCENARIOS */}
        {activeMainTab === 'scenarios' && <ScenarioSimulator />}

        {/* VIEW 4: CERTIFICATION QUIZZES & FLASHCARDS */}
        {activeMainTab === 'quizzes' && (
          <TrainingQuizModule
            onLaunchSimulator={(id) => {
              handleSelectTool(id);
              setActiveMainTab('simulators');
            }}
          />
        )}

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

        {/* VIEW 7: USER SESSION PERFORMANCE & COMPLEXITY ANALYTICS (Recharts) */}
        {activeMainTab === 'performance' && (
          <UserSessionPerformancePanel
            allTools={ALL_TOOLS}
            onSelectTool={(id, view) => {
              handleSelectTool(id);
              setActiveMainTab(view);
            }}
          />
        )}

        {/* VIEW 8: AUTHOR BIOGRAPHY & CREDENTIAL DOSSIER */}
        {activeMainTab === 'author' && (
          <AuthorBiographyView
            onNavigateTab={(tab) => {
              setActiveMainTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAudit={() => setIsAuditModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <p className="font-semibold text-slate-700">
              BizTools · Executive Strategy, Operations, Finance, Product & Data Analytics Platform
            </p>
            <p className="mt-0.5 text-slate-500">
              by{' '}
              <button
                onClick={() => {
                  setActiveMainTab('author');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-indigo-600 hover:text-indigo-800 font-semibold hover:underline inline-flex items-center gap-0.5 cursor-pointer"
              >
                Sundaresh Kamaraj
              </button>
              {' '}· Version 1.21 (October 2026) · Covering 57 Core Executive Frameworks across 10 Pillars
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setActiveMainTab('author');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-indigo-600 hover:text-indigo-800 font-semibold hover:underline transition-colors cursor-pointer flex items-center gap-1"
            >
              <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
              <span>Author Biography</span>
            </button>
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
            setActiveMainTab(view as any);
          }
        }}
        onOpenPresets={() => setIsPresetsModalOpen(true)}
        onOpenVault={() => setIsVaultModalOpen(true)}
        onOpenDeck={() => setIsDeckBuilderOpen(true)}
        onOpenAudit={() => setIsAuditModalOpen(true)}
        onOpenCertificate={() => setIsCertificateModalOpen(true)}
      />

      {/* Industry Scenario Presets Modal */}
      <ScenarioPresetsModal
        isOpen={isPresetsModalOpen}
        onClose={() => setIsPresetsModalOpen(false)}
        onApplyPreset={(preset) => {
          handleSelectTool(preset.primaryToolId);
          setActiveMainTab('simulators');
          setAppliedTemplateToast(`Applied "${preset.name}" into ${preset.primaryToolId.toUpperCase()}!`);
          setTimeout(() => setAppliedTemplateToast(null), 3500);
        }}
        onLaunchTool={(toolId) => {
          handleSelectTool(toolId);
          setActiveMainTab('simulators');
        }}
        activeToolId={currentTool.id}
      />

      {/* Strategy Portfolio Vault (JSON Export / Restore) Modal */}
      <StrategyVaultModal
        isOpen={isVaultModalOpen}
        onClose={() => setIsVaultModalOpen(false)}
        onRestoreSuccess={(msg) => {
          setWorkspaceToastMsg(msg);
          setTimeout(() => setWorkspaceToastMsg(null), 3500);
        }}
      />

      {/* Printable / Downloadable PDF Report Modal */}
      <SimulatorReportModal
        tool={currentTool}
        isOpen={isExportReportOpen}
        onClose={() => setIsExportReportOpen(false)}
      />

      {/* Real-World Examples & Mock Datasets Modal (with 1-Click Apply to Simulator) */}
      <ToolExamplesModal
        tool={currentTool}
        isOpen={isExamplesModalOpen}
        onClose={() => setIsExamplesModalOpen(false)}
        onApplyTemplate={handleApplyTemplate}
      />

      {/* Personal Workspace Drawer (Saved Frameworks Slide-out) */}
      <WorkspaceDrawer
        isOpen={isWorkspaceDrawerOpen}
        onClose={() => setIsWorkspaceDrawerOpen(false)}
        savedToolIds={progress.savedWorkspace || []}
        allTools={ALL_TOOLS}
        onSelectTool={(toolId) => {
          handleSelectTool(toolId);
          setActiveMainTab('simulators');
        }}
        onRemoveFromWorkspace={(toolId) => {
          toggleWorkspace(toolId);
        }}
        onClearWorkspace={handleClearWorkspace}
        isSimulatorDone={isSimulatorDone}
        getTimeSpent={getTimeSpent}
      />

      {/* Official Pillar Mastery Certificate / Diploma Modal */}
      <PillarMasteryCertificateModal
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
        pillarName={categoryFilter === 'All' ? 'Complete 57 Framework Curriculum' : `${categoryFilter} Pillar`}
        pillarNumber={categoryFilter === 'All' ? '10 Pillars / 57 Frameworks' : (pillarMeta.pillarNumber || 'Pillar')}
        completionPercentage={categoryFilter === 'All' ? pillarStats.All.percentage : (pillarStats[categoryFilter]?.percentage || 100)}
        completedCount={categoryFilter === 'All' ? pillarStats.All.completed : (pillarStats[categoryFilter]?.completed || 0)}
        totalCount={categoryFilter === 'All' ? pillarStats.All.total : (pillarStats[categoryFilter]?.total || 0)}
      />

      {/* 3-Step Sequential Framework Recommender Wizard Modal */}
      <FrameworkRecommenderModal
        isOpen={isRecommenderOpen}
        onClose={() => setIsRecommenderOpen(false)}
        allTools={ALL_TOOLS}
        onSelectTool={(toolId) => {
          handleSelectTool(toolId);
          setActiveMainTab('simulators');
        }}
      />

      {/* Keyboard Shortcuts Cheatsheet Modal */}
      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      {/* Offline Status Connectivity Badge */}
      <OfflineIndicator />

      {/* Scenario Snapshot Vault Modal */}
      <ScenarioSnapshotModal
        tool={currentTool}
        isOpen={isSnapshotModalOpen}
        onClose={() => {
          setIsSnapshotModalOpen(false);
          setSnapshotCount(getSnapshotsForTool(selectedToolId).length);
        }}
        onApplySnapshot={handleApplySnapshot}
      />

      {/* Executive Strategy Dossier PDF Binder Modal */}
      <ExecutiveStrategyDossierModal
        isOpen={isDossierModalOpen}
        onClose={() => setIsDossierModalOpen(false)}
        allTools={ALL_TOOLS}
        completedToolIds={progress.completedSimulators}
        savedWorkspaceIds={progress.savedWorkspace || []}
      />

      {/* Interactive Strategy Chain Runner Workshop Modal */}
      <StrategyChainRunnerModal
        isOpen={isChainRunnerOpen}
        onClose={() => setIsChainRunnerOpen(false)}
        allTools={ALL_TOOLS}
        onLaunchTool={(toolId) => {
          handleSelectTool(toolId);
          setActiveMainTab('simulators');
        }}
        isSimulatorDone={isSimulatorDone}
      />

      {/* Board Deck Presentation Builder Modal (16:9 Widescreen) */}
      <StrategyDeckSlideBuilderModal
        isOpen={isDeckBuilderOpen}
        onClose={() => setIsDeckBuilderOpen(false)}
        onLaunchTool={(toolId) => {
          handleSelectTool(toolId);
          setActiveMainTab('simulators');
        }}
      />

      {/* Multi-Framework Strategy Workbench Modal (Dual Studio) */}
      <MultiFrameworkWorkbenchModal
        isOpen={isWorkbenchOpen}
        onClose={() => setIsWorkbenchOpen(false)}
        allTools={ALL_TOOLS}
        initialToolIdA={currentTool.id}
        initialToolIdB={ALL_TOOLS.find(t => t.id !== currentTool.id)?.id || 'blueocean'}
        onLaunchTool={(toolId) => {
          handleSelectTool(toolId);
          setActiveMainTab('simulators');
        }}
      />

      {/* Executive Milestone Credentials & Badges Modal */}
      <ExecutiveAchievementsModal
        isOpen={isAchievementsOpen}
        onClose={() => setIsAchievementsOpen(false)}
        progress={progress}
        allTools={ALL_TOOLS}
        onOpenCertificate={() => setIsCertificateModalOpen(true)}
      />

      {/* Executive Strategy Health Audit & Radar Diagnosis Modal */}
      <StrategyHealthAuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        allTools={ALL_TOOLS}
        onSelectTool={(toolId) => {
          handleSelectTool(toolId);
          setActiveMainTab('simulators');
        }}
      />

      {/* Floating Toast Notification for 1-Click Applied Template */}
      {appliedTemplateToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-xl shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <PlayCircle className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="font-bold text-white leading-tight">Template Applied to Simulator</div>
            <div className="text-3xs text-slate-300 font-normal">{appliedTemplateToast}</div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification for Workspace Updates */}
      {workspaceToastMsg && (
        <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2.5 px-4 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-xl shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <Bookmark className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="font-bold text-white leading-tight">Workspace Updated</div>
            <div className="text-3xs text-slate-300 font-normal">{workspaceToastMsg}</div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification for Copied Share Link */}
      {shareFeedbackMsg && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-xl shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="font-bold text-white leading-tight">Link Copied to Clipboard</div>
            <div className="text-3xs text-slate-300 font-normal">{shareFeedbackMsg}</div>
          </div>
        </div>
      )}
    </div>
  );
}
