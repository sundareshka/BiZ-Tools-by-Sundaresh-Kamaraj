import { useState } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, RotateCcw, Sliders, Users, ShieldAlert, ArrowRight, HelpCircle, Layers, Check } from 'lucide-react';

type RACIType = '' | 'R' | 'A' | 'C' | 'I' | 'S';

interface RACIRow {
  id: string;
  activity: string;
  category: string;
  assignments: Record<string, RACIType>;
}

const ROLES_PRESET_1 = [
  { id: 'founder', title: 'Founder / CEO' },
  { id: 'am', title: 'Account Manager' },
  { id: 'techLead', title: 'Delivery Tech Lead' },
  { id: 'qa', title: 'QA Analyst' },
  { id: 'client', title: 'Client Sponsor' }
];

const ROWS_PRESET_1: RACIRow[] = [
  {
    id: 'r1',
    activity: 'Client Scope & Commercial Contract',
    category: 'Commercial',
    assignments: { founder: 'A', am: 'R', techLead: 'C', qa: 'I', client: 'C' }
  },
  {
    id: 'r2',
    activity: 'Sprint Milestone Commitment & Planning',
    category: 'Delivery',
    assignments: { founder: 'I', am: 'C', techLead: 'A', qa: 'C', client: 'I' }
  },
  {
    id: 'r3',
    activity: 'Feature Development & Coding',
    category: 'Engineering',
    assignments: { founder: '', am: 'I', techLead: 'R', qa: 'C', client: '' }
  },
  {
    id: 'r4',
    activity: 'Quality Assurance & Staging Verification',
    category: 'Testing',
    assignments: { founder: '', am: 'I', techLead: 'C', qa: 'A', client: '' }
  },
  {
    id: 'r5',
    activity: 'Client Communication & Release Delivery',
    category: 'Client Facing',
    assignments: { founder: 'I', am: 'A', techLead: 'R', qa: 'C', client: 'I' }
  },
  {
    id: 'r6',
    activity: 'Severe Bug Escalation & Client Remedy',
    category: 'Escalations',
    assignments: { founder: 'I', am: 'A', techLead: 'R', qa: 'C', client: 'C' }
  }
];

