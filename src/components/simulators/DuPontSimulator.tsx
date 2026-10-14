import { useState } from 'react';
import { DollarSign, TrendingUp, CheckCircle2, RotateCcw, Sliders, ShieldCheck, Scale, Zap, BarChart3, Layers } from 'lucide-react';

export function DuPontSimulator() {
  const [modelType, setModelType] = useState<'3stage' | '5stage'>('3stage');

  // Baseline Financials
  const [salesRevenue, setSalesRevenue] = useState<number>(110000000); // $110M
  const [operatingEBIT, setOperatingEBIT] = useState<number>(14000000); // $14M
  const [interestExpense, setInterestExpense] = useState<number>(2000000); // $2M
  const [taxRatePct, setTaxRatePct] = useState<number>(25); // 25%
  const [totalAssets, setTotalAssets] = useState<number>(88000000); // $88M
  const [shareholdersEquity, setShareholdersEquity] = useState<number>(44000000); // $44M

  // Calculations
  const ebt = Math.max(0, operatingEBIT - interestExpense);
  const taxes = ebt * (taxRatePct / 100);
  const netIncome = ebt - taxes;

  // 3-Stage Components
  const netProfitMarginPct = salesRevenue > 0 ? (netIncome / salesRevenue) * 100 : 0;
  const assetTurnover = totalAssets > 0 ? (salesRevenue / totalAssets) : 0;
  const equityMultiplier = shareholdersEquity > 0 ? (totalAssets / shareholdersEquity) : 0;
  const roe3Stage = (netProfitMarginPct / 100) * assetTurnover * equityMultiplier * 100;

  // 5-Stage Components
  const taxBurden = ebt > 0 ? netIncome / ebt : 1;
  const interestBurden = operatingEBIT > 0 ? ebt / operatingEBIT : 1;
  const operatingEBITMarginPct = salesRevenue > 0 ? (operatingEBIT / salesRevenue) * 100 : 0;
  const roe5Stage = taxBurden * interestBurden * (operatingEBITMarginPct / 100) * assetTurnover * equityMultiplier * 100;

  // Industry Presets
  const handleLoadZenithAerospaceCase = () => {
    setSalesRevenue(110000000);
    setOperatingEBIT(14000000);
    setInterestExpense(1500000);
    setTaxRatePct(25);
    setTotalAssets(88000000);
    setShareholdersEquity(44000000);
  };

  const handleLoadTechSaaS = () => {
    setSalesRevenue(80000000);
    setOperatingEBIT(22000000);
    setInterestExpense(400000);
    setTaxRatePct(21);
    setTotalAssets(45000000);
    setShareholdersEquity(35000000);
  };

  const handleLoadRetailGrocery = () => {
    setSalesRevenue(250000000);
    setOperatingEBIT(7500000);
    setInterestExpense(1200000);
    setTaxRatePct(24);
    setTotalAssets(70000000);
    setShareholdersEquity(28000000);
  };

  const handleLoadCommercialBank = () => {
    setSalesRevenue(65000000);
    setOperatingEBIT(18000000);
    setInterestExpense(4000000);
    setTaxRatePct(22);
    setTotalAssets(240000000);
    setShareholdersEquity(24000000); // 10x leverage
  };

  const handleReset = () => {
    setSalesRevenue(110000000);
    setOperatingEBIT(14000000);
    setInterestExpense(2000000);
    setTaxRatePct(25);
    setTotalAssets(88000000);
    setShareholdersEquity(44000000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-1">
            <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 rounded-md">Financial & Performance Pillar</span>
            <span>·</span>
            <span>Tool 5 of 6</span>
            <span>·</span>
            <span>Shareholder Value Decomposition</span>
          </div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">
            DuPont Analysis (3-Stage & 5-Stage ROE Model)
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Deconstruct Return on Equity into Operating Efficiency (Net Margin), Asset Velocity (Asset Turnover), and Financial Leverage (Equity Multiplier) to detect genuine excellence vs masked debt.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={handleLoadZenithAerospaceCase}
            className="px-3 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            Zenith Precision Case
          </button>
          <button
            onClick={handleLoadTechSaaS}
            className="px-3 py-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors"
          >
            Tech SaaS Preset
          </button>
          <button
            onClick={handleLoadRetailGrocery}
            className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Retail Grocery Preset
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg border border-slate-200"
            title="Reset to defaults"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Model Selection Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setModelType('3stage')}
          className={`px-4 py-2 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            modelType === '3stage'
              ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          Classic 3-Stage DuPont Model
        </button>
        <button
          onClick={() => setModelType('5stage')}
          className={`px-4 py-2 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            modelType === '5stage'
              ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Forensic 5-Stage DuPont Model (Tax & Interest Isolation)
        </button>
      </div>

      {/* Primary ROE KPI Card */}
      <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider block">Corporate Shareholder Return</span>
            <div className="text-3xl font-black text-slate-900 mt-0.5">
              ROE: {roe3Stage.toFixed(2)}%
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg">
              Net Income: ${(netIncome / 1000000).toFixed(2)}M
            </span>
            <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg">
              Equity Base: ${(shareholdersEquity / 1000000).toFixed(1)}M
            </span>
          </div>
        </div>

        {/* 3-Stage Equation Cards */}
        {modelType === '3stage' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            {/* Net Margin */}
            <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl">
              <span className="text-2xs font-bold text-emerald-800 uppercase block mb-1">
                Pillar 1: Operating Efficiency
              </span>
              <div className="text-2xl font-black text-emerald-900">
                {netProfitMarginPct.toFixed(2)}%
              </div>
              <span className="text-2xs font-semibold text-emerald-700 block mt-1">
                Net Profit Margin (NI ÷ Sales)
              </span>
              <p className="text-2xs text-slate-500 mt-1">Pricing power, gross margin & cost control</p>
            </div>

            {/* Asset Turnover */}
            <div className="p-4 bg-indigo-50/60 border border-indigo-200 rounded-xl">
              <span className="text-2xs font-bold text-indigo-800 uppercase block mb-1">
                Pillar 2: Asset Productivity
              </span>
              <div className="text-2xl font-black text-indigo-900">
                {assetTurnover.toFixed(2)}x
              </div>
              <span className="text-2xs font-semibold text-indigo-700 block mt-1">
                Total Asset Turnover (Sales ÷ Assets)
              </span>
              <p className="text-2xs text-slate-500 mt-1">Capacity utilization & inventory velocity</p>
            </div>

            {/* Equity Multiplier */}
            <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl">
              <span className="text-2xs font-bold text-amber-800 uppercase block mb-1">
                Pillar 3: Financial Leverage
              </span>
              <div className="text-2xl font-black text-amber-900">
                {equityMultiplier.toFixed(2)}x
              </div>
              <span className="text-2xs font-semibold text-amber-700 block mt-1">
                Equity Multiplier (Assets ÷ Equity)
              </span>
              <p className="text-2xs text-slate-500 mt-1">Reliance on debt vs equity financing</p>
            </div>
          </div>
        ) : (
          /* 5-Stage Equation Cards */
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-2xs font-bold text-slate-500 uppercase block">Tax Burden</span>
              <div className="text-xl font-black text-slate-800 mt-1">{(taxBurden * 100).toFixed(1)}%</div>
              <p className="text-2xs text-slate-400 mt-0.5">Net Income ÷ EBT</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-2xs font-bold text-slate-500 uppercase block">Interest Burden</span>
              <div className="text-xl font-black text-slate-800 mt-1">{(interestBurden * 100).toFixed(1)}%</div>
              <p className="text-2xs text-slate-400 mt-0.5">EBT ÷ EBIT</p>
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
              <span className="text-2xs font-bold text-emerald-800 uppercase block">Operating Margin</span>
              <div className="text-xl font-black text-emerald-900 mt-1">{operatingEBITMarginPct.toFixed(1)}%</div>
              <p className="text-2xs text-emerald-700 mt-0.5">EBIT ÷ Sales</p>
            </div>
            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl">
              <span className="text-2xs font-bold text-indigo-800 uppercase block">Asset Turnover</span>
              <div className="text-xl font-black text-indigo-900 mt-1">{assetTurnover.toFixed(2)}x</div>
              <p className="text-2xs text-indigo-700 mt-0.5">Sales ÷ Assets</p>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
              <span className="text-2xs font-bold text-amber-800 uppercase block">Leverage Multiplier</span>
              <div className="text-xl font-black text-amber-900 mt-1">{equityMultiplier.toFixed(2)}x</div>
              <p className="text-2xs text-amber-700 mt-0.5">Assets ÷ Equity</p>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Financial Statement Sliders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* P&L & Balance Sheet Levers */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-600" />
            Financial Statement Levers
          </h4>

          {/* Sales Revenue */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Annual Sales Revenue:</span>
              <span className="font-bold text-slate-900">${(salesRevenue / 1000000).toFixed(1)}M</span>
            </div>
            <input
              type="range"
              min="20000000"
              max="300000000"
              step="5000000"
              value={salesRevenue}
              onChange={(e) => setSalesRevenue(Number(e.target.value))}
              className="w-full accent-slate-800 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Operating EBIT */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Operating Income (EBIT):</span>
              <span className="font-bold text-emerald-700">${(operatingEBIT / 1000000).toFixed(2)}M</span>
            </div>
            <input
              type="range"
              min="2000000"
              max="60000000"
              step="500000"
              value={operatingEBIT}
              onChange={(e) => setOperatingEBIT(Number(e.target.value))}
              className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Interest Expense */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Debt Interest Expense:</span>
              <span className="font-bold text-rose-600">${(interestExpense / 1000000).toFixed(2)}M</span>
            </div>
            <input
              type="range"
              min="0"
              max="15000000"
              step="250000"
              value={interestExpense}
              onChange={(e) => setInterestExpense(Number(e.target.value))}
              className="w-full accent-rose-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Total Assets */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Total Balance Sheet Assets:</span>
              <span className="font-bold text-indigo-700">${(totalAssets / 1000000).toFixed(1)}M</span>
            </div>
            <input
              type="range"
              min="20000000"
              max="300000000"
              step="4000000"
              value={totalAssets}
              onChange={(e) => setTotalAssets(Number(e.target.value))}
              className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Shareholders' Equity */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Shareholders’ Book Equity:</span>
              <span className="font-bold text-amber-700">${(shareholdersEquity / 1000000).toFixed(1)}M</span>
            </div>
            <input
              type="range"
              min="10000000"
              max={totalAssets}
              step="2000000"
              value={shareholdersEquity}
              onChange={(e) => setShareholdersEquity(Number(e.target.value))}
              className="w-full accent-amber-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Forensic DuPont Strategic Diagnostic */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <h4 className="text-sm font-bold text-slate-900 flex items-center justify-between">
            <span>Executive Health & Leverage Diagnostic</span>
            <span className="text-2xs font-bold text-slate-400">Board Governance</span>
          </h4>

          <div className="space-y-3">
            {/* Margin Health */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
              <div className="flex justify-between font-bold">
                <span className="text-slate-800">Operational Pricing Health (Net Margin):</span>
                <span className={netProfitMarginPct >= 8 ? 'text-emerald-700' : 'text-amber-700'}>
                  {netProfitMarginPct >= 8 ? 'Strong Pricing Power' : 'Commodity / Slim Margins'}
                </span>
              </div>
              <p className="text-2xs text-slate-500">
                Every $1.00 of sales converts into <strong>${(netProfitMarginPct / 100).toFixed(2)}</strong> of bottom-line net profit.
              </p>
            </div>

            {/* Asset Efficiency Health */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
              <div className="flex justify-between font-bold">
                <span className="text-slate-800">Asset Velocity Health (Turnover):</span>
                <span className={assetTurnover >= 1.2 ? 'text-emerald-700' : 'text-slate-600'}>
                  {assetTurnover >= 1.2 ? 'High Asset Utilization' : 'Capital-Intensive / Idle Plant'}
                </span>
              </div>
              <p className="text-2xs text-slate-500">
                The business generates <strong>${assetTurnover.toFixed(2)}</strong> of annual sales for every $1.00 of physical and working capital assets deployed.
              </p>
            </div>

            {/* Leverage Warning */}
            <div className={`p-3 border rounded-lg text-xs space-y-1 ${
              equityMultiplier > 3.0
                ? 'bg-rose-50 border-rose-200 text-rose-950'
                : 'bg-emerald-50 border-emerald-200 text-emerald-950'
            }`}>
              <div className="flex justify-between font-bold">
                <span>Financial Leverage Risk (Equity Multiplier):</span>
                <span>
                  {equityMultiplier > 3.0 ? 'High Debt Risk (Multiplier > 3x)' : 'Prudent Capital Structure'}
                </span>
              </div>
              <p className="text-2xs opacity-80">
                {equityMultiplier > 3.0 ? (
                  'WARNING: Your ROE is heavily propped up by debt leverage. If operating income falls, fixed interest will wipe out net profit.'
                ) : (
                  'Your ROE is supported by solid equity capitalization, protecting the firm during industry downturns.'
                )}
              </p>
            </div>
          </div>

          {/* Strategic Insight */}
          <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-2xs text-indigo-950 flex items-start gap-2">
            <Scale className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-indigo-900">DuPont Strategic Principle:</strong> A business with an 18% ROE achieved through 12% margins and 1.5x leverage is fundamentally stronger and safer than a competitor with an 18% ROE achieved through 3% margins and 6.0x debt leverage. Always inspect the engine beneath the ROE number.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
