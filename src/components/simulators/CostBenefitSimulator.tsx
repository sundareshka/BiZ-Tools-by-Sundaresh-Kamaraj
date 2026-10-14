import { useState } from 'react';
import { DollarSign, TrendingUp, CheckCircle2, XCircle, AlertTriangle, RotateCcw, Sliders, Calendar, Zap, Scale, Layers } from 'lucide-react';

export function CostBenefitSimulator() {
  const [discountRate, setDiscountRate] = useState<number>(10); // 10% WACC
  const [initialInvestment, setInitialInvestment] = useState<number>(1200000); // $1.2M
  const [annualBenefit, setAnnualBenefit] = useState<number>(450000); // $450k/yr
  const [annualOpex, setAnnualOpex] = useState<number>(70000); // $70k/yr
  const [projectYears, setProjectYears] = useState<number>(5);

  // Multi-year manual adjustment overrides
  const [customCashFlows, setCustomCashFlows] = useState<number[]>([380000, 380000, 380000, 380000, 380000]);

  // Sync customCashFlows when annualBenefit or annualOpex changes
  const netAnnualCashFlow = annualBenefit - annualOpex;

  // Calculate NPV, Discounted Cash Flows, Payback
  const discountFactor = (year: number) => Math.pow(1 + discountRate / 100, year);

  let cumulativeNominal = -initialInvestment;
  let cumulativeDiscounted = -initialInvestment;
  let simplePaybackYear: number | null = null;
  let discountedPaybackYear: number | null = null;

  const cashFlowDetails = [];
  let totalPVInflows = 0;

  for (let t = 1; t <= projectYears; t++) {
    const cf = customCashFlows[t - 1] ?? netAnnualCashFlow;
    const pv = cf / discountFactor(t);
    totalPVInflows += pv;

    cumulativeNominal += cf;
    cumulativeDiscounted += pv;

    if (simplePaybackYear === null && cumulativeNominal >= 0) {
      const prevNominal = cumulativeNominal - cf;
      const fraction = -prevNominal / cf;
      simplePaybackYear = Number(((t - 1) + Math.max(0, fraction)).toFixed(1));
    }

    if (discountedPaybackYear === null && cumulativeDiscounted >= 0) {
      const prevDiscounted = cumulativeDiscounted - pv;
      const fraction = -prevDiscounted / pv;
      discountedPaybackYear = Number(((t - 1) + Math.max(0, fraction)).toFixed(1));
    }

    cashFlowDetails.push({
      year: t,
      inflow: annualBenefit,
      outflow: annualOpex,
      netCashFlow: cf,
      pv: pv,
      cumulativeNominal: cumulativeNominal,
      cumulativeDiscounted: cumulativeDiscounted
    });
  }

  const npv = totalPVInflows - initialInvestment;
  const bcr = initialInvestment > 0 ? (totalPVInflows / initialInvestment) : 0;

  // Approximate IRR using iterative search
  const calculateIRR = (): number => {
    let low = -0.5;
    let high = 1.0;
    for (let i = 0; i < 40; i++) {
      const mid = (low + high) / 2;
      let npvMid = -initialInvestment;
      for (let t = 1; t <= projectYears; t++) {
        const cf = customCashFlows[t - 1] ?? netAnnualCashFlow;
        npvMid += cf / Math.pow(1 + mid, t);
      }
      if (npvMid > 0) {
        low = mid;
      } else {
        high = mid;
      }
    }
    return Number(((low + high) / 2 * 100).toFixed(1));
  };

  const irr = calculateIRR();

  // Presets
  const handleLoadVanguardCase = () => {
    setDiscountRate(10.5);
    setInitialInvestment(3200000);
    setAnnualBenefit(1570000); // $880k scrap + $240k labor + $450k revenue
    setAnnualOpex(245000); // maintenance and training
    setProjectYears(5);
    setCustomCashFlows([1325000, 1325000, 1325000, 1325000, 1325000]);
  };

  const handleLoadRefurbishCase = () => {
    setDiscountRate(10.5);
    setInitialInvestment(700000);
    setAnnualBenefit(320000);
    setAnnualOpex(120000);
    setProjectYears(5);
    setCustomCashFlows([200000, 200000, 200000, 200000, 200000]);
  };

  const handleReset = () => {
    setDiscountRate(10);
    setInitialInvestment(1200000);
    setAnnualBenefit(450000);
    setAnnualOpex(70000);
    setProjectYears(5);
    setCustomCashFlows([380000, 380000, 380000, 380000, 380000]);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-1">
            <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 rounded-md">Financial & Performance Pillar</span>
            <span>·</span>
            <span>Tool 2 of 6</span>
            <span>·</span>
            <span>Capital Budgeting & DCF</span>
          </div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">
            Cost-Benefit Analysis (CBA) & Capital Budgeting
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Evaluate strategic Capex investments using Net Present Value (NPV), Internal Rate of Return (IRR), Benefit-Cost Ratio (BCR), and Discounted Payback.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleLoadVanguardCase}
            className="px-3 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            Vanguard Robotic Capex
          </button>
          <button
            onClick={handleLoadRefurbishCase}
            className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Refurbish Low-Capex
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg border border-slate-200"
            title="Reset to default"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Primary KPI Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* NPV */}
        <div className={`p-4 border rounded-xl shadow-xs ${
          npv > 0
            ? 'bg-emerald-50/60 border-emerald-300 text-emerald-950'
            : 'bg-rose-50/60 border-rose-300 text-rose-950'
        }`}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-2xs font-bold uppercase tracking-wider">Net Present Value (NPV)</span>
            {npv > 0 ? (
              <span className="p-1 bg-emerald-200 text-emerald-800 rounded-full"><CheckCircle2 className="w-3.5 h-3.5" /></span>
            ) : (
              <span className="p-1 bg-rose-200 text-rose-800 rounded-full"><XCircle className="w-3.5 h-3.5" /></span>
            )}
          </div>
          <div className="text-2xl font-black">
            {npv >= 0 ? `+$${Math.round(npv).toLocaleString()}` : `-$${Math.round(Math.abs(npv)).toLocaleString()}`}
          </div>
          <p className="text-2xs opacity-80 mt-1">
            {npv > 0 ? 'Creates shareholder value' : 'Destroys corporate value'}
          </p>
        </div>

        {/* IRR */}
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <span className="text-2xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Internal Rate of Return (IRR)
          </span>
          <div className={`text-2xl font-black ${irr >= discountRate ? 'text-emerald-600' : 'text-rose-600'}`}>
            {irr}%
          </div>
          <p className="text-2xs text-slate-500 mt-1">
            Hurdle Rate: {discountRate}% ({irr >= discountRate ? `+${(irr - discountRate).toFixed(1)}% spread` : 'Below Hurdle'})
          </p>
        </div>

        {/* BCR */}
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <span className="text-2xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Benefit-Cost Ratio (BCR)
          </span>
          <div className={`text-2xl font-black ${bcr >= 1.0 ? 'text-indigo-600' : 'text-rose-600'}`}>
            {bcr.toFixed(2)}x
          </div>
          <p className="text-2xs text-slate-500 mt-1">
            {bcr >= 1.0 ? `$${bcr.toFixed(2)} return per $1.00 cost` : 'Costs exceed benefits'}
          </p>
        </div>

        {/* Payback */}
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <span className="text-2xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Discounted Payback
          </span>
          <div className="text-2xl font-black text-slate-900">
            {discountedPaybackYear !== null ? `${discountedPaybackYear} yrs` : '> 5 yrs (No Payback)'}
          </div>
          <p className="text-2xs text-slate-500 mt-1">
            Simple Payback: {simplePaybackYear !== null ? `${simplePaybackYear} yrs` : 'None'}
          </p>
        </div>
      </div>

      {/* Main Controls & Cash Flow Waterfall */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders & Inputs */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-600" />
            Capital Expenditure Parameters
          </h4>

          {/* Initial Capex */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Year 0 Initial Investment:</span>
              <span className="text-rose-700 font-bold">${initialInvestment.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="100000"
              max="5000000"
              step="50000"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(Number(e.target.value))}
              className="w-full accent-rose-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Annual Benefits */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Annual Incremental Benefit / Inflow:</span>
              <span className="text-emerald-700 font-bold">${annualBenefit.toLocaleString()}/yr</span>
            </div>
            <input
              type="range"
              min="50000"
              max="2500000"
              step="25000"
              value={annualBenefit}
              onChange={(e) => {
                const val = Number(e.target.value);
                setAnnualBenefit(val);
                setCustomCashFlows(Array(projectYears).fill(val - annualOpex));
              }}
              className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
            <span className="text-2xs text-slate-500">Savings, scrap reduction, and new revenue</span>
          </div>

          {/* Annual Opex */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Annual Operational Maintenance & Opex:</span>
              <span className="text-slate-900 font-bold">${annualOpex.toLocaleString()}/yr</span>
            </div>
            <input
              type="range"
              min="10000"
              max="600000"
              step="10000"
              value={annualOpex}
              onChange={(e) => {
                const val = Number(e.target.value);
                setAnnualOpex(val);
                setCustomCashFlows(Array(projectYears).fill(annualBenefit - val));
              }}
              className="w-full accent-slate-700 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Cost of Capital / Discount Rate */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Discount Rate (WACC / Hurdle):</span>
              <span className="text-indigo-700 font-bold">{discountRate}%</span>
            </div>
            <input
              type="range"
              min="4"
              max="20"
              step="0.5"
              value={discountRate}
              onChange={(e) => setDiscountRate(Number(e.target.value))}
              className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
            <p className="text-2xs text-slate-500 mt-1">
              Reflects corporate cost of debt & equity plus risk premium.
            </p>
          </div>

          {/* Decision Verdict Box */}
          <div className={`p-4 rounded-xl border ${
            npv > 0 && irr >= discountRate
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-rose-50 border-rose-300 text-rose-950'
          }`}>
            <h5 className="text-xs font-bold uppercase tracking-wider mb-1">
              Executive Investment Committee Verdict
            </h5>
            <p className="text-xs font-medium">
              {npv > 0 && irr >= discountRate ? (
                <>
                  <strong className="text-emerald-800">RECOMMEND APPROVAL:</strong> This project yields an NPV of +${Math.round(npv).toLocaleString()} and generates an IRR of {irr}%, comfortably beating your {discountRate}% hurdle rate. Full capital recovery in {discountedPaybackYear} years discounted.
                </>
              ) : (
                <>
                  <strong className="text-rose-800">RECOMMEND REJECTION:</strong> This project destroys ${Math.round(Math.abs(npv)).toLocaleString()} in present value. Investing capital into this project will degrade corporate return on invested capital (ROIC).
                </>
              )}
            </p>
          </div>
        </div>

        {/* Multi-Year Cash Flow Waterfall Table */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <h4 className="text-sm font-bold text-slate-900 flex items-center justify-between">
            <span>5-Year Discounted Cash Flow (DCF) Waterfall</span>
            <span className="text-2xs font-bold text-slate-500">Discounted at {discountRate}% WACC</span>
          </h4>

          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                <tr>
                  <th className="py-2.5 px-3 text-left">Period</th>
                  <th className="py-2.5 px-3 text-right">Inflow ($)</th>
                  <th className="py-2.5 px-3 text-right">Opex ($)</th>
                  <th className="py-2.5 px-3 text-right">Net Cash Flow</th>
                  <th className="py-2.5 px-3 text-right">Present Value (PV)</th>
                  <th className="py-2.5 px-3 text-right">Cumulative DCF</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr className="bg-rose-50/50 font-semibold text-rose-900">
                  <td className="py-2.5 px-3">Year 0 (Capex)</td>
                  <td className="py-2.5 px-3 text-right">—</td>
                  <td className="py-2.5 px-3 text-right">—</td>
                  <td className="py-2.5 px-3 text-right text-rose-700">-${initialInvestment.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right text-rose-700">-${initialInvestment.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right text-rose-700">-${initialInvestment.toLocaleString()}</td>
                </tr>
                {cashFlowDetails.map((row) => (
                  <tr key={row.year} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">Year {row.year}</td>
                    <td className="py-2.5 px-3 text-right text-emerald-700">+${row.inflow.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right text-slate-500">-${row.outflow.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right font-semibold text-slate-900">+${row.netCashFlow.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-indigo-700">+${Math.round(row.pv).toLocaleString()}</td>
                    <td className={`py-2.5 px-3 text-right font-bold ${row.cumulativeDiscounted >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {row.cumulativeDiscounted >= 0 ? `+$${Math.round(row.cumulativeDiscounted).toLocaleString()}` : `-$${Math.round(Math.abs(row.cumulativeDiscounted)).toLocaleString()}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Key Insight Box */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-2xs text-slate-600 flex items-start gap-2">
            <Scale className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-800">The Time Value of Money Principle:</strong> In Year 5, receiving ${netAnnualCashFlow.toLocaleString()} is only worth <strong>${Math.round(netAnnualCashFlow / discountFactor(5)).toLocaleString()}</strong> in today&apos;s purchasing power under a {discountRate}% cost of capital. Simple payback treats every year identically, leading to severely flawed capital decisions.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
