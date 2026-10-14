import { useState } from 'react';
import { ShieldAlert, ShieldCheck, Sparkles, RotateCcw, ArrowRight, Check } from 'lucide-react';

interface ForceState {
  id: string;
  name: string;
  category: 'entrants' | 'suppliers' | 'buyers' | 'substitutes' | 'rivalry';
  currentScore: number; // 1-100
  futureScore: number;  // 1-100
  evidence: string;
  keyDriver: string;
  subChecklist: { id: string; label: string; checked: boolean }[];
  defensiveLever: string;
  recommendedAction: string;
}

const NELLAI_TILES_FORCES: ForceState[] = [
  {
    id: 'entrants',
    name: 'Threat of New Entrants',
    category: 'entrants',
    currentScore: 50,
    futureScore: 40,
    evidence: 'Medium initial capital required for tile warehouse; local dealer licensing is routine but brand dealerships are limited.',
    keyDriver: 'Capital needs and access to wholesale dealership franchises',
    subChecklist: [
      { id: 'e1', label: 'Low initial capital needed for retail storefront', checked: true },
      { id: 'e2', label: 'Government licensing is routine and non-exclusive', checked: true },
      { id: 'e3', label: 'Incumbents lack exclusive territorial brand agreements', checked: false },
      { id: 'e4', label: 'Low switching costs for end contractors', checked: true }
    ],
    defensiveLever: 'Exclusive regional showroom contracts & bundled installation services',
    recommendedAction: 'Lock in exclusivity clauses with secondary high-margin bathware brands.'
  },
  {
    id: 'suppliers',
    name: 'Bargaining Power of Suppliers',
    category: 'suppliers',
    currentScore: 88,
    futureScore: 92,
    evidence: 'National tile brand accounts for 70% of revenue and is opening its own direct company-owned experience center in the district.',
    keyDriver: 'High supplier concentration & credible threat of supplier forward integration',
    subChecklist: [
      { id: 's1', label: 'Single manufacturer controls brand and product availability', checked: true },
      { id: 's2', label: 'Supplier threatens forward integration into direct retail', checked: true },
      { id: 's3', label: 'Supplier products cannot be substituted without brand loss', checked: true },
      { id: 's4', label: 'Supplier dictates minimum order quantities and credit terms', checked: true }
    ],
    defensiveLever: 'Supplier diversification & brand de-concentration',
    recommendedAction: 'Reduce dependency on single tile brand from 70% to 45% by onboarding 2 non-competing design brands.'
  },
  {
    id: 'buyers',
    name: 'Bargaining Power of Buyers',
    category: 'buyers',
    currentScore: 78,
    futureScore: 75,
    evidence: 'Commercial builders buy in bulk and bargain relentlessly; however, residential homeowners value design consultation and carry low buyer power.',
    keyDriver: 'Large volume buyer concentration among commercial construction builders',
    subChecklist: [
      { id: 'b1', label: 'Top 5 commercial builders represent 45% of wholesale volume', checked: true },
      { id: 'b2', label: 'Standard ceramic tiles are viewed as commoditized', checked: true },
      { id: 'b3', label: 'Builders switch freely between dealers for a ₹2/sqft discount', checked: true },
      { id: 'b4', label: 'Homeowners lack wholesale pricing transparency', checked: false }
    ],
    defensiveLever: 'Segment pivot toward residential homeowners & annual rate contracts for builders',
    recommendedAction: 'Build an experiential 3D tile design studio for homeowners where margins are 6% higher.'
  },
  {
    id: 'substitutes',
    name: 'Threat of Substitutes',
    category: 'substitutes',
    currentScore: 60,
    futureScore: 72,
    evidence: 'Vitrified slabs, polished granite, engineered vinyl flooring, and direct online factory-to-site logistics apps.',
    keyDriver: 'Attractive price-performance trade-offs in engineered stone and vitrified materials',
    subChecklist: [
      { id: 'u1', label: 'Functional substitutes (granite, wooden vinyl) perform identical flooring role', checked: true },
      { id: 'u2', label: 'Price-performance of vitrified composite is improving rapidly', checked: true },
      { id: 'u3', label: 'Switching costs to alternative flooring materials are low during construction', checked: true },
      { id: 'u4', label: 'Direct factory dispatch portals bypass distributors', checked: false }
    ],
    defensiveLever: 'Expand catalogue to include engineered substitutes and provide turnkey laying warranty',
    recommendedAction: 'Stock and showcase premium vitrified stone alternatives directly inside showroom.'
  },
  {
    id: 'rivalry',
    name: 'Rivalry Among Competitors',
    category: 'rivalry',
    currentScore: 75,
    futureScore: 75,
    evidence: '22 dealer showrooms in a 15 km radius competing heavily on dealer commission kickbacks and margin cuts.',
    keyDriver: 'Numerous similar competitors and slow district construction growth',
    subChecklist: [
      { id: 'r1', label: 'High number of similarly scaled retail dealer showrooms', checked: true },
      { id: 'r2', label: 'Competitors resort to discounting gross margins below 10%', checked: true },
      { id: 'r3', label: 'High warehouse inventory holding exit barriers', checked: true },
      { id: 'r4', label: 'Low product differentiation between ceramic lines', checked: true }
    ],
    defensiveLever: 'Niche differentiation via architectural advisory',
    recommendedAction: 'Position as high-touch consultation partner with free 3D bathroom visualization rather than a warehouse box-pusher.'
  }
];

