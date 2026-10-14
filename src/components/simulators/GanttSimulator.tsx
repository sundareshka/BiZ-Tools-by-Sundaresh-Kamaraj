import { useState } from 'react';
import { Calendar, Clock, AlertTriangle, CheckCircle2, RotateCcw, Sliders, Layers, ArrowRight, ShieldCheck, Flag, Users } from 'lucide-react';

interface GanttTask {
  id: string;
  wbs: string;
  name: string;
  duration: number; // working days
  startDay: number;
  progress: number; // 0 to 100
  owner: string;
  isMilestone: boolean;
  predecessors: string[];
  lag: number;
  baselineStart: number;
  baselineDuration: number;
  category: 'Procurement' | 'Civil' | 'Installation' | 'Quality' | 'Approval';
}

const INITIAL_TASKS: GanttTask[] = [
  { id: 't1', wbs: '1.1', name: 'Contract Signing & PO Release', duration: 0, startDay: 1, progress: 100, owner: 'Sundaresh (MD)', isMilestone: true, predecessors: [], lag: 0, baselineStart: 1, baselineDuration: 0, category: 'Procurement' },
  { id: 't2', wbs: '1.2', name: 'CNC Machine Import Order', duration: 15, startDay: 1, progress: 100, owner: 'Karthik (Procurement)', isMilestone: false, predecessors: ['t1'], lag: 0, baselineStart: 1, baselineDuration: 15, category: 'Procurement' },
  { id: 't3', wbs: '2.1', name: 'Excavation & Machine Foundation', duration: 10, startDay: 2, progress: 100, owner: 'Ramesh (Civil Contractor)', isMilestone: false, predecessors: ['t1'], lag: 0, baselineStart: 2, baselineDuration: 10, category: 'Civil' },
  { id: 't4', wbs: '2.2', name: 'Concrete Curing (Mandatory Lag)', duration: 14, startDay: 12, progress: 100, owner: 'Ramesh (Civil Contractor)', isMilestone: false, predecessors: ['t3'], lag: 0, baselineStart: 12, baselineDuration: 14, category: 'Civil' },
  { id: 't5', wbs: '2.3', name: 'HT Power Sanction & Substation Line', duration: 25, startDay: 2, progress: 85, owner: 'Murugan (Utilities Lead)', isMilestone: false, predecessors: ['t1'], lag: 0, baselineStart: 2, baselineDuration: 25, category: 'Civil' },
  { id: 't6', wbs: '1.3', name: 'Customs Clearance at Tuticorin Port', duration: 8, startDay: 16, progress: 90, owner: 'Karthik (Procurement)', isMilestone: false, predecessors: ['t2'], lag: 0, baselineStart: 16, baselineDuration: 8, category: 'Procurement' },
  { id: 't7', wbs: '3.1', name: 'CNC Machine Factory Floor Rigging', duration: 6, startDay: 26, progress: 40, owner: 'Venkatesh (Plant Head)', isMilestone: false, predecessors: ['t4', 't6'], lag: 0, baselineStart: 26, baselineDuration: 6, category: 'Installation' },
  { id: 't8', wbs: '3.2', name: 'Precision Leveling & Power Hookup', duration: 5, startDay: 32, progress: 0, owner: 'Venkatesh (Plant Head)', isMilestone: false, predecessors: ['t5', 't7'], lag: 0, baselineStart: 32, baselineDuration: 5, category: 'Installation' },
  { id: 't9', wbs: '4.1', name: 'Tooling Setup & Trial Batch Run', duration: 12, startDay: 37, progress: 0, owner: 'Anitha (Quality Head)', isMilestone: false, predecessors: ['t8'], lag: 0, baselineStart: 37, baselineDuration: 12, category: 'Quality' },
  { id: 't10', wbs: '4.2', name: 'First Article CMM Inspection & PPAP', duration: 10, startDay: 49, progress: 0, owner: 'Anitha (Quality Head)', isMilestone: false, predecessors: ['t9'], lag: 0, baselineStart: 49, baselineDuration: 10, category: 'Quality' },
  { id: 't11', wbs: '5.1', name: 'Tier-1 Customer PPAP Sign-off', duration: 0, startDay: 59, progress: 0, owner: 'Sundaresh (MD)', isMilestone: true, predecessors: ['t10'], lag: 0, baselineStart: 59, baselineDuration: 0, category: 'Approval' }
];

