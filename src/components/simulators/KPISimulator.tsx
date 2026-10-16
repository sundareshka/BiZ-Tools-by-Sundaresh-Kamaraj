import { useState, useMemo } from 'react';
import { Target, Sliders, CheckCircle2, AlertTriangle, RotateCcw, ArrowRight, ShieldCheck, HelpCircle, Layers, Sparkles, Building2, Flame, Award, FileText, Activity } from 'lucide-react';

interface KPICard {
  id: string;
  name: string;
  objective: string;
  formula: string;
  source: string;
  frequency: 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly';
  owner: string;
  type: 'Leading' | 'Lagging';
  baseline: number;
  target: number;
  current: number;
  unit: string;
  greenMin: number;
  amberMin: number;
}

const INITIAL_KPIS: KPICard[] = [
  {
    id: 'kpi-1',
    name: 'On-Time-In-Full (OTIF) Delivery %',
    objective: 'Protect automotive OEM client relationships and avoid penalties',
    formula: 'Order lines delivered in full by confirmed date ÷ Total order lines due × 100',
    source: 'Dispatch register & Customer delivery challans',
    frequency: 'Weekly',
    owner: 'Plant Operations Manager',
    type: 'Lagging',
    baseline: 78,
    target: 95,
    current: 93,
    unit: '%',
    greenMin: 92,
    amberMin: 85
  },
  {
    id: 'kpi-2',
    name: 'Bottleneck Overall Equipment Effectiveness (OEE)',
    objective: 'Maximize machine availability and eliminate unplanned line stops',
    formula: 'Availability × Performance × Quality Rate on 3 CNC machines',
    source: 'Machine PLC runtime logs & shift logsheets',
    frequency: 'Daily',
    owner: 'Maintenance & Tooling Supervisor',
    type: 'Leading',
    baseline: 65,
    target: 85,
    current: 82,
    unit: '%',
    greenMin: 80,
    amberMin: 70
  },
  {
    id: 'kpi-3',
    name: 'Internal Machining Scrap %',
    objective: 'Reduce raw material waste and tooling failure costs',
    formula: 'Weight of rejected scrap ÷ Total raw alloy consumed × 100',
    source: 'QA inspection logs & scrap weighbridge receipts',
    frequency: 'Weekly',
    owner: 'Quality Assurance Head',
    type: 'Leading',
    baseline: 4.1,
    target: 2.5,
    current: 2.7,
    unit: '%',
    greenMin: 3.0, // lower is better
    amberMin: 4.0
  },
  {
    id: 'kpi-4',
    name: 'Debtor Collection Days (DSO)',
    objective: 'Accelerate cash flow conversion and reduce working capital lockup',
    formula: '(Accounts Receivable ÷ Annual Credit Sales) × 365',
    source: 'Tally debtors ledger & bank deposit statements',
    frequency: 'Weekly',
    owner: 'Finance & Accounts Lead',
    type: 'Lagging',
    baseline: 71,
    target: 55,
    current: 58,
    unit: 'days',
    greenMin: 60, // lower is better
    amberMin: 70
  }
];

