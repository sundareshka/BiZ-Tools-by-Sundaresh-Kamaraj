import {
  Grid2X2,
  Globe2,
  ShieldAlert,
  Gauge,
  Maximize2,
  Waves,
  Gem,
  Target,
  LayoutGrid,
  FileSpreadsheet,
  Gift,
  Lightbulb,
  Briefcase,
  Navigation,
  Megaphone,
  Users,
  Filter,
  Map,
  Flame,
  Smile,
  Scissors,
  Activity,
  RefreshCw,
  GitCommit,
  Cpu,
  Kanban,
  Scale,
  Calculator,
  BarChart2,
  Clock,
  Percent,
  Coins,
  Calendar,
  Network,
  Timer,
  RotateCcw,
  KanbanSquare,
  Boxes,
  Table,
  HeartHandshake,
  UserCheck,
  Medal,
  AlertTriangle,
  GitFork,
  Dice5,
  Eye,
  BarChart,
  Rocket,
  Milestone,
  Layers,
  GitCompare,
  UserMinus,
  GitBranch,
  LayoutDashboard,
  Users2,
  LineChart,
  Database,
  Compass,
  LucideIcon
} from 'lucide-react';

/**
 * Consistent, domain-targeted Lucide icon mapping for all 57 executive business frameworks.
 */
export const TOOL_ICONS: Record<string, LucideIcon> = {
  // 1. Strategy & Market Positioning (8 Tools)
  swot: Grid2X2,
  pestle: Globe2,
  porter: ShieldAlert,
  bsc: Gauge,
  ansoff: Maximize2,
  blueocean: Waves,
  vrio: Gem,
  okrs: Target,

  // 2. Business Model Innovation (6 Tools)
  bmc: LayoutGrid,
  leancanvas: FileSpreadsheet,
  vpc: Gift,
  designthinking: Lightbulb,
  jtbd: Briefcase,
  bmn: Navigation,

  // 3. Marketing & Growth (6 Tools)
  marketingmix: Megaphone,
  stp: Users,
  aida: Filter,
  journeymap: Map,
  growthhacking: Flame,
  nps: Smile,

  // 4. Operations & Process Excellence (6 Tools)
  lean: Scissors,
  sixsigma: Activity,
  kaizen: RefreshCw,
  vsm: GitCommit,
  bpr: Cpu,
  kanban: Kanban,

  // 5. Financial Performance & Valuation (6 Tools)
  breakeven: Scale,
  costbenefit: Calculator,
  budgeting: BarChart2,
  workingcapital: Clock,
  dupont: Percent,
  abc: Coins,

  // 6. Project & Portfolio Execution (5 Tools)
  gantt: Calendar,
  cpm: Network,
  pert: Timer,
  agile: RotateCcw,
  scrum: KanbanSquare,

  // 7. HR & Organizational Design (5 Tools)
  mckinsey7s: Boxes,
  raci: Table,
  engagement: HeartHandshake,
  appraisal: UserCheck,
  competency: Medal,

  // 8. Risk & Decision Architecture (5 Tools)
  riskmatrix: AlertTriangle,
  decisiontree: GitFork,
  montecarlo: Dice5,
  scenarioplanning: Eye,
  pareto: BarChart,

  // 9. Product Strategy & Startup Growth (5 Tools)
  mvp: Rocket,
  productroadmap: Milestone,
  userstorymapping: Layers,
  abtesting: GitCompare,
  churnanalysis: UserMinus,

  // 10. Data & Advanced Business Analytics (5 Tools)
  kpis: GitBranch,
  dashboards: LayoutDashboard,
  cohortanalysis: Users2,
  predictiveanalytics: LineChart,
  bitools: Database,
};

/**
 * Returns the Lucide icon for a given tool identifier, with Compass as fallback.
 */
export function getToolIcon(toolId: string): LucideIcon {
  return TOOL_ICONS[toolId] || Compass;
}
