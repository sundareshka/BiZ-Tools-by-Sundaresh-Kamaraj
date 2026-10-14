import { useState } from 'react';
import { TOOLS_DATA, STRATEGY_STACKS, StrategyStack } from '../data/toolsData.ts';
import { INNOVATION_TOOLS_DATA, CATEGORY_2_STACKS } from '../data/innovationToolsData.ts';
import { MARKETING_TOOLS_DATA, CATEGORY_3_STACKS } from '../data/marketingToolsData.ts';
import { OPERATIONS_TOOLS_DATA, CATEGORY_4_STACKS } from '../data/operationsToolsData.ts';
import { Layers, ArrowRight, CheckCircle2, Download, Printer, Filter, Sparkles } from 'lucide-react';

const ALL_TOOLS = [...TOOLS_DATA, ...INNOVATION_TOOLS_DATA, ...MARKETING_TOOLS_DATA, ...OPERATIONS_TOOLS_DATA];
const ALL_STACKS = [...STRATEGY_STACKS, ...CATEGORY_2_STACKS, ...CATEGORY_3_STACKS, ...CATEGORY_4_STACKS];

export function MasterComparisonView({ onSelectTool }: { onSelectTool: (id: string) => void }) {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All');
  const [filterScope, setFilterScope] = useState<string>('All');
  const [selectedStackId, setSelectedStackId] = useState<string>('stack-b');
  const [showExportModal, setShowExportModal] = useState(false);

  const filteredTools = ALL_TOOLS.filter(t => {
    if (filterCategory !== 'All' && t.category !== filterCategory) return false;
    if (filterDifficulty !== 'All' && !t.difficulty.toLowerCase().includes(filterDifficulty.toLowerCase())) return false;
    if (filterScope !== 'All' && !t.scope.toLowerCase().includes(filterScope.toLowerCase())) return false;
    return true;
  });

  const currentStack = ALL_STACKS.find(s => s.id === selectedStackId) || ALL_STACKS[1];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <span>Framework Selection Matrix</span>
            <span>·</span>
            <span>Tool Chains & Stacks</span>
            <span>·</span>
            <span>Back Matter Guidance</span>
          </div>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Compare all 26 frameworks across Strategy & Planning, Business Model Innovation, Marketing & Growth, and Operations & Process. Select the right tool stack for your organizational stage and chain frameworks into a cohesive annual strategy cycle.
          </p>
        </div>

        <button
          onClick={() => setShowExportModal(true)}
          className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
        >
          <Printer className="w-3.5 h-3.5" />
          Strategy on a Page
        </button>
      </div>

      {/* Recommended Strategy Stacks Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-base font-bold text-slate-900">Recommended Organizational Tool Stacks</h4>
            <p className="text-xs text-slate-500 mt-0.5">Frameworks are not sequential, but they chain well. Choose the stack matching your team size.</p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 overflow-x-auto">
            {ALL_STACKS.map(stack => (
              <button
                key={stack.id}
                onClick={() => setSelectedStackId(stack.id)}
                className={`px-3 py-1.5 text-xs font-bold rounded-md whitespace-nowrap transition-all ${
                  selectedStackId === stack.id ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {stack.name.split('—')[0].trim()}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Stack Card */}
        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div>
              <span className="text-2xs font-bold uppercase tracking-wider text-slate-500">Target Scale</span>
              <h5 className="text-lg font-bold text-slate-900">{currentStack.name}</h5>
              <p className="text-xs text-slate-600">{currentStack.targetOrg}</p>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 max-w-sm">
              <span className="font-bold text-slate-900 block mb-0.5">Why this fits:</span>
              {currentStack.whyItFits}
            </div>
          </div>

          {/* Recommended Chain Flow */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block">Strategic Process Flow</span>
            <div className="flex flex-wrap items-center gap-2">
              {currentStack.recommendedChain.map((toolId, i) => {
                const tool = ALL_TOOLS.find(t => t.id === toolId);
                const isLast = i === currentStack.recommendedChain.length - 1;
                return (
                  <div key={toolId} className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectTool(toolId)}
                      className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <span>{i + 1}. {tool?.shortName || toolId}</span>
                    </button>
                    {!isLast && <ArrowRight className="w-3.5 h-3.5 text-slate-400" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cadence Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg space-y-1 text-xs">
              <span className="font-bold text-slate-900 block">Quarterly Rhythm</span>
              <p className="text-slate-600">{currentStack.cadence.quarterly}</p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg space-y-1 text-xs">
              <span className="font-bold text-slate-900 block">Annual Strategic Refresh</span>
              <p className="text-slate-600">{currentStack.cadence.annually}</p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg space-y-1 text-xs">
              <span className="font-bold text-rose-800 block">What to Skip for Now</span>
              <p className="text-slate-600">{currentStack.whatToSkip}</p>
            </div>
          </div>
        </div>
      </div>

      {/* The Master Comparison Matrix Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-base font-bold text-slate-900">Master Comparison Matrix</h4>
            <p className="text-xs text-slate-500 mt-0.5">Filter across all 14 frameworks to match your immediate strategic question.</p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 text-xs flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium">Category:</span>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-slate-800 font-medium"
              >
                <option value="All">All Categories (26)</option>
                <option value="Strategy & Planning">Strategy & Planning (8)</option>
                <option value="Business Model & Innovation">Business Model & Innovation (6)</option>
                <option value="Marketing & Growth">Marketing & Growth (6)</option>
                <option value="Operations & Process">Operations & Process (6)</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium">Difficulty:</span>
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-slate-800"
              >
                <option value="All">All</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium">Scope:</span>
              <select
                value={filterScope}
                onChange={(e) => setFilterScope(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-slate-800"
              >
                <option value="All">All</option>
                <option value="Macro">Macro-environment</option>
                <option value="Industry">Industry</option>
                <option value="Firm">Firm</option>
                <option value="Product">Product-market</option>
                <option value="Team">Team</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-3">Framework</th>
                  <th className="py-3 px-3">Primary Strategic Question</th>
                  <th className="py-3 px-3">Scope</th>
                  <th className="py-3 px-3">Time Horizon</th>
                  <th className="py-3 px-3">Key Output</th>
                  <th className="py-3 px-3">Difficulty</th>
                  <th className="py-3 px-3">Time to Result</th>
                  <th className="py-3 px-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTools.map(t => (
                  <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-3">
                      <span className="font-bold text-slate-900 block">{t.name}</span>
                      <span className="text-2xs text-slate-500">{t.origin.split(';')[0]}</span>
                    </td>
                    <td className="py-3.5 px-3 font-medium text-slate-800 max-w-xs">{t.corePurpose}</td>
                    <td className="py-3.5 px-3 text-slate-600">{t.scope}</td>
                    <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">{t.horizon}</td>
                    <td className="py-3.5 px-3 text-slate-700 max-w-xs">{t.keyOutput}</td>
                    <td className="py-3.5 px-3">
                      <span className={`px-2 py-0.5 text-2xs font-bold rounded ${
                        t.difficulty === 'Beginner' ? 'bg-emerald-100 text-emerald-800' :
                        t.difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                      }`}>
                        {t.difficulty}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap tabular-nums">{t.timeToResult}</td>
                    <td className="py-3.5 px-3">
                      <button
                        onClick={() => onSelectTool(t.id)}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-900 hover:text-white rounded-lg transition-colors whitespace-nowrap"
                      >
                        Launch Tool →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Strategy on a Page Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-8 shadow-2xl border border-slate-300 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-2xs font-bold uppercase tracking-wider text-slate-500">Executive Synthesis</span>
                <h3 className="text-xl font-bold text-slate-900 font-display">Strategy on a Page (SOAP)</h3>
              </div>
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 text-xs font-bold text-white bg-slate-900 rounded-lg flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" /> Print / Save PDF
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 pb-3 border-b border-slate-200">
                <div>
                  <span className="font-bold text-slate-500 uppercase tracking-wide block">1. Current Position (SWOT & PESTLE)</span>
                  <p className="text-slate-800 mt-1">Top Strength: Proprietary farmer procurement relationships & agronomist advisory team</p>
                  <p className="text-slate-800">Top Threat: Rapid doorstep delivery platforms & subsidized public transport</p>
                </div>
                <div>
                  <span className="font-bold text-slate-500 uppercase tracking-wide block">2. Industry & Moat (Five Forces & VRIO)</span>
                  <p className="text-slate-800 mt-1">Defensive Lever: Diversify suppliers, lock in long-term contracts to weaken supplier forward integration</p>
                  <p className="text-slate-800">Sustained Advantage: 25-year tacit quality grading & socially complex relationships</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pb-3 border-b border-slate-200">
                <div>
                  <span className="font-bold text-slate-500 uppercase tracking-wide block">3. Growth Choice (Ansoff & Blue Ocean)</span>
                  <p className="text-slate-800 mt-1">Ansoff Sequence: Penetration (service franchise) → Product Dev (solar pump bundles) → Market Dev</p>
                  <p className="text-slate-800">Value Innovation: Eliminate price wars; Raise single accountable concierge; Create family archive</p>
                </div>
                <div>
                  <span className="font-bold text-slate-500 uppercase tracking-wide block">4. Execution & Alignment (BSC & OKRs)</span>
                  <p className="text-slate-800 mt-1">BSC Strategy Map: 100% staff service training → 4 min check-in → 4.3 rating → +14% RevPAR</p>
                  <p className="text-slate-800">Q3 Company OKR: Win subscriber second year (Renewal rate 31% → 45%, Grade 0.8)</p>
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 text-slate-600 italic">
                "Whatever the stack, keep a single one-page 'strategy on a page' that shows the current SWOT factors, the chosen Ansoff route, the scorecard map and this quarter's company OKRs. If it does not fit on one page, the strategy is not yet clear." — Sundaresh Kamaraj
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
