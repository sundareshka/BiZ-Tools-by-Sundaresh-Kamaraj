import { useState } from 'react';
import { DollarSign, Clock, ShieldCheck, AlertTriangle, RotateCcw, Sliders, ArrowRight, Zap, TrendingUp, RefreshCw, Scale } from 'lucide-react';

export function WorkingCapitalSimulator() {
  // Baseline Operational Financials
  const [annualRevenue, setAnnualRevenue] = useState<number>(62000000); // $62M
  const [annualCOGS, setAnnualCOGS] = useState<number>(42000000); // $42M
  const [cashBalance, setCashBalance] = useState<number>(3500000);
  const [shortTermDebt, setShortTermDebt] = useState<number>(6000000); // $6M bank line

  // Working Capital Cycle Days
  const [dso, setDso] = useState<number>(68); // Days Sales Outstanding (Receivables)
  const [dio, setDio] = useState<number>(28); // Days Inventory Outstanding
  const [dpo, setDpo] = useState<number>(32); // Days Payables Outstanding (Suppliers)

  // Calculations
  const dailyRevenue = annualRevenue / 365;
  const dailyCOGS = annualCOGS / 365;

  const accountsReceivable = Math.round(dso * dailyRevenue);
  const inventory = Math.round(dio * dailyCOGS);
  const accountsPayable = Math.round(dpo * dailyCOGS);

  // Cash Conversion Cycle
  const ccc = dso + dio - dpo;

  // Working Capital Balances
  const currentAssets = cashBalance + accountsReceivable + inventory;
  const currentLiabilities = accountsPayable + shortTermDebt;
  const netWorkingCapital = currentAssets - currentLiabilities;
  const currentRatio = currentLiabilities > 0 ? (currentAssets / currentLiabilities).toFixed(2) : 'N/A';
  const quickRatio = currentLiabilities > 0 ? ((cashBalance + accountsReceivable) / currentLiabilities).toFixed(2) : 'N/A';

  // Working Capital Unlock Levers
  const [dsoReductionDays, setDsoReductionDays] = useState<number>(15);
  const [dioReductionDays, setDioReductionDays] = useState<number>(10);
  const [dpoExtensionDays, setDpoExtensionDays] = useState<number>(15);

  const cashUnlockedFromAR = Math.round(dsoReductionDays * dailyRevenue);
  const cashUnlockedFromInv = Math.round(dioReductionDays * dailyCOGS);
  const cashUnlockedFromAP = Math.round(dpoExtensionDays * dailyCOGS);
  const totalCashUnlocked = cashUnlockedFromAR + cashUnlockedFromInv + cashUnlockedFromAP;

  const newDso = Math.max(0, dso - dsoReductionDays);
  const newDio = Math.max(0, dio - dioReductionDays);
  const newDpo = dpo + dpoExtensionDays;
  const newCCC = newDso + newDio - newDpo;

  // Preset Handlers
  const handleLoadSolisCase = () => {
    setAnnualRevenue(62000000);
    setAnnualCOGS(44000000);
    setCashBalance(140000);
    setShortTermDebt(6000000);
    setDso(68);
    setDio(28);
    setDpo(32);
    setDsoReductionDays(27);
    setDioReductionDays(16);
    setDpoExtensionDays(22);
  };

  const handleLoadNegativeWorkingCapital = () => {
    setAnnualRevenue(120000000);
    setAnnualCOGS(85000000);
    setCashBalance(18000000);
    setShortTermDebt(0);
    setDso(4); // Credit card / instant consumer payments
    setDio(12); // High velocity JIT distribution
    setDpo(65); // Large supplier trade terms
    setDsoReductionDays(0);
    setDioReductionDays(0);
    setDpoExtensionDays(0);
  };

  const handleReset = () => {
    setAnnualRevenue(62000000);
    setAnnualCOGS(42000000);
    setCashBalance(3500000);
    setShortTermDebt(6000000);
    setDso(68);
    setDio(28);
    setDpo(32);
    setDsoReductionDays(15);
    setDioReductionDays(10);
    setDpoExtensionDays(15);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-1">
            <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 rounded-md">Financial & Performance Pillar</span>
            <span>·</span>
            <span>Tool 4 of 6</span>
            <span>·</span>
            <span>Liquidity & Balance Sheet Velocity</span>
          </div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">
            Working Capital Management & Cash Conversion Cycle (CCC)
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Track how many days cash remains trapped in operations (CCC = DSO + DIO − DPO) and simulate the exact millions unlocked by accelerating collections and lean inventory.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleLoadSolisCase}
            className="px-3 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            Solis Logistics Turnaround Case
          </button>
          <button
            onClick={handleLoadNegativeWorkingCapital}
            className="px-3 py-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors"
          >
            Negative Working Capital Model
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg border border-slate-200"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Cash Conversion Cycle */}
        <div className={`p-4 border rounded-xl shadow-xs ${
          ccc <= 15
            ? 'bg-emerald-50/60 border-emerald-300 text-emerald-950'
            : ccc <= 45
            ? 'bg-indigo-50/60 border-indigo-300 text-indigo-950'
            : 'bg-amber-50/60 border-amber-300 text-amber-950'
        }`}>
          <span className="text-2xs font-bold uppercase tracking-wider block mb-1">
            Cash Conversion Cycle (CCC)
          </span>
          <div className="text-2xl font-black">
            {ccc} <span className="text-xs font-medium">days</span>
          </div>
          <p className="text-2xs opacity-80 mt-1">
            {ccc < 0 ? 'Negative CCC: Funded by suppliers!' : ccc <= 30 ? 'Lean operational velocity' : 'Cash trapped in pipeline'}
          </p>
        </div>

        {/* Total Working Capital Trapped */}
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <span className="text-2xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Operating Net Working Capital
          </span>
          <div className="text-2xl font-black text-slate-900">
            ${Math.round(netWorkingCapital / 1000000).toFixed(1)}M
          </div>
          <p className="text-2xs text-slate-500 mt-1">
            A/R: ${(accountsReceivable / 1000000).toFixed(1)}M · Inv: ${(inventory / 1000000).toFixed(1)}M
          </p>
        </div>

        {/* Current & Quick Ratio */}
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <span className="text-2xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Liquidity Solvency Ratios
          </span>
          <div className="text-2xl font-black text-slate-900">
            {currentRatio}x <span className="text-xs font-normal text-slate-400">Current</span>
          </div>
          <p className="text-2xs text-slate-500 mt-1">
            Quick (Acid-Test): <strong>{quickRatio}x</strong> (Cash + A/R)
          </p>
        </div>

        {/* Cash Release Potential */}
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl shadow-xs text-emerald-950">
          <span className="text-2xs font-bold uppercase tracking-wider block mb-1 text-emerald-800">
            Simulated Cash Unlock
          </span>
          <div className="text-2xl font-black text-emerald-700">
            +${(totalCashUnlocked / 1000000).toFixed(2)}M
          </div>
          <p className="text-2xs text-emerald-800 mt-1">
            New CCC: <strong>{newCCC} days</strong> ({ccc - newCCC} days faster)
          </p>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Working Capital Drivers Sliders */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-5">
          <h4 className="text-sm font-bold text-slate-900 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" />
              Cash Cycle Timeline Components
            </span>
            <span className="text-2xs text-slate-400">Formula: DSO + DIO − DPO = CCC</span>
          </h4>

          {/* DSO */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-800">Days Sales Outstanding (DSO) — Customer Credit:</span>
              <span className="text-indigo-700 font-black">{dso} days (${(accountsReceivable / 1000000).toFixed(2)}M)</span>
            </div>
            <input
              type="range"
              min="5"
              max="120"
              step="1"
              value={dso}
              onChange={(e) => setDso(Number(e.target.value))}
              className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
            <p className="text-2xs text-slate-500">
              Average elapsed time to collect cash after invoice dispatch. Benchmark: &lt;45 days.
            </p>
          </div>

          {/* DIO */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-800">Days Inventory Outstanding (DIO) — Holding Lag:</span>
              <span className="text-amber-700 font-black">{dio} days (${(inventory / 1000000).toFixed(2)}M)</span>
            </div>
            <input
              type="range"
              min="3"
              max="120"
              step="1"
              value={dio}
              onChange={(e) => setDio(Number(e.target.value))}
              className="w-full accent-amber-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
            <p className="text-2xs text-slate-500">
              Average time stock sits in warehouses before conversion. Benchmark: &lt;30 days.
            </p>
          </div>

          {/* DPO */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-800">Days Payables Outstanding (DPO) — Trade Credit:</span>
              <span className="text-emerald-700 font-black">{dpo} days (${(accountsPayable / 1000000).toFixed(2)}M)</span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              step="1"
              value={dpo}
              onChange={(e) => setDpo(Number(e.target.value))}
              className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
            <p className="text-2xs text-slate-500">
              Average time taken to pay vendor bills. Higher DPO finances operations with supplier cash.
            </p>
          </div>

          {/* Visual Equation Bar */}
          <div className="p-3 bg-indigo-50/50 border border-indigo-200 rounded-xl text-xs flex items-center justify-between font-bold text-indigo-950">
            <div className="text-center">
              <span className="text-2xs text-indigo-700 font-medium block">DSO (Receivables)</span>
              +{dso} days
            </div>
            <span className="text-slate-400 font-black">+</span>
            <div className="text-center">
              <span className="text-2xs text-indigo-700 font-medium block">DIO (Inventory)</span>
              +{dio} days
            </div>
            <span className="text-slate-400 font-black">−</span>
            <div className="text-center">
              <span className="text-2xs text-indigo-700 font-medium block">DPO (Payables)</span>
              −{dpo} days
            </div>
            <span className="text-slate-400 font-black">=</span>
            <div className="text-center bg-white px-3 py-1 rounded-lg border border-indigo-200">
              <span className="text-2xs text-indigo-700 font-medium block">Net Cycle</span>
              {ccc} days
            </div>
          </div>
        </div>

        {/* Working Capital Cash Release Simulator */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-5">
          <h4 className="text-sm font-bold text-slate-900 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-600" />
              Cash Release Engine (Balance Sheet Unlocking)
            </span>
            <span className="text-2xs font-bold text-emerald-700">Self-Fund Scaling</span>
          </h4>

          <p className="text-xs text-slate-500">
            Simulate the exact dollar liquidity added to your corporate treasury by tightening collection procedures, adopting JIT inventory, and renegotiating vendor terms.
          </p>

          <div className="space-y-4">
            {/* Lever 1: A/R */}
            <div className="p-3 border border-slate-200 rounded-xl space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-800">Accelerate Customer Collections by:</span>
                <span className="text-emerald-700">+{cashUnlockedFromAR.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="40"
                  step="1"
                  value={dsoReductionDays}
                  onChange={(e) => setDsoReductionDays(Number(e.target.value))}
                  className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
                <span className="text-xs font-black text-slate-900 w-16 text-right">−{dsoReductionDays} days</span>
              </div>
            </div>

            {/* Lever 2: Inventory */}
            <div className="p-3 border border-slate-200 rounded-xl space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-800">Reduce Excess Inventory Buffers by:</span>
                <span className="text-emerald-700">+{cashUnlockedFromInv.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="30"
                  step="1"
                  value={dioReductionDays}
                  onChange={(e) => setDioReductionDays(Number(e.target.value))}
                  className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
                <span className="text-xs font-black text-slate-900 w-16 text-right">−{dioReductionDays} days</span>
              </div>
            </div>

            {/* Lever 3: Payables */}
            <div className="p-3 border border-slate-200 rounded-xl space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-800">Negotiate Extended Supplier Terms by:</span>
                <span className="text-emerald-700">+{cashUnlockedFromAP.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="35"
                  step="1"
                  value={dpoExtensionDays}
                  onChange={(e) => setDpoExtensionDays(Number(e.target.value))}
                  className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
                <span className="text-xs font-black text-slate-900 w-16 text-right">+{dpoExtensionDays} days</span>
              </div>
            </div>
          </div>

          {/* Total Resulting Liquidity Callout */}
          <div className="p-4 bg-emerald-50/70 border border-emerald-300 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                Total Cash Added Directly to Bank
              </span>
              <span className="text-xl font-black text-emerald-800">
                +${totalCashUnlocked.toLocaleString()}
              </span>
            </div>
            <p className="text-2xs text-emerald-800">
              By shrinking your operational cycle from <strong>{ccc} days</strong> down to <strong>{newCCC} days</strong>, you permanently extract <strong>${(totalCashUnlocked / 1000000).toFixed(2)} Million</strong> from working capital, eliminating the need to take on high-interest debt or dilute founders.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
