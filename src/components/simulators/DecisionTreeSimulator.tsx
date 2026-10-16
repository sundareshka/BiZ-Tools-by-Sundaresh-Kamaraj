import { useState } from 'react';
import { GitBranch, DollarSign, AlertTriangle, CheckCircle2, RotateCcw, Sliders, ArrowRight, HelpCircle, ShieldAlert, Sparkles, Scale, Info } from 'lucide-react';

interface ChanceBranch {
  id: string;
  name: string;
  prob: number;
  grossPayoff: number; // in Lakhs
  netPayoff: number;
  description: string;
}

interface DecisionOption {
  id: string;
  title: string;
  upfrontCost: number; // in Lakhs
  branches: ChanceBranch[];
  recommendationNote: string;
}

interface TreePreset {
  id: string;
  name: string;
  context: string;
  decisionQuestion: string;
  options: DecisionOption[];
  perfectInfoPayoff: number; // in Lakhs
}

const PRESETS: TreePreset[] = [
  {
    id: 'arbitration',
    name: 'Vaigai Infra Services (Arbitration vs. ₹90L Settlement)',
    context: 'Madurai electrical EPC subcontractor with withheld ₹2.4 Crore billing and alleged delay counter-claims.',
    decisionQuestion: 'Contest in legal arbitration (₹25L costs, 2.5y) or negotiate an out-of-court settlement with haircut?',
    perfectInfoPayoff: 215, // if we knew verdict in advance
    options: [
      {
        id: 'opt-arbitrate',
        title: 'Option A: Contest in Full Arbitration',
        upfrontCost: 25, // ₹25L legal fees & expert witnesses
        recommendationNote: 'Lawyer insists "great chance of winning" (50%), but carries an unaffordable catastrophic downside that would breach bank covenants.',
        branches: [
          {
            id: 'b-win',
            name: 'Full Legal Win',
            prob: 0.50,
            grossPayoff: 240, // recover full ₹2.4 Crore
            netPayoff: 215, // 240 - 25
            description: 'Tribunal awards full retention with nil delay damages'
          },
          {
            id: 'b-partial',
            name: 'Partial Compromise Award',
            prob: 0.20,
            grossPayoff: 120, // ₹1.2 Crore recovery
            netPayoff: 95, // 120 - 25
            description: 'Tribunal splits responsibility; Vaigai absorbs ₹1.2 Cr'
          },
          {
            id: 'b-loss',
            name: 'Complete Loss & Counter-Claims',
            prob: 0.30,
            grossPayoff: -40, // pay ₹40L counter damages + lose 240L
            netPayoff: -65, // -40 - 25
            description: 'Liquidated damages upheld; lose billing plus ₹40L damages'
          }
        ]
      },
      {
        id: 'opt-settle',
        title: 'Option B: Accept ₹90 Lakh Haircut Offer',
        upfrontCost: 0,
        recommendationNote: 'Instant liquidity release within 6 weeks; guarantees ₹150 Lakh net cash in bank with zero litigation risk.',
        branches: [
          {
            id: 'b-settle-done',
            name: 'Executed Settlement',
            prob: 1.00,
            grossPayoff: 150, // ₹240L - ₹90L deduction
            netPayoff: 150,
            description: 'Contractor releases ₹1.5 Crore immediately; mutual non-disparagement'
          }
        ]
      },
      {
        id: 'opt-counter',
        title: 'Option C: Negotiated Counter-Offer (₹60L–₹75L Haircut)',
        upfrontCost: 2, // minor legal mediation consultation
        recommendationNote: 'Optimal strategic path: contractor also avoids ₹30L+ in legal defense costs and delivery freeze.',
        branches: [
          {
            id: 'b-counter-accept',
            name: 'Counter Accepted (₹75L Haircut)',
            prob: 0.75,
            grossPayoff: 165, // 240 - 75
            netPayoff: 163, // 165 - 2
            description: 'Contractor accepts final ₹75 Lakh compromise'
          },
          {
            id: 'b-counter-reject',
            name: 'Reverts to Standard Settlement',
            prob: 0.25,
            grossPayoff: 150,
            netPayoff: 148, // 150 - 2
            description: 'Falls back to original ₹90L haircut agreement'
          }
        ]
      }
    ]
  },
  {
    id: 'expansion',
    name: 'Training Institute Regional Expansion (SME 80 Staff)',
    context: 'Considering opening a presence in Coimbatore. Demand probabilities: High 0.35, Medium 0.45, Low 0.20.',
    decisionQuestion: 'Invest ₹60L in own centre, franchise partner (₹10L), or conduct market study first?',
    perfectInfoPayoff: 56.5,
    options: [
      {
        id: 'opt-own',
        title: 'Option A: Own Flagship Centre',
        upfrontCost: 60,
        recommendationNote: 'Highest potential upside (₹120L net), but suffers a painful -₹30L loss if student demand is low.',
        branches: [
          { id: 'b-high', name: 'High Student Demand', prob: 0.35, grossPayoff: 180, netPayoff: 120, description: '1,200+ annual admissions' },
          { id: 'b-med', name: 'Medium Demand', prob: 0.45, grossPayoff: 90, netPayoff: 30, description: '650 admissions' },
          { id: 'b-low', name: 'Low Demand', prob: 0.20, grossPayoff: 30, netPayoff: -30, description: 'Under 250 admissions' }
        ]
      },
      {
        id: 'opt-franchise',
        title: 'Option B: Franchise Licensing Model',
        upfrontCost: 10,
        recommendationNote: 'Risk-averse choice: worst case preserves a +₹5L profit; lower EMV than owning but zero insolvency threat.',
        branches: [
          { id: 'b-f-high', name: 'High Student Demand', prob: 0.35, grossPayoff: 60, netPayoff: 50, description: 'Franchise royalty surge' },
          { id: 'b-f-med', name: 'Medium Demand', prob: 0.45, grossPayoff: 35, netPayoff: 25, description: 'Stable royalty' },
          { id: 'b-f-low', name: 'Low Demand', prob: 0.20, grossPayoff: 15, netPayoff: 5, description: 'Minimum guarantee' }
        ]
      },
      {
        id: 'opt-wait',
        title: 'Option C: Do Nothing / Hold',
        upfrontCost: 0,
        recommendationNote: 'Zero capital at risk; retains current operational status quo.',
        branches: [
          { id: 'b-wait', name: 'Zero Risk / Zero Gain', prob: 1.00, grossPayoff: 0, netPayoff: 0, description: 'Conserve capital for core campus' }
        ]
      }
    ]
  }
];

