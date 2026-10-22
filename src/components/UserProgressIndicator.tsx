import { useState, useRef, useEffect, useMemo } from 'react';
import {
  Trophy,
  CheckCircle2,
  PlayCircle,
  HelpCircle,
  RotateCcw,
  X,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Award,
  Layers,
  ArrowRight,
  CheckSquare,
  Square,
  BrainCircuit
} from 'lucide-react';
import { useUserProgress } from '../utils/userProgress.ts';
import { ToolDefinition } from '../data/toolsData.ts';

interface UserProgressIndicatorProps {
  allTools: ToolDefinition[];
  currentToolId?: string;
  onSelectTool: (toolId: string, view: 'simulators' | 'quizzes') => void;
  onOpenPerformance?: () => void;
}

export function UserProgressIndicator({
  allTools,
  currentToolId,
  onSelectTool,
  onOpenPerformance
}: UserProgressIndicatorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [expandedPillar, setExpandedPillar] = useState<string | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const {
    progress,
    resetProgress,
    toggleSimulator,
    toggleQuiz,
    markAllSimulators,
    markPillar,
    isSimulatorDone,
    isQuizDone
  } = useUserProgress();

  const totalSimulators = allTools.length; // 57
  const totalQuizzes = allTools.length; // 57
  const totalMilestones = totalSimulators + totalQuizzes; // 114

  const completedSimulatorsCount = progress.completedSimulators.length;
  const completedQuizzesCount = progress.completedQuizzes.length;
  const totalCompleted = completedSimulatorsCount + completedQuizzesCount;

  const overallPercent = Math.min(100, Math.round((totalCompleted / totalMilestones) * 100));

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setConfirmReset(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Pillar grouping breakdown
  const pillarBreakdowns = useMemo(() => {
    const pillars = [
      { name: '1. Strategy & Planning', categoryKey: 'Strategy', color: 'bg-blue-600' },
      { name: '2. Business Model Innovation', categoryKey: 'Innovation', color: 'bg-emerald-600' },
      { name: '3. Marketing & Growth', categoryKey: 'Marketing', color: 'bg-amber-600' },
      { name: '4. Operations & Process', categoryKey: 'Operations', color: 'bg-teal-600' },
      { name: '5. Financial & Performance', categoryKey: 'Financial', color: 'bg-emerald-700' },
      { name: '6. Project Management', categoryKey: 'Project', color: 'bg-indigo-600' },
      { name: '7. HR & Organizational', categoryKey: 'HR', color: 'bg-purple-600' },
      { name: '8. Risk & Decision-Making', categoryKey: 'Risk', color: 'bg-rose-600' },
      { name: '9. Product & Startup', categoryKey: 'Product', color: 'bg-cyan-600' },
      { name: '10. Data & Analytics', categoryKey: 'Analytics', color: 'bg-violet-600' }
    ];

    return pillars.map(p => {
      const toolsInPillar = allTools.filter(t => t.category.includes(p.categoryKey));
      const simDone = toolsInPillar.filter(t => progress.completedSimulators.includes(t.id)).length;
      const quizDone = toolsInPillar.filter(t => progress.completedQuizzes.includes(t.id)).length;
      const totalPillarItems = toolsInPillar.length * 2;
      const donePillarItems = simDone + quizDone;
      const pct = totalPillarItems > 0 ? Math.round((donePillarItems / totalPillarItems) * 100) : 0;

      return {
        ...p,
        totalTools: toolsInPillar.length,
        tools: toolsInPillar,
        simDone,
        quizDone,
        pct
      };
    });
  }, [allTools, progress.completedSimulators, progress.completedQuizzes]);

  // Find next uncompleted framework
  const nextIncompleteTool = useMemo(() => {
    return allTools.find(
      t => !progress.completedSimulators.includes(t.id) || !progress.completedQuizzes.includes(t.id)
    );
  }, [allTools, progress.completedSimulators, progress.completedQuizzes]);

  const activeTool = allTools.find(t => t.id === currentToolId) || allTools[0];

  const handleJumpNext = () => {
    if (nextIncompleteTool) {
      const needsSim = !progress.completedSimulators.includes(nextIncompleteTool.id);
      onSelectTool(nextIncompleteTool.id, needsSim ? 'simulators' : 'quizzes');
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={popoverRef}>
      {/* Top Header Trigger Button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1.5 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-800 transition-all shadow-2xs group cursor-pointer shrink-0"
        title="Executive Learning Progress (localStorage)"
      >
        <div className="relative flex items-center justify-center">
          <Trophy
            className={`w-3.5 h-3.5 transition-colors ${
              overallPercent > 0 ? 'text-amber-500' : 'text-slate-400 group-hover:text-amber-500'
            }`}
          />
          {overallPercent === 100 && (
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          )}
        </div>

        <div className="flex items-center gap-1 whitespace-nowrap">
          <span className="text-xs font-bold text-slate-900 font-mono">
            {overallPercent}%
          </span>
          <span className="text-3xs font-medium text-slate-500 hidden sm:inline">
            ({totalCompleted}/{totalMilestones})
          </span>
        </div>

        {/* Mini progress bar inside button */}
        <div className="w-8 sm:w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden hidden md:block border border-slate-200">
          <div
            className="h-full bg-linear-to-r from-amber-500 to-indigo-600 transition-all duration-500 rounded-full"
            style={{ width: `${overallPercent}%` }}
          />
        </div>
      </button>

      {/* Popover Card */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-[calc(100vw-2rem)] sm:w-[460px] max-w-[460px] bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Header */}
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                  Executive Progress Hub
                  <span className="text-3xs font-mono font-medium px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    localStorage
                  </span>
                </h3>
                <p className="text-2xs text-slate-400 mt-0.5">
                  Tracks 57 simulators & 57 quizzes (285 certification questions)
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-4 max-h-[75vh] overflow-y-auto">
            {/* Overall Progress Banner */}
            <div className="p-4 rounded-xl bg-linear-to-br from-indigo-50/70 via-slate-50 to-amber-50/50 border border-indigo-100/80">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-2xs font-extrabold uppercase tracking-wider text-slate-500">
                    Overall Curriculum
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-2xl font-black text-slate-900 font-mono">
                      {overallPercent}%
                    </span>
                    <span className="text-xs font-medium text-slate-600">
                      {totalCompleted} of {totalMilestones} milestones
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  {overallPercent === 100 ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-3xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      <Sparkles className="w-3 h-3 text-emerald-600" /> Fully Certified
                    </span>
                  ) : (
                    <span className="text-3xs font-semibold text-slate-500 font-mono">
                      {totalMilestones - totalCompleted} remaining
                    </span>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 bg-slate-200/80 rounded-full overflow-hidden p-0.5 border border-slate-300/40">
                <div
                  className="h-full bg-linear-to-r from-indigo-600 via-indigo-500 to-amber-500 rounded-full transition-all duration-700"
                  style={{ width: `${overallPercent}%` }}
                />
              </div>

              {/* Breakdown Grid */}
              <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-200/60">
                <div className="flex items-center gap-2">
                  <PlayCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-900 font-mono">
                      {completedSimulatorsCount} / {totalSimulators}
                    </div>
                    <div className="text-3xs text-slate-500 font-medium">Simulators Explored</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-900 font-mono">
                      {completedQuizzesCount} / {totalQuizzes}
                    </div>
                    <div className="text-3xs text-slate-500 font-medium">Quizzes Completed</div>
                  </div>
                </div>
              </div>

              {/* Jump to Performance Analytics */}
              {onOpenPerformance && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenPerformance();
                  }}
                  className="w-full mt-3 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center justify-between shadow-xs group cursor-pointer"
                  title="View complexity vs time charts and topic engagement breakdown"
                >
                  <div className="flex items-center gap-2">
                    <BrainCircuit className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                    <span>View Session Performance & Complexity</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </button>
              )}
            </div>

            {/* Current Active Tool Quick Check-off */}
            {activeTool && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-3xs font-extrabold uppercase tracking-wider text-slate-500">
                    Current Framework
                  </span>
                  <span className="text-2xs font-semibold text-slate-700 truncate max-w-[200px]">
                    {activeTool.shortName} — {activeTool.name}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleSimulator(activeTool.id)}
                    className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                      isSimulatorDone(activeTool.id)
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <CheckCircle2 className={`w-3.5 h-3.5 ${isSimulatorDone(activeTool.id) ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span>{isSimulatorDone(activeTool.id) ? 'Sim Done ✓' : 'Mark Sim Done'}</span>
                  </button>

                  <button
                    onClick={() => toggleQuiz(activeTool.id)}
                    className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                      isQuizDone(activeTool.id)
                        ? 'bg-indigo-100 text-indigo-900 border-indigo-300 font-bold'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <CheckCircle2 className={`w-3.5 h-3.5 ${isQuizDone(activeTool.id) ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span>{isQuizDone(activeTool.id) ? 'Quiz Passed ✓' : 'Mark Quiz Done'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Quick Bulk Actions */}
            <div className="flex items-center gap-2 text-2xs">
              <button
                onClick={() => markAllSimulators(allTools.map(t => t.id))}
                className="flex-1 py-1.5 px-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 font-semibold transition-colors flex items-center justify-center gap-1"
                title="Mark all 57 simulators completed"
              >
                <CheckSquare className="w-3 h-3 text-emerald-600" />
                <span>Mark All 57 Sims Done</span>
              </button>

              {nextIncompleteTool && (
                <button
                  onClick={handleJumpNext}
                  className="flex-1 py-1.5 px-2 rounded-lg bg-indigo-50 text-indigo-800 border border-indigo-200 hover:bg-indigo-100 font-semibold transition-colors flex items-center justify-center gap-1"
                >
                  <span>Next Milestone</span>
                  <ArrowRight className="w-3 h-3 text-indigo-600" />
                </button>
              )}
            </div>

            {/* Pillar Breakdown with Expandable Checklist */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xs font-extrabold uppercase tracking-wider text-slate-500">
                  Interactive Pillar Checklist (Click to Expand)
                </span>
                <span className="text-3xs text-slate-400">Click checkboxes to toggle</span>
              </div>

              <div className="space-y-2">
                {pillarBreakdowns.map(p => {
                  const isExpanded = expandedPillar === p.name;
                  return (
                    <div
                      key={p.name}
                      className="rounded-lg border border-slate-200 bg-white overflow-hidden transition-colors"
                    >
                      {/* Pillar Header Summary */}
                      <div
                        onClick={() => setExpandedPillar(isExpanded ? null : p.name)}
                        className="p-2.5 hover:bg-slate-50/70 cursor-pointer flex items-center justify-between gap-2"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="font-semibold text-slate-800 text-2xs truncate pr-2">
                              {p.name}
                            </span>
                            <div className="flex items-center gap-1.5 shrink-0 text-3xs font-mono font-medium text-slate-600">
                              <span>Sim: {p.simDone}/{p.totalTools}</span>
                              <span>·</span>
                              <span>Quiz: {p.quizDone}/{p.totalTools}</span>
                              <span className="font-bold text-slate-900 ml-1">{p.pct}%</span>
                            </div>
                          </div>

                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${p.color} transition-all duration-500 rounded-full`}
                              style={{ width: `${p.pct}%` }}
                            />
                          </div>
                        </div>

                        <ChevronDown
                          className={`w-3.5 h-3.5 text-slate-400 transition-transform shrink-0 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </div>

                      {/* Expanded Checklist */}
                      {isExpanded && (
                        <div className="p-2.5 pt-1 border-t border-slate-100 bg-slate-50/50 space-y-1.5 text-xs">
                          <div className="flex items-center justify-between text-3xs text-slate-400 font-semibold px-1 pb-1 border-b border-slate-200/50">
                            <span>Tool</span>
                            <div className="flex items-center gap-4">
                              <span>Simulator</span>
                              <span>Quiz</span>
                            </div>
                          </div>

                          {p.tools.map(tool => {
                            const simDone = isSimulatorDone(tool.id);
                            const quizDone = isQuizDone(tool.id);

                            return (
                              <div
                                key={tool.id}
                                className="flex items-center justify-between p-1.5 rounded-md hover:bg-white transition-colors"
                              >
                                <span
                                  onClick={() => {
                                    onSelectTool(tool.id, 'simulators');
                                    setIsOpen(false);
                                  }}
                                  className="text-2xs font-medium text-slate-800 hover:text-indigo-600 hover:underline cursor-pointer truncate pr-2"
                                >
                                  {tool.shortName}
                                </span>

                                <div className="flex items-center gap-4 shrink-0">
                                  {/* Simulator toggle */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleSimulator(tool.id);
                                    }}
                                    className="p-0.5 text-slate-600 hover:text-emerald-700 cursor-pointer"
                                    title={`Toggle ${tool.shortName} simulator`}
                                  >
                                    {simDone ? (
                                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                    ) : (
                                      <div className="w-4 h-4 rounded border border-slate-300 hover:border-slate-400" />
                                    )}
                                  </button>

                                  {/* Quiz toggle */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleQuiz(tool.id);
                                    }}
                                    className="p-0.5 text-slate-600 hover:text-indigo-700 cursor-pointer"
                                    title={`Toggle ${tool.shortName} quiz`}
                                  >
                                    {quizDone ? (
                                      <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                                    ) : (
                                      <div className="w-4 h-4 rounded border border-slate-300 hover:border-slate-400" />
                                    )}
                                  </button>
                                </div>
                              </div>
                            );
                          })}

                          {/* Quick Pillar Complete Button */}
                          <div className="pt-1.5 flex justify-end">
                            <button
                              onClick={() => markPillar(p.tools.map(t => t.id), 'both')}
                              className="text-3xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                            >
                              Mark All {p.name.split('.')[1] || p.name} Completed ✓
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer / Reset Action */}
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-2xs text-slate-500">
              <span className="text-3xs text-slate-400">
                Persistent across browser sessions
              </span>

              {confirmReset ? (
                <div className="flex items-center gap-1.5">
                  <span className="text-3xs text-rose-600 font-medium">Reset progress?</span>
                  <button
                    onClick={() => {
                      resetProgress();
                      setConfirmReset(false);
                    }}
                    className="px-2 py-0.5 rounded text-3xs font-bold bg-rose-600 text-white hover:bg-rose-700 transition-colors"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setConfirmReset(false)}
                    className="px-2 py-0.5 rounded text-3xs font-semibold bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
                  >
                    No
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmReset(true)}
                  className="flex items-center gap-1 text-3xs text-slate-400 hover:text-rose-600 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
