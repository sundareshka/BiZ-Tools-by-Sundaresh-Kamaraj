import { useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, RotateCcw, Plus, Trash2, Edit3, ArrowRight, Sparkles, Building2, Eye, ShieldCheck, Flame } from 'lucide-react';

interface RiskItem {
  id: string;
  code: string;
  statement: string;
  category: 'Operational' | 'Compliance/Export' | 'Cyber/IT' | 'Financial' | 'Strategic';
  inherentL: number;
  inherentI: number;
  residualL: number;
  residualI: number;
  controls: string;
  treatment: 'Avoid' | 'Reduce' | 'Transfer' | 'Accept';
  owner: string;
  kri: string;
  reviewDate: string;
}

const DEFAULT_RISKS: RiskItem[] = [
  {
    id: 'r1',
    code: 'OPS-07',
    statement: 'Single grinding line breakdown halts production for 10+ days, causing missed retail orders & severe penalty clauses',
    category: 'Operational',
    inherentL: 4,
    inherentI: 4,
    residualL: 2,
    residualI: 2,
    controls: 'Leased standby secondary grinding line & critical motor spares buffer stock',
    treatment: 'Reduce',
    owner: 'Plant Head (Murugan K.)',
    kri: 'Unplanned grinding downtime hours/mo (<4h)',
    reviewDate: '31 Oct · Monthly'
  },
  {
    id: 'r2',
    code: 'EXP-02',
    statement: 'Pesticide residue in incoming chilli consignments exceeds EU/Gulf MRL limits, causing rejected container loads',
    category: 'Compliance/Export',
    inherentL: 4,
    inherentI: 5,
    residualL: 1,
    residualI: 5,
    controls: 'Mandatory 100% NABL-certified pre-shipment batch testing & farm supplier audit',
    treatment: 'Reduce',
    owner: 'Quality Assurance Head (Dr. Shalini S.)',
    kri: '% of incoming chilli lots passing residue screens (>99%)',
    reviewDate: '15 Nov · Fortnightly'
  },
  {
    id: 'r3',
    code: 'CYB-04',
    statement: 'Ransomware attack encrypts ERP billing & dispatch servers, halting warehouse shipments for 72+ hours',
    category: 'Cyber/IT',
    inherentL: 3,
    inherentI: 4,
    residualL: 1,
    residualI: 4,
    controls: 'Immutable offline air-gapped backups & mandatory MFA across all administrative endpoints',
    treatment: 'Reduce',
    owner: 'IT Director (Karthik R.)',
    kri: 'Days since last verified offline backup restore (<7d)',
    reviewDate: '30 Oct · Monthly'
  },
  {
    id: 'r4',
    code: 'PRC-01',
    statement: 'Monsoon drought in Andhra/Karnataka causes 40% surge in raw red chilli prices, crushing gross contract margins',
    category: 'Financial',
    inherentL: 4,
    inherentI: 3,
    residualL: 2,
    residualI: 2,
    controls: 'Multi-origin procurement contracts with farm FPOs & forward purchase buffer contracts',
    treatment: 'Transfer',
    owner: 'Procurement Head (Venkatesh P.)',
    kri: '30-day raw chilli wholesale price volatility index',
    reviewDate: '05 Nov · Weekly'
  },
  {
    id: 'r5',
    code: 'SAF-05',
    statement: 'Combustible spice dust explosion in dry pulverising chamber injuring operators and triggering factory suspension',
    category: 'Operational',
    inherentL: 2,
    inherentI: 5,
    residualL: 1,
    residualI: 5,
    controls: 'ATEX-rated spark detection, automatic nitrogen explosion suppression, daily dust vacuuming',
    treatment: 'Reduce',
    owner: 'EHS & Safety Officer (Ganesan M.)',
    kri: 'Particulate air concentration sensor threshold readings',
    reviewDate: 'Daily / Monthly'
  },
  {
    id: 'r6',
    code: 'LEG-03',
    statement: 'Failure to comply with revised FSSAI packaging & nutritional labelling norms resulting in market seizure order',
    category: 'Compliance/Export',
    inherentL: 3,
    inherentI: 3,
    residualL: 1,
    residualI: 2,
    controls: 'External legal regulatory auditor quarterly label verification checklist',
    treatment: 'Reduce',
    owner: 'Regulatory Affairs Manager (Ananya V.)',
    kri: 'Open non-conformances on external regulatory packaging audit',
    reviewDate: '15 Dec · Quarterly'
  },
  {
    id: 'r7',
    code: 'STR-02',
    statement: 'Key private-label modern trade retail client (35% of domestic revenue) terminates contract for house brand',
    category: 'Strategic',
    inherentL: 3,
    inherentI: 4,
    residualL: 2,
    residualI: 3,
    controls: 'Client revenue diversification program & 3-year multi-category joint business planning agreement',
    treatment: 'Reduce',
    owner: 'Chief Commercial Officer (Balaji N.)',
    kri: 'Top-client share of total firm revenue (<25% target)',
    reviewDate: '10 Nov · Monthly'
  }
];