export function DecisionTreeSimulator() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('arbitration');
  const [activePreset, setActivePreset] = useState<TreePreset>(PRESETS[0]);
  const [riskAttitude, setRiskAttitude] = useState<'neutral' | 'averse'>('averse');
  const [customProbDelta, setCustomProbDelta] = useState<number>(0); // slider adjustment for sensitivity

  const handleSelectPreset = (id: string) => {
    setSelectedPresetId(id);
    const p = PRESETS.find(pr => pr.id === id) || PRESETS[0];
    setActivePreset(p);
    setCustomProbDelta(0);
  };

  // Calculate EMV for each option considering slider adjustments
  const calculateOptionEMV = (opt: DecisionOption) => {
    if (opt.branches.length === 1) {
      return {
        emv: opt.branches[0].netPayoff,
        worstCase: opt.branches[0].netPayoff,
        bestCase: opt.branches[0].netPayoff,
        adjustedBranches: opt.branches
      };
    }

    // If multi-branch, apply delta to the worst branch and rebalance
    let adjustedBranches = opt.branches.map(b => ({ ...b }));
    if (customProbDelta !== 0 && adjustedBranches.length >= 2) {
      const lastIdx = adjustedBranches.length - 1;
      const baseProb = opt.branches[lastIdx].prob;
      const newProb = Math.min(0.90, Math.max(0.05, baseProb + customProbDelta));
      const remainingProb = 1 - newProb;
      const otherBaseSum = opt.branches.slice(0, lastIdx).reduce((acc, curr) => acc + curr.prob, 0);

      adjustedBranches = adjustedBranches.map((b, i) => {
        if (i === lastIdx) return { ...b, prob: Number(newProb.toFixed(3)) };
        const scaled = (b.prob / otherBaseSum) * remainingProb;
        return { ...b, prob: Number(scaled.toFixed(3)) };
      });
    }

    const emv = adjustedBranches.reduce((acc, b) => acc + (b.prob * b.netPayoff), 0);
    const worstCase = Math.min(...adjustedBranches.map(b => b.netPayoff));
    const bestCase = Math.max(...adjustedBranches.map(b => b.netPayoff));

    return {
      emv: Number(emv.toFixed(2)),
      worstCase,
      bestCase,
      adjustedBranches
    };
  };

  const optionResults = activePreset.options.map(opt => ({
    option: opt,
    ...calculateOptionEMV(opt)
  }));

  // Best EMV option
  const highestEmvResult = [...optionResults].sort((a, b) => b.emv - a.emv)[0];
  // Best risk-averse option (safest worst case with positive/highest minimum)
  const safestWorstCaseResult = [...optionResults].sort((a, b) => b.worstCase - a.worstCase)[0];

  const recommendedResult = riskAttitude === 'neutral' ? highestEmvResult : safestWorstCaseResult;

  // Expected Value of Perfect Information (EVPI)
  const evpi = Math.max(0, Number((activePreset.perfectInfoPayoff - highestEmvResult.emv).toFixed(2)));

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 mb-1">
            <GitBranch className="w-4 h-4" />
            <span>Quantitative Decision Analysis & Backward Induction</span>
            <span>·</span>
            <span>Raiffa & Howard Framework</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Interactive Decision Tree & EMV Engine</h3>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Evaluate branching choices under uncertainty, calculate Expected Monetary Value (EMV), solve for sensitivity break-even crossover points, and compute the value of perfect information.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold">
            {PRESETS.map(p => (
              <button
                key={p.id}
                onClick={() => handleSelectPreset(p.id)}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  selectedPresetId === p.id ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {p.name.split(' ')[0]} Case
              </button>
            ))}
          </div>

          <button
            onClick={() => setCustomProbDelta(0)}
            className="p-2 text-slate-500 hover:text-slate-800 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            title="Reset probability delta"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Decision Context Callout */}
      <div className="p-4 bg-indigo-50/60 border border-indigo-200 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div>
          <span className="text-3xs font-bold text-indigo-900 uppercase tracking-wider block mb-0.5">
            Decision Case Context: {activePreset.name}
          </span>
          <p className="font-semibold text-indigo-950">
            "{activePreset.decisionQuestion}"
          </p>
          <span className="text-indigo-800 text-2xs mt-0.5 block">{activePreset.context}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-slate-600 font-medium">Executive Risk Posture:</span>
          <div className="flex items-center bg-white border border-indigo-200 rounded-lg p-0.5 text-2xs font-semibold">
            <button
              onClick={() => setRiskAttitude('averse')}
              className={`px-2 py-1 rounded ${riskAttitude === 'averse' ? 'bg-indigo-900 text-white font-bold' : 'text-slate-600'}`}
            >
              Risk-Averse (Capital Survival)
            </button>
            <button
              onClick={() => setRiskAttitude('neutral')}
              className={`px-2 py-1 rounded ${riskAttitude === 'neutral' ? 'bg-indigo-900 text-white font-bold' : 'text-slate-600'}`}
            >
              Risk-Neutral (Pure EMV)
            </button>
          </div>
        </div>
      </div>

      {/* Visual Decision Tree Canvas */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-slate-900 text-white font-bold text-xs">□</span>
            <h4 className="text-sm font-bold text-slate-900">Root Decision Node (Roll-Back Calculation)</h4>
          </div>

          <div className="flex items-center gap-3 text-2xs text-slate-500">
            <span className="flex items-center gap-1"><span className="inline-block w-2.5 h-2.5 bg-slate-900"></span> Decision (□)</span>
            <span className="flex items-center gap-1"><span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-600"></span> Chance (○)</span>
            <span className="flex items-center gap-1"><span className="inline-block w-2.5 h-2.5 bg-emerald-600 rotate-45"></span> Terminal (△)</span>
          </div>
        </div>

        {/* Tree Branch Visualizer */}
        <div className="space-y-6">
          {optionResults.map(({ option, emv, worstCase, bestCase, adjustedBranches }) => {
            const isRecommended = option.id === recommendedResult.option.id;

            return (
              <div
                key={option.id}
                className={`p-4 rounded-xl border transition-all ${
                  isRecommended
                    ? 'border-indigo-500 bg-indigo-50/20 shadow-xs ring-1 ring-indigo-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                {/* Option Header (Decision Branch) */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      □
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="text-sm font-bold text-slate-900">{option.title}</h5>
                        {isRecommended && (
                          <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-900 border border-indigo-200 text-3xs font-extrabold uppercase tracking-wider flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-indigo-600" />
                            Recommended Choice ({riskAttitude === 'averse' ? 'Min Downside' : 'Max EMV'})
                          </span>
                        )}
                      </div>
                      <span className="text-2xs text-slate-500">
                        Upfront Outlay: <strong className="text-slate-800">₹{option.upfrontCost} Lakh</strong> · {option.recommendationNote}
                      </span>
                    </div>
                  </div>

                  {/* EMV Rollback Pill */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider block">Roll-Back EMV</span>
                      <span className={`text-base font-extrabold font-mono ${emv >= 0 ? 'text-indigo-900' : 'text-rose-600'}`}>
                        ₹{emv} Lakh
                      </span>
                    </div>
                    <div className="text-right border-l border-slate-200 pl-3">
                      <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider block">Worst Case</span>
                      <span className={`text-xs font-extrabold font-mono ${worstCase < 0 ? 'text-rose-600' : 'text-emerald-700'}`}>
                        ₹{worstCase} Lakh
                      </span>
                    </div>
                  </div>
                </div>

                {/* Chance Branches (○) connecting to Terminal Leaves (△) */}
                <div className="mt-3 pl-4 sm:pl-8 space-y-2 border-l-2 border-slate-200 ml-3">
                  {adjustedBranches.map(branch => {
                    const contribution = (branch.prob * branch.netPayoff).toFixed(2);
                    const isLoss = branch.netPayoff < 0;

                    return (
                      <div
                        key={branch.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 bg-slate-50/80 rounded-lg border border-slate-200 text-xs hover:bg-slate-100/80 transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-3xs shrink-0">
                            ○
                          </div>
                          <div>
                            <span className="font-semibold text-slate-800">{branch.name}</span>
                            <span className="text-2xs text-slate-500 ml-2">({branch.description})</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 shrink-0 font-mono text-2xs">
                          <div>
                            <span className="text-slate-400">P = </span>
                            <strong className="text-blue-900 font-bold">{Math.round(branch.prob * 100)}%</strong>
                          </div>
                          <div>
                            <span className="text-slate-400">Gross: </span>
                            <span className="text-slate-700">₹{branch.grossPayoff}L</span>
                          </div>
                          <div>
                            <span className="text-slate-400">Net: </span>
                            <span className={`font-bold ${isLoss ? 'text-rose-600' : 'text-slate-900'}`}>
                              ₹{branch.netPayoff}L
                            </span>
                          </div>
                          <div className="bg-slate-200/70 px-2 py-0.5 rounded text-3xs font-semibold text-slate-700">
                            Weight: ₹{contribution}L
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sensitivity Analysis & Value of Perfect Information (EVPI) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Interactive Probability Sensitivity Slider */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-slate-600" />
              <span>Sensitivity Analysis (Break-Even Stress Test)</span>
            </h4>
            <span className="text-3xs font-mono font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              What-If Probability
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Move the slider to test how fragile the recommendation is if the worst-case probability increases or decreases. At what crossover probability does the best choice shift?
          </p>

          <div className="space-y-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700">
                Stress Shift on Downside Outcome Probability:
              </span>
              <span className="font-bold font-mono text-slate-900">
                {customProbDelta > 0 ? `+${Math.round(customProbDelta * 100)}%` : `${Math.round(customProbDelta * 100)}%`}
              </span>
            </div>
            <input
              type="range"
              min="-0.20"
              max="0.40"
              step="0.05"
              value={customProbDelta}
              onChange={(e) => setCustomProbDelta(parseFloat(e.target.value))}
              className="w-full accent-slate-900"
            />
            <div className="flex justify-between text-3xs text-slate-400">
              <span>-20% (More Optimistic)</span>
              <span>Baseline Guide Model</span>
              <span>+40% (Severe Stress)</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs space-y-1">
            <span className="font-bold text-amber-900 block flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-amber-600" /> Break-Even Insight:
            </span>
            <p className="text-amber-800 leading-relaxed text-2xs">
              {selectedPresetId === 'arbitration'
                ? 'Arbitration only surpasses the ₹90L haircut settlement if the probability of a full loss drops below 15% (holding partial loss at 20%). The lawyer’s estimated loss risk of 30% renders arbitration economically indefensible.'
                : 'Option A (Own Centre) remains the superior average choice unless low-demand risk exceeds 69%. The decision is robust to moderate shifts in initial enrollment estimates.'}
            </p>
          </div>
        </div>

        {/* Right: Value of Information (EVPI) & Executive Guidance */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-emerald-600" />
              <span>Expected Value of Perfect Information (EVPI)</span>
            </h4>
            <span className="text-3xs font-mono font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
              Research Budget Ceiling
            </span>
          </div>

          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-2xs font-bold text-emerald-900 uppercase tracking-wider">EVPI Maximum Spend Cap:</span>
              <span className="text-xl font-extrabold font-mono text-emerald-950">₹{evpi} Lakh</span>
            </div>
            <p className="text-2xs text-emerald-800 leading-relaxed">
              If an external market feasibility study or legal mediator claims they can eliminate this uncertainty before committing, you should never spend more than <strong>₹{evpi} Lakh</strong>. Any due diligence costing more than this cap mathematically destroys value.
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Highest Expected Monetary Value:</span>
              <span className="font-bold font-mono text-slate-900">{highestEmvResult.option.title} (₹{highestEmvResult.emv}L)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Safest Downside (Risk-Averse):</span>
              <span className="font-bold font-mono text-emerald-800">{safestWorstCaseResult.option.title} (₹{safestWorstCaseResult.worstCase}L)</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">Strategic Decision Rule:</span>
              <span className="font-semibold text-indigo-900">Separate decision quality from outcome luck</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
