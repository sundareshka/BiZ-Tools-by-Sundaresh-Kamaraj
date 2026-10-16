import { useState } from 'react';
import { HeartHandshake, Smile, Frown, Meh, ShieldCheck, AlertTriangle, CheckCircle2, RotateCcw, Sliders, ArrowRight, Target, Users, Sparkles, Filter } from 'lucide-react';

interface SurveyItem {
  id: string;
  item: string;
  category: 'Engagement Outcome' | 'Role Clarity' | 'Manager' | 'Growth' | 'Recognition' | 'Wellbeing' | 'Reward' | 'Trust';
  favourable: number; // 0 - 100%
  impactOnEngagement: 'High' | 'Medium' | 'Low';
}

const INITIAL_ITEMS: SurveyItem[] = [
  { id: 'q1', item: 'I am proud to work for this organisation.', category: 'Engagement Outcome', favourable: 78, impactOnEngagement: 'High' },
  { id: 'q2', item: 'I would recommend this organisation as a great place to work.', category: 'Engagement Outcome', favourable: 65, impactOnEngagement: 'High' },
  { id: 'q3', item: 'I rarely think about looking for a job elsewhere.', category: 'Engagement Outcome', favourable: 52, impactOnEngagement: 'High' },
  { id: 'q4', item: 'I know what is expected of me in my role.', category: 'Role Clarity', favourable: 84, impactOnEngagement: 'Medium' },
  { id: 'q5', item: 'My manager treats me with genuine respect.', category: 'Manager', favourable: 71, impactOnEngagement: 'High' },
  { id: 'q6', item: 'I have received recognition for good work in the past month.', category: 'Recognition', favourable: 48, impactOnEngagement: 'Medium' },
  { id: 'q7', item: 'I have discussed my growth with my manager in the past six months.', category: 'Growth', favourable: 41, impactOnEngagement: 'High' },
  { id: 'q8', item: 'My workload is manageable on my regular shift.', category: 'Wellbeing', favourable: 56, impactOnEngagement: 'High' },
  { id: 'q9', item: 'I believe I am paid fairly for the work I do.', category: 'Reward', favourable: 39, impactOnEngagement: 'Medium' },
  { id: 'q10', item: 'I have the tools and resources to do my job well.', category: 'Role Clarity', favourable: 82, impactOnEngagement: 'Low' },
  { id: 'q11', item: 'My opinions are considered when decisions affect my work.', category: 'Trust', favourable: 50, impactOnEngagement: 'Medium' },
  { id: 'q12', item: 'I believe visible action will be taken as a result of this survey.', category: 'Trust', favourable: 44, impactOnEngagement: 'High' }
];

