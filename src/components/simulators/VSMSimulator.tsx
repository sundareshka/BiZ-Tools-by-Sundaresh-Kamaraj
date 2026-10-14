import { useState } from 'react';
import { GitCommit, Sparkles, RotateCcw, ArrowRight, Zap, TrendingUp, AlertTriangle, Layers, Clock } from 'lucide-react';

interface VsmStation {
  id: string;
  name: string;
  cycleTimeSec: number;
  changeoverMin: number;
  uptimePercent: number;
  operators: number;
  waitingDaysBefore: number; // WIP buffer days
  kaizenBurstActive: boolean;
  kaizenDescription: string;
}

export function VSMSimulator() {
  const [mapMode, setMapMode] = useState<'current' | 'future'>('current');

  const [stations, setStations] = useState<VsmStation[]>([
    {
      id: 'st-1',
      name: 'Paper Reel Slitting',
      cycleTimeSec: 45,
      changeoverMin: 35,
      uptimePercent: 88,
      operators: 2,
      waitingDaysBefore: 3.5,
      kaizenBurstActive: false,
      kaizenDescription: 'Implement 2-bin raw material pull with paper mill.'
    },
    {
      id: 'st-2',
      name: 'Flute Corrugation',
      cycleTimeSec: 60,
      changeoverMin: 55,
      uptimePercent: 82,
      operators: 3,
      waitingDaysBefore: 2.8,
      kaizenBurstActive: false,
      kaizenDescription: 'Apply SMED to flute roller swaps; eliminate steam pressure warmup lag.'
    },
    {
      id: 'st-3',
      name: 'Flexo Printing & Slotting',
      cycleTimeSec: 50,
      changeoverMin: 65,
      uptimePercent: 78,
      operators: 2,
      waitingDaysBefore: 4.2,
      kaizenBurstActive: false,
      kaizenDescription: 'Pre-mount stereo printing plates off-line; quick-lock ink wash pumps.'
    },
    {
      id: 'st-4',
      name: 'Rotary Die-Cutting',
      cycleTimeSec: 40,
      changeoverMin: 40,
      uptimePercent: 85,
      operators: 2,
      waitingDaysBefore: 2.1,
      kaizenBurstActive: false,
      kaizenDescription: 'Establish Pacemaker scheduling right at this station; pull from here.'
    },
    {
      id: 'st-5',
      name: 'Stitching & Bundling',
      cycleTimeSec: 35,
      changeoverMin: 15,
      uptimePercent: 92,
      operators: 3,
      waitingDaysBefore: 1.4,
      kaizenBurstActive: false,
      kaizenDescription: 'Create continuous flow cell directly connected to dispatch staging.'
    }
  ]);

  const handleToggleBurst = (id: string) => {
    setStations(prev => prev.map(s => {
      if (s.id === id) {
        return { ...s, kaizenBurstActive: !s.kaizenBurstActive };
      }
      return s;
    }));
  };

  const handleLoadThamirabaraniCase = () => {
    setMapMode('future');
    setStations(prev => prev.map(s => ({
      ...s,
      kaizenBurstActive: true
    })));
  };

  const handleReset = () => {
    setMapMode('current');
    setStations(prev => prev.map(s => ({
      ...s,
      kaizenBurstActive: false
    })));
  };

  // Calculations based on current vs future mode
  // If in future mode, active bursts cut waiting days and changeover
  const effectiveStations = stations.map(s => {
    if (mapMode === 'future' || s.kaizenBurstActive) {
      return {
        ...s,
        waitingDaysBefore: Number((s.waitingDaysBefore * 0.28).toFixed(1)), // 72% queue reduction
        changeoverMin: Math.round(s.changeoverMin * 0.3) // 70% SMED reduction
      };
    }
    return s;
  });

  const totalWaitingDays = effectiveStations.reduce((acc, s) => acc + s.waitingDaysBefore, 0);
  const totalLeadTimeDays = Number(totalWaitingDays.toFixed(1));
  const totalLeadTimeSeconds = totalLeadTimeDays * 8 * 3600; // 8-hr workday assumption

  const totalProcessingTimeSeconds = effectiveStations.reduce((acc, s) => acc + s.cycleTimeSec, 0);
  const totalProcessingMinutes = Number((totalProcessingTimeSeconds / 60).toFixed(1));

  // Process Cycle Efficiency (PCE) = (Value Add Time / Total Lead Time) * 100
  const pcePercent = totalLeadTimeSeconds > 0
    ? Number(((totalProcessingTimeSeconds / totalLeadTimeSeconds) * 100).toFixed(2))
    : 0;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-semibold bg-cyan-50 text-cyan-700 border border-cyan-200 mb-2">
              <GitCommit className="w-3.5 h-3.5" />
              <span>Operations & Process Framework #4</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Value Stream Mapping (VSM) Simulator</h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Map material and information flow, calculate Process Cycle Efficiency (PCE), and place Kaizen bursts to compress lead times.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleLoadThamirabaraniCase}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-cyan-700 bg-cyan-50 hover:bg-cyan-100 border border-cyan-300 rounded-lg transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Load Case Study: Thamirabarani Packaging</span>
            </button>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Current vs Future State Switcher */}
        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-100">
          <span className="text-xs font-bold uppercase text-slate-400">Map View:</span>
          <div className="inline-flex rounded-lg p-1 bg-slate-100 border border-slate-200">
            <button
              onClick={() => setMapMode('current')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                mapMode === 'current'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Current State Map (As-Is)
            </button>
            <button
              onClick={() => setMapMode('future')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                mapMode === 'future'
                  ? 'bg-cyan-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Future State Map (Lean Pull)
            </button>
          </div>
          <span className="text-2xs text-slate-500 hidden sm:inline">
            Click any Kaizen Burst icon below to activate specific station improvements
          </span>
        </div>
      </div>

      {/* KPI Headline Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider block">Total Production Lead Time</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className={`text-3xl font-extrabold font-mono ${
              totalLeadTimeDays > 10 ? 'text-red-600' : totalLeadTimeDays > 5 ? 'text-amber-600' : 'text-cyan-700'
            }`}>
              {totalLeadTimeDays}
            </span>
            <span className="text-xs font-semibold text-slate-500">Days (Order to Dispatch)</span>
          </div>
          <span className="text-2xs text-slate-500 mt-1 block">Sum of all WIP queue waiting buffers</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider block">Total Touch / Processing Time</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold font-mono text-slate-900">
              {totalProcessingMinutes}
            </span>
            <span className="text-xs font-semibold text-slate-500">Minutes ({totalProcessingTimeSeconds}s)</span>
          </div>
          <span className="text-2xs text-slate-500 mt-1 block">Pure physical value-adding transformation time</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider block">Process Cycle Efficiency (PCE)</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className={`text-3xl font-extrabold font-mono ${
              pcePercent >= 10 ? 'text-emerald-600' : pcePercent >= 4 ? 'text-cyan-600' : 'text-red-600'
            }`}>
              {pcePercent}%
            </span>
            <span className="text-xs font-semibold text-slate-500">Efficiency</span>
          </div>
          <span className="text-2xs text-slate-500 mt-1 block">
            {pcePercent < 5 ? 'Typical un-improved plant (<5% standard)' : 'World-Class lean benchmark (>10%)'}
          </span>
        </div>
      </div>

      {/* Visual Value Stream Process Map */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs overflow-x-auto">
        <div className="flex items-center justify-between mb-6 min-w-[750px]">
          <div>
            <h3 className="text-base font-bold text-slate-900">Interactive End-to-End Value Stream</h3>
            <p className="text-xs text-slate-500 mt-0.5">Toggle Kaizen bursts to simulate flow optimization across workstations.</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
              Waiting Inventory Buffer
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-cyan-600 inline-block" />
              Active Value-Add Workstation
            </span>
          </div>
        </div>

        {/* Process Steps Sequence */}
        <div className="flex items-stretch gap-3 min-w-[750px] pb-4">
          {effectiveStations.map((st, idx) => (
            <div key={st.id} className="flex-1 flex flex-col items-center">
              {/* Upstream Buffer Icon */}
              <div className="w-full bg-amber-50 border border-amber-200 rounded-lg p-2.5 mb-2 text-center">
                <span className="text-2xs font-bold text-amber-800 uppercase block font-mono">WIP Buffer</span>
                <span className="text-xs font-bold text-amber-900 font-mono block">
                  {st.waitingDaysBefore} Days
                </span>
                <span className="text-3xs text-amber-700">Waiting Muda</span>
              </div>

              {/* Station Card */}
              <div className="w-full bg-white rounded-xl border-2 border-slate-300 p-3.5 space-y-2 shadow-xs hover:border-cyan-500 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="w-5 h-5 rounded bg-slate-900 text-white text-2xs font-bold font-mono flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <button
                    onClick={() => handleToggleBurst(st.id)}
                    title={st.kaizenDescription}
                    className={`p-1 rounded transition-colors ${
                      st.kaizenBurstActive
                        ? 'bg-amber-400 text-slate-900 ring-2 ring-amber-500'
                        : 'bg-slate-100 text-slate-400 hover:text-amber-600'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>

                <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{st.name}</h4>

                <div className="space-y-1 text-2xs text-slate-600 pt-1 border-t border-slate-100">
                  <div className="flex justify-between">
                    <span>Cycle Time:</span>
                    <strong className="font-mono text-slate-900">{st.cycleTimeSec}s</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Changeover:</span>
                    <strong className="font-mono text-slate-900">{st.changeoverMin}m</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Uptime:</span>
                    <strong className="font-mono text-slate-900">{st.uptimePercent}%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Operators:</span>
                    <strong className="font-mono text-slate-900">{st.operators}</strong>
                  </div>
                </div>

                {st.kaizenBurstActive && (
                  <div className="text-3xs p-1.5 rounded bg-amber-50 border border-amber-200 text-amber-900 font-semibold line-clamp-2">
                    Burst: {st.kaizenDescription}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* The Lead Time Ladder (The Classic VSM Timeline Line) */}
        <div className="min-w-[750px] mt-6 pt-6 border-t border-slate-200">
          <span className="text-2xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Value Stream Time Ladder (Waiting Days vs. Processing Seconds)
          </span>

          <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden font-mono text-2xs">
            {effectiveStations.map((st) => (
              <div key={st.id} className="flex-1 text-center">
                {/* Upper Ridge: Waiting Time */}
                <div className="bg-red-50 border-b border-slate-200 py-1.5 text-red-700 font-bold">
                  {st.waitingDaysBefore} d (Wait)
                </div>
                {/* Lower Valley: Process Time */}
                <div className="bg-emerald-50 py-1.5 text-emerald-800 font-bold">
                  {st.cycleTimeSec} s (VA)
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center text-xs font-bold mt-3 px-1 text-slate-700">
            <span>Total Non-Value Adding Wait: <span className="text-red-600 font-mono">{totalLeadTimeDays} Days</span></span>
            <span>Total Value-Adding Touch: <span className="text-emerald-600 font-mono">{totalProcessingMinutes} Mins</span></span>
            <span>PCE: <span className="text-cyan-700 font-mono">{pcePercent}%</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
