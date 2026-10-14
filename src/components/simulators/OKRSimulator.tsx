import { useState } from 'react';
import { Plus, Trash2, CheckCircle2, AlertTriangle, Sparkles, RotateCcw, Target, TrendingUp, HelpCircle } from 'lucide-react';

export interface KeyResult {
  id: string;
  metric: string;
  baseline: string;
  target: string;
  deadline: string;
  currentValue: string;
  type: 'Aspirational' | 'Committed';
  confidenceScore: number; // 1-10
  endQuarterGrade: number; // 0.0 - 1.0
  owner: string;
}

export interface OkrObjective {
  id: string;
  title: string;
  quarter: string;
  team: string;
  keyResults: KeyResult[];
}

const TRICHY_EDUTECH_PRESET: OkrObjective[] = [
  {
    id: 'obj-1',
    title: 'Win the Subscriber’s Second Year',
    quarter: 'Q3 2026',
    team: 'Company-Wide',
    keyResults: [
      {
        id: 'kr-1',
        metric: 'Annual subscriber renewal rate',
        baseline: '31%',
        target: '45%',
        deadline: 'Sept 30',
        currentValue: '42%',
        type: 'Aspirational',
        confidenceScore: 8,
        endQuarterGrade: 0.8,
        owner: 'Customer Retention Lead'
      },
      {
        id: 'kr-2',
        metric: 'Second-year curriculum video completions',
        baseline: '1,200',
        target: '2,500',
        deadline: 'Sept 30',
        currentValue: '2,500',
        type: 'Aspirational',
        confidenceScore: 9,
        endQuarterGrade: 1.0,
        owner: 'Content Director'
      },
      {
        id: 'kr-3',
        metric: 'Net Promoter Score (NPS) of year-2 subscribers',
        baseline: '32',
        target: '45',
        deadline: 'Sept 30',
        currentValue: '41',
        type: 'Aspirational',
        confidenceScore: 7,
        endQuarterGrade: 0.7,
        owner: 'Product Manager'
      }
    ]
  },
  {
    id: 'obj-2',
    title: 'Transform Free Trial Tier into an Engine of Paid Conversion',
    quarter: 'Q3 2026',
    team: 'Growth & Product',
    keyResults: [
      {
        id: 'kr-4',
        metric: 'Free-to-paid conversion rate within 14 days',
        baseline: '4.5%',
        target: '7.0%',
        deadline: 'Sept 30',
        currentValue: '6.4%',
        type: 'Aspirational',
        confidenceScore: 7,
        endQuarterGrade: 0.75,
        owner: 'Growth PM'
      },
      {
        id: 'kr-5',
        metric: 'Monthly Active Learners attempting at least 1 mock exam',
        baseline: '14,000',
        target: '20,000',
        deadline: 'Sept 30',
        currentValue: '20,500',
        type: 'Aspirational',
        confidenceScore: 10,
        endQuarterGrade: 1.0,
        owner: 'Acquisition Marketing'
      }
    ]
  },
  {
    id: 'obj-3',
    title: 'Run Company Operations on Automated, Trustworthy Numbers',
    quarter: 'Q3 2026',
    team: 'Engineering & Data',
    keyResults: [
      {
        id: 'kr-6',
        metric: 'Company-wide weekly executive OKR dashboard live',
        baseline: '0%',
        target: '100%',
        deadline: 'July 21 (Week 3)',
        currentValue: '100%',
        type: 'Committed',
        confidenceScore: 10,
        endQuarterGrade: 1.0,
        owner: 'Data Engineering Lead'
      },
      {
        id: 'kr-7',
        metric: 'Key Results connected to automated SQL warehouse pipelines',
        baseline: '20%',
        target: '100%',
        deadline: 'August 28 (Week 8)',
        currentValue: '90%',
        type: 'Committed',
        confidenceScore: 9,
        endQuarterGrade: 0.9,
        owner: 'BI Team'
      }
    ]
  }
];

