import { useState } from 'react';
import { Plus, Trash2, CheckCircle2, AlertCircle, Sparkles, RotateCcw, Lightbulb, Users, Compass, Wrench, MessageSquare } from 'lucide-react';

interface DtIdea {
  id: string;
  category: 'wayfinding' | 'communication' | 'luggage' | 'onboard';
  text: string;
  votes: number;
}

interface FeedbackGridItem {
  id: string;
  type: 'worked' | 'notWorked' | 'question' | 'idea';
  text: string;
}

const PANDIAN_IDEAS: DtIdea[] = [
  { id: 'i1', category: 'communication', text: 'Automated WhatsApp message with bus live location pin & driver contact', votes: 12 },
  { id: 'i2', category: 'wayfinding', text: 'Illuminated solar LED boarding landmark pole sign visible at night', votes: 9 },
  { id: 'i3', category: 'luggage', text: 'Numbered luggage security tags physically paired with passenger seat number', votes: 14 },
  { id: 'i4', category: 'onboard', text: 'Conductor verbal greeting script and first-time passenger orientation', votes: 8 },
  { id: 'i5', category: 'wayfinding', text: 'Painted street stencil marker on pavement (failed night visibility in test)', votes: 2 }
];

const PANDIAN_FEEDBACK: FeedbackGridItem[] = [
  { id: 'fb1', type: 'worked', text: 'Live location message reduced anxiety dramatically; 31 of 40 passengers said they felt relaxed' },
  { id: 'fb2', type: 'worked', text: 'Numbered luggage tag completely eliminated mistaken suitcase retrieval in Chennai terminal' },
  { id: 'fb3', type: 'notWorked', text: 'Painted street marker on asphalt was completely invisible in the dark without streetlights' },
  { id: 'fb4', type: 'question', text: 'Will the WhatsApp live location link open properly on basic low-cost feature phones?' },
  { id: 'fb5', type: 'idea', text: 'Send the confirmation WhatsApp message in Tamil with an automated 20-second voice note' }
];

