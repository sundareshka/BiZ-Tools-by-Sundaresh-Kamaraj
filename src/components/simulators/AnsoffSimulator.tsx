import { useState } from 'react';
import { Plus, Trash2, ShieldAlert, Sparkles, RotateCcw, CheckCircle2, ArrowRight } from 'lucide-react';

interface AnsoffInitiative {
  id: string;
  title: string;
  quadrant: 'penetration' | 'market_dev' | 'product_dev' | 'diversification';
  capabilityFit: number; // 1-5
  investmentLakhs: number;
  timeToRevenueMonths: number;
  risk: 'Low' | 'Medium' | 'High';
  priorityOrder: number;
  stageGateCondition: string;
}

const COIMBATORE_MOTOR_INITIATIVES: AnsoffInitiative[] = [
  {
    id: 'a-1',
    title: 'Service Franchise Network for Existing Pumps',
    quadrant: 'penetration',
    capabilityFit: 5,
    investmentLakhs: 15,
    timeToRevenueMonths: 2,
    risk: 'Low',
    priorityOrder: 1,
    stageGateCondition: 'Fund immediately: establishes recurring maintenance revenue with 60% gross margin'
  },
  {
    id: 'a-2',
    title: 'Dealer WhatsApp Direct Ordering Channel',
    quadrant: 'penetration',
    capabilityFit: 5,
    investmentLakhs: 5,
    timeToRevenueMonths: 1,
    risk: 'Low',
    priorityOrder: 2,
    stageGateCondition: 'Fund immediately: cuts order friction for current 40 dealers'
  },
  {
    id: 'a-3',
    title: 'Solar Agricultural Pump Kits (Bundled)',
    quadrant: 'product_dev',
    capabilityFit: 4,
    investmentLakhs: 60,
    timeToRevenueMonths: 6,
    risk: 'Medium',
    priorityOrder: 3,
    stageGateCondition: 'Fund in Year 1: sell through existing dealer trust once penetration cashflow is stable'
  },
  {
    id: 'a-4',
    title: 'East Africa Pump Exports via Kenyan Distributor',
    quadrant: 'market_dev',
    capabilityFit: 3,
    investmentLakhs: 35,
    timeToRevenueMonths: 9,
    risk: 'Medium',
    priorityOrder: 4,
    stageGateCondition: 'Fund in Year 2: requires proven distributor partner with letter of credit'
  },
  {
    id: 'a-5',
    title: 'Heavy Industrial Process Motors',
    quadrant: 'market_dev',
    capabilityFit: 2,
    investmentLakhs: 120,
    timeToRevenueMonths: 14,
    risk: 'High',
    priorityOrder: 5,
    stageGateCondition: 'Defer: lacks B2B enterprise sales force and application engineering'
  },
  {
    id: 'a-6',
    title: 'Grid Battery Storage Joint Venture',
    quadrant: 'diversification',
    capabilityFit: 1,
    investmentLakhs: 250,
    timeToRevenueMonths: 18,
    risk: 'High',
    priorityOrder: 6,
    stageGateCondition: 'Freeze: unrelated diversification with zero synergy; high balance-sheet risk'
  }
];