export function OKRSimulator() {
  const [objectives, setObjectives] = useState<OkrObjective[]>(TRICHY_EDUTECH_PRESET);
  const [selectedObjId, setSelectedObjId] = useState<string>('obj-1');
  const [activityWarning, setActivityWarning] = useState<string | null>(null);

  // New Objective State
  const [newObjTitle, setNewObjTitle] = useState('');
  const [newObjTeam, setNewObjTeam] = useState('Product');

  // New Key Result State
  const [krMetric, setKrMetric] = useState('');
  const [krBaseline, setKrBaseline] = useState('');
  const [krTarget, setKrTarget] = useState('');
  const [krDate, setKrDate] = useState('Quarter End');
  const [krType, setKrType] = useState<KeyResult['type']>('Aspirational');
  const [krOwner, setKrOwner] = useState('');

  // Real-time activity detection heuristic
  const handleKrMetricChange = (text: string) => {
    setKrMetric(text);
    const lower = text.toLowerCase();
    const activityTriggers = ['launch ', 'build ', 'redesign ', 'create ', 'hold ', 'train ', 'write ', 'deploy ', 'release '];
    if (activityTriggers.some(t => lower.startsWith(t))) {
      setActivityWarning('Activity Alert: You are writing a task/initiative! A Key Result must be a measurable business outcome (e.g. "Conversion rises from 4% to 7%"), NOT an activity like "Build new page".');
    } else {
      setActivityWarning(null);
    }
  };

  const handleAddObjective = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newObjTitle.trim()) return;

    if (objectives.length >= 3) {
      alert('Strict OKR Rule: Maximum 3 company objectives per quarter to maintain organizational focus.');
      return;
    }

    const newObj: OkrObjective = {
      id: Date.now().toString(),
      title: newObjTitle.trim(),
      quarter: 'Q3 2026',
      team: newObjTeam,
      keyResults: []
    };

    setObjectives(prev => [...prev, newObj]);
    setSelectedObjId(newObj.id);
    setNewObjTitle('');
  };

  const handleAddKeyResult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!krMetric.trim() || !krTarget.trim() || !krOwner.trim()) return;

    const targetObj = objectives.find(o => o.id === selectedObjId);
    if (targetObj && targetObj.keyResults.length >= 3) {
      alert('The 3x3 OKR Rule: Maximum 3 Key Results per Objective to prevent metric bloat.');
      return;
    }

    const newKr: KeyResult = {
      id: Date.now().toString(),
      metric: krMetric.trim(),
      baseline: krBaseline.trim() || '0',
      target: krTarget.trim(),
      deadline: krDate,
      currentValue: krBaseline.trim() || '0',
      type: krType,
      confidenceScore: 7,
      endQuarterGrade: 0.7,
      owner: krOwner.trim()
    };

    setObjectives(prev => prev.map(o => {
      if (o.id === selectedObjId) {
        return { ...o, keyResults: [...o.keyResults, newKr] };
      }
      return o;
    }));

    setKrMetric('');
    setKrBaseline('');
    setKrTarget('');
    setKrOwner('');
    setActivityWarning(null);
  };

  const updateConfidence = (krId: string, val: number) => {
    setObjectives(prev => prev.map(o => ({
      ...o,
      keyResults: o.keyResults.map(kr => kr.id === krId ? { ...kr, confidenceScore: val } : kr)
    })));
  };

  const updateGrade = (krId: string, val: number) => {
    setObjectives(prev => prev.map(o => ({
      ...o,
      keyResults: o.keyResults.map(kr => kr.id === krId ? { ...kr, endQuarterGrade: val } : kr)
    })));
  };

  const deleteKr = (krId: string) => {
    setObjectives(prev => prev.map(o => ({
      ...o,
      keyResults: o.keyResults.filter(kr => kr.id !== krId)
    })));
  };

  const selectedObjective = objectives.find(o => o.id === selectedObjId) || objectives[0];

  // Calculate average grade of selected objective
  const avgGrade = selectedObjective && selectedObjective.keyResults.length > 0
    ? (selectedObjective.keyResults.reduce((acc, kr) => acc + kr.endQuarterGrade, 0) / selectedObjective.keyResults.length).toFixed(2)
    : '0.00';

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <span>Quarterly Goal Architecture</span>
            <span>·</span>
            <span>Andy Grove & John Doerr</span>
            <span>·</span>
            <span>Strict 3×3 Focus Rule</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">OKR Goal Studio & Weekly Confidence Simulator</h3>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Formulate inspiring qualitative Objectives and outcome-based Key Results with real-time activity detection and weekly check-in calibration.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setObjectives(TRICHY_EDUTECH_PRESET)}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Load Trichy EduTech Case
          </button>
          <button
            onClick={() => setObjectives([])}
            className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 bg-white border border-slate-200 rounded-lg transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>
      </div>

      {/* Calibration Guidance Bar */}
      <div className="p-4 bg-slate-900 text-white rounded-xl shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            OKR Grading Calibration Rule
          </span>
          <span className="text-2xs font-mono text-emerald-400">
            Sweet Spot for Aspirational: 0.6 – 0.7
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300 pt-1">
          <div className="p-2.5 bg-slate-800/80 rounded-lg">
            <span className="font-bold text-rose-400 block mb-0.5">0.0 – 0.3 (Failed / Stuck)</span>
            Failed to make meaningful movement. Re-examine whether the KR was mis-specified or starved of resources.
          </div>
          <div className="p-2.5 bg-slate-800/80 rounded-lg border border-emerald-500/40">
            <span className="font-bold text-emerald-400 block mb-0.5">0.6 – 0.7 (Healthy Stretch)</span>
            The ideal score for Aspirational OKRs. Proves the team set audacious goals and innovated under pressure.
          </div>
          <div className="p-2.5 bg-slate-800/80 rounded-lg">
            <span className="font-bold text-amber-400 block mb-0.5">0.9 – 1.0 (Committed / Easy)</span>
            Mandatory for Committed operational imperatives. For aspirational goals, a 1.0 signals sandbagging.
          </div>
        </div>
      </div>

      {/* Objective Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {objectives.map((obj, i) => (
          <button
            key={obj.id}
            onClick={() => setSelectedObjId(obj.id)}
            className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all whitespace-nowrap flex items-center gap-2 ${
              selectedObjId === obj.id
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            <span>O{i + 1}: {obj.title}</span>
            <span className="text-2xs font-mono px-1.5 py-0.2 bg-white/20 rounded">
              {obj.keyResults.length}/3 KRs
            </span>
          </button>
        ))}

        {objectives.length < 3 && (
          <form onSubmit={handleAddObjective} className="flex items-center gap-2 shrink-0">
            <input
              type="text"
              placeholder="+ New Objective Title..."
              value={newObjTitle}
              onChange={(e) => setNewObjTitle(e.target.value)}
              className="text-xs bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-900 placeholder:text-slate-400 w-52"
            />
            <button
              type="submit"
              className="px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors"
            >
              Add O
            </button>
          </form>
        )}
      </div>

      {/* Selected Objective & Key Results Workspace */}
      {selectedObjective && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 text-2xs font-medium text-slate-500 mb-0.5">
                <span>{selectedObjective.quarter}</span>
                <span>·</span>
                <span>Team: {selectedObjective.team}</span>
              </div>
              <h4 className="text-lg font-bold text-slate-900">{selectedObjective.title}</h4>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-2xs font-bold text-slate-400 uppercase tracking-wide block">Objective Avg Grade</span>
                <span className={`text-sm font-extrabold font-mono tabular-nums ${
                  parseFloat(avgGrade) >= 0.6 && parseFloat(avgGrade) <= 0.8 ? 'text-emerald-600' : 'text-slate-900'
                }`}>
                  {avgGrade} / 1.0
                </span>
              </div>
            </div>
          </div>

          {/* Add Key Result Form */}
          <form onSubmit={handleAddKeyResult} className="p-4 bg-slate-50 border border-slate-200/90 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Add Key Result (Outcome Metric)
              </span>
              <span className="text-2xs text-slate-500">Max 3 KRs per Objective</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              <div className="md:col-span-5">
                <label className="block text-xs font-medium text-slate-600 mb-1">Measurable Key Result Outcome</label>
                <input
                  type="text"
                  placeholder="e.g. Subscriber renewal rate climbs from 31% to 45%"
                  value={krMetric}
                  onChange={(e) => handleKrMetricChange(e.target.value)}
                  className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-600 mb-1">Baseline</label>
                <input
                  type="text"
                  placeholder="e.g. 31%"
                  value={krBaseline}
                  onChange={(e) => setKrBaseline(e.target.value)}
                  className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 placeholder:text-slate-400"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-600 mb-1">Target</label>
                <input
                  type="text"
                  placeholder="e.g. 45%"
                  value={krTarget}
                  onChange={(e) => setKrTarget(e.target.value)}
                  className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 placeholder:text-slate-400"
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-xs font-medium text-slate-600 mb-1">KR Owner</label>
                <input
                  type="text"
                  placeholder="e.g. Retention Lead"
                  value={krOwner}
                  onChange={(e) => setKrOwner(e.target.value)}
                  className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 placeholder:text-slate-400"
                />
              </div>

              <div className="md:col-span-4 flex items-center gap-2 pt-1">
                <label className="text-xs text-slate-600 font-medium">Type:</label>
                <select
                  value={krType}
                  onChange={(e) => setKrType(e.target.value as any)}
                  className="text-xs bg-white border border-slate-200 rounded px-2 py-1 text-slate-800"
                >
                  <option value="Aspirational">Aspirational (Stretch · 0.7 = Win)</option>
                  <option value="Committed">Committed (Mandatory · 1.0 expected)</option>
                </select>
              </div>

              <div className="md:col-span-8 flex justify-end pt-1">
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Key Result
                </button>
              </div>
            </div>

            {activityWarning && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{activityWarning}</span>
              </div>
            )}
          </form>

          {/* Key Results List with Weekly Check-in Sliders */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-bold uppercase tracking-wider text-slate-700">Active Key Results & Weekly Tracking</span>
              <span>Slide Confidence & End Grades to simulate cadence</span>
            </div>

            {selectedObjective.keyResults.map(kr => (
              <div key={kr.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 group hover:border-slate-300 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 text-2xs font-bold rounded ${
                        kr.type === 'Aspirational' ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {kr.type}
                      </span>
                      <span className="text-xs font-semibold text-slate-600">Owner: {kr.owner}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-2xs text-slate-500">Due: {kr.deadline}</span>
                    </div>
                    <h5 className="text-sm font-bold text-slate-900">{kr.metric}</h5>
                  </div>

                  <button onClick={() => deleteKr(kr.id)} className="text-slate-400 hover:text-rose-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-200/80">
                  <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-2xs">
                    <span className="text-slate-500 block">Baseline → Target</span>
                    <span className="text-xs font-bold text-slate-900 tabular-nums">{kr.baseline} → {kr.target}</span>
                  </div>

                  <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-2xs">
                    <span className="text-slate-500 block">Current Value</span>
                    <span className="text-xs font-bold text-slate-900 tabular-nums">{kr.currentValue}</span>
                  </div>

                  {/* Weekly Confidence Slider (1-10) */}
                  <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-2xs space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Weekly Confidence:</span>
                      <span className={`font-bold font-mono tabular-nums ${
                        kr.confidenceScore >= 7 ? 'text-emerald-600' : kr.confidenceScore >= 4 ? 'text-amber-600' : 'text-rose-600'
                      }`}>
                        {kr.confidenceScore}/10
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={kr.confidenceScore}
                      onChange={(e) => updateConfidence(kr.id, parseInt(e.target.value))}
                      className="w-full accent-slate-900"
                    />
                  </div>

                  {/* Quarter-End Grade (0.0 - 1.0) */}
                  <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-2xs space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Quarter-End Grade:</span>
                      <span className={`font-bold font-mono tabular-nums ${
                        kr.endQuarterGrade >= 0.7 ? 'text-emerald-600' : kr.endQuarterGrade >= 0.4 ? 'text-amber-600' : 'text-rose-600'
                      }`}>
                        {kr.endQuarterGrade.toFixed(2)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={Math.round(kr.endQuarterGrade * 100)}
                      onChange={(e) => updateGrade(kr.id, parseInt(e.target.value) / 100)}
                      className="w-full accent-slate-900"
                    />
                  </div>
                </div>
              </div>
            ))}

            {selectedObjective.keyResults.length === 0 && (
              <div className="p-6 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
                No Key Results added to this Objective yet. Add up to 3 outcome-oriented KRs above.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
