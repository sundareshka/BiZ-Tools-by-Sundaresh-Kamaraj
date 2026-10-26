import { useState, useEffect, useCallback } from 'react';
import { TOOLS_DATA, QuizQuestion, ToolDefinition } from '../data/toolsData.ts';
import { INNOVATION_TOOLS_DATA } from '../data/innovationToolsData.ts';
import { MARKETING_TOOLS_DATA } from '../data/marketingToolsData.ts';
import { OPERATIONS_TOOLS_DATA } from '../data/operationsToolsData.ts';
import { FINANCIAL_TOOLS_DATA } from '../data/financialToolsData.ts';
import { PROJECT_TOOLS_DATA } from '../data/projectToolsData.ts';
import { HR_TOOLS_DATA } from '../data/hrToolsData.ts';
import { RISK_TOOLS_DATA } from '../data/riskToolsData.ts';
import { PRODUCT_TOOLS_DATA } from '../data/productToolsData.ts';
import { ANALYTICS_TOOLS_DATA } from '../data/analyticsToolsData.ts';
import {
  CheckCircle2,
  XCircle,
  Award,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Sparkles,
  Printer,
  Layers,
  HelpCircle,
  Check,
  Shuffle,
  Eye,
  CheckCheck
} from 'lucide-react';
import { loadUserProgress, saveQuizAnswersAndCheckCompletion } from '../utils/userProgress.ts';
import { getToolIcon } from '../data/toolIcons.ts';

const ALL_TOOLS = [
  ...TOOLS_DATA,
  ...INNOVATION_TOOLS_DATA,
  ...MARKETING_TOOLS_DATA,
  ...OPERATIONS_TOOLS_DATA,
  ...FINANCIAL_TOOLS_DATA,
  ...PROJECT_TOOLS_DATA,
  ...HR_TOOLS_DATA,
  ...RISK_TOOLS_DATA,
  ...PRODUCT_TOOLS_DATA,
  ...ANALYTICS_TOOLS_DATA
];

