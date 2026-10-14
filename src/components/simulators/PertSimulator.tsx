import { useState } from 'react';
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle2, RotateCcw, Sliders, ShieldCheck, Scale, Zap, Info } from 'lucide-react';

interface PertActivity {
  id: string;
  name: string;
  optimistic: number; // O
  mostLikely: number; // M
  pessimistic: number; // P
  rationale: string;
  isCritical: boolean;
}

const DEFAULT_PERT_ACTIVITIES: PertActivity[] = [
  { id: 'act-1', name: 'Requirements & Client Sign-off', optimistic: 2, mostLikely: 3, pessimistic: 6, rationale: 'Standard client workshops; P reflects stakeholder debate', isCritical: true },
  { id: 'act-2', name: 'System Architecture & UI Design', optimistic: 4, mostLikely: 6, pessimistic: 11, rationale: 'Figma prototypes; P reflects client brand revisions', isCritical: true },
  { id: 'act-3', name: 'Core Engine Coding & API Build', optimistic: 6, mostLikely: 9, pessimistic: 18, rationale: 'High technical risk; P reflects database latency & concurrency issues', isCritical: true },
  { id: 'act-4', name: 'Integration & Security Regression Testing', optimistic: 2, mostLikely: 4, pessimistic: 9, rationale: 'Penetration testing; P reflects third-party bank certification loop', isCritical: true }
];

