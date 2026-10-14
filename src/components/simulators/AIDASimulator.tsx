import { useState } from 'react';
import { Sparkles, RotateCcw, AlertTriangle, CheckCircle2, MessageSquare, ArrowRight, BookOpen, Layers } from 'lucide-react';

interface AidaMessage {
  attention: string;
  interest: string;
  desire: string;
  action: string;
  proofType: string;
  format: 'email' | 'landing_page' | 'social_post' | 'sales_script';
}

export function AIDASimulator() {
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'scorecard'>('editor');

  const [message, setMessage] = useState<AidaMessage>({
    attention: 'Final-year student? 70% of graduates fail the first aptitude interview round.',
    interest: 'It is rarely a lack of intelligence — it is speed under pressure in the campus testing hall when 50 questions must be solved in 40 minutes.',
    desire: 'Placement Pro has trained 800+ students from 60 Tamil Nadu colleges with average starting packages of ₹4.5–₹9.0 LPA. Includes 20 timed mock drills and our "Clear Round 1 or Retrain Free" guarantee.',
    action: 'Reply YES to this WhatsApp to book your free 15-minute diagnostic test before Sunday midnight.',
    proofType: 'Verified alumni placement metrics & retrain guarantee',
    format: 'email'
  });

  const [attentionScore, setAttentionScore] = useState(4);
  const [interestScore, setInterestScore] = useState(4);
  const [desireScore, setDesireScore] = useState(5);
  const [actionScore, setActionScore] = useState(4);

  const handleLoadPlacementProCase = () => {
    setMessage({
      attention: 'The first campus interview round rejects 70% of applicants — here is the real reason why.',
      interest: 'You have studied 4 years of engineering, but campus recruiters filter 1,000 resumes down to 50 in a single 45-minute timed aptitude test. Most students panic on time management, not technical concepts.',
      desire: 'Placement Pro students achieved an 84% first-round clear rate in 2026 across TCS, Zoho, and Cognizant drives. Karthik (ECE, Thiagarajar) jumped from 3 rejections to a ₹7.2 LPA offer after our 4-week drill. Backed by our full "Clear Round 1 or Retrain 100% Free" pledge.',
      action: 'Click below to claim 1 of 20 subsidized assessment slots for your college this week.',
      proofType: 'Named alumni case + salary range + risk-reversal guarantee',
      format: 'email'
    });
    setAttentionScore(5);
    setInterestScore(5);
    setDesireScore(5);
    setActionScore(4);
  };

  const handleResetToBaseline = () => {
    setMessage({
      attention: 'Announcement: Career Training Programme Available Now',
      interest: 'We provide comprehensive aptitude classes with modern syllabus and air conditioned classrooms.',
      desire: 'Our curriculum covers quantitative aptitude, verbal reasoning, and soft skills with expert faculty.',
      action: 'Visit our website, call our branch, download our brochure, or email admissions.',
      proofType: 'None',
      format: 'landing_page'
    });
    setAttentionScore(2);
    setInterestScore(2);
    setDesireScore(2);
    setActionScore(1);
  };

  const totalScore = attentionScore + interestScore + desireScore + actionScore;

  // Friction alerts
  const warnings: string[] = [];
  if (message.action.toLowerCase().includes('and') || message.action.toLowerCase().includes('or')) {
    warnings.push('Action Warning: Multiple competing instructions detected. Single-minded focus yields higher conversion.');
  }
  if (!message.desire.toLowerCase().includes('guarantee') && !message.desire.toLowerCase().includes('%') && !message.desire.toLowerCase().includes('proof')) {
    warnings.push('Desire Advisory: No verifiable data, percentage, or risk-reversal guarantee found in Desire stage.');
  }
  if (message.attention.length > 120) {
    warnings.push('Attention Advisory: Opening hook is too long. Keep subject lines and headlines under 80 characters.');
  }

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 mb-2">
              <MessageSquare className="w-3.5 h-3.5" /> E. St. Elmo Lewis Persuasive Communication Framework
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              AIDA Model Copywriting & Message Diagnostic Studio
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-3xl">
              Engineer high-converting marketing campaigns, cold outreach emails, landing pages, and sales scripts stage-by-stage.
              Eliminate friction and score messaging against the 4-part conversion rubric.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleLoadPlacementProCase}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-600 text-white hover:bg-amber-700 shadow-sm transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" /> Load Placement Pro Case
            </button>
            <button
              onClick={handleResetToBaseline}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </div>

        {/* Tab Switcher & Score Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100 pt-4 mt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'editor' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              1. AIDA Stage Editor
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'preview' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              2. Live Message Preview
            </button>
            <button
              onClick={() => setActiveTab('scorecard')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'scorecard' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              3. Diagnostic Scorecard ({totalScore}/20)
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Format:</span>
            {(['email', 'landing_page', 'social_post', 'sales_script'] as const).map(f => (
              <button
                key={f}
                onClick={() => setMessage({ ...message, format: f })}
                className={`px-2.5 py-1 rounded text-2xs font-bold uppercase tracking-wider transition-colors ${
                  message.format === f ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {f.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* TAB 1: AIDA STAGE EDITOR */}
      {activeTab === 'editor' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Attention Stage */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">A · Attention (The Hook)</span>
              <span className="text-[11px] text-slate-400">Headline, Subject Line, First 3 Seconds</span>
            </div>
            <textarea
              value={message.attention}
              onChange={(e) => setMessage({ ...message, attention: e.target.value })}
              rows={3}
              className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-amber-500 text-slate-900 font-medium"
              placeholder="Stop the target reader: name their urgent fear, surprising fact, or immediate goal..."
            />
            <p className="text-[11px] text-slate-500">
              Char count: {message.attention.length} | Rule: Attention is wasted if it attracts curiosity seekers instead of buyers.
            </p>
          </div>

          {/* Interest Stage */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">I · Interest (Relevance & Stakes)</span>
              <span className="text-[11px] text-slate-400">The Customer's Reality in Their Words</span>
            </div>
            <textarea
              value={message.interest}
              onChange={(e) => setMessage({ ...message, interest: e.target.value })}
              rows={3}
              className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-amber-500 text-slate-900"
              placeholder="Show you understand their situation, raise the stakes, and describe the painful struggling moment..."
            />
            <p className="text-[11px] text-slate-500">
              Rule: Specifics beat vague adjectives. Describe the exact campus or office moment they recognize.
            </p>
          </div>

          {/* Desire Stage */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">D · Desire (Benefits + Proof + Guarantee)</span>
              <span className="text-[11px] text-slate-400">Social Proof, Metrics, Risk Reversal</span>
            </div>
            <textarea
              value={message.desire}
              onChange={(e) => setMessage({ ...message, desire: e.target.value })}
              rows={4}
              className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-amber-500 text-slate-900"
              placeholder="Translate features into tangible outcomes. Include client metrics, named testimonials, and guarantees..."
            />
            <p className="text-[11px] text-slate-500">
              Rule: Handle the top objection right here (price, time commitment, or fear of failure).
            </p>
          </div>

          {/* Action Stage */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">A · Action (Frictionless CTA)</span>
              <span className="text-[11px] text-slate-400">One Clear Instruction + Exact Next Step</span>
            </div>
            <textarea
              value={message.action}
              onChange={(e) => setMessage({ ...message, action: e.target.value })}
              rows={4}
              className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-amber-500 text-slate-900 font-medium"
              placeholder="Tell them exactly what to do and what happens next (e.g. 'Reply YES for a 10-min phone call')..."
            />
            <p className="text-[11px] text-slate-500">
              Rule: Single CTA only. Remove all competing secondary links or extra form fields.
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: LIVE MESSAGE PREVIEW */}
      {activeTab === 'preview' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="text-xs font-bold text-slate-600 ml-2 uppercase">
                Rendered {message.format.replace('_', ' ')} View
              </span>
            </div>
            <span className="text-xs text-slate-400">Total Words: {`${message.attention} ${message.interest} ${message.desire} ${message.action}`.split(' ').length}</span>
          </div>

          <div className="max-w-2xl mx-auto p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-5 shadow-inner">
            {/* Attention Preview */}
            <div className="border-l-4 border-amber-500 pl-4 py-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block mb-0.5">Headline / Attention Hook</span>
              <h3 className="text-lg font-bold text-slate-900 leading-snug">{message.attention}</h3>
            </div>

            {/* Interest Preview */}
            <div className="border-l-4 border-blue-500 pl-4 py-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block mb-0.5">Problem Context / Interest</span>
              <p className="text-xs text-slate-700 leading-relaxed">{message.interest}</p>
            </div>

            {/* Desire Preview */}
            <div className="border-l-4 border-emerald-500 pl-4 py-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block mb-0.5">Value Proposition & Proof / Desire</span>
              <p className="text-xs text-slate-800 leading-relaxed font-medium">{message.desire}</p>
            </div>

            {/* Action Preview */}
            <div className="pt-2 flex flex-col items-start gap-2">
              <button className="px-5 py-2.5 rounded-lg bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 shadow-md transition-transform active:scale-95">
                {message.action}
              </button>
              <span className="text-[11px] text-slate-400">Zero spam · Unsubscribe anytime</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DIAGNOSTIC SCORECARD */}
      {activeTab === 'scorecard' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">AIDA Diagnostic Scorecard (Rubric 1–5 per Stage)</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Benchmark each stage of your draft. The lowest-scoring stage is where your conversion is currently bleeding.
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider block">Overall AIDA Power</span>
              <span className={`text-xl font-extrabold font-mono ${totalScore >= 16 ? 'text-emerald-700' : 'text-amber-600'}`}>
                {totalScore} / 20 pts
              </span>
            </div>
          </div>

          {warnings.length > 0 && (
            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50 space-y-2">
              <div className="text-xs font-bold text-amber-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-700" /> Copywriting Friction Detected:
              </div>
              <ul className="text-xs text-amber-800 space-y-1 list-disc list-inside">
                {warnings.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Attention score */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>Attention Stage (Hook)</span>
                <span className="font-mono text-amber-700 font-extrabold">{attentionScore} / 5</span>
              </div>
              <p className="text-slate-500 text-[11px]">Does the headline stop the right reader and name their problem?</p>
              <input
                type="range"
                min="1"
                max="5"
                value={attentionScore}
                onChange={(e) => setAttentionScore(Number(e.target.value))}
                className="w-full accent-amber-600"
              />
            </div>

            {/* Interest score */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>Interest Stage (Problem)</span>
                <span className="font-mono text-amber-700 font-extrabold">{interestScore} / 5</span>
              </div>
              <p className="text-slate-500 text-[11px]">Does the body describe the customer’s struggling moment in their own words?</p>
              <input
                type="range"
                min="1"
                max="5"
                value={interestScore}
                onChange={(e) => setInterestScore(Number(e.target.value))}
                className="w-full accent-amber-600"
              />
            </div>

            {/* Desire score */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>Desire Stage (Proof)</span>
                <span className="font-mono text-amber-700 font-extrabold">{desireScore} / 5</span>
              </div>
              <p className="text-slate-500 text-[11px]">Are benefits supported by verifiable numbers, alumni names, or guarantees?</p>
              <input
                type="range"
                min="1"
                max="5"
                value={desireScore}
                onChange={(e) => setDesireScore(Number(e.target.value))}
                className="w-full accent-amber-600"
              />
            </div>

            {/* Action score */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>Action Stage (Friction)</span>
                <span className="font-mono text-amber-700 font-extrabold">{actionScore} / 5</span>
              </div>
              <p className="text-slate-500 text-[11px]">Is there one clear, low-friction next step explaining what happens next?</p>
              <input
                type="range"
                min="1"
                max="5"
                value={actionScore}
                onChange={(e) => setActionScore(Number(e.target.value))}
                className="w-full accent-amber-600"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
