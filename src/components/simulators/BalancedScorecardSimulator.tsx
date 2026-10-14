import { useState } from 'react';
import { ArrowUp, Play, CheckCircle2, AlertCircle, Sparkles, RotateCcw, Link2, TrendingUp } from 'lucide-react';

interface BscObjective {
  id: string;
  perspective: 'Financial' | 'Customer' | 'Process' | 'Learning';
  title: string;
  measure: string;
  type: 'Leading' | 'Lagging';
  baseline: string;
  target12m: string;
  currentActual: string;
  initiative: string;
  owner: string;
  connectedTo: string[]; // ids of higher-level objectives it causes
  status: 'green' | 'amber' | 'red';
}

const VAIGAI_OBJECTIVES: BscObjective[] = [
  // Financial (Top)
  {
    id: 'f-1',
    perspective: 'Financial',
    title: 'Grow RevPAR & Gross Margin',
    measure: 'RevPAR (Revenue per Available Room)',
    type: 'Lagging',
    baseline: '₹2,400',
    target12m: '₹2,750 (+14%)',
    currentActual: '₹2,735',
    initiative: 'Yield pricing optimization & direct corporate booking push',
    owner: 'CFO / Owner',
    connectedTo: [],
    status: 'green'
  },
  {
    id: 'f-2',
    perspective: 'Financial',
    title: 'Increase Restaurant Cover Volume',
    measure: 'Daily covers served',
    type: 'Lagging',
    baseline: '320 covers',
    target12m: '360 covers (+11%)',
    currentActual: '355 covers',
    initiative: 'Authentic South Indian thali lunch promotion for business travellers',
    owner: 'F&B Director',
    connectedTo: [],
    status: 'green'
  },

  // Customer (Tier 2)
  {
    id: 'c-1',
    perspective: 'Customer',
    title: 'Become Preferred Business & Pilgrim Choice',
    measure: 'Average online guest rating (OTAs & Google)',
    type: 'Lagging',
    baseline: '3.8 / 5.0',
    target12m: '4.3 / 5.0',
    currentActual: '4.3 / 5.0',
    initiative: 'Rapid 24h complaint resolution & personalized welcome',
    owner: 'Customer Experience Head',
    connectedTo: ['f-1'],
    status: 'green'
  },
  {
    id: 'c-2',
    perspective: 'Customer',
    title: 'Drive Repeat Guest Loyalty',
    measure: 'Repeat guest booking share',
    type: 'Lagging',
    baseline: '18%',
    target12m: '26%',
    currentActual: '20%', // Notice: lagging behind! Causal test!
    initiative: 'Pilgrim package bundle with temple express darshan logistics',
    owner: 'Marketing Head',
    connectedTo: ['f-1', 'f-2'],
    status: 'amber'
  },

  // Internal Process (Tier 3)
  {
    id: 'p-1',
    perspective: 'Process',
    title: 'Streamline Front-Desk Check-In',
    measure: 'Average check-in wait duration',
    type: 'Leading',
    baseline: '9 minutes',
    target12m: '4 minutes',
    currentActual: '4.2 minutes',
    initiative: 'Mobile pre-check-in & fast-key issuance desk',
    owner: 'Front Office Manager',
    connectedTo: ['c-1'],
    status: 'green'
  },
  {
    id: 'p-2',
    perspective: 'Process',
    title: 'Resolve Service Complaints Instantly',
    measure: 'Resolution of room complaints within 24 hours',
    type: 'Leading',
    baseline: '55%',
    target12m: '88%',
    currentActual: '86%',
    initiative: 'Empower floor supervisors with instant ₹500 waiver/upgrade authority',
    owner: 'Operations GM',
    connectedTo: ['c-1', 'c-2'],
    status: 'green'
  },

  // Learning & Growth (Bottom)
  {
    id: 'l-1',
    perspective: 'Learning',
    title: 'Upskill Staff in Hospitality Standards',
    measure: '% Frontline staff certified in service standards',
    type: 'Leading',
    baseline: '40%',
    target12m: '100%',
    currentActual: '100%',
    initiative: 'Mandatory 10-day hospitality excellence academy for all 260 staff',
    owner: 'HR & Training Lead',
    connectedTo: ['p-1', 'p-2'],
    status: 'green'
  },
  {
    id: 'l-2',
    perspective: 'Learning',
    title: 'Retain Core Frontline Talent',
    measure: 'Annual staff turnover rate',
    type: 'Leading',
    baseline: '38%',
    target12m: '25%',
    currentActual: '27%',
    initiative: 'Quarterly performance recognition bonuses & employee meal upgrade',
    owner: 'HR Director',
    connectedTo: ['p-1', 'p-2'],
    status: 'green'
  }
];