export function EngagementSurveySimulator() {
  const [items, setItems] = useState<SurveyItem[]>(INITIAL_ITEMS);
  const [promoters, setPromoters] = useState<number>(60); // 9-10
  const [passives, setPassives] = useState<number>(80);  // 7-8
  const [detractors, setDetractors] = useState<number>(60); // 0-6
  const [selectedCohort, setSelectedCohort] = useState<string>('company');
  const [activeTab, setActiveTab] = useState<'driver' | 'enps' | 'actionPlan'>('driver');

  const totalNpsResponses = promoters + passives + detractors;
  const enps = totalNpsResponses > 0
    ? Math.round(((promoters - detractors) / totalNpsResponses) * 100)
    : 0;

  // Engagement Index: average of first 3 outcome items
  const outcomeItems = items.filter(i => i.category === 'Engagement Outcome');
  const engagementIndex = Math.round(
    outcomeItems.reduce((acc, curr) => acc + curr.favourable, 0) / outcomeItems.length
  );

  const handleSliderChange = (id: string, newVal: number) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, favourable: newVal } : item));
  };

  const handleReset = () => {
    setItems(INITIAL_ITEMS);
    setPromoters(60);
    setPassives(80);
    setDetractors(60);
  };

  // Determine driver quadrant
  const getQuadrant = (item: SurveyItem) => {
    const isHighImpact = item.impactOnEngagement === 'High';
    const isLowScore = item.favourable < 60;

    if (isHighImpact && isLowScore) return { label: 'Fix First', color: 'bg-rose-50 text-rose-800 border-rose-300' };
    if (isHighImpact && !isLowScore) return { label: 'Protect', color: 'bg-emerald-50 text-emerald-800 border-emerald-300' };
    if (!isHighImpact && isLowScore) return { label: 'Investigate', color: 'bg-amber-50 text-amber-800 border-amber-300' };
    return { label: 'Maintain', color: 'bg-blue-50 text-blue-800 border-blue-300' };
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 mb-1">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Pillar 7: HR & Organizational Diagnostics</span>
              <span>·</span>
              <span>Employee Engagement & Driver Analysis</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Employee Engagement & Driver Priority Simulator
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Analyze statistical drivers of discretionary effort, calculate eNPS, and safeguard psychological safety with strict anonymity thresholds.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>
        </div>

        {/* Executive Summary Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
            <span className="text-2xs uppercase tracking-wider font-bold text-slate-400 block">Engagement Index</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`text-xl font-extrabold font-mono ${
                engagementIndex >= 65 ? 'text-emerald-600' : engagementIndex >= 50 ? 'text-amber-600' : 'text-rose-600'
              }`}>
                {engagementIndex}%
              </span>
              <span className="text-3xs text-slate-500">Pride & Advocacy</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
            <span className="text-2xs uppercase tracking-wider font-bold text-slate-400 block">Employee eNPS</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`text-xl font-extrabold font-mono ${
                enps > 0 ? 'text-emerald-600' : enps === 0 ? 'text-amber-600' : 'text-rose-600'
              }`}>
                {enps > 0 ? `+${enps}` : enps}
              </span>
              <span className="text-3xs text-slate-500">Promoters − Detractors</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
            <span className="text-2xs uppercase tracking-wider font-bold text-slate-400 block">Top Priority "Fix First"</span>
            <span className="text-xs font-bold text-rose-700 mt-1 block truncate">
              Growth Conversations (41%)
            </span>
            <span className="text-3xs text-slate-500">High impact / low score</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
            <span className="text-2xs uppercase tracking-wider font-bold text-slate-400 block">Anonymity Safeguard</span>
            <span className="text-xs font-bold text-emerald-700 mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Threshold: ≥ 5 Staff
            </span>
            <span className="text-3xs text-slate-500">Blocks cohort de-anonymization</span>
          </div>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1.5 mt-5 p-1 bg-slate-100 rounded-lg w-fit border border-slate-200">
          <button
            onClick={() => setActiveTab('driver')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'driver' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            1. Driver Priority Analysis (12 Items)
          </button>
          <button
            onClick={() => setActiveTab('enps')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'enps' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2. eNPS Loyalty Calculator
          </button>
          <button
            onClick={() => setActiveTab('actionPlan')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'actionPlan' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            3. "You Said, We Did" Action Plan
          </button>
        </div>
      </div>

      {/* TAB 1: DRIVER PRIORITY MATRIX */}
      {activeTab === 'driver' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Driver List & Sliders */}
          <div className="lg:col-span-8 p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Survey Items & Favourable % Scores</h3>
              <span className="text-2xs text-slate-500">Adjust sliders to model perception shifts</span>
            </div>

            <div className="space-y-3.5">
              {items.map((item) => {
                const quad = getQuadrant(item);

                return (
                  <div key={item.id} className="p-3 bg-slate-50/70 border border-slate-200/80 rounded-lg space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <span className="font-semibold text-xs text-slate-900 block">{item.item}</span>
                        <div className="flex items-center gap-2 text-3xs text-slate-500">
                          <span className="font-mono bg-slate-200/60 px-1.5 py-0.2 rounded text-slate-700">{item.category}</span>
                          <span>·</span>
                          <span>Impact: <strong className="text-slate-700">{item.impactOnEngagement}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className={`px-2 py-0.5 rounded text-2xs font-extrabold border ${quad.color}`}>
                          {quad.label}
                        </span>
                        <span className="font-mono font-bold text-sm text-slate-900 w-12 text-right">
                          {item.favourable}%
                        </span>
                      </div>
                    </div>

                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={item.favourable}
                      onChange={(e) => handleSliderChange(item.id, Number(e.target.value))}
                      className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2x2 Driver Matrix Visual Explanation */}
          <div className="lg:col-span-4 p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
              The 2×2 Driver Action Quadrant
            </h3>

            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg space-y-1">
                <span className="text-2xs font-extrabold uppercase text-rose-700 block">Fix First</span>
                <p className="text-3xs text-rose-900">High impact on retention, but low satisfaction. Immediate executive priority.</p>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg space-y-1">
                <span className="text-2xs font-extrabold uppercase text-emerald-700 block">Protect</span>
                <p className="text-3xs text-emerald-900">High impact and high satisfaction. Core organizational strength to safeguard.</p>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg space-y-1">
                <span className="text-2xs font-extrabold uppercase text-amber-700 block">Investigate</span>
                <p className="text-3xs text-amber-900">Low current score, but secondary impact. Check specific role families.</p>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg space-y-1">
                <span className="text-2xs font-extrabold uppercase text-blue-700 block">Maintain</span>
                <p className="text-3xs text-blue-900">Low statistical correlation with engagement, high score (e.g. basic equipment).</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5 text-xs text-slate-600">
              <span className="font-bold text-slate-800 block">Gallup 2026 Context:</span>
              <p className="text-3xs leading-relaxed text-slate-600">
                Gallup’s <em>State of the Global Workplace</em> report revealed global employee engagement dropped to 20%, driven primarily by a collapse in manager engagement from 27% to 22%.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ENPS LOYALTY CALCULATOR */}
      {activeTab === 'enps' && (
        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Employee Net Promoter Score (eNPS) Engine</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              "How likely are you to recommend this organization as a place to work?" (0 to 10 Scale)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Promoters */}
            <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                  <Smile className="w-4 h-4 text-emerald-600" />
                  Promoters (Score 9–10)
                </span>
                <span className="text-sm font-mono font-extrabold text-emerald-700">{promoters}</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                value={promoters}
                onChange={(e) => setPromoters(Number(e.target.value))}
                className="w-full accent-emerald-600 h-1.5 bg-emerald-200 rounded-lg cursor-pointer"
              />
              <span className="text-3xs text-emerald-700 block">
                Brand ambassadors who recruit peers and champion company mission.
              </span>
            </div>

            {/* Passives */}
            <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                  <Meh className="w-4 h-4 text-amber-600" />
                  Passives (Score 7–8)
                </span>
                <span className="text-sm font-mono font-extrabold text-amber-700">{passives}</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                value={passives}
                onChange={(e) => setPassives(Number(e.target.value))}
                className="w-full accent-amber-600 h-1.5 bg-amber-200 rounded-lg cursor-pointer"
              />
              <span className="text-3xs text-amber-700 block">
                Neutral, satisfied employees vulnerable to competitive headhunters.
              </span>
            </div>

            {/* Detractors */}
            <div className="p-4 bg-rose-50/60 border border-rose-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-800 flex items-center gap-1.5">
                  <Frown className="w-4 h-4 text-rose-600" />
                  Detractors (Score 0–6)
                </span>
                <span className="text-sm font-mono font-extrabold text-rose-700">{detractors}</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                value={detractors}
                onChange={(e) => setDetractors(Number(e.target.value))}
                className="w-full accent-rose-600 h-1.5 bg-rose-200 rounded-lg cursor-pointer"
              />
              <span className="text-3xs text-rose-700 block">
                Disengaged staff actively voicing discontent or preparing to exit.
              </span>
            </div>
          </div>

          <div className="p-4 bg-slate-900 text-white rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-2xs uppercase tracking-wider font-bold text-slate-400 block">eNPS Formula</span>
              <span className="font-mono text-sm text-slate-200">
                [(Promoters − Detractors) ÷ Total Respondents] × 100
              </span>
            </div>
            <div className="text-right">
              <span className="text-2xs uppercase tracking-wider font-bold text-slate-400 block">Calculated Result</span>
              <span className={`text-2xl font-mono font-extrabold ${enps > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {enps > 0 ? `+${enps}` : enps}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: YOU SAID WE DID ACTION PLAN */}
      {activeTab === 'actionPlan' && (
        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Decentralized Team Action Plan Template</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Surveys without visible follow-up damage trust. Teams must commit to 1–2 concrete process changes within 30 days.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">Team: Diagnostic Lab Technicians</span>
                <span className="text-2xs text-slate-500 font-mono">Department Head: Dr. R. Meenakshi</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-1">
                  <span className="text-2xs font-bold uppercase text-emerald-700 block">Strongest Survey Signal:</span>
                  <p className="text-slate-800 font-medium">84% feel their role expectations and lab standards are clear.</p>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-1">
                  <span className="text-2xs font-bold uppercase text-rose-700 block">Primary Opportunity:</span>
                  <p className="text-slate-800 font-medium">41% on career growth path; technicians see no ladder above Senior Tech.</p>
                </div>
              </div>

              <div className="p-3 bg-indigo-50/60 border border-indigo-200 rounded-lg space-y-2 text-xs">
                <span className="font-bold text-indigo-950 block">Agreed Action 1 (Operational Shift Roster):</span>
                <p className="text-indigo-900">
                  Redesign night-shift phlebotomy handover to overlap by 20 minutes, eliminating chaotic morning rush queues.
                </p>
                <div className="flex items-center gap-4 text-2xs text-indigo-700 font-semibold pt-1">
                  <span>Owner: Shift Supervisor</span>
                  <span>·</span>
                  <span>Timeline: Live within 14 Days</span>
                  <span>·</span>
                  <span>Pulse Measure: "Workload on shift is manageable"</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
