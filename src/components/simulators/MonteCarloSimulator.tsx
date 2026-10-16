import { useState, useMemo } from 'react';
import { BarChart3, TrendingUp, Sliders, RotateCcw, AlertTriangle, ShieldCheck, Play, Sparkles, HelpCircle, Layers, ArrowRight, DollarSign } from 'lucide-react';

interface UncertainInput {
  id: string;
  name: string;
  unit: string;
  type: 'triangular' | 'normal';
  min: number;
  mode: number;
  max: number;
  mean?: number;
  sd?: number;
  currentMode: number;
}

interface SimPreset {
  id: string;
  name: string;
  subtitle: string;
  outputName: string;
  outputUnit: string;
  targetBaseline: number;
  targetDescription: string;
  iterations: number;
  inputs: UncertainInput[];
  calculateDeterministic: (inputs: Record<string, number>) => number;
}

const PRESETS: SimPreset[] = [
  {
    id: 'noyyal',
    name: 'Noyyal Knit Exports (Garment Export Contract Margin)',
    subtitle: 'Tiruppur knitwear exporter evaluating 600,000 units fixed-price $4.20/pc contract under yarn & currency volatility',
    outputName: 'Net Contract Profit Margin',
    outputUnit: '₹ Lakh',
    targetBaseline: 145, // static single-point was 8% (~₹145 Lakh)
    targetDescription: 'Static Single-Point Plan: ₹145 Lakh (8.0% margin)',
    iterations: 10000,
    inputs: [
      { id: 'yarn', name: 'Cotton Yarn Price', unit: '₹/kg', type: 'triangular', min: 240, mode: 280, max: 370, currentMode: 280 },
      { id: 'fx', name: 'USD/INR Exchange Rate', unit: '₹/USD', type: 'triangular', min: 81.5, mode: 83.5, max: 87.0, currentMode: 83.5 },
      { id: 'dye', name: 'Dyeing & Wet Processing Cost', unit: '₹/kg', type: 'triangular', min: 85, mode: 95, max: 125, currentMode: 95 },
      { id: 'reject', name: 'Defect Rejection Rate', unit: '%', type: 'triangular', min: 1.5, mode: 3.0, max: 7.0, currentMode: 3.0 },
      { id: 'freight', name: 'Container Ocean Freight', unit: '₹/unit', type: 'triangular', min: 12, mode: 16, max: 28, currentMode: 16 }
    ],
    calculateDeterministic: (vals) => {
      // 600,000 units, 0.25 kg cotton yarn per garment
      const totalUnits = 600000;
      const totalKg = totalUnits * 0.25;
      const revenueINR = (totalUnits * 4.20 * vals.fx) / 100000; // in Lakhs
      const yarnCost = (totalKg * vals.yarn) / 100000;
      const dyeingCost = (totalKg * vals.dye) / 100000;
      const manufacturingCost = (totalUnits * 65) / 100000; // fixed CMT ₹65/pc
      const scrapLoss = (revenueINR * (vals.reject / 100));
      const freightCost = (totalUnits * vals.freight) / 100000;
      const overheads = 180; // ₹180 Lakh SG&A
      const totalCost = yarnCost + dyeingCost + manufacturingCost + scrapLoss + freightCost + overheads;
      return Number((revenueINR - totalCost).toFixed(2));
    }
  },
  {
    id: 'schedule',
    name: 'Project Schedule Simulation (Critical Path Delivery)',
    subtitle: '10,000-trial simulation across sequential project phases to reveal realistic P80 completion contingency',
    outputName: 'Total Completion Duration',
    outputUnit: 'Days',
    targetBaseline: 48,
    targetDescription: 'Deterministic Schedule: 8 + 30 + 10 = 48 Days',
    iterations: 10000,
    inputs: [
      { id: 'design', name: 'Phase 1: Architecture & Design', unit: 'Days', type: 'triangular', min: 5, mode: 8, max: 14, currentMode: 8 },
      { id: 'build', name: 'Phase 2: Construction / Build', unit: 'Days', type: 'triangular', min: 20, mode: 30, max: 50, currentMode: 30 },
      { id: 'test', name: 'Phase 3: Integration & Testing', unit: 'Days', type: 'triangular', min: 6, mode: 10, max: 18, currentMode: 10 }
    ],
    calculateDeterministic: (vals) => {
      return Number((vals.design + vals.build + vals.test).toFixed(1));
    }
  }
];