export function BalancedScorecardSimulator() {
  const [objectives, setObjectives] = useState<BscObjective[]>(VAIGAI_OBJECTIVES);
  const [selectedObjectiveId, setSelectedObjectiveId] = useState<string>('c-1');
  const [simulationQuarter, setSimulationQuarter] = useState<number>(4);
  const [hypothesisInsight, setHypothesisInsight] = useState<string | null>(
    'Strategic Hypothesis Diagnostic: Notice that Staff Certification (Learning: 100%) and Check-In Time (Process: 4.2 min) directly propelled Online Ratings (Customer: 4.3). However, Repeat Guest Share (c-2) sits at 20% vs 26% target because the original loyalty points card initiative had low redemption, prompting the team to redesign into a Temple Logistics bundle!'
  );

  const selectedObj = objectives.find(o => o.id === selectedObjectiveId) || objectives[0];

  const handleSimulateQuarter = (q: number) => {
    setSimulationQuarter(q);
    if (q === 1) {
      setObjectives(prev => prev.map(o => {
        if (o.perspective === 'Learning') return { ...o, currentActual: '55%', status: 'amber' };
        if (o.perspective === 'Process') return { ...o, currentActual: '8.2 min', status: 'amber' };
        if (o.perspective === 'Customer') return { ...o, currentActual: '3.9', status: 'red' };
        return { ...o, currentActual: '₹2,420', status: 'red' };
      }));
      setHypothesisInsight('Q1 Review: Learning initiatives underway. Lagging customer and financial metrics have not moved yet—this is expected in the early cycle of strategy implementation.');
    } else if (q === 2) {
      setObjectives(prev => prev.map(o => {
        if (o.perspective === 'Learning') return { ...o, currentActual: '80%', status: 'green' };
        if (o.perspective === 'Process') return { ...o, currentActual: '6.0 min', status: 'green' };
        if (o.perspective === 'Customer') return { ...o, currentActual: '4.0', status: 'amber' };
        return { ...o, currentActual: '₹2,510', status: 'amber' };
      }));
      setHypothesisInsight('Q2 Review: Leading indicators in Learning & Process are turning green! Customer rating starts inching upward from 3.8 to 4.0.');
    } else if (q === 3) {
      setObjectives(prev => prev.map(o => {
        if (o.perspective === 'Learning') return { ...o, currentActual: '95%', status: 'green' };
        if (o.perspective === 'Process') return { ...o, currentActual: '4.8 min', status: 'green' };
        if (o.perspective === 'Customer' && o.id === 'c-1') return { ...o, currentActual: '4.2', status: 'green' };
        if (o.perspective === 'Customer' && o.id === 'c-2') return { ...o, currentActual: '19%', status: 'red' };
        return { ...o, currentActual: '₹2,640', status: 'green' };
      }));
      setHypothesisInsight('Q3 Review (Disproven Hypothesis Alert): Process check-in is green, but Repeat Guests (c-2) remains stagnant. The GM investigates and discovers the loyalty points app was ignored by business travelers. Pivot initiated!');
    } else {
      setObjectives(VAIGAI_OBJECTIVES);
      setHypothesisInsight('Q4 Review: Hypothesis validated! Learning & Growth -> Process excellence -> Online Ratings -> RevPAR (+14%). Scorecard successfully executed across all 3 hotels.');
    }
  };

  const getPerspectiveObjectives = (p: BscObjective['perspective']) => objectives.filter(o => o.perspective === p);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <span>Execution & Strategy Map Engine</span>
            <span>·</span>
            <span>Kaplan & Norton BSC</span>
            <span>·</span>
            <span>Cause & Effect Bottom-Up</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Balanced Scorecard & Strategy Map Studio</h3>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Map cause-and-effect links from Learning & Growth up to Financial returns, pair leading and lagging measures, and test strategic hypotheses in monthly reviews.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setObjectives(VAIGAI_OBJECTIVES)}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Load Vaigai Hospitality Case
          </button>
          <button
            onClick={() => setObjectives([])}
            className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 bg-white border border-slate-200 rounded-lg transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>
      </div>

      {/* Interactive Quarterly Review Cadence Simulator Bar */}
      <div className="p-4 bg-slate-900 text-white rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider block">Executive Strategy Review Rhythm</span>
          <h4 className="text-sm font-bold text-white mt-0.5">Simulate 12-Month Cause & Effect Rollout</h4>
        </div>

        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map(q => (
            <button
              key={q}
              onClick={() => handleSimulateQuarter(q)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                simulationQuarter === q ? 'bg-white text-slate-900 shadow-xs' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Quarter {q}
            </button>
          ))}
        </div>
      </div>

      {hypothesisInsight && (
        <div className="p-4 bg-blue-50/80 border border-blue-200 rounded-xl flex items-start gap-3 text-xs text-blue-900">
          <TrendingUp className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">{hypothesisInsight}</p>
        </div>
      )}

      {/* Strategy Map: 4 Horizontal Strata Bottom-Up */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="font-bold uppercase tracking-wider text-slate-700">Visual Strategy Map (Cause & Effect Hierarchy)</span>
          <span className="flex items-center gap-1 text-slate-600">
            <ArrowUp className="w-3.5 h-3.5" /> Read bottom-up from enablers to financial return
          </span>
        </div>

        {/* 1. FINANCIAL PERSPECTIVE (Top) */}
        <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2.5 shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-2xs font-bold bg-emerald-100 text-emerald-800 rounded">1. FINANCIAL</span>
              <span className="text-xs text-slate-500">"If we succeed, how will we look to shareholders?"</span>
            </div>
            <span className="text-2xs text-slate-400 font-mono">Lagging Outcomes</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {getPerspectiveObjectives('Financial').map(obj => (
              <div
                key={obj.id}
                onClick={() => setSelectedObjectiveId(obj.id)}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                  selectedObjectiveId === obj.id
                    ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h5 className="text-xs font-bold text-slate-900">{obj.title}</h5>
                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                    obj.status === 'green' ? 'bg-emerald-500' : obj.status === 'amber' ? 'bg-amber-500' : 'bg-rose-500'
                  }`} />
                </div>
                <div className="mt-1 flex items-baseline justify-between text-2xs text-slate-600">
                  <span>KPI: {obj.measure}</span>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">{obj.currentActual} / {obj.target12m}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Connector Line */}
        <div className="flex justify-center -my-2 text-slate-400">
          <ArrowUp className="w-4 h-4" />
        </div>

        {/* 2. CUSTOMER PERSPECTIVE */}
        <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2.5 shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-2xs font-bold bg-blue-100 text-blue-800 rounded">2. CUSTOMER</span>
              <span className="text-xs text-slate-500">"To achieve our financial goals, what value must we deliver to customers?"</span>
            </div>
            <span className="text-2xs text-slate-400 font-mono">Value Proposition</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {getPerspectiveObjectives('Customer').map(obj => (
              <div
                key={obj.id}
                onClick={() => setSelectedObjectiveId(obj.id)}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                  selectedObjectiveId === obj.id
                    ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h5 className="text-xs font-bold text-slate-900">{obj.title}</h5>
                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                    obj.status === 'green' ? 'bg-emerald-500' : obj.status === 'amber' ? 'bg-amber-500' : 'bg-rose-500'
                  }`} />
                </div>
                <div className="mt-1 flex items-baseline justify-between text-2xs text-slate-600">
                  <span>KPI: {obj.measure}</span>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">{obj.currentActual} / {obj.target12m}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Connector Line */}
        <div className="flex justify-center -my-2 text-slate-400">
          <ArrowUp className="w-4 h-4" />
        </div>

        {/* 3. INTERNAL PROCESS PERSPECTIVE */}
        <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2.5 shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-2xs font-bold bg-amber-100 text-amber-800 rounded">3. INTERNAL PROCESS</span>
              <span className="text-xs text-slate-500">"To satisfy customers and shareholders, what processes must we excel at?"</span>
            </div>
            <span className="text-2xs text-slate-400 font-mono">Operational Excellence</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {getPerspectiveObjectives('Process').map(obj => (
              <div
                key={obj.id}
                onClick={() => setSelectedObjectiveId(obj.id)}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                  selectedObjectiveId === obj.id
                    ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h5 className="text-xs font-bold text-slate-900">{obj.title}</h5>
                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                    obj.status === 'green' ? 'bg-emerald-500' : obj.status === 'amber' ? 'bg-amber-500' : 'bg-rose-500'
                  }`} />
                </div>
                <div className="mt-1 flex items-baseline justify-between text-2xs text-slate-600">
                  <span>KPI: {obj.measure}</span>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">{obj.currentActual} / {obj.target12m}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Connector Line */}
        <div className="flex justify-center -my-2 text-slate-400">
          <ArrowUp className="w-4 h-4" />
        </div>

        {/* 4. LEARNING & GROWTH PERSPECTIVE (Bottom) */}
        <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2.5 shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-2xs font-bold bg-purple-100 text-purple-800 rounded">4. LEARNING & GROWTH</span>
              <span className="text-xs text-slate-500">"How will our people, systems, and culture sustain our ability to change?"</span>
            </div>
            <span className="text-2xs text-slate-400 font-mono">Foundational Capabilities</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {getPerspectiveObjectives('Learning').map(obj => (
              <div
                key={obj.id}
                onClick={() => setSelectedObjectiveId(obj.id)}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                  selectedObjectiveId === obj.id
                    ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h5 className="text-xs font-bold text-slate-900">{obj.title}</h5>
                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                    obj.status === 'green' ? 'bg-emerald-500' : obj.status === 'amber' ? 'bg-amber-500' : 'bg-rose-500'
                  }`} />
                </div>
                <div className="mt-1 flex items-baseline justify-between text-2xs text-slate-600">
                  <span>KPI: {obj.measure}</span>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">{obj.currentActual} / {obj.target12m}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Objective Inspector Panel */}
      <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 text-2xs font-bold bg-slate-100 text-slate-800 rounded uppercase">
                {selectedObj.perspective} Perspective
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className={`text-2xs font-bold px-2 py-0.5 rounded ${
                selectedObj.type === 'Leading' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-700'
              }`}>
                {selectedObj.type} Indicator
              </span>
            </div>
            <h4 className="text-base font-bold text-slate-900">{selectedObj.title}</h4>
          </div>

          <div className="text-right">
            <span className="text-2xs font-bold text-slate-500 uppercase tracking-wide block">Owner</span>
            <span className="text-xs font-semibold text-slate-900">{selectedObj.owner}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg">
            <span className="text-2xs font-bold text-slate-500 uppercase tracking-wide block">Measure (KPI)</span>
            <span className="text-xs font-semibold text-slate-900 mt-0.5 block">{selectedObj.measure}</span>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg">
            <span className="text-2xs font-bold text-slate-500 uppercase tracking-wide block">Baseline vs 12-Mo Target</span>
            <span className="text-xs font-semibold text-slate-900 mt-0.5 block tabular-nums">
              {selectedObj.baseline} → {selectedObj.target12m}
            </span>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg">
            <span className="text-2xs font-bold text-slate-500 uppercase tracking-wide block">Current Actual (Q{simulationQuarter})</span>
            <span className="text-xs font-bold text-slate-900 mt-0.5 block tabular-nums">
              {selectedObj.currentActual}
            </span>
          </div>
        </div>

        <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg">
          <span className="text-2xs font-bold text-slate-500 uppercase tracking-wide block">Funded Strategic Initiative</span>
          <span className="text-xs text-slate-800 mt-0.5 block">{selectedObj.initiative}</span>
        </div>
      </div>
    </div>
  );
}
