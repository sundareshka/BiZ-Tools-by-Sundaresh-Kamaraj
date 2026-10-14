import { useState } from 'react';
import { DollarSign, TrendingUp, AlertTriangle, CheckCircle2, RotateCcw, Sliders, ShieldCheck, Scale, Zap, BarChart3 } from 'lucide-react';

export function BreakEvenSimulator() {
  const [activeTab, setActiveTab] = useState<'cvp' | 'stress' | 'multiproduct'>('cvp');

  // Single Product CVP State
  const [price, setPrice] = useState<number>(120);
  const [variableCost, setVariableCost] = useState<number>(45);
  const [fixedCosts, setFixedCosts] = useState<number>(150000);
  const [currentVolume, setCurrentVolume] = useState<number>(2800);
  const [targetProfit, setTargetProfit] = useState<number>(50000);

  // Calculated values
  const unitCM = Math.max(0.01, price - variableCost);
  const cmRatio = (unitCM / price) * 100;
  const breakEvenUnits = Math.ceil(fixedCosts / unitCM);
  const breakEvenRevenue = breakEvenUnits * price;
  const targetProfitUnits = Math.ceil((fixedCosts + targetProfit) / unitCM);
  const targetProfitRevenue = targetProfitUnits * price;

  const currentRevenue = currentVolume * price;
  const currentTotalVarCost = currentVolume * variableCost;
  const currentTotalCost = fixedCosts + currentTotalVarCost;
  const currentOperatingProfit = currentRevenue - currentTotalCost;

  const marginOfSafetyUnits = currentVolume - breakEvenUnits;
  const marginOfSafetyRevenue = marginOfSafetyUnits * price;
  const marginOfSafetyPercent = currentVolume > 0 ? (marginOfSafetyUnits / currentVolume) * 100 : 0;

  const totalCM = currentVolume * unitCM;
  const degreeOfOperatingLeverage = currentOperatingProfit > 0 ? (totalCM / currentOperatingProfit).toFixed(2) : 'N/A (Loss)';

  // Multi-Product State
  const [products, setProducts] = useState([
    { id: 'p1', name: 'Standard Line (High Volume)', price: 100, varCost: 60, mixPct: 60 },
    { id: 'p2', name: 'Premium Pro (Mid Volume)', price: 250, varCost: 120, mixPct: 30 },
    { id: 'p3', name: 'Enterprise Custom (Low Volume)', price: 600, varCost: 240, mixPct: 10 }
  ]);
  const [multiFixedCosts, setMultiFixedCosts] = useState<number>(240000);

  // Multi-Product Weighted CM Calculation
  const weightedUnitCM = products.reduce((acc, p) => acc + (p.price - p.varCost) * (p.mixPct / 100), 0);
  const weightedPrice = products.reduce((acc, p) => acc + p.price * (p.mixPct / 100), 0);
  const weightedCMRatio = weightedPrice > 0 ? (weightedUnitCM / weightedPrice) * 100 : 0;
  const multiBEPUnits = weightedUnitCM > 0 ? Math.ceil(multiFixedCosts / weightedUnitCM) : 0;
  const multiBEPRevenue = multiBEPUnits * weightedPrice;

  // Preset Handlers
  const handleLoadAuraCase = () => {
    setPrice(850);
    setVariableCost(380);
    setFixedCosts(310000);
    setCurrentVolume(950);
    setTargetProfit(120000);
  };

  const handleApplyAutomation = () => {
    setFixedCosts(prev => Math.round(prev * 1.45));
    setVariableCost(prev => Math.round(prev * 0.65));
  };

  const handleApplyInflation = () => {
    setVariableCost(prev => Math.round(prev * 1.2));
  };

  const handleApplyPriceWar = () => {
    setPrice(prev => Math.round(prev * 0.88));
  };

  const handleReset = () => {
    setPrice(120);
    setVariableCost(45);
    setFixedCosts(150000);
    setCurrentVolume(2800);
    setTargetProfit(50000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Strategy Context */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-1">
            <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 rounded-md">Financial & Performance Pillar</span>
            <span>·</span>
            <span>Tool 1 of 6</span>
            <span>·</span>
            <span>CVP & Profit Volatility</span>
          </div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">
            Break-Even & Cost-Volume-Profit (CVP) Analysis
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Model the exact sales volume needed to cover all operational fixed overhead, quantify your Margin of Safety buffer, and measure Degree of Operating Leverage (DOL).
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleLoadAuraCase}
            className="px-3 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            Load Aura Fitness Case
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

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('cvp')}
          className={`px-4 py-2 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'cvp'
              ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          Interactive CVP Engine
        </button>
        <button
          onClick={() => setActiveTab('stress')}
          className={`px-4 py-2 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'stress'
              ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          Scenario Stress Tests
        </button>
        <button
          onClick={() => setActiveTab('multiproduct')}
          className={`px-4 py-2 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'multiproduct'
              ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          Multi-Product Sales Mix
        </button>
      </div>

      {activeTab === 'cvp' && (
        <div className="space-y-6">
          {/* Executive KPI Scorecard */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
              <span className="text-2xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Break-Even Volume
              </span>
              <div className="text-2xl font-black text-slate-900">
                {breakEvenUnits.toLocaleString()} <span className="text-xs font-medium text-slate-500">units</span>
              </div>
              <p className="text-2xs text-slate-500 mt-1">
                ${breakEvenRevenue.toLocaleString()} in revenue
              </p>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
              <span className="text-2xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Unit Contribution Margin
              </span>
              <div className="text-2xl font-black text-emerald-600">
                ${unitCM.toFixed(2)}
              </div>
              <p className="text-2xs text-slate-500 mt-1">
                CM Ratio: {cmRatio.toFixed(1)}% of price
              </p>
            </div>

            <div className={`p-4 border rounded-xl shadow-xs ${
              marginOfSafetyPercent >= 20
                ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
                : marginOfSafetyPercent > 0
                ? 'bg-amber-50/50 border-amber-200 text-amber-900'
                : 'bg-rose-50/50 border-rose-200 text-rose-900'
            }`}>
              <span className="text-2xs font-bold uppercase tracking-wider block mb-1">
                Margin of Safety
              </span>
              <div className="text-2xl font-black">
                {marginOfSafetyPercent.toFixed(1)}%
              </div>
              <p className="text-2xs opacity-80 mt-1">
                {marginOfSafetyUnits >= 0 ? `+${marginOfSafetyUnits.toLocaleString()}` : marginOfSafetyUnits.toLocaleString()} units buffer
              </p>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
              <span className="text-2xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Operating Profit (EBIT)
              </span>
              <div className={`text-2xl font-black ${currentOperatingProfit >= 0 ? 'text-slate-900' : 'text-rose-600'}`}>
                ${currentOperatingProfit.toLocaleString()}
              </div>
              <p className="text-2xs text-slate-500 mt-1">
                DOL: {degreeOfOperatingLeverage}
              </p>
            </div>
          </div>

          {/* Interactive Sliders & Visual Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Control Panel */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-600" />
                CVP Cost & Price Levers
              </h4>

              {/* Selling Price */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Unit Selling Price:</span>
                  <span className="text-emerald-700 font-bold">${price}</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="1500"
                  step="5"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              {/* Variable Cost */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Unit Variable Cost:</span>
                  <span className="text-rose-600 font-bold">${variableCost}</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max={Math.max(10, price - 5)}
                  step="5"
                  value={variableCost}
                  onChange={(e) => setVariableCost(Number(e.target.value))}
                  className="w-full accent-rose-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              {/* Fixed Costs */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Total Monthly Fixed Overhead:</span>
                  <span className="text-slate-900 font-bold">${fixedCosts.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="1000000"
                  step="10000"
                  value={fixedCosts}
                  onChange={(e) => setFixedCosts(Number(e.target.value))}
                  className="w-full accent-slate-800 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              {/* Projected Sales Volume */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Projected Sales Volume:</span>
                  <span className="text-indigo-700 font-bold">{currentVolume.toLocaleString()} units</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="15000"
                  step="100"
                  value={currentVolume}
                  onChange={(e) => setCurrentVolume(Number(e.target.value))}
                  className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              {/* Target Profit Slider */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Target Desired Profit:</span>
                  <span className="text-emerald-700 font-bold">${targetProfit.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="500000"
                  step="5000"
                  value={targetProfit}
                  onChange={(e) => setTargetProfit(Number(e.target.value))}
                  className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
                <p className="text-2xs text-slate-500 mt-1">
                  Requires <strong>{targetProfitUnits.toLocaleString()} units</strong> (${targetProfitRevenue.toLocaleString()} revenue) to achieve target.
                </p>
              </div>
            </div>

            {/* Visual CVP Chart & Waterfall */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-5">
              <h4 className="text-sm font-bold text-slate-900 flex items-center justify-between">
                <span>Operational Cost Structure & Profit Zone</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                  currentOperatingProfit >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {currentOperatingProfit >= 0 ? 'Profitable Operating Zone' : 'Operating in Loss Zone'}
                </span>
              </h4>

              {/* Visual Proportion Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-2xs font-semibold text-slate-500">
                  <span>Revenue Breakdown at {currentVolume.toLocaleString()} Units (${currentRevenue.toLocaleString()})</span>
                  <span>{currentOperatingProfit >= 0 ? `Net Margin: ${((currentOperatingProfit / currentRevenue) * 100).toFixed(1)}%` : 'Negative Net Margin'}</span>
                </div>

                <div className="h-6 w-full bg-slate-100 rounded-lg overflow-hidden flex shadow-inner">
                  <div
                    style={{ width: `${Math.min(100, (fixedCosts / Math.max(1, currentRevenue)) * 100)}%` }}
                    className="bg-slate-700 h-full flex items-center justify-center text-2xs text-white font-bold"
                    title={`Fixed Overhead: $${fixedCosts.toLocaleString()}`}
                  >
                    Fixed ({((fixedCosts / currentRevenue) * 100).toFixed(0)}%)
                  </div>
                  <div
                    style={{ width: `${Math.min(100, (currentTotalVarCost / Math.max(1, currentRevenue)) * 100)}%` }}
                    className="bg-rose-400 h-full flex items-center justify-center text-2xs text-white font-bold"
                    title={`Variable Costs: $${currentTotalVarCost.toLocaleString()}`}
                  >
                    Var ({((currentTotalVarCost / currentRevenue) * 100).toFixed(0)}%)
                  </div>
                  {currentOperatingProfit > 0 && (
                    <div
                      style={{ width: `${((currentOperatingProfit / currentRevenue) * 100)}%` }}
                      className="bg-emerald-500 h-full flex items-center justify-center text-2xs text-white font-bold"
                      title={`Operating Profit: $${currentOperatingProfit.toLocaleString()}`}
                    >
                      Profit ({((currentOperatingProfit / currentRevenue) * 100).toFixed(0)}%)
                    </div>
                  )}
                </div>
              </div>

              {/* Comparative Volume Table */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                    <tr>
                      <th className="py-2 px-3 text-left">Volume Level</th>
                      <th className="py-2 px-3 text-right">Revenue</th>
                      <th className="py-2 px-3 text-right">Total Costs</th>
                      <th className="py-2 px-3 text-right">EBIT / (Loss)</th>
                      <th className="py-2 px-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50">
                      <td className="py-2 px-3 font-medium">50% of Current ({Math.round(currentVolume * 0.5)} units)</td>
                      <td className="py-2 px-3 text-right">${Math.round(currentVolume * 0.5 * price).toLocaleString()}</td>
                      <td className="py-2 px-3 text-right">${Math.round(fixedCosts + (currentVolume * 0.5 * variableCost)).toLocaleString()}</td>
                      <td className={`py-2 px-3 text-right font-bold ${
                        (currentVolume * 0.5 * price) - (fixedCosts + (currentVolume * 0.5 * variableCost)) >= 0 ? 'text-emerald-600' : 'text-rose-600'
                      }`}>
                        ${Math.round((currentVolume * 0.5 * price) - (fixedCosts + (currentVolume * 0.5 * variableCost))).toLocaleString()}
                      </td>
                      <td className="py-2 px-3 text-right">
                        <span className="px-1.5 py-0.5 bg-rose-50 text-rose-700 rounded text-2xs font-semibold">Downturn</span>
                      </td>
                    </tr>
                    <tr className="bg-emerald-50/70 font-semibold text-emerald-900">
                      <td className="py-2 px-3 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Break-Even Point ({breakEvenUnits.toLocaleString()} units)
                      </td>
                      <td className="py-2 px-3 text-right">${breakEvenRevenue.toLocaleString()}</td>
                      <td className="py-2 px-3 text-right">${breakEvenRevenue.toLocaleString()}</td>
                      <td className="py-2 px-3 text-right text-slate-900">$0</td>
                      <td className="py-2 px-3 text-right">
                        <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded text-2xs font-bold">Zero Profit</span>
                      </td>
                    </tr>
                    <tr className="bg-indigo-50/40 font-semibold">
                      <td className="py-2 px-3">Current Projected ({currentVolume.toLocaleString()} units)</td>
                      <td className="py-2 px-3 text-right">${currentRevenue.toLocaleString()}</td>
                      <td className="py-2 px-3 text-right">${currentTotalCost.toLocaleString()}</td>
                      <td className={`py-2 px-3 text-right font-bold ${currentOperatingProfit >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        ${currentOperatingProfit.toLocaleString()}
                      </td>
                      <td className="py-2 px-3 text-right">
                        <span className="px-1.5 py-0.5 bg-indigo-100 text-indigo-800 rounded text-2xs font-bold">Current Base</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-2 px-3 font-medium">Target Profit ({targetProfitUnits.toLocaleString()} units)</td>
                      <td className="py-2 px-3 text-right">${targetProfitRevenue.toLocaleString()}</td>
                      <td className="py-2 px-3 text-right">${(fixedCosts + (targetProfitUnits * variableCost)).toLocaleString()}</td>
                      <td className="py-2 px-3 text-right font-bold text-emerald-600">+${targetProfit.toLocaleString()}</td>
                      <td className="py-2 px-3 text-right">
                        <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 rounded text-2xs font-semibold">Target Goal</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Operating Leverage Callout */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-2xs text-slate-600 flex items-start gap-2">
                <Scale className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">Degree of Operating Leverage Insight:</strong> With a DOL of <strong>{degreeOfOperatingLeverage}</strong>, every 10% change in sales volume will amplify your operating profit (EBIT) by approximately <strong>{(Number(degreeOfOperatingLeverage) * 10).toFixed(0)}%</strong>. High fixed costs create explosive upside in growth, but steep downside risk during contractions.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'stress' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-slate-900">
              Executive Strategic Stress Tests (One-Click Scenarios)
            </h4>
            <p className="text-xs text-slate-500">
              Test how real-world shocks to your price elasticity, raw material inflation, and factory automation shift your break-even threshold and profitability.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 border border-rose-200 bg-rose-50/40 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-900">Scenario 1: Inflation Shock</span>
                  <span className="px-1.5 py-0.5 bg-rose-100 text-rose-800 rounded text-2xs font-bold">+20% Variable Cost</span>
                </div>
                <p className="text-2xs text-slate-600">
                  Supply chain disruption and component price inflation increase unit variable costs without immediate price relief.
                </p>
                <button
                  onClick={handleApplyInflation}
                  className="w-full py-1.5 text-xs font-bold text-rose-700 bg-white border border-rose-300 rounded-lg hover:bg-rose-50 transition-colors"
                >
                  Apply Inflation Shock
                </button>
              </div>

              <div className="p-4 border border-indigo-200 bg-indigo-50/40 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-900">Scenario 2: Capital Automation</span>
                  <span className="px-1.5 py-0.5 bg-indigo-100 text-indigo-800 rounded text-2xs font-bold">+45% Fixed / −35% Var</span>
                </div>
                <p className="text-2xs text-slate-600">
                  Investing in robotic manufacturing raises monthly depreciation overhead but slashes direct labor variable costs.
                </p>
                <button
                  onClick={handleApplyAutomation}
                  className="w-full py-1.5 text-xs font-bold text-indigo-700 bg-white border border-indigo-300 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  Apply Automation Capex
                </button>
              </div>

              <div className="p-4 border border-amber-200 bg-amber-50/40 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-900">Scenario 3: Price War</span>
                  <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded text-2xs font-bold">−12% Selling Price</span>
                </div>
                <p className="text-2xs text-slate-600">
                  An aggressive competitor enters the market discounting prices, forcing your commercial team to match discounts.
                </p>
                <button
                  onClick={handleApplyPriceWar}
                  className="w-full py-1.5 text-xs font-bold text-amber-800 bg-white border border-amber-300 rounded-lg hover:bg-amber-50 transition-colors"
                >
                  Apply Competitor Price Cut
                </button>
              </div>
            </div>

            {/* Current Scenario Result Preview */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 mt-4">
              <h5 className="text-xs font-bold text-slate-800">Current Resulting Impact:</h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block text-2xs">New Selling Price</span>
                  <span className="font-bold text-slate-900">${price}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-2xs">New Unit Variable Cost</span>
                  <span className="font-bold text-rose-600">${variableCost}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-2xs">New Break-Even Point</span>
                  <span className="font-bold text-indigo-700">{breakEvenUnits.toLocaleString()} units</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-2xs">New Operating Profit</span>
                  <span className={`font-bold ${currentOperatingProfit >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    ${currentOperatingProfit.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'multiproduct' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-5">
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Multi-Product Sales Mix & Composite Break-Even
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Multi-product companies cannot rely on a single unit margin. Calculate weighted contribution margin based on the percentage sales mix.
              </p>
            </div>

            {/* Product Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                  <tr>
                    <th className="py-2.5 px-3 text-left">Product Line</th>
                    <th className="py-2.5 px-3 text-right">Selling Price</th>
                    <th className="py-2.5 px-3 text-right">Variable Cost</th>
                    <th className="py-2.5 px-3 text-right">Unit CM</th>
                    <th className="py-2.5 px-3 text-right">CM Ratio</th>
                    <th className="py-2.5 px-3 text-right">Sales Mix %</th>
                    <th className="py-2.5 px-3 text-right">Weighted CM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {products.map((p, idx) => {
                    const pCM = p.price - p.varCost;
                    const pCMRatio = (pCM / p.price) * 100;
                    const pWCM = pCM * (p.mixPct / 100);
                    return (
                      <tr key={p.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-semibold text-slate-900">{p.name}</td>
                        <td className="py-2.5 px-3 text-right">${p.price}</td>
                        <td className="py-2.5 px-3 text-right text-rose-600">${p.varCost}</td>
                        <td className="py-2.5 px-3 text-right font-bold text-emerald-600">${pCM}</td>
                        <td className="py-2.5 px-3 text-right">{pCMRatio.toFixed(1)}%</td>
                        <td className="py-2.5 px-3 text-right">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={p.mixPct}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setProducts(prev => prev.map((item, i) => i === idx ? { ...item, mixPct: val } : item));
                            }}
                            className="w-16 px-1.5 py-0.5 text-right border border-slate-300 rounded font-bold"
                          />%
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold text-indigo-700">${pWCM.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                  <tr className="bg-slate-50 font-bold text-slate-900">
                    <td className="py-2.5 px-3">Total Composite Average</td>
                    <td className="py-2.5 px-3 text-right">${weightedPrice.toFixed(2)}</td>
                    <td className="py-2.5 px-3 text-right">—</td>
                    <td className="py-2.5 px-3 text-right text-emerald-700">${weightedUnitCM.toFixed(2)}</td>
                    <td className="py-2.5 px-3 text-right">{weightedCMRatio.toFixed(1)}%</td>
                    <td className="py-2.5 px-3 text-right">
                      {products.reduce((acc, p) => acc + p.mixPct, 0)}%
                    </td>
                    <td className="py-2.5 px-3 text-right text-indigo-800">${weightedUnitCM.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Composite Break Even Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-2xs font-bold text-slate-500 uppercase block mb-1">Company Fixed Overhead</span>
                <div className="text-xl font-black text-slate-900">${multiFixedCosts.toLocaleString()}</div>
                <input
                  type="range"
                  min="50000"
                  max="1000000"
                  step="20000"
                  value={multiFixedCosts}
                  onChange={(e) => setMultiFixedCosts(Number(e.target.value))}
                  className="w-full accent-slate-800 mt-2 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
                <span className="text-2xs font-bold text-indigo-800 uppercase block mb-1">Composite Break-Even Units</span>
                <div className="text-xl font-black text-indigo-900">{multiBEPUnits.toLocaleString()} units</div>
                <p className="text-2xs text-indigo-700 mt-1">Across all 3 product lines at current mix</p>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                <span className="text-2xs font-bold text-emerald-800 uppercase block mb-1">Composite Break-Even Revenue</span>
                <div className="text-xl font-black text-emerald-900">${Math.round(multiBEPRevenue).toLocaleString()}</div>
                <p className="text-2xs text-emerald-700 mt-1">Based on {weightedCMRatio.toFixed(1)}% weighted CM ratio</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
