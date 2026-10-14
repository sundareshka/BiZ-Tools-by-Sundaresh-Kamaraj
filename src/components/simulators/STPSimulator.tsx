import { useState } from 'react';
import { Target, Sparkles, RotateCcw, CheckCircle2, ArrowRight, Layers, HelpCircle, Compass } from 'lucide-react';

interface CandidateSegment {
  id: string;
  name: string;
  profile: string;
  size: number; // 1-5
  growth: number; // 1-5
  margin: number; // 1-5
  competition: number; // 1-5 (5 = low competition, favorable)
  accessibility: number; // 1-5
  fit: number; // 1-5
}

export function STPSimulator() {
  const [activeStep, setActiveStep] = useState<'segment' | 'target' | 'position'>('target');

  // Candidate segments
  const [segments, setSegments] = useState<CandidateSegment[]>([
    {
      id: 'seg-1',
      name: 'Busy Urban Dual-Income Families',
      profile: 'Parents 28–40, household income ₹8–20 lakh, wanting authentic home taste in <15 mins',
      size: 3,
      growth: 4,
      margin: 5,
      competition: 4,
      accessibility: 4,
      fit: 5
    },
    {
      id: 'seg-2',
      name: 'Hostel & PG Students',
      profile: 'College students seeking cheap, filling breakfast food under ₹25 per meal',
      size: 5,
      growth: 3,
      margin: 2,
      competition: 1,
      accessibility: 3,
      fit: 3
    },
    {
      id: 'seg-3',
      name: 'Senior Citizens & Diabetics',
      profile: 'Health-conscious seniors needing traditional millet and low-glycemic breakfast varieties',
      size: 2,
      growth: 5,
      margin: 4,
      competition: 3,
      accessibility: 3,
      fit: 4
    }
  ]);

  const [selectedTargetId, setSelectedTargetId] = useState<string>('seg-1');

  // Positioning statement parts
  const [targetDesc, setTargetDesc] = useState('busy dual-income families who refuse to compromise on home-style taste');
  const [brandName, setBrandName] = useState('Suvai Foods');
  const [categoryName, setCategoryName] = useState('ready-to-cook breakfast mix');
  const [pointOfDiff, setPointOfDiff] = useState('tastes like traditional amma’s kitchen');
  const [proofPoint, setProofPoint] = useState('it uses slow stone-ground batter with zero artificial preservatives');
  const [alternative, setAlternative] = useState('conglomerate instant mixes');
  const [contrastPoint, setContrastPoint] = useState('preserve authentic fermentation texture instead of powdery starch');

  // Perceptual map coordinates (-10 to +10)
  const [axisXLabel, setAxisXLabel] = useState('Preparation Convenience');
  const [axisYLabel, setAxisYLabel] = useState('Authentic Stone-Ground Taste');
  const [competitors, setCompetitors] = useState([
    { name: 'National Conglomerate A', x: 8, y: -5, color: 'bg-rose-500' },
    { name: 'Regional Cheap Brand B', x: -6, y: -7, color: 'bg-amber-500' },
    { name: 'Local Wet Batter Grinder', x: -5, y: 7, color: 'bg-indigo-500' },
    { name: 'Suvai Foods (Target)', x: 7, y: 8, color: 'bg-emerald-600' }
  ]);

  const handleLoadSuvaiCase = () => {
    setSegments([
      {
        id: 'seg-1',
        name: 'Busy Urban Dual-Income Families',
        profile: 'Parents 28–40 in Tier-1 & Tier-2 cities wanting authentic taste in under 15 minutes',
        size: 3,
        growth: 4,
        margin: 5,
        competition: 4,
        accessibility: 4,
        fit: 5
      },
      {
        id: 'seg-2',
        name: 'Hostel & PG Students',
        profile: 'Students seeking cheap, filling breakfast; heavily contested by national commodity mixes',
        size: 5,
        growth: 3,
        margin: 2,
        competition: 1,
        accessibility: 3,
        fit: 3
      },
      {
        id: 'seg-3',
        name: 'Health-Conscious Elders',
        profile: 'Seniors seeking organic ragi and millet traditional breakfast batters',
        size: 2,
        growth: 4,
        margin: 4,
        competition: 3,
        accessibility: 3,
        fit: 4
      }
    ]);
    setSelectedTargetId('seg-1');
    setTargetDesc('busy families who refuse to compromise on home-style taste');
    setBrandName('Suvai');
    setCategoryName('breakfast mix');
    setPointOfDiff('tastes like amma’s kitchen');
    setProofPoint('it uses stone-ground batter and no preservatives');
    setAlternative('mass packaged factory mixes');
    setContrastPoint('deliver fresh fermentation texture with 10-minute pan convenience');
  };

  const handleResetToGeneric = () => {
    setTargetDesc('[target segment with explicit urgent need]');
    setBrandName('[Brand Name]');
    setCategoryName('[Frame of reference category]');
    setPointOfDiff('[Primary point of difference]');
    setProofPoint('[Verifiable reason to believe / proof]');
    setAlternative('[Main substitute or incumbent]');
    setContrastPoint('[How we contrast and deliver superior value]');
  };

  // Weighted targeting score calculation:
  // Weightings: Size (15%), Growth (20%), Margin (25%), Low Competition (15%), Accessibility (10%), Fit (15%)
  const calculateScore = (s: CandidateSegment) => {
    const raw = (s.size * 0.15) + (s.growth * 0.20) + (s.margin * 0.25) + (s.competition * 0.15) + (s.accessibility * 0.10) + (s.fit * 0.15);
    return Number(raw.toFixed(2));
  };

  const selectedTarget = segments.find(s => s.id === selectedTargetId) || segments[0];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
              <Compass className="w-3.5 h-3.5" /> Kotler & Ries/Trout Strategic Marketing Sequence
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              STP Model (Segmentation, Targeting, Positioning) Simulator
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-3xl">
              Divide total addressable market by needs-based variables, evaluate target segments using a weighted attractiveness scorecard, and formulate a defensible positioning statement and perceptual map.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleLoadSuvaiCase}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" /> Load Suvai Foods Case
            </button>
            <button
              onClick={handleResetToGeneric}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </div>

        {/* 3 Steps Pipeline Tabs */}
        <div className="grid grid-cols-3 gap-2 mt-6 pt-2 border-t border-slate-100">
          <button
            onClick={() => setActiveStep('segment')}
            className={`p-3 rounded-lg border text-left transition-all ${
              activeStep === 'segment'
                ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                : 'border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Step 1</div>
            <div className="text-xs font-bold text-slate-900 mt-0.5">Segmentation (Divide)</div>
          </button>

          <button
            onClick={() => setActiveStep('target')}
            className={`p-3 rounded-lg border text-left transition-all ${
              activeStep === 'target'
                ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                : 'border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Step 2</div>
            <div className="text-xs font-bold text-slate-900 mt-0.5">Targeting (Scorecard)</div>
          </button>

          <button
            onClick={() => setActiveStep('position')}
            className={`p-3 rounded-lg border text-left transition-all ${
              activeStep === 'position'
                ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                : 'border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Step 3</div>
            <div className="text-xs font-bold text-slate-900 mt-0.5">Positioning & Map</div>
          </button>
        </div>
      </div>

      {/* STEP 1: SEGMENTATION */}
      {activeStep === 'segment' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-5">
          <div>
            <h3 className="text-base font-bold text-slate-900">Step 1: Divide Market by Needs & Behaviors</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Rule: Group customers by the outcome or benefit they seek, then decorate with demographic attributes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {segments.map((s, idx) => (
              <div key={s.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-2xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                    Segment #{idx + 1}
                  </span>
                  <span className="text-xs font-bold text-emerald-700">Score: {calculateScore(s)} / 5.0</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">{s.name}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{s.profile}</p>

                <div className="pt-2 border-t border-slate-200/80 text-[11px] text-slate-500 space-y-1">
                  <div><strong>Kotler 5-Criteria:</strong> Measurable, Substantial, Accessible, Differentiable, Actionable</div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-xs text-emerald-900 flex items-center justify-between">
            <span>Ready to evaluate which segment delivers the highest margin and strategic fit?</span>
            <button
              onClick={() => setActiveStep('target')}
              className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white font-bold hover:bg-emerald-800 transition-colors flex items-center gap-1.5"
            >
              Go to Step 2: Targeting Scorecard <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: TARGETING SCORECARD */}
      {activeStep === 'target' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Step 2: Weighted Targeting Attractiveness Scorecard</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Score each candidate segment (1–5). The model weights Margin (25%), Growth (20%), and Capability Fit (15%).
              </p>
            </div>
            <div className="text-xs font-bold text-slate-700">
              Selected Target: <span className="text-emerald-700 font-extrabold">{selectedTarget.name}</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-y border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                  <th className="py-2.5 px-3">Segment Name</th>
                  <th className="py-2.5 px-2">Size (15%)</th>
                  <th className="py-2.5 px-2">Growth (20%)</th>
                  <th className="py-2.5 px-2">Margin (25%)</th>
                  <th className="py-2.5 px-2">Low Rivalry (15%)</th>
                  <th className="py-2.5 px-2">Access (10%)</th>
                  <th className="py-2.5 px-2">Fit (15%)</th>
                  <th className="py-2.5 px-3">Weighted Total</th>
                  <th className="py-2.5 px-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {segments.map(s => {
                  const score = calculateScore(s);
                  const isChosen = s.id === selectedTargetId;
                  return (
                    <tr key={s.id} className={isChosen ? 'bg-emerald-50/60 font-semibold' : 'hover:bg-slate-50'}>
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-900">{s.name}</div>
                        <div className="text-2xs text-slate-500 truncate max-w-xs">{s.profile}</div>
                      </td>
                      <td className="py-3 px-2 font-mono">{s.size}</td>
                      <td className="py-3 px-2 font-mono">{s.growth}</td>
                      <td className="py-3 px-2 font-mono text-emerald-700 font-bold">{s.margin}</td>
                      <td className="py-3 px-2 font-mono">{s.competition}</td>
                      <td className="py-3 px-2 font-mono">{s.accessibility}</td>
                      <td className="py-3 px-2 font-mono">{s.fit}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-white border border-slate-200 text-slate-900 shadow-2xs">
                          {score} / 5.0
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <button
                          onClick={() => setSelectedTargetId(s.id)}
                          className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                            isChosen
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {isChosen ? 'Selected Target' : 'Select'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-500">
              Highest scoring segment gets primary marketing budget and focused positioning.
            </span>
            <button
              onClick={() => setActiveStep('position')}
              className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            >
              Draft Positioning Statement & Map <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: POSITIONING STATEMENT & PERCEPTUAL MAP */}
      {activeStep === 'position' && (
        <div className="space-y-6">
          {/* Statement Builder */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Step 3A: Formal One-Sentence Positioning Statement</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                The universal internal anchor for sales scripts, agency briefs, and product roadmaps.
              </p>
            </div>

            {/* Live Rendered Statement */}
            <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/40 text-slate-900 text-sm leading-relaxed font-medium">
              "For <span className="underline decoration-emerald-500 font-bold">{targetDesc}</span>,{' '}
              <span className="underline decoration-emerald-500 font-bold">{brandName}</span> is the{' '}
              <span className="underline decoration-emerald-500 font-bold">{categoryName}</span> that{' '}
              <span className="underline decoration-emerald-500 font-bold">{pointOfDiff}</span> because{' '}
              <span className="underline decoration-emerald-500 font-bold">{proofPoint}</span>. Unlike{' '}
              <span className="underline decoration-slate-400 font-semibold">{alternative}</span>, we{' '}
              <span className="underline decoration-slate-400 font-semibold">{contrastPoint}</span>."
            </div>

            {/* Editable Form Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-2">
              <div>
                <label className="font-semibold text-slate-600 block mb-1">Target Segment with Need:</label>
                <input
                  type="text"
                  value={targetDesc}
                  onChange={(e) => setTargetDesc(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-200"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-600 block mb-1">Brand Name:</label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-200"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-600 block mb-1">Frame of Reference (Category):</label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-200"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-600 block mb-1">Point of Difference (Primary Benefit):</label>
                <input
                  type="text"
                  value={pointOfDiff}
                  onChange={(e) => setPointOfDiff(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-200"
                />
              </div>

              <div className="md:col-span-2">
                <label className="font-semibold text-slate-600 block mb-1">Reason to Believe (Proof Asset):</label>
                <input
                  type="text"
                  value={proofPoint}
                  onChange={(e) => setProofPoint(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-200"
                />
              </div>
            </div>
          </div>

          {/* Perceptual Map Visualizer */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Step 3B: Two-Axis Competitive Perceptual Map</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Visualizes competitor brand clusters and validates whether your chosen quadrant is differentiated.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-slate-600">X-Axis: {axisXLabel}</span> ·
                <span className="font-semibold text-slate-600">Y-Axis: {axisYLabel}</span>
              </div>
            </div>

            {/* SVG Visual Perceptual Chart */}
            <div className="relative w-full h-80 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center p-6">
              {/* Axes lines */}
              <div className="absolute inset-x-8 top-1/2 h-px bg-slate-300" />
              <div className="absolute inset-y-8 left-1/2 w-px bg-slate-300" />

              {/* Axis labels */}
              <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[11px] font-bold text-slate-600 uppercase tracking-wider bg-white/90 px-2 py-0.5 rounded border border-slate-200">
                + {axisYLabel}
              </span>
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-white/90 px-2 py-0.5 rounded border border-slate-200">
                - {axisYLabel}
              </span>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-slate-600 uppercase tracking-wider bg-white/90 px-2 py-0.5 rounded border border-slate-200">
                + {axisXLabel}
              </span>
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-white/90 px-2 py-0.5 rounded border border-slate-200">
                - {axisXLabel}
              </span>

              {/* Competitor Pins */}
              {competitors.map((c, i) => {
                // Map -10..+10 to 10%..90%
                const leftPct = 50 + (c.x * 3.8);
                const topPct = 50 - (c.y * 3.8);

                return (
                  <div
                    key={i}
                    style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
                  >
                    <div className={`w-4 h-4 rounded-full border-2 border-white shadow-md ${c.color} animate-pulse`} />
                    <span className="text-[10px] font-bold text-slate-900 bg-white/95 px-1.5 py-0.5 rounded shadow-xs whitespace-nowrap mt-1 border border-slate-200">
                      {c.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
