import { useState, useMemo } from 'react';
import { Users, TrendingDown, DollarSign, Sliders, AlertTriangle, CheckCircle2, RotateCcw, ArrowRight, ShieldCheck, HelpCircle, Activity, Sparkles, Building2, Eye, Compass } from 'lucide-react';

interface CohortRow {
  month: string;
  size: number;
  m1?: number;
  m2?: number;
  m3?: number;
  m4?: number;
  m5?: number;
  cumulativeRevM12?: number;
}

// Data from Example 1 & 2 of Training Guide
const BLENDED_COHORTS: CohortRow[] = [
  { month: 'Jan', size: 400, m1: 78.0, m2: 65.5, m3: 57.8, m4: 53.5, m5: 51.0, cumulativeRevM12: 8100 },
  { month: 'Feb', size: 450, m1: 76.0, m2: 63.1, m3: 56.0, m4: 52.0, cumulativeRevM12: 7900 },
  { month: 'Mar', size: 520, m1: 81.0, m2: 70.0, m3: 63.1, cumulativeRevM12: 8400 },
  { month: 'Apr', size: 480, m1: 82.1, m2: 71.0, cumulativeRevM12: 8600 },
  { month: 'May', size: 600, m1: 85.0, cumulativeRevM12: 8900 },
  { month: 'Jun', size: 650, m1: 0 } // new cohort
];

// Chennai Fresh Box Product Breakdown
const STANDARD_BOX_COHORTS: CohortRow[] = [
  { month: 'Jan', size: 200, m1: 84.0, m2: 72.0, m3: 58.5, m4: 56.0, m5: 55.0 },
  { month: 'Feb', size: 210, m1: 83.5, m2: 71.0, m3: 58.0, m4: 55.5 },
  { month: 'Mar', size: 240, m1: 85.0, m2: 74.0, m3: 61.0 },
  { month: 'Apr', size: 230, m1: 86.0, m2: 75.0 },
  { month: 'May', size: 270, m1: 88.0 }
];

const STARTER_TRIAL_COHORTS: CohortRow[] = [
  { month: 'Jan', size: 200, m1: 72.0, m2: 48.0, m3: 34.0, m4: 28.0, m5: 25.0 },
  { month: 'Feb', size: 240, m1: 69.0, m2: 44.0, m3: 33.0, m4: 26.0 },
  { month: 'Mar', size: 280, m1: 74.0, m2: 52.0, m3: 38.0 },
  { month: 'Apr', size: 250, m1: 76.0, m2: 55.0 },
  { month: 'May', size: 330, m1: 78.0 }
];

