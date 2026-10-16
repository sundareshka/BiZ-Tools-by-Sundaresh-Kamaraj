import { useState } from 'react';
import { Layers, ShieldCheck, AlertTriangle, CheckCircle2, RotateCcw, Sliders, ArrowRight, Sparkles, Building2, Users, FileText, Compass, Network, Award, HelpCircle } from 'lucide-react';

interface ElementProfile {
  id: string;
  name: string;
  type: 'Hard' | 'Soft' | 'Core';
  subtitle: string;
  asIs: string;
  evidence: string;
  toBe: string;
  keyQuestion: string;
}

interface PairwiseLink {
  id: string;
  elemA: string;
  elemB: string;
  label: string;
  status: 'aligned' | 'partly' | 'misaligned';
  issue: string;
  remedy: string;
}

const PRESETS = [
  {
    name: 'Pandian Skill Academy (Blended Learning Transition)',
    description: '140-person IT training company transitioning from classroom to blended online learning; stalled at 9% online revenue.',
    elements: {
      strategy: { asIs: 'Pivot to 40% online enrolments in 2 years.', toBe: 'Blended education model with online courses accredited by industry.' },
      structure: { asIs: 'Centralized digital tech team vs physical branch silos.', toBe: 'Branch Digital Leads embedded in every physical center.' },
      systems: { asIs: 'Branch P&L credits online sales to central digital team; branches lose revenue when students enroll online.', toBe: 'Online enrolments credited to the counselling branch P&L.' },
      sharedValues: { asIs: 'Staff belief: "Real learning happens only in physical classrooms".', toBe: '"Learn Anywhere" shared outcome standard co-created with trainers.' },
      style: { asIs: 'Leadership celebrates physical classroom batch fill-rates in monthly reviews.', toBe: 'Reviews celebrate blended student completion and digital satisfaction.' },
      staff: { asIs: '140 staff; 70% physical trainers with no digital experience.', toBe: 'Faculty certified in blended hybrid pedagogical delivery.' },
      skills: { asIs: 'Only 15% of trainers certified in online classroom delivery.', toBe: '88%+ trainers certified with modern digital lab simulations.' }
    },
    links: [
      { id: 'strat-sys', elemA: 'Strategy', elemB: 'Systems', status: 'misaligned', issue: 'Branch P&L penalizes branches when students enroll online.', remedy: 'Credit online tuition revenue directly to the recruiting branch.' },
      { id: 'strat-style', elemA: 'Strategy', elemB: 'Style', status: 'misaligned', issue: 'Branch reviews focus exclusively on physical classroom seats.', remedy: 'Reformat leadership agendas around blended metrics.' },
      { id: 'strat-skills', elemA: 'Strategy', elemB: 'Skills', status: 'misaligned', issue: '85% of trainers have zero online pedagogical training.', remedy: 'Mandate 6-week online instruction certification.' },
      { id: 'strat-values', elemA: 'Strategy', elemB: 'Shared Values', status: 'misaligned', issue: 'Staff believe online education is inferior to classroom.', remedy: 'Share objective student job-placement parity data.' },
      { id: 'strat-struct', elemA: 'Strategy', elemB: 'Structure', status: 'partly', issue: 'Central digital team operates in isolation from branch counsellors.', remedy: 'Appoint branch digital coordinators.' },
      { id: 'strat-staff', elemA: 'Strategy', elemB: 'Staff', status: 'partly', issue: 'No digital learning designers on staff.', remedy: 'Hire 4 digital instructional designers.' },
      { id: 'sys-style', elemA: 'Systems', elemB: 'Style', status: 'aligned', issue: 'Both incentivize legacy branch behavior.', remedy: 'Synchronize new incentive with new review questions.' }
    ]
  },
  {
    name: 'Apex Digital Agency (Project to Retainer Model)',
    description: '50-person agency moving from one-off project contracts to recurring monthly retainer accounts.',
    elements: {
      strategy: { asIs: 'Shift from one-off projects to long-term monthly retainer clients.', toBe: '70% recurring revenue from annual retainer partnerships.' },
      structure: { asIs: 'Flat agency structure; all 9 account managers report to the founder.', toBe: 'Client partner directors leading dedicated vertical squads.' },
      systems: { asIs: 'Sales commission paid 100% on new project contracts signed.', toBe: '50% bonus on retainer renewals and lifetime account value.' },
      sharedValues: { asIs: '"Creative artistic perfection above all else".', toBe: 'Commercial client business growth and continuous ROI.' },
      style: { asIs: 'Founder personally reviews all client graphic drafts.', toBe: 'Founder focuses on enterprise tier-1 client relationships.' },
      staff: { asIs: '70% visual designers, 5% data analysts and client servicers.', toBe: 'Balanced client success managers and data analytics leads.' },
      skills: { asIs: 'Superb visual design; weak analytics and retainer reporting.', toBe: 'Performance marketing, monthly reporting, and client retention.' }
    },
    links: [
      { id: 'strat-sys', elemA: 'Strategy', elemB: 'Systems', status: 'misaligned', issue: 'Commission policy rewards one-off project hunting, not retainers.', remedy: 'Tie 50% of variable pay to quarterly retainer retention.' },
      { id: 'strat-style', elemA: 'Strategy', elemB: 'Style', status: 'misaligned', issue: 'Founder micromanages creative design drafts instead of client strategy.', remedy: 'Delegate creative approvals to Senior Art Directors.' },
      { id: 'strat-skills', elemA: 'Strategy', elemB: 'Skills', status: 'misaligned', issue: 'Account managers lack performance reporting and upselling skills.', remedy: 'Conduct 8-week client growth analytics academy.' },
      { id: 'strat-staff', elemA: 'Strategy', elemB: 'Staff', status: 'partly', issue: 'Under-staffed in client success managers.', remedy: 'Recruit 3 experienced retainer account leads.' },
      { id: 'strat-struct', elemA: 'Strategy', elemB: 'Structure', status: 'partly', issue: 'Founder is single point of failure for 9 account managers.', remedy: 'Create 2 Group Account Director tiers.' },
      { id: 'strat-values', elemA: 'Strategy', elemB: 'Shared Values', status: 'partly', issue: 'Designers resent metrics and prioritize design awards over ROI.', remedy: 'Align internal awards to measurable client growth.' }
    ]
  }
];