export function TrainingQuizModule({
  onLaunchSimulator
}: {
  onLaunchSimulator?: (toolId: string) => void;
}) {
  const [learningMode, setLearningMode] = useState<'quiz' | 'flashcards'>('quiz');
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Strategy' | 'Innovation' | 'Marketing' | 'Operations' | 'Financial' | 'Project' | 'HR' | 'Risk' | 'Product' | 'Analytics'>('All');
  const [selectedToolId, setSelectedToolId] = useState<string>('all');
  const [answers, setAnswers] = useState<Record<string, number>>(() => loadUserProgress().quizAnswers);
  const [showCertificate, setShowCertificate] = useState(false);
  const [userName, setUserName] = useState('Senior Strategy Associate');

  // Flashcards state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredToolIds, setMasteredToolIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('biztools_flashcards_mastered');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [reviewToolIds, setReviewToolIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('biztools_flashcards_review');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Listen for storage or progress resets
  useEffect(() => {
    const handleProgressUpdate = () => {
      setAnswers(loadUserProgress().quizAnswers);
    };
    window.addEventListener('stratlearn_progress_updated', handleProgressUpdate);
    return () => window.removeEventListener('stratlearn_progress_updated', handleProgressUpdate);
  }, []);

  // Save flashcard state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('biztools_flashcards_mastered', JSON.stringify(masteredToolIds));
      localStorage.setItem('biztools_flashcards_review', JSON.stringify(reviewToolIds));
    } catch {
      // ignore
    }
  }, [masteredToolIds, reviewToolIds]);

  const toolsForPillar = ALL_TOOLS.filter(t => {
    if (categoryFilter === 'Strategy') return t.category.includes('Strategy');
    if (categoryFilter === 'Innovation') return t.category.includes('Innovation');
    if (categoryFilter === 'Marketing') return t.category.includes('Marketing');
    if (categoryFilter === 'Operations') return t.category.includes('Operations');
    if (categoryFilter === 'Financial') return t.category.includes('Financial');
    if (categoryFilter === 'Project') return t.category.includes('Project');
    if (categoryFilter === 'HR') return t.category.includes('HR');
    if (categoryFilter === 'Risk') return t.category.includes('Risk');
    if (categoryFilter === 'Product') return t.category.includes('Product');
    if (categoryFilter === 'Analytics') return t.category.includes('Analytics');
    return true;
  });

  // Gather questions for quiz mode
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
    if (categoryFilter === 'Financial') return tool.category.includes('Financial');
    if (categoryFilter === 'Project') return tool.category.includes('Project');
    if (categoryFilter === 'HR') return tool.category.includes('HR');
    if (categoryFilter === 'Risk') return tool.category.includes('Risk');
    if (categoryFilter === 'Product') return tool.category.includes('Product');
    if (categoryFilter === 'Analytics') return tool.category.includes('Analytics');
    return true;
  });

  const filteredQuestions = selectedToolId === 'all'
    ? pillarQuestions
    : allQuestions.filter(item => item.toolId === selectedToolId);

  const filteredQuestionsCount = pillarQuestions.length;

  const handleSelectAnswer = (qId: string, optIdx: number) => {
    const nextAnswers = { ...answers, [qId]: optIdx };
    setAnswers(nextAnswers);

    const toolQuestionsMap: Record<string, string[]> = {};
    ALL_TOOLS.forEach(t => {
      toolQuestionsMap[t.id] = t.quiz.map(q => q.id);
    });

    saveQuizAnswersAndCheckCompletion(nextAnswers, toolQuestionsMap);
  };

  const handleReset = () => {
    setAnswers({});
    setShowCertificate(false);
  };

  // Flashcards navigation
  const currentFlashcardTool: ToolDefinition | undefined = toolsForPillar[flashcardIndex] || toolsForPillar[0];

  const handleNextCard = useCallback(() => {
    setIsFlipped(false);
    setFlashcardIndex(prev => (prev + 1) % toolsForPillar.length);
  }, [toolsForPillar.length]);

  const handlePrevCard = useCallback(() => {
    setIsFlipped(false);
    setFlashcardIndex(prev => (prev - 1 + toolsForPillar.length) % toolsForPillar.length);
  }, [toolsForPillar.length]);

  const handleToggleFlip = useCallback(() => {
    setIsFlipped(prev => !prev);
  }, []);

  const handleMarkMastered = (toolId: string) => {
    setMasteredToolIds(prev => prev.includes(toolId) ? prev : [...prev, toolId]);
    setReviewToolIds(prev => prev.filter(id => id !== toolId));
    handleNextCard();
  };

  const handleMarkReview = (toolId: string) => {
    setReviewToolIds(prev => prev.includes(toolId) ? prev : [...prev, toolId]);
    setMasteredToolIds(prev => prev.filter(id => id !== toolId));
    handleNextCard();
  };

  // Keyboard navigation for flashcards
  useEffect(() => {
    if (learningMode !== 'flashcards') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space') {
        e.preventDefault();
        handleToggleFlip();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNextCard();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrevCard();
      } else if (e.key === 'm' || e.key === 'M') {
        if (currentFlashcardTool) handleMarkMastered(currentFlashcardTool.id);
      } else if (e.key === 'r' || e.key === 'R') {
        if (currentFlashcardTool) handleMarkReview(currentFlashcardTool.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [learningMode, handleToggleFlip, handleNextCard, handlePrevCard, currentFlashcardTool]);

  // Calculate score for quiz
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

  const FlashcardIcon = currentFlashcardTool ? (currentFlashcardTool.icon || getToolIcon(currentFlashcardTool.id)) : HelpCircle;

  return (
    <div className="space-y-6">
      {/* Top Banner with Mode Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <span>Knowledge Verification</span>
            <span>·</span>
            <span>285 Official Guide Questions & 57 Framework Flashcards</span>
            <span>·</span>
            <span>Interactive Theory</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Executive Framework Knowledge & Competency
          </h3>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Master the mechanics, formulas, and real-world failure modes of all 57 frameworks through practice questions or rapid-flip flashcards.
          </p>
        </div>

        {/* Learning Mode Switcher & Stats */}
        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          {/* Segmented Mode Selector */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-2xs">
            <button
              onClick={() => setLearningMode('quiz')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                learningMode === 'quiz'
                  ? 'bg-white text-slate-900 shadow-2xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
              <span>Quiz Mode (285 Qs)</span>
            </button>
            <button
              onClick={() => setLearningMode('flashcards')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                learningMode === 'flashcards'
                  ? 'bg-white text-indigo-950 shadow-2xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-amber-600" />
              <span>Flashcards (57 Tools)</span>
            </button>
          </div>

          {learningMode === 'quiz' ? (
            <div className="flex items-center gap-2">
              <div className="p-2.5 bg-slate-900 text-white rounded-xl flex items-center gap-2.5">
                <Award className="w-4 h-4 text-amber-400" />
                <div>
                  <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider block">Score</span>
                  <span className="text-xs font-extrabold font-mono tabular-nums text-white">
                    {correctCount} / {answeredCount} ({percentage}%)
                  </span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="p-2.5 text-slate-500 hover:text-slate-800 bg-white border border-slate-200 rounded-xl transition-colors cursor-pointer"
                title="Reset Quiz"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-mono">
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                Mastered: {masteredToolIds.length}
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-amber-700 font-bold">
                Review: {reviewToolIds.length}
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-500 font-medium">
                Card {flashcardIndex + 1}/{toolsForPillar.length}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Filter by Pillar */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 text-xs">
          <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">Pillar:</span>
          {(['All', 'Strategy', 'Innovation', 'Marketing', 'Operations', 'Financial', 'Project', 'HR', 'Risk', 'Product', 'Analytics'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => {
                setCategoryFilter(cat);
                setSelectedToolId('all');
                setFlashcardIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1 rounded-md font-semibold text-xs transition-colors shrink-0 cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'All'
                ? 'All Pillars'
                : cat === 'Financial'
                ? 'Financial & Performance'
                : cat === 'Project'
                ? 'Project Management'
                : cat === 'HR'
                ? 'HR & Organizational'
                : cat === 'Risk'
                ? 'Risk & Decision'
                : cat === 'Product'
                ? 'Product & Startup'
                : cat === 'Analytics'
                ? 'Data & Analytics'
                : cat}
            </button>
          ))}
        </div>

        {learningMode === 'quiz' && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setSelectedToolId('all')}
              className={`px-3 py-1.5 font-bold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                selectedToolId === 'all' ? 'bg-slate-900 text-white shadow-2xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All {categoryFilter === 'All' ? 'Frameworks' : `${categoryFilter} Tools`} ({filteredQuestionsCount} Qs)
            </button>
            {toolsForPillar.map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedToolId(t.id)}
                className={`px-3 py-1.5 font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  selectedToolId === t.id ? 'bg-slate-900 text-white font-bold shadow-2xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t.shortName}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* FLASHCARDS VIEW */}
      {learningMode === 'flashcards' && currentFlashcardTool && (
        <div className="space-y-4 max-w-4xl mx-auto">
          {/* Top Progress & Keyboard Cheatsheet */}
          <div className="flex items-center justify-between text-2xs text-slate-500 px-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">
                Pillar {currentFlashcardTool.category}
              </span>
              <span>·</span>
              <span>Hotkeys: Space (Flip), ← / → (Prev/Next), M (Master), R (Review)</span>
            </div>
            <div className="flex items-center gap-1">
              {masteredToolIds.includes(currentFlashcardTool.id) && (
                <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                  <CheckCheck className="w-3 h-3" /> Mastered
                </span>
              )}
              {reviewToolIds.includes(currentFlashcardTool.id) && (
                <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                  Needs Review
                </span>
              )}
            </div>
          </div>

          {/* Interactive Flip Card Container */}
          <div
            onClick={handleToggleFlip}
            className="w-full min-h-[380px] bg-white border-2 border-slate-200 hover:border-indigo-400 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer p-6 sm:p-8 flex flex-col justify-between select-none relative group"
          >
            {/* Front of Card */}
            {!isFlipped ? (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-2xs font-bold uppercase tracking-wider text-slate-400">
                    <span>{currentFlashcardTool.category}</span>
                    <span>·</span>
                    <span>Origin: {currentFlashcardTool.origin.split('(')[0]}</span>
                  </div>
                  <span className="text-2xs font-mono font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                    Card {flashcardIndex + 1} of {toolsForPillar.length}
                  </span>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center shrink-0">
                      <FlashcardIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                        {currentFlashcardTool.name}
                      </h3>
                      <p className="text-xs font-semibold text-indigo-700">
                        {currentFlashcardTool.tagline}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5">
                  <span className="text-2xs font-extrabold uppercase tracking-wider text-slate-500 block">
                    Strategic Dilemma (When to Deploy)
                  </span>
                  <p className="text-sm font-medium text-slate-800 leading-relaxed">
                    "{currentFlashcardTool.corePurpose}"
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-2xs pt-1">
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-slate-400 font-bold block uppercase text-3xs">Scope</span>
                    <span className="font-semibold text-slate-800">{currentFlashcardTool.scope}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-slate-400 font-bold block uppercase text-3xs">Time Horizon</span>
                    <span className="font-semibold text-slate-800">{currentFlashcardTool.horizon}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 col-span-2 sm:col-span-1">
                    <span className="text-slate-400 font-bold block uppercase text-3xs">Deliverable</span>
                    <span className="font-semibold text-slate-800 truncate block">{currentFlashcardTool.keyOutput}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-center text-xs font-semibold text-indigo-600 gap-1.5 group-hover:text-indigo-800">
                  <Eye className="w-4 h-4" />
                  <span>Click card or press Spacebar to reveal core mechanics & answers</span>
                </div>
              </div>
            ) : (
              /* Back of Card */
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{currentFlashcardTool.name}</span>
                    <span className="text-2xs text-slate-400">· Mechanics & Case Study</span>
                  </div>
                  <span className="text-3xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                    Answer Key
                  </span>
                </div>

                {/* Mechanics */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/90 text-xs text-slate-800 leading-relaxed font-medium">
                  <span className="font-bold text-slate-900 block mb-1 uppercase text-2xs tracking-wide">
                    Core Mechanics & Execution:
                  </span>
                  {currentFlashcardTool.howItWorks}
                </div>

                {/* Real-World Case Study */}
                <div className="p-3.5 bg-indigo-50/70 border border-indigo-200/80 rounded-xl text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-indigo-950 uppercase text-2xs tracking-wide">
                      Real-World Corporate Benchmark: {currentFlashcardTool.caseStudy.company}
                    </span>
                    <span className="text-3xs font-mono font-semibold text-indigo-700 truncate max-w-[200px]">
                      Result: {currentFlashcardTool.caseStudy.results?.[0] || 'Strategic turnaround'}
                    </span>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-2xs">
                    {currentFlashcardTool.caseStudy.challenge}
                  </p>
                </div>

                {/* Foundational Concepts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-2xs">
                  {currentFlashcardTool.coreConcepts.slice(0, 2).map((c, i) => (
                    <div key={i} className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="font-bold text-slate-900 block">{c.term}</span>
                      <span className="text-slate-600 line-clamp-2">{c.definition}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-2xs text-slate-400">
                  <span>Pro Tip: {currentFlashcardTool.implementationGuide?.proTips?.[0] || currentFlashcardTool.limitations?.[0] || 'Focus on root causes over superficial symptoms.'}</span>
                  <span className="text-indigo-600 font-semibold">Click to flip back</span>
                </div>
              </div>
            )}
          </div>

          {/* Flashcard Action Bar */}
          <div className="flex items-center justify-between gap-3 bg-white p-3 border border-slate-200 rounded-xl shadow-2xs">
            {/* Prev / Next controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrevCard}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
                title="Previous Flashcard (Arrow Left)"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>
              <button
                onClick={handleNextCard}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
                title="Next Flashcard (Arrow Right)"
              >
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  const randomIdx = Math.floor(Math.random() * toolsForPillar.length);
                  setFlashcardIndex(randomIdx);
                  setIsFlipped(false);
                }}
                className="p-1.5 text-slate-500 hover:text-slate-800 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                title="Shuffle card order"
              >
                <Shuffle className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Launch Simulator Quick Button */}
            {onLaunchSimulator && currentFlashcardTool && (
              <button
                onClick={() => onLaunchSimulator(currentFlashcardTool.id)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Launch {currentFlashcardTool.shortName} Sim</span>
              </button>
            )}

            {/* Self-Rating buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleMarkReview(currentFlashcardTool.id)}
                className="px-3 py-1.5 text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                title="Mark this framework to review again (Hotkey: R)"
              >
                <span>Needs Review (R)</span>
              </button>
              <button
                onClick={() => handleMarkMastered(currentFlashcardTool.id)}
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
                title="Mark this framework as mastered (Hotkey: M)"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Mastered (M)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUIZ VIEW */}
      {learningMode === 'quiz' && (
        <>
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
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
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
                <div
                  key={item.q.id}
                  className={`p-5 bg-white border rounded-xl transition-all space-y-4 ${
                    hasAnswered
                      ? isCorrect
                        ? 'border-emerald-300 shadow-2xs'
                        : 'border-slate-300'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider">
                          Question {idx + 1} of {filteredQuestions.length}
                        </span>
                        <span>·</span>
                        <span className="text-2xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                          {item.toolName}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">
                        {item.q.question}
                      </h4>
                    </div>

                    {hasAnswered && (
                      <div className={`flex items-center gap-1.5 text-xs font-bold shrink-0 ${
                        isCorrect ? 'text-emerald-700' : 'text-slate-500'
                      }`}>
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Correct</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-rose-500" />
                            <span>Incorrect</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {item.q.options.map((opt, optIdx) => {
                      const isSelected = userAns === optIdx;
                      const isTargetCorrect = optIdx === item.q.correctAnswer;

                      let optClass = 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700 cursor-pointer';

                      if (hasAnswered) {
                        if (isSelected && isCorrect) {
                          optClass = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold ring-1 ring-emerald-400';
                        } else if (isSelected && !isCorrect) {
                          optClass = 'bg-rose-50 border-rose-300 text-rose-950';
                        } else if (isTargetCorrect) {
                          optClass = 'bg-emerald-50/50 border-emerald-300 text-emerald-900 font-medium';
                        } else {
                          optClass = 'bg-white border-slate-100 text-slate-400 opacity-60';
                        }
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
        </>
      )}

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
                Demonstrated mastery of the foundational business frameworks grounded in the training curriculum by Sundaresh Kamaraj.
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
                For achieving <span className="font-bold text-emerald-700 tabular-nums">{percentage}% score</span> across C-Suite frameworks.
              </p>
            </div>

            <div className="flex items-center justify-between text-2xs text-slate-400 pt-2 border-t border-slate-100">
              <span>Date: October 24, 2026</span>
              <span>Verification ID: STRAT-2026-CERT</span>
              <span>Authority: sundaresh.blog</span>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" /> Print Certificate
              </button>
              <button
                onClick={() => setShowCertificate(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 rounded-lg transition-colors cursor-pointer"
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
