import { useState } from 'react';
import { Plus, Trash2, CheckCircle2, AlertCircle, Sparkles, RotateCcw, ArrowRight, Activity, HelpCircle } from 'lucide-react';

interface OutcomeStatement {
  id: string;
  jobStep: string;
  statement: string;
  importance: number; // 1-10
  satisfaction: number; // 1-10
}

interface ForceItem {
  id: string;
  force: 'push' | 'pull' | 'anxiety' | 'habit';
  text: string;
}

const MEENAKSHI_OUTCOMES: OutcomeStatement[] = [
  { id: 'o1', jobStep: 'Monitor', statement: 'Minimise the likelihood that I am unaware a water filter is due for replacement', importance: 9.2, satisfaction: 3.1 },
  { id: 'o2', jobStep: 'Prepare', statement: 'Minimise the likelihood of an unverified technician arriving at my home', importance: 9.0, satisfaction: 3.5 },
  { id: 'o3', jobStep: 'Execute', statement: 'Minimise the time between reporting a purifier fault and the technician arriving', importance: 8.8, satisfaction: 4.0 },
  { id: 'o4', jobStep: 'Confirm', statement: 'Minimise the doubt that replaced spare parts are genuine factory parts', importance: 8.5, satisfaction: 4.2 },
  { id: 'o5', jobStep: 'Conclude', statement: 'Minimise the time spent manually filing service paper receipts for warranty', importance: 5.0, satisfaction: 6.5 }
];

const MEENAKSHI_FORCES: ForceItem[] = [
  { id: 'f1', force: 'push', text: 'Missed filter replacement reminders causing foul water taste; having to repeatedly call service helpline' },
  { id: 'f2', force: 'pull', text: 'Local neighborhood technician promises same-day arrival within 2 hours; competitor offers app booking' },
  { id: 'f3', force: 'anxiety', text: 'Fear of unverified strangers entering home when only elderly parents are present; risk of counterfeit filters' },
  { id: 'f4', force: 'habit', text: 'Longstanding trust in Meenakshi brand name; fear of voiding product warranty' }
];

