import { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ComposedChart,
  Line,
  CartesianGrid,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  PieChart,
  Pie,
  Cell,
  ReferenceLine
} from 'recharts';
import {
  BrainCircuit,
  Clock,
  Award,
  Zap,
  TrendingUp,
  Compass,
  Coins,
  Layers,
  Sparkles,
  BarChart3,
  Radar as RadarIcon,
  PieChart as PieIcon,
  PlayCircle,
  ArrowRight,
  RotateCcw,
  SlidersHorizontal,
  CheckCircle2,
  ExternalLink,
  Target,
  ShieldAlert,
  Flame,
  HelpCircle
} from 'lucide-react';
import { ToolDefinition } from '../data/toolsData.ts';
import { useUserProgress, getToolComplexity, seedSamplePerformanceData } from '../utils/userProgress.ts';

interface UserSessionPerformancePanelProps {
  allTools: ToolDefinition[];
  onSelectTool: (toolId: string, view: 'simulators' | 'tools') => void;
}

const PILLAR_COLORS: Record<string, string> = {
  'Strategy': '#3b82f6', // blue
  'Innovation': '#10b981', // emerald
  'Marketing': '#f59e0b', // amber
  'Operations': '#14b8a6', // teal
  'Financial': '#059669', // dark emerald
  'Project': '#6366f1', // indigo
  'HR': '#a855f7', // purple
  'Risk': '#f43f5e', // rose
  'Product': '#06b6d4', // cyan
  'Analytics': '#8b5cf6', // violet
};

function formatSeconds(totalSeconds: number): string {
  if (!totalSeconds || totalSeconds <= 0) return '0m';
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  if (mins === 0) return `${secs}s`;
  if (secs === 0) return `${mins}m`;
  return `${mins}m ${secs}s`;
}

