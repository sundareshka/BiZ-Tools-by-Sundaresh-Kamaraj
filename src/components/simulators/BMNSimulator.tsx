import { useState } from 'react';
import { Sparkles, RotateCcw, CheckCircle2, AlertTriangle, ArrowRight, Layers, Compass, HelpCircle } from 'lucide-react';

interface MagicDimension {
  title: string;
  question: string;
  current: string;
  proposed: string;
  changed: boolean;
  notes: string;
}

interface PatternCard {
  id: string;
  name: string;
  category: 'Revenue' | 'Product-to-Service' | 'Digital' | 'Integration' | 'Circular';
  summary: string;
  classicExample: string;
  dindigulApplication: string;
}

const SAMPLE_PATTERNS: PatternCard[] = [
  {
    id: 'subscription',
    name: 'Subscription',
    category: 'Revenue',
    summary: 'Customers pay a recurring fee at regular intervals to access products or services instead of buying outright.',
    classicExample: 'Netflix, Spotify, Salesforce',
    dindigulApplication: 'Monthly smart-access subscription per warehouse door with continuous software security updates.'
  },
  {
    id: 'razor_blade',
    name: 'Razor and Blade',
    category: 'Revenue',
    summary: 'The basic product is sold cheap or at cost, while high-margin consumables or accessories generate long-term profit.',
    classicExample: 'Gillette, Nespresso, HP Printers',
    dindigulApplication: 'Base digital lock housing sold at competitive cost; encrypted digital credentials & RFID badges renewed periodically.'
  },
  {
    id: 'pay_per_use',
    name: 'Pay-per-Use',
    category: 'Revenue',
    summary: 'Customers are metered and pay strictly for the quantity or time of service consumed.',
    classicExample: 'AWS Cloud, Car2Go, Rolls-Royce Power-by-the-Hour',
    dindigulApplication: 'Fee per unlock authorization for temporary contractors and freight drop-offs.'
  },
  {
    id: 'lock_in',
    name: 'Lock-in',
    category: 'Product-to-Service',
    summary: 'Customers face high switching costs through proprietary technology, standards, or multi-year integration.',
    classicExample: 'Apple iOS ecosystem, Lego, Adobe Creative Cloud',
    dindigulApplication: 'Proprietary cryptographic mesh protocol connects with warehouse management ERPs.'
  },
  {
    id: 'rent_instead_of_buy',
    name: 'Rent Instead of Buy',
    category: 'Product-to-Service',
    summary: 'Customer leases the capital asset, removing upfront capex and shifting maintenance responsibility to supplier.',
    classicExample: 'Xerox copiers, Hilti fleet management',
    dindigulApplication: 'Turnkey industrial security lock fleet rented with 4-hour SLA on-site replacement.'
  },
  {
    id: 'direct_selling',
    name: 'Direct Selling',
    category: 'Integration',
    summary: 'Bypass intermediary distributors and wholesalers to sell straight to end customers.',
    classicExample: 'Dell Computers, Tesla, Warby Parker',
    dindigulApplication: 'Direct sales engineering team working directly with logistics parks and pharmaceutical cold chains.'
  },
  {
    id: 'open_source',
    name: 'Open Source / Open Business',
    category: 'Digital',
    summary: 'Core technology is made accessible to developer communities to accelerate ecosystem adoption.',
    classicExample: 'Red Hat Linux, Android, WordPress',
    dindigulApplication: 'Open API for warehouse robotics and conveyor controllers to trigger lock/unlock triggers.'
  },
  {
    id: 'orchestrator',
    name: 'Orchestrator',
    category: 'Integration',
    summary: 'The company coordinates the value chain, outsourcing low-margin fabrication while retaining core IP and customer relationship.',
    classicExample: 'Nike, Li & Fung, Apple',
    dindigulApplication: 'Dindigul master artisans focus on micro-machining and firmware; standard casting outsourced.'
  }
];