export function GanttSimulator() {
  const [tasks, setTasks] = useState<GanttTask[]>(INITIAL_TASKS);
  const [showBaseline, setShowBaseline] = useState<boolean>(true);
  const [highlightSlippage, setHighlightSlippage] = useState<boolean>(true);
  const [selectedTaskId, setSelectedTaskId] = useState<string>('t5');
  const [fastTrackMode, setFastTrackMode] = useState<boolean>(false);

  // Recalculate schedule dates dynamically
  const calculateSchedule = (currentTasks: GanttTask[]) => {
    const updated = [...currentTasks];
    const taskMap = new Map(updated.map(t => [t.id, t]));

    // Multiple forward passes to resolve dependencies
    for (let iteration = 0; iteration < 4; iteration++) {
      for (const task of updated) {
        if (task.predecessors.length > 0) {
          let earliestAllowed = 1;
          for (const predId of task.predecessors) {
            const pred = taskMap.get(predId);
            if (pred) {
              const predFinish = pred.startDay + pred.duration;
              const linkFinish = predFinish + (task.lag || 0);
              if (linkFinish > earliestAllowed) {
                earliestAllowed = linkFinish;
              }
            }
          }
          task.startDay = earliestAllowed;
        }
      }
    }
    return updated;
  };

  const currentTasks = calculateSchedule(tasks);
  const selectedTask = currentTasks.find(t => t.id === selectedTaskId) || currentTasks[0];

  const totalDays = Math.max(...currentTasks.map(t => t.startDay + t.duration));
  const baselineDays = Math.max(...currentTasks.map(t => t.baselineStart + t.baselineDuration));
  const varianceDays = totalDays - baselineDays;

  // Handle task modification
  const handleUpdateDuration = (taskId: string, newDuration: number) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, duration: Math.max(t.isMilestone ? 0 : 1, newDuration) } : t));
  };

  const handleUpdateLag = (taskId: string, newLag: number) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, lag: newLag } : t));
  };

  const handleUpdateProgress = (taskId: string, newProgress: number) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, progress: newProgress } : t));
  };

  const handleResetToBaseline = () => {
    setTasks(INITIAL_TASKS);
    setFastTrackMode(false);
  };

  const handleApplyFastTrack = () => {
    // Fast track: run power sanction concurrently and cut curing to 10 days with accelerated additive
    setTasks(prev => prev.map(t => {
      if (t.id === 't4') return { ...t, duration: 10 }; // 10 days curing with rapid set additive
      if (t.id === 't9') return { ...t, duration: 8 }; // pre-trial runs parallel
      return t;
    }));
    setFastTrackMode(true);
  };

  const handleSimulateDelay = (days: number) => {
    setTasks(prev => prev.map(t => {
      if (t.id === 't5') {
        // HT Power Sanction delayed
        return { ...t, duration: t.duration + days };
      }
      return t;
    }));
  };

  // Day columns (up to max days with buffer)
  const maxViewDays = Math.max(65, totalDays + 5);
  const dayMarkers = [1, 10, 20, 30, 40, 50, 60, maxViewDays];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-7 space-y-6">
      {/* Header & Badges */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-3xs font-black uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">
              Tool 1 Simulator
            </span>
            <span className="text-3xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
              Interactive WBS & Time-Scaled Bar Chart
            </span>
            <span className="text-3xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              Live Auto-Ripple Engine
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Interactive Gantt Schedule & Baseline Variance Simulator
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl">
            Simulate the 20-week CNC machinery expansion at <strong>Meenakshi Precision Tools</strong>. Adjust task durations, lags, and progress to observe how predecessor dependencies automatically ripple across the timeline.
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowBaseline(!showBaseline)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
              showBaseline ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {showBaseline ? 'Hide Baseline' : 'Show Baseline'}
          </button>
          <button
            onClick={fastTrackMode ? handleResetToBaseline : handleApplyFastTrack}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
              fastTrackMode ? 'bg-amber-600 text-white border-amber-600' : 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
            }`}
          >
            {fastTrackMode ? 'Reset Fast-Track' : 'Fast-Track Civil & Curing'}
          </button>
          <button
            onClick={handleResetToBaseline}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
            title="Reset to Baseline"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
          <span className="text-3xs font-bold uppercase tracking-wider text-slate-500 block">Baseline Finish</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-slate-800 font-mono">Day {baselineDays}</span>
            <span className="text-xs text-slate-500">(Wk {Math.ceil(baselineDays / 5)})</span>
          </div>
          <span className="text-3xs text-slate-400 mt-0.5 block">Approved contractual plan</span>
        </div>

        <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
          <span className="text-3xs font-bold uppercase tracking-wider text-slate-500 block">Current Forecast Finish</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className={`text-2xl font-black font-mono ${varianceDays > 0 ? 'text-rose-600' : 'text-emerald-700'}`}>
              Day {totalDays}
            </span>
            <span className="text-xs text-slate-500">(Wk {Math.ceil(totalDays / 5)})</span>
          </div>
          <span className="text-3xs text-slate-400 mt-0.5 block">Dynamic end date</span>
        </div>

        <div className={`p-3.5 rounded-xl border ${varianceDays > 0 ? 'bg-rose-50 border-rose-200 text-rose-900' : 'bg-emerald-50 border-emerald-200 text-emerald-900'}`}>
          <span className="text-3xs font-bold uppercase tracking-wider block opacity-75">Schedule Slippage</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black font-mono">
              {varianceDays > 0 ? `+${varianceDays}` : varianceDays}
            </span>
            <span className="text-xs font-semibold">working days</span>
          </div>
          <span className="text-3xs mt-0.5 block opacity-80">
            {varianceDays > 0 ? `Penalty risk: ₹${(Math.ceil(varianceDays / 5) * 2).toFixed(1)}L` : 'On or ahead of schedule'}
          </span>
        </div>

        <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
          <span className="text-3xs font-bold uppercase tracking-wider text-slate-500 block">Milestones Completed</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-slate-800 font-mono">1 / 2</span>
            <span className="text-xs text-slate-500">(50%)</span>
          </div>
          <span className="text-3xs text-slate-400 mt-0.5 block">PPAP sign-off pending</span>
        </div>
      </div>

      {/* Main Gantt Canvas */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
        <div className="p-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-700">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-600" />
            <span>Interactive Timeline View (Days 1 to {maxViewDays})</span>
          </span>
          <div className="flex items-center gap-3 text-3xs font-medium text-slate-600">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-blue-600 inline-block"></span> Current Task
            </span>
            {showBaseline && (
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-1.5 rounded-xs bg-slate-400 inline-block"></span> Baseline Bar
              </span>
            )}
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rotate-45 bg-amber-500 inline-block"></span> Milestone
            </span>
          </div>
        </div>

        {/* Timeline Header scale */}
        <div className="grid grid-cols-12 bg-slate-50 border-b border-slate-200 text-3xs font-mono font-semibold text-slate-500 px-3 py-1.5">
          <div className="col-span-5 sm:col-span-4">WBS & Task Description</div>
          <div className="col-span-7 sm:col-span-8 flex justify-between pr-2">
            {dayMarkers.map(d => (
              <span key={d}>Day {d}</span>
            ))}
          </div>
        </div>

        {/* Task Rows */}
        <div className="divide-y divide-slate-100 overflow-x-auto">
          {currentTasks.map(task => {
            const isSelected = task.id === selectedTaskId;
            const startPct = ((task.startDay - 1) / maxViewDays) * 100;
            const widthPct = Math.max(1.5, (task.duration / maxViewDays) * 100);

            const baseStartPct = ((task.baselineStart - 1) / maxViewDays) * 100;
            const baseWidthPct = Math.max(1.5, (task.baselineDuration / maxViewDays) * 100);

            const isDelayed = task.startDay + task.duration > task.baselineStart + task.baselineDuration;

            return (
              <div
                key={task.id}
                onClick={() => setSelectedTaskId(task.id)}
                className={`grid grid-cols-12 items-center px-3 py-2 text-xs transition-colors cursor-pointer ${
                  isSelected ? 'bg-blue-50/70' : 'hover:bg-slate-50/70'
                }`}
              >
                {/* Task Details Info Column */}
                <div className="col-span-5 sm:col-span-4 pr-3 flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="font-mono text-3xs font-bold text-slate-400 shrink-0">{task.wbs}</span>
                    <span className={`truncate font-semibold ${task.isMilestone ? 'text-slate-900 font-bold' : 'text-slate-800'}`}>
                      {task.name}
                    </span>
                  </div>
                  <span className="text-3xs font-mono text-slate-400 shrink-0 hidden md:inline">
                    {task.isMilestone ? '0d' : `${task.duration}d`}
                  </span>
                </div>

                {/* Task Bar Column */}
                <div className="col-span-7 sm:col-span-8 relative h-7 flex items-center">
                  {/* Subtle vertical day gridlines */}
                  <div className="absolute inset-0 grid grid-cols-6 pointer-events-none opacity-20">
                    <div className="border-r border-slate-300 h-full"></div>
                    <div className="border-r border-slate-300 h-full"></div>
                    <div className="border-r border-slate-300 h-full"></div>
                    <div className="border-r border-slate-300 h-full"></div>
                    <div className="border-r border-slate-300 h-full"></div>
                    <div className="h-full"></div>
                  </div>

                  {/* Baseline shadow bar (optional) */}
                  {showBaseline && !task.isMilestone && (
                    <div
                      className="absolute h-1.5 bg-slate-300 rounded-xs top-1 pointer-events-none"
                      style={{ left: `${baseStartPct}%`, width: `${baseWidthPct}%` }}
                      title={`Baseline: Day ${task.baselineStart} - ${task.baselineStart + task.baselineDuration}`}
                    />
                  )}

                  {/* Milestone Marker */}
                  {task.isMilestone ? (
                    <div
                      className="absolute z-10 -ml-2 flex items-center justify-center cursor-pointer group"
                      style={{ left: `${startPct}%` }}
                    >
                      <div className={`w-3.5 h-3.5 rotate-45 border-2 ${task.progress === 100 ? 'bg-emerald-500 border-emerald-700' : 'bg-amber-500 border-amber-700'} shadow-xs`}></div>
                      <span className="absolute -top-5 text-3xs font-bold text-slate-600 bg-white px-1 py-0.2 rounded border border-slate-200 shadow-2xs whitespace-nowrap hidden group-hover:block">
                        Day {task.startDay}
                      </span>
                    </div>
                  ) : (
                    /* Active Task Bar */
                    <div
                      className={`absolute h-4.5 rounded-md shadow-2xs transition-all flex items-center justify-between px-1.5 overflow-hidden text-3xs font-bold text-white ${
                        isDelayed && highlightSlippage
                          ? 'bg-rose-600'
                          : task.progress === 100
                          ? 'bg-emerald-600'
                          : isSelected
                          ? 'bg-blue-600 ring-2 ring-blue-400'
                          : 'bg-blue-700'
                      }`}
                      style={{ left: `${startPct}%`, width: `${widthPct}%` }}
                    >
                      {/* Percent Complete Shading */}
                      <div
                        className="absolute inset-y-0 left-0 bg-white/20 transition-all pointer-events-none"
                        style={{ width: `${task.progress}%` }}
                      />
                      <span className="relative z-10 truncate text-3xs font-mono hidden sm:inline">
                        {task.progress}%
                      </span>
                      <span className="relative z-10 text-3xs font-mono ml-auto">
                        d{task.startDay + task.duration}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Task Inspection & Interactive Editor */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-600" />
            <h4 className="text-sm font-bold text-slate-900">
              Task Inspector: <span className="text-blue-700">{selectedTask.wbs} {selectedTask.name}</span>
            </h4>
          </div>
          <span className="text-2xs bg-white px-2 py-0.5 rounded border border-slate-200 font-medium text-slate-600">
            Owner: <strong>{selectedTask.owner}</strong> · Category: <strong>{selectedTask.category}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Duration Slider */}
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Task Duration:</span>
              <span className="font-mono text-blue-700 font-bold">{selectedTask.duration} working days</span>
            </div>
            <input
              type="range"
              min={selectedTask.isMilestone ? 0 : 1}
              max={35}
              disabled={selectedTask.isMilestone}
              value={selectedTask.duration}
              onChange={(e) => handleUpdateDuration(selectedTask.id, parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <span className="text-3xs text-slate-400 mt-1 block">
              Baseline: {selectedTask.baselineDuration} days
            </span>
          </div>

          {/* Progress Slider */}
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Percent Complete:</span>
              <span className="font-mono text-emerald-700 font-bold">{selectedTask.progress}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={selectedTask.progress}
              onChange={(e) => handleUpdateProgress(selectedTask.id, parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <span className="text-3xs text-slate-400 mt-1 block">
              Shading indicates work delivered
            </span>
          </div>

          {/* Dependency Lag Slider */}
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Predecessor Lag:</span>
              <span className="font-mono text-amber-700 font-bold">+{selectedTask.lag} days</span>
            </div>
            <input
              type="range"
              min={0}
              max={14}
              value={selectedTask.lag}
              onChange={(e) => handleUpdateLag(selectedTask.id, parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
            <span className="text-3xs text-slate-400 mt-1 block">
              Adds waiting time (curing/shipping)
            </span>
          </div>
        </div>

        {/* Quick Stress Test Buttons */}
        <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between flex-wrap gap-2 text-xs">
          <span className="text-slate-500 font-medium">Quick Scenario Injections:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSimulateDelay(5)}
              className="px-2.5 py-1 text-2xs font-semibold rounded bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100 transition-colors"
            >
              +5 Day Power Sanction Delay
            </button>
            <button
              onClick={() => handleUpdateDuration('t6', 15)}
              className="px-2.5 py-1 text-2xs font-semibold rounded bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100 transition-colors"
            >
              Customs Hold (+7 Days)
            </button>
            <button
              onClick={() => handleUpdateProgress('t10', 100)}
              className="px-2.5 py-1 text-2xs font-semibold rounded bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
            >
              Complete PPAP Inspection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
