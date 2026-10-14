import { useState } from 'react';
import { Layers, RotateCcw, Sparkles, ArrowRight, ShieldCheck, Cpu, Users, CheckCircle2, AlertOctagon, TrendingDown } from 'lucide-react';

interface BprStep {
  id: string;
  department: string;
  asIsTask: string;
  toBeTask: string;
  eliminatedInToBe: boolean;
  technologyLever: string;
}

export function BPRSimulator() {
  const [viewState, setViewState] = useState<'comparison' | 'principles' | 'change'>('comparison');

  const [steps, setSteps] = useState<BprStep[]>([
    {
      id: 'step-1',
      department: 'Field Sales',
      asIsTask: 'Sales rep writes paper order memo at retailer shop; holds until Friday to courier in batch to head office.',
      toBeTask: 'Sales rep enters order directly in mobile app with instant inventory check and GPS timestamp.',
      eliminatedInToBe: false,
      technologyLever: 'Mobile Tablet App & Real-Time ERP API'
    },
    {
      id: 'step-2',
      department: 'Data Entry',
      asIsTask: 'Clerk manually transcribes paper order into legacy accounting system; 6% typo rate.',
      toBeTask: 'Eliminated entirely. Order captured once at source by customer/rep.',
      eliminatedInToBe: true,
      technologyLever: 'Direct Source Capture (Hammer Principle 7)'
    },
    {
      id: 'step-3',
      department: 'Credit Control',
      asIsTask: 'Credit manager manually pulls outstanding ledger, calls bank for check clearance status, signs paper memo.',
      toBeTask: 'Automated credit limit evaluation rules engine; orders under pre-approved limit pass instantly.',
      eliminatedInToBe: false,
      technologyLever: 'Rule-Based Decision Engine & Digital Ledger'
    },
    {
      id: 'step-4',
      department: 'Zonal Manager',
      asIsTask: 'Orders above ₹50,000 wait in physical in-tray for weekly zonal manager discretionary discount signature.',
      toBeTask: 'Eliminated. Dynamic pricing tiers embedded in sales app; field reps empowered with 3% margin discretion.',
      eliminatedInToBe: true,
      technologyLever: 'Decentralized Decision Authority (Hammer Principle 6)'
    },
    {
      id: 'step-5',
      department: 'Central Warehouse',
      asIsTask: 'Warehouse clerk prints 4-part carbon invoice, hands to picker; picker walks aisles searching for cartons.',
      toBeTask: 'Digital pick-list sent to warehouse forklift terminal with optimized aisle navigation.',
      eliminatedInToBe: false,
      technologyLever: 'Barcode Scanners & Dynamic Slotting'
    },
    {
      id: 'step-6',
      department: 'Billing & Invoicing',
      asIsTask: 'Invoicing department re-keys dispatch quantity and types GST e-way bill manually.',
      toBeTask: 'Auto-generated GST e-way bill via API upon pick completion.',
      eliminatedInToBe: true,
      technologyLever: 'Automated Government Portal Integration'
    },
    {
      id: 'step-7',
      department: 'Logistics & Dispatch',
      asIsTask: 'Truck loaded and waits for transport contractor paper manifest sign-off.',
      toBeTask: 'Digital manifest scanned via driver smartphone with OTP delivery confirmation.',
      eliminatedInToBe: false,
      technologyLever: 'Digital Proof of Delivery (e-POD)'
    }
  ]);

  const handleLoadSouthernAgriCase = () => {
    // Southern Agri Inputs preset
  };

  const handleReset = () => {
    // Reset
  };

  const asIsHandoffs = steps.length;
  const toBeHandoffs = steps.filter(s => !s.eliminatedInToBe).length;
  const eliminatedStepsCount = steps.filter(s => s.eliminatedInToBe).length;

  const asIsCycleDays = 21;
  const toBeCycleDays = 2;
  const cycleTimeCompressionPercent = Math.round(((asIsCycleDays - toBeCycleDays) / asIsCycleDays) * 100);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Operations & Process Framework #5</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Business Process Reengineering (BPR) Clean-Sheet Matrix</h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Obliterate obsolete legacy departmental handoffs. Redesign core workflows around customer outcomes rather than fragmented bureaucratic tasks.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleLoadSouthernAgriCase}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-300 rounded-lg transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Load Case Study: Southern Agri Inputs (Order-to-Cash)</span>
            </button>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-6 border-b border-slate-200">
          <button
            onClick={() => setViewState('comparison')}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors px-1 ${
              viewState === 'comparison'
                ? 'border-rose-600 text-rose-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            1. As-Is Legacy vs. To-Be Clean-Sheet Matrix
          </button>
          <button
            onClick={() => setViewState('principles')}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors px-1 ml-4 ${
              viewState === 'principles'
                ? 'border-rose-600 text-rose-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            2. Hammer's 7 Reengineering Principles
          </button>
          <button
            onClick={() => setViewState('change')}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors px-1 ml-4 ${
              viewState === 'change'
                ? 'border-rose-600 text-rose-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            3. Change Management & Redeployment
          </button>
        </div>
      </div>

      {/* Headline Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider block">Cycle Time Compression</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold font-mono text-rose-700">-{cycleTimeCompressionPercent}%</span>
            <span className="text-xs font-semibold text-slate-500">(21 Days → 2 Days)</span>
          </div>
          <span className="text-2xs text-slate-500 mt-1 block">From customer order placement to truck arrival</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider block">Departmental Hand-offs</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold font-mono text-slate-900">{toBeHandoffs}</span>
            <span className="text-xs font-semibold text-slate-500">Down from {asIsHandoffs} handoffs</span>
          </div>
          <span className="text-2xs text-emerald-600 mt-1 block font-semibold">{eliminatedStepsCount} non-value steps obliterated</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider block">Data Redundancy Rate</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold font-mono text-emerald-600">0%</span>
            <span className="text-xs font-semibold text-slate-500">Down from 6% re-entry errors</span>
          </div>
          <span className="text-2xs text-slate-500 mt-1 block">Information captured once directly at the source</span>
        </div>
      </div>

      {/* TAB 1: AS-IS VS TO-BE */}
      {viewState === 'comparison' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-base font-bold text-slate-900">Deconstruct & Obliterate: Step-by-Step Flow Redesign</h3>
              <p className="text-xs text-slate-500 mt-0.5">Compare legacy fragmented silo tasks against integrated digital workflow steps.</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-rose-50 text-rose-700 border border-rose-200">
              Clean-Sheet Reengineering
            </span>
          </div>

          <div className="space-y-3">
            {steps.map((st, i) => (
              <div
                key={st.id}
                className={`p-4 rounded-xl border transition-all ${
                  st.eliminatedInToBe
                    ? 'bg-red-50/40 border-red-200'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-900">{st.department}</span>
                  </div>
                  <div>
                    {st.eliminatedInToBe ? (
                      <span className="text-2xs font-bold px-2 py-0.5 rounded bg-red-100 text-red-800 uppercase font-mono">
                        Obliterated in Clean-Sheet
                      </span>
                    ) : (
                      <span className="text-2xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase font-mono">
                        Transformed & Streamlined
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                  <div className="space-y-1">
                    <span className="text-2xs font-bold text-slate-400 uppercase">Legacy As-Is Task:</span>
                    <p className="text-slate-700 bg-slate-50 p-2.5 rounded border border-slate-200 line-through decoration-red-500/60">
                      {st.asIsTask}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-2xs font-bold text-rose-600 uppercase">Reengineered To-Be Workflow:</span>
                    <p className={`p-2.5 rounded border ${
                      st.eliminatedInToBe
                        ? 'bg-red-100/50 border-red-200 text-red-900 font-semibold'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-950 font-medium'
                    }`}>
                      {st.toBeTask}
                    </p>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-2 text-2xs text-slate-500">
                  <Cpu className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span><strong>Discontinuous Technology Lever:</strong> {st.technologyLever}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: HAMMER'S 7 PRINCIPLES */}
      {viewState === 'principles' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-base font-bold text-slate-900">Michael Hammer's 7 Principles of Reengineering</h3>
              <p className="text-xs text-slate-500 mt-0.5">Foundational rules published in Harvard Business Review (1990) to prevent "paving the cowpath".</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-rose-50 text-rose-700 border border-rose-200">
              HBR Classic
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                num: 1,
                title: 'Organize around outcomes, not tasks',
                desc: 'Assign one Case Manager or integrated team responsible for the entire outcome (e.g. order delivery) rather than splitting into 7 specialized clerks.'
              },
              {
                num: 2,
                title: 'Have those who use output perform the process',
                desc: 'Let field reps and customers check stock and place orders directly without going through intermediate sales coordinators.'
              },
              {
                num: 3,
                title: 'Subsume info-processing into real work',
                desc: 'When warehouse staff pick a carton, barcode scanning should automatically create the e-way bill and update inventory simultaneously.'
              },
              {
                num: 4,
                title: 'Treat dispersed resources as centralized',
                desc: 'Use cloud databases so multiple regional depots share inventory visibility as if operating out of one central warehouse.'
              },
              {
                num: 5,
                title: 'Link parallel activities during the process',
                desc: 'Do not wait for order assembly to complete before initiating billing; run packaging, shipping booking, and credit validation concurrently.'
              },
              {
                num: 6,
                title: 'Put the decision point where work is performed',
                desc: 'Empower frontline workers with clear guidelines and automated decision support rather than routing routine requests up management hierarchies.'
              },
              {
                num: 7,
                title: 'Capture information once and at the source',
                desc: 'Never manually transcribe data from paper forms or emails into ERP software. Capture directly at the source via digital forms.'
              }
            ].map(p => (
              <div key={p.num} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-rose-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                    {p.num}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">{p.title}</h4>
                </div>
                <p className="text-xs text-slate-600 pl-8">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CHANGE MANAGEMENT */}
      {viewState === 'change' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-rose-600" />
                <span>The Human Side of BPR: Zero-Layoff Redeployment Strategy</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">How to eliminate 70% of bureaucratic tasks without creating toxic employee resistance.</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero-Layoff Pledge</span>
            </span>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-2">
            <strong className="block text-sm font-bold text-amber-900">Why Most Reengineering Programs Fail:</strong>
            <p>
              When employees suspect that automation and process reengineering are code words for headcount layoffs, they will actively sabotage the new system, hide crucial process edge cases, and insist that "our process is too complex to automate."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <span className="text-2xs font-bold text-slate-400 uppercase">Step 1: The Executive Guarantee</span>
              <h4 className="text-sm font-bold text-slate-900">Ironclad Job Security Pledge</h4>
              <p className="text-xs text-slate-600">
                Announce upfront that zero permanent employees will lose their employment due to process reengineering.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <span className="text-2xs font-bold text-rose-600 uppercase">Step 2: Upskilling & Transition</span>
              <h4 className="text-sm font-bold text-slate-900">High-Value Role Reassignment</h4>
              <p className="text-xs text-slate-600">
                Data-entry clerks transition into Customer Relationship Managers; invoice clerks become Supply Chain Coordinators.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <span className="text-2xs font-bold text-emerald-600 uppercase">Step 3: Growth Re-Investment</span>
              <h4 className="text-sm font-bold text-slate-900">Capacity Expansion</h4>
              <p className="text-xs text-slate-600">
                Redirected labor hours absorb 3x company sales growth without having to recruit external overhead.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
