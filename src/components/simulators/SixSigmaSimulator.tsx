import { useState } from 'react';
import { Target, CheckCircle2, RotateCcw, AlertTriangle, Sparkles, Layers, Search, ChevronRight, Activity } from 'lucide-react';

interface FishboneCategory {
  name: string;
  code: string;
  causes: string[];
}

export function SixSigmaSimulator() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'fishbone' | 'dmaic'>('calculator');

  // Calculator State
  const [unitsInspected, setUnitsInspected] = useState<number>(2500);
  const [opportunitiesPerUnit, setOpportunitiesPerUnit] = useState<number>(6);
  const [defectsObserved, setDefectsObserved] = useState<number>(45);

  // DMAIC Phase State
  const [activeDmaicPhase, setActiveDmaicPhase] = useState<'D' | 'M' | 'A' | 'I' | 'C'>('D');

  // Fishbone State
  const [fishbone, setFishbone] = useState<FishboneCategory[]>([
    { name: 'Man / People', code: 'man', causes: ['High operator turnover on 3rd shift', 'Inconsistent core sand ramming pressure between shift crews', 'Lack of visual defect atlas for incoming operators'] },
    { name: 'Machine / Tooling', code: 'machine', causes: ['Wear on induction furnace refractory lining', 'Uncalibrated thermocouple displaying 25°C higher than actual molten temp', 'Vibration in mold shaking table'] },
    { name: 'Method / Process', code: 'method', causes: ['Pouring speed too slow causing cold shuts', 'No standard preheating time for pouring ladles', 'Gating ratio changed without engineering sign-off'] },
    { name: 'Material / Inputs', code: 'material', causes: ['Scrap metal charge containing rust and oil residue', 'Bentonite clay moisture content fluctuating from 3.2% to 5.8%', 'Unwashed silica sand batch'] },
    { name: 'Measurement / Gauges', code: 'measurement', causes: ['Optical emission spectrometer recalibrated only quarterly', 'Operator visual inspection lighting under 300 lux', 'Gage R&R error of 28% on bore micrometer'] },
    { name: 'Milieu / Environment', code: 'milieu', causes: ['Monsoon ambient humidity spike causing hydrogen absorption in melt', 'Dust accumulation on cooling conveyor', 'Temperature swings in sand storage shed'] }
  ]);

  const [fiveWhys, setFiveWhys] = useState<{ step: number; question: string; answer: string }[]>([
    { step: 1, question: 'Why did the valve casting fail radiographic pressure testing?', answer: 'Gas blowholes and micro-porosity were detected in the valve body wall.' },
    { step: 2, question: 'Why was gas trapped inside the molten metal wall during pouring?', answer: 'Excess moisture and volatile compounds in the green sand mold vaporized upon metal contact.' },
    { step: 3, question: 'Why was sand mold moisture content at 5.4% instead of the 3.2%–3.6% spec?', answer: 'The automated sand muller water-dosing solenoid valve was sticking open.' },
    { step: 4, question: 'Why was the solenoid valve sticking without maintenance intervention?', answer: 'Preventive maintenance on the sand preparation plant was deferred due to heavy dispatch rush.' },
    { step: 5, question: 'Why was maintenance deferred without triggering a process stop? (Root Cause)', answer: 'No autonomous maintenance standard or interlock linked solenoid cycle count to maintenance scheduling.' }
  ]);

  // Load Preset Case
  const handleLoadVaigaiCase = () => {
    setUnitsInspected(5000);
    setOpportunitiesPerUnit(8);
    setDefectsObserved(32); // Was 240 before project
    setActiveDmaicPhase('I');
  };

  const handleReset = () => {
    setUnitsInspected(2000);
    setOpportunitiesPerUnit(5);
    setDefectsObserved(60);
    setActiveDmaicPhase('D');
  };

  // Calculations
  const totalOpportunities = Math.max(1, unitsInspected * opportunitiesPerUnit);
  const dpu = (defectsObserved / Math.max(1, unitsInspected)).toFixed(4);
  const dpo = defectsObserved / totalOpportunities;
  const dpmo = Math.round(dpo * 1000000);
  const yieldPercent = Math.max(0, (1 - dpo) * 100).toFixed(3);

  // Approximate Sigma level with 1.5 standard shift
  const calculateSigmaLevel = (dpmoVal: number): number => {
    if (dpmoVal <= 3.4) return 6.0;
    if (dpmoVal <= 233) return 5.0 + (1 - (dpmoVal - 3.4) / (233 - 3.4));
    if (dpmoVal <= 6210) return 4.0 + (1 - (dpmoVal - 233) / (6210 - 233));
    if (dpmoVal <= 66807) return 3.0 + (1 - (dpmoVal - 6210) / (66807 - 6210));
    if (dpmoVal <= 308537) return 2.0 + (1 - (dpmoVal - 66807) / (308537 - 66807));
    if (dpmoVal <= 690000) return 1.0 + (1 - (dpmoVal - 308537) / (690000 - 308537));
    return 0.5;
  };

  const sigmaLevel = calculateSigmaLevel(dpmo).toFixed(2);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2">
              <Target className="w-3.5 h-3.5" />
              <span>Operations & Process Framework #2</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Six Sigma DMAIC & Quality Capability Simulator</h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Calculate DPMO & Sigma Level, navigate DMAIC project milestones, and uncover root causes using the 6M Fishbone and 5-Whys.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleLoadVaigaiCase}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-300 rounded-lg transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Load Case Study: Vaigai Castings (Porosity Fix)</span>
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
            onClick={() => setActiveTab('calculator')}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors px-1 ${
              activeTab === 'calculator'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            1. DPMO & Sigma Level Calculator
          </button>
          <button
            onClick={() => setActiveTab('fishbone')}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors px-1 ml-4 ${
              activeTab === 'fishbone'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            2. Ishikawa 6M Fishbone & 5-Whys
          </button>
          <button
            onClick={() => setActiveTab('dmaic')}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors px-1 ml-4 ${
              activeTab === 'dmaic'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            3. DMAIC Tollgate Navigator
          </button>
        </div>
      </div>

      {/* TAB 1: DPMO CALCULATOR */}
      {activeTab === 'calculator' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-600" />
                <span>Process Inspection Data</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-slate-700">Units Inspected (N)</label>
                    <span className="text-xs font-mono font-bold text-indigo-700">{unitsInspected.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="10000"
                    step="100"
                    value={unitsInspected}
                    onChange={(e) => setUnitsInspected(parseInt(e.target.value))}
                    className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <span className="text-2xs text-slate-400">Total sample size inspected in sample window</span>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-slate-700">Defect Opportunities / Unit (O)</label>
                    <span className="text-xs font-mono font-bold text-indigo-700">{opportunitiesPerUnit}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={opportunitiesPerUnit}
                    onChange={(e) => setOpportunitiesPerUnit(parseInt(e.target.value))}
                    className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <span className="text-2xs text-slate-400">Distinct CTQ failure modes possible per item</span>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-slate-700">Total Defects Observed (D)</label>
                    <span className="text-xs font-mono font-bold text-red-600">{defectsObserved}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="2"
                    value={defectsObserved}
                    onChange={(e) => setDefectsObserved(parseInt(e.target.value))}
                    className="w-full accent-red-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <span className="text-2xs text-slate-400">Count of defective attributes (one unit may have multiple)</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-2xs text-slate-600">
                <strong>Standard Formula:</strong> DPMO = (Total Defects ÷ (Units × Opportunities)) × 1,000,000. Assumes standard 1.5σ long-term process drift.
              </div>
            </div>

            {/* Capability Scoreboard */}
            <div className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                  <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider block">Process Sigma Level</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-extrabold font-mono text-indigo-700">{sigmaLevel}σ</span>
                    <span className="text-xs font-semibold text-slate-500">Capability</span>
                  </div>
                  <span className="text-2xs font-semibold text-indigo-600 mt-2 block">
                    {parseFloat(sigmaLevel) >= 5.0 ? 'World-Class / Aerospace Grade' : parseFloat(sigmaLevel) >= 4.0 ? 'Industry Standard Benchmark' : parseFloat(sigmaLevel) >= 3.0 ? 'Typical Uncontrolled Process' : 'Severe Quality Crisis'}
                  </span>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                  <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider block">DPMO Metric</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-extrabold font-mono text-slate-900">{dpmo.toLocaleString()}</span>
                  </div>
                  <span className="text-2xs text-slate-500 mt-2 block">Defects per million opportunities</span>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                  <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider block">Process Yield</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-extrabold font-mono text-emerald-600">{yieldPercent}%</span>
                  </div>
                  <span className="text-2xs text-slate-500 mt-2 block">DPU = {dpu} defects/unit</span>
                </div>
              </div>

              {/* Sigma Benchmark Ladder */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                <h4 className="text-sm font-bold text-slate-900 mb-3">Six Sigma Capability Spectrum Reference</h4>
                <div className="space-y-2.5">
                  {[
                    { sigma: '6σ', dpmo: '3.4', yield: '99.9997%', label: 'World-Class (Near Zero Defect)', active: parseFloat(sigmaLevel) >= 5.5 },
                    { sigma: '5σ', dpmo: '233', yield: '99.977%', label: 'High Reliability Manufacturing', active: parseFloat(sigmaLevel) >= 4.5 && parseFloat(sigmaLevel) < 5.5 },
                    { sigma: '4σ', dpmo: '6,210', yield: '99.38%', label: 'Competitive Industry Average', active: parseFloat(sigmaLevel) >= 3.5 && parseFloat(sigmaLevel) < 4.5 },
                    { sigma: '3σ', dpmo: '66,807', yield: '93.32%', label: 'Typical Un-improved Legacy Baseline', active: parseFloat(sigmaLevel) >= 2.5 && parseFloat(sigmaLevel) < 3.5 },
                    { sigma: '2σ', dpmo: '308,537', yield: '69.15%', label: 'Heavy Rework, Scrap & High Cost of Quality', active: parseFloat(sigmaLevel) < 2.5 }
                  ].map(lvl => (
                    <div
                      key={lvl.sigma}
                      className={`p-3 rounded-lg border flex items-center justify-between text-xs transition-colors ${
                        lvl.active
                          ? 'bg-indigo-50 border-indigo-300 ring-2 ring-indigo-500/20 shadow-xs'
                          : 'bg-slate-50/50 border-slate-200 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded bg-slate-900 text-white font-mono font-bold flex items-center justify-center">
                          {lvl.sigma}
                        </span>
                        <div>
                          <span className="font-bold text-slate-900">{lvl.label}</span>
                          <span className="text-slate-500 block text-2xs">Yield: {lvl.yield}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-slate-800">{lvl.dpmo} DPMO</span>
                        {lvl.active && <span className="text-2xs font-bold text-indigo-700 block uppercase">Current Position</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FISHBONE & 5-WHYS */}
      {activeTab === 'fishbone' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Ishikawa 6M Cause-and-Effect Diagram</h3>
                <p className="text-xs text-slate-500 mt-0.5">Categorize potential root causes across Manpower, Machines, Methods, Materials, Measurement, and Milieu.</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-200">
                Analyze Phase Tool
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {fishbone.map((cat) => (
                <div key={cat.code} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{cat.name}</span>
                    <span className="text-2xs px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-mono font-bold">
                      {cat.causes.length} causes
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {cat.causes.map((c, i) => (
                      <li key={i} className="text-2xs text-slate-600 bg-white p-2 rounded border border-slate-200 flex items-start gap-1.5">
                        <ChevronRight className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* 5-Whys Drilldown */}
            <div className="border-t border-slate-200 pt-6">
              <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Search className="w-4 h-4 text-indigo-600" />
                <span>5-Whys Deep Root Cause Inquiry</span>
              </h4>
              <div className="space-y-3">
                {fiveWhys.map((step) => (
                  <div key={step.step} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-2xs font-bold flex items-center justify-center font-mono">
                        {step.step}
                      </span>
                      <span className="text-xs font-bold text-slate-800">{step.question}</span>
                    </div>
                    <p className="text-xs text-slate-600 pl-7">{step.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DMAIC NAVIGATOR */}
      {activeTab === 'dmaic' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-2">DMAIC 5-Phase Tollgate Milestones</h3>
            <p className="text-xs text-slate-500 mb-6">Select each phase to view required deliverables, tollgate checklist, and executive review criteria.</p>

            <div className="grid grid-cols-5 gap-2 mb-6">
              {[
                { code: 'D', name: 'Define', deliverable: 'Project Charter & SIPOC' },
                { code: 'M', name: 'Measure', deliverable: 'Gage R&R & Baseline DPMO' },
                { code: 'A', name: 'Analyze', deliverable: 'Fishbone & Hypotheses' },
                { code: 'I', name: 'Improve', deliverable: 'Poka-Yoke & Pilot Run' },
                { code: 'C', name: 'Control', deliverable: 'SPC Charts & Standard Work' }
              ].map(phase => (
                <button
                  key={phase.code}
                  onClick={() => setActiveDmaicPhase(phase.code as any)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    activeDmaicPhase === phase.code
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-indigo-300'
                  }`}
                >
                  <span className="text-xs font-extrabold font-mono block">Phase {phase.code}</span>
                  <span className="text-sm font-bold block mt-0.5">{phase.name}</span>
                  <span className={`text-2xs block mt-1 truncate ${activeDmaicPhase === phase.code ? 'text-indigo-100' : 'text-slate-500'}`}>
                    {phase.deliverable}
                  </span>
                </button>
              ))}
            </div>

            {/* Selected Phase Detail */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
              {activeDmaicPhase === 'D' && (
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Define Phase: Scoping the Quality Problem</h4>
                  <p className="text-xs text-slate-600 mt-1">Develop the Project Charter, define the Problem Statement, establish financial business case, and map high-level SIPOC.</p>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-white rounded border border-slate-200">
                      <strong>Problem Statement:</strong> "In FY25, valve casting blowhole defect rate averaged 4.8%, causing ₹38 lakh in scrap and delayed dispatches to European valve buyers."
                    </div>
                    <div className="p-3 bg-white rounded border border-slate-200">
                      <strong>Objective Statement:</strong> "Reduce blowhole defects from 4.8% to under 1.0% within 4 months, saving ₹30 lakh annually without adding inspection labor."
                    </div>
                  </div>
                </div>
              )}
              {activeDmaicPhase === 'M' && (
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Measure Phase: Proving Data Integrity & Baseline</h4>
                  <p className="text-xs text-slate-600 mt-1">Validate the measurement system through Gage R&R, build operational definitions for CTQs, and determine baseline Sigma Level.</p>
                  <div className="mt-3 p-3 bg-white rounded border border-slate-200 text-xs">
                    <strong>Gage R&R Audit:</strong> Optical pyrometer demonstrated 24% appraiser variation due to angle of measurement. Mandated fixed tripod mount and calibrated emissivity settings.
                  </div>
                </div>
              )}
              {activeDmaicPhase === 'A' && (
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Analyze Phase: Isolating Vital Few Root Causes</h4>
                  <p className="text-xs text-slate-600 mt-1">Apply 6M Fishbone, 5-Whys, Multi-Vari testing, and ANOVA/Regression to prove statistical significance of suspected variables.</p>
                  <div className="mt-3 p-3 bg-white rounded border border-slate-200 text-xs">
                    <strong>Validated Root Cause:</strong> Green sand moisture content spikes above 4.2% during shift changeovers due to uncalibrated solenoid valves on muller water line (p-value &lt; 0.001).
                  </div>
                </div>
              )}
              {activeDmaicPhase === 'I' && (
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Improve Phase: Mistake-Proofing & Countermeasures</h4>
                  <p className="text-xs text-slate-600 mt-1">Design and pilot countermeasures, install automated Poka-Yoke interlocks, and run Design of Experiments (DOE).</p>
                  <div className="mt-3 p-3 bg-white rounded border border-slate-200 text-xs">
                    <strong>Implemented Solution:</strong> Replaced timer-based water dosing with digital infrared moisture probe feedback loop and automated pneumatic moisture cut-off.
                  </div>
                </div>
              )}
              {activeDmaicPhase === 'C' && (
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Control Phase: Locking In Gains with Statistical Process Control</h4>
                  <p className="text-xs text-slate-600 mt-1">Deploy real-time X-bar and R control charts, document standard operating procedures (SOPs), and transition ownership to line process owners.</p>
                  <div className="mt-3 p-3 bg-white rounded border border-slate-200 text-xs">
                    <strong>Process Control Plan:</strong> Automated moisture control chart with red warning buzzer if sand moisture exceeds 3.7%; daily verification by 1st shift supervisor.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
