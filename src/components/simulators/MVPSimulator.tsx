import { useState, useMemo } from 'react';
import { Lightbulb, Rocket, Sliders, CheckCircle2, AlertTriangle, RotateCcw, ArrowRight, ShieldCheck, Flame, HelpCircle, Target, DollarSign, Users, Award, ExternalLink } from 'lucide-react';

interface MVPTypeConfig {
  id: string;
  name: string;
  tagline: string;
  description: string;
  bestWhen: string;
  recommendedStack: string[];
  example: string;
  effortWeeks: number;
}

const MVP_TYPES: MVPTypeConfig[] = [
  {
    id: 'smoke',
    name: 'Landing-Page (Smoke Test)',
    tagline: 'Test whether anyone wants this before building anything',
    description: 'A 1-page website explaining the value proposition with a "Buy Now" or "Pre-order" button to measure true click-through and deposit rates.',
    bestWhen: 'Validating market demand and positioning for a new product concept.',
    recommendedStack: ['Carrd / Framer', 'Google Forms / Typeform', 'Razorpay / Stripe Links', 'GA4 Analytics'],
    example: 'CodeThamizh bilingual landing page testing vernacular Scratch coding classes.',
    effortWeeks: 1
  },
  {
    id: 'concierge',
    name: 'Concierge MVP',
    tagline: 'Deliver the value manually and openly to a small cohort',
    description: 'You perform the service by hand for early adopters who know it is manual. Provides deep qualitative feedback and uncovers unit economics.',
    bestWhen: 'Learning complex user workflows and operational costs before coding automated logic.',
    recommendedStack: ['WhatsApp Business', 'Google Meet / Zoom', 'Google Sheets', 'Manual Invoicing'],
    example: 'Home tutor matching service where the founder interviews tutors and matches parents manually via WhatsApp.',
    effortWeeks: 2
  },
  {
    id: 'wizard',
    name: 'Wizard of Oz MVP',
    tagline: 'Front-end looks automated, human operators do the work behind the scenes',
    description: 'The user experiences a seamless automated interface, but background workers manually execute algorithms, searches, or AI summaries.',
    bestWhen: 'Testing whether users will trust and adopt an automated software workflow before engineering the backend.',
    recommendedStack: ['Form / Chat UI', 'Zapier / Webhooks', 'Human Operator Inbox', 'Email Dispatcher'],
    example: 'Zappos founder photographing local shoe store inventory and buying shoes manually when orders arrived online.',
    effortWeeks: 2
  },
  {
    id: 'single',
    name: 'Single-Feature MVP',
    tagline: 'One core capability executed with sheer excellence',
    description: 'A fully functional product stripped down to do exactly one single job well without extra settings, profiles, or bloat.',
    bestWhen: 'Testing whether one killer feature is sticky enough to retain customers on its own.',
    recommendedStack: ['React / Next.js', 'Vite / Tailwind', 'Supabase / Firebase', 'Vercel / Cloud Run'],
    example: 'Early Dropbox showing only a desktop folder that seamlessly synced files across two computers.',
    effortWeeks: 3
  },
  {
    id: 'presale',
    name: 'Pre-Sale / Crowdfunding MVP',
    tagline: 'Collect upfront payment or deposit before manufacturing or coding',
    description: 'Customers commit funds upfront with a promised delivery window. Filters casual curiosity from authentic economic demand.',
    bestWhen: 'Validating willingness to pay when the cost of production or development is high.',
    recommendedStack: ['Landing Page', 'Razorpay Pre-Auth / Stripe', 'Product Demo Video', 'Terms & Refund Policy'],
    example: 'Pebble Smartwatch raising $10M on Kickstarter with video prototypes before mass manufacturing.',
    effortWeeks: 2
  }
];

