import { useState } from 'react';
import { Plus, Trash2, CheckCircle2, AlertCircle, Sparkles, RotateCcw, Lightbulb, TrendingUp } from 'lucide-react';

interface CanvasFactor {
  id: string;
  name: string;
  industryAvg: number; // 1-5
  competitorLevel: number; // 1-5
  newCurveLevel: number; // 1-5
  errcAction: 'eliminate' | 'reduce' | 'raise' | 'create' | 'maintain';
}

const MADURAI_WEDDING_FACTORS: CanvasFactor[] = [
  { id: 'f-1', name: 'Grand Stage Decoration Packages', industryAvg: 5, competitorLevel: 5, newCurveLevel: 1, errcAction: 'eliminate' },
  { id: 'f-2', name: 'Hidden Vendor Commissions', industryAvg: 5, competitorLevel: 4, newCurveLevel: 1, errcAction: 'eliminate' },
  { id: 'f-3', name: 'Vendor Choice Overload', industryAvg: 4, competitorLevel: 4, newCurveLevel: 2, errcAction: 'reduce' },
  { id: 'f-4', name: 'Overall Package Price', industryAvg: 4, competitorLevel: 4, newCurveLevel: 2, errcAction: 'reduce' },
  { id: 'f-5', name: 'Single Accountable Planner', industryAvg: 2, competitorLevel: 2, newCurveLevel: 5, errcAction: 'raise' },
  { id: 'f-6', name: 'Fixed Transparent Pricing', industryAvg: 2, competitorLevel: 1, newCurveLevel: 5, errcAction: 'raise' },
  { id: 'f-7', name: 'Guest Experience Concierge', industryAvg: 1, competitorLevel: 1, newCurveLevel: 5, errcAction: 'create' },
  { id: 'f-8', name: 'Curated Family Digital Archive', industryAvg: 1, competitorLevel: 1, newCurveLevel: 5, errcAction: 'create' }
];

