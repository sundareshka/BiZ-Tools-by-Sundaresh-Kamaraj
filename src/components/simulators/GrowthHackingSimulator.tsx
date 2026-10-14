import { useState } from 'react';
import { Sparkles, RotateCcw, AlertTriangle, CheckCircle2, TrendingUp, Plus, Trash2, ArrowRight, Zap, Play } from 'lucide-react';

interface FunnelStage {
  name: string;
  metric: string;
  current: number; // percentage
  target: number; // percentage
  benchmark: number;
}

interface IceHypothesis {
  id: string;
  title: string;
  stage: 'Acquisition' | 'Activation' | 'Retention' | 'Referral' | 'Revenue';
  impact: number; // 1-10
  confidence: number; // 1-10
  ease: number; // 1-10
  owner: string;
  status: 'Backlog' | 'Running' | 'Winner (Scaled)' | 'Killed';
}

export function GrowthHackingSimulator() {
  const [activeTab, setActiveTab] = useState<'funnel' | 'ice' | 'pmf'>('funnel');

  // North star & PMF
  const [pmfScore, setPmfScore] = useState<number>(44); // 40% rule
  const [northStarName, setNorthStarName] = useState('Weekly Active Learners Completing ≥ 1 Lesson');
  const [northStarCurrent, setNorthStarCurrent] = useState(2450);

  // AARRR Funnel stages
  const [stages, setStages] = useState<FunnelStage[]>([
    { name: 'Acquisition', metric: 'Visits → Registrations', current: 8, target: 12, benchmark: 10 },
    { name: 'Activation', metric: 'Sign-up → First Lesson Completed', current: 22, target: 45, benchmark: 40 },
    { name: 'Retention', metric: 'Week-4 Return Rate', current: 31, target: 40, benchmark: 35 },
    { name: 'Referral', metric: 'New Users from Referrals', current: 2, target: 18, benchmark: 15 },
    { name: 'Revenue', metric: 'Free Trial → Paid Plan', current: 3, target: 6, benchmark: 5 }
  ]);

  // Backlog with ICE scoring
  const [hypotheses, setHypotheses] = useState<IceHypothesis[]>([
    {
      id: 'hyp-1',
      title: 'Show a 3-minute interactive preview lesson before forcing account signup',
      stage: 'Activation',
      impact: 8,
      confidence: 7,
      ease: 6,
      owner: 'Product Manager',
      status: 'Winner (Scaled)'
    },
    {
      id: 'hyp-2',
      title: 'Automated WhatsApp Day-1 congratulatory progress message with tutor voice note',
      stage: 'Activation',
      impact: 7,
      confidence: 8,
      ease: 9,
      owner: 'Growth Marketer',
      status: 'Winner (Scaled)'
    },
    {
      id: 'hyp-3',
      title: 'Pre-filled LinkedIn certificate share button with unique trackable referral link',
      stage: 'Referral',
      impact: 8,
      confidence: 8,
      ease: 7,
      owner: 'Growth Dev',
      status: 'Running'
    },
    {
      id: 'hyp-4',
      title: 'Gamified streak badges and unlockable dark mode editor',
      stage: 'Retention',
      impact: 5,
      confidence: 4,
      ease: 4,
      owner: 'Designer',
      status: 'Backlog'
    }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newStage, setNewStage] = useState<'Acquisition' | 'Activation' | 'Retention' | 'Referral' | 'Revenue'>('Activation');

  const handleLoadSkillSprintCase = () => {
    setPmfScore(46);
    setNorthStarName('Weekly Active Learners Completing ≥ 1 Lesson');
    setNorthStarCurrent(4800);
    setStages([
      { name: 'Acquisition', metric: 'Website Visits → Free Sign-ups', current: 8, target: 10, benchmark: 10 },
      { name: 'Activation', metric: 'Sign-up → First Lesson Completed', current: 22, target: 47, benchmark: 40 },
      { name: 'Retention', metric: 'Week-4 Active Retention', current: 31, target: 35, benchmark: 35 },
      { name: 'Referral', metric: 'New Registrations from Referrals', current: 2, target: 21, benchmark: 15 },
      { name: 'Revenue', metric: 'Free → Paid Certification Conversion', current: 3.0, target: 5.4, benchmark: 5.0 }
    ]);
  };

  const handleAddHypothesis = () => {
    if (!newTitle.trim()) return;
    const item: IceHypothesis = {
      id: `hyp-${Date.now()}`,
      title: newTitle,
      stage: newStage,
      impact: 7,
      confidence: 6,
      ease: 7,
      owner: 'Team Member',
      status: 'Backlog'
    };
    setHypotheses([item, ...hypotheses]);
    setNewTitle('');
  };

  const handleDeleteHypothesis = (id: string) => {
    setHypotheses(hypotheses.filter(h => h.id !== id));
  };

  const handleUpdateIce = (id: string, field: 'impact' | 'confidence' | 'ease', val: number) => {
    setHypotheses(hypotheses.map(h => h.id === id ? { ...h, [field]: val } : h));
  };

  // Find the primary constraint (largest negative gap between current and benchmark)
  let maxNegativeGap = 0;
  let constraintStageName = 'Activation';
  stages.forEach(s => {
    const gap = s.current - s.benchmark;
    if (gap < maxNegativeGap) {
      maxNegativeGap = gap;
      constraintStageName = s.name;
    }
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 mb-2">
              <Zap className="w-3.5 h-3.5" /> Sean Ellis & Dave McClure AARRR Pirate Experiment Engine
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Growth Hacking & AARRR Funnel Optimization Simulator
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-3xl">
              Instrument the five AARRR pirate stages, isolate the critical conversion constraint, prioritize rapid experiments with ICE scores (Impact × Confidence × Ease), and verify Product-Market Fit.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleLoadSkillSprintCase}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700 shadow-sm transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" /> Load SkillSprint Case
            </button>
            <button
              onClick={() => {
                setStages(stages.map(s => ({ ...s, current: s.benchmark })));
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-t border-slate-100 pt-4 mt-4">
          <button
            onClick={() => setActiveTab('funnel')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'funnel' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            1. AARRR Funnel & Constraint
          </button>
          <button
            onClick={() => setActiveTab('ice')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'ice' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            2. ICE Scoring Backlog ({hypotheses.length})
          </button>
          <button
            onClick={() => setActiveTab('pmf')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'pmf' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            3. North Star & PMF Test
          </button>
        </div>
      </div>

      {/* TAB 1: AARRR FUNNEL & CONSTRAINT */}
      {activeTab === 'funnel' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">AARRR Pirate Funnel Diagnostic</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Sean Ellis Rule: <strong className="text-slate-800">Never pour money into acquisition when activation is leaking</strong>. Fix the constraint stage first.
              </p>
            </div>

            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 block">Primary Constraint</span>
                <span className="text-sm font-extrabold text-rose-950">{constraintStageName} ({maxNegativeGap} pts gap)</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {stages.map((s, idx) => {
              const gap = s.current - s.benchmark;
              const isConstraint = s.name === constraintStageName;
              return (
                <div
                  key={s.name}
                  className={`p-4 rounded-xl border transition-all ${
                    isConstraint
                      ? 'border-rose-400 bg-rose-50/40 ring-2 ring-rose-100'
                      : 'border-slate-200 bg-slate-50/60'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center">
                        {s.name[0]}
                      </span>
                      <div>
                        <span className="font-bold text-slate-900 text-sm">{s.name}</span>
                        <span className="text-xs text-slate-500 ml-2 font-mono">({s.metric})</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono">
                      <span>Current: <strong className="text-slate-900">{s.current}%</strong></span>
                      <span className="text-slate-400">|</span>
                      <span>Target: <strong className="text-blue-700">{s.target}%</strong></span>
                      <span className="text-slate-400">|</span>
                      <span>Benchmark: <strong className="text-slate-600">{s.benchmark}%</strong></span>
                      <span className={`px-2 py-0.5 rounded font-bold ${
                        gap < 0 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {gap > 0 ? `+${gap}` : gap} pts
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar visualization */}
                  <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden flex">
                    <div
                      style={{ width: `${Math.min(s.current, 100)}%` }}
                      className={`h-full transition-all ${isConstraint ? 'bg-rose-500' : 'bg-slate-700'}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: ICE SCORING BACKLOG */}
      {activeTab === 'ice' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">ICE Scoring Prioritization Backlog</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Formula: <strong className="text-slate-800">Impact (1–10) × Confidence (1–10) × Ease (1–10) = ICE Score (1–1000)</strong>. Run tests with highest ICE first.
              </p>
            </div>
          </div>

          {/* Add New Hypothesis Bar */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <input
              type="text"
              placeholder="e.g. 'If we introduce a 1-click WhatsApp instant class booking, activation will increase by 15 pts...'"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="flex-1 p-2 bg-white text-xs rounded-lg border border-slate-200"
            />
            <select
              value={newStage}
              onChange={(e: any) => setNewStage(e.target.value)}
              className="bg-white text-xs p-2 rounded-lg border border-slate-200"
            >
              <option value="Acquisition">Acquisition</option>
              <option value="Activation">Activation</option>
              <option value="Retention">Retention</option>
              <option value="Referral">Referral</option>
              <option value="Revenue">Revenue</option>
            </select>
            <button
              onClick={handleAddHypothesis}
              className="px-3.5 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Test
            </button>
          </div>

          {/* Hypotheses Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-y border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                  <th className="py-2.5 px-3">Hypothesis Description</th>
                  <th className="py-2.5 px-2">Stage</th>
                  <th className="py-2.5 px-2">Impact (1–10)</th>
                  <th className="py-2.5 px-2">Conf (1–10)</th>
                  <th className="py-2.5 px-2">Ease (1–10)</th>
                  <th className="py-2.5 px-3">ICE Score</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {hypotheses
                  .slice()
                  .sort((a, b) => (b.impact * b.confidence * b.ease) - (a.impact * a.confidence * a.ease))
                  .map(h => {
                    const score = h.impact * h.confidence * h.ease;
                    return (
                      <tr key={h.id} className="hover:bg-slate-50">
                        <td className="py-3 px-3 font-medium text-slate-900 max-w-sm">
                          {h.title}
                          <div className="text-[10px] text-slate-400 mt-0.5">Owner: {h.owner}</div>
                        </td>
                        <td className="py-3 px-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 uppercase">
                            {h.stage}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <input
                            type="number"
                            min="1"
                            max="10"
                            value={h.impact}
                            onChange={(e) => handleUpdateIce(h.id, 'impact', Number(e.target.value))}
                            className="w-12 p-1 border rounded text-center font-mono"
                          />
                        </td>
                        <td className="py-3 px-2">
                          <input
                            type="number"
                            min="1"
                            max="10"
                            value={h.confidence}
                            onChange={(e) => handleUpdateIce(h.id, 'confidence', Number(e.target.value))}
                            className="w-12 p-1 border rounded text-center font-mono"
                          />
                        </td>
                        <td className="py-3 px-2">
                          <input
                            type="number"
                            min="1"
                            max="10"
                            value={h.ease}
                            onChange={(e) => handleUpdateIce(h.id, 'ease', Number(e.target.value))}
                            className="w-12 p-1 border rounded text-center font-mono"
                          />
                        </td>
                        <td className="py-3 px-3 font-mono font-bold text-sm text-slate-900">
                          {score}
                        </td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            h.status === 'Winner (Scaled)' ? 'bg-emerald-100 text-emerald-800' :
                            h.status === 'Running' ? 'bg-blue-100 text-blue-800' :
                            h.status === 'Killed' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {h.status}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-right">
                          <button
                            onClick={() => handleDeleteHypothesis(h.id)}
                            className="text-slate-400 hover:text-rose-600 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: NORTH STAR & PMF TEST */}
      {activeTab === 'pmf' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">Sean Ellis Product-Market Fit Check (The 40% Test)</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Survey users: <em>"How would you feel if you could no longer use this product?"</em>. If at least 40% answer <strong className="text-slate-800">"Very disappointed"</strong>, you have sufficient PMF to pour fuel on growth hacking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">"Very Disappointed" Ratio:</span>
                <span className="font-mono font-bold text-lg text-slate-900">{pmfScore}%</span>
              </div>

              <input
                type="range"
                min="10"
                max="80"
                value={pmfScore}
                onChange={(e) => setPmfScore(Number(e.target.value))}
                className="w-full accent-rose-600"
              />

              <div className={`p-3 rounded-lg border text-xs ${
                pmfScore >= 40
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-950 font-medium'
                  : 'border-rose-200 bg-rose-50 text-rose-950 font-medium'
              }`}>
                {pmfScore >= 40 ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Product-Market Fit Confirmed! Ready for growth experimentation loops.</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Premature Scaling Warning! Fix core value with JTBD & VPC before spending ad money.</span>
                  </div>
                )}
              </div>
            </div>

            {/* North star metric definition */}
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3 text-xs">
              <span className="font-bold text-slate-900 block">Single North Star Metric</span>
              <div>
                <label className="text-slate-500 block mb-1">Operational Value Metric:</label>
                <input
                  type="text"
                  value={northStarName}
                  onChange={(e) => setNorthStarName(e.target.value)}
                  className="w-full p-2 bg-white rounded-lg border border-slate-200 font-medium text-slate-800"
                />
              </div>
              <div>
                <label className="text-slate-500 block mb-1">Current Weekly Value:</label>
                <input
                  type="number"
                  value={northStarCurrent}
                  onChange={(e) => setNorthStarCurrent(Number(e.target.value))}
                  className="w-full p-2 bg-white rounded-lg border border-slate-200 font-mono text-slate-900 font-bold"
                />
              </div>
              <p className="text-[11px] text-slate-500">
                Rule: Never use a vanity metric (total app downloads or Instagram followers). The North Star must directly measure customer value delivered.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
