import { useState } from 'react';
import { Trash2, AlertTriangle, CheckCircle2, Clock, RotateCcw, Factory, Layers, Award, Sparkles, TrendingDown } from 'lucide-react';

interface WasteItem {
  id: string;
  name: string;
  letter: string;
  description: string;
  score: number; // 0 to 10
  costImpactINR: number; // estimated monthly waste in INR (thousands)
  remedy: string;
}

interface FiveSItem {
  name: string;
  japanese: string;
  score: number; // 1 to 5
  description: string;
  action: string;
}

export function LeanSimulator() {
  const [activeTab, setActiveTab] = useState<'timwoods' | '5s' | 'takt'>('timwoods');

  // TIMWOODS 8 Wastes State
  const [wastes, setWastes] = useState<WasteItem[]>([
    { id: 't', name: 'Transport', letter: 'T', description: 'Unnecessary movement of raw yarn, wet fabric batches, or WIP between distant sheds.', score: 6, costImpactINR: 85, remedy: 'Co-locate dyeing vessels and stenter lines; create U-shaped continuous layout.' },
    { id: 'i', name: 'Inventory', letter: 'I', description: 'Excess yarn cones, un-dyed greige fabric rolls, and finished packed fabric sitting in warehouses.', score: 8, costImpactINR: 240, remedy: 'Establish visual 2-bin Kanban replenishment; cap greige fabric buffer to 2 days.' },
    { id: 'm', name: 'Motion', letter: 'M', description: 'Operators walking excessive distances to search for dye recipes, trolleys, wrenches, and test swatches.', score: 5, costImpactINR: 45, remedy: 'Standardize workstation shadow boards; point-of-use tooling at each vessel.' },
    { id: 'w', name: 'Waiting', letter: 'W', description: 'Machines standing idle waiting for lab color shade approval, steam pressure buildup, or maintenance technician.', score: 9, costImpactINR: 310, remedy: 'Pre-weigh dye chemicals; install digital spectrophotometer for instant shade approval.' },
    { id: 'o1', name: 'Overproduction', letter: 'O', description: 'Dyeing full 500 kg lots when customer ordered 350 kg to "keep stenter machine fully occupied".', score: 7, costImpactINR: 190, remedy: 'Switch from push scheduling to customer pull orders; implement SMED rapid dye lot changeover.' },
    { id: 'o2', name: 'Overprocessing', letter: 'O', description: 'Multiple unnecessary re-stentering passes and extra chemical softening baths beyond buyer specifications.', score: 4, costImpactINR: 60, remedy: 'Establish rigid standard work specification sheets signed off by lab chemist.' },
    { id: 'd', name: 'Defects', letter: 'D', description: 'Color shade variation, fabric edge tearing, and oil spotting requiring re-dyeing or discounting.', score: 7, costImpactINR: 220, remedy: 'Automated temperature and pH sensors (Jidoka); mistake-proof fabric feeding guides.' },
    { id: 's', name: 'Skills Under-utilized', letter: 'S', description: 'Operators with deep textile experience never asked for process improvement ideas; all decisions top-down.', score: 6, costImpactINR: 50, remedy: 'Launch daily 15-min Gemba standups with Kaizen suggestion board and rewards.' }
  ]);

  // 5S Audit State
  const [fiveS, setFiveS] = useState<FiveSItem[]>([
    { name: 'Sort', japanese: 'Seiri', score: 3, description: 'Distinguish necessary items from unnecessary items; red-tag obsolete tools, broken trolleys, and scrap dye drums.', action: 'Execute 1-day red tag event in chemical store and dye kitchen.' },
    { name: 'Set in Order', japanese: 'Seiton', score: 2, description: 'A place for everything and everything in its place with clear floor markings and shadow boards.', action: 'Paint yellow floor boundary lines for pallet placement and build mobile tool shadow boards.' },
    { name: 'Shine', japanese: 'Seiso', score: 3, description: 'Clean as an inspection method to uncover oil leaks, steam pipe corrosion, and fabric lint accumulation.', action: 'Institute mandatory 10-minute end-of-shift cleaning and machine inspection checklist.' },
    { name: 'Standardise', japanese: 'Seiketsu', score: 2, description: 'Visual standard work displays, photo checklists, and color-coded chemical labels.', action: 'Laminate visual SOP cards with bilingual Tamil/English photos above each control panel.' },
    { name: 'Sustain', japanese: 'Shitsuke', score: 2, description: 'Self-discipline, weekly management audits, and peer recognition for 5S compliance.', action: 'Weekly cross-department 5S audits by rotating supervisor teams with monthly rolling trophy.' }
  ]);

  // Takt Time State
  const [shiftHours, setShiftHours] = useState<number>(8);
  const [breakMinutes, setBreakMinutes] = useState<number>(60);
  const [shiftsPerDay, setShiftsPerDay] = useState<number>(2);
  const [dailyCustomerDemand, setDailyCustomerDemand] = useState<number>(450); // units or rolls per day
  const [currentCycleTime, setCurrentCycleTime] = useState<number>(95); // seconds per unit at bottleneck

  // Presets
  const handleLoadMeenakshiCase = () => {
    setWastes([
      { id: 't', name: 'Transport', letter: 'T', description: 'Wet fabric rolled on hand-trolleys 180 meters across open yard between dye kitchen and stenter.', score: 7, costImpactINR: 110, remedy: 'Rearrange stenter entry and install overhead enclosed monorail hoist.' },
      { id: 'i', name: 'Inventory', letter: 'I', description: '₹1.8 crore in un-dyed greige fabric inventory sitting in damp warehouse incurring mold risk.', score: 9, costImpactINR: 320, remedy: 'Shift to pull-based replenishment; cap supplier greige consignments to 3-day buffer.' },
      { id: 'm', name: 'Motion', letter: 'M', description: 'Dye operators walking back and forth 40 times a day to check paper lab test slips.', score: 6, costImpactINR: 55, remedy: 'Install digital Wi-Fi tablets at each dye vessel control station.' },
      { id: 'w', name: 'Waiting', letter: 'W', description: 'Dye vessels idling 90 minutes per batch waiting for lab chemist visual shade approval.', score: 10, costImpactINR: 420, remedy: 'Deploy calibrated digital spectrophotometer and auto-dispense dye dosing system.' },
      { id: 'o1', name: 'Overproduction', letter: 'O', description: 'Batch sizes rounded up to vessel capacity rather than matching customer purchase order yardage.', score: 8, costImpactINR: 230, remedy: 'Standardize small-lot recipes for 200kg and 300kg lots; align runs to actual dispatch.' },
      { id: 'o2', name: 'Overprocessing', letter: 'O', description: 'Double chemical wash-off cycles run as insurance against uncalibrated water hardness.', score: 6, costImpactINR: 90, remedy: 'Install continuous water softener monitoring and automated rinse conductivity probes.' },
      { id: 'd', name: 'Defects', letter: 'D', description: 'Edge tearing and color streaks on fabric edges generating 6.2% rework and B-grade fabric downgrades.', score: 8, costImpactINR: 280, remedy: 'Install infrared edge-centering guides on stenter frame (Poka-Yoke mistake proofing).' },
      { id: 's', name: 'Skills Under-utilized', letter: 'S', description: 'Machine operators treated as manual labor; zero Kaizen suggestions implemented in 18 months.', score: 7, costImpactINR: 75, remedy: 'Launch daily 15-min SQDC Gemba standup board with ₹500 spot award for adopted improvements.' }
    ]);
    setFiveS([
      { name: 'Sort', japanese: 'Seiri', score: 2, description: 'Dye kitchen clogged with obsolete 5-year-old expired dye drums and discarded wooden pallets.', action: 'Red-tag 45 obsolete chemical drums and sell scrap metal trolleys.' },
      { name: 'Set in Order', japanese: 'Seiton', score: 2, description: 'Dye ladles, hoses, and pH meters scattered across floor with no designated storage.', action: 'Create color-coded tool racks and painted designated trolley parking slots.' },
      { name: 'Shine', japanese: 'Seiso', score: 2, description: 'Chemical powder spills and fabric lint accumulated around stenter exhaust motors.', action: 'Install vacuum extraction hoods and daily 15-min cleaning rotation.' },
      { name: 'Standardise', japanese: 'Seiketsu', score: 2, description: 'Operators mix chemicals by personal visual estimates without verified weigh scales.', action: 'Install locked digital weigh scales with barcoded recipe verification.' },
      { name: 'Sustain', japanese: 'Shitsuke', score: 1, description: 'Supervisors skip 5S audits whenever production deadlines loom.', action: 'Managing Director joins Monday morning 5S Gemba walk with audit scorecard.' }
    ]);
    setShiftHours(8);
    setBreakMinutes(60);
    setShiftsPerDay(2);
    setDailyCustomerDemand(480);
    setCurrentCycleTime(125);
  };

  const handleReset = () => {
    setWastes(prev => prev.map(w => ({ ...w, score: 5, costImpactINR: 100 })));
    setFiveS(prev => prev.map(s => ({ ...s, score: 3 })));
    setShiftHours(8);
    setBreakMinutes(60);
    setShiftsPerDay(2);
    setDailyCustomerDemand(400);
    setCurrentCycleTime(90);
  };

  // Calculations
  const totalWasteScore = wastes.reduce((acc, w) => acc + w.score, 0); // max 80
  const wasteSeverityPercent = Math.round((totalWasteScore / 80) * 100);
  const totalMonthlyWasteINR = wastes.reduce((acc, w) => acc + w.costImpactINR, 0);

  const topWastes = [...wastes].sort((a, b) => b.score - a.score).slice(0, 3);

  const average5SScore = (fiveS.reduce((acc, s) => acc + s.score, 0) / 5).toFixed(1);

  // Takt Time Calculation
  const netShiftMinutes = Math.max(1, (shiftHours * 60) - breakMinutes);
  const totalDailyAvailableSeconds = netShiftMinutes * 60 * shiftsPerDay;
  const taktTimeSeconds = dailyCustomerDemand > 0 ? Math.round(totalDailyAvailableSeconds / dailyCustomerDemand) : 0;
  const isTaktSatisfied = currentCycleTime <= taktTimeSeconds;
  const taktDelta = taktTimeSeconds - currentCycleTime;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
              <Factory className="w-3.5 h-3.5" />
              <span>Operations & Process Framework #1</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Lean Management Simulator</h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Eliminate the 8 Wastes (TIMWOODS), audit 5S workplace organization, and balance production flow to customer Takt Time.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleLoadMeenakshiCase}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Load Case Study: Meenakshi Textiles</span>
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

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-6 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('timwoods')}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors px-1 ${
              activeTab === 'timwoods'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            1. 8 Wastes (TIMWOODS) Auditor
          </button>
          <button
            onClick={() => setActiveTab('5s')}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors px-1 ml-4 ${
              activeTab === '5s'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            2. 5S Workplace Audit
          </button>
          <button
            onClick={() => setActiveTab('takt')}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors px-1 ml-4 ${
              activeTab === 'takt'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            3. Takt Time & Flow Balancer
          </button>
        </div>
      </div>

      {/* TAB 1: TIMWOODS */}
      {activeTab === 'timwoods' && (
        <div className="space-y-6">
          {/* Summary Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
              <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider block">Waste Severity Index</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className={`text-2xl font-extrabold font-mono ${
                  wasteSeverityPercent > 70 ? 'text-red-600' : wasteSeverityPercent > 45 ? 'text-amber-600' : 'text-emerald-600'
                }`}>
                  {wasteSeverityPercent}%
                </span>
                <span className="text-xs text-slate-500 font-medium">({totalWasteScore} / 80 pts)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
                <div
                  className={`h-2 rounded-full ${
                    wasteSeverityPercent > 70 ? 'bg-red-500' : wasteSeverityPercent > 45 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${wasteSeverityPercent}%` }}
                />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
              <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider block">Estimated Monthly Muda Cost</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-extrabold font-mono text-slate-900">
                  ₹{(totalMonthlyWasteINR / 100).toFixed(2)}
                </span>
                <span className="text-xs text-slate-500 font-medium">Lakhs / month</span>
              </div>
              <span className="text-2xs text-slate-500 mt-1 block">Sum of scrap, idle machine hours, and excess inventory carrying costs</span>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
              <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider block">Primary Bottleneck Waste</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-lg font-bold text-slate-900">{topWastes[0]?.name}</span>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-red-100 text-red-700">
                  {topWastes[0]?.score}/10 Severity
                </span>
              </div>
              <span className="text-2xs text-slate-600 mt-1 block truncate">
                Countermeasure: {topWastes[0]?.remedy}
              </span>
            </div>
          </div>

          {/* Interactive 8 Wastes Sliders */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">TIMWOODS Waste Diagnostic Sliders</h3>
                <p className="text-xs text-slate-500 mt-0.5">Rate each waste from 0 (negligible) to 10 (catastrophic daily disruption) based on your Gemba observations.</p>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                8 Levers of Lean
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {wastes.map(w => (
                <div key={w.id} className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-emerald-600 text-white font-bold text-xs flex items-center justify-center font-mono">
                        {w.letter}
                      </span>
                      <span className="text-sm font-bold text-slate-800">{w.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xs font-semibold text-slate-500">₹{w.costImpactINR}k/mo</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold font-mono ${
                        w.score >= 8 ? 'bg-red-100 text-red-700' : w.score >= 5 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {w.score} / 10
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2">{w.description}</p>

                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={w.score}
                    onChange={(e) => {
                      const newScore = parseInt(e.target.value);
                      setWastes(prev => prev.map(item => item.id === w.id ? { ...item, score: newScore, costImpactINR: newScore * 35 } : item));
                    }}
                    className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />

                  <div className="text-2xs bg-white rounded p-2 border border-slate-200 text-slate-700 flex items-start gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">Prescribed Countermeasure:</strong> {w.remedy}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 5S WORKPLACE AUDIT */}
      {activeTab === '5s' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900">5S Visual Workplace Audit Matrix</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Evaluate Sort, Set in Order, Shine, Standardize, and Sustain on a 1 (chaotic) to 5 (world-class) scale.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-slate-900 text-white rounded-lg flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <div>
                    <span className="text-2xs text-slate-400 block uppercase font-mono">5S Plant Score</span>
                    <span className="text-sm font-bold font-mono">{average5SScore} / 5.0</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {fiveS.map((s, idx) => (
                <div key={s.name} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-sm flex items-center justify-center font-mono">
                        {idx + 1}S
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">{s.name}</h4>
                          <span className="text-xs text-slate-500 font-mono italic">({s.japanese})</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5">{s.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(num => (
                          <button
                            key={num}
                            onClick={() => {
                              setFiveS(prev => prev.map(item => item.name === s.name ? { ...item, score: num } : item));
                            }}
                            className={`w-7 h-7 rounded text-xs font-bold font-mono transition-colors ${
                              s.score === num
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                      <span className="text-xs font-bold text-slate-700 font-mono w-12 text-right">
                        {s.score === 1 && 'Critical'}
                        {s.score === 2 && 'Weak'}
                        {s.score === 3 && 'Average'}
                        {s.score === 4 && 'Good'}
                        {s.score === 5 && 'Benchmark'}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-600">
                    <span className="font-semibold text-emerald-700 shrink-0">Immediate Action Item:</span>
                    <span>{s.action}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TAKT TIME & FLOW */}
      {activeTab === 'takt' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input Parameters */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>Operating Parameters</span>
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Shift Length: <span className="font-mono text-emerald-700">{shiftHours} hours</span>
                  </label>
                  <input
                    type="range"
                    min="6"
                    max="12"
                    step="0.5"
                    value={shiftHours}
                    onChange={(e) => setShiftHours(parseFloat(e.target.value))}
                    className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Unplanned / Planned Breaks: <span className="font-mono text-emerald-700">{breakMinutes} mins</span>
                  </label>
                  <input
                    type="range"
                    min="15"
                    max="90"
                    step="5"
                    value={breakMinutes}
                    onChange={(e) => setBreakMinutes(parseInt(e.target.value))}
                    className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Operating Shifts Per Day: <span className="font-mono text-emerald-700">{shiftsPerDay} shifts</span>
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3].map(shifts => (
                      <button
                        key={shifts}
                        onClick={() => setShiftsPerDay(shifts)}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-colors ${
                          shiftsPerDay === shifts
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {shifts} {shifts === 1 ? 'Shift' : 'Shifts'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Daily Customer Demand: <span className="font-mono text-emerald-700">{dailyCustomerDemand} units/day</span>
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="1200"
                    step="25"
                    value={dailyCustomerDemand}
                    onChange={(e) => setDailyCustomerDemand(parseInt(e.target.value))}
                    className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Current Bottleneck Cycle Time: <span className="font-mono text-emerald-700">{currentCycleTime} sec</span>
                  </label>
                  <input
                    type="range"
                    min="30"
                    max="200"
                    step="5"
                    value={currentCycleTime}
                    onChange={(e) => setCurrentCycleTime(parseInt(e.target.value))}
                    className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Takt Time Results */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xs font-bold uppercase tracking-wider text-slate-400">Heartbeat of the Value Stream</span>
                    <h3 className="text-xl font-bold text-slate-900">Takt Time vs. Bottleneck Cycle Time</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                    isTaktSatisfied ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {isTaktSatisfied ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                    {isTaktSatisfied ? 'Flow Synchronized (Cycle <= Takt)' : 'Overburdened Bottleneck (Cycle > Takt)'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-2xs font-bold text-slate-500 uppercase tracking-wider block">Net Available Time</span>
                    <span className="text-xl font-bold font-mono text-slate-900 mt-1 block">
                      {(totalDailyAvailableSeconds / 3600).toFixed(1)} hrs
                    </span>
                    <span className="text-2xs text-slate-500">{totalDailyAvailableSeconds.toLocaleString()} seconds/day</span>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span className="text-2xs font-bold text-emerald-700 uppercase tracking-wider block">Target Takt Time</span>
                    <span className="text-2xl font-extrabold font-mono text-emerald-800 mt-1 block">
                      {taktTimeSeconds}s
                    </span>
                    <span className="text-2xs text-emerald-600">Must finish 1 unit every {taktTimeSeconds} sec</span>
                  </div>

                  <div className={`p-4 rounded-xl border ${
                    isTaktSatisfied ? 'bg-blue-50 border-blue-200' : 'bg-red-50 border-red-200'
                  }`}>
                    <span className={`text-2xs font-bold uppercase tracking-wider block ${
                      isTaktSatisfied ? 'text-blue-700' : 'text-red-700'
                    }`}>
                      Cycle vs Takt Delta
                    </span>
                    <span className={`text-2xl font-extrabold font-mono mt-1 block ${
                      isTaktSatisfied ? 'text-blue-800' : 'text-red-800'
                    }`}>
                      {taktDelta >= 0 ? `+${taktDelta}s Buffer` : `${taktDelta}s Deficit`}
                    </span>
                    <span className={`text-2xs ${isTaktSatisfied ? 'text-blue-600' : 'text-red-600'}`}>
                      {isTaktSatisfied ? 'Operating with healthy safety cushion' : 'Overtime / line starvation guaranteed'}
                    </span>
                  </div>
                </div>

                {/* Visual Bar Comparison */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-emerald-700">Takt Time Requirement: {taktTimeSeconds} seconds</span>
                      <span className="text-slate-500">100% Demand Pace</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3">
                      <div className="bg-emerald-500 h-3 rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className={isTaktSatisfied ? 'text-blue-700' : 'text-red-700'}>
                        Current Bottleneck Cycle Time: {currentCycleTime} seconds
                      </span>
                      <span className="font-mono text-slate-500">
                        {Math.round((currentCycleTime / Math.max(1, taktTimeSeconds)) * 100)}% of Takt
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${isTaktSatisfied ? 'bg-blue-500' : 'bg-red-500'}`}
                        style={{ width: `${Math.min(100, (currentCycleTime / Math.max(1, taktTimeSeconds)) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Practical Advice */}
                <div className="mt-6 p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1.5">
                  <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                    <TrendingDown className="w-4 h-4 text-emerald-600" />
                    Lean Standard Work Recommendation:
                  </span>
                  {isTaktSatisfied ? (
                    <p>
                      Your bottleneck cycle time ({currentCycleTime}s) is inside customer Takt ({taktTimeSeconds}s). Do not speed up machines further—that produces overproduction Muda. Instead, balance upstream and downstream stations so operators do not wait or accumulate WIP between steps.
                    </p>
                  ) : (
                    <p>
                      Your bottleneck is running {Math.abs(taktDelta)}s slower than customer demand. Immediate countermeasures: 1) Apply SMED to eliminate machine changeovers; 2) Offload non-value-adding tasks (packaging, pre-weighing) to an off-line assistant; 3) Re-balance work elements across adjacent stations.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
