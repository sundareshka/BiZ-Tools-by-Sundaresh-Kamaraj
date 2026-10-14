import { useState } from 'react';
import { Plus, Trash2, CheckCircle2, XCircle, AlertTriangle, Sparkles, RotateCcw, Wrench } from 'lucide-react';

export interface VrioItem {
  id: string;
  name: string;
  valuable: boolean;
  rare: boolean;
  costlyToImitate: boolean;
  organised: boolean;
  imitationBarrierType: string;
  evidence: string;
  orgGapRemedy: string;
}

const THANJAVUR_RICE_PRESET: VrioItem[] = [
  {
    id: 'v-1',
    name: 'Modern Automated Parboiling Plant Machinery',
    valuable: true,
    rare: false, // 2 competitors bought identical plant within 18 months!
    costlyToImitate: false,
    organised: true,
    imitationBarrierType: 'None (Equipment purchased off-the-shelf from German vendor)',
    evidence: 'Two regional millers installed identical parboiling boilers; it is table-stakes hygiene',
    orgGapRemedy: 'Treat as standard operational hygiene; minimize operating maintenance cost rather than advertising it as a moat'
  },
  {
    id: 'v-2',
    name: '25-Year Informal Network of 1,800 Paddy Farmers',
    valuable: true,
    rare: true,
    costlyToImitate: true, // Social complexity + historical trust
    organised: false, // No contracts, no app, informal
    imitationBarrierType: 'Social Complexity & Unique History (decades of generational family goodwill)',
    evidence: 'Farmers sell premium raw grain to Thanjavur first even when spot market prices fluctuate',
    orgGapRemedy: 'Fix the Organization Gap: Launch formal farmer partnership contracts, an agronomy support app, and predictable payment terms'
  },
  {
    id: 'v-3',
    name: 'Master Sensory Grain Quality-Grading Know-how',
    valuable: true,
    rare: true,
    costlyToImitate: true,
    organised: true,
    imitationBarrierType: 'Causal Ambiguity (tacit sensory testing blend passed down through head millers)',
    evidence: 'Zero defective shipments across 3 years; distributors rate consistency #1 buying criterion',
    orgGapRemedy: 'Maintain codification; launch "Certified Graded Quality" seal on retail consumer packs'
  },
  {
    id: 'v-4',
    name: 'Regional Consumer Brand Billboard Advertising',
    valuable: true,
    rare: true,
    costlyToImitate: false, // Easily duplicated with ad capital
    organised: true,
    imitationBarrierType: 'None (National conglomerate launched 3x larger advertising blitz)',
    evidence: 'Brand awareness dropped as national brand spent ₹10 Cr on television',
    orgGapRemedy: 'Reallocate ₹3 Cr from generic outdoor billboards into farmer network and quality certification'
  }
];