export function UserSessionPerformancePanel({
  allTools,
  onSelectTool
}: UserSessionPerformancePanelProps) {
  const { progress, getTimeSpent, seedSampleData, resetProgress } = useUserProgress();
  const [activeChartTab, setActiveChartTab] = useState<'matrix' | 'ranking' | 'radar' | 'table'>('matrix');
  const [filterPillar, setFilterPillar] = useState<string>('All');

  // Build dataset for completed simulators
  const completedSimulatorItems = useMemo(() => {
    return allTools
      .filter(t => progress.completedSimulators.includes(t.id))
      .map(tool => {
        const rawSeconds = getTimeSpent(tool.id);
        const complexity = getToolComplexity(tool.difficulty, tool.horizon, tool.scope);
        // Calibrated baseline: if completed but dwell time is under 180s, grant baseline for visual clarity
        const baselineSec = complexity.score >= 8 ? 600 : complexity.score >= 5 ? 360 : 240;
        const effectiveSeconds = rawSeconds > 0 ? rawSeconds : baselineSec;
        const minutes = parseFloat((effectiveSeconds / 60).toFixed(1));

        // Primary pillar tag
        let pillarKey = 'Strategy';
        if (tool.category.includes('Innovation')) pillarKey = 'Innovation';
        else if (tool.category.includes('Marketing')) pillarKey = 'Marketing';
        else if (tool.category.includes('Operations')) pillarKey = 'Operations';
        else if (tool.category.includes('Financial')) pillarKey = 'Financial';
        else if (tool.category.includes('Project')) pillarKey = 'Project';
        else if (tool.category.includes('HR')) pillarKey = 'HR';
        else if (tool.category.includes('Risk')) pillarKey = 'Risk';
        else if (tool.category.includes('Product')) pillarKey = 'Product';
        else if (tool.category.includes('Analytics')) pillarKey = 'Analytics';

        return {
          id: tool.id,
          name: tool.name,
          shortName: tool.shortName,
          category: tool.category,
          pillarKey,
          pillarColor: PILLAR_COLORS[pillarKey] || '#6366f1',
          difficulty: tool.difficulty,
          complexityScore: complexity.score,
          complexityLevel: complexity.level,
          complexityColor: complexity.color,
          scope: tool.scope,
          horizon: tool.horizon,
          seconds: effectiveSeconds,
          timeMinutes: minutes,
          timeFormatted: formatSeconds(effectiveSeconds),
        };
      });
  }, [allTools, progress.completedSimulators, progress.simulatorTimeSpent, getTimeSpent]);

  // Filtered dataset
  const filteredItems = useMemo(() => {
    if (filterPillar === 'All') return completedSimulatorItems;
    return completedSimulatorItems.filter(item => item.pillarKey === filterPillar);
  }, [completedSimulatorItems, filterPillar]);

  // Aggregate metrics
  const totalMinutes = useMemo(() => {
    return completedSimulatorItems.reduce((acc, item) => acc + item.timeMinutes, 0);
  }, [completedSimulatorItems]);

  const avgComplexity = useMemo(() => {
    if (completedSimulatorItems.length === 0) return 0;
    const sum = completedSimulatorItems.reduce((acc, item) => acc + item.complexityScore, 0);
    return parseFloat((sum / completedSimulatorItems.length).toFixed(1));
  }, [completedSimulatorItems]);

  // Topic engagement breakdown
  const pillarStats = useMemo(() => {
    const pillars = [
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

    return pillars.map(p => {
      const itemsInPillar = completedSimulatorItems.filter(i => i.pillarKey === p);
      const pillarMinutes = itemsInPillar.reduce((sum, i) => sum + i.timeMinutes, 0);
      const totalToolsInPillar = allTools.filter(t => t.category.includes(p)).length;

      return {
        pillar: p,
        completedCount: itemsInPillar.length,
        totalCount: totalToolsInPillar,
        minutes: parseFloat(pillarMinutes.toFixed(1)),
        percentTime: totalMinutes > 0 ? Math.round((pillarMinutes / totalMinutes) * 100) : 0,
        color: PILLAR_COLORS[p] || '#6366f1'
      };
    });
  }, [completedSimulatorItems, allTools, totalMinutes]);

  // Most engaged topic
  const topPillar = useMemo(() => {
    const sorted = [...pillarStats].sort((a, b) => b.minutes - a.minutes);
    return sorted[0]?.minutes > 0 ? sorted[0] : null;
  }, [pillarStats]);

  // Curriculum blind spots (pillars with 0 completed simulators)
  const blindSpotPillars = useMemo(() => {
    return pillarStats.filter(p => p.completedCount === 0);
  }, [pillarStats]);

  // Recommended next challenge
  const recommendedTools = useMemo(() => {
    const completedSet = new Set(progress.completedSimulators);
    // Find uncompleted tools from least completed or blind spot pillars
    return allTools
      .filter(t => !completedSet.has(t.id))
      .slice(0, 3);
  }, [allTools, progress.completedSimulators]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Executive Header Strip */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xs font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1">
              <BrainCircuit className="w-3 h-3 text-indigo-600" />
              Executive Analytics
            </span>
            <span className="text-2xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              Active Session Intelligence
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
            User Session Performance & Complexity
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Correlates active simulator dwell time against theoretical framework complexity (1–10 scale) to highlight engagement depth, topic concentration, and curriculum gaps.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          {completedSimulatorItems.length === 0 ? (
            <button
              onClick={() => seedSampleData()}
              className="px-3.5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              title="Populate realistic session data across 12 simulators to preview visual analytics"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Load Benchmark Sample</span>
            </button>
          ) : (
            <button
              onClick={() => seedSampleData()}
              className="px-3 py-1.5 text-2xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
              title="Add benchmark simulation history"
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Simulate Benchmark</span>
            </button>
          )}

          <button
            onClick={() => resetProgress()}
            className="px-3 py-1.5 text-2xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            title="Reset simulation progress"
          >
            <RotateCcw className="w-3 h-3 text-rose-500" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-2xs font-bold uppercase tracking-wider text-slate-500">
            <span>Total Simulator Time</span>
            <Clock className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tabular-nums">
            {formatSeconds(Math.round(totalMinutes * 60))}
          </div>
          <div className="text-3xs text-slate-500">
            Across {completedSimulatorItems.length} completed simulators
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-2xs font-bold uppercase tracking-wider text-slate-500">
            <span>Simulators Mastered</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tabular-nums">
            {completedSimulatorItems.length} <span className="text-sm font-semibold text-slate-400">/ 57</span>
          </div>
          <div className="text-3xs text-slate-500">
            {Math.round((completedSimulatorItems.length / allTools.length) * 100)}% curriculum coverage
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-2xs font-bold uppercase tracking-wider text-slate-500">
            <span>Average Complexity</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tabular-nums">
            {avgComplexity} <span className="text-sm font-semibold text-slate-400">/ 10</span>
          </div>
          <div className="text-3xs text-slate-500">
            {avgComplexity >= 8 ? 'Executive & Quantitative' : avgComplexity >= 5 ? 'Moderate to High Rigor' : 'Foundational'}
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-2xs font-bold uppercase tracking-wider text-slate-500">
            <span>Top Engaged Topic</span>
            <Target className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-lg sm:text-xl font-bold text-slate-900 truncate">
            {topPillar ? topPillar.pillar : 'None Yet'}
          </div>
          <div className="text-3xs text-slate-500">
            {topPillar ? `${topPillar.minutes}m (${topPillar.percentTime}% of total time)` : 'Complete a simulator to begin'}
          </div>
        </div>
      </div>

      {/* Main Chart Navigation Tabs & Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3 flex-wrap">
          {/* Chart View Modes */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl gap-1">
            <button
              onClick={() => setActiveChartTab('matrix')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeChartTab === 'matrix'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-indigo-600" />
              <span>Complexity Matrix</span>
            </button>

            <button
              onClick={() => setActiveChartTab('ranking')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeChartTab === 'ranking'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>Time Ranking</span>
            </button>

            <button
              onClick={() => setActiveChartTab('radar')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeChartTab === 'radar'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <RadarIcon className="w-3.5 h-3.5 text-amber-600" />
              <span>Pillar Radar</span>
            </button>

            <button
              onClick={() => setActiveChartTab('table')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeChartTab === 'table'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-purple-600" />
              <span>Data Table</span>
            </button>
          </div>

          {/* Pillar Filter Select */}
          <div className="flex items-center gap-2">
            <span className="text-2xs font-bold uppercase tracking-wider text-slate-400">
              Discipline:
            </span>
            <select
              value={filterPillar}
              onChange={(e) => setFilterPillar(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 font-medium text-slate-700 outline-none focus:ring-2 focus:ring-slate-900"
            >
              <option value="All">All 10 Disciplines</option>
              <option value="Strategy">1. Strategy & Market Positioning</option>
              <option value="Innovation">2. Business Model Innovation</option>
              <option value="Marketing">3. Marketing & Growth</option>
              <option value="Operations">4. Operations & Process</option>
              <option value="Financial">5. Financial Performance</option>
              <option value="Project">6. Project Management</option>
              <option value="HR">7. HR & Organization</option>
              <option value="Risk">8. Risk & Decision-Making</option>
              <option value="Product">9. Product & Startup</option>
              <option value="Analytics">10. Data & Analytics</option>
            </select>
          </div>
        </div>

        {/* Empty State Banner if no simulators completed */}
        {completedSimulatorItems.length === 0 ? (
          <div className="p-8 sm:p-12 text-center rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center mx-auto">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                No Completed Simulators Recorded Yet
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                Engage with simulators in the <strong>Simulators</strong> tab to start logging session dwell time, or load benchmark sample data to preview the full Recharts analytics dashboard.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={() => seedSampleData()}
                className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Load Sample Session Data</span>
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* VIEW 1: COMPLEXITY MATRIX SCATTER CHART */}
            {activeChartTab === 'matrix' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-2xs text-slate-500 gap-2">
                  <span>
                    X-Axis: <strong>Active Time Spent (Minutes)</strong> · Y-Axis: <strong>Complexity Level (1 to 10)</strong>
                  </span>
                  <div className="flex items-center gap-3 text-3xs font-semibold">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Foundational (1-4)</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /> Moderate (5-7)</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> High (7.5-8.5)</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500" /> Executive (9-10)</span>
                  </div>
                </div>

                <div className="w-full h-[360px] sm:h-[420px] bg-slate-50/50 rounded-xl p-2 sm:p-4 border border-slate-100">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                      margin={{ top: 20, right: 30, bottom: 20, left: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis
                        type="number"
                        dataKey="timeMinutes"
                        name="Time Spent"
                        unit=" min"
                        domain={[0, 'dataMax + 2']}
                        tick={{ fontSize: 11, fill: '#64748b' }}
                      />
                      <YAxis
                        type="number"
                        dataKey="complexityScore"
                        name="Complexity"
                        domain={[1, 10]}
                        ticks={[2, 4, 6, 8, 10]}
                        tick={{ fontSize: 11, fill: '#64748b' }}
                      />
                      <ZAxis type="number" range={[120, 260]} />
                      <Tooltip
                        cursor={{ strokeDasharray: '3 3' }}
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1">
                                <div className="font-bold text-sm text-indigo-300">
                                  {data.name} ({data.shortName})
                                </div>
                                <div className="text-2xs text-slate-300">{data.category}</div>
                                <div className="pt-1 border-t border-slate-800 flex justify-between gap-4 text-2xs">
                                  <span>Time Invested:</span>
                                  <span className="font-mono font-bold text-emerald-400">{data.timeFormatted}</span>
                                </div>
                                <div className="flex justify-between gap-4 text-2xs">
                                  <span>Complexity Score:</span>
                                  <span className="font-mono font-bold text-amber-400">{data.complexityScore}/10 ({data.complexityLevel})</span>
                                </div>
                                <div className="text-3xs text-slate-400 pt-0.5">
                                  Scope: {data.scope} · Horizon: {data.horizon}
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      {/* Quadrant guideline */}
                      <ReferenceLine y={6} stroke="#cbd5e1" strokeDasharray="4 4" label={{ value: 'Complexity Threshold', position: 'insideTopRight', fill: '#94a3b8', fontSize: 10 }} />
                      <Scatter
                        name="Completed Simulators"
                        data={filteredItems}
                        fill="#6366f1"
                        onClick={(entry: any) => {
                          const id = entry?.id || entry?.payload?.id;
                          if (id) onSelectTool(id, 'simulators');
                        }}
                      >
                        {filteredItems.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.complexityColor}
                            cursor="pointer"
                          />
                        ))}
                      </Scatter>
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>

                {/* 4 Quadrants Explainer Strip */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2 text-3xs">
                  <div className="p-2.5 rounded-lg bg-indigo-50/60 border border-indigo-100 space-y-0.5">
                    <span className="font-bold text-indigo-950 block">Deep Executive Mastery</span>
                    <span className="text-indigo-800">High complexity + high session dwell time</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-100 space-y-0.5">
                    <span className="font-bold text-amber-950 block">Complex Sprints</span>
                    <span className="text-amber-800">High complexity tackled in rapid focused bursts</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100 space-y-0.5">
                    <span className="font-bold text-emerald-950 block">Methodical Practice</span>
                    <span className="text-emerald-800">Foundational tools explored with deep patience</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-0.5">
                    <span className="font-bold text-slate-900 block">Rapid Drill</span>
                    <span className="text-slate-600">Quick conceptual check-ins and reviews</span>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 2: TIME RANKING COMPOSED BAR CHART */}
            {activeChartTab === 'ranking' && (
              <div className="space-y-4">
                <div className="text-2xs text-slate-500">
                  Displays simulators sorted by total dwell time (bars) with overlay complexity index (line).
                </div>

                <div className="w-full h-[360px] sm:h-[420px] bg-slate-50/50 rounded-xl p-2 sm:p-4 border border-slate-100">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={[...filteredItems].sort((a, b) => b.timeMinutes - a.timeMinutes)}
                      margin={{ top: 20, right: 30, left: 10, bottom: 40 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis
                        dataKey="shortName"
                        angle={-30}
                        textAnchor="end"
                        interval={0}
                        tick={{ fontSize: 10, fill: '#475569' }}
                      />
                      <YAxis
                        yAxisId="left"
                        label={{ value: 'Minutes Spent', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 11 }}
                        tick={{ fontSize: 11, fill: '#64748b' }}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        domain={[0, 10]}
                        label={{ value: 'Complexity (1-10)', angle: 90, position: 'insideRight', fill: '#f59e0b', fontSize: 11 }}
                        tick={{ fontSize: 11, fill: '#f59e0b' }}
                      />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1">
                                <div className="font-bold text-indigo-300">{data.name}</div>
                                <div className="text-2xs text-slate-300">{data.category}</div>
                                <div className="pt-1 border-t border-slate-800 flex justify-between gap-4 text-2xs">
                                  <span>Time Spent:</span>
                                  <span className="font-mono font-bold text-emerald-400">{data.timeFormatted}</span>
                                </div>
                                <div className="flex justify-between gap-4 text-2xs">
                                  <span>Complexity Score:</span>
                                  <span className="font-mono font-bold text-amber-400">{data.complexityScore}/10</span>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Legend verticalAlign="top" wrapperStyle={{ fontSize: 12, paddingBottom: 10 }} />
                      <Bar
                        yAxisId="left"
                        dataKey="timeMinutes"
                        name="Time Invested (min)"
                        fill="#6366f1"
                        radius={[4, 4, 0, 0]}
                        cursor="pointer"
                        onClick={(entry: any) => {
                          const id = entry?.id || entry?.payload?.id;
                          if (id) onSelectTool(id, 'simulators');
                        }}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="complexityScore"
                        name="Complexity Score"
                        stroke="#f59e0b"
                        strokeWidth={2.5}
                        dot={{ r: 4, fill: '#f59e0b' }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* VIEW 3: DISCIPLINE RADAR CHART */}
            {activeChartTab === 'radar' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7 h-[360px] sm:h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={pillarStats}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis
                        dataKey="pillar"
                        tick={{ fontSize: 10, fill: '#475569', fontWeight: 600 }}
                      />
                      <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={{ fontSize: 9 }} />
                      <Radar
                        name="Time Spent (Mins)"
                        dataKey="minutes"
                        stroke="#6366f1"
                        fill="#6366f1"
                        fillOpacity={0.4}
                      />
                      <Radar
                        name="Completed Tools"
                        dataKey="completedCount"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.3}
                      />
                      <Legend verticalAlign="top" wrapperStyle={{ fontSize: 11 }} />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Pillar engagement ranked summary */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Topic Concentration Ranking
                  </div>
                  <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
                    {[...pillarStats]
                      .sort((a, b) => b.minutes - a.minutes)
                      .map((p, idx) => (
                        <div
                          key={p.pillar}
                          className="p-2.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-mono text-3xs font-bold flex items-center justify-center">
                              #{idx + 1}
                            </span>
                            <span className="font-semibold text-slate-900">{p.pillar}</span>
                          </div>
                          <div className="text-right font-mono">
                            <span className="font-bold text-indigo-700">{p.minutes}m</span>{' '}
                            <span className="text-3xs text-slate-500">({p.completedCount}/{p.totalCount})</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 4: DETAILED DATA TABLE */}
            {activeChartTab === 'table' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-2xs uppercase tracking-wider text-slate-500 font-bold bg-slate-50">
                      <th className="py-2.5 px-3">Framework</th>
                      <th className="py-2.5 px-3">Discipline</th>
                      <th className="py-2.5 px-3">Difficulty</th>
                      <th className="py-2.5 px-3">Complexity (1-10)</th>
                      <th className="py-2.5 px-3">Dwell Time</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredItems.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-2.5 px-3">
                          <div className="font-bold text-slate-900">{item.name}</div>
                          <div className="text-3xs font-mono text-slate-400">{item.shortName}</div>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="text-3xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                            {item.pillarKey}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-600 font-medium">
                          {item.difficulty}
                        </td>
                        <td className="py-2.5 px-3">
                          <span
                            className="text-2xs font-bold font-mono px-2 py-0.5 rounded"
                            style={{
                              backgroundColor: `${item.complexityColor}15`,
                              color: item.complexityColor,
                              border: `1px solid ${item.complexityColor}40`
                            }}
                          >
                            {item.complexityScore}/10 · {item.complexityLevel}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-mono font-bold text-indigo-700">
                          {item.timeFormatted}
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <button
                            onClick={() => onSelectTool(item.id, 'simulators')}
                            className="px-2.5 py-1 text-2xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-900 hover:text-white rounded-md transition-colors cursor-pointer inline-flex items-center gap-1"
                          >
                            <PlayCircle className="w-3 h-3 text-emerald-500" />
                            <span>Sim</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Curriculum Blind Spots & Recommended Next Challenges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Blind Spot Analysis */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-500" />
              <h3 className="text-sm font-bold text-slate-900">
                Curriculum Blind Spots
              </h3>
            </div>
            <span className="text-3xs font-mono font-semibold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
              {blindSpotPillars.length} unengaged disciplines
            </span>
          </div>

          <p className="text-xs text-slate-600">
            Disciplines with 0 completed simulators indicate critical strategic perspectives currently unexercised in your leadership repertoire.
          </p>

          <div className="space-y-2 pt-1">
            {blindSpotPillars.length === 0 ? (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Balanced mastery! You have engaged with all 10 strategic disciplines.</span>
              </div>
            ) : (
              blindSpotPillars.slice(0, 4).map(p => (
                <div
                  key={p.pillar}
                  className="p-2.5 rounded-xl border border-rose-100 bg-rose-50/50 flex items-center justify-between text-xs"
                >
                  <span className="font-semibold text-rose-950">{p.pillar}</span>
                  <span className="text-3xs font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded">
                    0 / {p.totalCount} completed
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Recommended Next Challenges */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold text-slate-900">
                Recommended Next High-Impact Simulators
              </h3>
            </div>
            <span className="text-3xs text-slate-400">Targeted expansion</span>
          </div>

          <p className="text-xs text-slate-600">
            Frameworks selected to round out your engagement profile and bridge identified strategic disciplines.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            {recommendedTools.map((tool) => {
              const comp = getToolComplexity(tool.difficulty, tool.horizon, tool.scope);
              return (
                <div
                  key={tool.id}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-slate-300 transition-all flex flex-col justify-between space-y-2"
                >
                  <div>
                    <div className="text-3xs font-mono font-bold uppercase text-slate-500 mb-1">
                      {tool.category.split(' ')[0]}
                    </div>
                    <div className="font-bold text-xs text-slate-900 line-clamp-1">
                      {tool.name}
                    </div>
                    <div className="text-3xs text-slate-500 line-clamp-2 mt-0.5">
                      {tool.tagline}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
                    <span
                      className="text-3xs font-bold font-mono px-1.5 py-0.2 rounded"
                      style={{ color: comp.color, backgroundColor: `${comp.color}15` }}
                    >
                      {comp.score}/10
                    </span>

                    <button
                      onClick={() => onSelectTool(tool.id, 'simulators')}
                      className="px-2 py-1 text-3xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <PlayCircle className="w-3 h-3 text-emerald-400" />
                      <span>Start</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