export function JTBDSimulator() {
  const [activeTab, setActiveTab] = useState<'jobStatement' | 'forces' | 'jobMap' | 'opportunity'>('opportunity');
  const [outcomes, setOutcomes] = useState<OutcomeStatement[]>(MEENAKSHI_OUTCOMES);
  const [forces, setForces] = useState<ForceItem[]>(MEENAKSHI_FORCES);

  // Job Statement Builder State
  const [verb, setVerb] = useState('Keep');
  const [objectVal, setObjectVal] = useState("my family's drinking water");
  const [contextVal, setContextVal] = useState('safe without having to think about it or chase technicians');
  const [statementWarning, setStatementWarning] = useState<string | null>(null);

  // New Outcome State
  const [newStep, setNewStep] = useState('Execute');
  const [newOutcomeText, setNewOutcomeText] = useState('');
  const [newImp, setNewImp] = useState(8.5);
  const [newSat, setNewSat] = useState(4.0);

  // Validate Job Statement
  const handleValidateStatement = () => {
    const full = `${verb} ${objectVal} ${contextVal}`.toLowerCase();
    const solutionWords = ['app', 'portal', 'software', 'platform', 'machine', 'filter', 'website', 'ai'];
    const adjectives = ['easily', 'quickly', 'seamlessly', 'cheaply', 'conveniently'];

    if (solutionWords.some(w => full.includes(w))) {
      setStatementWarning('Solution Alert: A JTBD statement must describe what the customer wants to achieve, NOT the technology they use (e.g. remove "app" or "software").');
    } else if (adjectives.some(a => full.includes(a))) {
      setStatementWarning('Adjective Alert: Avoid subjective adverbs like "easily" or "quickly". Describe the contextual circumstance instead.');
    } else {
      setStatementWarning(null);
    }
  };

  const handleAddOutcome = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOutcomeText.trim()) return;

    const newO: OutcomeStatement = {
      id: Date.now().toString(),
      jobStep: newStep,
      statement: newOutcomeText.trim(),
      importance: newImp,
      satisfaction: newSat
    };

    setOutcomes(prev => [...prev, newO]);
    setNewOutcomeText('');
  };

  const deleteOutcome = (id: string) => {
    setOutcomes(prev => prev.filter(o => o.id !== id));
  };

  const calculateOppScore = (imp: number, sat: number) => {
    return (imp + Math.max(0, imp - sat)).toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <span>Customer Motivation Science</span>
            <span>·</span>
            <span>Clayton Christensen & Tony Ulwick</span>
            <span>·</span>
            <span>Outcome-Driven Innovation (ODI)</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Jobs To Be Done & Opportunity Score Engine</h3>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Customers don’t buy products; they hire them to make progress in a circumstance. Calculate Opportunity Scores to find underserved customer needs.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              setOutcomes(MEENAKSHI_OUTCOMES);
              setForces(MEENAKSHI_FORCES);
              setVerb('Keep');
              setObjectVal("my family's drinking water");
              setContextVal('safe without having to think about it or chase technicians');
            }}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Load Meenakshi AMC Case
          </button>
          <button
            onClick={() => {
              setOutcomes([]);
              setForces([]);
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
          onClick={() => setActiveTab('jobStatement')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
            activeTab === 'jobStatement' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          1. Job Statement Builder
        </button>
        <button
          onClick={() => setActiveTab('forces')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
            activeTab === 'forces' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          2. Four Forces of Progress
        </button>
        <button
          onClick={() => setActiveTab('opportunity')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
            activeTab === 'opportunity' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          3. Opportunity Scoring Table
        </button>
      </div>

      {/* Tab 1: Job Statement Builder */}
      {activeTab === 'jobStatement' && (
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
          <div className="pb-2 border-b border-slate-100">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              The Pure Job Statement Formula
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Formula: Verb + Object of the Verb + Contextual Clarifier (No solution nouns; no adjectives).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">1. Action Verb</label>
              <input
                type="text"
                value={verb}
                onChange={(e) => {
                  setVerb(e.target.value);
                  handleValidateStatement();
                }}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 font-bold"
                placeholder="e.g. Keep, Prepare, Minimize"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">2. Object of Action</label>
              <input
                type="text"
                value={objectVal}
                onChange={(e) => {
                  setObjectVal(e.target.value);
                  handleValidateStatement();
                }}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 font-medium"
                placeholder="e.g. drinking water, college students"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">3. Contextual Clarifier (Circumstance)</label>
              <input
                type="text"
                value={contextVal}
                onChange={(e) => {
                  setContextVal(e.target.value);
                  handleValidateStatement();
                }}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 font-medium"
                placeholder="e.g. without having to chase technicians"
              />
            </div>
          </div>

          <div className="p-4 bg-slate-900 text-white rounded-xl space-y-1">
            <span className="text-2xs font-bold text-slate-400 uppercase tracking-wide block">Synthesized Customer Job</span>
            <p className="text-sm font-bold font-display tracking-tight text-white">
              "{verb} {objectVal} {contextVal}."
            </p>
          </div>

          {statementWarning && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{statementWarning}</span>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Four Forces of Progress */}
      {activeTab === 'forces' && (
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
          <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                The Four Forces of Progress (Bob Moesta Model)
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Push + Pull must outweigh Anxiety + Habit for a customer to switch to your product.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* PUSH */}
            <div className="p-4 bg-rose-50/50 border border-rose-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between pb-1 border-b border-rose-100">
                <span className="text-xs font-bold text-rose-900 uppercase tracking-wide">1. PUSH of the Present (Pain)</span>
                <span className="text-2xs font-semibold text-rose-700">Propels Switch</span>
              </div>
              <p className="text-xs text-slate-600">Frustrations and breakdowns with the current way of doing things.</p>
              <div className="space-y-1.5">
                {forces.filter(f => f.force === 'push').map(f => (
                  <div key={f.id} className="p-2.5 bg-white rounded border border-rose-200 text-xs text-slate-900 font-medium">
                    {f.text}
                  </div>
                ))}
              </div>
            </div>

            {/* PULL */}
            <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between pb-1 border-b border-emerald-100">
                <span className="text-xs font-bold text-emerald-900 uppercase tracking-wide">2. PULL of the New (Attraction)</span>
                <span className="text-2xs font-semibold text-emerald-700">Draws Forward</span>
              </div>
              <p className="text-xs text-slate-600">The appealing promise and upside of the new alternative.</p>
              <div className="space-y-1.5">
                {forces.filter(f => f.force === 'pull').map(f => (
                  <div key={f.id} className="p-2.5 bg-white rounded border border-emerald-200 text-xs text-slate-900 font-medium">
                    {f.text}
                  </div>
                ))}
              </div>
            </div>

            {/* ANXIETY */}
            <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between pb-1 border-b border-amber-100">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wide">3. ANXIETY of the New (Doubt)</span>
                <span className="text-2xs font-semibold text-amber-700">Blocks Switch</span>
              </div>
              <p className="text-xs text-slate-600">Fear of the unknown: "What if it doesn't work? What if strangers enter my home?"</p>
              <div className="space-y-1.5">
                {forces.filter(f => f.force === 'anxiety').map(f => (
                  <div key={f.id} className="p-2.5 bg-white rounded border border-amber-200 text-xs text-slate-900 font-medium">
                    {f.text}
                  </div>
                ))}
              </div>
            </div>

            {/* HABIT */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">4. HABIT & Inertia (Allegiance)</span>
                <span className="text-2xs font-semibold text-slate-600">Anchors Present</span>
              </div>
              <p className="text-xs text-slate-600">Comfort with the familiar status quo; reluctance to change routines.</p>
              <div className="space-y-1.5">
                {forces.filter(f => f.force === 'habit').map(f => (
                  <div key={f.id} className="p-2.5 bg-white rounded border border-slate-200 text-xs text-slate-900 font-medium">
                    {f.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Opportunity Scoring Table */}
      {activeTab === 'opportunity' && (
        <div className="space-y-5 bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="pb-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="text-base font-bold text-slate-900">Outcome-Driven Opportunity Scores</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Formula: Opportunity = Importance + (Importance − Satisfaction). Scores ≥ 12 represent golden underserved innovation opportunities!
              </p>
            </div>
            <span className="text-xs font-mono bg-slate-100 text-slate-700 px-3 py-1 rounded">
              High Opportunity Target: ≥ 12.0
            </span>
          </div>

          {/* Add Outcome Form */}
          <form onSubmit={handleAddOutcome} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">Add Measurable Desired Outcome</span>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-3">
                <label className="block text-xs font-medium text-slate-600 mb-1">Universal Job Step</label>
                <select
                  value={newStep}
                  onChange={(e) => setNewStep(e.target.value)}
                  className="w-full text-xs font-medium bg-white border border-slate-200 rounded-lg px-2 py-2 text-slate-800"
                >
                  <option value="Define">1. Define</option>
                  <option value="Locate">2. Locate</option>
                  <option value="Prepare">3. Prepare</option>
                  <option value="Confirm">4. Confirm</option>
                  <option value="Execute">5. Execute</option>
                  <option value="Monitor">6. Monitor</option>
                  <option value="Modify">7. Modify</option>
                  <option value="Conclude">8. Conclude</option>
                </select>
              </div>

              <div className="sm:col-span-5">
                <label className="block text-xs font-medium text-slate-600 mb-1">Outcome ("Minimise the time / likelihood...")</label>
                <input
                  type="text"
                  placeholder="Minimise the time between..."
                  value={newOutcomeText}
                  onChange={(e) => setNewOutcomeText(e.target.value)}
                  className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-600 mb-1">Importance (1-10)</label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="10"
                  value={newImp}
                  onChange={(e) => setNewImp(parseFloat(e.target.value) || 1)}
                  className="w-full text-xs bg-white border border-slate-200 rounded-lg px-2 py-2 text-slate-900 font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-600 mb-1">Satisfaction (1-10)</label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="10"
                  value={newSat}
                  onChange={(e) => setNewSat(parseFloat(e.target.value) || 1)}
                  className="w-full text-xs bg-white border border-slate-200 rounded-lg px-2 py-2 text-slate-900 font-mono"
                />
              </div>

              <div className="sm:col-span-12 flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
                >
                  + Add Outcome Statement
                </button>
              </div>
            </div>
          </form>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                  <th className="py-2.5 px-3">Job Step</th>
                  <th className="py-2.5 px-3">Desired Outcome Statement</th>
                  <th className="py-2.5 px-3 text-center">Importance</th>
                  <th className="py-2.5 px-3 text-center">Satisfaction</th>
                  <th className="py-2.5 px-3 text-center font-bold text-slate-900">Opportunity Score</th>
                  <th className="py-2.5 px-3">Strategic Mandate</th>
                  <th className="py-2.5 px-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {outcomes.map(o => {
                  const opp = parseFloat(calculateOppScore(o.importance, o.satisfaction));
                  const isUnderserved = opp >= 12.0;
                  const isAppropriate = opp >= 8.0 && opp < 12.0;

                  return (
                    <tr key={o.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3">
                        <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-2xs uppercase">
                          {o.jobStep}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-medium text-slate-900 max-w-sm">{o.statement}</td>
                      <td className="py-3 px-3 text-center font-mono tabular-nums text-slate-700">{o.importance.toFixed(1)}</td>
                      <td className="py-3 px-3 text-center font-mono tabular-nums text-slate-700">{o.satisfaction.toFixed(1)}</td>
                      <td className="py-3 px-3 text-center font-mono font-extrabold text-sm tabular-nums text-slate-900">
                        {opp.toFixed(1)}
                      </td>
                      <td className="py-3 px-3">
                        {isUnderserved ? (
                          <span className="text-emerald-700 font-bold inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> High Underserved Opportunity
                          </span>
                        ) : isAppropriate ? (
                          <span className="text-slate-600 text-2xs">Appropriately Served</span>
                        ) : (
                          <span className="text-slate-400 text-2xs">Overserved / Deprioritize</span>
                        )}
                      </td>
                      <td className="py-3 px-2 text-center">
                        <button onClick={() => deleteOutcome(o.id)} className="text-slate-400 hover:text-rose-600 p-1">
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
      )}
    </div>
  );
}
