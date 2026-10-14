import { useState } from 'react';
import { Sparkles, RotateCcw, AlertTriangle, CheckCircle2, DollarSign, Layers, Users, ShieldCheck, ArrowRight } from 'lucide-react';

interface MixState {
  product: string;
  price: string;
  place: string;
  promotion: string;
  // 7Ps additions
  people: string;
  process: string;
  physicalEvidence: string;
}

export function MarketingMixSimulator() {
  const [is7Ps, setIs7Ps] = useState(true);
  const [activeTab, setActiveTab] = useState<'mix' | 'audit' | '4cs' | 'budget'>('mix');

  const [mix, setMix] = useState<MixState>({
    product: 'Weekend hybrid data analytics & AI course with industry capstone project & mock interview drills',
    price: '₹45,000 upfront or ₹8,500/month 6-month EMI (No-cost financing partner)',
    place: 'Madurai physical classroom campus + 4 partner college satellite desks + online live portal',
    promotion: 'Trainer LinkedIn technical articles, campus seminars, alumni referral bonus, targeted search ads',
    people: 'Practicing senior data engineers as trainers, dedicated student counsellors with 48h SLA',
    process: 'Instant WhatsApp receipt & LMS onboarding within 1 hour; weekly graded problem sets; week-6 placement advisor handover',
    physicalEvidence: 'Renovated air-conditioned computer lab, verified ISO skill certification, alumni wall of fame with salary letters'
  });

  // Budget calculator inputs
  const [unitPrice, setUnitPrice] = useState<number>(45000);
  const [projectedStudents, setProjectedStudents] = useState<number>(80);
  const [promotionBudget, setPromotionBudget] = useState<number>(450000);
  const [channelCommissionPct, setChannelCommissionPct] = useState<number>(15);
  const [deliveryCostPerUnit, setDeliveryCostPerUnit] = useState<number>(18000);

  const handleLoadGreenLeafCase = () => {
    setIs7Ps(true);
    setMix({
      product: 'GreenLeaf Hybrid Classroom: recorded lecture archive + weekly live doubt clearing + parent progress app',
      price: '3-tier pricing: Classroom (₹65,000), Hybrid (₹45,000), Online (₹25,000) with partner zero-cost EMI',
      place: 'Main Coimbatore centre + satellite enquiry desks in Pollachi & Tiruppur + digital portal',
      promotion: 'Redirected 60% print budget to YouTube topper interviews, WhatsApp parent groups, and school career workshops',
      people: 'Trained career counsellors following standard script; certified subject master trainers',
      process: 'Strict 48-hour follow-up rule on all enquiries; instant digital admission confirmation; monthly parent-teacher calls',
      physicalEvidence: 'Air-conditioned digital smart classrooms, comprehensive study modules, verified historical rank certificates'
    });
    setUnitPrice(45000);
    setProjectedStudents(120);
    setPromotionBudget(350000);
    setChannelCommissionPct(10);
    setDeliveryCostPerUnit(15000);
  };

  const handleResetToBaseline = () => {
    setMix({
      product: 'Standard coaching class',
      price: '₹30,000 with 20% flat discount banner',
      place: 'Single physical classroom in town',
      promotion: 'Local newspaper print advertisements',
      people: 'Receptionist answering calls as time permits',
      process: 'Paper registration forms, manual batch allotment after 2 weeks',
      physicalEvidence: 'Traditional blackboard classroom'
    });
  };

  // Contradiction detection
  const contradictions: string[] = [];
  const textToCheck = `${mix.product} ${mix.price} ${mix.place} ${mix.promotion}`.toLowerCase();

  if (textToCheck.includes('premium') && (textToCheck.includes('discount') || textToCheck.includes('cheap') || textToCheck.includes('50% off'))) {
    contradictions.push('Price/Promotion Contradiction: Using heavy discount banners or "50% off" claims while marketing a premium product damages brand credibility.');
  }
  if (textToCheck.includes('premium') && textToCheck.includes('bargain')) {
    contradictions.push('Positioning Contradiction: Premium product claims conflict with bargain channels.');
  }
  if (is7Ps && (!mix.people || mix.people.length < 15)) {
    contradictions.push('7Ps Gap: Service delivery lacks defined People standards (training, counselor SLAs, trainer qualifications).');
  }
  if (is7Ps && (!mix.process || mix.process.length < 15)) {
    contradictions.push('7Ps Gap: Customer enquiry-to-delivery Process is unmapped; risk of communication breakdown and early dropout.');
  }

  // Budget calculations
  const totalRevenue = unitPrice * projectedStudents;
  const channelCost = totalRevenue * (channelCommissionPct / 100);
  const totalDeliveryCost = deliveryCostPerUnit * projectedStudents;
  const totalCosts = promotionBudget + channelCost + totalDeliveryCost;
  const netContribution = totalRevenue - totalCosts;
  const marginPct = totalRevenue > 0 ? Math.round((netContribution / totalRevenue) * 100) : 0;
  const cacPerStudent = projectedStudents > 0 ? Math.round((promotionBudget + channelCost) / projectedStudents) : 0;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-2">
              <Layers className="w-3.5 h-3.5" /> McCarthy 4Ps & Booms/Bitner 7Ps Service Model
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Marketing Mix (4Ps & 7Ps) Interactive Designer
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-3xl">
              Design the controllable tactical levers — Product, Price, Place, Promotion (+ People, Process, Physical Evidence).
              Ensure internal consistency and calculate 4Ps-to-budget financial contribution.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleLoadGreenLeafCase}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" /> Load GreenLeaf Academy Case
            </button>
            <button
              onClick={handleResetToBaseline}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </div>

        {/* 4Ps vs 7Ps Toggle */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-700">Framework Mode:</span>
            <div className="inline-flex p-1 bg-slate-100 rounded-lg">
              <button
                onClick={() => setIs7Ps(false)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  !is7Ps ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Classic 4Ps (Products)
              </button>
              <button
                onClick={() => setIs7Ps(true)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  is7Ps ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Extended 7Ps (Services & Education)
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => setActiveTab('mix')}
              className={`px-3 py-1.5 font-semibold rounded-lg ${activeTab === 'mix' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Levers Design
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-3 py-1.5 font-semibold rounded-lg flex items-center gap-1.5 ${activeTab === 'audit' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Contradiction Audit
              {contradictions.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {contradictions.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('4cs')}
              className={`px-3 py-1.5 font-semibold rounded-lg ${activeTab === '4cs' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Lauterborn 4Cs Mirror
            </button>
            <button
              onClick={() => setActiveTab('budget')}
              className={`px-3 py-1.5 font-semibold rounded-lg ${activeTab === 'budget' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              4Ps-to-Budget Calculator
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: 4Ps & 7Ps Levers Design */}
      {activeTab === 'mix' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* P1: Product */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">P1 · Product / Solution</span>
              <span className="text-[11px] text-slate-400">Features, Scope, Packaging, Warranty</span>
            </div>
            <textarea
              value={mix.product}
              onChange={(e) => setMix({ ...mix, product: e.target.value })}
              rows={3}
              className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 text-slate-800"
              placeholder="Describe the offer, core curriculum, inclusions, exclusions, and credentials promised..."
            />
          </div>

          {/* P2: Price */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">P2 · Price / Monetization</span>
              <span className="text-[11px] text-slate-400">List Price, EMI, Tiering, Discounts Allowed</span>
            </div>
            <textarea
              value={mix.price}
              onChange={(e) => setMix({ ...mix, price: e.target.value })}
              rows={3}
              className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 text-slate-800"
              placeholder="List price, financing terms, explicit discounts given or strictly refused..."
            />
          </div>

          {/* P3: Place */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">P3 · Place / Distribution</span>
              <span className="text-[11px] text-slate-400">Channels, Desks, Digital Portal, Margins</span>
            </div>
            <textarea
              value={mix.place}
              onChange={(e) => setMix({ ...mix, place: e.target.value })}
              rows={3}
              className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 text-slate-800"
              placeholder="Where customers discover, purchase, and receive the offering..."
            />
          </div>

          {/* P4: Promotion */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">P4 · Promotion / Communication</span>
              <span className="text-[11px] text-slate-400">Media, Messaging, Proof Assets, Referrals</span>
            </div>
            <textarea
              value={mix.promotion}
              onChange={(e) => setMix({ ...mix, promotion: e.target.value })}
              rows={3}
              className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 text-slate-800"
              placeholder="Integrated communications: social content, referrals, events, and AIDA briefs..."
            />
          </div>

          {/* 7Ps Service Levers */}
          {is7Ps && (
            <>
              {/* P5: People */}
              <div className="bg-blue-50/50 rounded-xl border border-blue-200 p-5 shadow-sm space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">P5 · People (Service Staff)</span>
                  <span className="text-[11px] text-blue-600">Trainers, Counsellors, Frontline SLAs</span>
                </div>
                <textarea
                  value={mix.people}
                  onChange={(e) => setMix({ ...mix, people: e.target.value })}
                  rows={3}
                  className="w-full text-xs p-3 rounded-lg border border-blue-200 bg-white focus:ring-2 focus:ring-blue-500 text-slate-800"
                  placeholder="Who delivers the service? Qualifications, script training, and enquiry response standards..."
                />
              </div>

              {/* P6: Process */}
              <div className="bg-blue-50/50 rounded-xl border border-blue-200 p-5 shadow-sm space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">P6 · Process (Customer Flow)</span>
                  <span className="text-[11px] text-blue-600">Enquiry → Onboarding → Delivery → Review</span>
                </div>
                <textarea
                  value={mix.process}
                  onChange={(e) => setMix({ ...mix, process: e.target.value })}
                  rows={3}
                  className="w-full text-xs p-3 rounded-lg border border-blue-200 bg-white focus:ring-2 focus:ring-blue-500 text-slate-800"
                  placeholder="Step-by-step customer flow: response time rules, onboarding walkthrough, progress checkpoints..."
                />
              </div>

              {/* P7: Physical Evidence */}
              <div className="bg-blue-50/50 rounded-xl border border-blue-200 p-5 shadow-sm space-y-2.5 md:col-span-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">P7 · Physical Evidence (Tangible Proof)</span>
                  <span className="text-[11px] text-blue-600">Premises, Certificates, App UI, Uniforms</span>
                </div>
                <textarea
                  value={mix.physicalEvidence}
                  onChange={(e) => setMix({ ...mix, physicalEvidence: e.target.value })}
                  rows={2}
                  className="w-full text-xs p-3 rounded-lg border border-blue-200 bg-white focus:ring-2 focus:ring-blue-500 text-slate-800"
                  placeholder="The tangible cues that reassure a customer of intangible service quality..."
                />
              </div>
            </>
          )}
        </div>
      )}

      {/* TAB 2: Contradiction Audit */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Marketing Mix Consistency & Contradiction Audit</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Checks that Price, Place, Promotion, and Product reinforce each other rather than sending opposing signals.
              </p>
            </div>
            <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
              contradictions.length === 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
            }`}>
              {contradictions.length === 0 ? 'Consistent Mix (0 Conflicts)' : `${contradictions.length} Contradictions Flagged`}
            </span>
          </div>

          {contradictions.length > 0 ? (
            <div className="space-y-3">
              {contradictions.map((issue, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-rose-200 bg-rose-50/70 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-rose-900 block mb-1">Conflict #{idx + 1}</span>
                    <p className="text-xs text-rose-800 leading-relaxed">{issue}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-950 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold">Excellent Lever Coherence!</h4>
                <p className="text-xs text-emerald-800 mt-1">
                  Your product features, pricing structure, distribution channels, and promotional messaging form a unified, mutually reinforcing offer.
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-800 block mb-1">Product ↔ Price Alignment</span>
              <p className="text-slate-600">Does the fee match the customer’s willingness to pay for the documented features?</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-800 block mb-1">Price ↔ Place Alignment</span>
              <p className="text-slate-600">Do channel partners receive sufficient margins to actively advocate for this product?</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-800 block mb-1">Place ↔ Promotion Alignment</span>
              <p className="text-slate-600">Does promotion drive footfall and web traffic directly to the authorized channels?</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Lauterborn 4Cs Mirror Check */}
      {activeTab === '4cs' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-5">
          <div>
            <h3 className="text-base font-bold text-slate-900">Lauterborn’s 4Cs: The Customer-Side Mirror</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Restate the 4Ps from the buyer’s perspective to ensure the plan solves a customer need rather than pushing internal products.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40">
              <div className="flex items-center justify-between font-bold text-blue-900 mb-2">
                <span>Product ➔ Customer Solution</span>
                <span className="text-[10px] bg-blue-100 px-2 py-0.5 rounded">C1</span>
              </div>
              <p className="text-slate-700 leading-relaxed mb-2">
                Instead of "What features do we sell?", ask "What specific problem does the buyer solve by acquiring this?"
              </p>
              <div className="p-2.5 rounded bg-white border border-blue-100 text-slate-800 font-medium">
                Buyer View: Practical career transformation & job placement readiness within 6 months.
              </div>
            </div>

            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40">
              <div className="flex items-center justify-between font-bold text-emerald-900 mb-2">
                <span>Price ➔ Cost to Satisfy</span>
                <span className="text-[10px] bg-emerald-100 px-2 py-0.5 rounded">C2</span>
              </div>
              <p className="text-slate-700 leading-relaxed mb-2">
                Instead of "What is our list price?", evaluate the total cost: tuition, commuting time, financing fees, and opportunity cost.
              </p>
              <div className="p-2.5 rounded bg-white border border-emerald-100 text-slate-800 font-medium">
                Buyer View: Affordable monthly EMI of ₹8,500 insulated by placement career ROI.
              </div>
            </div>

            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40">
              <div className="flex items-center justify-between font-bold text-amber-900 mb-2">
                <span>Place ➔ Convenience to Buy</span>
                <span className="text-[10px] bg-amber-100 px-2 py-0.5 rounded">C3</span>
              </div>
              <p className="text-slate-700 leading-relaxed mb-2">
                Instead of "Where do we open desks?", evaluate how effortlessly the student can enroll and access classes from home.
              </p>
              <div className="p-2.5 rounded bg-white border border-amber-100 text-slate-800 font-medium">
                Buyer View: Enrolment via WhatsApp; weekend hybrid attendance with zero weekday travel.
              </div>
            </div>

            <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/40">
              <div className="flex items-center justify-between font-bold text-purple-900 mb-2">
                <span>Promotion ➔ Communication</span>
                <span className="text-[10px] bg-purple-100 px-2 py-0.5 rounded">C4</span>
              </div>
              <p className="text-slate-700 leading-relaxed mb-2">
                Instead of one-way megaphone ads, engage in dialogue through alumni Q&As, syllabus webinars, and career advice.
              </p>
              <div className="p-2.5 rounded bg-white border border-purple-100 text-slate-800 font-medium">
                Buyer View: Transparent LinkedIn technical posts & real alumni success videos.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: 4Ps-to-Budget Calculator */}
      {activeTab === 'budget' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">4Ps-to-Budget Conversion Model</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Verify that the Price × Volume forecast covers Place commissions and Promotion budgets before cutting marketing spend.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Average Price per Unit (₹)
                </label>
                <input
                  type="number"
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(Number(e.target.value))}
                  className="w-full p-2.5 rounded-lg border border-slate-200 text-xs font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Projected Customer / Student Volume
                </label>
                <input
                  type="number"
                  value={projectedStudents}
                  onChange={(e) => setProjectedStudents(Number(e.target.value))}
                  className="w-full p-2.5 rounded-lg border border-slate-200 text-xs font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Total Promotion Budget (Ads, Events, Content) (₹)
                </label>
                <input
                  type="number"
                  value={promotionBudget}
                  onChange={(e) => setPromotionBudget(Number(e.target.value))}
                  className="w-full p-2.5 rounded-lg border border-slate-200 text-xs font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Place Channel Margin / Partner Commission (%)
                </label>
                <input
                  type="number"
                  value={channelCommissionPct}
                  onChange={(e) => setChannelCommissionPct(Number(e.target.value))}
                  className="w-full p-2.5 rounded-lg border border-slate-200 text-xs font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Product Delivery Cost per Student / Unit (₹)
                </label>
                <input
                  type="number"
                  value={deliveryCostPerUnit}
                  onChange={(e) => setDeliveryCostPerUnit(Number(e.target.value))}
                  className="w-full p-2.5 rounded-lg border border-slate-200 text-xs font-mono"
                />
              </div>
            </div>

            {/* Financial Summary */}
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Campaign Contribution Forecast
                </span>

                <div className="flex items-center justify-between text-xs py-1 border-b border-slate-200">
                  <span className="text-slate-600">Total Projected Revenue:</span>
                  <span className="font-mono font-bold text-slate-900">₹{totalRevenue.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between text-xs py-1 border-b border-slate-200">
                  <span className="text-slate-600">Place Channel Costs ({channelCommissionPct}%):</span>
                  <span className="font-mono text-slate-700">-₹{channelCost.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between text-xs py-1 border-b border-slate-200">
                  <span className="text-slate-600">Promotion Spend:</span>
                  <span className="font-mono text-slate-700">-₹{promotionBudget.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between text-xs py-1 border-b border-slate-200">
                  <span className="text-slate-600">Product Direct Costs:</span>
                  <span className="font-mono text-slate-700">-₹{totalDeliveryCost.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between text-sm py-2 pt-3 border-t border-slate-300">
                  <span className="font-bold text-slate-900">Net Contribution:</span>
                  <span className={`font-mono font-extrabold ${netContribution >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                    ₹{netContribution.toLocaleString()} ({marginPct}%)
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Effective CAC per Enrolment:</span>
                  <span className="font-mono font-bold text-slate-900">₹{cacPerStudent.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">CAC-to-Price Ratio:</span>
                  <span className="font-mono font-semibold text-slate-800">
                    {unitPrice > 0 ? ((cacPerStudent / unitPrice) * 100).toFixed(1) : 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