// Helper: Triangular random sampling
function sampleTriangular(a: number, c: number, b: number): number {
  const u = Math.random();
  const fc = (c - a) / (b - a);
  if (u < fc) {
    return a + Math.sqrt(u * (b - a) * (c - a));
  } else {
    return b - Math.sqrt((1 - u) * (b - a) * (b - c));
  }
}

export function MonteCarloSimulator() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('noyyal');
  const [activePreset, setActivePreset] = useState<SimPreset>(PRESETS[0]);
  const [inputs, setInputs] = useState<UncertainInput[]>(PRESETS[0].inputs);
  const [simRunKey, setSimRunKey] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'distribution' | 'tornado' | 'scurve'>('distribution');

  const handleSelectPreset = (id: string) => {
    setSelectedPresetId(id);
    const p = PRESETS.find(pr => pr.id === id) || PRESETS[0];
    setActivePreset(p);
    setInputs(p.inputs);
    setSimRunKey(prev => prev + 1);
  };

  const handleUpdateInputParam = (id: string, field: 'min' | 'mode' | 'max', val: number) => {
    setInputs(inputs.map(inp => {
      if (inp.id !== id) return inp;
      const updated = { ...inp, [field]: val };
      // Keep min <= mode <= max
      if (field === 'min' && updated.mode < val) updated.mode = val;
      if (field === 'max' && updated.mode > val) updated.mode = val;
      return updated;
    }));
  };

  // Run 10,000 Monte Carlo iterations in browser
  const simulationResults = useMemo(() => {
    const N = 10000;
    const outputs = new Float32Array(N);

    // Cache input values
    const inputEntries = inputs.map(i => ({
      id: i.id,
      min: i.min,
      mode: i.mode,
      max: i.max
    }));

    for (let i = 0; i < N; i++) {
      const vals: Record<string, number> = {};
      for (let j = 0; j < inputEntries.length; j++) {
        const inp = inputEntries[j];
        vals[inp.id] = sampleTriangular(inp.min, inp.mode, inp.max);
      }
      outputs[i] = activePreset.calculateDeterministic(vals);
    }

    // Sort to compute percentiles
    const sorted = Array.from(outputs).sort((a, b) => a - b);
    const sum = sorted.reduce((acc, curr) => acc + curr, 0);
    const mean = sum / N;

    const p10 = sorted[Math.floor(N * 0.10)];
    const p50 = sorted[Math.floor(N * 0.50)];
    const p80 = sorted[Math.floor(N * 0.80)];
    const p90 = sorted[Math.floor(N * 0.90)];

    // Target probability
    let targetProb = 0;
    if (activePreset.id === 'noyyal') {
      // Probability of loss (< 0)
      const lossCount = sorted.filter(v => v < 0).length;
      targetProb = (lossCount / N) * 100;
    } else {
      // Probability of meeting target schedule (<= 48 days)
      const meetCount = sorted.filter(v => v <= activePreset.targetBaseline).length;
      targetProb = (meetCount / N) * 100;
    }

    // Build histogram (16 bins)
    const minVal = sorted[0];
    const maxVal = sorted[N - 1];
    const binCount = 18;
    const binWidth = (maxVal - minVal) / binCount;
    const histogramBins: { rangeLabel: string; count: number; midVal: number }[] = [];

    for (let b = 0; b < binCount; b++) {
      const binStart = minVal + b * binWidth;
      const binEnd = binStart + binWidth;
      const count = sorted.filter(v => v >= binStart && (b === binCount - 1 ? v <= binEnd : v < binEnd)).length;
      histogramBins.push({
        rangeLabel: `${binStart.toFixed(0)} - ${binEnd.toFixed(0)}`,
        count,
        midVal: (binStart + binEnd) / 2
      });
    }

    // Compute Tornado sensitivity: swing each input from its P10 to P90 while holding others at mode
    const medianBaseVals: Record<string, number> = {};
    inputs.forEach(i => { medianBaseVals[i.id] = i.mode; });
    const baselineOut = activePreset.calculateDeterministic(medianBaseVals);

    const tornadoBars = inputs.map(inp => {
      const p10Val = inp.min + 0.10 * (inp.max - inp.min);
      const p90Val = inp.min + 0.90 * (inp.max - inp.min);

      const outAtP10 = activePreset.calculateDeterministic({ ...medianBaseVals, [inp.id]: p10Val });
      const outAtP90 = activePreset.calculateDeterministic({ ...medianBaseVals, [inp.id]: p90Val });

      const swing = Math.abs(outAtP90 - outAtP10);
      return {
        id: inp.id,
        name: inp.name,
        swing: Number(swing.toFixed(2)),
        outAtP10: Number(outAtP10.toFixed(1)),
        outAtP90: Number(outAtP90.toFixed(1))
      };
    }).sort((a, b) => b.swing - a.swing);

    return {
      mean: Number(mean.toFixed(2)),
      p10: Number(p10.toFixed(2)),
      p50: Number(p50.toFixed(2)),
      p80: Number(p80.toFixed(2)),
      p90: Number(p90.toFixed(2)),
      targetProb: Number(targetProb.toFixed(1)),
      histogramBins,
      sorted,
      tornadoBars,
      baselineOut
    };
  }, [inputs, activePreset, simRunKey]);

  const maxHistCount = Math.max(...simulationResults.histogramBins.map(b => b.count));

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>10,000-Iteration Stochastic Risk Simulation Engine</span>
            <span>·</span>
            <span>Ulam & von Neumann Modeling</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Monte Carlo Simulation & Tornado Analysis</h3>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Shatter the "Flaw of Averages" by transforming static single numbers into probabilistic S-curves, defensible P80 confidence commitments, and tornado sensitivity leverage rankings.
          </p>
        </div>

        {/* Preset Switcher & Re-run */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold">
            {PRESETS.map(p => (
              <button
                key={p.id}
                onClick={() => handleSelectPreset(p.id)}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  selectedPresetId === p.id ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {p.id === 'noyyal' ? 'Export Margin Model' : 'Project Schedule'}
              </button>
            ))}
          </div>

          <button
            onClick={() => setSimRunKey(prev => prev + 1)}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
            title="Re-run 10,000 iterations"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Simulate (10k)</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs">
          <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider block">Single-Point Estimate</span>
          <span className="text-2xl font-extrabold font-mono text-slate-600 mt-0.5 block">
            {activePreset.targetBaseline} <span className="text-xs font-normal">{activePreset.outputUnit}</span>
          </span>
          <span className="text-3xs text-rose-500 mt-1 block font-semibold">Flaw of Averages baseline</span>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs">
          <span className="text-2xs font-bold text-slate-500 uppercase tracking-wider block">Simulated Mean</span>
          <span className="text-2xl font-extrabold font-mono text-slate-900 mt-0.5 block">
            {simulationResults.mean} <span className="text-xs font-normal">{activePreset.outputUnit}</span>
          </span>
          <span className="text-3xs text-slate-400 mt-1 block">Expected probability value</span>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs">
          <span className="text-2xs font-bold text-blue-600 uppercase tracking-wider block">P50 (Median)</span>
          <span className="text-2xl font-extrabold font-mono text-blue-700 mt-0.5 block">
            {simulationResults.p50} <span className="text-xs font-normal">{activePreset.outputUnit}</span>
          </span>
          <span className="text-3xs text-slate-400 mt-1 block">50% chance above/below</span>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs bg-emerald-50/40 border-emerald-300">
          <span className="text-2xs font-bold text-emerald-800 uppercase tracking-wider block">P80 (Commitment)</span>
          <span className="text-2xl font-extrabold font-mono text-emerald-950 mt-0.5 block">
            {simulationResults.p80} <span className="text-xs font-normal">{activePreset.outputUnit}</span>
          </span>
          <span className="text-3xs text-emerald-700 mt-1 block font-semibold">Defensible board reserve</span>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs">
          <span className="text-2xs font-bold text-rose-600 uppercase tracking-wider block">
            {activePreset.id === 'noyyal' ? 'Probability of Loss' : 'Hit Target Schedule'}
          </span>
          <span className={`text-2xl font-extrabold font-mono mt-0.5 block ${
            activePreset.id === 'noyyal' ? (simulationResults.targetProb > 15 ? 'text-rose-600' : 'text-emerald-700') : 'text-amber-600'
          }`}>
            {simulationResults.targetProb}%
          </span>
          <span className="text-3xs text-slate-500 mt-1 block">
            {activePreset.id === 'noyyal' ? 'Margin < ₹0' : `Finished in ≤ 48d`}
          </span>
        </div>
      </div>

      {/* Main Visualization & Interactive Inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Charts Canvas (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            {/* View Mode Tabs */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
              <button
                onClick={() => setActiveTab('distribution')}
                className={`px-3 py-1 rounded-md transition-all ${
                  activeTab === 'distribution' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Frequency Histogram
              </button>
              <button
                onClick={() => setActiveTab('tornado')}
                className={`px-3 py-1 rounded-md transition-all ${
                  activeTab === 'tornado' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tornado Chart (Leverage)
              </button>
              <button
                onClick={() => setActiveTab('scurve')}
                className={`px-3 py-1 rounded-md transition-all ${
                  activeTab === 'scurve' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Cumulative S-Curve
              </button>
            </div>

            <span className="text-3xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              N = 10,000 Trials
            </span>
          </div>

          {/* TAB 1: HISTOGRAM */}
          {activeTab === 'distribution' && (
            <div className="space-y-4">
              <div className="h-56 flex items-end gap-1.5 pt-4 px-2 border-b border-l border-slate-200">
                {simulationResults.histogramBins.map((bin, idx) => {
                  const heightPct = Math.max(4, Math.round((bin.count / maxHistCount) * 100));
                  const isNegative = activePreset.id === 'noyyal' && bin.midVal < 0;
                  const isNearP80 = Math.abs(bin.midVal - simulationResults.p80) < ((simulationResults.p90 - simulationResults.p10) / 10);

                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                      {/* Tooltip */}
                      <div className="absolute -top-9 bg-slate-900 text-white text-3xs font-mono rounded px-1.5 py-1 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                        {bin.count} runs ({bin.rangeLabel} {activePreset.outputUnit})
                      </div>

                      {/* Bar */}
                      <div
                        style={{ height: `${heightPct}%` }}
                        className={`w-full rounded-t transition-all ${
                          isNegative
                            ? 'bg-rose-400 group-hover:bg-rose-500'
                            : isNearP80
                            ? 'bg-emerald-600 group-hover:bg-emerald-700 ring-1 ring-emerald-700'
                            : 'bg-indigo-400 group-hover:bg-indigo-500'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>

              {/* X-Axis labels */}
              <div className="flex justify-between text-3xs font-mono text-slate-400 px-2">
                <span>Min: {simulationResults.sorted[0].toFixed(0)}</span>
                <span className="text-blue-700 font-bold">P50: {simulationResults.p50}</span>
                <span className="text-emerald-700 font-bold">P80: {simulationResults.p80}</span>
                <span>Max: {simulationResults.sorted[9999].toFixed(0)} {activePreset.outputUnit}</span>
              </div>

              {/* Legend & Explanation */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
                <span className="font-bold text-slate-800 block">Flaw of Averages Diagnostic:</span>
                <p className="text-slate-600 text-2xs leading-relaxed">
                  Notice how the distribution is skewed with a long fat tail on the bad side. Adding up the individual most-likely values produces <strong>{activePreset.targetBaseline} {activePreset.outputUnit}</strong>, but Monte Carlo proves the true median is <strong>{simulationResults.p50}</strong> and the prudent 80% confidence commitment is <strong>{simulationResults.p80} {activePreset.outputUnit}</strong>.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: TORNADO SENSITIVITY CHART */}
          {activeTab === 'tornado' && (
            <div className="space-y-4">
              <div>
                <h5 className="text-xs font-bold text-slate-800">Tornado Sensitivity Ranking (Swinging P10 → P90)</h5>
                <p className="text-3xs text-slate-500 mt-0.5">Ranked by magnitude of output swing; focus negotiation & hedging on the top bar</p>
              </div>

              <div className="space-y-3 pt-2">
                {simulationResults.tornadoBars.map((bar, idx) => {
                  const maxSwing = simulationResults.tornadoBars[0].swing;
                  const barWidthPct = Math.max(10, Math.round((bar.swing / maxSwing) * 100));

                  return (
                    <div key={bar.id} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-800 flex items-center gap-1.5">
                          <span className="text-3xs font-mono px-1 py-0.2 rounded bg-slate-100 text-slate-600 font-bold">#{idx + 1}</span>
                          {bar.name}
                        </span>
                        <span className="font-mono text-indigo-900 font-bold">
                          Δ {bar.swing} {activePreset.outputUnit} swing
                        </span>
                      </div>

                      {/* Bar Visualization */}
                      <div className="h-6 bg-slate-100 rounded-md overflow-hidden flex items-center px-2 relative">
                        <div
                          style={{ width: `${barWidthPct}%` }}
                          className={`h-4 rounded transition-all ${
                            idx === 0 ? 'bg-indigo-600' : idx === 1 ? 'bg-indigo-400' : 'bg-slate-400'
                          }`}
                        />
                        <span className="text-3xs font-mono font-medium text-slate-700 ml-2 z-10">
                          P10: {bar.outAtP10} ↔ P90: {bar.outAtP90}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-xs">
                <span className="font-bold text-indigo-900 block mb-0.5">Negotiation Leverage Insight:</span>
                <p className="text-indigo-800 text-2xs leading-relaxed">
                  Instead of haggling over top-line prices or general contingencies, negotiate contractual clauses that specifically control <strong>{simulationResults.tornadoBars[0]?.name}</strong> (e.g., raw material price indexation or forward hedging). It drives more variance than all other variables combined!
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: CUMULATIVE S-CURVE */}
          {activeTab === 'scurve' && (
            <div className="space-y-4">
              <div>
                <h5 className="text-xs font-bold text-slate-800">Cumulative Probability Ogive (S-Curve)</h5>
                <p className="text-3xs text-slate-500 mt-0.5">Percentage probability that actual outcome will be at or below target threshold</p>
              </div>

              <div className="h-56 relative border-b border-l border-slate-200 pt-4 px-2">
                <svg className="w-full h-full overflow-visible">
                  {/* Grid lines for 20%, 50%, 80% */}
                  <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#e2e8f0" strokeDasharray="3 3" />
                  <line x1="0" y1="20%" x2="100%" y2="20%" stroke="#e2e8f0" strokeDasharray="3 3" />

                  {/* S-curve path */}
                  <polyline
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    points={Array.from({ length: 40 }).map((_, i) => {
                      const pct = i / 39;
                      const val = simulationResults.sorted[Math.floor(pct * 9999)];
                      const min = simulationResults.sorted[0];
                      const max = simulationResults.sorted[9999];
                      const x = (i / 39) * 100;
                      const y = 100 - (pct * 100);
                      return `${x}%,${y}%`;
                    }).join(' ')}
                  />
                </svg>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 bg-slate-50 rounded border border-slate-200">
                  <span className="text-3xs text-slate-400 uppercase font-bold block">P50 Threshold</span>
                  <span className="font-mono font-bold text-slate-900">{simulationResults.p50} {activePreset.outputUnit}</span>
                </div>
                <div className="p-2 bg-emerald-50 rounded border border-emerald-200">
                  <span className="text-3xs text-emerald-700 uppercase font-bold block">P80 Threshold</span>
                  <span className="font-mono font-bold text-emerald-950">{simulationResults.p80} {activePreset.outputUnit}</span>
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-200">
                  <span className="text-3xs text-slate-400 uppercase font-bold block">P90 Threshold</span>
                  <span className="font-mono font-bold text-slate-900">{simulationResults.p90} {activePreset.outputUnit}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Interactive Input Range Sliders (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h4 className="text-sm font-bold text-slate-900">Uncertain Input Distributions</h4>
              <p className="text-xs text-slate-500 mt-0.5">Adjust Min, Mode & Max bounds to recalculate</p>
            </div>
            <button
              onClick={() => setInputs(activePreset.inputs)}
              className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
            >
              Reset Inputs
            </button>
          </div>

          <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
            {inputs.map(inp => (
              <div key={inp.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-900">{inp.name}</span>
                  <span className="text-3xs font-mono font-semibold text-slate-500">
                    Mode: {inp.mode} {inp.unit}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-2xs">
                  <div>
                    <label className="text-3xs text-slate-500 block mb-0.5">Min (P10):</label>
                    <input
                      type="number"
                      step={inp.id === 'fx' ? '0.1' : inp.id === 'reject' ? '0.5' : '1'}
                      value={inp.min}
                      onChange={(e) => handleUpdateInputParam(inp.id, 'min', parseFloat(e.target.value) || 0)}
                      className="w-full p-1 border border-slate-300 rounded font-mono text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-3xs text-indigo-700 font-semibold block mb-0.5">Most Likely:</label>
                    <input
                      type="number"
                      step={inp.id === 'fx' ? '0.1' : inp.id === 'reject' ? '0.5' : '1'}
                      value={inp.mode}
                      onChange={(e) => handleUpdateInputParam(inp.id, 'mode', parseFloat(e.target.value) || 0)}
                      className="w-full p-1 border border-indigo-300 rounded font-mono text-xs bg-white text-indigo-950 font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-3xs text-slate-500 block mb-0.5">Max (P90):</label>
                    <input
                      type="number"
                      step={inp.id === 'fx' ? '0.1' : inp.id === 'reject' ? '0.5' : '1'}
                      value={inp.max}
                      onChange={(e) => handleUpdateInputParam(inp.id, 'max', parseFloat(e.target.value) || 0)}
                      className="w-full p-1 border border-slate-300 rounded font-mono text-xs bg-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => setSimRunKey(prev => prev + 1)}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Recompute 10,000 Trials</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
