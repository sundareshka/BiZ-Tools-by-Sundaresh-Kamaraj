import { useState } from 'react';
import { BarChart, Filter, RotateCcw, ArrowRight, CheckCircle2, AlertTriangle, Layers, Sparkles, HelpCircle, TrendingDown, Package, DollarSign } from 'lucide-react';

interface ParetoItem {
  id: string;
  category: string;
  count: number;
  unitCost: number; // in ₹
  totalCost: number; // in ₹ Lakh
  rootCauses: string[];
}

interface NestedItem {
  partCode: string;
  description: string;
  shortageCount: number;
  costLoss: number; // in ₹ Lakh
}

const THIRUMALAI_PRESET: ParetoItem[] = [
  { id: 'p1', category: 'Spare Part Unavailable on 1st Visit', count: 2130, unitCost: 1200, totalCost: 25.56, rootCauses: ['Van trunk kits lack high-failure heating coils & PCB relays', 'Technicians do not pre-order parts before truck roll'] },
  { id: 'p2', category: 'Incorrect Initial Fault Diagnosis', count: 1230, unitCost: 800, totalCost: 9.84, rootCauses: ['Frontline call center miscategorizes error codes', 'Technicians skip multi-meter resistance bench test'] },
  { id: 'p3', category: 'Incomplete Installation / Leveling Checks', count: 780, unitCost: 450, totalCost: 3.51, rootCauses: ['No signed customer commissioning checklist', 'Washing machine transit bolts left partially tightened'] },
  { id: 'p4', category: 'Customer Not Available / Rescheduled', count: 420, unitCost: 250, totalCost: 1.05, rootCauses: ['No automated SMS confirmation 60 mins before arrival'] },
  { id: 'p5', category: 'Defective New Replacement Component', count: 340, unitCost: 1500, totalCost: 5.10, rootCauses: ['Supplier batch quality defect in micro-switches'] },
  { id: 'p6', category: 'Customer Usage / Operative Error', count: 290, unitCost: 300, totalCost: 0.87, rootCauses: ['Customer unaware of hard-water scaling detergent ratio'] },
  { id: 'p7', category: 'Technician Transit Delay / Weather', count: 240, unitCost: 350, totalCost: 0.84, rootCauses: ['Monsoon road water-logging in Madurai rural routes'] },
  { id: 'p8', category: 'Other Miscellaneous Friction', count: 170, unitCost: 400, totalCost: 0.68, rootCauses: ['Isolated electrical surges, warranty documentation queries'] }
];

const DRILLDOWN_PARTS: NestedItem[] = [
  { partCode: 'PCB-RELAY-12V', description: 'Universal Refrigerator PCB Power Relay', shortageCount: 640, costLoss: 8.32 },
  { partCode: 'HEATER-ELEMENT-3KW', description: 'Front-Load Washer Ceramic Heating Element', shortageCount: 480, costLoss: 6.72 },
  { partCode: 'DRAIN-PUMP-40W', description: 'Submersible Automatic Drain Pump Motor', shortageCount: 380, costLoss: 4.94 },
  { partCode: 'SOLENOID-VALVE-2WAY', description: 'Dual Water Inlet Solenoid Valve', shortageCount: 290, costLoss: 3.19 },
  { partCode: 'DOOR-INTERLOCK-SW', description: 'Safety Thermal Door Lock Mechanism', shortageCount: 180, costLoss: 1.62 },
  { partCode: 'OTHER-15-PARTS', description: '15 Other Rare/Low-Volume Specific SKU Part Numbers', shortageCount: 160, costLoss: 0.77 }
];

