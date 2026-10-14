import { useState } from 'react';
import { Target, Users, CheckCircle2, AlertTriangle, RotateCcw, Sliders, ShieldCheck, Clock, MessageSquare, Play, Sparkles } from 'lucide-react';

export function ScrumSimulator() {
  const [activeTab, setActiveTab] = useState<'planning' | 'daily' | 'dod' | 'retro'>('planning');

  // Sprint Planning State
  const [sprintGoal, setSprintGoal] = useState<string>('Partner colleges can self-register and upload student batch CSV without support intervention');
  const [teamSize, setTeamSize] = useState<number>(9);
  const [workingDays, setWorkingDays] = useState<number>(9); // 10 days minus 1 public holiday
  const [focusHoursPerDay, setFocusHoursPerDay] = useState<number>(6);

  const totalCapacityHours = teamSize * workingDays * focusHoursPerDay;
  const estimatedCapacityPoints = Math.round(totalCapacityHours / 14); // ~14 hours per story point

  // Daily Scrum Standup Developers State
  const [devStandups, setDevStandups] = useState([
    {
      name: 'Karthik (Backend Lead)',
      completed: 'Merged CSV parser with RFC 4180 validation & unit tests',
      nextPlan: 'Implement batch database upsert with transaction rollback',
      blocker: 'Waiting for staging PostgreSQL database permissions from DevOps',
      isBlocked: true,
      blockerOwner: 'Arun (Scrum Master)'
    },
    {
      name: 'Priya (Frontend Specialist)',
      completed: 'Built drag-and-drop CSV upload modal with live column mapping preview',
      nextPlan: 'Connect frontend to batch upload API endpoint and handle error states',
      blocker: 'None — on track',
      isBlocked: false,
      blockerOwner: ''
    },
    {
      name: 'Vignesh (Full Stack)',
      completed: 'Designed responsive college registration form and email verification token',
      nextPlan: 'Integrate automated welcome onboarding email sequence via SendGrid',
      blocker: 'Awaiting copy approval from marketing for email template',
      isBlocked: true,
      blockerOwner: 'Meenakshi (Product Owner)'
    }
  ]);

  // Definition of Done Checklist State
  const [dodItems, setDodItems] = useState([
    { id: 'dod-1', title: 'Acceptance Criteria Verified', desc: 'All functional conditions in user story tested and demonstrated to Product Owner', checked: true },
    { id: 'dod-2', title: 'Peer Code Review Complete', desc: 'Pull request approved by at least one independent Senior Developer', checked: true },
    { id: 'dod-3', title: 'Automated Unit & Integration Tests Passing', desc: 'Test coverage exceeds 80% with zero failing assertions in CI/CD pipeline', checked: true },
    { id: 'dod-4', title: 'Deployed to Staging Environment', desc: 'Artifact built and deployed to staging with automated smoke tests green', checked: true },
    { id: 'dod-5', title: 'Security & Data Protection Audit Passed', desc: 'No plaintext student PII logged; OWASP top-10 check completed', checked: false },
    { id: 'dod-6', title: 'Release Notes & User Documentation Written', desc: 'Help documentation and release changelog updated for college admins', checked: false }
  ]);

  // Sprint Retrospective State (Start / Stop / Continue)
  const [retroActions, setRetroActions] = useState([
    { type: 'Start', text: 'Enforcing acceptance criteria before estimating story points during refinement', owner: 'Priya (Dev)', sprint: 'Sprint 8' },
    { type: 'Stop', text: 'Accepting ad-hoc feature requests via WhatsApp during active sprint', owner: 'Meenakshi (PO)', sprint: 'Sprint 8' },
    { type: 'Continue', text: 'Live Friday working demos with partner college principals', owner: 'Team', sprint: 'Ongoing' }
  ]);
  const [newActionText, setNewActionText] = useState('');
  const [newActionType, setNewActionType] = useState<'Start' | 'Stop' | 'Continue'>('Start');

  const handleToggleDoD = (id: string) => {
    setDodItems(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const handleResolveBlocker = (index: number) => {
    setDevStandups(prev => prev.map((dev, i) => i === index ? { ...dev, isBlocked: false, blocker: 'Resolved during Daily Scrum follow-up' } : dev));
  };

  const handleAddRetroAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActionText.trim()) return;
    setRetroActions(prev => [...prev, {
      type: newActionType,
      text: newActionText.trim(),
      owner: 'Scrum Master / Team',
      sprint: 'Next Sprint'
    }]);
    setNewActionText('');
  };

  const dodCompletedCount = dodItems.filter(i => i.checked).length;
  const isDoDComplete = dodCompletedCount === dodItems.length;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-7 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-3xs font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900">
              Tool 5 Simulator
            </span>
            <span className="text-3xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
              3 Accountabilities · 5 Events · 3 Artefacts & Commitments
            </span>
            <span className="text-3xs font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
              Scrum Guide 2020 Standard
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Scrum Framework Empirical Lifecycle Simulator
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl">
            Simulate the full sprint cadence of <strong>Pandiyan Digital Learning</strong> (Madurai EdTech). Formulate an outcome-based Sprint Goal, inspect blockers at the 15-minute Daily Scrum, verify the Definition of Done, and run retrospectives.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start lg:self-center">
          <button
            onClick={() => setActiveTab('planning')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'planning' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            1. Sprint Planning
          </button>
          <button
            onClick={() => setActiveTab('daily')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'daily' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2. Daily Scrum
          </button>
          <button
            onClick={() => setActiveTab('dod')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'dod' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            3. Definition of Done
          </button>
          <button
            onClick={() => setActiveTab('retro')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'retro' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            4. Retrospective
          </button>
        </div>
      </div>

      {/* TAB 1: SPRINT PLANNING & GOAL BUILDER */}
      {activeTab === 'planning' && (
        <div className="space-y-5">
          {/* Sprint Goal Banner */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3 mb-2">
              <span className="text-3xs font-extrabold uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded">
                Artefact Commitment: Sprint Goal
              </span>
              <span className="text-3xs text-amber-800 font-medium">Scrum Guide: The single objective of the sprint</span>
            </div>
            <textarea
              value={sprintGoal}
              onChange={(e) => setSprintGoal(e.target.value)}
              rows={2}
              className="w-full bg-white border border-amber-300 rounded-lg p-2.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-amber-500 outline-none"
              placeholder="Enter unifying Sprint Goal..."
            />
            <p className="text-3xs text-amber-900/80 mt-1.5 italic">
              Pro-Tip: "A sprint without a Sprint Goal is merely a disconnected to-do list. The goal gives developers autonomy to make scope trade-offs during the sprint."
            </p>
          </div>

          {/* Capacity Calculator */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-3xs font-bold uppercase text-slate-500 block">Developers on Team</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-slate-900 font-mono">{teamSize}</span>
                <span className="text-xs text-slate-500">engineers</span>
              </div>
              <input
                type="range"
                min={3}
                max={9}
                value={teamSize}
                onChange={(e) => setTeamSize(parseInt(e.target.value))}
                className="w-full mt-2 accent-slate-800"
              />
              <span className="text-3xs text-slate-400 mt-1 block">Scrum Guide: 10 or fewer people</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-3xs font-bold uppercase text-slate-500 block">Working Days (2-Week Sprint)</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-slate-900 font-mono">{workingDays}</span>
                <span className="text-xs text-slate-500">days (less holidays)</span>
              </div>
              <input
                type="range"
                min={7}
                max={10}
                value={workingDays}
                onChange={(e) => setWorkingDays(parseInt(e.target.value))}
                className="w-full mt-2 accent-slate-800"
              />
              <span className="text-3xs text-slate-400 mt-1 block">1 public holiday factored in</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-3xs font-bold uppercase text-slate-500 block">Calculated Team Capacity</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-emerald-700 font-mono">{estimatedCapacityPoints}</span>
                <span className="text-xs font-semibold text-slate-600">story points ({totalCapacityHours}h)</span>
              </div>
              <p className="text-3xs text-slate-400 mt-2">
                Based on {focusHoursPerDay} productive hours/day (excludes meetings and email)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DAILY SCRUM 15-MIN STANDUP */}
      {activeTab === 'daily' && (
        <div className="space-y-4">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between text-xs text-blue-900">
            <span className="flex items-center gap-2 font-bold">
              <Clock className="w-4 h-4 text-blue-700" />
              <span>Daily Scrum Time-box: 15 Minutes (Developers Only)</span>
            </span>
            <span className="text-3xs bg-white text-blue-900 px-2 py-0.5 rounded font-mono font-bold border border-blue-200">
              Inspect progress toward Sprint Goal
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {devStandups.map((dev, idx) => (
              <div key={dev.name} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="font-bold text-slate-900 text-xs">{dev.name}</span>
                  {dev.isBlocked ? (
                    <span className="text-3xs font-bold uppercase px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Blocked
                    </span>
                  ) : (
                    <span className="text-3xs font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Flowing
                    </span>
                  )}
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-3xs font-bold uppercase text-slate-400 block">Yesterday:</span>
                    <p className="text-slate-700 font-medium text-2xs">{dev.completed}</p>
                  </div>
                  <div>
                    <span className="text-3xs font-bold uppercase text-slate-400 block">Today:</span>
                    <p className="text-slate-700 font-medium text-2xs">{dev.nextPlan}</p>
                  </div>
                  <div>
                    <span className="text-3xs font-bold uppercase text-slate-400 block">Impediment / Blocker:</span>
                    <p className={`text-2xs font-semibold ${dev.isBlocked ? 'text-rose-700' : 'text-slate-500'}`}>
                      {dev.blocker}
                    </p>
                  </div>
                </div>

                {dev.isBlocked && (
                  <button
                    onClick={() => handleResolveBlocker(idx)}
                    className="w-full mt-2 py-1.5 text-2xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                  >
                    Scrum Master: Resolve Blocker
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DEFINITION OF DONE (DoD) */}
      {activeTab === 'dod' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <h4 className="text-sm font-bold text-slate-900">Increment Quality Commitment (Definition of Done)</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Every Product Backlog item must satisfy 100% of these criteria to be accepted into the Increment.
              </p>
            </div>
            <span className={`text-xs font-mono font-bold px-3 py-1 rounded-lg border ${
              isDoDComplete ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-amber-100 text-amber-900 border-amber-300'
            }`}>
              {dodCompletedCount} / {dodItems.length} Criteria Passed
            </span>
          </div>

          <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
            {dodItems.map(item => (
              <div
                key={item.id}
                onClick={() => handleToggleDoD(item.id)}
                className="p-3.5 flex items-start gap-3 hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => {}}
                  className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 mt-0.5 cursor-pointer"
                />
                <div className="space-y-0.5">
                  <span className={`text-xs font-bold block ${item.checked ? 'text-slate-900' : 'text-slate-700'}`}>
                    {item.title}
                  </span>
                  <p className="text-2xs text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SPRINT RETROSPECTIVE */}
      {activeTab === 'retro' && (
        <div className="space-y-5">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="text-sm font-bold text-slate-900">Sprint Retrospective: Start / Stop / Continue Engine</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Inspect process and tooling at sprint end. Commit to actionable improvements with named owners for the next sprint.
            </p>

            <form onSubmit={handleAddRetroAction} className="mt-3 flex gap-2 flex-wrap sm:flex-nowrap">
              <select
                value={newActionType}
                onChange={(e) => setNewActionType(e.target.value as any)}
                className="bg-white border border-slate-300 text-xs font-bold rounded-lg px-2.5 py-1.5 text-slate-800"
              >
                <option value="Start">Start</option>
                <option value="Stop">Stop</option>
                <option value="Continue">Continue</option>
              </select>
              <input
                type="text"
                value={newActionText}
                onChange={(e) => setNewActionText(e.target.value)}
                placeholder="Enter improvement item (e.g. provision secondary staging database)..."
                className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:ring-2 focus:ring-slate-900 outline-none"
              />
              <button
                type="submit"
                className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors whitespace-nowrap"
              >
                Add Action Item
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {['Start', 'Stop', 'Continue'].map(category => (
              <div key={category} className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className={`text-xs font-bold ${
                    category === 'Start' ? 'text-emerald-700' : category === 'Stop' ? 'text-rose-700' : 'text-blue-700'
                  }`}>
                    {category} Doing
                  </span>
                  <span className="text-3xs font-mono font-bold text-slate-400">
                    {retroActions.filter(a => a.type === category).length} items
                  </span>
                </div>
                <div className="space-y-2">
                  {retroActions.filter(a => a.type === category).map((action, i) => (
                    <div key={i} className="p-2 bg-slate-50 rounded-lg border border-slate-200/80 text-2xs space-y-1">
                      <p className="font-semibold text-slate-800">{action.text}</p>
                      <div className="flex justify-between text-3xs text-slate-400 font-mono">
                        <span>Owner: {action.owner}</span>
                        <span>{action.sprint}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
