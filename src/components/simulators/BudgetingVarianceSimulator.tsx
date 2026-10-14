import { useState } from 'react';
import { DollarSign, CheckCircle2, XCircle, AlertTriangle, RotateCcw, Sliders, Layers, ArrowRight, Zap, Filter, Scale } from 'lucide-react';

export function BudgetingVarianceSimulator() {
  const [activeTab, setActiveTab] = useState<'variance' | 'zbb'>('variance');

  // Operational Activity Drivers
  const [budgetedUnits, setBudgetedUnits] = useState<number>(10000);
  const [actualUnits, setActualUnits] = useState<number>(11200);

  // Standard Rates & Prices
  const [stdSellingPrice, setStdSellingPrice] = useState<number>(150);
  const [actualSellingPrice, setActualSellingPrice] = useState<number>(145);

  // Direct Material Parameters
  const [stdMaterialPerUnit, setStdMaterialPerUnit] = useState<number>(3.0); // 3 kg/unit
  const [actualMaterialPerUnit, setActualMaterialPerUnit] = useState<number>(3.4); // 3.4 kg/unit
  const [stdMaterialPrice, setStdMaterialPrice] = useState<number>(12); // $12/kg
  const [actualMaterialPrice, setActualMaterialPrice] = useState<number>(11); // $11/kg (purchased cheap)

  // Direct Labor Parameters
  const [stdLaborHoursPerUnit, setStdLaborHoursPerUnit] = useState<number>(1.5); // 1.5 hrs
  const [actualLaborHoursPerUnit, setActualLaborHoursPerUnit] = useState<number>(1.8); // 1.8 hrs (overtime/inefficiency)
  const [stdLaborRate, setStdLaborRate] = useState<number>(24); // $24/hr
  const [actualLaborRate, setActualLaborRate] = useState<number>(26); // $26/hr

  // Fixed Overhead
  const [budgetedFixedOverhead, setBudgetedFixedOverhead] = useState<number>(350000);
  const [actualFixedOverhead, setActualFixedOverhead] = useState<number>(390000);

  // Calculations
  // Total Material Used
  const actualTotalMaterialQty = actualUnits * actualMaterialPerUnit;
  const standardAllowedMaterialQty = actualUnits * stdMaterialPerUnit;

  // Material Variances
  const materialPriceVariance = (actualMaterialPrice - stdMaterialPrice) * actualTotalMaterialQty; // < 0 is Favorable
  const materialQuantityVariance = (actualTotalMaterialQty - standardAllowedMaterialQty) * stdMaterialPrice; // > 0 is Unfavorable
  const netMaterialVariance = materialPriceVariance + materialQuantityVariance;

  // Total Labor Hours
  const actualTotalLaborHours = actualUnits * actualLaborHoursPerUnit;
  const standardAllowedLaborHours = actualUnits * stdLaborHoursPerUnit;

  // Labor Variances
  const laborRateVariance = (actualLaborRate - stdLaborRate) * actualTotalLaborHours; // > 0 is Unfavorable
  const laborEfficiencyVariance = (actualTotalLaborHours - standardAllowedLaborHours) * stdLaborRate; // > 0 is Unfavorable
  const netLaborVariance = laborRateVariance + laborEfficiencyVariance;

  // Sales Variances
  const salesPriceVariance = (actualSellingPrice - stdSellingPrice) * actualUnits; // < 0 is Unfavorable
  const salesVolumeVariance = (actualUnits - budgetedUnits) * (stdSellingPrice - (stdMaterialPerUnit * stdMaterialPrice + stdLaborHoursPerUnit * stdLaborRate));

  // Fixed Overhead Spending Variance
  const fixedSpendingVariance = actualFixedOverhead - budgetedFixedOverhead; // > 0 is Unfavorable

  // Master Budget vs Flexed Budget vs Actuals
  const masterRevenue = budgetedUnits * stdSellingPrice;
  const masterVarCost = budgetedUnits * (stdMaterialPerUnit * stdMaterialPrice + stdLaborHoursPerUnit * stdLaborRate);
  const masterOperatingIncome = masterRevenue - masterVarCost - budgetedFixedOverhead;

  const flexedRevenue = actualUnits * stdSellingPrice;
  const flexedVarCost = actualUnits * (stdMaterialPerUnit * stdMaterialPrice + stdLaborHoursPerUnit * stdLaborRate);
  const flexedOperatingIncome = flexedRevenue - flexedVarCost - budgetedFixedOverhead;

  const actualRevenue = actualUnits * actualSellingPrice;
  const actualVarCost = (actualTotalMaterialQty * actualMaterialPrice) + (actualTotalLaborHours * actualLaborRate);
  const actualOperatingIncome = actualRevenue - actualVarCost - actualFixedOverhead;

  const totalVarianceFromMaster = actualOperatingIncome - masterOperatingIncome;

  // Zero-Based Budgeting (ZBB) State
  const [zbbItems, setZbbItems] = useState([
    { id: 'z1', department: 'Executive & Admin', line: 'Annual Executive Retreat & Luxury Hotel', requestedCost: 85000, priority: 'Low / Discretionary', justifiedStatus: 'Rejected', justifiedCost: 15000 },
    { id: 'z2', department: 'Sales & Marketing', line: 'Enterprise CRM Licenses & Data Intelligence', requestedCost: 140000, priority: 'Core Growth', justifiedStatus: 'Approved', justifiedCost: 120000 },
    { id: 'z3', department: 'Operations', line: 'Preventive Machine Maintenance Contracts', requestedCost: 210000, priority: 'Critical Baseline', justifiedStatus: 'Approved', justifiedCost: 210000 },
    { id: 'z4', department: 'IT & Cloud', line: 'Duplicate SaaS Cloud Observability Seats', requestedCost: 95000, priority: 'Redundant', justifiedStatus: 'Cut by 70%', justifiedCost: 28000 },
    { id: 'z5', department: 'Human Resources', line: 'External Agency Headhunting Retainers', requestedCost: 120000, priority: 'Medium', justifiedStatus: 'Modified', justifiedCost: 45000 }
  ]);

  const totalZBBRequested = zbbItems.reduce((acc, i) => acc + i.requestedCost, 0);
  const totalZBBApproved = zbbItems.reduce((acc, i) => acc + i.justifiedCost, 0);
  const zbbSavings = totalZBBRequested - totalZBBApproved;

  // Preset Handlers
  const handleLoadOmniPackCase = () => {
    setBudgetedUnits(10000);
    setActualUnits(10800);
    setStdSellingPrice(150);
    setActualSellingPrice(148);
    setStdMaterialPerUnit(3.0);
    setActualMaterialPerUnit(3.5);
    setStdMaterialPrice(12);
    setActualMaterialPrice(10.5); // purchased cheaper low-grade kraft paper
    setStdLaborHoursPerUnit(1.5);
    setActualLaborHoursPerUnit(1.85); // machine jams and rework
    setStdLaborRate(24);
    setActualLaborRate(26.5);
    setBudgetedFixedOverhead(350000);
    setActualFixedOverhead(410000);
  };

  const handleReset = () => {
    setBudgetedUnits(10000);
    setActualUnits(11200);
    setStdSellingPrice(150);
    setActualSellingPrice(145);
    setStdMaterialPerUnit(3.0);
    setActualMaterialPerUnit(3.4);
    setStdMaterialPrice(12);
    setActualMaterialPrice(11);
    setStdLaborHoursPerUnit(1.5);
    setActualLaborHoursPerUnit(1.8);
    setStdLaborRate(24);
    setActualLaborRate(26);
    setBudgetedFixedOverhead(350000);
    setActualFixedOverhead(390000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-1">
            <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 rounded-md">Financial & Performance Pillar</span>
            <span>·</span>
            <span>Tool 3 of 6</span>
            <span>·</span>
            <span>Operational Control & Variance Analysis</span>
          </div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">
            Budgeting & Variance Analysis (Zero-Based Budgeting)
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Isolate why actual profits diverge from budget. Decompose operational variances into Price vs Efficiency, compare Static vs Flexed budgets, and model Zero-Based Budgeting (ZBB).
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleLoadOmniPackCase}
            className="px-3 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            Load OmniPack EBITDA Leak Case
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

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('variance')}
          className={`px-4 py-2 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'variance'
              ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          Flexible Budget & Variance Decomposition
        </button>
        <button
          onClick={() => setActiveTab('zbb')}
          className={`px-4 py-2 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'zbb'
              ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Filter className="w-3.5 h-3.5" />
          Zero-Based Budgeting (ZBB) Decision Packages
        </button>
      </div>

      {activeTab === 'variance' && (
        <div className="space-y-6">
          {/* 3-Tier Budget Comparison Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
              <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Static Master Budget (Planned: {budgetedUnits.toLocaleString()} units)
              </span>
              <div className="text-2xl font-black text-slate-700">
                ${Math.round(masterOperatingIncome).toLocaleString()}
              </div>
              <p className="text-2xs text-slate-500 mt-1">
                Rev: ${masterRevenue.toLocaleString()} · Costs: ${(masterVarCost + budgetedFixedOverhead).toLocaleString()}
              </p>
            </div>

            <div className="p-4 bg-indigo-50/50 border border-indigo-200 rounded-xl shadow-xs">
              <span className="text-2xs font-bold text-indigo-700 uppercase tracking-wider block mb-1">
                Flexed Budget (Allowed for {actualUnits.toLocaleString()} units)
              </span>
              <div className="text-2xl font-black text-indigo-950">
                ${Math.round(flexedOperatingIncome).toLocaleString()}
              </div>
              <p className="text-2xs text-indigo-700 mt-1">
                What profit should have been at actual volume
              </p>
            </div>

            <div className={`p-4 border rounded-xl shadow-xs ${
              actualOperatingIncome >= flexedOperatingIncome
                ? 'bg-emerald-50/50 border-emerald-300 text-emerald-950'
                : 'bg-rose-50/50 border-rose-300 text-rose-950'
            }`}>
              <span className="text-2xs font-bold uppercase tracking-wider block mb-1">
                Actual Operating Result ({actualUnits.toLocaleString()} units)
              </span>
              <div className="text-2xl font-black">
                ${Math.round(actualOperatingIncome).toLocaleString()}
              </div>
              <p className="text-2xs opacity-80 mt-1">
                Variance vs Flexed: {actualOperatingIncome >= flexedOperatingIncome ? `+$${Math.round(actualOperatingIncome - flexedOperatingIncome).toLocaleString()} (F)` : `-$${Math.round(Math.abs(actualOperatingIncome - flexedOperatingIncome)).toLocaleString()} (U)`}
              </p>
            </div>
          </div>

          {/* Variance Breakdown Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Input Parameters */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-600" />
                Operational & Cost Inputs
              </h4>

              {/* Volume Slider */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Actual Production Volume:</span>
                  <span className="font-bold text-indigo-700">{actualUnits.toLocaleString()} units</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="15000"
                  step="200"
                  value={actualUnits}
                  onChange={(e) => setActualUnits(Number(e.target.value))}
                  className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
                <span className="text-2xs text-slate-500">Planned: {budgetedUnits.toLocaleString()} units</span>
              </div>

              {/* Material Usage & Price */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <span className="text-xs font-bold text-slate-800 block">Direct Materials (Purchasing vs Plant):</span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-2xs text-slate-500 block">Actual Qty/Unit (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={actualMaterialPerUnit}
                      onChange={(e) => setActualMaterialPerUnit(Number(e.target.value))}
                      className="w-full px-2 py-1 border border-slate-300 rounded font-bold"
                    />
                    <span className="text-2xs text-slate-400">Std: {stdMaterialPerUnit} kg</span>
                  </div>
                  <div>
                    <label className="text-2xs text-slate-500 block">Actual Price/kg ($)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={actualMaterialPrice}
                      onChange={(e) => setActualMaterialPrice(Number(e.target.value))}
                      className="w-full px-2 py-1 border border-slate-300 rounded font-bold"
                    />
                    <span className="text-2xs text-slate-400">Std: ${stdMaterialPrice}/kg</span>
                  </div>
                </div>
              </div>

              {/* Labor Hours & Rate */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <span className="text-xs font-bold text-slate-800 block">Direct Labor (Wages vs Efficiency):</span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-2xs text-slate-500 block">Actual Hrs/Unit</label>
                    <input
                      type="number"
                      step="0.1"
                      value={actualLaborHoursPerUnit}
                      onChange={(e) => setActualLaborHoursPerUnit(Number(e.target.value))}
                      className="w-full px-2 py-1 border border-slate-300 rounded font-bold"
                    />
                    <span className="text-2xs text-slate-400">Std: {stdLaborHoursPerUnit} hrs</span>
                  </div>
                  <div>
                    <label className="text-2xs text-slate-500 block">Actual Hourly Wage ($)</label>
                    <input
                      type="number"
                      step="1"
                      value={actualLaborRate}
                      onChange={(e) => setActualLaborRate(Number(e.target.value))}
                      className="w-full px-2 py-1 border border-slate-300 rounded font-bold"
                    />
                    <span className="text-2xs text-slate-400">Std: ${stdLaborRate}/hr</span>
                  </div>
                </div>
              </div>

              {/* Realized Selling Price */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Actual Net Selling Price:</span>
                  <span className="font-bold text-slate-900">${actualSellingPrice}</span>
                </div>
                <input
                  type="range"
                  min="110"
                  max="190"
                  step="1"
                  value={actualSellingPrice}
                  onChange={(e) => setActualSellingPrice(Number(e.target.value))}
                  className="w-full accent-slate-800 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
                <span className="text-2xs text-slate-500">Std Planned Price: ${stdSellingPrice}</span>
              </div>
            </div>

            {/* Detailed Variance Decomposition Table */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
              <h4 className="text-sm font-bold text-slate-900 flex items-center justify-between">
                <span>Operational Variance Root-Cause Decomposition</span>
                <span className="text-2xs font-bold text-slate-500">F = Favorable · U = Unfavorable</span>
              </h4>

              <div className="space-y-3">
                {/* Material Price Variance */}
                <div className="p-3.5 border rounded-lg bg-slate-50 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-800">Direct Material Price Variance</span>
                      <span className="text-2xs px-1.5 py-0.2 bg-slate-200 text-slate-700 rounded font-semibold">Purchasing Dept</span>
                    </div>
                    <p className="text-2xs text-slate-500 mt-0.5">
                      (Actual Price ${actualMaterialPrice} − Std Price ${stdMaterialPrice}) × {actualTotalMaterialQty.toLocaleString()} kg
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`text-base font-black ${materialPriceVariance <= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      ${Math.abs(Math.round(materialPriceVariance)).toLocaleString()} {materialPriceVariance <= 0 ? '(F)' : '(U)'}
                    </div>
                    <span className="text-2xs font-medium text-slate-400">
                      {materialPriceVariance <= 0 ? 'Purchased below budget' : 'Material price inflation'}
                    </span>
                  </div>
                </div>

                {/* Material Quantity / Usage Variance */}
                <div className="p-3.5 border rounded-lg bg-slate-50 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-800">Direct Material Usage / Efficiency Variance</span>
                      <span className="text-2xs px-1.5 py-0.2 bg-slate-200 text-slate-700 rounded font-semibold">Plant Operations</span>
                    </div>
                    <p className="text-2xs text-slate-500 mt-0.5">
                      ({actualTotalMaterialQty.toLocaleString()} kg used − {standardAllowedMaterialQty.toLocaleString()} kg allowed) × ${stdMaterialPrice}/kg
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`text-base font-black ${materialQuantityVariance <= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      ${Math.abs(Math.round(materialQuantityVariance)).toLocaleString()} {materialQuantityVariance <= 0 ? '(F)' : '(U)'}
                    </div>
                    <span className="text-2xs font-medium text-slate-400">
                      {materialQuantityVariance <= 0 ? 'Minimal factory scrap' : 'Excess scrap & waste'}
                    </span>
                  </div>
                </div>

                {/* Labor Rate Variance */}
                <div className="p-3.5 border rounded-lg bg-slate-50 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-800">Direct Labor Rate Variance</span>
                      <span className="text-2xs px-1.5 py-0.2 bg-slate-200 text-slate-700 rounded font-semibold">HR & Payroll</span>
                    </div>
                    <p className="text-2xs text-slate-500 mt-0.5">
                      (Actual Rate ${actualLaborRate} − Std Rate ${stdLaborRate}) × {actualTotalLaborHours.toLocaleString()} hrs
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`text-base font-black ${laborRateVariance <= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      ${Math.abs(Math.round(laborRateVariance)).toLocaleString()} {laborRateVariance <= 0 ? '(F)' : '(U)'}
                    </div>
                    <span className="text-2xs font-medium text-slate-400">
                      {laborRateVariance <= 0 ? 'Lower hourly pay' : 'Overtime rate premiums'}
                    </span>
                  </div>
                </div>

                {/* Labor Efficiency Variance */}
                <div className="p-3.5 border rounded-lg bg-slate-50 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-800">Direct Labor Efficiency Variance</span>
                      <span className="text-2xs px-1.5 py-0.2 bg-slate-200 text-slate-700 rounded font-semibold">Production Supervisors</span>
                    </div>
                    <p className="text-2xs text-slate-500 mt-0.5">
                      ({actualTotalLaborHours.toLocaleString()} hrs worked − {standardAllowedLaborHours.toLocaleString()} hrs allowed) × ${stdLaborRate}/hr
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`text-base font-black ${laborEfficiencyVariance <= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      ${Math.abs(Math.round(laborEfficiencyVariance)).toLocaleString()} {laborEfficiencyVariance <= 0 ? '(F)' : '(U)'}
                    </div>
                    <span className="text-2xs font-medium text-slate-400">
                      {laborEfficiencyVariance <= 0 ? 'High productivity' : 'Machine jams & slowdowns'}
                    </span>
                  </div>
                </div>

                {/* Sales Volume Variance */}
                <div className="p-3.5 border rounded-lg bg-indigo-50/40 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-indigo-900">Sales Volume Contribution Margin Variance</span>
                      <span className="text-2xs px-1.5 py-0.2 bg-indigo-100 text-indigo-800 rounded font-semibold">Commercial Sales Team</span>
                    </div>
                    <p className="text-2xs text-slate-500 mt-0.5">
                      ({actualUnits.toLocaleString()} units sold − {budgetedUnits.toLocaleString()} planned) × Std CM
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`text-base font-black ${salesVolumeVariance >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      ${Math.abs(Math.round(salesVolumeVariance)).toLocaleString()} {salesVolumeVariance >= 0 ? '(F)' : '(U)'}
                    </div>
                    <span className="text-2xs font-medium text-slate-400">
                      {salesVolumeVariance >= 0 ? 'Market expansion' : 'Volume shortfall'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Management Takeaway */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-2xs text-slate-600 flex items-start gap-2">
                <Scale className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">The Trade-Off Trap Warning:</strong> Notice how purchasing cheap raw materials generated a <strong>favorable price variance</strong>, but resulted in machine jams, excess scrap, and overtime that produced an even larger <strong>unfavorable efficiency variance</strong>. Always evaluate price and usage variances together.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'zbb' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Zero-Based Budgeting (ZBB) Decision Package Audit
                </h4>
                <p className="text-xs text-slate-500">
                  Reject historical baseline entitlement. Review each department line item from ground zero and assign justified funding based on strategic necessity.
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-bold shrink-0">
                <div className="text-slate-500">
                  Requested: <span className="text-slate-800 font-black">${totalZBBRequested.toLocaleString()}</span>
                </div>
                <div className="text-emerald-700">
                  Approved: <span className="font-black">${totalZBBApproved.toLocaleString()}</span>
                </div>
                <div className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg">
                  Unlocked Savings: ${zbbSavings.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Decision Package Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                  <tr>
                    <th className="py-2.5 px-3 text-left">Department</th>
                    <th className="py-2.5 px-3 text-left">Expense Item</th>
                    <th className="py-2.5 px-3 text-left">Priority</th>
                    <th className="py-2.5 px-3 text-right">Requested</th>
                    <th className="py-2.5 px-3 text-left">Audit Decision</th>
                    <th className="py-2.5 px-3 text-right">Approved Baseline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {zbbItems.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-semibold text-slate-900">{item.department}</td>
                      <td className="py-2.5 px-3">{item.line}</td>
                      <td className="py-2.5 px-3">
                        <span className={`px-1.5 py-0.5 rounded text-2xs font-semibold ${
                          item.priority.includes('Critical')
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.priority.includes('Core')
                            ? 'bg-indigo-100 text-indigo-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {item.priority}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-medium text-slate-500">
                        ${item.requestedCost.toLocaleString()}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="font-bold text-slate-800">{item.justifiedStatus}</span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <input
                          type="number"
                          step="1000"
                          value={item.justifiedCost}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setZbbItems(prev => prev.map((it, i) => i === idx ? { ...it, justifiedCost: val } : it));
                          }}
                          className="w-24 px-2 py-0.5 text-right border border-slate-300 rounded font-bold text-emerald-700"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-2xs text-slate-500">
              *Adjust approved cost figures directly in the table to model custom zero-based cost restructuring scenarios.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