export function VRIOSimulator() {
  const [items, setItems] = useState<VrioItem[]>(THANJAVUR_RICE_PRESET);
  const [selectedItemId, setSelectedItemId] = useState<string>('v-2');

  // New Item State
  const [name, setName] = useState('');
  const [valuable, setValuable] = useState(true);
  const [rare, setRare] = useState(false);
  const [costly, setCostly] = useState(false);
  const [organised, setOrganised] = useState(true);
  const [barrier, setBarrier] = useState('');
  const [evidence, setEvidence] = useState('');
  const [remedy, setRemedy] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newItem: VrioItem = {
      id: Date.now().toString(),
      name: name.trim(),
      valuable,
      rare,
      costlyToImitate: costly,
      organised,
      imitationBarrierType: barrier.trim() || 'General operational process',
      evidence: evidence.trim() || 'Internal evaluation',
      orgGapRemedy: remedy.trim() || 'Maintain operational support'
    };

    setItems(prev => [newItem, ...prev]);
    setName('');
    setEvidence('');
    setRemedy('');
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const calculateStatus = (item: VrioItem) => {
    if (!item.valuable) return { label: 'Competitive Disadvantage', tier: 'disadvantage', color: 'text-rose-700 bg-rose-100 border-rose-300' };
    if (!item.rare) return { label: 'Competitive Parity', tier: 'parity', color: 'text-amber-800 bg-amber-100 border-amber-300' };
    if (!item.costlyToImitate) return { label: 'Temporary Competitive Advantage', tier: 'temporary', color: 'text-blue-800 bg-blue-100 border-blue-300' };
    if (!item.organised) return { label: 'Unused / Unrealized Advantage (Fix Org)', tier: 'unused', color: 'text-orange-800 bg-orange-100 border-orange-300' };
    return { label: 'Sustained Competitive Advantage', tier: 'sustained', color: 'text-emerald-800 bg-emerald-100 border-emerald-300' };
  };

  const selectedItem = items.find(i => i.id === selectedItemId) || items[0];
  const selectedStatus = selectedItem ? calculateStatus(selectedItem) : null;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <span>Resource-Based View (RBV)</span>
            <span>·</span>
            <span>Jay Barney Framework</span>
            <span>·</span>
            <span>Defensibility Ladder</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">VRIO Resource Defensibility & Org Gap Tester</h3>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Filter internal assets through the four sequential tests (Valuable, Rare, Costly to Imitate, Organised) to uncover table-stakes parity and unexploited gems.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setItems(THANJAVUR_RICE_PRESET)}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Load Thanjavur Rice Case
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

      {/* Decision Ladder Visual Guide */}
      <div className="p-4 bg-slate-900 text-white rounded-xl shadow-xs space-y-2">
        <span className="text-2xs font-bold uppercase tracking-wider text-slate-400">The VRIO Sequential Decision Logic</span>
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="text-slate-300">Valuable? (No → <span className="text-rose-400 font-bold">Disadvantage</span>)</span>
          <span className="text-slate-500">→</span>
          <span className="text-slate-300">Rare? (No → <span className="text-amber-400 font-bold">Parity</span>)</span>
          <span className="text-slate-500">→</span>
          <span className="text-slate-300">Inimitable? (No → <span className="text-blue-400 font-bold">Temporary</span>)</span>
          <span className="text-slate-500">→</span>
          <span className="text-slate-300">Organised? (No → <span className="text-orange-400 font-bold">Unused Advantage</span>)</span>
          <span className="text-slate-500">→</span>
          <span className="text-emerald-400 font-bold">Sustained Advantage</span>
        </div>
      </div>

      {/* Add Resource Form */}
      <form onSubmit={handleAdd} className="p-5 bg-white border border-slate-200 rounded-xl space-y-4 shadow-xs">
        <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">Test New Resource or Capability</span>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-4">
            <label className="block text-xs font-medium text-slate-600 mb-1">Resource / Capability Name</label>
            <input
              type="text"
              placeholder="e.g. 25-year farmer relationships in Coorg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div className="md:col-span-4">
            <label className="block text-xs font-medium text-slate-600 mb-1">Inimitability Basis (History/Ambiguity/Legal)</label>
            <input
              type="text"
              placeholder="e.g. Social complexity and informal generational trust"
              value={barrier}
              onChange={(e) => setBarrier(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div className="md:col-span-4">
            <label className="block text-xs font-medium text-slate-600 mb-1">Evidence Citation</label>
            <input
              type="text"
              placeholder="e.g. 10 closest competitors benchmark data"
              value={evidence}
              onChange={(e) => setEvidence(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          {/* 4 Boolean Toggles */}
          <div className="md:col-span-8 flex flex-wrap items-center gap-4 pt-2">
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-700 cursor-pointer">
              <input type="checkbox" checked={valuable} onChange={(e) => setValuable(e.target.checked)} className="rounded accent-slate-900" />
              <span>1. Valuable?</span>
            </label>

            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-700 cursor-pointer">
              <input type="checkbox" checked={rare} onChange={(e) => setRare(e.target.checked)} className="rounded accent-slate-900" />
              <span>2. Rare? (≤2 rivals have it)</span>
            </label>

            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-700 cursor-pointer">
              <input type="checkbox" checked={costly} onChange={(e) => setCostly(e.target.checked)} className="rounded accent-slate-900" />
              <span>3. Costly to Imitate?</span>
            </label>

            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-700 cursor-pointer">
              <input type="checkbox" checked={organised} onChange={(e) => setOrganised(e.target.checked)} className="rounded accent-slate-900" />
              <span>4. Organised to Capture?</span>
            </label>
          </div>

          <div className="md:col-span-4 flex justify-end pt-2">
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Add to VRIO Ladder
            </button>
          </div>
        </div>
      </form>

      {/* Main Table & Selected Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table of Resources */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Inventoried Firm Resources ({items.length})</span>
            <span className="text-2xs text-slate-500">Click row to inspect organizational fix</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                  <th className="py-2.5 px-3">Resource</th>
                  <th className="py-2.5 px-2 text-center">V</th>
                  <th className="py-2.5 px-2 text-center">R</th>
                  <th className="py-2.5 px-2 text-center">I</th>
                  <th className="py-2.5 px-2 text-center">O</th>
                  <th className="py-2.5 px-3">Defensibility Status</th>
                  <th className="py-2.5 px-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map(item => {
                  const status = calculateStatus(item);
                  const isSelected = item.id === selectedItemId;

                  return (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedItemId(item.id)}
                      className={`cursor-pointer transition-colors ${isSelected ? 'bg-slate-100/80 font-medium' : 'hover:bg-slate-50/80'}`}
                    >
                      <td className="py-3 px-3 font-semibold text-slate-900 max-w-xs">{item.name}</td>
                      <td className="py-3 px-2 text-center">
                        {item.valuable ? <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" /> : <XCircle className="w-4 h-4 text-slate-300 inline" />}
                      </td>
                      <td className="py-3 px-2 text-center">
                        {item.rare ? <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" /> : <XCircle className="w-4 h-4 text-slate-300 inline" />}
                      </td>
                      <td className="py-3 px-2 text-center">
                        {item.costlyToImitate ? <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" /> : <XCircle className="w-4 h-4 text-slate-300 inline" />}
                      </td>
                      <td className="py-3 px-2 text-center">
                        {item.organised ? <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" /> : <XCircle className="w-4 h-4 text-slate-300 inline" />}
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 text-2xs font-bold border rounded ${status.color}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-center" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => deleteItem(item.id)} className="text-slate-400 hover:text-rose-600 p-1">
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

        {/* Selected Resource Diagnostic Inspector */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <span className="text-2xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Resource Deep Dive
            </span>
            <h4 className="text-base font-bold text-slate-900">{selectedItem?.name}</h4>
            {selectedStatus && (
              <span className={`inline-block mt-2 px-2.5 py-1 text-2xs font-bold border rounded-lg ${selectedStatus.color}`}>
                {selectedStatus.label}
              </span>
            )}
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg space-y-1">
              <span className="text-2xs font-bold text-slate-500 uppercase tracking-wider block">Inimitability Mechanism</span>
              <p className="text-xs text-slate-700">{selectedItem?.imitationBarrierType}</p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg space-y-1">
              <span className="text-2xs font-bold text-slate-500 uppercase tracking-wider block">Empirical Proof Note</span>
              <p className="text-xs text-slate-700 italic">"{selectedItem?.evidence}"</p>
            </div>

            {selectedItem && !selectedItem.organised && (
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl space-y-2">
                <div className="flex items-center gap-1.5 text-orange-900 font-bold text-xs uppercase tracking-wide">
                  <Wrench className="w-4 h-4 text-orange-700" />
                  <span>Organisation Gap Remediation (Top ROI)</span>
                </div>
                <p className="text-xs text-orange-800 leading-relaxed font-medium">
                  {selectedItem.orgGapRemedy}
                </p>
                <p className="text-2xs text-orange-700">
                  Fixing the organization gap on an existing valuable, rare asset generates faster profit than investing in new machinery!
                </p>
              </div>
            )}

            {selectedItem && selectedItem.rare === false && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900">
                <span className="font-bold">Competitive Parity Insight: </span>
                Since competitors can easily acquire or duplicate this, treat it as a hygiene cost to optimize rather than a hero differentiator.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
