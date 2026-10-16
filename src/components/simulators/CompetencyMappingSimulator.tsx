import { useState } from 'react';
import { Layers, CheckCircle2, AlertTriangle, AlertCircle, RotateCcw, Sliders, ArrowRight, ShieldCheck, Users, Sparkles, Binary, Award, BookOpen } from 'lucide-react';

interface CompetencyItem {
  id: string;
  name: string;
  type: 'Technical' | 'Behavioural' | 'Leadership';
  required: number; // 1 to 5
  self: number;
  manager: number;
  agreed: number;
  action: string;
}

const INITIAL_COMPETENCIES: CompetencyItem[] = [
  { id: 'c1', name: 'Embedded C & Hardware Drivers', type: 'Technical', required: 4, self: 4, manager: 4, agreed: 4, action: 'Maintain & mentor associate engineers' },
  { id: 'c2', name: 'Real-Time Operating Systems (RTOS)', type: 'Technical', required: 3, self: 3, manager: 3, agreed: 3, action: 'Standard capability benchmark achieved' },
  { id: 'c3', name: 'IoT Cloud Architecture & Telemetry', type: 'Technical', required: 3, self: 3, manager: 2, agreed: 2, action: 'AWS IoT Core certification & lab exercises' },
  { id: 'c4', name: 'Cryptographic Secure Firmware', type: 'Technical', required: 3, self: 2, manager: 1, agreed: 1, action: 'Mandatory Secure Boot & Firmware Academy' },
  { id: 'c5', name: 'Structured Problem Solving', type: 'Behavioural', required: 4, self: 4, manager: 3, agreed: 3, action: 'Root-cause analysis (8D / 5-Why) workshop' },
  { id: 'c6', name: 'Client Technical Consulting', type: 'Behavioural', required: 3, self: 3, manager: 2, agreed: 2, action: 'Shadow lead architect on client status reviews' }
];

interface TeamEngineer {
  name: string;
  embeddedC: number;
  rtos: number;
  cloud: number;
  secureFirmware: number;
  clientComm: number;
}

const TEAM_HEAT_MAP: TeamEngineer[] = [
  { name: 'Engineer A (Senior)', embeddedC: 4, rtos: 3, cloud: 2, secureFirmware: 2, clientComm: 3 },
  { name: 'Engineer B (Mid-Level)', embeddedC: 3, rtos: 3, cloud: 4, secureFirmware: 3, clientComm: 2 },
  { name: 'Engineer C (Lead Architect)', embeddedC: 5, rtos: 4, cloud: 1, secureFirmware: 4, clientComm: 4 },
  { name: 'Engineer D (Associate)', embeddedC: 2, rtos: 2, cloud: 3, secureFirmware: 1, clientComm: 3 }
];