export function MVPSimulator() {
  const [selectedType, setSelectedType] = useState<string>('smoke');
  const [customerSegment, setCustomerSegment] = useState('Parents of school students (Classes 6-9) in Madurai');
  const [coreProblem, setCoreProblem] = useState('Want children to learn coding early, but only English-medium courses exist');
  const [proposedSolution, setProposedSolution] = useState('6-week weekend Tamil-language Scratch coding cohort');
  const [measurableAction, setMeasurableAction] = useState('Paying a ₹999 course fee upfront');
  const [metricThreshold, setMetricThreshold] = useState<number>(40);
  const [timeBoxWeeks, setTimeBoxWeeks] = useState<number>(4);
  const [budgetINR, setBudgetINR] = useState<number>(38000);

  // Funnel numbers
  const [adSpend, setAdSpend] = useState<number>(15000);
  const [adImpressions, setAdImpressions] = useState<number>(48000);
  const [landingVisitors, setLandingVisitors] = useState<number>(1850);
  const [leadsOrWaitlist, setLeadsOrWaitlist] = useState<number>(210);
  const [paidCustomers, setPaidCustomers] = useState<number>(52);
  const [pricePerUnit, setPricePerUnit] = useState<number>(999);

  const currentTypeConfig = MVP_TYPES.find(t => t.id === selectedType) || MVP_TYPES[0];

  // Funnel calculations
  const ctrAd = adImpressions > 0 ? (landingVisitors / adImpressions) * 100 : 0;
  const leadConvRate = landingVisitors > 0 ? (leadsOrWaitlist / landingVisitors) * 100 : 0;
  const paidConvFromVisitors = landingVisitors > 0 ? (paidCustomers / landingVisitors) * 100 : 0;
  const paidConvFromLeads = leadsOrWaitlist > 0 ? (paidCustomers / leadsOrWaitlist) * 100 : 0;
  const totalRevenue = paidCustomers * pricePerUnit;
  const cac = paidCustomers > 0 ? adSpend / paidCustomers : 0;
  const netSurplus = totalRevenue - budgetINR;

  // Decision outcome
  const isGoalMet = paidCustomers >= metricThreshold;
  const decisionStatus = useMemo(() => {
    if (paidCustomers >= metricThreshold * 1.2) {
      return {
        verdict: 'STRONG PERSEVERE & SCALE',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-300',
        advice: `Exceeded target by ${paidCustomers - metricThreshold} enrolments. Strong validation of willingness to pay. Move directly to User Story Mapping to scope Release 1!`
      };
    }
    if (paidCustomers >= metricThreshold) {
      return {
        verdict: 'PERSEVERE TO NEXT RISKY HYPOTHESIS',
        color: 'text-blue-700 bg-blue-50 border-blue-300',
        advice: `Threshold achieved (${paidCustomers} vs target ${metricThreshold}). Demand proven. Next MVP should test course completion, referral rate, and unit retention.`
      };
    }
    if (paidCustomers >= metricThreshold * 0.5) {
      return {
        verdict: 'STRUCTURED PIVOT REQUIRED',
        color: 'text-amber-700 bg-amber-50 border-amber-300',
        advice: `Moderate interest but fell short of viability threshold (${paidCustomers}/${metricThreshold}). Interview non-buyers: pivot on pricing, messaging, or target persona before writing code.`
      };
    }
    return {
      verdict: 'STOP / INVALIDATED',
      color: 'text-rose-700 bg-rose-50 border-rose-300',
      advice: `Severe demand shortfall (${paidCustomers}/${metricThreshold}). Do not commit software development funds. Stop to preserve capital, or conduct fundamental problem interviews.`
    };
  }, [paidCustomers, metricThreshold]);

  const loadCodeThamizhPreset = () => {
    setSelectedType('concierge');
    setCustomerSegment('Parents of Tamil-medium students (Classes 6-9) in Madurai & Dindigul');
    setCoreProblem('Parents want coding skills for kids, but existing courses are English-only and prohibitively expensive');
    setProposedSolution('Live weekend Scratch coding course taught in Tamil on Google Meet');
    setMeasurableAction('Paying ₹999 for 6-week live batch');
    setMetricThreshold(40);
    setTimeBoxWeeks(4);
    setBudgetINR(38000);
    setAdSpend(15000);
    setAdImpressions(48000);
    setLandingVisitors(1850);
    setLeadsOrWaitlist(210);
    setPaidCustomers(52);
    setPricePerUnit(999);
  };

  const loadRestaurantPreset = () => {
    setSelectedType('smoke');
    setCustomerSegment('Small restaurant and bakery owners in Coimbatore');
    setCoreProblem('Losing 15-25% gross margins to food aggregator delivery commissions');
    setProposedSolution('White-label WhatsApp direct ordering system with zero commission');
    setMeasurableAction('Paying a ₹1,500 setup deposit fee');
    setMetricThreshold(10);
    setTimeBoxWeeks(3);
    setBudgetINR(12000);
    setAdSpend(8000);
    setAdImpressions(25000);
    setLandingVisitors(1200);
    setLeadsOrWaitlist(96);
    setPaidCustomers(18);
    setPricePerUnit(1500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
              <span>Category 9: Product & Startup Tools</span>
              <span>·</span>
              <span>Eric Ries Lean Startup Engine</span>
              <span>·</span>
              <span>Build–Measure–Learn</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Rocket className="w-5 h-5 text-indigo-600" />
              Minimum Viable Product (MVP) & Validation Sandbox
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl">
              Replace opinions and expensive guesswork with empirical evidence. Design falsifiable hypotheses, select the right MVP archetype, simulate funnel conversions, and execute objective Persevere / Pivot / Stop decisions.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={loadCodeThamizhPreset}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
            >
              Load CodeThamizh Edtech
            </button>
            <button
              onClick={loadRestaurantPreset}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
            >
              Load Direct Ordering
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: MVP Archetype & Hypothesis Builder (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Archetype Selection */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-slate-500" />
                1. Select MVP Testing Archetype
              </h4>
              <span className="text-2xs font-semibold text-slate-400">Step 1 of 3</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {MVP_TYPES.map(type => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    selectedType === type.id
                      ? 'bg-indigo-900 text-white border-indigo-900 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="text-xs font-bold block leading-tight">{type.name}</span>
                  <span className={`text-3xs block mt-1 ${selectedType === type.id ? 'text-indigo-200' : 'text-slate-400'}`}>
                    ~{type.effortWeeks}w build
                  </span>
                </button>
              ))}
            </div>

            {/* Selected Archetype Deep Dive */}
            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">{currentTypeConfig.name}</span>
                <span className="text-2xs font-mono font-semibold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                  {currentTypeConfig.tagline}
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed">{currentTypeConfig.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-slate-200/60 text-2xs">
                <div>
                  <span className="font-bold text-slate-700 block">Best when:</span>
                  <span className="text-slate-500">{currentTypeConfig.bestWhen}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700 block">Typical Software Stack:</span>
                  <span className="text-indigo-700 font-mono">{currentTypeConfig.recommendedStack.join(' → ')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Falsifiable Hypothesis Template */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                2. Falsifiable Lean Hypothesis Formula
              </h4>
              <span className="text-2xs font-semibold text-slate-400">Step 2 of 3</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Target Customer Segment</label>
                <input
                  type="text"
                  value={customerSegment}
                  onChange={e => setCustomerSegment(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 text-xs text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Core Problem / Pain Point</label>
                  <input
                    type="text"
                    value={coreProblem}
                    onChange={e => setCoreProblem(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Proposed Minimum Solution</label>
                  <input
                    type="text"
                    value={proposedSolution}
                    onChange={e => setProposedSolution(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Measurable Behavior (Skin-in-the-Game)</label>
                <input
                  type="text"
                  value={measurableAction}
                  onChange={e => setMeasurableAction(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 text-xs text-slate-900"
                  placeholder="e.g. Paying ₹999 course fee upfront"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Threshold Target</label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      value={metricThreshold}
                      onChange={e => setMetricThreshold(Math.max(1, Number(e.target.value)))}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 font-mono text-xs text-slate-900"
                    />
                    <span className="text-2xs text-slate-500">paid</span>
                  </div>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Time Box</label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      value={timeBoxWeeks}
                      onChange={e => setTimeBoxWeeks(Math.max(1, Number(e.target.value)))}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 font-mono text-xs text-slate-900"
                    />
                    <span className="text-2xs text-slate-500">weeks</span>
                  </div>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Budget Cap (₹)</label>
                  <input
                    type="number"
                    value={budgetINR}
                    onChange={e => setBudgetINR(Math.max(0, Number(e.target.value)))}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 font-mono text-xs text-slate-900"
                  />
                </div>
              </div>

              {/* Generated Hypothesis Card */}
              <div className="p-3.5 bg-indigo-50/70 border border-indigo-200 rounded-lg text-xs space-y-1">
                <span className="text-2xs font-bold uppercase tracking-wider text-indigo-900 block">
                  Committed Hypothesis Statement
                </span>
                <p className="text-slate-800 leading-relaxed italic font-serif text-sm">
                  "We believe that <strong className="text-indigo-950 font-sans not-italic font-bold">{customerSegment}</strong> will <strong className="text-indigo-950 font-sans not-italic font-bold">{measurableAction}</strong> for our <strong className="text-indigo-950 font-sans not-italic font-bold">{proposedSolution}</strong> because they <strong className="text-indigo-950 font-sans not-italic font-bold">{coreProblem}</strong>. We will know we are right when we achieve at least <strong className="text-indigo-950 font-sans not-italic font-bold">{metricThreshold} paid commitments</strong> within <strong className="text-indigo-950 font-sans not-italic font-bold">{timeBoxWeeks} weeks</strong> on a budget of <strong className="text-indigo-950 font-sans not-italic font-bold">₹{budgetINR.toLocaleString()}</strong>."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Funnel Conversion & Decision Engine (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* 3. Funnel Telemetry Simulator */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-600" />
                3. Funnel Conversion Telemetry
              </h4>
              <span className="text-2xs font-semibold text-slate-400">Live Numbers</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-2xs mb-1">
                  <span className="font-semibold text-slate-700">1. Ad Impressions</span>
                  <span className="font-mono text-slate-600">{adImpressions.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="100000"
                  step="5000"
                  value={adImpressions}
                  onChange={e => setAdImpressions(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-2xs mb-1">
                  <span className="font-semibold text-slate-700">2. Landing Page Visitors</span>
                  <span className="font-mono text-slate-900 font-bold">{landingVisitors.toLocaleString()} (CTR {ctrAd.toFixed(1)}%)</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="10000"
                  step="100"
                  value={landingVisitors}
                  onChange={e => setLandingVisitors(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-2xs mb-1">
                  <span className="font-semibold text-slate-700">3. Waitlist / Demo Attendees</span>
                  <span className="font-mono text-slate-900 font-bold">{leadsOrWaitlist.toLocaleString()} ({leadConvRate.toFixed(1)}% of visits)</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={leadsOrWaitlist}
                  onChange={e => setLeadsOrWaitlist(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-2xs mb-1">
                  <span className="font-semibold text-slate-900 font-bold">4. Paid Conversions (Skin-in-the-Game)</span>
                  <span className="font-mono text-emerald-700 font-extrabold text-sm">{paidCustomers} paid</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="150"
                  step="1"
                  value={paidCustomers}
                  onChange={e => setPaidCustomers(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                <div>
                  <label className="text-2xs font-semibold text-slate-500 block">Ad Spend (₹)</label>
                  <input
                    type="number"
                    value={adSpend}
                    onChange={e => setAdSpend(Number(e.target.value))}
                    className="w-full px-2 py-1 rounded border border-slate-200 font-mono text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-2xs font-semibold text-slate-500 block">Unit Price (₹)</label>
                  <input
                    type="number"
                    value={pricePerUnit}
                    onChange={e => setPricePerUnit(Number(e.target.value))}
                    className="w-full px-2 py-1 rounded border border-slate-200 font-mono text-xs text-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* Economic Funnel Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 text-center">
                <span className="text-3xs font-bold uppercase tracking-wider text-slate-500 block">Total Revenue</span>
                <span className="text-sm font-extrabold font-mono text-slate-900">₹{totalRevenue.toLocaleString()}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 text-center">
                <span className="text-3xs font-bold uppercase tracking-wider text-slate-500 block">CAC (Customer Acq Cost)</span>
                <span className="text-sm font-extrabold font-mono text-slate-900">₹{Math.round(cac).toLocaleString()}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 text-center">
                <span className="text-3xs font-bold uppercase tracking-wider text-slate-500 block">Visitor-to-Paid Rate</span>
                <span className="text-sm font-extrabold font-mono text-indigo-700">{paidConvFromVisitors.toFixed(2)}%</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 text-center">
                <span className="text-3xs font-bold uppercase tracking-wider text-slate-500 block">Net Test Margin</span>
                <span className={`text-sm font-extrabold font-mono ${netSurplus >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {netSurplus >= 0 ? `+₹${netSurplus.toLocaleString()}` : `-₹${Math.abs(netSurplus).toLocaleString()}`}
                </span>
              </div>
            </div>
          </div>

          {/* 4. Objective Persevere / Pivot / Stop Decision Engine */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-600" />
                4. End-of-Timebox Decision Engine
              </h4>
              <span className={`text-2xs font-extrabold uppercase px-2 py-0.5 rounded border ${decisionStatus.color}`}>
                {isGoalMet ? 'Target Reached' : 'Under Target'}
              </span>
            </div>

            <div className="p-4 rounded-xl border space-y-2.5 transition-all bg-slate-50 border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-3xs font-bold uppercase tracking-wider text-slate-500">Official Decision</span>
                <span className="text-xs font-mono font-bold text-slate-700">
                  {paidCustomers} of {metricThreshold} required ({Math.round((paidCustomers / metricThreshold) * 100)}%)
                </span>
              </div>
              <h5 className="text-base font-extrabold text-slate-900">{decisionStatus.verdict}</h5>
              <p className="text-xs text-slate-600 leading-relaxed">{decisionStatus.advice}</p>
            </div>

            {/* Lean Rule Card */}
            <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-lg text-2xs text-amber-900 space-y-1">
              <span className="font-bold block">💡 Sundaresh Kamaraj Executive Rule:</span>
              <p>
                "Charge something, even a small refundable deposit. Polite interest in surveys is not evidence; payments and commitment are. If your MVP takes more than two weeks to build, you are building too much."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