export function BMNSimulator() {
  const [activeTab, setActiveTab] = useState<'triangle' | 'patterns' | 'audit'>('triangle');
  const [selectedPatternFilter, setSelectedPatternFilter] = useState<string>('All');

  // Magic Triangle 4 dimensions state
  const [who, setWho] = useState<MagicDimension>({
    title: 'Who (Target Customer)',
    question: 'Who is the customer and which segments do we address?',
    current: 'Traditional hardware retailers & residential homeowners buying brass padlocks',
    proposed: 'B2B logistics hubs, pharmaceutical cold chains, and bonded warehouses needing audited access',
    changed: true,
    notes: 'Transition from B2C retail walk-ins to institutional security heads.'
  });

  const [what, setWhat] = useState<MagicDimension>({
    title: 'What (Value Proposition)',
    question: 'What do we offer to the customer? What customer problem do we solve?',
    current: 'Physical mechanical brass lock with two physical keys',
    proposed: 'Access-as-a-Service: tamper-proof IoT locks with cloud audit logs, remote revoking, and 99.99% uptime guarantee',
    changed: true,
    notes: 'Eliminates lost-key panic and enables real-time compliance logging.'
  });

  const [how, setHow] = useState<MagicDimension>({
    title: 'How (Value Chain)',
    question: 'How is the value proposition created and delivered? (Capabilities & Partners)',
    current: 'Traditional manual foundry casting and local distributor network',
    proposed: 'Embedded firmware R&D + cloud infrastructure on AWS + 24/7 technical dispatch team',
    changed: true,
    notes: 'Requires new software engineering capabilities alongside traditional metallurgy.'
  });

  const [valueWhy, setValueWhy] = useState<MagicDimension>({
    title: 'Why / Value (Profit Mechanism)',
    question: 'Why does the business model generate profit? How are costs structured and revenue earned?',
    current: 'One-time transaction margin per brass lock sold (~₹600 unit price, 18% gross margin)',
    proposed: 'Hybrid: hardware deposit + ₹1,499/month per access portal subscription + premium audit export add-ons',
    changed: true,
    notes: 'Recurring SaaS-like revenue with >65% gross margins over 3-year contract life.'
  });

  const [selectedPatterns, setSelectedPatterns] = useState<string[]>(['subscription', 'rent_instead_of_buy']);

  // Reset to traditional model
  const handleResetToBaseline = () => {
    setWho({
      title: 'Who (Target Customer)',
      question: 'Who is the customer and which segments do we address?',
      current: 'Traditional retail hardware stores & general consumers',
      proposed: 'Traditional retail hardware stores & general consumers',
      changed: false,
      notes: ''
    });
    setWhat({
      title: 'What (Value Proposition)',
      question: 'What do we offer to the customer? What customer problem do we solve?',
      current: 'Heavy brass lever padlocks',
      proposed: 'Heavy brass lever padlocks with extra chrome finish',
      changed: false,
      notes: ''
    });
    setHow({
      title: 'How (Value Chain)',
      question: 'How is the value proposition created and delivered?',
      current: 'Manual foundry casting and dealer distribution',
      proposed: 'Manual foundry casting with slightly improved stamping machines',
      changed: false,
      notes: ''
    });
    setValueWhy({
      title: 'Why / Value (Profit Mechanism)',
      question: 'Why does the business model generate profit?',
      current: 'One-time wholesale sales with 15% trade discount',
      proposed: 'One-time wholesale sales with 12% trade discount',
      changed: false,
      notes: ''
    });
    setSelectedPatterns([]);
  };

  // Load Dindigul Lock Works transformation
  const handleLoadDindigulCase = () => {
    setWho({
      title: 'Who (Target Customer)',
      question: 'Who is the customer and which segments do we address?',
      current: 'Traditional hardware retailers & residential homeowners',
      proposed: 'B2B logistics hubs, pharmaceutical cold chains, and bonded warehouses',
      changed: true,
      notes: 'Shift from unmonitored retail buyers to enterprise facilities managers.'
    });
    setWhat({
      title: 'What (Value Proposition)',
      question: 'What do we offer to the customer? What customer problem do we solve?',
      current: 'Mechanical brass padlock with 2 physical cut keys',
      proposed: 'Access-as-a-Service: IoT smart locking with verifiable tamper alerts & instant remote revoke',
      changed: true,
      notes: 'Turns physical security into compliance and liability risk mitigation.'
    });
    setHow({
      title: 'How (Value Chain)',
      question: 'How is the value proposition created and delivered?',
      current: 'Manual metal sand-casting and multi-tier wholesale dealers',
      proposed: 'Firmware development team + cloud server hosting + direct enterprise deployment engineers',
      changed: true,
      notes: 'Combines heritage Dindigul mechanical strength with modern encrypted telemetry.'
    });
    setValueWhy({
      title: 'Why / Value (Profit Mechanism)',
      question: 'Why does the business model generate profit?',
      current: 'One-time unit sale (₹650) subject to price erosion from imported zinc locks',
      proposed: 'Recurring monthly subscription (₹1,499/door) with hardware replacement included',
      changed: true,
      notes: 'High recurring revenue predictability and insulated from commodity scrap metal fluctuations.'
    });
    setSelectedPatterns(['subscription', 'rent_instead_of_buy', 'lock_in']);
  };

  const dimensionsChangedCount = [who.changed, what.changed, how.changed, valueWhy.changed].filter(Boolean).length;
  const isGenuineInnovation = dimensionsChangedCount >= 2;

  const filteredPatterns = selectedPatternFilter === 'All'
    ? SAMPLE_PATTERNS
    : SAMPLE_PATTERNS.filter(p => p.category === selectedPatternFilter);

  const togglePatternSelection = (id: string) => {
    if (selectedPatterns.includes(id)) {
      setSelectedPatterns(selectedPatterns.filter(p => p !== id));
    } else {
      setSelectedPatterns([...selectedPatterns, id]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Controls */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
              <Compass className="w-3.5 h-3.5" /> St. Gallen Framework (Gassmann et al.)
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Business Model Navigator & Magic Triangle Simulator
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-3xl">
              Model the 4 core dimensions (Who, What, How, Why) and apply proven business model patterns.
              Rule: <strong className="text-slate-800">At least 2 dimensions must change</strong> to constitute true Business Model Innovation.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleLoadDindigulCase}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" /> Load Dindigul Lock Works Case
            </button>
            <button
              onClick={handleResetToBaseline}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </div>

        {/* Real-Time St. Gallen Innovation Test Banner */}
        <div className={`mt-5 p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
          isGenuineInnovation
            ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
            : 'bg-amber-50/80 border-amber-200 text-amber-950'
        }`}>
          <div className="flex items-start gap-3">
            {isGenuineInnovation ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div>
              <div className="text-sm font-bold flex items-center gap-2">
                <span>Innovation Threshold: {dimensionsChangedCount} / 4 Dimensions Re-architected</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                  isGenuineInnovation ? 'bg-emerald-200 text-emerald-800' : 'bg-amber-200 text-amber-800'
                }`}>
                  {isGenuineInnovation ? 'GENUINE BUSINESS MODEL INNOVATION' : 'INCREMENTAL / PRODUCT-ONLY TWEAK'}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                {isGenuineInnovation
                  ? 'Strong strategic reinvention! By redefining 2 or more dimensions of the Magic Triangle, you escape standard commoditization.'
                  : 'Warning: Changing only 1 dimension (e.g. just a product update or minor price tweak) can easily be matched by incumbents. Aim for at least 2 dimensions.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium">
            <span className={who.changed ? 'text-emerald-700 font-bold' : 'text-slate-400'}>Who</span> ·
            <span className={what.changed ? 'text-emerald-700 font-bold' : 'text-slate-400'}>What</span> ·
            <span className={how.changed ? 'text-emerald-700 font-bold' : 'text-slate-400'}>How</span> ·
            <span className={valueWhy.changed ? 'text-emerald-700 font-bold' : 'text-slate-400'}>Why (Value)</span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-slate-200 mt-6 pt-1">
          <button
            onClick={() => setActiveTab('triangle')}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'triangle'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            1. Magic Triangle Dimensions
          </button>
          <button
            onClick={() => setActiveTab('patterns')}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'patterns'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            2. Pattern Cards & Confrontation Matrix
            {selectedPatterns.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-800 font-bold">
                {selectedPatterns.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'audit'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            3. Consistency & Implementation Plan
          </button>
        </div>
      </div>

      {/* Tab 1: The Magic Triangle 4 Dimensions */}
      {activeTab === 'triangle' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Dimension 1: WHO */}
          <div className={`bg-white rounded-xl border p-5 transition-shadow shadow-sm ${
            who.changed ? 'border-emerald-300 ring-1 ring-emerald-100' : 'border-slate-200'
          }`}>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Dimension 1</span>
                <h3 className="text-base font-bold text-slate-900">{who.title}</h3>
                <p className="text-xs text-slate-500">{who.question}</p>
              </div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={who.changed}
                  onChange={(e) => setWho({ ...who, changed: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                />
                <span>Changed?</span>
              </label>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-600 block mb-1">Current Baseline Segment:</label>
                <textarea
                  value={who.current}
                  onChange={(e) => setWho({ ...who, current: e.target.value })}
                  rows={2}
                  className="w-full p-2.5 rounded-lg border border-slate-200 text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="font-semibold text-emerald-800 block mb-1">Proposed / Reinvented Segment:</label>
                <textarea
                  value={who.proposed}
                  onChange={(e) => setWho({ ...who, proposed: e.target.value })}
                  rows={2}
                  className="w-full p-2.5 rounded-lg border border-emerald-300 bg-emerald-50/30 text-slate-900 text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-medium"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-500 block mb-1">Strategic Rationale & Target Profile:</label>
                <input
                  type="text"
                  value={who.notes}
                  onChange={(e) => setWho({ ...who, notes: e.target.value })}
                  placeholder="e.g. Unmet compliance needs in audited environments"
                  className="w-full p-2 rounded-lg border border-slate-200 text-slate-700 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Dimension 2: WHAT */}
          <div className={`bg-white rounded-xl border p-5 transition-shadow shadow-sm ${
            what.changed ? 'border-emerald-300 ring-1 ring-emerald-100' : 'border-slate-200'
          }`}>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Dimension 2</span>
                <h3 className="text-base font-bold text-slate-900">{what.title}</h3>
                <p className="text-xs text-slate-500">{what.question}</p>
              </div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={what.changed}
                  onChange={(e) => setWhat({ ...what, changed: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                />
                <span>Changed?</span>
              </label>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-600 block mb-1">Current Baseline Offering:</label>
                <textarea
                  value={what.current}
                  onChange={(e) => setWhat({ ...what, current: e.target.value })}
                  rows={2}
                  className="w-full p-2.5 rounded-lg border border-slate-200 text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="font-semibold text-emerald-800 block mb-1">Proposed Value Proposition:</label>
                <textarea
                  value={what.proposed}
                  onChange={(e) => setWhat({ ...what, proposed: e.target.value })}
                  rows={2}
                  className="w-full p-2.5 rounded-lg border border-emerald-300 bg-emerald-50/30 text-slate-900 text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-medium"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-500 block mb-1">Customer Problem Solved:</label>
                <input
                  type="text"
                  value={what.notes}
                  onChange={(e) => setWhat({ ...what, notes: e.target.value })}
                  placeholder="e.g. Real-time access control without risk of lost master keys"
                  className="w-full p-2 rounded-lg border border-slate-200 text-slate-700 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Dimension 3: HOW */}
          <div className={`bg-white rounded-xl border p-5 transition-shadow shadow-sm ${
            how.changed ? 'border-emerald-300 ring-1 ring-emerald-100' : 'border-slate-200'
          }`}>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Dimension 3</span>
                <h3 className="text-base font-bold text-slate-900">{how.title}</h3>
                <p className="text-xs text-slate-500">{how.question}</p>
              </div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={how.changed}
                  onChange={(e) => setHow({ ...how, changed: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                />
                <span>Changed?</span>
              </label>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-600 block mb-1">Current Value Delivery / Capabilities:</label>
                <textarea
                  value={how.current}
                  onChange={(e) => setHow({ ...how, current: e.target.value })}
                  rows={2}
                  className="w-full p-2.5 rounded-lg border border-slate-200 text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="font-semibold text-emerald-800 block mb-1">Proposed Value Chain & Key Partners:</label>
                <textarea
                  value={how.proposed}
                  onChange={(e) => setHow({ ...how, proposed: e.target.value })}
                  rows={2}
                  className="w-full p-2.5 rounded-lg border border-emerald-300 bg-emerald-50/30 text-slate-900 text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-medium"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-500 block mb-1">Core Capability Gap to Bridge:</label>
                <input
                  type="text"
                  value={how.notes}
                  onChange={(e) => setHow({ ...how, notes: e.target.value })}
                  placeholder="e.g. Cloud API engineering, cellular IoT gateway integration"
                  className="w-full p-2 rounded-lg border border-slate-200 text-slate-700 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Dimension 4: WHY / VALUE */}
          <div className={`bg-white rounded-xl border p-5 transition-shadow shadow-sm ${
            valueWhy.changed ? 'border-emerald-300 ring-1 ring-emerald-100' : 'border-slate-200'
          }`}>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Dimension 4</span>
                <h3 className="text-base font-bold text-slate-900">{valueWhy.title}</h3>
                <p className="text-xs text-slate-500">{valueWhy.question}</p>
              </div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={valueWhy.changed}
                  onChange={(e) => setValueWhy({ ...valueWhy, changed: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                />
                <span>Changed?</span>
              </label>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-600 block mb-1">Current Revenue & Cost Mechanics:</label>
                <textarea
                  value={valueWhy.current}
                  onChange={(e) => setValueWhy({ ...valueWhy, current: e.target.value })}
                  rows={2}
                  className="w-full p-2.5 rounded-lg border border-slate-200 text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="font-semibold text-emerald-800 block mb-1">Proposed Profit Mechanism:</label>
                <textarea
                  value={valueWhy.proposed}
                  onChange={(e) => setValueWhy({ ...valueWhy, proposed: e.target.value })}
                  rows={2}
                  className="w-full p-2.5 rounded-lg border border-emerald-300 bg-emerald-50/30 text-slate-900 text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-medium"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-500 block mb-1">Financial Advantage / Margin Impact:</label>
                <input
                  type="text"
                  value={valueWhy.notes}
                  onChange={(e) => setValueWhy({ ...valueWhy, notes: e.target.value })}
                  placeholder="e.g. Higher recurring customer lifetime value (LTV)"
                  className="w-full p-2 rounded-lg border border-slate-200 text-slate-700 text-xs"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Pattern Cards & Confrontation */}
      {activeTab === 'patterns' && (
        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Select and Test Patterns from the 55 St. Gallen Catalog
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Gassmann et al. proved that over 90% of business model innovations are recombinations of known patterns.
                </p>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {['All', 'Revenue', 'Product-to-Service', 'Digital', 'Integration'].map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedPatternFilter(category)}
                    className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-colors ${
                      selectedPatternFilter === category
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPatterns.map(pattern => {
              const isSelected = selectedPatterns.includes(pattern.id);
              return (
                <div
                  key={pattern.id}
                  onClick={() => togglePatternSelection(pattern.id)}
                  className={`bg-white rounded-xl border p-4 cursor-pointer transition-all hover:shadow-md ${
                    isSelected
                      ? 'border-emerald-500 ring-2 ring-emerald-100 bg-emerald-50/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {pattern.category}
                    </span>
                    <div className={`w-4 h-4 rounded border flex items-center justify-center text-xs ${
                      isSelected ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300'
                    }`}>
                      {isSelected && '✓'}
                    </div>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 mb-1">{pattern.name}</h4>
                  <p className="text-xs text-slate-600 mb-3 leading-relaxed">{pattern.summary}</p>

                  <div className="space-y-1.5 text-[11px] pt-2 border-t border-slate-100">
                    <div className="text-slate-500">
                      <strong className="text-slate-700">Pioneered by:</strong> {pattern.classicExample}
                    </div>
                    <div className="text-emerald-800 bg-emerald-50/60 p-1.5 rounded border border-emerald-100">
                      <strong className="text-emerald-900">Application:</strong> {pattern.dindigulApplication}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Consistency & Implementation Audit */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Navigator 4-Corner Consistency Audit
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Phase 3 of the St. Gallen method requires verifying internal and external consistency before market prototyping.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-2">
                <Layers className="w-4 h-4 text-emerald-600" /> WHO ↔ WHAT Fit (Customer & Proposition)
              </div>
              <p className="text-xs text-slate-600 mb-2">
                Does the new value proposition directly address the core job, pain, and compliance needs of the target customer?
              </p>
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-700">
                <span className="font-semibold text-emerald-700">Audit:</span> {who.proposed.slice(0, 80)}... matches {what.proposed.slice(0, 80)}...
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-2">
                <Layers className="w-4 h-4 text-emerald-600" /> WHAT ↔ HOW Feasibility (Proposition & Capabilities)
              </div>
              <p className="text-xs text-slate-600 mb-2">
                Can the new value chain, internal capabilities, and strategic suppliers reliably deliver what is promised?
              </p>
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-700">
                <span className="font-semibold text-emerald-700">Audit:</span> Delivery via {how.proposed.slice(0, 100)}...
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-2">
                <Layers className="w-4 h-4 text-emerald-600" /> WHAT ↔ WHY Economics (Proposition & Profit Engine)
              </div>
              <p className="text-xs text-slate-600 mb-2">
                Are customers willing to pay for this value model, and does the pricing structure exceed the operating cost structure?
              </p>
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-700">
                <span className="font-semibold text-emerald-700">Audit:</span> Monetized through {valueWhy.proposed.slice(0, 100)}...
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-2">
                <Layers className="w-4 h-4 text-emerald-600" /> Active Applied Pattern Recombinations
              </div>
              <p className="text-xs text-slate-600 mb-2">
                Selected patterns from the 55-pattern matrix creating competitive defensibility:
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {selectedPatterns.length > 0 ? (
                  selectedPatterns.map(id => {
                    const p = SAMPLE_PATTERNS.find(x => x.id === id);
                    return (
                      <span key={id} className="px-2 py-1 rounded bg-emerald-100 text-emerald-800 font-semibold text-xs">
                        {p?.name || id}
                      </span>
                    );
                  })
                ) : (
                  <span className="text-xs text-slate-400 italic">No patterns selected yet. Select cards in Tab 2.</span>
                )}
              </div>
            </div>
          </div>

          {/* St. Gallen 4-Phase Next Steps Roadmap */}
          <div className="pt-4 border-t border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              St. Gallen 4-Step Implementation Roadmap
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <div className="font-bold text-slate-900 mb-1">1. Initiation</div>
                <p className="text-slate-600 text-[11px]">Map the baseline ecosystem, stakeholders, and pain points across all 4 dimensions.</p>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <div className="font-bold text-slate-900 mb-1">2. Ideation</div>
                <p className="text-slate-600 text-[11px]">Confront the business with 55 pattern cards. Force analogies from unrelated industries.</p>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <div className="font-bold text-slate-900 mb-1">3. Integration</div>
                <p className="text-slate-600 text-[11px]">Fit the 4 corners together. Resolve conflicting incentives and structural bottlenecks.</p>
              </div>
              <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50">
                <div className="font-bold text-emerald-900 mb-1">4. Implementation</div>
                <p className="text-emerald-800 text-[11px]">Run cheap, fast iterative market tests with real customers before full-scale roll-out.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
