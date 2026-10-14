import { useState } from 'react';
import { TOOLS_DATA, QuizQuestion } from '../data/toolsData.ts';
import { INNOVATION_TOOLS_DATA } from '../data/innovationToolsData.ts';
import { MARKETING_TOOLS_DATA } from '../data/marketingToolsData.ts';
import { OPERATIONS_TOOLS_DATA } from '../data/operationsToolsData.ts';
import { CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, BookOpen, Sparkles, Printer } from 'lucide-react';

const ALL_TOOLS = [...TOOLS_DATA, ...INNOVATION_TOOLS_DATA, ...MARKETING_TOOLS_DATA, ...OPERATIONS_TOOLS_DATA];

export function TrainingQuizModule() {
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Strategy' | 'Innovation' | 'Marketing' | 'Operations'>('All');
  const [selectedToolId, setSelectedToolId] = useState<string>('all');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showCertificate, setShowCertificate] = useState(false);
  const [userName, setUserName] = useState('Senior Strategy Associate');

  const toolsForPillar = ALL_TOOLS.filter(t => {
    if (categoryFilter === 'Strategy') return t.category.includes('Strategy');
    if (categoryFilter === 'Innovation') return t.category.includes('Innovation');
    if (categoryFilter === 'Marketing') return t.category.includes('Marketing');
    if (categoryFilter === 'Operations') return t.category.includes('Operations');
    return true;
  });

  // Gather questions
  const allQuestions: { toolName: string; toolId: string; q: QuizQuestion }[] = [];
  ALL_TOOLS.forEach(t => {
    t.quiz.forEach(q => {
      allQuestions.push({ toolName: t.name, toolId: t.id, q });
    });
  });

  const pillarQuestions = allQuestions.filter(item => {
    const tool = ALL_TOOLS.find(t => t.id === item.toolId);
    if (!tool) return true;
    if (categoryFilter === 'Strategy') return tool.category.includes('Strategy');
    if (categoryFilter === 'Innovation') return tool.category.includes('Innovation');
    if (categoryFilter === 'Marketing') return tool.category.includes('Marketing');
    if (categoryFilter === 'Operations') return tool.category.includes('Operations');
    return true;
  });

  const filteredQuestions = selectedToolId === 'all'
    ? pillarQuestions
    : allQuestions.filter(item => item.toolId === selectedToolId);

  const filteredQuestionsCount = pillarQuestions.length;

  const handleSelectAnswer = (qId: string, optIdx: number) => {
    setAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const handleReset = () => {
    setAnswers({});
    setShowCertificate(false);
  };

  // Calculate score
  let correctCount = 0;
  let answeredCount = 0;

  filteredQuestions.forEach(item => {
    const userAns = answers[item.q.id];
    if (userAns !== undefined) {
      answeredCount++;
      if (userAns === item.q.correctAnswer) {
        correctCount++;
      }
    }
  });

  const percentage = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
  const isComplete = answeredCount === filteredQuestions.length && filteredQuestions.length > 0;
  const isPassed = isComplete && percentage >= 80;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <span>Knowledge Verification</span>
            <span>·</span>
            <span>130 Official Guide Questions (26 Tools across 4 Pillars)</span>
            <span>·</span>
            <span>Instant Theoretical Feedback</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Executive Strategy, Innovation, Marketing & Operations Certification</h3>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Test your understanding across all 26 business frameworks with authentic questions and detailed answer key explanations from the four official training guides by Sundaresh Kamaraj.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="p-3 bg-slate-900 text-white rounded-xl flex items-center gap-3">
            <Award className="w-5 h-5 text-amber-400" />
            <div>
              <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider block">Score</span>
              <span className="text-sm font-extrabold font-mono tabular-nums text-white">
                {correctCount} / {answeredCount} ({percentage}%)
              </span>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="p-3 text-slate-500 hover:text-slate-800 bg-white border border-slate-200 rounded-xl transition-colors"
            title="Reset Quiz"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter by Pillar and Framework */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 text-xs">
          <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">Pillar:</span>
          {(['All', 'Strategy', 'Innovation', 'Marketing', 'Operations'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => {
                setCategoryFilter(cat);
                setSelectedToolId('all');
              }}
              className={`px-3 py-1 rounded-md font-semibold text-xs transition-colors shrink-0 ${
                categoryFilter === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'All' ? 'All Pillars' : cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedToolId('all')}
            className={`px-3 py-1.5 font-bold rounded-lg whitespace-nowrap transition-colors ${
              selectedToolId === 'all' ? 'bg-slate-900 text-white shadow-2xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All {categoryFilter === 'All' ? 'Frameworks' : `${categoryFilter} Tools`} ({filteredQuestionsCount} Qs)
          </button>
          {toolsForPillar.map(t => (
            <button
              key={t.id}
              onClick={() => setSelectedToolId(t.id)}
              className={`px-3 py-1.5 font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedToolId === t.id ? 'bg-slate-900 text-white font-bold shadow-2xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t.shortName}
            </button>
          ))}
        </div>
      </div>

      {/* Passed Certificate Prompt Banner */}
      {isPassed && (
        <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-emerald-950">Certification Criteria Met!</h4>
              <p className="text-xs text-emerald-800 mt-0.5">
                You scored {percentage}% ({correctCount}/{answeredCount} correct). You have earned the Certificate of Strategic Planning Competency.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowCertificate(true)}
            className="px-4 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Award className="w-4 h-4 text-amber-300" />
            View & Print Certificate
          </button>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((item, idx) => {
          const userAns = answers[item.q.id];
          const hasAnswered = userAns !== undefined;
          const isCorrect = userAns === item.q.correctAnswer;

          return (
            <div key={item.q.id} className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
              <div className="flex items-start justify-between gap-3 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-2xs font-mono font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded">
                    Q{idx + 1}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">· {item.toolName}</span>
                </div>

                {hasAnswered && (
                  <span className={`text-2xs font-bold flex items-center gap-1 ${
                    isCorrect ? 'text-emerald-700' : 'text-rose-700'
                  }`}>
                    {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    {isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                )}
              </div>

              <h4 className="text-sm font-bold text-slate-900 leading-snug">
                {item.q.question}
              </h4>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {item.q.options.map((opt, optIdx) => {
                  const isSelected = userAns === optIdx;
                  const isTheCorrectOption = optIdx === item.q.correctAnswer;

                  let optClass = 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50';
                  if (hasAnswered) {
                    if (isTheCorrectOption) {
                      optClass = 'bg-emerald-50 text-emerald-950 border-emerald-300 font-semibold';
                    } else if (isSelected && !isCorrect) {
                      optClass = 'bg-rose-50 text-rose-950 border-rose-300';
                    } else {
                      optClass = 'bg-slate-50/50 text-slate-400 border-slate-100';
                    }
                  } else if (isSelected) {
                    optClass = 'bg-slate-100 text-slate-900 border-slate-900';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={hasAnswered}
                      onClick={() => handleSelectAnswer(item.q.id, optIdx)}
                      className={`p-3 rounded-lg border text-left text-xs transition-colors flex items-start gap-2.5 ${optClass}`}
                    >
                      <span className="font-mono font-bold text-slate-500 shrink-0">
                        {String.fromCharCode(65 + optIdx)}.
                      </span>
                      <span className="leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Instant Theoretical Rationale & Answer Key */}
              {hasAnswered && (
                <div className={`p-3.5 rounded-lg border text-xs leading-relaxed space-y-1 ${
                  isCorrect ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}>
                  <span className="font-bold block">
                    Answer Key Rationale: {String.fromCharCode(65 + item.q.correctAnswer)}
                  </span>
                  <p className="text-slate-600">{item.q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl border border-slate-300 space-y-6 text-center relative">
            <div className="space-y-2">
              <span className="text-2xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                Official Certification of Achievement
              </span>
              <h3 className="text-2xl font-bold text-slate-900 font-display mt-2">
                Certificate of Strategic Planning Competency
              </h3>
              <p className="text-xs text-slate-500">
                Demonstrated mastery of the 8 foundational business frameworks grounded in the training curriculum by Sundaresh Kamaraj.
              </p>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <span className="text-2xs uppercase text-slate-400 font-semibold tracking-wider block">Awarded To</span>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="text-lg font-bold text-center text-slate-900 bg-transparent border-b border-slate-300 pb-1 focus:outline-none focus:border-slate-900 w-full"
              />
              <p className="text-xs text-slate-600">
                For achieving <span className="font-bold text-emerald-700 tabular-nums">{percentage}% score</span> across SWOT, PESTLE, Porter's Five Forces, Balanced Scorecard, Ansoff Matrix, Blue Ocean Strategy, VRIO, and OKRs.
              </p>
            </div>

            <div className="flex items-center justify-between text-2xs text-slate-400 pt-2 border-t border-slate-100">
              <span>Date: October 14, 2026</span>
              <span>Verification ID: STRAT-2026-CERT</span>
              <span>Authority: sundaresh.blog</span>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" /> Print Certificate
              </button>
              <button
                onClick={() => setShowCertificate(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 rounded-lg transition-colors"
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
