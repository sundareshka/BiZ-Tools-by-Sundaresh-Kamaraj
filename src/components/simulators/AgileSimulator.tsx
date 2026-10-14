import { useState } from 'react';
import { Layers, CheckCircle2, AlertTriangle, RotateCcw, Sliders, TrendingUp, ArrowRight, Zap, Target, Users, Play } from 'lucide-react';

interface BacklogItem {
  id: string;
  story: string;
  persona: string;
  action: string;
  benefit: string;
  value: number; // 1 to 5
  effort: number; // Fibonacci story points (1, 2, 3, 5, 8, 13)
  risk: 'High' | 'Medium' | 'Low';
  inCurrentSprint: boolean;
  status: 'Backlog' | 'In Progress' | 'Review' | 'Done';
}

const INITIAL_BACKLOG: BacklogItem[] = [
  { id: 'sb-1', story: 'Online Fee Payment via UPI & Webhooks', persona: 'Parent', action: 'pay term tuition instantly via UPI QR code', benefit: 'unblock student admission without standing in a 2-hour counter queue', value: 5, effort: 8, risk: 'High', inCurrentSprint: true, status: 'Done' },
  { id: 'sb-2', story: 'Student PDF Certificate Download with QR', persona: 'Student', action: 'download verified course completion certificate as PDF', benefit: 'attach it to job applications immediately after exam results', value: 4, effort: 5, risk: 'Low', inCurrentSprint: true, status: 'Done' },
  { id: 'sb-3', story: 'Automated SMS & WhatsApp Parent Alert', persona: 'Admin', action: 'send real-time fee receipt acknowledgement to parents', benefit: 'eliminate duplicate enquiry calls to front desk', value: 3, effort: 3, risk: 'Low', inCurrentSprint: true, status: 'In Progress' },
  { id: 'sb-4', story: 'Bulk Student CSV Upload with Column Validation', persona: 'Principal', action: 'upload batch enrollment spreadsheet of 500 students', benefit: 'onboard entire college class in 10 minutes instead of manual data entry', value: 5, effort: 13, risk: 'High', inCurrentSprint: false, status: 'Backlog' },
  { id: 'sb-5', story: 'Automated Exam Hall Ticket Generation', persona: 'Student', action: 'generate digital hall ticket with photo and seat number', benefit: 'access exam venue without physical paper issuance', value: 4, effort: 8, risk: 'Medium', inCurrentSprint: false, status: 'Backlog' },
  { id: 'sb-6', story: 'Dark Mode UI Theme for Mobile Portal', persona: 'Student', action: 'toggle high-contrast dark theme', benefit: 'reduce eye strain during night study sessions', value: 1, effort: 5, risk: 'Low', inCurrentSprint: false, status: 'Backlog' }
];