export function BlueOceanSimulator() {
  const [factors, setFactors] = useState<CanvasFactor[]>(MADURAI_WEDDING_FACTORS);
  const [tagline, setTagline] = useState('One planner. One price. Your story, kept.');
  const [activeTab, setActiveTab] = useState<'canvas' | 'errc' | 'noncustomers'>('canvas');

  // New factor input
  const [newName, setNewName] = useState('');
  const [newAction, setNewAction] = useState<CanvasFactor['errcAction']>('create');
  const [newIndustry, setNewIndustry] = useState(3);
  const [newCurve, setNewCurve] = useState(5);

  const updateNewCurveVal = (id: string, val: number) => {
    setFactors(prev => prev.map(f => f.id === id ? { ...f, newCurveLevel: val } : f));
  };

  const handleAddFactor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newF: CanvasFactor = {
      id: Date.now().toString(),
      name: newName.trim(),
      industryAvg: newIndustry,
      competitorLevel: newIndustry,
      newCurveLevel: newCurve,
      errcAction: newAction
    };

    setFactors(prev => [...prev, newF]);
    setNewName('');
  };

  const deleteFactor = (id: string) => {
    setFactors(prev => prev.filter(f => f.id !== id));
  };

  // Evaluate the 3 Tests of Good Strategy:
  // 1. Focus: Are high scores (>=4) concentrated in 3-4 factors?
  const highScoringFactors = factors.filter(f => f.newCurveLevel >= 4);
  const passesFocus = highScoringFactors.length >= 2 && highScoringFactors.length <= 5;

  // 2. Divergence: Is the mean absolute difference between new curve and industry average high?
  const totalDiff = factors.reduce((acc, f) => acc + Math.abs(f.newCurveLevel - f.industryAvg), 0);
  const avgDiff = totalDiff / (factors.length || 1);
  const passesDivergence = avgDiff >= 1.5;

  // 3. Tagline: Has an active tagline with <= 12 words
  const passesTagline = tagline.trim().length > 10 && tagline.trim().split(/\s+/).length <= 12;

  // SVG dimensions for Strategy Canvas
  const width = 640;
  const height = 240;
  const paddingX = 45;
  const paddingY = 30;
  const graphWidth = width - paddingX * 2;
  const graphHeight = height - paddingY * 2;

  const getX = (idx: number) => paddingX + (idx / Math.max(1, factors.length - 1)) * graphWidth;
  const getY = (val: number) => height - paddingY - ((val - 1) / 4) * graphHeight;

  const industryPoints = factors.map((f, i) => `${getX(i)},${getY(f.industryAvg)}`).join(' ');
  const newCurvePoints = factors.map((f, i) => `${getX(i)},${getY(f.newCurveLevel)}`).join(' ');

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <span>Value Innovation Engine</span>
            <span>·</span>
            <span>Kim & Mauborgne</span>
            <span>·</span>
            <span>Escape the Red Ocean</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Blue Ocean Strategy Canvas & ERRC Studio</h3>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Reconstruct market boundaries by plotting divergent value curves, eliminating industry sacred cows, and testing for Focus, Divergence, and Tagline.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              setFactors(MADURAI_WEDDING_FACTORS);
              setTagline('One planner. One price. Your story, kept.');
            }}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Load Madurai Wedding Case
          </button>
          <button
            onClick={() => {
              setFactors([]);
              setTagline('');
            }}
            className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 bg-white border border-slate-200 rounded-lg transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>
      </div>

      {/* Mode Navigation */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200 w-fit">
        <button
          onClick={() => setActiveTab('canvas')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
            activeTab === 'canvas' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          1. Strategy Canvas & Curves
        </button>
        <button
          onClick={() => setActiveTab('errc')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
            activeTab === 'errc' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          2. ERRC Grid (Eliminate, Reduce, Raise, Create)
        </button>
        <button
          onClick={() => setActiveTab('noncustomers')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
            activeTab === 'noncustomers' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          3. Three Tiers of Non-Customers
        </button>
      </div>

      {/* Tab 1: Strategy Canvas */}
      {activeTab === 'canvas' && (
        <div className="space-y-6">
          {/* SVG Visual Canvas */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Visual Value Curve Comparison</h4>
                <p className="text-xs text-slate-500">Horizontal: Factors of Competition · Vertical: Offering Level (1: Low / None to 5: High / Industry Best)</p>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <span className="w-3 h-0.5 border-t-2 border-dashed border-slate-400" />
                  Red Ocean Industry Standard
                </span>
                <span className="flex items-center gap-1.5 text-blue-600 font-bold">
                  <span className="w-3 h-1 bg-blue-600 rounded-full" />
                  Your Blue Ocean Curve
                </span>
              </div>
            </div>

            <div className="w-full overflow-x-auto py-2">
              <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-3xl mx-auto h-auto min-w-[500px]">
                {/* Horizontal Level Guidelines */}
                {[1, 2, 3, 4, 5].map(lvl => (
                  <g key={lvl}>
                    <line
                      x1={paddingX}
                      y1={getY(lvl)}
                      x2={width - paddingX}
                      y2={getY(lvl)}
                      stroke="#f1f5f9"
                      strokeWidth="1"
                    />
                    <text
                      x={paddingX - 10}
                      y={getY(lvl)}
                      textAnchor="end"
                      dominantBaseline="middle"
                      className="text-2xs fill-slate-400 font-mono"
                    >
                      {lvl === 5 ? 'High' : lvl === 1 ? 'None/Low' : lvl}
                    </text>
                  </g>
                ))}

                {/* Vertical Factor Lines */}
                {factors.map((f, i) => (
                  <line
                    key={f.id}
                    x1={getX(i)}
                    y1={paddingY}
                    x2={getX(i)}
                    y2={height - paddingY}
                    stroke="#f8fafc"
                    strokeWidth="1"
                  />
                ))}

                {/* Industry Average Value Curve (Red ocean) */}
                <polyline
                  points={industryPoints}
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                />

                {/* Blue Ocean Value Curve */}
                <polyline
                  points={newCurvePoints}
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="3.5"
                />

                {/* Data Points on Blue Ocean Curve */}
                {factors.map((f, i) => (
                  <g key={f.id}>
                    <circle
                      cx={getX(i)}
                      cy={getY(f.industryAvg)}
                      r={3}
                      fill="#94a3b8"
                    />
                    <circle
                      cx={getX(i)}
                      cy={getY(f.newCurveLevel)}
                      r={5.5}
                      fill="#0284c7"
                      stroke="#ffffff"
                      strokeWidth="2"
                      className="cursor-pointer hover:scale-125 transition-transform"
                    />
                  </g>
                ))}
              </svg>
            </div>

            {/* Factor Labels & Interactive Sliders */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 pt-3 border-t border-slate-100">
              {factors.map((f, i) => (
                <div key={f.id} className="p-2 bg-slate-50 border border-slate-200/80 rounded-lg text-center space-y-1.5">
                  <span className={`px-1.5 py-0.5 text-2xs font-bold uppercase rounded block truncate ${
                    f.errcAction === 'eliminate' ? 'bg-rose-100 text-rose-800' :
                    f.errcAction === 'reduce' ? 'bg-amber-100 text-amber-800' :
                    f.errcAction === 'raise' ? 'bg-blue-100 text-blue-800' :
                    f.errcAction === 'create' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {f.errcAction}
                  </span>
                  <p className="text-2xs font-bold text-slate-800 line-clamp-2 h-7">{f.name}</p>
                  <div className="text-2xs text-slate-500 font-mono">Industry: {f.industryAvg}</div>
                  <div className="space-y-1">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={f.newCurveLevel}
                      onChange={(e) => updateNewCurveVal(f.id, parseInt(e.target.value))}
                      className="w-full accent-blue-600"
                    />
                    <span className="text-2xs font-bold text-blue-700 block tabular-nums">Level: {f.newCurveLevel}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Three Tests of Good Strategy Validation Card */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Three Tests of a Defensible Blue Ocean Strategy
              </span>
              <span className="text-2xs text-slate-500">Kim & Mauborgne Criteria</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Test 1: Focus */}
              <div className={`p-4 rounded-xl border ${passesFocus ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/50 border-rose-200'}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900">1. Test of Focus</span>
                  {passesFocus ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-rose-600" />}
                </div>
                <p className="text-xs text-slate-600">
                  {passesFocus
                    ? `Passed: Exactly ${highScoringFactors.length} factors strongly emphasized. Efforts are concentrated.`
                    : 'Failed: Trying to be high on everything or nothing. Limit high focus to 3-4 factors.'}
                </p>
              </div>

              {/* Test 2: Divergence */}
              <div className={`p-4 rounded-xl border ${passesDivergence ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/50 border-rose-200'}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900">2. Test of Divergence</span>
                  {passesDivergence ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-rose-600" />}
                </div>
                <p className="text-xs text-slate-600">
                  {passesDivergence
                    ? `Passed: Average curve distance is ${avgDiff.toFixed(1)} pts. The shape visibly diverges from rivals.`
                    : 'Failed: The curve mimics competitor shapes (benchmarking red ocean trap).'}
                </p>
              </div>

              {/* Test 3: Compelling Tagline */}
              <div className={`p-4 rounded-xl border ${passesTagline ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/50 border-rose-200'}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900">3. Compelling Tagline</span>
                  {passesTagline ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-rose-600" />}
                </div>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="One sentence a buyer would repeat..."
                  className="w-full text-xs bg-white border border-slate-300 rounded px-2 py-1 text-slate-900 mt-1"
                />
                <span className="text-2xs text-slate-500 block mt-1">
                  {passesTagline ? 'Passed: Authentic, concise, and memorable customer promise.' : 'Needs concise tagline under 12 words.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: ERRC Grid */}
      {activeTab === 'errc' && (
        <div className="space-y-6">
          <div className="p-4 bg-slate-900 text-white rounded-xl flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold">The Four Actions Framework (ERRC Grid)</h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Crucial Rule: Elimination and Reduction <span className="text-amber-300 font-semibold">fund</span> Raising and Creation. You cannot create new value without cutting industry waste.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ELIMINATE */}
            <div className="p-5 bg-white border border-rose-200 rounded-xl space-y-3 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-rose-100">
                <span className="text-xs font-bold text-rose-800 uppercase tracking-wide">ELIMINATE (Costs to Zero)</span>
                <span className="text-2xs text-slate-500">Factors industry takes for granted</span>
              </div>
              <div className="space-y-2">
                {factors.filter(f => f.errcAction === 'eliminate').map(f => (
                  <div key={f.id} className="p-2.5 bg-rose-50/50 border border-rose-200 rounded-lg text-xs font-semibold text-rose-900 flex items-center justify-between">
                    <span>{f.name}</span>
                    <button onClick={() => deleteFactor(f.id)} className="text-rose-400 hover:text-rose-700">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* REDUCE */}
            <div className="p-5 bg-white border border-amber-200 rounded-xl space-y-3 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-amber-100">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">REDUCE (Below Industry Standard)</span>
                <span className="text-2xs text-slate-500">Factors over-designed in competition</span>
              </div>
              <div className="space-y-2">
                {factors.filter(f => f.errcAction === 'reduce').map(f => (
                  <div key={f.id} className="p-2.5 bg-amber-50/50 border border-amber-200 rounded-lg text-xs font-semibold text-amber-900 flex items-center justify-between">
                    <span>{f.name}</span>
                    <button onClick={() => deleteFactor(f.id)} className="text-amber-400 hover:text-amber-700">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* RAISE */}
            <div className="p-5 bg-white border border-blue-200 rounded-xl space-y-3 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-blue-100">
                <span className="text-xs font-bold text-blue-800 uppercase tracking-wide">RAISE (Above Industry Standard)</span>
                <span className="text-2xs text-slate-500">Factors buyers genuinely value</span>
              </div>
              <div className="space-y-2">
                {factors.filter(f => f.errcAction === 'raise').map(f => (
                  <div key={f.id} className="p-2.5 bg-blue-50/50 border border-blue-200 rounded-lg text-xs font-semibold text-blue-900 flex items-center justify-between">
                    <span>{f.name}</span>
                    <button onClick={() => deleteFactor(f.id)} className="text-blue-400 hover:text-blue-700">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* CREATE */}
            <div className="p-5 bg-white border border-emerald-200 rounded-xl space-y-3 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-100">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">CREATE (Never Offered Before)</span>
                <span className="text-2xs text-slate-500">Unlocks brand-new non-customer demand</span>
              </div>
              <div className="space-y-2">
                {factors.filter(f => f.errcAction === 'create').map(f => (
                  <div key={f.id} className="p-2.5 bg-emerald-50/50 border border-emerald-200 rounded-lg text-xs font-semibold text-emerald-900 flex items-center justify-between">
                    <span>{f.name}</span>
                    <button onClick={() => deleteFactor(f.id)} className="text-emerald-400 hover:text-emerald-700">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Three Tiers of Non-Customers */}
      {activeTab === 'noncustomers' && (
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
          <div className="pb-2 border-b border-slate-100">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Three Tiers of Non-Customers Exploration</h4>
            <p className="text-xs text-slate-500 mt-0.5">The biggest mistake in strategy is interviewing only existing happy customers. New demand lives with non-customers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="px-2 py-0.5 text-2xs font-bold bg-slate-200 text-slate-800 rounded">TIER 1: SOON-TO-BE</span>
              <h5 className="text-xs font-bold text-slate-900">Sitting on the Edge of Market</h5>
              <p className="text-xs text-slate-600">Buy minimally out of necessity, but eagerly search for any substitute to jump ship.</p>
              <div className="p-2 bg-white rounded border border-slate-200 text-2xs text-slate-700 italic">
                Example: Couples who rent a basic hall and hire individual vendors separately because planner markups feel predatory.
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="px-2 py-0.5 text-2xs font-bold bg-amber-100 text-amber-800 rounded">TIER 2: REFUSING</span>
              <h5 className="text-xs font-bold text-slate-900">Consciously Chose Against</h5>
              <p className="text-xs text-slate-600">Looked at your industry's offerings and deliberately refused to buy because of cost, complexity, or distrust.</p>
              <div className="p-2 bg-white rounded border border-slate-200 text-2xs text-slate-700 italic">
                Example: Families hosting intimate rooftop home ceremonies because commercial event planners ignore small gatherings.
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="px-2 py-0.5 text-2xs font-bold bg-blue-100 text-blue-800 rounded">TIER 3: UNEXPLORED</span>
              <h5 className="text-xs font-bold text-slate-900">Never Even Considered</h5>
              <p className="text-xs text-slate-600">Distant potential buyers who assume your entire market is irrelevant or meant for someone else.</p>
              <div className="p-2 bg-white rounded border border-slate-200 text-2xs text-slate-700 italic">
                Example: Corporate client recognition galas and non-profit anniversaries needing stress-free concierge management.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
