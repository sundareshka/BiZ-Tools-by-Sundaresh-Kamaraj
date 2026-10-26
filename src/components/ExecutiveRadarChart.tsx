import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  ShieldCheck,
  Award,
  Sliders,
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';

interface RadarAxis {
  label: string;
  pillar: string;
  shortLabel: string;
  userScore: number; // 0-100
  fortune500: number; // 0-100
  topDecile: number; // 0-100
}

const DEFAULT_AXES: RadarAxis[] = [
  { label: 'Strategic Environmental Audit', pillar: 'Pillar 1', shortLabel: 'Env Audit', userScore: 82, fortune500: 68, topDecile: 92 },
  { label: 'Core Competencies & Moat', pillar: 'Pillar 2', shortLabel: 'Moat / VRIO', userScore: 74, fortune500: 62, topDecile: 94 },
  { label: 'Corporate Portfolio & Growth', pillar: 'Pillar 3', shortLabel: 'Portfolio', userScore: 68, fortune500: 65, topDecile: 88 },
  { label: 'Blue Ocean & Value Innovation', pillar: 'Pillar 4', shortLabel: 'Value Innov', userScore: 78, fortune500: 54, topDecile: 96 },
  { label: 'Business Model Agility', pillar: 'Pillar 5', shortLabel: 'Biz Models', userScore: 85, fortune500: 60, topDecile: 90 },
  { label: 'Operational Agility & Lean 5S', pillar: 'Pillar 6', shortLabel: 'Lean Ops', userScore: 70, fortune500: 72, topDecile: 92 },
  { label: 'Strategy Execution & OKRs', pillar: 'Pillar 7', shortLabel: 'Governance', userScore: 88, fortune500: 64, topDecile: 95 },
  { label: 'Crisis & Risk Resilience', pillar: 'Pillar 8', shortLabel: 'Risk & Crisis', userScore: 65, fortune500: 58, topDecile: 89 }
];

