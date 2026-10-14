import { useState } from 'react';
import { Plus, Trash2, CheckCircle2, AlertCircle, Sparkles, RotateCcw, Filter, DollarSign, Tag } from 'lucide-react';

export interface BmcItem {
  id: string;
  block: 'segments' | 'propositions' | 'channels' | 'relationships' | 'revenues' | 'resources' | 'activities' | 'partners' | 'costs';
  text: string;
  segmentColor: 'farmers' | 'dealers' | 'processors' | 'general';
  tag: 'fact' | 'supported' | 'untested';
  ballparkValue?: string;
}

const VAIGAI_BMC_PRESET: BmcItem[] = [
  // Segments
  { id: 'b1', block: 'segments', text: 'Seasonal Smallholder Farmers (55% sample vol, 30% revenue)', segmentColor: 'farmers', tag: 'fact' },
  { id: 'b2', block: 'segments', text: 'Fertilizer & Agro-Input Retail Dealers (35% sample vol, 25% revenue)', segmentColor: 'dealers', tag: 'fact' },
  { id: 'b3', block: 'segments', text: 'Food & Dairy Processing Plants (10% sample vol, 45% revenue)', segmentColor: 'processors', tag: 'fact' },

  // Value Propositions
  { id: 'b4', block: 'propositions', text: 'Affordable walk-in soil health card for subsidized crop loans', segmentColor: 'farmers', tag: 'fact' },
  { id: 'b5', block: 'propositions', text: 'Fertilizer recommendation booster to increase dealer input sales', segmentColor: 'dealers', tag: 'supported' },
  { id: 'b6', block: 'propositions', text: 'Certified 24h turnaround quality compliance for export audits', segmentColor: 'processors', tag: 'fact' },

  // Channels
  { id: 'b7', block: 'channels', text: 'Physical walk-in submission at Madurai central lab', segmentColor: 'farmers', tag: 'fact' },
  { id: 'b8', block: 'channels', text: 'Field agents collecting samples from 40 rural dealer shops', segmentColor: 'dealers', tag: 'supported' },
  { id: 'b9', block: 'channels', text: 'Scheduled courier pickup with digital PDF lab certificates', segmentColor: 'processors', tag: 'supported' },

  // Customer Relationships
  { id: 'b10', block: 'relationships', text: 'Over-the-counter paper report handover with agronomist consultation', segmentColor: 'farmers', tag: 'fact' },
  { id: 'b11', block: 'relationships', text: 'Dedicated WhatsApp direct line for wholesale dealer inquiries', segmentColor: 'dealers', tag: 'supported' },
  { id: 'b12', block: 'relationships', text: 'Dedicated Key Account Manager with customized SLA contract', segmentColor: 'processors', tag: 'untested' },

  // Revenue Streams
  { id: 'b13', block: 'revenues', text: 'Walk-in cash test fees: ₹350 per basic soil report', segmentColor: 'farmers', tag: 'fact', ballparkValue: '₹72 Lakh/yr' },
  { id: 'b14', block: 'revenues', text: 'Dealer monthly subscription: ₹3,000/mo for 10 batch tests', segmentColor: 'dealers', tag: 'untested', ballparkValue: '₹60 Lakh/yr' },
  { id: 'b15', block: 'revenues', text: 'Annual corporate QA retainer contracts with 4 food processors', segmentColor: 'processors', tag: 'untested', ballparkValue: '₹108 Lakh/yr' },

  // Key Resources
  { id: 'b16', block: 'resources', text: 'NABL accredited spectrophotometers and flame photometers', segmentColor: 'general', tag: 'fact' },
  { id: 'b17', block: 'resources', text: 'Certified soil scientists & chemical laboratory technicians', segmentColor: 'general', tag: 'fact' },

  // Key Activities
  { id: 'b18', block: 'activities', text: 'Chemical sample digestion, calibration, and test execution', segmentColor: 'general', tag: 'fact' },
  { id: 'b19', block: 'activities', text: 'Corporate contract acquisition & dealer onboarding visits', segmentColor: 'general', tag: 'untested' },

  // Key Partnerships
  { id: 'b20', block: 'partners', text: 'Tamil Nadu Agricultural University (TNAU) for reference norms', segmentColor: 'general', tag: 'fact' },
  { id: 'b21', block: 'partners', text: 'Local courier network for same-day cold-box sample transport', segmentColor: 'processors', tag: 'supported' },

  // Cost Structure
  { id: 'b22', block: 'costs', text: 'Reagents & consumable testing chemicals', segmentColor: 'general', tag: 'fact', ballparkValue: '₹35 Lakh/yr' },
  { id: 'b23', block: 'costs', text: '18 technician and agronomist salaries', segmentColor: 'general', tag: 'fact', ballparkValue: '₹65 Lakh/yr' },
  { id: 'b24', block: 'costs', text: 'Lab facility rent & calibration compliance audits', segmentColor: 'general', tag: 'fact', ballparkValue: '₹22 Lakh/yr' }
];

