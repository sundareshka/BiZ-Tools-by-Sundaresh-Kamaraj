import { useState } from 'react';
import { Award, CheckCircle2, AlertTriangle, AlertCircle, RotateCcw, Sliders, ArrowRight, ShieldCheck, Scale, Zap, Info, TrendingUp, DollarSign } from 'lucide-react';

interface KRAItem {
  id: string;
  kra: string;
  kpi: string;
  weight: number; // percentage
  target: string;
  actual: number; // raw value
  rating: number; // 1 to 5
}

export function PerformanceAppraisalSimulator() {
  const [activeTab, setActiveTab] = useState<'scoring' | 'bars' | 'calibration' | 'merit'>('scoring');

  // KRAs State
  const [kras, setKras] = useState<KRAItem[]>([
    { id: 'k1', kra: 'New Client Enrolments', kpi: 'Quarterly paid enrolments', weight: 30, target: '120', actual: 132, rating: 4 },
    { id: 'k2', kra: 'Lead Conversion Efficiency', kpi: 'Lead-to-client conversion rate', weight: 20, target: '12%', actual: 11, rating: 3 },
    { id: 'k3', kra: 'Client 60-Day Retention', kpi: 'Active students after 60 days', weight: 20, target: '85%', actual: 88, rating: 4 },
    { id: 'k4', kra: 'Process & CRM Compliance', kpi: 'CRM updated within 24 hours', weight: 10, target: '95%', actual: 82, rating: 2 },
    { id: 'k5', kra: 'Role BARS Competencies', kpi: 'Customer Communication & Teamwork', weight: 20, target: 'Proficient', actual: 3.5, rating: 3.5 }
  ]);

  // Selected BARS Level for inspection
  const [selectedBarsLevel, setSelectedBarsLevel] = useState<number>(4);

  // Calibration comparison state
  const [uncalibratedRating4And5, setUncalibratedRating4And5] = useState<number>(74);

  const handleRatingChange = (id: string, newRating: number) => {
    setKras(prev => prev.map(k => k.id === id ? { ...k, rating: newRating } : k));
  };

  // Compute Total Weighted Performance Score
  const totalWeightedScore = (kras.reduce((sum, k) => sum + (k.weight / 100) * k.rating, 0)).toFixed(2);

  const handleReset = () => {
    setKras([
      { id: 'k1', kra: 'New Client Enrolments', kpi: 'Quarterly paid enrolments', weight: 30, target: '120', actual: 132, rating: 4 },
      { id: 'k2', kra: 'Lead Conversion Efficiency', kpi: 'Lead-to-client conversion rate', weight: 20, target: '12%', actual: 11, rating: 3 },
      { id: 'k3', kra: 'Client 60-Day Retention', kpi: 'Active students after 60 days', weight: 20, target: '85%', actual: 88, rating: 4 },
      { id: 'k4', kra: 'Process & CRM Compliance', kpi: 'CRM updated within 24 hours', weight: 10, target: '95%', actual: 82, rating: 2 },
      { id: 'k5', kra: 'Role BARS Competencies', kpi: 'Customer Communication & Teamwork', weight: 20, target: 'Proficient', actual: 3.5, rating: 3.5 }
    ]);
  };

  const BARS_CUSTOMER_COMMUNICATION = [
    { level: 5, label: 'Exceptional (5)', anchor: 'Anticipates client concerns before they are voiced, communicates proactively across channels, and is specifically requested by name by corporate clients.' },
    { level: 4, label: 'Exceeding (4)', anchor: 'Responds within the agreed SLA time-box, explains complex technical or billing issues clearly, and follows up without prompting from leadership.' },
    { level: 3, label: 'Fully Meeting (3)', anchor: 'Responds accurately and professionally within the agreed deadline; occasional managerial follow-up required during peak quarterly spikes.' },
    { level: 2, label: 'Partly Meeting (2)', anchor: 'Responses are frequently delayed, incomplete, or ambiguous; clients occasionally escalate communications to the department head.' },
    { level: 1, label: 'Not Meeting (1)', anchor: 'Regular client complaints regarding unprofessional or absent communication; misses commitments and fails to document client status.' }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 mb-1">
              <Scale className="w-3.5 h-3.5" />
              <span>Pillar 7: HR & Organizational Diagnostics</span>
              <span>·</span>
              <span>Performance Management & Calibration</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Performance Appraisal & Calibration Simulator
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Dual-axis evaluation (70% Goals/KRAs + 30% BARS Competencies), peer calibration curves, and merit increment modeling.
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
            <span className="text-2xs uppercase tracking-wider font-bold text-slate-400 block">Overall Score</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-2xl font-extrabold font-mono text-indigo-900">
                {totalWeightedScore}
              </span>
              <span className="text-2xs text-slate-500 font-semibold">/ 5.00 Max</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
            <span className="text-2xs uppercase tracking-wider font-bold text-slate-400 block">Performance Band</span>
            <span className={`text-xs font-bold mt-1 block ${
              Number(totalWeightedScore) >= 4.0 ? 'text-emerald-700' : Number(totalWeightedScore) >= 3.0 ? 'text-blue-700' : 'text-amber-700'
            }`}>
              {Number(totalWeightedScore) >= 4.0 ? 'Exceeding Expectations' : Number(totalWeightedScore) >= 3.0 ? 'Fully Meeting Standard' : 'Developing / Partly'}
            </span>
            <span className="text-3xs text-slate-500">Calibrated Grade</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
            <span className="text-2xs uppercase tracking-wider font-bold text-slate-400 block">Weight Distribution</span>
            <span className="text-xs font-bold text-slate-800 mt-1 block">
              80% KRAs + 20% BARS
            </span>
            <span className="text-3xs text-slate-500">Objective outcomes + behavior</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
            <span className="text-2xs uppercase tracking-wider font-bold text-slate-400 block">Suggested Increment</span>
            <span className="text-xs font-bold text-emerald-700 mt-1 block">
              9% – 11% Range
            </span>
            <span className="text-3xs text-slate-500">Based on Midpoint Compa-Ratio</span>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1.5 mt-5 p-1 bg-slate-100 rounded-lg w-fit border border-slate-200">
          <button
            onClick={() => setActiveTab('scoring')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'scoring' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            1. KRA & Competency Scoring
          </button>
          <button
            onClick={() => setActiveTab('bars')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'bars' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2. BARS Behavioral Anchors
          </button>
          <button
            onClick={() => setActiveTab('calibration')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'calibration' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            3. Calibration Distribution Curve
          </button>
          <button
            onClick={() => setActiveTab('merit')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'merit' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            4. Merit Increment Grid
          </button>
        </div>
      </div>

      {/* TAB 1: KRA & COMPETENCY SCORING */}
      {activeTab === 'scoring' && (
        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Annual Evaluation Scorecard</h3>
              <p className="text-xs text-slate-500">Role: Business Development & Client Account Lead</p>
            </div>
            <span className="text-2xs font-mono font-bold bg-slate-100 px-2 py-1 rounded text-slate-700">
              Weights Sum: 100%
            </span>
          </div>

          <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
            {kras.map((k) => (
              <div key={k.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors">
                <div className="space-y-1 max-w-md">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900">{k.kra}</span>
                    <span className="text-2xs font-mono bg-indigo-50 text-indigo-700 border border-indigo-100 px-1.5 py-0.2 rounded font-semibold">
                      Weight: {k.weight}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{k.kpi}</p>
                  <div className="flex items-center gap-3 text-2xs text-slate-600">
                    <span>Target: <strong className="text-slate-800">{k.target}</strong></span>
                    <span>·</span>
                    <span>Actual: <strong className="text-slate-800">{k.actual}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="space-y-1 text-right">
                    <span className="text-2xs font-bold text-slate-400 block uppercase tracking-wider">Rating (1-5)</span>
                    <select
                      value={k.rating}
                      onChange={(e) => handleRatingChange(k.id, Number(e.target.value))}
                      className="bg-white border border-slate-300 text-xs font-bold text-slate-900 rounded-lg px-2.5 py-1 focus:ring-2 focus:ring-indigo-600 outline-none cursor-pointer"
                    >
                      <option value="1">1 — Not Meeting</option>
                      <option value="2">2 — Partly Meeting</option>
                      <option value="3">3 — Fully Meeting</option>
                      <option value="3.5">3.5 — Strong Standard</option>
                      <option value="4">4 — Exceeding</option>
                      <option value="5">5 — Exceptional</option>
                    </select>
                  </div>

                  <div className="text-right w-20">
                    <span className="text-2xs font-bold text-slate-400 block uppercase tracking-wider">Weighted</span>
                    <span className="font-mono font-bold text-sm text-slate-900">
                      {((k.weight / 100) * k.rating).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: BARS BEHAVIORAL ANCHORS */}
      {activeTab === 'bars' && (
        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Behaviourally Anchored Rating Scale (BARS)</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Competency: <strong className="text-slate-700">Customer Communication & Escalation Management</strong>
            </p>
          </div>

          <div className="space-y-3">
            {BARS_CUSTOMER_COMMUNICATION.map((b) => (
              <div
                key={b.level}
                onClick={() => setSelectedBarsLevel(b.level)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedBarsLevel === b.level
                    ? 'bg-indigo-50/70 border-indigo-400 shadow-xs ring-2 ring-indigo-200'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between pb-1">
                  <span className={`text-xs font-extrabold ${
                    b.level === 5 ? 'text-emerald-700' : b.level === 4 ? 'text-blue-700' : b.level === 3 ? 'text-indigo-700' : b.level === 2 ? 'text-amber-700' : 'text-rose-700'
                  }`}>
                    {b.label}
                  </span>
                  {selectedBarsLevel === b.level && (
                    <span className="text-2xs font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full">
                      Selected Anchor
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed mt-1">
                  {b.anchor}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CALIBRATION DISTRIBUTION CURVE */}
      {activeTab === 'calibration' && (
        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Calibration Meeting & Grade Inflation Diagnostic</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Without cross-team calibration meetings, lenient managers award top ratings to 70%+ of staff, demoralizing top performers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Uncalibrated Reality */}
            <div className="p-5 bg-rose-50/60 border border-rose-200 rounded-xl space-y-3">
              <span className="text-2xs font-bold uppercase tracking-wider text-rose-800 block">
                Uncalibrated Reality (Lenient Manager Bias)
              </span>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-rose-950">Rated 4 or 5:</span>
                <span className="text-xl font-extrabold font-mono text-rose-700">74% of Staff</span>
              </div>
              <p className="text-2xs text-rose-900 leading-relaxed">
                Result: Merit pool is divided equally. Elite contributors receive only 8% increments while underperformers receive 6%. Top engineers resign within 6 months.
              </p>
            </div>

            {/* Calibrated Guidance Standard */}
            <div className="p-5 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-3">
              <span className="text-2xs font-bold uppercase tracking-wider text-emerald-800 block">
                Calibrated Guidance Distribution (Peer Reviewed)
              </span>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-950">Rated 4 or 5:</span>
                <span className="text-xl font-extrabold font-mono text-emerald-700">20% – 30% of Staff</span>
              </div>
              <p className="text-2xs text-emerald-900 leading-relaxed">
                Result: Ratings are defensible and grounded in evidence. Top performers receive 12–14% raises and public retention stock grants. Fairness perception doubles.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: MERIT INCREMENT GRID */}
      {activeTab === 'merit' && (
        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Published Merit Increment Matrix</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Tie compensation increments transparently to both performance rating and position in salary band (Compa-Ratio).
            </p>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
                  <th className="p-3">Calibrated Rating</th>
                  <th className="p-3 text-center">Below Midpoint (&lt;90% Compa)</th>
                  <th className="p-3 text-center">At Midpoint (90%–110%)</th>
                  <th className="p-3 text-center">Above Midpoint (&gt;110%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="bg-emerald-50/30">
                  <td className="p-3 font-bold text-emerald-900">5 — Exceptional</td>
                  <td className="p-3 text-center font-mono font-bold text-emerald-700">14%</td>
                  <td className="p-3 text-center font-mono font-bold text-emerald-700">12%</td>
                  <td className="p-3 text-center font-mono font-bold text-emerald-700">10%</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-blue-900">4 — Exceeding</td>
                  <td className="p-3 text-center font-mono font-semibold text-blue-700">11%</td>
                  <td className="p-3 text-center font-mono font-semibold text-blue-700">9%</td>
                  <td className="p-3 text-center font-mono font-semibold text-blue-700">7%</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900">3 — Fully Meeting</td>
                  <td className="p-3 text-center font-mono text-slate-700">8%</td>
                  <td className="p-3 text-center font-mono text-slate-700">6%</td>
                  <td className="p-3 text-center font-mono text-slate-700">4%</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-amber-900">2 — Partly Meeting</td>
                  <td className="p-3 text-center font-mono text-amber-700">3%</td>
                  <td className="p-3 text-center font-mono text-amber-700">2%</td>
                  <td className="p-3 text-center font-mono text-amber-700">0%</td>
                </tr>
                <tr className="bg-rose-50/30">
                  <td className="p-3 font-bold text-rose-900">1 — Not Meeting</td>
                  <td className="p-3 text-center font-mono text-rose-700 font-bold">0% (PIP)</td>
                  <td className="p-3 text-center font-mono text-rose-700 font-bold">0% (PIP)</td>
                  <td className="p-3 text-center font-mono text-rose-700 font-bold">0% (PIP)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
