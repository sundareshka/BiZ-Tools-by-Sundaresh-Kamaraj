import { useState } from 'react';
import { RefreshCw, CheckCircle2, RotateCcw, AlertTriangle, Sparkles, Calendar, Footprints, ArrowRight, Zap, Award } from 'lucide-react';

interface GembaObservation {
  id: string;
  station: string;
  wasteType: string;
  observation: string;
  suggestion: string;
  effort: 'Low' | 'Medium' | 'High';
  impact: 'Low' | 'Medium' | 'High';
  status: 'Identified' | 'Piloting' | 'Standardized';
}

interface KpiMetric {
  name: string;
  unit: string;
  before: number;
  after: number;
}

export function KaizenSimulator() {
  const [activeTab, setActiveTab] = useState<'pdca' | 'gemba' | 'blitz' | 'impact'>('pdca');
  const [pdcaStep, setPdcaStep] = useState<'plan' | 'do' | 'check' | 'act'>('plan');

  // Gemba Log State
  const [observations, setObservations] = useState<GembaObservation[]>([
    {
      id: 'g-1',
      station: '250T Stamping Press #3',
      wasteType: 'Waiting / Motion',
      observation: 'Operators spend 22 minutes hunting for heavy Allen keys and die alignment shims across three different tool cribs during every die changeover.',
      suggestion: 'Mount dedicated color-coded tool shadow board directly onto the press frame with dedicated torque wrenches.',
      effort: 'Low',
      impact: 'High',
      status: 'Standardized'
    },
    {
      id: 'g-2',
      station: 'Blank Feeder Conveyor',
      wasteType: 'Defects / Overprocessing',
      observation: 'Sheet blanks occasionally tilt on the loading chute, causing press jams and mangled parts twice per shift.',
      suggestion: 'Weld two adjustable magnetic guide rails to center the steel sheet as it drops into the feeder (Poka-Yoke).',
      effort: 'Low',
      impact: 'High',
      status: 'Standardized'
    },
    {
      id: 'g-3',
      station: 'Die Storage Bay',
      wasteType: 'Transport',
      observation: 'Frequent dies stored 70 meters away at the far end of the bay; crane operator takes 18 minutes per transfer.',
      suggestion: 'Re-slot top 5 high-runner dies to the front rack adjacent to the press bed.',
      effort: 'Medium',
      impact: 'High',
      status: 'Piloting'
    },
    {
      id: 'g-4',
      station: 'Scrap Bin Removal',
      wasteType: 'Waiting',
      observation: 'Line stops for 12 minutes whenever the under-press scrap bin fills, waiting for an available forklift driver.',
      suggestion: 'Install an automated tilted roller conveyor that ejects scrap bins into the central aisle automatically.',
      effort: 'Medium',
      impact: 'Medium',
      status: 'Identified'
    }
  ]);

  // Before & After Impact Metrics
  const [metrics, setMetrics] = useState<KpiMetric[]>([
    { name: 'Die Setup / Changeover Time', unit: 'minutes', before: 78, after: 14 },
    { name: 'Operator Walking Distance', unit: 'meters/shift', before: 3400, after: 680 },
    { name: 'First-Pass Scrap Rate', unit: '%', before: 4.6, after: 0.8 },
    { name: 'Floor Space Occupied', unit: 'sq meters', before: 180, after: 95 },
    { name: 'Setup Frequency Capacity', unit: 'setups/day', before: 2, after: 7 }
  ]);

  const handleLoadPandiyanCase = () => {
    setPdcaStep('act');
    setMetrics([
      { name: 'Die Setup / Changeover Time (SMED)', unit: 'minutes', before: 78, after: 14 },
      { name: 'Operator Walking Steps per Changeover', unit: 'steps', before: 2450, after: 310 },
      { name: 'Setup Scrap Blanks', unit: 'parts/setup', before: 24, after: 2 },
      { name: 'Annual Capacity Released', unit: 'machine hours', before: 0, after: 285 },
      { name: 'Changeover Cost per Batch', unit: 'INR', before: 3200, after: 580 }
    ]);
  };

  const handleReset = () => {
    setPdcaStep('plan');
    setMetrics([
      { name: 'Setup Changeover Time', unit: 'minutes', before: 60, after: 30 },
      { name: 'Walking Distance', unit: 'meters/shift', before: 2000, after: 1000 },
      { name: 'Scrap Rate', unit: '%', before: 5.0, after: 2.5 },
      { name: 'Floor Space Occupied', unit: 'sq meters', before: 150, after: 110 },
      { name: 'Setup Capacity', unit: 'setups/day', before: 3, after: 5 }
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 mb-2">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Operations & Process Framework #3</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Kaizen Continuous Improvement Engine</h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Execute iterative Plan-Do-Check-Act cycles, log frontline Gemba walk friction, plan 5-day blitz events, and quantify before-after ROI.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleLoadPandiyanCase}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-lg transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Load Case Study: Pandiyan Auto (SMED Blitz)</span>
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
            onClick={() => setActiveTab('pdca')}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors px-1 ${
              activeTab === 'pdca'
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            1. PDCA Cycle Interactive Loop
          </button>
          <button
            onClick={() => setActiveTab('gemba')}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors px-1 ml-4 ${
              activeTab === 'gemba'
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            2. Gemba Walk Friction Log
          </button>
          <button
            onClick={() => setActiveTab('blitz')}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors px-1 ml-4 ${
              activeTab === 'blitz'
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            3. 5-Day Kaizen Blitz Roadmap
          </button>
          <button
            onClick={() => setActiveTab('impact')}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors px-1 ml-4 ${
              activeTab === 'impact'
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            4. Before vs. After KPI Impact
          </button>
        </div>
      </div>

      {/* TAB 1: PDCA CYCLE */}
      {activeTab === 'pdca' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { id: 'plan', step: 'P', title: 'Plan', subtitle: 'Identify problem, baseline metrics & hypothesize fixes', color: 'border-blue-500 text-blue-700' },
              { id: 'do', step: 'D', title: 'Do', subtitle: 'Pilot test countermeasure on single workstation or small batch', color: 'border-amber-500 text-amber-700' },
              { id: 'check', step: 'C', title: 'Check', subtitle: 'Analyze test data against target KPI condition', color: 'border-emerald-500 text-emerald-700' },
              { id: 'act', step: 'A', title: 'Act', subtitle: 'Standardize successful method or iterate if goal missed', color: 'border-purple-500 text-purple-700' }
            ].map(stage => (
              <button
                key={stage.id}
                onClick={() => setPdcaStep(stage.id as any)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  pdcaStep === stage.id
                    ? `${stage.color} bg-white shadow-sm ring-2 ring-slate-900/10`
                    : 'border-slate-200 bg-white/60 hover:border-slate-300 opacity-75'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="w-8 h-8 rounded-lg bg-slate-900 text-white font-mono font-bold flex items-center justify-center text-sm">
                    {stage.step}
                  </span>
                  {pdcaStep === stage.id && <span className="text-2xs font-bold uppercase text-slate-400">Active Stage</span>}
                </div>
                <h3 className="text-base font-bold text-slate-900">{stage.title}</h3>
                <p className="text-xs text-slate-600 mt-1">{stage.subtitle}</p>
              </button>
            ))}
          </div>

          {/* Interactive PDCA Detail Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            {pdcaStep === 'plan' && (
              <div className="space-y-3">
                <span className="text-2xs font-bold text-blue-600 uppercase tracking-wider block">Stage 1: Scientific Planning</span>
                <h3 className="text-lg font-bold text-slate-900">Define Baseline, Gap & Countermeasure Hypothesis</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                    <strong className="text-slate-900 block mb-1">1. Current Condition:</strong>
                    Die changeovers on the 250T press average 78 minutes, constraining capacity to only 2 product changeovers per day.
                  </div>
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                    <strong className="text-slate-900 block mb-1">2. Target Condition:</strong>
                    Cut changeover time to under 15 minutes (SMED standard) to allow 6 changeovers per day with zero overtime.
                  </div>
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                    <strong className="text-slate-900 block mb-1">3. Hypothesis:</strong>
                    Separating Internal tasks (machine stopped) from External tasks (pre-heating, staging dies while press runs) will slash downtime by 60%.
                  </div>
                </div>
              </div>
            )}

            {pdcaStep === 'do' && (
              <div className="space-y-3">
                <span className="text-2xs font-bold text-amber-600 uppercase tracking-wider block">Stage 2: Frontline Experimentation</span>
                <h3 className="text-lg font-bold text-slate-900">Execute Small-Scale Pilot on Single Shift</h3>
                <p className="text-xs text-slate-600">
                  Do NOT roll out across the entire plant at once. Test the hypothesis on Press #3 with Shift A operators over 3 days. Use cardboard prototypes, temporary chalk floor markings, and magnetic tool trays before purchasing expensive storage cabinets.
                </p>
                <div className="p-3.5 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900">
                  <strong>Try-Storming Rule:</strong> Favor action over debate. If an operator suggests testing a new clamping bolt design, try it within 30 minutes using available workshop parts.
                </div>
              </div>
            )}

            {pdcaStep === 'check' && (
              <div className="space-y-3">
                <span className="text-2xs font-bold text-emerald-600 uppercase tracking-wider block">Stage 3: Data-Driven Evaluation</span>
                <h3 className="text-lg font-bold text-slate-900">Compare Measured Pilot Results Against Hypothesis</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900 block">Pre-Pilot Changeover Baseline:</span>
                    <span className="text-lg font-extrabold font-mono text-red-600">78 minutes</span>
                  </div>
                  <div className="p-3.5 bg-emerald-50 rounded-lg border border-emerald-200">
                    <span className="font-bold text-emerald-900 block">Pilot Test Measured Time:</span>
                    <span className="text-lg font-extrabold font-mono text-emerald-700">14 minutes (82% Reduction)</span>
                  </div>
                </div>
              </div>
            )}

            {pdcaStep === 'act' && (
              <div className="space-y-3">
                <span className="text-2xs font-bold text-purple-600 uppercase tracking-wider block">Stage 4: Standardization & Yokoten</span>
                <h3 className="text-lg font-bold text-slate-900">Lock In Standard Work & Cascade Across All Lines</h3>
                <p className="text-xs text-slate-600">
                  Update the Standard Work Sheet with bilingual photo guides. Train all three shift teams. Horizontally deploy (Yokoten) the identical SMED shadow board and pre-heating cart across Press #1, #2, and #4.
                </p>
                <div className="p-3.5 bg-purple-50 rounded-lg border border-purple-200 text-xs text-purple-900">
                  <strong>Kaizen Golden Rule:</strong> Without standard work, there can be no Kaizen. The new 14-minute process becomes the immutable baseline for the next round of improvements.
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: GEMBA LOG */}
      {activeTab === 'gemba' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Footprints className="w-4 h-4 text-amber-600" />
                  <span>Gemba Walk Friction & Observation Log</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Direct observations recorded by supervisors and plant managers on the workshop floor.</p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-amber-50 text-amber-700 border border-amber-200">
                {observations.length} Observations Logged
              </span>
            </div>

            <div className="space-y-3">
              {observations.map(obs => (
                <div key={obs.id} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-amber-300 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{obs.station}</span>
                      <span className="text-2xs px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                        Waste: {obs.wasteType}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-2xs font-bold px-2 py-0.5 rounded ${
                        obs.impact === 'High' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {obs.impact} Impact
                      </span>
                      <span className={`text-2xs font-bold px-2 py-0.5 rounded ${
                        obs.status === 'Standardized' ? 'bg-purple-100 text-purple-800' : obs.status === 'Piloting' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {obs.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mb-2">
                    <strong>Observation:</strong> {obs.observation}
                  </p>

                  <div className="p-2.5 rounded bg-slate-50 border border-slate-100 text-xs text-slate-800 flex items-start gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>Frontline Suggestion:</strong> {obs.suggestion}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: 5-DAY BLITZ ROADMAP */}
      {activeTab === 'blitz' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-600" />
                <span>5-Day Rapid Kaizen Blitz Event Architecture</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">A focused, cross-functional sprint dedicated to transforming a stubborn workstation.</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-amber-50 text-amber-700 border border-amber-200">
              1-Week Breakthrough
            </span>
          </div>

          <div className="space-y-3">
            {[
              { day: 'Day 1 (Monday)', title: 'Team Kickoff, Charter & Gemba Immersion', tasks: 'Review project scope with executive sponsor; film video of current changeover; measure baseline cycle times; calculate waste minutes.' },
              { day: 'Day 2 (Tuesday)', title: 'Process Deconstruction & Root Cause Mapping', tasks: 'Deconstruct filmed process step-by-step; categorize tasks into Internal vs. External; run 5-Whys and Ishikawa on top 3 delay reasons.' },
              { day: 'Day 3 (Wednesday)', title: 'Countermeasure Design & Try-Storming', tasks: 'Brainstorm creative zero-cost solutions; build cardboard/wood prototypes of tool shadow boards; simulate new layout on shop floor.' },
              { day: 'Day 4 (Thursday)', title: 'Pilot Testing & Standard Work Documentation', tasks: 'Execute live pilot changeover on production press; refine ergonomic issues; draft laminated bilingual SOP cards with color photos.' },
              { day: 'Day 5 (Friday)', title: 'Executive Report-Out & Celebration', tasks: 'Present verified before-after metrics to Managing Director and operators; award Kaizen certificates; schedule 30-day sustainment audit.' }
            ].map(d => (
              <div key={d.day} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-start gap-4">
                <span className="w-28 text-xs font-bold font-mono text-amber-800 bg-amber-100 px-2.5 py-1.5 rounded-lg shrink-0 text-center">
                  {d.day}
                </span>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900">{d.title}</h4>
                  <p className="text-xs text-slate-600">{d.tasks}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: BEFORE VS AFTER KPI IMPACT */}
      {activeTab === 'impact' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Verified Before vs. After KPI Scorecard</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Quantifiable operational improvements achieved from the Kaizen blitz.</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              Validated ROI
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics.map(m => {
              const diff = m.before - m.after;
              const percentImprovement = Math.round((Math.abs(diff) / m.before) * 100);
              const isReduction = diff > 0;

              return (
                <div key={m.name} className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-2">
                  <span className="text-xs font-bold text-slate-800 block truncate">{m.name}</span>

                  <div className="flex items-baseline justify-between pt-1">
                    <div>
                      <span className="text-2xs text-slate-400 block uppercase">Before</span>
                      <span className="text-sm font-mono font-bold text-slate-500">{m.before} {m.unit}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                    <div>
                      <span className="text-2xs text-emerald-600 block uppercase font-bold">After</span>
                      <span className="text-lg font-mono font-extrabold text-emerald-700">{m.after} {m.unit}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Impact Gain:</span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {isReduction ? `-${percentImprovement}% Reduction` : `+${percentImprovement}% Increase`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