export function DesignThinkingSimulator() {
  const [activeStage, setActiveStage] = useState<'empathise' | 'define' | 'ideate' | 'prototype' | 'test'>('define');
  const [ideas, setIdeas] = useState<DtIdea[]>(PANDIAN_IDEAS);
  const [feedback, setFeedback] = useState<FeedbackGridItem[]>(PANDIAN_FEEDBACK);

  // POV Inputs
  const [userRole, setUserRole] = useState('A first-time passenger travelling at night');
  const [userNeed, setUserNeed] = useState('to know exactly where to stand and that the bus will wait');
  const [userInsight, setUserInsight] = useState('the psychological fear of missing the bus is worse than the journey discomfort itself');

  // HMW Input
  const [hmwList, setHmwList] = useState<string[]>([
    'How might we assure passengers their bus hasn’t left before they arrive?',
    'How might we make dark highway boarding points unmistakable from 100 meters away?',
    'How might we eliminate luggage anxiety so passengers sleep peacefully on board?'
  ]);
  const [newHmw, setNewHmw] = useState('');

  // New Idea Input
  const [newIdeaText, setNewIdeaText] = useState('');
  const [newIdeaCat, setNewIdeaCat] = useState<DtIdea['category']>('communication');

  // New Feedback Input
  const [newFbText, setNewFbText] = useState('');
  const [newFbType, setNewFbType] = useState<FeedbackGridItem['type']>('worked');

  const handleAddHmw = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHmw.trim()) return;
    setHmwList(prev => [...prev, newHmw.trim()]);
    setNewHmw('');
  };

  const handleAddIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIdeaText.trim()) return;
    setIdeas(prev => [...prev, { id: Date.now().toString(), category: newIdeaCat, text: newIdeaText.trim(), votes: 1 }]);
    setNewIdeaText('');
  };

  const handleUpvote = (id: string) => {
    setIdeas(prev => prev.map(i => i.id === id ? { ...i, votes: i.votes + 1 } : i));
  };

  const handleAddFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFbText.trim()) return;
    setFeedback(prev => [...prev, { id: Date.now().toString(), type: newFbType, text: newFbText.trim() }]);
    setNewFbText('');
  };

  const stages = [
    { id: 'empathise', label: '1. Empathise', icon: Users, desc: 'Field observation & shadowing' },
    { id: 'define', label: '2. Define', icon: Compass, desc: 'POV & How Might We' },
    { id: 'ideate', label: '3. Ideate', icon: Lightbulb, desc: 'Crazy 8s & dot-voting' },
    { id: 'prototype', label: '4. Prototype', icon: Wrench, desc: 'Low-fidelity ladder' },
    { id: 'test', label: '5. Test', icon: MessageSquare, desc: 'Feedback capture grid' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <span>Human-Centred Innovation</span>
            <span>·</span>
            <span>Stanford d.school & IDEO</span>
            <span>·</span>
            <span>5-Stage Iterative Loop</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Design Thinking Sprint & Prototyping Studio</h3>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Solve ambiguous, high-friction service problems by observing users in context, formulating Point-of-View statements, and testing low-fidelity prototypes in hours.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              setIdeas(PANDIAN_IDEAS);
              setFeedback(PANDIAN_FEEDBACK);
            }}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Load Pandian Transport Case
          </button>
          <button
            onClick={() => {
              setIdeas([]);
              setFeedback([]);
            }}
            className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 bg-white border border-slate-200 rounded-lg transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* 5-Stage Step Controller */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {stages.map((s) => {
          const Icon = s.icon;
          const isActive = activeStage === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActiveStage(s.id as any)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isActive
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span className="text-xs font-bold whitespace-nowrap">{s.label}</span>
              </div>
              <span className="text-2xs opacity-80 block truncate">{s.desc}</span>
            </button>
          );
        })}
      </div>

      {/* STAGE 1: EMPATHISE */}
      {activeStage === 'empathise' && (
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
          <div className="pb-2 border-b border-slate-100">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Stage 1: Empathise (Direct Field Contact)
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Observe and shadow real users in context. Never rely on second-hand office assumptions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="font-bold text-slate-900 uppercase text-2xs block">Observation Method</span>
              <p className="text-slate-700 leading-relaxed">
                8 staff members rode buses at night in pairs: one observed boarding confusion in the dark while the other took notes and photos.
              </p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="font-bold text-slate-900 uppercase text-2xs block">Verbatim User Quotes</span>
              <p className="text-slate-700 italic leading-relaxed">
                "The ticket says 'Near bypass bridge', but there are three bridges and no lights. I was terrified the bus left without me."
              </p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="font-bold text-slate-900 uppercase text-2xs block">Emotional Journey Dip</span>
              <p className="text-slate-700 leading-relaxed">
                Peak anxiety occurred between 10:45 PM and 11:15 PM while standing on the roadside in total darkness waiting for arrival.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 2: DEFINE */}
      {activeStage === 'define' && (
        <div className="space-y-6">
          {/* POV Synthesis Formula */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
            <div className="pb-2 border-b border-slate-100">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Stage 2: Point-of-View (POV) Problem Synthesis
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Formula: [User] needs [Need] because [Surprising Insight from Empathy]
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target User</label>
                <input
                  type="text"
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Human Need (Verb / Experience)</label>
                <input
                  type="text"
                  value={userNeed}
                  onChange={(e) => setUserNeed(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Surprising Emotional Insight</label>
                <input
                  type="text"
                  value={userInsight}
                  onChange={(e) => setUserInsight(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 font-medium"
                />
              </div>

              <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-950 font-medium">
                <span className="font-bold">Synthesized POV: </span>
                "{userRole} needs {userNeed} because {userInsight}."
              </div>
            </div>
          </div>

          {/* HMW Question Generator */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wide block">
              "How Might We" (HMW) Creative Opportunities
            </span>

            <form onSubmit={handleAddHmw} className="flex gap-2">
              <input
                type="text"
                placeholder="How might we make..."
                value={newHmw}
                onChange={(e) => setNewHmw(e.target.value)}
                className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
              >
                + Add HMW
              </button>
            </form>

            <div className="space-y-2">
              {hmwList.map((hmw, i) => (
                <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 flex items-center justify-between">
                  <span>💡 {hmw}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STAGE 3: IDEATE */}
      {activeStage === 'ideate' && (
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
          <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Stage 3: Ideation & Dot-Voting
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">Defer judgment, go for quantity (aim for 50+), then dot-vote top solutions.</p>
            </div>
            <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-1 rounded">
              Total Ideas: {ideas.length}
            </span>
          </div>

          {/* Add Idea */}
          <form onSubmit={handleAddIdea} className="flex gap-2">
            <select
              value={newIdeaCat}
              onChange={(e) => setNewIdeaCat(e.target.value as any)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-2 text-slate-800"
            >
              <option value="communication">Communication</option>
              <option value="wayfinding">Wayfinding</option>
              <option value="luggage">Luggage</option>
              <option value="onboard">Onboard</option>
            </select>
            <input
              type="text"
              placeholder="Describe creative solution..."
              value={newIdeaText}
              onChange={(e) => setNewIdeaText(e.target.value)}
              className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
            />
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
            >
              + Add Idea
            </button>
          </form>

          {/* Ideas List */}
          <div className="space-y-2">
            {[...ideas].sort((a, b) => b.votes - a.votes).map(idea => (
              <div key={idea.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-2xs font-bold bg-slate-200 text-slate-700 uppercase rounded">
                    {idea.category}
                  </span>
                  <span className="font-semibold text-slate-900">{idea.text}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleUpvote(idea.id)}
                    className="px-2 py-1 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 rounded text-2xs font-bold flex items-center gap-1"
                  >
                    <span>▲ Dot-Vote</span>
                    <span className="font-mono text-slate-900 tabular-nums">({idea.votes})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STAGE 4: PROTOTYPE */}
      {activeStage === 'prototype' && (
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
          <div className="pb-2 border-b border-slate-100">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Stage 4: Prototype Fidelity Ladder
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Rule from IDEO: "If a picture is worth 1,000 words, a prototype is worth 1,000 meetings." Cap construction at 1 day.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="px-2 py-0.5 text-2xs font-bold bg-slate-200 text-slate-800 rounded">Level 1 (Minutes)</span>
              <h5 className="font-bold text-slate-900 mt-1">Sketch / Storyboard</h5>
              <p className="text-slate-600">Hand-drawn paper comic strip showing passenger receiving WhatsApp message upon boarding.</p>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="px-2 py-0.5 text-2xs font-bold bg-blue-100 text-blue-800 rounded">Level 2 (Hours)</span>
              <h5 className="font-bold text-slate-900 mt-1">Paper Mock & Roleplay</h5>
              <p className="text-slate-600">Physical cardboard numbered tags stapled to luggage, tested by staff acting out conductor greetings.</p>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="px-2 py-0.5 text-2xs font-bold bg-purple-100 text-purple-800 rounded">Level 3 (1 Day)</span>
              <h5 className="font-bold text-slate-900 mt-1">Working WhatsApp Pilot</h5>
              <p className="text-slate-600">Manual live location pin dispatched from driver’s real phone to 40 passengers on evening coach.</p>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="px-2 py-0.5 text-2xs font-bold bg-emerald-100 text-emerald-800 rounded">Level 4 (Weeks)</span>
              <h5 className="font-bold text-slate-900 mt-1">Live Corridor Rollout</h5>
              <p className="text-slate-600">Automated dispatch server integrated with booking tickets across all 60 buses.</p>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 5: TEST */}
      {activeStage === 'test' && (
        <div className="space-y-4">
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
            <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Stage 5: Test (Feedback Capture Grid)
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">Capture real user reactions across four quadrants. Never defend your prototype during testing!</p>
              </div>
            </div>

            {/* Add Feedback Item */}
            <form onSubmit={handleAddFeedback} className="flex gap-2">
              <select
                value={newFbType}
                onChange={(e) => setNewFbType(e.target.value as any)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-2 text-slate-800"
              >
                <option value="worked">+ What Worked</option>
                <option value="notWorked">− What Did Not</option>
                <option value="question">? Questions Raised</option>
                <option value="idea">💡 New Ideas</option>
              </select>
              <input
                type="text"
                placeholder="User quote or observed reaction..."
                value={newFbText}
                onChange={(e) => setNewFbText(e.target.value)}
                className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
              />
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
              >
                + Log Feedback
              </button>
            </form>

            {/* 4-Quadrant Feedback Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* What Worked */}
              <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-2">
                <span className="text-xs font-bold text-emerald-900 uppercase tracking-wide block">+ What Worked</span>
                <div className="space-y-1.5">
                  {feedback.filter(f => f.type === 'worked').map(f => (
                    <div key={f.id} className="p-2 bg-white rounded border border-emerald-200 text-xs text-slate-800 font-medium">
                      {f.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* What Did Not */}
              <div className="p-4 bg-rose-50/50 border border-rose-200 rounded-xl space-y-2">
                <span className="text-xs font-bold text-rose-900 uppercase tracking-wide block">− What Did Not Work</span>
                <div className="space-y-1.5">
                  {feedback.filter(f => f.type === 'notWorked').map(f => (
                    <div key={f.id} className="p-2 bg-white rounded border border-rose-200 text-xs text-slate-800 font-medium">
                      {f.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Questions Raised */}
              <div className="p-4 bg-blue-50/50 border border-blue-200 rounded-xl space-y-2">
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wide block">? Questions Raised</span>
                <div className="space-y-1.5">
                  {feedback.filter(f => f.type === 'question').map(f => (
                    <div key={f.id} className="p-2 bg-white rounded border border-blue-200 text-xs text-slate-800 font-medium">
                      {f.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* New Ideas */}
              <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-xl space-y-2">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wide block">💡 New Ideas Triggered</span>
                <div className="space-y-1.5">
                  {feedback.filter(f => f.type === 'idea').map(f => (
                    <div key={f.id} className="p-2 bg-white rounded border border-amber-200 text-xs text-slate-800 font-medium">
                      {f.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