export function PertSimulator() {
  const [activities, setActivities] = useState<PertActivity[]>(DEFAULT_PERT_ACTIVITIES);
  const [targetDeadline, setTargetDeadline] = useState<number>(27);

  // Compute individual task PERT metrics
  const calculatedActivities = activities.map(act => {
    const o = Math.max(0.1, act.optimistic);
    const m = Math.max(o, act.mostLikely);
    const p = Math.max(m, act.pessimistic);

    const te = (o + 4 * m + p) / 6;
    const sd = (p - o) / 6;
    const variance = Math.pow(sd, 2);

    return {
      ...act,
      optimistic: o,
      mostLikely: m,
      pessimistic: p,
      te,
      sd,
      variance
    };
  });

  // Critical path statistics
  const criticalActivities = calculatedActivities.filter(a => a.isCritical);
  const expectedPathDuration = criticalActivities.reduce((acc, a) => acc + a.te, 0);
  const totalPathVariance = criticalActivities.reduce((acc, a) => acc + a.variance, 0);
  const projectStdDev = Math.sqrt(totalPathVariance);

  // Z-Score and Normal Distribution probability calculation
  const zScore = projectStdDev > 0 ? (targetDeadline - expectedPathDuration) / projectStdDev : 0;

  // Approximate standard normal CDF (Abramowitz and Stegun formula)
  const computeNormalCDF = (z: number) => {
    if (z > 4) return 99.9;
    if (z < -4) return 0.1;
    const b1 = 0.31938153;
    const b2 = -0.356563782;
    const b3 = 1.781477937;
    const b4 = -1.821255978;
    const b5 = 1.330274429;
    const p = 0.2316419;
    const c2 = 0.39894228; // 1 / sqrt(2 * pi)

    const t = 1.0 / (1.0 + p * Math.abs(z));
    const poly = ((((b5 * t + b4) * t + b3) * t + b2) * t + b1) * t;
    const norm = 1.0 - c2 * Math.exp(-0.5 * z * z) * poly;

    const prob = z >= 0 ? norm : 1.0 - norm;
    return Math.min(99.9, Math.max(0.1, prob * 100));
  };

  const probabilityPct = computeNormalCDF(zScore);

  // Recommended buffer deadlines based on standard Z-scores
  const deadline80 = expectedPathDuration + 0.84 * projectStdDev;
  const deadline90 = expectedPathDuration + 1.28 * projectStdDev;
  const deadline95 = expectedPathDuration + 1.645 * projectStdDev;

  const handleUpdateEstimate = (id: string, field: 'optimistic' | 'mostLikely' | 'pessimistic', val: number) => {
    setActivities(prev => prev.map(a => {
      if (a.id === id) {
        return { ...a, [field]: Math.max(0.5, val) };
      }
      return a;
    }));
  };

  const handleReset = () => {
    setActivities(DEFAULT_PERT_ACTIVITIES);
    setTargetDeadline(27);
  };

  const handleLoadIoTCase = () => {
    // Thamirabarani Labs IoT Case from Guide
    setActivities([
      { id: 'act-1', name: 'Custom PCB & Firmware Architecture', optimistic: 3, mostLikely: 5, pessimistic: 8, rationale: 'Hardware schematic capture', isCritical: true },
      { id: 'act-2', name: 'Semiconductor Component Procurement', optimistic: 3, mostLikely: 6, pessimistic: 14, rationale: 'Volatile global lead times (major risk!)', isCritical: true },
      { id: 'act-3', name: 'Firmware Engine & Energy Meter Coding', optimistic: 4, mostLikely: 7, pessimistic: 11, rationale: 'Energy calibration routines', isCritical: true },
      { id: 'act-4', name: 'BIS & EMC Laboratory Certification', optimistic: 2, mostLikely: 4, pessimistic: 9, rationale: 'Lab testing slots & EMI re-test risk', isCritical: true },
      { id: 'act-5', name: 'Pilot Line 500-Unit Assembly & QA', optimistic: 2, mostLikely: 3, pessimistic: 5, rationale: 'SMT pick-and-place trials', isCritical: true }
    ]);
    setTargetDeadline(29);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-7 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-3xs font-black uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
              Tool 3 Simulator
            </span>
            <span className="text-3xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
              Three-Point Beta Distribution & Probability Engine
            </span>
            <span className="text-3xs font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-200">
              TE = (O + 4M + P)/6 · σ = (P - O)/6
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            PERT Three-Point Estimation & Deadline Probability Calculator
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl">
            Simulate honest project estimates under uncertainty. Calculate the expected critical path duration, statistical variance, and the exact probability of finishing by any target deadline using normal distribution Z-scores.
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleLoadIoTCase}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-900 border border-indigo-200 hover:bg-indigo-100 transition-colors"
          >
            Load Case: Thamirabarani IoT
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
            title="Reset to Guide Example"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
          <span className="text-3xs font-bold uppercase tracking-wider text-slate-500 block">Expected Duration (TE)</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-slate-900 font-mono">{expectedPathDuration.toFixed(2)}</span>
            <span className="text-xs font-semibold text-slate-500">weeks</span>
          </div>
          <span className="text-3xs text-slate-400 mt-0.5 block">50th percentile (coin flip)</span>
        </div>

        <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
          <span className="text-3xs font-bold uppercase tracking-wider text-slate-500 block">Project Std Dev (σ)</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-indigo-700 font-mono">±{projectStdDev.toFixed(2)}</span>
            <span className="text-xs font-semibold text-slate-500">weeks</span>
          </div>
          <span className="text-3xs text-slate-400 mt-0.5 block">Variance Sum = {totalPathVariance.toFixed(2)}</span>
        </div>

        <div className={`p-3.5 rounded-xl border ${probabilityPct >= 80 ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : probabilityPct >= 50 ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-rose-50 border-rose-200 text-rose-900'}`}>
          <span className="text-3xs font-bold uppercase tracking-wider block opacity-75">Target Deadline ({targetDeadline}w)</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black font-mono">{probabilityPct.toFixed(1)}%</span>
            <span className="text-xs font-semibold">confidence</span>
          </div>
          <span className="text-3xs mt-0.5 block opacity-85 font-mono">
            Z-score: {zScore >= 0 ? `+${zScore.toFixed(2)}` : zScore.toFixed(2)}
          </span>
        </div>

        <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
          <span className="text-3xs font-bold uppercase tracking-wider text-slate-500 block">95% Safe Commitment</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-slate-900 font-mono">{deadline95.toFixed(1)}</span>
            <span className="text-xs font-semibold text-slate-500">weeks</span>
          </div>
          <span className="text-3xs text-slate-400 mt-0.5 block">Includes +{(deadline95 - expectedPathDuration).toFixed(1)}w buffer</span>
        </div>
      </div>

      {/* Target Deadline Interactive Slider & Confidence Gauge */}
      <div className="bg-indigo-50/60 border border-indigo-200/80 rounded-xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-sm font-bold text-indigo-950 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-700" />
              <span>Target Commitment Date Explorer</span>
            </h4>
            <p className="text-xs text-indigo-800/80 mt-0.5">
              Drag the target deadline slider to observe how your statistical probability of success shifts along the bell curve.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold bg-white px-3 py-1 rounded-lg border border-indigo-200 text-indigo-950">
              Target: {targetDeadline} Weeks
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <input
            type="range"
            min={Math.floor(expectedPathDuration - 3 * projectStdDev)}
            max={Math.ceil(expectedPathDuration + 3 * projectStdDev)}
            step={0.5}
            value={targetDeadline}
            onChange={(e) => setTargetDeadline(parseFloat(e.target.value))}
            className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-700"
          />
          <div className="flex justify-between text-3xs font-mono text-indigo-900/60 px-1">
            <span>High Risk (16% @ {(expectedPathDuration - projectStdDev).toFixed(1)}w)</span>
            <span>Coin Flip (50% @ {expectedPathDuration.toFixed(1)}w)</span>
            <span>Recommended (80% @ {deadline80.toFixed(1)}w)</span>
            <span>High Confidence (95% @ {deadline95.toFixed(1)}w)</span>
          </div>
        </div>

        {/* Visual Probability Meter Bar */}
        <div className="bg-white p-3 rounded-lg border border-indigo-200 space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-700">Deadline Feasibility Assessment:</span>
            <span className={`font-bold ${probabilityPct >= 80 ? 'text-emerald-700' : probabilityPct >= 50 ? 'text-amber-700' : 'text-rose-700'}`}>
              {probabilityPct >= 95 ? 'Extremely Safe Commitment (95%+)' : probabilityPct >= 80 ? 'Defensible Commercial Commitment (80–94%)' : probabilityPct >= 50 ? 'Coin Flip: Significant Delay Risk (50–79%)' : 'Dangerous: High Probability of Penalties (<50%)'}
            </span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
            <div
              className={`h-full transition-all ${
                probabilityPct >= 80 ? 'bg-emerald-500' : probabilityPct >= 50 ? 'bg-amber-500' : 'bg-rose-500'
              }`}
              style={{ width: `${probabilityPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Interactive Activity Breakdown & Uncertainty Table */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
        <div className="p-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-700">
          <span className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-indigo-600" />
            <span>Three-Point Estimates & Variance Contribution Table</span>
          </span>
          <span className="text-3xs text-slate-500 font-medium">
            Variance Share = σ²_act / Σ σ²_path
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-3xs font-bold uppercase text-slate-500">
              <tr>
                <th className="py-2.5 px-3">Activity</th>
                <th className="py-2.5 px-2 text-center text-emerald-800">Optimistic (O)</th>
                <th className="py-2.5 px-2 text-center text-blue-900">Most Likely (M)</th>
                <th className="py-2.5 px-2 text-center text-rose-800">Pessimistic (P)</th>
                <th className="py-2.5 px-2 text-center font-bold">Expected (TE)</th>
                <th className="py-2.5 px-2 text-center">Std Dev (σ)</th>
                <th className="py-2.5 px-2 text-center">Variance (σ²)</th>
                <th className="py-2.5 px-3 text-right">Risk Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {calculatedActivities.map(act => {
                const variancePct = totalPathVariance > 0 ? (act.variance / totalPathVariance) * 100 : 0;
                const isTopRisk = variancePct >= 40;

                return (
                  <tr key={act.id} className={`hover:bg-slate-50 ${isTopRisk ? 'bg-amber-50/40' : ''}`}>
                    <td className="py-2.5 px-3 font-sans">
                      <span className="font-semibold text-slate-900 block">{act.name}</span>
                      <span className="text-3xs text-slate-400 font-normal">{act.rationale}</span>
                    </td>
                    {/* O input */}
                    <td className="py-2.5 px-2 text-center">
                      <input
                        type="number"
                        step="0.5"
                        min="0.5"
                        value={act.optimistic}
                        onChange={(e) => handleUpdateEstimate(act.id, 'optimistic', parseFloat(e.target.value) || 1)}
                        className="w-14 text-center py-1 px-1 bg-emerald-50 border border-emerald-200 rounded text-emerald-900 font-bold focus:ring-1 focus:ring-emerald-500 outline-none"
                      />
                    </td>
                    {/* M input */}
                    <td className="py-2.5 px-2 text-center">
                      <input
                        type="number"
                        step="0.5"
                        min="0.5"
                        value={act.mostLikely}
                        onChange={(e) => handleUpdateEstimate(act.id, 'mostLikely', parseFloat(e.target.value) || 1)}
                        className="w-14 text-center py-1 px-1 bg-blue-50 border border-blue-200 rounded text-blue-900 font-bold focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </td>
                    {/* P input */}
                    <td className="py-2.5 px-2 text-center">
                      <input
                        type="number"
                        step="0.5"
                        min="0.5"
                        value={act.pessimistic}
                        onChange={(e) => handleUpdateEstimate(act.id, 'pessimistic', parseFloat(e.target.value) || 1)}
                        className="w-14 text-center py-1 px-1 bg-rose-50 border border-rose-200 rounded text-rose-900 font-bold focus:ring-1 focus:ring-rose-500 outline-none"
                      />
                    </td>
                    <td className="py-2.5 px-2 text-center font-bold text-slate-900">{act.te.toFixed(2)}w</td>
                    <td className="py-2.5 px-2 text-center text-slate-600">{act.sd.toFixed(2)}</td>
                    <td className="py-2.5 px-2 text-center font-bold text-indigo-900">{act.variance.toFixed(2)}</td>
                    <td className="py-2.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5 font-sans">
                        <span className={`text-2xs font-bold ${isTopRisk ? 'text-amber-800' : 'text-slate-600'}`}>
                          {variancePct.toFixed(1)}%
                        </span>
                        {isTopRisk && (
                          <span className="text-3xs font-extrabold uppercase px-1.5 py-0.2 rounded bg-amber-100 text-amber-900">
                            #1 Risk
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Variance-Driven Mitigation Advice Box */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 flex items-start gap-3">
        <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 space-y-1">
          <span className="font-bold text-slate-900 block">Sundaresh Kamaraj's Golden Rule of PERT Variance:</span>
          <p>
            "Spend management and mitigation effort in proportion to <strong>variance share</strong>, not activity duration. A 4-week task with immense spread (O: 2w, P: 14w) contributes far more delay risk than a 10-week task that is locked in by contract. Buy down the worst-case scenario on your top-variance activity first to collapse the project standard deviation."
          </p>
        </div>
      </div>
    </div>
  );
}