export function FiveForcesSimulator() {
  const [forces, setForces] = useState<ForceState[]>(NELLAI_TILES_FORCES);
  const [selectedForceId, setSelectedForceId] = useState<string>('suppliers');

  const updateScore = (id: string, type: 'current' | 'future', val: number) => {
    setForces(prev => prev.map(f => {
      if (f.id === id) {
        return {
          ...f,
          [type === 'current' ? 'currentScore' : 'futureScore']: val
        };
      }
      return f;
    }));
  };

  const toggleCheck = (forceId: string, checkId: string) => {
    setForces(prev => prev.map(f => {
      if (f.id === forceId) {
        const updated = f.subChecklist.map(c => c.id === checkId ? { ...c, checked: !c.checked } : c);
        // Recalculate score based on checked count (each checkbox ~ 20-25 pts baseline)
        const checkedCount = updated.filter(c => c.checked).length;
        const autoScore = Math.min(100, Math.max(15, checkedCount * 22 + 10));
        return { ...f, subChecklist: updated, currentScore: autoScore };
      }
      return f;
    }));
  };

  const selectedForce = forces.find(f => f.id === selectedForceId) || forces[0];

  // Calculate overall structural attractiveness
  const avgCurrent = Math.round(forces.reduce((acc, f) => acc + f.currentScore, 0) / forces.length);
  const avgFuture = Math.round(forces.reduce((acc, f) => acc + f.futureScore, 0) / forces.length);

  // Highest pressure force
  const sortedByCurrent = [...forces].sort((a, b) => b.currentScore - a.currentScore);
  const mostDamagingForce = sortedByCurrent[0];

  // Helper for radar chart SVG coordinates (pentagon, 5 forces)
  const size = 260;
  const center = size / 2;
  const radius = 95;

  const getCoordinates = (index: number, score: number) => {
    const angle = (Math.PI * 2 / 5) * index - Math.PI / 2;
    const r = (score / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const currentPoints = forces.map((f, i) => {
    const { x, y } = getCoordinates(i, f.currentScore);
    return `${x},${y}`;
  }).join(' ');

  const futurePoints = forces.map((f, i) => {
    const { x, y } = getCoordinates(i, f.futureScore);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <span>Industry Structure Analyzer</span>
            <span>·</span>
            <span>Michael E. Porter Model</span>
            <span>·</span>
            <span>Now vs 3 Years Dual Rating</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Porter’s Five Forces & Structural Lever Studio</h3>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Analyze structural industry profitability, diagnose buyer and supplier bargaining power, and identify concrete levers to reshape forces.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setForces(NELLAI_TILES_FORCES)}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Load Nellai Tiles Case
          </button>
          <button
            onClick={() => setForces(NELLAI_TILES_FORCES.map(f => ({ ...f, currentScore: 50, futureScore: 50 })))}
            className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 bg-white border border-slate-200 rounded-lg transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Overview Analytics Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Industry Attractiveness Index */}
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Industry Profit Pressure</span>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-extrabold tabular-nums ${
              avgCurrent > 70 ? 'text-rose-600' : avgCurrent > 45 ? 'text-amber-600' : 'text-emerald-600'
            }`}>
              {avgCurrent}%
            </span>
            <span className="text-xs text-slate-500 font-medium">
              ({avgCurrent > 70 ? 'High Pressure / Structurally Unattractive' : avgCurrent > 45 ? 'Moderate Pressure' : 'Attractive Industry'})
            </span>
          </div>
          <p className="text-xs text-slate-600">
            {avgCurrent > 65
              ? 'Margins are heavily compressed by market structure. Do not compete head-on on price; differentiate or find a protected niche.'
              : 'Structural forces permit healthy operating margins. Guard against entrants.'}
          </p>
        </div>

        {/* Most Damaging Force */}
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Dominant Margin Squeezer</span>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
            <h4 className="text-sm font-bold text-slate-900">{mostDamagingForce.name}</h4>
          </div>
          <p className="text-xs text-slate-600">
            Rated <span className="font-bold text-rose-700 tabular-nums">{mostDamagingForce.currentScore}%</span> pressure. Key lever: <span className="font-medium text-slate-800">{mostDamagingForce.defensiveLever}</span>.
          </p>
        </div>

        {/* 3-Year Trajectory */}
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">3-Year Structural Shift</span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-slate-900 tabular-nums">{avgCurrent}% → {avgFuture}%</span>
            <span className={`text-xs font-bold ${avgFuture >= avgCurrent ? 'text-rose-600' : 'text-emerald-600'}`}>
              {avgFuture >= avgCurrent ? '↑ Tightening' : '↓ Relaxing'}
            </span>
          </div>
          <p className="text-xs text-slate-600">
            Supplier forward integration and digital substitute platforms will further increase margin squeeze over 3 years.
          </p>
        </div>
      </div>

      {/* Main Interactive Stage: Radar Chart & Force Detail Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Radar Chart & Force Buttons */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col items-center justify-between">
          <div className="w-full flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Five Forces Radar</span>
            <div className="flex items-center gap-3 text-2xs font-medium">
              <span className="flex items-center gap-1 text-slate-900 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-900" /> Current
              </span>
              <span className="flex items-center gap-1 text-blue-600 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> In 3 Years
              </span>
            </div>
          </div>

          {/* SVG Radar */}
          <div className="py-2">
            <svg width={size} height={size} className="overflow-visible">
              {/* Background Concentric Webs */}
              {[0.25, 0.5, 0.75, 1.0].map((level, i) => {
                const webPoints = [0, 1, 2, 3, 4].map(idx => {
                  const angle = (Math.PI * 2 / 5) * idx - Math.PI / 2;
                  const r = level * radius;
                  return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
                }).join(' ');

                return (
                  <polygon
                    key={i}
                    points={webPoints}
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="1"
                    strokeDasharray={level === 1 ? 'none' : '2,2'}
                  />
                );
              })}

              {/* Axis Lines & Labels */}
              {forces.map((f, i) => {
                const angle = (Math.PI * 2 / 5) * i - Math.PI / 2;
                const endX = center + radius * Math.cos(angle);
                const endY = center + radius * Math.sin(angle);
                const labelX = center + (radius + 24) * Math.cos(angle);
                const labelY = center + (radius + 18) * Math.sin(angle);

                return (
                  <g key={f.id}>
                    <line x1={center} y1={center} x2={endX} y2={endY} stroke="#cbd5e1" strokeWidth="1" />
                    <text
                      x={labelX}
                      y={labelY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-2xs font-bold fill-slate-700 cursor-pointer"
                      onClick={() => setSelectedForceId(f.id)}
                    >
                      {f.name.replace('Bargaining Power of ', '').replace('Threat of ', '')}
                    </text>
                  </g>
                );
              })}

              {/* Future Score Polygon (Blue) */}
              <polygon
                points={futurePoints}
                fill="rgba(59, 130, 246, 0.15)"
                stroke="#3b82f6"
                strokeWidth="1.5"
                strokeDasharray="4,2"
              />

              {/* Current Score Polygon (Dark) */}
              <polygon
                points={currentPoints}
                fill="rgba(15, 23, 42, 0.2)"
                stroke="#0f172a"
                strokeWidth="2"
              />

              {/* Data points */}
              {forces.map((f, i) => {
                const { x, y } = getCoordinates(i, f.currentScore);
                const isSelected = f.id === selectedForceId;
                return (
                  <circle
                    key={f.id}
                    cx={x}
                    cy={y}
                    r={isSelected ? 5 : 3.5}
                    className={`cursor-pointer transition-all ${
                      isSelected ? 'fill-rose-600 stroke-white stroke-2' : 'fill-slate-900'
                    }`}
                    onClick={() => setSelectedForceId(f.id)}
                  />
                );
              })}
            </svg>
          </div>

          {/* Quick Force Selector List */}
          <div className="w-full space-y-1 pt-3 border-t border-slate-100">
            {forces.map(f => (
              <button
                key={f.id}
                onClick={() => setSelectedForceId(f.id)}
                className={`w-full flex items-center justify-between p-2 rounded-lg text-xs transition-colors ${
                  f.id === selectedForceId ? 'bg-slate-900 text-white font-bold' : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span>{f.name}</span>
                <span className="font-mono tabular-nums">
                  {f.currentScore}% (→ {f.futureScore}%)
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Force Diagnosis & Levers Workspace */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-5">
          <div className="flex items-start justify-between pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 text-2xs font-bold bg-slate-100 text-slate-800 rounded uppercase">
                  Force Diagnostic
                </span>
                <span className="text-xs text-slate-500">·</span>
                <span className="text-xs font-semibold text-rose-700 tabular-nums">
                  Current Pressure: {selectedForce.currentScore}%
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900">{selectedForce.name}</h4>
              <p className="text-xs text-slate-600 mt-1 italic">Key Driver: {selectedForce.keyDriver}</p>
            </div>
          </div>

          {/* Dual Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200/80">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Current Force Pressure</span>
                <span className="font-bold text-slate-900 tabular-nums">{selectedForce.currentScore}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={selectedForce.currentScore}
                onChange={(e) => updateScore(selectedForce.id, 'current', parseInt(e.target.value))}
                className="w-full accent-slate-900"
              />
              <span className="text-2xs text-slate-500 block">
                {selectedForce.currentScore >= 70 ? 'High Pressure (Low margin)' : selectedForce.currentScore >= 40 ? 'Moderate Pressure' : 'Low Pressure (High pricing power)'}
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">In 3 Years Outlook</span>
                <span className="font-bold text-blue-600 tabular-nums">{selectedForce.futureScore}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={selectedForce.futureScore}
                onChange={(e) => updateScore(selectedForce.id, 'future', parseInt(e.target.value))}
                className="w-full accent-blue-600"
              />
              <span className="text-2xs text-slate-500 block">
                Anticipated direction based on regulatory, tech, or competitor moves.
              </span>
            </div>
          </div>

          {/* Diagnostic Sub-criteria Checkpoints */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Microeconomic Diagnostic Checkpoints
              </span>
              <span className="text-2xs text-slate-500">Checking triggers adjusts current pressure</span>
            </div>

            <div className="space-y-2">
              {selectedForce.subChecklist.map(check => (
                <button
                  key={check.id}
                  onClick={() => toggleCheck(selectedForce.id, check.id)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-left text-xs transition-colors ${
                    check.checked ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="font-medium pr-3">{check.label}</span>
                  <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${
                    check.checked ? 'bg-white text-slate-900' : 'border border-slate-300'
                  }`}>
                    {check.checked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Sourced Case Evidence */}
          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg space-y-1">
            <span className="text-2xs font-bold text-slate-500 uppercase tracking-wide">Empirical Grounding / Case Evidence</span>
            <p className="text-xs text-slate-700 italic">"{selectedForce.evidence}"</p>
          </div>

          {/* Defensive Structural Lever */}
          <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-2">
            <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-xs uppercase tracking-wide">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Recommended Structural Lever</span>
            </div>
            <p className="text-xs font-bold text-slate-900">{selectedForce.defensiveLever}</p>
            <p className="text-xs text-emerald-800">{selectedForce.recommendedAction}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
