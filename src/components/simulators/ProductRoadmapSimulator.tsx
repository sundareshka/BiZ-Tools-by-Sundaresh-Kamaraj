import { useState, useMemo } from 'react';
import { Kanban, Sliders, Eye, Plus, Trash2, ArrowRight, CheckCircle2, RotateCcw, AlertTriangle, Sparkles, Building2, HelpCircle, Layers, ArrowUpDown, ShieldAlert, Users, TrendingUp } from 'lucide-react';

interface RoadmapItem {
  id: string;
  theme: string;
  title: string;
  problemSolved: string;
  outcomeMetric: string;
  horizon: 'Now' | 'Next' | 'Later';
  reach: number; // customers/qtr
  impact: number; // 0.25 minimal, 0.5 low, 1.0 medium, 2.0 high, 3.0 massive
  confidence: number; // 0.50 (low), 0.70 (med), 0.80 (high), 1.0 (very high)
  effort: number; // person-months (1-12)
  okrLink: string;
  dependencies: string;
}

const DEFAULT_ITEMS: RoadmapItem[] = [
  {
    id: 'item-1',
    theme: 'Faster Onboarding',
    title: 'Excel & Tally Data Import Wizard',
    problemSolved: 'Textile units spend 3 weeks manually keying in existing fabric rolls, causing 30% first-month dropoff.',
    outcomeMetric: 'Week-1 activation rate improves from 30% to 45%',
    horizon: 'Now',
    reach: 300,
    impact: 2.0,
    confidence: 0.80,
    effort: 2.0,
    okrLink: 'OKR 1: Reduce monthly churn below 2.5%',
    dependencies: 'None (standalone parser)'
  },
  {
    id: 'item-2',
    theme: 'Fewer Stock Errors',
    title: 'Mobile Barcode Scanner App',
    problemSolved: 'Warehouse helpers misplace dyed yarn bundles, generating 40 support mismatch complaints weekly.',
    outcomeMetric: 'Stock-mismatch tickets drop by 40%',
    horizon: 'Now',
    reach: 180,
    impact: 2.0,
    confidence: 0.70,
    effort: 3.0,
    okrLink: 'OKR 1: Reduce monthly churn below 2.5%',
    dependencies: 'Camera QR SDK & Offline sync'
  },
  {
    id: 'item-3',
    theme: 'Exporter Readiness',
    title: 'Multi-Currency Invoicing & Customs Docs',
    problemSolved: 'Growing garment exporters in Tirupur require USD/EUR billing and export shipping manifests.',
    outcomeMetric: 'Acquire 20 export-tier manufacturers (high ACV)',
    horizon: 'Next',
    reach: 140,
    impact: 2.0,
    confidence: 0.60,
    effort: 4.0,
    okrLink: 'OKR 2: Grow ARR by 40%',
    dependencies: 'GST & RBI compliance review'
  },
  {
    id: 'item-4',
    theme: 'Faster Onboarding',
    title: 'Interactive Guided Video Walkthrough',
    problemSolved: 'Non-English speaking loom owners struggle with complex multi-warehouse setup.',
    outcomeMetric: 'Day-3 setup completion up from 45% to 65%',
    horizon: 'Next',
    reach: 250,
    impact: 1.0,
    confidence: 0.80,
    effort: 1.5,
    okrLink: 'OKR 1: Reduce monthly churn below 2.5%',
    dependencies: 'Tamil & Hindi voiceover production'
  },
  {
    id: 'item-5',
    theme: 'Smarter Purchasing',
    title: 'AI Cotton Yarn Demand Forecasting',
    problemSolved: 'Mill owners overstock raw yarn before seasonal price hikes, locking up working capital.',
    outcomeMetric: 'To be defined after customer discovery',
    horizon: 'Later',
    reach: 120,
    impact: 3.0,
    confidence: 0.40,
    effort: 6.0,
    okrLink: 'OKR 3: Expand into intelligence tier',
    dependencies: '6+ months historical pricing dataset'
  },
  {
    id: 'item-6',
    theme: 'Platform Delight',
    title: 'Dark Mode & Interface Theming',
    problemSolved: 'Night-shift managers in dye houses requested dark UI for low-light factory environments.',
    outcomeMetric: 'CSAT +0.2 points among night shift supervisors',
    horizon: 'Later',
    reach: 340,
    impact: 0.25,
    confidence: 0.90,
    effort: 1.0,
    okrLink: 'OKR 1: Customer satisfaction',
    dependencies: 'Tailwind token migration'
  }
];