export function KPISimulator() {
  const [activeTab, setActiveTab] = useState<'cards' | 'tree' | 'goodhart'>('cards');
  const [kpiList, setKpiList] = useState<KPICard[]>(INITIAL_KPIS);
  const [selectedKpiId, setSelectedKpiId] = useState<string>('kpi-1');

  // KPI Driver Tree state (Revenue = Leads * Proposal% * Win% * DealSize)
  const [treeLeads, setTreeLeads] = useState<number>(120);
  const [treeProposalRate, setTreeProposalRate] = useState<number>(40); // 40%
  const [treeWinRate, setTreeWinRate] = useState<number>(30); // 30%
  const [treeDealSize, setTreeDealSize] = useState<number>(150000); // ₹1.5 Lakh

  // Goodhart Simulator state
  const [goodhartMetricTarget, setGoodhartMetricTarget] = useState<number>(50); // calls per day
  const [hasQualityCheck, setHasQualityCheck] = useState<boolean>(false);

  const selectedKpi = kpiList.find(k => k.id === selectedKpiId) || kpiList[0];

  // Tree calculations
  const treeResults = useMemo(() => {
    const proposalsSent = Math.round((treeLeads * treeProposalRate) / 100);
    const dealsWon = Math.round((proposalsSent * treeWinRate) / 100);
    const monthlyRevenue = dealsWon * treeDealSize;

    // What if win rate +5%
    const improvedWins = Math.round((proposalsSent * (treeWinRate + 5)) / 100);
    const improvedRevenue = improvedWins * treeDealSize;
    const revLift = improvedRevenue - monthlyRevenue;

    return {
      proposalsSent,
      dealsWon,
      monthlyRevenue,
      improvedWins,
      improvedRevenue,
      revLift
    };
  }, [treeLeads, treeProposalRate, treeWinRate, treeDealSize]);

  // Goodhart outcome simulation
  const goodhartOutcome = useMemo(() => {
    // If target is high and no quality check: calls logged rises, but real talk time and deal conversions collapse
    if (!hasQualityCheck) {
      const callsLogged = goodhartMetricTarget;
      const fakeCalls = Math.round(callsLogged * (goodhartMetricTarget > 40 ? 0.45 : 0.15));
      const realConversion = Math.max(1, Math.round((callsLogged - fakeCalls) * 0.04));
      return {
        callsLogged,
        fakeCalls,
        realConversion,
        gamingRisk: goodhartMetricTarget > 35 ? 'Extreme (High gaming risk)' : 'Moderate',
        csat: Math.max(40, 95 - goodhartMetricTarget),
        diagnosis: 'Sales reps optimize dial volume by ringing friends or disconnecting early. Goodhart’s Law in action: calls logged soared, but meetings booked stayed flat.'
      };
    } else {
      const callsLogged = Math.min(goodhartMetricTarget, 40);
      const fakeCalls = 0;
      const realConversion = Math.round(callsLogged * 0.08);
      return {
        callsLogged,
        fakeCalls,
        realConversion,
        gamingRisk: 'Low (Controlled with quality counter-measure)',
        csat: 88,
        diagnosis: 'Paired measure (Calls Logged + Min. 2-min Duration + Qualified Meetings Booked) eliminates gaming. Staff focus on meaningful customer dialogues.'
      };
    }
  }, [goodhartMetricTarget, hasQualityCheck]);

  const getStatus = (kpi: KPICard) => {
    // For scrap and DSO, lower is better
    if (kpi.id === 'kpi-3' || kpi.id === 'kpi-4') {
      if (kpi.current <= kpi.greenMin) return { label: 'Green', class: 'bg-emerald-50 text-emerald-800 border-emerald-300' };
      if (kpi.current <= kpi.amberMin) return { label: 'Amber', class: 'bg-amber-50 text-amber-800 border-amber-300' };
      return { label: 'Red', class: 'bg-rose-50 text-rose-800 border-rose-300' };
    } else {
      if (kpi.current >= kpi.greenMin) return { label: 'Green', class: 'bg-emerald-50 text-emerald-800 border-emerald-300' };
      if (kpi.current >= kpi.amberMin) return { label: 'Amber', class: 'bg-amber-50 text-amber-800 border-amber-300' };
      return { label: 'Red', class: 'bg-rose-50 text-rose-800 border-rose-300' };
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-violet-700 uppercase tracking-wider mb-1">
            <Target className="w-4 h-4" />
            <span>Pillar 10 · Data & Analytics Interactive Studio</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            KPI Definition Card & Driver Tree Simulator
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Design governed KPI definition cards, simulate revenue driver hierarchies, and safeguard against Goodhart’s Law gaming.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveTab('cards')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'cards' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            KPI Cards & Status
          </button>
          <button
            onClick={() => setActiveTab('tree')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'tree' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            KPI Driver Tree
          </button>
          <button
            onClick={() => setActiveTab('goodhart')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'goodhart' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Goodhart's Law Lab
          </button>
        </div>
      </div>

      {/* TAB 1: KPI CARDS & RAG STATUS */}
      {activeTab === 'cards' && (
        <div className="space-y-6">
          {/* Top Scoreboard Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiList.map((kpi) => {
              const status = getStatus(kpi);
              const isSelected = kpi.id === selectedKpiId;
              return (
                <div
                  key={kpi.id}
                  onClick={() => setSelectedKpiId(kpi.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-violet-600 bg-violet-50/40 shadow-xs ring-1 ring-violet-500'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-3xs font-extrabold uppercase px-2 py-0.5 rounded-full border ${status.class}`}>
                      {status.label}
                    </span>
                    <span className="text-3xs font-bold text-slate-500 uppercase tracking-wider">
                      {kpi.type}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{kpi.name}</h4>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-slate-900 font-mono">
                      {kpi.current}{kpi.unit}
                    </span>
                    <span className="text-3xs text-slate-500">
                      Target: {kpi.target}{kpi.unit}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-3xs text-slate-500">
                    <span>Baseline: {kpi.baseline}{kpi.unit}</span>
                    <span className="font-semibold">{kpi.frequency}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Definition Card View & Live Adjuster */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-violet-700" />
                  <h3 className="text-sm font-bold text-slate-900">
                    Official KPI Definition Card: {selectedKpi.name}
                  </h3>
                </div>
                <span className={`text-2xs font-extrabold uppercase px-2 py-0.5 rounded border ${getStatus(selectedKpi).class}`}>
                  Current Status: {getStatus(selectedKpi).label}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider block">Strategic Objective</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{selectedKpi.objective}</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider block">Single Accountable Owner</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{selectedKpi.owner}</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200 sm:col-span-2">
                  <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider block">Calculation Formula</span>
                  <p className="font-mono text-xs font-bold text-violet-900 mt-0.5">{selectedKpi.formula}</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider block">Primary Data Source</span>
                  <p className="font-medium text-slate-700 mt-0.5">{selectedKpi.source}</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider block">Review Cadence & Forum</span>
                  <p className="font-medium text-slate-700 mt-0.5">{selectedKpi.frequency} Operational Standup</p>
                </div>
              </div>

              {/* Threshold Band Rule */}
              <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
                <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider block">Thresholds & Action Triggers</span>
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold">
                  <div className="p-2 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded">
                    Green: On Track
                  </div>
                  <div className="p-2 bg-amber-50 text-amber-900 border border-amber-200 rounded">
                    Amber: Monitor 1 Wk
                  </div>
                  <div className="p-2 bg-rose-50 text-rose-900 border border-rose-200 rounded">
                    Red: Mandatory Action
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Value Slider to test RAG thresholds */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-violet-700" />
                <h3 className="text-sm font-bold text-slate-900">Simulate Operational Value</h3>
              </div>
              <p className="text-xs text-slate-600">
                Adjust current performance for <strong>{selectedKpi.name}</strong> to observe RAG threshold changes.
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>Actual Value:</span>
                  <span className="font-mono text-base text-violet-900">
                    {selectedKpi.current}{selectedKpi.unit}
                  </span>
                </div>
                <input
                  type="range"
                  min={selectedKpi.id === 'kpi-3' ? 1.0 : selectedKpi.id === 'kpi-4' ? 40 : 50}
                  max={selectedKpi.id === 'kpi-3' ? 8.0 : selectedKpi.id === 'kpi-4' ? 95 : 100}
                  step={selectedKpi.id === 'kpi-3' ? 0.1 : 1}
                  value={selectedKpi.current}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setKpiList(prev => prev.map(item => item.id === selectedKpi.id ? { ...item, current: val } : item));
                  }}
                  className="w-full accent-violet-700"
                />

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Historical Baseline:</span>
                    <span className="font-bold">{selectedKpi.baseline}{selectedKpi.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Target Objective:</span>
                    <span className="font-bold">{selectedKpi.target}{selectedKpi.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Variance from Target:</span>
                    <span className={`font-bold ${selectedKpi.current >= selectedKpi.target ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {(selectedKpi.current - selectedKpi.target).toFixed(1)}{selectedKpi.unit}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setKpiList(INITIAL_KPIS)}
                  className="w-full py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All to Kovai Case Study Baseline</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: KPI DRIVER TREE */}
      {activeTab === 'tree' && (
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="font-bold text-slate-900 block">KPI Driver Tree (Revenue = Leads × Proposal % × Win % × Average Deal Size)</span>
              <span>Decompose the top-line outcome into actionable leading operational drivers. Adjust any slider to see the cascade.</span>
            </div>
            <div className="p-2.5 bg-violet-900 text-white rounded-lg font-mono text-center shrink-0">
              <span className="text-3xs uppercase tracking-wider block text-violet-200">Calculated Revenue</span>
              <span className="text-sm font-extrabold">₹{(treeResults.monthlyRevenue / 100000).toFixed(2)} Lakh / mo</span>
            </div>
          </div>

          {/* Interactive Driver Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
              <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider block">Leading Driver 1</span>
              <span className="text-xs font-bold text-slate-900">Qualified Monthly Leads</span>
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-extrabold text-violet-900 font-mono">{treeLeads}</span>
                <span className="text-3xs text-slate-500">Leads / mo</span>
              </div>
              <input
                type="range"
                min="50"
                max="300"
                step="10"
                value={treeLeads}
                onChange={(e) => setTreeLeads(parseInt(e.target.value))}
                className="w-full accent-violet-700"
              />
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
              <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider block">Leading Driver 2</span>
              <span className="text-xs font-bold text-slate-900">Proposal Submission Rate</span>
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-extrabold text-violet-900 font-mono">{treeProposalRate}%</span>
                <span className="text-3xs text-slate-500">{treeResults.proposalsSent} proposals</span>
              </div>
              <input
                type="range"
                min="20"
                max="80"
                step="5"
                value={treeProposalRate}
                onChange={(e) => setTreeProposalRate(parseInt(e.target.value))}
                className="w-full accent-violet-700"
              />
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
              <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider block">Leading Driver 3</span>
              <span className="text-xs font-bold text-slate-900">Commercial Win Rate</span>
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-extrabold text-violet-900 font-mono">{treeWinRate}%</span>
                <span className="text-3xs text-slate-500">{treeResults.dealsWon} new clients</span>
              </div>
              <input
                type="range"
                min="15"
                max="60"
                step="5"
                value={treeWinRate}
                onChange={(e) => setTreeWinRate(parseInt(e.target.value))}
                className="w-full accent-violet-700"
              />
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
              <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider block">Value Driver 4</span>
              <span className="text-xs font-bold text-slate-900">Average Contract Value</span>
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-extrabold text-violet-900 font-mono">₹{(treeDealSize / 1000).toFixed(0)}k</span>
                <span className="text-3xs text-slate-500">per client</span>
              </div>
              <input
                type="range"
                min="50000"
                max="400000"
                step="25000"
                value={treeDealSize}
                onChange={(e) => setTreeDealSize(parseInt(e.target.value))}
                className="w-full accent-violet-700"
              />
            </div>
          </div>

          {/* Mathematical Cascade Visualizer */}
          <div className="p-5 bg-violet-50/50 border border-violet-200 rounded-xl space-y-3">
            <h4 className="text-xs font-bold text-violet-950 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-violet-700" />
              <span>Sensitivity Analysis from the Guide (Example 2)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-white p-3.5 rounded-lg border border-violet-100">
                <span className="text-slate-500 font-medium block">Current Baseline Revenue:</span>
                <span className="text-base font-extrabold text-slate-900 font-mono">
                  ₹{(treeResults.monthlyRevenue / 100000).toFixed(2)} Lakh
                </span>
                <p className="text-3xs text-slate-500 mt-1">
                  Based on {treeLeads} leads × {treeProposalRate}% proposals × {treeWinRate}% wins = {treeResults.dealsWon} new clients.
                </p>
              </div>
              <div className="bg-white p-3.5 rounded-lg border border-violet-100">
                <span className="text-emerald-700 font-bold block">If Win Rate improves by +5% (to {treeWinRate + 5}%):</span>
                <span className="text-base font-extrabold text-emerald-700 font-mono">
                  ₹{(treeResults.improvedRevenue / 100000).toFixed(2)} Lakh (+₹{(treeResults.revLift / 100000).toFixed(2)} Lakh lift)
                </span>
                <p className="text-3xs text-slate-500 mt-1">
                  A 5% improvement in conversion generates additional revenue without spending a single rupee on lead acquisition.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: GOODHART'S LAW SIMULATOR */}
      {activeTab === 'goodhart' && (
        <div className="space-y-6">
          <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
            <span className="font-bold flex items-center gap-1.5 text-amber-950">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              <span>Goodhart's Law: "When a measure becomes a target, it ceases to be a good measure."</span>
            </span>
            <p>
              Simulate what happens when sales management sets a crude activity quota ("calls per day") without pairing it with quality counter-measures.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Control Panel */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-5">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Management Target Setting</h4>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>Mandated Outbound Calls Target:</span>
                  <span className="font-mono text-violet-900">{goodhartMetricTarget} calls / day</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="80"
                  step="5"
                  value={goodhartMetricTarget}
                  onChange={(e) => setGoodhartMetricTarget(parseInt(e.target.value))}
                  className="w-full accent-violet-700"
                />
              </div>

              {/* Quality Counter-Measure Toggle */}
              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasQualityCheck}
                    onChange={(e) => setHasQualityCheck(e.target.checked)}
                    className="rounded text-violet-700 focus:ring-violet-600 w-4 h-4"
                  />
                  <span className="text-xs font-bold text-slate-900">Enforce Paired Quality Measure</span>
                </label>
                <p className="text-3xs text-slate-500">
                  {hasQualityCheck
                    ? 'Active: Mandates ≥2 minute minimum call duration + Qualified meetings booked counter-measure.'
                    : 'Inactive: Management measures ONLY raw call logs without quality audits.'}
                </p>
              </div>
            </div>

            {/* Simulation Results Display */}
            <div className="lg:col-span-2 bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Simulated Employee Behavior & Gaming Outcome</h4>
                <span className={`text-3xs font-extrabold uppercase px-2 py-0.5 rounded border ${
                  goodhartOutcome.fakeCalls > 0 ? 'bg-rose-50 text-rose-800 border-rose-300' : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                }`}>
                  {goodhartOutcome.gamingRisk}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-3xs text-slate-400 font-bold uppercase block">Calls Logged in CRM</span>
                  <span className="text-xl font-extrabold font-mono text-slate-900">{goodhartOutcome.callsLogged}</span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-3xs text-slate-400 font-bold uppercase block">Fake / 5-Second Dials</span>
                  <span className={`text-xl font-extrabold font-mono ${goodhartOutcome.fakeCalls > 0 ? 'text-rose-600' : 'text-emerald-700'}`}>
                    {goodhartOutcome.fakeCalls}
                  </span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-3xs text-slate-400 font-bold uppercase block">Genuine Client Conversions</span>
                  <span className="text-xl font-extrabold font-mono text-violet-900">{goodhartOutcome.realConversion}</span>
                </div>
              </div>

              <div className="p-4 bg-white rounded-lg border border-slate-200 space-y-1.5">
                <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider block">Behavioral Diagnosis</span>
                <p className="text-xs text-slate-700 leading-relaxed">{goodhartOutcome.diagnosis}</p>
              </div>

              <div className="p-3 bg-violet-100/60 rounded-lg text-3xs text-violet-900 font-medium">
                <strong>Executive Takeaway from Sundaresh Kamaraj’s Guide:</strong> Always pair activity KPIs with outcome KPIs (e.g. Calls made + Meetings booked; Tickets closed + Repeat contact rate) and audit data quality regularly.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
