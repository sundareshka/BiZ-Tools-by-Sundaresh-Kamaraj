import { useState } from 'react';
import { Plus, Trash2, ArrowRight, AlertCircle, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';

interface SwotFactor {
  id: string;
  quadrant: 'S' | 'W' | 'O' | 'T';
  text: string;
  evidence: string;
  impact: number; // 1-5
  probability: number; // 1-5
}

interface TowsStrategy {
  id: string;
  type: 'SO' | 'WO' | 'ST' | 'WT';
  title: string;
  description: string;
  owner: string;
  milestone90d: string;
  metric: string;
}

const KAVERI_AGRO_FACTORS: SwotFactor[] = [
  { id: '1', quadrant: 'S', text: '20-year deep relationships with 40 regional retail dealers', evidence: 'Average dealer tenure > 12 years; 85% exclusive shelf share', impact: 5, probability: 5 },
  { id: '2', quadrant: 'S', text: 'In-house certified agronomist advisory team', evidence: '2 agronomists serving 1,200 farmer customers with soil tests', impact: 4, probability: 5 },
  { id: '3', quadrant: 'W', text: 'Zero direct mobile app or digital ordering interface', evidence: '100% of orders placed via phone calls or paper notebooks', impact: 4, probability: 5 },
  { id: '4', quadrant: 'W', text: 'Cash flow tied up in 45-day uncollateralized credit to farmers', evidence: 'Accountant reports ₹1.8 Cr trapped in delayed seasonal receivables', impact: 4, probability: 4 },
  { id: '5', quadrant: 'O', text: 'Surging smartphone and WhatsApp adoption among farmers and dealers', evidence: '94% of dealers use WhatsApp for daily business inquiries', impact: 5, probability: 5 },
  { id: '6', quadrant: 'O', text: 'High-margin organic fertilizer and bio-stimulant demand growth', evidence: 'State agriculture dept data shows 18% YoY organic category growth', impact: 4, probability: 4 },
  { id: '7', quadrant: 'T', text: 'Venture-funded agri-tech platforms offering doorstep delivery', evidence: 'Two platforms launched in Madurai with same-day delivery guarantees', impact: 5, probability: 5 },
  { id: '8', quadrant: 'T', text: 'Erratic monsoon rainfall causing unpredictable sowing cycles', evidence: 'IMD regional forecast projects 15% delayed rainfall window', impact: 3, probability: 4 }
];

const KAVERI_AGRO_TOWS: TowsStrategy[] = [
  {
    id: 't-1',
    type: 'SO',
    title: 'WhatsApp Rapid Ordering with Pre-Approved Dealer Credit',
    description: 'Leverage 20-year dealer trust (S) and WhatsApp ubiquitous adoption (O) to allow instant repeat ordering without building a custom app.',
    owner: 'Sales Head (Murugan)',
    milestone90d: '30 dealers onboarded to WhatsApp bot; order cycle cut from 2 days to 4 hours',
    metric: 'Dealer order placement time < 4 hours'
  },
  {
    id: 't-2',
    type: 'ST',
    title: 'Bundled Agronomist Field Advisory with Bulk Delivery',
    description: 'Counter online platforms (T) by deploying in-house agronomists (S) to provide personalized field advice bundled with bulk fertilizer orders.',
    owner: 'Lead Agronomist (Dr. Raman)',
    milestone90d: 'Pilot with 250 farmers across 3 sub-districts',
    metric: 'Farmer-direct order volume +14%'
  },
  {
    id: 't-3',
    type: 'WT',
    title: 'Cap Software R&D Spend to Protect Working Capital',
    description: 'Avoid building a ₹15 lakh native app while cash is tied up in credit (W), mitigating online entrant margin pressure (T) using lightweight tools.',
    owner: 'CFO / Accountant (Shankar)',
    milestone90d: 'App project shelved; ₹12L deployed to working capital inventory reserve',
    metric: 'Zero new IT development debt'
  }
];

export function SWOTSimulator() {
  const [factors, setFactors] = useState<SwotFactor[]>(KAVERI_AGRO_FACTORS);
  const [tows, setTows] = useState<TowsStrategy[]>(KAVERI_AGRO_TOWS);
  const [activeTab, setActiveTab] = useState<'grid' | 'prioritize' | 'tows'>('grid');

  // Input states
  const [newText, setNewText] = useState('');
  const [newEvidence, setNewEvidence] = useState('');
  const [newQuadrant, setNewQuadrant] = useState<'S' | 'W' | 'O' | 'T'>('S');
  const [newImpact, setNewImpact] = useState(4);
  const [newProbability, setNewProbability] = useState(4);
  const [validationWarning, setValidationWarning] = useState<string | null>(null);

  // New TOWS item state
  const [towsType, setTowsType] = useState<'SO' | 'WO' | 'ST' | 'WT'>('SO');
  const [towsTitle, setTowsTitle] = useState('');
  const [towsDesc, setTowsDesc] = useState('');
  const [towsOwner, setTowsOwner] = useState('');
  const [towsMilestone, setTowsMilestone] = useState('');
  const [towsMetric, setTowsMetric] = useState('');

  // Validate internal vs external rule automatically
  const handleAddFactor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim() || !newEvidence.trim()) return;

    // Intelligent check: detect if user puts external words in internal or vice versa
    const lower = newText.toLowerCase();
    const externalKeywords = ['law', 'government', 'tax', 'competitor', 'rival', 'monsoon', 'market trend', 'interest rate', 'economy', 'platform'];
    const internalKeywords = ['our team', 'my staff', 'our product', 'our process', 'our cash', 'our website', 'our factory', 'in-house'];

    let warning = null;
    if ((newQuadrant === 'S' || newQuadrant === 'W') && externalKeywords.some(k => lower.includes(k))) {
      warning = 'Heuristic Alert: This factor appears to refer to external forces (regulation, rivals, market). Remember: If management cannot alter it directly by Friday afternoon, it belongs in Opportunities or Threats!';
    } else if ((newQuadrant === 'O' || newQuadrant === 'T') && internalKeywords.some(k => lower.includes(k))) {
      warning = 'Heuristic Alert: This factor appears internal to your firm (our team, our process). Remember: External factors are conditions in the market that occur regardless of your decisions.';
    }

    setValidationWarning(warning);

    const newFactor: SwotFactor = {
      id: Date.now().toString(),
      quadrant: newQuadrant,
      text: newText.trim(),
      evidence: newEvidence.trim(),
      impact: newImpact,
      probability: newProbability
    };

    setFactors(prev => [newFactor, ...prev]);
    setNewText('');
    setNewEvidence('');
  };

  const handleAddTows = (e: React.FormEvent) => {
    e.preventDefault();
    if (!towsTitle.trim() || !towsDesc.trim() || !towsOwner.trim()) return;

    const newStrategy: TowsStrategy = {
      id: Date.now().toString(),
      type: towsType,
      title: towsTitle.trim(),
      description: towsDesc.trim(),
      owner: towsOwner.trim(),
      milestone90d: towsMilestone.trim() || 'First pilot launch',
      metric: towsMetric.trim() || 'Measure defined'
    };

    setTows(prev => [newStrategy, ...prev]);
    setTowsTitle('');
    setTowsDesc('');
    setTowsOwner('');
    setTowsMilestone('');
    setTowsMetric('');
  };

  const deleteFactor = (id: string) => {
    setFactors(prev => prev.filter(f => f.id !== id));
  };

  const deleteTows = (id: string) => {
    setTows(prev => prev.filter(t => t.id !== id));
  };

  const loadPreset = (preset: 'kaveri' | 'blank') => {
    if (preset === 'kaveri') {
      setFactors(KAVERI_AGRO_FACTORS);
      setTows(KAVERI_AGRO_TOWS);
    } else {
      setFactors([]);
      setTows([]);
    }
  };

  const getQuadrantFactors = (q: 'S' | 'W' | 'O' | 'T') => factors.filter(f => f.quadrant === q);

  // Ranked factors by Impact x Probability
  const rankedFactors = [...factors].sort((a, b) => (b.impact * b.probability) - (a.impact * a.probability));

  return (
    <div className="space-y-6">
      {/* Top Banner & Context Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <span>Framework Sandbox</span>
            <span>·</span>
            <span>Internal / External Diagnostic</span>
            <span>·</span>
            <span>TOWS Action Engine</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Interactive SWOT & TOWS Strategy Canvas</h3>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Audit internal strengths and weaknesses against external market forces, enforce evidence tags, and generate actionable TOWS pairs.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => loadPreset('kaveri')}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Load Kaveri Agro Case
          </button>
          <button
            onClick={() => loadPreset('blank')}
            className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 bg-white border border-slate-200 rounded-lg transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>
      </div>

      {/* Mode Navigation */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg w-fit border border-slate-200">
        <button
          onClick={() => setActiveTab('grid')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
            activeTab === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          1. 2x2 Factor Grid ({factors.length})
        </button>
        <button
          onClick={() => setActiveTab('prioritize')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
            activeTab === 'prioritize' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          2. Prioritization Matrix (Score = I × P)
        </button>
        <button
          onClick={() => setActiveTab('tows')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
            activeTab === 'tows' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          3. TOWS Strategy Matrix ({tows.length})
        </button>
      </div>

      {/* Tab 1: 2x2 Factor Grid */}
      {activeTab === 'grid' && (
        <div className="space-y-6">
          {/* Add Factor Form */}
          <form onSubmit={handleAddFactor} className="p-5 bg-white border border-slate-200 rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Add Evidenced Strategic Factor</span>
              <span className="text-xs text-slate-500">Every factor must include a concrete evidence note</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              <div className="md:col-span-3">
                <label className="block text-xs font-medium text-slate-600 mb-1">Quadrant</label>
                <select
                  value={newQuadrant}
                  onChange={(e) => setNewQuadrant(e.target.value as any)}
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
                >
                  <option value="S">Strength (Internal · Positive)</option>
                  <option value="W">Weakness (Internal · Negative)</option>
                  <option value="O">Opportunity (External · Positive)</option>
                  <option value="T">Threat (External · Negative)</option>
                </select>
              </div>

              <div className="md:col-span-5">
                <label className="block text-xs font-medium text-slate-600 mb-1">Strategic Factor Statement</label>
                <input
                  type="text"
                  placeholder="e.g. 20-year established relationships with regional dealers"
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="md:col-span-4">
                <label className="block text-xs font-medium text-slate-600 mb-1">Evidence Tag (Data point / quote)</label>
                <input
                  type="text"
                  placeholder="e.g. Average tenure > 12 yrs; 85% shelf share"
                  value={newEvidence}
                  onChange={(e) => setNewEvidence(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600 font-medium">Impact (1-5):</span>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={newImpact}
                    onChange={(e) => setNewImpact(parseInt(e.target.value))}
                    className="w-20 accent-slate-900"
                  />
                  <span className="text-xs font-bold text-slate-900 tabular-nums">{newImpact}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600 font-medium">Certainty (1-5):</span>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={newProbability}
                    onChange={(e) => setNewProbability(parseInt(e.target.value))}
                    className="w-20 accent-slate-900"
                  />
                  <span className="text-xs font-bold text-slate-900 tabular-nums">{newProbability}</span>
                </div>
              </div>

              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Factor
              </button>
            </div>

            {validationWarning && (
              <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{validationWarning}</span>
              </div>
            )}
          </form>

          {/* 4 Quadrants Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* STRENGTHS */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <h4 className="text-sm font-bold text-slate-900">Strengths (Internal · Positive)</h4>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 tabular-nums">{getQuadrantFactors('S').length} items</span>
                </div>
                <p className="text-xs text-slate-500 mb-3">Internal assets, proprietary capabilities, and customer loyalty you directly control.</p>

                <div className="space-y-2.5">
                  {getQuadrantFactors('S').map(f => (
                    <div key={f.id} className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg flex items-start justify-between gap-2 group hover:border-slate-300 transition-colors">
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-slate-900">{f.text}</p>
                        <p className="text-xs text-slate-500 italic">Evidence: {f.evidence}</p>
                        <div className="flex items-center gap-2 text-2xs text-slate-600 pt-0.5">
                          <span>Impact: {f.impact}</span>
                          <span>·</span>
                          <span>Prob: {f.probability}</span>
                          <span>·</span>
                          <span className="font-semibold text-emerald-700">Score: {f.impact * f.probability}</span>
                        </div>
                      </div>
                      <button onClick={() => deleteFactor(f.id)} className="text-slate-400 hover:text-rose-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  {getQuadrantFactors('S').length === 0 && (
                    <div className="p-4 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-lg">No strengths listed yet.</div>
                  )}
                </div>
              </div>
            </div>

            {/* WEAKNESSES */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <h4 className="text-sm font-bold text-slate-900">Weaknesses (Internal · Negative)</h4>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 tabular-nums">{getQuadrantFactors('W').length} items</span>
                </div>
                <p className="text-xs text-slate-500 mb-3">Internal process gaps, resource limitations, or skills that put you at a disadvantage.</p>

                <div className="space-y-2.5">
                  {getQuadrantFactors('W').map(f => (
                    <div key={f.id} className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg flex items-start justify-between gap-2 group hover:border-slate-300 transition-colors">
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-slate-900">{f.text}</p>
                        <p className="text-xs text-slate-500 italic">Evidence: {f.evidence}</p>
                        <div className="flex items-center gap-2 text-2xs text-slate-600 pt-0.5">
                          <span>Impact: {f.impact}</span>
                          <span>·</span>
                          <span>Prob: {f.probability}</span>
                          <span>·</span>
                          <span className="font-semibold text-rose-700">Score: {f.impact * f.probability}</span>
                        </div>
                      </div>
                      <button onClick={() => deleteFactor(f.id)} className="text-slate-400 hover:text-rose-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  {getQuadrantFactors('W').length === 0 && (
                    <div className="p-4 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-lg">No weaknesses listed yet.</div>
                  )}
                </div>
              </div>
            </div>

            {/* OPPORTUNITIES */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    <h4 className="text-sm font-bold text-slate-900">Opportunities (External · Positive)</h4>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 tabular-nums">{getQuadrantFactors('O').length} items</span>
                </div>
                <p className="text-xs text-slate-500 mb-3">External macro shifts, customer tech adoption, or policy incentives you can seize.</p>

                <div className="space-y-2.5">
                  {getQuadrantFactors('O').map(f => (
                    <div key={f.id} className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg flex items-start justify-between gap-2 group hover:border-slate-300 transition-colors">
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-slate-900">{f.text}</p>
                        <p className="text-xs text-slate-500 italic">Evidence: {f.evidence}</p>
                        <div className="flex items-center gap-2 text-2xs text-slate-600 pt-0.5">
                          <span>Impact: {f.impact}</span>
                          <span>·</span>
                          <span>Prob: {f.probability}</span>
                          <span>·</span>
                          <span className="font-semibold text-blue-700">Score: {f.impact * f.probability}</span>
                        </div>
                      </div>
                      <button onClick={() => deleteFactor(f.id)} className="text-slate-400 hover:text-rose-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  {getQuadrantFactors('O').length === 0 && (
                    <div className="p-4 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-lg">No opportunities listed yet.</div>
                  )}
                </div>
              </div>
            </div>

            {/* THREATS */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <h4 className="text-sm font-bold text-slate-900">Threats (External · Negative)</h4>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 tabular-nums">{getQuadrantFactors('T').length} items</span>
                </div>
                <p className="text-xs text-slate-500 mb-3">External risks, competitor moves, new regulations, or weather shifts outside your control.</p>

                <div className="space-y-2.5">
                  {getQuadrantFactors('T').map(f => (
                    <div key={f.id} className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg flex items-start justify-between gap-2 group hover:border-slate-300 transition-colors">
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-slate-900">{f.text}</p>
                        <p className="text-xs text-slate-500 italic">Evidence: {f.evidence}</p>
                        <div className="flex items-center gap-2 text-2xs text-slate-600 pt-0.5">
                          <span>Impact: {f.impact}</span>
                          <span>·</span>
                          <span>Prob: {f.probability}</span>
                          <span>·</span>
                          <span className="font-semibold text-amber-700">Score: {f.impact * f.probability}</span>
                        </div>
                      </div>
                      <button onClick={() => deleteFactor(f.id)} className="text-slate-400 hover:text-rose-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  {getQuadrantFactors('T').length === 0 && (
                    <div className="p-4 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-lg">No threats listed yet.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Prioritization Matrix */}
      {activeTab === 'prioritize' && (
        <div className="space-y-5 bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h4 className="text-base font-bold text-slate-900">Prioritization Ranking Sheet (Impact × Probability)</h4>
              <p className="text-xs text-slate-500 mt-0.5">Avoid the common trap of 30 unranked factors. Cap your strategy workshop at the top 3-5 per quadrant.</p>
            </div>
            <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded">Formula: Score = I × P</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                  <th className="py-2.5 px-3">Rank</th>
                  <th className="py-2.5 px-3">Quadrant</th>
                  <th className="py-2.5 px-3">Strategic Factor</th>
                  <th className="py-2.5 px-3">Evidence Citation</th>
                  <th className="py-2.5 px-3 text-center">Impact (1-5)</th>
                  <th className="py-2.5 px-3 text-center">Certainty (1-5)</th>
                  <th className="py-2.5 px-3 text-center font-bold text-slate-900">Score</th>
                  <th className="py-2.5 px-3">Workshop Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-normal">
                {rankedFactors.map((f, idx) => {
                  const score = f.impact * f.probability;
                  const isTopPriority = idx < 5;
                  return (
                    <tr key={f.id} className={`hover:bg-slate-50/80 transition-colors ${isTopPriority ? 'bg-slate-50/40' : ''}`}>
                      <td className="py-3 px-3 font-bold text-slate-700 tabular-nums">#{idx + 1}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 text-2xs font-bold rounded ${
                          f.quadrant === 'S' ? 'bg-emerald-100 text-emerald-800' :
                          f.quadrant === 'W' ? 'bg-rose-100 text-rose-800' :
                          f.quadrant === 'O' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {f.quadrant === 'S' ? 'Strength' : f.quadrant === 'W' ? 'Weakness' : f.quadrant === 'O' ? 'Opportunity' : 'Threat'}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-medium text-slate-900 max-w-xs">{f.text}</td>
                      <td className="py-3 px-3 text-slate-500 italic max-w-xs">{f.evidence}</td>
                      <td className="py-3 px-3 text-center tabular-nums text-slate-700">{f.impact}</td>
                      <td className="py-3 px-3 text-center tabular-nums text-slate-700">{f.probability}</td>
                      <td className="py-3 px-3 text-center font-bold text-slate-900 tabular-nums text-sm">{score}</td>
                      <td className="py-3 px-3">
                        {isTopPriority ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-2xs">
                            <CheckCircle2 className="w-3.5 h-3.5" /> High Priority (Top 5)
                          </span>
                        ) : (
                          <span className="text-slate-400 text-2xs">Secondary / Parking Lot</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: TOWS Action Matrix */}
      {activeTab === 'tows' && (
        <div className="space-y-6">
          <div className="p-4 bg-slate-900 text-white rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold tracking-tight">The TOWS Action Layer</h4>
              <p className="text-xs text-slate-300 mt-0.5">
                SWOT alone is merely an audit. TOWS cross-matches quadrants to produce actual strategies with designated owners and 90-day milestones.
              </p>
            </div>
            <div className="flex items-center gap-2 text-2xs font-mono text-slate-400 shrink-0">
              <span>SO (Maxi-Maxi)</span>
              <span>·</span>
              <span>WO (Mini-Maxi)</span>
              <span>·</span>
              <span>ST (Maxi-Mini)</span>
              <span>·</span>
              <span>WT (Mini-Mini)</span>
            </div>
          </div>

          {/* Add TOWS Strategy Form */}
          <form onSubmit={handleAddTows} className="p-5 bg-white border border-slate-200 rounded-xl space-y-4 shadow-xs">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">Formulate New TOWS Strategy</span>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              <div className="md:col-span-3">
                <label className="block text-xs font-medium text-slate-600 mb-1">Strategy Type</label>
                <select
                  value={towsType}
                  onChange={(e) => setTowsType(e.target.value as any)}
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
                >
                  <option value="SO">SO: Leverage Strengths to Seize Opportunities</option>
                  <option value="WO">WO: Overcome Weaknesses to Pursue Opportunities</option>
                  <option value="ST">ST: Deploy Strengths to Blunt Threats</option>
                  <option value="WT">WT: Minimize Weaknesses & Avoid Threats</option>
                </select>
              </div>

              <div className="md:col-span-5">
                <label className="block text-xs font-medium text-slate-600 mb-1">Initiative Title</label>
                <input
                  type="text"
                  placeholder="e.g. WhatsApp Rapid Ordering with Pre-Approved Credit"
                  value={towsTitle}
                  onChange={(e) => setTowsTitle(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="md:col-span-4">
                <label className="block text-xs font-medium text-slate-600 mb-1">Assigned Owner</label>
                <input
                  type="text"
                  placeholder="e.g. Sales Head (Murugan)"
                  value={towsOwner}
                  onChange={(e) => setTowsOwner(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="md:col-span-6">
                <label className="block text-xs font-medium text-slate-600 mb-1">Cross-Matching Rationale</label>
                <textarea
                  rows={2}
                  placeholder="Explain which specific S/W pairs with which O/T to justify this project..."
                  value={towsDesc}
                  onChange={(e) => setTowsDesc(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-xs font-medium text-slate-600 mb-1">90-Day Milestone</label>
                <input
                  type="text"
                  placeholder="e.g. 30 dealers live on WhatsApp bot"
                  value={towsMilestone}
                  onChange={(e) => setTowsMilestone(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-xs font-medium text-slate-600 mb-1">Target Key Measure</label>
                <input
                  type="text"
                  placeholder="e.g. Order cycle < 4 hours"
                  value={towsMetric}
                  onChange={(e) => setTowsMetric(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                Add TOWS Strategy
              </button>
            </div>
          </form>

          {/* TOWS Matrix List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(['SO', 'WO', 'ST', 'WT'] as const).map(typeKey => {
              const items = tows.filter(t => t.type === typeKey);
              const label =
                typeKey === 'SO' ? 'SO Strategies (Maxi-Maxi: Strengths + Opportunities)' :
                typeKey === 'WO' ? 'WO Strategies (Mini-Maxi: Fix Weakness to Seize Opportunities)' :
                typeKey === 'ST' ? 'ST Strategies (Maxi-Mini: Use Strengths to Blunt Threats)' :
                'WT Strategies (Mini-Mini: Defend Weaknesses & Avoid Threats)';
              const badgeColor =
                typeKey === 'SO' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                typeKey === 'WO' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                typeKey === 'ST' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                'bg-slate-100 text-slate-800 border-slate-200';

              return (
                <div key={typeKey} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                      <span className={`px-2 py-0.5 text-2xs font-bold border rounded ${badgeColor}`}>{typeKey}</span>
                      <span className="text-xs text-slate-500 font-medium">{items.length} initiatives</span>
                    </div>
                    <h5 className="text-xs font-bold text-slate-800 mb-2">{label}</h5>

                    <div className="space-y-3">
                      {items.map(item => (
                        <div key={item.id} className="p-3 bg-slate-50 border border-slate-200/90 rounded-lg space-y-2 group">
                          <div className="flex items-start justify-between gap-2">
                            <h6 className="text-xs font-bold text-slate-900">{item.title}</h6>
                            <button onClick={() => deleteTows(item.id)} className="text-slate-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-xs text-slate-600">{item.description}</p>
                          <div className="pt-2 border-t border-slate-200/60 grid grid-cols-2 gap-2 text-2xs text-slate-600">
                            <div>
                              <span className="font-semibold text-slate-800">Owner:</span> {item.owner}
                            </div>
                            <div>
                              <span className="font-semibold text-slate-800">Measure:</span> {item.metric}
                            </div>
                            <div className="col-span-2 text-slate-500 italic">
                              <span className="font-semibold text-slate-700 not-italic">90-Day Milestone:</span> {item.milestone90d}
                            </div>
                          </div>
                        </div>
                      ))}
                      {items.length === 0 && (
                        <div className="p-4 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-lg">
                          No {typeKey} initiatives generated yet.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
