import { useState } from 'react';
import { Network, Zap, DollarSign, Clock, AlertTriangle, CheckCircle2, RotateCcw, Sliders, ArrowRight, ShieldCheck, Flame } from 'lucide-react';

interface CPMActivity {
  id: string;
  name: string;
  duration: number;
  normalDuration: number;
  crashLimit: number; // minimum days it can be reduced to
  crashCostPerDay: number; // ₹ per day
  predecessors: string[];
  successors: string[];
  isCrashed: boolean;
  crashedDays: number;
}

const DEFAULT_ACTIVITIES: CPMActivity[] = [
  { id: 'A', name: 'Approve Budget & Scope', duration: 2, normalDuration: 2, crashLimit: 2, crashCostPerDay: 0, predecessors: [], successors: ['B', 'C'], isCrashed: false, crashedDays: 0 },
  { id: 'B', name: 'Hire Master Trainer', duration: 5, normalDuration: 5, crashLimit: 4, crashCostPerDay: 15000, predecessors: ['A'], successors: ['D'], isCrashed: false, crashedDays: 0 },
  { id: 'C', name: 'Book Venue & Auditorium', duration: 3, normalDuration: 3, crashLimit: 2, crashCostPerDay: 8000, predecessors: ['A'], successors: ['E'], isCrashed: false, crashedDays: 0 },
  { id: 'D', name: 'Prepare Training Courseware', duration: 6, normalDuration: 6, crashLimit: 4, crashCostPerDay: 10000, predecessors: ['B'], successors: ['F'], isCrashed: false, crashedDays: 0 },
  { id: 'E', name: 'Invite Institutional Participants', duration: 4, normalDuration: 4, crashLimit: 2, crashCostPerDay: 5000, predecessors: ['C'], successors: ['G'], isCrashed: false, crashedDays: 0 },
  { id: 'F', name: 'Print Participant Workbooks', duration: 2, normalDuration: 2, crashLimit: 1, crashCostPerDay: 6000, predecessors: ['D'], successors: ['H'], isCrashed: false, crashedDays: 0 },
  { id: 'G', name: 'Logistics, AV & Catering Booking', duration: 2, normalDuration: 2, crashLimit: 1, crashCostPerDay: 7000, predecessors: ['E'], successors: ['H'], isCrashed: false, crashedDays: 0 },
  { id: 'H', name: 'Deliver Corporate Workshop', duration: 1, normalDuration: 1, crashLimit: 1, crashCostPerDay: 0, predecessors: ['F', 'G'], successors: [], isCrashed: false, crashedDays: 0 }
];

