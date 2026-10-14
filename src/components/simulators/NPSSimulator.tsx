import { useState } from 'react';
import { Sparkles, RotateCcw, AlertTriangle, CheckCircle2, TrendingUp, PhoneCall, HelpCircle, ShieldAlert, Users } from 'lucide-react';

interface VerbatimDriver {
  theme: string;
  detractorPct: number;
  promoterPct: number;
  journeyStage: string;
  action: string;
}

export function NPSSimulator() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'drivers' | 'closed_loop'>('calculator');

  // Response distribution counts
  const [promotersCount, setPromotersCount] = useState<number>(110);
  const [passivesCount, setPassivesCount] = useState<number>(60);
  const [detractorsCount, setDetractorsCount] = useState<number>(30);
  const [surveysSent, setSurveysSent] = useState<number>(800);

  // Verbatim drivers
  const [drivers, setDrivers] = useState<VerbatimDriver[]>([
    {
      theme: 'Slow response to urgent support tickets',
      detractorPct: 42,
      promoterPct: 5,
      journeyStage: 'Support',
      action: 'Institute 4-hour first-response SLA with automated escalation'
    },
    {
      theme: 'Invoices lack itemized project breakdown',
      detractorPct: 25,
      promoterPct: 2,
      journeyStage: 'Billing / Renewal',
      action: 'Redesign invoice template with GST breakdown and personal explainer call'
    },
    {
      theme: 'Proactive architectural advice & roadmap guidance',
      detractorPct: 8,
      promoterPct: 38,
      journeyStage: 'Active Use',
      action: 'Schedule mandatory quarterly executive review meeting for all clients'
    },
    {
      theme: 'Trainer & Senior Engineer technical expertise',
      detractorPct: 10,
      promoterPct: 45,
      journeyStage: 'Delivery',
      action: 'Celebrate engineers in quarterly rewards; feature in marketing case studies'
    }
  ]);

  const handleLoadNexaCloudCase = () => {
    setPromotersCount(110);
    setPassivesCount(60);
    setDetractorsCount(30);
    setSurveysSent(800);
    setDrivers([
      {
        theme: 'Support ticket escalation delays during outages',
        detractorPct: 42,
        promoterPct: 5,
        journeyStage: 'Support',
        action: 'Dedicated 24/7 technical hotline + automated tier-2 notification'
      },
      {
        theme: 'Unclear cloud bandwidth billing charges',
        detractorPct: 25,
        promoterPct: 2,
        journeyStage: 'Renewal',
        action: 'Transparent billing dashboard showing daily compute consumption'
      },
      {
        theme: 'Quarterly strategic cloud cost optimization reviews',
        detractorPct: 8,
        promoterPct: 38,
        journeyStage: 'Use',
        action: 'Institutionalize quarterly business review (QBR) for 100% of accounts'
      },
      {
        theme: 'Dedicated senior cloud architect responsiveness',
        detractorPct: 10,
        promoterPct: 45,
        journeyStage: 'Use',
        action: 'Turn promoter stories into enterprise sales collateral and testimonials'
      }
    ]);
  };

  const handleReset = () => {
    setPromotersCount(50);
    setPassivesCount(30);
    setDetractorsCount(20);
    setSurveysSent(400);
  };

  const totalResponses = promotersCount + passivesCount + detractorsCount;
  const promoterPct = totalResponses > 0 ? Math.round((promotersCount / totalResponses) * 100) : 0;
  const passivePct = totalResponses > 0 ? Math.round((passivesCount / totalResponses) * 100) : 0;
  const detractorPct = totalResponses > 0 ? Math.round((detractorsCount / totalResponses) * 100) : 0;
  const npsScore = promoterPct - detractorPct;
  const responseRate = surveysSent > 0 ? Math.round((totalResponses / surveysSent) * 100) : 0;

  // Approximate margin of error calculation for 95% confidence level
  const marginOfError = totalResponses > 0 ? Math.round((1 / Math.sqrt(totalResponses)) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
              <TrendingUp className="w-3.5 h-3.5" /> Fred Reichheld (Bain & Company) Net Promoter System
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Net Promoter Score (NPS) & Closed-Loop Feedback Studio
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-3xl">
              Calculate authentic relationship and transactional NPS, calculate statistical margin of error, analyze verbatim root causes, and govern the 48-hour Inner & Outer Closed-Loop follow-up system.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleLoadNexaCloudCase}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" /> Load NexaCloud Solutions Case
            </button>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-t border-slate-100 pt-4 mt-4">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'calculator' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            1. NPS Calculator & Distribution
          </button>
          <button
            onClick={() => setActiveTab('drivers')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'drivers' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            2. Verbatim Driver Matrix
          </button>
          <button
            onClick={() => setActiveTab('closed_loop')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'closed_loop' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            3. 48-Hour Closed-Loop Protocol
          </button>
        </div>
      </div>

      {/* TAB 1: NPS CALCULATOR & DISTRIBUTION */}
      {activeTab === 'calculator' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* NPS Card */}
            <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm text-center">
              <span className="text-2xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Net Promoter Score
              </span>
              <div className={`text-3xl font-black font-mono tracking-tight ${
                npsScore > 30 ? 'text-emerald-700' : npsScore >= 0 ? 'text-blue-700' : 'text-rose-600'
              }`}>
                {npsScore > 0 ? `+${npsScore}` : npsScore}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                {promoterPct}% Promoters − {detractorPct}% Detractors
              </p>
            </div>

            {/* Total Responses */}
            <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm text-center">
              <span className="text-2xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Total Respondents
              </span>
              <div className="text-2xl font-bold font-mono text-slate-900">
                {totalResponses.toLocaleString()}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Response Rate: {responseRate}% ({totalResponses}/{surveysSent})
              </p>
            </div>

            {/* Margin of Error */}
            <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm text-center">
              <span className="text-2xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Sample Margin of Error
              </span>
              <div className="text-2xl font-bold font-mono text-amber-600">
                ±{marginOfError} pts
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Small swings under ±{marginOfError} are statistical noise.
              </p>
            </div>

            {/* Benchmark Level */}
            <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm text-center">
              <span className="text-2xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Performance Tier
              </span>
              <div className="text-base font-bold text-slate-800 mt-1">
                {npsScore >= 50 ? 'World-Class Loyalty' : npsScore >= 20 ? 'Strong Growth' : npsScore >= 0 ? 'Good / Active Retention' : 'Critical Churn Risk'}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Compare trend over 3 cycles, not peers.
              </p>
            </div>
          </div>

          {/* Interactive Sliders for Response Counts */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-slate-900">Interactive Respondent Breakdown</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Promoters (9-10) */}
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-900 block">Promoters (Scores 9–10)</span>
                    <span className="text-[11px] text-emerald-700">Fuel referral growth & high LTV</span>
                  </div>
                  <span className="text-lg font-bold font-mono text-emerald-800">{promoterPct}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="300"
                  value={promotersCount}
                  onChange={(e) => setPromotersCount(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
                <div className="flex justify-between text-xs text-slate-600 font-mono">
                  <span>Count: {promotersCount} respondents</span>
                </div>
              </div>

              {/* Passives (7-8) */}
              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-amber-900 block">Passives (Scores 7–8)</span>
                    <span className="text-[11px] text-amber-700">Satisfied but vulnerable to offers</span>
                  </div>
                  <span className="text-lg font-bold font-mono text-amber-800">{passivePct}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="300"
                  value={passivesCount}
                  onChange={(e) => setPassivesCount(Number(e.target.value))}
                  className="w-full accent-amber-600"
                />
                <div className="flex justify-between text-xs text-slate-600 font-mono">
                  <span>Count: {passivesCount} respondents</span>
                </div>
              </div>

              {/* Detractors (0-6) */}
              <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-rose-900 block">Detractors (Scores 0–6)</span>
                    <span className="text-[11px] text-rose-700">Imminent churn & negative word-of-mouth</span>
                  </div>
                  <span className="text-lg font-bold font-mono text-rose-800">{detractorPct}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="300"
                  value={detractorsCount}
                  onChange={(e) => setDetractorsCount(Number(e.target.value))}
                  className="w-full accent-rose-600"
                />
                <div className="flex justify-between text-xs text-slate-600 font-mono">
                  <span>Count: {detractorsCount} respondents</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: VERBATIM DRIVER ANALYSIS */}
      {activeTab === 'drivers' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-5">
          <div>
            <h3 className="text-base font-bold text-slate-900">Verbatim Root-Cause Driver Matrix</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Reichheld Rule: <strong className="text-slate-800">The 0–10 score is just the thermometer; the open-text "Why?" answers provide the treatment.</strong>
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-y border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                  <th className="py-2.5 px-3">Verbatim Theme</th>
                  <th className="py-2.5 px-3">% Detractor Mentions</th>
                  <th className="py-2.5 px-3">% Promoter Mentions</th>
                  <th className="py-2.5 px-3">Journey Stage</th>
                  <th className="py-2.5 px-3">Operational Closed-Loop Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {drivers.map((d, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-bold text-slate-900 max-w-xs">{d.theme}</td>
                    <td className="py-3 px-3 font-mono font-bold text-rose-600">{d.detractorPct}%</td>
                    <td className="py-3 px-3 font-mono font-bold text-emerald-700">{d.promoterPct}%</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 uppercase">
                        {d.journeyStage}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-700 font-medium leading-relaxed">{d.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: 48-HOUR CLOSED-LOOP PROTOCOL */}
      {activeTab === 'closed_loop' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50 text-xs text-amber-950 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-900 block mb-0.5">Strict Governance Policy: Ban Score Coaching!</span>
              <p className="text-amber-800 leading-relaxed">
                Never incentivize frontline staff or branch managers based on raw NPS score alone (leads to "Please give me a 10" begging).
                Instead, tie 20% of bonuses to <strong className="font-bold">Closed-Loop Completion Rate</strong> (ensuring 100% of detractors get called within 48 hours).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Inner Loop */}
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3 text-xs">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <span>The Inner Closed Loop (Individual Service Recovery)</span>
              </div>
              <ul className="text-slate-700 space-y-2 list-disc list-inside leading-relaxed">
                <li><strong>Timing:</strong> Account Manager calls detractor within 48 hours. CEO calls any customer scoring 0–3.</li>
                <li><strong>Protocol:</strong> Open with "You gave us a 4 and mentioned [theme]. I want to listen and understand what happened."</li>
                <li><strong>Golden Rule:</strong> Listen without being defensive. Repeat back the main issue to confirm understanding.</li>
                <li><strong>Result:</strong> Saves 60%+ of at-risk clients before contract renewal.</li>
              </ul>
            </div>

            {/* Outer Loop */}
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3 text-xs">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Users className="w-4 h-4 text-blue-600" />
                <span>The Outer Closed Loop (Systemic Leadership Fixes)</span>
              </div>
              <ul className="text-slate-700 space-y-2 list-disc list-inside leading-relaxed">
                <li><strong>Cadence:</strong> Monthly executive leadership meeting reviewing verbatim driver trends.</li>
                <li><strong>Root Causes:</strong> Cross-functional analysis across Engineering, Operations, and Billing.</li>
                <li><strong>Funding:</strong> Budget allocated each quarter to permanently eliminate the top 2 detractor drivers.</li>
                <li><strong>Promoter Outreach:</strong> Promoters thanked within 1 hour and invited to provide testimonials or referrals.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
