import { useState, useMemo } from 'react';
import { TrendingUp, Sliders, CheckCircle2, AlertTriangle, RotateCcw, ArrowRight, ShieldCheck, Sparkles, Scale, Info, Eye, ExternalLink, BarChart3, HelpCircle, Calendar, Package } from 'lucide-react';

interface MonthlyData {
  m: number;
  actual: number; // in ₹ Lakhs
}

// Data from Example 1 from Guide (Page 37)
const HISTORICAL_MONTHS: MonthlyData[] = [
  { m: 1, actual: 18.2 },
  { m: 2, actual: 19.0 },
  { m: 3, actual: 19.4 },
  { m: 4, actual: 20.1 },
  { m: 5, actual: 21.3 },
  { m: 6, actual: 20.8 },
  { m: 7, actual: 22.0 },
  { m: 8, actual: 22.9 },
  { m: 9, actual: 23.1 },
  { m: 10, actual: 24.4 },
  { m: 11, actual: 25.0 },
  { m: 12, actual: 25.6 }
];

export function PredictiveAnalyticsSimulator() {
  const [activeTab, setActiveTab] = useState<'forecast' | 'salem' | 'churnScore'>('forecast');
  const [confidenceLevel, setConfidenceLevel] = useState<80 | 95>(80);
  const [growthTrendWeight, setGrowthTrendWeight] = useState<number>(0.67); // slope per month

  // Salem Textile Case Study Dual Purchasing State
  const [silkForecast, setSilkForecast] = useState<number>(5000); // 5,000 units
  const [silkPurchaseStrategy, setSilkPurchaseStrategy] = useState<'naive' | 'dualRule'>('dualRule');

  // Churn Risk Scorecard State (Example 3, Page 38)
  const [usageDrop50, setUsageDrop50] = useState<boolean>(true);
  const [supportComplaints2Plus, setSupportComplaints2Plus] = useState<boolean>(true);
  const [latePaymentFail, setLatePaymentFail] = useState<boolean>(false);
  const [noResponse3Msgs, setNoResponse3Msgs] = useState<boolean>(false);
  const [tenureUnder3Mo, setTenureUnder3Mo] = useState<boolean>(false);

  // Time-Series Hold-Out calculation (Months 1-9 train, 10-12 test)
  const holdOutResults = useMemo(() => {
    // Model fit: Revenue = 17.47 + slope * m
    const intercept = 17.47;
    const testMonths = [10, 11, 12];
    const actuals = [24.4, 25.0, 25.6];

    const forecasts = testMonths.map(m => parseFloat((intercept + growthTrendWeight * m).toFixed(2)));
    const errors = forecasts.map((pred, i) => Math.abs(pred - actuals[i]));
    const pctErrors = forecasts.map((pred, i) => (Math.abs(pred - actuals[i]) / actuals[i]) * 100);
    const holdOutMAPE = (pctErrors.reduce((a, b) => a + b, 0) / pctErrors.length).toFixed(2);
    const holdOutMAE = (errors.reduce((a, b) => a + b, 0) / errors.length).toFixed(2);

    // Naive baseline: same as month 9 (23.1)
    const naiveMAPE = (actuals.map(a => Math.abs(23.1 - a) / a * 100).reduce((a, b) => a + b, 0) / 3).toFixed(2);

    // Future forecasts (M13, M14, M15)
    const futureMonths = [13, 14, 15];
    const marginOfError = confidenceLevel === 80 ? 1.4 : 2.3;
    const futureProjections = futureMonths.map(m => {
      const pred = intercept + growthTrendWeight * m;
      return {
        m,
        pred: pred.toFixed(1),
        low: (pred - marginOfError).toFixed(1),
        high: (pred + marginOfError).toFixed(1)
      };
    });

    return { forecasts, actuals, pctErrors, holdOutMAPE, holdOutMAE, naiveMAPE, futureProjections };
  }, [confidenceLevel, growthTrendWeight]);

  // Salem Dual Rule calculation
  const salemResults = useMemo(() => {
    if (silkPurchaseStrategy === 'naive') {
      const initialOrder = silkForecast;
      const actualDemand = Math.round(silkForecast * 0.75); // demand was lower by 25% for premium
      const unsoldUnits = initialOrder - actualDemand;
      const capitalTrappedLakhs = ((unsoldUnits * 6500) / 100000).toFixed(1); // ₹6,500/saree
      return {
        initialOrder,
        reorders: 0,
        unsoldUnits,
        capitalTrappedLakhs,
        diagnosis: 'Single-number naive purchase over-committed capital; ₹3.2 Crore of premium silk stock remained stranded after Deepavali.'
      };
    } else {
      // 30th percentile rule: order 65% upfront, fast reorder remaining during season
      const initialOrder = Math.round(silkForecast * 0.65);
      const actualDemand = Math.round(silkForecast * 0.75);
      const reorders = Math.max(0, actualDemand - initialOrder);
      const unsoldUnits = Math.max(0, initialOrder - actualDemand);
      const capitalTrappedLakhs = ((unsoldUnits * 6500) / 100000).toFixed(1);
      return {
        initialOrder,
        reorders,
        unsoldUnits,
        capitalTrappedLakhs,
        diagnosis: 'Dual purchasing rule: procured core range at 65% of prediction range, holding back capital and reordering in-season. Unsold inventory fell to ₹1.9 Crore.'
      };
    }
  }, [silkForecast, silkPurchaseStrategy]);

  // Churn Scorecard Points (Page 38, Example 3)
  const churnPoints = useMemo(() => {
    let pts = 0;
    if (usageDrop50) pts += 30;
    if (supportComplaints2Plus) pts += 20;
    if (latePaymentFail) pts += 20;
    if (noResponse3Msgs) pts += 15;
    if (tenureUnder3Mo) pts += 15;

    const isHighRisk = pts >= 50;
    return { pts, isHighRisk };
  }, [usageDrop50, supportComplaints2Plus, latePaymentFail, noResponse3Msgs, tenureUnder3Mo]);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-violet-700 uppercase tracking-wider mb-1">
            <TrendingUp className="w-4 h-4" />
            <span>Pillar 10 · Predictive Analytics & Modeling Studio</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Time-Series Forecasting, Hold-Out Testing & Risk Scoring
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Test forecasting models against held-back historical data, generate prediction intervals, and simulate Salem Textile Traders’ dual purchasing rule.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveTab('forecast')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'forecast' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Time-Series & Hold-Out
          </button>
          <button
            onClick={() => setActiveTab('salem')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'salem' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Salem Inventory Case Study
          </button>
          <button
            onClick={() => setActiveTab('churnScore')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'churnScore' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Churn Risk Scorecard
          </button>
        </div>
      </div>

      {/* TAB 1: TIME SERIES & HOLD-OUT ACCURACY (PAGE 37 EXAMPLE 1) */}
      {activeTab === 'forecast' && (
        <div className="space-y-6">
          {/* Hold-Out Accuracy Metrics Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-violet-50/60 border border-violet-200 rounded-xl space-y-1">
              <span className="text-3xs font-extrabold text-violet-800 uppercase tracking-wider block">Hold-Out MAPE (Months 10–12)</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold font-mono text-violet-950">{holdOutResults.holdOutMAPE}%</span>
                <span className="text-3xs text-emerald-700 font-bold">Beats Naïve ({holdOutResults.naiveMAPE}%)</span>
              </div>
              <span className="text-3xs text-slate-600 block">Evaluated on unseen test data</span>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
              <span className="text-3xs font-extrabold text-slate-400 uppercase tracking-wider block">Mean Absolute Error (MAE)</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold font-mono text-slate-900">₹{holdOutResults.holdOutMAE}L</span>
                <span className="text-3xs text-slate-500">Average error in Lakhs</span>
              </div>
              <span className="text-3xs text-slate-600 block">Actual absolute rupee variance</span>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
              <span className="text-3xs font-extrabold text-slate-400 uppercase tracking-wider block">Prediction Interval Range</span>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => setConfidenceLevel(80)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg ${confidenceLevel === 80 ? 'bg-violet-900 text-white' : 'bg-slate-100 text-slate-700'}`}
                >
                  80% Band (±₹1.4L)
                </button>
                <button
                  onClick={() => setConfidenceLevel(95)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg ${confidenceLevel === 95 ? 'bg-violet-900 text-white' : 'bg-slate-100 text-slate-700'}`}
                >
                  95% Band (±₹2.3L)
                </button>
              </div>
              <span className="text-3xs text-slate-500 block mt-1">Sundaresh Kamaraj: Never give a single point estimate</span>
            </div>
          </div>

          {/* Historical Data & Hold-Out Comparison Table */}
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Hold-Out Back-Test Comparison (Months 10–12 from Guide Example 1)
            </h4>
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              {[10, 11, 12].map((m, idx) => (
                <div key={m} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                  <span className="text-3xs font-bold text-slate-500 uppercase block">Month {m}</span>
                  <div className="font-mono text-xs">
                    <span className="text-slate-500">Forecast: </span>
                    <strong className="text-slate-900">₹{holdOutResults.forecasts[idx]}L</strong>
                  </div>
                  <div className="font-mono text-xs">
                    <span className="text-slate-500">Actual: </span>
                    <strong className="text-emerald-700">₹{holdOutResults.actuals[idx]}L</strong>
                  </div>
                  <span className="text-3xs font-mono font-bold text-violet-800 block">
                    Error: {holdOutResults.pctErrors[idx].toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Projected Future Quarters (Months 13, 14, 15) with Uncertainty Bands */}
          <div className="p-5 bg-slate-900 text-white rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Future Forecast Projections with {confidenceLevel}% Confidence Bands
                </h4>
                <span className="text-3xs text-slate-400">Model refitted on all 12 historical months</span>
              </div>
              <span className="text-3xs font-mono text-violet-300 font-bold">Revenue ≈ 17.47 + 0.67 × Month</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {holdOutResults.futureProjections.map(p => (
                <div key={p.m} className="p-3.5 bg-slate-800 rounded-lg border border-slate-700 space-y-1">
                  <span className="text-3xs font-extrabold text-violet-400 uppercase tracking-wider block">Month {p.m} Projection</span>
                  <div className="text-lg font-extrabold font-mono text-white">₹{p.pred} Lakh</div>
                  <div className="text-3xs font-mono text-slate-400 pt-0.5">
                    {confidenceLevel}% Range: <strong className="text-emerald-400">₹{p.low}L – ₹{p.high}L</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SALEM TEXTILE TRADERS CASE STUDY SIMULATOR (PAGE 36–37) */}
      {activeTab === 'salem' && (
        <div className="space-y-6">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 space-y-1">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <Package className="w-4 h-4 text-violet-700" />
              <span>Salem Textile Traders: Festive Silk Procurement Strategy</span>
            </span>
            <p>
              Compare the naive procurement instinct (ordering 100% of forecast upfront) versus the statistical <strong>Dual Purchasing Rule</strong> (ordering 65% at 30th percentile with in-season fast reorders).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Procurement Strategy Controls</h4>

              <div className="space-y-2">
                <span className="text-3xs font-bold text-slate-500 uppercase block">Purchasing Methodology</span>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <button
                    onClick={() => setSilkPurchaseStrategy('naive')}
                    className={`p-2.5 rounded-lg border ${silkPurchaseStrategy === 'naive' ? 'bg-rose-50 border-rose-300 text-rose-900 font-extrabold' : 'bg-white border-slate-200 text-slate-600'}`}
                  >
                    Naive 100%
                  </button>
                  <button
                    onClick={() => setSilkPurchaseStrategy('dualRule')}
                    className={`p-2.5 rounded-lg border ${silkPurchaseStrategy === 'dualRule' ? 'bg-violet-50 border-violet-300 text-violet-900 font-extrabold' : 'bg-white border-slate-200 text-slate-600'}`}
                  >
                    Dual Rule (65%)
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span>Forecast Demand:</span>
                  <span className="font-mono text-violet-900">{silkForecast.toLocaleString()} Sarees</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="8000"
                  step="500"
                  value={silkForecast}
                  onChange={(e) => setSilkForecast(parseInt(e.target.value))}
                  className="w-full accent-violet-700"
                />
              </div>
            </div>

            <div className="lg:col-span-2 bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Post-Season Inventory & Cash Impact</h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-3xs text-slate-400 font-bold uppercase block">Pre-Season Initial Order</span>
                  <span className="text-xl font-extrabold font-mono text-slate-900">{salemResults.initialOrder.toLocaleString()}</span>
                  <span className="text-3xs text-slate-500 block mt-0.5">Units committed in June</span>
                </div>

                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-3xs text-slate-400 font-bold uppercase block">In-Season Repeat Orders</span>
                  <span className="text-xl font-extrabold font-mono text-violet-900">{salemResults.reorders.toLocaleString()}</span>
                  <span className="text-3xs text-slate-500 block mt-0.5">Triggered when sell-thru &gt;15%</span>
                </div>

                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-3xs text-slate-400 font-bold uppercase block">Unsold Stranded Stock</span>
                  <span className={`text-xl font-extrabold font-mono ${salemResults.unsoldUnits > 0 ? 'text-rose-600' : 'text-emerald-700'}`}>
                    ₹{salemResults.capitalTrappedLakhs}L
                  </span>
                  <span className="text-3xs text-slate-500 block mt-0.5">{salemResults.unsoldUnits} unsold units</span>
                </div>
              </div>

              <div className="p-4 bg-white rounded-lg border border-slate-200 space-y-1">
                <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider block">Operational Outcome</span>
                <p className="text-xs text-slate-700 leading-relaxed">{salemResults.diagnosis}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CHURN RISK SCORECARD (PAGE 38 EXAMPLE 3) */}
      {activeTab === 'churnScore' && (
        <div className="space-y-6">
          <div className="p-4 bg-violet-50/60 border border-violet-200 rounded-xl text-xs text-violet-950 space-y-1">
            <span className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-violet-700" />
              <span>Points-Based Churn Risk Classification Model</span>
            </span>
            <p>
              Before building advanced machine learning classification models, SMEs construct points-based risk scores using indicators proven by cohort analysis. Accounts scoring ≥50 points are flagged for immediate retention team outreach.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Account Telemetry & Behavioral Flags (Last 60 Days)</h4>

              <div className="space-y-2 text-xs">
                <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <div>
                    <span className="font-bold text-slate-900 block">Product Usage / Orders Drop &gt;50%</span>
                    <span className="text-3xs text-slate-500">Telemetry signals engagement collapse</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-violet-900">+30 pts</span>
                    <input
                      type="checkbox"
                      checked={usageDrop50}
                      onChange={(e) => setUsageDrop50(e.target.checked)}
                      className="rounded text-violet-700 w-4 h-4"
                    />
                  </div>
                </label>

                <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <div>
                    <span className="font-bold text-slate-900 block">2 or More Unresolved Support Complaints</span>
                    <span className="text-3xs text-slate-500">Service friction unresolved beyond SLA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-violet-900">+20 pts</span>
                    <input
                      type="checkbox"
                      checked={supportComplaints2Plus}
                      onChange={(e) => setSupportComplaints2Plus(e.target.checked)}
                      className="rounded text-violet-700 w-4 h-4"
                    />
                  </div>
                </label>

                <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <div>
                    <span className="font-bold text-slate-900 block">Late Payment or Failed Auto-Debit</span>
                    <span className="text-3xs text-slate-500">Involuntary or passive payment failure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-violet-900">+20 pts</span>
                    <input
                      type="checkbox"
                      checked={latePaymentFail}
                      onChange={(e) => setLatePaymentFail(e.target.checked)}
                      className="rounded text-violet-700 w-4 h-4"
                    />
                  </div>
                </label>

                <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <div>
                    <span className="font-bold text-slate-900 block">No Response to Last 3 Account Messages</span>
                    <span className="text-3xs text-slate-500">Account executive radio silence</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-violet-900">+15 pts</span>
                    <input
                      type="checkbox"
                      checked={noResponse3Msgs}
                      onChange={(e) => setNoResponse3Msgs(e.target.checked)}
                      className="rounded text-violet-700 w-4 h-4"
                    />
                  </div>
                </label>

                <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <div>
                    <span className="font-bold text-slate-900 block">Customer Tenure &lt; 3 Months</span>
                    <span className="text-3xs text-slate-500">High-risk onboarding vulnerability period</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-violet-900">+15 pts</span>
                    <input
                      type="checkbox"
                      checked={tenureUnder3Mo}
                      onChange={(e) => setTenureUnder3Mo(e.target.checked)}
                      className="rounded text-violet-700 w-4 h-4"
                    />
                  </div>
                </label>
              </div>
            </div>

            {/* Scorecard Outcome Card */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4 text-center">
              <span className="text-3xs font-extrabold uppercase text-slate-400 tracking-wider block">Total Churn Risk Score</span>
              <div className="text-4xl font-extrabold font-mono text-slate-900">
                {churnPoints.pts} <span className="text-xs font-normal text-slate-500">/ 100</span>
              </div>

              <div className={`p-3 rounded-lg border font-bold text-xs uppercase tracking-wide ${
                churnPoints.isHighRisk ? 'bg-rose-50 text-rose-800 border-rose-300' : 'bg-emerald-50 text-emerald-800 border-emerald-300'
              }`}>
                {churnPoints.isHighRisk ? 'Flagged: High Churn Risk (≥50)' : 'Normal Risk (&lt;50)'}
              </div>

              <p className="text-3xs text-slate-600 text-left">
                {churnPoints.isHighRisk
                  ? 'Mandatory Action: Account is immediately routed to the Senior Customer Success retention desk for priority executive outreach before the monthly renewal date.'
                  : 'Account demonstrates healthy engagement and requires standard relationship management.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