export function RACISimulator() {
  const [variant, setVariant] = useState<'RACI' | 'RASCI' | 'DACI'>('RACI');
  const [roles, setRoles] = useState(ROLES_PRESET_1);
  const [rows, setRows] = useState<RACIRow[]>(ROWS_PRESET_1);

  const cycleCell = (rowId: string, roleId: string) => {
    setRows(prev => prev.map(row => {
      if (row.id !== rowId) return row;
      const current = row.assignments[roleId] || '';
      let next: RACIType = '';
      if (variant === 'RASCI') {
        if (current === '') next = 'R';
        else if (current === 'R') next = 'A';
        else if (current === 'A') next = 'S';
        else if (current === 'S') next = 'C';
        else if (current === 'C') next = 'I';
        else next = '';
      } else {
        if (current === '') next = 'R';
        else if (current === 'R') next = 'A';
        else if (current === 'A') next = 'C';
        else if (current === 'C') next = 'I';
        else next = '';
      }
      return {
        ...row,
        assignments: {
          ...row.assignments,
          [roleId]: next
        }
      };
    }));
  };

  // Row checks: exactly 1 A, at least 1 R
  const getRowStatus = (row: RACIRow) => {
    const values = Object.values(row.assignments);
    const aCount = values.filter(v => v === 'A').length;
    const rCount = values.filter(v => v === 'R').length;

    if (aCount === 0) return { valid: false, reason: 'Missing Accountable (A) owner' };
    if (aCount > 1) return { valid: false, reason: `Multiple As (${aCount}): diffuse ownership!` };
    if (rCount === 0) return { valid: false, reason: 'Missing Responsible (R) worker' };
    return { valid: true, reason: 'Compliant Governance' };
  };

  // Column checks: count As and Rs
  const getRoleMetrics = (roleId: string) => {
    let aCount = 0;
    let rCount = 0;
    let totalAssigned = 0;
    rows.forEach(r => {
      const val = r.assignments[roleId];
      if (val === 'A') aCount++;
      if (val === 'R') rCount++;
      if (val) totalAssigned++;
    });
    return { aCount, rCount, totalAssigned, isOverloaded: aCount >= Math.ceil(rows.length * 0.5) };
  };

  const handleResetToDefault = () => {
    setRows(ROWS_PRESET_1);
  };

  // Create a flawed demo matrix to demonstrate the diagnostic power
  const handleLoadFlawedDemo = () => {
    setRows([
      {
        id: 'r1',
        activity: 'Client Scope & Contract Signoff',
        category: 'Commercial',
        assignments: { founder: 'A', am: 'A', techLead: 'C', qa: '', client: 'C' } // 2 As!
      },
      {
        id: 'r2',
        activity: 'Sprint Milestone Commitment & Planning',
        category: 'Delivery',
        assignments: { founder: 'A', am: '', techLead: '', qa: '', client: '' } // 0 R!
      },
      {
        id: 'r3',
        activity: 'Code Deployment to Live Production',
        category: 'Engineering',
        assignments: { founder: 'A', am: 'I', techLead: 'R', qa: '', client: '' }
      },
      {
        id: 'r4',
        activity: 'Client Invoicing & Payment Collection',
        category: 'Finance',
        assignments: { founder: 'A', am: 'C', techLead: '', qa: '', client: 'I' } // 0 R!
      },
      {
        id: 'r5',
        activity: 'Post-Mortem Root Cause Investigation',
        category: 'Governance',
        assignments: { founder: '', am: 'R', techLead: 'R', qa: 'R', client: '' } // 0 A!
      }
    ]);
  };

  const totalErrors = rows.filter(r => !getRowStatus(r).valid).length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 mb-1">
              <Users className="w-3.5 h-3.5" />
              <span>Pillar 7: HR & Organizational Governance</span>
              <span>·</span>
              <span>Responsibility Assignment Matrix</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Interactive RACI Governance Matrix
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Enforce the Golden Rule: <span className="font-semibold text-slate-700">Exactly one Accountable (A) per activity</span>. Audit row compliance and column workload bottlenecks.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLoadFlawedDemo}
              className="px-3 py-1.5 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <AlertTriangle className="w-3 h-3 text-amber-600" />
              Load Flawed Matrix
            </button>
            <button
              onClick={handleResetToDefault}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>
        </div>

        {/* Matrix Health Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
            <span className="text-2xs uppercase tracking-wider font-bold text-slate-400 block">Governance Status</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={`text-xl font-extrabold font-mono ${
                totalErrors === 0 ? 'text-emerald-600' : 'text-rose-600'
              }`}>
                {totalErrors === 0 ? '100% Valid' : `${totalErrors} Violations`}
              </span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
            <span className="text-2xs uppercase tracking-wider font-bold text-slate-400 block">Active Framework</span>
            <div className="flex items-center gap-2 mt-1">
              {(['RACI', 'RASCI', 'DACI'] as const).map(v => (
                <button
                  key={v}
                  onClick={() => setVariant(v)}
                  className={`px-2 py-0.5 rounded text-xs font-bold transition-all ${
                    variant === v ? 'bg-indigo-900 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
            <span className="text-2xs uppercase tracking-wider font-bold text-slate-400 block">The Golden Rule</span>
            <span className="text-xs font-bold text-slate-800 mt-1 block">
              1 Accountable (A) / Row
            </span>
            <span className="text-3xs text-slate-500">If two own it, nobody owns it</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
            <span className="text-2xs uppercase tracking-wider font-bold text-slate-400 block">Legend & Instructions</span>
            <div className="flex items-center gap-1.5 mt-1 text-2xs font-bold">
              <span className="px-1.5 py-0.2 bg-blue-100 text-blue-800 rounded">R</span>
              <span className="px-1.5 py-0.2 bg-rose-100 text-rose-800 rounded">A</span>
              {variant === 'RASCI' && <span className="px-1.5 py-0.2 bg-purple-100 text-purple-800 rounded">S</span>}
              <span className="px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded">C</span>
              <span className="px-1.5 py-0.2 bg-slate-200 text-slate-700 rounded">I</span>
              <span className="text-slate-400 font-normal ml-1">Click cell to cycle</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Matrix Table */}
      <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b-2 border-slate-200 bg-slate-50">
              <th className="p-3 text-xs font-bold text-slate-700 uppercase tracking-wider w-64">
                Activity / Decision Deliverable
              </th>
              {roles.map(role => {
                const metrics = getRoleMetrics(role.id);
                return (
                  <th key={role.id} className="p-3 text-center border-l border-slate-200">
                    <div className="text-xs font-bold text-slate-900">{role.title}</div>
                    <div className="flex items-center justify-center gap-2 text-3xs font-mono text-slate-500 mt-1">
                      <span title="Accountabilities owned" className={`font-bold ${metrics.isOverloaded ? 'text-rose-600 bg-rose-50 px-1 rounded' : ''}`}>
                        {metrics.aCount} As
                      </span>
                      <span>·</span>
                      <span title="Tasks executed">{metrics.rCount} Rs</span>
                    </div>
                  </th>
                );
              })}
              <th className="p-3 text-center border-l border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-wider w-40">
                Row Check
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {rows.map((row) => {
              const status = getRowStatus(row);

              return (
                <tr key={row.id} className={`hover:bg-slate-50/80 transition-colors ${!status.valid ? 'bg-rose-50/20' : ''}`}>
                  <td className="p-3">
                    <span className="font-semibold text-slate-900 block">{row.activity}</span>
                    <span className="text-2xs text-slate-400 font-mono">{row.category}</span>
                  </td>

                  {roles.map(role => {
                    const val = row.assignments[role.id] || '';

                    return (
                      <td key={role.id} className="p-2 text-center border-l border-slate-100">
                        <button
                          onClick={() => cycleCell(row.id, role.id)}
                          className={`w-9 h-9 rounded-lg font-extrabold text-sm transition-all flex items-center justify-center mx-auto border ${
                            val === 'A'
                              ? 'bg-rose-600 text-white border-rose-700 shadow-xs'
                              : val === 'R'
                              ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                              : val === 'S'
                              ? 'bg-purple-600 text-white border-purple-700 shadow-xs'
                              : val === 'C'
                              ? 'bg-amber-100 text-amber-900 border-amber-300'
                              : val === 'I'
                              ? 'bg-slate-100 text-slate-700 border-slate-300'
                              : 'bg-slate-50/50 text-slate-300 border-dashed border-slate-200 hover:border-slate-400 hover:text-slate-500'
                          }`}
                        >
                          {val || '—'}
                        </button>
                      </td>
                    );
                  })}

                  <td className="p-3 border-l border-slate-100 text-center">
                    {status.valid ? (
                      <span className="inline-flex items-center gap-1 text-2xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        <Check className="w-3 h-3 text-emerald-600" />
                        Valid (1 A)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-2xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full" title={status.reason}>
                        <AlertCircle className="w-3 h-3 text-rose-600 shrink-0" />
                        <span className="truncate max-w-[110px]">{status.reason}</span>
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Governance & Diagnostic Column Warnings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-2">
          <h4 className="font-bold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-indigo-600" />
            Column Bottleneck Analysis
          </h4>
          <p className="text-slate-600 leading-relaxed">
            Examine the total Accountable (A) assignments per role. If a single founder or executive owns 50%+ of all As, they have become an operational bottleneck. Delegate As to empower functional managers.
          </p>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-2">
          <h4 className="font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            Consultation Paralysis (Too Many Cs)
          </h4>
          <p className="text-slate-600 leading-relaxed">
            Watch for rows with 3 or more "C" designations. Two-way consultation requires scheduled meetings and review delays. If a stakeholder does not actively change the outcome, downgrade them to "Informed" (I).
          </p>
        </div>
      </div>
    </div>
  );
}
