import { useState } from 'react';
import { Plus, Trash2, CheckCircle2, AlertTriangle, Sparkles, RotateCcw, Clock, Target, HelpCircle } from 'lucide-react';

interface LeanBlockItem {
  id: string;
  block: 'problem' | 'solution' | 'uvp' | 'unfair' | 'segments' | 'metrics' | 'channels' | 'costs' | 'revenues';
  text: string;
  isSubItem?: boolean; // e.g. existing alternatives or early adopters
}

const FARMLINK_PRESET: LeanBlockItem[] = [
  // Problem & Existing Alternatives
  { id: 'l1', block: 'problem', text: '1. Farmers defecting to online venture-backed input apps' },
  { id: 'l2', block: 'problem', text: '2. No structured touchpoints with farmers between crop seasons' },
  { id: 'l3', block: 'problem', text: '3. Technical advice given verbally with zero brand credit to dealer' },
  { id: 'l4', block: 'problem', text: 'Existing Alternatives: Informal chat, personal farm visits, nothing', isSubItem: true },

  // Customer Segments & Early Adopters
  { id: 'l5', block: 'segments', text: 'Agri-input retail dealers with 300+ farmer customers in Tamil Nadu' },
  { id: 'l6', block: 'segments', text: 'Early Adopter: Progressive dealer facing immediate e-commerce competition', isSubItem: true },

  // UVP & High-Level Concept
  { id: 'l7', block: 'uvp', text: 'Keep your farmers loyal with automated agronomy advisory under your shop name' },
  { id: 'l8', block: 'uvp', text: 'High-Level Concept: "A branded CRM & retention engine for agri-input dealers"', isSubItem: true },

  // Solution (Capped at 3 features)
  { id: 'l9', block: 'solution', text: '1. Branded SMS & WhatsApp crop advisory tailored to local sowing stage' },
  { id: 'l10', block: 'solution', text: '2. Farmer digital directory with purchase history and credit tracking' },
  { id: 'l11', block: 'solution', text: '3. Seasonal restock notification engine for high-margin fertilizers' },

  // Channels
  { id: 'l12', block: 'channels', text: 'Direct outreach through fertilizer manufacturer sales reps' },
  { id: 'l13', block: 'channels', text: 'District dealer trade associations & co-founder personal network' },

  // Revenue Streams
  { id: 'l14', block: 'revenues', text: 'Monthly software subscription: ₹1,500 per dealer / month' },
  { id: 'l15', block: 'revenues', text: 'Annual advance payment discount: ₹15,000 / year' },

  // Cost Structure
  { id: 'l16', block: 'costs', text: 'Part-time agricultural university agronomist advisory content' },
  { id: 'l17', block: 'costs', text: 'Bulk WhatsApp Business API & SMS gateway fees' },
  { id: 'l18', block: 'costs', text: 'Two co-founder modest living stipends' },

  // Key Metrics
  { id: 'l19', block: 'metrics', text: 'Dealer 90-day retention rate (Target: ≥ 75%)' },
  { id: 'l20', block: 'metrics', text: 'Active farmers receiving weekly advice per dealer (Target: ≥ 80)' },

  // Unfair Advantage
  { id: 'l21', block: 'unfair', text: 'Co-founder’s 400 personal dealer relationships from 12 years in chemical sales' }
];