export function BMCSimulator() {
  const [items, setItems] = useState<BmcItem[]>(VAIGAI_BMC_PRESET);
  const [selectedSegment, setSelectedSegment] = useState<string>('all');
  const [tagFilter, setTagFilter] = useState<string>('all');

  // Input states
  const [block, setBlock] = useState<BmcItem['block']>('propositions');
  const [text, setText] = useState('');
  const [segmentColor, setSegmentColor] = useState<BmcItem['segmentColor']>('dealers');
  const [tag, setTag] = useState<BmcItem['tag']>('untested');
  const [ballpark, setBallpark] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newItem: BmcItem = {
      id: Date.now().toString(),
      block,
      text: text.trim(),
      segmentColor,
      tag,
      ballparkValue: ballpark.trim() || undefined
    };

    setItems(prev => [...prev, newItem]);
    setText('');
    setBallpark('');
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const filteredItems = items.filter(i => {
    if (selectedSegment !== 'all' && i.segmentColor !== selectedSegment && i.segmentColor !== 'general') return false;
    if (tagFilter !== 'all' && i.tag !== tagFilter) return false;
    return true;
  });

  const getBlockItems = (b: BmcItem['block']) => filteredItems.filter(i => i.block === b);

  // Red dot count (untested hypotheses)
  const redDotsCount = items.filter(i => i.tag === 'untested').length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <span>Business Architecture Canvas</span>
            <span>·</span>
            <span>Alexander Osterwalder</span>
            <span>·</span>
            <span>9 Strategic Blocks</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Business Model Canvas & Hypothesis Board</h3>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Map how your business creates, delivers, and captures value. Colour-code multiple customer segments and tag entries with Fact (Green), Supported (Yellow), or Untested (Red) dots.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setItems(VAIGAI_BMC_PRESET)}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Load Vaigai Agro Labs Case
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

      {/* Hypothesis Triage Bar */}
      <div className="p-4 bg-slate-900 text-white rounded-xl shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Hypothesis Risk Meter:</span>
            <span className="px-2 py-0.5 text-2xs font-bold bg-rose-500 text-white rounded tabular-nums">
              {redDotsCount} Untested Red Dots
            </span>
          </div>
          <p className="text-xs text-slate-300">
            Rule from Osterwalder: "A completed canvas is a set of hypotheses, not a plan." The block with the most red dots is where your next experiment belongs!
          </p>
        </div>

        {/* Filter segment tabs */}
        <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-lg border border-slate-700 text-xs">
          <button
            onClick={() => setSelectedSegment('all')}
            className={`px-2.5 py-1 rounded transition-colors ${selectedSegment === 'all' ? 'bg-white text-slate-900 font-bold' : 'text-slate-300 hover:text-white'}`}
          >
            All Segments
          </button>
          <button
            onClick={() => setSelectedSegment('farmers')}
            className={`px-2.5 py-1 rounded transition-colors ${selectedSegment === 'farmers' ? 'bg-emerald-500 text-white font-bold' : 'text-emerald-300 hover:text-white'}`}
          >
            Farmers
          </button>
          <button
            onClick={() => setSelectedSegment('dealers')}
            className={`px-2.5 py-1 rounded transition-colors ${selectedSegment === 'dealers' ? 'bg-blue-500 text-white font-bold' : 'text-blue-300 hover:text-white'}`}
          >
            Dealers
          </button>
          <button
            onClick={() => setSelectedSegment('processors')}
            className={`px-2.5 py-1 rounded transition-colors ${selectedSegment === 'processors' ? 'bg-purple-500 text-white font-bold' : 'text-purple-300 hover:text-white'}`}
          >
            Processors
          </button>
        </div>
      </div>

      {/* Add Item Form */}
      <form onSubmit={handleAdd} className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 shadow-xs">
        <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">Add Sticky Note to Canvas</span>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-3">
            <label className="block text-xs font-medium text-slate-600 mb-1">Canvas Block</label>
            <select
              value={block}
              onChange={(e) => setBlock(e.target.value as any)}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
            >
              <option value="segments">1. Customer Segments</option>
              <option value="propositions">2. Value Propositions</option>
              <option value="channels">3. Channels</option>
              <option value="relationships">4. Customer Relationships</option>
              <option value="revenues">5. Revenue Streams</option>
              <option value="resources">6. Key Resources</option>
              <option value="activities">7. Key Activities</option>
              <option value="partners">8. Key Partnerships</option>
              <option value="costs">9. Cost Structure</option>
            </select>
          </div>

          <div className="sm:col-span-4">
            <label className="block text-xs font-medium text-slate-600 mb-1">Note Text (Specific statement)</label>
            <input
              type="text"
              placeholder="e.g. 24h certified soil quality test report"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-slate-600 mb-1">Segment Colour</label>
            <select
              value={segmentColor}
              onChange={(e) => setSegmentColor(e.target.value as any)}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-2 py-2 text-slate-800"
            >
              <option value="general">Neutral / General</option>
              <option value="farmers">Farmers (Green)</option>
              <option value="dealers">Dealers (Blue)</option>
              <option value="processors">Processors (Purple)</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-slate-600 mb-1">Validation Tag</label>
            <select
              value={tag}
              onChange={(e) => setTag(e.target.value as any)}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-2 py-2 text-slate-800"
            >
              <option value="untested">🔴 Untested Guess</option>
              <option value="supported">🟡 Interview Supported</option>
              <option value="fact">🟢 Verified Fact / Paid</option>
            </select>
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

      {/* The 9-Block Spatial Canvas */}
      <div className="space-y-4">
        {/* Top 7 Blocks in 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {/* Key Partners */}
          <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2 shadow-2xs min-h-[220px]">
            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
              <span className="text-2xs font-bold text-slate-500 uppercase tracking-wider">8. Key Partners</span>
              <span className="text-2xs text-slate-400 font-mono">{getBlockItems('partners').length}</span>
            </div>
            <div className="space-y-2">
              {getBlockItems('partners').map(item => renderStickyNote(item, deleteItem))}
            </div>
          </div>

          {/* Key Activities & Key Resources Column */}
          <div className="space-y-3 flex flex-col justify-between">
            <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2 shadow-2xs flex-1">
              <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                <span className="text-2xs font-bold text-slate-500 uppercase tracking-wider">7. Key Activities</span>
                <span className="text-2xs text-slate-400 font-mono">{getBlockItems('activities').length}</span>
              </div>
              <div className="space-y-2">
                {getBlockItems('activities').map(item => renderStickyNote(item, deleteItem))}
              </div>
            </div>

            <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2 shadow-2xs flex-1">
              <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                <span className="text-2xs font-bold text-slate-500 uppercase tracking-wider">6. Key Resources</span>
                <span className="text-2xs text-slate-400 font-mono">{getBlockItems('resources').length}</span>
              </div>
              <div className="space-y-2">
                {getBlockItems('resources').map(item => renderStickyNote(item, deleteItem))}
              </div>
            </div>
          </div>

          {/* Value Propositions */}
          <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2 shadow-2xs min-h-[220px]">
            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
              <span className="text-2xs font-bold text-slate-900 uppercase tracking-wider">2. Value Propositions</span>
              <span className="text-2xs text-slate-400 font-mono">{getBlockItems('propositions').length}</span>
            </div>
            <div className="space-y-2">
              {getBlockItems('propositions').map(item => renderStickyNote(item, deleteItem))}
            </div>
          </div>

          {/* Relationships & Channels Column */}
          <div className="space-y-3 flex flex-col justify-between">
            <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2 shadow-2xs flex-1">
              <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                <span className="text-2xs font-bold text-slate-500 uppercase tracking-wider">4. Relationships</span>
                <span className="text-2xs text-slate-400 font-mono">{getBlockItems('relationships').length}</span>
              </div>
              <div className="space-y-2">
                {getBlockItems('relationships').map(item => renderStickyNote(item, deleteItem))}
              </div>
            </div>

            <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2 shadow-2xs flex-1">
              <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                <span className="text-2xs font-bold text-slate-500 uppercase tracking-wider">3. Channels</span>
                <span className="text-2xs text-slate-400 font-mono">{getBlockItems('channels').length}</span>
              </div>
              <div className="space-y-2">
                {getBlockItems('channels').map(item => renderStickyNote(item, deleteItem))}
              </div>
            </div>
          </div>

          {/* Customer Segments */}
          <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2 shadow-2xs min-h-[220px]">
            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
              <span className="text-2xs font-bold text-slate-900 uppercase tracking-wider">1. Customer Segments</span>
              <span className="text-2xs text-slate-400 font-mono">{getBlockItems('segments').length}</span>
            </div>
            <div className="space-y-2">
              {getBlockItems('segments').map(item => renderStickyNote(item, deleteItem))}
            </div>
          </div>
        </div>

        {/* Bottom 2 Financial Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Cost Structure */}
          <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2 shadow-2xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
              <span className="text-2xs font-bold text-rose-800 uppercase tracking-wider">9. Cost Structure (Outflows)</span>
              <span className="text-2xs text-slate-400 font-mono">{getBlockItems('costs').length}</span>
            </div>
            <div className="space-y-2">
              {getBlockItems('costs').map(item => renderStickyNote(item, deleteItem))}
            </div>
          </div>

          {/* Revenue Streams */}
          <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2 shadow-2xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
              <span className="text-2xs font-bold text-emerald-800 uppercase tracking-wider">5. Revenue Streams (Inflows)</span>
              <span className="text-2xs text-slate-400 font-mono">{getBlockItems('revenues').length}</span>
            </div>
            <div className="space-y-2">
              {getBlockItems('revenues').map(item => renderStickyNote(item, deleteItem))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderStickyNote(item: BmcItem, onDelete: (id: string) => void) {
  const colorClass =
    item.segmentColor === 'farmers' ? 'bg-emerald-50 border-emerald-200 text-emerald-950' :
    item.segmentColor === 'dealers' ? 'bg-blue-50 border-blue-200 text-blue-950' :
    item.segmentColor === 'processors' ? 'bg-purple-50 border-purple-200 text-purple-950' :
    'bg-slate-50 border-slate-200 text-slate-900';

  const dot =
    item.tag === 'fact' ? '🟢' :
    item.tag === 'supported' ? '🟡' : '🔴';

  return (
    <div key={item.id} className={`p-2.5 rounded-lg border text-xs shadow-2xs space-y-1 relative group ${colorClass}`}>
      <div className="flex items-start justify-between gap-1">
        <span className="text-2xs" title={`Validation: ${item.tag}`}>{dot}</span>
        <button
          onClick={() => onDelete(item.id)}
          className="text-slate-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity p-0.5"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>
      <p className="font-medium leading-tight">{item.text}</p>
      {item.ballparkValue && (
        <span className="font-mono font-bold text-2xs block pt-0.5 opacity-80">{item.ballparkValue}</span>
      )}
    </div>
  );
}
