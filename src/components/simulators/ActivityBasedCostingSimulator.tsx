import { useState } from 'react';
import { DollarSign, Layers, CheckCircle2, XCircle, AlertTriangle, RotateCcw, Sliders, ArrowRight, Zap, Scale, BarChart3 } from 'lucide-react';

export function ActivityBasedCostingSimulator() {
  // Total Manufacturing Overhead Pool
  const [totalOverhead, setTotalOverhead] = useState<number>(10000000); // $10M

  // Product Volumes & Direct Costs
  const [prodAVolume, setProdAVolume] = useState<number>(20000); // High-volume Standard
  const [prodADirectCost, setProdADirectCost] = useState<number>(180); // Direct materials + direct labor
  const [prodAPrice, setProdAPrice] = useState<number>(360);

  const [prodBVolume, setProdBVolume] = useState<number>(200); // Low-volume Custom
  const [prodBDirectCost, setProdBDirectCost] = useState<number>(320);
  const [prodBPrice, setProdBPrice] = useState<number>(600);

  // Traditional Overhead Allocation Driver (Direct Labor Hours)
  const [prodALaborHours, setProdALaborHours] = useState<number>(2.0); // 2.0 hrs/unit
  const [prodBLaborHours, setProdBLaborHours] = useState<number>(3.0); // 3.0 hrs/unit

  const totalLaborHours = (prodAVolume * prodALaborHours) + (prodBVolume * prodBLaborHours);
  const traditionalOverheadRatePerHour = totalLaborHours > 0 ? (totalOverhead / totalLaborHours) : 0;

  const prodATraditionalOverhead = prodALaborHours * traditionalOverheadRatePerHour;
  const prodATraditionalTotalCost = prodADirectCost + prodATraditionalOverhead;
  const prodATraditionalMargin = prodAPrice - prodATraditionalTotalCost;
  const prodATraditionalMarginPct = (prodATraditionalMargin / prodAPrice) * 100;

  const prodBTraditionalOverhead = prodBLaborHours * traditionalOverheadRatePerHour;
  const prodBTraditionalTotalCost = prodBDirectCost + prodBTraditionalOverhead;
  const prodBTraditionalMargin = prodBPrice - prodBTraditionalTotalCost;
  const prodBTraditionalMarginPct = (prodBTraditionalMargin / prodBPrice) * 100;

  // ABC Activity Cost Pools
  const [setupPoolCost, setSetupPoolCost] = useState<number>(3500000); // Setups
  const [inspectionPoolCost, setInspectionPoolCost] = useState<number>(2500000); // Quality testing
  const [engineeringPoolCost, setEngineeringPoolCost] = useState<number>(2200000); // Engineering changes
  const [materialHandlingPoolCost, setMaterialHandlingPoolCost] = useState<number>(1800000); // Handling

  // Activity Consumption Drivers
  const [prodASetups, setProdASetups] = useState<number>(10);
  const [prodBSetups, setProdBSetups] = useState<number>(40);
  const totalSetups = prodASetups + prodBSetups;
  const setupRate = totalSetups > 0 ? setupPoolCost / totalSetups : 0;

  const [prodAInspections, setProdAInspections] = useState<number>(100); // hours
  const [prodBInspections, setProdBInspections] = useState<number>(400); // hours
  const totalInspections = prodAInspections + prodBInspections;
  const inspectionRate = totalInspections > 0 ? inspectionPoolCost / totalInspections : 0;

  const [prodAEngChanges, setProdAEngChanges] = useState<number>(5);
  const [prodBEngChanges, setProdBEngChanges] = useState<number>(45);
  const totalEngChanges = prodAEngChanges + prodBEngChanges;
  const engRate = totalEngChanges > 0 ? engineeringPoolCost / totalEngChanges : 0;

  const [prodAMoves, setProdAMoves] = useState<number>(400);
  const [prodBMoves, setProdBMoves] = useState<number>(200);
  const totalMoves = prodAMoves + prodBMoves;
  const moveRate = totalMoves > 0 ? materialHandlingPoolCost / totalMoves : 0;

  // ABC Allocated Overhead
  const prodAABCTotalOverhead = (prodASetups * setupRate) + (prodAInspections * inspectionRate) + (prodAEngChanges * engRate) + (prodAMoves * moveRate);
  const prodAABCOverheadPerUnit = prodAVolume > 0 ? prodAABCTotalOverhead / prodAVolume : 0;
  const prodAABCTotalCost = prodADirectCost + prodAABCOverheadPerUnit;
  const prodAABCMargin = prodAPrice - prodAABCTotalCost;
  const prodAABCMarginPct = (prodAABCMargin / prodAPrice) * 100;

  const prodBABCTotalOverhead = (prodBSetups * setupRate) + (prodBInspections * inspectionRate) + (prodBEngChanges * engRate) + (prodBMoves * moveRate);
  const prodBABCOverheadPerUnit = prodBVolume > 0 ? prodBABCTotalOverhead / prodBVolume : 0;
  const prodBABCTotalCost = prodBDirectCost + prodBABCOverheadPerUnit;
  const prodBABCMargin = prodBPrice - prodBABCTotalCost;
  const prodBABCMarginPct = (prodBABCMargin / prodBPrice) * 100;

  // Presets
  const handleLoadApexCase = () => {
    setProdAVolume(20000);
    setProdADirectCost(180);
    setProdAPrice(360);
    setProdBVolume(200);
    setProdBDirectCost(320);
    setProdBPrice(600);
    setProdALaborHours(2.0);
    setProdBLaborHours(2.5);
    setSetupPoolCost(3800000);
    setInspectionPoolCost(2400000);
    setEngineeringPoolCost(2200000);
    setMaterialHandlingPoolCost(1600000);
    setProdASetups(4);
    setProdBSetups(36);
    setProdAInspections(80);
    setProdBInspections(450);
    setProdAEngChanges(2);
    setProdBEngChanges(38);
    setProdAMoves(500);
    setProdBMoves(300);
  };

  const handleRepriceCustom = () => {
    setProdBPrice(1650); // charge true cost plus margin
    setProdAPrice(280); // lower standard line to win high-volume market share
  };

  const handleReset = () => {
    setProdAVolume(20000);
    setProdADirectCost(180);
    setProdAPrice(360);
    setProdBVolume(200);
    setProdBDirectCost(320);
    setProdBPrice(600);
    setProdALaborHours(2.0);
    setProdBLaborHours(3.0);
    setSetupPoolCost(3500000);
    setInspectionPoolCost(2500000);
    setEngineeringPoolCost(2200000);
    setMaterialHandlingPoolCost(1800000);
    setProdASetups(10);
    setProdBSetups(40);
    setProdAInspections(100);
    setProdBInspections(400);
    setProdAEngChanges(5);
    setProdBEngChanges(45);
    setProdAMoves(400);
    setProdBMoves(200);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-1">
            <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 rounded-md">Financial & Performance Pillar</span>
            <span>·</span>
            <span>Tool 6 of 6</span>
            <span>·</span>
            <span>Cost Pools & True Margins</span>
          </div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">
            Activity-Based Costing (ABC) & Margin Analysis
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Trace overhead through activity cost pools (setups, inspections, engineering changes) to expose hidden product cross-subsidies and correct dangerous mispricing.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleLoadApexCase}
            className="px-3 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            Load Apex Hydraulics Case
          </button>
          <button
            onClick={handleRepriceCustom}
            className="px-3 py-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors"
          >
            Apply Strategic Repricing
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

      {/* Side-by-Side Comparison: Traditional vs ABC */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product A: High Volume Standard */}
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-2xs font-bold text-emerald-700 uppercase tracking-wider block">High-Volume Standard Product</span>
              <h4 className="text-base font-black text-slate-900 mt-0.5">Product Line A ({prodAVolume.toLocaleString()} units)</h4>
            </div>
            <div className="text-right">
              <span className="text-2xs text-slate-400 block">Selling Price</span>
              <span className="text-lg font-black text-slate-900">${prodAPrice}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            {/* Traditional Accounting */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-2xs font-bold text-slate-500 uppercase block">Traditional View</span>
              <div className="text-xs text-slate-600">Unit Cost: <strong>${Math.round(prodATraditionalTotalCost)}</strong></div>
              <div className={`text-base font-black ${prodATraditionalMargin >= 0 ? 'text-slate-900' : 'text-rose-600'}`}>
                Margin: ${Math.round(prodATraditionalMargin)} ({prodATraditionalMarginPct.toFixed(1)}%)
              </div>
              <p className="text-2xs text-slate-400 mt-1">Over-allocated $ overhead</p>
            </div>

            {/* ABC True Cost */}
            <div className="p-3 bg-emerald-50/70 border border-emerald-300 rounded-xl space-y-1">
              <span className="text-2xs font-bold text-emerald-800 uppercase block">True ABC View</span>
              <div className="text-xs text-emerald-900">Unit Cost: <strong>${Math.round(prodAABCTotalCost)}</strong></div>
              <div className="text-base font-black text-emerald-700">
                True Margin: +${Math.round(prodAABCMargin)} ({prodAABCMarginPct.toFixed(1)}%)
              </div>
              <p className="text-2xs text-emerald-800 mt-1 font-semibold">Real Profit Engine!</p>
            </div>
          </div>

          <div className="p-3 bg-emerald-50/40 border border-emerald-200 rounded-lg text-2xs text-emerald-950">
            <strong>Strategic Reality:</strong> Product A consumes almost zero machine setups, changeovers, or quality testing relative to its volume. Traditional accounting artificially inflated its cost by <strong>${Math.round(prodATraditionalTotalCost - prodAABCTotalCost)}/unit</strong>, making you appear uncompetitive against lean specialists.
          </div>
        </div>

        {/* Product B: Low Volume Custom */}
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-2xs font-bold text-rose-700 uppercase tracking-wider block">Low-Volume Custom Product</span>
              <h4 className="text-base font-black text-slate-900 mt-0.5">Product Line B ({prodBVolume.toLocaleString()} units)</h4>
            </div>
            <div className="text-right">
              <span className="text-2xs text-slate-400 block">Selling Price</span>
              <span className="text-lg font-black text-slate-900">${prodBPrice}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            {/* Traditional Accounting */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-2xs font-bold text-slate-500 uppercase block">Traditional View</span>
              <div className="text-xs text-slate-600">Unit Cost: <strong>${Math.round(prodBTraditionalTotalCost)}</strong></div>
              <div className={`text-base font-black ${prodBTraditionalMargin >= 0 ? 'text-slate-900' : 'text-rose-600'}`}>
                Margin: +${Math.round(prodBTraditionalMargin)} ({prodBTraditionalMarginPct.toFixed(1)}%)
              </div>
              <p className="text-2xs text-slate-400 mt-1">Appears profitable on paper!</p>
            </div>

            {/* ABC True Cost */}
            <div className={`p-3 border rounded-xl space-y-1 ${
              prodBABCMargin >= 0
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-rose-50 border-rose-300 text-rose-950'
            }`}>
              <span className="text-2xs font-bold uppercase block text-rose-800">True ABC View</span>
              <div className="text-xs">Unit Cost: <strong>${Math.round(prodBABCTotalCost)}</strong></div>
              <div className={`text-base font-black ${prodBABCMargin >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                True Margin: {prodBABCMargin >= 0 ? `+$${Math.round(prodBABCMargin)}` : `-$${Math.round(Math.abs(prodBABCMargin))}`} ({prodBABCMarginPct.toFixed(1)}%)
              </div>
              <p className="text-2xs opacity-80 mt-1 font-semibold">
                {prodBABCMargin < 0 ? 'Cross-Subsidization Bleed!' : 'Correctly Priced Complexity'}
              </p>
            </div>
          </div>

          <div className={`p-3 border rounded-lg text-2xs ${
            prodBABCMargin < 0 ? 'bg-rose-50 border-rose-200 text-rose-950' : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            <strong>The Cross-Subsidization Trap:</strong> {prodBABCMargin < 0 ? (
              <>You are losing <strong>${Math.round(Math.abs(prodBABCMargin))} on every single custom unit</strong>! It consumes dozens of machine setups and inspection hours that traditional labor hours failed to capture.</>
            ) : (
              <>Custom pricing now covers the true activity overhead of short-run setups and testing.</>
            )}
          </div>
        </div>
      </div>

      {/* Activity Cost Pools & Driver Table */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <h4 className="text-sm font-bold text-slate-900 flex items-center justify-between">
          <span>Activity Cost Pools & Activity Driver Rates</span>
          <span className="text-2xs text-slate-500">Total Indirect Overhead: ${(totalOverhead / 1000000).toFixed(1)}M</span>
        </h4>

        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
              <tr>
                <th className="py-2.5 px-3 text-left">Activity Cost Pool</th>
                <th className="py-2.5 px-3 text-right">Pool Budget</th>
                <th className="py-2.5 px-3 text-left">Cost Driver</th>
                <th className="py-2.5 px-3 text-right">Prod A Qty</th>
                <th className="py-2.5 px-3 text-right">Prod B Qty</th>
                <th className="py-2.5 px-3 text-right">Driver Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-3 font-semibold text-slate-900">Machine Setups & Calibration</td>
                <td className="py-2.5 px-3 text-right">${setupPoolCost.toLocaleString()}</td>
                <td className="py-2.5 px-3">Production Batches / Runs</td>
                <td className="py-2.5 px-3 text-right font-medium">{prodASetups} runs</td>
                <td className="py-2.5 px-3 text-right font-bold text-rose-600">{prodBSetups} runs</td>
                <td className="py-2.5 px-3 text-right font-black text-indigo-700">${Math.round(setupRate).toLocaleString()}/setup</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-3 font-semibold text-slate-900">Precision Quality Inspections (CMM)</td>
                <td className="py-2.5 px-3 text-right">${inspectionPoolCost.toLocaleString()}</td>
                <td className="py-2.5 px-3">Inspection Testing Hours</td>
                <td className="py-2.5 px-3 text-right font-medium">{prodAInspections} hrs</td>
                <td className="py-2.5 px-3 text-right font-bold text-rose-600">{prodBInspections} hrs</td>
                <td className="py-2.5 px-3 text-right font-black text-indigo-700">${Math.round(inspectionRate).toLocaleString()}/hr</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-3 font-semibold text-slate-900">Engineering Change Orders (ECO)</td>
                <td className="py-2.5 px-3 text-right">${engineeringPoolCost.toLocaleString()}</td>
                <td className="py-2.5 px-3">Custom Blueprint Modifications</td>
                <td className="py-2.5 px-3 text-right font-medium">{prodAEngChanges} orders</td>
                <td className="py-2.5 px-3 text-right font-bold text-rose-600">{prodBEngChanges} orders</td>
                <td className="py-2.5 px-3 text-right font-black text-indigo-700">${Math.round(engRate).toLocaleString()}/ECO</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-3 font-semibold text-slate-900">Material Movement & Staging</td>
                <td className="py-2.5 px-3 text-right">${materialHandlingPoolCost.toLocaleString()}</td>
                <td className="py-2.5 px-3">Warehouse Pallet Dispatches</td>
                <td className="py-2.5 px-3 text-right font-medium">{prodAMoves} moves</td>
                <td className="py-2.5 px-3 text-right font-bold text-rose-600">{prodBMoves} moves</td>
                <td className="py-2.5 px-3 text-right font-black text-indigo-700">${Math.round(moveRate).toLocaleString()}/move</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