export function CompetencyMappingSimulator() {
  const [activeTab, setActiveTab] = useState<'iceberg' | 'gap' | 'heatmap'>('gap');
  const [competencies, setCompetencies] = useState<CompetencyItem[]>(INITIAL_COMPETENCIES);

  const handleAgreedChange = (id: string, newAgreed: number) => {
    setCompetencies(prev => prev.map(c => c.id === id ? { ...c, agreed: newAgreed } : c));
  };

  const handleReset = () => {
    setCompetencies(INITIAL_COMPETENCIES);
  };

  // Compute capability statistics
  const totalGaps = competencies.filter(c => c.agreed < c.required).length;
  const averageGap = (competencies.reduce((sum, c) => sum + (c.agreed - c.required), 0) / competencies.length).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>Pillar 7: HR & Organizational Diagnostics</span>
              <span>·</span>
              <span>Competency Mapping & Capability Modeling</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Competency Mapping & Team Heat Map Simulator
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Explore the Spencer & Spencer Iceberg Model, conduct multi-source gap analysis (Assessed − Required), and optimize project staffing via heat maps.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>
        </div>

        {/* Capability Metrics Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
            <span className="text-2xs uppercase tracking-wider font-bold text-slate-400 block">Total Skill Gaps</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`text-xl font-extrabold font-mono ${
                totalGaps === 0 ? 'text-emerald-600' : 'text-rose-600'
              }`}>
                {totalGaps} Deficits
              </span>
              <span className="text-3xs text-slate-500">Require training</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
            <span className="text-2xs uppercase tracking-wider font-bold text-slate-400 block">Net Average Gap</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`text-xl font-extrabold font-mono ${
                Number(averageGap) >= 0 ? 'text-emerald-600' : 'text-rose-600'
              }`}>
                {averageGap}
              </span>
              <span className="text-3xs text-slate-500">Levels vs standard</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
            <span className="text-2xs uppercase tracking-wider font-bold text-slate-400 block">Top Vulnerability</span>
            <span className="text-xs font-bold text-rose-700 mt-1 block truncate">
              Secure Firmware (−2 Gap)
            </span>
            <span className="text-3xs text-slate-500">Highest project risk</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
            <span className="text-2xs uppercase tracking-wider font-bold text-slate-400 block">Target Role</span>
            <span className="text-xs font-bold text-slate-800 mt-1 block">
              Senior Firmware Engineer
            </span>
            <span className="text-3xs text-slate-500">Engineering Level 3</span>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1.5 mt-5 p-1 bg-slate-100 rounded-lg w-fit border border-slate-200">
          <button
            onClick={() => setActiveTab('gap')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'gap' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            1. Individual Gap Report
          </button>
          <button
            onClick={() => setActiveTab('heatmap')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'heatmap' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2. Team Skills Heat Map
          </button>
          <button
            onClick={() => setActiveTab('iceberg')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'iceberg' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            3. Spencer Iceberg Architecture
          </button>
        </div>
      </div>

      {/* TAB 1: INDIVIDUAL GAP REPORT */}
      {activeTab === 'gap' && (
        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Multi-Source Competency Gap Analysis</h3>
              <p className="text-xs text-slate-500">
                Formula: <strong className="text-slate-700">Gap = Calibrated Agreed Level − Required Role Standard</strong>
              </p>
            </div>
            <span className="text-2xs font-semibold text-slate-500">Scale: 1 (Basic) to 5 (Expert)</span>
          </div>

          <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
            {competencies.map((c) => {
              const gap = c.agreed - c.required;

              return (
                <div key={c.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors">
                  <div className="space-y-1 max-w-md">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900">{c.name}</span>
                      <span className={`text-2xs font-mono px-1.5 py-0.2 rounded font-semibold ${
                        c.type === 'Technical' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-purple-50 text-purple-700 border border-purple-100'
                      }`}>
                        {c.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">
                      <span className="font-semibold text-slate-700">Development Action:</span> {c.action}
                    </p>
                    <div className="flex items-center gap-3 text-2xs text-slate-500 font-mono">
                      <span>Self-Rating: {c.self}</span>
                      <span>·</span>
                      <span>Manager Rating: {c.manager}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 shrink-0">
                    <div className="text-center">
                      <span className="text-2xs font-bold text-slate-400 block uppercase tracking-wider">Required</span>
                      <span className="font-mono font-bold text-sm text-slate-800">{c.required}</span>
                    </div>

                    <div className="space-y-1 text-center">
                      <span className="text-2xs font-bold text-indigo-700 block uppercase tracking-wider">Calibrated</span>
                      <select
                        value={c.agreed}
                        onChange={(e) => handleAgreedChange(c.id, Number(e.target.value))}
                        className="bg-white border border-indigo-300 text-xs font-bold text-indigo-950 rounded-lg px-2.5 py-1 focus:ring-2 focus:ring-indigo-600 outline-none cursor-pointer"
                      >
                        <option value="1">Level 1 (Basic)</option>
                        <option value="2">Level 2 (Developing)</option>
                        <option value="3">Level 3 (Proficient)</option>
                        <option value="4">Level 4 (Advanced)</option>
                        <option value="5">Level 5 (Expert)</option>
                      </select>
                    </div>

                    <div className="text-right w-16">
                      <span className="text-2xs font-bold text-slate-400 block uppercase tracking-wider">Gap</span>
                      <span className={`font-mono font-extrabold text-sm ${
                        gap < 0 ? 'text-rose-600' : gap === 0 ? 'text-slate-700' : 'text-emerald-600'
                      }`}>
                        {gap > 0 ? `+${gap}` : gap}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: TEAM SKILLS HEAT MAP */}
      {activeTab === 'heatmap' && (
        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Team Capability Heat Map (Target Benchmark: Level 3)</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Based on Nila Embedded Systems: project managers use heat maps to staff contracts and pair engineers for cross-training.
            </p>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
                  <th className="p-3">Engineer (Squad 1)</th>
                  <th className="p-3 text-center">Embedded C</th>
                  <th className="p-3 text-center">RTOS</th>
                  <th className="p-3 text-center">Cloud Integration</th>
                  <th className="p-3 text-center">Secure Firmware</th>
                  <th className="p-3 text-center">Client Consulting</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {TEAM_HEAT_MAP.map((eng) => (
                  <tr key={eng.name} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">{eng.name}</td>

                    <td className={`p-3 text-center font-mono font-bold ${
                      eng.embeddedC >= 3 ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-700'
                    }`}>
                      L{eng.embeddedC}
                    </td>

                    <td className={`p-3 text-center font-mono font-bold ${
                      eng.rtos >= 3 ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-700'
                    }`}>
                      L{eng.rtos}
                    </td>

                    <td className={`p-3 text-center font-mono font-bold ${
                      eng.cloud >= 3 ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-700'
                    }`}>
                      L{eng.cloud}
                    </td>

                    <td className={`p-3 text-center font-mono font-bold ${
                      eng.secureFirmware >= 3 ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-700'
                    }`}>
                      L{eng.secureFirmware}
                    </td>

                    <td className={`p-3 text-center font-mono font-bold ${
                      eng.clientComm >= 3 ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-700'
                    }`}>
                      L{eng.clientComm}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl space-y-2 text-xs">
            <span className="font-bold text-indigo-950 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-700" />
              Strategic Heat Map Insights & Pairing Recommendations
            </span>
            <p className="text-indigo-900 leading-relaxed">
              1) <strong>Pairing Recommendation:</strong> Pair <strong>Engineer D (Associate, Level 1 Secure Firmware)</strong> with <strong>Engineer C (Lead Architect, Level 4 Secure Firmware)</strong> for structured peer code reviews.
            </p>
            <p className="text-indigo-900 leading-relaxed">
              2) <strong>Project Staffing:</strong> For incoming European IoT bids, staff <strong>Engineer B (Level 4 Cloud)</strong> alongside <strong>Engineer C</strong> to ensure both cloud telemetry and secure firmware pass audit hurdles.
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: SPENCER ICEBERG ARCHITECTURE */}
      {activeTab === 'iceberg' && (
        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Lyle & Signe Spencer’s Iceberg Competency Model</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Why technical training fails to solve cultural issues: knowledge is above the waterline, while traits and motives are submerged.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Above Waterline */}
            <div className="p-5 bg-blue-50/60 border border-blue-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xs font-extrabold uppercase tracking-wider text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                  Above Waterline: Visible & Trainable
                </span>
                <span className="text-xs font-bold text-blue-900">Knowledge & Skills</span>
              </div>
              <p className="text-xs text-blue-950 leading-relaxed">
                Includes programming languages, financial accounting rules, clinical test procedures, and machine operation. Readily observable, measurable via practical tests, and easily built through classroom or lab training.
              </p>
              <div className="text-2xs font-semibold text-blue-800">
                Strategy: Close gaps through targeted academies, workshops, and SOP certifications.
              </div>
            </div>

            {/* Below Waterline */}
            <div className="p-5 bg-indigo-50/60 border border-indigo-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xs font-extrabold uppercase tracking-wider text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded">
                  Below Waterline: Hidden & Ingrained
                </span>
                <span className="text-xs font-bold text-indigo-900">Self-Concept, Traits & Motives</span>
              </div>
              <p className="text-xs text-indigo-950 leading-relaxed">
                Includes achievement drive, integrity, resilience under stress, curiosity, and interpersonal empathy. Extremely difficult and costly to change through corporate training alone.
              </p>
              <div className="text-2xs font-semibold text-indigo-800">
                Strategy: Screen for these attributes during hiring; use Behavioural Event Interviews (BEI).
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