export function AnsoffSimulator() {
  const [initiatives, setInitiatives] = useState<AnsoffInitiative[]>(COIMBATORE_MOTOR_INITIATIVES);
  const [existingProductDef, setExistingProductDef] = useState('Submersible pump motors up to 15 HP for agricultural water applications');
  const [existingMarketDef, setExistingMarketDef] = useState('Farming communities in Tamil Nadu & Karnataka reached via authorized dealer showrooms');

  // New initiative state
  const [title, setTitle] = useState('');
  const [quadrant, setQuadrant] = useState<AnsoffInitiative['quadrant']>('penetration');
  const [capabilityFit, setCapabilityFit] = useState(4);
  const [investmentLakhs, setInvestmentLakhs] = useState(25);
  const [timeMonths, setTimeMonths] = useState(3);
  const [stageGate, setStageGate] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const risk: AnsoffInitiative['risk'] =
      quadrant === 'penetration' ? 'Low' :
      quadrant === 'diversification' ? 'High' : 'Medium';

    const newInit: AnsoffInitiative = {
      id: Date.now().toString(),
      title: title.trim(),
      quadrant,
      capabilityFit,
      investmentLakhs,
      timeToRevenueMonths: timeMonths,
      risk,
      priorityOrder: initiatives.length + 1,
      stageGateCondition: stageGate.trim() || 'Stage gate review after 90 days'
    };

    setInitiatives(prev => [...prev, newInit]);
    setTitle('');
    setStageGate('');
  };

  const deleteInit = (id: string) => {
    setInitiatives(prev => prev.filter(i => i.id !== id));
  };

  const getQuadrantItems = (q: AnsoffInitiative['quadrant']) => initiatives.filter(i => i.quadrant === q);

  // Automated Sequencing Analysis
  const hasDiversification = initiatives.some(i => i.quadrant === 'diversification');
  const penetrationCount = initiatives.filter(i => i.quadrant === 'penetration').length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <span>Product-Market Growth Grid</span>
            <span>·</span>
            <span>Igor Ansoff Framework</span>
            <span>·</span>
            <span>Staged Risk & Capital Sequencing</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Ansoff Matrix & Growth Sequencing Engine</h3>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Classify growth avenues by product and market newness, score internal capability fit, and sequence funding so safe cashflows finance higher-risk moves.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setInitiatives(COIMBATORE_MOTOR_INITIATIVES)}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Load Coimbatore Motor Case
          </button>
          <button
            onClick={() => setInitiatives([])}
            className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 bg-white border border-slate-200 rounded-lg transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>
      </div>

      {/* Step 0: Written Boundary Definitions */}
      <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 shadow-xs">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Step 1: Write Formal Boundary Definitions Before Plotting
          </span>
          <span className="text-2xs text-slate-500">Crucial: Never plot without defining what is "Existing"</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              "Existing Product" Definition (Form, technology, price tier)
            </label>
            <input
              type="text"
              value={existingProductDef}
              onChange={(e) => setExistingProductDef(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              "Existing Market" Definition (Geography, customer persona, channel)
            </label>
            <input
              type="text"
              value={existingMarketDef}
              onChange={(e) => setExistingMarketDef(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 font-medium"
            />
          </div>
        </div>
      </div>

      {/* Add Form */}
      <form onSubmit={handleAdd} className="p-5 bg-white border border-slate-200 rounded-xl space-y-4 shadow-xs">
        <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">Add Growth Initiative to Matrix</span>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-3">
            <label className="block text-xs font-medium text-slate-600 mb-1">Target Quadrant</label>
            <select
              value={quadrant}
              onChange={(e) => setQuadrant(e.target.value as any)}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              <option value="penetration">1. Market Penetration (Exist Prod / Exist Mkt · Low Risk)</option>
              <option value="product_dev">2. Product Development (New Prod / Exist Mkt · Med Risk)</option>
              <option value="market_dev">3. Market Development (Exist Prod / New Mkt · Med Risk)</option>
              <option value="diversification">4. Diversification (New Prod / New Mkt · High Risk)</option>
            </select>
          </div>

          <div className="md:col-span-5">
            <label className="block text-xs font-medium text-slate-600 mb-1">Initiative Name</label>
            <input
              type="text"
              placeholder="e.g. Solar agricultural pump kits bundled with warranty"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div className="md:col-span-4">
            <label className="block text-xs font-medium text-slate-600 mb-1">Stage-Gate Milestone</label>
            <input
              type="text"
              placeholder="e.g. Fund only after reaching 50 dealer orders"
              value={stageGate}
              onChange={(e) => setStageGate(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div className="md:col-span-4 flex items-center gap-2 pt-1">
            <span className="text-xs text-slate-600 font-medium">Capability Fit (1-5):</span>
            <input
              type="range"
              min="1"
              max="5"
              value={capabilityFit}
              onChange={(e) => setCapabilityFit(parseInt(e.target.value))}
              className="w-20 accent-slate-900"
            />
            <span className="text-xs font-bold text-slate-900 tabular-nums">{capabilityFit}/5</span>
          </div>

          <div className="md:col-span-4 flex items-center gap-2 pt-1">
            <span className="text-xs text-slate-600 font-medium">Capex (₹ Lakh):</span>
            <input
              type="number"
              value={investmentLakhs}
              onChange={(e) => setInvestmentLakhs(parseInt(e.target.value) || 0)}
              className="w-20 text-xs bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-900 tabular-nums"
            />
          </div>

          <div className="md:col-span-4 flex items-center justify-end pt-1">
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Plot Initiative
            </button>
          </div>
        </div>
      </form>

      {/* The 2x2 Ansoff Matrix Visualization */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">The Product-Market Expansion 2×2 Grid</h4>
            <p className="text-xs text-slate-500 mt-0.5">Risk escalates diagonally from Top-Left to Bottom-Right.</p>
          </div>
          <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-1 rounded">
            Total Initiatives: {initiatives.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Top-Left: Market Penetration */}
          <div className="p-4 bg-emerald-50/40 border border-emerald-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 text-2xs font-bold bg-emerald-100 text-emerald-800 rounded">
                MARKET PENETRATION
              </span>
              <span className="text-2xs font-semibold text-emerald-700">Lowest Risk · Existing / Existing</span>
            </div>
            <p className="text-xs text-slate-600">Sell more current products to current customers (wallet share, frequency, retention).</p>

            <div className="space-y-2">
              {getQuadrantItems('penetration').map(item => (
                <div key={item.id} className="p-3 bg-white border border-emerald-200 rounded-lg shadow-2xs space-y-1 group">
                  <div className="flex items-start justify-between gap-2">
                    <h5 className="text-xs font-bold text-slate-900">{item.title}</h5>
                    <button onClick={() => deleteInit(item.id)} className="text-slate-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-2xs text-slate-500">
                    <span>Fit: {item.capabilityFit}/5</span>
                    <span>·</span>
                    <span>₹{item.investmentLakhs}L</span>
                    <span>·</span>
                    <span>{item.timeToRevenueMonths} mo to rev</span>
                  </div>
                  <p className="text-2xs text-emerald-800 italic">{item.stageGateCondition}</p>
                </div>
              ))}
              {getQuadrantItems('penetration').length === 0 && (
                <div className="p-4 text-center text-xs text-slate-400 border border-dashed border-emerald-200 rounded-lg">
                  No penetration initiatives plotted.
                </div>
              )}
            </div>
          </div>

          {/* Top-Right: Product Development */}
          <div className="p-4 bg-blue-50/40 border border-blue-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 text-2xs font-bold bg-blue-100 text-blue-800 rounded">
                PRODUCT DEVELOPMENT
              </span>
              <span className="text-2xs font-semibold text-blue-700">Moderate Risk · New Prod / Exist Mkt</span>
            </div>
            <p className="text-xs text-slate-600">Create new products or bundles for established customer base (unknown = product).</p>

            <div className="space-y-2">
              {getQuadrantItems('product_dev').map(item => (
                <div key={item.id} className="p-3 bg-white border border-blue-200 rounded-lg shadow-2xs space-y-1 group">
                  <div className="flex items-start justify-between gap-2">
                    <h5 className="text-xs font-bold text-slate-900">{item.title}</h5>
                    <button onClick={() => deleteInit(item.id)} className="text-slate-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-2xs text-slate-500">
                    <span>Fit: {item.capabilityFit}/5</span>
                    <span>·</span>
                    <span>₹{item.investmentLakhs}L</span>
                    <span>·</span>
                    <span>{item.timeToRevenueMonths} mo to rev</span>
                  </div>
                  <p className="text-2xs text-blue-800 italic">{item.stageGateCondition}</p>
                </div>
              ))}
              {getQuadrantItems('product_dev').length === 0 && (
                <div className="p-4 text-center text-xs text-slate-400 border border-dashed border-blue-200 rounded-lg">
                  No product development initiatives plotted.
                </div>
              )}
            </div>
          </div>

          {/* Bottom-Left: Market Development */}
          <div className="p-4 bg-amber-50/40 border border-amber-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 text-2xs font-bold bg-amber-100 text-amber-800 rounded">
                MARKET DEVELOPMENT
              </span>
              <span className="text-2xs font-semibold text-amber-700">Moderate Risk · Exist Prod / New Mkt</span>
            </div>
            <p className="text-xs text-slate-600">Take proven core product to new geographies or customer channels (unknown = customer).</p>

            <div className="space-y-2">
              {getQuadrantItems('market_dev').map(item => (
                <div key={item.id} className="p-3 bg-white border border-amber-200 rounded-lg shadow-2xs space-y-1 group">
                  <div className="flex items-start justify-between gap-2">
                    <h5 className="text-xs font-bold text-slate-900">{item.title}</h5>
                    <button onClick={() => deleteInit(item.id)} className="text-slate-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-2xs text-slate-500">
                    <span>Fit: {item.capabilityFit}/5</span>
                    <span>·</span>
                    <span>₹{item.investmentLakhs}L</span>
                    <span>·</span>
                    <span>{item.timeToRevenueMonths} mo to rev</span>
                  </div>
                  <p className="text-2xs text-amber-800 italic">{item.stageGateCondition}</p>
                </div>
              ))}
              {getQuadrantItems('market_dev').length === 0 && (
                <div className="p-4 text-center text-xs text-slate-400 border border-dashed border-amber-200 rounded-lg">
                  No market development initiatives plotted.
                </div>
              )}
            </div>
          </div>

          {/* Bottom-Right: Diversification */}
          <div className="p-4 bg-rose-50/40 border border-rose-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 text-2xs font-bold bg-rose-100 text-rose-800 rounded">
                DIVERSIFICATION
              </span>
              <span className="text-2xs font-semibold text-rose-700">Highest Risk · New Prod / New Mkt</span>
            </div>
            <p className="text-xs text-slate-600">New offerings to new buyers. Highest failure rate; only pursue via joint venture or acquisition.</p>

            <div className="space-y-2">
              {getQuadrantItems('diversification').map(item => (
                <div key={item.id} className="p-3 bg-white border border-rose-200 rounded-lg shadow-2xs space-y-1 group">
                  <div className="flex items-start justify-between gap-2">
                    <h5 className="text-xs font-bold text-slate-900">{item.title}</h5>
                    <button onClick={() => deleteInit(item.id)} className="text-slate-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-2xs text-slate-500">
                    <span>Fit: {item.capabilityFit}/5</span>
                    <span>·</span>
                    <span>₹{item.investmentLakhs}L</span>
                    <span>·</span>
                    <span>{item.timeToRevenueMonths} mo to rev</span>
                  </div>
                  <p className="text-2xs text-rose-800 italic">{item.stageGateCondition}</p>
                </div>
              ))}
              {getQuadrantItems('diversification').length === 0 && (
                <div className="p-4 text-center text-xs text-slate-400 border border-dashed border-rose-200 rounded-lg">
                  No diversification initiatives plotted.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Staged Sequencing Engine */}
      <div className="p-5 bg-slate-900 text-white rounded-xl shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Ansoff Capital Sequencing & Stage-Gate Recommendation
          </span>
          <span className="text-2xs text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Golden Rule: Penetration Profits Fund Risky Expansion
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Order of Funding: <span className="text-white font-bold">1. Market Penetration</span> (secure immediate cash) → <span className="text-white font-bold">2. Product or Market Dev</span> with highest capability fit (≥4/5) → <span className="text-white font-bold">3. Secondary Dev Route</span> → <span className="text-rose-300 font-bold">4. Diversification</span> only via partner or acquisition.
        </p>

        {hasDiversification && penetrationCount === 0 && (
          <div className="p-3 bg-rose-950/80 border border-rose-700 rounded-lg text-xs text-rose-200 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>
              Strategic Violation: You have plotted Diversification initiatives without any Market Penetration moves. Igor Ansoff warned that funding new-new ventures without exhausting core penetration leads to capital depletion.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
