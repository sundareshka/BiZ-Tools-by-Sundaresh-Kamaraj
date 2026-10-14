import { useState } from 'react';
import { Plus, Trash2, CheckCircle2, AlertCircle, Sparkles, RotateCcw, Link2, Check, ArrowRight } from 'lucide-react';

interface ProfileItem {
  id: string;
  type: 'job' | 'pain' | 'gain';
  text: string;
  subType?: 'functional' | 'social' | 'emotional';
  rank: 'High' | 'Medium' | 'Low';
}

interface ValueMapItem {
  id: string;
  type: 'product' | 'reliever' | 'creator';
  text: string;
  mappedProfileId?: string;
  rank: 'Essential' | 'Nice-to-have';
}

const KODAI_FRESH_PROFILE: ProfileItem[] = [
  { id: 'p1', type: 'job', text: 'Put a healthy fresh meal on the table on weeknights without grocery shopping', subType: 'functional', rank: 'High' },
  { id: 'p2', type: 'job', text: 'Feel like a responsible parent feeding children chemical-free produce', subType: 'emotional', rank: 'High' },
  { id: 'p3', type: 'job', text: 'Be seen by extended family as health-conscious', subType: 'social', rank: 'Medium' },
  { id: 'p4', type: 'pain', text: 'Box arrives with unfamiliar vegetables I do not know how to cook', rank: 'High' },
  { id: 'p5', type: 'pain', text: 'Wasted vegetables rotting in the fridge when evening plans change', rank: 'High' },
  { id: 'p6', type: 'pain', text: 'Unpredictable delivery windows making me wait around the house', rank: 'High' },
  { id: 'p7', type: 'gain', text: 'Zero decision fatigue on what to cook after long work days', rank: 'High' },
  { id: 'p8', type: 'gain', text: 'Kids actually enjoy eating the vegetables without tantrums', rank: 'High' }
];

const KODAI_FRESH_VALUEMAP: ValueMapItem[] = [
  { id: 'v1', type: 'product', text: 'Curated Family Weeknight Veg Box (5 staples + 1 seasonal item)', rank: 'Essential' },
  { id: 'v2', type: 'product', text: 'Mobile ordering and subscription management app', rank: 'Essential' },
  { id: 'v3', type: 'reliever', text: 'Step-by-step 15-minute quick recipe cards with each unfamiliar vegetable', mappedProfileId: 'p4', rank: 'Essential' },
  { id: 'v4', type: 'reliever', text: '1-click "Pause & Skip" week button with zero cancellation fee', mappedProfileId: 'p5', rank: 'Essential' },
  { id: 'v5', type: 'reliever', text: 'Guaranteed 2-hour evening delivery slot with live GPS tracking', mappedProfileId: 'p6', rank: 'Essential' },
  { id: 'v6', type: 'creator', text: 'Pre-portioned meal kits that eliminate weekday dinner planning', mappedProfileId: 'p7', rank: 'Essential' },
  { id: 'v7', type: 'creator', text: 'Kid-friendly illustrated vegetable origin stories and quick cooking videos', mappedProfileId: 'p8', rank: 'Essential' },
  { id: 'v8', type: 'product', text: '30-variety exotic rare vegetable selection catalogue', rank: 'Nice-to-have' } // Deprecation candidate!
];