export function ProductRoadmapSimulator() {
  const [items, setItems] = useState<RoadmapItem[]>(DEFAULT_ITEMS);
  const [activeAudienceView, setActiveAudienceView] = useState<'engineering' | 'leadership' | 'customer'>('leadership');
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  // New item modal
  const [newTitle, setNewTitle] = useState('');
  const [newTheme, setNewTheme] = useState('Faster Onboarding');
  const [newProblem, setNewProblem] = useState('');
  const [newMetric, setNewMetric] = useState('');
  const [newHorizon, setNewHorizon] = useState<'Now' | 'Next' | 'Later'>('Next');
  const [newReach, setNewReach] = useState<number>(150);
  const [newImpact, setNewImpact] = useState<number>(1.0);
  const [newConfidence, setNewConfidence] = useState<number>(0.7);
  const [newEffort, setNewEffort] = useState<number>(2.0);

  // Compute RICE score: (Reach × Impact × Confidence) ÷ Effort
  const calculateRICE = (item: RoadmapItem) => {
    if (item.effort <= 0) return 0;
    return Math.round((item.reach * item.impact * item.confidence) / item.effort);
  };

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => calculateRICE(b) - calculateRICE(a));
  }, [items]);

  const nowItems = sortedItems.filter(i => i.horizon === 'Now');
  const nextItems = sortedItems.filter(i => i.horizon === 'Next');
  const laterItems = sortedItems.filter(i => i.horizon === 'Later');

  // Change horizon
  const moveHorizon = (id: string, newHor: 'Now' | 'Next' | 'Later') => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, horizon: newHor } : item));
  };

  const handleUpdateItemRICE = (id: string, field: 'reach' | 'impact' | 'confidence' | 'effort', value: number) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleDeleteItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
    if (editingItemId === id) setEditingItemId(null);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: RoadmapItem = {
      id: `item-${Date.now()}`,
      theme: newTheme,
      title: newTitle.trim(),
      problemSolved: newProblem.trim() || 'Customer efficiency and workflow friction',
      outcomeMetric: newMetric.trim() || 'Increase user adoption by 25%',
      horizon: newHorizon,
      reach: newReach,
      impact: newImpact,
      confidence: newConfidence,
      effort: newEffort,
      okrLink: 'Strategic Business Goal',
      dependencies: 'Standard API endpoints'
    };

    setItems(prev => [newItem, ...prev]);
    setNewTitle('');
    setNewProblem('');
    setNewMetric('');
  };

  const editingItem = items.find(i => i.id === editingItemId);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
              <span>Category 9: Product & Startup Tools</span>
              <span>·</span>
              <span>Outcome-Based Strategy</span>
              <span>·</span>
              <span>Janna Bastow & Bruce McCarthy</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Kanban className="w-5 h-5 text-indigo-600" />
              Outcome-Based Product Roadmap (Now / Next / Later & RICE)
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl">
              Align engineering, executive leadership, sales, and customers around outcomes instead of rigid dates. Score initiatives scientifically with RICE and tailor visual representations for distinct stakeholder audiences.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg border border-slate-200">
            <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider px-2">Audience View:</span>
            <button
              onClick={() => setActiveAudienceView('leadership')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                activeAudienceView === 'leadership' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Leadership / Board
            </button>
            <button
              onClick={() => setActiveAudienceView('engineering')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                activeAudienceView === 'engineering' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Engineering / Backlog
            </button>
            <button
              onClick={() => setActiveAudienceView('customer')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                activeAudienceView === 'customer' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Public / Customer
            </button>
          </div>
        </div>

        {/* View Persona Notice */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-2xs text-slate-500">
          <div className="flex items-center gap-2">
            <Eye className="w-3.5 h-3.5 text-indigo-500" />
            <span>
              {activeAudienceView === 'leadership' && 'Currently showing: Business Objectives, customer-problem themes, outcome metrics, and traction milestones.'}
              {activeAudienceView === 'engineering' && 'Currently showing: Detailed technical sizing, RICE prioritization calculations, dependencies, and delivery backlog links.'}
              {activeAudienceView === 'customer' && 'Currently showing: Customer problems being solved across broad horizons without internal metrics or committed dates.'}
            </span>
          </div>
          <span className="font-mono text-slate-400">
            Now ({nowItems.length}) · Next ({nextItems.length}) · Later ({laterItems.length})
          </span>
        </div>
      </div>

      {/* RICE Interactive Tuning Drawer if an item is selected */}
      {editingItem && (
        <div className="p-4 bg-indigo-50/80 border border-indigo-200 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-bold text-indigo-950">
                Interactive RICE Scoring: {editingItem.title}
              </span>
              <span className="text-2xs px-2 py-0.5 rounded-full bg-indigo-200 text-indigo-900 font-mono font-bold">
                RICE Score = {calculateRICE(editingItem)}
              </span>
            </div>
            <button
              onClick={() => setEditingItemId(null)}
              className="text-xs text-indigo-700 hover:text-indigo-900 font-semibold"
            >
              Close Tuning
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <div className="flex justify-between text-2xs mb-1">
                <span className="font-semibold text-slate-700">Reach (users/qtr)</span>
                <span className="font-mono font-bold text-slate-900">{editingItem.reach}</span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="25"
                value={editingItem.reach}
                onChange={e => handleUpdateItemRICE(editingItem.id, 'reach', Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-2xs mb-1">
                <span className="font-semibold text-slate-700">Impact (0.25 to 3.0)</span>
                <span className="font-mono font-bold text-slate-900">{editingItem.impact}x</span>
              </div>
              <select
                value={editingItem.impact}
                onChange={e => handleUpdateItemRICE(editingItem.id, 'impact', Number(e.target.value))}
                className="w-full px-2 py-1 rounded border border-slate-200 bg-white font-mono text-xs text-slate-800"
              >
                <option value="0.25">0.25 — Minimal Impact</option>
                <option value="0.5">0.50 — Low Impact</option>
                <option value="1.0">1.00 — Medium Impact</option>
                <option value="2.0">2.00 — High Impact</option>
                <option value="3.0">3.00 — Massive Impact</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between text-2xs mb-1">
                <span className="font-semibold text-slate-700">Confidence (%)</span>
                <span className="font-mono font-bold text-slate-900">{Math.round(editingItem.confidence * 100)}%</span>
              </div>
              <select
                value={editingItem.confidence}
                onChange={e => handleUpdateItemRICE(editingItem.id, 'confidence', Number(e.target.value))}
                className="w-full px-2 py-1 rounded border border-slate-200 bg-white font-mono text-xs text-slate-800"
              >
                <option value="0.50">50% — Low (Moonshot guess)</option>
                <option value="0.70">70% — Medium (Early customer signals)</option>
                <option value="0.80">80% — High (Telemetry & interview data)</option>
                <option value="1.00">100% — Very High (Validated prototype)</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between text-2xs mb-1">
                <span className="font-semibold text-slate-700">Effort (Person-Months)</span>
                <span className="font-mono font-bold text-slate-900">{editingItem.effort} mo</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="8.0"
                step="0.5"
                value={editingItem.effort}
                onChange={e => handleUpdateItemRICE(editingItem.id, 'effort', Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>
          </div>
        </div>
      )}

      {/* Now / Next / Later 3-Column Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Horizon 1: NOW */}
        <div className="space-y-3">
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h4 className="text-sm font-bold text-emerald-950">NOW (Committed)</h4>
              </div>
              <span className="text-3xs text-emerald-700 font-medium block mt-0.5">
                Current Quarter · High Certainty · Max 2-3 Themes
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 font-mono text-xs font-bold">
              {nowItems.length}
            </span>
          </div>

          <div className="space-y-3">
            {nowItems.map(item => renderItemCard(item))}
            {nowItems.length === 0 && (
              <div className="p-6 text-center border-2 border-dashed border-slate-200 rounded-xl text-xs text-slate-400">
                No items currently committed in Now.
              </div>
            )}
          </div>
        </div>

        {/* Horizon 2: NEXT */}
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <h4 className="text-sm font-bold text-blue-950">NEXT (Planned & Shaping)</h4>
              </div>
              <span className="text-3xs text-blue-700 font-medium block mt-0.5">
                Next 1-2 Quarters · Medium Certainty · Discovery Active
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-blue-200 text-blue-900 font-mono text-xs font-bold">
              {nextItems.length}
            </span>
          </div>

          <div className="space-y-3">
            {nextItems.map(item => renderItemCard(item))}
            {nextItems.length === 0 && (
              <div className="p-6 text-center border-2 border-dashed border-slate-200 rounded-xl text-xs text-slate-400">
                No items in Next.
              </div>
            )}
          </div>
        </div>

        {/* Horizon 3: LATER */}
        <div className="space-y-3">
          <div className="p-3 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                <h4 className="text-sm font-bold text-slate-900">LATER (Directional)</h4>
              </div>
              <span className="text-3xs text-slate-500 font-medium block mt-0.5">
                6+ Months Out · Low Certainty · Exploratory Ideas
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-mono text-xs font-bold">
              {laterItems.length}
            </span>
          </div>

          <div className="space-y-3">
            {laterItems.map(item => renderItemCard(item))}
            {laterItems.length === 0 && (
              <div className="p-6 text-center border-2 border-dashed border-slate-200 rounded-xl text-xs text-slate-400">
                No directional items in Later.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add New Roadmap Initiative Accordion */}
      <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Plus className="w-4 h-4 text-indigo-600" />
          Add Proposed Initiative & Score with RICE
        </h4>

        <form onSubmit={handleAddItem} className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="font-semibold text-slate-700 block mb-1">Initiative Title</label>
              <input
                type="text"
                placeholder="e.g. Automated GST e-Way Bill Integration"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-900"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Strategic Theme</label>
              <select
                value={newTheme}
                onChange={e => setNewTheme(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-900"
              >
                <option value="Faster Onboarding">Faster Onboarding</option>
                <option value="Fewer Stock Errors">Fewer Stock Errors</option>
                <option value="Exporter Readiness">Exporter Readiness</option>
                <option value="Smarter Purchasing">Smarter Purchasing</option>
                <option value="Platform Delight">Platform Delight</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Customer Problem to Solve</label>
              <input
                type="text"
                placeholder="What friction or complaint does this resolve?"
                value={newProblem}
                onChange={e => setNewProblem(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-900"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Outcome Metric Target</label>
              <input
                type="text"
                placeholder="e.g. Reduce dispatch invoice generation time by 60%"
                value={newMetric}
                onChange={e => setNewMetric(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Horizon</label>
              <select
                value={newHorizon}
                onChange={e => setNewHorizon(e.target.value as any)}
                className="w-full px-2 py-1 rounded border border-slate-200 bg-white font-mono text-xs text-slate-900"
              >
                <option value="Now">Now</option>
                <option value="Next">Next</option>
                <option value="Later">Later</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Reach (users/qtr)</label>
              <input
                type="number"
                value={newReach}
                onChange={e => setNewReach(Number(e.target.value))}
                className="w-full px-2 py-1 rounded border border-slate-200 font-mono text-xs text-slate-900"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Impact (0.25-3)</label>
              <select
                value={newImpact}
                onChange={e => setNewImpact(Number(e.target.value))}
                className="w-full px-2 py-1 rounded border border-slate-200 bg-white font-mono text-xs text-slate-900"
              >
                <option value="0.25">0.25 (Min)</option>
                <option value="0.5">0.50 (Low)</option>
                <option value="1.0">1.00 (Med)</option>
                <option value="2.0">2.00 (High)</option>
                <option value="3.0">3.00 (Massive)</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Confidence</label>
              <select
                value={newConfidence}
                onChange={e => setNewConfidence(Number(e.target.value))}
                className="w-full px-2 py-1 rounded border border-slate-200 bg-white font-mono text-xs text-slate-900"
              >
                <option value="0.50">50% Low</option>
                <option value="0.70">70% Med</option>
                <option value="0.80">80% High</option>
                <option value="1.00">100% Very High</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Effort (Months)</label>
              <input
                type="number"
                step="0.5"
                value={newEffort}
                onChange={e => setNewEffort(Number(e.target.value))}
                className="w-full px-2 py-1 rounded border border-slate-200 font-mono text-xs text-slate-900"
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-2xs text-slate-500 font-mono">
              Estimated RICE: ({newReach} × {newImpact} × {newConfidence}) ÷ {newEffort} = <strong className="text-indigo-900">{Math.round((newReach * newImpact * newConfidence) / (newEffort || 1))}</strong>
            </span>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-900 hover:bg-indigo-800 text-white rounded-lg font-bold text-xs shadow-xs transition-colors"
            >
              Add to Roadmap
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  function renderItemCard(item: RoadmapItem) {
    const rice = calculateRICE(item);

    return (
      <div
        key={item.id}
        className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs hover:border-slate-300 transition-all space-y-2.5 text-xs"
      >
        {/* Header: Theme and Horizon badge */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-3xs font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-50 text-indigo-900 tracking-wide">
            {item.theme}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-3xs font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
              RICE {rice}
            </span>
            <button
              onClick={() => handleDeleteItem(item.id)}
              className="text-slate-300 hover:text-rose-600 transition-colors"
              title="Delete item"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Title */}
        <h5 className="font-bold text-slate-900 leading-snug">{item.title}</h5>

        {/* Conditional content by Audience View */}
        {activeAudienceView === 'leadership' && (
          <div className="space-y-1.5 pt-1 text-2xs">
            <div className="text-slate-600">
              <strong className="text-slate-800">Target Outcome:</strong> {item.outcomeMetric}
            </div>
            <div className="text-slate-500 italic">
              <strong className="text-slate-700 not-italic">OKR Alignment:</strong> {item.okrLink}
            </div>
          </div>
        )}

        {activeAudienceView === 'engineering' && (
          <div className="space-y-1.5 pt-1 text-2xs">
            <div className="grid grid-cols-2 gap-1 font-mono text-slate-600 bg-slate-50 p-1.5 rounded">
              <span>Reach: {item.reach}</span>
              <span>Impact: {item.impact}x</span>
              <span>Conf: {Math.round(item.confidence * 100)}%</span>
              <span>Effort: {item.effort} mo</span>
            </div>
            <div className="text-slate-500">
              <strong className="text-slate-700">Dependencies:</strong> {item.dependencies}
            </div>
          </div>
        )}

        {activeAudienceView === 'customer' && (
          <div className="space-y-1.5 pt-1 text-2xs">
            <p className="text-slate-600 leading-relaxed">
              <strong className="text-slate-800">Problem we are solving:</strong> {item.problemSolved}
            </p>
          </div>
        )}

        {/* Bottom controls: Move Horizon + Fine-Tune RICE */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-2xs">
          <button
            onClick={() => setEditingItemId(editingItemId === item.id ? null : item.id)}
            className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
          >
            <Sliders className="w-3 h-3" />
            <span>Tune RICE</span>
          </button>

          <div className="flex items-center gap-1">
            <span className="text-slate-400">Move:</span>
            {(['Now', 'Next', 'Later'] as const).map(h => (
              <button
                key={h}
                disabled={item.horizon === h}
                onClick={() => moveHorizon(item.id, h)}
                className={`px-1.5 py-0.5 rounded text-3xs font-semibold ${
                  item.horizon === h
                    ? 'bg-slate-200 text-slate-800 font-bold'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                {h}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