export function AgileSimulator() {
  const [backlog, setBacklog] = useState<BacklogItem[]>(INITIAL_BACKLOG);
  const [sprintCapacity, setSprintCapacity] = useState<number>(34); // points capacity
  const [currentDay, setCurrentDay] = useState<number>(7); // Day 1 to 10 in sprint

  // Past velocity data for rolling forecast
  const [pastVelocities, setPastVelocities] = useState<number[]>([32, 28, 35, 30]);

  // Calculations
  const sprintItems = backlog.filter(b => b.inCurrentSprint);
  const committedPoints = sprintItems.reduce((acc, b) => acc + b.effort, 0);
  const completedPoints = sprintItems.filter(b => b.status === 'Done').reduce((acc, b) => acc + b.effort, 0);

  const remainingBacklogPoints = backlog.filter(b => !b.inCurrentSprint || b.status !== 'Done').reduce((acc, b) => acc + b.effort, 0);

  // Velocity Stats
  const avgVelocity = pastVelocities.reduce((a, b) => a + b, 0) / pastVelocities.length;
  const minVelocity = Math.min(...pastVelocities);
  const maxVelocity = Math.max(...pastVelocities);

  const expectedSprints = avgVelocity > 0 ? (remainingBacklogPoints / avgVelocity).toFixed(1) : '0';
  const conservativeSprints = minVelocity > 0 ? Math.ceil(remainingBacklogPoints / minVelocity) : 0;
  const optimisticSprints = maxVelocity > 0 ? Math.floor(remainingBacklogPoints / maxVelocity) : 0;

  // Burndown simulation for 10-day sprint
  const burndownData = [
    { day: 1, ideal: committedPoints, actual: committedPoints },
    { day: 3, ideal: Math.round(committedPoints * 0.8), actual: committedPoints - 4 },
    { day: 5, ideal: Math.round(committedPoints * 0.6), actual: committedPoints - 8 },
    { day: 7, ideal: Math.round(committedPoints * 0.4), actual: committedPoints - 16 },
    { day: 9, ideal: Math.round(committedPoints * 0.2), actual: committedPoints - 26 },
    { day: 10, ideal: 0, actual: Math.max(0, committedPoints - completedPoints) }
  ];

  const handleToggleSprintSelection = (id: string) => {
    setBacklog(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, inCurrentSprint: !item.inCurrentSprint };
      }
      return item;
    }));
  };

  const handleUpdateStatus = (id: string, newStatus: 'Backlog' | 'In Progress' | 'Review' | 'Done') => {
    setBacklog(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status: newStatus };
      }
      return item;
    }));
  };

  const handleReset = () => {
    setBacklog(INITIAL_BACKLOG);
    setSprintCapacity(34);
    setCurrentDay(7);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-7 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-3xs font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              Tool 4 Simulator
            </span>
            <span className="text-3xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
              Value vs Effort Matrix & Velocity Forecaster
            </span>
            <span className="text-3xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              Empirical Burndown Engine
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Agile Backlog Prioritization, Sprint Burndown & Range Forecaster
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl">
            Simulate an Agile team delivering value in 2-week iterations. Rank user stories by value and effort, plan iteration capacity, inspect day-by-day sprint burndown, and project delivery dates using rolling velocity ranges.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors self-start lg:self-center"
          title="Reset Backlog"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
          <span className="text-3xs font-bold uppercase tracking-wider text-slate-500 block">Committed / Capacity</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className={`text-2xl font-black font-mono ${committedPoints > sprintCapacity ? 'text-rose-600' : 'text-slate-900'}`}>
              {committedPoints}
            </span>
            <span className="text-xs font-semibold text-slate-500">/ {sprintCapacity} pts</span>
          </div>
          <span className="text-3xs text-slate-400 mt-0.5 block">
            {committedPoints > sprintCapacity ? '⚠ Over-allocated sprint!' : 'Healthy sprint workload'}
          </span>
        </div>

        <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
          <span className="text-3xs font-bold uppercase tracking-wider text-slate-500 block">Sprint Completed</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-emerald-700 font-mono">{completedPoints}</span>
            <span className="text-xs font-semibold text-slate-500">/ {committedPoints} pts</span>
          </div>
          <span className="text-3xs text-slate-400 mt-0.5 block">
            {committedPoints > 0 ? `${((completedPoints / committedPoints) * 100).toFixed(0)}% delivered to DoD` : '0%'}
          </span>
        </div>

        <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
          <span className="text-3xs font-bold uppercase tracking-wider text-slate-500 block">Rolling Velocity</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-indigo-700 font-mono">{avgVelocity.toFixed(1)}</span>
            <span className="text-xs font-semibold text-slate-500">pts/sprint</span>
          </div>
          <span className="text-3xs text-slate-400 mt-0.5 block">Past 4: {pastVelocities.join(', ')} pts</span>
        </div>

        <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
          <span className="text-3xs font-bold uppercase tracking-wider text-slate-500 block">Range Forecast (Remaining)</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl font-black text-slate-900 font-mono">
              {optimisticSprints}–{conservativeSprints}
            </span>
            <span className="text-xs font-semibold text-slate-500">sprints</span>
          </div>
          <span className="text-3xs text-slate-400 mt-0.5 block">
            ({optimisticSprints * 2}–{conservativeSprints * 2} wks for {remainingBacklogPoints} pts)
          </span>
        </div>
      </div>

      {/* Prioritized Product Backlog Matrix */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
        <div className="p-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-700">
          <span className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>Product Backlog: Value, Effort & Acceptance Ordering</span>
          </span>
          <span className="text-3xs font-mono text-slate-500">
            ROI Score = Value (1-5) ÷ Effort Points
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-3xs font-bold uppercase text-slate-500">
              <tr>
                <th className="py-2.5 px-3">Sprint Commit</th>
                <th className="py-2.5 px-3">User Story ("As a... I want... so that...")</th>
                <th className="py-2.5 px-2 text-center text-emerald-800">Value (1-5)</th>
                <th className="py-2.5 px-2 text-center text-blue-900">Effort (Pts)</th>
                <th className="py-2.5 px-2 text-center">Risk</th>
                <th className="py-2.5 px-2 text-center">ROI Ratio</th>
                <th className="py-2.5 px-3 text-right">Workflow State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {backlog.map(item => {
                const roiRatio = (item.value / item.effort).toFixed(2);
                const isQuickWin = item.value >= 4 && item.effort <= 5;

                return (
                  <tr key={item.id} className={`hover:bg-slate-50 ${item.inCurrentSprint ? 'bg-emerald-50/30' : ''}`}>
                    <td className="py-2.5 px-3">
                      <input
                        type="checkbox"
                        checked={item.inCurrentSprint}
                        onChange={() => handleToggleSprintSelection(item.id)}
                        className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                      />
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-900 block">{item.story}</span>
                        <p className="text-3xs text-slate-500 italic">
                          "As a <strong>{item.persona}</strong>, I want to <strong>{item.action}</strong> so that <strong>{item.benefit}</strong>."
                        </p>
                      </div>
                    </td>
                    <td className="py-2.5 px-2 text-center font-bold text-emerald-700">★ {item.value}</td>
                    <td className="py-2.5 px-2 text-center font-mono font-bold text-blue-900">{item.effort} pts</td>
                    <td className="py-2.5 px-2 text-center">
                      <span className={`text-3xs font-semibold px-1.5 py-0.5 rounded ${
                        item.risk === 'High' ? 'bg-rose-100 text-rose-800' : item.risk === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {item.risk}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-center font-mono text-2xs">
                      <span className={`font-bold ${isQuickWin ? 'text-emerald-700 bg-emerald-100 px-1 py-0.2 rounded' : 'text-slate-600'}`}>
                        {roiRatio}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <select
                        value={item.status}
                        onChange={(e) => handleUpdateStatus(item.id, e.target.value as any)}
                        className={`text-3xs font-bold rounded px-2 py-1 border outline-none cursor-pointer ${
                          item.status === 'Done'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : item.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-800 border-blue-300'
                            : item.status === 'Review'
                            ? 'bg-amber-100 text-amber-800 border-amber-300'
                            : 'bg-slate-100 text-slate-700 border-slate-300'
                        }`}
                      >
                        <option value="Backlog">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Review">In Review</option>
                        <option value="Done">Done (DoD)</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sprint Burndown Simulator */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-700" />
              <span>Sprint Burndown Progress (Day 1 to 10)</span>
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Inspect remaining story points against ideal straight-line burndown. Notice plateaus indicating team blockers.
            </p>
          </div>
          <span className="text-2xs font-mono font-bold bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-700">
            Current: Day {currentDay} of 10
          </span>
        </div>

        {/* Burndown Bar Representation */}
        <div className="grid grid-cols-6 gap-2">
          {burndownData.map(b => (
            <div key={b.day} className="bg-white p-2.5 rounded-lg border border-slate-200 text-center space-y-1">
              <span className="text-3xs font-mono font-bold text-slate-400 block">Day {b.day}</span>
              <div className="text-base font-black font-mono text-slate-900">{b.actual} pts</div>
              <div className="text-3xs text-slate-400 font-mono">Ideal: {b.ideal} pts</div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
                <div
                  className="bg-emerald-500 h-full"
                  style={{ width: `${committedPoints > 0 ? (b.actual / committedPoints) * 100 : 0}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
