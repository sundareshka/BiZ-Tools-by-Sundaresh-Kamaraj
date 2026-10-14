import { useState } from 'react';
import { SCENARIO_MISSIONS, ScenarioMission } from '../data/toolsData.ts';
import { CATEGORY_2_SCENARIOS } from '../data/innovationToolsData.ts';
import { CATEGORY_3_SCENARIOS } from '../data/marketingToolsData.ts';
import { CATEGORY_4_SCENARIOS } from '../data/operationsToolsData.ts';
import { Award, CheckCircle2, XCircle, ArrowRight, RotateCcw, AlertTriangle, Lightbulb, Compass, Filter } from 'lucide-react';

const ALL_MISSIONS: ScenarioMission[] = [
  ...SCENARIO_MISSIONS,
  ...CATEGORY_2_SCENARIOS,
  ...CATEGORY_3_SCENARIOS,
  ...CATEGORY_4_SCENARIOS
];

export function ScenarioSimulator() {
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Strategy' | 'Innovation' | 'Marketing' | 'Operations'>('All');
  const [selectedMissionId, setSelectedMissionId] = useState<string>(ALL_MISSIONS[0].id);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [userScores, setUserScores] = useState<Record<string, number>>({});

  const filteredMissions = ALL_MISSIONS.filter(m => {
    if (categoryFilter === 'Strategy') return SCENARIO_MISSIONS.some(sm => sm.id === m.id);
    if (categoryFilter === 'Innovation') return CATEGORY_2_SCENARIOS.some(cm => cm.id === m.id);
    if (categoryFilter === 'Marketing') return CATEGORY_3_SCENARIOS.some(mm => mm.id === m.id);
    if (categoryFilter === 'Operations') return CATEGORY_4_SCENARIOS.some(om => om.id === m.id);
    return true;
  });

  const currentMission = ALL_MISSIONS.find(m => m.id === selectedMissionId) || ALL_MISSIONS[0];
  const chosenOption = currentMission.options.find(o => o.id === selectedOptionId);

  const handleSelectMission = (id: string) => {
    setSelectedMissionId(id);
    setSelectedOptionId(null);
    setIsSubmitted(false);
  };

  const handleSubmit = () => {
    if (!chosenOption) return;
    setIsSubmitted(true);
    setUserScores(prev => ({
      ...prev,
      [currentMission.id]: chosenOption.rubricPoints
    }));
  };

  const handleResetMission = () => {
    setSelectedOptionId(null);
    setIsSubmitted(false);
  };

  // Calculate total score
  const totalPoints = Object.values(userScores).reduce((a, b) => a + b, 0);
  const maxPossible = ALL_MISSIONS.length * 25;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <span>Executive Roleplay Missions</span>
            <span>·</span>
            <span>Real-Time Feedback & Rubric Scoring</span>
            <span>·</span>
            <span>Case-Based Dilemmas</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Interactive Strategy Crisis Simulator</h3>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Put strategic theory to the test in high-stakes operational crises from the training guide. Receive instant rubric grading and learn from author model answers.
          </p>
        </div>

        <div className="p-3 bg-slate-900 text-white rounded-xl flex items-center gap-3 shrink-0">
          <Award className="w-5 h-5 text-amber-400" />
          <div>
            <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider block">Total Strategy Score</span>
            <span className="text-sm font-extrabold font-mono tabular-nums text-white">
              {totalPoints} / {maxPossible} pts
            </span>
          </div>
        </div>
      </div>

      {/* Category Filter and Mission Selector Tabs */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-2xs font-bold uppercase tracking-wider text-slate-400">Category:</span>
          {(['All', 'Strategy', 'Innovation', 'Marketing', 'Operations'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => {
                setCategoryFilter(cat);
                const firstMatching = ALL_MISSIONS.find(m => {
                  if (cat === 'Strategy') return SCENARIO_MISSIONS.some(sm => sm.id === m.id);
                  if (cat === 'Innovation') return CATEGORY_2_SCENARIOS.some(cm => cm.id === m.id);
                  if (cat === 'Marketing') return CATEGORY_3_SCENARIOS.some(mm => mm.id === m.id);
                  if (cat === 'Operations') return CATEGORY_4_SCENARIOS.some(om => om.id === m.id);
                  return true;
                });
                if (firstMatching) handleSelectMission(firstMatching.id);
              }}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                categoryFilter === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'All'
                ? `All Missions (${ALL_MISSIONS.length})`
                : cat === 'Strategy'
                ? `Strategy (${SCENARIO_MISSIONS.length})`
                : cat === 'Innovation'
                ? `Innovation (${CATEGORY_2_SCENARIOS.length})`
                : cat === 'Marketing'
                ? `Marketing (${CATEGORY_3_SCENARIOS.length})`
                : `Operations (${CATEGORY_4_SCENARIOS.length})`}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {filteredMissions.map((m, idx) => {
            const score = userScores[m.id];
            const isDone = score !== undefined;
            const isCurrent = m.id === selectedMissionId;

            return (
              <button
                key={m.id}
                onClick={() => handleSelectMission(m.id)}
                className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all whitespace-nowrap flex items-center gap-2 shrink-0 ${
                  isCurrent
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                <span>{idx + 1}. {m.title}</span>
                {isDone && (
                  <span className={`text-2xs font-mono px-1.5 py-0.5 rounded ${
                    score === 25 ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                  }`}>
                    {score}/25
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Mission Briefing & Challenge */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
        {/* Mission Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span className="font-semibold text-slate-700">Role: {currentMission.role}</span>
              <span>·</span>
              <span>Context: {currentMission.companyContext}</span>
            </div>
            <h4 className="text-lg font-bold text-slate-900">{currentMission.title}</h4>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500">Frameworks:</span>
            {currentMission.targetTools.map(t => (
              <span key={t} className="px-2 py-0.5 text-2xs font-bold bg-slate-100 text-slate-800 rounded uppercase">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Crisis Briefing Card */}
        <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wide">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>The Strategic Crisis Briefing</span>
          </div>
          <p className="text-sm font-semibold text-slate-900 leading-relaxed">
            "{currentMission.crisisPrompt}"
          </p>
        </div>

        {/* Decision Options */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
            Choose Your Strategic Course of Action
          </span>

          <div className="space-y-3">
            {currentMission.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => !isSubmitted && setSelectedOptionId(opt.id)}
                  className={`p-4 rounded-xl border transition-all text-left cursor-pointer ${
                    isSelected
                      ? 'border-slate-900 bg-slate-50/80 ring-1 ring-slate-900'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  } ${isSubmitted ? 'cursor-default' : ''}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-500 font-mono">[{opt.toolUsed}]</span>
                      </div>
                      <p className="text-sm font-semibold text-slate-900">{opt.label}</p>
                    </div>

                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-300'
                    }`}>
                      {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        {!isSubmitted ? (
          <div className="flex justify-end pt-2">
            <button
              onClick={handleSubmit}
              disabled={!selectedOptionId}
              className={`px-5 py-2.5 text-xs font-bold text-white rounded-lg transition-all flex items-center gap-2 ${
                selectedOptionId ? 'bg-slate-900 hover:bg-slate-800' : 'bg-slate-300 cursor-not-allowed'
              }`}
            >
              Submit Strategic Decision
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Real-Time Feedback & Scoring Rubric Panel */
          <div className="space-y-5 pt-4 border-t border-slate-200">
            {/* Score Feedback Bar */}
            <div className={`p-4 rounded-xl border flex items-start gap-3 ${
              chosenOption?.isOptimal
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}>
              {chosenOption?.isOptimal ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h5 className="text-sm font-bold">
                    {chosenOption?.isOptimal ? 'Optimal Strategic Decision!' : 'Sub-Optimal Tactical Move'}
                  </h5>
                  <span className="font-mono font-bold tabular-nums text-xs">
                    Score: {chosenOption?.rubricPoints} / 25 pts
                  </span>
                </div>
                <p className="text-xs leading-relaxed">{chosenOption?.explanation}</p>
              </div>
            </div>

            {/* Author's Model Answer */}
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wide">
                <Compass className="w-4 h-4 text-blue-600" />
                <span>Executive Model Answer (Sundaresh Kamaraj Guide)</span>
              </div>
              <p className="text-xs text-slate-800 leading-relaxed font-medium">
                {currentMission.modelAnswer}
              </p>
            </div>

            {/* Practical Action Checklist */}
            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wide block">
                Executive Action Checklist for This Crisis
              </span>
              <div className="space-y-1.5">
                {currentMission.actionChecklist.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Reflection Takeaway */}
            <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-lg flex items-start gap-2 text-xs text-blue-900">
              <Lightbulb className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <p className="italic">
                <span className="font-bold not-italic">Core Strategy Takeaway: </span>
                {currentMission.reflectionKey}
              </p>
            </div>

            {/* Try Again / Next Mission */}
            <div className="flex justify-between items-center pt-2">
              <button
                onClick={handleResetMission}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retry Decision
              </button>

              <button
                onClick={() => {
                  const currIdx = SCENARIO_MISSIONS.findIndex(m => m.id === currentMission.id);
                  const nextIdx = (currIdx + 1) % SCENARIO_MISSIONS.length;
                  handleSelectMission(SCENARIO_MISSIONS[nextIdx].id);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
              >
                Next Mission Challenge
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
