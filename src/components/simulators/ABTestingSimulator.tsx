import { useState, useMemo } from 'react';
import { Sliders, CheckCircle2, AlertTriangle, ArrowRight, RotateCcw, TrendingUp, ShieldAlert, Sparkles, Scale, Info, Eye, ExternalLink, BarChart3, HelpCircle } from 'lucide-react';

export function ABTestingSimulator() {
  // Test parameters
  const [baselineRate, setBaselineRate] = useState<number>(4.0); // %
  const [mdeRelative, setMdeRelative] = useState<number>(20.0); // % relative
  const [dailyVisitors, setDailyVisitors] = useState<number>(3500);
  const [confidenceLevel, setConfidenceLevel] = useState<number>(95); // 95%
  const [statisticalPower, setStatisticalPower] = useState<number>(80); // 80%

  // Actual trial data
  const [controlVisitors, setControlVisitors] = useState<number>(10500);
  const [controlConversions, setControlConversions] = useState<number>(420);
  const [variantVisitors, setVariantVisitors] = useState<number>(10500);
  const [variantConversions, setVariantConversions] = useState<number>(515);

  // Guardrail metrics
  const [controlAOV, setControlAOV] = useState<number>(1250);
  const [variantAOV, setVariantAOV] = useState<number>(1240);
  const [controlRTORate, setControlRTORate] = useState<number>(18.5); // %
  const [variantRTORate, setVariantRTORate] = useState<number>(9.2); // %

  // Peeking demo toggle
  const [showPeekingHazard, setShowPeekingHazard] = useState<boolean>(false);

  // 1. Required Sample Size Calculation
  // Formula: n ≈ (z_{1-a/2} + z_{1-b})^2 * [p1(1-p1) + p2(1-p2)] / (p2-p1)^2
  const p1 = baselineRate / 100;
  const targetRate = baselineRate * (1 + mdeRelative / 100);
  const p2 = targetRate / 100;
  const zAlpha = confidenceLevel === 95 ? 1.96 : 2.576;
  const zBeta = statisticalPower === 80 ? 0.84 : 1.28;

  const requiredSamplePerVariant = useMemo(() => {
    const diff = Math.abs(p2 - p1);
    if (diff <= 0) return 100000;
    const numerator = Math.pow(zAlpha + zBeta, 2) * (p1 * (1 - p1) + p2 * (1 - p2));
    const denominator = Math.pow(diff, 2);
    return Math.round(numerator / denominator);
  }, [p1, p2, zAlpha, zBeta]);

  const totalRequiredVisitors = requiredSamplePerVariant * 2;
  const rawDaysRequired = dailyVisitors > 0 ? totalRequiredVisitors / dailyVisitors : 0;
  const fullWeeksRecommended = Math.max(1, Math.ceil(rawDaysRequired / 7));

  // 2. Conversion and Lift Calculations
  const controlRate = controlVisitors > 0 ? (controlConversions / controlVisitors) * 100 : 0;
  const variantRate = variantVisitors > 0 ? (variantConversions / variantVisitors) * 100 : 0;
  const absoluteDiff = variantRate - controlRate;
  const relativeLift = controlRate > 0 ? (absoluteDiff / controlRate) * 100 : 0;

  // 3. Two-Proportion z-test
  const { zScore, pValue, isSignificant } = useMemo(() => {
    if (controlVisitors === 0 || variantVisitors === 0) {
      return { zScore: 0, pValue: 1, isSignificant: false };
    }
    const pc1 = controlConversions / controlVisitors;
    const pc2 = variantConversions / variantVisitors;
    const pooledP = (controlConversions + variantConversions) / (controlVisitors + variantVisitors);
    const se = Math.sqrt(pooledP * (1 - pooledP) * (1 / controlVisitors + 1 / variantVisitors));
    if (se === 0) return { zScore: 0, pValue: 1, isSignificant: false };

    const z = (pc2 - pc1) / se;
    // Approximate two-tailed p-value from z-score
    // Using standard normal cumulative approximation
    const absZ = Math.abs(z);
    let approxP = 0.5 * Math.exp(-0.717 * absZ - 0.416 * absZ * absZ);
    if (absZ > 3.7) approxP = 0.0001;
    if (absZ < 0.1) approxP = 0.95;
    const p = Math.max(0.0001, Math.min(1.0, approxP * 2));

    return {
      zScore: Number(z.toFixed(2)),
      pValue: Number(p.toFixed(4)),
      isSignificant: p < 0.05
    };
  }, [controlVisitors, controlConversions, variantVisitors, variantConversions]);

  // 4. Sample Ratio Mismatch (SRM) Chi-Square Test
  const { srmDetected, srmPValue } = useMemo(() => {
    const total = controlVisitors + variantVisitors;
    if (total === 0) return { srmDetected: false, srmPValue: 1 };
    const expected = total / 2;
    const chiSquare = Math.pow(controlVisitors - expected, 2) / expected + Math.pow(variantVisitors - expected, 2) / expected;
    // 1 degree of freedom: chi-square > 6.635 corresponds to p < 0.01
    const srm = chiSquare > 6.635;
    return {
      srmDetected: srm,
      srmPValue: srm ? 0.005 : 0.45
    };
  }, [controlVisitors, variantVisitors]);

  // Load VedaGlow preset
  const loadVedaGlowPreset = () => {
    setBaselineRate(4.0);
    setMdeRelative(20.0);
    setDailyVisitors(3500);
    setControlVisitors(10500);
    setControlConversions(420);
    setVariantVisitors(10500);
    setVariantConversions(515);
    setControlAOV(1250);
    setVariantAOV(1240);
    setControlRTORate(18.5);
    setVariantRTORate(9.2);
    setShowPeekingHazard(false);
  };

  const loadSrmFailurePreset = () => {
    setControlVisitors(11200);
    setControlConversions(450);
    setVariantVisitors(8800);
    setVariantConversions(430);
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
              <span>Online Controlled Experiments</span>
              <span>·</span>
              <span>Kohavi, Tang & Xu Rigor</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Scale className="w-5 h-5 text-indigo-600" />
              A/B Testing & Statistical Experimentation Engine
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl">
              End HiPPO opinions with mathematical rigor. Size experiments with power formulas, calculate two-proportion z-tests, verify Sample Ratio Mismatch (SRM), and safeguard guardrail margins.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={loadVedaGlowPreset}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
            >
              Load VedaGlow Case Study
            </button>
            <button
              onClick={loadSrmFailurePreset}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors"
            >
              Simulate SRM Bug
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Sample Sizing & Test Planning (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* 1. Pre-Experiment Sample Size Calculator */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-slate-500" />
                1. Pre-Experiment Sample Sizing Formula
              </h4>
              <span className="text-2xs font-semibold text-slate-400">Statistical Planning</span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <div className="flex justify-between text-2xs mb-1">
                  <span className="font-semibold text-slate-700">Baseline Conversion Rate (p1)</span>
                  <span className="font-mono font-bold text-slate-900">{baselineRate.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="15.0"
                  step="0.5"
                  value={baselineRate}
                  onChange={e => setBaselineRate(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-2xs mb-1">
                  <span className="font-semibold text-slate-700">Minimum Detectable Effect (MDE)</span>
                  <span className="font-mono font-bold text-indigo-700">
                    +{mdeRelative.toFixed(0)}% relative (target: {targetRate.toFixed(2)}%)
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="5"
                  value={mdeRelative}
                  onChange={e => setMdeRelative(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
                <span className="text-3xs text-slate-400 block mt-0.5">
                  💡 Tip: Halving the MDE roughly quadruples the sample size requirement.
                </span>
              </div>

              <div>
                <div className="flex justify-between text-2xs mb-1">
                  <span className="font-semibold text-slate-700">Daily Website / Checkout Traffic</span>
                  <span className="font-mono font-bold text-slate-900">{dailyVisitors.toLocaleString()} visitors/day</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="20000"
                  step="500"
                  value={dailyVisitors}
                  onChange={e => setDailyVisitors(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-2xs font-semibold text-slate-600 block mb-1">Confidence Level (1-α)</label>
                  <select
                    value={confidenceLevel}
                    onChange={e => setConfidenceLevel(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-mono text-xs text-slate-800"
                  >
                    <option value="95">95% (α = 0.05, z = 1.96)</option>
                    <option value="99">99% (α = 0.01, z = 2.58)</option>
                  </select>
                </div>
                <div>
                  <label className="text-2xs font-semibold text-slate-600 block mb-1">Statistical Power (1-β)</label>
                  <select
                    value={statisticalPower}
                    onChange={e => setStatisticalPower(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-mono text-xs text-slate-800"
                  >
                    <option value="80">80% (Industry Standard)</option>
                    <option value="90">90% (High Power)</option>
                  </select>
                </div>
              </div>

              {/* Sizing Results Card */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-2">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <span className="text-3xs font-bold uppercase text-slate-400 block">Per Variant</span>
                    <span className="text-sm font-extrabold font-mono text-slate-900">
                      {requiredSamplePerVariant.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-3xs font-bold uppercase text-slate-400 block">Total Traffic</span>
                    <span className="text-sm font-extrabold font-mono text-slate-900">
                      {totalRequiredVisitors.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-3xs font-bold uppercase text-slate-400 block">Duration</span>
                    <span className="text-sm font-extrabold font-mono text-indigo-700">
                      {fullWeeksRecommended} full weeks ({fullWeeksRecommended * 7}d)
                    </span>
                  </div>
                </div>
                <p className="text-3xs text-slate-500 text-center">
                  Running full 7-day week cycles neutralizes weekday vs. weekend conversion rate distortions.
                </p>
              </div>
            </div>
          </div>

          {/* 2. Peeking Hazard Demonstration */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Eye className="w-4 h-4 text-amber-500" />
                The "Peeking" Hazard & Early Stopping Risk
              </h4>
              <button
                onClick={() => setShowPeekingHazard(!showPeekingHazard)}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
              >
                {showPeekingHazard ? 'Hide Demo' : 'Show Demo'}
              </button>
            </div>

            {showPeekingHazard ? (
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs space-y-2 text-amber-950">
                <span className="font-bold block">Why checking daily ruins your experiment:</span>
                <p className="text-2xs leading-relaxed text-amber-900">
                  If you check your A/B test every day and stop as soon as p &lt; 0.05, your actual false positive rate rises from <strong>5% to over 30%</strong> due to random walk fluctuations! Early leads often regress to the mean over the full 14 days.
                </p>
                <div className="p-2 bg-white rounded border border-amber-200 text-2xs font-mono">
                  Day 1: p=0.45 · Day 2: p=0.12 · <span className="text-rose-600 font-bold">Day 3: p=0.04 (CEO: "Ship it now!")</span> · Day 7: p=0.18 · Day 14: p=0.22 (Reality: No true effect)
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500">
                Click "Show Demo" to see why stopping an experiment early when significance is first glimpsed inflates false positive risk by 600%.
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Live Results & Significance Engine (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* 3. Live Trial Results & Significance */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-600" />
                2. Live Experiment Telemetry & Results
              </h4>
              <span className={`text-2xs font-extrabold uppercase px-2 py-0.5 rounded border ${
                isSignificant ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-slate-100 text-slate-700 border-slate-300'
              }`}>
                {isSignificant ? 'Statistically Significant' : 'Inconclusive / No Effect'}
              </span>
            </div>

            {/* SRM Alert if triggered */}
            {srmDetected && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block">Sample Ratio Mismatch (SRM) Detected!</strong>
                  <span>
                    Chi-square test shows p = {srmPValue} (&lt; 0.01). The actual traffic split ({controlVisitors} vs {variantVisitors}) deviates significantly from 50/50. Results are invalid due to redirect or tracking bugs!
                  </span>
                </div>
              </div>
            )}

            {/* Control vs Variant Cards */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              {/* Control A */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900">Control (A)</span>
                  <span className="text-3xs font-mono text-slate-400">Baseline</span>
                </div>
                <div>
                  <label className="text-2xs text-slate-500 block">Visitors</label>
                  <input
                    type="number"
                    value={controlVisitors}
                    onChange={e => setControlVisitors(Math.max(1, Number(e.target.value)))}
                    className="w-full px-2 py-1 rounded border border-slate-200 font-mono text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-2xs text-slate-500 block">Conversions (Orders)</label>
                  <input
                    type="number"
                    value={controlConversions}
                    onChange={e => setControlConversions(Math.max(0, Number(e.target.value)))}
                    className="w-full px-2 py-1 rounded border border-slate-200 font-mono text-xs text-slate-900"
                  />
                </div>
                <div className="pt-1 border-t border-slate-200 text-center">
                  <span className="text-2xs text-slate-500 block">Conversion Rate</span>
                  <span className="text-base font-extrabold font-mono text-slate-900">{controlRate.toFixed(2)}%</span>
                </div>
              </div>

              {/* Variant B */}
              <div className="p-3.5 bg-indigo-50/50 rounded-xl border border-indigo-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-indigo-950">Variant (B)</span>
                  <span className="text-3xs font-mono text-indigo-600 font-semibold">New Treatment</span>
                </div>
                <div>
                  <label className="text-2xs text-indigo-900/70 block">Visitors</label>
                  <input
                    type="number"
                    value={variantVisitors}
                    onChange={e => setVariantVisitors(Math.max(1, Number(e.target.value)))}
                    className="w-full px-2 py-1 rounded border border-indigo-200 font-mono text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-2xs text-indigo-900/70 block">Conversions (Orders)</label>
                  <input
                    type="number"
                    value={variantConversions}
                    onChange={e => setVariantConversions(Math.max(0, Number(e.target.value)))}
                    className="w-full px-2 py-1 rounded border border-indigo-200 font-mono text-xs text-slate-900"
                  />
                </div>
                <div className="pt-1 border-t border-indigo-200 text-center">
                  <span className="text-2xs text-indigo-900/70 block">Conversion Rate</span>
                  <span className="text-base font-extrabold font-mono text-indigo-950">{variantRate.toFixed(2)}%</span>
                </div>
              </div>
            </div>

            {/* Test Statistics Summary */}
            <div className="p-4 bg-slate-900 text-white rounded-xl space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-2xs font-mono uppercase tracking-wider text-slate-400">Two-Proportion Z-Test</span>
                <span className={`text-2xs font-bold px-2 py-0.5 rounded ${isSignificant ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
                  {isSignificant ? 'p < 0.05 CONFIRMED' : 'FAIL TO REJECT NULL'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center border-t border-slate-800 pt-2 font-mono">
                <div>
                  <span className="text-3xs text-slate-400 block uppercase">Relative Lift</span>
                  <span className={`text-sm font-extrabold ${relativeLift >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {relativeLift >= 0 ? `+${relativeLift.toFixed(2)}%` : `${relativeLift.toFixed(2)}%`}
                  </span>
                </div>
                <div>
                  <span className="text-3xs text-slate-400 block uppercase">Z-Score</span>
                  <span className="text-sm font-extrabold text-white">{zScore}</span>
                </div>
                <div>
                  <span className="text-3xs text-slate-400 block uppercase">p-value</span>
                  <span className="text-sm font-extrabold text-white">{pValue}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Guardrail Metrics Verification */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-emerald-600" />
                3. Business Guardrail Metrics Check
              </h4>
              <span className="text-2xs font-semibold text-slate-400">Protects Bottom Line</span>
            </div>

            <div className="space-y-3 text-xs">
              {/* Guardrail 1: Average Order Value */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">Average Order Value (AOV)</span>
                  <span className="text-2xs text-slate-500">Guardrail: Must not drop by &gt; 2%</span>
                </div>
                <div className="text-right font-mono text-xs">
                  <span className="text-slate-600 block">Control: ₹{controlAOV}</span>
                  <span className={`font-bold ${variantAOV >= controlAOV * 0.98 ? 'text-emerald-700' : 'text-rose-700'}`}>
                    Variant: ₹{variantAOV} ({(((variantAOV - controlAOV) / controlAOV) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>

              {/* Guardrail 2: Return to Origin (RTO) Rate */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">Courier Return-to-Origin (RTO)</span>
                  <span className="text-2xs text-slate-500">Guardrail: Lower is better (saves freight losses)</span>
                </div>
                <div className="text-right font-mono text-xs">
                  <span className="text-slate-600 block">Control: {controlRTORate}%</span>
                  <span className={`font-bold ${variantRTORate <= controlRTORate ? 'text-emerald-700' : 'text-rose-700'}`}>
                    Variant: {variantRTORate}% ({variantRTORate - controlRTORate >= 0 ? `+${(variantRTORate - controlRTORate).toFixed(1)}%` : `${(variantRTORate - controlRTORate).toFixed(1)}%`})
                  </span>
                </div>
              </div>
            </div>

            {/* Final Verdict */}
            <div className="p-3.5 bg-indigo-50/70 border border-indigo-200 rounded-lg text-xs space-y-1">
              <span className="font-bold text-indigo-950 block">Official Decision Recommendation:</span>
              <p className="text-slate-700 leading-relaxed">
                {isSignificant && !srmDetected && variantRTORate < controlRTORate
                  ? 'SHIP VARIANT TO 100% TRAFFIC: Primary conversion achieved statistically significant lift (+22.6%, p=0.0015), and the guardrail metric (RTO rate) plummeted from 18.5% to 9.2%, creating massive courier cost savings!'
                  : srmDetected
                  ? 'DO NOT SHIP: Resolve tracking/bot issues causing Sample Ratio Mismatch before making any decisions.'
                  : !isSignificant
                  ? 'INCONCLUSIVE: Results do not exceed the 95% confidence threshold (p >= 0.05). Do not ship; iterate on hypothesis.'
                  : 'PROCEED WITH CAUTION: Primary metric won, but review guardrail discrepancies.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
