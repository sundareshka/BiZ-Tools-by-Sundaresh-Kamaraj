import React, { useState } from 'react';
import {
  X,
  Award,
  Sparkles,
  Trophy,
  CheckCircle2,
  Lock,
  Printer,
  Share2,
  ShieldCheck,
  ChevronRight,
  Flame,
  Zap,
  Target,
  Compass
} from 'lucide-react';
import { ToolDefinition } from '../data/toolsData.ts';
import { UserProgressData } from '../utils/userProgress.ts';
import { triggerCompletionConfetti } from '../utils/confetti.ts';

interface ExecutiveAchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgressData;
  allTools: ToolDefinition[];
  onOpenCertificate: () => void;
}

interface ExecutiveBadge {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: any;
  isUnlocked: boolean;
  currentValue: number;
  targetValue: number;
  rewardTitle: string;
  color: string;
}

export function ExecutiveAchievementsModal({
  isOpen,
  onClose,
  progress,
  allTools,
  onOpenCertificate
}: ExecutiveAchievementsModalProps) {
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const completedSimsCount = progress.completedSimulators.length;
  const completedQuizzesCount = progress.completedQuizzes.length;

  // Disruption trio: Wardley, Blue Ocean, Christensen
  const disruptionIds = ['wardley', 'blueocean', 'christensen'];
  const disruptionDone = disruptionIds.filter(id => progress.completedSimulators.includes(id)).length;

  // Operational trio: Theory of Constraints, Value Stream Mapping, Six Sigma
  const opsIds = ['toc', 'vsm', 'sixsigma'];
  const opsDone = opsIds.filter(id => progress.completedSimulators.includes(id)).length;

  // Distinct pillars represented in completed simulators
  const completedPillars = new Set(
    allTools
      .filter(t => progress.completedSimulators.includes(t.id))
      .map(t => t.category)
  );

  const badges: ExecutiveBadge[] = [
    {
      id: 'badge-pioneer',
      title: 'Pioneer Strategist',
      category: 'Initiation',
      description: 'Complete your first strategic simulator and stress-test core parameters.',
      icon: Sparkles,
      isUnlocked: completedSimsCount >= 1,
      currentValue: Math.min(1, completedSimsCount),
      targetValue: 1,
      rewardTitle: 'Certified Strategic Explorer',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'badge-velocity',
      title: 'High-Velocity Operator',
      category: 'Momentum',
      description: 'Complete at least 5 simulators to build strategic momentum across horizons.',
      icon: Zap,
      isUnlocked: completedSimsCount >= 5,
      currentValue: Math.min(5, completedSimsCount),
      targetValue: 5,
      rewardTitle: 'Certified Agile Strategist',
      color: 'from-amber-500 to-orange-600'
    },
    {
      id: 'badge-disruption',
      title: 'Disruption Tactician',
      category: 'Specialization',
      description: 'Master Wardley Mapping, Blue Ocean Strategy, and Christensen Disruptive Innovation.',
      icon: Target,
      isUnlocked: disruptionDone === 3,
      currentValue: disruptionDone,
      targetValue: 3,
      rewardTitle: 'Disruptive Innovation Fellow',
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 'badge-ops',
      title: 'Operational Maestro',
      category: 'Efficiency',
      description: 'Master Theory of Constraints, Value Stream Mapping, and Six Sigma DMAIC.',
      icon: Flame,
      isUnlocked: opsDone === 3,
      currentValue: opsDone,
      targetValue: 3,
      rewardTitle: 'Operational Excellence Practitioner',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      id: 'badge-polymath',
      title: 'Corporate Polymath',
      category: 'Breadth',
      description: 'Complete at least one framework across 6 or more distinct strategic pillars.',
      icon: Compass,
      isUnlocked: completedPillars.size >= 6,
      currentValue: completedPillars.size,
      targetValue: 6,
      rewardTitle: 'Cross-Disciplinary Executive',
      color: 'from-indigo-600 to-blue-700'
    },
    {
      id: 'badge-quiz-grandmaster',
      title: 'Strategy Quiz Grandmaster',
      category: 'Assessment',
      description: 'Pass 10 strategic comprehension quizzes with high scores.',
      icon: Award,
      isUnlocked: completedQuizzesCount >= 10,
      currentValue: Math.min(10, completedQuizzesCount),
      targetValue: 10,
      rewardTitle: 'Senior Strategy Analyst',
      color: 'from-amber-400 to-yellow-600'
    },
    {
      id: 'badge-grand-strategist',
      title: 'Grand Corporate Strategist',
      category: 'Mastery',
      description: 'Complete all 57 strategic frameworks across all 10 corporate pillars.',
      icon: Trophy,
      isUnlocked: completedSimsCount >= 57,
      currentValue: completedSimsCount,
      targetValue: 57,
      rewardTitle: 'Distinguished Fellow in Corporate Strategy',
      color: 'from-violet-600 via-indigo-600 to-amber-500'
    }
  ];

  const unlockedCount = badges.filter(b => b.isUnlocked).length;
  const overallPercentage = Math.round((unlockedCount / badges.length) * 100);

  const handleShareAchievements = async () => {
    const text = `I have unlocked ${unlockedCount}/${badges.length} Executive Strategy Credentials on BizTools (${completedSimsCount}/57 frameworks completed)! Verified at: https://sundaresh.blog`;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div
        className="bg-white border border-slate-200 rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden my-auto max-h-[94vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header */}
        <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base">Executive Milestone Credentials & Badges</span>
                <span className="text-3xs font-mono font-bold bg-amber-950 text-amber-300 border border-amber-800/80 px-2 py-0.5 rounded">
                  {unlockedCount} / {badges.length} Unlocked
                </span>
              </div>
              <p className="text-3xs text-slate-400">
                Verifiable strategic credentials acknowledging mastery across planning, innovation, and operations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShareAchievements}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-400" />
              <span>{copiedLink ? 'Copied Link!' : 'Share Credential'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Executive Summary Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-indigo-900/60">
          <div className="space-y-1">
            <span className="text-2xs font-extrabold uppercase tracking-wider text-indigo-300">
              Overall Executive Acumen Score
            </span>
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl font-black text-white">
                {overallPercentage >= 80 ? 'Master Strategist' : overallPercentage >= 40 ? 'Senior Executive Leader' : 'Strategic Apprentice'}
              </h3>
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                {overallPercentage}% Verified
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenCertificate();
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-extrabold transition-all flex items-center gap-2 shadow-md cursor-pointer active:scale-95"
            >
              <Award className="w-4 h-4 fill-slate-950" />
              <span>View Official Certificate</span>
            </button>
          </div>
        </div>

        {/* Badge Grid Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {badges.map(b => {
              const Icon = b.icon;
              const pct = Math.min(100, Math.round((b.currentValue / b.targetValue) * 100));

              return (
                <div
                  key={b.id}
                  className={`p-4 rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                    b.isUnlocked
                      ? 'bg-white border-slate-300 shadow-sm ring-1 ring-emerald-500/20'
                      : 'bg-slate-50/80 border-slate-200 opacity-80'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                        b.isUnlocked
                          ? `bg-gradient-to-br ${b.color} text-white`
                          : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      {b.isUnlocked ? <Icon className="w-6 h-6" /> : <Lock className="w-5 h-5" />}
                    </div>

                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-3xs font-extrabold uppercase tracking-wider text-slate-400">
                          {b.category}
                        </span>
                        {b.isUnlocked ? (
                          <span className="inline-flex items-center gap-1 text-3xs font-bold font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            UNLOCKED
                          </span>
                        ) : (
                          <span className="text-3xs font-mono font-bold text-slate-500">
                            {b.currentValue} / {b.targetValue}
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 leading-snug">
                        {b.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {b.description}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar & Reward Title */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                    <div className="flex items-center justify-between text-3xs">
                      <span className="font-semibold text-slate-500 truncate max-w-[200px]">
                        Award: {b.rewardTitle}
                      </span>
                      <span className="font-mono font-bold text-slate-700">{pct}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 rounded-full ${
                          b.isUnlocked ? 'bg-emerald-500' : 'bg-indigo-500'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