export function ValuePropositionSimulator() {
  const [profile, setProfile] = useState<ProfileItem[]>(KODAI_FRESH_PROFILE);
  const [valueMap, setValueMap] = useState<ValueMapItem[]>(KODAI_FRESH_VALUEMAP);
  const [activeTab, setActiveTab] = useState<'canvas' | 'fitCheck' | 'testCard'>('canvas');

  // Input states
  const [profileText, setProfileText] = useState('');
  const [profileType, setProfileType] = useState<ProfileItem['type']>('job');
  const [profileRank, setProfileRank] = useState<ProfileItem['rank']>('High');

  const [valueText, setValueText] = useState('');
  const [valueType, setValueType] = useState<ValueMapItem['type']>('reliever');
  const [mappedId, setMappedId] = useState<string>('');

  const handleAddProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileText.trim()) return;

    const newItem: ProfileItem = {
      id: Date.now().toString(),
      type: profileType,
      text: profileText.trim(),
      rank: profileRank
    };

    setProfile(prev => [...prev, newItem]);
    setProfileText('');
  };

  const handleAddValue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valueText.trim()) return;

    const newItem: ValueMapItem = {
      id: Date.now().toString(),
      type: valueType,
      text: valueText.trim(),
      mappedProfileId: mappedId || undefined,
      rank: 'Essential'
    };

    setValueMap(prev => [...prev, newItem]);
    setValueText('');
  };

  const deleteProfileItem = (id: string) => {
    setProfile(prev => prev.filter(p => p.id !== id));
    setValueMap(prev => prev.map(v => v.mappedProfileId === id ? { ...v, mappedProfileId: undefined } : v));
  };

  const deleteValueItem = (id: string) => {
    setValueMap(prev => prev.filter(v => v.id !== id));
  };

  // Fit Analysis calculations
  const highRankedPains = profile.filter(p => p.type === 'pain' && p.rank === 'High');
  const highRankedGains = profile.filter(p => p.type === 'gain' && p.rank === 'High');
  const addressedProfileIds = new Set(valueMap.map(v => v.mappedProfileId).filter(Boolean));

  const unaddressedPains = highRankedPains.filter(p => !addressedProfileIds.has(p.id));
  const unaddressedGains = highRankedGains.filter(g => !addressedProfileIds.has(g.id));

  // Feature deprecation candidates: products/services that relieve no pain and create no gain
  const unmappedFeatures = valueMap.filter(v => v.type === 'product' && !v.mappedProfileId && v.rank === 'Nice-to-have');

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <span>Customer-Offer Fit Engine</span>
            <span>·</span>
            <span>Osterwalder & Pigneur (2014)</span>
            <span>·</span>
            <span>Customer Profile & Value Map</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Value Proposition Canvas & Fit Checker</h3>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Map customer jobs, pains, and gains against your products, pain relievers, and gain creators. Identify dangerous gaps and prune unneeded features.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              setProfile(KODAI_FRESH_PROFILE);
              setValueMap(KODAI_FRESH_VALUEMAP);
            }}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Load Kodai Fresh Case
          </button>
          <button
            onClick={() => {
              setProfile([]);
              setValueMap([]);
            }}
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
          1. Value Map & Customer Profile
        </button>
        <button
          onClick={() => setActiveTab('fitCheck')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
            activeTab === 'fitCheck' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          2. Strategic Fit Check Table ({unaddressedPains.length + unaddressedGains.length} Gaps)
        </button>
        <button
          onClick={() => setActiveTab('testCard')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
            activeTab === 'testCard' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          3. Test Card Generator
        </button>
      </div>

      {/* Tab 1: Visual Canvas Split */}
      {activeTab === 'canvas' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LEFT: VALUE MAP (Square) */}
            <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div>
                  <span className="text-2xs font-bold uppercase tracking-wider text-blue-700">Left Side (Square)</span>
                  <h4 className="text-base font-bold text-slate-900">The Value Map (Your Offer)</h4>
                </div>
                <span className="text-2xs text-slate-500 font-medium">How you create value</span>
              </div>

              {/* Add to Value Map */}
              <form onSubmit={handleAddValue} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                  <div className="sm:col-span-4">
                    <select
                      value={valueType}
                      onChange={(e) => setValueType(e.target.value as any)}
                      className="w-full text-xs font-medium bg-white border border-slate-200 rounded-lg p-1.5 text-slate-800"
                    >
                      <option value="product">Product / Service</option>
                      <option value="reliever">Pain Reliever</option>
                      <option value="creator">Gain Creator</option>
                    </select>
                  </div>
                  <div className="sm:col-span-8">
                    <input
                      type="text"
                      placeholder="e.g. 15-minute quick recipe cards"
                      value={valueText}
                      onChange={(e) => setValueText(e.target.value)}
                      className="w-full text-xs bg-white border border-slate-200 rounded-lg p-1.5 text-slate-900"
                    />
                  </div>
                  <div className="sm:col-span-8">
                    <select
                      value={mappedId}
                      onChange={(e) => setMappedId(e.target.value)}
                      className="w-full text-xs bg-white border border-slate-200 rounded-lg p-1.5 text-slate-700"
                    >
                      <option value="">-- Maps to Profile Item (Optional) --</option>
                      {profile.map(p => (
                        <option key={p.id} value={p.id}>[{p.type.toUpperCase()}] {p.text.substring(0, 45)}...</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-4 flex justify-end">
                    <button
                      type="submit"
                      className="w-full py-1.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg"
                    >
                      + Add to Value Map
                    </button>
                  </div>
                </div>
              </form>

              {/* Value Map Items */}
              <div className="space-y-3">
                {/* Products & Services */}
                <div className="p-3 bg-blue-50/40 border border-blue-200 rounded-xl space-y-1.5">
                  <span className="text-2xs font-bold text-blue-900 uppercase tracking-wide block">Products & Services</span>
                  {valueMap.filter(v => v.type === 'product').map(v => (
                    <div key={v.id} className="p-2 bg-white rounded border border-blue-200 text-xs flex items-center justify-between group">
                      <span className="font-semibold text-slate-900">{v.text}</span>
                      <button onClick={() => deleteValueItem(v.id)} className="text-slate-400 hover:text-rose-600 opacity-0 group-hover:opacity-100">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Pain Relievers */}
                <div className="p-3 bg-rose-50/40 border border-rose-200 rounded-xl space-y-1.5">
                  <span className="text-2xs font-bold text-rose-900 uppercase tracking-wide block">Pain Relievers</span>
                  {valueMap.filter(v => v.type === 'reliever').map(v => (
                    <div key={v.id} className="p-2 bg-white rounded border border-rose-200 text-xs flex items-center justify-between group">
                      <span className="text-slate-800">{v.text}</span>
                      <button onClick={() => deleteValueItem(v.id)} className="text-slate-400 hover:text-rose-600 opacity-0 group-hover:opacity-100">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Gain Creators */}
                <div className="p-3 bg-emerald-50/40 border border-emerald-200 rounded-xl space-y-1.5">
                  <span className="text-2xs font-bold text-emerald-900 uppercase tracking-wide block">Gain Creators</span>
                  {valueMap.filter(v => v.type === 'creator').map(v => (
                    <div key={v.id} className="p-2 bg-white rounded border border-emerald-200 text-xs flex items-center justify-between group">
                      <span className="text-slate-800">{v.text}</span>
                      <button onClick={() => deleteValueItem(v.id)} className="text-slate-400 hover:text-rose-600 opacity-0 group-hover:opacity-100">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: CUSTOMER PROFILE (Circle) */}
            <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div>
                  <span className="text-2xs font-bold uppercase tracking-wider text-emerald-700">Right Side (Circle)</span>
                  <h4 className="text-base font-bold text-slate-900">Customer Profile (The User)</h4>
                </div>
                <span className="text-2xs text-slate-500 font-medium">Customer's own words</span>
              </div>

              {/* Add to Profile */}
              <form onSubmit={handleAddProfile} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                  <div className="sm:col-span-4">
                    <select
                      value={profileType}
                      onChange={(e) => setProfileType(e.target.value as any)}
                      className="w-full text-xs font-medium bg-white border border-slate-200 rounded-lg p-1.5 text-slate-800"
                    >
                      <option value="job">Customer Job</option>
                      <option value="pain">Customer Pain</option>
                      <option value="gain">Customer Gain</option>
                    </select>
                  </div>
                  <div className="sm:col-span-5">
                    <input
                      type="text"
                      placeholder="e.g. Unpredictable delivery time"
                      value={profileText}
                      onChange={(e) => setProfileText(e.target.value)}
                      className="w-full text-xs bg-white border border-slate-200 rounded-lg p-1.5 text-slate-900"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <select
                      value={profileRank}
                      onChange={(e) => setProfileRank(e.target.value as any)}
                      className="w-full text-xs font-medium bg-white border border-slate-200 rounded-lg p-1.5 text-slate-800"
                    >
                      <option value="High">High Severity</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                  <div className="sm:col-span-12 flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg"
                    >
                      + Add to Customer Profile
                    </button>
                  </div>
                </div>
              </form>

              {/* Customer Profile Items */}
              <div className="space-y-3">
                {/* Jobs */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                  <span className="text-2xs font-bold text-slate-800 uppercase tracking-wide block">Customer Jobs</span>
                  {profile.filter(p => p.type === 'job').map(p => (
                    <div key={p.id} className="p-2 bg-white rounded border border-slate-200 text-xs flex items-center justify-between group">
                      <span className="font-medium text-slate-900">{p.text}</span>
                      <button onClick={() => deleteProfileItem(p.id)} className="text-slate-400 hover:text-rose-600 opacity-0 group-hover:opacity-100">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Pains */}
                <div className="p-3 bg-rose-50/40 border border-rose-200 rounded-xl space-y-1.5">
                  <span className="text-2xs font-bold text-rose-900 uppercase tracking-wide block">Customer Pains (Frustrations & Obstacles)</span>
                  {profile.filter(p => p.type === 'pain').map(p => (
                    <div key={p.id} className="p-2 bg-white rounded border border-rose-200 text-xs flex items-center justify-between group">
                      <span className="text-rose-950 font-medium">{p.text}</span>
                      <button onClick={() => deleteProfileItem(p.id)} className="text-slate-400 hover:text-rose-600 opacity-0 group-hover:opacity-100">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Gains */}
                <div className="p-3 bg-emerald-50/40 border border-emerald-200 rounded-xl space-y-1.5">
                  <span className="text-2xs font-bold text-emerald-900 uppercase tracking-wide block">Customer Gains (Desired Outcomes)</span>
                  {profile.filter(p => p.type === 'gain').map(p => (
                    <div key={p.id} className="p-2 bg-white rounded border border-emerald-200 text-xs flex items-center justify-between group">
                      <span className="text-emerald-950 font-medium">{p.text}</span>
                      <button onClick={() => deleteProfileItem(p.id)} className="text-slate-400 hover:text-rose-600 opacity-0 group-hover:opacity-100">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Fit Check Table */}
      {activeTab === 'fitCheck' && (
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-5">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h4 className="text-base font-bold text-slate-900">Strategic Fit Check Audit</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Every top-ranked pain and gain must map to a specific reliever or creator. Unaddressed items are strategic gaps; unmapped features are waste.
              </p>
            </div>
            <span className="text-xs font-mono bg-slate-100 text-slate-700 px-3 py-1 rounded">
              {unaddressedPains.length} Unaddressed High Pains
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                  <th className="py-2.5 px-3">Profile Item (Pain/Gain)</th>
                  <th className="py-2.5 px-3">Severity / Relevance</th>
                  <th className="py-2.5 px-3">Addressed By Value Map</th>
                  <th className="py-2.5 px-3">Fit Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {profile.filter(p => p.type === 'pain' || p.type === 'gain').map(p => {
                  const matchingMapItems = valueMap.filter(v => v.mappedProfileId === p.id);
                  const isFit = matchingMapItems.length > 0;

                  return (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3 font-semibold text-slate-900 max-w-sm">
                        [{p.type.toUpperCase()}] {p.text}
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 text-2xs font-bold rounded ${p.rank === 'High' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'}`}>
                          {p.rank}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-700 max-w-sm">
                        {isFit ? (
                          matchingMapItems.map(m => m.text).join('; ')
                        ) : (
                          <span className="text-rose-600 font-medium">None (Unaddressed Pain Point)</span>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        {isFit ? (
                          <span className="text-emerald-700 font-bold inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Fit
                          </span>
                        ) : (
                          <span className="text-rose-700 font-bold inline-flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" /> Strategic Gap
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pruning Recommendations */}
          {unmappedFeatures.length > 0 && (
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wide block">
                Feature Deprecation Candidates (Pruning Candidates)
              </span>
              <p className="text-xs text-amber-800">
                These features address no ranked customer pain and create no validated gain. They add procurement or engineering cost without driving willingness to pay:
              </p>
              <div className="space-y-1">
                {unmappedFeatures.map(f => (
                  <div key={f.id} className="p-2 bg-white rounded border border-amber-200 text-xs text-slate-800 font-medium">
                    ⚠️ {f.text} — <span className="text-slate-500 italic">Consider deprecating or moving to optional tier</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Test Card Generator */}
      {activeTab === 'testCard' && (
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
          <div className="pb-2 border-b border-slate-100">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Strategyzer Test Card & Hypothesis Template
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Never build a major feature without first defining the test, the metric, and a numeric success threshold.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs">
            <div className="space-y-1">
              <span className="font-bold text-slate-500 uppercase text-2xs block">1. Hypothesis Statement</span>
              <p className="font-semibold text-slate-900">
                We believe that: <span className="font-normal text-slate-700">Dual-income families will reduce subscription cancellations if they can pause their delivery for a week with 1 click in the app.</span>
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-bold text-slate-500 uppercase text-2xs block">2. Test Experiment</span>
              <p className="font-semibold text-slate-900">
                To verify this, we will: <span className="font-normal text-slate-700">Roll out a "Pause & Skip" button to a pilot cohort of 150 families for 8 weeks.</span>
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-bold text-slate-500 uppercase text-2xs block">3. Metric</span>
              <p className="font-semibold text-slate-900">
                And measure: <span className="font-normal text-slate-700">Monthly subscription churn rate and weekly skip volume.</span>
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-bold text-slate-500 uppercase text-2xs block">4. Success Criterion</span>
              <p className="font-semibold text-slate-900">
                We are right if: <span className="font-normal text-slate-700">Monthly churn drops from 11% to below 6% within 8 weeks.</span>
              </p>
            </div>

            <div className="pt-2 border-t border-slate-200 text-emerald-800 font-medium">
              <span className="font-bold">Result in Kodai Fresh: </span>
              Actual churn dropped to 5.0%; pause-and-skip reduced cancellations by 30% — hypothesis supported!
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