export function ExecutiveRadarChart() {
  const [axes, setAxes] = useState<RadarAxis[]>(DEFAULT_AXES);
  const [showBenchmarks, setShowBenchmarks] = useState<{ fortune500: boolean; topDecile: boolean }>({
    fortune500: true,
    topDecile: true
  });
  const [isInteractiveAdjust, setIsInteractiveAdjust] = useState<boolean>(false);

  // SVG Geometry Constants
  const size = 380;
  const center = size / 2;
  const radius = 135;
  const count = axes.length;
  const angleStep = (Math.PI * 2) / count;

  // Calculate coordinates for a polygon given an accessor function
  const getCoordinates = (accessor: (a: RadarAxis) => number) => {
    return axes.map((axis, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const r = (accessor(axis) / 100) * radius;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  };

  const userPolygon = useMemo(() => getCoordinates(a => a.userScore), [axes]);
  const fortunePolygon = useMemo(() => getCoordinates(a => a.fortune500), [axes]);
  const topDecilePolygon = useMemo(() => getCoordinates(a => a.topDecile), [axes]);

  // Overall index calculations
  const avgUser = Math.round(axes.reduce((acc, curr) => acc + curr.userScore, 0) / count);
  const avgFortune = Math.round(axes.reduce((acc, curr) => acc + curr.fortune500, 0) / count);

  const handleScoreChange = (index: number, val: number) => {
    setAxes(prev => {
      const next = [...prev];
      next[index] = { ...next[index], userScore: val };
      return next;
    });
  };

  const handleReset = () => {
    setAxes(DEFAULT_AXES);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-3xs font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
              8-Axis Strategic Diagnostic
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
              Executive Strategic Maturity & Benchmark Radar
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Compare organizational coverage across the 8 curriculum pillars against Fortune 500 medians
          </p>
        </div>

        {/* Legend / Toggles */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          <button
            onClick={() => setIsInteractiveAdjust(prev => !prev)}
            className={`px-2.5 py-1 rounded-lg border text-2xs font-semibold flex items-center gap-1 cursor-pointer transition ${
              isInteractiveAdjust
                ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Sliders className="w-3 h-3" />
            <span>{isInteractiveAdjust ? 'Hide Sliders' : 'Adjust Scores'}</span>
          </button>

          <button
            onClick={() => setShowBenchmarks(prev => ({ ...prev, fortune500: !prev.fortune500 }))}
            className={`px-2.5 py-1 rounded-lg border text-2xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
              showBenchmarks.fortune500
                ? 'bg-amber-50 border-amber-300 text-amber-800'
                : 'bg-slate-50 border-slate-200 text-slate-400 line-through'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
            <span>Fortune 500 Median ({avgFortune}%)</span>
          </button>

          <button
            onClick={() => setShowBenchmarks(prev => ({ ...prev, topDecile: !prev.topDecile }))}
            className={`px-2.5 py-1 rounded-lg border text-2xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
              showBenchmarks.topDecile
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-slate-50 border-slate-200 text-slate-400 line-through'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
            <span>Top Decile (92%)</span>
          </button>
        </div>
      </div>

      {/* Main Grid: SVG Radar & Diagnosis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* SVG Spider Chart */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
          <svg
            viewBox={`0 0 ${size} ${size}`}
            className="w-full max-w-[340px] sm:max-w-[380px] h-auto drop-shadow-xs"
          >
            {/* Concentric Guide Rings (20%, 40%, 60%, 80%, 100%) */}
            {[0.2, 0.4, 0.6, 0.8, 1.0].map((level, idx) => (
              <circle
                key={idx}
                cx={center}
                cy={center}
                r={radius * level}
                fill="none"
                stroke="#e2e8f0"
                strokeWidth={idx === 4 ? '1.5' : '1'}
                strokeDasharray={idx < 4 ? '3,3' : 'none'}
              />
            ))}

            {/* Radial Axis Lines */}
            {axes.map((_, i) => {
              const angle = i * angleStep - Math.PI / 2;
              const x2 = center + radius * Math.cos(angle);
              const y2 = center + radius * Math.sin(angle);
              return (
                <line
                  key={i}
                  x1={center}
                  y1={center}
                  x2={x2}
                  y2={y2}
                  stroke="#cbd5e1"
                  strokeWidth="1"
                />
              );
            })}

            {/* Top Decile Benchmark Polygon */}
            {showBenchmarks.topDecile && (
              <polygon
                points={topDecilePolygon}
                fill="rgba(16, 185, 129, 0.08)"
                stroke="#10b981"
                strokeWidth="1.5"
                strokeDasharray="4,4"
              />
            )}

            {/* Fortune 500 Benchmark Polygon */}
            {showBenchmarks.fortune500 && (
              <polygon
                points={fortunePolygon}
                fill="rgba(245, 158, 11, 0.1)"
                stroke="#f59e0b"
                strokeWidth="1.5"
              />
            )}

            {/* Organization User Polygon */}
            <polygon
              points={userPolygon}
              fill="rgba(99, 102, 241, 0.28)"
              stroke="#4f46e5"
              strokeWidth="2.5"
            />

            {/* Points & Labels */}
            {axes.map((axis, i) => {
              const angle = i * angleStep - Math.PI / 2;
              const rUser = (axis.userScore / 100) * radius;
              const xUser = center + rUser * Math.cos(angle);
              const yUser = center + rUser * Math.sin(angle);

              // Outer label position
              const rLabel = radius + 22;
              const xLabel = center + rLabel * Math.cos(angle);
              const yLabel = center + rLabel * Math.sin(angle);

              return (
                <g key={i}>
                  {/* Point */}
                  <circle
                    cx={xUser}
                    cy={yUser}
                    r="4"
                    fill="#4f46e5"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  {/* Axis Label */}
                  <text
                    x={xLabel}
                    y={yLabel}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-[9px] sm:text-[10px] font-bold fill-slate-700 font-mono tracking-tight"
                  >
                    {axis.shortLabel}
                  </text>
                  <text
                    x={xLabel}
                    y={yLabel + 10}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-[8px] font-semibold fill-indigo-600 font-mono"
                  >
                    {axis.userScore}%
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Quick Legend Indicator */}
          <div className="flex items-center gap-4 mt-2 text-2xs font-medium text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-indigo-600 inline-block"></span>
              <strong className="text-slate-800">Your Organization ({avgUser}%)</strong>
            </span>
          </div>
        </div>

        {/* Diagnosis & Findings Panel */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-3xs font-extrabold uppercase tracking-wider text-indigo-700">
                Composite Strategic Health
              </span>
              <span className="text-sm font-black text-indigo-900 tabular-nums">
                {avgUser} / 100
              </span>
            </div>
            <p className="text-xs text-indigo-950 leading-relaxed">
              Your organization exceeds the Fortune 500 median (+{avgUser - avgFortune}% advantage) with peak strength in <strong>Strategy Execution (88%)</strong> and <strong>Business Model Agility (85%)</strong>.
            </p>
          </div>

          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1.5">
            <div className="flex items-center gap-1.5 text-amber-900 text-3xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Priority Strategic Gap to Fortify</span>
            </div>
            <p className="text-xs text-amber-950 font-medium leading-relaxed">
              <strong>Crisis & Risk Resilience (65%)</strong> is currently trailing top decile benchmarks. Recommend running the <em>Monte Carlo Simulation</em> and <em>Enterprise Risk Matrix</em> before finalizing next year's capital allocation.
            </p>
          </div>

          <div className="text-3xs text-slate-500 font-mono italic">
            "Strategy is an interdependent system. A flawless Blue Ocean value proposition cannot survive an unmitigated supply disruption or misaligned OKR incentives." — Sundaresh Kamaraj
          </div>
        </div>
      </div>

      {/* Interactive Adjuster Sliders (Collapsible) */}
      {isInteractiveAdjust && (
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800">
              Interactive Pillar Maturity Calibration
            </span>
            <button
              onClick={handleReset}
              className="text-2xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset to Default</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {axes.map((axis, i) => (
              <div key={i} className="bg-white p-2.5 rounded-lg border border-slate-200 space-y-1">
                <div className="flex items-center justify-between text-2xs">
                  <span className="font-semibold text-slate-700 truncate">{axis.shortLabel}</span>
                  <span className="font-mono font-bold text-indigo-600 tabular-nums">{axis.userScore}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={axis.userScore}
                  onChange={(e) => handleScoreChange(i, Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