export function CPMSimulator() {
  const [activities, setActivities] = useState<CPMActivity[]>(DEFAULT_ACTIVITIES);
  const [totalSpentOnCrashing, setTotalSpentOnCrashing] = useState<number>(0);

  // Compute CPM Forward and Backward passes dynamically
  const runCPMMath = (acts: CPMActivity[]) => {
    const actMap = new Map<string, { es: number; ef: number; ls: number; lf: number; float: number; freeFloat: number }>();

    // Initialize map
    acts.forEach(a => {
      actMap.set(a.id, { es: 0, ef: 0, ls: 0, lf: 0, float: 0, freeFloat: 0 });
    });

    // Forward pass
    // Process in topological order (A -> B,C -> D,E -> F,G -> H)
    const order = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    let projectDuration = 0;

    for (const id of order) {
      const act = acts.find(a => a.id === id)!;
      let es = 0;
      if (act.predecessors.length > 0) {
        es = Math.max(...act.predecessors.map(pid => actMap.get(pid)!.ef));
      }
      const ef = es + act.duration;
      actMap.get(id)!.es = es;
      actMap.get(id)!.ef = ef;
      if (ef > projectDuration) {
        projectDuration = ef;
      }
    }

    // Backward pass
    for (let i = order.length - 1; i >= 0; i--) {
      const id = order[i];
      const act = acts.find(a => a.id === id)!;
      let lf = projectDuration;
      if (act.successors.length > 0) {
        lf = Math.min(...act.successors.map(sid => actMap.get(sid)!.ls));
      }
      const ls = lf - act.duration;
      const totalFloat = ls - actMap.get(id)!.es;

      // Free Float: min(ES of successors) - EF
      let freeFloat = totalFloat;
      if (act.successors.length > 0) {
        const minSuccES = Math.min(...act.successors.map(sid => actMap.get(sid)!.es));
        freeFloat = minSuccES - actMap.get(id)!.ef;
      }

      const entry = actMap.get(id)!;
      entry.lf = lf;
      entry.ls = ls;
      entry.float = totalFloat;
      entry.freeFloat = Math.max(0, freeFloat);
    }

    return { actMap, projectDuration };
  };

  const { actMap, projectDuration } = runCPMMath(activities);

  // Identify critical path tasks
  const criticalPathTasks = activities.filter(a => actMap.get(a.id)!.float === 0).map(a => a.id);

  // Crashing handler
  const handleCrashActivity = (actId: string) => {
    const act = activities.find(a => a.id === actId);
    if (!act || act.duration <= act.crashLimit) return;

    setActivities(prev => prev.map(a => {
      if (a.id === actId) {
        return {
          ...a,
          duration: a.duration - 1,
          crashedDays: a.crashedDays + 1,
          isCrashed: true
        };
      }
      return a;
    }));
    setTotalSpentOnCrashing(prev => prev + act.crashCostPerDay);
  };

  const handleResetSchedule = () => {
    setActivities(DEFAULT_ACTIVITIES);
    setTotalSpentOnCrashing(0);
  };

  const handleApplyExerciseScenario = () => {
    // Guide Hand-on exercise: Change duration of E from 4 to 9 days
    setActivities(prev => prev.map(a => {
      if (a.id === 'E') return { ...a, duration: 9, normalDuration: 9 };
      return a;
    }));
    setTotalSpentOnCrashing(0);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-7 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-3xs font-black uppercase tracking-wider px-2 py-0.5 rounded bg-rose-100 text-rose-800">
              Tool 2 Simulator
            </span>
            <span className="text-3xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
              Forward/Backward Pass & Float Engine
            </span>
            <span className="text-3xs font-semibold px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200">
              Critical Path: {criticalPathTasks.join(' → ')}
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Critical Path Method (CPM) & Schedule Compression Calculator
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl">
            Compute Early Start (ES), Early Finish (EF), Late Start (LS), Late Finish (LF), and Total Float in real time using the 8-activity project network from the guide. Test crashing critical tasks to observe when parallel paths turn critical.
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleApplyExerciseScenario}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-900 border border-indigo-200 hover:bg-indigo-100 transition-colors"
          >
            Exercise: E (Invitations) = 9 Days
          </button>
          <button
            onClick={handleResetSchedule}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
            title="Reset to Normal Schedule"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
          <span className="text-3xs font-bold uppercase tracking-wider text-slate-500 block">Project Duration</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-rose-700 font-mono">{projectDuration}</span>
            <span className="text-xs font-semibold text-slate-500">working days</span>
          </div>
          <span className="text-3xs text-slate-400 mt-0.5 block">Determined by Critical Path</span>
        </div>

        <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
          <span className="text-3xs font-bold uppercase tracking-wider text-slate-500 block">Active Critical Path</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-lg font-black text-rose-900 font-mono tracking-tight">
              {criticalPathTasks.join(' → ')}
            </span>
          </div>
          <span className="text-3xs text-rose-600 font-semibold mt-0.5 block">{criticalPathTasks.length} zero-float tasks</span>
        </div>

        <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
          <span className="text-3xs font-bold uppercase tracking-wider text-slate-500 block">Crashing Spend</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-slate-900 font-mono">₹{totalSpentOnCrashing.toLocaleString()}</span>
          </div>
          <span className="text-3xs text-slate-400 mt-0.5 block">Invested in schedule recovery</span>
        </div>

        <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
          <span className="text-3xs font-bold uppercase tracking-wider text-slate-500 block">Total Days Saved</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-emerald-700 font-mono">
              {16 - projectDuration > 0 ? `+${16 - projectDuration}` : (projectDuration > 16 ? `-${projectDuration - 16}` : '0')}
            </span>
            <span className="text-xs font-semibold text-slate-500">vs baseline (16d)</span>
          </div>
          <span className="text-3xs text-slate-400 mt-0.5 block">Schedule compression delta</span>
        </div>
      </div>

      {/* Interactive Network Precedence Table */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
        <div className="p-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-700">
          <span className="flex items-center gap-2">
            <Network className="w-4 h-4 text-rose-600" />
            <span>CPM Activity Schedule Matrix (Day-0 Convention)</span>
          </span>
          <span className="text-3xs font-mono bg-rose-50 text-rose-800 px-2 py-0.5 rounded border border-rose-200 font-semibold">
            Zero Float (Float = 0) = Critical Task
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-3xs font-bold uppercase text-slate-500">
              <tr>
                <th className="py-2.5 px-3">Act ID</th>
                <th className="py-2.5 px-3">Description</th>
                <th className="py-2.5 px-2 text-center">Dur</th>
                <th className="py-2.5 px-2 text-center">Pred</th>
                <th className="py-2.5 px-2 text-center bg-blue-50/60 text-blue-900">ES</th>
                <th className="py-2.5 px-2 text-center bg-blue-50/60 text-blue-900">EF</th>
                <th className="py-2.5 px-2 text-center bg-amber-50/60 text-amber-900">LS</th>
                <th className="py-2.5 px-2 text-center bg-amber-50/60 text-amber-900">LF</th>
                <th className="py-2.5 px-2 text-center font-black">Float</th>
                <th className="py-2.5 px-2 text-center">Free Float</th>
                <th className="py-2.5 px-3 text-right">Crashing Option</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {activities.map(act => {
                const math = actMap.get(act.id)!;
                const isCritical = math.float === 0;
                const canCrash = act.duration > act.crashLimit;

                return (
                  <tr
                    key={act.id}
                    className={`transition-colors ${
                      isCritical ? 'bg-rose-50/50 hover:bg-rose-50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-2.5 px-3 font-bold text-slate-900">
                      <span className="flex items-center gap-1.5">
                        {isCritical && <Flame className="w-3.5 h-3.5 text-rose-600 shrink-0" />}
                        <span>{act.id}</span>
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-sans font-semibold text-slate-800">
                      {act.name}
                      {act.crashedDays > 0 && (
                        <span className="ml-2 text-3xs font-mono font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                          Crashed -{act.crashedDays}d
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-2 text-center font-bold text-slate-900">{act.duration}d</td>
                    <td className="py-2.5 px-2 text-center text-slate-500 font-sans">{act.predecessors.join(', ') || '—'}</td>
                    <td className="py-2.5 px-2 text-center bg-blue-50/40 text-blue-800 font-bold">{math.es}</td>
                    <td className="py-2.5 px-2 text-center bg-blue-50/40 text-blue-800 font-bold">{math.ef}</td>
                    <td className="py-2.5 px-2 text-center bg-amber-50/40 text-amber-900 font-bold">{math.ls}</td>
                    <td className="py-2.5 px-2 text-center bg-amber-50/40 text-amber-900 font-bold">{math.lf}</td>
                    <td className="py-2.5 px-2 text-center font-black">
                      <span className={`px-2 py-0.5 rounded text-2xs ${
                        isCritical ? 'bg-rose-600 text-white font-extrabold shadow-2xs' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {math.float}d
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-center text-slate-600 text-2xs">{math.freeFloat}d</td>
                    <td className="py-2.5 px-3 text-right font-sans">
                      {canCrash ? (
                        <button
                          onClick={() => handleCrashActivity(act.id)}
                          className={`px-2 py-1 text-3xs font-bold rounded transition-all ${
                            isCritical
                              ? 'bg-rose-600 text-white hover:bg-rose-700 shadow-2xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                          title={`Crash 1 day for ₹${act.crashCostPerDay.toLocaleString()}`}
                        >
                          Crash -1d (₹{(act.crashCostPerDay / 1000).toFixed(0)}k)
                        </button>
                      ) : act.crashLimit < act.normalDuration ? (
                        <span className="text-3xs text-slate-400 font-semibold">Max Crashed</span>
                      ) : (
                        <span className="text-3xs text-slate-300 font-mono">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Crashing & Optimization Insight Panel */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-600" />
          <h4 className="text-sm font-bold text-slate-900">
            Schedule Compression & Crashing Economics (Example 3 from Training Guide)
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-800">1. Crash F (Print Materials)</span>
              <span className="text-3xs font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                ₹6,000 / day
              </span>
            </div>
            <p className="text-slate-500 text-2xs">Cheapest critical activity. Reduces duration from 2 days to 1 day for ₹6,000 total.</p>
          </div>

          <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-800">2. Crash D (Prepare Materials)</span>
              <span className="text-3xs font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                ₹10,000 / day
              </span>
            </div>
            <p className="text-slate-500 text-2xs">Second cheapest. Can be crashed by up to 2 days (from 6d to 4d) for ₹20,000.</p>
          </div>

          <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-800">3. Crash B (Hire Trainer)</span>
              <span className="text-3xs font-mono font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                ₹15,000 / day
              </span>
            </div>
            <p className="text-slate-500 text-2xs">Most expensive critical activity. Crash only after F and D have hit their limits.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