export function RiskMatrixSimulator() {
  const [risks, setRisks] = useState<RiskItem[]>(DEFAULT_RISKS);
  const [viewMode, setViewMode] = useState<'residual' | 'inherent'>('residual');
  const [selectedRiskId, setSelectedRiskId] = useState<string>(DEFAULT_RISKS[0].id);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // Form state for adding/editing
  const [newStatement, setNewStatement] = useState('');
  const [newCategory, setNewCategory] = useState<RiskItem['category']>('Operational');
  const [newL, setNewL] = useState(3);
  const [newI, setNewI] = useState(3);
  const [newControls, setNewControls] = useState('');
  const [newTreatment, setNewTreatment] = useState<RiskItem['treatment']>('Reduce');
  const [newOwner, setNewOwner] = useState('');
  const [newKri, setNewKri] = useState('');

  const selectedRisk = risks.find(r => r.id === selectedRiskId) || risks[0];

  const getScore = (l: number, i: number) => l * i;

  const getBand = (l: number, i: number) => {
    const score = l * i;
    if (score >= 15) return { name: 'Critical', bg: 'bg-rose-500', text: 'text-white', badge: 'bg-rose-100 text-rose-800 border-rose-300' };
    if (score >= 10) return { name: 'High', bg: 'bg-amber-500', text: 'text-white', badge: 'bg-amber-100 text-amber-800 border-amber-300' };
    if (score >= 5) return { name: 'Medium', bg: 'bg-yellow-400', text: 'text-slate-900', badge: 'bg-yellow-100 text-yellow-800 border-yellow-300' };
    return { name: 'Low', bg: 'bg-emerald-500', text: 'text-white', badge: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
  };

  const getCellColor = (l: number, i: number) => {
    const score = l * i;
    if (score >= 15) return 'bg-rose-100/90 hover:bg-rose-200 border-rose-300 text-rose-950';
    if (score >= 10) return 'bg-amber-100/90 hover:bg-amber-200 border-amber-300 text-amber-950';
    if (score >= 5) return 'bg-yellow-100/80 hover:bg-yellow-200 border-yellow-300 text-yellow-950';
    return 'bg-emerald-100/80 hover:bg-emerald-200 border-emerald-300 text-emerald-950';
  };

  const inherentCriticalCount = risks.filter(r => getScore(r.inherentL, r.inherentI) >= 15).length;
  const residualCriticalCount = risks.filter(r => getScore(r.residualL, r.residualI) >= 15).length;
  const impact5Escalations = risks.filter(r => (viewMode === 'residual' ? r.residualI : r.inherentI) === 5);

  const handleAddRisk = () => {
    if (!newStatement.trim()) return;
    const newRisk: RiskItem = {
      id: `r-${Date.now()}`,
      code: `RSK-${risks.length + 1}`,
      statement: newStatement,
      category: newCategory,
      inherentL: newL,
      inherentI: newI,
      residualL: Math.max(1, newL - 1),
      residualI: newI,
      controls: newControls || 'Standard supervisory inspection and monthly checklist review',
      treatment: newTreatment,
      owner: newOwner || 'Operational Risk Coordinator',
      kri: newKri || 'Monthly audit incident frequency count',
      reviewDate: 'Next Board Cycle'
    };
    setRisks([...risks, newRisk]);
    setSelectedRiskId(newRisk.id);
    setNewStatement('');
    setNewControls('');
    setNewOwner('');
    setNewKri('');
    setShowAddModal(false);
  };

  const handleDeleteRisk = (id: string) => {
    const remaining = risks.filter(r => r.id !== id);
    if (remaining.length > 0) {
      setRisks(remaining);
      setSelectedRiskId(remaining[0].id);
    }
  };

  const handleUpdateRating = (id: string, type: 'residual' | 'inherent', dim: 'L' | 'I', val: number) => {
    setRisks(risks.map(r => {
      if (r.id !== id) return r;
      if (type === 'residual') {
        return {
          ...r,
          residualL: dim === 'L' ? val : r.residualL,
          residualI: dim === 'I' ? val : r.residualI
        };
      } else {
        return {
          ...r,
          inherentL: dim === 'L' ? val : r.inherentL,
          inherentI: dim === 'I' ? val : r.inherentI
        };
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span>Executive Risk Intelligence & Governance</span>
            <span>·</span>
            <span>ISO 31000:2018 Calibration Standards</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">5×5 Risk Heat Map & Interactive Register</h3>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Plot threats on calibrated Likelihood × Consequence scales, compare Inherent vs Residual risk postures, and enforce the mandatory Impact=5 board escalation rule.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setViewMode('residual')}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                viewMode === 'residual' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Residual (Post-Controls)</span>
            </button>
            <button
              onClick={() => setViewMode('inherent')}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                viewMode === 'inherent' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-rose-600" />
              <span>Inherent (Pre-Controls)</span>
            </button>
          </div>

          <button
            onClick={() => setRisks(DEFAULT_RISKS)}
            className="p-2 text-slate-500 hover:text-slate-800 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            title="Reset to Kaveri Agro Foods baseline"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs">
          <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider block">Total Register Risks</span>
          <span className="text-2xl font-extrabold font-mono text-slate-900 mt-0.5 block">{risks.length}</span>
          <span className="text-3xs text-slate-500 mt-1 block">41 merged audit categories</span>
        </div>
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs">
          <span className="text-2xs font-bold text-rose-600 uppercase tracking-wider block">Critical (Red) Risks</span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-extrabold font-mono text-rose-600">
              {viewMode === 'residual' ? residualCriticalCount : inherentCriticalCount}
            </span>
            <span className="text-2xs text-slate-500">
              {viewMode === 'residual' ? `(down from ${inherentCriticalCount} inherent)` : 'prior to controls'}
            </span>
          </div>
          <span className="text-3xs text-slate-500 mt-1 block">Threshold: Score ≥ 15</span>
        </div>
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs">
          <span className="text-2xs font-bold text-amber-600 uppercase tracking-wider block">Impact 5 Board Escalations</span>
          <span className="text-2xl font-extrabold font-mono text-amber-600 mt-0.5 block">{impact5Escalations.length}</span>
          <span className="text-3xs text-slate-500 mt-1 block">Severe consequences flagged</span>
        </div>
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs">
          <span className="text-2xs font-bold text-emerald-600 uppercase tracking-wider block">Control Effectiveness</span>
          <span className="text-2xl font-extrabold font-mono text-emerald-600 mt-0.5 block">
            {Math.round(((inherentCriticalCount - residualCriticalCount) / Math.max(1, inherentCriticalCount)) * 100)}%
          </span>
          <span className="text-3xs text-slate-500 mt-1 block">Red risk reduction rate</span>
        </div>
      </div>

      {/* Main Grid & Selected Risk Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 5×5 Heat Map Canvas (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>5×5 Matrix Grid: {viewMode === 'residual' ? 'Residual Risk Profile' : 'Inherent Risk Profile'}</span>
            </h4>
            <span className="text-3xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              Likelihood (Y) vs Impact (X)
            </span>
          </div>

          {/* Matrix Container */}
          <div className="relative pt-2">
            {/* Top X-Axis Header (Impact) */}
            <div className="grid grid-cols-5 gap-1.5 ml-14 mb-1 text-center">
              {[
                { level: 1, label: '1 Minimal', cost: '< ₹1L' },
                { level: 2, label: '2 Minor', cost: '₹1–5L' },
                { level: 3, label: '3 Moderate', cost: '₹5–25L' },
                { level: 4, label: '4 Major', cost: '₹25L–1Cr' },
                { level: 5, label: '5 Severe', cost: '> ₹1Cr (Board)' }
              ].map(imp => (
                <div key={imp.level} className="text-2xs font-bold text-slate-600 leading-tight">
                  <div>{imp.label}</div>
                  <div className="text-3xs font-normal text-slate-400">{imp.cost}</div>
                </div>
              ))}
            </div>

            {/* Matrix Body with Y-Axis (Likelihood) */}
            <div className="space-y-1.5">
              {[
                { level: 5, label: '5 Almost Certain', prob: '> 80%' },
                { level: 4, label: '4 Likely', prob: '50–80%' },
                { level: 3, label: '3 Possible', prob: '20–50%' },
                { level: 2, label: '2 Unlikely', prob: '5–20%' },
                { level: 1, label: '1 Rare', prob: '< 5%' }
              ].map(lik => (
                <div key={lik.level} className="flex items-center gap-2">
                  {/* Y-Axis Label */}
                  <div className="w-12 text-right text-2xs font-bold text-slate-600 leading-tight shrink-0">
                    <div>{lik.label.split(' ')[0]}</div>
                    <div className="text-3xs font-normal text-slate-400">{lik.prob}</div>
                  </div>

                  {/* 5 Impact Cells for this Likelihood row */}
                  <div className="grid grid-cols-5 gap-1.5 flex-1">
                    {[1, 2, 3, 4, 5].map(impLevel => {
                      const score = lik.level * impLevel;
                      const cellRisks = risks.filter(r => {
                        const l = viewMode === 'residual' ? r.residualL : r.inherentL;
                        const i = viewMode === 'residual' ? r.residualI : r.inherentI;
                        return l === lik.level && i === impLevel;
                      });

                      return (
                        <div
                          key={impLevel}
                          className={`h-16 rounded-lg border p-1 transition-all flex flex-col justify-between ${getCellColor(
                            lik.level,
                            impLevel
                          )}`}
                        >
                          <div className="flex items-center justify-between text-3xs font-mono font-bold opacity-75">
                            <span>{score}</span>
                            {impLevel === 5 && (
                              <span className="text-3xs bg-rose-900 text-white font-extrabold px-1 rounded uppercase tracking-tighter" title="Mandatory Board Escalation">
                                BRD
                              </span>
                            )}
                          </div>

                          {/* Render Risks in this cell */}
                          <div className="flex flex-wrap gap-1 overflow-y-auto max-h-10">
                            {cellRisks.map(r => (
                              <button
                                key={r.id}
                                onClick={() => setSelectedRiskId(r.id)}
                                className={`px-1.5 py-0.5 rounded text-3xs font-bold font-mono transition-transform hover:scale-105 shadow-2xs ${
                                  selectedRiskId === r.id
                                    ? 'bg-slate-950 text-white ring-2 ring-slate-900 ring-offset-1'
                                    : 'bg-white/95 text-slate-800 border border-slate-300'
                                }`}
                              >
                                {r.code}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Color Band Legend */}
          <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-center">
            <div className="p-2 rounded bg-emerald-50 border border-emerald-200 text-emerald-900 text-2xs">
              <span className="font-bold block">1–4 Low (Green)</span>
              <span className="text-3xs text-emerald-700">Accept & periodic review</span>
            </div>
            <div className="p-2 rounded bg-yellow-50 border border-yellow-200 text-yellow-900 text-2xs">
              <span className="font-bold block">5–9 Medium (Yellow)</span>
              <span className="text-3xs text-yellow-700">Departmental monitoring</span>
            </div>
            <div className="p-2 rounded bg-amber-50 border border-amber-200 text-amber-900 text-2xs">
              <span className="font-bold block">10–14 High (Amber)</span>
              <span className="text-3xs text-amber-700">Treatment plan & named KRI</span>
            </div>
            <div className="p-2 rounded bg-rose-50 border border-rose-200 text-rose-900 text-2xs">
              <span className="font-bold block">15–25 Critical (Red)</span>
              <span className="text-3xs text-rose-700">Mandatory Board review within 30d</span>
            </div>
          </div>
        </div>

        {/* Right: Selected Risk Diagnostic & Controls (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-3xs font-mono font-bold text-slate-400 uppercase tracking-wider block">Selected Threat Analysis</span>
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>{selectedRisk.code}</span>
                <span className="text-2xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  {selectedRisk.category}
                </span>
              </h4>
            </div>

            <div className="flex items-center gap-1.5">
              <span className={`text-xs font-extrabold px-2.5 py-1 rounded-md border ${
                getBand(
                  viewMode === 'residual' ? selectedRisk.residualL : selectedRisk.inherentL,
                  viewMode === 'residual' ? selectedRisk.residualI : selectedRisk.inherentI
                ).badge
              }`}>
                Score: {getScore(
                  viewMode === 'residual' ? selectedRisk.residualL : selectedRisk.inherentL,
                  viewMode === 'residual' ? selectedRisk.residualI : selectedRisk.inherentI
                )} ({getBand(
                  viewMode === 'residual' ? selectedRisk.residualL : selectedRisk.inherentL,
                  viewMode === 'residual' ? selectedRisk.residualI : selectedRisk.inherentI
                ).name})
              </span>
            </div>
          </div>

          {/* Statement */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-3xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Risk Statement (Cause → Event → Consequence)</span>
            <p className="text-xs font-semibold text-slate-800 leading-relaxed">
              "{selectedRisk.statement}"
            </p>
          </div>

          {/* Inherent vs Residual Sliders */}
          <div className="space-y-3 p-3 bg-slate-50/70 rounded-lg border border-slate-200">
            <span className="text-2xs font-bold text-slate-700 uppercase tracking-wider block">
              Adjust Ratings for {selectedRisk.code}:
            </span>

            {/* Inherent Ratings */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-3xs font-semibold text-slate-500 block mb-1">
                  Inherent Likelihood: <strong className="text-slate-900">{selectedRisk.inherentL} / 5</strong>
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={selectedRisk.inherentL}
                  onChange={(e) => handleUpdateRating(selectedRisk.id, 'inherent', 'L', parseInt(e.target.value))}
                  className="w-full accent-slate-900"
                />
              </div>
              <div>
                <label className="text-3xs font-semibold text-slate-500 block mb-1">
                  Inherent Impact: <strong className="text-slate-900">{selectedRisk.inherentI} / 5</strong>
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={selectedRisk.inherentI}
                  onChange={(e) => handleUpdateRating(selectedRisk.id, 'inherent', 'I', parseInt(e.target.value))}
                  className="w-full accent-slate-900"
                />
              </div>
            </div>

            {/* Residual Ratings */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200">
              <div>
                <label className="text-3xs font-semibold text-emerald-700 block mb-1">
                  Residual Likelihood: <strong className="text-slate-900">{selectedRisk.residualL} / 5</strong>
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={selectedRisk.residualL}
                  onChange={(e) => handleUpdateRating(selectedRisk.id, 'residual', 'L', parseInt(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>
              <div>
                <label className="text-3xs font-semibold text-emerald-700 block mb-1">
                  Residual Impact: <strong className="text-slate-900">{selectedRisk.residualI} / 5</strong>
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={selectedRisk.residualI}
                  onChange={(e) => handleUpdateRating(selectedRisk.id, 'residual', 'I', parseInt(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>
            </div>
          </div>

          {/* Treatment, Controls, Owner & KRI */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Treatment Strategy:</span>
              <span className="font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                {selectedRisk.treatment}
              </span>
            </div>
            <div className="py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium block mb-0.5">Existing Controls:</span>
              <span className="text-slate-800 font-medium">{selectedRisk.controls}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Accountable Risk Owner:</span>
              <span className="font-bold text-slate-900">{selectedRisk.owner}</span>
            </div>
            <div className="py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium block mb-0.5">Key Risk Indicator (KRI):</span>
              <span className="font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded block">
                {selectedRisk.kri}
              </span>
            </div>
            <div className="flex justify-between items-center py-1.5">
              <span className="text-slate-500 font-medium">Review Cadence:</span>
              <span className="font-mono text-slate-700">{selectedRisk.reviewDate}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log New Risk</span>
            </button>
            {risks.length > 1 && (
              <button
                onClick={() => handleDeleteRisk(selectedRisk.id)}
                className="px-3 py-1.5 text-rose-600 hover:text-rose-700 hover:bg-rose-50 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Risk Register Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Enterprise Risk Register (Consolidated View)</h4>
            <p className="text-xs text-slate-500 mt-0.5">Active monitoring log compliant with ISO 31000 & SEBI LODR requirements</p>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            {['All', 'Operational', 'Compliance/Export', 'Cyber/IT', 'Financial', 'Strategic'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-2.5 py-1 rounded-md text-2xs font-semibold whitespace-nowrap transition-colors ${
                  filterCategory === cat ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-3xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-2.5 px-3">Code</th>
                <th className="py-2.5 px-3 min-w-[260px]">Cause → Event → Consequence</th>
                <th className="py-2.5 px-3">Inherent (L×I)</th>
                <th className="py-2.5 px-3">Residual (L×I)</th>
                <th className="py-2.5 px-3">Treatment</th>
                <th className="py-2.5 px-3">Owner</th>
                <th className="py-2.5 px-3">Key Risk Indicator (KRI)</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {risks
                .filter(r => filterCategory === 'All' || r.category === filterCategory)
                .map(r => {
                  const inScore = getScore(r.inherentL, r.inherentI);
                  const resScore = getScore(r.residualL, r.residualI);
                  const resBand = getBand(r.residualL, r.residualI);
                  const isSelected = r.id === selectedRiskId;

                  return (
                    <tr
                      key={r.id}
                      onClick={() => setSelectedRiskId(r.id)}
                      className={`hover:bg-slate-50/80 cursor-pointer transition-colors ${
                        isSelected ? 'bg-indigo-50/50 font-medium' : ''
                      }`}
                    >
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-900">{r.code}</td>
                      <td className="py-2.5 px-3 text-slate-800 line-clamp-1">{r.statement}</td>
                      <td className="py-2.5 px-3 font-mono">
                        <span className="text-slate-600">{r.inherentL}×{r.inherentI}</span>{' '}
                        <span className="font-bold">({inScore})</span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`inline-block px-2 py-0.5 rounded font-mono text-3xs font-extrabold border ${resBand.badge}`}>
                          {r.residualL}×{r.residualI} = {resScore} ({resBand.name})
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold text-3xs">
                          {r.treatment}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-700 font-medium">{r.owner}</td>
                      <td className="py-2.5 px-3 text-indigo-700 font-mono text-3xs">{r.kri}</td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRiskId(r.id);
                          }}
                          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for adding new risk */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-xl max-w-lg w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="text-sm font-bold text-slate-900">Log New Threat Statement into Risk Register</h4>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-semibold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Cause → Event → Consequence Formulation *
                </label>
                <textarea
                  rows={2}
                  value={newStatement}
                  onChange={(e) => setNewStatement(e.target.value)}
                  placeholder="Because [Root Cause], [Event] could occur, causing [Operational Consequence]..."
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 outline-none text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="Operational">Operational</option>
                    <option value="Compliance/Export">Compliance/Export</option>
                    <option value="Cyber/IT">Cyber/IT</option>
                    <option value="Financial">Financial</option>
                    <option value="Strategic">Strategic</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Treatment Response</label>
                  <select
                    value={newTreatment}
                    onChange={(e) => setNewTreatment(e.target.value as any)}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="Reduce">Reduce (Mitigate)</option>
                    <option value="Avoid">Avoid (Eliminate)</option>
                    <option value="Transfer">Transfer (Insure)</option>
                    <option value="Accept">Accept (Retain)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Inherent Likelihood (1–5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={newL}
                    onChange={(e) => setNewL(parseInt(e.target.value) || 1)}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Inherent Impact (1–5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={newI}
                    onChange={(e) => setNewI(parseInt(e.target.value) || 1)}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Existing Internal Controls</label>
                <input
                  type="text"
                  value={newControls}
                  onChange={(e) => setNewControls(e.target.value)}
                  placeholder="e.g. Periodic vendor audit, redundant power generators"
                  className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Accountable Owner</label>
                  <input
                    type="text"
                    value={newOwner}
                    onChange={(e) => setNewOwner(e.target.value)}
                    placeholder="e.g. Operations Head (R. Nathan)"
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Early-Warning KRI Metric</label>
                  <input
                    type="text"
                    value={newKri}
                    onChange={(e) => setNewKri(e.target.value)}
                    placeholder="e.g. Monthly defective lot rejection %"
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAddRisk}
                className="px-4 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors"
              >
                Save & Plot to Matrix
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