export function CohortRetentionSimulator() {
  const [datasetView, setDatasetView] = useState<'blended' | 'standard' | 'starter'>('blended');
  const [readingMode, setReadingMode] = useState<'all' | 'column' | 'row' | 'diagonal'>('all');
  const [selectedColumn, setSelectedColumn] = useState<number>(2); // M2
  const [selectedRow, setSelectedRow] = useState<number>(0); // Jan

  // Unit Economics Calculator (from Page 28 Example 3)
  const [userCAC, setUserCAC] = useState<number>(1500); // ₹1,500
  const [grossMarginPct, setGrossMarginPct] = useState<number>(30); // 30%
  const [cumulativeSpendM12, setCumulativeSpendM12] = useState<number>(8100); // ₹8,100

  const activeData = useMemo(() => {
    if (datasetView === 'standard') return STANDARD_BOX_COHORTS;
    if (datasetView === 'starter') return STARTER_TRIAL_COHORTS;
    return BLENDED_COHORTS;
  }, [datasetView]);

  // Economics calculations
  const unitEconomics = useMemo(() => {
    const grossMarginLTV = Math.round(cumulativeSpendM12 * (grossMarginPct / 100));
    const ltvCacRatio = (grossMarginLTV / userCAC).toFixed(2);
    const isHealthy = parseFloat(ltvCacRatio) >= 1.5;

    return { grossMarginLTV, ltvCacRatio, isHealthy };
  }, [cumulativeSpendM12, grossMarginPct, userCAC]);

  // Heatmap background color generator
  const getCellBg = (val?: number) => {
    if (val === undefined || val === 0) return 'bg-slate-50 text-slate-300';
    if (val >= 80) return 'bg-emerald-600 text-white font-bold';
    if (val >= 70) return 'bg-emerald-500 text-white font-semibold';
    if (val >= 60) return 'bg-emerald-200 text-emerald-950 font-medium';
    if (val >= 50) return 'bg-amber-100 text-amber-950';
    if (val >= 35) return 'bg-rose-100 text-rose-950';
    return 'bg-rose-200 text-rose-950 font-bold';
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-violet-700 uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            <span>Pillar 10 · Behavioral Retention Analytics Studio</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Cohort Retention Triangle & LTV Engine
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Analyze customer vintages down columns, across rows, and along diagonals. Inspect Chennai Fresh Box’s product split.
          </p>
        </div>

        {/* Dataset Segment Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold shrink-0">
          <button
            onClick={() => setDatasetView('blended')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              datasetView === 'blended' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Blended Total
          </button>
          <button
            onClick={() => setDatasetView('standard')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              datasetView === 'standard' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Standard Box (58% M3)
          </button>
          <button
            onClick={() => setDatasetView('starter')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              datasetView === 'starter' ? 'bg-rose-600 text-white shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Starter Trial Box (34% M3)
          </button>
        </div>
      </div>

      {/* Guide Reading Mode Selector */}
      <div className="p-3 bg-violet-50/60 border border-violet-200 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-violet-700" />
          <span className="font-bold text-violet-950">How to Read the Triangle (Sundaresh Kamaraj's 3 Views):</span>
        </div>
        <div className="flex items-center gap-1.5 text-3xs font-bold">
          <button
            onClick={() => setReadingMode('all')}
            className={`px-2.5 py-1 rounded-lg ${readingMode === 'all' ? 'bg-violet-900 text-white' : 'bg-white text-violet-900 border'}`}
          >
            Full Heatmap
          </button>
          <button
            onClick={() => setReadingMode('column')}
            className={`px-2.5 py-1 rounded-lg ${readingMode === 'column' ? 'bg-violet-900 text-white' : 'bg-white text-violet-900 border'}`}
          >
            Down Columns (Compare Same Age)
          </button>
          <button
            onClick={() => setReadingMode('row')}
            className={`px-2.5 py-1 rounded-lg ${readingMode === 'row' ? 'bg-violet-900 text-white' : 'bg-white text-violet-900 border'}`}
          >
            Across Rows (Decay Curve)
          </button>
          <button
            onClick={() => setReadingMode('diagonal')}
            className={`px-2.5 py-1 rounded-lg ${readingMode === 'diagonal' ? 'bg-violet-900 text-white' : 'bg-white text-violet-900 border'}`}
          >
            Along Diagonals (Calendar Shocks)
          </button>
        </div>
      </div>

      {/* Main Cohort Triangle Heatmap */}
      <div className="overflow-x-auto border border-slate-200 rounded-xl">
        <table className="w-full text-center text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-3xs font-extrabold text-slate-500 uppercase tracking-wider">
              <th className="py-2.5 px-3 text-left">Cohort</th>
              <th className="py-2.5 px-3">Size (M0)</th>
              <th className={`py-2.5 px-3 ${readingMode === 'column' && selectedColumn === 1 ? 'bg-violet-100 text-violet-900 font-black' : ''}`}>M1</th>
              <th className={`py-2.5 px-3 ${readingMode === 'column' && selectedColumn === 2 ? 'bg-violet-100 text-violet-900 font-black' : ''}`}>M2</th>
              <th className={`py-2.5 px-3 ${readingMode === 'column' && selectedColumn === 3 ? 'bg-violet-100 text-violet-900 font-black' : ''}`}>M3</th>
              <th className={`py-2.5 px-3 ${readingMode === 'column' && selectedColumn === 4 ? 'bg-violet-100 text-violet-900 font-black' : ''}`}>M4</th>
              <th className={`py-2.5 px-3 ${readingMode === 'column' && selectedColumn === 5 ? 'bg-violet-100 text-violet-900 font-black' : ''}`}>M5</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-3xs font-mono">
            {activeData.map((row, rIdx) => {
              const isSelectedRow = readingMode === 'row' && selectedRow === rIdx;
              return (
                <tr key={row.month} className={isSelectedRow ? 'ring-2 ring-violet-600 bg-violet-50/50' : 'hover:bg-slate-50'}>
                  <td className="py-2 px-3 text-left font-bold text-slate-900 font-sans">{row.month}</td>
                  <td className="py-2 px-3 font-semibold text-slate-700 font-sans">{row.size}</td>

                  {/* M1 */}
                  <td className={`py-2 px-3 ${getCellBg(row.m1)} ${readingMode === 'diagonal' && rIdx === 0 ? 'ring-2 ring-amber-500' : ''}`}>
                    {row.m1 !== undefined && row.m1 > 0 ? `${row.m1.toFixed(1)}%` : '—'}
                  </td>

                  {/* M2 */}
                  <td className={`py-2 px-3 ${getCellBg(row.m2)} ${readingMode === 'diagonal' && rIdx === 1 ? 'ring-2 ring-amber-500' : ''}`}>
                    {row.m2 !== undefined ? `${row.m2.toFixed(1)}%` : '—'}
                  </td>

                  {/* M3 */}
                  <td className={`py-2 px-3 ${getCellBg(row.m3)} ${readingMode === 'diagonal' && rIdx === 2 ? 'ring-2 ring-amber-500' : ''}`}>
                    {row.m3 !== undefined ? `${row.m3.toFixed(1)}%` : '—'}
                  </td>

                  {/* M4 */}
                  <td className={`py-2 px-3 ${getCellBg(row.m4)} ${readingMode === 'diagonal' && rIdx === 3 ? 'ring-2 ring-amber-500' : ''}`}>
                    {row.m4 !== undefined ? `${row.m4.toFixed(1)}%` : '—'}
                  </td>

                  {/* M5 */}
                  <td className={`py-2 px-3 ${getCellBg(row.m5)}`}>
                    {row.m5 !== undefined ? `${row.m5.toFixed(1)}%` : '—'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Dynamic Interpretation Box based on Reading Mode */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
        <div className="flex items-center gap-2 font-bold text-slate-900">
          <Activity className="w-4 h-4 text-violet-700" />
          <span>Analytical Interpretation & Guide Findings</span>
        </div>
        {datasetView === 'starter' ? (
          <p className="text-rose-900 leading-relaxed">
            <strong>Chennai Fresh Box Discovery:</strong> Starter Box subscribers collapse to 34% by Month 3 (versus 58% for Standard Box). Customer exit interviews revealed the starter box was too small to replace trips to the local vegetable mandi, so the habit never formed. Redesigning it as a 2-week trial that automatically converts saved the business.
          </p>
        ) : readingMode === 'column' ? (
          <p className="text-slate-700 leading-relaxed">
            <strong>Reading Down the Columns:</strong> Notice that Month-1 retention climbed from 76–78% (Jan–Feb) to 81–85% (Mar–May). Month-2 retention rose from 63% to 71%. Comparing cohorts at the identical age isolates whether your recent onboarding and product fixes actually worked.
          </p>
        ) : readingMode === 'row' ? (
          <p className="text-slate-700 leading-relaxed">
            <strong>Reading Across Rows:</strong> Tracking the January cohort across its life reveals that after dropping during the first 3 months, it flattens into a stable line around 51–54%. A flattening retention curve proves you have a loyal core customer base.
          </p>
        ) : readingMode === 'diagonal' ? (
          <p className="text-slate-700 leading-relaxed">
            <strong>Reading Along Diagonals:</strong> A diagonal line captures one single calendar month across all cohorts. If every cohort dips simultaneously on the same diagonal, an external macro event occurred (e.g. server outage, festival shutdown, or price hike).
          </p>
        ) : (
          <p className="text-slate-700 leading-relaxed">
            <strong>Blended Cohort Health:</strong> The weighted average Month-1 retention is 80.8% and Month-3 is 59.2%. Newer cohorts show upward momentum due to improved customer onboarding calls.
          </p>
        )}
      </div>

      {/* Cumulative Revenue Cohort & LTV:CAC Payback Engine */}
      <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-700" />
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Cumulative Revenue Cohort & LTV-to-CAC Calculator (Example 3 from Guide)
            </h4>
          </div>
          <span className={`text-3xs font-extrabold uppercase px-2 py-0.5 rounded border ${
            unitEconomics.isHealthy ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-amber-50 text-amber-800 border-amber-300'
          }`}>
            LTV:CAC = {unitEconomics.ltvCacRatio}x {unitEconomics.isHealthy ? '(Viable Unit Economics)' : '(Sub-Scale)'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="space-y-1.5">
            <span className="text-3xs font-bold text-slate-500 uppercase">Customer Acquisition Cost (CAC)</span>
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-base font-extrabold text-slate-900">₹{userCAC}</span>
              <span className="text-3xs text-slate-400">per acquired user</span>
            </div>
            <input
              type="range"
              min="500"
              max="4000"
              step="100"
              value={userCAC}
              onChange={(e) => setUserCAC(parseInt(e.target.value))}
              className="w-full accent-violet-700"
            />
          </div>

          <div className="space-y-1.5">
            <span className="text-3xs font-bold text-slate-500 uppercase">Gross Profit Margin %</span>
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-base font-extrabold text-slate-900">{grossMarginPct}%</span>
              <span className="text-3xs text-slate-400">contribution margin</span>
            </div>
            <input
              type="range"
              min="15"
              max="70"
              step="5"
              value={grossMarginPct}
              onChange={(e) => setGrossMarginPct(parseInt(e.target.value))}
              className="w-full accent-violet-700"
            />
          </div>

          <div className="space-y-1.5">
            <span className="text-3xs font-bold text-slate-500 uppercase">12-Month Cumulative Spend</span>
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-base font-extrabold text-slate-900">₹{cumulativeSpendM12}</span>
              <span className="text-3xs text-slate-400">revenue cohort total</span>
            </div>
            <input
              type="range"
              min="3000"
              max="15000"
              step="500"
              value={cumulativeSpendM12}
              onChange={(e) => setCumulativeSpendM12(parseInt(e.target.value))}
              className="w-full accent-violet-700"
            />
          </div>
        </div>

        <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-lg text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <span className="font-bold text-emerald-950 block">Calculated 12-Month Margin LTV: ₹{unitEconomics.grossMarginLTV}</span>
            <span className="text-3xs text-emerald-800">
              ₹{cumulativeSpendM12} revenue × {grossMarginPct}% gross margin = ₹{unitEconomics.grossMarginLTV} net lifetime value.
            </span>
          </div>
          <div className="text-3xs text-slate-600 bg-white p-2 rounded border border-emerald-100 shrink-0">
            Payback Window: <strong>Month 6 to Month 10</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
