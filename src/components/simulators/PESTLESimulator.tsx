import { useState } from 'react';
import { Plus, Trash2, ArrowUpRight, ArrowDownRight, Minus, AlertTriangle, Eye, ShieldCheck, Sparkles, RotateCcw } from 'lucide-react';

export interface PestleDriver {
  id: string;
  category: 'Political' | 'Economic' | 'Social' | 'Technological' | 'Legal' | 'Environmental';
  name: string;
  source: string;
  direction: 'Rising' | 'Falling' | 'Stable' | 'Seasonal';
  timing: '0-12 months' | '1-3 years' | '3+ years';
  impact: number; // 1-5
  certainty: number; // 1-5
  proposedResponse: string;
}

const SIVAKASI_PRESET: PestleDriver[] = [
  {
    id: 'p-1',
    category: 'Legal',
    name: 'Supreme Court green-cracker & barium chemical packaging compliance order',
    source: 'Supreme Court of India Gazette / State Pollution Control Board',
    direction: 'Rising',
    timing: '0-12 months',
    impact: 5,
    certainty: 5,
    proposedResponse: 'Immediately mandate QR-code green-cracker certification labels on all cartons; audit partner inks'
  },
  {
    id: 'p-2',
    category: 'Technological',
    name: 'E-commerce automated carton packaging growth across South Indian hubs',
    source: 'India Warehousing & Logistics Association Annual Report',
    direction: 'Rising',
    timing: '0-12 months',
    impact: 4,
    certainty: 5,
    proposedResponse: 'Invest ₹2.4 Cr in high-speed 3-ply corrugated box manufacturing line'
  },
  {
    id: 'p-3',
    category: 'Environmental',
    name: 'FMCG clients requiring 100% FSC-certified sustainable pulp sourcing',
    source: 'FMCG Client Procurement Code of Conduct mandate',
    direction: 'Rising',
    timing: '1-3 years',
    impact: 4,
    certainty: 4,
    proposedResponse: 'Obtain Chain of Custody FSC certification ahead of deadline to defend ₹6 Cr contract'
  },
  {
    id: 'p-4',
    category: 'Legal',
    name: 'Extended Producer Responsibility (EPR) penalties on laminated flexible plastic wrappers',
    source: 'Ministry of Environment, Forest & Climate Change notification',
    direction: 'Rising',
    timing: '1-3 years',
    impact: 4,
    certainty: 3,
    proposedResponse: 'Place on active Watch List; begin R&D testing with water-soluble barrier coatings'
  },
  {
    id: 'p-5',
    category: 'Economic',
    name: 'Imported virgin kraft paper raw material price volatility (+18% spikes)',
    source: 'Paper Traders Association Commodity Price Index',
    direction: 'Rising',
    timing: '0-12 months',
    impact: 3,
    certainty: 4,
    proposedResponse: 'Negotiate quarterly fixed-rate index contracts with domestic recycled mills'
  },
  {
    id: 'p-6',
    category: 'Social',
    name: 'Consumer and municipal shift toward localized, low-smoke festival celebrations',
    source: 'Urban Consumer Sentiment Survey (Chennai/Bangalore)',
    direction: 'Falling',
    timing: '3+ years',
    impact: 3,
    certainty: 3,
    proposedResponse: 'Cap firecracker packaging revenue at 40% of total firm revenue over 3 years'
  },
  {
    id: 'p-7',
    category: 'Political',
    name: 'State MSME capital subsidy for solar rooftop industrial machinery conversion',
    source: 'Tamil Nadu Energy Development Agency (TEDA) scheme',
    direction: 'Rising',
    timing: '0-12 months',
    impact: 3,
    certainty: 4,
    proposedResponse: 'Apply for 25% capital subsidy on 200kW rooftop installation to curb power tariffs'
  }
];