export function McKinsey7SSimulator() {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'hub' | 'matrix' | 'roadmap'>('hub');
  const [selectedElementId, setSelectedElementId] = useState<string>('sharedValues');

  // Interactive Pairwise Links state
  const [links, setLinks] = useState<PairwiseLink[]>(PRESETS[0].links as PairwiseLink[]);

  const handleSelectPreset = (idx: number) => {
    setSelectedPresetIndex(idx);
    setLinks(PRESETS[idx].links as PairwiseLink[]);
  };

  const toggleLinkStatus = (linkId: string) => {
    setLinks(prev => prev.map(l => {
      if (l.id !== linkId) return l;
      const nextStatus = l.status === 'aligned' ? 'partly' : l.status === 'partly' ? 'misaligned' : 'aligned';
      return { ...l, status: nextStatus };
    }));
  };

  const preset = PRESETS[selectedPresetIndex];

  const ELEMENT_DEFINITIONS: Record<string, ElementProfile> = {
    strategy: {
      id: 'strategy',
      name: 'Strategy',
      type: 'Hard',
      subtitle: 'The plan for competitive advantage',
      keyQuestion: 'What is our competitive plan to win over the next 2-3 years?',
      asIs: preset.elements.strategy.asIs,
      evidence: 'Executive strategic board minutes, annual operating plan document',
      toBe: preset.elements.strategy.toBe
    },
    structure: {
      id: 'structure',
      name: 'Structure',
      type: 'Hard',
      subtitle: 'How the organization is divided and coordinated',
      keyQuestion: 'Who reports to whom, and where do decision bottlenecks lie?',
      asIs: preset.elements.structure.asIs,
      evidence: 'Current organizational chart, spans of control, departmental charters',
      toBe: preset.elements.structure.toBe
    },
    systems: {
      id: 'systems',
      name: 'Systems',
      type: 'Hard',
      subtitle: 'The formal procedures and incentive mechanisms',
      keyQuestion: 'Which processes, forms, or compensation metrics dictate daily priorities?',
      asIs: preset.elements.systems.asIs,
      evidence: 'Sales commission policy, monthly P&L formats, approval workflows',
      toBe: preset.elements.systems.toBe
    },
    sharedValues: {
      id: 'sharedValues',
      name: 'Shared Values',
      type: 'Core',
      subtitle: 'Core guiding beliefs at the center (Superordinate Goals)',
      keyQuestion: 'What core belief shapes employee decisions when nobody is watching?',
      asIs: preset.elements.sharedValues.asIs,
      evidence: 'Observed employee conversations, onboarding materials, internal lore',
      toBe: preset.elements.sharedValues.toBe
    },
    style: {
      id: 'style',
      name: 'Style',
      type: 'Soft',
      subtitle: 'Observed leadership behavior and cultural norms',
      keyQuestion: 'How do executives actually behave and spend their weekly calendar time?',
      asIs: preset.elements.style.asIs,
      evidence: 'Executive meeting agendas, leadership time logs, frontline interview quotes',
      toBe: preset.elements.style.toBe
    },
    staff: {
      id: 'staff',
      name: 'Staff',
      type: 'Soft',
      subtitle: 'People, roles, and demographic talent allocation',
      keyQuestion: 'Which job categories do we have in abundance, and which are bottlenecked?',
      asIs: preset.elements.staff.asIs,
      evidence: 'HRMS employee headcount rosters, turnover statistics, recruitment time-to-fill',
      toBe: preset.elements.staff.toBe
    },
    skills: {
      id: 'skills',
      name: 'Skills',
      type: 'Soft',
      subtitle: 'Distinctive organizational capabilities and proficiencies',
      keyQuestion: 'What can this company execute better than competitors, and where is the skill gap?',
      asIs: preset.elements.skills.asIs,
      evidence: 'Customer feedback audit, capability assessments, quality error logs',
      toBe: preset.elements.skills.toBe
    }
  };

  const activeElem = ELEMENT_DEFINITIONS[selectedElementId] || ELEMENT_DEFINITIONS.sharedValues;

  // Alignment Health Calculations
  const alignedCount = links.filter(l => l.status === 'aligned').length;
  const partlyCount = links.filter(l => l.status === 'partly').length;
  const misalignedCount = links.filter(l => l.status === 'misaligned').length;
  const totalChecked = links.length;
  const healthScore = totalChecked > 0 ? Math.round(((alignedCount * 1.0 + partlyCount * 0.5) / totalChecked) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 mb-1">
              <Compass className="w-3.5 h-3.5" />
              <span>Pillar 7: HR & Organizational Diagnostics</span>
              <span>·</span>
              <span>McKinsey & Company 7S Model</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              McKinsey 7S Organizational Alignment Simulator
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Diagnose organizational friction across 3 Hard elements (Strategy, Structure, Systems) and 4 Soft elements (Shared Values, Style, Staff, Skills).
            </p>
          </div>

          {/* Preset Selector */}
          <div className="flex items-center gap-2">
            <span className="text-2xs font-bold uppercase tracking-wider text-slate-400">Preset:</span>
            <select
              value={selectedPresetIndex}
              onChange={(e) => handleSelectPreset(Number(e.target.value))}
              className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-indigo-600 outline-none"
            >
              {PRESETS.map((p, idx) => (
                <option key={p.name} value={idx}>{p.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Alignment Metrics Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
            <span className="text-2xs uppercase tracking-wider font-bold text-slate-400 block">Alignment Health</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`text-xl font-extrabold font-mono ${
                healthScore >= 70 ? 'text-emerald-600' : healthScore >= 45 ? 'text-amber-600' : 'text-rose-600'
              }`}>
                {healthScore}%
              </span>
              <span className="text-3xs text-slate-500">Mutual Fit</span>
            </div>
          </div>

          <div className="p-3 bg-rose-50/60 rounded-lg border border-rose-200/80">
            <span className="text-2xs uppercase tracking-wider font-bold text-rose-600 block">Critical Misalignments</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xl font-extrabold font-mono text-rose-700">{misalignedCount}</span>
              <span className="text-3xs text-rose-600">Active Saboteurs</span>
            </div>
          </div>

          <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200/80">
            <span className="text-2xs uppercase tracking-wider font-bold text-amber-600 block">Partial Misalignments</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xl font-extrabold font-mono text-amber-700">{partlyCount}</span>
              <span className="text-3xs text-amber-600">Friction Points</span>
            </div>
          </div>

          <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-200/80">
            <span className="text-2xs uppercase tracking-wider font-bold text-emerald-600 block">Harmonized Pairs</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xl font-extrabold font-mono text-emerald-700">{alignedCount}</span>
              <span className="text-3xs text-emerald-600">Reinforcing</span>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1.5 mt-5 p-1 bg-slate-100 rounded-lg w-fit border border-slate-200">
          <button
            onClick={() => setActiveTab('hub')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'hub' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            1. Visual 7S Hub & Profiles
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'matrix' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2. Pairwise Alignment Grid ({links.length} Links)
          </button>
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'roadmap' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            3. Change Sequencing Roadmap
          </button>
        </div>
      </div>

      {/* TAB 1: VISUAL 7S HUB & ELEMENT PROFILES */}
      {activeTab === 'hub' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Interactive Hub Diagram */}
          <div className="lg:col-span-7 p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">7S Interconnected Model</h3>
              <span className="text-2xs text-slate-500">Click any element to inspect its As-Is profile</span>
            </div>

            {/* Hub Visual Layout */}
            <div className="relative p-6 bg-radial from-slate-50 to-slate-100/70 border border-slate-200 rounded-xl min-h-[420px] flex flex-col justify-between items-center">
              {/* Top Row: Hard Elements */}
              <div className="w-full flex justify-between items-center px-4">
                <button
                  onClick={() => setSelectedElementId('strategy')}
                  className={`p-3.5 rounded-xl border text-left transition-all w-40 ${
                    selectedElementId === 'strategy'
                      ? 'bg-blue-900 text-white border-blue-900 shadow-md ring-2 ring-blue-300'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-center justify-between text-2xs font-extrabold uppercase tracking-wider mb-1">
                    <span className={selectedElementId === 'strategy' ? 'text-blue-200' : 'text-blue-600'}>Hard</span>
                    <Building2 className="w-3.5 h-3.5 opacity-80" />
                  </div>
                  <div className="font-bold text-sm">Strategy</div>
                  <div className={`text-3xs truncate mt-0.5 ${selectedElementId === 'strategy' ? 'text-blue-200' : 'text-slate-500'}`}>
                    Plan for advantage
                  </div>
                </button>

                <button
                  onClick={() => setSelectedElementId('structure')}
                  className={`p-3.5 rounded-xl border text-left transition-all w-40 ${
                    selectedElementId === 'structure'
                      ? 'bg-blue-900 text-white border-blue-900 shadow-md ring-2 ring-blue-300'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-center justify-between text-2xs font-extrabold uppercase tracking-wider mb-1">
                    <span className={selectedElementId === 'structure' ? 'text-blue-200' : 'text-blue-600'}>Hard</span>
                    <Network className="w-3.5 h-3.5 opacity-80" />
                  </div>
                  <div className="font-bold text-sm">Structure</div>
                  <div className={`text-3xs truncate mt-0.5 ${selectedElementId === 'structure' ? 'text-blue-200' : 'text-slate-500'}`}>
                    Hierarchy & units
                  </div>
                </button>

                <button
                  onClick={() => setSelectedElementId('systems')}
                  className={`p-3.5 rounded-xl border text-left transition-all w-40 ${
                    selectedElementId === 'systems'
                      ? 'bg-blue-900 text-white border-blue-900 shadow-md ring-2 ring-blue-300'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-center justify-between text-2xs font-extrabold uppercase tracking-wider mb-1">
                    <span className={selectedElementId === 'systems' ? 'text-blue-200' : 'text-blue-600'}>Hard</span>
                    <Sliders className="w-3.5 h-3.5 opacity-80" />
                  </div>
                  <div className="font-bold text-sm">Systems</div>
                  <div className={`text-3xs truncate mt-0.5 ${selectedElementId === 'systems' ? 'text-blue-200' : 'text-slate-500'}`}>
                    Incentives & SOPs
                  </div>
                </button>
              </div>

              {/* Center Element: Shared Values (Core) */}
              <div className="my-6">
                <button
                  onClick={() => setSelectedElementId('sharedValues')}
                  className={`p-5 rounded-2xl border text-center transition-all w-52 shadow-md ${
                    selectedElementId === 'sharedValues'
                      ? 'bg-amber-500 text-white border-amber-600 ring-4 ring-amber-200'
                      : 'bg-amber-50 text-slate-900 border-amber-300 hover:bg-amber-100'
                  }`}
                >
                  <div className={`flex items-center justify-center gap-1.5 text-2xs font-extrabold uppercase tracking-widest mb-1 ${
                    selectedElementId === 'sharedValues' ? 'text-amber-100' : 'text-amber-700'
                  }`}>
                    <Award className="w-3.5 h-3.5" />
                    <span>Core Hub</span>
                  </div>
                  <div className="text-base font-extrabold">Shared Values</div>
                  <div className={`text-3xs mt-1 ${selectedElementId === 'sharedValues' ? 'text-amber-100' : 'text-amber-800 font-medium'}`}>
                    Superordinate goals connecting all 6 dimensions
                  </div>
                </button>
              </div>

              {/* Bottom Row: Soft Elements */}
              <div className="w-full flex justify-between items-center px-4">
                <button
                  onClick={() => setSelectedElementId('style')}
                  className={`p-3.5 rounded-xl border text-left transition-all w-40 ${
                    selectedElementId === 'style'
                      ? 'bg-purple-900 text-white border-purple-900 shadow-md ring-2 ring-purple-300'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-purple-400'
                  }`}
                >
                  <div className="flex items-center justify-between text-2xs font-extrabold uppercase tracking-wider mb-1">
                    <span className={selectedElementId === 'style' ? 'text-purple-200' : 'text-purple-600'}>Soft</span>
                    <Sparkles className="w-3.5 h-3.5 opacity-80" />
                  </div>
                  <div className="font-bold text-sm">Style</div>
                  <div className={`text-3xs truncate mt-0.5 ${selectedElementId === 'style' ? 'text-purple-200' : 'text-slate-500'}`}>
                    Leadership culture
                  </div>
                </button>

                <button
                  onClick={() => setSelectedElementId('staff')}
                  className={`p-3.5 rounded-xl border text-left transition-all w-40 ${
                    selectedElementId === 'staff'
                      ? 'bg-purple-900 text-white border-purple-900 shadow-md ring-2 ring-purple-300'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-purple-400'
                  }`}
                >
                  <div className="flex items-center justify-between text-2xs font-extrabold uppercase tracking-wider mb-1">
                    <span className={selectedElementId === 'staff' ? 'text-purple-200' : 'text-purple-600'}>Soft</span>
                    <Users className="w-3.5 h-3.5 opacity-80" />
                  </div>
                  <div className="font-bold text-sm">Staff</div>
                  <div className={`text-3xs truncate mt-0.5 ${selectedElementId === 'staff' ? 'text-purple-200' : 'text-slate-500'}`}>
                    People & talent
                  </div>
                </button>

                <button
                  onClick={() => setSelectedElementId('skills')}
                  className={`p-3.5 rounded-xl border text-left transition-all w-40 ${
                    selectedElementId === 'skills'
                      ? 'bg-purple-900 text-white border-purple-900 shadow-md ring-2 ring-purple-300'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-purple-400'
                  }`}
                >
                  <div className="flex items-center justify-between text-2xs font-extrabold uppercase tracking-wider mb-1">
                    <span className={selectedElementId === 'skills' ? 'text-purple-200' : 'text-purple-600'}>Soft</span>
                    <Layers className="w-3.5 h-3.5 opacity-80" />
                  </div>
                  <div className="font-bold text-sm">Skills</div>
                  <div className={`text-3xs truncate mt-0.5 ${selectedElementId === 'skills' ? 'text-purple-200' : 'text-slate-500'}`}>
                    Core capabilities
                  </div>
                </button>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-xs text-slate-600">
              <span className="font-medium">Foundational Rule:</span>
              <span className="text-slate-700">
                You cannot alter one element without automatically producing ripples in all other six.
              </span>
            </div>
          </div>

          {/* Element Inspector Pane */}
          <div className="lg:col-span-5 p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className={`text-2xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  activeElem.type === 'Core' ? 'bg-amber-100 text-amber-800' : activeElem.type === 'Hard' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                }`}>
                  {activeElem.type} Element
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{activeElem.name}</h3>
                <p className="text-xs text-slate-500">{activeElem.subtitle}</p>
              </div>
            </div>

            {/* Diagnostic Question */}
            <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-lg">
              <span className="text-2xs uppercase tracking-wider font-bold text-indigo-700 block mb-0.5">Core Diagnostic Question</span>
              <p className="text-xs font-semibold text-indigo-950 italic">
                "{activeElem.keyQuestion}"
              </p>
            </div>

            {/* As-Is State */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">Observed As-Is Reality:</span>
                <span className="text-3xs text-slate-400 font-mono">Current State</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 leading-relaxed">
                {activeElem.asIs}
              </div>
            </div>

            {/* Document / Observational Evidence */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-700 block">Corroborating Evidence:</span>
              <div className="p-2.5 bg-slate-100/70 border border-slate-200/80 rounded-lg text-xs text-slate-600 flex items-start gap-2">
                <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>{activeElem.evidence}</span>
              </div>
            </div>

            {/* To-Be State */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Required To-Be Configuration:
                </span>
                <span className="text-3xs text-emerald-600 font-bold uppercase tracking-wider">Target State</span>
              </div>
              <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-lg text-xs text-emerald-950 leading-relaxed font-medium">
                {activeElem.toBe}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PAIRWISE ALIGNMENT GRID */}
      {activeTab === 'matrix' && (
        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Pairwise 7S Alignment Matrix</h3>
              <p className="text-xs text-slate-500">
                Click any status badge to toggle between Aligned, Partly Aligned, and Misaligned.
              </p>
            </div>
            <div className="flex items-center gap-3 text-2xs font-semibold">
              <span className="flex items-center gap-1 text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Aligned
              </span>
              <span className="flex items-center gap-1 text-amber-700">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span> Partly Aligned
              </span>
              <span className="flex items-center gap-1 text-rose-700">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span> Misaligned
              </span>
            </div>
          </div>

          {/* Links Table */}
          <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
            {links.map((link) => (
              <div key={link.id} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900">{link.elemA}</span>
                    <span className="text-slate-300 font-mono">↔</span>
                    <span className="font-bold text-xs text-slate-900">{link.elemB}</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    <span className="font-medium text-slate-800">Friction Issue:</span> {link.issue}
                  </p>
                  <p className="text-xs text-emerald-800">
                    <span className="font-semibold text-emerald-900">Alignment Remedy:</span> {link.remedy}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <button
                    onClick={() => toggleLinkStatus(link.id)}
                    className={`px-3 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                      link.status === 'aligned'
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200'
                        : link.status === 'partly'
                        ? 'bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200'
                        : 'bg-rose-100 text-rose-800 border-rose-300 hover:bg-rose-200'
                    }`}
                  >
                    {link.status === 'aligned' ? '✓ Aligned' : link.status === 'partly' ? '⚠ Partly' : '✕ Misaligned'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CHANGE SEQUENCING ROADMAP */}
      {activeTab === 'roadmap' && (
        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Textbook 7S Change Sequencing Protocol</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Why reorganizations fail: executives change Structure on Day 1. The 7S framework dictates that Shared Values and Systems must be synchronized first.
            </p>
          </div>

          <div className="space-y-4">
            {/* Phase 1 */}
            <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xs font-extrabold uppercase tracking-wider text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded">
                  Phase 1: Foundation (Quarter 1)
                </span>
                <span className="text-xs font-bold text-amber-900">Shared Values & Strategy</span>
              </div>
              <p className="text-xs text-amber-950 leading-relaxed">
                Clarify the exact strategic outcome. Establish a shared definition of success directly with frontline leaders. Rebuild the core purpose statement co-written with staff, supported by objective outcome data.
              </p>
            </div>

            {/* Phase 2 */}
            <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xs font-extrabold uppercase tracking-wider text-blue-800 bg-blue-200/80 px-2 py-0.5 rounded">
                  Phase 2: Operating Mechanics (Quarter 2)
                </span>
                <span className="text-xs font-bold text-blue-900">Systems & Leadership Style</span>
              </div>
              <p className="text-xs text-blue-950 leading-relaxed">
                Fix the incentive formulas, approval workflows, and monthly review agendas. Stop measuring and celebrating legacy metrics. Leadership must visibly model the new behavior in routine weekly meetings before restructuring.
              </p>
            </div>

            {/* Phase 3 */}
            <div className="p-4 bg-purple-50/60 border border-purple-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xs font-extrabold uppercase tracking-wider text-purple-800 bg-purple-200/80 px-2 py-0.5 rounded">
                  Phase 3: Formal Architecture (Quarter 3)
                </span>
                <span className="text-xs font-bold text-purple-900">Structure, Staff & Skills</span>
              </div>
              <p className="text-xs text-purple-950 leading-relaxed">
                Now reorganize reporting lines, appoint cross-functional cluster leads, and launch role-based competency certifications. Because Systems and Style already reinforce the new vision, the new structure operates with high velocity.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