export function LeanCanvasSimulator() {
  const [items, setItems] = useState<LeanBlockItem[]>(FARMLINK_PRESET);
  const [activeTab, setActiveTab] = useState<'canvas' | 'fillOrder' | 'interview'>('canvas');

  // Input states
  const [block, setBlock] = useState<LeanBlockItem['block']>('problem');
  const [text, setText] = useState('');
  const [isSub, setIsSub] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newItem: LeanBlockItem = {
      id: Date.now().toString(),
      block,
      text: text.trim(),
      isSubItem: isSub
    };

    setItems(prev => [...prev, newItem]);
    setText('');
    setIsSub(false);
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const getBlockItems = (b: LeanBlockItem['block']) => items.filter(i => i.block === b);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <span>Startup Risk Architecture</span>
            <span>·</span>
            <span>Ash Maurya (Running Lean)</span>
            <span>·</span>
            <span>Problem-First Discipline</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Lean Canvas & 20-Minute Idea Validator</h3>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Capture startup assumptions, test problem existence before writing software, isolate early adopters, and build a single-sentence UVP.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setItems(FARMLINK_PRESET)}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Load FarmLink Madurai Case
          </button>
          <button
            onClick={() => setItems([])}
            className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 bg-white border border-slate-200 rounded-lg transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200 w-fit">
        <button
          onClick={() => setActiveTab('canvas')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
            activeTab === 'canvas' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          1. 9-Block Lean Canvas
        </button>
        <button
          onClick={() => setActiveTab('fillOrder')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
            activeTab === 'fillOrder' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          2. Recommended 20-Min Fill Order
        </button>
        <button
          onClick={() => setActiveTab('interview')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
            activeTab === 'interview' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          3. 15-Minute Problem Interview Script
        </button>
      </div>

      {/* Tab 1: 9-Block Lean Canvas */}
      {activeTab === 'canvas' && (
        <div className="space-y-4">
          {/* Add Item Form */}
          <form onSubmit={handleAdd} className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 shadow-xs">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">Add Lean Canvas Item</span>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-4">
                <label className="block text-xs font-medium text-slate-600 mb-1">Canvas Block</label>
                <select
                  value={block}
                  onChange={(e) => setBlock(e.target.value as any)}
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                >
                  <option value="problem">1. Problem (Top 3)</option>
                  <option value="segments">2. Customer Segments</option>
                  <option value="uvp">3. Unique Value Proposition</option>
                  <option value="solution">4. Solution (Max 3 features)</option>
                  <option value="channels">5. Channels</option>
                  <option value="revenues">6. Revenue Streams</option>
                  <option value="costs">7. Cost Structure</option>
                  <option value="metrics">8. Key Metrics</option>
                  <option value="unfair">9. Unfair Advantage</option>
                </select>
              </div>

              <div className="sm:col-span-5">
                <label className="block text-xs font-medium text-slate-600 mb-1">Item Description</label>
                <input
                  type="text"
                  placeholder="e.g. Existing alternatives: Paper receipts or WhatsApp"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 placeholder:text-slate-400"
                />
              </div>

              <div className="sm:col-span-2 flex items-center pt-5">
                <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                  <input type="checkbox" checked={isSub} onChange={(e) => setIsSub(e.target.checked)} className="rounded accent-slate-900" />
                  <span>Sub-element?</span>
                </label>
              </div>

              <div className="sm:col-span-1 flex items-end">
                <button
                  type="submit"
                  className="w-full py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>
            </div>
          </form>

          {/* 9-Block Grid Spatial Representation */}
          <div className="space-y-3">
            {/* Top 7 Blocks in 5 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {/* 1. Problem & Alternatives */}
              <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2 shadow-2xs min-h-[240px]">
                <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-2xs font-bold text-slate-900 uppercase tracking-wider">Problem</span>
                  <span className="text-2xs text-rose-700 font-bold">Top 3</span>
                </div>
                <div className="space-y-1.5">
                  {getBlockItems('problem').map(item => renderLeanItem(item, deleteItem))}
                </div>
              </div>

              {/* 4. Solution & 8. Key Metrics Column */}
              <div className="space-y-3 flex flex-col justify-between">
                <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2 shadow-2xs flex-1">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-2xs font-bold text-slate-900 uppercase tracking-wider">Solution</span>
                    <span className="text-2xs text-slate-500">Max 3</span>
                  </div>
                  <div className="space-y-1.5">
                    {getBlockItems('solution').map(item => renderLeanItem(item, deleteItem))}
                  </div>
                </div>

                <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2 shadow-2xs flex-1">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-2xs font-bold text-slate-900 uppercase tracking-wider">Key Metrics</span>
                  </div>
                  <div className="space-y-1.5">
                    {getBlockItems('metrics').map(item => renderLeanItem(item, deleteItem))}
                  </div>
                </div>
              </div>

              {/* 3. Unique Value Proposition */}
              <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2 shadow-2xs min-h-[240px]">
                <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-2xs font-bold text-slate-900 uppercase tracking-wider">Unique Value Prop</span>
                  <span className="text-2xs text-blue-700 font-bold">UVP</span>
                </div>
                <div className="space-y-1.5">
                  {getBlockItems('uvp').map(item => renderLeanItem(item, deleteItem))}
                </div>
              </div>

              {/* 9. Unfair Advantage & 5. Channels Column */}
              <div className="space-y-3 flex flex-col justify-between">
                <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2 shadow-2xs flex-1">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-2xs font-bold text-slate-900 uppercase tracking-wider">Unfair Advantage</span>
                  </div>
                  <div className="space-y-1.5">
                    {getBlockItems('unfair').map(item => renderLeanItem(item, deleteItem))}
                  </div>
                </div>

                <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2 shadow-2xs flex-1">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-2xs font-bold text-slate-900 uppercase tracking-wider">Channels</span>
                  </div>
                  <div className="space-y-1.5">
                    {getBlockItems('channels').map(item => renderLeanItem(item, deleteItem))}
                  </div>
                </div>
              </div>

              {/* 2. Customer Segments & Early Adopters */}
              <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2 shadow-2xs min-h-[240px]">
                <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-2xs font-bold text-slate-900 uppercase tracking-wider">Customer Segments</span>
                  <span className="text-2xs text-emerald-700 font-bold">Target</span>
                </div>
                <div className="space-y-1.5">
                  {getBlockItems('segments').map(item => renderLeanItem(item, deleteItem))}
                </div>
              </div>
            </div>

            {/* Bottom 2 Financial Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2 shadow-2xs">
                <span className="text-2xs font-bold text-rose-800 uppercase tracking-wider block border-b border-slate-100 pb-1.5">
                  Cost Structure (Fixed & Variable)
                </span>
                <div className="space-y-1.5">
                  {getBlockItems('costs').map(item => renderLeanItem(item, deleteItem))}
                </div>
              </div>

              <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2 shadow-2xs">
                <span className="text-2xs font-bold text-emerald-800 uppercase tracking-wider block border-b border-slate-100 pb-1.5">
                  Revenue Streams (Pricing & Volume)
                </span>
                <div className="space-y-1.5">
                  {getBlockItems('revenues').map(item => renderLeanItem(item, deleteItem))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: 20-Min Fill Order */}
      {activeTab === 'fillOrder' && (
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
          <div className="pb-2 border-b border-slate-100">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              The 20-Minute Drafting Cadence (Ash Maurya Protocol)
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Do not spend days perfecting the canvas. Draft a segment in 20 minutes, then get out of the building to interview!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
              <span className="font-mono font-bold text-slate-900">1. Customer Segments (3 min)</span>
              <p className="text-slate-600">Name who has the problem; define early adopters who feel it acutely today.</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
              <span className="font-mono font-bold text-slate-900">2. Problem (5 min)</span>
              <p className="text-slate-600">List top 3 problems and existing alternatives (the current workarounds).</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
              <span className="font-mono font-bold text-slate-900">3. UVP (3 min)</span>
              <p className="text-slate-600">Single clear sentence explaining why you are different; add high-level concept.</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
              <span className="font-mono font-bold text-slate-900">4. Solution (2 min)</span>
              <p className="text-slate-600">Cap at 3 core features mapping directly to the 3 problems.</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
              <span className="font-mono font-bold text-slate-900">5. Channels (2 min)</span>
              <p className="text-slate-600">Inbound and outbound paths to reach early adopters.</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
              <span className="font-mono font-bold text-slate-900">6. Revenue Streams (2 min)</span>
              <p className="text-slate-600">Monetization model, price point, lifetime value hypotheses.</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
              <span className="font-mono font-bold text-slate-900">7. Cost Structure (1 min)</span>
              <p className="text-slate-600">Hosting, payroll, customer acquisition costs to break even.</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
              <span className="font-mono font-bold text-slate-900">8 & 9. Metrics & Unfair (2 min)</span>
              <p className="text-slate-600">1-2 retention metrics and defensible moats (or leave blank).</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Problem Interview Guide */}
      {activeTab === 'interview' && (
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
          <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                15-Minute Problem Discovery Interview Script
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">Golden Rule: Never pitch your solution during a problem interview!</p>
            </div>
            <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2.5 py-1 rounded">15 Minutes</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-bold text-slate-900 block mb-0.5">1. Welcome & Context Setting (1 min)</span>
              <p className="text-slate-600 italic">"We are researching how agri-dealers keep their farmer accounts loyal during seasonal shifts..."</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-bold text-slate-900 block mb-0.5">2. Demographics & Qualification (2 min)</span>
              <p className="text-slate-600 italic">"How many years have you run this shop? How many active farmers buy from you each month?"</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-bold text-slate-900 block mb-0.5">3. Tell the Story of the 3 Problems (3 min)</span>
              <p className="text-slate-600 italic">"Here are 3 challenges we hear from other dealers. Does this ring true for you?"</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-bold text-slate-900 block mb-0.5">4. Rank the Problems (2 min)</span>
              <p className="text-slate-600 italic">"Which of these causes the most sleepless nights? Which one is just minor noise?"</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-bold text-slate-900 block mb-0.5">5. Explore Current Workarounds (5 min)</span>
              <p className="text-slate-600 italic">"How do you handle this today? What tools or tricks have you tried? What broke?"</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-bold text-slate-900 block mb-0.5">6. Wrap-up & Referral (2 min)</span>
              <p className="text-slate-600 italic">"Would you be open to giving feedback on a lightweight prototype next month? Who else should we talk to?"</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function renderLeanItem(item: LeanBlockItem, onDelete: (id: string) => void) {
  return (
    <div key={item.id} className={`p-2 rounded-lg border text-xs shadow-2xs group flex items-start justify-between gap-1.5 ${
      item.isSubItem ? 'bg-slate-100/70 border-dashed border-slate-300 text-slate-700 italic' : 'bg-slate-50 border-slate-200 text-slate-900 font-medium'
    }`}>
      <span className="leading-tight">{item.text}</span>
      <button
        onClick={() => onDelete(item.id)}
        className="text-slate-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity p-0.5"
      >
        <Trash2 className="w-3 h-3" />
      </button>
    </div>
  );
}