export function ParetoAnalysisSimulator() {
  const [data, setData] = useState<ParetoItem[]>(THIRUMALAI_PRESET);
  const [rankingMode, setRankingMode] = useState<'frequency' | 'weighted'>('frequency');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('p1');
  const [showDrillDown, setShowDrillDown] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'pareto' | 'abc' | 'beforeafter'>('pareto');

  // Compute Pareto metrics based on frequency or weighted cost
  const totalMetric = data.reduce((acc, curr) => acc + (rankingMode === 'frequency' ? curr.count : curr.totalCost), 0);

  // Sort descending
  const sortedItems = [...data].sort((a, b) => {
    const valA = rankingMode === 'frequency' ? a.count : a.totalCost;
    const valB = rankingMode === 'frequency' ? b.count : b.totalCost;
    return valB - valA;
  });

  // Calculate cumulative percentages
  let runningTotal = 0;
  const itemsWithCumulative = sortedItems.map((item, idx) => {
    const val = rankingMode === 'frequency' ? item.count : item.totalCost;
    runningTotal += val;
    const individualPct = (val / totalMetric) * 100;
    const cumulativePct = (runningTotal / totalMetric) * 100;
    const isVitalFew = cumulativePct <= 80 || (idx > 0 && (runningTotal - val) / totalMetric * 100 < 80);

    return {
      ...item,
      val,
      individualPct: Number(individualPct.toFixed(1)),
      cumulativePct: Number(cumulativePct.toFixed(1)),
      isVitalFew
    };
  });

  const vitalFewCount = itemsWithCumulative.filter(i => i.isVitalFew).length;
  const selectedItem = itemsWithCumulative.find(i => i.id === selectedCategoryId) || itemsWithCumulative[0];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 mb-1">
            <BarChart className="w-4 h-4" />
            <span>Empirical Prioritisation & Quality Control</span>
            <span>·</span>
            <span>Joseph Juran & Vilfredo Pareto 80/20 Rule</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Pareto Analysis (Frequency vs. Weighted Impact)</h3>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Isolate the "vital few" causes driving 80% of repeat visits, defects, and warranty costs from the trivial many, drill down into root-cause part numbers, and evaluate ABC classifications.
          </p>
        </div>

        {/* View Mode Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('pareto')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'pareto' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pareto Chart
            </button>
            <button
              onClick={() => setActiveTab('abc')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'abc' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ABC Classification
            </button>
            <button
              onClick={() => setActiveTab('beforeafter')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'beforeafter' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Before vs. After (5 Mo)
            </button>
          </div>

          <button
            onClick={() => {
              setData(THIRUMALAI_PRESET);
              setRankingMode('frequency');
              setShowDrillDown(false);
            }}
            className="p-2 text-slate-500 hover:text-slate-800 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            title="Reset to baseline"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mode Toggle: Frequency vs. Weighted */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700">Analytical Ranking Metric:</span>
          <div className="flex items-center bg-white border border-slate-300 rounded-lg p-0.5 text-2xs font-bold">
            <button
              onClick={() => setRankingMode('frequency')}
              className={`px-3 py-1 rounded-md transition-all ${
                rankingMode === 'frequency' ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Frequency Count (5,600 Repeat Visits)
            </button>
            <button
              onClick={() => setRankingMode('weighted')}
              className={`px-3 py-1 rounded-md transition-all ${
                rankingMode === 'weighted' ? 'bg-teal-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Weighted Financial Impact (₹47.45 Lakh Rework Cost)
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-2xs">
          <span className="font-mono text-slate-500">
            Vital Few Cutoff: <strong>{vitalFewCount} of {data.length} Categories ({Math.round((vitalFewCount / data.length) * 100)}%)</strong>
          </span>
        </div>
      </div>

      {/* TAB 1: PARETO CHART & DRILL-DOWN */}
      {activeTab === 'pareto' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Dual-Axis Visual Pareto Chart (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="text-sm font-bold text-slate-900">
                Thirumalai Appliance Care: Repeat Service Call Causes
              </h4>
              <span className="text-3xs font-mono font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                80% Reference Boundary
              </span>
            </div>

            {/* Dual Axis Chart Display */}
            <div className="space-y-3 pt-2">
              {itemsWithCumulative.map((item, idx) => {
                const maxVal = itemsWithCumulative[0].val;
                const barWidthPct = Math.max(5, Math.round((item.val / maxVal) * 100));
                const isSelected = item.id === selectedCategoryId;

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedCategoryId(item.id);
                      if (item.id === 'p1') setShowDrillDown(true);
                      else setShowDrillDown(false);
                    }}
                    className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-teal-500 bg-teal-50/20 shadow-2xs ring-1 ring-teal-500/30'
                        : 'border-slate-100 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span className="text-3xs font-mono font-extrabold px-1.5 py-0.2 rounded bg-slate-200 text-slate-700">
                          #{idx + 1}
                        </span>
                        {item.category}
                        {item.isVitalFew && (
                          <span className="text-3xs font-extrabold px-1.5 py-0.2 rounded bg-teal-100 text-teal-900 border border-teal-200 uppercase tracking-tighter">
                            Vital Few (80%)
                          </span>
                        )}
                      </span>

                      {/* Values & Cumulative */}
                      <div className="flex items-center gap-3 font-mono text-2xs shrink-0">
                        <span className="font-bold text-slate-800">
                          {rankingMode === 'frequency' ? `${item.count} jobs` : `₹${item.totalCost} Lakh`}
                        </span>
                        <span className="text-slate-400">({item.individualPct}%)</span>
                        <span className={`font-bold px-1.5 py-0.2 rounded ${
                          item.cumulativePct <= 80 ? 'bg-teal-100 text-teal-900 font-extrabold' : 'bg-slate-100 text-slate-600'
                        }`}>
                          Cum: {item.cumulativePct}%
                        </span>
                      </div>
                    </div>

                    {/* Bar Line with 80% line guide */}
                    <div className="h-4 bg-slate-100 rounded-md overflow-hidden relative">
                      {/* 80% vertical marker */}
                      <div className="absolute top-0 bottom-0 left-[80%] w-0.5 bg-rose-400 z-10 opacity-70" title="80% Vital Cutoff" />
                      <div
                        style={{ width: `${barWidthPct}%` }}
                        className={`h-full rounded transition-all ${
                          item.isVitalFew ? 'bg-teal-600' : 'bg-slate-400'
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Insight Callout */}
            <div className="p-3 bg-teal-50/70 border border-teal-200 rounded-lg text-xs">
              <span className="font-bold text-teal-950 block mb-0.5">Pareto Concentration Verdict:</span>
              <p className="text-teal-900 text-2xs leading-relaxed">
                The top <strong>3 categories (37.5% of total causes)</strong> generate <strong>74% of all repeat technician visits</strong> and <strong>82% of total monetary rework losses</strong>! General technician retraining addresses only the 2nd largest cause; spare parts availability is the true dominant lever.
              </p>
            </div>
          </div>

          {/* Right: Selected Category Diagnostic & Drill-Down (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-3xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  Category Deep-Dive
                </span>
                <h4 className="text-base font-bold text-slate-900">{selectedItem.category}</h4>
              </div>
              <span className={`text-2xs font-extrabold px-2.5 py-1 rounded-md border ${
                selectedItem.isVitalFew
                  ? 'bg-teal-100 text-teal-800 border-teal-300'
                  : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}>
                {selectedItem.isVitalFew ? 'Vital Few Focus' : 'Trivial Many'}
              </span>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-3xs text-slate-500 uppercase font-bold block">Occurrence Volume</span>
                <span className="text-xl font-extrabold font-mono text-slate-900 mt-0.5 block">{selectedItem.count} jobs</span>
                <span className="text-3xs text-slate-500">{selectedItem.individualPct}% of all network repeats</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-3xs text-slate-500 uppercase font-bold block">Financial Cost Drain</span>
                <span className="text-xl font-extrabold font-mono text-teal-900 mt-0.5 block">₹{selectedItem.totalCost} Lakh</span>
                <span className="text-3xs text-slate-500">₹{selectedItem.unitCost} avg cost per repeat</span>
              </div>
            </div>

            {/* Root Causes Identified */}
            <div>
              <span className="text-xs font-bold text-slate-800 block mb-2">Operational Root Causes (5 Whys / Fishbone):</span>
              <ul className="space-y-2 text-xs">
                {selectedItem.rootCauses.map((rc, i) => (
                  <li key={i} className="flex items-start gap-2 p-2 rounded bg-slate-50 border border-slate-200">
                    <span className="w-4 h-4 rounded-full bg-slate-900 text-white flex items-center justify-center text-3xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-slate-800 text-2xs">{rc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Drill-Down Trigger */}
            {selectedItem.id === 'p1' && (
              <div className="pt-2 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                    <span>Nested 2nd-Level Pareto: 20 Critical Parts</span>
                  </span>
                  <button
                    onClick={() => setShowDrillDown(!showDrillDown)}
                    className="text-xs font-bold text-teal-700 hover:text-teal-900"
                  >
                    {showDrillDown ? 'Hide' : 'Expand'}
                  </button>
                </div>

                {showDrillDown && (
                  <div className="space-y-2 p-3 bg-teal-50/50 rounded-lg border border-teal-200 text-2xs font-mono">
                    <p className="text-teal-950 font-sans font-semibold mb-2">
                      Drilling into 2,130 parts shortages reveals that just 5 core part numbers cause 78% of all first-visit missing parts:
                    </p>
                    {DRILLDOWN_PARTS.map((part, pIdx) => (
                      <div key={pIdx} className="flex justify-between items-center py-1 border-b border-teal-100/70">
                        <span className="font-bold text-slate-900">{part.partCode}</span>
                        <span className="text-slate-600">{part.shortageCount} shortages</span>
                        <span className="font-bold text-teal-900">₹{part.costLoss}L</span>
                      </div>
                    ))}
                    <div className="pt-1.5 font-sans text-teal-900 font-semibold">
                      Action: Equipping 180 technician vans with standardized trunk kits for these 5 items eliminated 68% of parts-related return trips.
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: ABC INVENTORY CLASSIFICATION */}
      {activeTab === 'abc' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900">ABC Inventory / Customer Segmentation Policy</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Practical application of Pareto: allocating working capital and control intensity where 80% of value resides
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-emerald-50/60 border border-emerald-300 rounded-xl space-y-2">
              <span className="px-2 py-0.5 rounded text-3xs font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300 uppercase">
                Class A: Vital Top ~70–80% Value
              </span>
              <h5 className="text-sm font-bold text-emerald-950">~15–20% of SKUs or Customers</h5>
              <p className="text-2xs text-emerald-900 leading-relaxed">
                Represents the lion's share of annual consumption value. Policy: Continuous review, safety stock buffers, strict cycle counting, senior buyer ownership, and supplier VMI agreements.
              </p>
            </div>

            <div className="p-4 bg-blue-50/60 border border-blue-300 rounded-xl space-y-2">
              <span className="px-2 py-0.5 rounded text-3xs font-extrabold bg-blue-100 text-blue-900 border border-blue-300 uppercase">
                Class B: Moderate ~15–20% Value
              </span>
              <h5 className="text-sm font-bold text-blue-950">~30% of SKUs or Customers</h5>
              <p className="text-2xs text-blue-900 leading-relaxed">
                Intermediate priority. Policy: Monthly periodic review, standard economic order quantities (EOQ), automated ERP replenishment triggers, moderate buffer stock.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-300 rounded-xl space-y-2">
              <span className="px-2 py-0.5 rounded text-3xs font-extrabold bg-slate-200 text-slate-800 uppercase">
                Class C: Trivial Many ~5–10% Value
              </span>
              <h5 className="text-sm font-bold text-slate-900">~50% of SKUs or Customers</h5>
              <p className="text-2xs text-slate-600 leading-relaxed">
                High SKU count but minimal financial weight. Policy: Simple two-bin bulk reorder systems, annual supplier contracts, zero safety stock paranoia; avoid wasting managerial time.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BEFORE VS. AFTER VERIFICATION */}
      {activeTab === 'beforeafter' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Before-and-After Intervention Verification (5 Months)</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Proving process improvement by demonstrating the shrinkage of the primary vital few bars on identical scales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Before (Month 0) */}
            <div className="p-4 bg-rose-50/50 border border-rose-200 rounded-xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-rose-950 text-xs">Baseline Month 0: 5,600 Repeat Visits (18.1%)</span>
                <span className="text-3xs font-mono font-bold px-2 py-0.5 rounded bg-rose-200 text-rose-900">Before</span>
              </div>

              <div className="space-y-2 text-2xs font-mono">
                <div>
                  <div className="flex justify-between text-slate-700 mb-0.5">
                    <span>1. Spare Parts Unavailable: 2,130 (38%)</span>
                    <strong className="text-rose-700">₹25.6L</strong>
                  </div>
                  <div className="h-3 bg-slate-200 rounded overflow-hidden">
                    <div className="h-full bg-rose-600 w-[100%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-slate-700 mb-0.5">
                    <span>2. Incorrect Diagnosis: 1,230 (22%)</span>
                    <strong>₹9.8L</strong>
                  </div>
                  <div className="h-3 bg-slate-200 rounded overflow-hidden">
                    <div className="h-full bg-rose-400 w-[58%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-slate-700 mb-0.5">
                    <span>3. Incomplete Checks: 780 (14%)</span>
                    <strong>₹3.5L</strong>
                  </div>
                  <div className="h-3 bg-slate-200 rounded overflow-hidden">
                    <div className="h-full bg-rose-300 w-[36%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* After (Month 5) */}
            <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-emerald-950 text-xs">Post-Intervention Month 5: 2,790 Repeats (9.0%)</span>
                <span className="text-3xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">5 Months After</span>
              </div>

              <div className="space-y-2 text-2xs font-mono">
                <div>
                  <div className="flex justify-between text-slate-700 mb-0.5">
                    <span>1. Spare Parts Unavailable: 680 (-68% drop!)</span>
                    <strong className="text-emerald-700">₹8.1L</strong>
                  </div>
                  <div className="h-3 bg-slate-200 rounded overflow-hidden">
                    <div className="h-full bg-emerald-600 w-[32%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-slate-700 mb-0.5">
                    <span>2. Incorrect Diagnosis: 740 (-40% drop)</span>
                    <strong>₹5.9L</strong>
                  </div>
                  <div className="h-3 bg-slate-200 rounded overflow-hidden">
                    <div className="h-full bg-emerald-400 w-[35%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-slate-700 mb-0.5">
                    <span>3. Incomplete Checks: 310 (-60% drop)</span>
                    <strong>₹1.4L</strong>
                  </div>
                  <div className="h-3 bg-slate-200 rounded overflow-hidden">
                    <div className="h-full bg-emerald-300 w-[15%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
