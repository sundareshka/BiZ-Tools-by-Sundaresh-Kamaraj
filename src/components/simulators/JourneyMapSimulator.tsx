import { useState } from 'react';
import { Sparkles, RotateCcw, AlertTriangle, CheckCircle2, TrendingUp, Compass, Layers, ArrowRight } from 'lucide-react';

interface JourneyStage {
  id: string;
  name: string;
  action: string;
  touchpoint: string;
  thought: string;
  emotion: number; // 1-5
  painPoint: string;
  opportunity: string;
  metric: string;
  isMomentOfTruth?: boolean;
}

export function JourneyMapSimulator() {
  const [activeTab, setActiveTab] = useState<'map' | 'blueprint' | 'priorities'>('map');

  const [stages, setStages] = useState<JourneyStage[]>([
    {
      id: 'st-1',
      name: 'Awareness',
      action: 'Sees LinkedIn post or YouTube interview',
      touchpoint: 'Social post, website blog',
      thought: '“Is this data analytics course relevant for me?”',
      emotion: 3,
      painPoint: 'Vague promises on other competitor websites',
      opportunity: 'Publish real salary offer letters',
      metric: 'Click-through rate (CTR)'
    },
    {
      id: 'st-2',
      name: 'Enquiry',
      action: 'Fills web inquiry form, attends webinar',
      touchpoint: 'Counsellor phone call, WhatsApp',
      thought: '“Can I trust these people with my tuition fee?”',
      emotion: 4,
      painPoint: 'Slow callbacks (takes up to 48 hours)',
      opportunity: 'Mandate counsellor call SLA within 2 hours',
      metric: 'Lead-to-call conversion rate'
    },
    {
      id: 'st-3',
      name: 'Enrol & Pay',
      action: 'Pays course tuition online via payment link',
      touchpoint: 'Payment gateway page, invoice email',
      thought: '“Did the payment go through? Where is my receipt?”',
      emotion: 2,
      painPoint: 'No receipt or class schedule sent for up to 5 days',
      opportunity: 'Automate instant WhatsApp receipt + schedule within 60 mins',
      metric: 'Payment completion %',
      isMomentOfTruth: true
    },
    {
      id: 'st-4',
      name: 'First Week',
      action: 'Logs into LMS and attends session 1',
      touchpoint: 'LMS software, classroom centre',
      thought: '“Where do I log in? How do I submit homework?”',
      emotion: 2,
      painPoint: 'Zero orientation; students feel lost in the learning portal',
      opportunity: '30-minute mandatory LMS walkthrough in session one',
      metric: 'Week-1 attendance %',
      isMomentOfTruth: true
    },
    {
      id: 'st-5',
      name: 'Learning',
      action: 'Attends weekly weekend lectures and live labs',
      touchpoint: 'Trainer, GitHub repo, Discord pod',
      thought: '“Am I keeping up with the industry projects?”',
      emotion: 4,
      painPoint: 'Occasional code debugging delays on weekdays',
      opportunity: 'Peer WhatsApp study groups with mentor assistance',
      metric: 'Course assignment completion %'
    },
    {
      id: 'st-6',
      name: 'Completion',
      action: 'Submits final capstone project to panel',
      touchpoint: 'Project review panel, certificate',
      thought: '“Was all this weekend hard work worth it?”',
      emotion: 4,
      painPoint: 'Delays in issuing digital credentials',
      opportunity: 'Instant digital certificate with LinkedIn badge link',
      metric: 'Capstone graduation rate'
    },
    {
      id: 'st-7',
      name: 'Placement',
      action: 'Undergoes technical mock interviews',
      touchpoint: 'Corporate placement cell, interviewers',
      thought: '“Will the placement cell actually send me to drives?”',
      emotion: 3,
      painPoint: 'Placement guidance starts only after students submit a paper form',
      opportunity: 'Dedicated placement counsellor assigned in week 6',
      metric: 'Placement interview rate %',
      isMomentOfTruth: true
    },
    {
      id: 'st-8',
      name: 'Advocacy',
      action: 'Shares job offer letter and reviews course',
      touchpoint: 'LinkedIn post, Google review, WhatsApp',
      thought: '“Should I recommend LearnBridge to my college junior?”',
      emotion: 5,
      painPoint: 'Nobody asks for reviews or referrals at peak delight',
      opportunity: 'Automated referral reward program triggered on offer letter day',
      metric: 'NPS & referral enrollment %'
    }
  ]);

  const handleLoadLearnBridgeCase = () => {
    setStages([
      {
        id: 'st-1',
        name: 'Awareness',
        action: 'Sees LinkedIn post or YouTube topper interview',
        touchpoint: 'Social post, website blog',
        thought: '“Is this course practical or just academic slides?”',
        emotion: 3,
        painPoint: 'Competitors boast fake placement percentages',
        opportunity: 'Show verified student offer letters with compensation',
        metric: 'Impressions & CTR'
      },
      {
        id: 'st-2',
        name: 'Enquiry',
        action: 'Submits phone number for syllabus download',
        touchpoint: 'Counsellor phone call & WhatsApp',
        thought: '“Can I trust them? Will they push me to enroll?”',
        emotion: 4,
        painPoint: 'Unscripted, aggressive sales calls',
        opportunity: 'Empathetic diagnostic career consultation script',
        metric: 'Inquiry-to-visit rate'
      },
      {
        id: 'st-3',
        name: 'Enrol & Pay',
        action: 'Completes digital tuition payment',
        touchpoint: 'Payment gateway & SMS',
        thought: '“Did my ₹45,000 reach? I got no confirmation!”',
        emotion: 2,
        painPoint: 'Finance takes 4 business days to email official receipt',
        opportunity: 'Instant automated WhatsApp invoice & welcome pack',
        metric: 'Drop-off between payment & Day 1',
        isMomentOfTruth: true
      },
      {
        id: 'st-4',
        name: 'First Week',
        action: 'Attempts to log into weekend virtual lab',
        touchpoint: 'LMS platform & classroom',
        thought: '“My credentials failed. Who do I contact?”',
        emotion: 2,
        painPoint: 'No tech support on Saturday morning before class starts',
        opportunity: 'Pre-flight system check call on Friday evening',
        metric: 'Day 1 logon rate',
        isMomentOfTruth: true
      },
      {
        id: 'st-5',
        name: 'Active Learning',
        action: 'Attends 8 weeks of live coding modules',
        touchpoint: 'Faculty, lab mentors, LMS portal',
        thought: '“The faculty explains concepts thoroughly.”',
        emotion: 4,
        painPoint: 'None: teaching quality is high',
        opportunity: 'Celebrate mid-term milestone with digital badge',
        metric: 'Module completion %'
      },
      {
        id: 'st-6',
        name: 'Course End',
        action: 'Presents final capstone to industry panel',
        touchpoint: 'Online evaluation panel',
        thought: '“Proud of my project portfolio on GitHub.”',
        emotion: 5,
        painPoint: 'Grading feedback delayed by two weeks',
        opportunity: 'Same-day digital rubric scorecard',
        metric: 'CSAT rating'
      },
      {
        id: 'st-7',
        name: 'Placement Handover',
        action: 'Awaits interview schedule with partner firms',
        touchpoint: 'Placement cell, email inbox',
        thought: '“It has been two weeks and I have heard nothing.”',
        emotion: 2,
        painPoint: 'Placement team waited for paper clearance forms from finance',
        opportunity: 'Automated placement pipeline entry at 75% course mark',
        metric: 'Days from graduation to first interview',
        isMomentOfTruth: true
      },
      {
        id: 'st-8',
        name: 'Advocacy & Referral',
        action: 'Accepts offer letter at tech firm and refers peers',
        touchpoint: 'LinkedIn post, alumni group',
        thought: '“LearnBridge completely changed my career track.”',
        emotion: 5,
        painPoint: 'Referral incentive was never explained',
        opportunity: 'Give ₹3,000 Amazon coupon for verified alumni referrals',
        metric: 'Alumni referral count & NPS'
      }
    ]);
  };

  const handleUpdateEmotion = (id: string, newEmotion: number) => {
    setStages(stages.map(s => s.id === id ? { ...s, emotion: newEmotion } : s));
  };

  // SVG calculation for the emotion curve
  const svgWidth = 800;
  const svgHeight = 120;
  const stepX = svgWidth / (stages.length - 1);

  // Generate SVG path points
  const points = stages.map((s, idx) => {
    const x = idx * stepX;
    // emotion 1..5 mapped to height 100..20
    const y = 110 - ((s.emotion - 1) * 22.5);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2">
              <Compass className="w-3.5 h-3.5" /> Outside-In Experience & Service Design
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Customer Journey Mapping & Service Blueprint Studio
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-3xl">
              Map the 8 lifecycle stages across parallel lanes (Actions, Touchpoints, Thoughts, Emotions, Pain Points).
              Pinpoint critical "Moments of Truth" where emotion dips and engineer backstage operational fixes.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleLoadLearnBridgeCase}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" /> Load LearnBridge Case
            </button>
            <button
              onClick={() => handleUpdateEmotion('st-3', 2)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-t border-slate-100 pt-4 mt-4">
          <button
            onClick={() => setActiveTab('map')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'map' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            1. Journey Map & Emotion Curve
          </button>
          <button
            onClick={() => setActiveTab('blueprint')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'blueprint' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            2. Service Blueprint (Frontstage / Backstage)
          </button>
          <button
            onClick={() => setActiveTab('priorities')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'priorities' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            3. Pain-Point Prioritization Matrix
          </button>
        </div>
      </div>

      {/* TAB 1: JOURNEY MAP & EMOTION CURVE */}
      {activeTab === 'map' && (
        <div className="space-y-6">
          {/* Interactive Emotion Curve Visualizer */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">End-to-End Customer Emotion Curve (1 to 5 Scale)</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Notice where the line plunges: consecutive dips represent critical <strong className="text-slate-800">Moments of Truth</strong> requiring immediate operational intervention.
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Delight (4–5)
                </span>
                <span className="flex items-center gap-1.5 text-rose-600 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Moment of Truth (1–2)
                </span>
              </div>
            </div>

            {/* SVG Emotion Line */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 overflow-x-auto">
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-32 overflow-visible">
                {/* Horizontal guide grids */}
                <line x1="0" y1="20" x2={svgWidth} y2="20" stroke="#e2e8f0" strokeDasharray="3 3" />
                <line x1="0" y1="65" x2={svgWidth} y2="65" stroke="#e2e8f0" strokeDasharray="3 3" />
                <line x1="0" y1="110" x2={svgWidth} y2="110" stroke="#e2e8f0" strokeDasharray="3 3" />

                {/* The Path Curve */}
                <polyline
                  fill="none"
                  stroke="#4f46e5"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={points}
                />

                {/* Interactive Points on Curve */}
                {stages.map((s, idx) => {
                  const x = idx * stepX;
                  const y = 110 - ((s.emotion - 1) * 22.5);
                  const isLow = s.emotion <= 2;
                  return (
                    <g key={s.id}>
                      <circle
                        cx={x}
                        cy={y}
                        r={isLow ? 7 : 5}
                        fill={isLow ? '#e11d48' : '#4f46e5'}
                        stroke="#ffffff"
                        strokeWidth="2"
                        className="cursor-pointer hover:scale-125 transition-transform"
                      />
                      <text
                        x={x}
                        y={y - 12}
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="bold"
                        fill={isLow ? '#e11d48' : '#1e293b'}
                      >
                        {s.name} ({s.emotion})
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Full Journey Map Lanes Table */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse min-w-[850px]">
              <thead>
                <tr className="bg-slate-50 border-y border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-3 w-28">Lane</th>
                  {stages.map(s => (
                    <th key={s.id} className="py-3 px-3 min-w-[130px]">
                      <div className="font-bold text-slate-900">{s.name}</div>
                      {s.isMomentOfTruth && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 font-bold block mt-0.5">
                          Moment of Truth
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {/* Lane 1: Customer Actions */}
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-bold text-slate-700 bg-slate-50/60">Actions</td>
                  {stages.map(s => (
                    <td key={s.id} className="py-3 px-3 text-slate-800 leading-snug">{s.action}</td>
                  ))}
                </tr>

                {/* Lane 2: Touchpoints & Channels */}
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-bold text-slate-700 bg-slate-50/60">Touchpoints</td>
                  {stages.map(s => (
                    <td key={s.id} className="py-3 px-3 text-indigo-700 font-medium">{s.touchpoint}</td>
                  ))}
                </tr>

                {/* Lane 3: Customer Thoughts */}
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-bold text-slate-700 bg-slate-50/60">Thoughts</td>
                  {stages.map(s => (
                    <td key={s.id} className="py-3 px-3 text-slate-500 italic leading-snug">{s.thought}</td>
                  ))}
                </tr>

                {/* Lane 4: Emotion Score (1-5) */}
                <tr className="hover:bg-slate-50/50 bg-indigo-50/20">
                  <td className="py-3 px-3 font-bold text-indigo-900 bg-slate-50/60">Emotion (1–5)</td>
                  {stages.map(s => (
                    <td key={s.id} className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        <input
                          type="range"
                          min="1"
                          max="5"
                          value={s.emotion}
                          onChange={(e) => handleUpdateEmotion(s.id, Number(e.target.value))}
                          className="w-16 accent-indigo-600"
                        />
                        <span className={`font-mono font-bold text-xs ${s.emotion <= 2 ? 'text-rose-600' : 'text-emerald-700'}`}>
                          {s.emotion}
                        </span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Lane 5: Pain Points */}
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-bold text-slate-700 bg-slate-50/60">Pain Points</td>
                  {stages.map(s => (
                    <td key={s.id} className="py-3 px-3">
                      {s.painPoint !== 'None' ? (
                        <span className="text-rose-700 font-medium block leading-snug">{s.painPoint}</span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Lane 6: Opportunities & Fixes */}
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-bold text-slate-700 bg-slate-50/60">Opportunities</td>
                  {stages.map(s => (
                    <td key={s.id} className="py-3 px-3 text-emerald-800 font-medium leading-snug">{s.opportunity}</td>
                  ))}
                </tr>

                {/* Lane 7: Stage Metric */}
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-bold text-slate-700 bg-slate-50/60">Stage Metric</td>
                  {stages.map(s => (
                    <td key={s.id} className="py-3 px-3 text-slate-600 font-mono text-[11px]">{s.metric}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: MINI SERVICE BLUEPRINT */}
      {activeTab === 'blueprint' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-5">
          <div>
            <h3 className="text-base font-bold text-slate-900">Service Blueprint: Frontstage, Backstage & Fail Points</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Lynn Shostack's service blueprint links customer actions above the "line of visibility" to backstage employee tasks and IT support infrastructure below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Frontstage */}
            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 space-y-2">
              <span className="text-2xs font-bold uppercase tracking-wider text-blue-700 block">
                Above the Line of Visibility
              </span>
              <h4 className="text-sm font-bold text-blue-900">Frontstage Employee Interactions</h4>
              <ul className="text-slate-700 space-y-1.5 list-disc list-inside leading-relaxed">
                <li>Admissions counsellor conducts scripted diagnostic phone consultation.</li>
                <li>Faculty delivers interactive weekend hybrid lectures with live coding labs.</li>
                <li>Placement officer assigns corporate interview slots directly to candidate.</li>
              </ul>
            </div>

            {/* Backstage */}
            <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/50 space-y-2">
              <span className="text-2xs font-bold uppercase tracking-wider text-indigo-700 block">
                Below the Line of Visibility
              </span>
              <h4 className="text-sm font-bold text-indigo-900">Backstage Employee Workflows</h4>
              <ul className="text-slate-700 space-y-1.5 list-disc list-inside leading-relaxed">
                <li>Accounts team reconciles daily UPI and credit card fee collections.</li>
                <li>LMS administrator provisions course repositories and access tokens.</li>
                <li>Corporate relations team curates company job descriptions and candidate shortlists.</li>
              </ul>
            </div>

            {/* IT Support Systems */}
            <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/50 space-y-2">
              <span className="text-2xs font-bold uppercase tracking-wider text-purple-700 block">
                Foundational Infrastructure
              </span>
              <h4 className="text-sm font-bold text-purple-900">Support Systems & Fail Points</h4>
              <ul className="text-slate-700 space-y-1.5 list-disc list-inside leading-relaxed">
                <li><strong>Fail Point:</strong> Gateway timeout during fee payment without instant SMS.</li>
                <li><strong>Automated Fix:</strong> Webhook triggers instant WhatsApp invoice within 2 minutes.</li>
                <li><strong>Support Systems:</strong> Razorpay Gateway, HubSpot CRM, Moodle LMS, AWS Servers.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PRIORITIZATION MATRIX */}
      {activeTab === 'priorities' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-5">
          <div>
            <h3 className="text-base font-bold text-slate-900">Pain-Point Prioritization Sheet</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Rank issues by Frequency × Severity to ensure teams fix cheap, high-impact friction points first.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-y border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                  <th className="py-2.5 px-3">Pain Point Description</th>
                  <th className="py-2.5 px-3">Frequency / Mo</th>
                  <th className="py-2.5 px-3">Severity (1–5)</th>
                  <th className="py-2.5 px-3">Business Impact</th>
                  <th className="py-2.5 px-3">Cost to Fix</th>
                  <th className="py-2.5 px-3">Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-bold text-slate-900">No payment receipt or LMS credentials for 5 days</td>
                  <td className="py-3 px-3 font-mono">120 tickets</td>
                  <td className="py-3 px-3 font-mono text-rose-600 font-bold">4 / 5</td>
                  <td className="py-3 px-3 text-slate-700">Student trust, support overhead</td>
                  <td className="py-3 px-3 font-medium text-emerald-700">Low (Webhook Automation)</td>
                  <td className="py-3 px-3"><span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold">Priority 1</span></td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-bold text-slate-900">Zero student onboarding / LMS confusion</td>
                  <td className="py-3 px-3 font-mono">60 tickets</td>
                  <td className="py-3 px-3 font-mono text-rose-600 font-bold">5 / 5</td>
                  <td className="py-3 px-3 text-slate-700">Early dropout rate climbs to 14%</td>
                  <td className="py-3 px-3 font-medium text-emerald-700">Low (30-min live session)</td>
                  <td className="py-3 px-3"><span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">Priority 2</span></td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-bold text-slate-900">Placement guidance starts too late</td>
                  <td className="py-3 px-3 font-mono">40 tickets</td>
                  <td className="py-3 px-3 font-mono text-amber-600 font-bold">4 / 5</td>
                  <td className="py-3 px-3 text-slate-700">Placement rate, alumni NPS</td>
                  <td className="py-3 px-3 font-medium text-slate-700">Medium (Process redesign)</td>
                  <td className="py-3 px-3"><span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">Priority 3</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
