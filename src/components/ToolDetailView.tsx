import { useState } from 'react';
import { ToolDefinition } from '../data/toolsData.ts';
import { BookOpen, CheckCircle2, AlertTriangle, Lightbulb, Clock, Layers, ArrowRight, Play, Sparkles } from 'lucide-react';

export function ToolDetailView({
  tool,
  onLaunchSimulator,
  onLaunchQuiz
}: {
  tool: ToolDefinition;
  onLaunchSimulator: () => void;
  onLaunchQuiz: () => void;
}) {
  const [activeSection, setActiveSection] = useState<'overview' | 'caseStudy' | 'implementation' | 'tips'>('overview');

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
              <span>{tool.category}</span>
              <span>·</span>
              <span>{tool.scope}</span>
              <span>·</span>
              <span>Horizon: {tool.horizon}</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{tool.name}</h2>
            <p className="text-sm font-medium text-slate-600 mt-1">{tool.tagline}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onLaunchSimulator}
              className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Launch Interactive Simulator
            </button>
            <button
              onClick={onLaunchQuiz}
              className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Take Quiz
            </button>
          </div>
        </div>

        {/* Quick Meta Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg">
            <span className="text-slate-500 text-2xs block uppercase font-bold tracking-wider">Difficulty</span>
            <span className="font-bold text-slate-900 mt-0.5 block">{tool.difficulty}</span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg">
            <span className="text-slate-500 text-2xs block uppercase font-bold tracking-wider">Time to First Result</span>
            <span className="font-bold text-slate-900 mt-0.5 block tabular-nums">{tool.timeToResult}</span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg">
            <span className="text-slate-500 text-2xs block uppercase font-bold tracking-wider">Data Needs</span>
            <span className="font-bold text-slate-900 mt-0.5 block">{tool.dataNeeds}</span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg">
            <span className="text-slate-500 text-2xs block uppercase font-bold tracking-wider">Origin</span>
            <span className="font-bold text-slate-900 mt-0.5 block truncate" title={tool.origin}>{tool.origin.split('(')[0]}</span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200 w-fit">
        <button
          onClick={() => setActiveSection('overview')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
            activeSection === 'overview' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          1. Overview & Mechanics
        </button>
        <button
          onClick={() => setActiveSection('caseStudy')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
            activeSection === 'caseStudy' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          2. Case Study: {tool.caseStudy.company}
        </button>
        <button
          onClick={() => setActiveSection('implementation')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
            activeSection === 'implementation' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          3. Implementation & 30-60-90
        </button>
        <button
          onClick={() => setActiveSection('tips')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
            activeSection === 'tips' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          4. Pro Tips & Checklist
        </button>
      </div>

      {/* Tab 1: Overview & Mechanics */}
      {activeSection === 'overview' && (
        <div className="space-y-6">
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Core Purpose & How It Works</h4>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">{tool.corePurpose}</p>
            <div className="p-3.5 bg-slate-50 border border-slate-200/90 rounded-lg text-xs text-slate-800 leading-relaxed">
              {tool.howItWorks}
            </div>
          </div>

          {/* Core Concepts */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Foundational Concepts & Principles</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tool.coreConcepts.map((c, i) => (
                <div key={i} className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-lg space-y-1">
                  <h5 className="text-xs font-bold text-slate-900">{c.term}</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">{c.definition}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Workflow Placement */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Workflow Chain Integration</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <span className="font-bold text-slate-500 uppercase tracking-wider text-2xs block">Upstream (Inputs)</span>
                <p className="text-slate-800">{tool.workflowPlacement.upstream}</p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <span className="font-bold text-slate-500 uppercase tracking-wider text-2xs block">Downstream (Outputs Feed Into)</span>
                <p className="text-slate-800">{tool.workflowPlacement.downstream}</p>
              </div>
            </div>
          </div>

          {/* Use Cases Grid */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Field Scenarios & Applications</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tool.useCases.map((uc, i) => (
                <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                  <h5 className="font-bold text-slate-900">{uc.title}</h5>
                  <p className="text-slate-600"><span className="font-semibold text-slate-800">Situation / Problem:</span> {uc.problem || uc.situation}</p>
                  <p className="text-slate-600"><span className="font-semibold text-slate-800">Method / Action:</span> {uc.howItHelps || uc.action}</p>
                  <p className="text-emerald-800 font-medium pt-1 border-t border-slate-200/60"><span className="font-bold">Outcome:</span> {uc.outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Case Study */}
      {activeSection === 'caseStudy' && (
        <div className="space-y-6">
          <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-5">
            <div className="pb-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-2xs font-bold text-slate-500 uppercase tracking-wider">Company Profile</span>
                <h3 className="text-xl font-bold text-slate-900">{tool.caseStudy.company}</h3>
                <p className="text-xs text-slate-600">{tool.caseStudy.profile}</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-900 block tabular-nums">Revenue: {tool.caseStudy.revenue}</span>
                <span className="text-2xs text-slate-500">{tool.caseStudy.staff}</span>
              </div>
            </div>

            {/* Challenge & Why Chosen */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl space-y-1">
                <span className="font-bold text-amber-900 uppercase tracking-wide text-2xs block">Strategic Challenge</span>
                <p className="text-slate-800 leading-relaxed">{tool.caseStudy.challenge}</p>
              </div>
              <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-xl space-y-1">
                <span className="font-bold text-blue-900 uppercase tracking-wide text-2xs block">Why {tool.shortName} Was Chosen</span>
                <p className="text-slate-800 leading-relaxed">{tool.caseStudy.whyChosen}</p>
              </div>
            </div>

            {/* Implementation Steps */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Implementation Steps Executed</h4>
              <div className="space-y-2">
                {tool.caseStudy.steps.map((st, i) => (
                  <div key={i} className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg flex items-start gap-2.5 text-xs text-slate-800">
                    <span className="font-mono font-bold text-slate-500 shrink-0">{i + 1}.</span>
                    <span>{st}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Measurable Results */}
            <div className="p-5 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-3">
              <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                Measurable Results & Outcomes Achieved
              </h4>
              <div className="space-y-2">
                {tool.caseStudy.results.map((res, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span className="font-medium">{res}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Lessons Learned */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wide block">Key Strategic Lessons Learned</span>
              <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-700">
                {tool.caseStudy.lessonsLearned.map((l, i) => (
                  <li key={i}>{l}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Implementation & 30-60-90 Plan */}
      {activeSection === 'implementation' && (
        <div className="space-y-6">
          {/* 30-60-90 Plan */}
          <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
            <div className="pb-2 border-b border-slate-100">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">30-60-90 Day Adoption Roadmap</h4>
              <p className="text-xs text-slate-500">Pragmatic timeline to institute this framework inside your organization.</p>
            </div>

            {tool.implementationGuide?.plan306090 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                  <span className="px-2 py-0.5 text-2xs font-bold bg-slate-900 text-white rounded">DAYS 1–30</span>
                  <p className="text-slate-800 leading-relaxed">{tool.implementationGuide.plan306090.d30}</p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                  <span className="px-2 py-0.5 text-2xs font-bold bg-blue-700 text-white rounded">DAYS 31–60</span>
                  <p className="text-slate-800 leading-relaxed">{tool.implementationGuide.plan306090.d60}</p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                  <span className="px-2 py-0.5 text-2xs font-bold bg-emerald-700 text-white rounded">DAYS 61–90</span>
                  <p className="text-slate-800 leading-relaxed">{tool.implementationGuide.plan306090.d90}</p>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-slate-50 rounded-lg text-xs text-slate-500">
                Quarterly rollout: Audit current state in Days 1–30, launch initial pilots in Days 31–60, review metrics & scale in Days 61–90.
              </div>
            )}
          </div>

          {/* Common Mistakes & Fixes */}
          {tool.implementationGuide?.commonMistakes && (
            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Common Failure Modes & Corrective Fixes</h4>
              <div className="space-y-3">
                {tool.implementationGuide.commonMistakes.map((cm, i) => (
                  <div key={i} className="p-3.5 bg-rose-50/40 border border-rose-200/90 rounded-lg text-xs space-y-1">
                    <span className="font-bold text-rose-900 block">Mistake: {cm.mistake}</span>
                    <span className="font-medium text-emerald-800 block">Corrective Practice: {cm.fix}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Pro Tips & Checklist */}
      {activeSection === 'tips' && (
        <div className="space-y-6">
          {/* Checklist */}
          {tool.implementationGuide?.checklist && (
            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Configuration Pre-Flight Checklist</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {tool.implementationGuide.checklist.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Reference Card */}
          {tool.quickReferenceCard && (
            <div className="p-5 bg-slate-900 text-white rounded-xl shadow-xs space-y-3">
              <span className="text-2xs font-bold uppercase tracking-wider text-slate-400">Quick Reference Card</span>
              <ul className="space-y-2 text-xs text-slate-300">
                {tool.quickReferenceCard.map((qrc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">▪</span>
                    <span>{qrc}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Reflection Prompts */}
          {tool.reflectionPrompts && (
            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Executive Reflection Prompts</h4>
              <div className="space-y-2">
                {tool.reflectionPrompts.map((rp, i) => (
                  <div key={i} className="p-3 bg-blue-50/50 border border-blue-200 rounded-lg text-xs text-blue-900 font-medium">
                    {i + 1}. {rp}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
