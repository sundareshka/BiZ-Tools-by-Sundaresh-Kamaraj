import { useState, useMemo } from 'react';
import { TrendingDown, Users, DollarSign, Sliders, AlertTriangle, CheckCircle2, RotateCcw, ArrowRight, ShieldCheck, HelpCircle, Activity, Sparkles, Building2, Eye, PhoneCall } from 'lucide-react';

interface CohortData {
  cohortName: string;
  initialCount: number;
  month1: number;
  month2: number;
  month3: number;
  month6: number;
}

const DEFAULT_COHORTS: CohortData[] = [
  { cohortName: 'January', initialCount: 100, month1: 82, month2: 74, month3: 70, month6: 63 },
  { cohortName: 'February', initialCount: 120, month1: 85, month2: 78, month3: 73, month6: 66 },
  { cohortName: 'March (Guided Onboarding)', initialCount: 110, month1: 91, month2: 86, month3: 83, month6: 78 },
  { cohortName: 'April (Payment Retries)', initialCount: 135, month1: 93, month2: 89, month3: 86, month6: 82 }
];

export function ChurnAnalysisSimulator() {
  // Monthly MRR & Logo inputs
  const [startCustomers, setStartCustomers] = useState<number>(400);
  const [lostCustomers, setLostCustomers] = useState<number>(20);
  const [startingMRR, setStartingMRR] = useState<number>(600000);
  const [churnedMRR, setChurnedMRR] = useState<number>(30000);
  const [contractionMRR, setContractionMRR] = useState<number>(10000);
  const [expansionMRR, setExpansionMRR] = useState<number>(45000);
  const [grossMarginPct, setGrossMarginPct] = useState<number>(80);
  const [cacINR, setCacINR] = useState<number>(8000);

  // Involuntary vs Voluntary Churn split
  const [involuntaryPct, setInvoluntaryPct] = useState<number>(35); // 35% failed payments/mandates

  // Customer Health Score Interactive Simulator
  const [healthWauPct, setHealthWauPct] = useState<number>(65); // % of licenses active
  const [healthKeyAction14d, setHealthKeyAction14d] = useState<boolean>(true); // Sent fee reminders in 14d
  const [healthOpenTicketsOver7d, setHealthOpenTicketsOver7d] = useState<number>(0);
  const [healthPaymentStatus, setHealthPaymentStatus] = useState<'current' | 'retrying' | 'failed'>('current');

  // 1. Churn & NRR Calculations
  const customerChurnRate = startCustomers > 0 ? (lostCustomers / startCustomers) * 100 : 0;
  const grossMRRChurnRate = startingMRR > 0 ? ((churnedMRR + contractionMRR) / startingMRR) * 100 : 0;
  const nrr = startingMRR > 0 ? ((startingMRR + expansionMRR - contractionMRR - churnedMRR) / startingMRR) * 100 : 100;
  const arpa = startCustomers > 0 ? startingMRR / startCustomers : 0;

  // LTV Formula: LTV ≈ (ARPA × Gross Margin %) ÷ Monthly Customer Churn Rate
  const monthlyChurnDecimal = customerChurnRate / 100;
  const ltv = monthlyChurnDecimal > 0 ? (arpa * (grossMarginPct / 100)) / monthlyChurnDecimal : 0;
  const ltvCacRatio = cacINR > 0 ? ltv / cacINR : 0;

  // Compounded Annual Retention = (1 - monthlyChurn)^12
  const monthlyRetentionDecimal = 1 - monthlyChurnDecimal;
  const impliedAnnualRetention = Math.pow(Math.max(0, monthlyRetentionDecimal), 12) * 100;

  // 2. Health Score Calculation (0-100)
  // WAU (40%), Key action (25%), Tickets (15%), Payment (20%)
  const healthScore = useMemo(() => {
    let score = 0;
    // WAU
    if (healthWauPct >= 60) score += 40;
    else if (healthWauPct >= 30) score += 20;

    // Key Action in last 14 days
    if (healthKeyAction14d) score += 25;

    // Open Tickets > 7 days
    if (healthOpenTicketsOver7d === 0) score += 15;
    else if (healthOpenTicketsOver7d === 1) score += 7;

    // Payment status
    if (healthPaymentStatus === 'current') score += 20;
    else if (healthPaymentStatus === 'retrying') score += 5;

    return score;
  }, [healthWauPct, healthKeyAction14d, healthOpenTicketsOver7d, healthPaymentStatus]);

  const healthTier = useMemo(() => {
    if (healthScore >= 70) {
      return {
        label: 'HEALTHY / GREEN',
        badge: 'bg-emerald-50 text-emerald-800 border-emerald-300',
        action: 'Account is thriving. Candidate for annual contract upgrade or expansion seats.'
      };
    }
    if (healthScore >= 40) {
      return {
        label: 'AT-RISK / AMBER',
        badge: 'bg-amber-50 text-amber-800 border-amber-300',
        action: 'Warning signs detected. Trigger automated in-app nudge and proactive CS check-in.'
      };
    }
    return {
      label: 'CRITICAL CHURN RISK / RED',
      badge: 'bg-rose-50 text-rose-800 border-rose-300',
      action: 'High probability of imminent churn. Customer Success lead must call within 48 hours!'
    };
  }, [healthScore]);

  // FeeTrack Preset
  const loadFeeTrackPreset = () => {
    setStartCustomers(600);
    setLostCustomers(18); // 3%
    setStartingMRR(900000);
    setChurnedMRR(27000);
    setContractionMRR(9000);
    setExpansionMRR(54000);
    setGrossMarginPct(80);
    setCacINR(9000);
    setInvoluntaryPct(35);
  };

  const loadEarlyLeakPreset = () => {
    setStartCustomers(150);
    setLostCustomers(15); // 10%
    setStartingMRR(300000);
    setChurnedMRR(30000);
    setContractionMRR(10000);
    setExpansionMRR(12000);
    setGrossMarginPct(75);
    setCacINR(8000);
    setInvoluntaryPct(50);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
              <span>Category 9: Product & Startup Tools</span>
              <span>·</span>
              <span>SaaS Economics & Retention</span>
              <span>·</span>
              <span>David Skok Net Negative Churn</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-indigo-600" />
              Churn Analysis, Cohort Retention & NRR Simulator
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl">
              Fix the leaky bucket that caps growth. Track monthly logo and revenue churn, model Net Revenue Retention (NRR), analyze multi-month cohort retention curves, and deploy composite customer health scores.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={loadFeeTrackPreset}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
            >
              Load FeeTrack Case Study (3% Churn)
            </button>
            <button
              onClick={loadEarlyLeakPreset}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors"
            >
              Simulate High Leak (10% Churn)
            </button>
          </div>
        </div>
      </div>

      {/* Top Metric Cards: Churn, NRR, LTV, Annual Compounding */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <span className="text-2xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Customer Logo Churn
          </span>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-extrabold font-mono ${customerChurnRate <= 3 ? 'text-emerald-700' : customerChurnRate <= 5 ? 'text-amber-700' : 'text-rose-700'}`}>
              {customerChurnRate.toFixed(1)}%
            </span>
            <span className="text-2xs text-slate-500">monthly</span>
          </div>
          <span className="text-3xs text-slate-400 block mt-1">
            {lostCustomers} of {startCustomers} accounts lost
          </span>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <span className="text-2xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Net Revenue Retention (NRR)
          </span>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-extrabold font-mono ${nrr >= 100 ? 'text-emerald-700' : 'text-rose-700'}`}>
              {nrr.toFixed(1)}%
            </span>
            <span className="text-2xs text-slate-500">{nrr >= 100 ? 'Net Expansion' : 'Net Loss'}</span>
          </div>
          <span className="text-3xs text-slate-400 block mt-1">
            {nrr >= 100 ? 'Existing base expands revenue' : 'Contraction exceeds expansion'}
          </span>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <span className="text-2xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Implied Annual Retention
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold font-mono text-slate-900">
              {impliedAnnualRetention.toFixed(1)}%
            </span>
            <span className="text-2xs text-slate-500">(0.95¹²)</span>
          </div>
          <span className="text-3xs text-slate-400 block mt-1">
            Compounded over 12 billing cycles
          </span>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <span className="text-2xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Customer LTV & LTV:CAC
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold font-mono text-indigo-700">
              ₹{Math.round(ltv).toLocaleString()}
            </span>
            <span className="text-2xs font-mono font-bold text-emerald-700">({ltvCacRatio.toFixed(1)}x CAC)</span>
          </div>
          <span className="text-3xs text-slate-400 block mt-1">
            ARPA ₹{Math.round(arpa)} @ {grossMarginPct}% gross margin
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Churn & NRR Calculator + Involuntary Split (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* 1. Monthly Recurring Revenue & Account Flow */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                1. Monthly MRR & Logo Churn Parameters
              </h4>
              <span className="text-2xs font-semibold text-slate-400">Monthly Run</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-2xs font-semibold text-slate-600 block mb-1">Starting Customers</label>
                <input
                  type="number"
                  value={startCustomers}
                  onChange={e => setStartCustomers(Math.max(1, Number(e.target.value)))}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 font-mono text-xs text-slate-900"
                />
              </div>
              <div>
                <label className="text-2xs font-semibold text-slate-600 block mb-1">Customers Lost (Cancellations)</label>
                <input
                  type="number"
                  value={lostCustomers}
                  onChange={e => setLostCustomers(Math.max(0, Number(e.target.value)))}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 font-mono text-xs text-slate-900"
                />
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-slate-100 text-xs">
              <div>
                <div className="flex justify-between text-2xs mb-1">
                  <span className="font-semibold text-slate-700">Starting MRR (₹)</span>
                  <span className="font-mono font-bold text-slate-900">₹{startingMRR.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="3000000"
                  step="50000"
                  value={startingMRR}
                  onChange={e => setStartingMRR(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-2xs font-semibold text-rose-700 block">Churned MRR (₹)</label>
                  <input
                    type="number"
                    value={churnedMRR}
                    onChange={e => setChurnedMRR(Number(e.target.value))}
                    className="w-full px-2 py-1 rounded border border-rose-200 font-mono text-xs text-rose-900"
                  />
                </div>
                <div>
                  <label className="text-2xs font-semibold text-amber-700 block">Contraction MRR (₹)</label>
                  <input
                    type="number"
                    value={contractionMRR}
                    onChange={e => setContractionMRR(Number(e.target.value))}
                    className="w-full px-2 py-1 rounded border border-amber-200 font-mono text-xs text-amber-900"
                  />
                </div>
                <div>
                  <label className="text-2xs font-semibold text-emerald-700 block">Expansion MRR (₹)</label>
                  <input
                    type="number"
                    value={expansionMRR}
                    onChange={e => setExpansionMRR(Number(e.target.value))}
                    className="w-full px-2 py-1 rounded border border-emerald-200 font-mono text-xs text-emerald-900"
                  />
                </div>
              </div>
            </div>

            {/* Involuntary vs Voluntary Churn Diagnosis */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900">Involuntary Churn Diagnosis</span>
                <span className="font-mono font-bold text-indigo-700">{involuntaryPct}% of churn</span>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                step="5"
                value={involuntaryPct}
                onChange={e => setInvoluntaryPct(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
              <p className="text-2xs text-slate-600 leading-relaxed">
                {involuntaryPct}% of lost accounts ({Math.round(lostCustomers * (involuntaryPct / 100))} accounts, ₹{Math.round(churnedMRR * (involuntaryPct / 100)).toLocaleString()}/mo) were lost to <strong>failed UPI AutoPay mandates and expired cards</strong> — not product dissatisfaction. Automated retry reminders can recover 50%+ of this immediately!
              </p>
            </div>
          </div>

          {/* 2. Customer Health Score (0-100) Recipe */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-600" />
                2. Leading Indicator: Customer Health Score Recipe
              </h4>
              <span className={`text-2xs font-extrabold uppercase px-2 py-0.5 rounded border ${healthTier.badge}`}>
                Score: {healthScore}/100
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-2xs mb-1">
                  <span className="font-semibold text-slate-700">Weekly Active Users vs Licences (40% Weight)</span>
                  <span className="font-mono font-bold text-slate-900">{healthWauPct}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={healthWauPct}
                  onChange={e => setHealthWauPct(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <div>
                  <span className="font-semibold text-slate-800 block">Core Value Action in Last 14 Days (25% Weight)</span>
                  <span className="text-3xs text-slate-500">e.g. Sent fee reminder to parents</span>
                </div>
                <button
                  onClick={() => setHealthKeyAction14d(!healthKeyAction14d)}
                  className={`px-3 py-1 rounded text-2xs font-bold transition-all ${
                    healthKeyAction14d ? 'bg-emerald-600 text-white' : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {healthKeyAction14d ? 'Yes (+25 pts)' : 'No (0 pts)'}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-2xs font-semibold text-slate-600 block mb-1">Open Tickets &gt; 7 Days (15%)</label>
                  <select
                    value={healthOpenTicketsOver7d}
                    onChange={e => setHealthOpenTicketsOver7d(Number(e.target.value))}
                    className="w-full px-2 py-1 rounded border border-slate-200 bg-white font-mono text-xs text-slate-800"
                  >
                    <option value="0">0 Tickets (+15 pts)</option>
                    <option value="1">1 Ticket (+7 pts)</option>
                    <option value="2">2+ Tickets (0 pts)</option>
                  </select>
                </div>
                <div>
                  <label className="text-2xs font-semibold text-slate-600 block mb-1">Billing Mandate Status (20%)</label>
                  <select
                    value={healthPaymentStatus}
                    onChange={e => setHealthPaymentStatus(e.target.value as any)}
                    className="w-full px-2 py-1 rounded border border-slate-200 bg-white font-mono text-xs text-slate-800"
                  >
                    <option value="current">Current (+20 pts)</option>
                    <option value="retrying">Retrying (+5 pts)</option>
                    <option value="failed">Failed (0 pts)</option>
                  </select>
                </div>
              </div>

              <div className="p-3 rounded-lg border text-2xs space-y-1 bg-slate-50 border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{healthTier.label}</span>
                  <PhoneCall className="w-3.5 h-3.5 text-slate-500" />
                </div>
                <p className="text-slate-600">{healthTier.action}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Multi-Month Cohort Retention Heatmap (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-600" />
                3. Multi-Month Cohort Retention Heatmap
              </h4>
              <span className="text-2xs font-semibold text-slate-400">Share of Accounts Retained</span>
            </div>

            <p className="text-2xs text-slate-600 leading-relaxed">
              Read across a row to follow a cohort over time; read down a column to compare cohorts at the same age. Newer cohorts show the tangible effect of onboarding improvements.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-2xs">
                    <th className="py-2.5 px-3">Cohort</th>
                    <th className="py-2.5 px-3">Acquired</th>
                    <th className="py-2.5 px-3">Month 1</th>
                    <th className="py-2.5 px-3">Month 2</th>
                    <th className="py-2.5 px-3">Month 3</th>
                    <th className="py-2.5 px-3">Month 6</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-xs">
                  {DEFAULT_COHORTS.map(c => (
                    <tr key={c.cohortName} className="hover:bg-slate-50/60">
                      <td className="py-3 px-3 font-bold font-sans text-slate-900">{c.cohortName}</td>
                      <td className="py-3 px-3 text-slate-600">{c.initialCount}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded font-bold ${getHeatmapClass(c.month1)}`}>
                          {c.month1}%
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded font-bold ${getHeatmapClass(c.month2)}`}>
                          {c.month2}%
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded font-bold ${getHeatmapClass(c.month3)}`}>
                          {c.month3}%
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded font-bold ${getHeatmapClass(c.month6)}`}>
                          {c.month6}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Retention Insight Box */}
            <div className="p-3.5 bg-indigo-50/70 border border-indigo-200 rounded-lg text-xs space-y-1.5">
              <span className="font-bold text-indigo-950 block">Empirical Cohort Takeaway:</span>
              <p className="text-slate-700 leading-relaxed text-2xs">
                The <strong>March (Guided Onboarding)</strong> and <strong>April (Payment Retries)</strong> cohorts maintain 91% and 93% Month-1 retention, compared to only 82% in January. The 14-day WhatsApp guided onboarding eliminated the initial cliff, raising implied annual retention from 54% to 69%!
              </p>
            </div>
          </div>

          {/* 4. Sundaresh Kamaraj Executive Retention Rules */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Sundaresh Kamaraj 5 Pro Retention Principles
            </h4>

            <div className="space-y-2 text-2xs text-slate-700">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <strong className="text-slate-900 block mb-0.5">1. Fix Involuntary Churn First:</strong>
                Payment retries and mandate reminder messages are fast, cheap engineering wins that recover 30-40% of churned revenue.
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <strong className="text-slate-900 block mb-0.5">2. Obsess Over the First 30 Days:</strong>
                Most customer churn is decided during onboarding. If a user fails to experience the core value action in 14 days, they will churn.
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <strong className="text-slate-900 block mb-0.5">3. Avoid Blanket 30% Discounts:</strong>
                Offering blanket discounts destroys margin on loyal customers. Diagnose root causes (technical vs. operational vs. pricing) first.
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <strong className="text-slate-900 block mb-0.5">4. Track Logos and MRR Separately:</strong>
                Expansion from high-tier accounts can conceal severe customer logo churn until the foundation suddenly collapses.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function getHeatmapClass(val: number) {
    if (val >= 90) return 'bg-emerald-100 text-emerald-900';
    if (val >= 80) return 'bg-emerald-50 text-emerald-800';
    if (val >= 70) return 'bg-amber-100 text-amber-900';
    if (val >= 60) return 'bg-amber-50 text-amber-800';
    return 'bg-rose-100 text-rose-900';
  }
}