export function PESTLESimulator() {
  const [drivers, setDrivers] = useState<PestleDriver[]>(SIVAKASI_PRESET);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'register' | 'heatmap' | 'swotExport'>('register');

  // New Driver Form States
  const [category, setCategory] = useState<PestleDriver['category']>('Political');
  const [name, setName] = useState('');
  const [source, setSource] = useState('');
  const [direction, setDirection] = useState<PestleDriver['direction']>('Rising');
  const [timing, setTiming] = useState<PestleDriver['timing']>('0-12 months');
  const [impact, setImpact] = useState(4);
  const [certainty, setCertainty] = useState(4);
  const [proposedResponse, setProposedResponse] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !source.trim()) return;

    const newDriver: PestleDriver = {
      id: Date.now().toString(),
      category,
      name: name.trim(),
      source: source.trim(),
      direction,
      timing,
      impact,
      certainty,
      proposedResponse: proposedResponse.trim() || 'Monitor quarterly'
    };

    setDrivers(prev => [newDriver, ...prev]);
    setName('');
    setSource('');
    setProposedResponse('');
  };

  const deleteDriver = (id: string) => {
    setDrivers(prev => prev.filter(d => d.id !== id));
  };

  const filteredDrivers = selectedCategory === 'All'
    ? drivers
    : drivers.filter(d => d.category === selectedCategory);

  // Heat map categorization
  const highPriorityDrivers = drivers.filter(d => (d.impact * d.certainty) >= 16);
  const watchListDrivers = drivers.filter(d => {
    const s = d.impact * d.certainty;
    return s >= 9 && s < 16;
  });
  const loggedDrivers = drivers.filter(d => (d.impact * d.certainty) < 9);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <span>Macro-Environmental Scanner</span>
            <span>·</span>
            <span>3-10 Year Horizon</span>
            <span>·</span>
            <span>Heat-Map Rule: I × C ≥ 16</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">PESTLE Macro-Driver Register & Heat-Map</h3>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Scan external drivers across Political, Economic, Social, Technological, Legal, and Environmental dimensions with primary citations and automatic triage.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setDrivers(SIVAKASI_PRESET)}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Load Sivakasi Print Case
          </button>
          <button
            onClick={() => setDrivers([])}
            className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 bg-white border border-slate-200 rounded-lg transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>
      </div>

      {/* Tabs and Triage Summary */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200">
          <button
            onClick={() => setViewMode('register')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
              viewMode === 'register' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            1. Driver Register ({drivers.length})
          </button>
          <button
            onClick={() => setViewMode('heatmap')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
              viewMode === 'heatmap' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2. Heat-Map Triage Matrix
          </button>
          <button
            onClick={() => setViewMode('swotExport')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
              viewMode === 'swotExport' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            3. Export to SWOT O/T ({highPriorityDrivers.length})
          </button>
        </div>

        {/* Triage Count Chips */}
        <div className="flex items-center gap-3 text-xs">
          <span className="text-rose-700 font-semibold flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" /> {highPriorityDrivers.length} Action Needed (≥16)
          </span>
          <span className="text-slate-300">·</span>
          <span className="text-amber-700 font-semibold flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" /> {watchListDrivers.length} Watch List (9-15)
          </span>
          <span className="text-slate-300">·</span>
          <span className="text-slate-600 font-medium flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> {loggedDrivers.length} Logged (≤8)
          </span>
        </div>
      </div>

      {/* Tab 1: Driver Register */}
      {viewMode === 'register' && (
        <div className="space-y-6">
          {/* Add Form */}
          <form onSubmit={handleAdd} className="p-5 bg-white border border-slate-200 rounded-xl space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Log Sourced Macro Driver</span>
              <span className="text-xs text-slate-500">Must cite an empirical primary document or regulator</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              <div className="md:col-span-3">
                <label className="block text-xs font-medium text-slate-600 mb-1">Dimension</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
                >
                  <option value="Political">Political (Policy / Subsidies / Trade)</option>
                  <option value="Economic">Economic (Inflation / Forex / Capex)</option>
                  <option value="Social">Social (Demographics / Values / Habits)</option>
                  <option value="Technological">Technological (AI / Automation / R&D)</option>
                  <option value="Legal">Legal (Laws / Compliance / Standards)</option>
                  <option value="Environmental">Environmental (Climate / ESG / Resources)</option>
                </select>
              </div>

              <div className="md:col-span-5">
                <label className="block text-xs font-medium text-slate-600 mb-1">Driver Description (Specific Event)</label>
                <input
                  type="text"
                  placeholder="e.g. Central Bank lowers MSME repo rate by 50 bps"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="md:col-span-4">
                <label className="block text-xs font-medium text-slate-600 mb-1">Primary Source Citation</label>
                <input
                  type="text"
                  placeholder="e.g. RBI Monetary Policy Gazette / Ministry Notice"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-xs font-medium text-slate-600 mb-1">Trend Direction</label>
                <select
                  value={direction}
                  onChange={(e) => setDirection(e.target.value as any)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
                >
                  <option value="Rising">Rising ↑</option>
                  <option value="Falling">Falling ↓</option>
                  <option value="Stable">Stable →</option>
                  <option value="Seasonal">Seasonal ~</option>
                </select>
              </div>

              <div className="md:col-span-3">
                <label className="block text-xs font-medium text-slate-600 mb-1">Time Horizon</label>
                <select
                  value={timing}
                  onChange={(e) => setTiming(e.target.value as any)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
                >
                  <option value="0-12 months">0-12 months (Immediate)</option>
                  <option value="1-3 years">1-3 years (Medium-term)</option>
                  <option value="3+ years">3+ years (Long-range)</option>
                </select>
              </div>

              <div className="md:col-span-6">
                <label className="block text-xs font-medium text-slate-600 mb-1">Proposed Strategic Response</label>
                <input
                  type="text"
                  placeholder="e.g. Audit supplier contracts; lock in fixed-rate borrowing"
                  value={proposedResponse}
                  onChange={(e) => setProposedResponse(e.target.value)}
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
                    value={impact}
                    onChange={(e) => setImpact(parseInt(e.target.value))}
                    className="w-20 accent-slate-900"
                  />
                  <span className="text-xs font-bold text-slate-900 tabular-nums">{impact}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600 font-medium">Certainty (1-5):</span>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={certainty}
                    onChange={(e) => setCertainty(parseInt(e.target.value))}
                    className="w-20 accent-slate-900"
                  />
                  <span className="text-xs font-bold text-slate-900 tabular-nums">{certainty}</span>
                </div>

                <div className="text-xs font-bold text-slate-900 tabular-nums">
                  Score: <span className="text-sm">{impact * certainty}</span> / 25
                </div>
              </div>

              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Driver
              </button>
            </div>
          </form>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {['All', 'Political', 'Economic', 'Social', 'Technological', 'Legal', 'Environmental'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 font-medium rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === cat ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Register Table */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3">Specific Driver</th>
                    <th className="py-2.5 px-3">Primary Source</th>
                    <th className="py-2.5 px-3 text-center">Dir</th>
                    <th className="py-2.5 px-3">Timing</th>
                    <th className="py-2.5 px-3 text-center">I × C</th>
                    <th className="py-2.5 px-3">Action Threshold</th>
                    <th className="py-2.5 px-3">Proposed Response</th>
                    <th className="py-2.5 px-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredDrivers.map(d => {
                    const score = d.impact * d.certainty;
                    const isAction = score >= 16;
                    const isWatch = score >= 9 && score < 16;

                    return (
                      <tr key={d.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-3">
                          <span className="font-semibold text-slate-900">{d.category}</span>
                        </td>
                        <td className="py-3 px-3 font-medium text-slate-900 max-w-xs">{d.name}</td>
                        <td className="py-3 px-3 text-slate-500 italic max-w-xs">{d.source}</td>
                        <td className="py-3 px-3 text-center">
                          {d.direction === 'Rising' && <ArrowUpRight className="w-4 h-4 text-emerald-600 inline" />}
                          {d.direction === 'Falling' && <ArrowDownRight className="w-4 h-4 text-rose-600 inline" />}
                          {d.direction === 'Stable' && <Minus className="w-4 h-4 text-slate-400 inline" />}
                          {d.direction === 'Seasonal' && <span className="text-amber-600 font-bold">~</span>}
                        </td>
                        <td className="py-3 px-3 text-slate-600 whitespace-nowrap">{d.timing}</td>
                        <td className="py-3 px-3 text-center font-bold text-slate-900 tabular-nums">
                          {d.impact} × {d.certainty} = <span className="text-sm">{score}</span>
                        </td>
                        <td className="py-3 px-3">
                          {isAction && (
                            <span className="text-rose-700 font-bold text-2xs inline-flex items-center gap-1">
                              <AlertTriangle className="w-3.5 h-3.5" /> Action Required (Qtr)
                            </span>
                          )}
                          {isWatch && (
                            <span className="text-amber-700 font-semibold text-2xs inline-flex items-center gap-1">
                              <Eye className="w-3.5 h-3.5" /> Watch List
                            </span>
                          )}
                          {!isAction && !isWatch && (
                            <span className="text-slate-400 text-2xs">Logged Only</span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-slate-700 max-w-xs">{d.proposedResponse}</td>
                        <td className="py-3 px-3 text-center">
                          <button onClick={() => deleteDriver(d.id)} className="text-slate-400 hover:text-rose-600 p-1 transition-colors">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Heatmap Visual Matrix */}
      {viewMode === 'heatmap' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h4 className="text-base font-bold text-slate-900">PESTLE 2D Heat-Map Matrix (Impact vs Certainty)</h4>
              <p className="text-xs text-slate-500 mt-0.5">High Certainty + High Impact drivers demand executive owner assignment this quarter.</p>
            </div>
            <div className="text-xs font-mono text-slate-500">Threshold: Score ≥ 16</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Action Needed Tier */}
            <div className="p-4 bg-rose-50/60 border border-rose-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-rose-200">
                <div className="flex items-center gap-1.5 text-rose-800 font-bold text-xs uppercase tracking-wide">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Immediate Action (Score ≥ 16)</span>
                </div>
                <span className="text-xs font-bold text-rose-900 tabular-nums">{highPriorityDrivers.length}</span>
              </div>
              <p className="text-xs text-rose-700">Must be assigned to a designated sponsor with budget this quarter.</p>
              <div className="space-y-2">
                {highPriorityDrivers.map(d => (
                  <div key={d.id} className="p-2.5 bg-white border border-rose-200 rounded-lg shadow-2xs space-y-1">
                    <div className="flex items-center justify-between text-2xs">
                      <span className="font-bold text-rose-900">{d.category} · {d.timing}</span>
                      <span className="font-mono font-bold text-rose-700 tabular-nums">{d.impact * d.certainty} pts</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-900">{d.name}</p>
                    <p className="text-2xs text-slate-600 italic">Response: {d.proposedResponse}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Watch List Tier */}
            <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-amber-200">
                <div className="flex items-center gap-1.5 text-amber-800 font-bold text-xs uppercase tracking-wide">
                  <Eye className="w-4 h-4 text-amber-600" />
                  <span>Watch List (Score 9–15)</span>
                </div>
                <span className="text-xs font-bold text-amber-900 tabular-nums">{watchListDrivers.length}</span>
              </div>
              <p className="text-xs text-amber-700">Review quarterly; identify what evidence would raise certainty.</p>
              <div className="space-y-2">
                {watchListDrivers.map(d => (
                  <div key={d.id} className="p-2.5 bg-white border border-amber-200 rounded-lg shadow-2xs space-y-1">
                    <div className="flex items-center justify-between text-2xs">
                      <span className="font-bold text-amber-900">{d.category} · {d.timing}</span>
                      <span className="font-mono font-bold text-amber-700 tabular-nums">{d.impact * d.certainty} pts</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-900">{d.name}</p>
                    <p className="text-2xs text-slate-600 italic">Response: {d.proposedResponse}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Logged Only Tier */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div className="flex items-center gap-1.5 text-slate-700 font-bold text-xs uppercase tracking-wide">
                  <ShieldCheck className="w-4 h-4 text-slate-500" />
                  <span>Logged Only (Score ≤ 8)</span>
                </div>
                <span className="text-xs font-bold text-slate-900 tabular-nums">{loggedDrivers.length}</span>
              </div>
              <p className="text-xs text-slate-500">Documented in register; no active resourcing required.</p>
              <div className="space-y-2">
                {loggedDrivers.map(d => (
                  <div key={d.id} className="p-2.5 bg-white border border-slate-200 rounded-lg shadow-2xs space-y-1">
                    <div className="flex items-center justify-between text-2xs">
                      <span className="font-bold text-slate-700">{d.category} · {d.timing}</span>
                      <span className="font-mono font-bold text-slate-500 tabular-nums">{d.impact * d.certainty} pts</span>
                    </div>
                    <p className="text-xs font-medium text-slate-800">{d.name}</p>
                  </div>
                ))}
                {loggedDrivers.length === 0 && (
                  <div className="p-4 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-lg">
                    No low-score drivers logged.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Export to SWOT Opportunities & Threats */}
      {viewMode === 'swotExport' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h4 className="text-base font-bold text-slate-900">Convert High-Scoring PESTLE Drivers to SWOT Inputs</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                The natural downstream bridge: High-impact macro drivers directly populate SWOT Opportunities and Threats with defensible citations.
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">Bridge Integration</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-4 bg-blue-50/50 border border-blue-200 rounded-xl space-y-3">
              <h5 className="text-xs font-bold text-blue-900 uppercase tracking-wide">Macro Opportunities for SWOT</h5>
              <p className="text-xs text-blue-700">Positive drivers where favorable macro trends create openings.</p>
              <div className="space-y-2.5">
                {drivers.filter(d => (d.category === 'Technological' || d.category === 'Political') && d.direction === 'Rising').map(d => (
                  <div key={d.id} className="p-3 bg-white border border-blue-200 rounded-lg text-xs space-y-1">
                    <span className="font-bold text-blue-900">{d.name}</span>
                    <p className="text-2xs text-slate-500">Source: {d.source}</p>
                    <p className="text-2xs font-mono text-emerald-700">SWOT Phrasing: "{d.name} enables new channel expansion"</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-xl space-y-3">
              <h5 className="text-xs font-bold text-amber-900 uppercase tracking-wide">Macro Threats for SWOT</h5>
              <p className="text-xs text-amber-700">Adverse drivers (regulations, material costs, consumer decline).</p>
              <div className="space-y-2.5">
                {drivers.filter(d => d.category === 'Legal' || d.category === 'Environmental' || d.direction === 'Falling').map(d => (
                  <div key={d.id} className="p-3 bg-white border border-amber-200 rounded-lg text-xs space-y-1">
                    <span className="font-bold text-amber-900">{d.name}</span>
                    <p className="text-2xs text-slate-500">Source: {d.source}</p>
                    <p className="text-2xs font-mono text-rose-700">SWOT Phrasing: "{d.name} increases compliance overhead"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
